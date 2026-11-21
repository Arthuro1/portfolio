import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import MoreProjects from "@/components/MoreProjects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { pageMetadata } from "@/lib/site-meta";

// English home. /de and /fr render this same page; the language comes from the pathname.
export const metadata = pageMetadata("en");

function Band() {
  return <div className="ndop-band mx-auto max-w-5xl opacity-70" aria-hidden="true" />;
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Band />
        <Projects />
        <Band />
        <Experience />
        <Band />
        <Skills />
        <Band />
        <MoreProjects />
        <Band />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
