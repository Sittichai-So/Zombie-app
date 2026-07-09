// ข้อสอบอุปมาอุปไมย (Analogy)
export interface AnalogyQuestion {
  id: number;
  question_th: string;
  question_en: string;
  pair_th: [string, string];
  pair_en: [string, string];
  options_th: string[];
  options_en: string[];
  correctAnswer: number;
  explanation_th: string;
  explanation_en: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const analogyQuestions: AnalogyQuestion[] = [
  {
    id: 1,
    question_th: 'ปากกา : เขียน :: ค้อน : ?',
    question_en: 'Pen : Write :: Hammer : ?',
    pair_th: ['ปากกา', 'เขียน'],
    pair_en: ['Pen', 'Write'],
    options_th: ['ตอก', 'ทุบ', 'สร้าง', 'ซ่อม'],
    options_en: ['Nail', 'Hit', 'Build', 'Fix'],
    correctAnswer: 1,
    explanation_th: 'ปากกาใช้สำหรับเขียน ค้อนใช้สำหรับทุบ',
    explanation_en: 'Pen is used to write, Hammer is used to hit',
    difficulty: 'easy'
  },
  {
    id: 2,
    question_th: 'หมอ : โรงพยาบาล :: ครู : ?',
    question_en: 'Doctor : Hospital :: Teacher : ?',
    pair_th: ['หมอ', 'โรงพยาบาล'],
    pair_en: ['Doctor', 'Hospital'],
    options_th: ['นักเรียน', 'โรงเรียน', 'หนังสือ', 'การสอน'],
    options_en: ['Student', 'School', 'Book', 'Teaching'],
    correctAnswer: 1,
    explanation_th: 'หมอทำงานที่โรงพยาบาล ครูทำงานที่โรงเรียน',
    explanation_en: 'Doctor works at hospital, Teacher works at school',
    difficulty: 'easy'
  },
  {
    id: 3,
    question_th: 'น้ำ : กระหาย :: อาหาร : ?',
    question_en: 'Water : Thirst :: Food : ?',
    pair_th: ['น้ำ', 'กระหาย'],
    pair_en: ['Water', 'Thirst'],
    options_th: ['อร่อย', 'หิว', 'กิน', 'ปรุง'],
    options_en: ['Delicious', 'Hunger', 'Eat', 'Cook'],
    correctAnswer: 1,
    explanation_th: 'น้ำแก้กระหาย อาหารแก้หิว',
    explanation_en: 'Water quenches thirst, Food satisfies hunger',
    difficulty: 'medium'
  },
  {
    id: 4,
    question_th: 'เช้า : พระอาทิตย์ขึ้น :: ค่ำ : ?',
    question_en: 'Morning : Sunrise :: Evening : ?',
    pair_th: ['เช้า', 'พระอาทิตย์ขึ้น'],
    pair_en: ['Morning', 'Sunrise'],
    options_th: ['พระอาทิตย์ตก', 'ดวงจันทร์', 'ดาว', 'มืด'],
    options_en: ['Sunset', 'Moon', 'Stars', 'Dark'],
    correctAnswer: 0,
    explanation_th: 'เช้ามีพระอาทิตย์ขึ้น ค่ำมีพระอาทิตย์ตก',
    explanation_en: 'Morning has sunrise, Evening has sunset',
    difficulty: 'easy'
  },
  {
    id: 5,
    question_th: 'หนังสือ : ความรู้ :: อาหาร : ?',
    question_en: 'Book : Knowledge :: Food : ?',
    pair_th: ['หนังสือ', 'ความรู้'],
    pair_en: ['Book', 'Knowledge'],
    options_th: ['รสชาติ', 'พลังงาน', 'ความอิ่ม', 'สุขภาพ'],
    options_en: ['Taste', 'Energy', 'Fullness', 'Health'],
    correctAnswer: 1,
    explanation_th: 'หนังสือให้ความรู้ อาหารให้พลังงาน',
    explanation_en: 'Book provides knowledge, Food provides energy',
    difficulty: 'medium'
  }
];

export const getAnalogyQuestions = () => analogyQuestions;

export const getAnalogyQuestionById = (id: number) => {
  return analogyQuestions.find(q => q.id === id);
};
