import type { FormEventHandler } from "react";
import { Lock, Mail } from "lucide-react";
import { Button } from "@mardu/ui/components/button";
import { Checkbox } from "@mardu/ui/components/checkbox";
import { EditorialActionButton } from "@mardu/ui/components/editorial-action-button";
import { Input } from "@mardu/ui/components/input";
import { Label } from "@mardu/ui/components/label";
import { cn } from "@mardu/ui/lib/utils";

type WhitepaperLeadFormProps = {
  consentLabel: string;
  error: string | null;
  isLoading: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
  submitLabel: string;
  submitPendingLabel: string;
  variant?: "default" | "editorial-index";
};

export function WhitepaperLeadForm({
  consentLabel,
  error,
  isLoading,
  onSubmit,
  submitLabel,
  submitPendingLabel,
  variant = "default",
}: WhitepaperLeadFormProps) {
  const editorial = variant === "editorial-index";

  return (
    <form
      onSubmit={onSubmit}
      className={cn("space-y-4", editorial && "space-y-0")}
      noValidate
    >
      <div
        className={cn(
          "grid grid-cols-1 gap-4 md:grid-cols-2",
          editorial && "gap-0",
        )}
      >
        <div
          className={cn(
            "space-y-2",
            editorial && "border-b border-border py-5 md:pr-5",
          )}
        >
          <Label htmlFor="wp-vorname">Vorname</Label>
          <Input
            type="text"
            id="wp-vorname"
            name="firstName"
            autoComplete="given-name"
            placeholder="Dein Vorname"
            className={cn(
              editorial &&
                "h-11 rounded-none border-0 bg-transparent px-0 shadow-none",
            )}
          />
        </div>
        <div
          className={cn(
            "space-y-2",
            editorial && "border-b border-border py-5 md:border-l md:pl-5",
          )}
        >
          <Label htmlFor="wp-nachname">Nachname</Label>
          <Input
            type="text"
            id="wp-nachname"
            name="lastName"
            autoComplete="family-name"
            placeholder="Dein Nachname"
            className={cn(
              editorial &&
                "h-11 rounded-none border-0 bg-transparent px-0 shadow-none",
            )}
          />
        </div>
      </div>

      <div
        className={cn("space-y-2", editorial && "border-b border-border py-5")}
      >
        <Label
          htmlFor="wp-email"
          className="after:ml-0.5 after:text-destructive after:content-['*']"
        >
          E-Mail-Adresse
        </Label>
        <Input
          type="email"
          id="wp-email"
          name="email"
          required
          autoComplete="email"
          inputMode="email"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          placeholder="name@unternehmen.de"
          className={cn(
            editorial &&
              "h-11 rounded-none border-0 bg-transparent px-0 shadow-none",
          )}
        />
      </div>

      <div
        className={cn(
          "flex items-start gap-3 pt-2",
          editorial && "border-b border-border py-6",
        )}
      >
        <Checkbox id="wp-consent" name="consent" required className="mt-1" />
        <Label
          htmlFor="wp-consent"
          className="text-xs font-normal leading-relaxed text-muted-foreground"
        >
          {consentLabel}
        </Label>
      </div>

      <div
        className={cn(
          "flex items-center gap-3 text-xs text-muted-foreground",
          editorial && "py-5",
        )}
      >
        <Lock className="size-4 shrink-0" aria-hidden="true" />
        <span>
          Die Verarbeitung erfolgt nur für Whitepaper-Download und Newsletter.
        </span>
      </div>

      {error ? (
        <p
          className="pb-4 text-sm text-destructive"
          role="alert"
          aria-live="assertive"
        >
          {error}
        </p>
      ) : null}

      {editorial ? (
        <EditorialActionButton
          type="submit"
          className="w-full justify-start"
          icon={<Mail aria-hidden="true" />}
          disabled={isLoading}
          aria-busy={isLoading}
        >
          {isLoading ? submitPendingLabel : submitLabel}
        </EditorialActionButton>
      ) : (
        <Button
          type="submit"
          size="xl"
          className="w-full font-medium"
          disabled={isLoading}
          aria-busy={isLoading}
        >
          <Mail className="size-4" aria-hidden="true" />
          {isLoading ? submitPendingLabel : submitLabel}
        </Button>
      )}
    </form>
  );
}
