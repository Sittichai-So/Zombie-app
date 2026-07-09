// ข้อสอบบทสนทนาภาษาอังกฤษ (Conversation)
export interface ConversationQuestion {
  id: number;
  situation: string;
  conversation: string[];
  blankIndex: number;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const conversationQuestions: ConversationQuestion[] = [
  {
    id: 1,
    situation: 'At a restaurant',
    conversation: [
      'Waiter: Good evening. ___?',
      'Customer: Yes, I\'d like to order a steak, please.',
      'Waiter: How would you like your steak cooked?',
      'Customer: Medium rare, please.'
    ],
    blankIndex: 0,
    options: [
      'Are you hungry',
      'May I take your order',
      'Do you want food',
      'What do you eat'
    ],
    correctAnswer: 1,
    explanation: '"May I take your order?" เป็นประโยคมาตรฐานที่พนักงานเสิร์ฟใช้',
    difficulty: 'easy'
  },
  {
    id: 2,
    situation: 'At a shop',
    conversation: [
      'Customer: Excuse me, ___?',
      'Shop assistant: Yes, the fitting room is over there.',
      'Customer: Thank you.',
      'Shop assistant: You\'re welcome.'
    ],
    blankIndex: 0,
    options: [
      'where is the toilet',
      'can I try this on',
      'how much is this',
      'do you have this in blue'
    ],
    correctAnswer: 1,
    explanation: '"Can I try this on?" ใช้ถามว่าสามารถลองเสื้อผ้าได้หรือไม่',
    difficulty: 'easy'
  },
  {
    id: 3,
    situation: 'Making an appointment',
    conversation: [
      'Receptionist: Good morning, Doctor\'s office.',
      'Patient: Hello, I\'d like to make an appointment.',
      'Receptionist: ___?',
      'Patient: Tomorrow afternoon would be great.'
    ],
    blankIndex: 2,
    options: [
      'What time do you want',
      'When would be convenient for you',
      'Are you free tomorrow',
      'Do you want to come'
    ],
    correctAnswer: 1,
    explanation: '"When would be convenient for you?" เป็นประโยคสุภาพในการถามเวลาที่สะดวก',
    difficulty: 'medium'
  },
  {
    id: 4,
    situation: 'Asking for directions',
    conversation: [
      'Tourist: Excuse me, could you tell me ___?',
      'Local: Sure, go straight for two blocks, then turn left.',
      'Tourist: Thank you very much.',
      'Local: No problem.'
    ],
    blankIndex: 0,
    options: [
      'where is the station',
      'how to get to the train station',
      'the station is where',
      'can you show me the station'
    ],
    correctAnswer: 1,
    explanation: '"Could you tell me how to get to..." เป็นประโยคสุภาพในการถามทาง',
    difficulty: 'medium'
  },
  {
    id: 5,
    situation: 'At a hotel',
    conversation: [
      'Guest: Hi, I have a reservation under the name Smith.',
      'Receptionist: Let me check. ___?',
      'Guest: Yes, that\'s correct. For three nights.',
      'Receptionist: Great. Here\'s your key card.'
    ],
    blankIndex: 1,
    options: [
      'Do you have a booking',
      'Is it for a double room for three nights',
      'Are you Mr. Smith',
      'How long will you stay'
    ],
    correctAnswer: 1,
    explanation: 'พนักงานต้อนรับยืนยันข้อมูลการจอง',
    difficulty: 'hard'
  }
];

export const getConversationQuestions = () => conversationQuestions;

export const getConversationQuestionById = (id: number) => {
  return conversationQuestions.find(q => q.id === id);
};
