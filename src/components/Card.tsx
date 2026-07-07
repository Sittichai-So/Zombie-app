import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  variant?: 'default' | 'character' | 'item' | 'stat';
  onPress?: () => void;
  style?: any;
}

const Card: React.FC<CardProps> = ({
  title,
  children,
  variant = 'default',
  onPress,
  style,
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'character':
        return styles.characterCard;
      case 'item':
        return styles.itemCard;
      case 'stat':
        return styles.statCard;
      default:
        return styles.defaultCard;
    }
  };

  return (
    <View style={[styles.card, getVariantStyle(), style]}>
      {title && <Text style={styles.title}>{title}</Text>}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    padding: 15,
    marginVertical: 5,
  },
  defaultCard: {
    backgroundColor: '#16213e',
    borderWidth: 2,
    borderColor: '#0f3460',
  },
  characterCard: {
    backgroundColor: '#16213e',
    borderWidth: 2,
    borderColor: '#e94560',
  },
  itemCard: {
    backgroundColor: '#16213e',
    borderWidth: 2,
    borderColor: '#ffd700',
  },
  statCard: {
    backgroundColor: '#0f3460',
    borderWidth: 1,
    borderColor: '#16213e',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
});

export default Card;
