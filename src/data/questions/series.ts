// ข้อสอบอนุกรมตัวเลขและตรรกะ
export interface SeriesQuestion {
  id: number;
  question: string;
  series: (number | string)[];
  options: number[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const seriesQuestions: SeriesQuestion[] = [
  {
    id: 1,
    question: 'จงหาตัวเลขถัดไป',
    series: [2, 4, 6, 8, '?'],
    options: [9, 10, 11, 12],
    correctAnswer: 1,
    explanation: 'อนุกรมเพิ่มขึ้นทีละ 2: 2, 4, 6, 8, 10',
    difficulty: 'easy'
  },
  {
    id: 2,
    question: 'จงหาตัวเลขถัดไป',
    series: [3, 6, 12, 24, '?'],
    options: [36, 42, 48, 56],
    correctAnswer: 2,
    explanation: 'อนุกรมคูณด้วย 2: 3×2=6, 6×2=12, 12×2=24, 24×2=48',
    difficulty: 'medium'
  },
  {
    id: 3,
    question: 'จงหาตัวเลขถัดไป',
    series: [1, 4, 9, 16, 25, '?'],
    options: [30, 32, 36, 42],
    correctAnswer: 2,
    explanation: 'อนุกรมกำลังสอง: 1², 2², 3², 4², 5², 6² = 36',
    difficulty: 'medium'
  },
  {
    id: 4,
    question: 'จงหาตัวเลขถัดไป',
    series: [5, 10, 7, 12, 9, '?'],
    options: [11, 13, 14, 16],
    correctAnswer: 2,
    explanation: 'อนุกรมสลับ: +5, -3, +5, -3, +5 = 14',
    difficulty: 'hard'
  },
  {
    id: 5,
    question: 'จงหาตัวเลขถัดไป',
    series: [1, 1, 2, 3, 5, 8, '?'],
    options: [11, 12, 13, 14],
    correctAnswer: 2,
    explanation: 'อนุกรมฟิโบนัชชี: ตัวถัดไป = ผลบวกของ 2 ตัวก่อนหน้า, 5+8=13',
    difficulty: 'hard'
  }
];

export const getSeriesQuestions = () => seriesQuestions;

export const getSeriesQuestionById = (id: number) => {
  return seriesQuestions.find(q => q.id === id);
};
