import type { Locale } from "@/lib/dictionary";

const AR_DIGITS = "٠١٢٣٤٥٦٧٨٩";

/**
 * Renders a number the way the page's language writes it. Arabic-Indic digits
 * and the Arabic decimal separator in Arabic; the string untouched in English.
 * Phone numbers, barcodes and product slugs are never passed through here —
 * they are set `dir="ltr"` and read the same in both editions.
 */
export function localiseDigits(value: string | number, locale: Locale): string {
  const text = String(value);
  if (locale !== "ar") return text;
  return text.replace(/\d/g, (d) => AR_DIGITS[Number(d)]).replace(".", "٫");
}

/** Two-digit index, 01 / ٠١, for lists whose copy carries no ordinal of its own. */
export function ordinal(n: number, locale: Locale): string {
  return localiseDigits(String(n).padStart(2, "0"), locale);
}
