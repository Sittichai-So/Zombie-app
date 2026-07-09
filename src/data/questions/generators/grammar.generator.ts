// Generator สำหรับสร้างข้อสอบภาษาอังกฤษ - ไวยากรณ์ (Grammar)
// เป้าหมาย: 250 ข้อ

import { GrammarQuestion } from '../grammar';

let questionId = 7000;

const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Easy Questions: พื้นฐาน
const generateEasyQuestions = (): GrammarQuestion[] => {
  const questions: GrammarQuestion[] = [];
  
  // 1. Tenses - Present Simple (30 ข้อ)
  const presentSimpleSubjects = ['I', 'You', 'We', 'They', 'He', 'She', 'It'];
  const presentSimpleVerbs = [
    { base: 'go', third: 'goes' },
    { base: 'eat', third: 'eats' },
    { base: 'study', third: 'studies' },
    { base: 'work', third: 'works' },
    { base: 'play', third: 'plays' }
  ];
  
  for (let i = 0; i < 30; i++) {
    const subject = presentSimpleSubjects[randomInt(0, 6)];
    const verb = presentSimpleVerbs[randomInt(0, 4)];
    const isThirdPerson = ['He', 'She', 'It'].includes(subject);
    const correctVerb = isThirdPerson ? verb.third : verb.base;
    
    questions.push({
      id: questionId++,
      question_en: `Complete the sentence: ${subject} _____ to school every day.`,
      question_th: `เติมคำในช่องว่าง: ${subject} _____ ไปโรงเรียนทุกวัน`,
      sentence: `${subject} _____ to school every day.`,
      options: [correctVerb, verb.base, 'going', 'gone'],
      correctAnswer: 0,
      explanation_en: `Present Simple: ${subject} + ${correctVerb} (verb adds s/es for He/She/It)`,
      explanation_th: `Present Simple: ${subject} + ${correctVerb} (กริยาเติม s/es สำหรับ He/She/It)`,
      grammarPoint: 'Present Simple Tense',
      difficulty: 'easy'
    });
  }
  
  // 2. Articles - a, an, the (30 ข้อ)
  const articleQuestions = [
    { blank: '___ apple', answer: 'An', options: ['A', 'An', 'The', '-'] },
    { blank: '___ book', answer: 'A', options: ['A', 'An', 'The', '-'] },
    { blank: '___ sun', answer: 'The', options: ['A', 'An', 'The', '-'] },
    { blank: '___ elephant', answer: 'An', options: ['A', 'An', 'The', '-'] },
    { blank: '___ moon', answer: 'The', options: ['A', 'An', 'The', '-'] }
  ];
  
  for (let i = 0; i < 30; i++) {
    const q = articleQuestions[i % articleQuestions.length];
    questions.push({
      id: questionId++,
      question_en: `Fill in the blank: ${q.blank}`,
      question_th: `เติมคำในช่องว่าง: ${q.blank}`,
      sentence: q.blank,
      options: q.options,
      correctAnswer: q.options.indexOf(q.answer),
      explanation_en: `${q.answer} is used with ${q.blank.includes('apple') || q.blank.includes('elephant') ? 'words starting with vowel sound' : q.blank.includes('sun') || q.blank.includes('moon') ? 'unique things' : 'words starting with consonant sound'}`,
      explanation_th: `${q.answer} ใช้กับ ${q.blank.includes('apple') || q.blank.includes('elephant') ? 'คำที่ขึ้นต้นด้วยเสียงสระ' : q.blank.includes('sun') || q.blank.includes('moon') ? 'สิ่งที่มีหนึ่งเดียว' : 'คำที่ขึ้นต้นด้วยเสียงพยัญชนะ'}`,
      grammarPoint: 'Articles',
      difficulty: 'easy'
    });
  }
  
  // 3. Prepositions - in, on, at (20 ข้อ)
  const prepositionQuestions = [
    { blank: '___ Monday', answer: 'On' },
    { blank: '___ 5 o\'clock', answer: 'At' },
    { blank: '___ July', answer: 'In' },
    { blank: '___ the table', answer: 'On' },
    { blank: '___ the room', answer: 'In' }
  ];
  
  for (let i = 0; i < 20; i++) {
    const q = prepositionQuestions[i % prepositionQuestions.length];
    questions.push({
      id: questionId++,
      question_en: `Fill in the blank: ${q.blank}`,
      question_th: `เติมคำในช่องว่าง: ${q.blank}`,
      sentence: q.blank,
      options: ['In', 'On', 'At', 'By'],
      correctAnswer: ['In', 'On', 'At', 'By'].indexOf(q.answer),
      explanation_en: `${q.answer} is used with ${q.blank}`,
      explanation_th: `${q.answer} ใช้กับ ${q.blank}`,
      grammarPoint: 'Prepositions',
      difficulty: 'easy'
    });
  }
  
  return questions;
};

// Medium Questions: ปานกลาง
const generateMediumQuestions = (): GrammarQuestion[] => {
  const questions: GrammarQuestion[] = [];
  
  // 1. Past Simple vs Present Perfect (30 ข้อ)
  const pastPerfectQuestions = [
    { sentence: 'I _____ him yesterday.', answer: 'saw', options: ['see', 'saw', 'have seen', 'seen'] },
    { sentence: 'She _____ to Paris last year.', answer: 'went', options: ['go', 'went', 'has gone', 'gone'] },
    { sentence: 'They _____ here since 2020.', answer: 'have lived', options: ['live', 'lived', 'have lived', 'living'] },
    { sentence: 'He _____ already _____ his homework.', answer: 'has finished', options: ['has finished', 'finished', 'finishes', 'finish'] }
  ];
  
  for (let i = 0; i < 30; i++) {
    const q = pastPerfectQuestions[i % pastPerfectQuestions.length];
    const shuffled = [...q.options].sort(() => Math.random() - 0.5);
    questions.push({
      id: questionId++,
      question_en: `Choose the correct answer: ${q.sentence}`,
      question_th: `เลือกคำตอบที่ถูกต้อง: ${q.sentence}`,
      sentence: q.sentence,
      options: shuffled,
      correctAnswer: shuffled.indexOf(q.answer),
      explanation_en: q.answer === 'saw' || q.answer === 'went' 
        ? 'Past Simple: used for completed actions in the past with specific time' 
        : 'Present Perfect: used for past actions without specific time or continuing to present',
      explanation_th: q.answer === 'saw' || q.answer === 'went' 
        ? 'Past Simple: ใช้กับเหตุการณ์ที่เกิดขึ้นในอดีตและมีเวลาชัดเจน' 
        : 'Present Perfect: ใช้กับเหตุการณ์ที่เกิดขึ้นในอดีตแต่ไม่ระบุเวลา หรือเกิดขึ้นต่อเนื่องมาถึงปัจจุบัน',
      grammarPoint: 'Past Simple vs Present Perfect',
      difficulty: 'medium'
    });
  }
  
  // 2. Conditionals - Type 1, 2 (30 ข้อ)
  const conditionalQuestions = [
    { sentence: 'If it rains, I _____ at home.', answer: 'will stay', type: 'Type 1' },
    { sentence: 'If I were you, I _____ study harder.', answer: 'would', type: 'Type 2' },
    { sentence: 'She will pass if she _____ hard.', answer: 'studies', type: 'Type 1' },
    { sentence: 'If he had time, he _____ help us.', answer: 'would', type: 'Type 2' }
  ];
  
  for (let i = 0; i < 30; i++) {
    const q = conditionalQuestions[i % conditionalQuestions.length];
    questions.push({
      id: questionId++,
      question_en: `Complete the sentence: ${q.sentence}`,
      question_th: `เติมคำในช่องว่าง: ${q.sentence}`,
      sentence: q.sentence,
      options: [q.answer, 'would', 'will', 'had'],
      correctAnswer: 0,
      explanation_en: `Conditional ${q.type}: ${q.type === 'Type 1' ? 'real possibility in the future' : 'hypothetical unreal situation'}`,
      explanation_th: `Conditional ${q.type}: ${q.type === 'Type 1' ? 'ความเป็นไปได้ในอนาคต' : 'สถานการณ์สมมติที่ไม่เป็นจริง'}`,
      grammarPoint: 'Conditionals',
      difficulty: 'medium'
    });
  }
  
  // 3. Passive Voice (20 ข้อ)
  const passiveQuestions = [
    { active: 'He writes a letter.', passive: 'A letter is written by him.' },
    { active: 'She ate an apple.', passive: 'An apple was eaten by her.' },
    { active: 'They will build a house.', passive: 'A house will be built by them.' }
  ];
  
  for (let i = 0; i < 20; i++) {
    const q = passiveQuestions[i % passiveQuestions.length];
    questions.push({
      id: questionId++,
      question_en: `Change to passive voice: ${q.active}`,
      question_th: `เปลี่ยนเป็นประโยค passive: ${q.active}`,
      sentence: q.active,
      options: [
        q.passive,
        q.active,
        q.passive.replace('is', 'are'),
        q.passive.replace('by him', 'by her')
      ],
      correctAnswer: 0,
      explanation_en: `Passive Voice: Object + be + V.3 + by Subject`,
      explanation_th: `Passive Voice: กรรม + be + V.3 + โดย ประธาน`,
      grammarPoint: 'Passive Voice',
      difficulty: 'medium'
    });
  }
  
  return questions;
};

// Hard Questions: ยาก
const generateHardQuestions = (): GrammarQuestion[] => {
  const questions: GrammarQuestion[] = [];
  
  // 1. Complex Sentences (25 ข้อ)
  const complexSentences = [
    { sentence: '_____ he was tired, he continued working.', answer: 'Although', options: ['Although', 'Because', 'Since', 'If'] },
    { sentence: 'I will call you _____ I arrive.', answer: 'as soon as', options: ['as soon as', 'until', 'while', 'during'] },
    { sentence: 'She speaks English _____ she were British.', answer: 'as if', options: ['as if', 'like', 'as', 'similar'] }
  ];
  
  for (let i = 0; i < 25; i++) {
    const q = complexSentences[i % complexSentences.length];
    const shuffled = [...q.options].sort(() => Math.random() - 0.5);
    questions.push({
      id: questionId++,
      question_en: `Choose the correct conjunction: ${q.sentence}`,
      question_th: `เลือกสันธานที่ถูกต้อง: ${q.sentence}`,
      sentence: q.sentence,
      options: shuffled,
      correctAnswer: shuffled.indexOf(q.answer),
      explanation_en: `${q.answer} is used to connect clauses showing ${q.answer === 'Although' ? 'contrast' : 'time or condition'}`,
      explanation_th: `${q.answer} ใช้เชื่อมประโยคที่แสดง ${q.answer === 'Although' ? 'ความขัดแย้ง' : 'เวลาหรือเงื่อนไข'}`,
      grammarPoint: 'Complex Sentences',
      difficulty: 'hard'
    });
  }
  
  // 2. Subjunctive Mood (25 ข้อ)
  const subjunctiveQuestions = [
    { sentence: 'I suggest that he _____ earlier.', answer: 'come', options: ['come', 'comes', 'came', 'coming'] },
    { sentence: 'It is important that she _____ on time.', answer: 'be', options: ['be', 'is', 'was', 'been'] },
    { sentence: 'If I _____ rich, I would travel.', answer: 'were', options: ['were', 'was', 'am', 'been'] }
  ];
  
  for (let i = 0; i < 25; i++) {
    const q = subjunctiveQuestions[i % subjunctiveQuestions.length];
    const shuffled = [...q.options].sort(() => Math.random() - 0.5);
    questions.push({
      id: questionId++,
      question_en: `Choose the correct form: ${q.sentence}`,
      question_th: `เลือกรูปแบบที่ถูกต้อง: ${q.sentence}`,
      sentence: q.sentence,
      options: shuffled,
      correctAnswer: shuffled.indexOf(q.answer),
      explanation_en: `Subjunctive Mood: used to express ${q.answer === 'were' ? 'hypothetical situations' : 'suggestions or importance'}`,
      explanation_th: `Subjunctive Mood: ใช้แสดง ${q.answer === 'were' ? 'สถานการณ์สมมติ' : 'คำแนะนำหรือความสำคัญ'}`,
      grammarPoint: 'Subjunctive Mood',
      difficulty: 'hard'
    });
  }
  
  return questions;
};

// Export ข้อสอบทั้งหมด
export const generateAllGrammarQuestions = (): GrammarQuestion[] => {
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
  const allQuestions = generateAllGrammarQuestions();
  console.log('\nSample questions:');
  allQuestions.slice(0, 5).forEach(q => {
    console.log(`\nQ${q.id}: ${q.question_en}`);
    console.log(`Sentence: ${q.sentence}`);
    console.log(`Options: ${q.options.join(', ')}`);
    console.log(`Answer: ${q.options[q.correctAnswer]}`);
    console.log(`Explanation: ${q.explanation_en}`);
  });
}
