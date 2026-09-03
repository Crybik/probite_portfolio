"use client";

import Image from "next/image";
import { usePrefs } from "@/lib/prefs";
import { COMPANY } from "@/lib/products";
import { MarasiLockup } from "@/components/brand/MarasiLockup";

/**
 * The hero opens on the thing that actually explains the company: the plant at
 * blue hour with a palletised export order standing outside it. Manufacturing
 * and shipping in one frame.
 *
 * Type never sits on the photograph. The band behind the copy is the same
 * midnight as the sky in the shot, so the image starts without a seam and the
 * words stay on flat colour where they are always legible.
 */
export function Hero() {
  const { t, locale } = usePrefs();
  const brandName = locale === "ar" ? COMPANY.nameAr : COMPANY.nameEn;

  return (
    <section
      id="top"
      className="u-on-dark relative bg-midnight text-white"
      aria-labelledby="hero-title"
    >
      <div className="u-container pt-28 md:pt-36">
        <p className="u-label text-white/55">{t.hero.eyebrow}</p>

        <h1
          id="hero-title"
          className="u-display u-display-xl mt-6 max-w-[15ch] text-white"
        >
          {t.hero.headline}
        </h1>

        <div className="mt-10 grid gap-10 pb-12 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-16 md:pb-16">
          <div>
            <p className="u-measure text-base text-white/70 md:text-lg">
              {t.hero.lede}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#range" className="u-btn u-btn-solid">
                {t.hero.primary}
              </a>
              <a href="#contact" className="u-btn">
                {t.hero.secondary}
              </a>
            </div>
          </div>

          {/* The product brand, keyed to transparency and carrying the white
              keyline the real sign has, so it sits straight on the midnight. */}
          <figure className="shrink-0">
            <Image
              src="/brand/probite.png"
              alt="ProBite"
              width={1000}
              height={468}
              className="h-14 w-auto md:h-16"
              priority
            />
            <figcaption className="u-mono mt-4 text-white/50">
              {t.hero.labelCaption}
            </figcaption>
          </figure>
        </div>
      </div>

      <figure className="relative">
        <Image
          src="/factory-night.jpg"
          alt={
            locale === "ar"
              ? "مصنع مراسي الأرز ليلًا مع طلبية معبأة على منصة نقل"
              : "The Marasi Al-Arz plant at dusk, with a palletised ProBite order standing outside"
          }
          width={1920}
          height={1080}
          sizes="100vw"
          priority
          className="h-auto w-full object-cover"
        />
      </figure>

      {/* Manifest strip: the four facts a buyer checks first. */}
      <dl className="u-container grid grid-cols-2 border-t border-white/15 md:grid-cols-4">
        {t.hero.manifest.map((row, i) => (
          <div
            key={row.k}
            className={`py-5 md:py-6 ${
              i > 0 ? "border-s border-white/15 ps-5 md:ps-8" : ""
            } ${i === 2 ? "border-s-0 ps-0 md:border-s md:ps-8" : ""} ${
              i >= 2 ? "border-t border-white/15 md:border-t-0" : ""
            }`}
          >
            <dt className="u-label text-white/45">{row.k}</dt>
            <dd className="u-display u-display-sm mt-2 text-white">{row.v}</dd>
          </div>
        ))}
      </dl>

      <div className="u-container flex items-center justify-between border-t border-white/15 py-4">
        <MarasiLockup
          className="h-3.5 w-auto text-white/45"
          title={brandName}
        />
        <span className="u-mono text-white/40">{t.hero.scroll} ↓</span>
      </div>
    </section>
  );
}
