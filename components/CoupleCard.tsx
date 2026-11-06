"use client";

import { useState } from "react";
import Image from "next/image";
import { CONFIG, coupleInitials, coupleNames } from "@/lib/config";
import { Divider } from "./SvgSprites";

/* couple flip card — one photo (falls back to initials if missing or it fails to load) */
export default function CoupleCard() {
  const [flipped, setFlipped] = useState(false);
  const [photoFailed, setPhotoFailed] = useState(false);
  const showPhoto = Boolean(CONFIG.couplePhoto) && !photoFailed;

  return (
    <section style={{ background: "var(--paper-2)" }}>
      <div className="wrap">
        <h2 className="ros">The couple</h2>
        <Divider />
        <p className="muted ros" style={{ marginBottom: "1.8rem" }}>Tap the photo to say hello</p>
        <div className="pair">
          <div className="person ros">
            <button
              type="button"
              className={`flipwrap${flipped ? " flipped" : ""}`}
              id="coupleFlip"
              aria-label="Flip photo"
              aria-pressed={flipped}
              onClick={() => setFlipped((f) => !f)}
            >
              <div className="flip">
                <div className="face front" id="coupleFace">
                  {showPhoto ? (
                    <Image
                      src={CONFIG.couplePhoto}
                      alt={coupleNames}
                      fill
                      sizes="(max-width: 560px) 17rem, 20rem"
                      onError={() => setPhotoFailed(true)}
                    />
                  ) : (
                    <>
                      <div className="ph">{coupleInitials}</div>
                      <p className="hint">tap to flip</p>
                    </>
                  )}
                </div>
                <div className="face back">
                  <p className="brole">THE COUPLE</p>
                  <p className="bsay">{CONFIG.coupleSay}</p>
                </div>
              </div>
            </button>
            <p className="pname">{coupleNames}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
