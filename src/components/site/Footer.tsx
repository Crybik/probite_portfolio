"use client";

import Image from "next/image";
import { usePrefs } from "@/lib/prefs";
import { COMPANY } from "@/lib/products";
import { MarasiLockup } from "@/components/brand/MarasiLockup";

const SECTION_IDS = ["range", "house", "process", "controls", "contact"] as const;

export function Footer() {
  const { t, locale } = usePrefs();
  const brandName = locale === "ar" ? COMPANY.nameAr : COMPANY.nameEn;
  const year = 2026;

  return (
    <footer className="u-on-dark relative bg-midnight text-white">
      <div className="u-container u-section !pb-10">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <MarasiLockup
              className="h-6 w-auto text-white md:h-7"
              title={brandName}
            />
            <p className="u-measure mt-6 text-white/65">{t.footer.tagline}</p>

            <Image
              src="/brand/probite.png"
              alt="ProBite"
              width={1000}
              height={468}
              className="mt-8 h-11 w-auto"
            />
            <p className="u-mono mt-4 text-white/45">{t.footer.brandLine}</p>
          </div>

          <nav aria-label={t.nav.menu}>
            <p className="u-label text-white/40">{t.nav.menu}</p>
            <ul className="mt-5 space-y-3">
              {SECTION_IDS.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="text-white/75 transition-colors hover:text-white"
                  >
                    {t.nav[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="u-label text-white/40">{t.contact.direct}</p>
            <a
              href={COMPANY.phoneHref}
              className="u-display u-display-sm mt-5 block text-white transition-opacity hover:opacity-75"
              dir="ltr"
            >
              {COMPANY.phone}
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/15 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="u-mono text-white/40">
            © {year} {brandName}. {t.footer.rights}
          </p>
          <p className="u-mono text-white/40">{t.footer.built}</p>
        </div>
      </div>
    </footer>
  );
}
