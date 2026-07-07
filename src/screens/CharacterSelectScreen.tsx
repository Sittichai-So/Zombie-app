import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGame } from '../context/GameContext';
import { characters, Character } from '../data/characters';

const { width } = Dimensions.get('window');

const CharacterSelectScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { player, selectCharacter, updatePlayer } = useGame();
  
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const [ownedCharacters, setOwnedCharacters] = useState<Character[]>([]);
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: Platform.OS !== 'web',
    }).start();

    // Get owned characters
    const owned = characters.filter(char => 
      player.ownedCharacters.includes(char.id)
    );
    setOwnedCharacters(owned);
    
    if (owned.length > 0) {
      setSelectedChar(owned[0]);
    }
  }, []);

  const handleSelectCharacter = async (character: Character) => {
    setSelectedChar(character);
    await selectCharacter(character.id);
  };

  const handleContinue = () => {
    if (selectedChar) {
      navigation.replace('Home');
    }
  };

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

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Animated.View style={[styles.headerContent, { opacity: fadeAnim }]}>
          <Text style={styles.title}>เลือกตัวละคร</Text>
          <Text style={styles.subtitle}>เลือกตัวละครของคุณ</Text>
        </Animated.View>
      </View>

      {/* Character Display */}
      <View style={styles.characterDisplay}>
        {selectedChar ? (
          <Animated.View 
            style={[
              styles.selectedCharacterCard,
              { 
                opacity: fadeAnim,
                borderColor: getRarityColor(selectedChar.rarity),
              }
            ]}
          >
            <View style={styles.characterArtContainer}>
              <View 
                style={[
                  styles.characterArt,
                  { borderColor: getRarityColor(selectedChar.rarity), borderWidth: 2 }
                ]}
              >
                <Text style={styles.characterArtEmoji}>
                  {getTypeIcon(selectedChar.type)}
                </Text>
              </View>
              <View style={styles.characterInfo}>
                <Text style={styles.characterName}>
                  {selectedChar.name_th}
                </Text>
                <Text 
                  style={[
                    styles.characterRarity,
                    { color: getRarityColor(selectedChar.rarity) }
                  ]}
                >
                  {selectedChar.rarity.toUpperCase()}
                </Text>
                <Text style={styles.characterType}>
                  {getTypeIcon(selectedChar.type)} {selectedChar.type.toUpperCase()}
                </Text>
              </View>
            </View>

            <View style={styles.statsPreview}>
              <View style={styles.statItem}>
                <View style={[styles.statIconBox, { backgroundColor: '#e9456020' }]}>
                  <Text style={styles.statIcon}>⚔️</Text>
                </View>
                <Text style={styles.statLabel}>โจมตี</Text>
                <Text style={styles.statValue}>{selectedChar.baseStats.attack}</Text>
              </View>
              <View style={styles.statItem}>
                <View style={[styles.statIconBox, { backgroundColor: '#3498db20' }]}>
                  <Text style={styles.statIcon}>🛡️</Text>
                </View>
                <Text style={styles.statLabel}>ป้องกัน</Text>
                <Text style={styles.statValue}>{selectedChar.baseStats.defense}</Text>
              </View>
              <View style={styles.statItem}>
                <View style={[styles.statIconBox, { backgroundColor: '#f39c1220' }]}>
                  <Text style={styles.statIcon}>💨</Text>
                </View>
                <Text style={styles.statLabel}>ความเร็ว</Text>
                <Text style={styles.statValue}>{selectedChar.baseStats.speed}</Text>
              </View>
              <View style={styles.statItem}>
                <View style={[styles.statIconBox, { backgroundColor: '#2ecc7120' }]}>
                  <Text style={styles.statIcon}>❤️</Text>
                </View>
                <Text style={styles.statLabel}>พลังชีวิต</Text>
                <Text style={styles.statValue}>{selectedChar.baseStats.health}</Text>
              </View>
            </View>

            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionLabel}>รายละเอียด</Text>
              <Text style={styles.description}>
                {selectedChar.description_th}
              </Text>
            </View>
          </Animated.View>
        ) : (
          <View style={styles.noCharacter}>
            <Text style={styles.noCharacterText}>ยังไม่มีตัวละคร</Text>
          </View>
        )}
      </View>

      {/* Character List */}
      <View style={styles.characterListContainer}>
        <Text style={styles.listTitle}>ตัวละครของคุณ</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.characterList}
        >
          {ownedCharacters.map((char, index) => (
            <Animated.View
              key={char.id}
              style={[
                styles.characterCard,
                { 
                  opacity: fadeAnim,
                  borderColor: selectedChar?.id === char.id 
                    ? getRarityColor(char.rarity)
                    : 'rgba(255, 255, 255, 0.1)',
                }
              ]}
            >
              <TouchableOpacity
                style={styles.characterCardInner}
                onPress={() => handleSelectCharacter(char)}
              >
                <View 
                  style={[
                    styles.characterCardArt,
                    { borderColor: getRarityColor(char.rarity), borderWidth: 2 }
                  ]}
                >
                  <Text style={styles.characterCardEmoji}>
                    {getTypeIcon(char.type)}
                  </Text>
                </View>
                <Text style={styles.characterCardName}>
                  {char.name_th}
                </Text>
                <Text style={styles.characterCardRarity}>
                  {char.rarity.toUpperCase()}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </ScrollView>
      </View>

      {/* Continue Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            !selectedChar && styles.continueButtonDisabled
          ]}
          onPress={handleContinue}
          disabled={!selectedChar}
        >
          <Text style={styles.continueButtonText}>เริ่มเกม</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  header: {
    paddingTop: 56,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: '#16213e',
  },
  headerContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e94560',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#a0a0a0',
    textAlign: 'center',
  },
  characterDisplay: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    paddingBottom: 12,
    maxWidth: 720,
    width: '100%',
    alignSelf: 'center',
  },
  selectedCharacterCard: {
    backgroundColor: '#16213e',
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: '#e94560',
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  characterArtContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    flexWrap: 'wrap',
    gap: 16,
  },
  characterArt: {
    width: Math.min(width * 0.24, 115),
    height: Math.min(width * 0.24, 115),
    borderRadius: Math.min(width * 0.12, 57),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    backgroundColor: 'rgba(233, 69, 96, 0.1)',
    borderWidth: 2,
    borderColor: '#e94560',
  },

  characterArtEmoji: {
    fontSize: Math.min(width * 0.13, 60),
  },
  characterInfo: {
    flex: 1,
  },
  characterName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  characterRarity: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 5,
  },
  characterType: {
    fontSize: 11,
    color: '#999999',
  },
  statsPreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    flexWrap: 'wrap',
    gap: 10,
  },
  statItem: {
    alignItems: 'center',
    flexBasis: '22%',
    minWidth: 70,
  },
  statIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    backgroundColor: 'rgba(233, 69, 96, 0.1)',
    borderWidth: 1.5,
    borderColor: 'rgba(233, 69, 96, 0.3)',
  },
  statIcon: {
    fontSize: 18,
  },
  statLabel: {
    fontSize: 9,
    color: '#999999',
    marginBottom: 3,
  },
  statValue: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  descriptionContainer: {
    backgroundColor: 'rgba(233, 69, 96, 0.08)',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(233, 69, 96, 0.2)',
  },
  descriptionLabel: {
    fontSize: 11,
    color: '#e94560',
    marginBottom: 5,
    fontWeight: '600',
  },
  description: {
    fontSize: 13,
    color: '#e0e0e0',
    lineHeight: 18,
  },
  noCharacter: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
  },
  noCharacterText: {
    fontSize: 18,
    color: '#a0a0a0',
  },
  characterListContainer: {
    backgroundColor: '#1a1a2e',
    paddingTop: 16,
    paddingBottom: 20,
    maxWidth: 720,
    width: '100%',
    alignSelf: 'center',
  },
  listTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  characterList: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    flexGrow: 1,
  },
  characterCard: {
    marginRight: 12,
    backgroundColor: '#2a2a3e',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333333',
    overflow: 'hidden',
  },
  characterCardInner: {
    padding: 14,
    alignItems: 'center',
    width: 132,
  },
  characterCardArt: {
    width: 65,
    height: 65,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: 'rgba(233, 69, 96, 0.15)',
    borderWidth: 2,
    borderColor: '#e94560',
  },
  characterCardEmoji: {
    fontSize: 32,
  },
  characterCardName: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
    color: '#ffffff',
  },
  characterCardRarity: {
    fontSize: 9,
    color: '#cccccc',
    fontWeight: '500',
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    backgroundColor: '#16213e',
    paddingTop: 20,
  },
  continueButton: {
    backgroundColor: '#e94560',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  continueButtonDisabled: {
    backgroundColor: '#555',
    shadowOpacity: 0,
    elevation: 0,
  },
  continueButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CharacterSelectScreen;
