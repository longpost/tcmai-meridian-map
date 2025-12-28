import React from "react";
import { MERIDIANS } from "../lib/meridians";

const STROKE_WIDTH = 2.2;

// 这里挂外部资源：先试 LU
const EXTERNAL = {
  LU: { front: "/body/external/LU.svg" },
  // 以后你找到其它单经络SVG，就照这个加：
  // LI: { front: "/body/external/LI.svg" },
};

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
  const k = String(activeMeridian || "").toUpperCase();

  // 如果这个经络有外部资源，就直接叠加图片（最快试通）
  const ext = EXTERNAL?.[k]?.[side];
  if (ext) {
    return (
      <img
        src={ext}
        alt={`${k}-overlay`}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
          pointerEvents: "none",
          zIndex: 20,
          opacity: 0.9,
          // 让红线更“贴”在人身上（可删）
          mixBlendMode: "multiply",
        }}
      />
    );
  }

  // 否则走你原来的“paths”方式（仍然对准你的人体 viewBox）
  const m = MERIDIANS?.[k];
  const { left, right } = getSidePaths(m, side);

  const sx = 375 / 600;
  const sy = 768 / 900;
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
      <g transform={`matrix(${sx},0,0,${sy},${dx},${dy})`}>
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
    </svg>
  );
}



