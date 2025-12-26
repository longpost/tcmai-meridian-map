、// components/TracePlayer.js
import React, { useEffect, useMemo, useRef, useState } from "react";

export default function TracePlayer({
  trace = [],
  labels = {
    title: "Reasoning trace",
    pause: "Pause",
    play: "Play",
    reset: "Reset"
  }
}) {
  const [running, setRunning] = useState(true);
  const [idx, setIdx] = useState(0);
  const timerRef = useRef(null);

  const items = useMemo(() => Array.isArray(trace) ? trace : [], [trace]);

  useEffect(() => {
    if (!running) return;
    if (idx >= items.length) return;

    timerRef.current = setTimeout(() => setIdx((v) => v + 1), 650);
    return () => clearTimeout(timerRef.current);
  }, [running, idx, items.length]);

  function onReset() {
    setIdx(0);
    setRunning(true);
  }

  const shown = items.slice(0, idx);

  return (
    <div className="card">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <div style={{ fontWeight: 900 }}>{labels.title}</div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="pill" onClick={() => setRunning((v) => !v)}>
            {running ? labels.pause : labels.play}
          </button>
          <button className="pill" onClick={onReset}>
            {labels.reset}
          </button>
        </div>
      </div>

      <div style={{ height: 10 }} />

      {shown.length === 0 ? (
        <div className="smallMuted" style={{ opacity: 0.8 }}>
          {items.length ? "…" : "No trace."}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {shown.map((t, i) => (
            <div key={i} style={{ display: "flex", gap: 10 }}>
              <div className="smallMuted" style={{ minWidth: 76 }}>
                {t.kind || "step"}
              </div>
              <div style={{ lineHeight: 1.35 }}>{t.text}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
