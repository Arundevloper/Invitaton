import Image from "next/image";
import { CONFIG } from "@/lib/config";

// aspect ratio of the trimmed Ganesh artwork (998 × 1153)
const RATIO = 998 / 1153;

/** Shri Ganesh crest. `height` is the rendered height in px (keep it in sync with the CSS). */
export default function Crest({
  height,
  className,
  style,
  preload,
}: {
  height: number;
  className: string;
  style?: React.CSSProperties;
  preload?: boolean;
}) {
  return (
    <Image
      src={CONFIG.ganeshImage}
      alt=""
      aria-hidden="true"
      width={Math.round(height * RATIO)}
      height={height}
      className={className}
      style={style}
      preload={preload}
    />
  );
}
