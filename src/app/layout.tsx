import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";
import { cookies, headers } from "next/headers";
import { PrefsProvider } from "@/lib/prefs";
import {
  DEFAULT_LOCALE,
  DICT,
  DIR,
  LOCALE_COOKIE,
  isLocale,
  type Locale,
} from "@/lib/dictionary";
import "./globals.css";

/**
 * One grotesque doing display and body, separated by weight and by width — the
 * `wdth` axis is what lets headlines quote the compressed caps of the Marasi
 * wordmark without introducing a second Latin face.
 */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

/** The manifest voice: weights, servings, codes, temperatures. */
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

/**
 * The Arabic edition's one family, carrying every role — Archivo has no Arabic
 * and letter-spaced mono breaks the joined script. Plex Sans Arabic shares
 * its bones with Plex Mono, so the two editions still read as one house.
 * Not preloaded: the files are only fetched once Arabic text is on the page.
 */
const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  display: "swap",
  preload: false,
});

/**
 * The visitor's stored choice first; failing that, the browser's first
 * language; failing that, English.
 */
async function resolveLocale(): Promise<Locale> {
  const stored = (await cookies()).get(LOCALE_COOKIE)?.value;
  if (isLocale(stored)) return stored;
  const accept = (await headers()).get("accept-language") ?? "";
  const first = accept.split(",")[0]?.trim().toLowerCase() ?? "";
  return first.startsWith("ar") ? "ar" : DEFAULT_LOCALE;
}

/**
 * Railway publishes the service hostname into the environment, which is the
 * address the site actually answers on today. Replace with the company domain
 * once one is pointed at the service.
 */
const SITE_URL = process.env.RAILWAY_PUBLIC_DOMAIN
  ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`
  : "https://marasialarz.com";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveLocale();
  const { title, description } = DICT[locale].meta;
  const arabic = locale === "ar";

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: "%s · Marasi Al-Arz",
    },
    description,
    keywords: [
      "Marasi Al-Arz",
      "مراسي الأرز",
      "ProBite",
      "food import Iraq",
      "food distribution Iraq",
      "food service",
      "pickles",
      "jalapeño",
      "cheddar cheese sauce",
      "private label",
      "wholesale food supply",
    ],
    openGraph: {
      title,
      description,
      type: "website",
      locale: arabic ? "ar_IQ" : "en_US",
      alternateLocale: arabic ? "en_US" : "ar_IQ",
      images: [{ url: "/factory-night.jpg", width: 1920, height: 1080 }],
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f5f1" },
    { media: "(prefers-color-scheme: dark)", color: "#0c1526" },
  ],
};

/**
 * Applies the stored theme before first paint, and flags that JavaScript is
 * available so the stylesheet may arm the scroll reveals.
 */
const BOOT = `(function(){try{
var d=document.documentElement;
d.setAttribute('data-js','');
var t=localStorage.getItem('marasi.theme');
if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}
if(t==='dark'){d.classList.add('dark');}
}catch(e){}})();`;

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const locale = await resolveLocale();

  return (
    <html
      lang={locale}
      dir={DIR[locale]}
      suppressHydrationWarning
      className={`${archivo.variable} ${plexMono.variable} ${plexArabic.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      </head>
      <body className="min-h-full flex flex-col">
        <PrefsProvider initialLocale={locale}>{children}</PrefsProvider>
      </body>
    </html>
  );
}
