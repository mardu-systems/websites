"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, FileText, Mail } from "lucide-react";
import { ScrollReveal } from "@mardu/ui/components/motion/scroll-reveal";
import { Overline } from "@mardu/ui/components/typography";
import { cn } from "@mardu/ui/lib/utils";
import { WhitepaperLeadForm } from "./whitepaper-lead-form";
import { WhitepaperSuccessDialog } from "./whitepaper-success-dialog";

/**
 * Render-ready request DTO for newsletter/whitepaper lead capture.
 * Mapping to API payloads stays in the consuming app if it needs a custom handler.
 */
export interface WhitepaperLeadRequestDto {
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface WhitepaperSectionProps {
  title?: string;
  description?: string;
  benefits?: string[];
  coverImageSrc?: string;
  className?: string;
  eyebrow?: string;
  requestUrl?: string;
  submitLabel?: string;
  submitPendingLabel?: string;
  consentLabel?: string;
  successTitle?: string;
  successDescription?: string;
  onSubmitRequest?: (payload: WhitepaperLeadRequestDto) => Promise<void>;
  /**
   * `editorial-index` uses the numbered, square-edged Mardu marketing layout.
   * The default variant preserves the existing compact lead-magnet card.
   */
  variant?: "default" | "editorial-index";
}

export default function WhitepaperSection({
  title = "Unser exklusives Whitepaper",
  description = "Erhalte tiefe Einblicke und wertvolle Strategien in unserem kostenlosen Whitepaper. Melde dich zum Newsletter an, um den Download-Link direkt in dein Postfach zu erhalten.",
  benefits = [],
  coverImageSrc,
  className,
  eyebrow = "Whitepaper",
  requestUrl = "/api/newsletter",
  submitLabel = "Kostenlos anfordern",
  submitPendingLabel = "Wird verarbeitet...",
  consentLabel = "Ich stimme zu, dass ich den Newsletter erhalten möchte. Ich kann mich jederzeit wieder abmelden. Das Whitepaper wird mir nach Bestätigung zugesendet.",
  successTitle = "Fast geschafft!",
  successDescription = "Vielen Dank für dein Interesse. Wir haben dir eine E-Mail mit dem Download-Link gesendet.\n\nBitte prüfe dein Postfach (und den Spam-Ordner). Der Link ist aus Sicherheitsgründen nur begrenzt gültig.",
  onSubmitRequest,
  variant = "default",
}: WhitepaperSectionProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setFormError(null);

    const formData = new FormData(event.currentTarget);
    const payload: WhitepaperLeadRequestDto = {
      email: String(formData.get("email") ?? ""),
      firstName: String(formData.get("firstName") ?? "") || undefined,
      lastName: String(formData.get("lastName") ?? "") || undefined,
    };

    try {
      if (onSubmitRequest) {
        await onSubmitRequest(payload);
      } else {
        const response = await fetch(requestUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...payload, role: "whitepaper" }),
        });

        if (!response.ok) {
          throw new Error("Whitepaper request failed");
        }
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      setFormError(
        "Ein Fehler ist aufgetreten. Bitte versuche es später erneut.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const leadForm = (formVariant: "default" | "editorial-index" = "default") => (
    <WhitepaperLeadForm
      consentLabel={consentLabel}
      error={formError}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      submitLabel={submitLabel}
      submitPendingLabel={submitPendingLabel}
      variant={formVariant}
    />
  );

  if (variant === "editorial-index") {
    return (
      <section
        className={cn("border-b border-border py-16 md:py-24", className)}
      >
        <div className="mardu-container grid min-w-0 gap-14 lg:grid-cols-[0.42fr_0.58fr] lg:gap-18">
          <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <Overline variant="editorial">[01] {eyebrow}</Overline>
            <h2 className="mt-6 max-w-[17ch] text-[clamp(2.35rem,4vw,3.75rem)] font-light leading-[1] tracking-[-0.035em] text-foreground">
              {title}
            </h2>
            <p className="mt-6 max-w-[42rem] text-base leading-relaxed text-muted-foreground">
              {description}
            </p>

            {benefits.length > 0 ? (
              <ul className="mt-8 border-t border-border">
                {benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex min-h-12 items-start gap-3 border-b border-border py-3 text-sm leading-relaxed text-foreground/78"
                  >
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-mardu-purple"
                      aria-hidden="true"
                    />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="min-w-0 border-t border-border">
            <div className="border-b border-border py-6">
              <Overline variant="editorial" className="tracking-[0.14em]">
                [02] Download
              </Overline>
              <h3 className="mt-4 text-2xl font-light tracking-[-0.025em] text-foreground">
                Whitepaper per E-Mail anfordern
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Der persönliche Download-Link wird direkt an deine
                E-Mail-Adresse gesendet.
              </p>
            </div>
            {leadForm("editorial-index")}
          </div>
        </div>

        <WhitepaperSuccessDialog
          open={isSubmitted}
          onOpenChange={setIsSubmitted}
          title={successTitle}
          description={successDescription}
          variant="editorial-index"
        />
      </section>
    );
  }

  return (
    <section className={cn("w-full px-4 py-16 md:px-8", className)}>
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <ScrollReveal
            direction="right"
            className="order-last flex justify-center lg:order-first"
          >
            <div className="group relative">
              <div className="absolute -inset-4 rounded-2xl bg-linear-to-tr from-primary/20 to-accent/20 blur-xl opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

              <motion.div
                className="relative z-10 flex aspect-3/4 w-full max-w-sm items-center justify-center overflow-hidden rounded-xl border border-border bg-card shadow-xl"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {coverImageSrc ? (
                  <Image
                    src={coverImageSrc}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 26rem"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <FileText className="mb-4 h-16 w-16 text-primary" />
                    <span className="text-lg font-semibold text-foreground">
                      {title}
                    </span>
                  </div>
                )}
              </motion.div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left">
            <div className="space-y-8">
              <div className="space-y-4">
                <Overline>{eyebrow}</Overline>
                <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  {title}
                </h2>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>

              {benefits.length > 0 ? (
                <div className="space-y-4">
                  {benefits.map((benefit) => (
                    <div key={benefit} className="flex items-start gap-3">
                      <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Check className="h-4 w-4" />
                      </div>
                      <p className="text-sm leading-relaxed text-foreground/78 md:text-base">
                        {benefit}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}

              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-5 flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-2 text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      Download anfordern
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Trage deine Daten ein. Der Download-Link kommt direkt per
                      E-Mail.
                    </p>
                  </div>
                </div>

                {leadForm()}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <WhitepaperSuccessDialog
        open={isSubmitted}
        onOpenChange={setIsSubmitted}
        title={successTitle}
        description={successDescription}
      />
    </section>
  );
}
