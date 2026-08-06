"use client";

import { Reveal } from "@/components/ui/Reveal";
import { usePrefs } from "@/lib/prefs";

/**
 * How the product is made — intake to container.
 *
 * The order carries the meaning here, so this is a real <ol> and the numerals
 * stay visible rather than being decoration. The track is one hairline per row
 * with each numeral knocked out of it in paper; below `sm` the same hairline
 * stands up and runs down the start edge of the column.
 *
 * Nothing is positioned with left/right — the rule is drawn with `start`/`end`
 * insets and the numerals sit in a flex column aligned to the cross-axis start,
 * so the whole sequence reverses under RTL without a second code path. The
 * reveal stagger follows DOM order, which means it reads outward from the first
 * step in either direction.
 */
export function Process() {
  const { t } = usePrefs();
  const { eyebrow, title, lede, steps } = t.process;

  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="u-section scroll-mt-24 bg-paper"
    >
      <div className="u-container">
        <Reveal>
          <header className="grid items-end gap-x-10 gap-y-5 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="u-label">{eyebrow}</p>
              <h2 id="process-title" className="u-display u-display-md mt-4">
                {title}
              </h2>
            </div>
            <p className="u-measure text-ink-soft lg:col-span-5">{lede}</p>
          </header>
        </Reveal>

        <ol className="mt-14 grid grid-cols-1 gap-x-0 gap-y-0 sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.k}>
              {/* Stagger stays under ~300ms end to end, per Reveal's note. */}
              <Reveal delay={i * 55} className="flex gap-x-4 sm:block">
                <div className="relative flex w-11 shrink-0 flex-col items-center sm:w-full sm:items-start">
                  {/* The track. Cells sit flush (no column gap), so the row's
                      segments join into one continuous hairline. */}
                  <span
                    aria-hidden="true"
                    className="absolute start-1/2 top-0 bottom-0 w-px bg-line sm:start-0 sm:end-0 sm:top-1/2 sm:bottom-auto sm:h-px sm:w-auto"
                  />
                  <span className="relative inline-block bg-paper pb-3 font-mono text-3xl leading-none tabular-nums text-ink-soft sm:pb-0 sm:pe-5 sm:text-4xl">
                    {step.k}
                  </span>
                </div>

                <div
                  className={`${
                    i === steps.length - 1 ? "pb-0" : "pb-12"
                  } sm:pt-7 sm:pb-0 sm:pe-8`}
                >
                  <h3 className="u-display u-display-sm">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
