import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'mascot';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  style?: any;
  gradient?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  style,
  gradient = true,
}) => {
  const getVariantColors = () => {
    switch (variant) {
      case 'primary':
        return ['#6366F1', '#8B5CF6'];
      case 'secondary':
        return ['#06B6D4', '#3B82F6'];
      case 'danger':
        return ['#F87171', '#FCA5A5'];
      case 'success':
        return ['#84CC16', '#A3E635'];
      case 'mascot':
        return ['#C084FC', '#E9B5FA'];
      default:
        return ['#6366F1', '#8B5CF6'];
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return styles.small;
      case 'medium':
        return styles.medium;
      case 'large':
        return styles.large;
      default:
        return styles.medium;
    }
  };

  const buttonContent = (
    <>
      {loading ? (
        <ActivityIndicator color="#ffffff" />
      ) : (
        <>
          {icon && <Text style={styles.icon}>{icon}</Text>}
          <Text style={styles.text}>{title}</Text>
        </>
      )}
    </>
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={style}
    >
      {gradient ? (
        <LinearGradient
          colors={getVariantColors()}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.button,
            getSizeStyle(),
            disabled && styles.disabled,
          ]}
        >
          {buttonContent}
        </LinearGradient>
      ) : (
        <View
          style={[
            styles.button,
            getSizeStyle(),
            variant === 'primary' && styles.primaryFlat,
            variant === 'secondary' && styles.secondaryFlat,
            variant === 'danger' && styles.dangerFlat,
            variant === 'success' && styles.successFlat,
            disabled && styles.disabled,
          ]}
        >
          {buttonContent}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  primaryFlat: {
    backgroundColor: '#e94560',
  },
  secondaryFlat: {
    backgroundColor: '#0f3460',
    borderWidth: 2,
    borderColor: '#e94560',
  },
  dangerFlat: {
    backgroundColor: '#ef4444',
  },
  successFlat: {
    backgroundColor: '#22c55e',
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    fontSize: 18,
  },
});

export default Button;
