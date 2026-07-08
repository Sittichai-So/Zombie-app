import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface MascotProps {
  message?: string;
  emotion?: 'happy' | 'excited' | 'thinking' | 'worried' | 'celebrating';
  size?: 'small' | 'medium' | 'large';
  animated?: boolean;
}

const Mascot: React.FC<MascotProps> = ({
  message = '',
  emotion = 'happy',
  size = 'medium',
  animated = true,
}) => {
  const bounceAnim = React.useState(new Animated.Value(0))[0];
  const glowAnim = React.useState(new Animated.Value(0.5))[0];

  useEffect(() => {
    if (animated) {
      // Bounce animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: Platform.OS !== 'web',
          }),
          Animated.timing(bounceAnim, {
            toValue: 0,
            duration: 600,
            useNativeDriver: Platform.OS !== 'web',
          }),
        ])
      ).start();

      // Glow animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: Platform.OS !== 'web',
          }),
          Animated.timing(glowAnim, {
            toValue: 0.5,
            duration: 1000,
            useNativeDriver: Platform.OS !== 'web',
          }),
        ])
      ).start();
    }
  }, [animated]);

  const getMascotEmoji = () => {
    switch (emotion) {
      case 'happy': return '🧟‍♂️';
      case 'excited': return '🧟‍♂️✨';
      case 'thinking': return '🤔🧟';
      case 'worried': return '😟🧟';
      case 'celebrating': return '🎉🧟‍♂️🎉';
      default: return '🧟‍♂️';
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return { fontSize: 48, containerSize: 70 };
      case 'medium':
        return { fontSize: 72, containerSize: 100 };
      case 'large':
        return { fontSize: 96, containerSize: 140 };
      default:
        return { fontSize: 72, containerSize: 100 };
    }
  };

  const sizeStyle = getSizeStyle();

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: bounceAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -10]
          }) }],
        },
      ]}
    >
      <Animated.View
        style={[
          styles.mascotWrapper,
          {
            width: sizeStyle.containerSize,
            height: sizeStyle.containerSize,
            shadowColor: '#C084FC',
            shadowOpacity: glowAnim,
          },
        ]}
      >
        <LinearGradient
          colors={['#C084FC', '#E9B5FA', '#C084FC']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <Text style={[styles.emoji, { fontSize: sizeStyle.fontSize }]}>
            {getMascotEmoji()}
          </Text>
        </LinearGradient>
      </Animated.View>
      
      {message ? (
        <View style={styles.speechBubble}>
          <Text style={styles.message}>{message}</Text>
        </View>
      ) : null}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  mascotWrapper: {
    borderRadius: 50,
    padding: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    elevation: 10,
  },
  gradient: {
    flex: 1,
    borderRadius: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  emoji: {
    textAlign: 'center',
  },
  speechBubble: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 14,
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#C084FC',
    maxWidth: 220,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  message: {
    color: '#1E293B',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default Mascot;
