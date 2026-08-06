"use client";

import { createContext, useCallback, useContext, useSyncExternalStore } from "react";
import { COPY, type Dict, type Locale } from "@/lib/dictionary";

type Theme = "light" | "dark";

export const STORAGE = { theme: "marasi.theme" } as const;

/* ────────────────────────────────────────────────────────────────────────────
   <html> is the store.

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

type PrefsValue = {
  /** The site ships English only; kept so data helpers stay locale-shaped. */
  locale: Locale;
  dir: "ltr";
  t: Dict;
  theme: Theme;
  toggleTheme: () => void;
};

const PrefsContext = createContext<PrefsValue | null>(null);

export function PrefsProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = useCallback(
    () => commit(getSnapshot() === "light" ? "dark" : "light"),
    [],
  );

  return (
    <PrefsContext.Provider
      value={{ locale: "en", dir: "ltr", t: COPY, theme, toggleTheme }}
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

/** Picks the English side of a bilingual data field. */
export function useBi() {
  return useCallback((value: { en: string; ar: string }) => value.en, []);
}
