"use client";

import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@mardu/ui/components/alert";
import { Button } from "@mardu/ui/components/button";
import { Card, CardContent } from "@mardu/ui/components/card";
import { Form } from "@mardu/ui/components/form";
import { ContactFormFields } from "./contact-form-fields";
import type { ContactErrorResponseDto } from "./index";

export type NormalizePhoneNumber = (value?: string) => string | undefined;
export type ExecuteRecaptcha = (
  action: string,
) => Promise<string | null | undefined>;

/**
 * Public schema factory for the shared contact form.
 * Apps can inject their own phone normalization strategy while keeping the form
 * contract stable.
 */
export function createContactSchema(
  normalizePhoneNumber?: NormalizePhoneNumber,
) {
  return z.object({
    name: z.string().trim().min(1, "Bitte Name angeben"),
    email: z.string().trim().email("Bitte eine gültige E-Mail angeben"),
    company: z.string().trim().optional(),
    phone: z
      .string()
      .trim()
      .optional()
      .refine(
        (value) =>
          value == null ||
          value.length === 0 ||
          (normalizePhoneNumber ? Boolean(normalizePhoneNumber(value)) : true),
        "Bitte eine gültige Telefonnummer im internationalen Format angeben",
      ),
    message: z
      .string()
      .trim()
      .max(500, "Bitte maximal 500 Zeichen eingeben")
      .optional(),
    consent: z.boolean().optional(),
    newsletterOptIn: z.boolean().optional(),
  });
}

export type ContactValues = z.infer<ReturnType<typeof createContactSchema>>;

export interface ContactFormProps {
  initialValues?: Partial<ContactValues>;
  initialMessage?: string;
  onChange?: (values: Partial<ContactValues>) => void;
  submit?: boolean;
  action?: string;
  extra?: Record<string, unknown>;
  submitLabel?: string;
  successMessage?: string;
  layout?: "plain" | "card";
  normalizePhoneNumber?: NormalizePhoneNumber;
  executeRecaptcha?: ExecuteRecaptcha;
}

export function ContactForm({
  initialValues,
  initialMessage,
  onChange,
  submit = false,
  action = "/api/contact",
  extra,
  submitLabel = "Senden",
  successMessage = "Danke! Nachricht gesendet",
  layout = "plain",
  normalizePhoneNumber,
  executeRecaptcha,
}: ContactFormProps) {
  const schema = React.useMemo(
    () => createContactSchema(normalizePhoneNumber),
    [normalizePhoneNumber],
  );
  const form = useForm<ContactValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: initialValues?.name ?? "",
      email: initialValues?.email ?? "",
      company: initialValues?.company ?? "",
      phone: initialValues?.phone ?? "",
      message: initialValues?.message ?? initialMessage ?? "",
      consent: initialValues?.consent ?? false,
      newsletterOptIn: initialValues?.newsletterOptIn ?? false,
    },
    mode: submit ? "onSubmit" : "onChange",
  });
  const [status, setStatus] = React.useState<"idle" | "success" | "error">(
    "idle",
  );
  const [submitting, setSubmitting] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const consentId = React.useId();
  const newsletterId = React.useId();

  React.useEffect(() => {
    if (!initialValues) return;
    form.reset({
      name: initialValues.name ?? form.getValues("name"),
      email: initialValues.email ?? form.getValues("email"),
      company: initialValues.company ?? form.getValues("company"),
      phone: initialValues.phone ?? form.getValues("phone"),
      message:
        initialValues.message ?? initialMessage ?? form.getValues("message"),
      consent: initialValues.consent ?? form.getValues("consent"),
      newsletterOptIn:
        initialValues.newsletterOptIn ?? form.getValues("newsletterOptIn"),
    });
  }, [initialMessage, initialValues, form]);

  React.useEffect(() => {
    if (submit || !onChange) return;
    const subscription = form.watch((values) => onChange(values));
    return () => subscription.unsubscribe();
  }, [form, onChange, submit]);

  async function handleSubmit(values: ContactValues) {
    if (!submit) return;

    if (values.consent !== true) {
      form.setError("consent", {
        type: "required",
        message: "Bitte Zustimmung erteilen",
      });
      setStatus("idle");
      setErrorMessage(null);
      return;
    }

    try {
      setSubmitting(true);
      setStatus("idle");
      setErrorMessage(null);

      const token = executeRecaptcha
        ? await executeRecaptcha("contact")
        : undefined;
      const normalizedPhone = normalizePhoneNumber
        ? normalizePhoneNumber(values.phone)
        : values.phone;
      const response = await fetch(action, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          phone: normalizedPhone,
          ...(token ? { token } : {}),
          ...(extra || {}),
        }),
      });

      if (!response.ok) {
        const payload = (await response
          .json()
          .catch(() => null)) as ContactErrorResponseDto | null;
        if (payload?.details) {
          for (const [field, messages] of Object.entries(payload.details)) {
            const message = messages?.[0];
            if (message && field in form.getValues()) {
              form.setError(field as keyof ContactValues, {
                type: "server",
                message,
              });
            }
          }
        }
        throw new Error(payload?.error || "Request failed");
      }

      setStatus("success");
      form.reset({
        name: "",
        email: "",
        company: "",
        phone: "",
        message: "",
        consent: false,
        newsletterOptIn: false,
      });
    } catch (error: unknown) {
      console.error(error);
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : null);
    } finally {
      setSubmitting(false);
    }
  }

  const submitHandler = submit ? form.handleSubmit(handleSubmit) : undefined;
  const handleTextareaKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (submit && (event.metaKey || event.ctrlKey) && event.key === "Enter") {
      event.preventDefault();
      submitHandler?.();
    }
  };

  const content = (
    <div className="w-full">
      <Form {...form}>
        <form noValidate onSubmit={submitHandler} className="space-y-6">
          <ContactFormFields
            consentId={consentId}
            form={form}
            newsletterId={newsletterId}
            onTextareaKeyDown={handleTextareaKeyDown}
          />

          {submit ? (
            <div className="contact-form-submit">
              <Button type="submit" disabled={submitting} className="min-w-40">
                {submitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Wird gesendet...
                  </>
                ) : (
                  submitLabel
                )}
              </Button>
            </div>
          ) : null}

          {status === "success" ? (
            <Alert className="border-green-600/30 bg-green-50 text-green-900">
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          ) : null}
          {status === "error" ? (
            <Alert variant="destructive">
              <AlertDescription>
                {errorMessage ||
                  "Beim Senden ist ein Fehler aufgetreten. Bitte versuche es erneut."}
              </AlertDescription>
            </Alert>
          ) : null}
        </form>
      </Form>
    </div>
  );

  return layout === "card" ? (
    <Card className="rounded-none border border-black/10 bg-transparent shadow-none">
      <CardContent className="p-8 md:p-8">{content}</CardContent>
    </Card>
  ) : (
    content
  );
}

export default ContactForm;
