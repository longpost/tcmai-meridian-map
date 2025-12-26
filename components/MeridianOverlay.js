import React from "react";
import { MERIDIANS } from "../lib/meridians";

// 把各种可能的数据格式都兼容掉
function normalizePath(x) {
  if (!x) return null;
  if (typeof x === "string") return x;
  if (typeof x === "object" && typeof x.d === "string") return x.d;
  return null;
}

function getSidePaths(m, side) {
  // 你现在新结构：views[side].left/right
  const v = m?.views?.[side];
  if (v && (v.left || v.right)) {
    return {
      left: (v.left || []).map(normalizePath).filter(Boolean),
      right: (v.right || []).map(normalizePath).filter(Boolean),
    };
  }

  // 兼容旧结构：paths[side].left/right
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

  const strokeColor = m?.color || "#ff0000"; // 强制有颜色
  const hasAny = (left?.length || 0) + (right?.length || 0) > 0;

  return (
    <svg
      viewBox="0 0 600 900"
      width="100%"
      height="100%"
      style={{
        display: "block",
        position: "absolute",
        inset: 0,
        zIndex: 20,            // 强制在最上层
        pointerEvents: "none", // 不挡点击
      }}
    >
      {/* 先完全不裁剪，确保能看见线。确认能看到后再加回 clipPath */}
      <g>
        {(left || []).map((d, i) => (
          <path
            key={`L${i}`}
            d={d}
            fill="none"
            stroke={strokeColor}
            strokeWidth="5"
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
            stroke={strokeColor}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.95"
          />
        ))}

        {/* debug：如果你点经络还啥都没有，那说明 paths 根本没取到 */}
        {!hasAny && (
          <path
            d="M80 120 L520 780"
            fill="none"
            stroke="#ff0000"
            strokeWidth="6"
            strokeLinecap="round"
            opacity="0.35"
          />
        )}
      </g>
    </svg>
  );
}

