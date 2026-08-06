# Marasi Al-Arz — portfolio site

A marketing site for **Marasi Al-Arz**, a food manufacturer and exporter, and
its food-service brand **ProBite**.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4.

```bash
npm run dev
```

Then open <http://localhost:3000>.

---

## Design direction

**"Export manifest."** The identity comes from two artefacts that were supplied
rather than invented: the anchor stamp, which is a trading-house mark in a single
charcoal, and a photograph of the plant at blue hour with a palletised order
standing outside it.

The palette is taken from that photograph — midnight navy, kraft cardboard, warm
concrete grey, charcoal ink on warm paper. It is deliberately quiet. **The
saturated colour in this brand belongs to the products, and it stays inside the
photographs**: ProBite red, pickle green and cheddar orange never appear in page
chrome. Dark mode is the blue hour itself, which is why the hero image meets the
page with no seam.

Structure follows the packaging, which already speaks in data: net and drained
weights, servings, nutrition per 100 g, E-numbers, barcodes. Sections are laid
out as spec-sheet rows — mono-set values, hairline rules, real enumerations.

### Type

One grotesque carries display and body. **Archivo** is loaded as a variable font
with its `wdth` axis exposed, and headlines drive it narrow (`wdth 86`) to quote
the compressed caps of the Marasi wordmark — rather than introducing a second
Latin face. **IBM Plex Mono** is the manifest voice for weights, codes and
temperatures. Two families, four roles.

### Tokens

Defined once in `src/app/globals.css` under `@theme` (Tailwind v4 is CSS-first —
there is no `tailwind.config.ts`). Utility classes are prefixed `.u-`.

---

## What's where

| Path | |
|---|---|
| `src/app/globals.css` | design tokens + every `.u-` utility |
| `src/lib/dictionary.ts` | **all** copy — change wording here, not in components |
| `src/lib/products.ts` | product data transcribed from the physical labels |
| `src/lib/prefs.tsx` | theme context |
| `src/components/brand/` | the Marasi mark, generated from the source PDF |
| `src/components/sections/` | one file per page section |
| `visuals/` | the original supplied artwork (not served) |

## Assets

The logo arrived as a vector PDF and is **not** rasterised anywhere. It was
extracted to SVG and emitted as React components (`MarasiLockup`,
`MarasiAnchor`) so the mark inherits `currentColor` — one source serves the light
ground, the dark ground and the reversed footer.

The ProBite mark is keyed to true transparency. That is harder than it looks:
its white script overflows the red banner, so a corner flood fill travels down
the letters and hollows out the word. The key instead isolates the banner —
which is stepped, not convex, so it is reconstructed by filling each scanline
between its first and last red pixel — and protects everything inside it. The
result carries the white keyline the real mark has, as seen on the illuminated
sign on the factory wall.

To regenerate after an artwork change, re-run the scripts in `scripts/` noted at the top of
`src/components/brand/*.tsx`.

## Theme

Light is warm paper and charcoal; dark is the blue hour from the hero
photograph. The choice persists in `localStorage` and is applied by an inline
script before first paint, so there is no flash of the wrong theme.

The site is English only. `Locale`, `useBi()` and the Arabic label
transcriptions in `products.ts` are left in place so an Arabic edition can be
added later without redoing the data — but nothing renders anything but English.

## Accessibility

Reveal animations are armed only when JavaScript is present (`[data-js]`), so the
page is complete without it, and they are disabled under
`prefers-reduced-motion`. Icon-only controls carry labels, the form reports
errors through `aria-describedby`, and focus is always visible.

---

## Before this goes live

- **The contact form is a demo.** It validates and shows a success state entirely
  in the browser; nothing is transmitted. Wire it to a real endpoint or mail
  service. The form itself says so on screen.
- **`metadataBase`** in `src/app/layout.tsx` points at a placeholder domain.
- **Figures are label facts, not company statistics.** Everything in the
  "Off the label" band and every spec row is transcribed from the packaging in
  `visuals/`. No revenue, headcount, client or certification claims were invented
  — if you want claims like HACCP or ISO on the page, add them to
  `src/lib/dictionary.ts` once you can evidence them.
- **The "Bilingual labelling" claim** in the Standards section refers to the
  packaging, which genuinely is bilingual. The website is not.
- **Origin copy is parked.** All "Made in Jordan" lines were removed at the
  client's request; reintroduce them in `src/lib/dictionary.ts` when wanted.
- The company/brand relationship is presented as **Marasi Al-Arz is the house,
  ProBite is its food-service label**. Correct the copy in `dictionary.ts` if
  that is not the intended framing.
