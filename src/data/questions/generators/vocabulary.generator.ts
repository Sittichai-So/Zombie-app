// Generator สำหรับสร้างข้อสอบภาษาอังกฤษ - คำศัพท์ (Vocabulary)
// เป้าหมาย: 300 ข้อ

import { VocabularyQuestion } from '../vocabulary';

export type { VocabularyQuestion };

let questionId = 8000;

const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const vocabularyData = {
  synonyms: [
    { word: 'Happy', answer: 'Joyful', options: ['Sad', 'Joyful', 'Angry', 'Tired'] },
    { word: 'Big', answer: 'Large', options: ['Small', 'Large', 'Tiny', 'Short'] },
    { word: 'Fast', answer: 'Quick', options: ['Slow', 'Quick', 'Lazy', 'Weak'] },
    { word: 'Smart', answer: 'Intelligent', options: ['Stupid', 'Intelligent', 'Dumb', 'Foolish'] },
    { word: 'Beautiful', answer: 'Pretty', options: ['Ugly', 'Pretty', 'Plain', 'Simple'] },
    { word: 'Difficult', answer: 'Hard', options: ['Easy', 'Hard', 'Simple', 'Light'] },
    { word: 'Begin', answer: 'Start', options: ['End', 'Start', 'Finish', 'Stop'] },
    { word: 'Choose', answer: 'Select', options: ['Reject', 'Select', 'Drop', 'Leave'] },
  ],
  
  antonyms: [
    { word: 'Hot', answer: 'Cold', options: ['Warm', 'Cold', 'Heat', 'Fire'] },
    { word: 'Up', answer: 'Down', options: ['High', 'Down', 'Above', 'Over'] },
    { word: 'Good', answer: 'Bad', options: ['Nice', 'Bad', 'Great', 'Fine'] },
    { word: 'Love', answer: 'Hate', options: ['Like', 'Hate', 'Adore', 'Enjoy'] },
    { word: 'Rich', answer: 'Poor', options: ['Wealthy', 'Poor', 'Money', 'Gold'] },
    { word: 'Strong', answer: 'Weak', options: ['Powerful', 'Weak', 'Mighty', 'Firm'] },
    { word: 'Young', answer: 'Old', options: ['New', 'Old', 'Fresh', 'Recent'] },
    { word: 'Light', answer: 'Heavy', options: ['Bright', 'Heavy', 'Soft', 'Gentle'] },
  ],
  
  definitions: [
    { word: 'Doctor', definition: 'A person who treats sick people', options: ['Teacher', 'Doctor', 'Engineer', 'Chef'] },
    { word: 'Library', definition: 'A place where books are kept', options: ['School', 'Library', 'Bookstore', 'Office'] },
    { word: 'Airport', definition: 'A place where planes take off and land', options: ['Station', 'Airport', 'Port', 'Garage'] },
    { word: 'Restaurant', definition: 'A place where you buy and eat food', options: ['Shop', 'Restaurant', 'Hotel', 'Cafe'] },
  ],
  
  wordFamilies: [
    { root: 'Beauty', word: 'Beautiful', options: ['Beauty', 'Beautiful', 'Beautifully', 'Beautify'] },
    { root: 'Care', word: 'Careful', options: ['Care', 'Careful', 'Carefully', 'Careless'] },
    { root: 'Success', word: 'Successful', options: ['Success', 'Successful', 'Successfully', 'Succeed'] },
  ],
};

// Easy Questions: พื้นฐาน
const generateEasyQuestions = (): VocabularyQuestion[] => {
  const questions: VocabularyQuestion[] = [];
  
  // 1. Synonyms - คำเหมือน (40 ข้อ)
  for (let i = 0; i < 40; i++) {
    const item = vocabularyData.synonyms[i % vocabularyData.synonyms.length];
    const shuffled = [...item.options].sort(() => Math.random() - 0.5);
    
    questions.push({
      id: questionId++,
      category: 'vocabulary',
      questionType: 'synonym',
      word: item.word,
      question_th: `คำพ้องความหมายของ "${item.word}" คือคำใด?`,
      question_en: `What is the synonym of "${item.word}"?`,
      options_th: shuffled,
      options_en: shuffled,
      correctAnswer: shuffled.indexOf(item.answer),
      explanation_th: `"${item.answer}" มีความหมายเหมือนกับ "${item.word}"`,
      explanation_en: `"${item.answer}" has the same meaning as "${item.word}"`,
      difficulty: 'easy'
    });
  }
  
  // 2. Antonyms - คำตรงข้าม (40 ข้อ)
  for (let i = 0; i < 40; i++) {
    const item = vocabularyData.antonyms[i % vocabularyData.antonyms.length];
    const shuffled = [...item.options].sort(() => Math.random() - 0.5);
    
    questions.push({
      id: questionId++,
      category: 'vocabulary',
      questionType: 'antonym',
      word: item.word,
      question_th: `คำตรงข้ามของ "${item.word}" คือคำใด?`,
      question_en: `What is the antonym of "${item.word}"?`,
      options_th: shuffled,
      options_en: shuffled,
      correctAnswer: shuffled.indexOf(item.answer),
      explanation_th: `"${item.answer}" มีความหมายตรงข้ามกับ "${item.word}"`,
      explanation_en: `"${item.answer}" has the opposite meaning of "${item.word}"`,
      difficulty: 'easy'
    });
  }
  
  // 3. Definitions - นิยาม (20 ข้อ)
  for (let i = 0; i < 20; i++) {
    const item = vocabularyData.definitions[i % vocabularyData.definitions.length];
    const shuffled = [...item.options].sort(() => Math.random() - 0.5);
    
    questions.push({
      id: questionId++,
      category: 'vocabulary',
      questionType: 'definition',
      word: item.word,
      question_th: `"${item.definition}" คืออะไร?`,
      question_en: `What is "${item.definition}"?`,
      options_th: shuffled,
      options_en: shuffled,
      correctAnswer: shuffled.indexOf(item.word),
      explanation_th: `"${item.word}" คือ ${item.definition}`,
      explanation_en: `"${item.word}" is ${item.definition}`,
      difficulty: 'easy'
    });
  }
  
  return questions;
};

const generateMediumQuestions = (): VocabularyQuestion[] => {
  const questions: VocabularyQuestion[] = [];
  
  const contextSentences = [
    { sentence: 'The weather is very _____ today. The sun is shining and there are no clouds.', answer: 'sunny', options: ['sunny', 'rainy', 'cloudy', 'stormy'] },
    { sentence: 'She is very _____. She always helps people.', answer: 'kind', options: ['kind', 'mean', 'cruel', 'selfish'] },
    { sentence: 'The exam was very _____. Many students failed.', answer: 'difficult', options: ['easy', 'difficult', 'simple', 'light'] },
    { sentence: 'He _____ to school every day by bus.', answer: 'travels', options: ['travels', 'walks', 'runs', 'flies'] },
  ];
  
  for (let i = 0; i < 50; i++) {
    const item = contextSentences[i % contextSentences.length];
    const shuffled = [...item.options].sort(() => Math.random() - 0.5);
    
    questions.push({
      id: questionId++,
      category: 'vocabulary',
      questionType: 'fillInBlank',
      word: '',
      question_th: `เติมคำในช่องว่าง: ${item.sentence}`,
      question_en: `Fill in the blank: ${item.sentence}`,
      options_th: shuffled,
      options_en: shuffled,
      correctAnswer: shuffled.indexOf(item.answer),
      explanation_th: `จากบริบท "${item.sentence}" คำที่เหมาะสมคือ "${item.answer}"`,
      explanation_en: `From context "${item.sentence}", the appropriate word is "${item.answer}"`,
      difficulty: 'medium'
    });
  }
  
  // 2. Word Families - ตระกูลคำ (30 ข้อ)
  for (let i = 0; i < 30; i++) {
    const item = vocabularyData.wordFamilies[i % vocabularyData.wordFamilies.length];
    const shuffled = [...item.options].sort(() => Math.random() - 0.5);
    
    questions.push({
      id: questionId++,
      category: 'vocabulary',
      questionType: 'fillInBlank',
      word: item.root,
      question_th: `รูป adjective ของ "${item.root}" คืออะไร?`,
      question_en: `What is the adjective form of "${item.root}"?`,
      options_th: shuffled,
      options_en: shuffled,
      correctAnswer: shuffled.indexOf(item.word),
      explanation_th: `"${item.word}" เป็นรูป adjective ของ "${item.root}"`,
      explanation_en: `"${item.word}" is the adjective form of "${item.root}"`,
      difficulty: 'medium'
    });
  }
  
  // 3. Idioms - สำนวน (20 ข้อ)
  const idioms = [
    { idiom: 'Break a leg', meaning: 'Good luck', options: ['Good luck', 'Bad luck', 'Get hurt', 'Dance'] },
    { idiom: 'Piece of cake', meaning: 'Very easy', options: ['Very hard', 'Very easy', 'Delicious', 'Sweet'] },
    { idiom: 'Under the weather', meaning: 'Sick', options: ['Happy', 'Sick', 'Rainy', 'Cold'] },
    { idiom: 'Cost an arm and a leg', meaning: 'Very expensive', options: ['Cheap', 'Very expensive', 'Free', 'Discount'] },
  ];
  
  for (let i = 0; i < 20; i++) {
    const item = idioms[i % idioms.length];
    const shuffled = [...item.options].sort(() => Math.random() - 0.5);
    
    questions.push({
      id: questionId++,
      category: 'vocabulary',
      questionType: 'definition',
      word: item.idiom,
      question_th: `สำนวน "${item.idiom}" หมายถึงอะไร?`,
      question_en: `What does the idiom "${item.idiom}" mean?`,
      options_th: shuffled,
      options_en: shuffled,
      correctAnswer: shuffled.indexOf(item.meaning),
      explanation_th: `"${item.idiom}" หมายถึง "${item.meaning}"`,
      explanation_en: `"${item.idiom}" means "${item.meaning}"`,
      difficulty: 'medium'
    });
  }
  
  return questions;
};

// Hard Questions: ยาก
const generateHardQuestions = (): VocabularyQuestion[] => {
  const questions: VocabularyQuestion[] = [];
  
  // 1. Academic Vocabulary - คำศัพท์วิชาการ (40 ข้อ)
  const academicWords = [
    { word: 'Analyze', meaning: 'To examine in detail', options: ['To examine in detail', 'To ignore', 'To forget', 'To destroy'] },
    { word: 'Conclude', meaning: 'To bring to an end', options: ['To start', 'To bring to an end', 'To continue', 'To delay'] },
    { word: 'Evaluate', meaning: 'To assess or judge', options: ['To create', 'To assess or judge', 'To destroy', 'To hide'] },
    { word: 'Demonstrate', meaning: 'To show clearly', options: ['To hide', 'To show clearly', 'To confuse', 'To forget'] },
  ];
  
  for (let i = 0; i < 40; i++) {
    const item = academicWords[i % academicWords.length];
    const shuffled = [...item.options].sort(() => Math.random() - 0.5);
    
    questions.push({
      id: questionId++,
      category: 'vocabulary',
      questionType: 'definition',
      word: item.word,
      question_th: `"${item.word}" หมายถึงอะไร?`,
      question_en: `What is the meaning of "${item.word}"?`,
      options_th: shuffled,
      options_en: shuffled,
      correctAnswer: shuffled.indexOf(item.meaning),
      explanation_th: `"${item.word}" หมายถึง "${item.meaning}"`,
      explanation_en: `"${item.word}" means "${item.meaning}"`,
      difficulty: 'hard'
    });
  }
  
  // 2. Advanced Synonyms - คำเหมือนขั้นสูง (30 ข้อ)
  const advancedSynonyms = [
    { word: 'Enormous', answer: 'Gigantic', options: ['Tiny', 'Gigantic', 'Small', 'Miniature'] },
    { word: 'Exquisite', answer: 'Elegant', options: ['Ugly', 'Elegant', 'Plain', 'Rough'] },
    { word: 'Meticulous', answer: 'Careful', options: ['Careless', 'Careful', 'Rough', 'Hasty'] },
    { word: 'Benevolent', answer: 'Kind', options: ['Cruel', 'Kind', 'Mean', 'Harsh'] },
  ];
  
  for (let i = 0; i < 30; i++) {
    const item = advancedSynonyms[i % advancedSynonyms.length];
    const shuffled = [...item.options].sort(() => Math.random() - 0.5);
    
    questions.push({
      id: questionId++,
      category: 'vocabulary',
      questionType: 'synonym',
      word: item.word,
      question_th: `คำพ้องความหมายของ "${item.word}" คือคำใด?`,
      question_en: `What is the synonym of "${item.word}"?`,
      options_th: shuffled,
      options_en: shuffled,
      correctAnswer: shuffled.indexOf(item.answer),
      explanation_th: `"${item.answer}" เป็นคำพ้องความหมายขั้นสูงของ "${item.word}"`,
      explanation_en: `"${item.answer}" is an advanced synonym of "${item.word}"`,
      difficulty: 'hard'
    });
  }
  
  // 3. Phrasal Verbs - กริยาวลี (30 ข้อ)
  const phrasalVerbs = [
    { verb: 'Give up', meaning: 'To quit', options: ['To start', 'To quit', 'To continue', 'To begin'] },
    { verb: 'Look after', meaning: 'To take care of', options: ['To ignore', 'To take care of', 'To harm', 'To forget'] },
    { verb: 'Run out of', meaning: 'To have none left', options: ['To have plenty', 'To have none left', 'To buy', 'To sell'] },
    { verb: 'Get along with', meaning: 'To have a good relationship', options: ['To fight with', 'To have a good relationship', 'To ignore', 'To hate'] },
  ];
  
  for (let i = 0; i < 30; i++) {
    const item = phrasalVerbs[i % phrasalVerbs.length];
    const shuffled = [...item.options].sort(() => Math.random() - 0.5);
    
    questions.push({
      id: questionId++,
      category: 'vocabulary',
      questionType: 'definition',
      word: item.verb,
      question_th: `กริยาวลี "${item.verb}" หมายถึงอะไร?`,
      question_en: `What does the phrasal verb "${item.verb}" mean?`,
      options_th: shuffled,
      options_en: shuffled,
      correctAnswer: shuffled.indexOf(item.meaning),
      explanation_th: `"${item.verb}" หมายถึง "${item.meaning}"`,
      explanation_en: `"${item.verb}" means "${item.meaning}"`,
      difficulty: 'hard'
    });
  }
  
  return questions;
};

// Export ข้อสอบทั้งหมด
export const generateAllVocabularyQuestions = (): VocabularyQuestion[] => {
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
//   const allQuestions = generateAllVocabularyQuestions();
//   console.log('\nSample questions:');
//   allQuestions.slice(0, 5).forEach(q => {
//     console.log(`\nQ${q.id}: ${q.question_en}`);
//     console.log(`Type: ${q.questionType}`);
//     console.log(`Word: ${q.word}`);
//     console.log(`Options: ${q.options_en.join(', ')}`);
//     console.log(`Answer: ${q.options_en[q.correctAnswer]}`);
//     console.log(`Explanation: ${q.explanation_en}`);
//   });
// }
