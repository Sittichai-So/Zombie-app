# 🚀 คู่มือ Build และ Deploy Zombie Quiz RPG

## 📱 การ Build สำหรับ Production

### วิธีที่ 1: EAS Build (แนะนำ)

EAS (Expo Application Services) เป็นวิธีที่ง่ายและรวดเร็วที่สุด

#### 1. ติดตั้ง EAS CLI
```bash
npm install -g eas-cli
```

#### 2. Login เข้า Expo Account
```bash
eas login
```
- ถ้ายังไม่มี account ให้สมัครที่ https://expo.dev

#### 3. Configure EAS
```bash
cd app-test
eas build:configure
```

#### 4. Build Android
```bash
# APK (สำหรับติดตั้งเอง)
eas build --platform android --profile preview

# AAB (สำหรับ Google Play Store)
eas build --platform android --profile production
```

#### 5. Build iOS
```bash
# IPA (สำหรับติดตั้งเอง)
eas build --platform ios --profile preview

# สำหรับ App Store
eas build --platform ios --profile production
```

#### 6. ดาวน์โหลดไฟล์ Build
- หลังจาก build เสร็จ จะได้ลิงก์ดาวน์โหลด
- หรือใช้คำสั่ง:
```bash
eas build:list
```

### วิธีที่ 2: Expo Build (แบบเก่า)

#### Android
```bash
expo build:android
```
- เลือก "Build a signed APK" หรือ "Build a signed Android App Bundle"
- รอ build เสร็จ (ประมาณ 10-20 นาที)
- ดาวน์โหลดจากลิงก์ที่ได้

#### iOS
```bash
expo build:ios
```
- ต้องมี Apple Developer Account ($99/year)
- เลือก "Build a signed IPA"
- รอ build เสร็จ
- ดาวน์โหลดจากลิงก์ที่ได้

## 📦 การ Submit ขึ้น Store

### Google Play Store

#### 1. เตรียมความพร้อม
- มี Google Play Developer Account ($25 one-time)
- เตรียมรูป screenshots (มือถือและแท็บเล็ต)
- เตรียม icon (512x512px)
- เตรียม feature graphic (1024x500px)

#### 2. สร้าง AAB File
```bash
eas build --platform android --profile production
```

#### 3. Upload ขึ้น Play Console
1. เข้า https://play.google.com/console
2. สร้างแอพใหม่
3. กรอกข้อมูลแอพ
4. Upload ไฟล์ AAB
5. ส่งรีวิว

#### 4. ข้อมูลที่ต้องเตรียม
- ชื่อแอพ: Zombie Quiz RPG
- คำอธิบายสั้น: เกม RPG ควิซเตรียมสอบราชการ
- คำอธิบายยาว: (ดูจาก README.md)
- หมวดหมู่: Education / Trivia
- เรทติ้ง: Everyone / PEGI 3
- Privacy Policy URL

### Apple App Store

#### 1. เตรียมความพร้อม
- มี Apple Developer Account ($99/year)
- เตรียม screenshots (หลายขนาด)
- เตรียม icon (1024x1024px)
- เตรียม promotional graphics

#### 2. สร้าง IPA File
```bash
eas build --platform ios --profile production
```

#### 3. Upload ผ่าน Xcode
1. เปิด Xcode
2. Window → Organizer
3. เลือกแอพ
4. Upload IPA

#### 4. หรือใช้ Transporter App
1. ดาวน์โหลด Transporter จาก Mac App Store
2. Login ด้วย Apple ID
3. Drag & Drop ไฟล์ IPA
4. Upload

#### 5. ส่งรีวิวใน App Store Connect
1. เข้า https://appstoreconnect.apple.com
2. สร้างแอพใหม่
3. กรอกข้อมูล
4. เลือก build ที่ upload
5. ส่งรีวิว

## 🎨 Asset Requirements

### App Icon
- **iOS**: 1024x1024px (PNG, no transparency)
- **Android**: 512x512px (PNG, no transparency)
- **Adaptive Icon**: 4320x4320px (XML + layers)

### Screenshots

#### iOS (ทั้งหมดเป็น PNG)
- 6.7" (1284x2778px) - iPhone 14 Pro Max
- 6.5" (1242x2688px) - iPhone XS Max
- 5.5" (1242x2208px) - iPhone 8 Plus
- 12.9" (2048x2732px) - iPad Pro

#### Android
- มือถือ: 1080x1920px หรือ 720x1280px
- แท็บเล็ต: 1920x1080px หรือ 1280x720px
- อย่างน้อย 2 รูป, อย่างมาก 8 รูป

### Feature Graphic (Android)
- 1024x500px
- JPG หรือ PNG
- ไม่มีข้อความสำคัญบริเวณขอบ

### Promo Video (Optional)
- YouTube URL
- ความยาว 30 วินาที - 2 นาที
- แสดง gameplay จริง

## 📋 Store Listing Checklist

### Google Play Store
- [ ] App name (30 characters)
- [ ] Short description (80 characters)
- [ ] Full description (4000 characters)
- [ ] App icon (512x512px)
- [ ] Feature graphic (1024x500px)
- [ ] Screenshots (มือถือ + แท็บเล็ต)
- [ ] Privacy policy URL
- [ ] Category (Education/Trivia)
- [ ] Content rating questionnaire
- [ ] Pricing & distribution

### Apple App Store
- [ ] App name (30 characters)
- [ ] Subtitle (30 characters)
- [ ] Description (4000 characters)
- [ ] App icon (1024x1024px)
- [ ] Screenshots (หลายขนาด)
- [ ] Keywords (100 characters)
- [ ] Privacy policy URL
- [ ] Category (Education/Trivia)
- [ ] Age rating questionnaire
- [ ] Pricing

## 🔐 Signing & Certificates

### Android Signing

#### ใช้ EAS
```bash
eas credentials
```
- EAS จะจัดการให้อัตโนมัติ

#### Manual
1. สร้าง Keystore:
```bash
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

2. สร้างไฟล์ `android/app/build.gradle`:
```gradle
android {
    ...
    signingConfigs {
        release {
            storeFile file('my-release-key.keystore')
            storePassword 'your-password'
            keyAlias 'my-key-alias'
            keyPassword 'your-password'
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}
```

### iOS Signing

#### ใช้ EAS
```bash
eas credentials
```
- EAS จะจัดการ Certificate และ Provisioning Profile

#### Manual
1. เข้า Apple Developer Portal
2. สร้าง Certificate (Distribution)
3. สร้าง App ID
4. สร้าง Provisioning Profile
5. Import เข้า Xcode

## 📊 Analytics & Monitoring

### Firebase Analytics
1. สร้างโปรเจกต์ใน Firebase Console
2. ติดตั้ง Firebase SDK:
```bash
npm install @react-native-firebase/app @react-native-firebase/analytics
```

3. เพิ่ม config ใน `app.json`:
```json
{
  "expo": {
    "android": {
      "googleServicesFile": "./google-services.json"
    },
    "ios": {
      "googleServicesFile": "./GoogleService-Info.plist"
    }
  }
}
```

### Crash Reporting

#### Sentry
```bash
npm install @sentry/react-native
```

#### Bugsnag
```bash
npm install @bugsnag/react-native
```

## 🚀 Continuous Integration

### GitHub Actions

สร้างไฟล์ `.github/workflows/build.yml`:
```yaml
name: Build and Deploy

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
    
    - name: Install dependencies
      run: npm install
    
    - name: Run tests
      run: npm test
    
    - name: Build with EAS
      run: eas build --platform android --non-interactive
      env:
        EXPO_TOKEN: ${{ secrets.EXPO_TOKEN }}
```

## 📱 Distribution Channels

### Internal Testing
- **Android**: Google Play Internal Testing
- **iOS**: TestFlight (สูงสุด 100 devices)

### Closed Beta
- **Android**: Google Play Closed Testing
- **iOS**: TestFlight (สูงสุด 10,000 testers)

### Open Beta
- **Android**: Google Play Open Testing
- **iOS**: App Store Pre-order

### Production
- **Android**: Google Play Store
- **iOS**: Apple App Store
- **Alternative**: Amazon Appstore, Samsung Galaxy Store

## 💰 Monetization Options

### In-App Purchases
```bash
npm install expo-in-app-purchases
```

### Ads
```bash
npm install expo-ads-admob
```

### Subscriptions
- Monthly VIP membership
- Weekly bonus pack
- Remove ads

## 🔒 Security Best Practices

1. **อย่า hardcode secrets** ในโค้ด
2. **ใช้ Environment Variables**:
```bash
npm install react-native-config
```

3. **Enable ProGuard** (Android):
```gradle
buildTypes {
    release {
        minifyEnabled true
        proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
    }
}
```

4. **Obfuscate JavaScript**:
```bash
npx react-native bundle --minify
```

## 📈 Post-Launch

### Update App
```bash
# OTA Update (Expo)
expo publish

# หรือ Build ใหม่
eas build --platform android
```

### Monitor Reviews
- ตอบกลับรีวิวผู้ใช้
- แก้ไขปัญหาที่รายงาน
- อัพเดทสม่ำเสมอ

### Marketing
- Social media
- App Store Optimization (ASO)
- Influencer marketing
- Paid advertising

## 🆘 Troubleshooting

### Build Failed
- ตรวจสอบ logs ใน EAS dashboard
- ลอง build ใหม่ด้วย `--clear-cache`
- ตรวจสอบ certificates ยังไม่หมดอายุ

### Rejected from Store
- อ่านเหตุผลอย่างละเอียด
- แก้ไขตามคำแนะนำ
- ส่งรีวิวใหม่

### Performance Issues
- ใช้ React.memo
- ลดขนาด bundle
- Optimize images
- Lazy loading

## 📞 Support

- **EAS Documentation**: https://docs.expo.dev/eas/
- **Google Play Console**: https://support.google.com/googleplay/android-developer
- **App Store Connect**: https://developer.apple.com/app-store-connect/

---

**Good Luck with Your Launch! 🚀**
