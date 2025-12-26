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
        title_en: "Request failed",
        plain_explain_en: "Could not fetch /api/analyze. Check Vercel deployment.",
        trace_en: [{ kind: "error", text: String(e?.message || e) }],
        title_zh: "请求失败",
        plain_explain_zh: "无法获取 /api/analyze，请检查部署。",
        trace_zh: [{ kind: "error", text: String(e?.message || e) }]
      });
    } finally {
      setLoading(false);
    }
  }

  function selectMeridian(m) {
    const key = String(m).toUpperCase();

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

  useEffect(() => {
    // initial load
    fetchAnalysis(active);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // prevent BL on front
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

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: 16, alignItems: "start" }}>
      <div className="card">
        <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontWeight: 900 }}>{lang === "en" ? "Interactive Body Map" : "交互人体图"}</div>

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
                if (active !== "BL") {
                  setActive("BL");
                  fetchAnalysis("BL");
                }
              }}
            >
              {lang === "en" ? "Back" : "背面"}
            </button>
          </div>
        </div>

        <div style={{ height: 10 }} />

        <div style={{ position: "relative", width: "100%", maxWidth: 560, margin: "0 auto", aspectRatio: "2 / 3" }}>
          <img
            src={side === "front" ? "/body/base_front.svg" : "/body/base_back.svg"}
            alt="body"
            style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
          />

          <div style={{ position: "absolute", inset: 0, zIndex: 20 }}>
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
        <div className="smallMuted">
          {lang === "en" ? "Note: BL is shown on the back view only." : "注：BL 仅在背面显示。"}
        </div>
      </div>

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

        <TracePlayer
          trace={trace}
          labels={
            lang === "en"
              ? { title: "Reasoning trace", pause: "Pause", play: "Play", reset: "Reset" }
              : { title: "推理回放", pause: "暂停", play: "播放", reset: "重置" }
          }
        />

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


