import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useGame } from '../context/GameContext';
import { getCharacterById } from '../data/characters';
import { levels } from '../data/levels';
import Mascot from '../components/Mascot';
import Card from '../components/Card';
import Button from '../components/Button';

const { width } = Dimensions.get('window');
import { quizQuestions, Question } from '../data/quizQuestions';
import i18n from '@/i18n';

const BattleScreen: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { levelId } = route.params || {};
  
  const { 
    currentLevel, 
    battleState, 
    answerQuestion, 
    endBattle,
    player 
  } = useGame();

  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  // Combat animations
  const [playerAttacking, setPlayerAttacking] = useState(false);
  const [enemyAttacking, setEnemyAttacking] = useState(false);
  const [showDamage, setShowDamage] = useState(false);
  const [damageValue, setDamageValue] = useState(0);
  const [comboCount, setComboCount] = useState(0);
  const [showCombo, setShowCombo] = useState(false);
  
  // Animation values
  const playerScale = useState(new Animated.Value(1))[0];
  const enemyScale = useState(new Animated.Value(1))[0];
  const shakeAnim = useState(new Animated.Value(0))[0];
  const comboScale = useState(new Animated.Value(0))[0];

  const level = currentLevel || levels.find(l => l.id === levelId);
  const playerCharacter = getCharacterById(player.selectedCharacterId);
  const enemyCharacter = level ? getCharacterById(level.enemyCharacterId) : null;

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return '#f39c12';
      case 'epic': return '#9b59b6';
      case 'rare': return '#3498db';
      case 'common': return '#95a5a6';
      default: return '#95a5a6';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'zombie': return '🧟';
      case 'human': return '👤';
      case 'special': return '⭐';
      default: return '❓';
    }
  };

  useEffect(() => {
    if (level && battleState.currentQuestionIndex < level.questionCount) {
      // Get random question based on level difficulty
      const availableQuestions = quizQuestions.filter(
        q => q.difficulty === level.difficulty || level.difficulty === 'boss'
      );
      const randomIndex = Math.floor(Math.random() * availableQuestions.length);
      setCurrentQuestion(availableQuestions[randomIndex]);
    } else if (battleState.currentQuestionIndex >= level!.questionCount) {
      // End of level
      handleEndOfLevel();
    }
  }, [battleState.currentQuestionIndex]);

  // Timer countdown
  useEffect(() => {
    if (battleState.timeRemaining <= 0) {
      handleTimeUp();
      return;
    }

    const timer = setInterval(() => {
      // Update battle state time - this would need to be in GameContext
      // For now, we'll just track locally
    }, 1000);

    return () => clearInterval(timer);
  }, [battleState.timeRemaining]);

  const handleEndOfLevel = () => {
    const victory = battleState.enemyHealth <= 0;
    endBattle(victory);
    
    Alert.alert(
      victory ? 'ชัยชนะ!' : 'พ่ายแพ้',
      victory 
        ? `เหรียญ ${level!.rewardCoins} ประสบการณ์ ${level!.rewardExp}!`
        : 'ลองใหม่อีกครั้ง',
      [
        {
          text: victory ? 'เล่นต่อ' : 'ลองใหม่',
          onPress: () => navigation.navigate('LevelMap'),
        },
      ]
    );
  };

  const handleTimeUp = () => {
    // Time's up, treat as wrong answer
    handleAnswer(-1);
  };

  const handleAnswer = (answerIndex: number) => {
    if (!currentQuestion || showResult) return;

    setSelectedAnswer(answerIndex);
    const correct = answerIndex === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      // Calculate damage with combo bonus
      const baseDamage = playerCharacter?.baseStats.attack ? playerCharacter.baseStats.attack * (1 + comboCount * 0.1) : 10;
      const damage = Math.floor(baseDamage * (1 + Math.random() * 0.2));
      
      setDamageValue(damage);
      setShowDamage(true);
      setComboCount(prev => prev + 1);
      
      // Show combo animation
      if (comboCount > 1) {
        setShowCombo(true);
        Animated.sequence([
          Animated.timing(comboScale, {
            toValue: 1.5,
            duration: 200,
            useNativeDriver: Platform.OS !== 'web',
          }),
          Animated.timing(comboScale, {
            toValue: 1,
            duration: 200,
            useNativeDriver: Platform.OS !== 'web',
          }),
        ]).start(() => setShowCombo(false));
      }
      
      // Player attack animation
      setPlayerAttacking(true);
      Animated.sequence([
        Animated.timing(playerScale, {
          toValue: 1.3,
          duration: 150,
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.timing(playerScale, {
          toValue: 1,
          duration: 150,
          useNativeDriver: Platform.OS !== 'web',
        }),
      ]).start(() => {
        setPlayerAttacking(false);
        
        // Enemy shake animation (taking damage)
        Animated.sequence([
          Animated.timing(enemyScale, {
            toValue: 0.8,
            duration: 100,
            useNativeDriver: Platform.OS !== 'web',
          }),
          Animated.timing(enemyScale, {
            toValue: 1,
            duration: 100,
            useNativeDriver: Platform.OS !== 'web',
          }),
        ]).start();
        
        setTimeout(() => setShowDamage(false), 1000);
      });
    } else {
      // Wrong answer - enemy attacks
      setComboCount(0); // Reset combo
      setEnemyAttacking(true);
      
      // Enemy attack animation
      Animated.sequence([
        Animated.timing(enemyScale, {
          toValue: 1.2,
          duration: 150,
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.timing(enemyScale, {
          toValue: 1,
          duration: 150,
          useNativeDriver: Platform.OS !== 'web',
        }),
      ]).start(() => {
        setEnemyAttacking(false);
        
        // Player shake animation (taking damage)
        Animated.sequence([
          Animated.timing(shakeAnim, {
            toValue: 10,
            duration: 100,
            useNativeDriver: Platform.OS !== 'web',
          }),
          Animated.timing(shakeAnim, {
            toValue: -10,
            duration: 100,
            useNativeDriver: Platform.OS !== 'web',
          }),
          Animated.timing(shakeAnim, {
            toValue: 0,
            duration: 100,
            useNativeDriver: Platform.OS !== 'web',
          }),
        ]).start();
      });
    }

    // Update battle state
    answerQuestion(correct);

    // Show result for 2 seconds then move to next question
    setTimeout(() => {
      setShowResult(false);
      setSelectedAnswer(null);
    }, 2000);
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

  return (
    <View style={styles.container}>
      {/* Combo Display */}
      {showCombo && comboCount > 1 && (
        <Animated.View style={[
          styles.comboDisplay,
          { transform: [{ scale: comboScale }] }
        ]}>
          <Text style={styles.comboText}>🔥 {comboCount}x COMBO!</Text>
        </Animated.View>
      )}

      {/* Damage Display */}
      {showDamage && (
        <View style={styles.damageDisplay}>
          <Text style={styles.damageNumber}>-{damageValue}</Text>
        </View>
      )}

      {/* Gradient Battle Header */}
      <LinearGradient
        colors={['rgba(233, 69, 96, 0.2)', 'rgba(22, 33, 62, 0.95)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.battleHeader}
      >
        <View style={styles.headerLeft}>
          <Card variant="danger" size="small">
            <View style={styles.timerBox}>
              <Text style={styles.timerIcon}>⏱️</Text>
              <Text style={[styles.timerText, { color: battleState.timeRemaining < 10 ? '#ff4757' : '#2ed573' }]}>
                {battleState.timeRemaining}s
              </Text>
            </View>
          </Card>
        </View>
        <View style={styles.headerCenter}>
          <View style={styles.questionCounter}>
            <Text style={styles.questionLabel}>WAVE</Text>
            <Text style={styles.questionNumber}>
              {battleState.currentQuestionIndex + 1}<Text style={styles.questionTotal}>/{level.questionCount}</Text>
            </Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <Card variant="danger" size="small">
            <View style={styles.damageIndicator}>
              <Text style={styles.damageIcon}>💀</Text>
              <Text style={styles.damageText}>{playerCharacter.baseStats.attack}</Text>
            </View>
          </Card>
        </View>
      </LinearGradient>

      {/* Battle Arena with Mascot */}
      <ScrollView 
        style={[styles.arenaScroll, Platform.OS === 'web' && { minHeight: '100%' }]} 
        showsVerticalScrollIndicator={true}
        contentContainerStyle={[styles.arenaScrollContent, { flexGrow: 1 }, Platform.OS === 'web' && { minHeight: '100%' }, Platform.OS === 'web' && { paddingBottom: 100 }]}
        nestedScrollEnabled={Platform.OS !== 'web'}
        bounces={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Mascot Battle Guidance */}
        <View style={styles.mascotBattleSection}>
          <Mascot 
            emotion={showCombo && comboCount > 2 ? "excited" : showDamage ? "happy" : battleState.playerHealth < playerMaxHealth * 0.3 ? "worried" : "thinking"}
            size="medium"
            message={showCombo && comboCount > 2 ? `🔥 ${comboCount}x COMBO!` : showDamage ? "โจมตี!" : battleState.playerHealth < playerMaxHealth * 0.3 ? "ระวัง!" : "สู้ๆ!"}
          />
        </View>

        <LinearGradient
          colors={['rgba(45, 27, 78, 0.9)', 'rgba(26, 26, 46, 0.85)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.arena}
        >
          {/* Player Side - Left */}
          <View style={styles.fighterLeft}>
            <View style={styles.playerInfo}>
              <Text style={styles.fighterNamePlayer}>
                {i18n.language === 'th' ? playerCharacter.name_th : playerCharacter.name_en}
              </Text>
              <Text style={styles.fighterLevel}>Lv.{playerCharLevel}</Text>
            </View>
            
            {/* Gradient Health Bar */}
            <View style={styles.healthBarWrapper}>
              <View style={styles.healthBarBg}>
                <LinearGradient
                  colors={
                    playerHealthPercent > 0.6 
                      ? ['#2ed573', '#7bed9f'] 
                      : playerHealthPercent > 0.3 
                      ? ['#ffa502', '#ff7f50'] 
                      : ['#ff4757', '#ff6b81']
                  }
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={[
                    styles.healthBarFill,
                    { 
                      width: `${Math.max(0, playerHealthPercent * 100)}%`,
                    }
                  ]}
                />
              </View>
              <View style={styles.healthStats}>
                <Text style={styles.healthDroplet}>🩸</Text>
                <Text style={styles.healthValue}>{Math.floor(battleState.playerHealth)}</Text>
                <Text style={styles.healthMax}>/{Math.floor(playerMaxHealth)}</Text>
              </View>
            </View>

            {/* Character Display */}
            <View style={[styles.characterFrame, styles.playerFrame]}>
              <View style={[styles.characterGlow, { backgroundColor: getRarityColor(playerCharacter.rarity) + '40' }]}>
                <Text style={styles.characterEmoji}>{getTypeIcon(playerCharacter.type)}</Text>
              </View>
              <View style={styles.rarityIndicator}>
                <Text style={styles.rarityDots}>
                  {playerCharacter.rarity === 'legendary' ? '👑💜💙💚' :
                   playerCharacter.rarity === 'epic' ? '💜💙💚' :
                   playerCharacter.rarity === 'rare' ? '💙💚' : '💚'}
                </Text>
              </View>
            </View>
          </View>

          {/* VS Badge */}
          <View style={styles.vsBadge}>
            <View style={styles.vsCircle}>
              <Text style={styles.vsText}>VS</Text>
            </View>
            <Text style={styles.vsIcon}>⚔️</Text>
          </View>

          {/* Enemy Side - Right */}
          <View style={styles.fighterRight}>
            <View style={styles.enemyInfo}>
              <Text style={styles.fighterNameEnemy}>
                {i18n.language === 'th' ? enemyCharacter.name_th : enemyCharacter.name_en}
              </Text>
              <Text style={styles.enemyRarity}>
                {enemyCharacter.rarity.toUpperCase()}
              </Text>
            </View>
            
            {/* Enemy Gradient Health Bar */}
            <View style={styles.healthBarWrapper}>
              <View style={styles.healthBarBg}>
                <LinearGradient
                  colors={
                    enemyHealthPercent > 0.6 
                      ? ['#2ed573', '#7bed9f'] 
                      : enemyHealthPercent > 0.3 
                      ? ['#ffa502', '#ff7f50'] 
                      : ['#ff4757', '#ff6b81']
                  }
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={[
                    styles.healthBarFill,
                    { 
                      width: `${Math.max(0, enemyHealthPercent * 100)}%`,
                    }
                  ]}
                />
              </View>
              <View style={styles.healthStats}>
                <Text style={styles.healthDroplet}>🩸</Text>
                <Text style={styles.healthValue}>{battleState.enemyHealth}</Text>
                <Text style={styles.healthMax}>/{enemyCharacter.baseStats.health}</Text>
              </View>
            </View>

            {/* Enemy Character Display */}
            <View style={[styles.characterFrame, styles.enemyFrame]}>
              <View style={[styles.characterGlow, { backgroundColor: getRarityColor(enemyCharacter.rarity) + '40' }]}>
                <Text style={styles.characterEmoji}>{getTypeIcon(enemyCharacter.type)}</Text>
              </View>
              <View style={styles.enemyHealthStatus}>
                {enemyHealthPercent <= 0.3 && <Text style={styles.criticalText}>⚠️ CRITICAL</Text>}
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Gradient Question Zone */}
        <View style={styles.questionZone}>
          <Card variant="primary">
            <View style={styles.questionPanel}>
              <View style={styles.questionHeader}>
                <LinearGradient
                  colors={
                    currentQuestion && currentQuestion.difficulty === 'hard' 
                      ? ['#ff6b35', '#ff8c42'] 
                      : currentQuestion && currentQuestion.difficulty === 'medium'
                      ? ['#ffa502', '#ffc048']
                      : ['#2ed573', '#7bed9f']
                  }
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.categoryBadge}
                >
                  <Text style={styles.categoryText}>{currentQuestion && currentQuestion.category}</Text>
                </LinearGradient>
                <Text style={styles.difficultyLabel}>
                  {currentQuestion && currentQuestion.difficulty === 'hard' ? '🔥 HARD' :
                   currentQuestion && currentQuestion.difficulty === 'medium' ? '⚡ MEDIUM' : '📚 EASY'}
                </Text>
              </View>
              
              <View style={styles.questionContent}>
                <Text style={styles.questionMark}>❓</Text>
                <Text style={styles.questionTextMain}>
                  {currentQuestion && (i18n.language === 'th' ? currentQuestion.question_th : currentQuestion.question_en)}
                </Text>
              </View>
            </View>
          </Card>

          {/* Gradient Answer Buttons */}
          <View style={styles.answersGrid}>
            {currentQuestion && currentQuestion.options_th.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = showResult && index === currentQuestion.correctAnswer;
              const isWrong = showResult && isSelected && index !== currentQuestion.correctAnswer;
              
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.answerButton,
                    isSelected && styles.answerSelected,
                    isCorrect && styles.answerCorrect,
                    isWrong && styles.answerWrong,
                  ]}
                  onPress={() => handleAnswer(index)}
                  disabled={showResult}
                  activeOpacity={0.7}
                >
                  <LinearGradient
                    colors={
                      isCorrect
                        ? ['#2ed573', '#7bed9f']
                        : isWrong
                        ? ['#ff4757', '#ff6b81']
                        : isSelected
                        ? ['#a55eea', '#8854d0']
                        : ['rgba(22, 33, 62, 0.9)', 'rgba(15, 52, 96, 0.8)']
                    }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.answerGradient}
                  >
                    <View style={styles.answerContent}>
                      <View style={[
                        styles.answerLetter,
                        isSelected && styles.answerLetterSelected,
                        isCorrect && styles.answerLetterCorrect,
                        isWrong && styles.answerLetterWrong,
                      ]}>
                        <Text style={styles.letterText}>
                          {String.fromCharCode(65 + index)}
                        </Text>
                      </View>
                      <Text style={[
                        styles.answerText,
                        isCorrect && styles.answerTextCorrect,
                      ]} numberOfLines={3}>
                        {i18n.language === 'th' 
                          ? currentQuestion && currentQuestion.options_th[index] 
                          : currentQuestion && currentQuestion.options_en[index]
                        }
                      </Text>
                    </View>
                    {isCorrect && <Text style={styles.correctIcon}>✅</Text>}
                    {isWrong && <Text style={styles.wrongIcon}>❌</Text>}
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Result Popup */}
          {showResult && (
            <Animated.View style={styles.resultPopupContainer}>
              <Card variant={isCorrect ? 'success' : 'danger'}>
                <View style={styles.resultContent}>
                  <Text style={styles.resultEmoji}>{isCorrect ? '🎯' : '💥'}</Text>
                  <Text style={[
                    styles.resultTitle,
                    { color: isCorrect ? '#2ed573' : '#ff4757' }
                  ]}>
                    {isCorrect ? 'CORRECT!' : 'WRONG!'}
                  </Text>
                  <Text style={styles.resultSubtitle}>
                    {isCorrect ? '+Damage to Enemy' : '-Damage Taken'}
                  </Text>
                </View>
              </Card>
            </Animated.View>
          )}
        </View>
      </ScrollView>

      {/* Gradient Battle Footer */}
      <LinearGradient
        colors={['rgba(22, 33, 62, 0.95)', 'rgba(15, 52, 96, 0.9)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.battleFooter}
      >
        <View style={styles.footerStats}>
          <View style={styles.statItem}>
            <Text style={styles.statIconLarge}>✅</Text>
            <Text style={styles.statLabel}>CORRECT</Text>
            <Text style={[styles.statValue, { color: '#2ed573' }]}>{battleState.correctAnswers}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statIconLarge}>❌</Text>
            <Text style={styles.statLabel}>WRONG</Text>
            <Text style={[styles.statValue, { color: '#ff4757' }]}>{level ? (battleState.correctAnswers === 0 ? level.questionCount : level.questionCount - battleState.correctAnswers) : 0}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statIconLarge}>⚡</Text>
            <Text style={styles.statLabel}>POWER</Text>
            <Text style={[styles.statValue, { color: '#ffa502' }]}>{playerCharacter ? playerCharacter.baseStats.attack : 0}</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  scrollView: {
    flex: 1,
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  // Combo Display
  comboDisplay: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 100,
  },
  comboText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ff6b6b',
    textShadowColor: '#e94560',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  // Damage Display
  damageDisplay: {
    position: 'absolute',
    top: '40%',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99,
  },
  damageNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ff0000',
    textShadowColor: '#ffffff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  // Gradient Header
  battleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#a55eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  headerLeft: {
    flex: 1,
  },
  headerCenter: {
    flex: 2,
    alignItems: 'center',
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  timerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  timerIcon: {
    fontSize: 18,
    marginRight: 6,
  },
  timerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e94560',
  },
  questionCounter: {
    alignItems: 'center',
  },
  questionLabel: {
    fontSize: 10,
    color: '#888888',
    letterSpacing: 2,
  },
  questionNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  questionTotal: {
    fontSize: 16,
    color: '#a0a0a0',
  },
  damageIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  damageIcon: {
    fontSize: 18,
    marginRight: 6,
  },
  damageText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e94560',
  },
  // Battle Arena
  arenaScroll: {
    flex: 1,
    width: '100%',
  },
  arenaScrollContent: {
    paddingBottom: 100,
  },
  mascotBattleSection: {
    padding: 15,
    alignItems: 'center',
  },
  arena: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
    minHeight: 280,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(168, 85, 247, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  fighterLeft: {
    flex: 1,
    alignItems: 'center',
  },
  fighterRight: {
    flex: 1,
    alignItems: 'center',
  },
  playerInfo: {
    alignItems: 'center',
    marginBottom: 10,
  },
  enemyInfo: {
    alignItems: 'center',
    marginBottom: 10,
  },
  fighterNamePlayer: {
    color: '#e94560',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 3,
  },
  fighterNameEnemy: {
    color: '#ff6b6b',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 3,
  },
  fighterLevel: {
    color: '#888888',
    fontSize: 11,
  },
  enemyRarity: {
    color: '#ff6600',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  // Gradient Health Bars
  healthBarWrapper: {
    width: '100%',
    marginBottom: 15,
  },
  healthBarBg: {
    height: 18,
    backgroundColor: 'rgba(15, 52, 96, 0.8)',
    borderRadius: 9,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(168, 85, 247, 0.4)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  healthBarFill: {
    height: '100%',
    borderRadius: 9,
  },
  healthStats: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },
  healthDroplet: {
    fontSize: 14,
    marginRight: 4,
  },
  healthValue: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  healthMax: {
    color: '#888888',
    fontSize: 14,
    marginLeft: 4,
  },
  // Character Frames
  characterFrame: {
    width: Math.min(width * 0.25, 120),
    height: Math.min(width * 0.25, 120),
    borderRadius: Math.min(width * 0.125, 60),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  playerFrame: {
    backgroundColor: 'rgba(168, 85, 247, 0.15)',
    borderWidth: 3,
    borderColor: '#a55eea',
    shadowColor: '#a55eea',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 10,
  },
  enemyFrame: {
    backgroundColor: 'rgba(255, 107, 107, 0.15)',
    borderWidth: 3,
    borderColor: '#ff6b81',
    shadowColor: '#ff6b81',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 10,
  },
  characterGlow: {
    width: Math.min(width * 0.18, 85),
    height: Math.min(width * 0.18, 85),
    borderRadius: Math.min(width * 0.09, 42),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  characterEmoji: {
    fontSize: Math.min(width * 0.13, 60),
  },
  rarityIndicator: {
    position: 'absolute',
    bottom: -10,
  },
  rarityDots: {
    fontSize: 14,
  },
  enemyHealthStatus: {
    position: 'absolute',
    top: -15,
  },
  criticalText: {
    fontSize: 10,
    color: '#ff0000',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  // VS Badge
  vsBadge: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  vsCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(168, 85, 247, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#a55eea',
    shadowColor: '#a55eea',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  vsText: {
    color: '#a55eea',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  vsIcon: {
    fontSize: 24,
    marginTop: 5,
  },
  // Question Zone
  questionZone: {
    padding: 15,
  },
  questionPanel: {
    padding: 20,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  categoryText: {
    color: '#000000',
    fontSize: 11,
    fontWeight: 'bold',
  },
  difficultyLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 1,
  },
  questionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  questionMark: {
    fontSize: 30,
    marginRight: 12,
  },
  questionTextMain: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
  },
  // Answer Grid
  answersGrid: {
    gap: 12,
  },
  answerButton: {
    borderRadius: 15,
    padding: 2,
    marginBottom: 12,
  },
  answerGradient: {
    borderRadius: 13,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  answerSelected: {
    borderColor: '#a55eea',
  },
  answerCorrect: {
    borderColor: '#2ed573',
  },
  answerWrong: {
    borderColor: '#ff4757',
  },
  answerContent: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  answerLetter: {
    width: 35,
    height: 35,
    borderRadius: 17,
    backgroundColor: 'rgba(168, 85, 247, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#a55eea',
  },
  answerLetterSelected: {
    borderColor: '#a55eea',
    backgroundColor: 'rgba(168, 85, 247, 0.4)',
  },
  answerLetterCorrect: {
    borderColor: '#2ed573',
    backgroundColor: '#2ed573',
  },
  answerLetterWrong: {
    borderColor: '#ff4757',
    backgroundColor: '#ff4757',
  },
  letterText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  answerText: {
    flex: 1,
    color: '#a0a0a0',
    fontSize: 14,
    lineHeight: 20,
  },
  answerTextCorrect: {
    color: '#2ecc71',
    fontWeight: 'bold',
  },
  correctIcon: {
    fontSize: 24,
    marginLeft: 10,
  },
  wrongIcon: {
    fontSize: 24,
    marginLeft: 10,
  },
  // Result Popup
  resultPopupContainer: {
    marginTop: 15,
  },
  resultContent: {
    alignItems: 'center',
  },
  resultEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  resultTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    letterSpacing: 2,
  },
  resultSubtitle: {
    fontSize: 14,
    color: '#a0a0a0',
  },
  // Battle Footer
  battleFooter: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  footerStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 2,
    height: 40,
    backgroundColor: '#0f3460',
    marginHorizontal: 10,
  },
  statIconLarge: {
    fontSize: 28,
    marginBottom: 5,
  },
  statLabel: {
    color: '#888888',
    fontSize: 10,
    letterSpacing: 1,
    marginBottom: 5,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default BattleScreen;
