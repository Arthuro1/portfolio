import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Paul Arthur Meteng — AI Engineer",
  description:
    "Portfolio of Paul Arthur Meteng — Software Engineer specialising in AI Engineering, RAG systems, LLMs and Conversational AI.",
  openGraph: {
    title: "Paul Arthur Meteng — AI Engineer",
    description:
      "Software Engineer specialising in AI Engineering, RAG systems and Conversational AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-white text-gray-900 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
