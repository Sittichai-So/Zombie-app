import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useGame } from '../context/GameContext';
import { getCharacterById } from '../data/characters';
import { levels } from '../data/levels';
import { quizQuestions, Question } from '../data/quizQuestions';
import i18n from '@/i18n';

const { width, height } = Dimensions.get('window');

const BG = '#0A0A0F';
const PANEL = '#14151C';
const PANEL_RAISED = '#1C1E27';
const INK = '#000000';
const WHITE = '#FFFFFF';
const MUTED = '#71757F';
const MUTED_LIGHT = '#9CA0AC';
const GOLD = '#FFC300';
const GREEN = '#2BE07A';
const GREEN_DARK = '#189E56';
const ORANGE = '#FF7A1A';
const RED = '#FF3B5C';
const RED_DARK = '#C4123F';
const PURPLE = '#8A2BFF';
const PURPLE_LIGHT = '#B266FF';
const BLUE = '#22B8FF';
const LINE = 'rgba(255,255,255,0.08)';

const BattleScreen: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { levelId } = route.params || {};

  const {
    currentLevel,
    battleState,
    answerQuestion,
    endBattle,
    player,
  } = useGame();

  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [questionKey, setQuestionKey] = useState(0);

  const [showDamage, setShowDamage] = useState(false);
  const [damageValue, setDamageValue] = useState(0);
  const [comboCount, setComboCount] = useState(0);
  const [showCombo, setShowCombo] = useState(false);

  const questionTimeLimit = useRef(battleState.timeRemaining || 15).current;
  const [timeLeft, setTimeLeft] = useState(questionTimeLimit);

  const playerScale = useState(new Animated.Value(1))[0];
  const enemyScale = useState(new Animated.Value(1))[0];
  const shakeAnim = useState(new Animated.Value(0))[0];
  const comboScale = useState(new Animated.Value(0))[0];
  const resultOpacity = useState(new Animated.Value(0))[0];

  const level = currentLevel || levels.find(l => l.id === levelId);
  const playerCharacter = getCharacterById(player.selectedCharacterId);
  const enemyCharacter = level ? getCharacterById(level.enemyCharacterId) : null;

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return GOLD;
      case 'epic': return PURPLE;
      case 'rare': return BLUE;
      case 'common': return MUTED;
      default: return MUTED;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'zombie': return '🧟';
      case 'human': return '🧑';
      case 'special': return '⭐';
      default: return '❓';
    }
  };

  const getHealthColor = (percent: number) => {
    if (percent > 0.6) return GREEN;
    if (percent > 0.3) return ORANGE;
    return RED;
  };

  const getCategoryName = (category: string) => {
    const categoryNames: Record<string, string> = {
      generalKnowledge: i18n.language === 'th' ? 'ความรู้ทั่วไป' : 'General Knowledge',
      thaiLanguage: i18n.language === 'th' ? 'ภาษาไทย' : 'Thai Language',
      mathematics: i18n.language === 'th' ? 'คณิตศาสตร์' : 'Mathematics',
      science: i18n.language === 'th' ? 'วิทยาศาสตร์' : 'Science',
      socialStudies: i18n.language === 'th' ? 'สังคมศึกษา' : 'Social Studies',
      english: i18n.language === 'th' ? 'ภาษาอังกฤษ' : 'English',
    };
    return categoryNames[category] || category;
  };

  const getCategoryColor = (category: string) => {
    const categoryColors: Record<string, string> = {
      generalKnowledge: BLUE,
      thaiLanguage: PURPLE,
      mathematics: ORANGE,
      science: GREEN,
      socialStudies: GOLD,
      english: RED,
    };
    return categoryColors[category] || PURPLE;
  };

  useEffect(() => {
    if (level && battleState.currentQuestionIndex < level.questionCount) {
      const availableQuestions = quizQuestions.filter(
        q => q.difficulty === level.difficulty || level.difficulty === 'boss'
      );
      const randomIndex = Math.floor(Math.random() * availableQuestions.length);
      const newQuestion = availableQuestions[randomIndex];

      setSelectedAnswer(null);
      setShowResult(false);
      setIsCorrect(false);
      setQuestionKey(prev => prev + 1);
      setCurrentQuestion(newQuestion);
    } else if (battleState.currentQuestionIndex >= level!.questionCount) {
      handleEndOfLevel();
    }
  }, [battleState.currentQuestionIndex]);

  useEffect(() => {
    setTimeLeft(questionTimeLimit);
  }, [questionKey]);

  useEffect(() => {
    if (showResult) return;
    if (timeLeft <= 0) {
      handleTimeUp();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, showResult, questionKey]);

  const handleEndOfLevel = () => {
    const enemyDefeated = battleState.enemyHealth <= 0;
    const questionCount = level!.questionCount;
    const correctRatio = questionCount > 0 ? battleState.correctAnswers / questionCount : 0;
    const passedByScore = correctRatio > 0.5;

    const resultType: 'victory' | 'partial' | 'defeat' = enemyDefeated
      ? 'victory'
      : passedByScore
      ? 'partial'
      : 'defeat';

    const rewardMultiplier = resultType === 'partial' ? 0.5 : 1;
    endBattle(resultType !== 'defeat', rewardMultiplier);

    const earnedCoins = Math.round(level!.rewardCoins * rewardMultiplier);
    const earnedExp = Math.round(level!.rewardExp * rewardMultiplier);

    const titles: Record<typeof resultType, string> = {
      victory: 'ชนะ!',
      partial: 'ผ่านแบบพอตัว',
      defeat: 'พ่ายแพ้',
    };

    const messages: Record<typeof resultType, string> = {
      victory: `เหรียญ ${earnedCoins} ประสบการณ์ ${earnedExp}!`,
      partial: `ตอบถูก ${battleState.correctAnswers}/${questionCount} ข้อ ได้รางวัลครึ่งหนึ่ง: เหรียญ ${earnedCoins} ประสบการณ์ ${earnedExp}`,
      defeat: 'ลองใหม่อีกครั้ง',
    };

    Alert.alert(
      titles[resultType],
      messages[resultType],
      [
        {
          text: resultType === 'defeat' ? 'ลองใหม่' : 'เล่นต่อ',
          onPress: () => navigation.navigate('LevelMap'),
        },
      ]
    );
  };

  const handleTimeUp = () => {
    handleAnswer(-1);
  };

  const handleCancelPress = () => {
    Alert.alert(
      'ยกเลิกการต่อสู้?',
      'ความคืบหน้าในด่านนี้จะไม่ถูกบันทึก',
      [
        { text: 'เล่นต่อ', style: 'cancel' },
        {
          text: 'ยกเลิก',
          style: 'destructive',
          onPress: () => {
            endBattle(false);
            navigation.navigate('LevelMap');
          },
        },
      ]
    );
  };

  const handleAnswer = (answerIndex: number) => {
    if (!currentQuestion || showResult) return;

    const correct = answerIndex === currentQuestion.correctAnswer;

    setSelectedAnswer(answerIndex);
    setIsCorrect(correct);
    setShowResult(true);

    resultOpacity.setValue(0);
    Animated.timing(resultOpacity, {
      toValue: 1,
      duration: 180,
      useNativeDriver: Platform.OS !== 'web',
    }).start();

    if (correct) {
      const baseDamage = playerCharacter?.baseStats.attack
        ? playerCharacter.baseStats.attack * (1 + comboCount * 0.1)
        : 10;
      const damage = Math.floor(baseDamage * (1 + Math.random() * 0.2));

      setDamageValue(damage);
      setShowDamage(true);
      setComboCount(prev => prev + 1);

      if (comboCount > 1) {
        setShowCombo(true);
        Animated.sequence([
          Animated.timing(comboScale, { toValue: 1.4, duration: 180, useNativeDriver: Platform.OS !== 'web' }),
          Animated.timing(comboScale, { toValue: 1, duration: 180, useNativeDriver: Platform.OS !== 'web' }),
        ]).start(() => setShowCombo(false));
      }

      Animated.sequence([
        Animated.timing(playerScale, { toValue: 1.25, duration: 140, useNativeDriver: Platform.OS !== 'web' }),
        Animated.timing(playerScale, { toValue: 1, duration: 140, useNativeDriver: Platform.OS !== 'web' }),
      ]).start(() => {
        Animated.sequence([
          Animated.timing(enemyScale, { toValue: 0.85, duration: 100, useNativeDriver: Platform.OS !== 'web' }),
          Animated.timing(enemyScale, { toValue: 1, duration: 100, useNativeDriver: Platform.OS !== 'web' }),
        ]).start();
        setTimeout(() => setShowDamage(false), 900);
      });
    } else {
      setComboCount(0);

      Animated.sequence([
        Animated.timing(enemyScale, { toValue: 1.15, duration: 140, useNativeDriver: Platform.OS !== 'web' }),
        Animated.timing(enemyScale, { toValue: 1, duration: 140, useNativeDriver: Platform.OS !== 'web' }),
      ]).start(() => {
        Animated.sequence([
          Animated.timing(shakeAnim, { toValue: 8, duration: 90, useNativeDriver: Platform.OS !== 'web' }),
          Animated.timing(shakeAnim, { toValue: -8, duration: 90, useNativeDriver: Platform.OS !== 'web' }),
          Animated.timing(shakeAnim, { toValue: 0, duration: 90, useNativeDriver: Platform.OS !== 'web' }),
        ]).start();
      });
    }

    answerQuestion(correct);

    setTimeout(() => {
      setShowResult(false);
      setSelectedAnswer(null);
    }, 1500);
  };

  if (!level || !playerCharacter || !enemyCharacter) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>กำลังโหลด...</Text>
      </View>
    );
  }

  const playerCharLevel = player.characterLevels[player.selectedCharacterId] || 1;
  const playerMaxHealth = playerCharacter.baseStats.health * (1 + playerCharLevel * 0.1);
  const playerHealthPercent = battleState.playerHealth / playerMaxHealth;
  const enemyHealthPercent = battleState.enemyHealth / enemyCharacter.baseStats.health;
  const wrongCount = battleState.correctAnswers === 0
    ? level.questionCount
    : level.questionCount - battleState.correctAnswers;

  return (
    <View style={styles.container}>
      {showCombo && comboCount > 1 && (
        <Animated.View style={[styles.comboDisplay, { transform: [{ scale: comboScale }] }]}>
          <View style={styles.comboBadge}>
            <Text style={styles.comboText}>{comboCount}X COMBO</Text>
          </View>
        </Animated.View>
      )}

      {showDamage && (
        <View style={styles.damageDisplay}>
          <Text style={styles.damageNumber}>-{damageValue}</Text>
        </View>
      )}

      {showResult && (
        <Animated.View style={[styles.resultOverlay, { opacity: resultOpacity }]}>
          <View style={[styles.resultCard, { backgroundColor: isCorrect ? GREEN : RED }]}>
            <Text style={styles.resultTitle}>{isCorrect ? 'CORRECT' : 'WRONG'}</Text>
          </View>
        </Animated.View>
      )}

      <View style={styles.header}>
        <View style={styles.headerLeftGroup}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancelPress} activeOpacity={0.8}>
            <Text style={styles.cancelIcon}>✕</Text>
          </TouchableOpacity>
          <View style={[styles.chip, timeLeft < 10 && styles.chipDanger]}>
            <Text style={[styles.chipValue, { color: timeLeft < 10 ? WHITE : GREEN }]}>
              {timeLeft}s
            </Text>
          </View>
        </View>

        <View style={styles.waveBadge}>
          <Text style={styles.waveLabel}>WAVE</Text>
          <Text style={styles.waveNumber}>
            {Math.min(battleState.currentQuestionIndex + 1, level.questionCount)}
            <Text style={styles.waveTotal}>/{level.questionCount}</Text>
          </Text>
        </View>

        <View style={styles.chip}>
          <Text style={[styles.chipValue, { color: ORANGE }]}>{playerCharacter.baseStats.attack} ATK</Text>
        </View>
      </View>

      <View style={styles.arena}>
        <View style={styles.fighter}>
          <Text style={styles.nameLeft} numberOfLines={1}>
            {i18n.language === 'th' ? playerCharacter.name_th : playerCharacter.name_en}
          </Text>
          <Text style={styles.levelTag}>LV.{playerCharLevel}</Text>

          <Animated.View style={[styles.avatarFrame, { borderColor: PURPLE, transform: [{ scale: playerScale }] }]}>
            <Text style={styles.avatarEmoji}>{getTypeIcon(playerCharacter.type)}</Text>
          </Animated.View>

          <View style={styles.healthBg}>
            <View style={[styles.healthFill, { width: `${Math.max(0, playerHealthPercent * 100)}%`, backgroundColor: getHealthColor(playerHealthPercent) }]} />
          </View>
          <Text style={styles.healthLabel}>{Math.floor(battleState.playerHealth)}/{Math.floor(playerMaxHealth)}</Text>
        </View>

        <View style={styles.vsCircle}>
          <Text style={styles.vsText}>VS</Text>
        </View>

        <Animated.View style={[styles.fighter, { transform: [{ translateX: shakeAnim }] }]}>
          <Text style={styles.nameRight} numberOfLines={1}>
            {i18n.language === 'th' ? enemyCharacter.name_th : enemyCharacter.name_en}
          </Text>
          <Text style={[styles.levelTag, { color: getRarityColor(enemyCharacter.rarity) }]}>
            {enemyCharacter.rarity.toUpperCase()}
          </Text>

          <Animated.View style={[styles.avatarFrame, { borderColor: RED, transform: [{ scale: enemyScale }] }]}>
            <Text style={styles.avatarEmoji}>{getTypeIcon(enemyCharacter.type)}</Text>
          </Animated.View>

          <View style={styles.healthBg}>
            <View style={[styles.healthFill, { width: `${Math.max(0, enemyHealthPercent * 100)}%`, backgroundColor: getHealthColor(enemyHealthPercent) }]} />
          </View>
          <Text style={styles.healthLabel}>{battleState.enemyHealth}/{enemyCharacter.baseStats.health}</Text>
        </Animated.View>
      </View>

      <View style={styles.questionCard}>
        <View style={styles.questionTopRow}>
          <View style={[styles.categoryPill, { backgroundColor: currentQuestion ? getCategoryColor(currentQuestion.category) : PURPLE }]}>
            <Text style={styles.categoryPillText}>
              {currentQuestion ? getCategoryName(currentQuestion.category) : ''}
            </Text>
          </View>
          <Text style={styles.difficultyText}>
            {currentQuestion?.difficulty === 'hard' ? 'HARD' : currentQuestion?.difficulty === 'medium' ? 'MEDIUM' : 'EASY'}
          </Text>
        </View>
        <Text style={styles.questionText} numberOfLines={3}>
          {currentQuestion && (i18n.language === 'th' ? currentQuestion.question_th : currentQuestion.question_en)}
        </Text>
      </View>

      <View style={styles.answersGrid}>
        {currentQuestion && currentQuestion.options_th.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrectAnswer = showResult && index === currentQuestion.correctAnswer;
          const isWrong = showResult && isSelected && !isCorrectAnswer;

          let bg = PANEL_RAISED;
          let letterBg = '#262834';
          if (showResult && isCorrectAnswer) { bg = GREEN; letterBg = GREEN_DARK; }
          else if (showResult && isWrong) { bg = RED; letterBg = RED_DARK; }
          else if (isSelected) { bg = PURPLE; letterBg = PURPLE_LIGHT; }

          return (
            <TouchableOpacity
              key={`${questionKey}-answer-${index}`}
              style={[
                styles.answerButton,
                {
                  backgroundColor: bg,
                  borderColor: isCorrectAnswer ? GREEN : isWrong ? RED : isSelected ? PURPLE : LINE,
                },
              ]}
              onPress={() => handleAnswer(index)}
              disabled={showResult}
              activeOpacity={0.85}
            >
              <View style={[styles.answerLetter, { backgroundColor: letterBg }]}>
                <Text style={styles.letterText}>{String.fromCharCode(65 + index)}</Text>
              </View>
              <Text
                style={[styles.answerText, (isCorrectAnswer || isWrong || isSelected) && styles.answerTextOnFill]}
                numberOfLines={3}
              >
                {i18n.language === 'th' ? currentQuestion.options_th[index] : currentQuestion.options_en[index]}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <Text style={styles.footerLabel}>CORRECT</Text>
          <Text style={[styles.footerValue, { color: GREEN }]}>{battleState.correctAnswers}</Text>
        </View>
        <View style={styles.footerDivider} />
        <View style={styles.footerItem}>
          <Text style={styles.footerLabel}>WRONG</Text>
          <Text style={[styles.footerValue, { color: RED }]}>{wrongCount}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
  },
  loadingText: {
    color: WHITE,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  comboDisplay: {
    position: 'absolute',
    top: height * 0.32,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 100,
  },
  comboBadge: {
    backgroundColor: RED,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  comboText: {
    fontSize: 20,
    fontWeight: '900',
    color: WHITE,
    letterSpacing: 1.5,
  },
  damageDisplay: {
    position: 'absolute',
    top: height * 0.28,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 99,
  },
  damageNumber: {
    fontSize: 48,
    fontWeight: '900',
    color: RED,
  },
  resultOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 200,
  },
  resultCard: {
    borderRadius: 24,
    paddingVertical: 18,
    paddingHorizontal: 40,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: INK,
    letterSpacing: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  headerLeftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cancelButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: PANEL_RAISED,
    borderWidth: 1,
    borderColor: LINE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelIcon: {
    color: MUTED_LIGHT,
    fontSize: 16,
    fontWeight: '900',
  },
  chip: {
    backgroundColor: PANEL_RAISED,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 8,
    minWidth: 64,
    alignItems: 'center',
  },
  chipDanger: {
    backgroundColor: RED,
  },
  chipValue: {
    fontSize: 15,
    fontWeight: '900',
  },
  waveBadge: {
    alignItems: 'center',
    backgroundColor: PANEL_RAISED,
    borderRadius: 16,
    paddingHorizontal: 22,
    paddingVertical: 6,
  },
  waveLabel: {
    fontSize: 10,
    color: PURPLE_LIGHT,
    fontWeight: '900',
    letterSpacing: 2,
  },
  waveNumber: {
    fontSize: 22,
    fontWeight: '900',
    color: WHITE,
  },
  waveTotal: {
    fontSize: 14,
    color: MUTED_LIGHT,
  },
  arena: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: PANEL,
    marginHorizontal: 16,
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: LINE,
  },
  fighter: {
    flex: 1,
    alignItems: 'center',
  },
  nameLeft: {
    color: PURPLE_LIGHT,
    fontSize: 13,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  nameRight: {
    color: RED,
    fontSize: 13,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  levelTag: {
    color: MUTED,
    fontSize: 10,
    fontWeight: '800',
    marginTop: 2,
    marginBottom: 8,
  },
  avatarFrame: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 3,
    backgroundColor: PANEL_RAISED,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  avatarEmoji: {
    fontSize: 38,
  },
  healthBg: {
    width: '100%',
    height: 10,
    backgroundColor: '#232530',
    borderRadius: 6,
    overflow: 'hidden',
  },
  healthFill: {
    height: '100%',
    borderRadius: 6,
  },
  healthLabel: {
    color: MUTED_LIGHT,
    fontSize: 11,
    fontWeight: '800',
    marginTop: 6,
  },
  vsCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: GOLD,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginHorizontal: 8,
  },
  vsText: {
    color: INK,
    fontSize: 13,
    fontWeight: '900',
  },
  questionCard: {
    backgroundColor: PANEL,
    marginHorizontal: 16,
    marginTop: 14,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: LINE,
  },
  questionTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryPill: {
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  categoryPillText: {
    color: INK,
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  difficultyText: {
    color: MUTED_LIGHT,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
  },
  questionText: {
    color: WHITE,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
  },
  answersGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 14,
  },
  answerButton: {
    width: (width - 32 - 12) / 2,
    minHeight: 84,
    borderRadius: 18,
    borderWidth: 2,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  answerLetter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  letterText: {
    color: WHITE,
    fontSize: 15,
    fontWeight: '900',
  },
  answerText: {
    flex: 1,
    color: '#C7CBD4',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
  },
  answerTextOnFill: {
    color: WHITE,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    paddingBottom: Platform.OS === 'ios' ? 24 : 14,
    borderTopWidth: 1,
    borderTopColor: LINE,
  },
  footerItem: {
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  footerDivider: {
    width: 1,
    height: 30,
    backgroundColor: LINE,
  },
  footerLabel: {
    color: MUTED_LIGHT,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  footerValue: {
    fontSize: 20,
    fontWeight: '900',
  },
});

export default BattleScreen;