import { CONFIG } from "@/lib/config";
import { Divider } from "./SvgSprites";

export default function Families() {
  return (
    <section id="invite">
      <div className="wrap">
        <Divider />
        <p className="lead ros">{CONFIG.inviteLine}</p>
        <div className="families ros">
          <div className="fam">
            <p className="who">{CONFIG.groom}</p>
            <p className="rel">son of</p>
            <p>{CONFIG.groomParents}</p>
          </div>
          <div className="vrule" />
          <div className="fam">
            <p className="who">{CONFIG.bride}</p>
            <p className="rel">daughter of</p>
            <p>{CONFIG.brideParents}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
