# 🎮 Zombie Quiz RPG - สรุปโปรเจกต์

## 📖 ภาพรวม

**Zombie Quiz RPG** คือเกมมือถือแนว RPG ควิซที่ผสมผสานระหว่างการเตรียมสอบราชการ (กพ., ข้าราชการ) กับเกมแนวต่อสู้ผ่านด่านแบบ Line Ranger

### แนวคิดหลัก
- 🎯 **เรียนรู้ผ่านเกม**: ทำข้อสอบเพื่อโจมตีศัตรู
- 🧟 **ธีมซอมบี้**: ต่อสู้กับซอมบี้ต่างๆ
- 📚 **เนื้อหาจริง**: ข้อสอบเตรียมสอบราชการ
- 🌐 **2 ภาษา**: ไทยและอังกฤษ

## 🏗️ โครงสร้างโปรเจกต์

```
app-test/
├── 📱 App.tsx                      # ไฟล์หลักของแอพ
├── ⚙️ app.json                     # Expo configuration
├── ⚙️ app.config.ts                # TypeScript config for Expo
├── 📦 package.json                 # Dependencies
├── 🔧 tsconfig.json                # TypeScript configuration
├── 🔧 babel.config.js              # Babel configuration
├── 🧪 jest.config.js               # Jest testing configuration
├── 📄 .gitignore                   # Git ignore rules
├── 📖 README.md                    # คู่มือหลัก (TH/EN)
├── 🚀 INSTALLATION.md              # คู่มือติดตั้ง
├── 📊 PROGRESS.md                  # Progress tracking
│
└── 📁 src/                         # Source code
    ├── 🎨 assets/                  # รูปภาพ, เสียง, ฟอนต์
    │   └── README.md               # Asset documentation
    │
    ├── 🧩 components/              # Reusable UI components
    │   ├── Button.tsx              # Button component
    │   ├── Card.tsx                # Card component
    │   ├── ProgressBar.tsx         # Progress bar component
    │   └── index.ts                # Component exports
    │
    ├── 🧠 context/                 # React Context (State Management)
    │   └── GameContext.tsx         # Game state management
    │
    ├── 📊 data/                    # Game data
    │   ├── quizQuestions.ts        # 18 quiz questions (6 subjects)
    │   ├── characters.ts           # 8 characters with stats
    │   └── levels.ts               # 20 levels with bosses
    │
    ├── 🌐 i18n/                    # Internationalization
    │   ├── index.ts                # i18n configuration
    │   └── locales/
    │       ├── th.json             # Thai translations
    │       └── en.json             # English translations
    │
    ├── 🧭 navigation/              # Navigation configuration
    │   └── AppNavigator.tsx        # Stack navigator
    │
    ├── 🖥️ screens/                 # App screens
    │   ├── HomeScreen.tsx          # Home menu
    │   ├── LevelMapScreen.tsx      # Level selection
    │   ├── BattleScreen.tsx        # Battle/Quiz gameplay
    │   ├── CharactersScreen.tsx    # Character collection
    │   ├── ShopScreen.tsx          # Item shop
    │   ├── ProfileScreen.tsx       # Player profile
    │   └── SettingsScreen.tsx      # Game settings
    │
    ├── 🔤 types/                   # TypeScript type definitions
    │   └── index.ts                # All type definitions
    │
    └── 🛠️ utils/                   # Helper functions
        └── helpers.ts              # Utility functions
```

## 🎯 ฟีเจอร์หลัก

### 1. ระบบเกม (Game System)
- ✅ Turn-based battle ด้วยการทำข้อสอบ
- ✅ 20 ด่าน (5 ง่าย, 5 ปานกลาง, 5 ยาก, 5 บอส)
- ✅ ระบบเลเวลและประสบการณ์
- ✅ ระบบบันทึกเกมอัตโนมัติ

### 2. ระบบข้อสอบ (Quiz System)
- ✅ 6 วิชา: ความรู้ทั่วไป, ไทย, คณิต, วิทย์, สังคม, อังกฤษ
- ✅ 3 ระดับความยาก: Easy, Medium, Hard
- ✅ คำอธิบายหลังตอบ
- ✅ จับเวลาในการทำข้อสอบ

### 3. ระบบตัวละคร (Character System)
- ✅ 8 ตัวละคร (4 Common, 2 Rare, 2 Epic, 2 Legendary)
- ✅ ระบบอัพเกรดเลเวลตัวละคร
- ✅ สถิติ: โจมตี, ป้องกัน, ความเร็ว, เลือด
- ✅ ระบบสกิล (พร้อมใช้งาน)

### 4. ระบบเศรษฐกิจ (Economy System)
- ✅ 2 สกุลเงิน: เหรียญ (Coins) และ อัญมณี (Gems)
- ✅ ร้านค้าไอเทม
- ✅ ระบบโบนัสประจำวัน
- ✅ รางวัลจากการผ่านด่าน

### 5. ระบบภาษา (Localization)
- ✅ ไทยและอังกฤษ
- ✅ เปลี่ยนภาษาได้ใน Settings
- ✅ รองรับทุกข้อความในเกม

## 📊 ข้อมูลเกม

### ตัวละครทั้งหมด (8 ตัว)

#### Common (💚)
1. **ซอมบี้น้อย** (Little Zombie) - ฟรี
2. **นักเรียนขยัน** (Diligent Student) - 500 เหรียญ

#### Rare (💙)
3. **ซอมบี้ทหาร** (Soldier Zombie) - 1,500 เหรียญ
4. **ข้าราชการระดับสูง** (Senior Officer) - 2,000 เหรียญ

#### Epic (💜)
5. **ซอมบี้บอส** (Zombie Boss) - 5,000 เหรียญ
6. **ผู้เชี่ยวชาญข้อสอบ** (Exam Expert) - 6,000 เหรียญ

#### Legendary (👑)
7. **ซอมบี้ราชา** (Zombie King) - 15,000 เหรียญ
8. **เทพเจ้าแห่งการสอบ** (God of Exams) - 20,000 เหรียญ

### ด่านทั้งหมด (20 ด่าน)

#### Easy (1-5) 🟢
- ด่าน 1-4: ด่านปกติ
- ด่าน 5: บอสแรก (ซอมบี้ทหาร)

#### Medium (6-10) 🟡
- ด่าน 6-9: ด่านปกติ
- ด่าน 10: บอสที่สอง (ซอมบี้บอส)

#### Hard (11-15) 🔴
- ด่าน 11-14: ด่านปกติ
- ด่าน 15: บอสที่สาม (ผู้เชี่ยวชาญข้อสอบ)

#### Expert (16-20) 🟣
- ด่าน 16-19: ด่านปกติ
- ด่าน 20: บอสสุดท้าย (เทพเจ้าแห่งการสอบ)

### ข้อสอบ (18 ข้อ)
- ความรู้ทั่วไป: 3 ข้อ
- ภาษาไทย: 3 ข้อ
- คณิตศาสตร์: 3 ข้อ
- วิทยาศาสตร์: 3 ข้อ
- สังคมศึกษา: 3 ข้อ
- อังกฤษ: 3 ข้อ

## 🛠️ เทคโนโลยี

### Frontend
- **React Native** 0.74.5 - Mobile framework
- **Expo** ~51.0.0 - Development platform
- **TypeScript** ^5.1.3 - Type safety

### Navigation & State
- **React Navigation** ^6.1.9 - Navigation
- **React Context** - State management
- **AsyncStorage** 1.23.1 - Local storage

### Localization
- **i18next** ^23.7.13 - Internationalization
- **react-i18next** ^14.0.0 - React i18n
- **expo-localization** ~15.0.3 - Device locale

### UI & Media
- **expo-av** ~14.0.5 - Audio/Video (placeholder)
- **expo-linear-gradient** ~13.0.2 - Gradients
- **react-native-gesture-handler** ~2.16.1 - Gestures

### Development
- **Jest** ^29.2.1 - Testing
- **@testing-library/react-native** ^12.4.3 - Testing utilities

## 🎮 วิธีเล่น

### การต่อสู้
1. เลือกด่านจาก Level Map
2. เข้าสู่หน้า Battle
3. ตอบคำถามให้ถูกต้องเพื่อโจมตี
4. หลีกเลี่ยงการตอบผิด (จะได้รับความเสียหาย)
5. เอาชนะศัตรูภายในเวลาที่กำหนด

### การพัฒนาตัวละคร
1. ไปที่หน้า Characters
2. เลือกตัวละครที่ต้องการ
3. ใช้เหรียญอัพเกรดเลเวล
4. สถิติจะเพิ่มขึ้นตามเลเวล

### ร้านค้า
- 🧪 ยาฟื้นฟูเลือด (100 เหรียญ)
- ⚔️ เพิ่มพลังโจมตี (200 เหรียญ)
- 🛡️ โล่ป้องกัน (250 เหรียญ)
- ⏱️ เพิ่มเวลา (150 เหรียญ)
- 💡 ใบ้คำตอบ (300 เหรียญ)
- 💰 แพ็คเหรียญ (5-45 อัญมณี)

## 📱 การติดตั้งและรัน

### ติดตั้งครั้งเดียว
```bash
cd app-test
npm install
```

### รันแอพ
```bash
npm start
# กด 'i' สำหรับ iOS
# กด 'a' สำหรับ Android
# กด 'w' สำหรับ Web
```

### ดูคู่มือเต็ม
👉 อ่าน [INSTALLATION.md](./INSTALLATION.md)

## 🎨 การปรับแต่ง

### เพิ่มข้อสอบใหม่
แก้ไข: `src/data/quizQuestions.ts`

### เพิ่มตัวละครใหม่
แก้ไข: `src/data/characters.ts`

### เพิ่มด่านใหม่
แก้ไข: `src/data/levels.ts`

### เปลี่ยนข้อความภาษา
แก้ไข: `src/i18n/locales/th.json` หรือ `en.json`

## 📈 สถานะโปรเจกต์

**Completion: ~85%**

### ✅ เสร็จแล้ว
- ระบบเกมหลัก
- ทุกหน้าจอ
- ระบบบันทึกเกม
- ระบบภาษา
- ระบบตัวละครและอัพเกรด
- ระบบร้านค้า

### ⚠️ ที่ต้องทำเพิ่ม
- ภาพกราฟิกจริง (ตอนนี้ใช้ emoji)
- เสียงประกอบและเพลง
- ข้อสอบเพิ่มเติม (ให้ได้อย่างน้อย 200 ข้อ)
- อนิเมชั่นการต่อสู้
- ระบบความสำเร็จ (Achievements)

## 🚀 แผนการพัฒนา

### Phase 1: MVP (เสร็จแล้ว ✅)
- ระบบเกมพื้นฐาน
- 20 ด่าน
- 8 ตัวละคร
- 18 ข้อสอบ

### Phase 2: Playable Demo (ถัดไป 🎯)
- 50+ ข้อสอบ
- กราฟิกพื้นฐาน
- เสียงประกอบ
- Tutorial

### Phase 3: Beta (1-2 เดือน)
- 200+ ข้อสอบ
- กราฟิกสมบูรณ์
- เพลงและ SFX
- Achievements
- Bug fixes

### Phase 4: Release (3-4 เดือน)
- Polish
- App Store submission
- Marketing
- User feedback

## 📞 การติดต่อ

- **Email**: support@zombiequizrpg.com
- **Facebook**: Zombie Quiz RPG
- **Line**: @zombiequizrpg

## 📄 License

MIT License - อนุญาตให้แก้ไขและแจกจ่ายได้

## 🙏 ขอบคุณ

ขอบคุณที่ใช้เกม Zombie Quiz RPG!
หวังว่าจะเป็นประโยชน์ในการเตรียมสอบนะครับ 📚✨

---

**Version**: 1.0.0  
**Last Updated**: 2024-01-XX  
**Made with ❤️ for Thai Students**
