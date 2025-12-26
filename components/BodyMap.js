import React, { useEffect, useMemo, useState } from "react";
import MeridianOverlay from "./MeridianOverlay";
import TracePlayer from "./TracePlayer";
import { MERIDIANS } from "../lib/meridians";
import { HOTSPOTS } from "../lib/hotspots";

const FRONT_MERIDIANS = ["LU", "LI", "ST", "SP", "HT", "SI", "PC", "SJ", "GB", "LV", "KI"]; // front 上先放 11 条
const BACK_MERIDIANS = ["BL"]; // back 目前只放 BL（你现在的经络图也是这么设计的）

export default function BodyMap() {
  const [side, setSide] = useState("front");
  const [active, setActive] = useState("ST");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchAnalysis(m) {
    setLoading(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selectedMeridian: m })
      });
      const data = await res.json();
      setAnalysis(data);
    } catch (e) {
      setAnalysis({
        meridians: [m],
        title_zh: "请求失败",
        plain_explain_zh: "无法获取分析结果，请检查 /api/analyze 是否部署成功。",
        trace: [{ kind: "error", text: String(e?.message || e) }]
      });
    } finally {
      setLoading(false);
    }
  }

  function selectMeridian(m) {
    const key = String(m).toUpperCase();

    // BL 只能背面
    if (key === "BL") {
      setSide("back");
      setActive("BL");
      fetchAnalysis("BL");
      return;
    }

    // 其它经络默认前面
    setSide("front");
    setActive(key);
    fetchAnalysis(key);
  }

  // 切回 front 时避免停留 BL
  useEffect(() => {
    if (side === "front" && active === "BL") {
      setActive("ST");
      fetchAnalysis("ST");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [side]);

  const shownMeridians = side === "back" ? BACK_MERIDIANS : FRONT_MERIDIANS;

  // 初始加载一次
  useEffect(() => {
    fetchAnalysis(active);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const title = analysis?.title_zh || (MERIDIANS[active]?.nameZh ?? active);
  const explain = analysis?.plain_explain_zh || "请选择经络以查看解释。";
  const trace = analysis?.trace || [];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 16, alignItems: "start" }}>
      <div className="card">
        <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontWeight: 900 }}>交互人体图</div>

          <div style={{ display: "flex", gap: 8 }}>
            <button className={`pill ${side === "front" ? "pillActive" : ""}`} onClick={() => setSide("front")}>
              Front
            </button>
            <button
              className={`pill ${side === "back" ? "pillActive" : ""}`}
              onClick={() => {
                setSide("back");
                if (active !== "BL") {
                  setActive("BL");
                  fetchAnalysis("BL");
                }
              }}
            >
              Back
            </button>
          </div>
        </div>

        <div style={{ height: 10 }} />

        <div style={{ position: "relative", width: "100%", maxWidth: 560, margin: "0 auto", aspectRatio: "2 / 3" }}>
          <img
            src={side === "front" ? "/body/base_front.svg" : "/body/base_back.svg"}
            alt="TCM body"
            style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
          />

          <div style={{ position: "absolute", inset: 0, color: MERIDIANS[active]?.color || "#0ea5e9" }}>
            <MeridianOverlay activeMeridian={active} side={side} />
          </div>

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

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {shownMeridians.map((k) => (
            <button key={k} className={`pill ${k === active ? "pillActive" : ""}`} onClick={() => selectMeridian(k)}>
              {k}
            </button>
          ))}
        </div>

        <div style={{ height: 8 }} />
        <div className="smallMuted">注：BL 仅在背面显示；点 BL 会自动切换到背面。</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div className="card">
          <div style={{ fontSize: 18, fontWeight: 900 }}>
            {title} {loading ? "（加载中…）" : ""}
          </div>
          <div style={{ height: 8 }} />
          <div className="smallMuted">{explain}</div>
          <div style={{ height: 10 }} />
          <div className="smallMuted">⚠️ 仅作健康信息参考，不构成诊断或治疗建议。</div>
        </div>

        <TracePlayer trace={trace} />
      </div>
    </div>
  );
}

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
        border: active ? "1px solid rgba(17,24,39,0.18)" : "1px solid transparent",
        borderRadius: 12,
        cursor: "pointer"
      }}
    />
  );
}

