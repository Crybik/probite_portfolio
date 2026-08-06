"use client";

import { Reveal } from "@/components/ui/Reveal";
import { usePrefs } from "@/lib/prefs";

/* The house and process sections carry their own `k` ordinals in the dictionary
   (01 / ٠١). The controls copy does not, so the index is derived here rather
   than invented as content — it stays a typographic marker, not a claim. */
const AR_DIGITS = "٠١٢٣٤٥٦٧٨٩";

function ordinal(n: number, arabic: boolean) {
  const western = String(n).padStart(2, "0");
  if (!arabic) return western;
  return western.replace(/[0-9]/g, (d) => AR_DIGITS[Number(d)]);
}

/* Hairline separators instead of boxes. Every cell rules off the top; the
   vertical rule only appears once a cell is no longer first in its row, which
   differs between the 2-up and 3-up grids — hence one class per breakpoint.
   `border-s` / `ps-*` are logical, so the whole lattice flips under RTL. */
function cellClass(i: number) {
  return [
    "border-t border-white/15 py-8 sm:pe-8 lg:py-10",
    i % 2 === 0 ? "sm:border-s-0 sm:ps-0" : "sm:border-s sm:ps-8",
    i % 3 === 0 ? "lg:border-s-0 lg:ps-0" : "lg:border-s lg:ps-8",
  ].join(" ");
}

/**
 * The one dark band in the middle of the page — the inside cover of the spec
 * document. The ground is fixed midnight in both themes, so nothing here reads
 * from --ink; the type is stated in explicit whites.
 */
export function Controls() {
  const { t, locale } = usePrefs();
  const arabic = locale === "ar";
  const { eyebrow, title, lede, items } = t.controls;

  return (
    <section
      id="controls"
      aria-labelledby="controls-title"
      className="u-on-dark u-grain relative bg-midnight"
    >
      <div className="u-container u-section">
        <Reveal>
          <div className="grid gap-x-10 gap-y-8 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p
                className="u-label"
                style={{ color: "rgb(255 255 255 / 0.7)" }}
              >
                {eyebrow}
              </p>
              <h2
                id="controls-title"
                className="u-display u-display-md mt-4 text-white"
              >
                {title}
              </h2>
            </div>

            {/* The lede is the invitation to go and check the pack, so it is
                given weight rather than tucked under the heading. */}
            <p className="u-measure border-s-2 border-kraft ps-5 text-[length:var(--step-1)] leading-relaxed text-white lg:col-span-6 lg:self-end">
              {lede}
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 45}
              className={cellClass(i)}
            >
              <p className="u-mono text-white/60" aria-hidden="true">
                {ordinal(i + 1, arabic)}
              </p>
              <h3 className="mt-3 text-[length:var(--step-1)] font-semibold text-white">
                {item.title}
              </h3>
              <p className="u-measure mt-3 text-white/70">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
