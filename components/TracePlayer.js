import React, { useEffect, useState } from "react";

export default function TracePlayer({ trace = [] }) {
  const [idx, setIdx] = useState(-1);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    if (idx >= trace.length - 1) return;
    const t = setTimeout(() => setIdx((v) => v + 1), 320);
    return () => clearTimeout(t);
  }, [playing, idx, trace.length]);

  useEffect(() => {
    setIdx(-1);
    setPlaying(false);
  }, [JSON.stringify(trace)]);

  const shown = idx < 0 ? [] : trace.slice(0, idx + 1);

  return (
    <div className="card">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <div style={{ fontWeight: 800 }}>推理回放</div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            className="pill"
            onClick={() => setPlaying((v) => !v)}
            disabled={trace.length === 0}
            title="播放/暂停"
          >
            {playing ? "Pause" : "Play"}
          </button>
          <button
            className="pill"
            onClick={() => { setIdx(-1); setPlaying(false); }}
            disabled={trace.length === 0}
          >
            Reset
          </button>
        </div>
      </div>

      <div style={{ height: 10 }} />
      {trace.length === 0 ? (
        <div className="smallMuted">（占位）后端返回 trace[] 后，这里会逐步显示推理步骤。</div>
      ) : (
        <ol style={{ margin: 0, paddingLeft: 18 }}>
          {shown.map((s, i) => (
            <li key={i} style={{ marginBottom: 6 }}>
              <span style={{ fontSize: 14 }}>{s.text}</span>
              {s.kind ? <span className="smallMuted"> · {s.kind}</span> : null}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
