// ข้อสอบรัฐธรรมนูญและกฎหมาย (Constitution & Law)
export interface ConstitutionQuestion {
  id: number;
  question_th: string;
  question_en: string;
  options_th: string[];
  options_en: string[];
  correctAnswer: number;
  explanation_th: string;
  explanation_en: string;
  category: 'constitution' | 'law' | 'rights' | 'duties';
  difficulty: 'easy' | 'medium' | 'hard';
}

export const constitutionQuestions: ConstitutionQuestion[] = [
  {
    id: 1,
    question_th: 'รัฐธรรมนูญแห่งราชอาณาจักรไทยฉบับปัจจุบันเป็นฉบับที่เท่าใด?',
    question_en: 'Which number constitution is the current Constitution of Thailand?',
    options_th: ['ฉบับที่ 18', 'ฉบับที่ 19', 'ฉบับที่ 20', 'ฉบับที่ 21'],
    options_en: ['18th', '19th', '20th', '21st'],
    correctAnswer: 2,
    explanation_th: 'รัฐธรรมนูญแห่งราชอาณาจักรไทย พ.ศ. 2560 เป็นฉบับที่ 20',
    explanation_en: 'The Constitution of Thailand B.E. 2560 (2017) is the 20th constitution.',
    category: 'constitution',
    difficulty: 'medium'
  },
  {
    id: 2,
    question_th: 'ประเทศไทยมีการปกครองระบอบอะไร?',
    question_en: 'What is the form of government in Thailand?',
    options_th: ['สาธารณรัฐ', 'ประชาธิปไตยอันมีพระมหากษัตริย์ทรงเป็นประมุข', 'คอมมิวนิสต์', 'สมบูรณาญาสิทธิราช'],
    options_en: ['Republic', 'Democratic Constitutional Monarchy', 'Communist', 'Absolute Monarchy'],
    correctAnswer: 1,
    explanation_th: 'ประเทศไทยปกครองด้วยระบอบประชาธิปไตยอันมีพระมหากษัตริย์ทรงเป็นประมุข',
    explanation_en: 'Thailand is governed by a Democratic Constitutional Monarchy.',
    category: 'constitution',
    difficulty: 'easy'
  },
  {
    id: 3,
    question_th: 'อำนาจสูงสุดในการปกครองประเทศเป็นของใคร?',
    question_en: 'Who holds the supreme power in the country?',
    options_th: ['พระมหากษัตริย์', 'นายกรัฐมนตรี', 'รัฐสภา', 'ประชาชน'],
    options_en: ['The King', 'Prime Minister', 'Parliament', 'The People'],
    correctAnswer: 3,
    explanation_th: 'รัฐธรรมนูญกำหนดว่าอำนาจสูงสุดเป็นของประชาชน',
    explanation_en: 'The Constitution states that supreme power belongs to the people.',
    category: 'constitution',
    difficulty: 'medium'
  },
  {
    id: 4,
    question_th: 'สิทธิขั้นพื้นฐานใดที่รัฐธรรมนูญรับรอง?',
    question_en: 'Which fundamental right is guaranteed by the Constitution?',
    options_th: ['สิทธิในการศึกษา', 'สิทธิในการรักษาพยาบาล', 'สิทธิในการแสดงออก', 'ถูกทุกข้อ'],
    options_en: ['Right to education', 'Right to healthcare', 'Right to expression', 'All of the above'],
    correctAnswer: 3,
    explanation_th: 'รัฐธรรมนูญรับรองสิทธิขั้นพื้นฐานหลายประการ รวมถึงการศึกษา รักษาพยาบาล และการแสดงออก',
    explanation_en: 'The Constitution guarantees multiple fundamental rights including education, healthcare, and expression.',
    category: 'rights',
    difficulty: 'easy'
  },
  {
    id: 5,
    question_th: 'ใครมีหน้าที่ไปใช้สิทธิเลือกตั้ง?',
    question_en: 'Who has the duty to vote in elections?',
    options_th: ['เฉพาะผู้ชาย', 'เฉพาะผู้หญิง', 'พลเมืองทุกคน', 'เฉพาะผู้ที่มีอายุเกิน 30 ปี'],
    options_en: ['Only men', 'Only women', 'All citizens', 'Only those over 30'],
    correctAnswer: 2,
    explanation_th: 'พลเมืองไทยทุกคนที่มีอายุครบ 18 ปีมีสิทธิและหน้าที่ไปใช้สิทธิเลือกตั้ง',
    explanation_en: 'All Thai citizens aged 18 and above have the right and duty to vote.',
    category: 'duties',
    difficulty: 'easy'
  }
];

export const getConstitutionQuestions = () => constitutionQuestions;

export const getConstitutionQuestionById = (id: number) => {
  return constitutionQuestions.find(q => q.id === id);
};

export const getConstitutionQuestionsByCategory = (category: string) => {
  return constitutionQuestions.filter(q => q.category === category);
};
