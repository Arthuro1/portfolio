import type { Metadata } from "next";
import { Atkinson_Hyperlegible, Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Self-hosted at build time by next/font: no request to Google from visitors.
const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Atkinson_Hyperlegible({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

// Applies the stored theme before first paint so dark mode doesn't flash light.
const themeScript = `try{if(localStorage.getItem("theme")!=="light")document.documentElement.classList.add("dark")}catch(e){document.documentElement.classList.add("dark")}`;

const SITE_URL = "https://paulmeteng.space";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Paul Arthur Meteng — AI Engineer",
    template: "%s — Paul Arthur Meteng",
  },
  description:
    "Portfolio of Paul Arthur Meteng — Software Engineer specialising in AI Engineering, RAG systems, LLMs and Conversational AI.",
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
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Paul Arthur Meteng — AI Engineer",
    description:
      "Software Engineer specialising in AI Engineering, RAG systems and Conversational AI.",
    url: SITE_URL,
    siteName: "Paul Arthur Meteng",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paul Arthur Meteng — AI Engineer",
    description:
      "Software Engineer specialising in AI Engineering, RAG systems and Conversational AI.",
  },
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
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
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
    </html>
  );
}
