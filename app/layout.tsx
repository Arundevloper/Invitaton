import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans, Tiro_Devanagari_Hindi } from "next/font/google";
import { CONFIG, coupleNames } from "@/lib/config";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dmsans",
  display: "swap",
});

const tiro = Tiro_Devanagari_Hindi({
  subsets: ["devanagari", "latin"],
  weight: "400",
  variable: "--font-tiro",
  display: "swap",
});

const title = `${coupleNames} — Wedding Invitation`;
const description = `${CONFIG.dateLong} · ${CONFIG.city}. ${CONFIG.inviteLine}`;

export const metadata: Metadata = {
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#53091F",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable} ${tiro.variable}`}>
      <body className="locked">{children}</body>
    </html>
  );
}
