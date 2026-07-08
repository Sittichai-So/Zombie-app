import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Animated,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useGame } from '../context/GameContext';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();
  const { login } = useGame();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(24))[0];

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      setError(t('login.error.required'));
      return;
    }

    setLoading(true);
    setError('');

    try {
      await login(email, password);
      navigation.replace('CharacterSelect');
    } catch (err) {
      setError(t('login.error.loginFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      setError(t('login.error.required'));
      return;
    }

    if (password !== confirmPassword) {
      setError(t('login.error.passwordMismatch'));
      return;
    }

    if (password.length < 6) {
      setError(t('login.error.passwordTooShort'));
      return;
    }

    setLoading(true);
    setError('');

    try {
      await login(email, password, username);
      navigation.replace('CharacterSelect');
    } catch (err) {
      setError(t('login.error.registerFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: string) => {
    setLoading(true);
    setError('');

    try {
      await login(`${provider}_user@example.com`, 'oauth', provider);
      navigation.replace('CharacterSelect');
    } catch (err) {
      setError(`${t('login.error.oauthFailed')} ${provider}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={[styles.container, Platform.OS === 'web' && { minHeight: '100%' }]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.scrollContent,
        { flexGrow: 1 },
        Platform.OS === 'web' && { minHeight: '100%' },
      ]}
      keyboardShouldPersistTaps="handled"
    >
      {/* Header */}
      <Animated.View
        style={[
          styles.header,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.logoRow}>
          <View style={styles.logoMark}>
            <Text style={styles.logoMarkText}>🧟</Text>
          </View>
          <View style={styles.statusPill}>
            <View style={styles.statusDot} />
            <Text style={styles.statusPillText}>SURVIVAL MODE</Text>
          </View>
        </View>

        <Text style={styles.title}>ZOMBIE QUIZ RPG</Text>
        <Text style={styles.subtitle}>
          {isLogin ? 'เอาชีวิตรอดจากซอมบี้' : 'ร่วมต่อสู้ในโลกอันตราย'}
        </Text>
      </Animated.View>

      {/* Form */}
      <Animated.View
        style={[
          styles.formContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {/* Segmented toggle */}
        <View style={styles.segmentedControl}>
          <TouchableOpacity
            style={[styles.segment, isLogin && styles.segmentActive]}
            onPress={() => setIsLogin(true)}
            activeOpacity={0.85}
          >
            <Text style={[styles.segmentText, isLogin && styles.segmentTextActive]}>
              เข้าสู่ระบบ
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.segment, !isLogin && styles.segmentActive]}
            onPress={() => setIsLogin(false)}
            activeOpacity={0.85}
          >
            <Text style={[styles.segmentText, !isLogin && styles.segmentTextActive]}>
              สมัครสมาชิก
            </Text>
          </TouchableOpacity>
        </View>

        {!isLogin && (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>ชื่อผู้ใช้</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="ตั้งชื่อผู้ใช้ของคุณ"
                placeholderTextColor="#9AA0A8"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </View>
          </View>
        )}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>อีเมล</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="your@email.com"
              placeholderTextColor="#9AA0A8"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>รหัสผ่าน</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="กรอกรหัสผ่าน"
              placeholderTextColor="#9AA0A8"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
        </View>

        {!isLogin && (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>ยืนยันรหัสผ่าน</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="กรอกรหัสผ่านอีกครั้ง"
                placeholderTextColor="#9AA0A8"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>
          </View>
        )}

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={isLogin ? handleLogin : handleRegister}
          disabled={loading}
          activeOpacity={0.85}
        >
          {loading ? (
            <ActivityIndicator color="#0A0B0D" />
          ) : (
            <Text style={styles.primaryButtonText}>
              {isLogin ? 'เริ่มเกม' : 'สร้างตัวละคร'}
            </Text>
          )}
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>หรือเข้าสู่ระบบด้วย</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* OAuth buttons */}
        <View style={styles.oauthButtons}>
          <TouchableOpacity
            style={styles.oauthButton}
            onPress={() => handleOAuthLogin('Google')}
            disabled={loading}
            activeOpacity={0.85}
          >
            <Text style={styles.oauthButtonText}>G</Text>
            <Text style={styles.oauthButtonLabel}>Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.oauthButton}
            onPress={() => handleOAuthLogin('Facebook')}
            disabled={loading}
            activeOpacity={0.85}
          >
            <Text style={styles.oauthButtonText}>f</Text>
            <Text style={styles.oauthButtonLabel}>Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.oauthButton}
            onPress={() => handleOAuthLogin('Apple')}
            disabled={loading}
            activeOpacity={0.85}
          >
            <Text style={styles.oauthButtonText}></Text>
            <Text style={styles.oauthButtonLabel}>Apple</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </ScrollView>
  );
};

// ---- Design tokens ----
const COLORS = {
  bg: '#0A0B0D',
  card: '#131519',
  cardBorder: 'rgba(255,255,255,0.08)',
  accent: '#FF4D3D',
  accentMuted: 'rgba(255,77,61,0.12)',
  white: '#FFFFFF',
  textMuted: '#8B8F97',
  textFaint: '#5C6068',
  inputBg: '#FFFFFF',
  inputText: '#0A0B0D',
  danger: '#FF4D3D',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    paddingTop: 64,
    paddingBottom: 28,
    paddingHorizontal: 24,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  logoMark: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoMarkText: {
    fontSize: 24,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.accentMuted,
    borderWidth: 1,
    borderColor: 'rgba(255,77,61,0.3)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.accent,
    marginRight: 8,
  },
  statusPillText: {
    color: COLORS.accent,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  title: {
    fontSize: 34,
    fontWeight: '900',
    color: COLORS.white,
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
  formContainer: {
    backgroundColor: COLORS.card,
    borderRadius: 28,
    padding: 20,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    maxWidth: 480,
    width: '100%',
    alignSelf: 'center',
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: COLORS.bg,
    borderRadius: 16,
    padding: 4,
    marginBottom: 24,
  },
  segment: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  segmentActive: {
    backgroundColor: COLORS.white,
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textMuted,
  },
  segmentTextActive: {
    color: COLORS.bg,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    color: COLORS.textFaint,
    marginBottom: 8,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  inputWrapper: {
    backgroundColor: COLORS.inputBg,
    borderRadius: 16,
    paddingHorizontal: 16,
  },
  input: {
    height: 50,
    color: COLORS.inputText,
    fontSize: 15,
    fontWeight: '500',
  },
  errorText: {
    color: COLORS.danger,
    fontSize: 13,
    marginBottom: 16,
    fontWeight: '700',
    backgroundColor: COLORS.accentMuted,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,77,61,0.3)',
  },
  primaryButton: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    height: 54,
    marginTop: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: COLORS.bg,
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.cardBorder,
  },
  dividerText: {
    color: COLORS.textFaint,
    marginHorizontal: 12,
    fontSize: 12,
    fontWeight: '600',
  },
  oauthButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  oauthButton: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    paddingVertical: 14,
    alignItems: 'center',
  },
  oauthButtonText: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: 4,
  },
  oauthButtonLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
});

export default LoginScreen;