"use client";

import { useEffect, useState } from "react";
import { cssVars } from "@/lib/motion";

/* guest greeting from ?to=  e.g. /?to=The%20Mehta%20Family */
export default function Greeting() {
  const [to, setTo] = useState<string | null>(null);

  useEffect(() => {
    setTo(new URLSearchParams(window.location.search).get("to"));
  }, []);

  if (!to) return null;
  return (
    <p className="greet reveal" id="greet" style={cssVars({ "--i": 0 })}>
      Dear {to},
    </p>
  );
}
