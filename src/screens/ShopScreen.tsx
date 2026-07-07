import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGame } from '../context/GameContext';
import i18n from '@/i18n';

interface ShopItem {
  id: number;
  name_th: string;
  name_en: string;
  description_th: string;
  description_en: string;
  icon: string;
  cost: number;
  currency: 'coins' | 'gems';
  type: 'consumable' | 'character' | 'upgrade';
  effect: {
    type: string;
    value: number;
  };
}

const shopItems: ShopItem[] = [
  {
    id: 1,
    name_th: 'ยาฟื้นฟูเลือด',
    name_en: 'Health Potion',
    description_th: 'ฟื้นฟูเลือด 50% ในระหว่างการต่อสู้',
    description_en: 'Restore 50% health during battle',
    icon: '🧪',
    cost: 100,
    currency: 'coins',
    type: 'consumable',
    effect: { type: 'heal', value: 50 }
  },
  {
    id: 2,
    name_th: 'เพิ่มพลังโจมตี',
    name_en: 'Damage Boost',
    description_th: 'เพิ่มพลังโจมตี 20% เป็นเวลา 3 ด่าน',
    description_en: 'Increase attack by 20% for 3 levels',
    icon: '⚔️',
    cost: 200,
    currency: 'coins',
    type: 'consumable',
    effect: { type: 'attack_buff', value: 20 }
  },
  {
    id: 3,
    name_th: 'โล่ป้องกัน',
    name_en: 'Shield',
    description_th: 'ลดความเสียหาย 50% เป็นเวลา 3 ด่าน',
    description_en: 'Reduce damage by 50% for 3 levels',
    icon: '🛡️',
    cost: 250,
    currency: 'coins',
    type: 'consumable',
    effect: { type: 'defense_buff', value: 50 }
  },
  {
    id: 4,
    name_th: 'เพิ่มเวลา',
    name_en: 'Extra Time',
    description_th: 'เพิ่มเวลา 30 วินาทีในด่านถัดไป',
    description_en: 'Add 30 seconds to next level timer',
    icon: '⏱️',
    cost: 150,
    currency: 'coins',
    type: 'consumable',
    effect: { type: 'time_bonus', value: 30 }
  },
  {
    id: 5,
    name_th: 'ใบ้คำตอบ',
    name_en: 'Hint',
    description_th: 'ตัด 2 ตัวเลือกที่ผิดออก',
    description_en: 'Remove 2 wrong answers',
    icon: '💡',
    cost: 300,
    currency: 'coins',
    type: 'consumable',
    effect: { type: 'hint', value: 1 }
  },
  {
    id: 6,
    name_th: 'ห่อเหรียญเล็ก',
    name_en: 'Small Coin Pack',
    description_th: 'ได้รับ 500 เหรียญ',
    description_en: 'Get 500 coins',
    icon: '💰',
    cost: 5,
    currency: 'gems',
    type: 'consumable',
    effect: { type: 'coins', value: 500 }
  },
  {
    id: 7,
    name_th: 'ห่อเหรียญกลาง',
    name_en: 'Medium Coin Pack',
    description_th: 'ได้รับ 1500 เหรียญ',
    description_en: 'Get 1500 coins',
    icon: '💰💰',
    cost: 15,
    currency: 'gems',
    type: 'consumable',
    effect: { type: 'coins', value: 1500 }
  },
  {
    id: 8,
    name_th: 'ห่อเหรียญใหญ่',
    name_en: 'Large Coin Pack',
    description_th: 'ได้รับ 5000 เหรียญ',
    description_en: 'Get 5000 coins',
    icon: '💰💰💰',
    cost: 45,
    currency: 'gems',
    type: 'consumable',
    effect: { type: 'coins', value: 5000 }
  },
];

const ShopScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { player, updatePlayer } = useGame();
  const [purchasedItems, setPurchasedItems] = useState<number[]>([]);

  const handlePurchase = async (item: ShopItem) => {
    // Check if player has enough currency
    if (item.currency === 'coins' && player.coins < item.cost) {
      Alert.alert('ข้อผิดพลาด', 'เหรียญไม่พอ');
      return;
    }
    
    if (item.currency === 'gems' && player.gems < item.cost) {
      Alert.alert('ข้อผิดพลาด', 'เจมไม่พอ');
      return;
    }

    // Confirm purchase
    Alert.alert(
      'ยืนยันการซื้อ',
      `${item.name_th} - ${item.cost} ${item.currency === 'coins' ? '🪙' : '💎'}`,
      [
        {
          text: 'ยกเลิก',
          style: 'cancel',
        },
        {
          text: 'ยืนยัน',
          onPress: async () => {
            // Deduct currency
            const updates: any = {};
            if (item.currency === 'coins') {
              updates.coins = player.coins - item.cost;
            } else {
              updates.gems = player.gems - item.cost;
            }

            // Apply effect
            if (item.effect.type === 'coins') {
              updates.coins = (updates.coins || player.coins) + item.effect.value;
            }

            await updatePlayer(updates);
            setPurchasedItems([...purchasedItems, item.id]);

            Alert.alert('สำเร็จ', 'ซื้อสินค้าสำเร็จ!');
          },
        },
      ]
    );
  };

  const renderShopItem = (item: ShopItem) => {
    const isPurchased = purchasedItems.includes(item.id);
    const canAfford = item.currency === 'coins' 
      ? player.coins >= item.cost 
      : player.gems >= item.cost;

    return (
      <TouchableOpacity
        key={item.id}
        style={[
          styles.shopItem,
          !canAfford && styles.cannotAfford,
          isPurchased && styles.purchased,
        ]}
        onPress={() => !isPurchased && handlePurchase(item)}
        disabled={isPurchased}
      >
        {/* Item Icon */}
        <View style={styles.itemIcon}>
          <Text style={styles.itemEmoji}>{item.icon}</Text>
        </View>

        {/* Item Info */}
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>
            {i18n.language === 'th' ? item.name_th : item.name_en}
          </Text>
          <Text style={styles.itemDescription}>
            {i18n.language === 'th' ? item.description_th : item.description_en}
          </Text>
          
          {/* Cost */}
          <View style={styles.costContainer}>
            <Text style={styles.costIcon}>
              {item.currency === 'coins' ? '🪙' : '💎'}
            </Text>
            <Text style={styles.costValue}>{item.cost}</Text>
          </View>
        </View>

        {/* Purchase Button */}
        <View style={styles.purchaseButtonContainer}>
          {isPurchased ? (
            <View style={styles.purchasedBadge}>
              <Text style={styles.purchasedText}>ซื้อแล้ว</Text>
            </View>
          ) : (
            <TouchableOpacity
              style={[
                styles.purchaseButton,
                !canAfford && styles.purchaseButtonDisabled,
              ]}
              onPress={() => handlePurchase(item)}
            >
              <Text style={styles.purchaseButtonText}>
                ซื้อ
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  // Group items by type
  const consumables = shopItems.filter(item => item.type === 'consumable');
  const currencyPacks = shopItems.filter(item => item.effect.type === 'coins');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>ร้านค้า</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Currency Display */}
      <View style={styles.currencyContainer}>
        <View style={styles.currencyBox}>
          <Text style={styles.currencyIcon}>🪙</Text>
          <Text style={styles.currencyValue}>{player.coins}</Text>
          <Text style={styles.currencyLabel}>เหรียญ</Text>
        </View>
        <View style={styles.currencyBox}>
          <Text style={styles.currencyIcon}>💎</Text>
          <Text style={styles.currencyValue}>{player.gems}</Text>
          <Text style={styles.currencyLabel}>เจม</Text>
        </View>
      </View>

      {/* Shop Items - Include Get Gems Button inside ScrollView */}
      <ScrollView 
        style={[styles.shopContainer, Platform.OS === 'web' && { minHeight: '100%' }]}
        contentContainerStyle={[styles.shopScrollContent, { flexGrow: 1 }, Platform.OS === 'web' && { minHeight: '100%' }, Platform.OS === 'web' && { paddingBottom: 100 }]}
        showsVerticalScrollIndicator={true}
        nestedScrollEnabled={Platform.OS !== 'web'}
        bounces={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Consumables */}
        <View style={styles.categorySection}>
          <Text style={styles.categoryTitle}>🛒 ไอเทม</Text>
          {consumables.filter(i => i.effect.type !== 'coins').map(renderShopItem)}
        </View>

        {/* Currency Packs */}
        <View style={styles.categorySection}>
          <Text style={styles.categoryTitle}>💎 แพ็คเหรียญ</Text>
          {currencyPacks.map(renderShopItem)}
        </View>

        {/* Special Offers */}
        <View style={styles.specialOffer}>
          <Text style={styles.specialOfferTitle}>🎁 ข้อเสนอพิเศษ</Text>
          <Text style={styles.specialOfferText}>
            ซื้อครั้งแรกฟรี!
          </Text>
          <TouchableOpacity style={styles.specialOfferButton}>
            <Text style={styles.specialOfferButtonText}>
              ซื้อ
            </Text>
          </TouchableOpacity>
        </View>

        {/* Get Gems Button - Moved inside ScrollView */}
        <View style={styles.getGemsContainer}>
          <TouchableOpacity style={styles.getGemsButton}>
            <Text style={styles.getGemsText}>
              รับเจมฟรี
            </Text>
          </TouchableOpacity>
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
  shopContainer: {
    flex: 1,
    width: '100%',
  },
  shopScrollContent: {
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'web' ? 120 : 100,
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
  currencyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#16213e',
    borderBottomWidth: 1,
    borderBottomColor: '#e94560',
    gap: 15,
  },
  currencyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(233, 69, 96, 0.08)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
    gap: 10,
    borderWidth: 2,
    borderColor: '#e94560',
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  currencyIcon: {
    fontSize: 22,
  },
  currencyValue: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  currencyLabel: {
    fontSize: 12,
    color: '#cccccc',
  },
  categorySection: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e94560',
    marginBottom: 10,
  },
  shopItem: {
    flexDirection: 'row',
    backgroundColor: 'rgba(233, 69, 96, 0.08)',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#e94560',
    alignItems: 'center',
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  cannotAfford: {
    opacity: 0.5,
  },
  purchased: {
    borderColor: '#4ade80',
    shadowColor: '#4ade80',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  itemIcon: {
    width: 65,
    height: 65,
    borderRadius: 32,
    backgroundColor: 'rgba(15, 52, 96, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  itemEmoji: {
    fontSize: 32,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 8,
  },
  costContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  costIcon: {
    fontSize: 16,
  },
  costValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffd700',
  },
  purchaseButtonContainer: {
    marginLeft: 10,
  },
  purchaseButton: {
    backgroundColor: '#e94560',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ff6b6b',
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  purchaseButtonDisabled: {
    backgroundColor: '#333333',
    borderColor: '#666666',
    opacity: 0.5,
  },
  purchaseButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  purchasedBadge: {
    backgroundColor: '#ffd700',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  purchasedText: {
    color: '#000000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  specialOffer: {
    backgroundColor: 'rgba(233, 69, 96, 0.15)',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#e94560',
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
  specialOfferTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e94560',
    marginBottom: 10,
  },
  specialOfferText: {
    fontSize: 14,
    color: '#ff6b6b',
    textAlign: 'center',
    marginBottom: 15,
  },
  specialOfferButton: {
    backgroundColor: '#e94560',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#ff6b6b',
  },
  specialOfferButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  getGemsContainer: {
    padding: 15,
    backgroundColor: '#16213e',
    borderTopWidth: 1,
    borderTopColor: '#e94560',
    marginTop: 20,
    marginBottom: 20,
  },
  getGemsButton: {
    backgroundColor: '#e94560',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ff6b6b',
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  getGemsText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ShopScreen;
