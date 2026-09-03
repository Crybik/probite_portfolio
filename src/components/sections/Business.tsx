"use client";

import { Reveal } from "@/components/ui/Reveal";
import { usePrefs } from "@/lib/prefs";
import { ordinal } from "@/lib/digits";

/**
 * Our business — where the goods come from, where they go, who buys them.
 *
 * Three answers set as ruled columns, each closing with a short manifest of
 * its facts; then the principal activities as a numbered list in two columns,
 * the way a trade licence prints them. The `k` ordinals on the blocks come
 * localised from the dictionary; the activity numbers are derived here.
 */
export function Business() {
  const { t, locale } = usePrefs();
  const { eyebrow, title, lede, blocks, activitiesTitle, activities } = t.business;
  const last = blocks.length - 1;

  return (
    <section
      id="business"
      aria-labelledby="business-title"
      className="u-section scroll-mt-24 bg-paper"
    >
      <div className="u-container">
        <Reveal>
          <header className="grid items-end gap-x-10 gap-y-5 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="u-label">{eyebrow}</p>
              <h2 id="business-title" className="u-display u-display-md mt-4">
                {title}
              </h2>
            </div>
            <p className="u-measure text-ink-soft lg:col-span-5">{lede}</p>
          </header>
        </Reveal>

        <div className="u-rule mt-14 grid gap-y-10 md:mt-20 md:grid-cols-3 md:gap-y-0">
          {blocks.map((block, i) => (
            <Reveal
              key={block.k}
              delay={i * 60}
              className={[
                "pt-8",
                i > 0 &&
                  "border-t border-line md:border-t-0 md:border-s md:ps-8 lg:ps-12",
                i < last && "md:pe-8 lg:pe-12",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <p className="u-mono text-ink-soft">{block.k}</p>
              <h3 className="u-display u-display-sm mt-4">{block.title}</h3>
              <p className="mt-3 text-ink-soft">{block.body}</p>
              <ul className="mt-6 border-t border-line-strong">
                {block.points.map((point) => (
                  <li
                    key={point}
                    className="u-mono border-b border-line py-2.5 text-ink"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 md:mt-24">
          <div className="u-rule-strong pt-5">
            <h3 className="u-label">{activitiesTitle}</h3>
          </div>
          <ol className="mt-4 grid gap-x-12 sm:grid-cols-2">
            {activities.map((item, i) => (
              <li
                key={item}
                className="flex items-baseline gap-4 border-b border-line py-3.5"
              >
                <span className="u-mono shrink-0 text-ink-soft" aria-hidden="true">
                  {ordinal(i + 1, locale)}
                </span>
                <span className="text-ink">{item}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
