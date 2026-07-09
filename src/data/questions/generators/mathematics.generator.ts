// Generator สำหรับสร้างข้อสอบคณิตศาสตร์ (Mathematics) จำนวนมาก
// เป้าหมาย: 300 ข้อ

import { MathematicsQuestion } from '../mathematics';

let questionId = 2000; // เริ่มจาก 2000

// Helper functions
const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomFloat = (min: number, max: number, decimals: number = 2): number => {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
};

// Easy Questions: พื้นฐาน
const generateEasyQuestions = (): MathematicsQuestion[] => {
  const questions: MathematicsQuestion[] = [];
  
  // 1. การบวก/ลบ (30 ข้อ)
  for (let i = 0; i < 30; i++) {
    const a = randomInt(100, 999);
    const b = randomInt(100, 999);
    const isAddition = Math.random() > 0.5;
    
    if (isAddition) {
      const answer = a + b;
      const options = [
        answer,
        answer + randomInt(1, 10),
        answer - randomInt(1, 10),
        answer + randomInt(11, 20)
      ].sort(() => Math.random() - 0.5);
      
      questions.push({
        id: questionId++,
        question: `จงหาผลลัพธ์ของ ${a} + ${b}`,
        options: options.map(String),
        correctAnswer: options.indexOf(answer),
        explanation: `${a} + ${b} = ${answer}`,
        difficulty: 'easy'
      });
    } else {
      const [max, min] = a > b ? [a, b] : [b, a];
      const answer = max - min;
      const options = [
        answer,
        answer + randomInt(1, 10),
        answer - randomInt(1, 10),
        answer + randomInt(11, 20)
      ].sort(() => Math.random() - 0.5);
      
      questions.push({
        id: questionId++,
        question: `จงหาผลลัพธ์ของ ${max} - ${min}`,
        options: options.map(String),
        correctAnswer: options.indexOf(answer),
        explanation: `${max} - ${min} = ${answer}`,
        difficulty: 'easy'
      });
    }
  }
  
  // 2. การคูณ/หาร (30 ข้อ)
  for (let i = 0; i < 30; i++) {
    const a = randomInt(2, 20);
    const b = randomInt(2, 20);
    const isMultiplication = Math.random() > 0.5;
    
    if (isMultiplication) {
      const answer = a * b;
      const options = [
        answer,
        answer + a,
        answer - a,
        answer + b
      ].sort(() => Math.random() - 0.5);
      
      questions.push({
        id: questionId++,
        question: `จงหาผลลัพธ์ของ ${a} × ${b}`,
        options: options.map(String),
        correctAnswer: options.indexOf(answer),
        explanation: `${a} × ${b} = ${answer}`,
        difficulty: 'easy'
      });
    } else {
      const dividend = a * b;
      const answer = a;
      const options = [
        answer,
        answer + 1,
        answer - 1,
        answer + 2
      ].sort(() => Math.random() - 0.5);
      
      questions.push({
        id: questionId++,
        question: `จงหาผลลัพธ์ของ ${dividend} ÷ ${b}`,
        options: options.map(String),
        correctAnswer: options.indexOf(answer),
        explanation: `${dividend} ÷ ${b} = ${answer}`,
        difficulty: 'easy'
      });
    }
  }
  
  // 3. ร้อยละ/เปอร์เซ็นต์ (20 ข้อ)
  for (let i = 0; i < 20; i++) {
    const base = randomInt(10, 100) * 10; // 100, 200, ..., 1000
    const percent = randomInt(5, 50);
    const answer = (base * percent) / 100;
    
    const options = [
      answer,
      answer + 10,
      answer - 10,
      answer + 20
    ].sort(() => Math.random() - 0.5);
    
    questions.push({
      id: questionId++,
      question: `${percent}% ของ ${base} เท่ากับเท่าไร`,
      options: options.map(String),
      correctAnswer: options.indexOf(answer),
      explanation: `${percent}% ของ ${base} = (${percent} × ${base}) / 100 = ${answer}`,
      difficulty: 'easy'
    });
  }
  
  // 4. สมการเชิงเส้นตัวแปรเดียว (20 ข้อ)
  for (let i = 0; i < 20; i++) {
    const x = randomInt(1, 20);
    const a = randomInt(2, 10);
    const b = randomInt(1, 50);
    const result = a * x + b;
    
    const options = [
      x,
      x + 1,
      x - 1,
      x + 2
    ].sort(() => Math.random() - 0.5);
    
    questions.push({
      id: questionId++,
      question: `จงหาค่า x จากสมการ ${a}x + ${b} = ${result}`,
      options: options.map(String),
      correctAnswer: options.indexOf(x),
      explanation: `${a}x + ${b} = ${result}\n${a}x = ${result} - ${b}\n${a}x = ${a * x}\nx = ${x}`,
      difficulty: 'easy'
    });
  }
  
  return questions;
};

// Medium Questions: ปานกลาง
const generateMediumQuestions = (): MathematicsQuestion[] => {
  const questions: MathematicsQuestion[] = [];
  
  // 1. พื้นที่รูปทรงพื้นฐาน (30 ข้อ)
  // สี่เหลี่ยมผืนผ้า
  for (let i = 0; i < 10; i++) {
    const width = randomInt(5, 20);
    const height = randomInt(5, 20);
    const area = width * height;
    
    const options = [
      area,
      area + width,
      area - width,
      area + height
    ].sort(() => Math.random() - 0.5);
    
    questions.push({
      id: questionId++,
      question: `สี่เหลี่ยมผืนผ้ากว้าง ${width} ซม. ยาว ${height} ซม. มีพื้นที่เท่าไร`,
      options: options.map(String),
      correctAnswer: options.indexOf(area),
      explanation: `พื้นที่สี่เหลี่ยมผืนผ้า = กว้าง × ยาว = ${width} × ${height} = ${area} ตร.ซม.`,
      difficulty: 'medium'
    });
  }
  
  // วงกลม
  for (let i = 0; i < 10; i++) {
    const radius = randomInt(3, 15);
    const area = Math.round(Math.PI * radius * radius);
    
    const options = [
      area,
      area + 50,
      area - 50,
      area + 100
    ].sort(() => Math.random() - 0.5);
    
    questions.push({
      id: questionId++,
      question: `วงกลมมีรัศมี ${radius} ซม. มีพื้นที่ประมาณเท่าไร (ใช้ π = 3.14)`,
      options: options.map(String),
      correctAnswer: options.indexOf(area),
      explanation: `พื้นที่วงกลม = πr² = 3.14 × ${radius}² = 3.14 × ${radius * radius} ≈ ${area} ตร.ซม.`,
      difficulty: 'medium'
    });
  }
  
  // สามเหลี่ยม
  for (let i = 0; i < 10; i++) {
    const base = randomInt(6, 20);
    const height = randomInt(6, 20);
    const area = (base * height) / 2;
    
    const options = [
      area,
      area + base,
      area - base,
      base * height
    ].sort(() => Math.random() - 0.5);
    
    questions.push({
      id: questionId++,
      question: `สามเหลี่ยมมีฐาน ${base} ซม. สูง ${height} ซม. มีพื้นที่เท่าไร`,
      options: options.map(String),
      correctAnswer: options.indexOf(area),
      explanation: `พื้นที่สามเหลี่ยม = ½ × ฐาน × สูง = ½ × ${base} × ${height} = ${area} ตร.ซม.`,
      difficulty: 'medium'
    });
  }
  
  // 2. สมการกำลังสอง (30 ข้อ)
  for (let i = 0; i < 30; i++) {
    const x1 = randomInt(1, 10);
    const x2 = randomInt(1, 10);
    const a = 1;
    const b = -(x1 + x2);
    const c = x1 * x2;
    
    const options = [
      `${x1}, ${x2}`,
      `${x1 + 1}, ${x2}`,
      `${x1}, ${x2 + 1}`,
      `${-x1}, ${-x2}`
    ].sort(() => Math.random() - 0.5);
    
    questions.push({
      id: questionId++,
      question: `จงหาคำตอบของสมการ x² ${b >= 0 ? '+' : '-'} ${Math.abs(b)}x ${c >= 0 ? '+' : '-'} ${Math.abs(c)} = 0`,
      options,
      correctAnswer: options.indexOf(`${x1}, ${x2}`),
      explanation: `แยกตัวประกอบ: (x - ${x1})(x - ${x2}) = 0\nดังนั้น x = ${x1} หรือ ${x2}`,
      difficulty: 'medium'
    });
  }
  
  // 3. อัตราส่วนและสัดส่วน (30 ข้อ)
  for (let i = 0; i < 30; i++) {
    const ratio1 = randomInt(1, 5);
    const ratio2 = randomInt(1, 5);
    const total = randomInt(20, 100);
    const sum = ratio1 + ratio2;
    
    if (total % sum === 0) {
      const part1 = (total / sum) * ratio1;
      const part2 = (total / sum) * ratio2;
      
      const options = [
        `${part1}:${part2}`,
        `${part2}:${part1}`,
        `${ratio1}:${ratio2}`,
        `${ratio2}:${ratio1}`
      ].sort(() => Math.random() - 0.5);
      
      questions.push({
        id: questionId++,
        question: `แบ่ง ${total} บาท ให้ A และ B ในอัตราส่วน ${ratio1}:${ratio2} A และ B จะได้เงินคนละเท่าไร`,
        options,
        correctAnswer: options.indexOf(`${part1}:${part2}`),
        explanation: `รวมอัตราส่วน = ${ratio1} + ${ratio2} = ${sum}\n1 ส่วน = ${total} ÷ ${sum} = ${total / sum}\nA ได้ = ${ratio1} × ${total / sum} = ${part1}\nB ได้ = ${ratio2} × ${total / sum} = ${part2}`,
        difficulty: 'medium'
      });
    }
  }
  
  return questions;
};

// Hard Questions: ยาก
const generateHardQuestions = (): MathematicsQuestion[] => {
  const questions: MathematicsQuestion[] = [];
  
  // 1. โจทย์ปัญหา (30 ข้อ)
  for (let i = 0; i < 30; i++) {
    const price = randomInt(100, 500);
    const discount = randomInt(10, 40);
    const tax = randomInt(5, 15);
    
    const discountedPrice = price * (100 - discount) / 100;
    const finalPrice = discountedPrice * (100 + tax) / 100;
    
    const options = [
      Math.round(finalPrice),
      Math.round(finalPrice + 50),
      Math.round(finalPrice - 50),
      Math.round(finalPrice + 100)
    ].sort(() => Math.random() - 0.5);
    
    questions.push({
      id: questionId++,
      question: `สินค้าราคา ${price} บาท ลดราคา ${discount}% และคิดภาษี ${tax}% ราคาสินค้าสุดท้ายคือเท่าไร`,
      options: options.map(String),
      correctAnswer: options.indexOf(Math.round(finalPrice)),
      explanation: `ราคาลด = ${price} × (100 - ${discount})% = ${price} × ${(100 - discount) / 100} = ${discountedPrice}\nรวมภาษี = ${discountedPrice} × (100 + ${tax})% = ${discountedPrice} × ${(100 + tax) / 100} = ${finalPrice.toFixed(2)}\nปัดเศษ = ${Math.round(finalPrice)} บาท`,
      difficulty: 'hard'
    });
  }
  
  // 2. ฟังก์ชัน (25 ข้อ)
  for (let i = 0; i < 25; i++) {
    const a = randomInt(2, 5);
    const b = randomInt(1, 10);
    const x = randomInt(1, 10);
    const result = a * x + b;
    
    const options = [
      result,
      result + a,
      result - a,
      result + b
    ].sort(() => Math.random() - 0.5);
    
    questions.push({
      id: questionId++,
      question: `กำหนดให้ f(x) = ${a}x + ${b} จงหาค่าของ f(${x})`,
      options: options.map(String),
      correctAnswer: options.indexOf(result),
      explanation: `f(${x}) = ${a}(${x}) + ${b} = ${a * x} + ${b} = ${result}`,
      difficulty: 'hard'
    });
  }
  
  // 3. ความน่าจะเป็น (25 ข้อ)
  for (let i = 0; i < 25; i++) {
    const totalBalls = randomInt(10, 30);
    const redBalls = randomInt(3, totalBalls - 3);
    const blueBalls = totalBalls - redBalls;
    
    const probability = (redBalls / totalBalls).toFixed(2);
    
    const options = [
      probability,
      (parseFloat(probability) + 0.1).toFixed(2),
      (parseFloat(probability) - 0.1).toFixed(2),
      (redBalls / (totalBalls + 5)).toFixed(2)
    ].sort(() => Math.random() - 0.5);
    
    questions.push({
      id: questionId++,
      question: `กล่องมีลูกบอล ${totalBalls} ลูก เป็นสีแดง ${redBalls} ลูก สีน้ำเงิน ${blueBalls} ลูก ความน่าจะเป็นที่จะหยิบได้ลูกบอลสีแดงคือเท่าไร`,
      options,
      correctAnswer: options.indexOf(probability),
      explanation: `ความน่าจะเป็น = จำนวนเหตุการณ์ที่สนใจ / จำนวนเหตุการณ์ทั้งหมด\n= ${redBalls} / ${totalBalls} = ${(redBalls / totalBalls).toFixed(4)} ≈ ${probability}`,
      difficulty: 'hard'
    });
  }
  
  return questions;
};

// Export ข้อสอบทั้งหมด
export const generateAllMathematicsQuestions = (): MathematicsQuestion[] => {
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
  const allQuestions = generateAllMathematicsQuestions();
  console.log('\nSample questions:');
  allQuestions.slice(0, 5).forEach(q => {
    console.log(`\nQ${q.id}: ${q.question}`);
    console.log(`Options: ${q.options.join(', ')}`);
    console.log(`Answer: ${q.options[q.correctAnswer]}`);
    console.log(`Explanation: ${q.explanation}`);
  });
}
