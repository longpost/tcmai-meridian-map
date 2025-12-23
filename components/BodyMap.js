import React, { useEffect, useMemo, useState } from "react";
import MeridianOverlay from "./MeridianOverlay";
import TracePlayer from "./TracePlayer";
import { MERIDIANS } from "../lib/meridians";
import { HOTSPOTS } from "../lib/hotspots";

/**
 * 规则：
 * - BL 只在背面显示
 * - 点 BL 自动切到 back
 * - 从 back 切回 front 时，若 active=BL，自动切到 ST
 */

const FRONT_MERIDIANS = ["LU", "LI", "ST", "SP", "GB"];
const BACK_MERIDIANS = ["BL"]; // 后面可加 DU 等

export default function BodyMap() {
  const [side, setSide] = useState("front"); // "front" | "back"
  const [active, setActive] = useState("ST");

  /**
   * 统一入口：选择经络
   */
  function selectMeridian(m) {
    if (m === "BL") {
      setSide("back");
      setActive("BL");
      return;
    }
    setSide("front");
    setActive(m);
  }

  /**
   * 切换到 front 时，避免 BL 残留
   */
  useEffect(() => {
    if (side === "front" && active === "BL") {
      setActive("ST");
    }
  }, [side, active]);

  /**
   * 当前 side 下允许显示的经络
   */
  const shownMeridians = side === "back" ? BACK_MERIDIANS : FRONT_MERIDIANS;

  /**
   * 当前经络信息
   */
  const meridian = MERIDIANS[active];
  const color = meridian?.color || "#0ea5e9";

  /**
   * 示例 trace（后面你接 /api/analyze 即可替换）
   */
  const trace = useMemo(() => {
    switch (active) {
      case "ST":
        return [
          { kind: "symptom", text: "命中：胃脘胀、嗳气、食欲差（示例）" },
          { kind: "rule", text: "脾胃气机不畅 → 胃失和降（示例）" },
          { kind: "principle", text: "思路：和胃降逆、理气（示例）" }
        ];
      case "GB":
        return [
          { kind: "symptom", text: "命中：口苦、胁胀、易怒（示例）" },
          { kind: "rule", text: "肝气郁结，郁久化热（示例）" },
          { kind: "principle", text: "思路：疏肝理气、清热（示例）" }
        ];
      case "BL":
        return [
          { kind: "symptom", text: "命中：腰背酸痛、畏寒（示例）" },
          { kind: "rule", text: "足太阳经脉受阻（示例）" },
          { kind: "principle", text: "思路：通经活络、温养（示例）" }
        ];
      default:
        return [
          { kind: "symptom", text: "命中：相关症状（示例）" },
          { kind: "rule", text: "经络相关线索（示例）" },
          { kind: "principle", text: "思路：整体调理（示例）" }
        ];
    }
  }, [active]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 380px",
        gap: 16,
        alignItems: "start"
      }}
    >
      {/* 左侧：人体图 */}
      <div className="card">
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <div style={{ fontWeight: 900 }}>交互人体图</div>

          <div style={{ display: "flex", gap: 8 }}>
            <button
              className={`pill ${side === "front" ? "pillActive" : ""}`}
              onClick={() => setSide("front")}
            >
              Front
            </button>
            <button
              className={`pill ${side === "back" ? "pillActive" : ""}`}
              onClick={() => {
                setSide("back");
                if (active !== "BL") setActive("BL");
              }}
            >
              Back
            </button>
          </div>
        </div>

        <div style={{ height: 10 }} />

        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 560,
            margin: "0 auto",
            aspectRatio: "2 / 3"
          }}
        >
          {/* 底图 */}
          <img
            src={side === "front" ? "/body/base_front.svg" : "/body/base_back.svg"}
            alt="TCM body"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              display: "block"
            }}
          />

          {/* 经络叠加（裁剪在人体轮廓内） */}
          <div style={{ position: "absolute", inset: 0, color }}>
            <MeridianOverlay activeMeridian={active} side={side} />
          </div>

          {/* 热区（示例：仍然共用，真实项目可拆 front/back） */}
          {HOTSPOTS.map((h) => (
            <HotspotButton
              key={h.id}
              shape={h.shape}
              title={h.label}
              active={active === h.meridian}
              onClick={() => selectMeridian(h.meridian)}
            />
          ))}
        </div>

        <div style={{ height: 12 }} />

        {/* 经络按钮 */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {shownMeridians.map((k) => (
            <button
              key={k}
              className={`pill ${k === active ? "pillActive" : ""}`}
              onClick={() => selectMeridian(k)}
              title={MERIDIANS[k]?.nameZh}
            >
              {k}
            </button>
          ))}
        </div>

        <div style={{ height: 8 }} />
        <div className="smallMuted">
          注：BL 仅在背面显示；点 BL 会自动切换到背面视图。
        </div>
      </div>

      {/* 右侧：解释 + 推理回放 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div className="card">
          <div style={{ fontSize: 18, fontWeight: 900 }}>
            {meridian?.nameZh || "—"}
          </div>
          <div style={{ height: 8 }} />
          <div className="smallMuted">
            这里显示给患者/学生的解释文本。后续接入 /api/analyze
            的 plain_explain_zh 即可替换。
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
 * 热区按钮（600×900 viewBox → 百分比定位）
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
        border: active
          ? "1px solid rgba(17,24,39,0.18)"
          : "1px solid transparent",
        borderRadius: 12,
        cursor: "pointer"
      }}
    />
  );
}

