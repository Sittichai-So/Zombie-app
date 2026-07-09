// ข้อสอบการอ่านภาษาอังกฤษ (Reading Comprehension)
export interface ReadingQuestion {
  id: number;
  passage: string;
  questions: ReadingPassageQuestion[];
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
}

export interface ReadingPassageQuestion {
  questionId: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const readingPassages: ReadingQuestion[] = [
  {
    id: 1,
    passage: `My name is Sarah. I am 25 years old and I work as a teacher at a primary school. 
I wake up at 6:00 AM every day. I have breakfast with my family, then I go to work by bus. 
I teach English and Mathematics to Grade 3 students. I love my job because I enjoy working 
with children. After school, I often go to the gym or meet friends for coffee.`,
    questions: [
      {
        questionId: 1,
        question: 'What is Sarah\'s job?',
        options: ['Doctor', 'Teacher', 'Nurse', 'Engineer'],
        correctAnswer: 1,
        explanation: 'Sarah works as a teacher at a primary school.'
      },
      {
        questionId: 2,
        question: 'What time does Sarah wake up?',
        options: ['5:00 AM', '6:00 AM', '7:00 AM', '8:00 AM'],
        correctAnswer: 1,
        explanation: 'Sarah wakes up at 6:00 AM every day.'
      },
      {
        questionId: 3,
        question: 'How does Sarah go to work?',
        options: ['By car', 'By motorcycle', 'By bus', 'On foot'],
        correctAnswer: 2,
        explanation: 'Sarah goes to work by bus.'
      },
      {
        questionId: 4,
        question: 'What subjects does Sarah teach?',
        options: ['Science and Math', 'English and Science', 'English and Mathematics', 'History and English'],
        correctAnswer: 2,
        explanation: 'Sarah teaches English and Mathematics to Grade 3 students.'
      }
    ],
    difficulty: 'easy',
    topic: 'Daily Life'
  },
  {
    id: 2,
    passage: `Climate change is one of the most pressing issues of our time. Global temperatures 
are rising due to the increase in greenhouse gases in the atmosphere. This leads to melting 
ice caps, rising sea levels, and more extreme weather events. Scientists warn that we must 
take action now to reduce carbon emissions and protect our planet for future generations.`,
    questions: [
      {
        questionId: 1,
        question: 'What is the main cause of climate change according to the passage?',
        options: ['Deforestation', 'Greenhouse gases', 'Ocean pollution', 'Overpopulation'],
        correctAnswer: 1,
        explanation: 'The passage states that global temperatures are rising due to greenhouse gases.'
      },
      {
        questionId: 2,
        question: 'What is NOT mentioned as a consequence of climate change?',
        options: ['Melting ice caps', 'Rising sea levels', 'Extreme weather', 'Air pollution'],
        correctAnswer: 3,
        explanation: 'Air pollution is not mentioned in the passage.'
      },
      {
        questionId: 3,
        question: 'What do scientists recommend?',
        options: ['Ignore the problem', 'Reduce carbon emissions', 'Build more factories', 'Use more fossil fuels'],
        correctAnswer: 1,
        explanation: 'Scientists warn that we must reduce carbon emissions.'
      }
    ],
    difficulty: 'medium',
    topic: 'Environment'
  },
  {
    id: 3,
    passage: `The Industrial Revolution began in Britain in the late 18th century. It marked a 
major turning point in history as almost every aspect of daily life was influenced in some way. 
The introduction of steam power and the development of factory systems transformed manufacturing. 
This led to urbanization as people moved from rural areas to cities in search of work. While 
the Industrial Revolution brought economic growth, it also created poor working conditions and 
social problems that would take decades to address.`,
    questions: [
      {
        questionId: 1,
        question: 'When did the Industrial Revolution begin?',
        options: ['17th century', 'Late 18th century', '19th century', '20th century'],
        correctAnswer: 1,
        explanation: 'The Industrial Revolution began in Britain in the late 18th century.'
      },
      {
        questionId: 2,
        question: 'What was a major technological advancement during this period?',
        options: ['Electricity', 'Steam power', 'Internet', 'Computers'],
        correctAnswer: 1,
        explanation: 'The introduction of steam power was a major advancement.'
      },
      {
        questionId: 3,
        question: 'What social change occurred due to industrialization?',
        options: ['People moved to cities', 'People moved to countryside', 'Population decreased', 'Farming increased'],
        correctAnswer: 0,
        explanation: 'Urbanization occurred as people moved from rural areas to cities.'
      },
      {
        questionId: 4,
        question: 'What was a negative consequence of the Industrial Revolution?',
        options: ['Economic decline', 'Poor working conditions', 'Less production', 'Fewer jobs'],
        correctAnswer: 1,
        explanation: 'The Industrial Revolution created poor working conditions and social problems.'
      }
    ],
    difficulty: 'hard',
    topic: 'History'
  }
];

export const getReadingPassages = () => readingPassages;

export const getReadingPassageById = (id: number) => {
  return readingPassages.find(p => p.id === id);
};

export const getReadingPassagesByTopic = (topic: string) => {
  return readingPassages.filter(p => p.topic === topic);
};

export const getReadingPassagesByDifficulty = (difficulty: string) => {
  return readingPassages.filter(p => p.difficulty === difficulty);
};
