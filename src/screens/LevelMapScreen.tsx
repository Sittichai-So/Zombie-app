import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Platform,
  Alert,
  useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useGame } from '../context/GameContext';
import { type Level, levels, isLevelUnlocked } from '../data/levels';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { Mascot } from '../components';

// ---- Design tokens -------------------------------------------------------
// Signature: every card, node, and control is a flat color block cut out
// with a bold black stroke — a "sticker" language instead of gradients
// or soft shadows. Corners stay large and rounded; strokes stay literal ink.
const BG = '#0A0B0D';
const CARD_DARK = '#16181D';
const INK = '#000000';
const WHITE = '#FFFFFF';
const MUTED = '#8B93A1';
const LOCKED_COLOR = '#3A3D45';
const LOCKED_FILL = '#22252C';
const GOLD = '#FFCF4D';
const STROKE = 3;
const STROKE_THICK = 4;

const ZONE_THEME = {
  outset: { color: '#8BD450', icon: '🌱', onColor: INK },
  outbreak: { color: '#FBBF24', icon: '🦠', onColor: INK },
  deadzone: { color: '#FF9F45', icon: '☣️', onColor: INK },
  wasteland: { color: '#FF7A45', icon: '🔥', onColor: INK },
  apocalypse: { color: '#FF4D3D', icon: '💀', onColor: WHITE },
  judgment: { color: '#C084FC', icon: '👑', onColor: INK },
} as const;

type ZoneTheme = (typeof ZONE_THEME)[keyof typeof ZONE_THEME];
type LevelNodeStatus = 'completed' | 'current' | 'available' | 'locked';

interface ZoneSection {
  title: string;
  theme: ZoneTheme;
  slice: Level[];
  single: boolean;
}

interface LevelNodeProps {
  level: Level;
  status: LevelNodeStatus;
  theme: ZoneTheme;
  nodeSize: number;
  nodeRadius: number;
  pulseAnim: Animated.Value;
  isFinalBoss?: boolean;
  onPress: (levelId: number) => void;
}

const getLevelStatus = (levelId: number, completedLevels: number[]): LevelNodeStatus => {
  if (completedLevels.includes(levelId)) return 'completed';
  if (levelId === 1) return 'current';
  if (isLevelUnlocked(levelId, completedLevels)) return 'available';
  return 'locked';
};

// Zone day-ranges. Levels are grouped by their actual `day` value instead of
// a fixed array index, so this keeps working correctly no matter how many
// levels the game actually has (previously the slice boundaries assumed a
// ~100-level roster; with fewer levels, wrong stages landed in the wrong
// zone and — because the slice came from a reversed array — the earliest,
// tappable stage ended up buried at the bottom of its zone instead of the
// top, which is why nothing looked clickable).
const ZONE_DEFINITIONS = [
  { title: 'DAY 1–20 · OUTSET', theme: ZONE_THEME.outset, min: 1, max: 20 },
  { title: 'DAY 21–40 · OUTBREAK', theme: ZONE_THEME.outbreak, min: 21, max: 40 },
  { title: 'DAY 41–60 · DEAD ZONE', theme: ZONE_THEME.deadzone, min: 41, max: 60 },
  { title: 'DAY 61–80 · WASTELAND', theme: ZONE_THEME.wasteland, min: 61, max: 80 },
  { title: 'DAY 81–99 · APOCALYPSE', theme: ZONE_THEME.apocalypse, min: 81, max: 99 },
] as const;

const buildZoneSections = (allLevels: Level[]): ZoneSection[] => {
  // Ascending by day: the earliest, easiest stage always renders first
  // (top-left) inside its zone — that's the node the player can actually
  // tap next, not the last one.
  const sortedLevels = [...allLevels].sort((a, b) => a.day - b.day);

  const finalBoss =
    [...sortedLevels].reverse().find((level) => level.difficulty === 'boss') ??
    sortedLevels[sortedLevels.length - 1];

  const regularZones: ZoneSection[] = ZONE_DEFINITIONS.map((def) => ({
    title: def.title,
    theme: def.theme,
    single: false,
    slice: sortedLevels.filter(
      (level) => level.id !== finalBoss?.id && level.day >= def.min && level.day <= def.max
    ),
  })).filter((zone) => zone.slice.length > 0);

  if (!finalBoss) return regularZones;

  return [
    ...regularZones,
    { title: 'DAY 100 · JUDGMENT DAY', theme: ZONE_THEME.judgment, slice: [finalBoss], single: true },
  ];
};

const LevelNode: React.FC<LevelNodeProps> = ({
  level,
  status,
  theme,
  nodeSize,
  nodeRadius,
  pulseAnim,
  isFinalBoss,
  onPress,
}) => {
  const isBoss = level.difficulty === 'boss';
  const isLocked = status === 'locked';
  const isPlayable = status === 'current' || status === 'available';

  return (
    <Animated.View
      style={[
        styles.levelNodeWrapper,
        { transform: [{ scale: status === 'current' ? pulseAnim : 1 }] },
      ]}
    >
      <TouchableOpacity
        style={[
          styles.levelNode,
          {
            width: nodeSize,
            height: nodeSize,
            borderRadius: nodeRadius,
            borderColor: isLocked ? LOCKED_COLOR : INK,
            backgroundColor: isLocked ? LOCKED_FILL : theme.color,
          },
          isBoss && styles.bossNode,
          status === 'current' && styles.currentNode,
        ]}
        onPress={() => onPress(level.id)}
        disabled={isLocked}
        activeOpacity={0.8}
      >
        {isLocked ? (
          <Text style={styles.lockIcon}>🔒</Text>
        ) : (
          <>
            <Text style={styles.nodeEmoji}>{isBoss ? theme.icon : status === 'completed' ? '✅' : theme.icon}</Text>
            <Text style={[styles.levelNumber, { color: theme.onColor }]}>
              {isBoss ? 'BOSS' : level.day}
            </Text>
          </>
        )}
      </TouchableOpacity>

      {status === 'completed' && (
        <View style={styles.completedBadge}>
          <Text style={styles.completedBadgeText}>★</Text>
        </View>
      )}

      {isPlayable && (
        <View style={styles.playBadge}>
          <Text style={styles.playBadgeText}>▶</Text>
        </View>
      )}

      <View style={[styles.nodeStatusBar, { backgroundColor: isLocked ? '#1E2027' : CARD_DARK, borderColor: isLocked ? LOCKED_COLOR : theme.color }]}>
        <Text style={[styles.nodeStatusText, { color: isLocked ? MUTED : theme.color }]}>
          {isBoss ? (isFinalBoss ? 'FINAL BOSS' : `BOSS · DAY ${level.day}`) : `Day ${level.day}`}
        </Text>
      </View>
    </Animated.View>
  );
};

const LevelMapScreen: React.FC = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useNavigation<any>();
  const { player, startLevel } = useGame();
  const { categoryId } = route.params || {};
  const levelNodeSize = Math.min(width * 0.2, 92);
  const levelNodeRadius = levelNodeSize / 2;
  const bossNodeSize = Math.min(width * 0.28, 116);
  const bossNodeRadius = bossNodeSize / 2;
  const [fadeAnim] = useState(new Animated.Value(0));
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const filteredLevels = useMemo(() => {
    if (!categoryId) return levels;
    return levels;
  }, [categoryId]);

  const zones = useMemo(() => buildZoneSections(filteredLevels), [filteredLevels]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 450,
      useNativeDriver: Platform.OS !== 'web',
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 850,
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 850,
          useNativeDriver: Platform.OS !== 'web',
        }),
      ])
    ).start();
  }, []);

  const handleLevelSelect = (levelId: number) => {
    const level = filteredLevels.find((item) => item.id === levelId);
    if (!level) return;

    if (!isLevelUnlocked(levelId, player.completedLevels)) {
      Alert.alert('Zone Quarantined', 'Clear the previous stage to break through here.');
      return;
    }

    if (player.playerLevel < level.requiredLevel) {
      Alert.alert('Not Strong Enough', `Reach player level ${level.requiredLevel} to survive this stage.`);
      return;
    }

    startLevel(levelId);
    navigation.navigate('Battle', { levelId, categoryId });
  };

  const renderConnector = (unlocked: boolean, theme: ZoneTheme) => (
    <View style={styles.connectorTrack}>
      <View style={[styles.connectorLine, { backgroundColor: unlocked ? theme.color : LOCKED_COLOR }]} />
      {[0, 1, 2].map((item) => (
        <View
          key={item}
          style={[
            styles.connectorDot,
            { backgroundColor: unlocked ? theme.color : LOCKED_COLOR },
          ]}
        />
      ))}
    </View>
  );

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.pageWrapper}>
        <View style={styles.headerCard}>
          <View style={styles.headerTop}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonWrapper}>
              <Text style={styles.backButton}>←</Text>
            </TouchableOpacity>
            <View style={styles.headerTitleBlock}>
              <Text style={styles.title}>
                {categoryId ? 'ข้อสอบ ก.พ.' : 'LEVEL MAP'}
              </Text>
              <Text style={styles.subtitle}>
                {categoryId
                  ? 'เลือกหมวดหมู่ข้อสอบที่ต้องการฝึกฝน'
                  : 'Choose your route through the apocalypse'}
              </Text>
            </View>
            <View style={styles.placeholder} />
          </View>

          <View style={styles.progressRow}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>STAGES CLEARED</Text>
              <Text style={styles.statValue}>{player.completedLevels.length}/{levels.length}</Text>
            </View>
            <View style={[styles.statCard, styles.statCardAccent]}>
              <Text style={[styles.statLabel, styles.statLabelAccent]}>PLAYER LEVEL</Text>
              <Text style={styles.statValue}>{player.playerLevel}</Text>
            </View>
          </View>
        </View>

        <ScrollView
          style={styles.mapScrollView}
          contentContainerStyle={styles.mapScrollContent}
          showsVerticalScrollIndicator={true}
          bounces={false}
          keyboardShouldPersistTaps="handled"
        >

          <View style={styles.introCard}>
            <Text style={styles.introTitle}>SURVIVAL STORY</Text>
            <Text style={styles.introText}>Lead your survivors from Day 1 through the end of the apocalypse.</Text>
            <Text style={styles.introSubtext}>Unlock zones, choose your route, and take on the final boss.</Text>
          </View>

          <View style={styles.pathContainer}>
            {zones.map((zone) => {
              const clearedInZone = zone.slice.filter((level) => player.completedLevels.includes(level.id)).length;
              const zoneUnlocked = zone.slice.some((level) => getLevelStatus(level.id, player.completedLevels) !== 'locked');
              const isCurrentZone = zone.slice.some((level) => getLevelStatus(level.id, player.completedLevels) === 'current');

              return (
                <View key={zone.title} style={styles.windingSection}>
                  <View
                    style={[
                      styles.zoneBanner,
                      {
                        backgroundColor: zoneUnlocked ? zone.theme.color : LOCKED_FILL,
                        borderColor: zoneUnlocked ? INK : LOCKED_COLOR,
                      },
                    ]}
                  >
                    <View style={styles.zoneIconBadge}>
                      <Text style={styles.zoneIcon}>{zone.theme.icon}</Text>
                    </View>
                    <View style={styles.zoneTitleBlock}>
                      <Text style={[styles.windingSectionTitle, { color: zoneUnlocked ? zone.theme.onColor : MUTED }]}>{zone.title}</Text>
                      <Text style={[styles.zoneProgressText, { color: zoneUnlocked ? zone.theme.onColor : MUTED }]}>{clearedInZone}/{zone.slice.length} cleared</Text>
                    </View>
                    {isCurrentZone && (
                      <View style={styles.startHereBadge}>
                        <Text style={styles.startHereBadgeText}>START HERE</Text>
                      </View>
                    )}
                  </View>

                  {zone.single ? (
                    <View style={styles.windingNodeContainer}>
                      {zone.slice.map((level, index) => {
                        const status = getLevelStatus(level.id, player.completedLevels);
                        const nodeSize = level.difficulty === 'boss' ? bossNodeSize : levelNodeSize;
                        const nodeRadius = level.difficulty === 'boss' ? bossNodeRadius : levelNodeRadius;

                        return (
                          <LevelNode
                            key={`${level.id}-${index}`}
                            level={level}
                            status={status}
                            theme={zone.theme}
                            nodeSize={nodeSize}
                            nodeRadius={nodeRadius}
                            pulseAnim={pulseAnim}
                            isFinalBoss
                            onPress={handleLevelSelect}
                          />
                        );
                      })}
                    </View>
                  ) : (
                    <View style={styles.windingPath}>
                      {zone.slice.map((level, index) => {
                        const status = getLevelStatus(level.id, player.completedLevels);
                        const nodeSize = level.difficulty === 'boss' ? bossNodeSize : levelNodeSize;
                        const nodeRadius = level.difficulty === 'boss' ? bossNodeRadius : levelNodeRadius;

                        return (
                          <React.Fragment key={level.id}>
                            <View style={[styles.windingNodeWrapper, index % 2 === 0 ? styles.left : styles.right]}>
                              <LevelNode
                                level={level}
                                status={status}
                                theme={zone.theme}
                                nodeSize={nodeSize}
                                nodeRadius={nodeRadius}
                                pulseAnim={pulseAnim}
                                onPress={handleLevelSelect}
                              />
                            </View>
                            {index < zone.slice.length - 1 && renderConnector(status !== 'locked', zone.theme)}
                          </React.Fragment>
                        );
                      })}
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: BG,
    width: '100%',
  },
  pageWrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'web' ? 40 : 28,
  },
  mascotIntroSection: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  headerCard: {
    backgroundColor: CARD_DARK,
    borderRadius: 28,
    borderWidth: STROKE,
    borderColor: INK,
    padding: 20,
    marginBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  backButtonWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: WHITE,
    borderWidth: STROKE,
    borderColor: INK,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    fontSize: 20,
    color: INK,
    fontWeight: '900',
  },
  headerTitleBlock: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    color: WHITE,
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  subtitle: {
    color: MUTED,
    fontSize: 12,
    fontWeight: '600',
  },
  placeholder: {
    width: 44,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1E2027',
    borderRadius: 20,
    borderWidth: STROKE,
    borderColor: INK,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  statCardAccent: {
    backgroundColor: '#FF4D3D',
  },
  statLabel: {
    color: MUTED,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.6,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  statLabelAccent: {
    color: 'rgba(255,255,255,0.8)',
  },
  statValue: {
    color: WHITE,
    fontSize: 22,
    fontWeight: '900',
  },
  mapScrollView: {
    flex: 1,
    width: '100%',
    minHeight: 0,
  },
  mapScrollContent: {
    paddingTop: 4,
    paddingBottom: 120,
  },
  introCard: {
    backgroundColor: CARD_DARK,
    borderRadius: 24,
    borderWidth: STROKE,
    borderColor: INK,
    padding: 18,
    marginBottom: 18,
  },
  introTitle: {
    color: GOLD,
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.8,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  introText: {
    color: '#D7DBE4',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 6,
    fontWeight: '600',
  },
  introSubtext: {
    color: MUTED,
    fontSize: 12.5,
    fontWeight: '600',
  },
  pathContainer: {
    position: 'relative',
  },
  windingSection: {
    marginBottom: 20,
    padding: 16,
    borderRadius: 28,
    backgroundColor: CARD_DARK,
    borderWidth: STROKE,
    borderColor: INK,
  },
  zoneBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 12,
    borderRadius: 18,
    borderWidth: STROKE,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  zoneIconBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: WHITE,
    borderWidth: 2,
    borderColor: INK,
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoneIcon: {
    fontSize: 18,
  },
  startHereBadge: {
    backgroundColor: INK,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: INK,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  startHereBadgeText: {
    color: WHITE,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  zoneTitleBlock: {
    flex: 1,
  },
  zoneProgressText: {
    fontSize: 11,
    marginTop: 2,
    fontWeight: '800',
  },
  windingSectionTitle: {
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  windingPath: {
    position: 'relative',
    paddingHorizontal: 6,
    alignItems: 'center',
  },
  windingNodeWrapper: {
    width: '100%',
  },
  left: {
    alignItems: 'flex-start',
    paddingLeft: 16,
  },
  right: {
    alignItems: 'flex-end',
    paddingRight: 16,
  },
  windingNodeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectorTrack: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
  },
  connectorLine: {
    position: 'absolute',
    width: 4,
    height: '100%',
    borderRadius: 2,
    opacity: 0.5,
  },
  connectorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: INK,
  },
  levelNodeWrapper: {
    alignItems: 'center',
  },
  levelNode: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: STROKE_THICK,
  },
  bossNode: {
    borderWidth: STROKE_THICK + 1,
  },
  currentNode: {
    shadowColor: GOLD,
    shadowOpacity: 0.9,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
  },
  playBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: GOLD,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: INK,
  },
  playBadgeText: {
    color: INK,
    fontSize: 11,
    fontWeight: '900',
    marginLeft: 2,
  },
  nodeEmoji: {
    fontSize: 24,
    marginBottom: 2,
  },
  lockIcon: {
    fontSize: 22,
    opacity: 0.6,
  },
  levelNumber: {
    fontSize: 15,
    fontWeight: '900',
  },
  completedBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: GOLD,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: INK,
  },
  completedBadgeText: {
    color: '#3A2A00',
    fontSize: 13,
    fontWeight: '900',
  },
  nodeStatusBar: {
    marginTop: 8,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1.5,
  },
  nodeStatusText: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.3,
  },
});

export default LevelMapScreen;