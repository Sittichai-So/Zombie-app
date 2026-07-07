import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGame } from '../context/GameContext';
import { characters, Character, calculateStatAtLevel } from '../data/characters';
import i18n from '@/i18n';

const CharactersScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { player, selectCharacter, upgradeCharacter } = useGame();

  const handleSelectCharacter = async (characterId: number) => {
    await selectCharacter(characterId);
  };

  const handleUpgradeCharacter = async (characterId: number) => {
    await upgradeCharacter(characterId);
  };

  const renderCharacter = (character: Character, index: number) => {
    const isOwned = player.ownedCharacters.includes(character.id);
    const isSelected = player.selectedCharacterId === character.id;
    const level = player.characterLevels[character.id] || 1;
    const canUpgrade = isOwned && level < character.maxLevel;
    const upgradeCost = character.upgradeCostPerLevel * level;

    return (
      <TouchableOpacity
        key={`${character.id}-${index}`}
        style={[
          styles.characterCard,
          isSelected && styles.selectedCard,
          !isOwned && styles.lockedCard,
        ]}
        onPress={() => isOwned && handleSelectCharacter(character.id)}
      >
        {/* Rarity Indicator */}
        <View style={[styles.rarityBadge, styles[character.rarity]]}>
          <Text style={styles.rarityText}>
            {character.rarity === 'legendary' && '👑'}
            {character.rarity === 'epic' && '💜'}
            {character.rarity === 'rare' && '💙'}
            {character.rarity === 'common' && '💚'}
          </Text>
        </View>

        {/* Character Image Placeholder */}
        <View style={styles.characterImage}>
          <Text style={styles.characterEmoji}>
            {character.type === 'zombie' ? '🧟' : '👤'}
          </Text>
        </View>

        {/* Character Info */}
        <View style={styles.characterInfo}>
          <Text style={styles.characterName}>
            {character.name_th}
          </Text>
          <Text style={styles.characterDescription}>
            {character.description_th}
          </Text>
          
          {/* Level */}
          <View style={styles.levelRow}>
            <Text style={styles.levelLabel}>เลเวล</Text>
            <Text style={styles.levelValue}>{level} / {character.maxLevel}</Text>
          </View>

          {/* Stats */}
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>⚔️</Text>
              <Text style={styles.statValue}>
                {calculateStatAtLevel(character.baseStats.attack, level)}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>🛡️</Text>
              <Text style={styles.statValue}>
                {calculateStatAtLevel(character.baseStats.defense, level)}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>💨</Text>
              <Text style={styles.statValue}>
                {calculateStatAtLevel(character.baseStats.speed, level)}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>❤️</Text>
              <Text style={styles.statValue}>
                {calculateStatAtLevel(character.baseStats.health, level)}
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          {isOwned ? (
            <>
              {isSelected && (
                <View style={styles.selectedBadge}>
                  <Text style={styles.selectedText}>เลือกแล้ว</Text>
                </View>
              )}
              {canUpgrade && (
                <TouchableOpacity
                  style={styles.upgradeButton}
                  onPress={() => handleUpgradeCharacter(character.id)}
                >
                  <Text style={styles.upgradeButtonText}>
                    อัพเกรด ({upgradeCost} 🪙)
                  </Text>
                </TouchableOpacity>
              )}
              {!canUpgrade && level >= character.maxLevel && (
                <View style={styles.maxLevelBadge}>
                  <Text style={styles.maxLevelText}>MAX</Text>
                </View>
              )}
            </>
          ) : (
            <View style={styles.lockedOverlay}>
              <Text style={styles.lockCost}>{character.unlockCost} 🪙</Text>
              <TouchableOpacity style={styles.unlockButton}>
                <Text style={styles.unlockButtonText}>ปลดล็อก</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  // Group characters by rarity
  const legendaryChars = characters.filter(c => c.rarity === 'legendary');
  const epicChars = characters.filter(c => c.rarity === 'epic');
  const rareChars = characters.filter(c => c.rarity === 'rare');
  const commonChars = characters.filter(c => c.rarity === 'common');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>ตัวละคร</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Stats Summary */}
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          มี: {player.ownedCharacters.length} / {characters.length}
        </Text>
      </View>

      {/* Characters List */}
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={true}
        contentContainerStyle={[styles.scrollContent, Platform.OS === 'web' && { paddingBottom: 100 }]}
        nestedScrollEnabled={Platform.OS !== 'web'}
        bounces={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Common */}
        <View style={styles.raritySection}>
          <Text style={styles.rarityTitle}>💚 ทั่วไป</Text>
          {commonChars.map(renderCharacter)}
        </View>

        {/* Rare */}
        <View style={styles.raritySection}>
          <Text style={styles.rarityTitle}>💙 หายาก</Text>
          {rareChars.map(renderCharacter)}
        </View>

        {/* Epic */}
        <View style={styles.raritySection}>
          <Text style={styles.rarityTitle}>💜 ตำนาน</Text>
          {epicChars.map(renderCharacter)}
        </View>

        {/* Legendary */}
        <View style={styles.raritySection}>
          <Text style={styles.rarityTitle}>👑 มหากาพย์</Text>
          {legendaryChars.map(renderCharacter)}
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
  summary: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#16213e',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(233, 69, 96, 0.2)',
  },
  summaryText: {
    color: '#cccccc',
    fontSize: 14,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingBottom: 80,
  },
  raritySection: {
    marginBottom: 25,
  },
  rarityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e94560',
    marginBottom: 10,
  },
  characterCard: {
    backgroundColor: 'rgba(233, 69, 96, 0.08)',
    borderRadius: 18,
    paddingVertical: 20,
    paddingHorizontal: 18,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#e94560',
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    position: 'relative',
    overflow: 'visible',
  },
  selectedCard: {
    borderColor: '#ffd700',
    borderWidth: 3,
  },
  lockedCard: {
    opacity: 0.7,
  },
  rarityBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    zIndex: 10,
  },
  common: {
    backgroundColor: '#22c55e',
  },
  rare: {
    backgroundColor: '#3b82f6',
  },
  epic: {
    backgroundColor: '#a855f7',
  },
  legendary: {
    backgroundColor: '#eab308',
  },
  rarityText: {
    fontSize: 14,
  },
  characterImage: {
    width: 85,
    height: 85,
    borderRadius: 42,
    backgroundColor: 'rgba(233, 69, 96, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 12,
    borderWidth: 3,
    borderColor: '#e94560',
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  characterEmoji: {
    fontSize: 50,
  },
  characterInfo: {
    marginBottom: 15,
  },
  characterName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 6,
    lineHeight: 22,
  },
  characterDescription: {
    fontSize: 11,
    color: '#a0a0a0',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 16,
  },
  levelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 5,
  },
  levelLabel: {
    color: '#ffffff',
    fontSize: 14,
  },
  levelValue: {
    color: '#e94560',
    fontSize: 14,
    fontWeight: 'bold',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(22, 33, 62, 0.8)',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e94560',
    marginBottom: 12,
  },
  statItem: {
    alignItems: 'center',
    minWidth: 45,
  },
  statLabel: {
    fontSize: 14,
    marginBottom: 3,
  },
  statValue: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginTop: 15,
    flexWrap: 'wrap',
  },
  selectedBadge: {
    backgroundColor: '#ffd700',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    marginBottom: 10,
  },
  selectedText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  upgradeButton: {
    backgroundColor: '#e94560',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ff6b6b',
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
    minWidth: 120,
  },
  upgradeButtonText: {
    color: '#000000',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  maxLevelBadge: {
    backgroundColor: '#0f3460',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#e94560',
  },
  maxLevelText: {
    color: '#e94560',
    fontSize: 14,
    fontWeight: 'bold',
  },
  lockedOverlay: {
    alignItems: 'center',
    marginTop: 10,
  },
  lockCost: {
    color: '#ffd700',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  unlockButton: {
    backgroundColor: '#0f3460',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#e94560',
    minWidth: 120,
  },
  unlockButtonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
  },
});

export default CharactersScreen;
