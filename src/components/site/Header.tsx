"use client";

import { useEffect, useState } from "react";
import { usePrefs } from "@/lib/prefs";
import { COMPANY } from "@/lib/products";
import { DIR } from "@/lib/dictionary";
import { ordinal } from "@/lib/digits";
import { BAR_IDS, SECTION_IDS } from "@/lib/sections";
import { MarasiLockup } from "@/components/brand/MarasiLockup";
import { MarasiAnchor } from "@/components/brand/MarasiAnchor";

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6" strokeLinecap="round" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.2 8.2 0 1 0 10.2 10.2Z" strokeLinejoin="round" />
    </svg>
  );
}

export function Header() {
  const { t, locale, theme, toggleTheme, toggleLocale } = usePrefs();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The mobile panel is a modal surface: lock the page behind it and let Escape out.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const barLinks = BAR_IDS.map((id) => ({ id, label: t.nav[id] }));
  const allLinks = SECTION_IDS.map((id) => ({ id, label: t.nav[id] }));
  const brandName = locale === "ar" ? COMPANY.nameAr : COMPANY.nameEn;

  // The toggle is set in the language it leads to, so its own tracking and
  // face are fixed here rather than inherited from the page it sits on.
  const other = locale === "ar" ? "en" : "ar";

  // Over the hero the bar is transparent on a fixed midnight ground; once the
  // page moves it becomes paper and adopts the theme's ink.
  const bar = scrolled
    ? "bg-paper/95 border-line text-ink supports-[backdrop-filter]:bg-paper/85"
    : "bg-transparent border-transparent text-white u-on-dark";

  const control =
    "grid place-items-center border border-current/35 transition-colors hover:bg-current/10";

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-[60] focus:bg-paper focus:text-ink focus:px-4 focus:py-2 focus:u-mono"
      >
        {t.nav.skip}
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${bar}`}
      >
        <div className="u-container flex h-16 items-center justify-between gap-6 md:h-20">
          <a
            href="#top"
            className="flex items-center gap-3 shrink-0"
            aria-label={brandName}
          >
            {/* The lockup already contains the anchor, so only one of the two
                is ever shown: the monogram alone where there is no room. */}
            <MarasiAnchor className="h-10 w-auto sm:hidden" title={brandName} />
            <MarasiLockup
              className="hidden h-8 w-auto sm:block md:h-10"
              title={brandName}
            />
          </a>

          <nav className="hidden items-center gap-5 lg:flex xl:gap-7" aria-label={t.nav.menu}>
            {barLinks.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className="u-mono opacity-80 transition-opacity hover:opacity-100"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleLocale}
              lang={other}
              dir={DIR[other]}
              className={`${control} u-mono h-9 px-3`}
              style={{
                letterSpacing: 0,
                fontFamily:
                  other === "ar"
                    ? "var(--font-plex-arabic), system-ui, sans-serif"
                    : undefined,
              }}
              aria-label={t.nav.languageA11y}
            >
              {t.nav.language}
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className={`${control} size-9`}
              aria-label={t.a11y.toggleTheme}
              aria-pressed={theme === "dark"}
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className={`${control} size-9 lg:hidden`}
              aria-label={t.nav.menu}
              aria-expanded={open}
            >
              <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true" stroke="currentColor" strokeWidth="1.6">
                <path d="M3.5 7h17M3.5 12h17M3.5 17h17" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[55] overflow-y-auto bg-paper lg:hidden">
          <div className="u-container flex h-16 items-center justify-between md:h-20">
            <MarasiAnchor className="h-8 w-auto text-ink" title={brandName} />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid size-9 place-items-center border border-line text-ink"
              aria-label={t.nav.close}
            >
              <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true" stroke="currentColor" strokeWidth="1.6">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <nav className="u-container mt-4 flex flex-col pb-10" aria-label={t.nav.menu}>
            {allLinks.map((l, i) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className="u-display u-display-sm border-b border-line py-4 text-ink"
              >
                <span className="u-mono me-4 align-middle text-ink-soft">
                  {ordinal(i + 1, locale)}
                </span>
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
