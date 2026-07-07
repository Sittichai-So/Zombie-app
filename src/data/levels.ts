import { type Difficulty } from '../types';

export interface Level {
  id: number;
  day: number;
  name_th: string;
  name_en: string;
  description_th: string;
  description_en: string;
  story_th: string;
  story_en: string;
  difficulty: Difficulty;
  questionCount: number;
  timeLimit: number;
  enemyCharacterId: number;
  rewardCoins: number;
  rewardExp: number;
  requiredLevel: number;
  isLocked: boolean;
  backgroundUri: string;
}

// Helper function to generate levels
const generateLevel = (
  id: number,
  day: number,
  name_th: string,
  name_en: string,
  description_th: string,
  description_en: string,
  story_th: string,
  story_en: string,
  difficulty: Difficulty,
  questionCount: number,
  timeLimit: number,
  enemyCharacterId: number,
  rewardCoins: number,
  rewardExp: number,
  requiredLevel: number
): Level => ({
  id,
  day,
  name_th,
  name_en,
  description_th,
  description_en,
  story_th,
  story_en,
  difficulty,
  questionCount,
  timeLimit,
  enemyCharacterId,
  rewardCoins,
  rewardExp,
  requiredLevel,
  isLocked: id > 1,
  backgroundUri: `assets/images/backgrounds/day${day}.png`
});

export const levels: Level[] = [
  // Day 1-10: Survival Beginning (Easy)
  generateLevel(1, 1, 'Day 1: การเริ่มต้น', 'Day 1: The Beginning',
    'วันแรกของการเอาชีวิตรอด ซอมบี้ตัวแรกปรากฏขึ้น!', 'First day of survival. The first zombie appears!',
    'คุณตื่นขึ้นมาในเมืองที่เต็มไปด้วยซอมบี้ ต้องหาทางอยู่รอดให้ได้!', 'You wake up in a city full of zombies. You must survive!',
    'easy', 5, 60, 10, 100, 50, 1),  // Enemy: Little Zombie (ID 10)
  
  generateLevel(2, 3, 'Day 3: ค้นหาเสบียง', 'Day 3: Finding Supplies',
    'วันที่ 3 ต้องหาอาหารและอาวุธ', 'Day 3. Need to find food and weapons',
    'เสบียงเริ่มหมด ต้องออกไปค้นหาในร้านค้าใกล้เคียง', 'Supplies running low. Must search nearby stores',
    'easy', 5, 60, 10, 120, 60, 2),
  
  generateLevel(3, 5, 'Day 5: ผู้รอดชีวิตคนแรก', 'Day 5: First Survivor',
    'พบผู้รอดชีวิตคนแรก แต่เขาติดเชื้อแล้ว!', 'Met first survivor, but they are infected!',
    'ต้องตัดสินใจ: ช่วยหรือหนี?', 'Must decide: help or run?',
    'easy', 6, 70, 10, 150, 70, 3),
  
  generateLevel(4, 7, 'Day 7: ที่หลบภัย', 'Day 7: Safe House',
    'หาที่หลบภัยชั่วคราวได้', 'Found temporary safe house',
    'ต้องป้องกันที่หลบภัยจากซอมบี้', 'Must defend safe house from zombies',
    'easy', 6, 70, 10, 170, 80, 4),
  
  generateLevel(5, 10, 'Day 10: บอสแรก', 'Day 10: First Boss',
    'ต่อสู้กับซอมบี้บอสตัวแรก!', 'Fight the first zombie boss!',
    'ซอมบี้ขนาดใหญ่ปรากฏขึ้น!', 'A giant zombie appears!',
    'boss', 8, 90, 3, 500, 200, 5),  // Boss: Soldier Zombie

  // Day 11-20: Building Strength (Easy-Medium)
  generateLevel(6, 12, 'Day 12: ฝึกฝน', 'Day 12: Training',
    'เวลาฝึกฝนทักษะการต่อสู้', 'Time to train fighting skills',
    'ยิ่งฝึก越强 ยิ่งอยู่รอด', 'The more you train, the stronger you get',
    'easy', 6, 70, 2, 200, 100, 6),
  
  generateLevel(7, 15, 'Day 15: ทีมงาน', 'Day 15: The Team',
    'พบผู้รอดชีวิตคนอื่นๆ', 'Met other survivors',
    'รวมทีมเพื่ออยู่รอด', 'Unite team to survive',
    'easy', 7, 80, 3, 220, 110, 7),
  
  generateLevel(8, 18, 'Day 18: แหล่งอาวุธ', 'Day 18: Weapon Cache',
    'ค้นพบแหล่งอาวุธเก่า', 'Discovered old weapon cache',
    'อาวุธที่ดีขึ้น = โอกาสรอดที่สูงขึ้น', 'Better weapons = higher survival chance',
    'easy', 7, 80, 3, 250, 120, 8),
  
  generateLevel(9, 20, 'Day 20: บอสที่สอง', 'Day 20: Second Boss',
    'ซอมบี้บอสที่ 2 ปรากฏ!', 'Second zombie boss appears!',
    'บอสตัวนี้ฉลาดกว่าเดิม!', 'This boss is smarter!',
    'boss', 10, 120, 4, 800, 350, 10),

  // Day 21-40: Medium Challenge
  generateLevel(10, 25, 'Day 25: เมืองร้าง', 'Day 25: Abandoned City',
    'ต้องเดินทางผ่านเมืองร้าง', 'Must travel through abandoned city',
    'อันตรายซ่อนอยู่ทุกมุม', 'Danger lurks at every corner',
    'medium', 8, 85, 4, 300, 150, 12),
  
  generateLevel(11, 30, 'Day 30: พายุซอมบี้', 'Day 30: Zombie Storm',
    'ฝูงซอมบี้ขนาดใหญ่เข้ามา!', 'Large zombie horde approaching!',
    'ต้องป้องกันค่าย!', 'Must defend the camp!',
    'medium', 8, 90, 4, 350, 180, 14),
  
  generateLevel(12, 35, 'Day 35: โรคระบาดใหม่', 'Day 35: New Outbreak',
    'ไวรัสกลายพันธุ์!', 'Virus mutated!',
    'ซอมบี้แข็งแรงขึ้น', 'Zombies are stronger',
    'medium', 9, 95, 5, 400, 200, 16),
  
  generateLevel(13, 40, 'Day 40: บอสที่สาม', 'Day 40: Third Boss',
    'ซอมบี้ควีนปรากฏตัว!', 'Zombie Queen appears!',
    'การต่อสู้ที่ยากที่สุด!', 'The hardest fight yet!',
    'boss', 12, 150, 6, 1000, 500, 18),

  // Day 41-60: Hard Challenge
  generateLevel(14, 45, 'Day 45: ฐานทัพ', 'Day 45: Military Base',
    'พบฐานทัพทหารเก่า', 'Found old military base',
    'มีอาวุธหนัก!', 'Heavy weapons available!',
    'hard', 10, 100, 5, 500, 250, 20),
  
  generateLevel(15, 50, 'Day 50: ฝูงใหญ่', 'Day 50: The Horde',
    'ฝูงซอมบี้ที่ใหญ่ที่สุด!', 'The largest zombie horde!',
    'นับพันตัว!', 'Thousands of them!',
    'hard', 10, 110, 6, 600, 300, 22),
  
  generateLevel(16, 55, 'Day 55: ห้องแล็บ', 'Day 55: The Lab',
    'พบห้องแล็บวิจัยไวรัส', 'Found virus research lab',
    'อาจมีวิธีรักษา?', 'Maybe there is a cure?',
    'hard', 11, 120, 7, 700, 350, 24),
  
  generateLevel(17, 60, 'Day 60: บอสที่สี่', 'Day 60: Fourth Boss',
    'ซอมบี้คิงปรากฏ!', 'Zombie King appears!',
    'บอสที่แข็งแรงที่สุด!', 'The strongest boss!',
    'boss', 14, 180, 8, 1500, 700, 26),

  // Day 61-80: Very Hard
  generateLevel(18, 65, 'Day 65: ฤดูหนาว', 'Day 65: Winter',
    'ฤดูหนาวแรกหลังวันสิ้นโลก', 'First winter after apocalypse',
    'ความหนาว + ซอมบี้ = นรก', 'Cold + Zombies = Hell',
    'hard', 11, 120, 7, 800, 400, 28),
  
  generateLevel(19, 70, 'Day 70: การกบฏ', 'Day 70: The Rebellion',
    'ผู้รอดชีวิตบางคนกบฏ!', 'Some survivors rebelled!',
    'มนุษย์อันตรายกว่าซอมบี้?', 'Humans more dangerous than zombies?',
    'hard', 12, 130, 8, 900, 450, 30),
  
  generateLevel(20, 75, 'Day 75: ทางออก', 'Day 75: The Exit',
    'พบทางออกจากเมือง!', 'Found exit from city!',
    'แต่มีซอมบี้เฝ้าอยู่', 'But zombies are guarding it',
    'hard', 12, 130, 8, 1000, 500, 32),
  
  generateLevel(21, 80, 'Day 80: บอสที่ห้า', 'Day 80: Fifth Boss',
    'ซอมบี้เอมเพอเรอร์!', 'Zombie Emperor!',
    'บอสแห่งบอส!', 'Boss of all bosses!',
    'boss', 16, 200, 9, 2000, 1000, 34),

  // Day 81-100: Ultimate Challenge
  generateLevel(22, 85, 'Day 85: ฐานสุดท้าย', 'Day 85: Last Base',
    'ฐานที่มั่นสุดท้ายของมนุษย์', 'Last human stronghold',
    'ต้องป้องกันด้วยชีวิต!', 'Must defend with life!',
    'hard', 13, 140, 9, 1200, 600, 36),
  
  generateLevel(23, 90, 'Day 90: การตอบโต้', 'Day 90: Counterattack',
    'เวลาล้างแค้น!', 'Time for revenge!',
    'โจมตีรังซอมบี้!', 'Attack zombie nest!',
    'hard', 13, 140, 10, 1400, 700, 38),
  
  generateLevel(24, 95, 'Day 95: จุดจบ', 'Day 95: The End',
    'การต่อสู้ครั้งสุดท้าย!', 'The final battle!',
    'ชนะหรือตาย!', 'Win or die!',
    'hard', 14, 150, 10, 1600, 800, 40),
  
  generateLevel(25, 100, 'Day 100: วันพิพากษา', 'Day 100: Judgment Day',
    'วันสุดท้ายของการเอาชีวิตรอด', 'Last day of survival',
    'คุณคือความหวังสุดท้ายของมนุษย์!', 'You are humanity\'s last hope!',
    'boss', 20, 300, 11, 5000, 2000, 42),
];

export const isLevelUnlocked = (levelId: number, completedLevels: number[]): boolean => {
  if (levelId === 1) return true;
  return completedLevels.includes(levelId - 1);
};

export const getLevelByDay = (day: number): Level | undefined => {
  return levels.find(l => l.day === day);
};

export const getTotalDays = (): number => {
  return levels.length;
};
