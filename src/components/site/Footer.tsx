"use client";

import Image from "next/image";
import { usePrefs } from "@/lib/prefs";
import { COMPANY } from "@/lib/products";
import { localiseDigits } from "@/lib/digits";
import { SECTION_IDS } from "@/lib/sections";
import { MarasiLockup } from "@/components/brand/MarasiLockup";
import { SocialIcon } from "@/components/ui/SocialIcon";

export function Footer() {
  const { t, locale } = usePrefs();
  const brandName = locale === "ar" ? COMPANY.nameAr : COMPANY.nameEn;
  const year = localiseDigits(2026, locale);
  const social = COMPANY.social.filter((s) => s.href);

  return (
    <footer className="u-on-dark relative bg-midnight text-white">
      <div className="u-container u-section !pb-10">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1.1fr)]">
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
            <a
              href={COMPANY.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="u-mono mt-4 inline-flex items-center gap-2 text-white/75 transition-colors hover:text-white"
            >
              <SocialIcon id="whatsapp" />
              {t.contact.whatsappAction}
            </a>
            {COMPANY.email ? (
              <a
                href={`mailto:${COMPANY.email}`}
                dir="ltr"
                className="u-mono mt-3 block text-white/75 transition-colors hover:text-white"
              >
                {COMPANY.email}
              </a>
            ) : null}
            <p className="u-mono mt-4 text-white/45">{t.contact.locationValue}</p>

            {social.length > 0 ? (
              <div className="mt-8">
                <p className="u-label text-white/40">{t.footer.follow}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {social.map((s) => (
                    <li key={s.id}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={s.label}
                        title={s.label}
                        className="grid size-10 place-items-center border border-white/25 text-white/80 transition-colors hover:border-white hover:text-white"
                      >
                        <SocialIcon id={s.id} className="size-[1.1rem]" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
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
