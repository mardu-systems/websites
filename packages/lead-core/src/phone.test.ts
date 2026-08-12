import { describe, expect, it } from "bun:test";
import { normalizePhoneNumber } from "./phone";

describe("normalizePhoneNumber", () => {
  it("normalizes German local numbers to E.164", () => {
    expect(normalizePhoneNumber("0721 25510624")).toBe("+4972125510624");
  });

  it("accepts international prefixes with 00", () => {
    expect(normalizePhoneNumber("0049 721 25510624")).toBe("+4972125510624");
  });

  it("returns undefined for empty or invalid input", () => {
    expect(normalizePhoneNumber("  ")).toBeUndefined();
    expect(normalizePhoneNumber("keine Telefonnummer")).toBeUndefined();
  });
});
