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

export const quizQuestions: Question[] = [
  // วิชาความรู้ทั่วไป - General Knowledge
  {
    id: 1,
    category: 'generalKnowledge',
    difficulty: 'easy',
    question_th: 'ประเทศไทยมีกี่จังหวัด?',
    question_en: 'How many provinces does Thailand have?',
    options_th: ['75 จังหวัด', '76 จังหวัด', '77 จังหวัด', '78 จังหวัด'],
    options_en: ['75 provinces', '76 provinces', '77 provinces', '78 provinces'],
    correctAnswer: 2,
    explanation_th: 'ประเทศไทยมี 77 จังหวัด รวมถึงกรุงเทพมหานคร',
    explanation_en: 'Thailand has 77 provinces, including Bangkok.'
  },
  {
    id: 2,
    category: 'generalKnowledge',
    difficulty: 'medium',
    question_th: 'แม่น้ำที่ยาวที่สุดในประเทศไทยคือแม่น้ำอะไร?',
    question_en: 'What is the longest river in Thailand?',
    options_th: ['แม่น้ำเจ้าพระยา', 'แม่น้ำโขง', 'แม่น้ำท่าจีน', 'แม่น้ำบางปะกง'],
    options_en: ['Chao Phraya River', 'Mekong River', 'Tha Chin River', 'Bang Pakong River'],
    correctAnswer: 1,
    explanation_th: 'แม่น้ำโขงเป็นแม่น้ำที่ยาวที่สุดในประเทศไทย ไหลผ่านหลายจังหวัด',
    explanation_en: 'The Mekong River is the longest river flowing through Thailand.'
  },
  {
    id: 3,
    category: 'generalKnowledge',
    difficulty: 'hard',
    question_th: 'อุทยานแห่งชาติแห่งแรกของประเทศไทยคือที่ใด?',
    question_en: 'What is the first national park in Thailand?',
    options_th: ['อุทยานแห่งชาติเขาใหญ่', 'อุทยานแห่งชาติดอยอินทนนท์', 'อุทยานแห่งชาติแก่งกระจาน', 'อุทยานแห่งชาติห้วยขาแข้ง'],
    options_en: ['Khao Yai National Park', 'Doi Inthanon National Park', 'Kaeng Krachan National Park', 'Huai Kha Khaeng National Park'],
    correctAnswer: 0,
    explanation_th: 'อุทยานแห่งชาติเขาใหญ่เป็นอุทยานแห่งชาติแห่งแรกของประเทศไทย ประกาศเมื่อปี พ.ศ. 2505',
    explanation_en: 'Khao Yai National Park was the first national park in Thailand, established in 1962.'
  },

  // วิชาภาษาไทย - Thai Language
  {
    id: 4,
    category: 'thaiLanguage',
    difficulty: 'easy',
    question_th: 'คำใดเป็นคำราชาศัพท์?',
    question_en: 'Which word is a royal word?',
    options_th: ['กิน', 'ฉัน', 'เสวย', 'นอน'],
    options_en: ['Kin (eat)', 'Chan (I)', 'Sawoei (eat royal)', 'Non (sleep)'],
    correctAnswer: 2,
    explanation_th: '"เสวย" เป็นคำราชาศัพท์หมายถึง การกินของพระมหากษัตริย์',
    explanation_en: '"Sawoei" is a royal word meaning "to eat" used for the King.'
  },
  {
    id: 5,
    category: 'thaiLanguage',
    difficulty: 'medium',
    question_th: 'สำนวน "ขี่ช้างจับตั๊กแตน" หมายถึงอะไร?',
    question_en: 'What does the Thai idiom "Riding an elephant to catch a grasshopper" mean?',
    options_th: ['ทำงานใหญ่', 'ลงทุนมากเพื่อผลเล็กน้อย', 'เดินทางไกล', 'ต่อสู้กับศัตรู'],
    options_en: ['Doing big work', 'Investing too much for little return', 'Traveling far', 'Fighting enemies'],
    correctAnswer: 1,
    explanation_th: 'หมายถึง ลงทุนลงแรงมากเกินไปเพื่อผลลัพธ์เล็กน้อย',
    explanation_en: 'It means investing too much effort or resources for a small return.'
  },
  {
    id: 6,
    category: 'thaiLanguage',
    difficulty: 'hard',
    question_th: 'คำใดเขียนถูกต้อง?',
    question_en: 'Which word is spelled correctly?',
    options_th: ['โอกาส', 'โอกาศ', 'โอการ', 'โอกาษ'],
    options_en: ['Okat (opportunity)', 'Okas (incorrect)', 'Okarn (incorrect)', 'Okat (incorrect)'],
    correctAnswer: 0,
    explanation_th: '"โอกาส" เขียนด้วย ส.เสือ เป็นคำที่ถูกต้อง',
    explanation_en: '"โอกาส" (opportunity) is spelled with ส.เสือ (s).'
  },

  // วิชาคณิตศาสตร์ - Mathematics
  {
    id: 7,
    category: 'mathematics',
    difficulty: 'easy',
    question_th: '2 + 3 × 4 = ?',
    question_en: '2 + 3 × 4 = ?',
    options_th: ['20', '14', '12', '10'],
    options_en: ['20', '14', '12', '10'],
    correctAnswer: 1,
    explanation_th: 'ตามลำดับการคำนวณ: 3 × 4 = 12, แล้ว 2 + 12 = 14',
    explanation_en: 'Following order of operations: 3 × 4 = 12, then 2 + 12 = 14'
  },
  {
    id: 8,
    category: 'mathematics',
    difficulty: 'medium',
    question_th: 'ถ้า x + 5 = 12 แล้ว x มีค่าเท่าใด?',
    question_en: 'If x + 5 = 12, what is the value of x?',
    options_th: ['5', '6', '7', '8'],
    options_en: ['5', '6', '7', '8'],
    correctAnswer: 2,
    explanation_th: 'x = 12 - 5 = 7',
    explanation_en: 'x = 12 - 5 = 7'
  },
  {
    id: 9,
    category: 'mathematics',
    difficulty: 'hard',
    question_th: 'พื้นที่ของวงกลมที่มีรัศมี 7 ซม. เท่ากับเท่าใด? (π = 22/7)',
    question_en: 'What is the area of a circle with radius 7 cm? (π = 22/7)',
    options_th: ['154 ตร.ซม.', '144 ตร.ซม.', '134 ตร.ซม.', '124 ตร.ซม.'],
    options_en: ['154 sq.cm.', '144 sq.cm.', '134 sq.cm.', '124 sq.cm.'],
    correctAnswer: 0,
    explanation_th: 'พื้นที่ = πr² = (22/7) × 7² = 22 × 7 = 154 ตร.ซม.',
    explanation_en: 'Area = πr² = (22/7) × 7² = 22 × 7 = 154 sq.cm.'
  },

  // วิชาวิทยาศาสตร์ - Science
  {
    id: 10,
    category: 'science',
    difficulty: 'easy',
    question_th: 'พืชใช้กระบวนการใดในการสร้างอาหาร?',
    question_en: 'What process do plants use to make food?',
    options_th: ['การหายใจ', 'การสังเคราะห์ด้วยแสง', 'การสืบพันธุ์', 'การเจริญเติบโต'],
    options_en: ['Respiration', 'Photosynthesis', 'Reproduction', 'Growth'],
    correctAnswer: 1,
    explanation_th: 'พืชใช้กระบวนการสังเคราะห์ด้วยแสงในการสร้างอาหารจากแสงแดด',
    explanation_en: 'Plants use photosynthesis to make food from sunlight.'
  },
  {
    id: 11,
    category: 'science',
    difficulty: 'medium',
    question_th: 'ธาตุใดมีสัญลักษณ์ทางเคมีคือ O?',
    question_en: 'Which element has the chemical symbol O?',
    options_th: ['ทองคำ', 'ออกซิเจน', 'ออสเมียม', 'โอลิเวีน'],
    options_en: ['Gold', 'Oxygen', 'Osmium', 'Olivine'],
    correctAnswer: 1,
    explanation_th: 'O เป็นสัญลักษณ์ของออกซิเจน (Oxygen)',
    explanation_en: 'O is the symbol for Oxygen.'
  },
  {
    id: 12,
    category: 'science',
    difficulty: 'hard',
    question_th: 'DNA มีโครงสร้างเป็นอย่างไร?',
    question_en: 'What is the structure of DNA?',
    options_th: ['สายเดี่ยว', 'สายคู่พันเกลียว', 'วงกลม', 'เส้นตรง'],
    options_en: ['Single strand', 'Double helix', 'Circular', 'Linear'],
    correctAnswer: 1,
    explanation_th: 'DNA มีโครงสร้างเป็นสายคู่พันเกลียว (Double Helix)',
    explanation_en: 'DNA has a double helix structure.'
  },

  // วิชาสังคมศึกษา - Social Studies
  {
    id: 13,
    category: 'socialStudies',
    difficulty: 'easy',
    question_th: 'ประเทศไทยมีการปกครองระบอบอะไร?',
    question_en: 'What is the form of government in Thailand?',
    options_th: ['สาธารณรัฐ', 'ประชาธิปไตยอันมีพระมหากษัตริย์ทรงเป็นประมุข', 'คอมมิวนิสต์', 'สมบูรณาญาสิทธิราช'],
    options_en: ['Republic', 'Democratic Constitutional Monarchy', 'Communist', 'Absolute Monarchy'],
    correctAnswer: 1,
    explanation_th: 'ประเทศไทยปกครองด้วยระบอบประชาธิปไตยอันมีพระมหากษัตริย์ทรงเป็นประมุข',
    explanation_en: 'Thailand is governed by a Democratic Constitutional Monarchy.'
  },
  {
    id: 14,
    category: 'socialStudies',
    difficulty: 'medium',
    question_th: 'อาเซียน (ASEAN) มีกี่ประเทศสมาชิก?',
    question_en: 'How many member countries does ASEAN have?',
    options_th: ['8 ประเทศ', '9 ประเทศ', '10 ประเทศ', '11 ประเทศ'],
    options_en: ['8 countries', '9 countries', '10 countries', '11 countries'],
    correctAnswer: 2,
    explanation_th: 'อาเซียนมี 10 ประเทศสมาชิก',
    explanation_en: 'ASEAN has 10 member countries.'
  },
  {
    id: 15,
    category: 'socialStudies',
    difficulty: 'hard',
    question_th: 'รัฐธรรมนูญแห่งราชอาณาจักรไทยฉบับปัจจุบันเป็นฉบับที่เท่าใด?',
    question_en: 'Which number constitution is the current Constitution of Thailand?',
    options_th: ['ฉบับที่ 18', 'ฉบับที่ 19', 'ฉบับที่ 20', 'ฉบับที่ 21'],
    options_en: ['18th', '19th', '20th', '21st'],
    correctAnswer: 2,
    explanation_th: 'รัฐธรรมนูญแห่งราชอาณาจักรไทย พ.ศ. 2560 เป็นฉบับที่ 20',
    explanation_en: 'The Constitution of Thailand B.E. 2560 (2017) is the 20th constitution.'
  },

  // วิชาภาษาอังกฤษ - English
  {
    id: 16,
    category: 'english',
    difficulty: 'easy',
    question_th: 'คำใดหมายถึง "หนังสือ"?',
    question_en: 'Which word means "book"?',
    options_th: ['Pen', 'Book', 'Table', 'Chair'],
    options_en: ['Pen', 'Book', 'Table', 'Chair'],
    correctAnswer: 1,
    explanation_th: '"Book" หมายถึง หนังสือ',
    explanation_en: '"Book" means หนังสือ (book).'
  },
  {
    id: 17,
    category: 'english',
    difficulty: 'medium',
    question_th: 'Past tense ของ "go" คืออะไร?',
    question_en: 'What is the past tense of "go"?',
    options_th: ['goed', 'gone', 'went', 'going'],
    options_en: ['goed', 'gone', 'went', 'going'],
    correctAnswer: 2,
    explanation_th: 'Past tense ของ "go" คือ "went"',
    explanation_en: 'The past tense of "go" is "went".'
  },
  {
    id: 18,
    category: 'english',
    difficulty: 'hard',
    question_th: 'ข้อใดเป็นประโยคที่ถูกต้อง?',
    question_en: 'Which sentence is correct?',
    options_th: ['She don\'t like apples.', 'She doesn\'t likes apples.', 'She doesn\'t like apples.', 'She not like apples.'],
    options_en: ['She don\'t like apples.', 'She doesn\'t likes apples.', 'She doesn\'t like apples.', 'She not like apples.'],
    correctAnswer: 2,
    explanation_th: 'ประธานเอกพจน์ใช้ "doesn\'t" + กริยาช่อง 1',
    explanation_en: 'Third person singular uses "doesn\'t" + base verb form.'
  }
];

export const getQuestionsByCategory = (category: string): Question[] => {
  return quizQuestions.filter(q => q.category === category);
};

export const getQuestionsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): Question[] => {
  return quizQuestions.filter(q => q.difficulty === difficulty);
};

export const getRandomQuestions = (count: number): Question[] => {
  const shuffled = [...quizQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
