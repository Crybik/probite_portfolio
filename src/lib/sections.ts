/**
 * The page's sections, in document order. Each id is both the anchor on the
 * page and the key of its label in the dictionary's `nav` block.
 */
export const SECTION_IDS = [
  "range",
  "house",
  "business",
  "partners",
  "profile",
  "process",
  "controls",
  "contact",
] as const;

/** What fits in the header bar at `lg`. The mobile panel and the footer list everything. */
export const BAR_IDS = [
  "range",
  "house",
  "business",
  "partners",
  "profile",
  "contact",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];
