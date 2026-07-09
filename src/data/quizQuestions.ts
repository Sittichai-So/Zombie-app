
import { generateAllSeriesQuestions } from './questions/generators/series.generator';
import { generateAllMathematicsQuestions } from './questions/generators/mathematics.generator';
import { generateAllAnalogyQuestions } from './questions/generators/analogy.generator';
import { generateAllSymbolLogicQuestions } from './questions/generators/symbolLogic.generator';
import { generateAllTableGraphQuestions } from './questions/generators/tablesGraph.generator';
import { generateAllGrammarQuestions } from './questions/generators/grammar.generator';
import { generateAllVocabularyQuestions, VocabularyQuestion } from './questions/generators/vocabulary.generator';

export interface Question {
  id: number;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question_th: string;
  question_en: string;
  options_th: string[];
  options_en: string[];
  correctAnswer: number;
  explanation_th: string;
  explanation_en: string;
}

const convertSeriesQuestion = (q: any): Question => ({
  id: q.id,
  category: q.category || 'series',
  difficulty: q.difficulty,
  question_th: `อนุกรม: ${q.question}`,
  question_en: `Series: ${q.question}`,
  options_th: q.options.map(String),
  options_en: q.options.map(String),
  correctAnswer: q.correctAnswer,
  explanation_th: q.explanation,
  explanation_en: q.explanation
});

const convertMathematicsQuestion = (q: any): Question => ({
  id: q.id,
  category: q.category || 'mathematics',
  difficulty: q.difficulty,
  question_th: q.question_th,
  question_en: q.question_en,
  options_th: q.options_th,
  options_en: q.options_en,
  correctAnswer: q.correctAnswer,
  explanation_th: q.explanation_th,
  explanation_en: q.explanation_en
});

const convertAnalogyQuestion = (q: any): Question => ({
  id: q.id,
  category: q.category || 'analogy',
  difficulty: q.difficulty,
  question_th: q.question_th,
  question_en: q.question_en,
  options_th: q.options_th,
  options_en: q.options_en,
  correctAnswer: q.correctAnswer,
  explanation_th: q.explanation_th,
  explanation_en: q.explanation_en
});

const convertSymbolLogicQuestion = (q: any): Question => ({
  id: q.id,
  category: q.category || 'symbolLogic',
  difficulty: q.difficulty,
  question_th: q.question_th,
  question_en: q.question_en,
  options_th: q.options_th,
  options_en: q.options_en,
  correctAnswer: q.correctAnswer,
  explanation_th: q.explanation_th,
  explanation_en: q.explanation_en
});

const convertTablesGraphQuestion = (q: any): Question => ({
  id: q.id,
  category: q.category || 'tablesGraph',
  difficulty: q.difficulty,
  question_th: q.question_th,
  question_en: q.question_en,
  options_th: q.options_th,
  options_en: q.options_en,
  correctAnswer: q.correctAnswer,
  explanation_th: q.explanation_th,
  explanation_en: q.explanation_en
});

const convertGrammarQuestion = (q: any): Question => ({
  id: q.id,
  category: q.category || 'grammar',
  difficulty: q.difficulty,
  question_th: q.question_th,
  question_en: q.question_en,
  options_th: q.options_th,
  options_en: q.options_en,
  correctAnswer: q.correctAnswer,
  explanation_th: q.explanation_th,
  explanation_en: q.explanation_en
});

const convertVocabularyQuestion = (q: VocabularyQuestion): Question => ({
  id: q.id,
  category: q.category || 'vocabulary',
  difficulty: q.difficulty,
  question_th: q.question_th,
  question_en: q.question_en,
  options_th: q.options_th,
  options_en: q.options_en,
  correctAnswer: q.correctAnswer,
  explanation_th: q.explanation_th,
  explanation_en: q.explanation_en
});

// Generate all questions from generators
const generatedQuestions: Question[] = [
  // Phase 1: Analytical Reasoning (1,300 ข้อ)
  ...generateAllSeriesQuestions().map(convertSeriesQuestion),
  ...generateAllMathematicsQuestions().map(convertMathematicsQuestion),
  ...generateAllAnalogyQuestions().map(convertAnalogyQuestion),
  ...generateAllSymbolLogicQuestions().map(convertSymbolLogicQuestion),
  ...generateAllTableGraphQuestions().map(convertTablesGraphQuestion),
  
  // Phase 2: English (550 ข้อ)
  ...generateAllGrammarQuestions().map(convertGrammarQuestion),
  ...generateAllVocabularyQuestions().map(convertVocabularyQuestion),
];

// Export all generated questions
export const quizQuestions: Question[] = generatedQuestions;

// Export by category
export const getQuestionsByCategory = (category: string): Question[] => {
  return quizQuestions.filter(q => q.category === category);
};

// Export by difficulty
export const getQuestionsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): Question[] => {
  return quizQuestions.filter(q => q.difficulty === difficulty);
};

// Export random questions
export const getRandomQuestions = (count: number): Question[] => {
  const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Export for battle mode
export const getBattleQuestions = (category?: string, difficulty?: string): Question[] => {
  let questions = quizQuestions;
  
  if (category) {
    questions = questions.filter(q => q.category === category);
  }
  
  if (difficulty) {
    questions = questions.filter(q => q.difficulty === difficulty);
  }
  
  return questions.sort(() => Math.random() - 0.5);
};

// Log statistics
console.log(`Total questions: ${quizQuestions.length}`);
console.log('Questions by category:');
console.log(`- Series: ${getQuestionsByCategory('series').length}`);
console.log(`- Mathematics: ${getQuestionsByCategory('mathematics').length}`);
console.log(`- Analogy: ${getQuestionsByCategory('analogy').length}`);
console.log(`- Symbol Logic: ${getQuestionsByCategory('symbolLogic').length}`);
console.log(`- Tables & Graph: ${getQuestionsByCategory('tablesGraph').length}`);
console.log(`- Grammar: ${getQuestionsByCategory('grammar').length}`);
console.log(`- Vocabulary: ${getQuestionsByCategory('vocabulary').length}`);
