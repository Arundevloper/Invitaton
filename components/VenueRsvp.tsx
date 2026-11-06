"use client";

import { useState } from "react";
import { CONFIG, mapUrl, venueTel, whatsappUrl } from "@/lib/config";
import { Divider } from "./SvgSprites";

export default function VenueRsvp() {
  const [attending, setAttending] = useState(true);

  return (
    <section>
      <div className="wrap">
        <h2 className="ros">Venue &amp; RSVP</h2>
        <Divider />
        <div className="detail ros">
          <div className="col">
            <h3>The venue</h3>
            <p className="place">{CONFIG.venueName}</p>
            <address>{CONFIG.venueAddress}</address>
            {CONFIG.venuePhone && (
              <p className="vphone">
                <a href={venueTel(CONFIG.venuePhone)}>Call venue — {CONFIG.venuePhone}</a>
              </p>
            )}
            <a className="btn ghost" href={mapUrl()} target="_blank" rel="noopener">
              View on map
            </a>
          </div>

          <div className="col">
            <h3>Let us know</h3>
            <p className="rnote">{CONFIG.rsvpNote}</p>
            <div className="toggle" role="group" aria-label="Your response">
              <button type="button" aria-pressed={attending} onClick={() => setAttending(true)}>
                Joyfully attending
              </button>
              <button type="button" aria-pressed={!attending} onClick={() => setAttending(false)}>
                Sending blessings
              </button>
            </div>
            <div className="rbtns">
              <a className="btn" href={whatsappUrl(attending)} target="_blank" rel="noopener">
                RSVP on WhatsApp
              </a>
              <a className="btn ghost" href={`tel:${CONFIG.phone.replace(/\s/g, "")}`}>
                Call the family
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
