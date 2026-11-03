import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";

import { Analytics } from "@/components/site/analytics";
import { Footer } from "@/components/site/footer";
import { Providers } from "@/components/site/providers";
import { TopNav } from "@/components/site/top-nav";
import { profile, SITE_URL } from "@/content/profile";

import "./globals.css";

const sans = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument-sans", axes: ["wdth"], display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: "italic", variable: "--font-instrument-serif", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: profile.meta.title, template: "%s · Aryan Jaiswal" },
  description: profile.meta.description,
  applicationName: "Aryan Jaiswal",
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Aryan Jaiswal",
    title: profile.meta.title,
    description: profile.meta.description,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", creator: "@Aryanjstar", title: profile.meta.title, description: profile.meta.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#121214" },
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: SITE_URL,
  image: `${SITE_URL}/aryan-x.jpg`,
  email: `mailto:${profile.email}`,
  jobTitle: profile.current.title,
  worksFor: { "@type": "Organization", name: profile.current.company },
  alumniOf: { "@type": "CollegeOrUniversity", name: "IIIT Dharwad" },
  address: { "@type": "PostalAddress", addressLocality: "Bangalore", addressCountry: "IN" },
  sameAs: [profile.links.linkedin, profile.links.github, profile.links.leetcode, profile.links.gfg, profile.links.x],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <head>
        {/* Marks JS as available before first paint so JS-only layouts (the sticky How I ship story) never shift. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="no-print sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-full focus:bg-blue focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Providers>
          <TopNav />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
        </Providers>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
        <Analytics />
      </body>
    </html>
  );
}
