import React, { useMemo, useState } from "react";
import MeridianOverlay from "./MeridianOverlay";
import TracePlayer from "./TracePlayer";
import { MERIDIANS } from "../lib/meridians";
import { HOTSPOTS } from "../lib/hotspots";

export default function BodyMap() {
  const [side, setSide] = useState("front"); // front | back
  const [active, setActive] = useState("ST");

  const meridian = MERIDIANS[active];
  const color = meridian?.color || "#0ea5e9";

  // 先给一个静态 trace demo，后面接 /api/analyze 返回的 trace[]
  const trace = useMemo(() => {
    if (active === "ST") {
      return [
        { kind: "symptom", text: "命中：胃脘胀、嗳气、食欲差（示例）" },
        { kind: "rule", text: "脾胃气机不畅 → 胃失和降（示例）" },
        { kind: "principle", text: "思路：和胃降逆、理气（示例）" }
      ];
    }
    if (active === "GB") {
      return [
        { kind: "symptom", text: "命中：口苦、胁胀、易怒（示例）" },
        { kind: "rule", text: "肝气郁结，郁久化热（示例）" },
        { kind: "principle", text: "思路：疏肝理气，清热（示例）" }
      ];
    }
    return [
      { kind: "symptom", text: "命中：鼻塞、咽干、便秘（示例）" },
      { kind: "rule", text: "手阳明相关线索（示例）" },
      { kind: "principle", text: "思路：宣通、调理（示例）" }
    ];
  }, [active]);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 16, alignItems: "start" }}>
      {/* 左：图 */}
      <div className="card">
        <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontWeight: 800 }}>交互人体图</div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              className={`pill ${side === "front" ? "pillActive" : ""}`}
              onClick={() => setSide("front")}
            >
              Front
            </button>
            <button
              className={`pill ${side === "back" ? "pillActive" : ""}`}
              onClick={() => setSide("back")}
            >
              Back
            </button>
          </div>
        </div>

        <div style={{ height: 10 }} />

        <div style={{ position: "relative", width: "100%", maxWidth: 560, margin: "0 auto", aspectRatio: "2 / 3" }}>
          {/* 底图：SVG 静态资源 */}
          <img
            src={side === "front" ? "/body/base_front.svg" : "/body/base_back.svg"}
            alt="TCM body base"
            style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
          />

          {/* 经络叠层：用 currentColor 控色 */}
          <div style={{ position: "absolute", inset: 0, color }}>
            <MeridianOverlay activeMeridian={active} side={side} />
          </div>

          {/* 热区：透明按钮，按 viewBox 坐标映射百分比 */}
          {HOTSPOTS.map((h) => (
            <HotspotButton
              key={h.id}
              shape={h.shape}
              onClick={() => setActive(h.meridian)}
              active={active === h.meridian}
              title={h.label}
            />
          ))}
        </div>

        <div style={{ height: 12 }} />

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {Object.keys(MERIDIANS).map((k) => (
            <button
              key={k}
              className={`pill ${k === active ? "pillActive" : ""}`}
              onClick={() => setActive(k)}
              title={MERIDIANS[k].nameZh}
            >
              {k}
            </button>
          ))}
        </div>

        <div style={{ height: 8 }} />
        <div className="smallMuted">
          注：当前经络为“示意版路径”，你确认效果满意后，我可以把 12 经 + 任督全部补齐并精细对齐。
        </div>
      </div>

      {/* 右：解释 + trace 播放 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div className="card">
          <div style={{ fontSize: 18, fontWeight: 900 }}>{meridian?.nameZh || "—"}</div>
          <div style={{ height: 8 }} />
          <div className="smallMuted">
            这里放“给患者/学生看的解释”。后面你接 API 返回的 `plain_explain_zh`、`principles`、`evidence`，
            就能做到“解释 + 推理过程回放”一体化。
          </div>
          <div style={{ height: 10 }} />
          <div className="smallMuted">
            ⚠️ 仅作健康信息参考，不构成诊断或治疗建议。
          </div>
        </div>

        <TracePlayer trace={trace} />
      </div>
    </div>
  );
}

/**
 * 将 600x900 viewBox 坐标转换为百分比定位（适配响应式）
 */
function HotspotButton({ shape, onClick, active, title }) {
  const leftPct = (shape.x / 600) * 100;
  const topPct = (shape.y / 900) * 100;
  const wPct = (shape.w / 600) * 100;
  const hPct = (shape.h / 900) * 100;

  return (
    <button
      onClick={onClick}
      title={title}
      aria-label={title}
      style={{
        position: "absolute",
        left: `${leftPct}%`,
        top: `${topPct}%`,
        width: `${wPct}%`,
        height: `${hPct}%`,
        background: active ? "rgba(17,24,39,0.06)" : "transparent",
        border: active ? "1px solid rgba(17,24,39,0.15)" : "1px solid transparent",
        borderRadius: 12,
        cursor: "pointer"
      }}
    />
  );
}
