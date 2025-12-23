import React, { useEffect, useMemo, useRef, useState } from "react";
import { MERIDIANS } from "../lib/meridians";
import { BODY_OUTLINE_FRONT_D } from "../lib/bodyOutline";

export default function MeridianOverlay({ activeMeridian = "ST", opacity = 0.95 }) {
  const pathRef = useRef(null);
  const [dash, setDash] = useState({ len: 0, offset: 0 });

  const meridian = useMemo(() => MERIDIANS[activeMeridian], [activeMeridian]);
  const d = meridian?.d || "";
  const clipId = "bodyClipFront"; // 前视裁剪；做背面就再弄一个 BACK

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    setDash({ len, offset: len });
    requestAnimationFrame(() => setDash({ len, offset: 0 }));
  }, [d]);

  if (!d) return null;

  return (
    <svg viewBox="0 0 600 900" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <defs>
        <clipPath id={clipId}>
          <path d={BODY_OUTLINE_FRONT_D} />
        </clipPath>
      </defs>

      <g clipPath={`url(#${clipId})`}>
        <path
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ opacity: 0.18, filter: "blur(1px)" }}
        />
        <path
          ref={pathRef}
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            opacity,
            strokeDasharray: dash.len,
            strokeDashoffset: dash.offset,
            transition: "stroke-dashoffset 950ms ease",
            filter: "drop-shadow(0 0 2px rgba(0,0,0,0.18))"
          }}
        />
      </g>
    </svg>
  );
}

