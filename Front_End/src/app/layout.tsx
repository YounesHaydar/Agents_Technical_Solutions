import type { Metadata } from "next";
import localFont from "next/font/local";
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";
import AppProviders from "../components/AppProviders";
import ScrollToTopOnMount from "../components/ScrollToTopOnMount";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const plexSerif = IBM_Plex_Serif({
  variable: "--font-plex-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// 1. Initialize the local Madani Arabic font files
const arabicSans = localFont({
  variable: "--font-arabic-sans",
  src: [
    {
      path: "../../public/fonts/MadaniArabicDEMO-Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/MadaniArabicDEMO-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/MadaniArabicDEMO-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/MadaniArabicDEMO-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  title: 'الحلول التقنية',
  description: 'مواقع ويب ومعارض أعمال موجهة للعملاء مبنية باستخدام Next.js وSanity.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      data-scroll-behavior="smooth"
      className={`${plexSans.variable} ${plexMono.variable} ${plexSerif.variable} ${arabicSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col transition-colors">
        <ScrollToTopOnMount />
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 site-shell-background" />
          <div className="absolute inset-0 site-grid-overlay" />
        </div>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}