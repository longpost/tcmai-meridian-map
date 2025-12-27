import React from "react";
import { MERIDIANS } from "../lib/meridians";

const STROKE_WIDTH = 2.2; // 线更细：2 / 1.8 自己调

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
      right: (v.right || []).map(normalizePath).filter(Boolean),
    };
  }
  const p = m?.paths?.[side];
  if (p && (p.left || p.right)) {
    return {
      left: (p.left || []).map(normalizePath).filter(Boolean),
      right: (p.right || []).map(normalizePath).filter(Boolean),
    };
  }
  return { left: [], right: [] };
}

export default function MeridianOverlay({ activeMeridian, side }) {
  const m = MERIDIANS?.[activeMeridian];
  const { left, right } = getSidePaths(m, side);

  // 旧经络坐标系：600x900
  const sx = 375 / 600; // 0.625
  const sy = 768 / 900; // 0.853333...

  // 你的人体底图 viewBox
  const dx = side === "back" ? 371 : -4;
  const dy = 267;

  const strokeColor = m?.color || "#ff0000";

  return (
    <svg
      viewBox={`${dx} ${dy} 375 768`}
      width="100%"
      height="100%"
      style={{ position: "absolute", inset: 0, zIndex: 20, pointerEvents: "none", display: "block" }}
    >
      {/* x' = sx*x + dx, y' = sy*y + dy */}
      <g transform={`matrix(${sx},0,0,${sy},${dx},${dy})`}>
        {(left || []).map((d, i) => (
          <path key={`L${i}`} d={d} fill="none" stroke={strokeColor} strokeWidth={STROKE_WIDTH} strokeLinecap="round" strokeLinejoin="round" opacity="0.92" />
        ))}
        {(right || []).map((d, i) => (
          <path key={`R${i}`} d={d} fill="none" stroke={strokeColor} strokeWidth={STROKE_WIDTH} strokeLinecap="round" strokeLinejoin="round" opacity="0.92" />
        ))}
      </g>
    </svg>
  );
}


