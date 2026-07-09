// ข้อสอบการบริการสาธารณะ (Public Service)
export interface PublicServiceQuestion {
  id: number;
  question_th: string;
  question_en: string;
  options_th: string[];
  options_en: string[];
  correctAnswer: number;
  explanation_th: string;
  explanation_en: string;
  serviceArea: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const publicServiceQuestions: PublicServiceQuestion[] = [
  {
    id: 1,
    question_th: 'ข้อใดคือความหมายของ "การบริการสาธารณะ"?',
    question_en: 'What is the meaning of "Public Service"?',
    options_th: ['การให้บริการของภาคเอกชน', 'การให้บริการของรัฐบาลเพื่อประชาชน', 'การให้บริการเฉพาะคนรวย', 'การให้บริการเฉพาะในเมือง'],
    options_en: ['Private sector services', 'Government services for citizens', 'Services only for the rich', 'Services only in cities'],
    correctAnswer: 1,
    explanation_th: 'การบริการสาธารณะ คือ การให้บริการของรัฐบาลเพื่อประโยชน์ของประชาชน',
    explanation_en: 'Public Service refers to government services for the benefit of citizens.',
    serviceArea: 'definition',
    difficulty: 'easy'
  },
  {
    id: 2,
    question_th: 'ข้อใดไม่ใช่หลักการให้บริการที่ดี?',
    question_en: 'Which is NOT a principle of good service?',
    options_th: ['ความรวดเร็ว', 'ความเท่าเทียม', 'ความลำเอียง', 'ความโปร่งใส'],
    options_en: ['Speed', 'Equality', 'Bias', 'Transparency'],
    correctAnswer: 2,
    explanation_th: 'ความลำเอียงขัดกับหลักการให้บริการที่ดี',
    explanation_en: 'Bias contradicts the principles of good service.',
    serviceArea: 'service_principles',
    difficulty: 'easy'
  },
  {
    id: 3,
    question_th: 'ศูนย์บริการร่วมภาครัฐ (Government One Stop Service) มีวัตถุประสงค์เพื่ออะไร?',
    question_en: 'What is the purpose of Government One Stop Service?',
    options_th: ['ให้บริการหลายอย่างในที่เดียว', 'ลดจำนวนข้าราชการ', 'เพิ่มรายได้ของรัฐ', 'จำกัดการเข้าถึงบริการ'],
    options_en: ['Provide multiple services in one place', 'Reduce number of civil servants', 'Increase government revenue', 'Limit access to services'],
    correctAnswer: 0,
    explanation_th: 'One Stop Service ให้บริการหลายอย่างในที่เดียวเพื่อความสะดวกของประชาชน',
    explanation_en: 'One Stop Service provides multiple services in one place for citizen convenience.',
    serviceArea: 'one_stop_service',
    difficulty: 'medium'
  },
  {
    id: 4,
    question_th: 'ข้อใดคือช่องทางร้องเรียนการให้บริการของรัฐ?',
    question_en: 'Which is a channel for complaining about government services?',
    options_th: ['1111', '191', '1669', '1234'],
    options_en: ['1111', '191', '1669', '1234'],
    correctAnswer: 0,
    explanation_th: 'สายด่วน 1111 เป็นศูนย์รับเรื่องร้องเรียนของรัฐบาล',
    explanation_en: 'Hotline 1111 is the government complaint center.',
    serviceArea: 'complaint_channels',
    difficulty: 'medium'
  },
  {
    id: 5,
    question_th: 'Digital Government หมายถึงอะไร?',
    question_en: 'What does Digital Government mean?',
    options_th: ['การใช้เทคโนโลยีดิจิทัลในการให้บริการ', 'การขายของออนไลน์', 'การเล่นเกมออนไลน์', 'การใช้โซเชียลมีเดีย'],
    options_en: ['Using digital technology for services', 'Online selling', 'Online gaming', 'Using social media'],
    correctAnswer: 0,
    explanation_th: 'Digital Government คือการใช้เทคโนโลยีดิจิทัลเพื่อเพิ่มประสิทธิภาพการให้บริการของรัฐ',
    explanation_en: 'Digital Government is using digital technology to improve government service efficiency.',
    serviceArea: 'digital_government',
    difficulty: 'easy'
  }
];

export const getPublicServiceQuestions = () => publicServiceQuestions;

export const getPublicServiceQuestionById = (id: number) => {
  return publicServiceQuestions.find(q => q.id === id);
};

export const getPublicServiceQuestionsByArea = (area: string) => {
  return publicServiceQuestions.filter(q => q.serviceArea === area);
};
