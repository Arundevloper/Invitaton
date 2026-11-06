import { Fragment } from "react";
import { CONFIG } from "@/lib/config";
import type { Invite } from "@/lib/invite";
import { Divider } from "./SvgSprites";

export default function Families({ invite }: { invite: Invite }) {
  return (
    <section id="invite">
      <div className="wrap">
        <Divider />
        <p className="lead ros">{CONFIG.inviteLine}</p>
        <div className="families ros">
          {invite.families.map((f, i) => (
            <Fragment key={f.name}>
              {i > 0 && <div className="vrule" />}
              <div className="fam">
                <p className="who">{f.name}</p>
                <p className="rel">{f.rel}</p>
                <p>{f.parents}</p>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
