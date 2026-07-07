import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Character, characters, getCharacterById, calculateStatAtLevel } from '../data/characters';
import { Level, levels, isLevelUnlocked } from '../data/levels';

export interface PlayerProfile {
  username: string;
  email?: string;
  playerLevel: number;
  experience: number;
  totalScore: number;
  highestLevelCompleted: number;
  completedLevels: number[];
  coins: number;
  gems: number;
  ownedCharacters: number[]; // character IDs
  selectedCharacterId: number;
  characterLevels: { [key: number]: number }; // characterId -> level
  lastDailyReward: string | null;
  isAuthenticated: boolean;
  settings: {
    sound: boolean;
    music: boolean;
    notifications: boolean;
    language: 'th' | 'en';
  };
}

interface GameContextType {
  player: PlayerProfile;
  currentLevel: Level | null;
  isBattleActive: boolean;
  battleState: {
    playerHealth: number;
    enemyHealth: number;
    currentQuestionIndex: number;
    timeRemaining: number;
    correctAnswers: number;
  };
  updatePlayer: (updates: Partial<PlayerProfile>) => Promise<void>;
  selectCharacter: (characterId: number) => Promise<void>;
  upgradeCharacter: (characterId: number) => Promise<void>;
  startLevel: (levelId: number) => void;
  endBattle: (victory: boolean) => Promise<void>;
  answerQuestion: (isCorrect: boolean) => void;
  claimDailyReward: () => Promise<void>;
  resetGame: () => Promise<void>;
  loadGame: () => Promise<void>;
  login: (email: string, password: string, username?: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const defaultPlayer: PlayerProfile = {
  username: 'Player',
  email: '',
  playerLevel: 1,
  experience: 0,
  totalScore: 0,
  highestLevelCompleted: 0,
  completedLevels: [],
  coins: 1000,
  gems: 10,
  ownedCharacters: [1], // Start with Little Zombie
  selectedCharacterId: 1,
  characterLevels: { 1: 1 },
  lastDailyReward: null,
  isAuthenticated: false,
  settings: {
    sound: true,
    music: true,
    notifications: true,
    language: 'th',
  },
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [player, setPlayer] = useState<PlayerProfile>(defaultPlayer);
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null);
  const [isBattleActive, setIsBattleActive] = useState(false);
  const [battleState, setBattleState] = useState({
    playerHealth: 100,
    enemyHealth: 100,
    currentQuestionIndex: 0,
    timeRemaining: 60,
    correctAnswers: 0,
  });

  // Load game on mount
  useEffect(() => {
    loadGame();
  }, []);

  const loadGame = async () => {
    try {
      const savedData = await AsyncStorage.getItem('zombieQuizRPG_save');
      const authData = await AsyncStorage.getItem('zombieQuizRPG_auth');
      
      if (savedData) {
        const parsed = JSON.parse(savedData);
        setPlayer(parsed);
      }
      
      if (authData) {
        const auth = JSON.parse(authData);
        if (auth.isAuthenticated) {
          setPlayer(prev => ({ ...prev, isAuthenticated: true }));
        }
      }
    } catch (error) {
      console.error('Failed to load game:', error);
    }
  };

  const saveGame = async (playerData: PlayerProfile) => {
    try {
      await AsyncStorage.setItem('zombieQuizRPG_save', JSON.stringify(playerData));
    } catch (error) {
      console.error('Failed to save game:', error);
    }
  };

  const saveAuth = async (authData: { email: string; isAuthenticated: boolean }) => {
    try {
      await AsyncStorage.setItem('zombieQuizRPG_auth', JSON.stringify(authData));
    } catch (error) {
      console.error('Failed to save auth:', error);
    }
  };

  const login = async (email: string, password: string, username?: string) => {
    // Simulate login - in real app, this would call auth service
    const newPlayer = {
      ...player,
      email,
      username: username || player.username,
      isAuthenticated: true,
    };
    
    setPlayer(newPlayer);
    await saveGame(newPlayer);
    await saveAuth({ email, isAuthenticated: true });
  };

  const logout = async () => {
    const newPlayer = {
      ...player,
      isAuthenticated: false,
    };
    
    setPlayer(newPlayer);
    await saveGame(newPlayer);
    await AsyncStorage.removeItem('zombieQuizRPG_auth');
  };

  const updatePlayer = async (updates: Partial<PlayerProfile>) => {
    const newPlayer = { ...player, ...updates };
    setPlayer(newPlayer);
    await saveGame(newPlayer);
  };

  const selectCharacter = async (characterId: number) => {
    if (player.ownedCharacters.includes(characterId)) {
      await updatePlayer({ selectedCharacterId: characterId });
    }
  };

  const upgradeCharacter = async (characterId: number) => {
    const character = getCharacterById(characterId);
    if (!character) return;

    const currentLevel = player.characterLevels[characterId] || 1;
    if (currentLevel >= character.maxLevel) return;

    const cost = character.upgradeCostPerLevel * currentLevel;
    if (player.coins < cost) return;

    const newCharacterLevels = {
      ...player.characterLevels,
      [characterId]: currentLevel + 1,
    };

    await updatePlayer({
      coins: player.coins - cost,
      characterLevels: newCharacterLevels,
    });
  };

  const startLevel = (levelId: number) => {
    const level = levels.find(l => l.id === levelId);
    if (!level) return;

    const enemyCharacter = getCharacterById(level.enemyCharacterId);
    const playerCharacter = getCharacterById(player.selectedCharacterId);

    if (!enemyCharacter || !playerCharacter) return;

    const playerCharLevel = player.characterLevels[player.selectedCharacterId] || 1;
    const playerMaxHealth = calculateStatAtLevel(playerCharacter.baseStats.health, playerCharLevel);

    setCurrentLevel(level);
    setIsBattleActive(true);
    setBattleState({
      playerHealth: playerMaxHealth,
      enemyHealth: enemyCharacter.baseStats.health,
      currentQuestionIndex: 0,
      timeRemaining: level.timeLimit,
      correctAnswers: 0,
    });
  };

  const endBattle = async (victory: boolean) => {
    if (!currentLevel) return;

    if (victory) {
      const newCompletedLevels = player.completedLevels.includes(currentLevel.id)
        ? player.completedLevels
        : [...player.completedLevels, currentLevel.id];

      const newHighestLevel = Math.max(player.highestLevelCompleted, currentLevel.id);
      const newExp = player.experience + currentLevel.rewardExp;
      const newLevel = Math.floor(newExp / 100) + 1;
      const newCoins = player.coins + currentLevel.rewardCoins;
      const newScore = player.totalScore + (currentLevel.rewardCoins * 10);

      await updatePlayer({
        completedLevels: newCompletedLevels,
        highestLevelCompleted: newHighestLevel,
        experience: newExp,
        playerLevel: newLevel,
        coins: newCoins,
        totalScore: newScore,
      });
    }

    setCurrentLevel(null);
    setIsBattleActive(false);
  };

  const answerQuestion = (isCorrect: boolean) => {
    if (!currentLevel) return;

    const playerCharacter = getCharacterById(player.selectedCharacterId);
    const enemyCharacter = getCharacterById(currentLevel.enemyCharacterId);

    if (!playerCharacter || !enemyCharacter) return;

    const playerCharLevel = player.characterLevels[player.selectedCharacterId] || 1;
    const playerAttack = calculateStatAtLevel(playerCharacter.baseStats.attack, playerCharLevel);
    const enemyDefense = enemyCharacter.baseStats.defense;

    const newCorrectAnswers = isCorrect ? battleState.correctAnswers + 1 : battleState.correctAnswers;
    
    // Calculate damage
    const damage = isCorrect ? Math.max(10, playerAttack - enemyDefense / 2) : 0;
    const newEnemyHealth = Math.max(0, battleState.enemyHealth - damage);

    // Enemy counter-attack if wrong
    let newPlayerHealth = battleState.playerHealth;
    if (!isCorrect) {
      const enemyAttack = enemyCharacter.baseStats.attack;
      const playerDefense = calculateStatAtLevel(playerCharacter.baseStats.defense, playerCharLevel);
      const counterDamage = Math.max(5, enemyAttack - playerDefense / 2);
      newPlayerHealth = Math.max(0, battleState.playerHealth - counterDamage);
    }

    setBattleState({
      ...battleState,
      correctAnswers: newCorrectAnswers,
      enemyHealth: newEnemyHealth,
      playerHealth: newPlayerHealth,
      currentQuestionIndex: battleState.currentQuestionIndex + 1,
    });
  };

  const claimDailyReward = async () => {
    const today = new Date().toDateString();
    if (player.lastDailyReward === today) return;

    await updatePlayer({
      coins: player.coins + 500,
      gems: player.gems + 5,
      lastDailyReward: today,
    });
  };

  const resetGame = async () => {
    setPlayer(defaultPlayer);
    await saveGame(defaultPlayer);
  };

  return (
    <GameContext.Provider
      value={{
        player,
        currentLevel,
        isBattleActive,
        battleState,
        updatePlayer,
        selectCharacter,
        upgradeCharacter,
        startLevel,
        endBattle,
        answerQuestion,
        claimDailyReward,
        resetGame,
        loadGame,
        login,
        logout,
        isAuthenticated: player.isAuthenticated,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
