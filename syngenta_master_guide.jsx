import { useState } from "react";

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const GROUPS = [
  { id:"h-chloroacetamide", type:"herbicide", cluster:"Chloroacetamide", moa:"ยับยั้งการแบ่งเซลล์ราก — HRAC K3", moa_short:"คุมดิน pre-em ยับยั้งรากงอก", color:"#2e7d32", bg:"#e8f5e9",
    memory:"💡 -chlor/-acetamide → คุมดิน pre-em → Dual Gold, Sofit, Acetochlor",
    products:[
      {name:"Dual Gold",ai:"S-Metolachlor 96% EC",crops:"ข้าวโพด, อ้อย, ถั่ว"},
      {name:"Sofit",ai:"Pretilachlor 300g/L EC",crops:"ข้าว (นาหว่านน้ำตม)"},
      {name:"Acetochlor 50 EC",ai:"Acetochlor 50% EC",crops:"ข้าวโพด, อ้อย"},
    ]},
  { id:"h-triazine", type:"herbicide", cluster:"Triazine / HPPD Inhibitor", moa:"PSii blocker (Atrazine) + HPPD bleach (Mesotrione) — HRAC C1/F2", moa_short:"หยุดสังเคราะห์แสง / ใบขาวซีด", color:"#388e3c", bg:"#e8f5e9",
    memory:"💡 Atrazine = PSii ▸ Calaris = HPPD+PSii คู่หู (bleach+burn) ▸ ใบขาว = Mesotrione",
    products:[
      {name:"Aatrex 900g",ai:"Atrazine 90% WDG",crops:"ข้าวโพด, อ้อย"},
      {name:"Calaris",ai:"Mesotrione 75g/L + Atrazine 375g/L SC",crops:"ข้าวโพด, อ้อย"},
    ]},
  { id:"h-ppo", type:"herbicide", cluster:"PPO / Oxadiargyl / Aclonifen", moa:"ยับยั้ง Protoporphyrinogen oxidase — HRAC E", moa_short:"contact + ระบบ เซลล์ระเบิด ใบไหม้เร็ว", color:"#1b5e20", bg:"#e8f5e9",
    memory:"💡 PPO = เซลล์ระเบิด contact kill ▸ Salviro(ข้าว) / Challenge(อ้อย)",
    products:[
      {name:"Salviro",ai:"Oxadiargyl SC",crops:"ข้าว (PPO)"},
      {name:"Solito",ai:"Isoxaflutole + Aclonifen SC",crops:"ข้าวโพด, อ้อย (pre-em)"},
      {name:"Challenge 35% EC",ai:"Aclonifen 35% EC",crops:"อ้อย, ข้าวโพด"},
    ]},
  { id:"h-glyphosate", type:"herbicide", cluster:"Glyphosate / Glufosinate (Non-selective)", moa:"ยับยั้ง EPSP synthase (Glyphosate) / Glutamine synthase (Glufosinate) — HRAC G/H", moa_short:"ฆ่าหมด ไม่เลือก systemic ใช้ก่อนปลูก", color:"#004d40", bg:"#e8f5e9",
    memory:"💡 Glyphosate = ฆ่าหมด systemic ▸ Glufosinate = contact เร็วกว่า ▸ ห้ามโดน crop",
    products:[
      {name:"Touchdown Evo",ai:"Glyphosate potassium salt SL",crops:"ก่อนปลูก, ร่องแถว"},
      {name:"Kona",ai:"Glyphosate SL (เข้มข้น)",crops:"ก่อนปลูก, พื้นที่ว่าง"},
      {name:"Caballus 15%",ai:"Glyphosate 15% SL",crops:"ก่อนปลูก, ระหว่างแถว"},
      {name:"GLUTINA",ai:"Glufosinate-ammonium SL",crops:"ก่อนปลูก, ระหว่างแถว"},
    ]},
  { id:"h-other", type:"herbicide", cluster:"Herbicide อื่นๆ (Pyta / Echo)", moa:"Mixed MoA", moa_short:"ใช้เฉพาะ crop/ช่วงเวลา", color:"#2e7d32", bg:"#e8f5e9",
    memory:"💡 Pyta = ข้าว pre-post / Echo = Chlorothalonil contact (dual-use fungicide/herbicide additive)",
    products:[
      {name:"Pyta 24% EC",ai:"Pretilachlor + systemic combo",crops:"ข้าว"},
      {name:"Echo 60% EC",ai:"Chlorothalonil 60% EC",crops:"ผัก (ดูหมวด fungicide ด้วย)"},
    ]},
  { id:"f-strobilurin", type:"fungicide", cluster:"Strobilurin (QoI) — FRAC 11", moa:"ยับยั้ง Complex III mitochondria (Quinone outside Inhibitor)", moa_short:"systemic broad-spectrum ใบเขียวนาน ทนฝน", color:"#6a1b9a", bg:"#f3e5f5",
    memory:"💡 -strobin ท้ายชื่อ = FRAC 11 = ใบเขียว (stay-green) → Amistar, Ortiva, Twist",
    products:[
      {name:"Amistar",ai:"Azoxystrobin 25% SC",crops:"ข้าว, ผัก, ไม้ผล"},
      {name:"Ortiva",ai:"Azoxystrobin 25% SC",crops:"ข้าว, ผัก"},
      {name:"TWIST",ai:"Trifloxystrobin 50% WG",crops:"ผัก, ไม้ผล, ข้าว"},
    ]},
  { id:"f-dmi", type:"fungicide", cluster:"DMI Triazole — FRAC 3", moa:"ยับยั้ง Sterol biosynthesis (Demethylation Inhibitor)", moa_short:"systemic ยับยั้งผนังเซลล์รา ป้องกัน+กำจัด", color:"#7b1fa2", bg:"#f3e5f5",
    memory:"💡 -conazole/-azole = FRAC 3 DMI → Score(Difen), Tilt(Prop), Anvil(Hexa), Armure(Tetra)",
    products:[
      {name:"Score",ai:"Difenoconazole 25% EC",crops:"ผัก, ไม้ผล, ข้าว"},
      {name:"TILT",ai:"Propiconazole 25% EC",crops:"ข้าว (กาบใบแห้ง, ใบจุด)"},
      {name:"Anvil",ai:"Hexaconazole 5% SC",crops:"ข้าว, ยางพารา"},
      {name:"Armure",ai:"Tetraconazole EC",crops:"ผัก, ไม้ผล, ข้าว"},
    ]},
  { id:"f-combo", type:"fungicide", cluster:"Combo FRAC 11+3 (Strobilurin+DMI)", moa:"ออกฤทธิ์คู่ FRAC11 + FRAC3 ป้องกัน resistance", moa_short:"broad-spectrum + resistance management", color:"#8e24aa", bg:"#f3e5f5",
    memory:"💡 Combo = ป้องกัน resistance ▸ Quilt(Azox+Prop) / Reflect Evo(Azox+Hexa) = rice flagship",
    products:[
      {name:"Quilt",ai:"Azoxystrobin + Propiconazole SC",crops:"ข้าว (combo FRAC11+3)"},
      {name:"Reflect Evo",ai:"Azoxystrobin + Hexaconazole SC",crops:"ข้าว (กาบใบแห้ง, เมล็ดด่าง ⭐)"},
    ]},
  { id:"f-metalaxyl", type:"fungicide", cluster:"Metalaxyl / Cymoxanil (ราน้ำ) — FRAC 4", moa:"ยับยั้ง RNA polymerase (Metalaxyl) + multi-site contact (Chlorothalonil/Mancozeb)", moa_short:"เฉพาะ Oomycetes (ราน้ำ) + broad contact", color:"#4a148c", bg:"#f3e5f5",
    memory:"💡 Metalaxyl = ราน้ำเท่านั้น (downy, blight) ▸ Folio Gold = Metalaxyl-M + Chlorothalonil",
    products:[
      {name:"Folio Gold",ai:"Metalaxyl-M 3.3% + Chlorothalonil 33.1% SC",crops:"ผัก, ข้าวโพด (downy mildew)"},
      {name:"Phytab-M",ai:"Cymoxanil + Mancozeb WP",crops:"มะเขือเทศ, ผัก (late blight)"},
      {name:"Dioff",ai:"Carbendazim + Mancozeb SC",crops:"ข้าว, ผัก (blast, anthracnose)"},
    ]},
  { id:"i-neonicotinoid", type:"insecticide", cluster:"Neonicotinoid — IRAC 4A/4C", moa:"กระตุ้น nAChR (nicotinic acetylcholine receptor) ใน CNS แมลง", moa_short:"ดูดซึมระบบ ฆ่าแมลงปากดูด เพลี้ยทุกชนิด", color:"#b71c1c", bg:"#fdecea",
    memory:"💡 -oxam/-thiam = IRAC 4A nAChR → Actara(TMX เพลี้ว) / Kunoichi(Flupyr IRAC4C) / Plenum(9B feeding block)",
    products:[
      {name:"Actara",ai:"Thiamethoxam 25% WG",crops:"ข้าว, มัน, ทุเรียน, ผัก"},
      {name:"Kunoichi",ai:"Flupyradifurone SL (IRAC 4C)",crops:"ผัก, ไม้ผล (เพลี้ย, ไวท์ฟลาย)"},
      {name:"Plenum",ai:"Pymetrozine 50% WG (IRAC 9B)",crops:"ข้าว (เพลี้ยกระโดด, เพลี้ยไฟ)"},
    ]},
  { id:"i-pyrethroid", type:"insecticide", cluster:"Pyrethroid — IRAC 3A", moa:"รบกวน Voltage-gated Na+ channel → อัมพาต", moa_short:"contact knockdown เร็ว broad spectrum", color:"#c62828", bg:"#fdecea",
    memory:"💡 -thrin/-halothrin = IRAC 3A Na-channel → กระตุก+อัมพาต → Karate / Eforia(combo pyrethroid)",
    products:[
      {name:"Karate Zeon",ai:"Lambda-cyhalothrin 50g/L CS",crops:"ข้าว, ข้าวโพด, ผัก, ไม้ผล"},
      {name:"Eforia",ai:"Tefluthrin+Lambda-cyhalothrin EC",crops:"ข้าวโพด, ข้าว, อ้อย"},
    ]},
  { id:"i-diamide", type:"insecticide", cluster:"Diamide (Ryanodine Receptor) — IRAC 28", moa:"กระตุ้น Ryanodine Receptor (RyR) → Ca²⁺ หลุด → กล้ามเนื้ออัมพาต", moa_short:"ดูดซึม systemic ฆ่าหนอน residual ยาว ทนฝน", color:"#d32f2f", bg:"#fdecea",
    memory:"💡 -prole = IRAC 28 RyR → หนอนทุกชนิด ▸ Virtako(+TMX) / Evicent / Paxara / Fortenza Duo(seed)",
    products:[
      {name:"Virtako",ai:"Chlorantraniliprole 40g/kg + Thiamethoxam 200g/kg WG",crops:"ข้าว, ข้าวโพด (หนอน+เพลี้ว)"},
      {name:"EVICENT",ai:"Cyantraniliprole SC (Diamide gen2)",crops:"ผัก, ไม้ผล, ข้าว"},
      {name:"Paxara",ai:"Chlorantraniliprole 20% SC",crops:"ผัก, ไม้ผล, ข้าว"},
      {name:"Fortenza Duo",ai:"Cyantraniliprole + Thiamethoxam (Seed Tx)",crops:"ข้าวโพด, ผัก (seed treatment)"},
    ]},
  { id:"i-gaba", type:"insecticide", cluster:"Meta-diamide / GABA — IRAC 30 (ใหม่)", moa:"GABA-gated Cl⁻ channel allosteric modulator → อัมพาต", moa_short:"MoA ใหม่ ไม่ cross-resistance กับ IRAC 3A/4A/28", color:"#e53935", bg:"#fdecea",
    memory:"💡 IRAC 30 = กลุ่มใหม่ GABA blocker → ใช้เมื่อแมลงดื้อยา ▸ Solvigo(Broflanilide) / Simodis(Isocycloseram)",
    products:[
      {name:"Solvigo",ai:"Broflanilide SC (IRAC 30)",crops:"ข้าว, ผัก (หนอน, แมลงดื้อยา)"},
      {name:"SIMODIS 100DC",ai:"Isocycloseram DC (IRAC 30 variant)",crops:"ผัก, ข้าว (thrips, caterpillar)"},
    ]},
  { id:"i-other", type:"insecticide", cluster:"Emamectin / Afidopyropen — IRAC 6", moa:"Cl⁻ channel activator (Avermectin class) → อัมพาต", moa_short:"ฆ่าหนอน resistant สูง กิน+contact", color:"#b71c1c", bg:"#fdecea",
    memory:"💡 Curyom = Emamectin benzoate IRAC 6 → หนอนกระทู้, หนอนใยผัก resistant",
    products:[
      {name:"Curyom",ai:"Emamectin benzoate WG (IRAC 6)",crops:"ผัก, ไม้ผล (หนอน resistant)"},
    ]},
  { id:"bio", type:"bio", cluster:"Biostimulant & Plant Nutrition", moa:"ไม่ใช่สารฆ่าศัตรูพืช — กระตุ้นการเจริญ ลด stress", moa_short:"เสริมพลังพืช ลด heat/drought stress ธาตุอาหารรอง", color:"#00796b", bg:"#e0f7fa",
    memory:"💡 กลุ่มนี้ไม่ฆ่า — ใช้ร่วมกับสารอื่นหรือช่วง stress ▸ Isabion/Quantis(stress) Brexil(micronutrient)",
    products:[
      {name:"Isabion",ai:"Protein hydrolysate amino acid biostimulant",crops:"ผัก, ไม้ผล, ข้าว (heat/drought stress)"},
      {name:"Boosten",ai:"Seaweed extract + micro-element",crops:"ผัก, ไม้ผล (เร่งออกดอก/ผล)"},
      {name:"Quantis",ai:"Osmoprotectant biostimulant",crops:"ข้าว, ข้าวโพด (heat stress)"},
      {name:"Brexil CalBo",ai:"Chelated Ca + B",crops:"ไม้ผล, ผัก (blossom end rot, fruit crack)"},
      {name:"Brexil Multi",ai:"Chelated multi-micronutrient",crops:"ทุกพืช (แก้ขาดธาตุรอง)"},
      {name:"MC Set",ai:"Calcium + micronutrient foliar",crops:"ผัก, ไม้ผล"},
      {name:"MC Extra",ai:"Multi-micronutrient chelate WP",crops:"ผัก, ไม้ผล"},
      {name:"SMARTWET",ai:"Surfactant / wetter (tolling)",crops:"ผสมสารเพิ่มประสิทธิภาพ"},
    ]},
];

// ─────────────────────────────────────────────
// FLASH CARDS DATA (semantic + term cards)
// ─────────────────────────────────────────────
const FLASH_CARDS = [
  // --- TERM CARDS ---
  {id:"t1", deck:"term", front:"IRAC คืออะไร?", back:"Insecticide Resistance Action Committee\nจัดกลุ่ม MoA ของยาฆ่าแมลง เป็น Group 1,2,3A,4A,28,30…\n→ ถ้าแมลงดื้อ Group เดียวกัน → rotation ไม่ช่วย"},
  {id:"t2", deck:"term", front:"FRAC คืออะไร?", back:"Fungicide Resistance Action Committee\nจัดกลุ่ม MoA ของ fungicide เป็น FRAC 3,4,11…\n→ ใช้สลับ group ป้องกัน resistance"},
  {id:"t3", deck:"term", front:"HRAC คืออะไร?", back:"Herbicide Resistance Action Committee\nจัดกลุ่ม MoA ของ herbicide เป็น HRAC C1,E,F2,G,K3…\n→ วัชพืชดื้อ group เดียวกัน → ต้องเปลี่ยน group"},
  {id:"t4", deck:"term", front:"MoA คืออะไร?", back:"Mode of Action\n= กลไกการออกฤทธิ์ของสาร\nสาร 2 ตัวที่ MoA เหมือนกัน → ออกฤทธิ์จุดเดียวกัน → cross-resistance เกิดง่าย"},
  {id:"t5", deck:"term", front:"Systemic vs Contact คืออะไร?", back:"Systemic = ดูดซึมเข้าต้น เคลื่อนที่ได้ ฆ่าแม้ไม่โดนสาร\nContact = ฆ่าเฉพาะส่วนที่โดนสาร ออกฤทธิ์เร็ว\n→ Systemic ดีกว่า residual / Contact ดีกว่า knockdown"},
  {id:"t6", deck:"term", front:"Pre-emergence vs Post-emergence?", back:"Pre-em = ใส่ก่อนวัชพืชงอก (คุมดิน)\nPost-em = ใส่หลังวัชพืชงอกแล้ว (ฆ่า)\n→ Chloroacetamide = pre-em / Glyphosate = post-em"},
  {id:"t7", deck:"term", front:"DMI (Demethylation Inhibitor) คืออะไร?", back:"กลุ่ม Triazole fungicide FRAC 3\nยับยั้ง Sterol biosynthesis ทำให้ผนังเซลล์ราบกพร่อง\n→ สังเกตชื่อ -conazole ท้าย: Score, Tilt, Anvil, Armure"},
  {id:"t8", deck:"term", front:"QoI (Strobilurin) คืออะไร?", back:"Quinone outside Inhibitor = FRAC 11\nยับยั้ง Complex III mitochondria ของเชื้อรา\n→ ผลพิเศษ: ใบเขียวนาน (stay-green effect)\n→ ชื่อ -strobin: Azoxystrobin, Trifloxystrobin"},
  {id:"t9", deck:"term", front:"Ryanodine Receptor (RyR) คืออะไร?", back:"จุดออกฤทธิ์ของ Diamide insecticide (IRAC 28)\nRyR ควบคุม Ca²⁺ release ในกล้ามเนื้อแมลง\n→ Diamide กระตุ้น RyR → Ca²⁺ หลุดต่อเนื่อง → กล้ามเนื้ออัมพาต → ตาย\n→ ชื่อ -prole: Chlorantraniliprole, Cyantraniliprole"},
  {id:"t10", deck:"term", front:"Neonicotinoid (nAChR) คืออะไร?", back:"IRAC 4A — กระตุ้น Nicotinic Acetylcholine Receptor\nทำให้ระบบประสาทแมลง over-stimulate\n→ เพลี้วทุกชนิด แมลงปากดูด\n→ ชื่อ -oxam/-thiam: Thiamethoxam (Actara)"},
  {id:"t11", deck:"term", front:"HPPD Inhibitor คืออะไร?", back:"4-Hydroxyphenylpyruvate Dioxygenase Inhibitor — HRAC F2\nหยุดสร้าง Carotenoid → ใบขาวซีด (bleaching)\n→ Mesotrione (ใน Calaris) ออกฤทธิ์แบบนี้\n→ ใบขาว = สัญญาณจำ"},
  {id:"t12", deck:"term", front:"Resistance Management คืออะไร?", back:"การป้องกันไม่ให้ศัตรูพืชดื้อยา\nวิธีหลัก:\n1. Rotation MoA/Group\n2. Mixing สาร 2 Group\n3. ไม่ใช้ Group เดิมซ้ำเกิน 2 รอบ/season\n→ IRAC/FRAC/HRAC ออกแบบมาเพื่อสิ่งนี้"},
  // --- PRODUCT CARDS ---
  {id:"p1", deck:"product", front:"Reflect Evo ใช้กับอะไร? AI คืออะไร?", back:"AI: Azoxystrobin + Hexaconazole SC\nFRAC: 11 + 3 (combo)\nใช้: ข้าว — โรคกาบใบแห้ง, เมล็ดด่าง, ใบจุดสีน้ำตาล\n⭐ Flagship rice fungicide TH"},
  {id:"p2", deck:"product", front:"Virtako ต่างจาก Actara ยังไง?", back:"Virtako: Chlorantraniliprole(Diamide IRAC28) + Thiamethoxam(Neonicotinoid IRAC4A)\n→ หนอน + เพลี้ว ในครั้งเดียว\n\nActara: Thiamethoxam เดี่ยว\n→ เพลี้วปากดูดเท่านั้น\n\n→ Virtako = 2 MoA = broader + resistance safer"},
  {id:"p3", deck:"product", front:"Simodis ต่างจาก Solvigo ยังไง?", back:"ทั้งคู่ = IRAC 30 (GABA blocker) กลุ่มใหม่\nSimodis: Isocycloseram DC — thrips, caterpillar, sucking\nSolvigo: Broflanilide SC — หนอน, แมลงดื้อยา\n→ ใช้เมื่อ pyrethroid/neonicotinoid เริ่ม resistant"},
  {id:"p4", deck:"product", front:"Folio Gold ป้องกันโรคอะไร? ทำไมต้องผสม 2 สาร?", back:"AI: Metalaxyl-M (FRAC4, systemic) + Chlorothalonil (FRAC M5, contact)\nโรค: Downy mildew, Damping off, Pythium (ราน้ำ)\n→ Metalaxyl-M เข้าเนื้อพืช ▸ Chlorothalonil ป้องกันผิว\n→ 2 สาร = ป้องกัน resistance + broader coverage"},
  {id:"p5", deck:"product", front:"Score vs Armure vs Tilt vs Anvil ต่างกันยังไง?", back:"ทั้งหมด = DMI Triazole FRAC 3\nScore → Difenoconazole: ผัก, ไม้ผล, ข้าว (broad)\nTilt → Propiconazole: ข้าวโดยเฉพาะ\nAnvil → Hexaconazole: ข้าว, ยางพารา\nArmure → Tetraconazole: ผัก, ไม้ผล\n→ MoA เหมือน แต่ spectrum ต่าง"},
  {id:"p6", deck:"product", front:"Calaris ใช้ยังไง? ทำไมใบวัชพืชถึงขาว?", back:"AI: Mesotrione (HPPD inhibitor) + Atrazine (PSii blocker)\n→ Mesotrione: หยุดสร้าง Carotenoid → ใบขาวซีด\n→ Atrazine: หยุดสังเคราะห์แสง → ตาย\n→ 2 MoA คนละจุด = synergistic effect\nใช้: ข้าวโพด, อ้อย post/pre-em"},
  {id:"p7", deck:"product", front:"Isabion / Quantis / Boosten ใช้ทำอะไร?", back:"ไม่ใช่สารฆ่าศัตรูพืช = Biostimulant\nIsabion: Amino acid → ลด heat/drought stress\nQuantis: Osmoprotectant → ลด heat stress ข้าว/ข้าวโพด\nBoosten: Seaweed extract → เร่งออกดอก/ผล\n→ ใช้เสริมในช่วงสภาพอากาศสุดขีด"},
  {id:"p8", deck:"product", front:"Fortenza Duo คืออะไร? ต่างจาก Evicent?", back:"Fortenza Duo: Cyantraniliprole + Thiamethoxam → Seed Treatment\n→ ใส่ที่เมล็ดก่อนปลูก ป้องกัน early season pest\n\nEvicent: Cyantraniliprole SC → foliar spray\n→ ฉีดพ่น ใช้ช่วงต้นโต\n→ AI เหมือน (Cyantraniliprole) แต่วิธีใช้ต่าง"},
  // --- REGION / SEASON cards ---
  {id:"s1", deck:"season", front:"ข้าว: สารที่ต้องรู้ ตามช่วงการเจริญ", back:"🌱 ปักดำ/หว่าน: Sofit (คุมวัชพืช)\n🌿 แตกกอ: Topik (วัชพืชใบแคบ) + Actara (เพลี้ว)\n🌾 ตั้งท้อง→ออกรวง: Virtako (หนอนกอ) + Reflect Evo (โรคกาบใบ)\n📦 ใกล้เก็บ: Tilt/Anvil (โรคใบจุด) + Plenum (เพลี้ยกระโดด)"},
  {id:"s2", deck:"season", front:"ข้าวโพด: สารที่ต้องรู้ ตามช่วง", back:"🌱 ก่อนปลูก/หลังปลูก: Dual Gold (คุมวัชพืช) + Aatrex/Calaris\n🌿 ต้นอ่อน: Karate/Virtako (หนอนกระทู้ fall armyworm)\n🌽 ตั้งฝัก: Eforia + Amistar (โรคราใบ)\n📦 Fortenza Duo = seed treatment เริ่มต้น"},
  {id:"s3", deck:"season", front:"ภาคอีสาน (ข้าว+มันสำปะหลัง): สารหลัก", back:"ข้าว: Reflect Evo, Actara, Virtako, Topik\nมันสำปะหลัง: Actara (เพลี้ยแป้ง ⭐ priority pest)\nวัชพืชมัน: Touchdown/Kona (ก่อนปลูก)\n→ เพลี้ยแป้งมัน = ปัญหา #1 อีสาน → Actara คือ key product"},
  {id:"s4", deck:"season", front:"ภาคกลาง (ข้าว+ผัก): สารหลัก", back:"ข้าว: Reflect Evo, Tilt, Quilt (โรค) + Actara, Virtako (แมลง)\nผัก: Score/Armure (โรค) + Proclaim/Evicent/Paxara (หนอน)\nMicro: Brexil CalBo (ผักผล ป้องกัน crack)\n→ ผักภาคกลาง = หนอน + โรคราสำคัญ"},
  {id:"s5", deck:"season", front:"ภาคใต้ (ยางพารา+ทุเรียน): สารหลัก", back:"ยางพารา: Anvil (โรคใบร่วง) + Gramoxone/Touchdown (วัชพืชร่องแถว)\nทุเรียน: Actara (เพลี้ยไก่แจ้ ⭐) + Score/Armure (โรคผล)\n→ ทุเรียน = premium crop → Actara คือ must-know"},
  {id:"s6", deck:"season", front:"ฤดูแล้ง (Hot/Dry): สารที่ควร push", back:"🌡️ Heat stress สูง → Biostimulant สำคัญ:\nQuantis, Isabion, Boosten\n→ ลด stress + ช่วยให้สารป้องกันออกฤทธิ์ได้ดีขึ้น\n🌧️ หลังแล้ว/ต้นฝน: Calaris (คุมวัชพืชก่อนฝน) + Folio Gold (ราน้ำ)"},
];

// ─────────────────────────────────────────────
// HEATMAP DATA: Product × Thai Region
// ─────────────────────────────────────────────
const HEATMAP_ROWS = [
  "Reflect Evo","Amistar","Ortiva","Score","Tilt","Anvil","Folio Gold",
  "Actara","Virtako","Karate Zeon","Plenum","Evicent","Solvigo","Simodis",
  "Dual Gold","Sofit","Aatrex","Calaris","Touchdown Evo","Gramoxone",
  "Isabion","Quantis","Brexil CalBo",
];
const HEATMAP_COLS = ["เหนือ\n(ข้าวโพด)", "อีสาน\n(ข้าว/มัน)", "กลาง\n(ข้าว/ผัก)", "ตะวันออก\n(ผัก/ทุเรียน)", "ใต้\n(ยาง/ทุเรียน)"];
// 0=none 1=low 2=med 3=high
const HEATMAP_DATA = {
  "Reflect Evo":     [2,3,3,1,1],
  "Amistar":         [1,2,3,3,2],
  "Ortiva":          [1,2,2,2,1],
  "Score":           [1,1,3,3,2],
  "Tilt":            [1,3,2,1,1],
  "Anvil":           [0,1,2,1,3],
  "Folio Gold":      [2,1,3,2,1],
  "Actara":          [1,3,2,3,3],
  "Virtako":         [3,3,3,1,1],
  "Karate Zeon":     [2,2,3,2,1],
  "Plenum":          [1,3,2,0,0],
  "Evicent":         [1,1,3,2,1],
  "Solvigo":         [1,2,2,1,1],
  "Simodis":         [1,1,2,2,1],
  "Dual Gold":       [3,1,1,2,0],
  "Sofit":           [1,3,2,0,0],
  "Aatrex":          [3,1,1,1,0],
  "Calaris":         [3,1,1,1,0],
  "Touchdown Evo":   [2,2,2,2,2],
  "Gramoxone":       [2,2,2,1,3],
  "Isabion":         [1,2,2,3,2],
  "Quantis":         [2,3,2,1,1],
  "Brexil CalBo":    [0,0,2,3,2],
};

const HEAT_COLORS = ["#f5f5f5","#c8e6c9","#66bb6a","#1b5e20"];
const HEAT_LABELS = ["—","ต่ำ","ปานกลาง","สูง"];

const TYPE_META = {
  herbicide:{label:"Herbicide",icon:"🌿",color:"#2e7d32",bg:"#e8f5e9"},
  fungicide:{label:"Fungicide",icon:"🍄",color:"#6a1b9a",bg:"#f3e5f5"},
  insecticide:{label:"Insecticide",icon:"🐛",color:"#c62828",bg:"#fdecea"},
  bio:{label:"Bio/Nutrition",icon:"🧬",color:"#00796b",bg:"#e0f7fa"},
};

const DECK_META = {
  term:{label:"Term & Concept",icon:"📚",color:"#1565c0"},
  product:{label:"Product Deep-Dive",icon:"🔬",color:"#6a1b9a"},
  season:{label:"Region & Season",icon:"🗺️",color:"#e65100"},
};

const NAVS = ["Semantic Map","Flash Cards","Heatmap"];

// ─────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────
export default function SyngentaMasterGuide() {
  const [nav, setNav] = useState("Semantic Map");
  const [mapFilter, setMapFilter] = useState("all");
  const [expanded, setExpanded] = useState({});
  const [deck, setDeck] = useState("term");
  const [flashIdx, setFlashIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [heatRow, setHeatRow] = useState(null);
  const [heatCol, setHeatCol] = useState(null);

  const toggle = id => setExpanded(e => ({...e,[id]:!e[id]}));
  const filtered = mapFilter==="all" ? GROUPS : GROUPS.filter(g=>g.type===mapFilter);
  const deckCards = FLASH_CARDS.filter(c=>c.deck===deck);
  const card = deckCards[flashIdx % deckCards.length];

  const nextCard = () => { setFlipped(false); setFlashIdx(i=>(i+1)%deckCards.length); };
  const prevCard = () => { setFlipped(false); setFlashIdx(i=>(i-1+deckCards.length)%deckCards.length); };

  return (
    <div style={{fontFamily:"'Segoe UI',sans-serif",background:"#f5f5f5",minHeight:"100vh"}}>
      {/* HEADER */}
      <div style={{background:"linear-gradient(135deg,#1a3a2a,#2d5a3e)",color:"white",padding:"16px 16px 0"}}>
        <div style={{fontSize:10,letterSpacing:2,opacity:.6,marginBottom:2}}>SYNGENTA FREE MARKET TH — MASTER GUIDE</div>
        <div style={{fontSize:18,fontWeight:800,marginBottom:12}}>Product Intelligence Hub</div>
        <div style={{display:"flex",gap:2}}>
          {NAVS.map(n=>(
            <button key={n} onClick={()=>setNav(n)} style={{
              background:nav===n?"white":"transparent",
              color:nav===n?"#1a3a2a":"rgba(255,255,255,0.75)",
              border:"none",padding:"7px 12px",borderRadius:"8px 8px 0 0",
              fontWeight:nav===n?700:400,fontSize:12,cursor:"pointer",whiteSpace:"nowrap"
            }}>{n}</button>
          ))}
        </div>
      </div>

      <div style={{padding:"14px 14px 28px"}}>

        {/* ══════════════════ SEMANTIC MAP ══════════════════ */}
        {nav==="Semantic Map" && (
          <div>
            {/* Filter */}
            <div style={{display:"flex",gap:6,marginBottom:12,overflowX:"auto",paddingBottom:4}}>
              {["all","herbicide","fungicide","insecticide","bio"].map(t=>{
                const m=t==="all"?{label:"ทั้งหมด",icon:"📋",color:"#333"}:TYPE_META[t];
                const act=mapFilter===t;
                return <button key={t} onClick={()=>setMapFilter(t)} style={{
                  background:act?m.color:"white",color:act?"white":"#555",
                  border:`1.5px solid ${act?m.color:"#ddd"}`,borderRadius:20,
                  padding:"5px 12px",fontSize:11,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0,fontWeight:act?700:400
                }}>{m.icon} {m.label}</button>;
              })}
            </div>

            {/* Groups */}
            {filtered.map(g=>{
              const open=expanded[g.id];
              const m=TYPE_META[g.type];
              return (
                <div key={g.id} style={{background:"white",borderRadius:12,marginBottom:10,overflow:"hidden",border:`1.5px solid ${g.color}20`,boxShadow:"0 1px 3px rgba(0,0,0,0.06)"}}>
                  <div onClick={()=>toggle(g.id)} style={{padding:"12px 14px",cursor:"pointer",borderLeft:`4px solid ${g.color}`,background:open?g.bg:"white"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                      <div style={{flex:1}}>
                        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4,flexWrap:"wrap"}}>
                          <span style={{fontSize:10,background:g.color,color:"white",padding:"2px 7px",borderRadius:10,fontWeight:600}}>{m.icon} {m.label}</span>
                          <span style={{fontSize:10,color:"#aaa"}}>{g.products.length} products</span>
                        </div>
                        <div style={{fontWeight:700,fontSize:13,color:g.color,marginBottom:2}}>{g.cluster}</div>
                        <div style={{fontSize:11,color:"#666"}}>{g.moa_short}</div>
                      </div>
                      <span style={{fontSize:14,color:"#bbb",marginLeft:8,flexShrink:0}}>{open?"▲":"▼"}</span>
                    </div>
                    <div style={{marginTop:8,fontSize:11,color:g.color,background:g.bg,borderRadius:6,padding:"5px 9px",fontWeight:500}}>{g.memory}</div>
                  </div>
                  {open && (
                    <div style={{borderTop:`1px solid ${g.color}20`}}>
                      <div style={{padding:"7px 14px",background:g.bg,fontSize:11,color:"#555",borderBottom:`1px solid ${g.color}15`}}>
                        <strong style={{color:g.color}}>🔬 MoA:</strong> {g.moa}
                      </div>
                      <div style={{overflowX:"auto"}}>
                        <table style={{width:"100%",borderCollapse:"collapse",fontSize:11,minWidth:380}}>
                          <thead>
                            <tr style={{background:g.color}}>
                              <th style={{padding:"7px 10px",textAlign:"left",color:"white",minWidth:110}}>Product</th>
                              <th style={{padding:"7px 10px",textAlign:"left",color:"white",minWidth:160}}>Active Ingredient</th>
                              <th style={{padding:"7px 10px",textAlign:"left",color:"white",minWidth:120}}>Crop</th>
                            </tr>
                          </thead>
                          <tbody>
                            {g.products.map((p,i)=>(
                              <tr key={p.name} style={{background:i%2===0?"white":g.bg+"80"}}>
                                <td style={{padding:"7px 10px",fontWeight:600,color:g.color,borderBottom:`1px solid ${g.color}15`}}>{p.name}</td>
                                <td style={{padding:"7px 10px",color:"#333",borderBottom:`1px solid ${g.color}15`}}>{p.ai}</td>
                                <td style={{padding:"7px 10px",color:"#666",borderBottom:`1px solid ${g.color}15`}}>{p.crops}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Summary card */}
            <div style={{background:"#1a3a2a",color:"white",borderRadius:12,padding:16,marginTop:4}}>
              <div style={{fontWeight:700,fontSize:13,marginBottom:10}}>🧠 Semantic Memory Map — พร้อม Products</div>
              <div style={{fontSize:11,lineHeight:1.9,color:"rgba(255,255,255,0.85)"}}>
                <span style={{color:"#a5d6a7",fontWeight:700}}>🌿 Herbicide — Target Site:</span><br/>
                Pre-em คุมดิน (HRAC K3) → Dual Gold, Sofit, Acetochlor<br/>
                PSii ขัดแสง (HRAC C1) → Aatrex | HPPD ขาวซีด (F2) → Calaris<br/>
                PPO เซลล์ระเบิด (HRAC E) → Salviro, Challenge, Solito<br/>
                Non-selective systemic (HRAC G) → Touchdown, Kona, Caballus, Glutina<br/>
                <br/>
                <span style={{color:"#ef9a9a",fontWeight:700}}>🐛 Insecticide — IRAC Group:</span><br/>
                4A nAChR เพลี้ว → Actara | 4C → Kunoichi | 9B feeding block → Plenum<br/>
                3A Na-channel knockdown → Karate Zeon, Eforia<br/>
                28 RyR หนอน systemic → Virtako, Evicent, Paxara, Fortenza Duo<br/>
                30 GABA ใหม่ resist mgmt → Solvigo, Simodis | 6 Cl-channel → Curyom<br/>
                <br/>
                <span style={{color:"#ce93d8",fontWeight:700}}>🍄 Fungicide — FRAC Group:</span><br/>
                11 Strobilurin stay-green → Amistar, Ortiva, Twist<br/>
                3 DMI Triazole → Score(Difen), Tilt(Prop), Anvil(Hexa), Armure(Tetra)<br/>
                11+3 Combo → Quilt, Reflect Evo ⭐ | 4 Metalaxyl ราน้ำ → Folio Gold<br/>
                <br/>
                <span style={{color:"#80cbc4",fontWeight:700}}>🧬 Bio/Nutrition — ไม่ฆ่า เสริมพลัง:</span><br/>
                Stress relief → Isabion, Quantis, Boosten<br/>
                Micronutrient → Brexil CalBo(Ca+B), Brexil Multi, MC Set, MC Extra
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════ FLASH CARDS ══════════════════ */}
        {nav==="Flash Cards" && (
          <div>
            {/* Deck selector */}
            <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}>
              {Object.entries(DECK_META).map(([k,m])=>{
                const act=deck===k;
                return <button key={k} onClick={()=>{setDeck(k);setFlashIdx(0);setFlipped(false);}} style={{
                  background:act?m.color:"white",color:act?"white":"#444",
                  border:`1.5px solid ${act?m.color:"#ccc"}`,borderRadius:20,
                  padding:"6px 14px",fontSize:12,cursor:"pointer",flexShrink:0,fontWeight:act?700:400
                }}>{m.icon} {m.label} ({FLASH_CARDS.filter(c=>c.deck===k).length})</button>;
              })}
            </div>

            <div style={{fontSize:12,color:"#888",textAlign:"center",marginBottom:10}}>
              {flashIdx+1} / {deckCards.length} — แตะการ์ดเพื่อดูเฉลย
            </div>

            {/* Card */}
            <div onClick={()=>setFlipped(!flipped)} style={{
              background:flipped?"#1a3a2a":"white",
              color:flipped?"white":"#1a2e1a",
              borderRadius:16,padding:"24px 20px",minHeight:210,
              border:"2px solid #1a3a2a",cursor:"pointer",
              transition:"background 0.25s, color 0.25s",
              display:"flex",flexDirection:"column",justifyContent:"center",
            }}>
              {!flipped ? (
                <>
                  <div style={{fontSize:10,opacity:.4,marginBottom:12,letterSpacing:1}}>
                    {DECK_META[card.deck].icon} {DECK_META[card.deck].label.toUpperCase()} — FRONT
                  </div>
                  <div style={{fontSize:16,fontWeight:700,lineHeight:1.5}}>{card.front}</div>
                  <div style={{marginTop:20,fontSize:11,color:"#aaa"}}>แตะเพื่อดูเฉลย →</div>
                </>
              ) : (
                <>
                  <div style={{fontSize:10,opacity:.55,marginBottom:12,letterSpacing:1}}>BACK — คำตอบ</div>
                  <div style={{fontSize:13,lineHeight:1.8,whiteSpace:"pre-wrap"}}>{card.back}</div>
                </>
              )}
            </div>

            <div style={{display:"flex",gap:10,marginTop:12}}>
              <button onClick={prevCard} style={{flex:1,padding:11,background:"white",border:"1.5px solid #ccc",borderRadius:10,fontSize:13,cursor:"pointer"}}>← ก่อนหน้า</button>
              <button onClick={nextCard} style={{flex:1,padding:11,background:"#1a3a2a",color:"white",border:"none",borderRadius:10,fontSize:13,cursor:"pointer"}}>ถัดไป →</button>
            </div>

            {/* Deck description */}
            <div style={{marginTop:14,background:"white",borderRadius:10,padding:12,border:"1px solid #e0e0e0",fontSize:11,color:"#555"}}>
              {deck==="term" && "📚 Term & Concept: IRAC / FRAC / HRAC / MoA และ concept สำคัญ — เรียนก่อนจะเข้าใจ product ลึกขึ้น"}
              {deck==="product" && "🔬 Product Deep-Dive: เปรียบ product คู่ใกล้เคียง เช่น Virtako vs Actara, Score vs Armure — สำหรับอธิบายให้ grower/dealer"}
              {deck==="season" && "🗺️ Region & Season: map product ตามภาค+ฤดูกาล — ใช้วางแผน campaign ตาม grower reach target"}
            </div>
          </div>
        )}

        {/* ══════════════════ HEATMAP ══════════════════ */}
        {nav==="Heatmap" && (
          <div>
            <div style={{background:"white",borderRadius:12,padding:12,marginBottom:12,border:"1px solid #e0e0e0"}}>
              <div style={{fontWeight:700,fontSize:14,color:"#1a3a2a",marginBottom:4}}>Product × Region Heatmap</div>
              <div style={{fontSize:11,color:"#888",marginBottom:8}}>ความสำคัญของ product ตามภาค (ประเมินจาก crop หลัก+pest pressure) — แตะแถว/คอลัมน์เพื่อ highlight</div>
              <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                {HEAT_LABELS.map((l,i)=>(
                  <div key={l} style={{display:"flex",alignItems:"center",gap:5,fontSize:11}}>
                    <div style={{width:14,height:14,borderRadius:3,background:HEAT_COLORS[i],border:"1px solid #ccc"}}/>
                    <span style={{color:"#666"}}>{l}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{overflowX:"auto",WebkitOverflowScrolling:"touch",borderRadius:12,border:"1px solid #ddd",background:"white"}}>
              <table style={{borderCollapse:"collapse",fontSize:11,minWidth:440}}>
                <thead>
                  <tr style={{background:"#1a3a2a"}}>
                    <th style={{padding:"9px 10px",textAlign:"left",color:"white",fontSize:11,position:"sticky",left:0,background:"#1a3a2a",minWidth:110,zIndex:2}}>Product</th>
                    {HEATMAP_COLS.map((col,ci)=>(
                      <th key={ci} onClick={()=>setHeatCol(heatCol===ci?null:ci)} style={{
                        padding:"8px 6px",textAlign:"center",color:"white",fontSize:10,cursor:"pointer",
                        minWidth:60,background:heatCol===ci?"#2d5a3e":"#1a3a2a",lineHeight:1.3,
                        whiteSpace:"pre-line",transition:"background 0.2s"
                      }}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {HEATMAP_ROWS.map((row,ri)=>{
                    const vals=HEATMAP_DATA[row]||[0,0,0,0,0];
                    const isHRow=heatRow===row;
                    // determine product type for row label color
                    const grp=GROUPS.find(g=>g.products.some(p=>p.name===row||row.startsWith(p.name.split(" ")[0])));
                    const rowColor=grp?TYPE_META[grp.type].color:"#333";
                    return (
                      <tr key={row} onClick={()=>setHeatRow(isHRow?null:row)} style={{cursor:"pointer",background:isHRow?"#f1f8e9":"white",transition:"background 0.2s"}}>
                        <td style={{
                          padding:"8px 10px",fontWeight:600,fontSize:11,color:rowColor,
                          position:"sticky",left:0,background:isHRow?"#f1f8e9":"white",
                          zIndex:1,borderRight:`2px solid ${rowColor}30`,borderBottom:"1px solid #f0f0f0"
                        }}>{row}</td>
                        {vals.map((v,ci)=>{
                          const isHCol=heatCol===ci;
                          const highlight=isHRow||isHCol;
                          return (
                            <td key={ci} style={{
                              padding:"8px 6px",textAlign:"center",fontSize:14,
                              background:HEAT_COLORS[v],
                              outline:highlight?`2px solid ${rowColor}`:"none",
                              outlineOffset:"-1px",
                              transition:"outline 0.15s",
                              borderBottom:"1px solid #f5f5f5"
                            }}>
                              {v===3?"🔥":v===2?"◉":v===1?"○":""}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Regional insight cards */}
            <div style={{marginTop:14,fontWeight:700,fontSize:13,color:"#1a3a2a",marginBottom:10}}>📍 Regional Insight</div>
            {[
              {region:"🌽 เหนือ",crop:"ข้าวโพด+อ้อย",key:"Virtako, Aatrex, Calaris, Dual Gold, Eforia",note:"Fall Armyworm = top priority / Herbicide คุมดินสำคัญ"},
              {region:"🌾 อีสาน",crop:"ข้าว+มันสำปะหลัง",key:"Actara, Virtako, Sofit, Reflect Evo, Tilt, Quantis",note:"เพลี้ยแป้งมัน = pest #1 / Heat stress สูง → Quantis สำคัญ"},
              {region:"🥬 กลาง",crop:"ข้าว+ผัก",key:"Reflect Evo, Folio Gold, Evicent, Paxara, Score, Isabion",note:"ผัก = หนอน+โรคราซับซ้อน / Biostimulant ผักพรีเมียม"},
              {region:"🍈 ตะวันออก",crop:"ผัก+ทุเรียน",key:"Actara, Score, Armure, Brexil CalBo, Evicent",note:"ทุเรียน = high value / Actara เพลี้ยไก่แจ้ = must-have"},
              {region:"🌴 ใต้",crop:"ยางพารา+ทุเรียน",key:"Anvil, Actara, Gramoxone, Touchdown, Armure",note:"ยาง = Anvil โรคใบร่วง / ทุเรียน = Actara+Score ขายดี"},
            ].map(r=>(
              <div key={r.region} style={{background:"white",borderRadius:10,padding:12,marginBottom:8,border:"1px solid #e0e0e0"}}>
                <div style={{fontWeight:700,fontSize:13,color:"#1a3a2a",marginBottom:2}}>{r.region} — {r.crop}</div>
                <div style={{fontSize:11,color:"#2e7d32",fontWeight:600,marginBottom:4}}>⭐ Key: {r.key}</div>
                <div style={{fontSize:11,color:"#888"}}>💡 {r.note}</div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
