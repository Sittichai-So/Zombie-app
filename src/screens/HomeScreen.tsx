import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
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
    navigation.navigate('LevelMap');
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
        {/* Header */}
      <View style={styles.header}>
        <View style={styles.playerInfo}>
          <View style={styles.avatarContainer}>
            <View style={[styles.avatarCircle, { borderColor: '#ffd700' }]}>
              <Text style={styles.avatarEmoji}>🧟</Text>
            </View>
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
          <View style={[styles.coinBox, { backgroundColor: 'rgba(255, 215, 0, 0.2)'}]}>
            <Text style={styles.coinIcon}>🪙</Text>
            <Text style={styles.coinText}>{player.coins.toLocaleString()}</Text>
          </View>
          <View style={[styles.gemBox, { backgroundColor: 'rgba(147, 112, 219, 0.2)'}]}>
            <Text style={styles.gemIcon}>💎</Text>
            <Text style={styles.gemText}>{player.gems.toLocaleString()}</Text>
          </View>
        </View>
      </View>

      {/* Main Character Display */}
      <View style={styles.characterDisplay}>
        <View style={styles.characterFrame}>
          {selectedCharacter ? (
            <View style={styles.characterPlaceholder}>
              <View style={[styles.characterArtWrapper, { shadowColor: getRarityColor(selectedCharacter.rarity), shadowOpacity: 0.5, shadowRadius: 15, shadowOffset: { width: 0, height: 0 } }]}>
                <View style={[styles.characterArtCircle, { backgroundColor: getRarityColor(selectedCharacter.rarity) + '40' }]}>
                  <Text style={styles.characterEmoji}>{getTypeIcon(selectedCharacter.type)}</Text>
                </View>
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
              <Text style={styles.noCharacter}>ยังไม่ได้เลือกตัวละคร</Text>
              <TouchableOpacity 
                style={styles.selectCharacterButton}
                onPress={handleCharacters}
              >
                <Text style={styles.selectCharacterButtonText}>เลือกตัวละคร</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
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
          <TouchableOpacity 
            style={[styles.menuButton, styles.startGameButton]} 
            onPress={handleStartGame}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={["#ff6b6b", "#e94560"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.menuButtonGradient}
            >
              <View style={styles.menuButtonContent}>
                <View style={[styles.menuButtonIconContainer, { backgroundColor: 'transparent' }]}>
                  <Text style={styles.menuButtonIcon}>⚔️</Text>
                </View>
                <Text style={styles.menuButtonText}>เริ่มเกม</Text>
                <Text style={styles.menuButtonArrow}>➤</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.menuGrid}>
          <TouchableOpacity 
            style={[styles.menuButtonSmall, styles.charactersButton]} 
            onPress={handleCharacters}
            activeOpacity={0.8}
          >
            <View style={[styles.menuButtonIconContainerSmall, { backgroundColor: '#3498db' }]}>
              <Text style={styles.menuButtonIconSmall}>👥</Text>
            </View>
            <Text style={styles.menuButtonTextSmall}>ตัวละคร</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.menuButtonSmall, styles.shopButton]} 
            onPress={handleShop}
            activeOpacity={0.8}
          >
            <View style={[styles.menuButtonIconContainerSmall, { backgroundColor: '#f39c12' }]}>
              <Text style={styles.menuButtonIconSmall}>🏪</Text>
            </View>
            <Text style={styles.menuButtonTextSmall}>ร้านค้า</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuGrid}>
          <TouchableOpacity 
            style={[styles.menuButtonSmall, styles.profileButton]} 
            onPress={handleProfile}
            activeOpacity={0.8}
          >
            <View style={[styles.menuButtonIconContainerSmall, { backgroundColor: '#9b59b6' }]}>
              <Text style={styles.menuButtonIconSmall}>👤</Text>
            </View>
            <Text style={styles.menuButtonTextSmall}>โปรไฟล์</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.menuButtonSmall, styles.settingsButton]} 
            onPress={handleSettings}
            activeOpacity={0.8}
          >
            <View style={[styles.menuButtonIconContainerSmall, { backgroundColor: '#95a5a6' }]}>
              <Text style={styles.menuButtonIconSmall}>⚙️</Text>
            </View>
            <Text style={styles.menuButtonTextSmall}>ตั้งค่า</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Daily Reward Popup */}
      {showDailyReward && (
        <View style={styles.dailyRewardOverlay}>
          <Animated.View style={[styles.dailyRewardPopup, { opacity: fadeAnim }]}>
          <View style={styles.dailyRewardContent}>
            <View style={styles.dailyRewardHeader}>
              <Text style={styles.dailyRewardEmoji}>🎁</Text>
              <Text style={styles.dailyRewardTitle}>โบนัสประจำวัน</Text>
            </View>
            <Text style={styles.dailyRewardDescription}>
              รับโบนัสประจำวันของคุณ
            </Text>
            <View style={styles.rewardItems}>
              <View style={styles.rewardItem}>
                <View style={[styles.rewardIconBox, { backgroundColor: 'rgba(255, 215, 0, 0.2)' }]}>
                  <Text style={styles.rewardIcon}>🪙</Text>
                </View>
                <Text style={styles.rewardAmount}>+500</Text>
                <Text style={styles.rewardLabel}>เหรียญ</Text>
              </View>
              <View style={styles.rewardItem}>
                <View style={[styles.rewardIconBox, { backgroundColor: 'rgba(147, 112, 219, 0.2)' }]}>
                  <Text style={styles.rewardIcon}>💎</Text>
                </View>
                <Text style={styles.rewardAmount}>+5</Text>
                <Text style={styles.rewardLabel}>เจม</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.claimButton}
              onPress={handleClaimDailyReward}
            >
              <Text style={styles.claimButtonText}>รับโบนัส</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: '#1a1a2e',
  },
  backgroundImage: {
    opacity: 0.45,
  },
  backdropOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(6, 10, 20, 0.65)',
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
    paddingBottom: 20,
    backgroundColor: '#16213e',
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
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(233, 69, 96, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e94560',
  },
  avatarEmoji: {
    fontSize: 28,
  },
  levelBadge: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: '#e94560',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#1a1a2e',
  },
  levelText: {
    fontSize: 11,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  playerDetails: {
    justifyContent: 'center',
    flex: 1,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 3,
  },
  playerLevelText: {
    fontSize: 13,
    color: '#a0a0a0',
    fontWeight: '500',
  },
  currency: {
    flexDirection: 'row',
    gap: 10,
  },
  coinBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(243, 156, 18, 0.15)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(243, 156, 18, 0.4)',
    shadowColor: 'rgba(243, 156, 18, 0.3)',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
    minWidth: 90,
  },
  gemBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(155, 89, 182, 0.15)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(155, 89, 182, 0.4)',
    shadowColor: 'rgba(155, 89, 182, 0.3)',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
    minWidth: 80,
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
  characterDisplay: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  characterFrame: {
    width: Math.min(width * 0.6, 220),
    height: Math.min(width * 0.6, 220),
    borderRadius: Math.min(width * 0.3, 110),
    backgroundColor: 'rgba(233, 69, 96, 0.08)',
    borderWidth: 3,
    borderColor: '#e94560',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 25,
    elevation: 12,
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
    backgroundColor: 'rgba(233, 69, 96, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#e94560',
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 8,
  },
  characterEmoji: {
    fontSize: Math.min(width * 0.15, 65),
  },
  characterLevelBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#e94560',
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1a1a2e',
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 4,
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
    color: '#e94560',
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
    paddingBottom: 80,
  },
  menuButton: {
    backgroundColor: 'rgba(233, 69, 96, 0.08)',
    borderRadius: 16,
    marginBottom: 15,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#e94560',
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  startGameButton: {
    backgroundColor: 'rgba(233, 69, 96, 0.15)',
    borderColor: '#e94560',
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 8,
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
    color: '#e94560',
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
    marginBottom: 15,
    gap: 12,
  },
  menuButtonSmall: {
    flex: 1,
    backgroundColor: 'rgba(233, 69, 96, 0.08)',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#e94560',
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  charactersButton: {
    borderColor: '#3498db',
    backgroundColor: 'rgba(52, 152, 219, 0.15)',
  },
  shopButton: {
    borderColor: '#f39c12',
    backgroundColor: 'rgba(243, 156, 18, 0.15)',
  },
  profileButton: {
    borderColor: '#9b59b6',
    backgroundColor: 'rgba(155, 89, 182, 0.15)',
  },
  settingsButton: {
    borderColor: '#95a5a6',
    backgroundColor: 'rgba(149, 165, 166, 0.15)',
  },
  menuButtonIconContainerSmall: {
    width: 45,
    height: 45,
    borderRadius: 22,
    backgroundColor: 'rgba(233, 69, 96, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 3,
  },
  menuButtonIconSmall: {
    fontSize: 24,
  },
  menuButtonTextSmall: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: 0.2,
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
    backgroundColor: 'rgba(233, 69, 96, 0.08)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(233, 69, 96, 0.3)',
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
  dailyRewardPopup: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  dailyRewardContent: {
    backgroundColor: '#16213e',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#e94560',
    width: '85%',
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 12,
  },
  dailyRewardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  dailyRewardEmoji: {
    fontSize: 40,
    marginRight: 10,
  },
  dailyRewardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e94560',
  },
  dailyRewardDescription: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  rewardLabel: {
    fontSize: 12,
    color: '#cccccc',
    marginTop: 5,
  },
  rewardItems: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
  },
  rewardItem: {
    alignItems: 'center',
  },
  rewardIconBox: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  rewardIcon: {
    fontSize: 35,
  },
  rewardAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 5,
  },
  claimButton: {
    backgroundColor: '#e94560',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
  claimButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  dailyRewardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
});

export default HomeScreen;