import { CONFIG, EVENTS, SIDES, type Side, type WeddingEvent } from "./config";

export interface Family {
  name: string;
  rel: string;
  parents: string;
}

/** Everything that differs between /arun and /kajal, resolved for one side. */
export interface Invite {
  side: Side;
  first: string;
  second: string;
  /** "Arun & Kajal" or "Kajal & Arun" */
  names: string;
  initials: string;
  families: Family[];
  events: WeddingEvent[];
  signoff: string;
  /** this family's 10-digit contact number */
  phone: string;
}

export function isSide(s: string): s is Side {
  return (SIDES as readonly string[]).includes(s);
}

export function getInvite(side: Side): Invite {
  const groom: Family = { name: CONFIG.groom, rel: "son of", parents: CONFIG.groomParents };
  const bride: Family = { name: CONFIG.bride, rel: "daughter of", parents: CONFIG.brideParents };
  // the family sending the invitation is named first
  const families = side === "kajal" ? [bride, groom] : [groom, bride];
  const [first, second] = families.map((f) => f.name);
  return {
    side,
    first,
    second,
    names: `${first} & ${second}`,
    initials: `${first[0]} & ${second[0]}`,
    families,
    events: EVENTS[side],
    signoff: `With love, ${first} & ${second}`.toUpperCase(),
    phone: CONFIG.contact[side],
  };
}

export function mapUrl() {
  return (
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(`${CONFIG.venueName}, ${CONFIG.venueAddress}`)
  );
}

export function venueTel(raw: string) {
  return "tel:+91" + raw.replace(/\D/g, "").replace(/^0/, "");
}

export function gcalUrl(ev: WeddingEvent, names: string) {
  const s = new Date(ev.start);
  const e = new Date(s.getTime() + (ev.dur ?? 120) * 60000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const u = new URL("https://calendar.google.com/calendar/render");
  u.searchParams.set("action", "TEMPLATE");
  u.searchParams.set("text", `${ev.name} — ${names}`);
  u.searchParams.set("dates", `${fmt(s)}/${fmt(e)}`);
  if (ev.venue) u.searchParams.set("location", `${ev.venue.name}, ${ev.venue.address}`);
  u.searchParams.set("details", ev.note);
  return u.toString();
}

export function phoneTel(phone: string) {
  return "tel:+91" + phone.replace(/\D/g, "");
}

export function whatsappUrl(attending: boolean, names: string, phone: string) {
  const msg = attending
    ? `Namaste! We'd love to attend the wedding of ${names}.`
    : `Namaste! We can't make it, but we send our love and blessings to ${names}.`;
  return `https://wa.me/91${phone.replace(/\D/g, "")}?text=` + encodeURIComponent(msg);
}
