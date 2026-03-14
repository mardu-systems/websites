import { parsePhoneNumberFromString } from 'libphonenumber-js';

/**
 * Normalizes user-entered phone numbers to E.164 for CRM integrations.
 * Uses libphonenumber-js with Germany as default country for local input.
 */
export function normalizePhoneNumber(raw: string | undefined): string | undefined {
  const trimmed = raw?.trim();
  if (!trimmed) {
    return undefined;
  }

  const normalizedInput = trimmed.startsWith('00') ? `+${trimmed.slice(2)}` : trimmed;
  const parsed = normalizedInput.startsWith('+')
    ? parsePhoneNumberFromString(normalizedInput)
    : parsePhoneNumberFromString(normalizedInput, 'DE');

  if (!parsed?.isValid()) {
    return undefined;
  }

  return parsed.number;
}
