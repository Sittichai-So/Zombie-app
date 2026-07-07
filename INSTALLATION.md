# 🚀 คู่มือการติดตั้งและเริ่มใช้งาน Zombie Quiz RPG

## 📋 ข้อกำหนดระบบ

### สำหรับการพัฒนา
- **Node.js**: เวอร์ชัน 16.x ขึ้นไป
- **npm**: เวอร์ชัน 8.x ขึ้นไป (มาพร้อม Node.js)
- **Expo CLI**: เวอร์ชันล่าสุด
- **Git**: สำหรับ clone repository

### สำหรับรันแอพ
- **iOS**: iOS 13.0 ขึ้นไป (iPhone/iPad)
- **Android**: Android 6.0 (API level 23) ขึ้นไป
- **Web**: Browser ที่รองรับ HTML5

## 🔧 ขั้นตอนการติดตั้ง

### 1. ติดตั้ง Node.js

#### Windows
1. ดาวน์โหลดจาก https://nodejs.org/
2. เลือกเวอร์ชัน LTS (Long Term Support)
3. ติดตั้งตามขั้นตอน
4. ตรวจสอบการติดตั้ง:
```bash
node --version
npm --version
```

#### macOS
```bash
# ใช้ Homebrew (แนะนำ)
brew install node

# หรือดาวน์โหลดจาก https://nodejs.org/
```

#### Linux
```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# หรือใช้ nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install --lts
```

### 2. ติดตั้ง Expo CLI

```bash
npm install -g expo-cli
```

ตรวจสอบการติดตั้ง:
```bash
expo --version
```

### 3. Clone หรือ ดาวน์โหลดโปรเจกต์

```bash
# ถ้าใช้ Git
git clone <repository-url>
cd app-test

# หรือแตกไฟล์ zip ที่ดาวน์โหลด
cd app-test
```

### 4. ติดตั้ง Dependencies

```bash
npm install
```

⏱️ **เวลาที่ใช้**: ประมาณ 3-5 นาที (ขึ้นอยู่กับความเร็วอินเทอร์เน็ต)

### 5. เริ่ม Development Server

```bash
npm start
# หรือ
expo start
```

คุณจะเห็น QR code และเมนูตัวเลือก:
- กด `i` สำหรับ iOS Simulator
- กด `a` สำหรับ Android Emulator
- กด `w` สำหรับ Web Browser

## 📱 การรันบนอุปกรณ์จริง

### วิธีที่ 1: Expo Go (แนะนำสำหรับผู้เริ่มต้น)

1. **ติดตั้ง Expo Go**
   - iOS: ดาวน์โหลดจาก App Store
   - Android: ดาวน์โหลดจาก Google Play Store

2. **สแกน QR Code**
   - เปิด Expo Go
   - สแกน QR code ที่แสดงใน terminal
   - แอพจะเริ่มทำงาน

### วิธีที่ 2: Development Build

```bash
# สำหรับ iOS
expo run:ios

# สำหรับ Android
expo run:android
```

## 🐛 การแก้ปัญหาที่พบบ่อย

### ปัญหา: npm install ล้มเหลว

**วิธีแก้ 1: ลบ node_modules และติดตั้งใหม่**
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

**วิธีแก้ 2: ใช้ npm cache**
```bash
npm cache clean --force
npm install
```

**วิธีแก้ 3: ใช้ yarn แทน**
```bash
npm install -g yarn
yarn install
```

### ปัญหา: Expo ไม่สามารถเริ่มได้

**วิธีแก้:**
```bash
# Clear Expo cache
expo start -c

# หรือ
npm start -- -c
```

### ปัญหา: iOS Simulator ไม่เปิด (macOS)

**วิธีแก้:**
```bash
# ติดตั้ง Xcode Command Line Tools
xcode-select --install

# เปิด Simulator ด้วยตนเอง
open -a Simulator
```

### ปัญหา: Android Emulator ไม่เปิด

**วิธีแก้:**
1. ติดตั้ง Android Studio
2. สร้าง Virtual Device ใน AVD Manager
3. รัน Emulator ก่อนเริ่ม Expo
4. หรือใช้คำสั่ง:
```bash
expo start --android
```

### ปัญหา: Metro Bundler Error

**วิธีแก้:**
```bash
# Clear Metro cache
npx react-native start --reset-cache

# หรือ
expo start -c
```

### ปัญหา: Dependencies ขัดแย้งกัน

**วิธีแก้:**
```bash
# ลบทั้งหมดและติดตั้งใหม่
rm -rf node_modules
npm cache clean --force
npm install
```

## ⚡ คำสั่งที่มีประโยชน์

### Development
```bash
npm start              # เริ่ม development server
npm start -- -c        # เริ่มพร้อม clear cache
npm run android        # รันบน Android
npm run ios           # รันบน iOS
npm run web           # รันบน Web
```

### Testing
```bash
npm test              # รัน tests
npm run test:watch    # รัน tests ใน watch mode
npm run test:coverage # รัน tests พร้อม coverage
```

### Building
```bash
expo build:android    # Build Android APK
expo build:ios        # Build iOS IPA
eas build             # ใช้ EAS Build (ใหม่)
```

### Publishing
```bash
expo publish          # Publish ไปยัง Expo servers
eas submit            # Submit ไปยัง App Store/Play Store
```

## 📦 การ Build สำหรับ Production

### ใช้ EAS Build (แนะนำ)

1. **ติดตั้ง EAS CLI**
```bash
npm install -g eas-cli
```

2. **Login**
```bash
eas login
```

3. **Configure**
```bash
eas build:configure
```

4. **Build**
```bash
# Android
eas build --platform android

# iOS
eas build --platform ios

# Preview build
eas build --platform android --profile preview
```

### Build แบบดั้งเดิม

```bash
# Android
expo build:android
# จะได้ไฟล์ .apk หรือ .aab

# iOS (ต้องมี Apple Developer Account)
expo build:ios
# จะได้ไฟล์ .ipa
```

## 🎯 เคล็ดลับเพิ่มเติม

### 1. Hot Reload
- แก้ไขโค้ดแล้วกด `r` เพื่อ reload
- กด `R` เพื่อ reload พร้อม clear cache

### 2. Debugging
- เปิด Developer Menu: เขย่าอุปกรณ์ หรือกด `d` ใน terminal
- ใช้ React Native Debugger
- ใช้ Chrome DevTools

### 3. Performance
- ใช้ React.memo สำหรับ components
- หลีกเลี่ยงการ re-render ไม่จำเป็น
- ใช้ FlatList แทน map สำหรับ list ยาวๆ

### 4. Code Quality
```bash
# ตรวจสอบ TypeScript errors
npx tsc --noEmit

# ตรวจสอบ ESLint
npx eslint src/

# Format code
npx prettier --write src/
```

## 📚 ทรัพยากรเพิ่มเติม

### เอกสารทางการ
- [React Native](https://reactnative.dev/docs/getting-started)
- [Expo](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/docs/getting-started)
- [TypeScript](https://www.typescriptlang.org/docs/)

### ชุมชน
- [Expo Forums](https://forums.expo.dev/)
- [React Native Community](https://github.com/facebook/react-native/discussions)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/react-native)

### เครื่องมือแนะนำ
- **VS Code** - Editor ที่แนะนำ
- **Expo Go** - สำหรับทดสอบบนมือถือ
- **Android Studio** - สำหรับ Android development
- **Xcode** - สำหรับ iOS development (macOS เท่านั้น)

## ✅ Checklist การติดตั้ง

- [ ] ติดตั้ง Node.js และ npm
- [ ] ติดตั้ง Expo CLI
- [ ] Clone/Download โปรเจกต์
- [ ] ติดตั้ง dependencies (npm install)
- [ ] เริ่ม development server (npm start)
- [ ] รันแอพบน Simulator/Emulator/Device
- [ ] ทดสอบการเปลี่ยนภาษา
- [ ] ทดสอบการเล่นด่านแรก
- [ ] ทดสอบระบบตัวละคร

## 🆘 ต้องการความช่วยเหลือ?

หากพบปัญหาที่แก้ไม่ได้:
1. ตรวจสอบ error message อย่างละเอียด
2. ค้นหาใน Google/Stack Overflow
3. ตรวจสอบ documentation
4. ถามในชุมชน Expo/React Native
5. Contact: support@zombiequizrpg.com

---

**Happy Coding! 🎮📚**
