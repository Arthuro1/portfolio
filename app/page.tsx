import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import Journey from "@/components/Journey";

function Band() {
  return <div className="ndop-band mx-auto max-w-5xl opacity-70" aria-hidden="true" />;
}

export default function Home() {
  return (
    <>
      <Navbar />
      <Journey />
      <main>
        <Hero />
        <Band />
        <About />
        <Band />
        <Skills />
        <Band />
        <Projects />
        <Band />
        <Experience />
        <Band />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
