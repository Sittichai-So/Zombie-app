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
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path as SvgPath, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useGame } from '../context/GameContext';
import { type Level, levels, isLevelUnlocked } from '../data/levels';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { Mascot } from '../components';

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

interface NodePoint {
  level: Level;
  cx: number;
  cy: number;
  size: number;
}

// ---- Color helpers ----
// Darkens/lightens a hex color by a percentage. Used to build gradient
// fills and pop-shadow tones out of each zone's single base color.
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

// Builds a smooth vertical S-curve SVG path through a list of points —
// this is what turns a plain list of nodes into an actual winding road.
const buildWindingPath = (points: { x: number; y: number }[]) => {
  if (points.length < 2) return '';
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const p0 = points[i - 1];
    const p1 = points[i];
    const midY = (p0.y + p1.y) / 2;
    d += ` C ${p0.x} ${midY}, ${p1.x} ${midY}, ${p1.x} ${p1.y}`;
  }
  return d;
};

const getLevelStatus = (levelId: number, completedLevels: number[]): LevelNodeStatus => {
  if (completedLevels.includes(levelId)) return 'completed';
  if (levelId === 1) return 'current';
  if (isLevelUnlocked(levelId, completedLevels)) return 'available';
  return 'locked';
};

// Zone day-ranges. Levels are grouped by their actual `day` value instead of
// a fixed array index, so this keeps working correctly no matter how many
// levels the game actually has.
const ZONE_DEFINITIONS = [
  { title: 'DAY 1–20 · OUTSET', theme: ZONE_THEME.outset, min: 1, max: 20 },
  { title: 'DAY 21–40 · OUTBREAK', theme: ZONE_THEME.outbreak, min: 21, max: 40 },
  { title: 'DAY 41–60 · DEAD ZONE', theme: ZONE_THEME.deadzone, min: 41, max: 60 },
  { title: 'DAY 61–80 · WASTELAND', theme: ZONE_THEME.wasteland, min: 61, max: 80 },
  { title: 'DAY 81–99 · APOCALYPSE', theme: ZONE_THEME.apocalypse, min: 81, max: 99 },
] as const;

const buildZoneSections = (allLevels: Level[]): ZoneSection[] => {
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

// Lays each level out along a gentle sine-wave "road" across the available
// width, spaced evenly downward — the geometry behind the winding path.
const layoutWindingNodes = (
  levelsInZone: Level[],
  mapWidth: number,
  nodeSize: number,
  verticalGap: number
): NodePoint[] => {
  const amplitude = Math.max(0, (mapWidth - nodeSize) / 2 - 6);
  const center = mapWidth / 2;

  return levelsInZone.map((level, i) => {
    const cx = center + amplitude * Math.sin(i * 1.05);
    const cy = verticalGap * i + verticalGap / 2;
    return { level, cx, cy, size: nodeSize };
  });
};

interface LevelNodeProps {
  point: NodePoint;
  status: LevelNodeStatus;
  theme: ZoneTheme;
  pulseAnim: Animated.Value;
  isFinalBoss?: boolean;
  onPress: (levelId: number) => void;
}

const LevelNode: React.FC<LevelNodeProps> = ({ point, status, theme, pulseAnim, isFinalBoss, onPress }) => {
  const { level, cx, cy, size } = point;
  const isBoss = level.difficulty === 'boss';
  const isLocked = status === 'locked';
  const isPlayable = status === 'current' || status === 'available';
  const radius = size / 2;

  return (
    <Animated.View
      style={[
        styles.levelNodeWrapper,
        {
          left: cx - size / 2 - 24,
          top: cy - size / 2,
          width: size + 48,
          transform: [{ scale: status === 'current' ? pulseAnim : 1 }],
        },
      ]}
    >
      <View style={styles.nodeStack}>
        {/* Comic-style pop shadow: a flat offset duplicate, not a blur */}
        {!isLocked && (
          <View
            style={[
              styles.popShadow,
              {
                width: size,
                height: size,
                borderRadius: radius,
                backgroundColor: shadeColor(theme.color, -45),
              },
              isBoss && styles.bossPopShadow,
            ]}
          />
        )}

        <TouchableOpacity
          style={[
            styles.levelNode,
            {
              width: size,
              height: size,
              borderRadius: radius,
              borderColor: isLocked ? LOCKED_COLOR : INK,
              backgroundColor: isLocked ? LOCKED_FILL : theme.color,
            },
            isBoss && styles.bossNode,
            status === 'current' && styles.currentNode,
          ]}
          onPress={() => onPress(level.id)}
          disabled={isLocked}
          activeOpacity={0.85}
        >
          {!isLocked && (
            <LinearGradient
              colors={[shadeColor(theme.color, 22), theme.color, shadeColor(theme.color, -18)]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[StyleSheet.absoluteFillObject, { borderRadius: radius }]}
            />
          )}
          {!isLocked && (
            <LinearGradient
              pointerEvents="none"
              colors={['rgba(255,255,255,0.35)', 'rgba(255,255,255,0)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 0.65 }}
              style={[StyleSheet.absoluteFillObject, { borderRadius: radius }]}
            />
          )}

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

        <View
          style={[
            styles.nodeStatusBar,
            { backgroundColor: isLocked ? '#1E2027' : CARD_DARK, borderColor: isLocked ? LOCKED_COLOR : theme.color },
          ]}
        >
          <Text style={[styles.nodeStatusText, { color: isLocked ? MUTED : theme.color }]}>
            {isBoss ? (isFinalBoss ? 'FINAL BOSS' : `BOSS · DAY ${level.day}`) : `Day ${level.day}`}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

interface WindingZonePathProps {
  zone: ZoneSection;
  mapWidth: number;
  nodeSize: number;
  bossNodeSize: number;
  completedLevels: number[];
  pulseAnim: Animated.Value;
  onPress: (levelId: number) => void;
}

const WindingZonePath: React.FC<WindingZonePathProps> = ({
  zone,
  mapWidth,
  nodeSize,
  bossNodeSize,
  completedLevels,
  pulseAnim,
  onPress,
}) => {
  const verticalGap = nodeSize * 1.9;
  const points = useMemo(
    () => layoutWindingNodes(zone.slice, mapWidth, nodeSize, verticalGap),
    [zone.slice, mapWidth, nodeSize, verticalGap]
  );
  const gradientId = `zoneGrad-${zone.title.replace(/[^a-zA-Z0-9]/g, '')}`;
  const pathD = buildWindingPath(points.map((p) => ({ x: p.cx, y: p.cy })));
  const containerHeight = verticalGap * zone.slice.length + nodeSize * 0.6;
  const anyUnlocked = points.some((p) => getLevelStatus(p.level.id, completedLevels) !== 'locked');

  return (
    <View style={[styles.windingNodeArea, { height: containerHeight }]}>
      <Svg width={mapWidth} height={containerHeight} style={StyleSheet.absoluteFillObject}>
        <Defs>
          <SvgLinearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={shadeColor(zone.theme.color, 15)} stopOpacity={anyUnlocked ? 0.9 : 0.25} />
            <Stop offset="1" stopColor={shadeColor(zone.theme.color, -25)} stopOpacity={anyUnlocked ? 0.9 : 0.25} />
          </SvgLinearGradient>
        </Defs>
        <SvgPath
          d={pathD}
          stroke={`url(#${gradientId})`}
          strokeWidth={6}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>

      {points.map((point) => {
        const status = getLevelStatus(point.level.id, completedLevels);
        return (
          <LevelNode
            key={point.level.id}
            point={point}
            status={status}
            theme={zone.theme}
            pulseAnim={pulseAnim}
            onPress={onPress}
          />
        );
      })}
    </View>
  );
};

const LevelMapScreen: React.FC = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useNavigation<any>();
  const { player, startLevel } = useGame();
  const { categoryId } = route.params || {};
  const levelNodeSize = Math.min(width * 0.19, 84);
  const bossNodeSize = Math.min(width * 0.3, 124);
  const bossNodeRadius = bossNodeSize / 2;
  const [fadeAnim] = useState(new Animated.Value(0));
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const PAGE_H_PADDING = 20;
  const SECTION_H_PADDING = 16;
  const mapWidth = Math.max(0, width - PAGE_H_PADDING * 2 - SECTION_H_PADDING * 2);

  const filteredLevels = useMemo(() => {
    if (!categoryId) return levels;
    return levels.filter(level => level.category === categoryId);
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

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.blobTop} pointerEvents="none">
        <LinearGradient colors={['#FF4D3D', 'transparent']} style={StyleSheet.absoluteFillObject} />
      </View>
      <View style={styles.blobBottom} pointerEvents="none">
        <LinearGradient colors={['#C084FC', 'transparent']} style={StyleSheet.absoluteFillObject} />
      </View>

      <View style={styles.pageWrapper}>
        <View style={styles.headerCard}>
          <LinearGradient
            colors={['#FF4D3D', 'rgba(255,77,61,0)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.headerAccentBar}
          />
          <View style={styles.headerTop}>
            <View style={styles.headerTitleBlock}>
              <Text style={styles.title}>
                {categoryId ? 'ข้อสอบ ก.พ.' : 'ข้อสอบ ก.พ.'}
              </Text>
              <Text style={styles.subtitle}>
                {categoryId
                  ? ''
                  : 'เลือกหมวดหมู่ข้อสอบที่ต้องการฝึกฝน'}
              </Text>
            </View>
            <View style={styles.placeholder} />
          </View>

          <View style={styles.progressRow}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>STAGES CLEARED</Text>
              <Text style={styles.statValue}>{player.completedLevels.length}/{levels.length}</Text>
            </View>
            <View style={styles.statCardAccentWrap}>
              <LinearGradient
                colors={['#FF7A5C', '#FF4D3D', shadeColor('#FF4D3D', -20)]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.statCardAccent}
              >
                <Text style={[styles.statLabel, styles.statLabelAccent]}>PLAYER LEVEL</Text>
                <Text style={styles.statValue}>{player.playerLevel}</Text>
              </LinearGradient>
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
            <LinearGradient
              colors={[GOLD, 'rgba(255,207,77,0)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.introAccentBar}
            />
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
                  {/* Terrain mood glow behind this zone, tinted to its theme color */}
                  <View style={styles.zoneAmbientGlow} pointerEvents="none">
                    <LinearGradient
                      colors={[zoneUnlocked ? zone.theme.color : LOCKED_COLOR, 'transparent']}
                      style={StyleSheet.absoluteFillObject}
                    />
                  </View>

                  <View style={styles.zoneBannerStack}>
                    <View
                      style={[
                        styles.zoneBannerPopShadow,
                        { backgroundColor: zoneUnlocked ? shadeColor(zone.theme.color, -45) : '#000' },
                      ]}
                    />
                    <View style={[styles.zoneBanner, { borderColor: zoneUnlocked ? INK : LOCKED_COLOR }]}>
                      {zoneUnlocked ? (
                        <LinearGradient
                          colors={[shadeColor(zone.theme.color, 20), zone.theme.color, shadeColor(zone.theme.color, -18)]}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                          style={StyleSheet.absoluteFillObject}
                        />
                      ) : (
                        <View style={[StyleSheet.absoluteFillObject, { backgroundColor: LOCKED_FILL }]} />
                      )}

                      <View style={styles.zoneIconBadge}>
                        <Text style={styles.zoneIcon}>{zone.theme.icon}</Text>
                      </View>
                      <View style={styles.zoneTitleBlock}>
                        <Text style={[styles.windingSectionTitle, { color: zoneUnlocked ? zone.theme.onColor : MUTED }]}>
                          {zone.title}
                        </Text>
                        <Text style={[styles.zoneProgressText, { color: zoneUnlocked ? zone.theme.onColor : MUTED }]}>
                          {clearedInZone}/{zone.slice.length} cleared
                        </Text>
                      </View>
                      {isCurrentZone && (
                        <View style={styles.startHereBadge}>
                          <Text style={styles.startHereBadgeText}>START HERE</Text>
                        </View>
                      )}
                    </View>
                  </View>

                  {zone.single ? (
                    <View style={styles.windingNodeContainer}>
                      {zone.slice.map((level, index) => {
                        const status = getLevelStatus(level.id, player.completedLevels);
                        const point: NodePoint = {
                          level,
                          cx: bossNodeSize / 2 + 24,
                          cy: bossNodeSize / 2,
                          size: bossNodeSize,
                        };
                        return (
                          <View key={`${level.id}-${index}`} style={{ width: bossNodeSize + 48, height: bossNodeSize + 60 }}>
                            <LevelNode
                              point={point}
                              status={status}
                              theme={zone.theme}
                              pulseAnim={pulseAnim}
                              isFinalBoss
                              onPress={handleLevelSelect}
                            />
                          </View>
                        );
                      })}
                    </View>
                  ) : (
                    <WindingZonePath
                      zone={zone}
                      mapWidth={mapWidth}
                      nodeSize={levelNodeSize}
                      bossNodeSize={bossNodeSize}
                      completedLevels={player.completedLevels}
                      pulseAnim={pulseAnim}
                      onPress={handleLevelSelect}
                    />
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

  // ---- Ambient background ----
  blobTop: {
    position: 'absolute',
    top: -180,
    left: -80,
    width: '140%',
    height: 340,
    opacity: 0.14,
    transform: [{ rotate: '-8deg' }],
  },
  blobBottom: {
    position: 'absolute',
    bottom: -220,
    right: -100,
    width: '140%',
    height: 360,
    opacity: 0.12,
    transform: [{ rotate: '10deg' }],
  },

  pageWrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'web' ? 40 : 28,
  },
  headerCard: {
    backgroundColor: CARD_DARK,
    borderRadius: 28,
    borderWidth: STROKE,
    borderColor: INK,
    padding: 20,
    marginBottom: 16,
    overflow: 'hidden',
  },
  headerAccentBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
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
  statCardAccentWrap: {
    flex: 1,
    borderRadius: 20,
    borderWidth: STROKE,
    borderColor: INK,
    overflow: 'hidden',
    shadowColor: '#FF4D3D',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 6,
  },
  statCardAccent: {
    paddingVertical: 14,
    paddingHorizontal: 16,
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
    color: 'rgba(255,255,255,0.85)',
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
    overflow: 'hidden',
  },
  introAccentBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
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
    overflow: 'hidden',
  },
  zoneAmbientGlow: {
    position: 'absolute',
    top: -60,
    left: -40,
    width: '160%',
    height: 220,
    opacity: 0.18,
  },
  zoneBannerStack: {
    marginBottom: 14,
  },
  zoneBannerPopShadow: {
    position: 'absolute',
    top: 4,
    left: 4,
    right: -4,
    bottom: -4,
    borderRadius: 18,
  },
  zoneBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 18,
    borderWidth: STROKE,
    paddingVertical: 10,
    paddingHorizontal: 14,
    overflow: 'hidden',
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
  windingNodeArea: {
    width: '100%',
    position: 'relative',
  },
  windingNodeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelNodeWrapper: {
    position: 'absolute',
    alignItems: 'center',
  },
  nodeStack: {
    alignItems: 'center',
  },
  popShadow: {
    position: 'absolute',
    top: 5,
    left: 5,
  },
  bossPopShadow: {
    top: 6,
    left: 6,
  },
  levelNode: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: STROKE_THICK,
    overflow: 'hidden',
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