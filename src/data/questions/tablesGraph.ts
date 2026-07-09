// ข้อสอบตารางและกราฟ (Tables & Graphs)
export interface TableGraphQuestion {
  id: number;
  category: 'tablesGraph';
  title: string;
  dataType: 'table' | 'bar' | 'line' | 'pie';
  data: any;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const tableGraphQuestions: TableGraphQuestion[] = [
  {
    id: 1,
    category: 'tablesGraph',
    title: 'ยอดขายรายเดือน',
    dataType: 'table',
    data: {
      headers: ['เดือน', 'ยอดขาย (บาท)'],
      rows: [
        ['มกราคม', 50000],
        ['กุมภาพันธ์', 65000],
        ['มีนาคม', 80000],
        ['เมษายน', 75000]
      ]
    },
    question: 'เดือนใดมียอดขายสูงสุด?',
    options: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน'],
    correctAnswer: 2,
    explanation: 'มกราคม=50000, กุมภาพันธ์=65000, มีนาคม=80000, เมษายน=75000 ดังนั้นมีนาคมสูงสุด',
    difficulty: 'easy'
  },
  {
    id: 2,
    title: 'ยอดขายรายเดือน',
    dataType: 'table',
    data: {
      headers: ['เดือน', 'ยอดขาย (บาท)'],
      rows: [
        ['มกราคม', 50000],
        ['กุมภาพันธ์', 65000],
        ['มีนาคม', 80000],
        ['เมษายน', 75000]
      ]
    },
    question: 'ยอดขายเฉลี่ยต่อเดือนเท่ากับเท่าใด?',
    options: ['65,000 บาท', '67,500 บาท', '70,000 บาท', '72,500 บาท'],
    correctAnswer: 1,
    explanation: '(50000 + 65000 + 80000 + 75000) ÷ 4 = 270000 ÷ 4 = 67,500 บาท',
    difficulty: 'medium'
  },
  {
    id: 3,
    title: 'จำนวนนักเรียน',
    dataType: 'bar',
    data: {
      labels: ['ม.1', 'ม.2', 'ม.3', 'ม.4', 'ม.5'],
      values: [120, 135, 128, 142, 138]
    },
    question: 'ระดับชั้นใดมีนักเรียนมากที่สุด?',
    options: ['ม.2', 'ม.3', 'ม.4', 'ม.5'],
    correctAnswer: 2,
    explanation: 'ม.4 มี 142 คน มากที่สุด',
    difficulty: 'easy'
  },
  {
    id: 4,
    title: 'อุณหภูมิรายวัน',
    dataType: 'line',
    data: {
      days: ['จันทร์', 'อังคาร', 'พุธ', 'พฤหัส', 'ศุกร์'],
      temperatures: [32, 34, 33, 35, 36]
    },
    question: 'อุณหภูมิเพิ่มขึ้นรวมกี่องศาจากวันจันทร์ถึงวันศุกร์?',
    options: ['3 องศา', '4 องศา', '5 องศา', '6 องศา'],
    correctAnswer: 1,
    explanation: 'วันศุกร์ 36 - วันจันทร์ 32 = 4 องศา',
    difficulty: 'medium'
  },
  {
    id: 5,
    title: 'งบประมาณ',
    dataType: 'pie',
    data: {
      categories: ['เงินเดือน', 'ดำเนินงาน', 'การตลาด', 'วิจัย'],
      percentages: [40, 25, 20, 15]
    },
    question: 'หมวดใดใช้งบประมาณมากที่สุด?',
    options: ['ดำเนินงาน', 'การตลาด', 'เงินเดือน', 'วิจัย'],
    correctAnswer: 2,
    explanation: 'เงินเดือน 40% มากที่สุด',
    difficulty: 'easy'
  }
];

export const getTableGraphQuestions = () => tableGraphQuestions;

export const getTableGraphQuestionById = (id: number) => {
  return tableGraphQuestions.find(q => q.id === id);
};
