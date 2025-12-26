import React from "react";
import { MERIDIANS } from "../lib/meridians";
import { BODY_OUTLINE_FRONT_D, BODY_OUTLINE_BACK_D } from "../lib/bodyOutline";

const USE_CLIP = true; // 先确保可见；确认后再改 true
const STROKE_WIDTH = 2; // 你要更细就改 2

function normalizePath(x) {
  if (!x) return null;
  if (typeof x === "string") return x;
  if (typeof x === "object" && typeof x.d === "string") return x.d;
  return null;
}

function getSidePaths(m, side) {
  const v = m?.views?.[side];
  if (v && (v.left || v.right)) {
    return {
      left: (v.left || []).map(normalizePath).filter(Boolean),
      right: (v.right || []).map(normalizePath).filter(Boolean)
    };
  }
  const p = m?.paths?.[side];
  if (p && (p.left || p.right)) {
    return {
      left: (p.left || []).map(normalizePath).filter(Boolean),
      right: (p.right || []).map(normalizePath).filter(Boolean)
    };
  }
  return { left: [], right: [] };
}

export default function MeridianOverlay({ activeMeridian, side }) {
  const m = MERIDIANS?.[activeMeridian];
  const { left, right } = getSidePaths(m, side);

  const strokeColor = m?.color || "#ff0000";

  const clipId = side === "back" ? "clipBodyBack" : "clipBodyFront";
  const clipD = side === "back" ? BODY_OUTLINE_BACK_D : BODY_OUTLINE_FRONT_D;

  const content = (
    <g>
      {(left || []).map((d, i) => (
        <path
          key={`L${i}`}
          d={d}
          fill="none"
          stroke={strokeColor}
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.92"
        />
      ))}
      {(right || []).map((d, i) => (
        <path
          key={`R${i}`}
          d={d}
          fill="none"
          stroke={strokeColor}
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.92"
        />
      ))}
    </g>
  );

  return (
    <svg
      viewBox="0 0 600 900"
      width="100%"
      height="100%"
      style={{ display: "block", position: "absolute", inset: 0, zIndex: 20, pointerEvents: "none" }}
    >
      {USE_CLIP ? (
        <>
          <defs>
            <clipPath id={clipId}>
              <path d={clipD} />
            </clipPath>
          </defs>
          <g clipPath={`url(#${clipId})`}>{content}</g>
        </>
      ) : (
        content
      )}
    </svg>
  );
}

