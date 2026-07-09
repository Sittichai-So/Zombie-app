// ข้อสอบความรู้เกี่ยวกับข้าราชการพลเรือน (Civil Service)
export interface CivilServiceQuestion {
  id: number;
  question_th: string;
  question_en: string;
  options_th: string[];
  options_en: string[];
  correctAnswer: number;
  explanation_th: string;
  explanation_en: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const civilServiceQuestions: CivilServiceQuestion[] = [
  {
    id: 1,
    question_th: 'คณะกรรมการข้าราชการพลเรือน เรียกย่อว่าอะไร?',
    question_en: 'What is the abbreviation for the Civil Service Commission?',
    options_th: ['ก.พ.', 'ก.ท.', 'ก.จ.', 'ก.กล.'],
    options_en: ['OCSC', 'DOLA', 'PERC', 'OPDC'],
    correctAnswer: 0,
    explanation_th: 'คณะกรรมการข้าราชการพลเรือน เรียกย่อว่า ก.พ. (Office of the Civil Service Commission)',
    explanation_en: 'The Civil Service Commission is abbreviated as OCSC (Office of the Civil Service Commission).',
    topic: 'organization',
    difficulty: 'easy'
  },
  {
    id: 2,
    question_th: 'ข้อใดไม่ใช่หลักการพื้นฐานของระบบคุณธรรม?',
    question_en: 'Which is NOT a basic principle of the merit system?',
    options_th: ['การแต่งตั้งตามความสามารถ', 'ความเสมอภาค', 'ความมั่นคงในการทำงาน', 'การแต่งตั้งตามความสัมพันธ์'],
    options_en: ['Appointment based on ability', 'Equality', 'Job security', 'Appointment based on relationships'],
    correctAnswer: 3,
    explanation_th: 'การแต่งตั้งตามความสัมพันธ์ขัดกับหลักคุณธรรม',
    explanation_en: 'Appointment based on relationships contradicts the merit system.',
    topic: 'merit_system',
    difficulty: 'medium'
  },
  {
    id: 3,
    question_th: 'ข้าราชการพลเรือนสามัญแบ่งออกเป็นกี่ประเภท?',
    question_en: 'How many types are there in the Common Civil Service?',
    options_th: ['2 ประเภท', '3 ประเภท', '4 ประเภท', '5 ประเภท'],
    options_en: ['2 types', '3 types', '4 types', '5 types'],
    correctAnswer: 2,
    explanation_th: 'ข้าราชการพลเรือนสามัญแบ่งเป็น 4 ประเภท: บริหาร, อำนวยการ, วิชาการ, ทั่วไป',
    explanation_en: 'Common Civil Service is divided into 4 types: Executive, Managerial, Professional, General.',
    topic: 'classification',
    difficulty: 'medium'
  },
  {
    id: 4,
    question_th: 'ผู้ใดเป็นประธาน ก.พ.?',
    question_en: 'Who is the Chairman of the Civil Service Commission?',
    options_th: ['นายกรัฐมนตรี', 'รัฐมนตรีประจำสำนักนายกรัฐมนตรี', 'ปลัดสำนักนายกรัฐมนตรี', 'เลขาธิการ ก.พ.'],
    options_en: ['Prime Minister', 'Minister to the Prime Minister\'s Office', 'Permanent Secretary of PMO', 'Secretary-General of OCSC'],
    correctAnswer: 1,
    explanation_th: 'รัฐมนตรีประจำสำนักนายกรัฐมนตรีเป็นประธาน ก.พ.',
    explanation_en: 'The Minister to the Prime Minister\'s Office is the Chairman of OCSC.',
    topic: 'organization',
    difficulty: 'hard'
  },
  {
    id: 5,
    question_th: 'วินัยข้าราชการพลเรือนมีกี่สถาน?',
    question_en: 'How many levels of disciplinary action are there for civil servants?',
    options_th: ['3 สถาน', '4 สถาน', '5 สถาน', '6 สถาน'],
    options_en: ['3 levels', '4 levels', '5 levels', '6 levels'],
    correctAnswer: 1,
    explanation_th: 'วินัยมี 4 สถาน: ภาคทัณฑ์, ตัดเงินเดือน, ลดขั้นเงินเดือน, ไล่ออก',
    explanation_en: 'There are 4 levels of disciplinary action: reprimand, salary cut, salary reduction, dismissal.',
    topic: 'discipline',
    difficulty: 'medium'
  }
];

export const getCivilServiceQuestions = () => civilServiceQuestions;

export const getCivilServiceQuestionById = (id: number) => {
  return civilServiceQuestions.find(q => q.id === id);
};

export const getCivilServiceQuestionsByTopic = (topic: string) => {
  return civilServiceQuestions.filter(q => q.topic === topic);
};
