"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import {
  DICT,
  DIR,
  LOCALE_COOKIE,
  type Dict,
  type Locale,
} from "@/lib/dictionary";

type Theme = "light" | "dark";

export const STORAGE = { theme: "marasi.theme" } as const;

/* ────────────────────────────────────────────────────────────────────────────
   Theme: <html> is the store.

   The inline boot script in the root layout adds the `dark` class before first
   paint, so the document already holds the visitor's choice by the time React
   starts. Rather than duplicating that into state and syncing the two with
   effects, this subscribes to the document through useSyncExternalStore — the
   API built for exactly this, and one that gives hydration a defined server
   snapshot instead of a mismatch.
   ─────────────────────────────────────────────────────────────────────────── */

const listeners = new Set<() => void>();
let snapshot: Theme | null = null;

/** Referentially stable between notifications, as the store contract requires. */
function getSnapshot(): Theme {
  if (!snapshot) {
    snapshot = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
  }
  return snapshot;
}

const getServerSnapshot = (): Theme => "light";

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

function commit(next: Theme) {
  document.documentElement.classList.toggle("dark", next === "dark");
  try {
    localStorage.setItem(STORAGE.theme, next);
  } catch {
    // Private browsing: the choice still applies for this page view.
  }
  snapshot = next;
  listeners.forEach((l) => l());
}

/* ────────────────────────────────────────────────────────────────────────────
   Language: a cookie, so the server renders the right edition.

   Unlike the theme, the language changes the words, so it cannot be patched in
   after first paint without the page visibly re-setting itself. The root
   layout reads the cookie on every request and renders <html lang dir> and the
   copy to match; the provider starts from that same value, so server and
   client agree at hydration. Switching in the browser updates the document in
   place and writes the cookie for the next visit.
   ─────────────────────────────────────────────────────────────────────────── */

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

type PrefsValue = {
  locale: Locale;
  dir: "ltr" | "rtl";
  t: Dict;
  setLocale: (next: Locale) => void;
  toggleLocale: () => void;
  theme: Theme;
  toggleTheme: () => void;
};

const PrefsContext = createContext<PrefsValue | null>(null);

export function PrefsProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: React.ReactNode;
}) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  const toggleTheme = useCallback(
    () => commit(getSnapshot() === "light" ? "dark" : "light"),
    [],
  );

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`;
    } catch {
      // Cookies blocked: the choice still applies for this page view.
    }
  }, []);

  const toggleLocale = useCallback(
    () => setLocale(locale === "en" ? "ar" : "en"),
    [locale, setLocale],
  );

  // The server already rendered <html lang dir> from the cookie; this keeps
  // the document in step when the visitor switches without a reload.
  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    root.dir = DIR[locale];
    document.title = DICT[locale].meta.title;
  }, [locale]);

  return (
    <PrefsContext.Provider
      value={{
        locale,
        dir: DIR[locale],
        t: DICT[locale],
        setLocale,
        toggleLocale,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </PrefsContext.Provider>
  );
}

export function usePrefs() {
  const ctx = useContext(PrefsContext);
  if (!ctx) throw new Error("usePrefs must be used inside <PrefsProvider>");
  return ctx;
}

/** Picks the current language's side of a bilingual data field. */
export function useBi() {
  const { locale } = usePrefs();
  return useCallback(
    (value: { en: string; ar: string }) => value[locale],
    [locale],
  );
}
