/* =====================================================================
   EDIT YOUR DETAILS HERE.
   Photo: put one image link of the two of you in couplePhoto, or leave ""
   to show your initials. Tip: share a link like  /?to=The%20Mehta%20Family
   to greet a guest by name.
   ===================================================================== */

export type IconId = "ic-haldi" | "ic-mehndi" | "ic-sangeet" | "ic-vivah";

export interface WeddingEvent {
  key: string;
  ic: IconId;
  name: string;
  hi: string;
  day?: string;
  when: string;
  note: string;
  wear: string;
  accent?: string;
  /** ISO start time with timezone offset */
  start: string;
  /** duration in minutes (used for the calendar entry) */
  dur?: number;
}

export const CONFIG = {
  groom: "Arun",
  bride: "Kajal",
  groomParents: "Smt. Sunita & Shri Rajesh Sharma", // sample
  brideParents: "Smt. Meera & Shri Anil Verma", // sample
  couplePhoto:
    "https://res.cloudinary.com/dsh8ruufg/image/upload/v1793947291/WhatsApp_Image_2026-11-06_at_12.10.53_PM.jpg",
  // Shri Ganesh crest (transparent PNG). "e_trim" asks Cloudinary to crop the empty border.
  ganeshImage:
    "https://res.cloudinary.com/dsh8ruufg/image/upload/e_trim/v1793948231/259b8e3e-6b8f-44f8-83b6-c11719e837e8.png",
  coupleSay: "So glad you're here — see you on the dance floor!",
  inviteLine:
    "Two families, lots of dancing, and one big fat wedding — and it won't be the same without you. Come celebrate with us!",
  dateLong: "12 December 2026",
  city: "Nagpur, Maharashtra",
  muhurat: "2026-12-12T19:42:00+05:30",
  muhuratLine: "Shubh muhurat — 7:42 pm, Saturday 12 December",
  venueName: "Vindhyavasini Lawn",
  venueAddress:
    "90/1, Besa Ghogli Road, near Swami Samarth Mandir, Datta Nagar, Besa Pipla, Nagpur, Maharashtra 440037",
  venuePhone: "076204 45873",
  rsvpNote: "A quick reply by 30 November helps us plan the fun.",
  whatsapp: "919999999999", // country code + number, no + or spaces
  phone: "+919999999999",
  signoff: "WITH LOVE, ARUN & KAJAL",
  events: [
    {
      key: "haldi", ic: "ic-haldi", name: "Haldi", hi: "हल्दी", day: "Day 1 — Thursday",
      when: "10 December · 10:00 am",
      note: "Turmeric, flowers and plenty of mess. Wear yellow and nothing you love.",
      wear: "Dress code: yellow", accent: "#E3A21E", start: "2026-12-10T10:00:00+05:30", dur: 150,
    },
    {
      key: "mehndi", ic: "ic-mehndi", name: "Mehndi", hi: "मेहंदी", day: "Day 1 — Thursday",
      when: "10 December · 5:00 pm",
      note: "Henna, music and chaat in the courtyard. Come get your hands decorated.",
      wear: "Dress code: green", accent: "#3E8E5A", start: "2026-12-10T17:00:00+05:30", dur: 180,
    },
    {
      key: "sangeet", ic: "ic-sangeet", name: "Sangeet", hi: "संगीत", day: "Day 2 — Friday",
      when: "11 December · 7:00 pm",
      note: "Both families take the stage, then the floor stays open till late. Dinner served.",
      wear: "Dress code: something that sparkles", accent: "#8A4BC0", start: "2026-12-11T19:00:00+05:30", dur: 240,
    },
    {
      key: "vivah", ic: "ic-vivah", name: "Vivah", hi: "विवाह", day: "Day 3 — Saturday",
      when: "12 December · 7:42 pm",
      note: "The varmala and the saat phere around the sacred fire, followed by dinner.",
      wear: "Dress code: traditional", accent: "#C0392B", start: "2026-12-12T19:42:00+05:30", dur: 180,
    },
  ] satisfies WeddingEvent[] as WeddingEvent[],
};
/* ===================================================================== */

export const coupleNames = `${CONFIG.groom} & ${CONFIG.bride}`;
export const coupleInitials = `${CONFIG.groom[0]} & ${CONFIG.bride[0]}`;

export function mapUrl() {
  return (
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(`${CONFIG.venueName}, ${CONFIG.venueAddress}`)
  );
}

export function venueTel(raw: string) {
  return "tel:+91" + raw.replace(/\D/g, "").replace(/^0/, "");
}

export function gcalUrl(ev: WeddingEvent) {
  const s = new Date(ev.start);
  const e = new Date(s.getTime() + (ev.dur ?? 120) * 60000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const u = new URL("https://calendar.google.com/calendar/render");
  u.searchParams.set("action", "TEMPLATE");
  u.searchParams.set("text", `${ev.name} — ${coupleNames}`);
  u.searchParams.set("dates", `${fmt(s)}/${fmt(e)}`);
  u.searchParams.set("location", `${CONFIG.venueName}, ${CONFIG.venueAddress}`);
  u.searchParams.set("details", ev.note);
  return u.toString();
}

export function whatsappUrl(attending: boolean) {
  const msg = attending
    ? `Namaste! We'd love to attend the wedding of ${coupleNames}.`
    : `Namaste! We can't make it, but we send our love and blessings to ${coupleNames}.`;
  return `https://wa.me/${CONFIG.whatsapp}?text=` + encodeURIComponent(msg);
}
