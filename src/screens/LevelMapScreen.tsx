import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Platform,
  ImageBackground,
  Alert,
  useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGame } from '../context/GameContext';
import { levels, isLevelUnlocked } from '../data/levels';

const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground);

// ---- Design tokens -------------------------------------------------------
// Escalating danger palette: each zone gets progressively more dangerous
// as the player moves deeper into the apocalypse. Locked / boss zones read
// visually distinct so difficulty is legible before you even tap a node.
const ZONE_THEME = {
  outset: { color: '#6BFF8F', glow: 'rgba(107, 255, 143, 0.16)', icon: '🌱' },
  outbreak: { color: '#FFD93C', glow: 'rgba(255, 217, 60, 0.16)', icon: '🦠' },
  deadzone: { color: '#FF9F3C', glow: 'rgba(255, 159, 60, 0.16)', icon: '☣️' },
  wasteland: { color: '#FF6B3C', glow: 'rgba(255, 107, 60, 0.16)', icon: '🔥' },
  apocalypse: { color: '#FF3B57', glow: 'rgba(255, 59, 87, 0.18)', icon: '💀' },
  judgment: { color: '#C13BFF', glow: 'rgba(193, 59, 255, 0.22)', icon: '👑' },
};

const LOCKED_COLOR = '#4B5573';
const GOLD = '#FFCF4D';

const LevelMapScreen: React.FC = () => {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation<any>();
  const { player, startLevel } = useGame();
  const levelNodeSize = Math.min(width * 0.2, 92);
  const levelNodeRadius = levelNodeSize / 2;
  const bossNodeSize = Math.min(width * 0.28, 116);
  const bossNodeRadius = bossNodeSize / 2;
  const pageHeight = Math.max(height, 760);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [cardScale] = useState(new Animated.Value(0.96));
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 650,
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.spring(cardScale, {
        toValue: 1,
        tension: 42,
        friction: 8,
        useNativeDriver: Platform.OS !== 'web',
      }),
    ]).start();

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

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1100,
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.timing(glowAnim, {
          toValue: 0.4,
          duration: 1100,
          useNativeDriver: Platform.OS !== 'web',
        }),
      ])
    ).start();
  }, []);

  const handleLevelSelect = (levelId: number) => {
    const level = levels.find(l => l.id === levelId);
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
    navigation.navigate('Battle', { levelId });
  };

  const getLevelStatus = (levelId: number) => {
    if (player.completedLevels.includes(levelId)) return 'completed';
    if (levelId === 1) return 'current';
    if (isLevelUnlocked(levelId, player.completedLevels)) return 'available';
    return 'locked';
  };

  const renderConnector = (unlocked: boolean, theme: typeof ZONE_THEME.outset) => (
    <View style={styles.connectorTrack}>
      {[0, 1, 2].map(i => (
        <View
          key={i}
          style={[
            styles.connectorDot,
            { backgroundColor: unlocked ? theme.color : LOCKED_COLOR, opacity: unlocked ? 0.9 : 0.35 },
          ]}
        />
      ))}
    </View>
  );

  const renderLevelNode = (level: any, index: number, theme: typeof ZONE_THEME.outset) => {
    const status = getLevelStatus(level.id);
    const isBoss = level.difficulty === 'boss';
    const isLocked = status === 'locked';
    const ringColor = isLocked ? LOCKED_COLOR : theme.color;
    const nodeSize = isBoss ? bossNodeSize : levelNodeSize;
    const nodeRadius = isBoss ? bossNodeRadius : levelNodeRadius;

    return (
      <Animated.View
        key={`${level.id}-${index}`}
        style={[
          styles.levelNodeWrapper,
          {
            transform: [{ scale: status === 'current' ? pulseAnim : 1 }],
          },
        ]}
      >
        {status === 'current' && (
          <Animated.View
            style={[
              styles.currentGlowRing,
              {
                width: nodeSize + 22,
                height: nodeSize + 22,
                borderRadius: (nodeSize + 22) / 2,
                borderColor: theme.color,
                opacity: glowAnim,
              },
            ]}
          />
        )}

        <TouchableOpacity
          style={[
            styles.levelNode,
            {
              width: nodeSize,
              height: nodeSize,
              borderRadius: nodeRadius,
              borderColor: ringColor,
              backgroundColor: isLocked ? 'rgba(30, 34, 48, 0.9)' : `${theme.color}22`,
            },
            isBoss && styles.bossNode,
          ]}
          onPress={() => handleLevelSelect(level.id)}
          disabled={isLocked}
          activeOpacity={0.75}
        >
          {isLocked ? (
            <Text style={styles.lockIcon}>🔒</Text>
          ) : (
            <>
              <Text style={styles.nodeEmoji}>{isBoss ? theme.icon : status === 'completed' ? '✅' : theme.icon}</Text>
              <Text style={[styles.levelNumber, { color: isBoss ? GOLD : '#ffffff' }]}>
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

        <View
          style={[
            styles.nodeStatusBar,
            { backgroundColor: isLocked ? 'rgba(75, 85, 115, 0.25)' : `${ringColor}26` },
          ]}
        >
          <Text style={[styles.nodeStatusText, { color: isLocked ? '#8891ab' : ringColor }]}>
            {isBoss ? 'FINAL BOSS' : `Day ${level.day}`}
          </Text>
        </View>
      </Animated.View>
    );
  };

  const reversedLevels = [...levels].reverse();

  const zones = [
    { title: 'DAY 100 · JUDGMENT DAY', theme: ZONE_THEME.judgment, slice: reversedLevels.slice(0, 1), single: true },
    { title: 'DAY 81–95 · APOCALYPSE', theme: ZONE_THEME.apocalypse, slice: reversedLevels.slice(1, 5) },
    { title: 'DAY 61–80 · WASTELAND', theme: ZONE_THEME.wasteland, slice: reversedLevels.slice(5, 9) },
    { title: 'DAY 41–60 · DEAD ZONE', theme: ZONE_THEME.deadzone, slice: reversedLevels.slice(9, 13) },
    { title: 'DAY 21–40 · OUTBREAK', theme: ZONE_THEME.outbreak, slice: reversedLevels.slice(13, 17) },
    { title: 'DAY 1–20 · OUTSET', theme: ZONE_THEME.outset, slice: reversedLevels.slice(17) },
  ];

  return (
    <AnimatedImageBackground
      source={require('../../assets/images/level_map_bg.png')}
      style={[styles.container, { opacity: fadeAnim, transform: [{ scale: cardScale }] }]}
      imageStyle={{ opacity: 0.9 }}
    >
      <View style={styles.backdropOverlay} />
      <View style={styles.pageWrapper}>
        <View style={styles.headerCard}>
          <View style={styles.headerTop}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonWrapper}>
              <Text style={styles.backButton}>←</Text>
            </TouchableOpacity>
            <View style={styles.headerTitleBlock}>
              <Text style={styles.title}>💀 LEVEL MAP</Text>
              <Text style={styles.subtitle}>Choose your route through the apocalypse</Text>
            </View>
            <View style={styles.placeholder} />
          </View>
          

          <View style={styles.progressRow}>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>🎯</Text>
              <View>
                <Text style={styles.statLabel}>Stages Cleared</Text>
                <Text style={styles.statValue}>{player.completedLevels.length}/{levels.length}</Text>
              </View>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>⚡</Text>
              <View>
                <Text style={styles.statLabel}>Player Level</Text>
                <Text style={styles.statValue}>{player.playerLevel}</Text>
              </View>
            </View>
          </View>
        </View>

        <ScrollView
          style={[styles.mapScrollView, Platform.OS === 'web' && { minHeight: '100%' }]}
          contentContainerStyle={[styles.mapScrollContent, { flexGrow: 1 }, Platform.OS === 'web' && { minHeight: pageHeight }]}
          showsVerticalScrollIndicator={true}
          scrollEnabled
          bounces={false}
          nestedScrollEnabled={Platform.OS !== 'web'}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.introCard}>
            <Text style={styles.introTitle}>📖 SURVIVAL STORY</Text>
            <Text style={styles.introText}>Lead your survivors from Day 1 through the end of the apocalypse.</Text>
            <Text style={styles.introSubtext}>Unlock zones, choose your route, and take on the final boss.</Text>
          </View>

          <View style={styles.pathContainer}>
            {zones.map((zone, zi) => {
              const clearedInZone = zone.slice.filter((l: any) => player.completedLevels.includes(l.id)).length;
              const zoneUnlocked = zone.slice.some((l: any) => getLevelStatus(l.id) !== 'locked');

              return (
                <View
                  key={zone.title}
                  style={[
                    styles.windingSection,
                    { borderColor: `${zone.theme.color}40`, backgroundColor: zoneUnlocked ? zone.theme.glow : 'rgba(20, 24, 36, 0.85)' },
                  ]}
                >
                  <View style={styles.zoneBanner}>
                    <View style={[styles.zoneStripe, { backgroundColor: zoneUnlocked ? zone.theme.color : LOCKED_COLOR }]} />
                    <Text style={styles.zoneIcon}>{zone.theme.icon}</Text>
                    <View style={styles.zoneTitleBlock}>
                      <Text style={[styles.windingSectionTitle, { color: zoneUnlocked ? zone.theme.color : '#8891ab' }]}>
                        {zone.title}
                      </Text>
                      <Text style={styles.zoneProgressText}>{clearedInZone}/{zone.slice.length} cleared</Text>
                    </View>
                  </View>

                  {zone.single ? (
                    <View style={styles.windingNodeContainer}>
                      {zone.slice.map((level: any, index: number) => renderLevelNode(level, index, zone.theme))}
                    </View>
                  ) : (
                    <View style={styles.windingPath}>
                      {zone.slice.map((level: any, index: number) => (
                        <React.Fragment key={level.id}>
                          <View style={[styles.windingNodeWrapper, index % 2 === 0 ? styles.left : styles.right]}>
                            {renderLevelNode(level, index, zone.theme)}
                          </View>
                          {index < zone.slice.length - 1 &&
                            renderConnector(getLevelStatus(level.id) !== 'locked', zone.theme)}
                        </React.Fragment>
                      ))}
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </AnimatedImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#05070f',
    width: '100%',
  },
  backdropOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(4, 8, 20, 0.55)',
    pointerEvents: 'none',
  },
  pageWrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'web' ? 40 : 28,
  },
  headerCard: {
    backgroundColor: 'rgba(11, 15, 28, 0.95)',
    borderRadius: 28,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 59, 87, 0.22)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.3,
    shadowRadius: 28,
    elevation: 12,
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
    backgroundColor: 'rgba(255, 59, 87, 0.14)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 59, 87, 0.3)',
  },
  backButton: {
    fontSize: 22,
    color: '#FF6B7B',
    fontWeight: '700',
  },
  headerTitleBlock: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 4,
  },
  subtitle: {
    color: '#9AA8C7',
    fontSize: 12,
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  statIcon: {
    fontSize: 22,
  },
  statLabel: {
    color: '#9AA8C7',
    fontSize: 11,
    marginBottom: 4,
  },
  statValue: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
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
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    padding: 18,
    marginBottom: 18,
  },
  introTitle: {
    color: GOLD,
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  introText: {
    color: '#D7E0FF',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 6,
  },
  introSubtext: {
    color: '#9AA8C7',
    fontSize: 12.5,
  },
  pathContainer: {
    position: 'relative',
  },
  windingSection: {
    marginBottom: 20,
    padding: 16,
    borderRadius: 26,
    borderWidth: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 18,
    elevation: 8,
  },
  zoneBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 10,
  },
  zoneStripe: {
    width: 4,
    height: 34,
    borderRadius: 2,
  },
  zoneIcon: {
    fontSize: 22,
  },
  zoneTitleBlock: {
    flex: 1,
  },
  zoneProgressText: {
    color: '#9AA8C7',
    fontSize: 11,
    marginTop: 2,
    fontWeight: '600',
  },
  windingSectionTitle: {
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.8,
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
  connectorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  levelNodeWrapper: {
    alignItems: 'center',
  },
  currentGlowRing: {
    position: 'absolute',
    top: -11,
    left: '50%',
    marginLeft: -0.5,
    borderWidth: 2,
  },
  levelNode: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2.5,
    shadowColor: '#ff4e75',
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  bossNode: {
    borderWidth: 3,
    shadowColor: '#C13BFF',
    shadowOpacity: 0.45,
  },
  nodeEmoji: {
    fontSize: 24,
    marginBottom: 2,
  },
  lockIcon: {
    fontSize: 22,
    opacity: 0.7,
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
    borderColor: '#05070f',
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
  },
  nodeStatusText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
});

export default LevelMapScreen;
