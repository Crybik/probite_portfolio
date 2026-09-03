"use client";

import { Reveal } from "@/components/ui/Reveal";
import { usePrefs } from "@/lib/prefs";
import { ordinal } from "@/lib/digits";

/**
 * The company profile, reproduced in full.
 *
 * Laid out as the document it is: a heading column that stays put while the
 * text scrolls, and on the other side one ruled row per section of the
 * profile — label in the margin, paragraphs beside it — so a reader can find
 * "Business model" the way they would in the printed version. The copy is the
 * profile's own wording, edited only for the site's spelling of the name.
 */
export function Profile() {
  const { t, locale } = usePrefs();
  const { eyebrow, title, lede, blocks } = t.profile;

  return (
    <section
      id="profile"
      aria-labelledby="profile-title"
      className="u-section scroll-mt-24 bg-paper"
    >
      <div className="u-container">
        <div className="grid gap-x-12 gap-y-12 lg:grid-cols-12 lg:gap-x-16">
          <Reveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="u-label">{eyebrow}</p>
              <h2 id="profile-title" className="u-display u-display-md mt-4">
                {title}
              </h2>
              <p className="u-measure mt-6 text-ink-soft">{lede}</p>
            </div>
          </Reveal>

          <div className="lg:col-span-8">
            <div className="u-rule-strong" aria-hidden="true" />
            {blocks.map((block, i) => (
              <Reveal
                key={block.title}
                delay={Math.min(i * 40, 160)}
                className="grid gap-x-8 gap-y-3 border-b border-line py-8 md:grid-cols-[11rem_minmax(0,1fr)]"
              >
                <h3 className="u-label md:pt-1.5">{block.title}</h3>
                <div className="space-y-4 text-ink-soft">
                  {block.paragraphs.map((paragraph, j) => (
                    <p key={j} className="u-measure">
                      {paragraph}
                    </p>
                  ))}
                  {block.list ? (
                    <ol className="u-measure border-t border-line pt-1">
                      {block.list.map((item, j) => (
                        <li
                          key={item}
                          className="flex items-baseline gap-4 border-b border-line py-2.5 text-ink"
                        >
                          <span
                            className="u-mono shrink-0 text-ink-soft"
                            aria-hidden="true"
                          >
                            {ordinal(j + 1, locale)}
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ol>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
