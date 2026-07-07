import AsyncStorage from '@react-native-async-storage/async-storage';
import { Vibration } from 'react-native';
import { Audio } from 'expo-av';


export const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};


export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};


export const calculatePercentage = (current: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((current / total) * 100);
};


export const getRarityColor = (rarity: string): string => {
  switch (rarity) {
    case 'common':
      return '#22c55e'; // Green
    case 'rare':
      return '#3b82f6'; // Blue
    case 'epic':
      return '#a855f7'; // Purple
    case 'legendary':
      return '#eab308'; // Gold
    default:
      return '#666666'; // Gray
  }
};


export const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty) {
    case 'easy':
      return '#4ade80'; // Light Green
    case 'medium':
      return '#fbbf24'; // Amber
    case 'hard':
      return '#f87171'; // Light Red
    case 'boss':
      return '#dc2626'; // Red
    default:
      return '#666666'; // Gray
  }
};


export const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};


export const isToday = (dateString: string | null): boolean => {
  if (!dateString) return false;
  const date = new Date(dateString);
  const today = new Date();
  return date.toDateString() === today.toDateString();
};


export const getDaysBetween = (date1: string, date2: string): number => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};


export const getExpForLevel = (level: number): number => {
  return level * 100;
};


export const getLevelFromExp = (totalExp: number): number => {
  return Math.floor(totalExp / 100) + 1;
};


export const getLevelProgress = (currentExp: number): number => {
  const currentLevel = getLevelFromExp(currentExp);
  const expForCurrentLevel = (currentLevel - 1) * 100;
  const expForNextLevel = currentLevel * 100;
  const progress = currentExp - expForCurrentLevel;
  const totalNeeded = expForNextLevel - expForCurrentLevel;
  return calculatePercentage(progress, totalNeeded);
};


export const calculateDamage = (
  attack: number,
  defense: number,
  multiplier: number = 1.0
): number => {
  const baseDamage = attack - (defense * 0.5);
  return Math.max(1, Math.floor(baseDamage * multiplier));
};


export const getStarRating = (
  correctAnswers: number,
  totalQuestions: number,
  timeRemaining: number,
  totalTime: number
): number => {
  const accuracy = correctAnswers / totalQuestions;
  const timeBonus = timeRemaining / totalTime;
  const score = accuracy * 0.7 + timeBonus * 0.3;

  if (score >= 0.9) return 3;
  if (score >= 0.7) return 2;
  if (score >= 0.5) return 1;
  return 0;
};


export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};


export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};


export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean = false;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};


export const storage = {
  get: async (key: string): Promise<any> => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error getting data from storage:', error);
      return null;
    }
  },
  
  set: async (key: string, value: any): Promise<void> => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting data in storage:', error);
    }
  },
  
  remove: async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing data from storage:', error);
    }
  },
};


const soundUrls: Record<string, string> = {
  click: 'https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg',
  reward: 'https://actions.google.com/sounds/v1/alarms/beep_short.ogg',
  battle: 'https://actions.google.com/sounds/v1/cartoon/metal_thud.ogg',
};

export const playSound = async (soundName: string = 'click'): Promise<void> => {
  const uri = soundUrls[soundName] || soundUrls.click;

  try {
    const { sound } = await Audio.Sound.createAsync(
      { uri },
      { shouldPlay: true, volume: 0.8 }
    );

    sound.setOnPlaybackStatusUpdate(async status => {
      if (status.isLoaded && status.didJustFinish) {
        await sound.unloadAsync();
      }
    });
  } catch (error) {
    console.warn('Unable to play sound:', error);
  }
};


export const vibrate = (pattern: number | number[] = 10): void => {
  Vibration.vibrate(pattern);
};
