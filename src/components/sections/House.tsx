"use client";

import { Reveal } from "@/components/ui/Reveal";
import { usePrefs } from "@/lib/prefs";

/**
 * The about section.
 *
 * Set like the head of a manifest: a hairline, a label, then the claim held
 * to the start column with the prose sitting away from it on the far side of
 * the grid. The principal activity is stated once, in the mono voice, under
 * the heading — it is the one line a reader should be able to quote.
 *
 * The three pillars below are a real enumeration — import, distribute, own
 * brand — so their numbers are printed, not decorative. They arrive already
 * localised (01 / ٠١) and are rendered exactly as given. Vision and mission
 * close the section as a ruled pair.
 *
 * The columns are divided by border-s rather than border-l, so the rules land
 * on the correct edge when the page flips to Arabic. Below `md` the row stacks
 * and the same divisions become horizontal hairlines.
 */
export function House() {
  const { t } = usePrefs();
  const { eyebrow, title, activityLabel, activity, body, pillars, vision, mission } =
    t.house;
  const lastPillar = pillars.length - 1;

  return (
    <section
      id="house"
      aria-labelledby="house-title"
      className="u-section scroll-mt-24"
    >
      <div className="u-container">
        <Reveal>
          <div className="u-rule pt-4">
            <p className="u-label">{eyebrow}</p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-x-8 gap-y-8 lg:mt-16 lg:grid-cols-12 lg:gap-x-16">
          <Reveal delay={60} className="lg:col-span-5">
            <h2 id="house-title" className="u-display u-display-md">
              {title}
            </h2>
            <dl className="mt-8 border-t border-line-strong pt-4">
              <dt className="u-label">{activityLabel}</dt>
              <dd className="u-mono mt-2 text-ink">{activity}</dd>
            </dl>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-6 lg:col-start-7">
            <div className="u-measure space-y-5 text-ink-soft">
              {body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="u-rule mt-14 grid gap-y-8 md:mt-20 md:grid-cols-3 md:gap-y-0">
          {pillars.map((pillar, i) => (
            <Reveal
              key={pillar.k}
              delay={160 + i * 60}
              className={[
                "pt-8",
                i > 0 &&
                  "border-t border-line md:border-t-0 md:border-s md:ps-8 lg:ps-12",
                i < lastPillar && "md:pe-8 lg:pe-12",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <p className="u-mono text-ink-soft">{pillar.k}</p>
              <h3 className="u-display u-display-sm mt-4">{pillar.title}</h3>
              <p className="mt-3 text-ink-soft">{pillar.body}</p>
            </Reveal>
          ))}
        </div>

        {/* Vision and mission: two statements, ruled off and set larger than
            body so they are read as commitments rather than as more prose. */}
        <div className="u-rule-strong mt-16 grid gap-y-10 md:mt-24 md:grid-cols-2 md:gap-y-0">
          {[vision, mission].map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 80}
              className={[
                "pt-8",
                i === 0 ? "md:pe-10 lg:pe-16" : "border-t border-line md:border-t-0 md:border-s md:ps-10 lg:ps-16",
              ].join(" ")}
            >
              <h3 className="u-label">{item.title}</h3>
              <p className="u-measure mt-4 text-[length:var(--step-1)] leading-relaxed text-ink">
                {item.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
