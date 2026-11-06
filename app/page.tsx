import SvgSprites from "@/components/SvgSprites";
import ScrollProgress from "@/components/ScrollProgress";
import Gate from "@/components/Gate";
import Hero from "@/components/Hero";
import Families from "@/components/Families";
import CoupleCard from "@/components/CoupleCard";
import Timeline from "@/components/Timeline";
import Countdown from "@/components/Countdown";
import VenueRsvp from "@/components/VenueRsvp";
import Footer from "@/components/Footer";
import RevealObserver from "@/components/RevealObserver";

export default function Home() {
  return (
    <>
      <SvgSprites />
      <ScrollProgress />
      <Gate />
      <Hero />
      <main>
        <Families />
        <CoupleCard />
        <Timeline />
        <Countdown />
        <VenueRsvp />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
