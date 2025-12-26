// pages/api/analyze.js

const DB = {
  LU: {
    title_en: "Lung Meridian (LU)",
    plain_explain_en:
      "The Lung meridian is commonly discussed in relation to breathing, throat/nose, and skin. Pathway (simplified): chest → inner arm → thumb. Educational content only; not a diagnosis.",
    title_zh: "手太阴肺经（LU）",
    plain_explain_zh:
      "肺经常与呼吸、咽喉鼻部、皮毛（皮肤）等相关；循行简化：胸 → 上肢内侧 → 拇指。仅作知识讲解，不作诊断。",
    trace_en: [
      { kind: "action", text: "Selected meridian: Lung (LU)" },
      { kind: "pathway", text: "Pathway: chest → inner arm → thumb (simplified)" },
      { kind: "association", text: "Often discussed with: cough, shortness of breath, throat discomfort, nasal congestion, skin issues (conceptual)" },
      { kind: "pairing", text: "Paired with: Large Intestine (LI) (conceptual)" },
      { kind: "disclaimer", text: "Note: Educational info only; not medical advice." }
    ],
    trace_zh: [
      { kind: "action", text: "选择经络：手太阴肺经（LU）" },
      { kind: "pathway", text: "循行要点：胸 → 上肢内侧 → 拇指（简化）" },
      { kind: "association", text: "常见相关：咳嗽、气短、咽喉不适、鼻塞、皮肤问题（概念性）" },
      { kind: "pairing", text: "表里：与手阳明大肠经相表里（概念性）" },
      { kind: "disclaimer", text: "提示：仅作知识展示，不构成诊断或治疗建议。" }
    ]
  },

  LI: {
    title_en: "Large Intestine Meridian (LI)",
    plain_explain_en:
      "LI is often discussed with bowel function and head/face (nose, throat, teeth/gums). Pathway: index finger → outer arm → shoulder/neck → face (simplified).",
    title_zh: "手阳明大肠经（LI）",
    plain_explain_zh:
      "大肠经常与肠道功能、口鼻咽喉及面部反应相关；循行简化：食指 → 上肢外侧 → 肩颈 → 面部。",
    trace_en: [
      { kind: "action", text: "Selected meridian: Large Intestine (LI)" },
      { kind: "pathway", text: "Pathway: index finger → outer arm → shoulder/neck → face (simplified)" },
      { kind: "association", text: "Often discussed with: nasal congestion, sore throat, teeth/gum discomfort, facial issues, bowel-related patterns (conceptual)" },
      { kind: "pairing", text: "Paired with: Lung (LU) (conceptual)" },
      { kind: "disclaimer", text: "Educational info only; not medical advice." }
    ],
    trace_zh: [
      { kind: "action", text: "选择经络：手阳明大肠经（LI）" },
      { kind: "pathway", text: "循行要点：食指 → 上肢外侧 → 肩颈 → 面部（简化）" },
      { kind: "association", text: "常见相关：鼻塞、咽痛、牙龈不适、面部问题、肠道相关讨论（概念性）" },
      { kind: "pairing", text: "表里：与手太阴肺经相表里（概念性）" },
      { kind: "disclaimer", text: "提示：仅作知识展示，不构成诊断或治疗建议。" }
    ]
  },

  ST: {
    title_en: "Stomach Meridian (ST)",
    plain_explain_en:
      "ST is often discussed with digestion and the front-lateral leg. Pathway: face → chest/abdomen → front-lateral leg → 2nd toe (simplified).",
    title_zh: "足阳明胃经（ST）",
    plain_explain_zh:
      "胃经常与消化系统及下肢前外侧相关；循行简化：面部 → 胸腹 → 下肢前外侧 → 第二趾。",
    trace_en: [
      { kind: "action", text: "Selected meridian: Stomach (ST)" },
      { kind: "pathway", text: "Pathway: face → chest/abdomen → front-lateral leg → 2nd toe (simplified)" },
      { kind: "association", text: "Often discussed with: epigastric discomfort, appetite/digestion, facial swelling/pain, front leg pain (conceptual)" },
      { kind: "pairing", text: "Paired with: Spleen (SP) (conceptual)" },
      { kind: "disclaimer", text: "Educational info only; not medical advice." }
    ],
    trace_zh: [
      { kind: "action", text: "选择经络：足阳明胃经（ST）" },
      { kind: "pathway", text: "循行要点：面部 → 胸腹 → 下肢前外侧 → 第二趾（简化）" },
      { kind: "association", text: "常见相关：胃脘不适、食欲/消化相关、面部肿痛、下肢前侧疼痛（概念性）" },
      { kind: "pairing", text: "表里：与足太阴脾经相表里（概念性）" },
      { kind: "disclaimer", text: "提示：仅作知识展示，不构成诊断或治疗建议。" }
    ]
  },

  SP: {
    title_en: "Spleen Meridian (SP)",
    plain_explain_en:
      "SP is often discussed with digestion/transport of fluids and the inner leg. Pathway: big toe → inner leg → abdomen/chest (simplified).",
    title_zh: "足太阴脾经（SP）",
    plain_explain_zh:
      "脾经常与运化消化、水湿及下肢内侧相关；循行简化：大趾 → 小腿内侧 → 腹部 → 胸。",
    trace_en: [
      { kind: "action", text: "Selected meridian: Spleen (SP)" },
      { kind: "pathway", text: "Pathway: big toe → inner leg → abdomen/chest (simplified)" },
      { kind: "association", text: "Often discussed with: bloating/loose stool, fatigue/heaviness, inner leg discomfort (conceptual)" },
      { kind: "pairing", text: "Paired with: Stomach (ST) (conceptual)" },
      { kind: "disclaimer", text: "Educational info only; not medical advice." }
    ],
    trace_zh: [
      { kind: "action", text: "选择经络：足太阴脾经（SP）" },
      { kind: "pathway", text: "循行要点：大趾 → 小腿内侧 → 腹部/胸（简化）" },
      { kind: "association", text: "常见相关：腹胀便溏、乏力困重、四肢沉重、下肢内侧不适（概念性）" },
      { kind: "pairing", text: "表里：与足阳明胃经相表里（概念性）" },
      { kind: "disclaimer", text: "提示：仅作知识展示，不构成诊断或治疗建议。" }
    ]
  },

  HT: {
    title_en: "Heart Meridian (HT)",
    plain_explain_en:
      "HT is often discussed with chest and mental-emotional activity in TCM frameworks. Pathway: chest → inner arm → little finger (simplified).",
    title_zh: "手少阴心经（HT）",
    plain_explain_zh:
      "心经常与胸部及心神相关讨论；循行简化：胸 → 上肢内侧 → 小指端。",
    trace_en: [
      { kind: "action", text: "Selected meridian: Heart (HT)" },
      { kind: "pathway", text: "Pathway: chest → inner arm → little finger (simplified)" },
      { kind: "association", text: "Often discussed with: palpitations, chest tightness, sleep/emotional patterns, inner arm discomfort (conceptual)" },
      { kind: "pairing", text: "Paired with: Small Intestine (SI) (conceptual)" },
      { kind: "disclaimer", text: "Educational info only; not medical advice." }
    ],
    trace_zh: [
      { kind: "action", text: "选择经络：手少阴心经（HT）" },
      { kind: "pathway", text: "循行要点：胸 → 上肢内侧 → 小指端（简化）" },
      { kind: "association", text: "常见相关：心悸胸闷、睡眠/情志相关、上肢内侧不适（概念性）" },
      { kind: "pairing", text: "表里：与手太阳小肠经相表里（概念性）" },
      { kind: "disclaimer", text: "提示：仅作知识展示，不构成诊断或治疗建议。" }
    ]
  },

  SI: {
    title_en: "Small Intestine Meridian (SI)",
    plain_explain_en:
      "SI is often discussed with scapula/neck/jaw/ear regions. Pathway: little finger → outer arm → scapula/neck → face/ear (simplified).",
    title_zh: "手太阳小肠经（SI）",
    plain_explain_zh:
      "小肠经常与肩胛颈项、下颌及耳部相关；循行简化：小指 → 上肢外侧 → 肩胛/颈项 → 面部/耳。",
    trace_en: [
      { kind: "action", text: "Selected meridian: Small Intestine (SI)" },
      { kind: "pathway", text: "Pathway: little finger → outer arm → scapula/neck → face/ear (simplified)" },
      { kind: "association", text: "Often discussed with: neck/shoulder blade pain, jaw/cheek discomfort, ear issues (conceptual)" },
      { kind: "pairing", text: "Paired with: Heart (HT) (conceptual)" },
      { kind: "disclaimer", text: "Educational info only; not medical advice." }
    ],
    trace_zh: [
      { kind: "action", text: "选择经络：手太阳小肠经（SI）" },
      { kind: "pathway", text: "循行要点：小指 → 上肢外侧 → 肩胛/颈项 → 面部/耳（简化）" },
      { kind: "association", text: "常见相关：肩胛颈项疼痛、耳部问题、下颌颊部不适（概念性）" },
      { kind: "pairing", text: "表里：与手少阴心经相表里（概念性）" },
      { kind: "disclaimer", text: "提示：仅作知识展示，不构成诊断或治疗建议。" }
    ]
  },

  BL: {
    title_en: "Bladder Meridian (BL)",
    plain_explain_en:
      "BL is commonly discussed with the back/neck and the posterior leg. Pathway: head/neck → along the back (two lines) → posterior leg (simplified).",
    title_zh: "足太阳膀胱经（BL）",
    plain_explain_zh:
      "膀胱经与项背腰部、下肢后侧联系紧密；循行简化：头项 → 脊柱旁两行下行 → 下肢后侧。",
    trace_en: [
      { kind: "action", text: "Selected meridian: Bladder (BL)" },
      { kind: "pathway", text: "Pathway: head/neck → paraspinal lines → posterior leg (simplified)" },
      { kind: "association", text: "Often discussed with: neck/back tightness, low back pain patterns, posterior leg pain (conceptual)" },
      { kind: "pairing", text: "Paired with: Kidney (KI) (conceptual)" },
      { kind: "disclaimer", text: "Educational info only; not medical advice." }
    ],
    trace_zh: [
      { kind: "action", text: "选择经络：足太阳膀胱经（BL）" },
      { kind: "pathway", text: "循行要点：头项 → 脊柱旁（两行）→ 下肢后侧（简化）" },
      { kind: "association", text: "常见相关：项背紧张、腰背酸痛、下肢后侧牵扯痛（概念性）" },
      { kind: "pairing", text: "表里：与足少阴肾经相表里（概念性）" },
      { kind: "disclaimer", text: "提示：仅作知识展示，不构成诊断或治疗建议。" }
    ]
  },

  KI: {
    title_en: "Kidney Meridian (KI)",
    plain_explain_en:
      "KI is often discussed with low back/knees and the inner leg. Pathway: sole/inner foot → inner leg → abdomen/chest (simplified).",
    title_zh: "足少阴肾经（KI）",
    plain_explain_zh:
      "肾经常与腰膝、下肢内侧及泌尿生殖相关讨论有关；循行简化：足底/足内侧 → 小腿内侧 → 腹胸。",
    trace_en: [
      { kind: "action", text: "Selected meridian: Kidney (KI)" },
      { kind: "pathway", text: "Pathway: sole/inner foot → inner leg → abdomen/chest (simplified)" },
      { kind: "association", text: "Often discussed with: low back/knee weakness patterns, ear-related discussions, urinary/reproductive topics (conceptual)" },
      { kind: "pairing", text: "Paired with: Bladder (BL) (conceptual)" },
      { kind: "disclaimer", text: "Educational info only; not medical advice." }
    ],
    trace_zh: [
      { kind: "action", text: "选择经络：足少阴肾经（KI）" },
      { kind: "pathway", text: "循行要点：足底/足内侧 → 小腿内侧后缘 → 腹胸（简化）" },
      { kind: "association", text: "常见相关：腰膝酸软、耳鸣、泌尿生殖相关讨论、足内侧不适（概念性）" },
      { kind: "pairing", text: "表里：与足太阳膀胱经相表里（概念性）" },
      { kind: "disclaimer", text: "提示：仅作知识展示，不构成诊断或治疗建议。" }
    ]
  },

  PC: {
    title_en: "Pericardium Meridian (PC)",
    plain_explain_en:
      "PC is often discussed with chest discomfort and stress-related patterns in TCM contexts. Pathway: chest → inner arm → middle finger (simplified).",
    title_zh: "手厥阴心包经（PC）",
    plain_explain_zh:
      "心包经常与胸闷及情志紧张相关讨论；循行简化：胸 → 上肢内侧 → 中指端。",
    trace_en: [
      { kind: "action", text: "Selected meridian: Pericardium (PC)" },
      { kind: "pathway", text: "Pathway: chest → inner arm → middle finger (simplified)" },
      { kind: "association", text: "Often discussed with: chest tightness, anxiety/stress patterns, inner arm discomfort (conceptual)" },
      { kind: "pairing", text: "Paired with: Triple Energizer (SJ) (conceptual)" },
      { kind: "disclaimer", text: "Educational info only; not medical advice." }
    ],
    trace_zh: [
      { kind: "action", text: "选择经络：手厥阴心包经（PC）" },
      { kind: "pathway", text: "循行要点：胸 → 上肢内侧 → 中指端（简化）" },
      { kind: "association", text: "常见相关：胸闷、焦虑紧张相关、上肢内侧不适（概念性）" },
      { kind: "pairing", text: "表里：与手少阳三焦经相表里（概念性）" },
      { kind: "disclaimer", text: "提示：仅作知识展示，不构成诊断或治疗建议。" }
    ]
  },

  SJ: {
    title_en: "Triple Energizer Meridian (SJ)",
    plain_explain_en:
      "SJ is often discussed with the side of the head/ear region and the outer arm. Pathway: ring finger → outer arm → shoulder/neck → around ear/temple (simplified).",
    title_zh: "手少阳三焦经（SJ）",
    plain_explain_zh:
      "三焦经常与耳部、侧头及上肢外侧相关；循行简化：无名指 → 上肢外侧 → 肩颈 → 绕耳至侧头。",
    trace_en: [
      { kind: "action", text: "Selected meridian: Triple Energizer (SJ)" },
      { kind: "pathway", text: "Pathway: ring finger → outer arm → shoulder/neck → ear/temple (simplified)" },
      { kind: "association", text: "Often discussed with: ear issues, temporal headaches, lateral neck/shoulder pain (conceptual)" },
      { kind: "pairing", text: "Paired with: Pericardium (PC) (conceptual)" },
      { kind: "disclaimer", text: "Educational info only; not medical advice." }
    ],
    trace_zh: [
      { kind: "action", text: "选择经络：手少阳三焦经（SJ）" },
      { kind: "pathway", text: "循行要点：无名指 → 上肢外侧 → 肩颈 → 耳周/侧头（简化）" },
      { kind: "association", text: "常见相关：耳鸣耳痛、偏头痛（侧头）、肩臂外侧疼痛（概念性）" },
      { kind: "pairing", text: "表里：与手厥阴心包经相表里（概念性）" },
      { kind: "disclaimer", text: "提示：仅作知识展示，不构成诊断或治疗建议。" }
    ]
  },

  GB: {
    title_en: "Gallbladder Meridian (GB)",
    plain_explain_en:
      "GB is often discussed along the lateral body (side head, ribs, hip, outer leg). Pathway: side head → ribs → lateral hip → outer leg → 4th toe (simplified).",
    title_zh: "足少阳胆经（GB）",
    plain_explain_zh:
      "胆经多沿身体侧面下行；循行简化：侧头/耳周 → 胁肋 → 髋外侧 → 下肢外侧 → 第四趾。",
    trace_en: [
      { kind: "action", text: "Selected meridian: Gallbladder (GB)" },
      { kind: "pathway", text: "Pathway: side head → ribs → lateral hip → outer leg → 4th toe (simplified)" },
      { kind: "association", text: "Often discussed with: rib-side discomfort, temporal headache, lateral hip/knee pain, bitter taste (conceptual)" },
      { kind: "pairing", text: "Paired with: Liver (LV) (conceptual)" },
      { kind: "disclaimer", text: "Educational info only; not medical advice." }
    ],
    trace_zh: [
      { kind: "action", text: "选择经络：足少阳胆经（GB）" },
      { kind: "pathway", text: "循行要点：侧头/耳周 → 胁肋 → 髋外侧 → 下肢外侧 → 第四趾（简化）" },
      { kind: "association", text: "常见相关：胁肋痛、偏头痛、髋外侧/膝外侧疼痛、口苦等讨论（概念性）" },
      { kind: "pairing", text: "表里：与足厥阴肝经相表里（概念性）" },
      { kind: "disclaimer", text: "提示：仅作知识展示，不构成诊断或治疗建议。" }
    ]
  },

  LV: {
    title_en: "Liver Meridian (LV)",
    plain_explain_en:
      "LV is often discussed with the inner leg and rib-side areas, and emotional stress patterns in TCM discussions. Pathway: big toe → inner leg → abdomen/chest (simplified).",
    title_zh: "足厥阴肝经（LV）",
    plain_explain_zh:
      "肝经常与下肢内侧、胁肋及情志相关讨论有关；循行简化：大趾 → 小腿内侧 → 腹胸（简化）。",
    trace_en: [
      { kind: "action", text: "Selected meridian: Liver (LV)" },
      { kind: "pathway", text: "Pathway: big toe → inner leg → abdomen/chest (simplified)" },
      { kind: "association", text: "Often discussed with: rib-side discomfort, stress/irritability patterns, inner leg pulling pain (conceptual)" },
      { kind: "pairing", text: "Paired with: Gallbladder (GB) (conceptual)" },
      { kind: "disclaimer", text: "Educational info only; not medical advice." }
    ],
    trace_zh: [
      { kind: "action", text: "选择经络：足厥阴肝经（LV）" },
      { kind: "pathway", text: "循行要点：大趾 → 小腿内侧 → 胁肋/腹部 → 胸（简化）" },
      { kind: "association", text: "常见相关：胁肋不适、情志郁结相关讨论、下肢内侧牵扯痛（概念性）" },
      { kind: "pairing", text: "表里：与足少阳胆经相表里（概念性）" },
      { kind: "disclaimer", text: "提示：仅作知识展示，不构成诊断或治疗建议。" }
    ]
  }
};

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Only POST allowed" });

  const { selectedMeridian } = req.body || {};
  const key = String(selectedMeridian || "").toUpperCase();
  if (!key) return res.status(400).json({ error: "selectedMeridian required" });

  const item = DB[key];
  if (!item) {
    return res.status(404).json({
      meridians: [key],
      title_en: `Not found: ${key}`,
      plain_explain_en: "This meridian is not yet available.",
      trace_en: [{ kind: "action", text: `Selected meridian: ${key}` }],
      title_zh: `未收录：${key}`,
      plain_explain_zh: "该经络暂未收录。",
      trace_zh: [{ kind: "action", text: `选择经络：${key}` }]
    });
  }

  return res.status(200).json({ meridians: [key], ...item });
}

