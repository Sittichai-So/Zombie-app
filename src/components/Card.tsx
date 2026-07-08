import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  variant?: 'default' | 'character' | 'item' | 'stat' | 'mascot' | 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  size?: 'small' | 'medium' | 'large';
  onPress?: () => void;
  style?: any;
  gradient?: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  children,
  variant = 'default',
  onPress,
  style,
  gradient = false,
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'character':
        return styles.characterCard;
      case 'item':
        return styles.itemCard;
      case 'stat':
        return styles.statCard;
      case 'mascot':
        return styles.mascotCard;
      case 'primary':
        return styles.primaryCard;
      case 'secondary':
        return styles.secondaryCard;
      case 'danger':
        return styles.dangerCard;
      case 'success':
        return styles.successCard;
      case 'warning':
        return styles.warningCard;
      default:
        return styles.defaultCard;
    }
  };

  const cardContent = (
    <>
      {title && <Text style={styles.title}>{title}</Text>}
      {children}
    </>
  );

  if (gradient) {
    return (
      <TouchableOpacity 
        style={[styles.card, getVariantStyle(), style]} 
        onPress={onPress}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={
            variant === 'character' ? ['#84CC16', '#A3E635'] :
            variant === 'mascot' ? ['#C084FC', '#E9B5FA'] :
            variant === 'primary' ? ['#6366F1', '#8B5CF6'] :
            variant === 'secondary' ? ['#06B6D4', '#3B82F6'] :
            variant === 'danger' ? ['#F87171', '#FCA5A5'] :
            variant === 'success' ? ['#84CC16', '#A3E635'] :
            variant === 'warning' ? ['#F59E0B', '#FBBF24'] :
            ['#1E293B', '#334155']
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.card, getVariantStyle(), style]}
        >
          {cardContent}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity 
      style={[styles.card, getVariantStyle(), style]} 
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      {cardContent}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    padding: 20,
    marginVertical: 8,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  defaultCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.9)',
    backdropFilter: 'blur(10px)',
  },
  characterCard: {
    backgroundColor: 'rgba(132, 204, 22, 0.15)',
  },
  itemCard: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
  },
  statCard: {
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
  },
  mascotCard: {
    backgroundColor: 'rgba(192, 132, 252, 0.15)',
  },
  primaryCard: {
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
  },
  secondaryCard: {
    backgroundColor: 'rgba(6, 182, 212, 0.2)',
  },
  dangerCard: {
    backgroundColor: 'rgba(248, 113, 113, 0.2)',
  },
  successCard: {
    backgroundColor: 'rgba(132, 204, 22, 0.2)',
  },
  warningCard: {
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
    textShadowColor: 'rgba(233, 69, 96, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
});

export default Card;
