"use client";

import { useEffect, useState } from "react";
import { CONFIG } from "@/lib/config";
import { Divider } from "./SvgSprites";

const target = new Date(CONFIG.muhurat).getTime();
const pad = (n: number) => String(n).padStart(2, "0");

export default function Countdown() {
  // null until mounted, so server and client render the same markup
  const [ms, setMs] = useState<number | null>(null);

  useEffect(() => {
    if (Number.isNaN(target)) return;
    const update = () => setMs(target - Date.now());
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);

  const done = ms !== null && ms <= 0;
  const s = ms !== null && ms > 0 ? Math.floor(ms / 1000) : 0;

  return (
    <section className="count">
      <div className="wrap">
        <h2 id="countTitle">{done ? "Happily married!" : "The countdown is on"}</h2>
        <Divider className="divider" />
        {!done && (
          <div className="clock" id="clock">
            <Unit value={String(Math.floor(s / 86400))} label="DAYS" />
            <Unit value={pad(Math.floor((s % 86400) / 3600))} label="HOURS" />
            <Unit value={pad(Math.floor((s % 3600) / 60))} label="MINUTES" />
            <Unit value={pad(s % 60)} label="SECONDS" />
          </div>
        )}
        <p className="muhurat">{done ? "Thank you for your blessings." : CONFIG.muhuratLine}</p>
      </div>
    </section>
  );
}

function Unit({ value, label }: { value: string; label: string }) {
  return (
    <div className="unit">
      <div className="num">{value}</div>
      <div className="lab">{label}</div>
    </div>
  );
}
