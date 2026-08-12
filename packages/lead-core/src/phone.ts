import { parsePhoneNumberFromString } from "libphonenumber-js";

/**
 * Normalizes user-entered phone numbers to E.164 for APIs and CRM integrations.
 * German local numbers are accepted; invalid or empty input returns `undefined`.
 */
export function normalizePhoneNumber(
  raw: string | undefined,
): string | undefined {
  const trimmed = raw?.trim();
  if (!trimmed) return undefined;

  const normalizedInput = trimmed.startsWith("00")
    ? `+${trimmed.slice(2)}`
    : trimmed;
  const parsed = normalizedInput.startsWith("+")
    ? parsePhoneNumberFromString(normalizedInput)
    : parsePhoneNumberFromString(normalizedInput, "DE");

  return parsed?.isValid() ? parsed.number : undefined;
}
