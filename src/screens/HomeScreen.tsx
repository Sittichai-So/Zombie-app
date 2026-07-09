import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGame } from '../context/GameContext';
import { getCharacterById } from '../data/characters';
import { LinearGradient } from 'expo-linear-gradient';
import { playSound, vibrate } from '../utils/helpers';
import i18n from '@/i18n';
import { Button, Mascot } from '../components';


const { width } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { player, claimDailyReward, currentLevel } = useGame();
  const [showDailyReward, setShowDailyReward] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const startPulseAnim = useState(new Animated.Value(1))[0];

  const selectedCharacter = getCharacterById(player.selectedCharacterId);

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
    // Check if daily reward is available
    const today = new Date().toDateString();
    if (player.lastDailyReward !== today) {
      setShowDailyReward(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: Platform.OS !== 'web',
      }).start();
    }

    Animated.loop(
      Animated.sequence([
        Animated.timing(startPulseAnim, {
          toValue: 1.03,
          duration: 900,
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.timing(startPulseAnim, {
          toValue: 1,
          duration: 900,
          useNativeDriver: Platform.OS !== 'web',
        }),
      ])
    ).start();
  }, []);

  const handleClaimDailyReward = async () => {
    await claimDailyReward();
    setShowDailyReward(false);
    playSound('reward');
    vibrate([10, 20, 10]);
  };

  const handleStartGame = () => {
    playSound('click');
    vibrate(10);
    navigation.navigate('Categories');
  };

  const handleCharacters = () => {
    navigation.navigate('Characters');
  };

  const handleShop = () => {
    navigation.navigate('Shop');
  };

  const handleProfile = () => {
    navigation.navigate('Profile');
  };

  const handleSettings = () => {
    navigation.navigate('Settings');
  };

  return (
    <ImageBackground
      source={require('../../assets/images/home_bg.png')}
      style={styles.container}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.backdropOverlay} />
      <View style={styles.pageContent}>
        {/* Header with minimal cute zombie design */}
        <LinearGradient
          colors={['rgba(30, 41, 59, 0.95)', 'rgba(15, 23, 42, 0.85)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.playerInfo}>
            <View style={styles.avatarContainer}>
              <LinearGradient
                colors={['#6366F1', '#8B5CF6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.avatarCircle}
              >
                <Text style={styles.avatarEmoji}>🧟</Text>
              </LinearGradient>
              <View style={styles.levelBadge}>
                <Text style={styles.levelText}>{player.playerLevel}</Text>
              </View>
            </View>
            <View style={styles.playerDetails}>
              <Text style={styles.username}>{player.username}</Text>
              <Text style={styles.playerLevelText}>เลเวล {player.playerLevel}</Text>
            </View>
          </View>
          <View style={styles.currency}>
            <LinearGradient
              colors={['rgba(245, 158, 11, 0.2)', 'rgba(251, 191, 36, 0.15)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.coinBox}
            >
              <Text style={styles.coinIcon}>🪙</Text>
              <Text style={styles.coinText}>{player.coins.toLocaleString()}</Text>
            </LinearGradient>
            <LinearGradient
              colors={['rgba(139, 92, 246, 0.2)', 'rgba(167, 139, 250, 0.15)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gemBox}
            >
              <Text style={styles.gemIcon}>💎</Text>
              <Text style={styles.gemText}>{player.gems.toLocaleString()}</Text>
            </LinearGradient>
          </View>
        </LinearGradient>
      
      {/* <View style={styles.mascotSection}>
        <Mascot 
          emotion="happy" 
          size="medium"
          message="พร้อมสู้ซอมบี้หรือยัง!"
        />
      </View> */}

      {/* Main Character Display with minimal cute zombie design */}
      <View style={styles.characterDisplay}>
        <LinearGradient
          colors={['rgba(132, 204, 22, 0.15)', 'rgba(30, 41, 59, 0.85)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.characterFrame}
        >
          {selectedCharacter ? (
            <View style={styles.characterPlaceholder}>
              <View style={styles.characterArtWrapper}>
                <LinearGradient
                  colors={[getRarityColor(selectedCharacter.rarity) + '60', getRarityColor(selectedCharacter.rarity) + '30']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={[styles.characterArtCircle, { borderColor: getRarityColor(selectedCharacter.rarity) }]}
                >
                  <Text style={styles.characterEmoji}>{getTypeIcon(selectedCharacter.type)}</Text>
                </LinearGradient>
                <View style={[styles.characterLevelBadge, { backgroundColor: getRarityColor(selectedCharacter.rarity) }]}>
                  <Text style={styles.characterLevelText}>{player.characterLevels[selectedCharacter.id] || 1}</Text>
                </View>
              </View>
              <Text style={styles.characterName}>
                {selectedCharacter.name_th}
              </Text>
              <Text style={[styles.characterRarity, { color: getRarityColor(selectedCharacter.rarity) }]}>
                {selectedCharacter.rarity.toUpperCase()}
              </Text>
              <View style={styles.statsPreview}>
                <View style={styles.statMini}>
                  <Text style={styles.statMiniIcon}>⚔️</Text>
                  <Text style={styles.statMiniValue}>{selectedCharacter.baseStats.attack}</Text>
                </View>
                <View style={styles.statMini}>
                  <Text style={styles.statMiniIcon}>🛡️</Text>
                  <Text style={styles.statMiniValue}>{selectedCharacter.baseStats.defense}</Text>
                </View>
                <View style={styles.statMini}>
                  <Text style={styles.statMiniIcon}>💨</Text>
                  <Text style={styles.statMiniValue}>{selectedCharacter.baseStats.speed}</Text>
                </View>
                <View style={styles.statMini}>
                  <Text style={styles.statMiniIcon}>❤️</Text>
                  <Text style={styles.statMiniValue}>{selectedCharacter.baseStats.health}</Text>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.noCharacterContainer}>
              <Mascot emotion="thinking" size="small" message="เลือกตัวละครของคุณ!" />
              <Text style={styles.noCharacter}>ยังไม่ได้เลือกตัวละคร</Text>
              <Button
                title="เลือกตัวละคร"
                onPress={handleCharacters}
                variant="mascot"
                size="medium"
                icon="👥"
              />
            </View>
          )}
        </LinearGradient>
      </View>

      {/* Menu Buttons */}
      <ScrollView 
        style={[styles.menuContainer, Platform.OS === 'web' && { minHeight: '100%' }]} 
        showsVerticalScrollIndicator={true}
        contentContainerStyle={[styles.menuScrollContent, { flexGrow: 1 }, Platform.OS === 'web' && { minHeight: '100%' }, Platform.OS === 'web' && { paddingBottom: 100 }]}
        nestedScrollEnabled={Platform.OS !== 'web'}
        bounces={false}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View style={{ transform: [{ scale: startPulseAnim }] }}>
          <Button
            title="เริ่มเกม"
            onPress={handleStartGame}
            variant="primary"
            size="large"
            icon="⚔️"
            gradient={true}
            style={styles.startButton}
          />
        </Animated.View>

        <View style={styles.menuGrid}>
          <Button
            title="ตัวละคร"
            onPress={handleCharacters}
            variant="secondary"
            size="medium"
            icon="👥"
            gradient={true}
            style={styles.menuGridButton}
          />
          <Button
            title="ร้านค้า"
            onPress={handleShop}
            variant="secondary"
            size="medium"
            icon="🏪"
            gradient={true}
            style={styles.menuGridButton}
          />
        </View>

        <View style={styles.menuGrid}>
          <Button
            title="โปรไฟล์"
            onPress={handleProfile}
            variant="secondary"
            size="medium"
            icon="👤"
            gradient={true}
            style={styles.menuGridButton}
          />
          <Button
            title="ตั้งค่า"
            onPress={handleSettings}
            variant="secondary"
            size="medium"
            icon="⚙️"
            gradient={true}
            style={styles.menuGridButton}
          />
        </View>
      </ScrollView>

      {/* Daily Reward Popup with modern design */}
      {showDailyReward && (
        <View style={styles.dailyRewardOverlay}>
          <Animated.View style={[styles.dailyRewardPopup, { opacity: fadeAnim }]}>
            <LinearGradient
              colors={['#C084FC', '#E9B5FA']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.dailyRewardContent}
            >
              <Mascot emotion="celebrating" size="small" message="ยินดีด้วย!" />
              <View style={styles.dailyRewardHeader}>
                <Text style={styles.dailyRewardEmoji}>🎁</Text>
                <Text style={styles.dailyRewardTitle}>โบนัสประจำวัน</Text>
              </View>
              <Text style={styles.dailyRewardDescription}>
                รับโบนัสประจำวันของคุณ
              </Text>
              <View style={styles.rewardItems}>
                <View style={styles.rewardItem}>
                  <LinearGradient
                    colors={['rgba(245, 158, 11, 0.3)', 'rgba(251, 191, 36, 0.15)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.rewardIconBox}
                  >
                    <Text style={styles.rewardIcon}>🪙</Text>
                  </LinearGradient>
                  <Text style={styles.rewardAmount}>+500</Text>
                  <Text style={styles.rewardLabel}>เหรียญ</Text>
                </View>
                <View style={styles.rewardItem}>
                  <LinearGradient
                    colors={['rgba(139, 92, 246, 0.3)', 'rgba(167, 139, 250, 0.15)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.rewardIconBox}
                  >
                    <Text style={styles.rewardIcon}>💎</Text>
                  </LinearGradient>
                  <Text style={styles.rewardAmount}>+5</Text>
                  <Text style={styles.rewardLabel}>เจม</Text>
                </View>
              </View>
              <Button
                title="รับโบนัส"
                onPress={handleClaimDailyReward}
                variant="success"
                size="large"
                gradient={true}
                style={styles.claimButton}
              />
            </LinearGradient>
          </Animated.View>
        </View>
      )}
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0e1a',
  },
  backgroundImage: {
    opacity: 0.35,
  },
  backdropOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(6, 10, 20, 0.75)',
    pointerEvents: 'none',
  },
  pageContent: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    marginRight: 12,
    position: 'relative',
  },
  avatarCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  avatarEmoji: {
    fontSize: 30,
  },
  levelBadge: {
    position: 'absolute',
    bottom: -3,
    right: -3,
    backgroundColor: '#ffd700',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#0a0e1a',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  levelText: {
    fontSize: 10,
    color: '#000000',
    fontWeight: 'bold',
  },
  playerDetails: {
    justifyContent: 'center',
    flex: 1,
  },
  username: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  playerLevelText: {
    fontSize: 12,
    color: '#b0b0b0',
    fontWeight: '500',
  },
  currency: {
    flexDirection: 'row',
    gap: 8,
  },
  coinBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'rgba(245, 158, 11, 0.5)',
    shadowColor: 'rgba(245, 158, 11, 0.4)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
    minWidth: 85,
  },
  gemBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'rgba(139, 92, 246, 0.5)',
    shadowColor: 'rgba(139, 92, 246, 0.4)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
    minWidth: 75,
  },
  coinIcon: {
    fontSize: 20,
    marginRight: 6,
  },
  coinText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f39c12',
  },
  gemIcon: {
    fontSize: 18,
    marginRight: 6,
  },
  gemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#9b59b6',
  },
  mascotSection: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  characterDisplay: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  characterFrame: {
    width: Math.min(width * 0.65, 240),
    height: Math.min(width * 0.65, 240),
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#84CC16',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 12,
    borderWidth: 2,
    borderColor: 'rgba(132, 204, 22, 0.4)',
  },
  characterPlaceholder: {
    alignItems: 'center',
  },
  characterArtWrapper: {
    position: 'relative',
    marginBottom: 12,
  },
  characterArtCircle: {
    width: Math.min(width * 0.25, 100),
    height: Math.min(width * 0.25, 100),
    borderRadius: Math.min(width * 0.125, 50),
    backgroundColor: 'rgba(132, 204, 22, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#84CC16',
    shadowColor: '#84CC16',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 18,
    elevation: 10,
  },
  characterEmoji: {
    fontSize: Math.min(width * 0.15, 65),
  },
  characterLevelBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#84CC16',
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1E293B',
    shadowColor: '#84CC16',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 6,
  },
  characterLevelText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  characterName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 6,
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  characterRarity: {
    fontSize: 13,
    fontWeight: '700',
    color: '#84CC16',
    marginBottom: 12,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  noCharacterContainer: {
    alignItems: 'center',
  },
  noCharacter: {
    fontSize: 16,
    color: '#a0a0a0',
    marginBottom: 15,
  },
  selectCharacterButton: {
    backgroundColor: '#e94560',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 20,
  },
  selectCharacterButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  menuContainer: {
    flex: 1,
    paddingHorizontal: 20,
    width: '100%',
  },
  menuScrollContent: {
    paddingBottom: 100,
    gap: 16,
  },
  startButton: {
    marginBottom: 8,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  menuButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  menuButtonIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e94560',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  menuButtonIcon: {
    fontSize: 26,
  },
  menuButtonText: {
    flex: 1,
    fontSize: 19,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 0.3,
  },
  menuButtonArrow: {
    fontSize: 26,
    color: '#6366F1',
    fontWeight: 'bold',
  },
  menuButtonGradient: {
    borderRadius: 16,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  menuGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  menuGridButton: {
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  characterLevel: {
    fontSize: 12,
    color: '#e94560',
    marginTop: 2,
  },
  statsPreview: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    backgroundColor: 'rgba(132, 204, 22, 0.08)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(132, 204, 22, 0.3)',
  },
  statMini: {
    alignItems: 'center',
    minWidth: 40,
  },
  statMiniIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  statMiniValue: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  dailyRewardOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  dailyRewardPopup: {
    width: '90%',
    maxWidth: 400,
  },
  dailyRewardContent: {
    padding: 30,
    borderRadius: 32,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#C084FC',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 28,
    elevation: 18,
  },
  dailyRewardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 10,
  },
  dailyRewardEmoji: {
    fontSize: 40,
    marginRight: 10,
  },
  dailyRewardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#C084FC',
    textShadowColor: 'rgba(192, 132, 252, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  dailyRewardDescription: {
    fontSize: 16,
    color: '#b0b0b0',
    textAlign: 'center',
    marginBottom: 20,
  },
  rewardItems: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 25,
  },
  rewardItem: {
    alignItems: 'center',
  },
  rewardIconBox: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  rewardIcon: {
    fontSize: 28,
  },
  rewardAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  rewardLabel: {
    fontSize: 12,
    color: '#a0a0a0',
  },
  claimButton: {
    marginTop: 10,
  },
});

export default HomeScreen;