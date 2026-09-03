"use client";

import Image from "next/image";
import { useMemo, useState, type CSSProperties } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { CATEGORIES, LINE_CLASSES, PRODUCTS } from "@/lib/products";
import { useBi, usePrefs } from "@/lib/prefs";
import { localiseDigits } from "@/lib/digits";

/** Indices and counts follow the numerals already printed in the data. */
function figures(value: string | number, arabic: boolean) {
  return localiseDigits(value, arabic ? "ar" : "en");
}

/**
 * The taste dots fill in when their record scrolls up.
 *
 * Scoped to `[data-js]` exactly like the reveal in globals.css, so a visitor
 * without JavaScript gets fully filled meters rather than three empty rows —
 * the animation decorates a correct reading, it never produces it. The stagger
 * is a per-dot custom property, so this is one transition and no timers.
 */
const METER_CSS = `
.rg-dot{transition:opacity .5s ease,transform .5s cubic-bezier(.22,1,.36,1);transition-delay:var(--rg-delay,0ms)}
[data-js] .u-reveal:not(.u-reveal-in) .rg-dot{opacity:0;transform:scale(.35)}
@media (prefers-reduced-motion:reduce){
[data-js] .u-reveal:not(.u-reveal-in) .rg-dot{opacity:1;transform:none}
}`;

/**
 * The range — the catalogue, and the centre of the page.
 *
 * Each product is a manifest row rather than a tile in a shop grid: the jar on
 * one side, the label transcribed as a spec table on the other, alternating
 * down the page. The only colour a product is allowed to put on the page is its
 * line marker — the meter dots and one short rule. Everything else stays paper,
 * ink and hairline.
 */
export function Range() {
  const { t, locale } = usePrefs();
  const bi = useBi();
  const arabic = locale === "ar";
  const [filter, setFilter] = useState<string>("all");

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: PRODUCTS.length };
    for (const product of PRODUCTS) {
      map[product.categoryId] = (map[product.categoryId] ?? 0) + 1;
    }
    return map;
  }, []);

  const visible = useMemo(
    () =>
      filter === "all"
        ? PRODUCTS
        : PRODUCTS.filter((product) => product.categoryId === filter),
    [filter],
  );

  const total = figures(String(visible.length).padStart(2, "0"), arabic);

  return (
    <section id="range" aria-labelledby="range-title" className="u-section">
      <style href="marasi-range-meters" precedence="medium">
        {METER_CSS}
      </style>

      <div className="u-container">
        <Reveal>
          <header className="u-rule-strong pt-5">
            <p className="u-label">{t.range.eyebrow}</p>
            <h2
              id="range-title"
              className="u-display u-display-lg u-measure mt-6"
            >
              {t.range.title}
            </h2>
            <p className="u-measure mt-6 text-ink-soft">{t.range.lede}</p>
          </header>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-line pt-5">
            <span id="range-filter" className="u-label">
              {t.range.filterLabel}
            </span>
            <div
              role="group"
              aria-labelledby="range-filter"
              className="flex flex-wrap gap-2"
            >
              {CATEGORIES.map((category) => {
                const active = category.id === filter;
                return (
                  <button
                    key={category.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setFilter(category.id)}
                    className={`u-mono flex items-baseline gap-2 border px-3 py-2 leading-none transition-colors ${
                      active
                        ? "border-ink bg-ink text-paper"
                        : "border-line text-ink-soft hover:border-line-strong hover:text-ink"
                    }`}
                  >
                    {bi(category.label)}
                    <span className="opacity-60">
                      {figures(
                        String(counts[category.id] ?? 0).padStart(2, "0"),
                        arabic,
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="u-ticks mt-5" aria-hidden="true" />
        </Reveal>

        {visible.length === 0 ? (
          <p className="u-mono mt-16 border-t border-line pt-10 text-ink-soft">
            {t.range.empty}
          </p>
        ) : (
          <div className="mt-16 flex flex-col gap-24 lg:gap-32">
            {visible.map((product, index) => {
              const flip = index % 2 === 1;
              const marker = LINE_CLASSES[product.color];
              const position = figures(
                String(index + 1).padStart(2, "0"),
                arabic,
              );

              return (
                <Reveal key={product.id}>
                  <article className="u-rule-strong pt-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                      <p className="u-mono">
                        {position}
                        <span className="text-ink-soft"> / {total}</span>
                      </p>
                      <p className="u-mono text-ink-soft">
                        {bi(product.category)}
                      </p>
                    </div>

                    <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12 lg:items-start">
                      {/* The jars were shot on a near-white sweep, so the plate
                          stays white in both themes and the cut-out has no seam. */}
                      <figure
                        className={`lg:col-span-5 ${
                          flip ? "lg:order-2" : "lg:order-1"
                        }`}
                      >
                        <div className="border border-line bg-surface p-6 sm:p-10 dark:bg-white">
                          <div className="relative aspect-[4/5]">
                            <Image
                              src={product.image}
                              alt={`${bi(product.name)} — ${bi(product.variant)}`}
                              width={product.width}
                              height={product.height}
                              sizes="(min-width: 1024px) 38vw, (min-width: 640px) 70vw, 88vw"
                              priority={false}
                              className="h-full w-full object-contain"
                            />
                          </div>
                        </div>
                        <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-line pt-3">
                          <span className="u-mono text-ink-soft" dir="ltr">
                            {product.slug}
                          </span>
                          <a
                            href={product.image}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${t.range.viewSpec} — ${bi(product.name)}`}
                            className="u-mono text-ink-soft underline underline-offset-4 transition-colors hover:text-ink"
                          >
                            {t.range.viewSpec}
                          </a>
                        </figcaption>
                      </figure>

                      <div
                        className={`lg:col-span-7 ${
                          flip ? "lg:order-1" : "lg:order-2"
                        }`}
                      >
                        <div
                          className={`h-[2px] w-14 ${marker.rule}`}
                          aria-hidden="true"
                        />
                        <h3 className="u-display u-display-md mt-6">
                          {bi(product.name)}
                        </h3>
                        <p className="u-mono mt-3 text-ink-soft">
                          {bi(product.variant)}
                        </p>
                        <p className="u-measure mt-6 text-ink-soft">
                          {bi(product.blurb)}
                        </p>

                        <ul className="mt-7 flex flex-wrap gap-2">
                          {product.badges.map((badge) => (
                            <li
                              key={badge.en}
                              className="u-mono border border-line px-2.5 py-1.5 leading-none text-ink-soft"
                            >
                              {bi(badge)}
                            </li>
                          ))}
                        </ul>

                        <div className="mt-10">
                          <h4 className="u-label">{t.range.specsTitle}</h4>
                          <dl className="mt-3 border-t border-line-strong">
                            {product.specs.map((spec) => (
                              <div
                                key={spec.label.en}
                                className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-6 border-b border-line py-3"
                              >
                                <dt className="text-sm text-ink-soft">
                                  {bi(spec.label)}
                                </dt>
                                <dd className="u-mono text-end text-ink">
                                  {bi(spec.value)}
                                </dd>
                              </div>
                            ))}
                          </dl>
                        </div>

                        <div className="mt-10">
                          <h4 className="u-label">{t.range.metersTitle}</h4>
                          <ul className="mt-3">
                            {product.meters.map((meter, meterIndex) => (
                              <li
                                key={meter.label.en}
                                className="border-b border-line py-3"
                              >
                                <div
                                  role="img"
                                  aria-label={`${bi(meter.label)} ${figures(
                                    meter.value,
                                    arabic,
                                  )}/${figures(meter.of, arabic)}`}
                                  className="flex items-center justify-between gap-6"
                                >
                                  <span className="u-mono text-ink-soft">
                                    {bi(meter.label)}
                                  </span>
                                  <span className="flex items-center gap-1.5">
                                    {Array.from({ length: meter.of }).map(
                                      (_, dot) =>
                                        dot < meter.value ? (
                                          <span
                                            key={dot}
                                            className={`rg-dot size-2.5 rounded-full ${marker.dot}`}
                                            style={
                                              {
                                                "--rg-delay": `${
                                                  meterIndex * 90 + dot * 70
                                                }ms`,
                                              } as CSSProperties
                                            }
                                          />
                                        ) : (
                                          <span
                                            key={dot}
                                            className="size-2.5 rounded-full border border-line-strong"
                                          />
                                        ),
                                    )}
                                  </span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {product.pairing ? (
                          <div className="mt-10">
                            <h4 className="u-label">{t.range.pairingTitle}</h4>
                            <p className="u-measure mt-3 text-ink-soft">
                              {bi(product.pairing)}
                            </p>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
