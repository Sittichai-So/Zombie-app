// Generator สำหรับสร้างข้อสอบอนุกรม (Series) จำนวนมาก
// เป้าหมาย: 200 ข้อ

import { SeriesQuestion } from '../series';

let questionId = 1000; // เริ่มจาก 1000 เพื่อไม่ให้ซ้ำกับข้อเดิม

// Helper functions สำหรับสร้างอนุกรม
const generateArithmeticSeries = (start: number, diff: number, length: number = 5): number[] => {
  return Array.from({ length }, (_, i) => start + (i * diff));
};

const generateGeometricSeries = (start: number, ratio: number, length: number = 5): number[] => {
  return Array.from({ length }, (_, i) => start * Math.pow(ratio, i));
};

const generateFibonacciSeries = (length: number = 7): number[] => {
  const series = [1, 1];
  for (let i = 2; i < length; i++) {
    series.push(series[i - 1] + series[i - 2]);
  }
  return series;
};

const generateSquareSeries = (start: number = 1, length: number = 6): number[] => {
  return Array.from({ length }, (_, i) => Math.pow(start + i, 2));
};

const generateCubeSeries = (start: number = 1, length: number = 6): number[] => {
  return Array.from({ length }, (_, i) => Math.pow(start + i, 3));
};

const generatePrimeSeries = (length: number = 7): number[] => {
  const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
  return primes.slice(0, length);
};

const generateAlternatingSeries = (pattern1: number[], pattern2: number[]): (number | string)[] => {
  const result: (number | string)[] = [];
  const maxLength = Math.max(pattern1.length, pattern2.length);
  for (let i = 0; i < maxLength; i++) {
    if (i < pattern1.length) result.push(pattern1[i]);
    if (i < pattern2.length) result.push(pattern2[i]);
  }
  return result;
};

// สร้างข้อสอบ Easy
const generateEasyQuestions = (): SeriesQuestion[] => {
  const questions: SeriesQuestion[] = [];
  
  // Arithmetic progression (เพิ่มขึ้นทีละเท่าๆ กัน)
  for (let start = 1; start <= 20; start++) {
    for (let diff = 1; diff <= 5; diff++) {
      const series = generateArithmeticSeries(start, diff, 5);
      const answer = series[4] + diff;
      const wrongAnswers = [
        answer + diff,
        answer - diff,
        answer + 1,
        answer - 1
      ].filter((v, i, a) => a.indexOf(v) === i && v > 0);
      
      const options = [answer, ...wrongAnswers.slice(0, 3)].sort(() => Math.random() - 0.5);
      const correctIndex = options.indexOf(answer);
      
      questions.push({
        id: questionId++,
        question: 'จงหาตัวเลขถัดไป',
        series: [...series.map(n => n), '?'] as (number | string)[],
        options,
        correctAnswer: correctIndex,
        explanation: `อนุกรมเพิ่มขึ้นทีละ ${diff}: ${series.join(', ')}, ${answer}`,
        difficulty: 'easy'
      });
    }
  }
  
  return questions.slice(0, 80);
};

// สร้างข้อสอบ Medium
const generateMediumQuestions = (): SeriesQuestion[] => {
  const questions: SeriesQuestion[] = [];
  
  // Geometric progression (คูณด้วยจำนวนคงที่)
  for (let start = 2; start <= 5; start++) {
    for (let ratio = 2; ratio <= 4; ratio++) {
      const series = generateGeometricSeries(start, ratio, 5);
      const answer = series[4] * ratio;
      const options = [answer, answer + ratio, answer - ratio, answer * ratio].sort(() => Math.random() - 0.5);
      const correctIndex = options.indexOf(answer);
      
      questions.push({
        id: questionId++,
        question: 'จงหาตัวเลขถัดไป',
        series: [...series.map(n => n), '?'] as (number | string)[],
        options,
        correctAnswer: correctIndex,
        explanation: `อนุกรมคูณด้วย ${ratio}: ${series.join(', ')}, ${answer}`,
        difficulty: 'medium'
      });
    }
  }
  
  // Square numbers
  for (let start = 1; start <= 5; start++) {
    const series = generateSquareSeries(start, 6);
    const answer = Math.pow(start + 5, 2);
    const options = [answer, answer + 1, answer - 1, answer + start].sort(() => Math.random() - 0.5);
    const correctIndex = options.indexOf(answer);
    
    questions.push({
      id: questionId++,
      question: 'จงหาตัวเลขถัดไป',
      series: [...series.map(n => n), '?'] as (number | string)[],
      options,
      correctAnswer: correctIndex,
      explanation: `อนุกรมกำลังสอง: ${series.join(', ')}, ${answer}`,
      difficulty: 'medium'
    });
  }
  
  // Fibonacci
  for (let i = 0; i < 10; i++) {
    const series = generateFibonacciSeries(7);
    const answer = series[6] + series[5];
    const options = [answer, answer + 1, answer - 1, series[6] * 2].sort(() => Math.random() - 0.5);
    const correctIndex = options.indexOf(answer);
    
    questions.push({
      id: questionId++,
      question: 'จงหาตัวเลขถัดไป',
      series: [...series.map(n => n), '?'] as (number | string)[],
      options,
      correctAnswer: correctIndex,
      explanation: `อนุกรมฟิโบนัชชี: ผลบวกของ 2 ตัวก่อนหน้า, ${series[5]} + ${series[6]} = ${answer}`,
      difficulty: 'medium'
    });
  }
  
  return questions.slice(0, 70);
};

// สร้างข้อสอบ Hard
const generateHardQuestions = (): SeriesQuestion[] => {
  const questions: SeriesQuestion[] = [];
  
  // Alternating series
  for (let i = 0; i < 15; i++) {
    const pattern1 = generateArithmeticSeries(1 + i, 2, 4);
    const pattern2 = generateArithmeticSeries(2 + i, 3, 4);
    const series = generateAlternatingSeries(pattern1, pattern2);
    const answer = pattern1.length > pattern2.length ? pattern2[3] + 3 : pattern1[4];
    const options = [answer, answer + 1, answer - 1, answer + 2].sort(() => Math.random() - 0.5);
    const correctIndex = options.indexOf(answer);
    
    questions.push({
      id: questionId++,
      question: 'จงหาตัวเลขถัดไป',
      series: [...series.slice(0, 7), '?'],
      options,
      correctAnswer: correctIndex,
      explanation: `อนุกรมสลับ: pattern แรกเพิ่มขึ้นทีละ 2, pattern สองเพิ่มขึ้นทีละ 3`,
      difficulty: 'hard'
    });
  }
  
  // Prime numbers
  const primes = generatePrimeSeries(10);
  for (let i = 0; i < 5; i++) {
    const series = primes.slice(i, i + 6);
    const answer = primes[i + 6];
    const options = [answer, answer + 2, answer - 2, answer + 4].sort(() => Math.random() - 0.5);
    const correctIndex = options.indexOf(answer);
    
    questions.push({
      id: questionId++,
      question: 'จงหาตัวเลขถัดไป',
      series: [...series, '?'],
      options,
      correctAnswer: correctIndex,
      explanation: `อนุกรมจำนวนเฉพาะ: ${series.join(', ')}, ${answer}`,
      difficulty: 'hard'
    });
  }
  
  // Cube numbers
  for (let start = 1; start <= 5; start++) {
    const series = generateCubeSeries(start, 5);
    const answer = Math.pow(start + 4, 3);
    const options = [answer, answer + 10, answer - 10, answer + 20].sort(() => Math.random() - 0.5);
    const correctIndex = options.indexOf(answer);
    
    questions.push({
      id: questionId++,
      question: 'จงหาตัวเลขถัดไป',
      series: [...series.map(n => n), '?'] as (number | string)[],
      options,
      correctAnswer: correctIndex,
      explanation: `อนุกรมกำลังสาม: ${series.join(', ')}, ${answer}`,
      difficulty: 'hard'
    });
  }
  
  return questions.slice(0, 50);
};

// Export ข้อสอบทั้งหมด
export const generateAllSeriesQuestions = (): SeriesQuestion[] => {
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
  const allQuestions = generateAllSeriesQuestions();
  console.log('\nSample questions:');
  allQuestions.slice(0, 5).forEach(q => {
    console.log(`\nQ${q.id}: ${q.question}`);
    console.log(`Series: ${q.series.join(' ')}`);
    console.log(`Options: ${q.options.join(', ')}`);
    console.log(`Answer: ${q.options[q.correctAnswer]}`);
    console.log(`Explanation: ${q.explanation}`);
  });
}
