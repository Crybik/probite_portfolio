import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { PrefsProvider } from "@/lib/prefs";
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

export const metadata: Metadata = {
  // Swap for the real domain at launch; it resolves the OG image URL.
  metadataBase: new URL("https://marasialarz.com"),
  title: {
    default: "Marasi Al-Arz — food manufacturing",
    template: "%s · Marasi Al-Arz",
  },
  description:
    "Manufacturer of food-service pickles, peppers and sauces under the ProBite label. Generous formats, private label and export.",
  keywords: [
    "Marasi Al-Arz",
    "ProBite",
    "food service",
    "pickles",
    "jalapeño",
    "cheddar cheese sauce",
    "private label",
    "food export",
  ],
  openGraph: {
    title: "Marasi Al-Arz — food manufacturing",
    description:
      "Pickles, peppers and sauces in food-service formats, under the ProBite label.",
    type: "website",
    locale: "en",
    images: [{ url: "/factory-night.jpg", width: 1920, height: 1080 }],
  },
};

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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${archivo.variable} ${plexMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      </head>
      <body className="min-h-full flex flex-col">
        <PrefsProvider>{children}</PrefsProvider>
      </body>
    </html>
  );
}
