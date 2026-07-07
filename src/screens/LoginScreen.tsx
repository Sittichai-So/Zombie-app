import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Animated,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { LinearGradient } from 'expo-linear-gradient';
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
  const slideAnim = useState(new Animated.Value(50))[0];

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 7,
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
      // Simulate login - in real app, this would call auth service
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
      // Simulate registration
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
      // Simulate OAuth login
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
      showsVerticalScrollIndicator={true}
      contentContainerStyle={[styles.scrollContent, { flexGrow: 1 }, Platform.OS === 'web' && { minHeight: '100%' }, Platform.OS === 'web' && { paddingBottom: 50 }]}
      nestedScrollEnabled={Platform.OS !== 'web'}
      bounces={true}
      keyboardShouldPersistTaps="handled"
    >
      <LinearGradient
        colors={['#1a1a2e', '#16213e', '#0f3460']}
        style={styles.gradient}
      >
        {/* Background Decorative Elements - Modern Survival Theme */}
        <View style={styles.backgroundDecoration1} />
        <View style={styles.backgroundDecoration2} />
        
        {/* Logo and Title */}
        <Animated.View 
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
          <View style={styles.logoContainer}>
            <View style={styles.logoGlow}>
              <View style={styles.logoCircle}>
                <Text style={styles.logoEmoji}>🧟</Text>
              </View>
              <View style={styles.logoRing} />
            </View>
          </View>
          <Text style={styles.title}>ZOMBIE QUIZ RPG</Text>
          <Text style={styles.subtitle}>
            {isLogin ? '🎮 เอาชีวิตรอดจากซอมบี้' : '⚔️ ร่วมต่อสู้ในโลกอันตราย'}
          </Text>
          <View style={styles.warningBanner}>
            <Text style={styles.warningText}>🔥 SURVIVAL MODE</Text>
          </View>
        </Animated.View>

        {/* Form */}
        <Animated.View 
          style={[
            styles.formContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
          {!isLogin && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>ชื่อผู้ใช้</Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputIcon}>👤</Text>
                <TextInput
                  style={styles.input}
                  placeholder="ตั้งชื่อผู้ใช้ของคุณ"
                  placeholderTextColor="#6c757d"
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
              <Text style={styles.inputIcon}>📧</Text>
              <TextInput
                style={styles.input}
                placeholder="your@email.com"
                placeholderTextColor="#6c757d"
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
              <Text style={styles.inputIcon}>🔒</Text>
              <TextInput
                style={styles.input}
                placeholder="กรอกรหัสผ่าน"
                placeholderTextColor="#6c757d"
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
                <Text style={styles.inputIcon}>🔒</Text>
                <TextInput
                  style={styles.input}
                  placeholder="กรอกรหัสผ่านอีกครั้ง"
                  placeholderTextColor="#6c757d"
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
            <LinearGradient
              colors={['#e94560', '#ff6b6b']}
              style={styles.primaryButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <View style={styles.buttonContent}>
                  <Text style={styles.primaryButtonText}>
                    {isLogin ? '▶️ เริ่มเกม' : '✨ สร้างตัวละคร'}
                  </Text>
                </View>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {/* OAuth Buttons */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>หรือเข้าสู่ระบบด้วย</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.oauthButtons}>
            <TouchableOpacity
              style={[styles.oauthButton, styles.googleButton]}
              onPress={() => handleOAuthLogin('Google')}
              disabled={loading}
              activeOpacity={0.85}
            >
              <View style={styles.oauthButtonContent}>
                <Text style={[styles.oauthButtonText, styles.googleText]}>G</Text>
                <Text style={styles.oauthButtonLabel}>Google</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.oauthButton, styles.facebookButton]}
              onPress={() => handleOAuthLogin('Facebook')}
              disabled={loading}
              activeOpacity={0.85}
            >
              <View style={styles.oauthButtonContent}>
                <Text style={[styles.oauthButtonText, styles.facebookText]}>f</Text>
                <Text style={styles.oauthButtonLabel}>Facebook</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.oauthButton, styles.appleButton]}
              onPress={() => handleOAuthLogin('Apple')}
              disabled={loading}
              activeOpacity={0.85}
            >
              <View style={styles.oauthButtonContent}>
                <Text style={[styles.oauthButtonText, styles.appleText]}></Text>
                <Text style={styles.oauthButtonLabel}>Apple</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Toggle Login/Register */}
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleText}>
              {isLogin ? 'ยังไม่มีบัญชี? ' : 'มีบัญชีอยู่แล้ว? '}
            </Text>
            <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
              <Text style={styles.toggleLink}>
                {isLogin ? 'สมัครสมาชิก' : 'เข้าสู่ระบบ'}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  gradient: {
    flex: 1,
    minHeight: '100%',
  },
  backgroundDecoration1: {
    position: 'absolute',
    top: -100,
    right: -80,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(233, 69, 96, 0.03)',
    borderWidth: 2,
    borderColor: 'rgba(233, 69, 96, 0.08)',
  },
  backgroundDecoration2: {
    position: 'absolute',
    bottom: -80,
    left: -100,
    width: 350,
    height: 350,
    borderRadius: 175,
    backgroundColor: 'rgba(15, 52, 96, 0.05)',
    borderWidth: 2,
    borderColor: 'rgba(15, 52, 96, 0.1)',
  },
  header: {
    alignItems: 'center',
    paddingTop: 56,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 25,
  },
  logoGlow: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: 'rgba(233, 69, 96, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#e94560',
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 15,
    zIndex: 2,
  },
  logoRing: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 1.5,
    borderColor: 'rgba(233, 69, 96, 0.3)',
    borderStyle: 'dashed',
  },
  logoEmoji: {
    fontSize: 75,
    zIndex: 3,
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
    color: '#e94560',
    marginBottom: 10,
    letterSpacing: 1.5,
    textShadowColor: 'rgba(233, 69, 96, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#ff6b6b',
    fontWeight: '500',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  warningBanner: {
    marginTop: 15,
    paddingHorizontal: 18,
    paddingVertical: 7,
    backgroundColor: 'rgba(233, 69, 96, 0.1)',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(233, 69, 96, 0.3)',
  },
  warningText: {
    color: '#e94560',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 24,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    maxWidth: 480,
    width: '100%',
    alignSelf: 'center',
  },

  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#a0a0a0',
    marginBottom: 8,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(233, 69, 96, 0.3)',
    paddingHorizontal: 16,
    shadowColor: 'rgba(233, 69, 96, 0.1)',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  inputIcon: {
    fontSize: 18,
    marginRight: 12,
    opacity: 0.7,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#ffffff',
    fontSize: 16,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: '600',
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 107, 0.3)',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    borderRadius: 14,
    height: 52,
    marginTop: 10,
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 10,
    overflow: 'hidden',
  },
  primaryButtonGradient: {
    borderRadius: 14,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  dividerText: {
    color: '#a0a0a0',
    marginHorizontal: 16,
    fontSize: 13,
    fontWeight: '500',
  },
  oauthButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    flexWrap: 'wrap',
    gap: 10,
  },
  oauthButton: {
    flex: 1,
    minWidth: 90,
    marginHorizontal: 6,
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  oauthButtonContent: {
    paddingVertical: 13,
    alignItems: 'center',
  },
  googleButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  facebookButton: {
    backgroundColor: 'rgba(24, 119, 242, 0.95)',
    borderColor: 'rgba(24, 119, 242, 0.5)',
  },
  appleButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  googleText: {
    color: '#DB4437',
  },
  facebookText: {
    color: '#ffffff',
  },
  appleText: {
    color: '#ffffff',
  },
  oauthButtonText: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 3,
  },
  oauthButtonLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
    opacity: 0.9,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  toggleText: {
    color: '#a0a0a0',
    fontSize: 15,
  },
  toggleLink: {
    color: '#e94560',
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 5,
  },
});

export default LoginScreen;
