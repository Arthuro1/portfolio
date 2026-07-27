import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
    "https://linkedin.com/in/paul-arthur-meteng",
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased transition-colors">
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
