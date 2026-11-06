import { CONFIG, gcalUrl } from "@/lib/config";
import { cssVars } from "@/lib/motion";
import { Divider, Icon } from "./SvgSprites";

/* ceremonies — timeline */
export default function Timeline() {
  return (
    <section id="events">
      <div className="wrap">
        <h2 className="ros">The celebrations</h2>
        <Divider />
      </div>
      <div className="timeline" id="cerList">
        {CONFIG.events.map((e) => (
          <div key={e.key} className="cer-item ros" style={cssVars({ "--acc": e.accent || "var(--gold)" })}>
            <div className="cer-badge"><Icon id={e.ic} /></div>
            <div className="cer-card">
              <div className="wm"><Icon id={e.ic} /></div>
              {e.day && <p className="cer-day">{e.day}</p>}
              <h3>
                {e.name}
                <span className="dev" lang="hi">{e.hi}</span>
              </h3>
              <p className="when">{e.when}</p>
              <p className="note">{e.note}</p>
              <div className="cer-foot">
                <span className="wear">{e.wear}</span>
                <a className="cal" href={gcalUrl(e)} target="_blank" rel="noopener">
                  <Icon id="ic-cal" />
                  Add to calendar
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
