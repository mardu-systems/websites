"use client";

import { useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@mardu/ui/components/alert";
import { Button } from "@mardu/ui/components/button";
import { Checkbox } from "@mardu/ui/components/checkbox";
import { EditorialActionButton } from "@mardu/ui/components/editorial-action-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@mardu/ui/components/dialog";
import { Input } from "@mardu/ui/components/input";
import { Label } from "@mardu/ui/components/label";
import type { CTASectionNewsletterDialogProps } from "./cta-section-contract";

const DEFAULT_DIALOG = {
  requestUrl: "/api/newsletter",
  requestRole: "newsletter",
  dialogTitle: "Anmelden",
  dialogDescription:
    "Unser Newsletter informiert dich regelmäßig über Produktneuheiten und Sonderaktionen.",
  submitLabel: "Anmelden",
  submitPendingLabel: "Anmelden",
  successMessage: "Fast geschafft: Bitte bestätige die Anmeldung per E-Mail.",
  errorMessage: "Newsletter-Anmeldung fehlgeschlagen",
  consentLabel:
    "Deine Daten werden nur für den Newsletter genutzt. Mit dem Absenden bestätigst du die Datenverarbeitung und unsere Datenschutzerklärung.",
} satisfies Omit<Required<CTASectionNewsletterDialogProps>, "getRequestToken">;

type FormErrors = {
  firstName?: string;
  lastName?: string;
  email?: string;
  consent?: string;
};

export function CtaNewsletterDialog({
  config,
  triggerLabel,
}: {
  config?: CTASectionNewsletterDialogProps;
  triggerLabel: string;
}) {
  const dialogConfig = { ...DEFAULT_DIALOG, ...config };
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const emailInputRef = useRef<HTMLInputElement>(null);
  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);
  const consentRef = useRef<HTMLButtonElement>(null);

  const resetDialogState = () => {
    setFormErrors({});
    setIsSubmitting(false);
    setConsentChecked(false);
    setStatus("idle");
    setErrorMessage("");
  };

  const clearFieldError = (field: keyof FormErrors) => {
    if (formErrors[field]) {
      setFormErrors((previous) => ({ ...previous, [field]: undefined }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const firstName = String(formData.get("firstName") ?? "").trim();
    const lastName = String(formData.get("lastName") ?? "").trim();
    const company = String(formData.get("company") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const nextErrors: FormErrors = {};

    if (!firstName) nextErrors.firstName = "Bitte gib deinen Vornamen ein.";
    if (!lastName) nextErrors.lastName = "Bitte gib deinen Nachnamen ein.";
    if (!email) {
      nextErrors.email = "Bitte gib eine E-Mail-Adresse ein.";
    } else if (emailInputRef.current && !emailInputRef.current.validity.valid) {
      nextErrors.email = "Bitte gib eine gültige E-Mail-Adresse ein.";
    }
    if (!consentChecked)
      nextErrors.consent = "Bitte bestätige deine Einwilligung.";

    if (Object.keys(nextErrors).length > 0) {
      setFormErrors(nextErrors);
      if (nextErrors.firstName) firstNameInputRef.current?.focus();
      else if (nextErrors.lastName) lastNameInputRef.current?.focus();
      else if (nextErrors.email) emailInputRef.current?.focus();
      else consentRef.current?.focus();
      return;
    }

    setFormErrors({});
    setStatus("idle");
    setErrorMessage("");

    try {
      setIsSubmitting(true);
      const token = dialogConfig.getRequestToken
        ? await dialogConfig.getRequestToken("newsletter_signup")
        : null;
      const response = await fetch(dialogConfig.requestUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          role: dialogConfig.requestRole,
          ...(token ? { token } : {}),
          ...(firstName ? { firstName } : {}),
          ...(lastName ? { lastName } : {}),
          ...(company ? { company } : {}),
        }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(payload?.error || dialogConfig.errorMessage);
      }

      setStatus("success");
      form.reset();
      setConsentChecked(false);
      window.setTimeout(() => setOpen(false), 1500);
    } catch (error: unknown) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : dialogConfig.errorMessage,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen: boolean) => {
        setOpen(nextOpen);
        if (!nextOpen) resetDialogState();
      }}
    >
      <DialogTrigger render={<EditorialActionButton tone="dark" />}>
        {triggerLabel}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto border border-black/10 bg-background sm:max-w-175">
        <DialogHeader>
          <DialogTitle>{dialogConfig.dialogTitle}</DialogTitle>
          <DialogDescription>
            {dialogConfig.dialogDescription}
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-5 pt-2" onSubmit={handleSubmit} noValidate>
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            name="email_confirm"
            aria-hidden
          />

          <div className="grid gap-4 md:grid-cols-2">
            <RequiredTextField
              id="cta.firstName"
              name="firstName"
              label="Vorname"
              autoComplete="given-name"
              error={formErrors.firstName}
              inputRef={firstNameInputRef}
              onChange={() => clearFieldError("firstName")}
            />
            <RequiredTextField
              id="cta.lastName"
              name="lastName"
              label="Nachname"
              autoComplete="family-name"
              error={formErrors.lastName}
              inputRef={lastNameInputRef}
              onChange={() => clearFieldError("lastName")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cta.company">Firma</Label>
            <Input
              type="text"
              id="cta.company"
              name="company"
              autoComplete="organization"
            />
          </div>

          <RequiredTextField
            id="cta.email"
            name="email"
            label="E-Mail"
            type="email"
            autoComplete="email"
            error={formErrors.email}
            inputRef={emailInputRef}
            onChange={() => clearFieldError("email")}
          />

          <div className="space-y-2 pt-1">
            <Label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-muted-foreground">
              <Checkbox
                id="cta.consent"
                checked={consentChecked}
                onCheckedChange={(checked: boolean | "indeterminate") => {
                  setConsentChecked(checked === true);
                  clearFieldError("consent");
                }}
                ref={consentRef}
                className="mt-1"
                aria-invalid={Boolean(formErrors.consent)}
                aria-describedby={
                  formErrors.consent ? "cta.consent-error" : undefined
                }
              />
              {dialogConfig.consentLabel}
            </Label>
            <FieldError id="cta.consent-error" message={formErrors.consent} />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2
                className="mr-2 size-4 animate-spin"
                aria-hidden="true"
              />
            ) : null}
            {isSubmitting
              ? dialogConfig.submitPendingLabel
              : dialogConfig.submitLabel}
          </Button>

          {status === "success" ? (
            <Alert role="status" aria-live="polite">
              <AlertDescription>{dialogConfig.successMessage}</AlertDescription>
            </Alert>
          ) : null}
          {status === "error" ? (
            <Alert variant="destructive" role="alert" aria-live="assertive">
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          ) : null}
        </form>
      </DialogContent>
    </Dialog>
  );
}

function RequiredTextField({
  autoComplete,
  error,
  id,
  inputRef,
  label,
  name,
  onChange,
  type = "text",
}: {
  autoComplete: string;
  error?: string;
  id: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  label: string;
  name: string;
  onChange: () => void;
  type?: "email" | "text";
}) {
  const errorId = `${id}-error`;
  return (
    <div className="space-y-2">
      <Label
        htmlFor={id}
        className="after:ml-0.5 after:text-destructive after:content-['*']"
      >
        {label}
      </Label>
      <Input
        type={type}
        id={id}
        name={name}
        autoComplete={autoComplete}
        inputMode={type === "email" ? "email" : undefined}
        autoCapitalize={type === "email" ? "none" : undefined}
        autoCorrect={type === "email" ? "off" : undefined}
        spellCheck={type === "email" ? false : undefined}
        ref={inputRef}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
      />
      <FieldError id={errorId} message={error} />
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? (
    <p id={id} className="text-xs text-destructive" aria-live="polite">
      {message}
    </p>
  ) : null;
}
