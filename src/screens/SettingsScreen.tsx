import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGame } from '../context/GameContext';
import i18n from '@/i18n';

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { player, updatePlayer } = useGame();

  const [soundEnabled, setSoundEnabled] = useState(player.settings.sound);
  const [musicEnabled, setMusicEnabled] = useState(player.settings.music);
  const [notificationsEnabled, setNotificationsEnabled] = useState(player.settings.notifications);

  const handleLanguageChange = (language: 'th' | 'en') => {
    i18n.changeLanguage(language);
    updatePlayer({
      settings: {
        ...player.settings,
        language,
      },
    });
  };

  const handleSoundToggle = async (value: boolean) => {
    setSoundEnabled(value);
    await updatePlayer({
      settings: {
        ...player.settings,
        sound: value,
      },
    });
  };

  const handleMusicToggle = async (value: boolean) => {
    setMusicEnabled(value);
    await updatePlayer({
      settings: {
        ...player.settings,
        music: value,
      },
    });
  };

  const handleNotificationsToggle = async (value: boolean) => {
    setNotificationsEnabled(value);
    await updatePlayer({
      settings: {
        ...player.settings,
        notifications: value,
      },
    });
  };

  const handleAbout = () => {
    Alert.alert(
      'เกี่ยวกับเกม',
      `Zombie Quiz RPG\nเวอร์ชัน: 1.0.0\n\nเกมตอบคำถามสู้ซอมบี้\n\n© 2024 All Rights Reserved.`,
      [{ text: 'ตกลง' }]
    );
  };

  const handlePrivacy = () => {
    Alert.alert(
      'ความเป็นส่วนตัว',
      'เราเคารพความเป็นส่วนตัวของคุณ ข้อมูลทั้งหมดถูกเก็บไว้ในเครื่อง',
      [{ text: 'ตกลง' }]
    );
  };

  const handleTerms = () => {
    Alert.alert(
      'ข้อกำหนด',
      `ข้อกำหนดการใช้งาน:\n1. เล่นอย่างสนุกสนาน\n2. ไม่โกง\n3. เคารพผู้อื่น\n\n© 2024 Zombie Quiz RPG`,
      [{ text: 'ตกลง' }]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>ตั้งค่า</Text>
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
        {/* Language Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🌐 ภาษา</Text>
          <View style={styles.languageButtons}>
            <TouchableOpacity
              style={[
                styles.languageButton,
                player.settings.language === 'th' && styles.languageButtonActive,
              ]}
              onPress={() => handleLanguageChange('th')}
            >
              <Text
                style={[
                  styles.languageButtonText,
                  player.settings.language === 'th' && styles.languageButtonTextActive,
                ]}
              >
                ไทย
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.languageButton,
                player.settings.language === 'en' && styles.languageButtonActive,
              ]}
              onPress={() => handleLanguageChange('en')}
            >
              <Text
                style={[
                  styles.languageButtonText,
                  player.settings.language === 'en' && styles.languageButtonTextActive,
                ]}
              >
                English
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Sound Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔊 เสียง</Text>
          
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>เอฟเฟกต์เสียง</Text>
              <Text style={styles.settingDescription}>
                เปิด/ปิด เอฟเฟกต์เสียง
              </Text>
            </View>
            <Switch
              value={soundEnabled}
              onValueChange={handleSoundToggle}
              trackColor={{ false: '#666666', true: '#4ade80' }}
              thumbColor={soundEnabled ? '#16213e' : '#f4f3f4'}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>เพลงพื้นหลัง</Text>
              <Text style={styles.settingDescription}>
                เปิด/ปิด เพลงพื้นหลัง
              </Text>
            </View>
            <Switch
              value={musicEnabled}
              onValueChange={handleMusicToggle}
              trackColor={{ false: '#666666', true: '#4ade80' }}
              thumbColor={musicEnabled ? '#16213e' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Notification Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔔 การแจ้งเตือน</Text>
          
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>โบนัสประจำวัน</Text>
              <Text style={styles.settingDescription}>
                แจ้งเตือนรับโบนัสประจำวัน
              </Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={handleNotificationsToggle}
              trackColor={{ false: '#666666', true: '#4ade80' }}
              thumbColor={notificationsEnabled ? '#16213e' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ℹ️ เกี่ยวกับเรา</Text>
          
          <TouchableOpacity style={styles.menuItem} onPress={handleAbout}>
            <Text style={styles.menuItemText}>
              📱 เกี่ยวกับเกม
            </Text>
            <Text style={styles.menuItemArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handlePrivacy}>
            <Text style={styles.menuItemText}>
              🔒 ความเป็นส่วนตัว
            </Text>
            <Text style={styles.menuItemArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleTerms}>
            <Text style={styles.menuItemText}>
              📄 ข้อกำหนด
            </Text>
            <Text style={styles.menuItemArrow}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Credits */}
        <View style={styles.credits}>
          <Text style={styles.creditsText}>
            เวอร์ชัน: 1.0.0
          </Text>
          <Text style={styles.creditsText}>
            Zombie Quiz RPG © 2024
          </Text>
          <Text style={styles.creditsText}>
            สร้างด้วย ❤️
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
    paddingTop: 60,
    paddingBottom: 15,
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
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#e94560',
    marginBottom: 15,
    letterSpacing: 0.3,
  },
  languageButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  languageButton: {
    flex: 1,
    backgroundColor: 'rgba(233, 69, 96, 0.08)',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e94560',
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  languageButtonActive: {
    backgroundColor: '#e94560',
    borderColor: '#ffffff',
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 8,
  },
  languageButtonText: {
    fontSize: 16,
    color: '#e94560',
    fontWeight: 'bold',
  },
  languageButtonTextActive: {
    color: '#ffffff',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(233, 69, 96, 0.08)',
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#e94560',
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
    color: '#cccccc',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(233, 69, 96, 0.08)',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#e94560',
  },
  menuItemText: {
    fontSize: 16,
    color: '#e94560',
    fontWeight: 'bold',
  },
  menuItemArrow: {
    fontSize: 20,
    color: '#e94560',
  },
  credits: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  creditsText: {
    color: '#a0a0a0',
    fontSize: 12,
    marginBottom: 5,
  },
});

export default SettingsScreen;
