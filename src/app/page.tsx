import { Header } from "@/components/site/Header";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/sections/Hero";
import { Ticker, Figures } from "@/components/sections/Figures";
import { Range } from "@/components/sections/Range";
import { House } from "@/components/sections/House";
import { Process } from "@/components/sections/Process";
import { Controls } from "@/components/sections/Controls";
import { CallToAction, Contact } from "@/components/sections/Contact";

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main id="main">
        <Hero />
        <Ticker />
        <Figures />
        <Range />
        <House />
        <Process />
        <Controls />
        <CallToAction />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
