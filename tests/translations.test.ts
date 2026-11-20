import { describe, expect, it } from "vitest";
import { translations } from "@/lib/translations";

// Components pair translation arrays with their own per-index data (tags,
// links, filters), so every language must have exactly the shape of English.
function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, shape(v)]));
  }
  return typeof value;
}

describe("translations", () => {
  const reference = shape(translations.en);

  for (const lang of ["de", "fr"] as const) {
    it(`${lang} has the same keys and array lengths as en`, () => {
      expect(shape(translations[lang])).toEqual(reference);
    });
  }

  it("has no empty strings", () => {
    const empty: string[] = [];
    const walk = (value: unknown, path: string) => {
      if (typeof value === "string" && value.trim() === "") empty.push(path);
      else if (value && typeof value === "object") {
        for (const [k, v] of Object.entries(value)) walk(v, `${path}.${k}`);
      }
    };
    walk(translations, "translations");
    expect(empty).toEqual([]);
  });
});
