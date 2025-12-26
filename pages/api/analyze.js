// pages/api/analyze.js

const DB = {
  LU: {
    title_zh: "手太阴肺经（LU）",
    plain_explain_zh:
      "肺经与呼吸系统、咽喉鼻部、皮毛（皮肤）等相关；循行由胸走上肢内侧至拇指。此处为经络知识讲解，不作疾病诊断。",
    trace: [
      { kind: "action", text: "选择经络：手太阴肺经（LU）" },
      { kind: "pathway", text: "循行要点：胸中 → 上肢内侧 → 拇指端（简化）" },
      { kind: "association", text: "常见相关：咳嗽、气短、咽喉不适、鼻塞、皮肤干燥/瘙痒等（概念性）" },
      { kind: "pairing", text: "表里：与手阳明大肠经相表里（概念性）" },
      { kind: "disclaimer", text: "提示：本页为知识与思路展示，不构成诊断或治疗建议。" }
    ]
  },

  LI: {
    title_zh: "手阳明大肠经（LI）",
    plain_explain_zh:
      "大肠经常与肠道功能、口鼻咽喉及面部反应相关；循行由食指走上肢外侧至肩颈面部。此处为经络知识讲解。",
    trace: [
      { kind: "action", text: "选择经络：手阳明大肠经（LI）" },
      { kind: "pathway", text: "循行要点：食指 → 上肢外侧 → 肩颈 → 面部（简化）" },
      { kind: "association", text: "常见相关：鼻塞、咽痛、牙龈不适、面部问题、肠道功能相关表现（概念性）" },
      { kind: "pairing", text: "表里：与手太阴肺经相表里（概念性）" },
      { kind: "disclaimer", text: "提示：本页为知识与思路展示，不构成诊断或治疗建议。" }
    ]
  },

  ST: {
    title_zh: "足阳明胃经（ST）",
    plain_explain_zh:
      "胃经常与消化系统、面部及下肢前外侧相关；循行从面部下行，经胸腹，至下肢前外侧到第二趾。此处为经络知识讲解。",
    trace: [
      { kind: "action", text: "选择经络：足阳明胃经（ST）" },
      { kind: "pathway", text: "循行要点：面部 → 胸腹 → 大腿/小腿前外侧 → 第二趾（简化）" },
      { kind: "association", text: "常见相关：胃脘不适、食欲/消化相关、面部肿痛、下肢前侧疼痛（概念性）" },
      { kind: "pairing", text: "表里：与足太阴脾经相表里（概念性）" },
      { kind: "disclaimer", text: "提示：本页为知识与思路展示，不构成诊断或治疗建议。" }
    ]
  },

  SP: {
    title_zh: "足太阴脾经（SP）",
    plain_explain_zh:
      "脾经常与消化吸收、运化水湿、肌肉及下肢内侧相关；循行由大趾上行，经小腿内侧至腹胸。此处为经络知识讲解。",
    trace: [
      { kind: "action", text: "选择经络：足太阴脾经（SP）" },
      { kind: "pathway", text: "循行要点：大趾 → 小腿内侧 → 腹部 → 胸（简化）" },
      { kind: "association", text: "常见相关：腹胀便溏、乏力困重、四肢沉重、下肢内侧不适（概念性）" },
      { kind: "pairing", text: "表里：与足阳明胃经相表里（概念性）" },
      { kind: "disclaimer", text: "提示：本页为知识与思路展示，不构成诊断或治疗建议。" }
    ]
  },

  HT: {
    title_zh: "手少阴心经（HT）",
    plain_explain_zh:
      "心经常与心神活动、胸部以及上肢内侧相关；循行由胸走上肢内侧至小指端。此处为经络知识讲解。",
    trace: [
      { kind: "action", text: "选择经络：手少阴心经（HT）" },
      { kind: "pathway", text: "循行要点：胸 → 上肢内侧 → 小指端（简化）" },
      { kind: "association", text: "常见相关：心悸胸闷、睡眠/情志相关、上肢内侧疼痛麻木（概念性）" },
      { kind: "pairing", text: "表里：与手太阳小肠经相表里（概念性）" },
      { kind: "disclaimer", text: "提示：本页为知识与思路展示，不构成诊断或治疗建议。" }
    ]
  },

  SI: {
    title_zh: "手太阳小肠经（SI）",
    plain_explain_zh:
      "小肠经常与肩胛、颈项及面部耳部相关；循行由小指走上肢外侧至肩背颈面。此处为经络知识讲解。",
    trace: [
      { kind: "action", text: "选择经络：手太阳小肠经（SI）" },
      { kind: "pathway", text: "循行要点：小指 → 上肢外侧 → 肩胛 → 颈项 → 面部/耳（简化）" },
      { kind: "association", text: "常见相关：肩胛颈项疼痛、耳部问题、下颌颊部不适（概念性）" },
      { kind: "pairing", text: "表里：与手少阴心经相表里（概念性）" },
      { kind: "disclaimer", text: "提示：本页为知识与思路展示，不构成诊断或治疗建议。" }
    ]
  },

  BL: {
    title_zh: "足太阳膀胱经（BL）",
    plain_explain_zh:
      "膀胱经与背腰、头项、下肢后侧联系紧密；循行沿背部脊柱两旁下行至下肢后侧。通常在背腰痛、项背紧张等讨论中常被提及。此处为经络知识讲解。",
    trace: [
      { kind: "action", text: "选择经络：足太阳膀胱经（BL）" },
      { kind: "pathway", text: "循行要点：头项 → 背部脊柱旁（两行）→ 臀腿后侧 → 足外侧（简化）" },
      { kind: "association", text: "常见相关：项背紧张、腰背酸痛、坐骨神经走向样疼痛、泌尿相关讨论（概念性）" },
      { kind: "pairing", text: "表里：与足少阴肾经相表里（概念性）" },
      { kind: "disclaimer", text: "提示：本页为知识与思路展示，不构成诊断或治疗建议。" }
    ]
  },

  KI: {
    title_zh: "足少阴肾经（KI）",
    plain_explain_zh:
      "肾经常与下肢内侧、腰膝及生殖泌尿系统讨论相关；循行由足底上行，经小腿内侧至腹胸。此处为经络知识讲解。",
    trace: [
      { kind: "action", text: "选择经络：足少阴肾经（KI）" },
      { kind: "pathway", text: "循行要点：足底/足内侧 → 小腿内侧后缘 → 腹胸（简化）" },
      { kind: "association", text: "常见相关：腰膝酸软、耳鸣、泌尿生殖相关讨论、足内侧问题（概念性）" },
      { kind: "pairing", text: "表里：与足太阳膀胱经相表里（概念性）" },
      { kind: "disclaimer", text: "提示：本页为知识与思路展示，不构成诊断或治疗建议。" }
    ]
  },

  PC: {
    title_zh: "手厥阴心包经（PC）",
    plain_explain_zh:
      "心包经常与胸闷、心神及上肢内侧中线相关；循行由胸走上肢内侧至中指。此处为经络知识讲解。",
    trace: [
      { kind: "action", text: "选择经络：手厥阴心包经（PC）" },
      { kind: "pathway", text: "循行要点：胸 → 上肢内侧（两筋之间）→ 中指端（简化）" },
      { kind: "association", text: "常见相关：胸闷心悸、焦虑紧张相关、上肢内侧疼痛麻木（概念性）" },
      { kind: "pairing", text: "表里：与手少阳三焦经相表里（概念性）" },
      { kind: "disclaimer", text: "提示：本页为知识与思路展示，不构成诊断或治疗建议。" }
    ]
  },

  SJ: {
    title_zh: "手少阳三焦经（SJ）",
    plain_explain_zh:
      "三焦经常与耳部、侧头、肩臂外侧相关；循行由无名指走上肢外侧至肩颈，绕耳到侧头。此处为经络知识讲解。",
    trace: [
      { kind: "action", text: "选择经络：手少阳三焦经（SJ）" },
      { kind: "pathway", text: "循行要点：无名指 → 上肢外侧 → 肩颈 → 耳周/侧头（简化）" },
      { kind: "association", text: "常见相关：耳鸣耳痛、偏头痛（侧头）、肩臂外侧疼痛（概念性）" },
      { kind: "pairing", text: "表里：与手厥阴心包经相表里（概念性）" },
      { kind: "disclaimer", text: "提示：本页为知识与思路展示，不构成诊断或治疗建议。" }
    ]
  },

  GB: {
    title_zh: "足少阳胆经（GB）",
    plain_explain_zh:
      "胆经常与体侧（头侧、胁肋、髋外侧、下肢外侧）相关；循行多沿身体侧面下行。此处为经络知识讲解。",
    trace: [
      { kind: "action", text: "选择经络：足少阳胆经（GB）" },
      { kind: "pathway", text: "循行要点：侧头/耳周 → 胁肋 → 髋外侧 → 下肢外侧 → 第四趾（简化）" },
      { kind: "association", text: "常见相关：胁肋痛、偏头痛、髋外侧/膝外侧疼痛、口苦等讨论（概念性）" },
      { kind: "pairing", text: "表里：与足厥阴肝经相表里（概念性）" },
      { kind: "disclaimer", text: "提示：本页为知识与思路展示，不构成诊断或治疗建议。" }
    ]
  },

  LV: {
    title_zh: "足厥阴肝经（LV）",
    plain_explain_zh:
      "肝经常与下肢内侧、胁肋及情志相关讨论有关；循行由足大趾上行，沿小腿内侧至腹胸。此处为经络知识讲解。",
    trace: [
      { kind: "action", text: "选择经络：足厥阴肝经（LV）" },
      { kind: "pathway", text: "循行要点：大趾 → 小腿内侧 → 胁肋/腹部 → 胸（简化）" },
      { kind: "association", text: "常见相关：胁肋不适、情志郁结相关讨论、下肢内侧牵扯痛（概念性）" },
      { kind: "pairing", text: "表里：与足少阳胆经相表里（概念性）" },
      { kind: "disclaimer", text: "提示：本页为知识与思路展示，不构成诊断或治疗建议。" }
    ]
  }
};

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Only POST allowed" });

  try {
    const { selectedMeridian } = req.body || {};
    if (!selectedMeridian) return res.status(400).json({ error: "selectedMeridian required" });

    const key = String(selectedMeridian).toUpperCase();
    const item = DB[key];

    if (!item) {
      return res.status(404).json({
        meridians: [key],
        title_zh: `未收录：${key}`,
        plain_explain_zh: "该经络暂未收录知识库内容。",
        trace: [{ kind: "action", text: `选择经络：${key}` }]
      });
    }

    return res.status(200).json({
      meridians: [key],
      ...item
    });
  } catch (e) {
    return res.status(500).json({ error: "Server error", detail: String(e?.message || e) });
  }
}
