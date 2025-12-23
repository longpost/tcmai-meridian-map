import BodyMap from "../components/BodyMap";
import "../styles/globals.css";

export default function Home() {
  return (
    <main style={{ padding: 16, maxWidth: 1100, margin: "0 auto" }}>
      <h1 className="hTitle">TCM Meridian Map (Vercel All-in-One)</h1>
      <div className="smallMuted">
        点击人体热区 → 高亮经络并播放“描边动画”。右侧显示解释 + 推理 trace 播放器（后续接你现有 AI/规则引擎）。
      </div>

      <div style={{ height: 12 }} />

      <BodyMap />
    </main>
  );
}
