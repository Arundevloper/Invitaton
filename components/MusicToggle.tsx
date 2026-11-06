"use client";

import { useSyncExternalStore } from "react";
import { musicStore, toggleMusic } from "@/lib/music";

/* floating play/pause button — appears once the invitation is opened */
export default function MusicToggle() {
  const state = useSyncExternalStore(musicStore.subscribe, musicStore.get, musicStore.getServer);
  if (state === "off") return null;
  const playing = state === "playing";

  return (
    <button
      type="button"
      className={`fab music${playing ? " on" : ""}`}
      onClick={toggleMusic}
      aria-label={playing ? "Pause music" : "Play music"}
      aria-pressed={playing}
    >
      {playing ? (
        <span className="bars" aria-hidden="true"><i /><i /><i /></span>
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18V5l11-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="17" cy="16" r="3" />
          <path d="M3 3l18 18" />
        </svg>
      )}
    </button>
  );
}
