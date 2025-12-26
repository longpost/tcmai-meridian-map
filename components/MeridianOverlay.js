// components/MeridianOverlay.js
import React from "react";
import { MERIDIANS } from "../lib/meridians";
import { BODY_OUTLINE_FRONT_D, BODY_OUTLINE_BACK_D } from "../lib/bodyOutline";

function normalizePath(x) {
  if (!x) return null;
  if (typeof x === "string") return x;
  if (typeof x === "object" && typeof x.d === "string") return x.d;
  return null;
}

function getSidePaths(meridian, side) {
  // Prefer new structure: meridian.views[side].left/right
  const v = meridian?.views?.[side];
  if (v && (v.left || v.right)) {
    return {
      left: (v.left || []).map(normalizePath).filter(Boolean),
      right: (v.right || []).map(normalizePath).filter(Boolean)
    };
  }

  // Fallbacks for older structures if your project had them:
  const p = meridian?.paths?.[side];
  if (p && (p.left || p.right)) {
    return {
      left: (p.left || []).map(normalizePath).filter(Boolean),
      right: (p.right || []).map(normalizePath).filter(Boolean)
    };
  }

  // Last resort: allow meridian[side] to be array
  const arr = meridian?.[side];
  if (Array.isArray(arr)) {
    const all = arr.map(normalizePath).filter(Boolean);
    return { left: all, right: [] };
  }

  return { left: [], right: [] };
}

export default function MeridianOverlay({ activeMeridian, side }) {
  const m = MERIDIANS[activeMeridian];
  const { left, right } = getSidePaths(m, side);

  const clipId = side === "back" ? "clipBodyBack" : "clipBodyFront";
  const clipD = side === "back" ? BODY_OUTLINE_BACK_D : BODY_OUTLINE_FRONT_D;

  // If nothing to draw, still render svg (prevents layout issues)
  return (
    <svg viewBox="0 0 600 900" width="100%" height="100%" style={{ display: "block" }}>
      <defs>
        <clipPath id={clipId}>
          <path d={clipD} />
        </clipPath>
      </defs>

      <g clipPath={`url(#${clipId})`}>
        {(left || []).map((d, i) => (
          <path
            key={`L${i}`}
            d={d}
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.95"
          />
        ))}
        {(right || []).map((d, i) => (
          <path
            key={`R${i}`}
            d={d}
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.95"
          />
        ))}
      </g>
    </svg>
  );
}

