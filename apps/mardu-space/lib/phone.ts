const E164_PATTERN = /^\+[1-9]\d{6,14}$/;

/**
 * Normalizes only international phone numbers.
 * Local formats without country code are rejected to keep the API contract explicit.
 */
export function normalizePhoneNumber(value?: string | null): string | undefined {
  if (value == null) return undefined;

  const trimmed = value.trim();
  if (!trimmed) return undefined;

  const collapsed = trimmed.replace(/[().\-/\s]+/g, '');
  const prefixed = collapsed.startsWith('00') ? `+${collapsed.slice(2)}` : collapsed;

  return E164_PATTERN.test(prefixed) ? prefixed : undefined;
}
