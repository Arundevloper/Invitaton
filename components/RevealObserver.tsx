"use client";

import { useEffect } from "react";

/* fades in every .ros element as it scrolls into view */
export default function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.14 }
    );
    document.querySelectorAll(".ros").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
