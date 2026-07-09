import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Dimensions,
  Animated,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useGame } from '../context/GameContext';
import type { RootStackParamList } from '../navigation/AppNavigator';

const { width: SCREEN_W } = Dimensions.get('window');

const BG = '#0A0A0F';
const SURFACE = '#16171F';
const SURFACE_RAISED = '#1E202B';
const WHITE = '#FFFFFF';
const MUTED = '#9AA0AC';
const MUTED_LIGHT = '#6B7280';
const INK = '#000000';
const LINE = 'rgba(255,255,255,0.08)';

// ---- Carousel geometry ----
const ITEM_WIDTH = SCREEN_W * 0.64;
const ITEM_SPACING = 14;
const ITEM_FULL_WIDTH = ITEM_WIDTH + ITEM_SPACING;
const SIDE_PADDING = (SCREEN_W - ITEM_WIDTH) / 2;
const CARD_HEIGHT = ITEM_WIDTH * 1.06;

// ---- Color helpers ----
// Darkens/lightens a hex color by a percentage. Used to build a rich
// two-tone gradient fill out of each category's single base color.
const shadeColor = (hex: string, percent: number) => {
  const clean = hex.replace('#', '');
  const num = parseInt(clean.length === 3 ? clean.split('').map(c => c + c).join('') : clean, 16);
  let r = (num >> 16) + Math.round((percent / 100) * 255);
  let g = ((num >> 8) & 0x00ff) + Math.round((percent / 100) * 255);
  let b = (num & 0x0000ff) + Math.round((percent / 100) * 255);
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));
  return `#${(1 << 24 | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
};

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
    id: 'series',
    title: 'อนุกรม',
    titleEN: 'Series',
    icon: '🔢',
    description: 'อนุกรมตัวเลขและรูปแบบ',
    questionCount: 200,
    passingScore: 60,
    color: '#FF6B6B',
    onColor: WHITE,
    dotColor: '#C4123F',
    topics: ['Arithmetic', 'Geometric', 'Fibonacci', 'Square', 'Cube', 'Prime'],
  },
  {
    id: 'mathematics',
    title: 'คณิตศาสตร์',
    titleEN: 'Mathematics',
    icon: '🧮',
    description: 'คณิตศาสตร์พื้นฐานและประยุกต์',
    questionCount: 300,
    passingScore: 60,
    color: '#4ECDC4',
    onColor: INK,
    dotColor: '#0A5C6E',
    topics: ['Percent', 'Ratio', 'Area', 'Volume', 'Probability', 'Equations'],
  },
  {
    id: 'analogy',
    title: 'อุปมาอุปไมย',
    titleEN: 'Analogy',
    icon: '⚖️',
    description: 'การเปรียบเทียบความสัมพันธ์',
    questionCount: 250,
    passingScore: 60,
    color: '#95E1D3',
    onColor: INK,
    dotColor: '#0A5C6E',
    topics: ['Tool-Use', 'Animal-Home', 'Country-Capital', 'Cause-Effect'],
  },
  {
    id: 'symbolLogic',
    title: 'ตรรกะสัญลักษณ์',
    titleEN: 'Symbol Logic',
    icon: '🔣',
    description: 'ตรรกะและการแทนค่าสัญลักษณ์',
    questionCount: 250,
    passingScore: 60,
    color: '#DDA0DD',
    onColor: INK,
    dotColor: '#B4460A',
    topics: ['Basic Operations', 'Comparisons', 'If-Then', 'Variables'],
  },
  {
    id: 'tablesGraph',
    title: 'ตารางและกราฟ',
    titleEN: 'Tables & Graphs',
    icon: '📊',
    description: 'การวิเคราะห์ข้อมูล',
    questionCount: 300,
    passingScore: 60,
    color: '#87CEEB',
    onColor: INK,
    dotColor: '#0A5C6E',
    topics: ['Table Reading', 'Bar Charts', 'Percentages', 'Averages', 'Trends'],
  },
  {
    id: 'grammar',
    title: 'ไวยากรณ์',
    titleEN: 'Grammar',
    icon: '📝',
    description: 'ไวยากรณ์ภาษาอังกฤษ',
    questionCount: 210,
    passingScore: 60,
    color: '#3EC6E0',
    onColor: INK,
    dotColor: '#0A5C6E',
    topics: ['Tenses', 'Articles', 'Prepositions', 'Conditionals', 'Passive Voice'],
  },
  {
    id: 'vocabulary',
    title: 'คำศัพท์',
    titleEN: 'Vocabulary',
    icon: '📚',
    description: 'คำศัพท์ภาษาอังกฤษ',
    questionCount: 300,
    passingScore: 60,
    color: '#FFB6C1',
    onColor: INK,
    dotColor: '#B4460A',
    topics: ['Synonyms', 'Antonyms', 'Idioms', 'Phrasal Verbs', 'Academic Words'],
  },
  {
    id: 'discipline',
    title: 'วินัยและการลงโทษ',
    titleEN: 'Discipline & Punishment',
    icon: '⚠️',
    description: 'วินัยข้าราชการและการลงโทษ',
    questionCount: 100,
    passingScore: 60,
    color: '#FFC94D',
    onColor: INK,
    dotColor: '#B4460A',
    topics: ['Disciplinary Actions', 'Procedures', 'Appeals', 'Complaints'],
  },
  {
    id: 'conversation',
    title: 'บทสนทนา',
    titleEN: 'Conversation',
    icon: '💬',
    description: 'บทสนทนาภาษาอังกฤษ',
    questionCount: 250,
    passingScore: 60,
    color: '#FF69B4',
    onColor: WHITE,
    dotColor: '#B4460A',
    topics: ['Daily Conversations', 'Situational Dialogues', 'Expressions'],
  },
  {
    id: 'reading',
    title: 'การอ่าน',
    titleEN: 'Reading Comprehension',
    icon: '📖',
    description: 'การอ่านจับใจความภาษาอังกฤษ',
    questionCount: 400,
    passingScore: 60,
    color: '#20B2AA',
    onColor: WHITE,
    dotColor: '#0A5C6E',
    topics: ['Short Passages', 'Long Passages', 'Inference', 'Main Idea'],
  },
  {
    id: 'constitution',
    title: 'รัฐธรรมนูญ',
    titleEN: 'Constitution',
    icon: '📜',
    description: 'รัฐธรรมนูญแห่งราชอาณาจักรไทย',
    questionCount: 250,
    passingScore: 60,
    color: '#FFD700',
    onColor: INK,
    dotColor: '#B4460A',
    topics: ['Fundamental Rights', 'Duties', 'Government Structure', 'Amendments'],
  },
  {
    id: 'civilService',
    title: 'พ.ร.บ.ข้าราชการ',
    titleEN: 'Civil Service Act',
    icon: '🏛️',
    description: 'พ.ร.บ.ระเบียบข้าราชการพลเรือน',
    questionCount: 250,
    passingScore: 60,
    color: '#DAA520',
    onColor: WHITE,
    dotColor: '#B4460A',
    topics: ['Status', 'Appointment', 'Promotion', 'Transfer'],
  },
  {
    id: 'ethics',
    title: 'คุณธรรมและจริยธรรม',
    titleEN: 'Ethics',
    icon: '🕊️',
    description: 'คุณธรรมจริยธรรมสำหรับข้าราชการ',
    questionCount: 200,
    passingScore: 60,
    color: '#E6E6FA',
    onColor: INK,
    dotColor: '#0A5C6E',
    topics: ['Public Service Values', 'Ethical Standards', 'Conflict of Interest'],
  },
  {
    id: 'publicService',
    title: 'การบริการภาครัฐ',
    titleEN: 'Public Service',
    icon: '🏢',
    description: 'การบริการภาครัฐและนโยบายรัฐบาล',
    questionCount: 200,
    passingScore: 60,
    color: '#98FB98',
    onColor: INK,
    dotColor: '#0A5C6E',
    topics: ['Service Standards', 'Digital Government', 'Policy Implementation'],
  },
];

type NavigationProp = StackNavigationProp<RootStackParamList>;

const CategoriesScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { player } = useGame();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList<ExamCategory>>(null);

  const currentCategory = EXAM_CATEGORIES[currentIndex];

  const handleStart = (categoryId: string) => {
    navigation.navigate('LevelMap', { categoryId });
  };

  const getTotalProgress = () => {
    const totalCategories = EXAM_CATEGORIES.length;
    const completedLevels = player.completedLevels?.length || 0;
    return totalCategories > 0 ? Math.min(100, Math.round((completedLevels / totalCategories) * 100)) : 0;
  };

  const scrollToIndex = (index: number) => {
    const clamped = Math.max(0, Math.min(EXAM_CATEGORIES.length - 1, index));
    flatListRef.current?.scrollToOffset({
      offset: clamped * ITEM_FULL_WIDTH,
      animated: true,
    });
    setCurrentIndex(clamped);
  };

  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / ITEM_FULL_WIDTH);
    setCurrentIndex(Math.max(0, Math.min(EXAM_CATEGORIES.length - 1, index)));
  };

  const renderItem = ({ item, index }: { item: ExamCategory; index: number }) => {
    const inputRange = [
      (index - 1) * ITEM_FULL_WIDTH,
      index * ITEM_FULL_WIDTH,
      (index + 1) * ITEM_FULL_WIDTH,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.85, 1, 0.85],
      extrapolate: 'clamp',
    });
    // Frosted-glass simulation for side (non-focused) cards: the gradient
    // washes out, a translucent white frost layer sits on top, and the
    // readable content fades away, leaving only a hazy tint of the color.
    const colorOpacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.4, 1, 0.4],
      extrapolate: 'clamp',
    });
    const frostOpacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.62, 0, 0.62],
      extrapolate: 'clamp',
    });
    const contentOpacity = scrollX.interpolate({
      inputRange,
      outputRange: [0, 1, 0],
      extrapolate: 'clamp',
    });
    const glowOpacity = scrollX.interpolate({
      inputRange,
      outputRange: [0, 0.55, 0],
      extrapolate: 'clamp',
    });

    return (
      <View style={{ width: ITEM_FULL_WIDTH, alignItems: 'center' }}>
        {/* Ambient glow that only appears behind the focused card */}
        <Animated.View
          pointerEvents="none"
          style={[
            styles.cardGlow,
            { backgroundColor: item.color, opacity: glowOpacity },
          ]}
        />

        <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
          <Animated.View style={[StyleSheet.absoluteFillObject, { opacity: colorOpacity }]}>
            <LinearGradient
              colors={[shadeColor(item.color, 12), item.color, shadeColor(item.color, -22)]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFillObject}
            />
          </Animated.View>

          {/* Subtle top sheen for a glassy highlight */}
          <LinearGradient
            pointerEvents="none"
            colors={['rgba(255,255,255,0.28)', 'rgba(255,255,255,0)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 0.6 }}
            style={StyleSheet.absoluteFillObject}
          />

          <Animated.View
            pointerEvents="none"
            style={[StyleSheet.absoluteFillObject, styles.frostLayer, { opacity: frostOpacity }]}
          />

          <View style={styles.cardBorder} pointerEvents="none" />

          <TouchableOpacity
            style={styles.cardTouchable}
            activeOpacity={0.9}
            onPress={() => (index === currentIndex ? handleStart(item.id) : scrollToIndex(index))}
          >
            <Animated.View style={{ flex: 1, justifyContent: 'space-between', opacity: contentOpacity }}>
              <View style={styles.iconCircle}>
                <LinearGradient
                  colors={['rgba(255,255,255,0.55)', 'rgba(255,255,255,0.18)']}
                  style={StyleSheet.absoluteFillObject}
                />
                <Text style={styles.iconText}>{item.icon}</Text>
              </View>

              <View style={styles.cardBottomScrim}>
                <View style={styles.kickerRow}>
                  <View style={[styles.kickerBar, { backgroundColor: item.onColor }]} />
                  <Text style={[styles.cardTitleEN, { color: item.onColor }]}>
                    {item.titleEN.toUpperCase()}
                  </Text>
                </View>
                <Text style={[styles.cardTitle, { color: item.onColor }]} numberOfLines={2}>
                  {item.title}
                </Text>
                <View style={styles.metaPillOnCard}>
                  <View style={[styles.metaDotOnCard, { backgroundColor: item.onColor }]} />
                  <Text style={[styles.metaTextOnCard, { color: item.onColor }]}>
                    {item.questionCount} ข้อ · ผ่าน {item.passingScore}%
                  </Text>
                </View>
              </View>
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Ambient color blobs that tint the whole screen based on the selection */}
      <View style={styles.blobTop} pointerEvents="none">
        <LinearGradient
          colors={[currentCategory.color, 'transparent']}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
      <View style={styles.blobBottom} pointerEvents="none">
        <LinearGradient
          colors={[shadeColor(currentCategory.color, -10), 'transparent']}
          style={StyleSheet.absoluteFillObject}
        />
      </View>

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.eyebrow}>สอบราชการ</Text>
          <Text style={styles.mainTitle}>ข้อสอบ ก.พ.</Text>
        </View>
        <View style={styles.progressPill}>
          <View style={[styles.progressDot, { backgroundColor: currentCategory.color }]} />
          <Text style={styles.progressPillText}>{getTotalProgress()}%</Text>
        </View>
      </View>
      <Text style={styles.subtitle}>เลื่อนเพื่อเลือกหมวดหมู่ที่ต้องการฝึกฝน</Text>

      <View style={styles.carouselArea}>
        <Animated.FlatList
          ref={flatListRef}
          data={EXAM_CATEGORIES}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={ITEM_FULL_WIDTH}
          decelerationRate="fast"
          bounces={false}
          contentContainerStyle={{ paddingHorizontal: SIDE_PADDING, alignItems: 'center' }}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: true,
          })}
          scrollEventThrottle={16}
          onMomentumScrollEnd={onMomentumScrollEnd}
        />
      </View>

      <View style={styles.dotsRow}>
        {EXAM_CATEGORIES.map((cat, i) => (
          <View
            key={cat.id}
            style={[
              styles.dot,
              i === currentIndex && [styles.dotActive, { backgroundColor: cat.color, shadowColor: cat.color }],
            ]}
          />
        ))}
      </View>

      <View style={styles.detailCard}>
        <LinearGradient
          colors={[currentCategory.color, 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.detailAccentBar}
        />
        <Text style={styles.detailLabel}>เกี่ยวกับหมวดนี้</Text>
        <Text style={styles.detailDescription}>{currentCategory.description}</Text>
        <View style={styles.topicsWrap}>
          {currentCategory.topics.map((topic, index) => (
            <View key={index} style={styles.topicChip}>
              <View style={[styles.topicDot, { backgroundColor: currentCategory.color }]} />
              <Text style={styles.topicChipText}>{topic}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity
          onPress={() => handleStart(currentCategory.id)}
          activeOpacity={0.9}
          style={[styles.startButtonWrap, { shadowColor: currentCategory.color }]}
        >
          <LinearGradient
            colors={[shadeColor(currentCategory.color, 10), currentCategory.color, shadeColor(currentCategory.color, -18)]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.startButton}
          >
            <Text style={[styles.startButtonText, { color: currentCategory.onColor }]}>
              เริ่มทำข้อสอบ
            </Text>
            <Text style={[styles.startButtonArrow, { color: currentCategory.onColor }]}>→</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },

  // ---- Ambient background ----
  blobTop: {
    position: 'absolute',
    top: -180,
    left: -80,
    width: SCREEN_W * 1.2,
    height: 360,
    opacity: 0.16,
    transform: [{ rotate: '-8deg' }],
  },
  blobBottom: {
    position: 'absolute',
    bottom: -220,
    right: -100,
    width: SCREEN_W * 1.2,
    height: 360,
    opacity: 0.12,
    transform: [{ rotate: '10deg' }],
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
    backgroundColor: SURFACE_RAISED,
    borderWidth: 1,
    borderColor: LINE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: '900',
    color: WHITE,
  },
  headerTitleWrap: {
    flex: 1,
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: '800',
    color: MUTED_LIGHT,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: WHITE,
    letterSpacing: 0.3,
  },
  progressPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: SURFACE_RAISED,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: LINE,
  },
  progressDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  progressPillText: {
    color: WHITE,
    fontSize: 12,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 12,
    color: MUTED,
    fontWeight: '600',
    paddingHorizontal: 20,
    marginTop: 6,
    marginBottom: 10,
  },

  // ---- Carousel ----
  carouselArea: {
    height: CARD_HEIGHT + 40,
    justifyContent: 'center',
  },
  cardGlow: {
    position: 'absolute',
    width: ITEM_WIDTH * 0.9,
    height: CARD_HEIGHT * 0.9,
    borderRadius: 999,
    alignSelf: 'center',
  },
  card: {
    width: ITEM_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: SURFACE_RAISED,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.45,
    shadowRadius: 26,
    elevation: 14,
  },
  cardBorder: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  cardTouchable: {
    flex: 1,
    padding: 22,
    justifyContent: 'space-between',
  },
  frostLayer: {
    backgroundColor: 'rgba(255,255,255,0.16)',
  },
  iconCircle: {
    width: 54,
    height: 54,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  iconText: {
    fontSize: 27,
  },
  cardBottomScrim: {
    alignSelf: 'stretch',
  },
  kickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  kickerBar: {
    width: 14,
    height: 2,
    borderRadius: 1,
    opacity: 0.7,
  },
  cardTitleEN: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    opacity: 0.7,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '900',
    lineHeight: 28,
    marginBottom: 16,
  },
  metaPillOnCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.28)',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  metaDotOnCard: {
    width: 6,
    height: 6,
    borderRadius: 3,
    opacity: 0.8,
  },
  metaTextOnCard: {
    fontSize: 12,
    fontWeight: '800',
  },

  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
    marginBottom: 22,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: SURFACE_RAISED,
  },
  dotActive: {
    width: 20,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 6,
    elevation: 4,
  },

  // ---- Detail panel ----
  detailCard: {
    marginHorizontal: 20,
    backgroundColor: SURFACE,
    borderRadius: 26,
    padding: 22,
    borderWidth: 1,
    borderColor: LINE,
    overflow: 'hidden',
  },
  detailAccentBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
  },
  detailLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: MUTED_LIGHT,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  detailDescription: {
    fontSize: 13,
    color: MUTED,
    fontWeight: '600',
    lineHeight: 19,
    marginBottom: 16,
  },
  topicsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  topicChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: SURFACE_RAISED,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: LINE,
  },
  topicDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  topicChipText: {
    fontSize: 11,
    fontWeight: '700',
    color: MUTED,
  },
  startButtonWrap: {
    borderRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  startButton: {
    borderRadius: 18,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  startButtonText: {
    fontSize: 14,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  startButtonArrow: {
    fontSize: 16,
    fontWeight: '900',
  },
});

export default CategoriesScreen;