// ข้อสอบคณิตศาสตร์
export interface MathQuestion {
  id: number;
  category: 'mathematics';
  question_th: string;
  question_en: string;
  options_th: string[];
  options_en: string[];
  correctAnswer: number;
  explanation_th: string;
  explanation_en: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
}

export const mathQuestions: MathQuestion[] = [
  {
    id: 1,
    category: 'mathematics',
    question_th: '2 + 3 × 4 = ?',
    question_en: '2 + 3 × 4 = ?',
    options_th: ['20', '14', '12', '10'],
    options_en: ['20', '14', '12', '10'],
    correctAnswer: 1,
    explanation_th: 'ตามลำดับการคำนวณ: 3 × 4 = 12, แล้ว 2 + 12 = 14',
    explanation_en: 'Order of operations: 3 × 4 = 12, then 2 + 12 = 14',
    difficulty: 'easy',
    topic: 'arithmetic'
  },
  {
    id: 2,
    question_th: 'ถ้า x + 5 = 12 แล้ว x มีค่าเท่าใด?',
    question_en: 'If x + 5 = 12, what is the value of x?',
    options_th: ['5', '6', '7', '8'],
    options_en: ['5', '6', '7', '8'],
    correctAnswer: 2,
    explanation_th: 'x = 12 - 5 = 7',
    explanation_en: 'x = 12 - 5 = 7',
    difficulty: 'easy',
    topic: 'algebra'
  },
  {
    id: 3,
    question_th: 'พื้นที่ของวงกลมที่มีรัศมี 7 ซม. เท่ากับเท่าใด? (π = 22/7)',
    question_en: 'What is the area of a circle with radius 7 cm? (π = 22/7)',
    options_th: ['154 ตร.ซม.', '144 ตร.ซม.', '134 ตร.ซม.', '124 ตร.ซม.'],
    options_en: ['154 sq.cm.', '144 sq.cm.', '134 sq.cm.', '124 sq.cm.'],
    correctAnswer: 0,
    explanation_th: 'พื้นที่ = πr² = (22/7) × 7² = 22 × 7 = 154 ตร.ซม.',
    explanation_en: 'Area = πr² = (22/7) × 7² = 22 × 7 = 154 sq.cm.',
    difficulty: 'medium',
    topic: 'geometry'
  },
  {
    id: 4,
    question_th: 'ร้อยละ 25 ของ 800 เท่ากับเท่าใด?',
    question_en: 'What is 25% of 800?',
    options_th: ['150', '200', '250', '300'],
    options_en: ['150', '200', '250', '300'],
    correctAnswer: 1,
    explanation_th: '25% ของ 800 = (25/100) × 800 = 200',
    explanation_en: '25% of 800 = (25/100) × 800 = 200',
    difficulty: 'easy',
    topic: 'percentage'
  },
  {
    id: 5,
    question_th: 'รากที่สองของ 576 คือข้อใด?',
    question_en: 'What is the square root of 576?',
    options_th: ['22', '24', '26', '28'],
    options_en: ['22', '24', '26', '28'],
    correctAnswer: 1,
    explanation_th: '√576 = 24 เพราะ 24 × 24 = 576',
    explanation_en: '√576 = 24 because 24 × 24 = 576',
    difficulty: 'medium',
    topic: 'arithmetic'
  }
];

export const getMathQuestions = () => mathQuestions;

export const getMathQuestionById = (id: number) => {
  return mathQuestions.find(q => q.id === id);
};

export const getMathQuestionsByTopic = (topic: string) => {
  return mathQuestions.filter(q => q.topic === topic);
};
