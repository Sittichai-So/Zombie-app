// ข้อสอบจริยธรรมและจรรยาบรรณ (Ethics)
export interface EthicsQuestion {
  id: number;
  question_th: string;
  question_en: string;
  options_th: string[];
  options_en: string[];
  correctAnswer: number;
  explanation_th: string;
  explanation_en: string;
  principle: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const ethicsQuestions: EthicsQuestion[] = [
  {
    id: 1,
    question_th: 'ข้อใดคือความหมายของ "จริยธรรม"?',
    question_en: 'What is the meaning of "Ethics"?',
    options_th: ['กฎหมายที่ต้องปฏิบัติตาม', 'หลักความประพฤติที่ดีงาม', 'ระเบียบขององค์กร', 'คำสั่งของผู้บังคับบัญชา'],
    options_en: ['Laws to follow', 'Principles of good conduct', 'Organizational regulations', 'Commands from superiors'],
    correctAnswer: 1,
    explanation_th: 'จริยธรรม หมายถึง หลักความประพฤติที่ดีงามที่ควรปฏิบัติ',
    explanation_en: 'Ethics refers to principles of good conduct that should be followed.',
    principle: 'ethics_definition',
    difficulty: 'easy'
  },
  {
    id: 2,
    question_th: 'ข้าราชการควรปฏิบัติตนอย่างไรเมื่อได้รับของขวัญจากผู้มาติดต่อราชการ?',
    question_en: 'How should a civil servant act when receiving a gift from someone seeking government services?',
    options_th: ['รับไว้เพราะเป็นน้ำใจ', 'ปฏิเสธอย่างสุภาพ', 'รับแล้วแบ่งให้เพื่อนร่วมงาน', 'รับเฉพาะของมีค่าไม่มาก'],
    options_en: ['Accept it as kindness', 'Politely decline', 'Accept and share with colleagues', 'Accept only if not valuable'],
    correctAnswer: 1,
    explanation_th: 'ข้าราชการควรปฏิเสธของขวัญเพื่อรักษาความโปร่งใสและหลีกเลี่ยงการขัดกันแห่งผลประโยชน์',
    explanation_en: 'Civil servants should decline gifts to maintain transparency and avoid conflict of interest.',
    principle: 'conflict_of_interest',
    difficulty: 'medium'
  },
  {
    id: 3,
    question_th: 'ข้อใดคือการขัดกันแห่งผลประโยชน์?',
    question_en: 'Which is a conflict of interest?',
    options_th: ['ทำงานตามหน้าที่', 'ใช้ตำแหน่งเพื่อประโยชน์ส่วนตัว', 'ช่วยเหลือประชาชน', 'ปฏิบัติตามกฎหมาย'],
    options_en: ['Doing your duty', 'Using position for personal gain', 'Helping citizens', 'Following the law'],
    correctAnswer: 1,
    explanation_th: 'การใช้ตำแหน่งเพื่อประโยชน์ส่วนตัวเป็นการขัดกันแห่งผลประโยชน์',
    explanation_en: 'Using position for personal gain is a conflict of interest.',
    principle: 'conflict_of_interest',
    difficulty: 'easy'
  },
  {
    id: 4,
    question_th: 'หลักธรรมาภิบาล (Good Governance) มีกี่หลักการ?',
    question_en: 'How many principles are there in Good Governance?',
    options_th: ['4 หลักการ', '5 หลักการ', '6 หลักการ', '7 หลักการ'],
    options_en: ['4 principles', '5 principles', '6 principles', '7 principles'],
    correctAnswer: 2,
    explanation_th: 'หลักธรรมาภิบาลมี 6 หลัก: นิติธรรม, คุณธรรม, ความโปร่งใส, การมีส่วนร่วม, ความรับผิดชอบ, ความคุ้มค่า',
    explanation_en: 'Good Governance has 6 principles: Rule of Law, Ethics, Transparency, Participation, Accountability, Value for Money.',
    principle: 'good_governance',
    difficulty: 'medium'
  },
  {
    id: 5,
    question_th: 'ข้อใดไม่ใช่หลักธรรมาภิบาล?',
    question_en: 'Which is NOT a principle of Good Governance?',
    options_th: ['ความโปร่งใส', 'ความรับผิดชอบ', 'ความรวดเร็ว', 'การมีส่วนร่วม'],
    options_en: ['Transparency', 'Accountability', 'Speed', 'Participation'],
    correctAnswer: 2,
    explanation_th: 'ความรวดเร็วไม่ใช่หลักธรรมาภิบาลโดยตรง แต่เป็นหลักการให้บริการ',
    explanation_en: 'Speed is not a direct principle of Good Governance, but a service principle.',
    principle: 'good_governance',
    difficulty: 'medium'
  }
];

export const getEthicsQuestions = () => ethicsQuestions;

export const getEthicsQuestionById = (id: number) => {
  return ethicsQuestions.find(q => q.id === id);
};

export const getEthicsQuestionsByPrinciple = (principle: string) => {
  return ethicsQuestions.filter(q => q.principle === principle);
};
