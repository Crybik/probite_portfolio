"use client";

import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { usePrefs } from "@/lib/prefs";

/**
 * The claims strip. Decorative repetition, so it is hidden from assistive
 * technology and holds nothing focusable — a screen reader that read this eight
 * times, then eight times again, would be reading the packaging out loud.
 */
export function Ticker() {
  const { t } = usePrefs();

  // Rendered twice on purpose: the keyframe travels exactly -50%, so at the
  // moment the loop wraps the second pass is sitting where the first began.
  const run = [...t.ticker, ...t.ticker];

  return (
    <div
      aria-hidden="true"
      className="u-marquee-host u-rule overflow-hidden border-b border-line bg-surface-sunk select-none"
    >
      <div
        className="u-marquee py-3.5"
        style={{ "--marquee-duration": "52s" } as React.CSSProperties}
      >
        {run.map((phrase, i) => (
          <span
            key={`${phrase}-${i}`}
            className={`${"u-mono"} flex shrink-0 items-center whitespace-nowrap text-ink-soft`}
          >
            {phrase}
            <span className="mx-[clamp(1.25rem,3.5vw,2.75rem)] text-line-strong">
              /
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * Off the label.
 *
 * Four numbers, ruled apart rather than boxed, sitting under the one sentence
 * that makes them worth printing: they are all transcribed off the pack. The
 * disclaimer is set beside the heading, at the width of the heading block, so it
 * is read before the figures rather than after them.
 */
export function Figures() {
  const { t } = usePrefs();
  const { eyebrow, title, note, items } = t.figures;

  return (
    <section
      id="figures"
      aria-labelledby="figures-title"
      className="u-section bg-paper"
    >
      <div className="u-container">
        <Reveal>
          <div className="grid gap-x-10 gap-y-7 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className={"u-label"}>{eyebrow}</p>
              <h2 id="figures-title" className="u-display u-display-md mt-4">
                {title}
              </h2>
            </div>
            {/* Sentence case, not `.u-mono`: this is the honest caveat under
                every number below, and it has to be read, not scanned. */}
            <p
              className={`u-measure border-s border-line-strong ps-5 text-[0.86rem] leading-relaxed text-ink-soft md:col-span-5 md:self-end font-mono`}
            >
              {note}
            </p>
          </div>
        </Reveal>

        {/* Hairlines, not boxes: one strong rule opens the table, and each cell
            carries only the rule it needs at that breakpoint. */}
        <dl className="u-rule-strong mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const unit = item.suffix.trim();
            return (
              <Reveal
                key={item.label}
                delay={i * 80}
                className={[
                  "flex flex-col gap-3 border-line py-9 pe-6",
                  i > 0 ? "border-t" : "",
                  i === 1 ? "sm:border-t-0" : "",
                  i % 2 === 1 ? "sm:border-s sm:ps-6" : "",
                  i > 0 ? "lg:border-s lg:border-t-0 lg:ps-8" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {/* Term before description in the DOM, reversed by `order` for
                    the eye: the figure reads big first, the label is what a
                    screen reader announces first. */}
                <dt className="order-2 max-w-[26ch] text-[0.95rem] leading-snug text-ink-soft">
                  {item.label}
                </dt>
                <dd className="order-1 flex items-baseline">
                  <span className="u-display u-display-md tabular-nums text-ink">
                    <CountUp value={item.value} decimals={i === 0 ? 2 : 0} />
                  </span>
                  {unit ? (
                    <span className={`${"u-mono"} ms-2 text-ink-soft`}>
                      {unit}
                    </span>
                  ) : null}
                </dd>
              </Reveal>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
