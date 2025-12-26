// pages/index.js
import BodyMap from "../components/BodyMap";

export default function Home() {
  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 28, fontWeight: 900, margin: "0 0 10px" }}>
        TCM Meridian Map (Demo)
      </h1>

      <p style={{ margin: "0 0 18px", opacity: 0.75 }}>
        Click a meridian to highlight its pathway. The right panel shows an educational explanation and a step-by-step “trace” (not a diagnosis).
      </p>

      <BodyMap />
    </main>
  );
}
