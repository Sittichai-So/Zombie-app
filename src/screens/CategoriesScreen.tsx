import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  TouchableOpacity,
  Animated,
  PanResponder,
  LayoutAnimation,
  UIManager,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useGame } from '../context/GameContext';
import type { RootStackParamList } from '../navigation/AppNavigator';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width: SCREEN_W } = Dimensions.get('window');

// ---- Design tokens -------------------------------------------------------
const BG = '#000000';
const SURFACE = '#111214';
const WHITE = '#FFFFFF';
const MUTED = '#9AA0AC';
const INK = '#000000';
const SWIPE_THRESHOLD = 70;

interface ExamCategory {
  id: string;
  title: string;
  titleEN: string;
  icon: string;
  description: string;
  questionCount: number;
  passingScore: number;
  color: string;
  onColor: string;
  dotColor: string;
  topics: string[];
}

const EXAM_CATEGORIES: ExamCategory[] = [
  {
    id: 'analytical',
    title: 'ความสามารถในการคิดวิเคราะห์',
    titleEN: 'Analytical & Critical Thinking',
    icon: '🧠',
    description: 'วัดการคิดคำนวณและภาษาไทย',
    questionCount: 50,
    passingScore: 60,
    color: '#7C6CF0',
    onColor: WHITE,
    dotColor: '#FF6B6B',
    topics: ['อนุกรม', 'คณิตศาสตร์', 'ตรรกะ', 'เงื่อนไขสัญลักษณ์', 'อุปมาอุปไมย'],
  },
  {
    id: 'english',
    title: 'ภาษาอังกฤษ',
    titleEN: 'English Language',
    icon: '🌐',
    description: 'วัดแกรมม่า คำศัพท์ บทสนทนา และการอ่าน',
    questionCount: 25,
    passingScore: 60,
    color: '#3EC6E0',
    onColor: INK,
    dotColor: '#0A5C6E',
    topics: ['Grammar', 'Vocabulary', 'Conversation', 'Reading'],
  },
  {
    id: 'ethics',
    title: 'ความรู้และลักษณะการเป็นข้าราชการที่ดี',
    titleEN: 'Ethics & Public Service Knowledge',
    icon: '⚖️',
    description: 'วัดความรู้ด้านกฎหมาย กฎระเบียบ และจริยธรรม',
    questionCount: 25,
    passingScore: 60,
    color: '#FFC94D',
    onColor: INK,
    dotColor: '#B4460A',
    topics: ['กฎหมาย', 'ระเบียบ', 'จริยธรรม', 'จรรยาบรรณ'],
  },
];

type NavigationProp = StackNavigationProp<RootStackParamList>;

const CategoriesScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { player } = useGame();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const translateX = useRef(new Animated.Value(0)).current;
  const cardOpacity = useRef(new Animated.Value(1)).current;

  const handleStart = (categoryId: string) => {
    navigation.navigate('LevelMap', { categoryId });
  };

  const getTotalProgress = () => {
    const totalQuestions = EXAM_CATEGORIES.reduce((sum, cat) => sum + cat.questionCount, 0);
    const completedQuestions = player.completedLevels?.length || 0;
    return Math.round((completedQuestions / totalQuestions) * 100);
  };

  const animateTo = (nextIndex: number) => {
    if (nextIndex === selectedIndex) return;
    const direction = nextIndex > selectedIndex ? 1 : -1;

    Animated.parallel([
      Animated.timing(translateX, {
        toValue: direction * -SCREEN_W * 0.6,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(cardOpacity, {
        toValue: 0,
        duration: 160,
        useNativeDriver: true,
      }),
    ]).start(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setSelectedIndex(nextIndex);
      translateX.setValue(direction * SCREEN_W * 0.6);
      Animated.parallel([
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
          friction: 9,
          tension: 60,
        }),
        Animated.timing(cardOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const goNext = () => animateTo((selectedIndex + 1) % EXAM_CATEGORIES.length);
  const goPrev = () => animateTo((selectedIndex - 1 + EXAM_CATEGORIES.length) % EXAM_CATEGORIES.length);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_evt, gesture) =>
        Math.abs(gesture.dx) > 12 && Math.abs(gesture.dx) > Math.abs(gesture.dy),
      onPanResponderMove: (_evt, gesture) => {
        translateX.setValue(gesture.dx);
      },
      onPanResponderRelease: (_evt, gesture) => {
        if (gesture.dx <= -SWIPE_THRESHOLD) {
          goNext();
        } else if (gesture.dx >= SWIPE_THRESHOLD) {
          goPrev();
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
            friction: 9,
          }).start();
        }
      },
    })
  ).current;

  const current = EXAM_CATEGORIES[selectedIndex];
  const others = EXAM_CATEGORIES.filter((_, i) => i !== selectedIndex);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.mainTitle}>ข้อสอบ ก.พ.</Text>
        <View style={styles.progressPill}>
          <Text style={styles.progressPillText}>{getTotalProgress()}%</Text>
        </View>
      </View>
      <Text style={styles.subtitle}>ปัดหรือแตะแท็บเพื่อเปลี่ยนหมวดหมู่</Text>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Collapsed tabs — tap to bring to front */}
        <View style={styles.tabStack}>
          {others.map((cat, idx) => (
            <TouchableOpacity
              key={cat.id}
              activeOpacity={0.85}
              onPress={() => animateTo(EXAM_CATEGORIES.findIndex((c) => c.id === cat.id))}
              style={[
                styles.tabPill,
                {
                  backgroundColor: cat.color,
                  zIndex: idx + 1,
                  marginTop: idx === 0 ? 0 : -20,
                },
              ]}
            >
              <Text style={[styles.tabPillText, { color: cat.onColor }]} numberOfLines={1}>
                {cat.titleEN.toUpperCase()}
              </Text>
              <Text style={[styles.tabPillHint, { color: cat.onColor }]}>แตะเพื่อดู</Text>
            </TouchableOpacity>
          ))}

          {/* Front card — swipeable */}
          <Animated.View
            {...panResponder.panHandlers}
            style={[
              styles.expandedCard,
              {
                backgroundColor: current.color,
                marginTop: others.length ? -20 : 0,
                transform: [{ translateX }],
                opacity: cardOpacity,
              },
            ]}
          >
            <View style={styles.cardTopRow}>
              <View style={styles.cardTitleBlock}>
                <Text style={[styles.categoryTitleEN, { color: current.onColor }]}>{current.titleEN}</Text>
                <Text style={[styles.categoryTitle, { color: current.onColor }]}>{current.title}</Text>
              </View>
              <TouchableOpacity style={styles.expandButton} onPress={() => handleStart(current.id)}>
                <Text style={styles.expandButtonText}>↗</Text>
              </TouchableOpacity>
            </View>

            <Text style={[styles.categoryDescription, { color: current.onColor }]}>{current.description}</Text>

            <View style={styles.statPillRow}>
              <View style={styles.statPill}>
                <View style={[styles.statDot, { backgroundColor: current.dotColor }]} />
                <Text style={styles.statPillText}>{current.questionCount} ข้อ</Text>
              </View>
              <View style={styles.statPill}>
                <View style={[styles.statDot, { backgroundColor: current.dotColor }]} />
                <Text style={styles.statPillText}>ผ่าน {current.passingScore}%</Text>
              </View>
            </View>

            <View style={styles.topicsList}>
              {current.topics.map((topic, index) => (
                <Text key={index} style={[styles.topicText, { color: current.onColor }]}>
                  {topic}
                  {index < current.topics.length - 1 ? '  ·  ' : ''}
                </Text>
              ))}
            </View>

            <View style={styles.cardIconBadge}>
              <Text style={styles.cardIconText}>{current.icon}</Text>
            </View>
          </Animated.View>

          {/* Side nudge buttons for discoverability */}
          <TouchableOpacity style={[styles.sideArrow, styles.sideArrowLeft]} onPress={goPrev}>
            <Text style={styles.sideArrowText}>‹</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.sideArrow, styles.sideArrowRight]} onPress={goNext}>
            <Text style={styles.sideArrowText}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Pagination dots */}
        <View style={styles.dotsRow}>
          {EXAM_CATEGORIES.map((cat, i) => (
            <TouchableOpacity key={cat.id} onPress={() => animateTo(i)} hitSlop={{ top: 8, bottom: 8, left: 6, right: 6 }}>
              <View
                style={[
                  styles.dot,
                  { backgroundColor: i === selectedIndex ? cat.color : '#2A2D35' },
                  i === selectedIndex && styles.dotActive,
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.startButton, { backgroundColor: current.color }]}
          onPress={() => handleStart(current.id)}
          activeOpacity={0.9}
        >
          <Text style={[styles.startButtonText, { color: current.onColor }]}>
            เริ่มทำข้อสอบ!!
          </Text>
        </TouchableOpacity>

        <View style={styles.infoCard}>
          <View style={styles.infoIconBadge}>
            <Text style={styles.infoIcon}>ℹ️</Text>
          </View>
          <View style={styles.infoTexts}>
            <Text style={styles.infoTitle}>เกณฑ์การผ่าน</Text>
            <Text style={styles.infoDescription}>
              ผู้สมัครระดับปริญญาตรีต้องได้คะแนนรวมไม่ต่ำกว่า 60%{'\n'}
              ระดับปริญญาโทต้องได้คะแนนไม่ต่ำกว่า 65%
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'web' ? 40 : 56,
    paddingHorizontal: 20,
    gap: 14,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: '900',
    color: INK,
  },
  mainTitle: {
    flex: 1,
    fontSize: 24,
    fontWeight: '900',
    color: WHITE,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  progressPill: {
    backgroundColor: SURFACE,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  progressPillText: {
    color: WHITE,
    fontSize: 11,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 12,
    color: MUTED,
    fontWeight: '600',
    paddingHorizontal: 20,
    paddingLeft: 74,
    marginTop: 2,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 16,
    paddingBottom: 100,
  },
  tabStack: {
    position: 'relative',
  },
  tabPill: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabPillText: {
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.4,
  },
  tabPillHint: {
    fontSize: 10,
    fontWeight: '700',
    opacity: 0.7,
  },
  expandedCard: {
    borderRadius: 28,
    padding: 22,
    paddingBottom: 26,
    position: 'relative',
    overflow: 'hidden',
    zIndex: 10,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardTitleBlock: {
    flex: 1,
    paddingRight: 60,
  },
  categoryTitleEN: {
    fontSize: 11,
    fontWeight: '800',
    opacity: 0.75,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 26,
  },
  expandButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: INK,
    justifyContent: 'center',
    alignItems: 'center',
  },
  expandButtonText: {
    color: WHITE,
    fontSize: 18,
    fontWeight: '900',
  },
  categoryDescription: {
    fontSize: 13,
    fontWeight: '600',
    opacity: 0.85,
    marginBottom: 16,
  },
  statPillRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  statPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
    gap: 7,
  },
  statDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  statPillText: {
    fontSize: 12,
    fontWeight: '800',
    color: INK,
  },
  topicsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  topicText: {
    fontSize: 11.5,
    fontWeight: '700',
    opacity: 0.8,
  },
  cardIconBadge: {
    position: 'absolute',
    right: -10,
    bottom: -14,
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: 'rgba(0,0,0,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardIconText: {
    fontSize: 42,
  },
  sideArrow: {
    position: 'absolute',
    top: '58%',
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  sideArrowLeft: {
    left: -6,
  },
  sideArrowRight: {
    right: -6,
  },
  sideArrowText: {
    fontSize: 20,
    fontWeight: '900',
    color: INK,
    marginTop: -2,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 18,
    marginBottom: 18,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    width: 22,
  },
  startButton: {
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 18,
  },
  startButtonText: {
    fontSize: 15,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  infoCard: {
    backgroundColor: SURFACE,
    borderRadius: 24,
    padding: 18,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  infoIconBadge: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#FFC94D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoIcon: {
    fontSize: 24,
  },
  infoTexts: {
    flex: 1,
    gap: 4,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: WHITE,
    textTransform: 'uppercase',
  },
  infoDescription: {
    fontSize: 12,
    color: MUTED,
    lineHeight: 18,
    fontWeight: '600',
  },
});

export default CategoriesScreen;