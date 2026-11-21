import type { Metadata } from "next";
import { Atkinson_Hyperlegible, Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { LangHtml } from "@/context/LanguageContext";
import { SITE_META, SITE_URL } from "@/lib/site-meta";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Self-hosted at build time by next/font: no request to Google from visitors.
const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Atkinson_Hyperlegible({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

// Applies the stored theme before first paint so dark mode doesn't flash light.
const themeScript = `try{if(localStorage.getItem("theme")!=="light")document.documentElement.classList.add("dark")}catch(e){document.documentElement.classList.add("dark")}`;

// Defaults for every route (the 404 page included). Each language page adds its own
// title, description, canonical, hreflang alternates and Open Graph locale (lib/site-meta.ts).
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_META.en.title,
  description: SITE_META.en.description,
  keywords: [
    "Paul Arthur Meteng",
    "AI Engineer",
    "Software Engineer",
    "RAG systems",
    "LLM applications",
    "Conversational AI",
    "Machine Learning",
    "Knowledge Graphs",
    "Python",
    "Germany",
  ],
  authors: [{ name: "Paul Arthur Meteng", url: SITE_URL }],
  creator: "Paul Arthur Meteng",
  icons: { icon: "/favicon.svg" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

// Person schema so search engines can build a rich result for "Paul Arthur
// Meteng". Data is static and author-controlled, so injecting it is safe.
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Paul Arthur Meteng",
  alternateName: "Paul Arthur Meteng Kamdem",
  url: SITE_URL,
  jobTitle: "AI Engineer",
  description:
    "Software Engineer specialising in AI Engineering, RAG systems, LLMs and Conversational AI.",
  sameAs: [
    "https://github.com/Arthuro1",
    "https://www.linkedin.com/in/paul-arthur-meteng-kamdem-06b922125",
  ],
  knowsAbout: [
    "AI Engineering",
    "Retrieval-Augmented Generation",
    "Large Language Models",
    "Conversational AI",
    "Machine Learning",
    "Knowledge Graphs",
    "Python",
    "React",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Duisburg-Essen",
  },
  address: { "@type": "PostalAddress", addressCountry: "DE" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LangHtml className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans text-ink antialiased">
        <div className="atmosphere" aria-hidden="true" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <Providers>{children}</Providers>
        <SpeedInsights />
      </body>
    </LangHtml>
  );
}
