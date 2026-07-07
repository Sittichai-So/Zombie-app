export interface Character {
  id: number;
  name_th: string;
  name_en: string;
  description_th: string;
  description_en: string;
  type: 'zombie' | 'human' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  baseStats: {
    attack: number;
    defense: number;
    speed: number;
    health: number;
  };
  maxLevel: number;
  unlockCost: number; // in coins
  upgradeCostPerLevel: number;
  imageUri: string;
  skills: Skill[];
}

export interface Skill {
  id: number;
  name_th: string;
  name_en: string;
  description_th: string;
  description_en: string;
  damageMultiplier: number;
  cooldown: number; // in turns
}

export const characters: Character[] = [
  // Common Characters - Human Survivors
  {
    id: 1,
    name_th: 'ผู้รอดชีวิต',
    name_en: 'Survivor',
    description_th: 'มนุษย์ธรรมดาที่ต้องต่อสู้เพื่อเอาชีวิตรอดจากซอมบี้',
    description_en: 'A normal human fighting to survive against zombies',
    type: 'human',
    rarity: 'common',
    baseStats: {
      attack: 12,
      defense: 8,
      speed: 12,
      health: 60
    },
    maxLevel: 20,
    unlockCost: 0, // Free starter - main character
    upgradeCostPerLevel: 100,
    imageUri: 'assets/images/characters/survivor.png',
    skills: [
      {
        id: 1,
        name_th: 'โจมตีด้วยไม้',
        name_en: 'Stick Attack',
        description_th: 'โจมตีพื้นฐานด้วยไม้',
        description_en: 'Basic attack with a stick',
        damageMultiplier: 1.0,
        cooldown: 0
      },
      {
        id: 2,
        name_th: 'หลบหลีก',
        name_en: 'Dodge',
        description_th: 'หลบการโจมตีของซอมบี้',
        description_en: 'Dodge zombie attack',
        damageMultiplier: 0.5,
        cooldown: 3
      }
    ]
  },
  {
    id: 2,
    name_th: 'นักเรียนขยัน',
    name_en: 'Diligent Student',
    description_th: 'นักเรียนที่พร้อมสอบ มีความสมดุล',
    description_en: 'A student ready for exams, balanced stats',
    type: 'human',
    rarity: 'common',
    baseStats: {
      attack: 10,
      defense: 10,
      speed: 12,
      health: 65
    },
    maxLevel: 20,
    unlockCost: 500,
    upgradeCostPerLevel: 120,
    imageUri: 'assets/images/characters/student.png',
    skills: [
      {
        id: 3,
        name_th: 'ทำข้อสอบ',
        name_en: 'Take Exam',
        description_th: 'โจมตีด้วยความรู้',
        description_en: 'Attack with knowledge',
        damageMultiplier: 1.3,
        cooldown: 2
      }
    ]
  },

  // Common Zombies (Enemies)
  {
    id: 10,
    name_th: 'ซอมบี้น้อย',
    name_en: 'Little Zombie',
    description_th: 'ซอมบี้เริ่มต้นที่อ่อนแอแต่มีความเร็ว',
    description_en: 'A weak but fast starter zombie',
    type: 'zombie',
    rarity: 'common',
    baseStats: {
      attack: 8,
      defense: 5,
      speed: 15,
      health: 45
    },
    maxLevel: 20,
    unlockCost: 999999, // Cannot unlock - enemy only
    upgradeCostPerLevel: 100,
    imageUri: 'assets/images/characters/little_zombie.png',
    skills: [
      {
        id: 10,
        name_th: 'กัดธรรมดา',
        name_en: 'Normal Bite',
        description_th: 'โจมตีพื้นฐาน',
        description_en: 'Basic attack',
        damageMultiplier: 1.0,
        cooldown: 0
      }
    ]
  },
  {
    id: 2,
    name_th: 'นักเรียนขยัน',
    name_en: 'Diligent Student',
    description_th: 'นักเรียนที่พร้อมสอบ มีความสมดุล',
    description_en: 'A student ready for exams, balanced stats',
    type: 'human',
    rarity: 'common',
    baseStats: {
      attack: 8,
      defense: 8,
      speed: 10,
      health: 60
    },
    maxLevel: 20,
    unlockCost: 500,
    upgradeCostPerLevel: 120,
    imageUri: 'assets/images/characters/student.png',
    skills: [
      {
        id: 2,
        name_th: 'ทำข้อสอบ',
        name_en: 'Take Exam',
        description_th: 'โจมตีด้วยความรู้',
        description_en: 'Attack with knowledge',
        damageMultiplier: 1.2,
        cooldown: 2
      }
    ]
  },

  // Rare Characters
  {
    id: 3,
    name_th: 'ซอมบี้ทหาร',
    name_en: 'Soldier Zombie',
    description_th: 'ซอมบี้ทหารที่มีพลังโจมตีสูง',
    description_en: 'A soldier zombie with high attack power',
    type: 'zombie',
    rarity: 'rare',
    baseStats: {
      attack: 20,
      defense: 10,
      speed: 12,
      health: 80
    },
    maxLevel: 30,
    unlockCost: 1500,
    upgradeCostPerLevel: 200,
    imageUri: 'assets/images/characters/soldier_zombie.png',
    skills: [
      {
        id: 3,
        name_th: 'โจมตีด้วยดาบ',
        name_en: 'Sword Attack',
        description_th: 'โจมตีรุนแรงด้วยดาบ',
        description_en: 'Powerful sword attack',
        damageMultiplier: 1.5,
        cooldown: 3
      },
      {
        id: 4,
        name_th: 'ป้องกันตัว',
        name_en: 'Self Defense',
        description_th: 'เพิ่มการป้องกันชั่วคราว',
        description_en: 'Temporary defense boost',
        damageMultiplier: 0.8,
        cooldown: 4
      }
    ]
  },
  {
    id: 4,
    name_th: 'ข้าราชการระดับสูง',
    name_en: 'Senior Officer',
    description_th: 'ข้าราชการที่มีประสบการณ์สูง',
    description_en: 'An experienced senior government officer',
    type: 'human',
    rarity: 'rare',
    baseStats: {
      attack: 15,
      defense: 18,
      speed: 10,
      health: 100
    },
    maxLevel: 30,
    unlockCost: 2000,
    upgradeCostPerLevel: 250,
    imageUri: 'assets/images/characters/senior_officer.png',
    skills: [
      {
        id: 5,
        name_th: 'คำสั่งการ',
        name_en: 'Command',
        description_th: 'สั่งการเพิ่มพลังโจมตี',
        description_en: 'Command to boost attack',
        damageMultiplier: 1.4,
        cooldown: 3
      }
    ]
  },

  // Epic Characters
  {
    id: 5,
    name_th: 'ซอมบี้บอส',
    name_en: 'Zombie Boss',
    description_th: 'ซอมบี้หัวหน้าที่มีพลังมหาศาล',
    description_en: 'A zombie boss with tremendous power',
    type: 'zombie',
    rarity: 'epic',
    baseStats: {
      attack: 30,
      defense: 20,
      speed: 15,
      health: 150
    },
    maxLevel: 40,
    unlockCost: 5000,
    upgradeCostPerLevel: 500,
    imageUri: 'assets/images/characters/zombie_boss.png',
    skills: [
      {
        id: 6,
        name_th: 'พายุซอมบี้',
        name_en: 'Zombie Storm',
        description_th: 'โจมตีทุกศัตรู',
        description_en: 'Attack all enemies',
        damageMultiplier: 2.0,
        cooldown: 5
      },
      {
        id: 7,
        name_th: 'ฟื้นชีวิต',
        name_en: 'Regenerate',
        description_th: 'ฟื้นฟูเลือด',
        description_en: 'Regenerate health',
        damageMultiplier: 0.5,
        cooldown: 6
      }
    ]
  },
  {
    id: 6,
    name_th: 'ผู้เชี่ยวชาญข้อสอบ',
    name_en: 'Exam Expert',
    description_th: 'ผู้เชี่ยวชาญการทำข้อสอบทุกประเภท',
    description_en: 'An expert in all types of exams',
    type: 'human',
    rarity: 'epic',
    baseStats: {
      attack: 25,
      defense: 22,
      speed: 18,
      health: 120
    },
    maxLevel: 40,
    unlockCost: 6000,
    upgradeCostPerLevel: 550,
    imageUri: 'assets/images/characters/exam_expert.png',
    skills: [
      {
        id: 8,
        name_th: 'ความรู้รอบตัว',
        name_en: 'General Knowledge',
        description_th: 'โจมตีด้วยความรู้รอบตัว',
        description_en: 'Attack with general knowledge',
        damageMultiplier: 1.8,
        cooldown: 4
      },
      {
        id: 9,
        name_th: 'วิเคราะห์ข้อสอบ',
        name_en: 'Analyze Question',
        description_th: 'วิเคราะห์และโจมตีแม่นยำ',
        description_en: 'Analyze and attack precisely',
        damageMultiplier: 2.2,
        cooldown: 5
      }
    ]
  },

  // Legendary Characters
  {
    id: 7,
    name_th: 'ซอมบี้ราชา',
    name_en: 'Zombie King',
    description_th: 'ราชาแห่งซอมบี้ที่มีพลังเหนือธรรมชาติ',
    description_en: 'The king of zombies with supernatural power',
    type: 'zombie',
    rarity: 'legendary',
    baseStats: {
      attack: 45,
      defense: 30,
      speed: 20,
      health: 200
    },
    maxLevel: 50,
    unlockCost: 15000,
    upgradeCostPerLevel: 1000,
    imageUri: 'assets/images/characters/zombie_king.png',
    skills: [
      {
        id: 10,
        name_th: 'คำสาปซอมบี้',
        name_en: 'Zombie Curse',
        description_th: 'สาปให้ศัตรูอ่อนแอลง',
        description_en: 'Curse enemies to weaken them',
        damageMultiplier: 2.5,
        cooldown: 7
      },
      {
        id: 11,
        name_th: 'กองทัพซอมบี้',
        name_en: 'Zombie Army',
        description_th: 'เรียกกองทัพซอมบี้มาช่วย',
        description_en: 'Summon zombie army to help',
        damageMultiplier: 3.0,
        cooldown: 10
      },
      {
        id: 12,
        name_th: 'อมตะ',
        name_en: 'Immortal',
        description_th: 'ไม่สามารถตายได้ชั่วคราว',
        description_en: 'Temporarily immortal',
        damageMultiplier: 1.0,
        cooldown: 15
      }
    ]
  },
  {
    id: 8,
    name_th: 'เทพเจ้าแห่งการสอบ',
    name_en: 'God of Exams',
    description_th: 'เทพเจ้าผู้ควบคุมการสอบทั้งหมด',
    description_en: 'The god who controls all exams',
    type: 'human',
    rarity: 'legendary',
    baseStats: {
      attack: 40,
      defense: 35,
      speed: 25,
      health: 180
    },
    maxLevel: 50,
    unlockCost: 20000,
    upgradeCostPerLevel: 1200,
    imageUri: 'assets/images/characters/exam_god.png',
    skills: [
      {
        id: 13,
        name_th: 'ปัญญาแห่งเทพ',
        name_en: 'Divine Wisdom',
        description_th: 'เพิ่มพลังโจมตีทั้งหมด',
        description_en: 'Boost all attack power',
        damageMultiplier: 2.8,
        cooldown: 6
      },
      {
        id: 14,
        name_th: 'คำตอบที่ถูกต้อง',
        name_en: 'Correct Answer',
        description_th: 'โจมตีที่แน่นอน',
        description_en: 'Certain attack',
        damageMultiplier: 3.5,
        cooldown: 8
      },
      {
        id: 15,
        name_th: 'พรแห่งการสอบ',
        name_en: 'Exam Blessing',
        description_th: 'เพิ่มโชคและพลังทั้งหมด',
        description_en: 'Boost luck and all powers',
        damageMultiplier: 1.5,
        cooldown: 12
      }
    ]
  }
];

export const getCharacterById = (id: number): Character | undefined => {
  return characters.find(c => c.id === id);
};

export const getCharactersByRarity = (rarity: string): Character[] => {
  return characters.filter(c => c.rarity === rarity);
};

export const getCharactersByType = (type: string): Character[] => {
  return characters.filter(c => c.type === type);
};

export const calculateStatAtLevel = (baseStat: number, level: number, growthRate: number = 1.1): number => {
  return Math.floor(baseStat * Math.pow(growthRate, level - 1));
};
