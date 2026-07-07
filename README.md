# Zombie Quiz RPG 🧟‍♂️📚

เกมมือถือแนว RPG ควิซเตรียมสอบราชการ (กพ., ข้าราชการ) สำหรับทั้ง iOS และ Android

## 🎮 คุณสมบัติของเกม

### ระบบหลัก
- ✅ **ระบบผ่านด่าน** - 20 ด่านพร้อมบอสแต่ละช่วง
- ✅ **ระบบข้อสอบ** - คำถามเตรียมสอบ กพ. และราชการ 5 วิชา
- ✅ **ระบบตัวละคร** - 8 ตัวละคร (ซอมบี้และมนุษย์) พร้อมอัพเกรด
- ✅ **ระบบร้านค้า** - ซื้อไอเทมและทรัพยากร
- ✅ **ระบบภาษา** - รองรับไทยและอังกฤษ
- ✅ **ระบบเลเวล** - เพิ่มเลเวลและอัพเกรดตัวละคร
- ✅ **ระบบบันทึกเกม** - บันทึกความก้าวหน้าอัตโนมัติ

### วิชาข้อสอบ
1. 📖 ความรู้ทั่วไป
2. 🇹🇭 ภาษาไทย
3. 🧮 คณิตศาสตร์
4. 🔬 วิทยาศาสตร์
5. 🌍 สังคมศึกษา
6. 🇬🇧 ภาษาอังกฤษ

### ตัวละคร
- **Common** (💚): ซอมบี้น้อย, นักเรียนขยัน
- **Rare** (💙): ซอมบี้ทหาร, ข้าราชการระดับสูง
- **Epic** (💜): ซอมบี้บอส, ผู้เชี่ยวชาญข้อสอบ
- **Legendary** (👑): ซอมบี้ราชา, เทพเจ้าแห่งการสอบ

## 🚀 การติดตั้งและเริ่มใช้งาน

### ข้อกำหนดเบื้องต้น
- Node.js 16+ และ npm
- Expo CLI
- iOS Simulator (สำหรับ Mac) หรือ Android Emulator

### ขั้นตอนการติดตั้ง

1. **ติดตั้ง Dependencies**
```bash
cd app-test
npm install
```

2. **ติดตั้ง Expo CLI (ถ้ายังไม่มี)**
```bash
npm install -g expo-cli
```

3. **เริ่ม Development Server**
```bash
npm start
# หรือ
expo start
```

4. **รันบน Emulator/Simulator**
- **iOS**: กด `i` ใน terminal หรือ `expo start --ios`
- **Android**: กด `a` ใน terminal หรือ `expo start --android`
- **Web**: กด `w` ใน terminal หรือ `expo start --web`

## 📁 โครงสร้างโปรเจกต์

```
app-test/
├── src/
│   ├── components/        # UI Components
│   ├── context/           # Game Context (State Management)
│   ├── data/              # ข้อมูลเกม (ข้อสอบ, ตัวละคร, ด่าน)
│   ├── i18n/              # ระบบภาษา (th.json, en.json)
│   ├── navigation/        # Navigation Configuration
│   ├── screens/           # หน้าจอทั้งหมด
│   ├── types/             # TypeScript Types
│   ├── utils/             # Helper Functions
│   └── assets/            # รูปภาพ, เสียง (placeholders)
├── App.tsx                # Main App Entry
├── app.json               # Expo Configuration
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript Configuration
└── README.md              # คู่มือนี้
```

## 🎯 วิธีเล่น

### การต่อสู้
1. เลือกด่านจากแผนที่
2. ตอบคำถามให้ถูกต้องเพื่อโจมตีศัตรู
3. ตอบผิดจะได้รับความเสียหาย
4. เอาชนะศัตรูภายในเวลาที่กำหนด

### การอัพเกรด
1. ไปที่หน้า "ตัวละคร"
2. เลือกตัวละครที่ต้องการอัพเกรด
3. จ่ายเหรียญเพื่อเพิ่มเลเวล
4. สถิติจะเพิ่มขึ้นตามเลเวล

### ร้านค้า
- 🧪 ยาฟื้นฟูเลือด - ฟื้นฟูเลือดระหว่างต่อสู้
- ⚔️ เพิ่มพลังโจมตี - บัฟโจมตี 3 ด่าน
- 🛡️ โล่ป้องกัน - ลดความเสียหาย 3 ด่าน
- ⏱️ เพิ่มเวลา - เพิ่มเวลา 30 วินาที
- 💡 ใบ้คำตอบ - ตัดตัวเลือกผิด 2 ข้อ

## 🛠️ เทคโนโลยีที่ใช้

- **React Native** - Mobile Framework
- **Expo** - Development Platform
- **TypeScript** - Type Safety
- **React Navigation** - Navigation
- **i18next** - Internationalization
- **AsyncStorage** - Local Storage
- **React Context** - State Management

## 🎨 การปรับแต่ง

### เพิ่มข้อสอบ
แก้ไขไฟล์ `src/data/quizQuestions.ts`:
```typescript
{
  id: 19,
  category: 'generalKnowledge',
  difficulty: 'medium',
  question_th: 'คำถามของคุณ?',
  question_en: 'Your question?',
  options_th: ['ตัวเลือก 1', 'ตัวเลือก 2', 'ตัวเลือก 3', 'ตัวเลือก 4'],
  options_en: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
  correctAnswer: 0, // index of correct answer
  explanation_th: 'คำอธิบาย',
  explanation_en: 'Explanation'
}
```

### เพิ่มตัวละคร
แก้ไขไฟล์ `src/data/characters.ts`:
```typescript
{
  id: 9,
  name_th: 'ชื่อตัวละคร',
  name_en: 'Character Name',
  description_th: 'คำอธิบาย',
  description_en: 'Description',
  type: 'zombie' | 'human' | 'special',
  rarity: 'common' | 'rare' | 'epic' | 'legendary',
  baseStats: {
    attack: 30,
    defense: 20,
    speed: 15,
    health: 100
  },
  maxLevel: 50,
  unlockCost: 10000,
  upgradeCostPerLevel: 500,
  imageUri: 'assets/images/characters/character9.png',
  skills: [...]
}
```

### เพิ่มด่าน
แก้ไขไฟล์ `src/data/levels.ts`:
```typescript
{
  id: 21,
  name_th: 'ชื่อด่าน',
  name_en: 'Level Name',
  description_th: 'คำอธิบาย',
  description_en: 'Description',
  difficulty: 'easy' | 'medium' | 'hard' | 'boss',
  questionCount: 10,
  timeLimit: 120,
  enemyCharacterId: 5,
  rewardCoins: 500,
  rewardExp: 200,
  requiredLevel: 21,
  isLocked: true,
  backgroundUri: 'assets/images/backgrounds/level21.png'
}
```

## 🌐 การเปลี่ยนภาษา

เกมรองรับ 2 ภาษา:
- **ภาษาไทย** (th)
- **English** (en)

ภาษาจะถูกตั้งค่าตามระบบปฏิบัติการของอุปกรณ์ หรือสามารถเปลี่ยนได้ในหน้า Settings

## 💾 การบันทึกเกม

เกมจะบันทึกความก้าวหน้าอัตโนมัติลงในเครื่อง:
- โปรไฟล์ผู้เล่น
- เลเวลและประสบการณ์
- เหรียญและอัญมณี
- ตัวละครที่มี
- ด่านที่ผ่านแล้ว
- การตั้งค่า

## 🐛 การแก้ปัญหา

### ปัญหาที่พบบ่อย

1. **npm install ล้มเหลว**
```bash
rm -rf node_modules
npm install
```

2. **Expo ไม่เริ่มทำงาน**
```bash
expo start -c
# clear cache
```

3. **Build ล้มเหลวบน iOS/Android**
```bash
# iOS
cd ios && pod install && cd ..

# Android
cd android && ./gradlew clean && cd ..
```

## 📱 การ Build สำหรับ Production

### iOS
```bash
expo build:ios
# หรือใช้ EAS Build
eas build --platform ios
```

### Android
```bash
expo build:android
# หรือใช้ EAS Build
eas build --platform android
```

## 🎯 แผนการพัฒนาต่อไป

- [ ] เพิ่มด่านมากกว่า 20 ด่าน
- [ ] เพิ่มตัวละครมากกว่า 8 ตัว
- [ ] ระบบ PvP (ผู้เล่น vs ผู้เล่น)
- [ ] ระบบกิลด์/ทีม
- [ ] อีเวนต์พิเศษรายสัปดาห์
- [ ] ระบบเพื่อนและของขวัญ
- [ ] เสียงประกอบและเพลงพื้นหลัง
- [ ] ภาพเคลื่อนไหว (Animations)
- [ ] ระบบความสำเร็จ (Achievements) เพิ่มเติม
- [ ] Leaderboard ออนไลน์

## 📞 การติดต่อและสนับสนุน

หากพบปัญหาหรือต้องการแนะนำฟีเจอร์ใหม่:
- Email: support@zombiequizrpg.com
- Facebook: Zombie Quiz RPG
- Line: @zombiequizrpg

## 📄 License

MIT License - สามารถนำไปพัฒนาต่อได้

## 🙏 ขอบคุณ

ขอบคุณที่เล่นเกม Zombie Quiz RPG!
หวังว่าเกมนี้จะช่วยในการเตรียมสอบนะครับ/คะ 📚✨

---

**Made with ❤️ for Thai Students**
**Version 1.0.0**
