"use client";

import { Reveal } from "@/components/ui/Reveal";
import { usePrefs } from "@/lib/prefs";

/**
 * Partners & brands.
 *
 * Two registers. The names — the company's own label and the restaurant
 * chains it supplies — are set as cards, name in display type, because a name
 * is the whole point of the card. There is no partner artwork on file, so the
 * names are typeset rather than badged; a wordmark can replace the heading
 * later without touching the layout.
 *
 * Under them, the three ways of working together — agencies, partnerships,
 * franchise supply — as the same ruled enumeration the rest of the page uses.
 */
export function Partners() {
  const { t } = usePrefs();
  const { eyebrow, title, lede, brandsTitle, brands, modelsTitle, models } =
    t.partners;
  const last = models.length - 1;

  return (
    <section
      id="partners"
      aria-labelledby="partners-title"
      className="scroll-mt-24 border-y border-line bg-surface-sunk"
    >
      <div className="u-container u-section">
        <Reveal>
          <header className="grid items-end gap-x-10 gap-y-5 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="u-label">{eyebrow}</p>
              <h2 id="partners-title" className="u-display u-display-md mt-4">
                {title}
              </h2>
            </div>
            <p className="u-measure text-ink-soft lg:col-span-5">{lede}</p>
          </header>
        </Reveal>

        <Reveal className="mt-14 md:mt-20">
          <h3 className="u-label">{brandsTitle}</h3>
        </Reveal>
        <ul className="mt-4 grid gap-4 md:grid-cols-3">
          {brands.map((brand, i) => (
            <li key={brand.name}>
              <Reveal delay={i * 60} className="u-card h-full">
                <div className="u-ticks" aria-hidden="true" />
                <div className="p-6 sm:p-7">
                  <p className="u-label">{brand.role}</p>
                  {/* Latin wordmarks, so the name keeps its own direction. */}
                  <p className="u-display u-display-sm mt-4" dir="ltr">
                    {brand.name}
                  </p>
                  <p className="mt-4 text-ink-soft">{brand.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-16 md:mt-24">
          <div className="u-rule-strong pt-5">
            <h3 className="u-label">{modelsTitle}</h3>
          </div>
        </Reveal>
        <div className="grid gap-y-8 md:grid-cols-3 md:gap-y-0">
          {models.map((model, i) => (
            <Reveal
              key={model.k}
              delay={60 + i * 60}
              className={[
                "pt-6",
                i > 0 &&
                  "border-t border-line md:border-t-0 md:border-s md:ps-8 lg:ps-12",
                i < last && "md:pe-8 lg:pe-12",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <p className="u-mono text-ink-soft">{model.k}</p>
              <h4 className="u-display u-display-sm mt-4">{model.title}</h4>
              <p className="mt-3 text-ink-soft">{model.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
