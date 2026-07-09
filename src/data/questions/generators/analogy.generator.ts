// Generator สำหรับสร้างข้อสอบอุปมาอุปไมย (Analogy) จำนวนมาก
// เป้าหมาย: 250 ข้อ

import { AnalogyQuestion } from '../analogy';

let questionId = 3000;

// Helper functions
const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// ความสัมพันธ์พื้นฐาน
const analogyPatterns = {
  // เครื่องมือ - การใช้งาน
  tool_use: [
    { pair: ['ปากกา', 'เขียน'], options: ['ไม้กวาด', 'กวาด', 'เขียน', 'ลบ'] },
    { pair: ['มีด', 'ตัด'], options: ['ค้อน', 'ตอก', 'ตัด', 'ขว้าง'] },
    { pair: ['ส้อม', 'จิ้ม'], options: ['ช้อน', 'ตัก', 'จิ้ม', 'กิน'] },
    { pair: ['กรรไกร', 'ตัด'], options: ['เทป', 'ติด', 'ตัด', 'ลอก'] },
    { pair: ['เข็ม', 'เย็บ'], options: ['ด้าย', 'ผูก', 'เย็บ', 'ถัก'] },
  ],
  
  // สัตว์ - ที่อยู่อาศัย
  animal_home: [
    { pair: ['นก', 'รัง'], options: ['ปลา', 'น้ำ', 'รัง', 'บิน'] },
    { pair: ['สุนัข', 'บ้าน'], options: ['แมว', 'นอน', 'บ้าน', 'เห่า'] },
    { pair: ['มด', 'รัง'], options: ['ผึ้ง', 'รวง', 'รัง', 'บิน'] },
    { pair: ['กระต่าย', 'โพรง'], options: ['งู', 'เลื้อย', 'โพรง', 'กัด'] },
    { pair: ['ค้างคาว', 'ถ้ำ'], options: ['เสือ', 'ป่า', 'ถ้ำ', 'บิน'] },
  ],
  
  // วิชาชีพ - สถานที่ทำงาน
  profession_place: [
    { pair: ['ครู', 'โรงเรียน'], options: ['หมอ', 'รักษา', 'โรงเรียน', 'ยา'] },
    { pair: ['หมอ', 'โรงพยาบาล'], options: ['ครู', 'สอน', 'โรงพยาบาล', 'คนไข้'] },
    { pair: ['พ่อครัว', 'ครัว'], options: ['เสิร์ฟ', 'อาหาร', 'ครัว', 'กิน'] },
    { pair: ['นักบิน', 'เครื่องบิน'], options: ['เรือ', 'บิน', 'เครื่องบิน', 'ขับ'] },
    { pair: ['ตำรวจ', 'สถานี'], options: ['โจร', 'จับ', 'สถานี', 'ปืน'] },
  ],
  
  // ผลไม้ - สี
  fruit_color: [
    { pair: ['มะนาว', 'สีเขียว'], options: ['ส้ม', 'เปรี้ยว', 'สีส้ม', 'กลม'] },
    { pair: ['กล้วย', 'สีเหลือง'], options: ['หอม', 'สีม่วง', 'สีเหลือง', 'กิน'] },
    { pair: ['องุ่น', 'สีม่วง'], options: ['หวาน', 'สีแดง', 'สีม่วง', 'จืด'] },
    { pair: ['แอปเปิ้ล', 'สีแดง'], options: ['เขียว', 'สีเหลือง', 'สีแดง', 'หวาน'] },
    { pair: ['มะเขือเทศ', 'สีแดง'], options: ['ผัก', 'สีเขียว', 'สีแดง', 'สุก'] },
  ],
  
  // ประเทศ - เมืองหลวง
  country_capital: [
    { pair: ['ไทย', 'กรุงเทพฯ'], options: ['ลาว', 'เวียงจันทน์', 'กรุงเทพฯ', 'เชียงใหม่'] },
    { pair: ['อังกฤษ', 'ลอนดอน'], options: ['ฝรั่งเศส', 'ปารีส', 'ลอนดอน', 'แมนเชสเตอร์'] },
    { pair: ['ญี่ปุ่น', 'โตเกียว'], options: ['เกาหลี', 'โซล', 'โตเกียว', 'โอซาก้า'] },
    { pair: ['จีน', 'ปักกิ่ง'], options: ['เซี่ยงไฮ้', 'ฮ่องกง', 'ปักกิ่ง', 'กวางตุ้ง'] },
    { pair: ['อเมริกา', 'วอชิงตัน'], options: ['นิวยอร์ก', 'วอชิงตัน', 'แคลิฟอร์เนีย', 'เท็กซัส'] },
  ],
  
  // ร่างกาย - อวัยวะ
  body_part: [
    { pair: ['ตา', 'มอง'], options: ['หู', 'ฟัง', 'มอง', 'จมูก'] },
    { pair: ['หู', 'ฟัง'], options: ['ตา', 'ดู', 'ฟัง', 'จมูก'] },
    { pair: ['จมูก', 'ดม'], options: ['ปาก', 'กิน', 'ดม', 'หายใจ'] },
    { pair: ['ปาก', 'กิน'], options: ['ลิ้น', 'ชิม', 'กิน', 'พูด'] },
    { pair: ['มือ', 'จับ'], options: ['เท้า', 'เดิน', 'จับ', 'หยิบ'] },
  ],
  
  // ฤดู - ลักษณะ
  season_weather: [
    { pair: ['ร้อน', 'แดด'], options: ['หนาว', 'ฝน', 'แดด', 'ลม'] },
    { pair: ['ฝน', 'เปียก'], options: ['ร้อน', 'แห้ง', 'เปียก', 'ลม'] },
    { pair: ['หนาว', 'เย็น'], options: ['ร้อน', 'อุ่น', 'เย็น', 'แดด'] },
    { pair: ['หนาว', 'หิมะ'], options: ['ร้อน', 'ฝน', 'หิมะ', 'ลม'] },
  ],
  
  // กีฬา - อุปกรณ์
  sport_equipment: [
    { pair: ['ฟุตบอล', 'ลูกบอล'], options: ['เทนนิส', 'ไม้', 'ลูกบอล', 'สนาม'] },
    { pair: ['เทนนิส', 'ไม้'], options: ['แบด', 'ลูก', 'ไม้', 'ตาข่าย'] },
    { pair: ['กอล์ฟ', 'ไม้กอล์ฟ'], options: ['ฟุตบอล', 'เท้า', 'ไม้กอล์ฟ', 'หลุม'] },
    { pair: ['ว่ายน้ำ', 'แว่น'], options: ['ดำน้ำ', 'ชุด', 'แว่น', 'น้ำ'] },
    { pair: ['มวย', 'นวม'], options: ['เตะ', 'ต่อย', 'นวม', 'เวที'] },
  ],
  
  // ยานพาหนะ - เชื้อเพลิง
  vehicle_fuel: [
    { pair: ['รถยนต์', 'น้ำมัน'], options: ['ไฟฟ้า', 'แบตเตอรี่', 'น้ำมัน', 'ล้อ'] },
    { pair: ['เรือ', 'น้ำมัน'], options: ['ใบ', 'แล่น', 'น้ำมัน', 'น้ำ'] },
    { pair: ['รถไฟ', 'ถ่านหิน'], options: ['ไฟฟ้า', 'ดีเซล', 'ถ่านหิน', 'ราง'] },
    { pair: ['จักรยาน', 'แรงคน'], options: ['มอเตอร์', 'โซ่', 'แรงคน', 'ล้อ'] },
  ],
  
  // วิชา - สัญลักษณ์
  subject_symbol: [
    { pair: ['คณิต', 'ตัวเลข'], options: ['วิทยาศาสตร์', 'การทดลอง', 'ตัวเลข', 'สูตร'] },
    { pair: ['เคมี', 'สูตร'], options: ['ฟิสิกส์', 'แรง', 'สูตร', 'ธาตุ'] },
    { pair: ['ชีววิทยา', 'เซลล์'], options: ['ร่างกาย', 'ชีวิต', 'เซลล์', 'พืช'] },
    { pair: ['ฟิสิกส์', 'แรง'], options: ['เคลื่อนที่', 'ความเร็ว', 'แรง', 'พลังงาน'] },
  ],
};

// Easy Questions: ความสัมพันธ์พื้นฐาน
const generateEasyQuestions = (): AnalogyQuestion[] => {
  const questions: AnalogyQuestion[] = [];
  
  // ใช้ pattern พื้นฐาน 100 ข้อ
  const patterns = Object.values(analogyPatterns).flat();
  
  for (let i = 0; i < 100; i++) {
    const pattern = patterns[i % patterns.length];
    const [word1, word2] = pattern.pair;
    const options = pattern.options;
    
    // สลับตำแหน่งคำตอบที่ถูกต้อง
    const correctIndex = options.indexOf(word2);
    
    questions.push({
      id: questionId++,
      question: `ปากกา : เขียน  ไม้กวาด : ?`,
      analogy: [word1, word2, options[0], '?'],
      options,
      correctAnswer: correctIndex,
      explanation: `${word1} ใช้สำหรับ ${word2} เช่นเดียวกับ ${options[0]} ใช้สำหรับ ${word2}`,
      difficulty: 'easy'
    });
  }
  
  return questions;
};

// Medium Questions: ความสัมพันธ์ซับซ้อนขึ้น
const generateMediumQuestions = (): AnalogyQuestion[] => {
  const questions: AnalogyQuestion[] = [];
  
  // ความสัมพันธ์แบบสาเหตุ-ผลลัพธ์
  const causeEffect = [
    ['ฝน', 'ตก', 'พื้น', 'เปียก'],
    ['ไฟ', 'ไหม้', 'ไม้', 'ดำ'],
    ['น้ำ', 'แข็ง', 'เย็น', 'จัด'],
    ['เรียน', 'เก่ง', 'ขยัน', 'สำเร็จ'],
    ['กิน', 'อิ่ม', 'นอน', 'หลับ'],
    ['วิ่ง', 'เหนื่อย', 'เดิน', 'สบาย'],
    ['อ่าน', 'รู้', 'เขียน', 'จำ'],
    ['ฝึก', 'ชำนาญ', 'เรียน', 'เข้าใจ'],
    ['ประหยัด', 'รวย', 'ผลาญ', 'จน'],
    ['รัก', 'สุข', 'ชัง', 'ทุกข์'],
  ];
  
  for (let i = 0; i < 75; i++) {
    const [w1, w2, w3, w4] = causeEffect[i % causeEffect.length];
    
    questions.push({
      id: questionId++,
      question: `${w1} : ${w2} :: ${w3} : ?`,
      analogy: [w1, w2, w3, '?'],
      options: [w4, 'ดี', 'แย่', 'เร็ว'],
      correctAnswer: 0,
      explanation: `${w1} ทำให้เกิด ${w2} เช่นเดียวกับ ${w3} ทำให้เกิด ${w4}`,
      difficulty: 'medium'
    });
  }
  
  // ความสัมพันธ์แบบส่วนประกอบ
  const partWhole = [
    ['ล้อ', 'รถยนต์', 'ใบ', 'พัดลม'],
    ['หน้า', 'คน', 'ฝา', 'หม้อ'],
    ['กิ่ง', 'ต้นไม้', 'แขน', 'คน'],
    ['ห้อง', 'บ้าน', 'เซลล์', 'ร่างกาย'],
    ['จังหวัด', 'ประเทศ', 'อำเภอ', 'จังหวัด'],
  ];
  
  for (let i = 0; i < 75; i++) {
    const [part1, whole1, part2, whole2] = partWhole[i % partWhole.length];
    
    questions.push({
      id: questionId++,
      question: `${part1} : ${whole1} :: ${part2} : ?`,
      analogy: [part1, whole1, part2, '?'],
      options: [whole2, 'ส่วน', 'ชิ้น', 'ใหญ่'],
      correctAnswer: 0,
      explanation: `${part1} เป็นส่วนหนึ่งของ ${whole1} เช่นเดียวกับ ${part2} เป็นส่วนหนึ่งของ ${whole2}`,
      difficulty: 'medium'
    });
  }
  
  return questions;
};

// Hard Questions: ความสัมพันธ์นามธรรม
const generateHardQuestions = (): AnalogyQuestion[] => {
  const questions: AnalogyQuestion[] = [];
  
  // ความสัมพันธ์แบบคุณธรรม-ลักษณะ
  const virtueTrait = [
    ['ความซื่อสัตย์', 'คนดี', 'ความขยัน', 'สำเร็จ'],
    ['ความกตัญญู', 'ลูกดี', 'ความเมตตา', 'พระ'],
    ['ความอดทน', 'ชนะ', 'ความพยายาม', 'ได้'],
    ['ความประมาท', 'แพ้', 'ความโลภ', 'จน'],
    ['ความโกรธ', 'ทุกข์', 'ความหลง', 'ผิด'],
    ['ความเมตตา', 'สุข', 'ความกรุณา', 'เย็น'],
    ['ความยุติธรรม', 'เสมอภาค', 'ความเท่าเทียม', 'สงบ'],
    ['ความรับผิดชอบ', 'เจริญ', 'ความละเลย', 'เสื่อม'],
  ];
  
  for (let i = 0; i < 50; i++) {
    const [v1, t1, v2, t2] = virtueTrait[i % virtueTrait.length];
    
    questions.push({
      id: questionId++,
      question: `${v1} : ${t1} :: ${v2} : ?`,
      analogy: [v1, t1, v2, '?'],
      options: [t2, 'ดี', 'ชั่ว', 'กลาง'],
      correctAnswer: 0,
      explanation: `${v1} นำไปสู่ ${t1} เช่นเดียวกับ ${v2} นำไปสู่ ${t2}`,
      difficulty: 'hard'
    });
  }
  
  // ความสัมพันธ์แบบตรงข้าม
  const opposites = [
    ['ร้อน', 'เย็น', 'กลางวัน', 'กลางคืน'],
    ['สูง', 'ต่ำ', 'ยาว', 'สั้น'],
    ['เร็ว', 'ช้า', 'แข็ง', 'อ่อน'],
    ['ดี', 'ชั่ว', 'ถูก', 'ผิด'],
    ['รัก', 'ชัง', 'สุข', 'ทุกข์'],
    ['เข้า', 'ออก', 'ขึ้น', 'ลง'],
    ['หน้า', 'หลัง', 'ซ้าย', 'ขวา'],
    ['เริ่ม', 'จบ', 'เกิด', 'ตาย'],
  ];
  
  for (let i = 0; i < 50; i++) {
    const [o1, o2, o3, o4] = opposites[i % opposites.length];
    
    questions.push({
      id: questionId++,
      question: `${o1} : ${o2} :: ${o3} : ?`,
      analogy: [o1, o2, o3, '?'],
      options: [o4, 'กลาง', 'ใหญ่', 'เล็ก'],
      correctAnswer: 0,
      explanation: `${o1} เป็นคำตรงข้ามของ ${o2} เช่นเดียวกับ ${o3} เป็นคำตรงข้ามของ ${o4}`,
      difficulty: 'hard'
    });
  }
  
  return questions;
};

// Export ข้อสอบทั้งหมด
export const generateAllAnalogyQuestions = (): AnalogyQuestion[] => {
  const easy = generateEasyQuestions();
  const medium = generateMediumQuestions();
  const hard = generateHardQuestions();
  
  console.log(`Generated ${easy.length} easy questions`);
  console.log(`Generated ${medium.length} medium questions`);
  console.log(`Generated ${hard.length} hard questions`);
  console.log(`Total: ${easy.length + medium.length + hard.length} questions`);
  
  return [...easy, ...medium, ...hard];
};

// Run generator
if (require.main === module) {
  const allQuestions = generateAllAnalogyQuestions();
  console.log('\nSample questions:');
  allQuestions.slice(0, 5).forEach(q => {
    console.log(`\nQ${q.id}: ${q.question}`);
    console.log(`Analogy: ${q.analogy.join(' : ')}`);
    console.log(`Options: ${q.options.join(', ')}`);
    console.log(`Answer: ${q.options[q.correctAnswer]}`);
    console.log(`Explanation: ${q.explanation}`);
  });
}
