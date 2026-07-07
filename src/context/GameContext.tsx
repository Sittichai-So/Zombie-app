import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCharacterById, calculateStatAtLevel } from '../data/characters';
import { type Level, levels } from '../data/levels';

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
  ownedCharacters: number[];
  selectedCharacterId: number;
  characterLevels: { [key: number]: number };
  lastDailyReward: string | null;
  isAuthenticated: boolean;
  settings: {
    sound: boolean;
    music: boolean;
    notifications: boolean;
    language: 'th' | 'en';
  };
}

interface BattleState {
  playerHealth: number;
  enemyHealth: number;
  currentQuestionIndex: number;
  timeRemaining: number;
  correctAnswers: number;
}

interface GameContextType {
  player: PlayerProfile;
  currentLevel: Level | null;
  isBattleActive: boolean;
  battleState: BattleState;
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

const createInitialPlayer = (): PlayerProfile => ({
  username: 'Player',
  email: '',
  playerLevel: 1,
  experience: 0,
  totalScore: 0,
  highestLevelCompleted: 0,
  completedLevels: [],
  coins: 1000,
  gems: 10,
  ownedCharacters: [1],
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
});

const createInitialBattleState = (): BattleState => ({
  playerHealth: 100,
  enemyHealth: 100,
  currentQuestionIndex: 0,
  timeRemaining: 60,
  correctAnswers: 0,
});

const mergePlayerData = (savedData?: Partial<PlayerProfile>): PlayerProfile => ({
  ...createInitialPlayer(),
  ...savedData,
  settings: {
    ...createInitialPlayer().settings,
    ...savedData?.settings,
  },
  characterLevels: {
    ...createInitialPlayer().characterLevels,
    ...(savedData?.characterLevels ?? {}),
  },
});

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [player, setPlayer] = useState<PlayerProfile>(createInitialPlayer);
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null);
  const [isBattleActive, setIsBattleActive] = useState(false);
  const [battleState, setBattleState] = useState<BattleState>(createInitialBattleState);

  useEffect(() => {
    void loadGame();
  }, []);

  const loadGame = async () => {
    try {
      const savedData = await AsyncStorage.getItem('zombieQuizRPG_save');
      const authData = await AsyncStorage.getItem('zombieQuizRPG_auth');

      if (savedData) {
        const parsed = JSON.parse(savedData) as Partial<PlayerProfile>;
        setPlayer(mergePlayerData(parsed));
      }

      if (authData) {
        const auth = JSON.parse(authData) as { isAuthenticated?: boolean };
        if (auth.isAuthenticated) {
          setPlayer((prev) => ({ ...prev, isAuthenticated: true }));
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
    const nextPlayer = {
      ...player,
      email,
      username: username || player.username,
      isAuthenticated: true,
    };

    setPlayer(nextPlayer);
    await saveGame(nextPlayer);
    await saveAuth({ email, isAuthenticated: true });
  };

  const logout = async () => {
    const nextPlayer = {
      ...player,
      isAuthenticated: false,
    };

    setPlayer(nextPlayer);
    await saveGame(nextPlayer);
    await AsyncStorage.removeItem('zombieQuizRPG_auth');
  };

  const updatePlayer = async (updates: Partial<PlayerProfile>) => {
    setPlayer((prev) => {
      const nextPlayer = { ...prev, ...updates };
      void saveGame(nextPlayer);
      return nextPlayer;
    });
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

    const nextCharacterLevels = {
      ...player.characterLevels,
      [characterId]: currentLevel + 1,
    };

    await updatePlayer({
      coins: player.coins - cost,
      characterLevels: nextCharacterLevels,
    });
  };

  const startLevel = (levelId: number) => {
    const level = levels.find((item) => item.id === levelId);
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
      setPlayer((prev) => {
        const newCompletedLevels = prev.completedLevels.includes(currentLevel.id)
          ? prev.completedLevels
          : [...prev.completedLevels, currentLevel.id];

        const newHighestLevel = Math.max(prev.highestLevelCompleted, currentLevel.id);
        const newExp = prev.experience + currentLevel.rewardExp;
        const newLevel = Math.floor(newExp / 100) + 1;
        const newCoins = prev.coins + currentLevel.rewardCoins;
        const newScore = prev.totalScore + currentLevel.rewardCoins * 10;

        const nextPlayer = {
          ...prev,
          completedLevels: newCompletedLevels,
          highestLevelCompleted: newHighestLevel,
          experience: newExp,
          playerLevel: newLevel,
          coins: newCoins,
          totalScore: newScore,
        };

        void saveGame(nextPlayer);
        return nextPlayer;
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

    setBattleState((prev) => {
      const newCorrectAnswers = isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers;
      const damage = isCorrect ? Math.max(10, playerAttack - enemyDefense / 2) : 0;
      const newEnemyHealth = Math.max(0, prev.enemyHealth - damage);

      let newPlayerHealth = prev.playerHealth;
      if (!isCorrect) {
        const enemyAttack = enemyCharacter.baseStats.attack;
        const playerDefense = calculateStatAtLevel(playerCharacter.baseStats.defense, playerCharLevel);
        const counterDamage = Math.max(5, enemyAttack - playerDefense / 2);
        newPlayerHealth = Math.max(0, prev.playerHealth - counterDamage);
      }

      return {
        ...prev,
        correctAnswers: newCorrectAnswers,
        enemyHealth: newEnemyHealth,
        playerHealth: newPlayerHealth,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
      };
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
    const nextPlayer = createInitialPlayer();
    setPlayer(nextPlayer);
    await saveGame(nextPlayer);
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
