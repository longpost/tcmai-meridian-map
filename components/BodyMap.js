import React, { useEffect, useState } from "react";
import MeridianOverlay from "./MeridianOverlay";
import TracePlayer from "./TracePlayer";
import { MERIDIANS } from "../lib/meridians";
import { HOTSPOTS } from "../lib/hotspots";

const FRONT_MERIDIANS = ["LU", "LI", "ST", "SP", "HT", "SI", "PC", "SJ", "GB", "LV", "KI"];
const BACK_MERIDIANS = ["BL"];

export default function BodyMap() {
  const [lang, setLang] = useState("en"); // default English
  const [side, setSide] = useState("front");
  const [active, setActive] = useState("ST");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  // trace：默认不显示，点经络后显示
  const [showTrace, setShowTrace] = useState(false);
  const [traceKey, setTraceKey] = useState(0);

  // 参考层：显示你下载的那张“人+经络”SVG，帮你肉眼对齐
  const [showRef, setShowRef] = useState(false);

  async function fetchAnalysis(m) {
    setLoading(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selectedMeridian: m }),
      });
      const data = await res.json();
      setAnalysis(data);
    } catch (e) {
      setAnalysis({
        title_en: "Request failed",
        plain_explain_en: "Could not fetch /api/analyze. Check Vercel deployment.",
        trace_en: [{ kind: "error", text: String(e?.message || e) }],
        title_zh: "请求失败",
        plain_explain_zh: "无法获取 /api/analyze，请检查部署。",
        trace_zh: [{ kind: "error", text: String(e?.message || e) }],
      });
    } finally {
      setLoading(false);
    }
  }

  function selectMeridian(m) {
    const key = String(m).toUpperCase();

    // 点经络后再显示 trace
    setShowTrace(true);
    setTraceKey((v) => v + 1);

    // BL 自动切背面
    if (key === "BL") {
      setSide("back");
      setActive("BL");
      fetchAnalysis("BL");
      return;
    }

    setSide("front");
    setActive(key);
    fetchAnalysis(key);
  }

  // 初始加载右侧解释（不自动显示 trace）
  useEffect(() => {
    fetchAnalysis(active);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 防止 front 还停留 BL
  useEffect(() => {
    if (side === "front" && active === "BL") {
      setActive("ST");
      fetchAnalysis("ST");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [side]);

  const shownMeridians = side === "back" ? BACK_MERIDIANS : FRONT_MERIDIANS;

  const title =
    lang === "en"
      ? analysis?.title_en || MERIDIANS[active]?.nameEn || active
      : analysis?.title_zh || MERIDIANS[active]?.nameZh || active;

  const explain =
    lang === "en"
      ? analysis?.plain_explain_en || "Select a meridian to see details."
      : analysis?.plain_explain_zh || "请选择经络查看说明。";

  const trace = lang === "en" ? analysis?.trace_en || [] : analysis?.trace_zh || [];

  const disclaimer =
    lang === "en"
      ? "Educational information only. Not a diagnosis or medical advice."
      : "⚠️ 仅作健康信息参考，不构成诊断或治疗建议。";

  const traceLabels =
    lang === "en"
      ? { title: "Reasoning trace", pause: "Pause", play: "Play", reset: "Reset" }
      : { title: "推理回放", pause: "暂停", play: "播放", reset: "重置" };

  const traceHint =
    lang === "en" ? "Click a meridian to show the trace." : "点选任意经络后，才显示推理回放。";

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: 16, alignItems: "start" }}>
      {/* LEFT: Map */}
      <div className="card">
        <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontWeight: 900 }}>{lang === "en" ? "Meridian Map" : "经络图"}</div>

          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button className={`pill ${lang === "en" ? "pillActive" : ""}`} onClick={() => setLang("en")}>
              EN
            </button>
            <button className={`pill ${lang === "zh" ? "pillActive" : ""}`} onClick={() => setLang("zh")}>
              中文
            </button>

            <div style={{ width: 10 }} />

            <button className={`pill ${side === "front" ? "pillActive" : ""}`} onClick={() => setSide("front")}>
              {lang === "en" ? "Front" : "正面"}
            </button>
            <button
              className={`pill ${side === "back" ? "pillActive" : ""}`}
              onClick={() => {
                setSide("back");
                // 切背面不自动开 trace；只有点经络才开
                if (active !== "BL") {
                  setActive("BL");
                  fetchAnalysis("BL");
                }
              }}
            >
              {lang === "en" ? "Back" : "背面"}
            </button>

            <div style={{ width: 10 }} />

            {/* 参考层开关 */}
            <button className={`pill ${showRef ? "pillActive" : ""}`} onClick={() => setShowRef((v) => !v)}>
              {lang === "en" ? "Show Ref" : "参考"}
            </button>
          </div>
        </div>

        <div style={{ height: 10 }} />

        <div style={{ position: "relative", width: "100%", maxWidth: 560, margin: "0 auto", aspectRatio: "2 / 3" }}>
          {/* Base body */}
          <img
            src={side === "front" ? "/body/base_front.svg" : "/body/base_back.svg"}
            alt="body"
            style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
          />

          {/* Reference overlay: the downloaded meridian svg (human+meridians). For alignment/debug only. */}
          {showRef && (
            <img
              src="/body/12meridians12shichen.svg"
              alt="meridian-ref"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "contain",
                opacity: 0.22,
                pointerEvents: "none",
                zIndex: 10,
              }}
            />
          )}

          {/* Meridian overlay (interactive highlight) */}
          <div style={{ position: "absolute", inset: 0, zIndex: 20 }}>
            <MeridianOverlay activeMeridian={active} side={side} />
          </div>

          {/* Hotspots */}
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
        <div className="smallMuted">
          {lang === "en" ? "Note: BL is shown on the back view only." : "注：BL 仅在背面显示。"}
        </div>
      </div>

      {/* RIGHT: Explanation + Trace */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div className="card">
          <div style={{ fontSize: 18, fontWeight: 900 }}>
            {title} {loading ? (lang === "en" ? "(Loading…)" : "（加载中…）") : ""}
          </div>
          <div style={{ height: 8 }} />
          <div className="smallMuted">{explain}</div>
          <div style={{ height: 10 }} />
          <div className="smallMuted">{disclaimer}</div>
        </div>

        {!showTrace ? (
          <div className="card">
            <div className="smallMuted">{traceHint}</div>
          </div>
        ) : (
          <TracePlayer key={traceKey} trace={trace} labels={traceLabels} />
        )}
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
        cursor: "pointer",
        zIndex: 30, // 保证点击层在最上
      }}
    />
  );
}

