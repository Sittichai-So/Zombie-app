// Generator สำหรับสร้างข้อสอบตารางและกราฟ (Tables & Graphs) จำนวนมาก
// เป้าหมาย: 300 ข้อ

import { TableGraphQuestion } from '../tablesGraph';

let questionId = 5000;

const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomFloat = (min: number, max: number, decimals: number = 2): number => {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
};

const generateEasyQuestions = (): TableGraphQuestion[] => {
  const questions: TableGraphQuestion[] = [];
  
  // 1. อ่านตารางข้อมูล (50 ข้อ)
  for (let i = 0; i < 50; i++) {
    const students = ['สมชาย', 'สมหญิง', 'วิชัย', 'มานี', 'ปิติ'];
    const scores = [
      randomInt(60, 100),
      randomInt(60, 100),
      randomInt(60, 100),
      randomInt(60, 100),
      randomInt(60, 100)
    ];
    
    const maxScore = Math.max(...scores);
    const maxIndex = scores.indexOf(maxScore);
    
    questions.push({
      id: questionId++,
      category: 'tablesGraph',
      title: 'ตารางคะแนนนักเรียน',
      dataType: 'table',
      data: {
        headers: ['ชื่อ', 'คะแนน'],
        rows: students.map((name, i) => [name, scores[i].toString()])
      },
      question: `จากตารางคะแนนต่อไปนี้:

| ชื่อ   | คะแนน |
|--------|--------|
| สมชาย  | ${scores[0]}     |
| สมหญิง | ${scores[1]}     |
| วิชัย  | ${scores[2]}     |
| มานี   | ${scores[3]}     |
| ปิติ   | ${scores[4]}     |

ใครได้คะแนนสูงสุด?`,
      options: ['สมชาย', 'สมหญิง', 'วิชัย', 'มานี', 'ปิติ'],
      correctAnswer: maxIndex,
      explanation: `${students[maxIndex]} ได้คะแนน ${maxScore} คะแนน ซึ่งสูงที่สุด`,
      difficulty: 'easy'
    });
  }
  
  // 2. อ่านกราฟแท่ง (50 ข้อ)
  for (let i = 0; i < 50; i++) {
    const months = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.'];
    const sales = [
      randomInt(10, 50),
      randomInt(10, 50),
      randomInt(10, 50),
      randomInt(10, 50),
      randomInt(10, 50)
    ];
    
    const total = sales.reduce((a, b) => a + b, 0);
    
    questions.push({
      id: questionId++,
      category: 'tablesGraph',
      title: 'กราฟยอดขายรายเดือน',
      dataType: 'bar',
      data: {
        labels: months,
        values: sales
      },
      question: `จากกราฟยอดขายต่อไปนี้:

${months.map((m, i) => `${m}: ${'█'.repeat(sales[i])} (${sales[i]} ชิ้น)`).join('\n')}

เดือนมกราคมถึงเดือนพฤษภาคมขายสินค้าได้รวมกี่ชิ้น?`,
      options: [
        total.toString(),
        (total + 10).toString(),
        (total - 10).toString(),
        (total + 20).toString()
      ],
      correctAnswer: 0,
      explanation: `รวมยอดขาย = ${sales.join(' + ')} = ${total} ชิ้น`,
      difficulty: 'easy'
    });
  }
  
  return questions;
};

// Medium Questions: คำนวณจากข้อมูล
const generateMediumQuestions = (): TableGraphQuestion[] => {
  const questions: TableGraphQuestion[] = [];
  
  // 1. คำนวณเปอร์เซ็นต์ (60 ข้อ)
  for (let i = 0; i < 60; i++) {
    const categories = ['อาหาร', 'เสื้อผ้า', 'ที่อยู่อาศัย', 'การเดินทาง', 'อื่นๆ'];
    const expenses = [
      randomInt(3000, 8000),
      randomInt(2000, 5000),
      randomInt(5000, 12000),
      randomInt(1000, 3000),
      randomInt(1000, 3000)
    ];
    
    const total = expenses.reduce((a, b) => a + b, 0);
    const foodPercent = Math.round((expenses[0] / total) * 100);
    
    questions.push({
      id: questionId++,
      category: 'tablesGraph',
      question: `จากตารางค่าใช้จ่ายต่อไปนี้:

| หมวดหมู่      | จำนวนเงิน (บาท) |
|---------------|-----------------|
| อาหาร         | ${expenses[0].toLocaleString()}          |
| เสื้อผ้า      | ${expenses[1].toLocaleString()}          |
| ที่อยู่อาศัย   | ${expenses[2].toLocaleString()}          |
| การเดินทาง    | ${expenses[3].toLocaleString()}          |
| อื่นๆ         | ${expenses[4].toLocaleString()}          |

ค่าใช้จ่ายหมวดอาหารคิดเป็นกี่เปอร์เซ็นต์ของทั้งหมด?`,
      title: 'ตารางค่าใช้จ่าย',
      dataType: 'table',
      data: {
        headers: ['หมวดหมู่', 'จำนวนเงิน (บาท)'],
        rows: [
          ['อาหาร', expenses[0].toLocaleString()],
          ['เสื้อผ้า', expenses[1].toLocaleString()],
          ['ที่อยู่อาศัย', expenses[2].toLocaleString()],
          ['การเดินทาง', expenses[3].toLocaleString()],
          ['อื่นๆ', expenses[4].toLocaleString()]
        ]
      },
      options: [
        `${foodPercent}%`,
        `${foodPercent + 5}%`,
        `${foodPercent - 5}%`,
        `${foodPercent + 10}%`
      ],
      correctAnswer: 0,
      explanation: `ค่าใช้จ่ายทั้งหมด = ${total.toLocaleString()} บาท\nค่าอาหาร = ${expenses[0].toLocaleString()} บาท\nเปอร์เซ็นต์ = (${expenses[0]} / ${total}) × 100 = ${foodPercent}%`,
      difficulty: 'medium'
    });
  }
  
  // 2. คำนวณค่าเฉลี่ย (60 ข้อ)
  for (let i = 0; i < 60; i++) {
    const scores = Array.from({ length: 5 }, () => randomInt(50, 100));
    const average = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    
    questions.push({
      id: questionId++,
      category: 'tablesGraph',
      question: `จากคะแนนสอบของนักเรียน 5 คน: ${scores.join(', ')} คะแนน

คะแนนเฉลี่ยของนักเรียนกลุ่มนี้คือเท่าไร?`,
      title: 'ตารางคะแนนนักเรียน',
      dataType: 'table',
      data: {
        headers: ['นักเรียน', '1', '2', '3', '4', '5'],
        rows: [
          ['คะแนน', ...scores.map(s => s.toString())]
        ]
      },
      options: [
        average.toString(),
        (average + 2).toString(),
        (average - 2).toString(),
        (average + 5).toString()
      ],
      correctAnswer: 0,
      explanation: `คะแนนรวม = ${scores.reduce((a, b) => a + b, 0)}\nคะแนนเฉลี่ย = ${scores.reduce((a, b) => a + b, 0)} ÷ 5 = ${average}`,
      difficulty: 'medium'
    });
  }
  
  return questions;
};

// Hard Questions: วิเคราะห์/สรุปแนวโน้ม
const generateHardQuestions = (): TableGraphQuestion[] => {
  const questions: TableGraphQuestion[] = [];
  
  // 1. วิเคราะห์แนวโน้ม (40 ข้อ)
  for (let i = 0; i < 40; i++) {
    const years = [2020, 2021, 2022, 2023, 2024];
    const profits = Array.from({ length: 5 }, (_, idx) => {
      return 1000000 + (idx * randomInt(100000, 300000));
    });
    
    const growthRates = profits.map((p, i) => {
      if (i === 0) return 0;
      return Math.round(((profits[i] - profits[i-1]) / profits[i-1]) * 100);
    });
    
    const avgGrowth = Math.round(growthRates.filter((_, i) => i > 0).reduce((a, b) => a + b, 0) / 4);
    
    questions.push({
      id: questionId++,
      category: 'tablesGraph',
      question: `จากกำไรของบริษัทในปี 2020-2024:

| ปี    | กำไร (บาท)     | การเติบโต (%) |
|-------|---------------|---------------|
| 2020  | ${profits[0].toLocaleString()} | -             |
| 2021  | ${profits[1].toLocaleString()} | ${growthRates[1]}%            |
| 2022  | ${profits[2].toLocaleString()} | ${growthRates[2]}%            |
| 2023  | ${profits[3].toLocaleString()} | ${growthRates[3]}%            |
| 2024  | ${profits[4].toLocaleString()} | ${growthRates[4]}%            |

อัตราการเติบโตของกำไรเฉลี่ยต่อปีคือเท่าไร?`,
      title: 'ตารางกำไรบริษัท',
      dataType: 'table',
      data: {
        headers: ['ปี', '2020', '2021', '2022', '2023', '2024'],
        rows: [
          ['กำไร', ...profits.map(p => p.toLocaleString())],
          ['เติบโต (%)', '-', ...growthRates.slice(1).map(g => g.toString())]
        ]
      },
      options: [
        `${avgGrowth}%`,
        `${avgGrowth + 2}%`,
        `${avgGrowth - 2}%`,
        `${avgGrowth + 5}%`
      ],
      correctAnswer: 0,
      explanation: `อัตราการเติบโตเฉลี่ย = (${growthRates.slice(1).join(' + ')}) ÷ 4 = ${avgGrowth}%`,
      difficulty: 'hard'
    });
  }
  
  // 2. สรุปข้อมูลจากกราฟ (40 ข้อ)
  for (let i = 0; i < 40; i++) {
    const products = ['A', 'B', 'C', 'D', 'E'];
    const sales = [
      randomInt(100, 500),
      randomInt(100, 500),
      randomInt(100, 500),
      randomInt(100, 500),
      randomInt(100, 500)
    ].sort((a, b) => b - a);
    
    const bestProduct = products[0];
    const worstProduct = products[4];
    const ratio = (sales[0] / sales[4]).toFixed(1);
    
    questions.push({
      id: questionId++,
      category: 'tablesGraph',
      question: `จากยอดขายสินค้า 5 ชนิด:

| สินค้า | ยอดขาย (ชิ้น) |
|--------|--------------|
| A      | ${sales[0]}          |
| B      | ${sales[1]}          |
| C      | ${sales[2]}          |
| D      | ${sales[3]}          |
| E      | ${sales[4]}          |

ข้อสรุปใดถูกต้อง?`,
      title: 'ตารางยอดขายสินค้า',
      dataType: 'table',
      data: {
        headers: ['สินค้า', 'A', 'B', 'C', 'D', 'E'],
        rows: [
          ['ยอดขาย', ...sales.map(s => s.toString())]
        ]
      },
      options: [
        `สินค้า A ขายได้ดีที่สุด`,
        `สินค้า E ขายได้ดีที่สุด`,
        `สินค้า C ขายได้ปานกลาง`,
        `ยอดขายทุกสินค้าใกล้เคียงกัน`
      ],
      correctAnswer: 0,
      explanation: `สินค้า A ขายได้ ${sales[0]} ชิ้น ซึ่งสูงที่สุด, สินค้า E ขายได้ ${sales[4]} ชิ้น ซึ่งต่ำที่สุด, อัตราส่วน = ${ratio} เท่า`,
      difficulty: 'hard'
    });
  }
  
  return questions;
};

// Export ข้อสอบทั้งหมด
export const generateAllTableGraphQuestions = (): TableGraphQuestion[] => {
  const easy = generateEasyQuestions();
  const medium = generateMediumQuestions();
  const hard = generateHardQuestions();
  
  console.log(`Generated ${easy.length} easy questions`);
  console.log(`Generated ${medium.length} medium questions`);
  console.log(`Generated ${hard.length} hard questions`);
  console.log(`Total: ${easy.length + medium.length + hard.length} questions`);
  
  return [...easy, ...medium, ...hard];
};

// Run generator (Node.js environment only)
// Uncomment below when running in Node.js with @types/node installed
// if (require.main === module) {
//   const allQuestions = generateAllTableGraphQuestions();
//   console.log('\nSample questions:');
//   allQuestions.slice(0, 3).forEach(q => {
//     console.log(`\nQ${q.id}: ${q.question}`);
//     console.log(`Data Type: ${q.dataType}`);
//     console.log(`Options: ${q.options.join(', ')}`);
//     console.log(`Answer: ${q.options[q.correctAnswer]}`);
//     console.log(`Explanation: ${q.explanation}`);
//   });
// }
