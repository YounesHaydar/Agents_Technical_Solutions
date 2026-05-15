import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Serif, Cairo } from "next/font/google";
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

// 1. Initialize the modern Arabic font
const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: 'Technical Solutions',
  description: 'Customer-focused websites and portfolio showcases built with Next.js and Sanity.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      // 2. Inject the Cairo variable into the HTML class list
      className={`${plexSans.variable} ${plexMono.variable} ${plexSerif.variable} ${cairo.variable} h-full antialiased`}
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