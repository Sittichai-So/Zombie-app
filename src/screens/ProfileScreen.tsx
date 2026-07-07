import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGame } from '../context/GameContext';
import { characters } from '../data/characters';
import i18n from '@/i18n';

const { width } = Dimensions.get('window');

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { player, resetGame } = useGame();

  const handleResetGame = () => {
    Alert.alert(
      'ยืนยันการรีเซ็ต',
      'คุณแน่ใจหรือไม่? ความคืบหน้าทั้งหมดจะหายไป!',
      [
        {
          text: 'ยกเลิก',
          style: 'cancel',
        },
        {
          text: 'รีเซ็ตเกม',
          style: 'destructive',
          onPress: async () => {
            await resetGame();
            Alert.alert('สำเร็จ', 'รีเซ็ตเกมสำเร็จ!');
          },
        },
      ]
    );
  };

  const accuracy = player.totalScore > 0 
    ? ((player.completedLevels.length / 20) * 100).toFixed(1) 
    : 0;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>โปรไฟล์</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={[styles.scrollView, Platform.OS === 'web' && { minHeight: '100%' }]} 
        showsVerticalScrollIndicator={true}
        contentContainerStyle={[styles.scrollContent, { flexGrow: 1 }, Platform.OS === 'web' && { minHeight: '100%' }, Platform.OS === 'web' && { paddingBottom: 100 }]}
        nestedScrollEnabled={Platform.OS !== 'web'}
        bounces={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarEmoji}>👤</Text>
          </View>
          <Text style={styles.username}>{player.username}</Text>
          <Text style={styles.playerLevel}>
            เลเวล {player.playerLevel}
          </Text>
          
          {/* Experience Bar */}
          <View style={styles.expContainer}>
            <View style={styles.expBar}>
              <View 
                style={[
                  styles.expFill, 
                  { width: `${(player.experience % 100)}%` }
                ]} 
              />
            </View>
            <Text style={styles.expText}>
              {player.experience} / {Math.floor(player.experience / 100) * 100 + 100} EXP
            </Text>
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 สถิติ</Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>🏆</Text>
              <Text style={styles.statLabel}>คะแนนรวม</Text>
              <Text style={styles.statValue}>{player.totalScore}</Text>
            </View>
            
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>📚</Text>
              <Text style={styles.statLabel}>ด่านสูงสุด</Text>
              <Text style={styles.statValue}>{player.highestLevelCompleted}</Text>
            </View>
            
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>✅</Text>
              <Text style={styles.statLabel}>ผ่านแล้ว</Text>
              <Text style={styles.statValue}>{player.completedLevels.length}</Text>
            </View>
            
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>🎯</Text>
              <Text style={styles.statLabel}>ความแม่นยำ</Text>
              <Text style={styles.statValue}>{accuracy}%</Text>
            </View>
          </View>
        </View>

        {/* Currency */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💰 สกุลเงิน</Text>
          
          <View style={styles.currencyRow}>
            <View style={styles.currencyCard}>
              <Text style={styles.currencyIcon}>🪙</Text>
              <Text style={styles.currencyLabel}>เหรียญ</Text>
              <Text style={styles.currencyValue}>{player.coins}</Text>
            </View>
            
            <View style={styles.currencyCard}>
              <Text style={styles.currencyIcon}>💎</Text>
              <Text style={styles.currencyLabel}>เจม</Text>
              <Text style={styles.currencyValue}>{player.gems}</Text>
            </View>
          </View>
        </View>

        {/* Characters */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            👥 ตัวละครที่มี
          </Text>
          
          <View style={styles.charactersProgress}>
            <Text style={styles.charactersText}>
              {player.ownedCharacters.length} / {characters.length}
            </Text>
            <View style={styles.progressBg}>
              <View 
                style={[
                  styles.progressBar, 
                  { width: `${(player.ownedCharacters.length / characters.length) * 100}%` }
                ]} 
              />
            </View>
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏅 ความสำเร็จ</Text>
          
          <View style={styles.achievementList}>
            <View style={styles.achievement}>
              <Text style={styles.achievementIcon}>
                {player.highestLevelCompleted >= 5 ? '✅' : '🔒'}
              </Text>
              <View style={styles.achievementInfo}>
                <Text style={styles.achievementTitle}>ก้าวแรก</Text>
                <Text style={styles.achievementDesc}>ผ่านด่าน 5</Text>
              </View>
            </View>
            
            <View style={styles.achievement}>
              <Text style={styles.achievementIcon}>
                {player.highestLevelCompleted >= 10 ? '✅' : '🔒'}
              </Text>
              <View style={styles.achievementInfo}>
                <Text style={styles.achievementTitle}>ครึ่งทางแล้ว</Text>
                <Text style={styles.achievementDesc}>ผ่านด่าน 10</Text>
              </View>
            </View>
            
            <View style={styles.achievement}>
              <Text style={styles.achievementIcon}>
                {player.highestLevelCompleted >= 20 ? '✅' : '🔒'}
              </Text>
              <View style={styles.achievementInfo}>
                <Text style={styles.achievementTitle}>แชมป์เปี้ยน</Text>
                <Text style={styles.achievementDesc}>ผ่านทุกด่าน</Text>
              </View>
            </View>
            
            <View style={styles.achievement}>
              <Text style={styles.achievementIcon}>
                {player.ownedCharacters.length >= 5 ? '✅' : '🔒'}
              </Text>
              <View style={styles.achievementInfo}>
                <Text style={styles.achievementTitle}>นักสะสม</Text>
                <Text style={styles.achievementDesc}>มี 5 ตัวละคร</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Account Actions */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleResetGame}
          >
            <Text style={styles.actionButtonText}>
              🗑️ ลบบัญชี
            </Text>
          </TouchableOpacity>
        </View>

        {/* Game Info */}
        <View style={styles.gameInfo}>
          <Text style={styles.gameInfoText}>
            เวอร์ชัน: 1.0.0
          </Text>
          <Text style={styles.gameInfoText}>
            Zombie Quiz RPG © 2024
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 12,
    backgroundColor: '#16213e',
  },
  backButton: {
    fontSize: 28,
    color: '#e94560',
    fontWeight: 'bold',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(233, 69, 96, 0.1)',
    textAlign: 'center',
    lineHeight: 40,
    borderWidth: 2,
    borderColor: '#e94560',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 80,
    maxWidth: 760,
    width: '100%',
    alignSelf: 'center',
  },
  profileCard: {
    backgroundColor: 'rgba(233, 69, 96, 0.08)',
    borderRadius: 25,
    padding: 25,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#e94560',
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 10,
  },
  avatar: {
    width: Math.min(width * 0.25, 110),
    height: Math.min(width * 0.25, 110),
    borderRadius: Math.min(width * 0.125, 55),
    backgroundColor: 'rgba(233, 69, 96, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 4,
    borderColor: '#e94560',
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
  avatarEmoji: {
    fontSize: Math.min(width * 0.15, 65),
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  playerLevel: {
    fontSize: 16,
    color: '#e94560',
    marginBottom: 15,
  },
  expContainer: {
    width: '100%',
  },
  expBar: {
    height: 10,
    backgroundColor: '#16213e',
    borderRadius: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e94560',
  },
  expFill: {
    height: '100%',
    backgroundColor: '#e94560',
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  expText: {
    color: '#ffffff',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e94560',
    marginBottom: 10,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: 'rgba(233, 69, 96, 0.08)',
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e94560',
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  statIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  statLabel: {
    color: '#cccccc',
    fontSize: 12,
    marginBottom: 5,
  },
  statValue: {
    color: '#ffffff',
    fontSize: 19,
    fontWeight: 'bold',
  },
  currencyRow: {
    flexDirection: 'row',
    gap: 10,
  },
  currencyCard: {
    flex: 1,
    backgroundColor: 'rgba(233, 69, 96, 0.08)',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e94560',
  },
  currencyIcon: {
    fontSize: 30,
    marginBottom: 5,
  },
  currencyLabel: {
    color: '#cccccc',
    fontSize: 12,
    marginBottom: 5,
  },
  currencyValue: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  charactersProgress: {
    backgroundColor: '#16213e',
    borderRadius: 15,
    padding: 15,
    borderWidth: 2,
    borderColor: '#0f3460',
  },
  charactersText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  progressBg: {
    height: 10,
    backgroundColor: '#16213e',
    borderRadius: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e94560',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#e94560',
  },
  achievementList: {
    backgroundColor: 'rgba(233, 69, 96, 0.08)',
    borderRadius: 15,
    padding: 15,
    borderWidth: 2,
    borderColor: '#e94560',
  },
  achievement: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#0f3460',
  },
  achievementIcon: {
    fontSize: 30,
    marginRight: 15,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  achievementDesc: {
    color: '#cccccc',
    fontSize: 12,
  },
  actionButton: {
    backgroundColor: '#e94560',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ff6b6b',
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  gameInfo: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  gameInfoText: {
    color: '#a0a0a0',
    fontSize: 12,
    marginBottom: 5,
  },
});

export default ProfileScreen;
