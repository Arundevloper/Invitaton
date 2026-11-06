/* =====================================================================
   EDIT YOUR DETAILS HERE.
   Two invitation links share these details:
     /arun   — sent by Arun's family  (names shown "Arun & Kajal")
     /kajal  — sent by Kajal's family (names shown "Kajal & Arun")
   Tip: add ?to=  to greet a guest by name, e.g. /arun?to=The%20Mehta%20Family
   ===================================================================== */

export const SIDES = ["arun", "kajal"] as const;
export type Side = (typeof SIDES)[number];

export type IconId = "ic-haldi" | "ic-mehndi" | "ic-sangeet" | "ic-vivah";

export interface WeddingEvent {
  key: string;
  ic: IconId;
  name: string;
  hi: string;
  /** small line above the title, e.g. "Saturday, 28 November" */
  day?: string;
  when: string;
  note: string;
  wear: string;
  accent?: string;
  /** where it happens — shown on the card and used in the calendar entry */
  venue?: { name: string; address: string };
  /** ISO start time with timezone offset */
  start: string;
  /** duration in minutes (used for the calendar entry) */
  dur?: number;
}

export const CONFIG = {
  groom: "Arun",
  bride: "Kajal",
  groomParents: "Smt. Saroj Devi & Shri Ramesh Sharma",
  brideParents: "Smt. Shanti Devi & Shri Kamlesh Sharma",
  couplePhoto:
    "https://res.cloudinary.com/dsh8ruufg/image/upload/v1793947291/WhatsApp_Image_2026-11-06_at_12.10.53_PM.jpg",
  // Shri Ganesh crest (transparent PNG). "e_trim" asks Cloudinary to crop the empty border.
  ganeshImage:
    "https://res.cloudinary.com/dsh8ruufg/image/upload/e_trim/v1793948231/259b8e3e-6b8f-44f8-83b6-c11719e837e8.png",
  // Background music: leave "" for the built-in soft tanpura & santoor melody,
  // or paste a link to an .mp3 you have the right to use (e.g. uploaded to Cloudinary).
  musicUrl: "",
  coupleSay: "Thank you for being part of our story. We look forward to celebrating with you.",
  inviteLine:
    "With joyful hearts, we request the honour of your presence as we unite in the sacred bond of marriage. Your blessings and good wishes will make our celebration complete.",
  dateLong: "30 November 2026",
  city: "Nagpur, Maharashtra",
  muhurat: "2026-11-30T19:42:00+05:30",
  muhuratLine: "Shubh muhurat — 7:42 pm, Monday 30 November",
  venueName: "Vindhyavasini Lawn",
  venueAddress:
    "90/1, Besa Ghogli Road, near Swami Samarth Mandir, Datta Nagar, Besa Pipla, Nagpur, Maharashtra 440037",
  venuePhone: "076204 45873",
  rsvpNote: "Kindly confirm your attendance by 20 November.",
  whatsapp: "917984967605", // country code + number, no + or spaces
  phone: "+917984967605",
};

/* Haldi, Mehndi & Sangeet — each family holds its own, on a different day.
   (Not at the wedding venue. To show a place, add  venue: { name: "...", address: "..." }  to an event.) */
const PRE_WEDDING_DAY: Record<Side, { date: string; label: string }> = {
  arun: { date: "2026-11-28", label: "Saturday, 28 November" },
  kajal: { date: "2026-11-29", label: "Sunday, 29 November" },
};

function preWedding(side: Side): WeddingEvent[] {
  const { date, label } = PRE_WEDDING_DAY[side];
  return [
    {
      key: "haldi", ic: "ic-haldi", name: "Haldi", hi: "हल्दी", day: label, when: "10:00 am",
      note: "Turmeric, flowers and plenty of mess. Wear yellow and nothing you love.",
      wear: "Dress code: yellow", accent: "#E3A21E", start: `${date}T10:00:00+05:30`, dur: 150,
    },
    {
      key: "mehndi", ic: "ic-mehndi", name: "Mehndi", hi: "मेहंदी", day: label, when: "5:00 pm",
      note: "Henna, music and chaat in the courtyard. Come get your hands decorated.",
      wear: "Dress code: green", accent: "#3E8E5A", start: `${date}T17:00:00+05:30`, dur: 120,
    },
    {
      key: "sangeet", ic: "ic-sangeet", name: "Sangeet", hi: "संगीत", day: label, when: "7:00 pm",
      note: "Songs, dance performances and a joyful evening with family and friends. Dinner will be served.",
      wear: "Dress code: something that sparkles", accent: "#8A4BC0", start: `${date}T19:00:00+05:30`, dur: 240,
    },
  ];
}

/* The wedding itself — same for both families, at the wedding venue above */
const VIVAH: WeddingEvent = {
  key: "vivah", ic: "ic-vivah", name: "Vivah", hi: "विवाह", day: "Monday, 30 November", when: "7:42 pm",
  venue: { name: CONFIG.venueName, address: CONFIG.venueAddress },
  note: "The varmala and the saat phere around the sacred fire, followed by dinner.",
  wear: "Dress code: traditional", accent: "#C0392B", start: CONFIG.muhurat, dur: 180,
};

export const EVENTS: Record<Side, WeddingEvent[]> = {
  arun: [...preWedding("arun"), VIVAH],
  kajal: [...preWedding("kajal"), VIVAH],
};
/* ===================================================================== */
