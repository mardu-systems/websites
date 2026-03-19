// @ts-nocheck
type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | ClassValue[]
  | Record<string, boolean | null | undefined>;

function flattenClassValue(value: ClassValue, output: string[]) {
  if (!value) {
    return;
  }

  if (typeof value === 'string' || typeof value === 'number') {
    output.push(String(value));
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item) => flattenClassValue(item, output));
    return;
  }

  if (typeof value === 'object') {
    for (const [key, enabled] of Object.entries(value)) {
      if (enabled) {
        output.push(key);
      }
    }
  }
}

export function cn(...inputs: ClassValue[]) {
  const output: string[] = [];
  inputs.forEach((input) => flattenClassValue(input, output));
  return output.join(' ');
}
