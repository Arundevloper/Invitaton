import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CONFIG, SIDES } from "@/lib/config";
import { getInvite, isSide } from "@/lib/invite";
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
import MusicToggle from "@/components/MusicToggle";

type Props = { params: Promise<{ side: string }> };

// build /arun and /kajal ahead of time; anything else is a 404
export const dynamicParams = false;
export function generateStaticParams() {
  return SIDES.map((side) => ({ side }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { side } = await params;
  if (!isSide(side)) return {};
  const { names } = getInvite(side);
  const title = `${names} — Wedding Invitation`;
  const description = `${CONFIG.dateLong} · ${CONFIG.city}. ${CONFIG.inviteLine}`;
  return {
    title,
    description,
    // shows the couple photo when the link is shared on WhatsApp etc.
    openGraph: {
      title,
      description,
      type: "website",
      images: CONFIG.couplePhoto ? [{ url: CONFIG.couplePhoto }] : undefined,
    },
  };
}

export default async function InvitationPage({ params }: Props) {
  const { side } = await params;
  if (!isSide(side)) notFound();
  const invite = getInvite(side);

  return (
    <>
      <SvgSprites />
      <ScrollProgress />
      <Gate first={invite.first} second={invite.second} />
      <Hero invite={invite} />
      <main>
        <Families invite={invite} />
        <CoupleCard names={invite.names} initials={invite.initials} />
        <Timeline invite={invite} />
        <Countdown />
        <VenueRsvp names={invite.names} />
      </main>
      <Footer names={invite.names} signoff={invite.signoff} />
      <MusicToggle />
      <RevealObserver />
    </>
  );
}
