import React, { useEffect, useMemo, useRef, useState } from "react";
import { MERIDIANS } from "../lib/meridians";

/**
 * 叠加在底图上：渲染经络 path，并用 stroke-dashoffset 做“画线动画”
 * viewBox 与底图 SVG 一致（0 0 600 900）
 */
export default function MeridianOverlay({ activeMeridian = "ST", opacity = 0.95 }) {
  const pathRef = useRef(null);
  const [dash, setDash] = useState({ len: 0, offset: 0 });

  const meridian = useMemo(() => MERIDIANS[activeMeridian], [activeMeridian]);
  const d = meridian?.d || "";

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
      {/* 轻微发光底线（让它更“商业化”） */}
      <path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ opacity: 0.18, filter: "blur(1px)" }}
      />

      {/* 主线：描边动画 */}
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
          filter: "drop-shadow(0 0 2px rgba(0,0,0,0.18))",
        }}
      />
    </svg>
  );
}
