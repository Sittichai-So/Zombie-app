// Generator สำหรับสร้างข้อสอบตรรกะสัญลักษณ์ (Symbol Logic) จำนวนมาก
// เป้าหมาย: 250 ข้อ

import { SymbolLogicQuestion } from '../symbolLogic';

let questionId = 4000;

// Helper functions
const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// สัญลักษณ์พื้นฐาน
const symbols = {
  '+': 'บวก',
  '-': 'ลบ',
  '×': 'คูณ',
  '÷': 'หาร',
  '=': 'เท่ากับ',
  '>': 'มากกว่า',
  '<': 'น้อยกว่า',
  '≥': 'มากกว่าหรือเท่ากับ',
  '≤': 'น้อยกว่าหรือเท่ากับ',
  '≠': 'ไม่เท่ากับ',
};

// Easy Questions: การแทนค่าสัญลักษณ์พื้นฐาน
const generateEasyQuestions = (): SymbolLogicQuestion[] => {
  const questions: SymbolLogicQuestion[] = [];
  
  // 1. การแทนค่าเครื่องหมายคณิตศาสตร์ (40 ข้อ)
  for (let i = 0; i < 40; i++) {
    const a = randomInt(1, 20);
    const b = randomInt(1, 20);
    const operations = ['+', '-', '×', '÷'];
    const op = operations[randomInt(0, 3)];
    
    let answer: number = 0;
    switch(op) {
      case '+': answer = a + b; break;
      case '-': answer = a - b; break;
      case '×': answer = a * b; break;
      case '÷': 
        answer = a % b === 0 ? a / b : Math.floor(a / b);
        break;
    }
    
    const options = [
      answer,
      answer + 1,
      answer - 1,
      answer + 2
    ].filter((v, idx, arr) => arr.indexOf(v) === idx && v >= 0)
      .slice(0, 4);
    
    while (options.length < 4) {
      options.push(randomInt(1, 50));
    }
    
    const shuffledOptions = options.sort(() => Math.random() - 0.5);
    const correctIndex = shuffledOptions.indexOf(answer);
    
    questions.push({
      id: questionId++,
      question: `ถ้า ${op} หมายถึง ${symbols[op as keyof typeof symbols]} แล้ว ${a} ${op} ${b} = ?`,
      symbols: { [op]: symbols[op as keyof typeof symbols] },
      expression: `${a} ${op} ${b}`,
      options: shuffledOptions.map(String),
      correctAnswer: correctIndex,
      explanation: `${op} หมายถึง ${symbols[op as keyof typeof symbols]}, ดังนั้น ${a} ${op} ${b} = ${answer}`,
      difficulty: 'easy'
    });
  }
  
  // 2. การเปรียบเทียบค่า (40 ข้อ)
  for (let i = 0; i < 40; i++) {
    const a = randomInt(1, 50);
    const b = randomInt(1, 50);
    const comparisons = ['>', '<', '=', '≥', '≤'];
    const comp = comparisons[randomInt(0, 4)];
    
    let isTrue: boolean = false;
    switch(comp) {
      case '>': isTrue = a > b; break;
      case '<': isTrue = a < b; break;
      case '=': isTrue = a === b; break;
      case '≥': isTrue = a >= b; break;
      case '≤': isTrue = a <= b; break;
    }
    
    questions.push({
      id: questionId++,
      question: `ถ้า ${comp} หมายถึง ${symbols[comp as keyof typeof symbols]} ข้อใดถูกต้อง`,
      symbols: { [comp]: symbols[comp as keyof typeof symbols] },
      expression: `${a} ${comp} ${b}`,
      options: ['จริง', 'เท็จ'],
      correctAnswer: isTrue ? 0 : 1,
      explanation: `${a} ${symbols[comp as keyof typeof symbols]} ${b} เป็น ${isTrue ? 'จริง' : 'เท็จ'}`,
      difficulty: 'easy'
    });
  }
  
  return questions;
};

// Medium Questions: นิพจน์หลายขั้นตอน
const generateMediumQuestions = (): SymbolLogicQuestion[] => {
  const questions: SymbolLogicQuestion[] = [];
  
  // 1. การดำเนินการหลายขั้นตอน (50 ข้อ)
  for (let i = 0; i < 50; i++) {
    const a = randomInt(1, 10);
    const b = randomInt(1, 10);
    const c = randomInt(1, 10);
    
    const answer = (a + b) * c;
    
    const options = [
      answer,
      answer + c,
      answer - c,
      a + b * c
    ].sort(() => Math.random() - 0.5);
    
    questions.push({
      id: questionId++,
      question: `ถ้า A = ${a}, B = ${b}, C = ${c} แล้ว (A + B) × C = ?`,
      expression: `(A + B) × C`,
      symbols: { A: String(a), B: String(b), C: String(c) },
      options: options.map(String),
      correctAnswer: options.indexOf(answer),
      explanation: `(A + B) × C = (${a} + ${b}) × ${c} = ${a + b} × ${c} = ${answer}`,
      difficulty: 'medium'
    });
  }
  
  // 2. การแทนค่าตัวแปร (50 ข้อ)
  for (let i = 0; i < 50; i++) {
    const x = randomInt(1, 10);
    const y = randomInt(1, 10);
    const result = 2 * x + 3 * y;
    
    const options = [
      result,
      result + 1,
      result - 1,
      result + 2
    ].sort(() => Math.random() - 0.5);
    
    questions.push({
      id: questionId++,
      question: `ถ้า x = ${x} และ y = ${y} แล้ว 2x + 3y = ?`,
      expression: `2x + 3y`,
      symbols: { x: String(x), y: String(y) },
      options: options.map(String),
      correctAnswer: options.indexOf(result),
      explanation: `2x + 3y = 2(${x}) + 3(${y}) = ${2 * x} + ${3 * y} = ${result}`,
      difficulty: 'medium'
    });
  }
  
  return questions;
};

// Hard Questions: ตรรกะเงื่อนไขซับซ้อน
const generateHardQuestions = (): SymbolLogicQuestion[] => {
  const questions: SymbolLogicQuestion[] = [];
  
  // 1. เงื่อนไขแบบ If-Then (35 ข้อ)
  for (let i = 0; i < 35; i++) {
    const x = randomInt(1, 20);
    let y: number;
    let condition: string;
    
    if (x > 10) {
      y = x * 2;
      condition = 'x > 10';
    } else {
      y = x + 5;
      condition = 'x ≤ 10';
    }
    
    const options = [
      y,
      y + 1,
      y - 1,
      y + 2
    ].sort(() => Math.random() - 0.5);
    
    questions.push({
      id: questionId++,
      question: `กำหนดให้: ถ้า ${condition} แล้ว y = ${x > 10 ? '2x' : 'x + 5'} ถ้า x = ${x} แล้ว y = ?`,
      expression: `y = ?`,
      symbols: { condition },
      options: options.map(String),
      correctAnswer: options.indexOf(y),
      explanation: `x = ${x}, ${condition}, ดังนั้น y = ${y}`,
      difficulty: 'hard'
    });
  }
  
  // 2. ตรรกะแบบหลายเงื่อนไข (35 ข้อ)
  for (let i = 0; i < 35; i++) {
    const a = randomInt(1, 10);
    const b = randomInt(1, 10);
    const c = randomInt(1, 10);
    
    let result: number;
    let explanation: string;
    
    if (a > b && b > c) {
      result = a + b + c;
      explanation = 'a > b และ b > c, ดังนั้นใช้สูตร a + b + c';
    } else if (a > b) {
      result = a * b;
      explanation = 'a > b แต่ b ≤ c, ดังนั้นใช้สูตร a × b';
    } else {
      result = c * 2;
      explanation = 'a ≤ b, ดังนั้นใช้สูตร c × 2';
    }
    
    const options = [
      result,
      result + 1,
      result - 1,
      result + 5
    ].sort(() => Math.random() - 0.5);
    
    questions.push({
      id: questionId++,
      question: `กำหนดให้:
- ถ้า a > b และ b > c แล้ว ผลลัพธ์ = a + b + c
- ถ้า a > b แต่ b ≤ c แล้ว ผลลัพธ์ = a × b
- ถ้า a ≤ b แล้ว ผลลัพธ์ = c × 2

ถ้า a = ${a}, b = ${b}, c = ${c} แล้ว ผลลัพธ์ = ?`,
      expression: `?`,
      symbols: { a: String(a), b: String(b), c: String(c) },
      options: options.map(String),
      correctAnswer: options.indexOf(result),
      explanation: explanation,
      difficulty: 'hard'
    });
  }
  
  return questions;
};

// Export ข้อสอบทั้งหมด
export const generateAllSymbolLogicQuestions = (): SymbolLogicQuestion[] => {
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
  const allQuestions = generateAllSymbolLogicQuestions();
  console.log('\nSample questions:');
  allQuestions.slice(0, 5).forEach(q => {
    console.log(`\nQ${q.id}: ${q.question}`);
    console.log(`Expression: ${q.expression}`);
    console.log(`Options: ${q.options.join(', ')}`);
    console.log(`Answer: ${q.options[q.correctAnswer]}`);
    console.log(`Explanation: ${q.explanation}`);
  });
}
