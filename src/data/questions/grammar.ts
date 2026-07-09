// ข้อสอบไวยากรณ์ภาษาอังกฤษ (Grammar)
export interface GrammarQuestion {
  id: number;
  question_en: string;
  question_th: string;
  sentence: string;
  options: string[];
  correctAnswer: number;
  explanation_en: string;
  explanation_th: string;
  grammarPoint: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const grammarQuestions: GrammarQuestion[] = [
  {
    id: 1,
    question_en: 'Choose the correct verb form',
    question_th: 'เลือกกริยาที่ถูกต้อง',
    sentence: 'She ___ to school every day.',
    options: ['go', 'goes', 'going', 'went'],
    correctAnswer: 1,
    explanation_en: 'Present Simple: Third person singular (she) uses "goes"',
    explanation_th: 'Present Simple: บุรุษที่ 3 เอกพจน์ (she) ใช้ "goes"',
    grammarPoint: 'Present Simple Tense',
    difficulty: 'easy'
  },
  {
    id: 2,
    question_en: 'Choose the correct past tense',
    question_th: 'เลือก past tense ที่ถูกต้อง',
    sentence: 'Yesterday, I ___ a book.',
    options: ['read', 'reads', 'reading', 'have read'],
    correctAnswer: 0,
    explanation_en: 'Past Simple of "read" is "read" (pronounced "red")',
    explanation_th: 'Past Simple ของ "read" คือ "read" (ออกเสียง "red")',
    grammarPoint: 'Past Simple Tense',
    difficulty: 'easy'
  },
  {
    id: 3,
    question_en: 'Choose the correct article',
    question_th: 'เลือก article ที่ถูกต้อง',
    sentence: 'I saw ___ elephant at the zoo.',
    options: ['a', 'an', 'the', 'no article'],
    correctAnswer: 1,
    explanation_en: '"An" is used before words starting with a vowel sound',
    explanation_th: '"An" ใช้ก่อนคำที่ขึ้นต้นด้วยเสียงสระ',
    grammarPoint: 'Articles',
    difficulty: 'easy'
  },
  {
    id: 4,
    question_en: 'Choose the correct preposition',
    question_th: 'เลือก preposition ที่ถูกต้อง',
    sentence: 'The meeting is ___ Monday morning.',
    options: ['in', 'at', 'on', 'to'],
    correctAnswer: 2,
    explanation_en: '"On" is used with days of the week',
    explanation_th: '"On" ใช้กับวันในสัปดาห์',
    grammarPoint: 'Prepositions of Time',
    difficulty: 'medium'
  },
  {
    id: 5,
    question_en: 'Choose the correct conditional form',
    question_th: 'เลือก conditional form ที่ถูกต้อง',
    sentence: 'If I ___ you, I would study harder.',
    options: ['am', 'was', 'were', 'been'],
    correctAnswer: 2,
    explanation_en: 'Second conditional uses "were" for all subjects',
    explanation_th: 'Second conditional ใช้ "were" กับทุกประธาน',
    grammarPoint: 'Conditional Sentences',
    difficulty: 'hard'
  }
];

export const getGrammarQuestions = () => grammarQuestions;

export const getGrammarQuestionById = (id: number) => {
  return grammarQuestions.find(q => q.id === id);
};

export const getGrammarQuestionsByPoint = (point: string) => {
  return grammarQuestions.filter(q => q.grammarPoint === point);
};
