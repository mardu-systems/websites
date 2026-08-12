"use client";

import type { KeyboardEvent } from "react";
import Link from "next/link";
import type { UseFormReturn } from "react-hook-form";
import { Checkbox } from "@mardu/ui/components/checkbox";
import { Textarea } from "@mardu/ui/components/textarea";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@mardu/ui/components/form";
import type { ContactValues } from "./contact-form";

const INPUT_CLASSES =
  "w-full rounded-none border-0 border-b border-neutral-800/70 bg-transparent px-0 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-mardu-purple focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mardu-purple focus-visible:ring-0";
const TEXTAREA_CLASSES =
  "w-full min-h-28 rounded-none border-0 border-b border-neutral-800/70 bg-transparent px-0 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-mardu-purple focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mardu-purple focus-visible:ring-0";

type ContactFormFieldsProps = {
  consentId: string;
  form: UseFormReturn<ContactValues>;
  newsletterId: string;
  onTextareaKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
};

export function ContactFormFields({
  consentId,
  form,
  newsletterId,
  onTextareaKeyDown,
}: ContactFormFieldsProps) {
  return (
    <>
      <div className="contact-form-group--identity grid gap-6 sm:grid-cols-2 sm:gap-8">
        <TrimmedTextField
          form={form}
          name="name"
          label="Name*"
          placeholder="Max Mustermann"
          autoComplete="name"
          className="contact-form-field--name"
        />
        <TrimmedTextField
          form={form}
          name="email"
          label="E-Mail*"
          placeholder="name@beispiel.de"
          autoComplete="email"
          type="email"
          className="contact-form-field--email"
        />
      </div>

      <TrimmedTextField
        form={form}
        name="company"
        label="Firma (optional)"
        placeholder="Dein Unternehmen"
        autoComplete="organization"
        className="contact-form-field--company"
      />

      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem className="contact-form-field--phone">
            <FormLabel>Telefon</FormLabel>
            <FormControl>
              <input
                type="tel"
                {...field}
                placeholder="+49 1520 2189213"
                autoComplete="tel"
                inputMode="tel"
                autoCorrect="off"
                spellCheck={false}
                className={INPUT_CLASSES}
                onBlur={(event) => {
                  field.onChange(event.target.value.trim());
                  field.onBlur();
                }}
              />
            </FormControl>
            <FormDescription>
              Optional. Bitte im internationalen Format, z. B.{" "}
              <code>+4915202189213</code>.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="message"
        render={({ field }) => (
          <FormItem className="contact-form-field--message">
            <FormLabel>Nachricht</FormLabel>
            <FormControl>
              <Textarea
                rows={3}
                {...field}
                placeholder="Deine Nachricht …"
                className={TEXTAREA_CLASSES}
                onBlur={(event) => {
                  field.onChange(event.target.value.trim());
                  field.onBlur();
                }}
                onKeyDown={onTextareaKeyDown}
              />
            </FormControl>
            <FormDescription>
              Optional. Beschreibe kurz dein Vorhaben oder deine Frage.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="newsletterOptIn"
        render={({ field }) => (
          <FormItem className="contact-form-field--newsletter">
            <div className="flex items-start gap-3">
              <FormControl>
                <Checkbox
                  id={newsletterId}
                  checked={field.value}
                  onCheckedChange={(checked: boolean | "indeterminate") =>
                    field.onChange(checked === true)
                  }
                  name={field.name}
                  className="mt-0.5 touch-manipulation"
                />
              </FormControl>
              <div className="flex-1">
                <FormLabel
                  htmlFor={newsletterId}
                  className="cursor-pointer text-sm leading-5"
                >
                  Ich möchte zusätzlich Produkt- und Update-Informationen per
                  E-Mail erhalten.
                </FormLabel>
                <FormDescription className="mt-1 text-xs text-muted-foreground">
                  Deine Daten werden für den Newsletter genutzt. Anmeldung per
                  Double-Opt-in mit Bestätigungs-E-Mail. Details in der{" "}
                  <Link
                    href="/privacy"
                    className="underline underline-offset-2"
                  >
                    Datenschutzerklärung
                  </Link>
                  .
                </FormDescription>
                <FormMessage />
              </div>
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="consent"
        render={({ field }) => (
          <FormItem className="contact-form-field--consent">
            <div className="flex items-start gap-3">
              <FormControl>
                <Checkbox
                  id={consentId}
                  checked={field.value}
                  onCheckedChange={(checked) =>
                    field.onChange(checked === true)
                  }
                  className="mt-0.5"
                />
              </FormControl>
              <div className="flex-1">
                <FormLabel
                  htmlFor={consentId}
                  className="cursor-pointer text-sm leading-5 after:ml-0.5 after:text-destructive after:content-['*']"
                >
                  Ich stimme zu, dass meine Angaben zur Beantwortung meiner
                  Anfrage verarbeitet werden.
                </FormLabel>
                <FormDescription className="mt-1 text-xs text-muted-foreground">
                  Deine Daten werden gemäß DSGVO verarbeitet und nicht an Dritte
                  weitergegeben.
                </FormDescription>
                <FormMessage />
              </div>
            </div>
          </FormItem>
        )}
      />
    </>
  );
}

function TrimmedTextField({
  autoComplete,
  className,
  form,
  label,
  name,
  placeholder,
  type = "text",
}: {
  autoComplete: string;
  className: string;
  form: UseFormReturn<ContactValues>;
  label: string;
  name: "company" | "email" | "name";
  placeholder: string;
  type?: "email" | "text";
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <input
              type={type}
              {...field}
              placeholder={placeholder}
              autoComplete={autoComplete}
              inputMode={type === "email" ? "email" : undefined}
              autoCapitalize={type === "email" ? "none" : "words"}
              autoCorrect={type === "email" ? "off" : undefined}
              spellCheck={type === "email" ? false : undefined}
              className={INPUT_CLASSES}
              onBlur={(event) => {
                field.onChange(event.target.value.trim());
                field.onBlur();
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
