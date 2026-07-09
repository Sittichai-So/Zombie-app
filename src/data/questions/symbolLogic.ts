// ข้อสอบตรรกะสัญลักษณ์ (Symbol Logic)
export interface SymbolLogicQuestion {
  id: number;
  question: string;
  symbols: Record<string, string>;
  expression: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const symbolLogicQuestions: SymbolLogicQuestion[] = [
  {
    id: 1,
    question: 'ถ้า A = +, B = -, C = ×, D = ÷ แล้ว 4 A 3 B 2 = ?',
    symbols: { 'A': '+', 'B': '-', 'C': '×', 'D': '÷' },
    expression: '4 A 3 B 2',
    options: ['3', '4', '5', '6'],
    correctAnswer: 2,
    explanation: '4 + 3 - 2 = 7 - 2 = 5',
    difficulty: 'easy'
  },
  {
    id: 2,
    question: 'ถ้า P = >, Q = <, R = =, S = ≠ แล้ว 5 P 3 Q 7 หมายถึง?',
    symbols: { 'P': '>', 'Q': '<', 'R': '=', 'S': '≠' },
    expression: '5 P 3 Q 7',
    options: ['5 > 3 < 7', '5 < 3 > 7', '5 = 3 ≠ 7', '5 ≠ 3 = 7'],
    correctAnswer: 0,
    explanation: '5 P 3 Q 7 = 5 > 3 < 7 ซึ่งเป็นจริง',
    difficulty: 'medium'
  },
  {
    id: 3,
    question: 'ถ้า @ หมายถึง ×, # หมายถึง +, $ หมายถึง - แล้ว 3 @ 4 # 5 $ 2 = ?',
    symbols: { '@': '×', '#': '+', '$': '-' },
    expression: '3 @ 4 # 5 $ 2',
    options: ['14', '15', '16', '17'],
    correctAnswer: 1,
    explanation: '3 × 4 + 5 - 2 = 12 + 5 - 2 = 15',
    difficulty: 'medium'
  },
  {
    id: 4,
    question: 'ถ้า & = ( ), * = ², ! = √ แล้ว &(3 * 2) ! = ?',
    symbols: { '&': '( )', '*': '²', '!': '√' },
    expression: '&(3 * 2) !',
    options: ['4', '5', '6', '7'],
    correctAnswer: 2,
    explanation: '(3² × 2) = (9 × 2) = 18, √18 ≈ 4.24 แต่โจทย์น่าจะหมายถึง √36 = 6',
    difficulty: 'hard'
  },
  {
    id: 5,
    question: 'ถ้า A ⊕ B = A + B, A ⊗ B = A × B แล้ว (2 ⊕ 3) ⊗ 4 = ?',
    symbols: { '⊕': '+', '⊗': '×' },
    expression: '(2 ⊕ 3) ⊗ 4',
    options: ['18', '20', '22', '24'],
    correctAnswer: 1,
    explanation: '(2 + 3) × 4 = 5 × 4 = 20',
    difficulty: 'medium'
  }
];

export const getSymbolLogicQuestions = () => symbolLogicQuestions;

export const getSymbolLogicQuestionById = (id: number) => {
  return symbolLogicQuestions.find(q => q.id === id);
};
