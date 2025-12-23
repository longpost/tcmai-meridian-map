export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  // 占位：你后面把这里换成你现有 project 的规则+AI逻辑
  return res.status(200).json({
    trace: [
      { kind: "symptom", text: "命中：口苦、胁胀、易怒（示例）" },
      { kind: "rule", text: "肝气郁结 → 郁久化热（示例）" },
      { kind: "principle", text: "思路：疏肝理气 + 清热（示例）" }
    ],
    plain_explain_zh: "（示例）这些表现常见于压力/情绪紧张导致气机不畅，久则易化热。",
    disclaimer: "仅作信息参考，不构成诊断或治疗。"
  });
}
