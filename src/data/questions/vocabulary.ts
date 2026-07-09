// ข้อสอบคำศัพท์ภาษาอังกฤษ (Vocabulary)
export interface VocabularyQuestion {
  id: number;
  category: 'vocabulary';
  questionType: 'synonym' | 'antonym' | 'definition' | 'fillInBlank';
  word: string;
  question_th: string;
  question_en: string;
  options_th: string[];
  options_en: string[];
  correctAnswer: number;
  explanation_th: string;
  explanation_en: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const vocabularyQuestions: VocabularyQuestion[] = [
  {
    id: 1,
    category: 'vocabulary',
    questionType: 'synonym',
    word: 'Happy',
    question_th: 'คำใดมีความหมายเหมือนกับ "Happy"?',
    question_en: 'Which word is a synonym of "Happy"?',
    options_th: ['Sad', 'Joyful', 'Angry', 'Tired'],
    options_en: ['Sad', 'Joyful', 'Angry', 'Tired'],
    correctAnswer: 1,
    explanation_th: '"Joyful" มีความหมายว่า "มีความสุข" เหมือนกับ "Happy"',
    explanation_en: '"Joyful" means the same as "Happy"',
    difficulty: 'easy'
  },
  {
    id: 2,
    questionType: 'antonym',
    word: 'Big',
    question_th: 'คำใดมีความหมายตรงข้ามกับ "Big"?',
    question_en: 'Which word is an antonym of "Big"?',
    options_th: ['Large', 'Huge', 'Small', 'Tall'],
    options_en: ['Large', 'Huge', 'Small', 'Tall'],
    correctAnswer: 2,
    explanation_th: '"Small" มีความหมายว่า "เล็ก" ตรงข้ามกับ "Big" (ใหญ่)',
    explanation_en: '"Small" is the opposite of "Big"',
    difficulty: 'easy'
  },
  {
    id: 3,
    questionType: 'definition',
    word: 'Diligent',
    question_th: '"Diligent" หมายถึงอะไร?',
    question_en: 'What does "Diligent" mean?',
    options_th: ['ขี้เกียจ', 'ขยัน', 'ฉลาด', 'ช้า'],
    options_en: ['Lazy', 'Hardworking', 'Smart', 'Slow'],
    correctAnswer: 1,
    explanation_th: '"Diligent" หมายถึง "ขยันหมั่นเพียร"',
    explanation_en: '"Diligent" means "hardworking and careful"',
    difficulty: 'medium'
  },
  {
    id: 4,
    questionType: 'fillInBlank',
    word: 'Beautiful',
    question_th: 'เติมคำลงในช่องว่าง: She is very ___',
    question_en: 'Fill in the blank: She is very ___',
    options_th: ['beauty', 'beautiful', 'beautifully', 'beautify'],
    options_en: ['beauty', 'beautiful', 'beautifully', 'beautify'],
    correctAnswer: 1,
    explanation_th: 'หลัง verb "is" และ adverb "very" ต้องใช้ adjective "beautiful"',
    explanation_en: 'After "is" and "very", we need an adjective "beautiful"',
    difficulty: 'medium'
  },
  {
    id: 5,
    questionType: 'synonym',
    word: 'Enormous',
    question_th: 'คำใดมีความหมายเหมือนกับ "Enormous"?',
    question_en: 'Which word is a synonym of "Enormous"?',
    options_th: ['Tiny', 'Huge', 'Average', 'Short'],
    options_en: ['Tiny', 'Huge', 'Average', 'Short'],
    correctAnswer: 1,
    explanation_th: '"Huge" และ "Enormous" หมายถึง "ใหญ่มาก"',
    explanation_en: '"Huge" and "Enormous" both mean "very large"',
    difficulty: 'hard'
  }
];

export const getVocabularyQuestions = () => vocabularyQuestions;

export const getVocabularyQuestionById = (id: number) => {
  return vocabularyQuestions.find(q => q.id === id);
};

export const getVocabularyQuestionsByType = (type: string) => {
  return vocabularyQuestions.filter(q => q.questionType === type);
};
