// Game Types
export interface GameState {
  isPlaying: boolean;
  currentScreen: string;
  lastPlayed: string | null;
}

// Navigation Types
export type ScreenName = 
  | 'Home' 
  | 'LevelMap' 
  | 'Battle' 
  | 'Characters' 
  | 'Shop' 
  | 'Profile' 
  | 'Settings';

// Battle Types
export interface BattleAction {
  type: 'attack' | 'defend' | 'skill' | 'item';
  characterId: number;
  targetId: number;
  skillId?: number;
  itemId?: number;
}

export interface BattleResult {
  victory: boolean;
  damageDealt: number;
  damageReceived: number;
  correctAnswers: number;
  totalQuestions: number;
  timeRemaining: number;
  rewards: {
    coins: number;
    exp: number;
    items?: number[];
  };
}

// Shop Types
export interface Purchase {
  itemId: number;
  quantity: number;
  totalCost: number;
  currency: 'coins' | 'gems';
  timestamp: string;
}

// Achievement Types
export interface Achievement {
  id: number;
  name_th: string;
  name_en: string;
  description_th: string;
  description_en: string;
  condition: string;
  reward: {
    coins: number;
    gems: number;
  };
  isUnlocked: boolean;
  unlockedAt?: string;
}

// Statistics Types
export interface PlayerStatistics {
  totalBattles: number;
  victories: number;
  defeats: number;
  totalQuestionsAnswered: number;
  correctAnswers: number;
  accuracy: number;
  totalDamageDealt: number;
  totalDamageReceived: number;
  highestCombo: number;
  totalPlayTime: number; // in minutes
  levelsCompleted: number;
  bossesDefeated: number;
}

// Notification Types
export interface GameNotification {
  id: number;
  title_th: string;
  title_en: string;
  message_th: string;
  message_en: string;
  type: 'daily_reward' | 'energy_full' | 'new_character' | 'level_up' | 'event';
  isRead: boolean;
  createdAt: string;
  action?: () => void;
}

// Item Types
export interface InventoryItem {
  itemId: number;
  quantity: number;
  acquiredAt: string;
}

// Quest Types
export interface DailyQuest {
  id: number;
  title_th: string;
  title_en: string;
  description_th: string;
  description_en: string;
  progress: number;
  target: number;
  isCompleted: boolean;
  isClaimed: boolean;
  reward: {
    coins: number;
    gems: number;
    exp: number;
  };
  expiresAt: string;
}

// Event Types
export interface GameEvent {
  id: number;
  name_th: string;
  name_en: string;
  description_th: string;
  description_en: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  rewards: {
    coins: number;
    gems: number;
    exclusiveItems?: number[];
  };
}

// Leaderboard Types
export interface LeaderboardEntry {
  rank: number;
  playerId: string;
  playerName: string;
  score: number;
  level: number;
  avatarId: number;
}

// Save/Load Types
export interface SaveData {
  version: string;
  savedAt: string;
  player: any; // PlayerProfile from GameContext
  game: GameState;
  statistics: PlayerStatistics;
  inventory: InventoryItem[];
  achievements: Achievement[];
  quests: DailyQuest[];
}

// API Response Types (for future online features)
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

// Utility Types
export type Rarity = 'common' | 'rare' | 'epic' | 'legendary';
export type Difficulty = 'easy' | 'medium' | 'hard' | 'boss';
export type CharacterType = 'zombie' | 'human' | 'special';
export type Language = 'th' | 'en';
