# 💰 Funding & Monetization Guide

## 🎯 แนวทางการสร้างรายได้จากเกม

### 1. In-App Purchases (IAP)

#### Consumable Items (ซื้อแล้วหมดไป)
- 💎 Gems (อัญมณี)
  - 50 Gems - $0.99
  - 250 Gems - $4.99
  - 550 Gems - $9.99
  - 1,200 Gems - $19.99
  - 2,500 Gems - $39.99

- 🪙 Coin Packs
  - 1,000 Coins - $0.99
  - 5,500 Coins - $4.99
  - 12,000 Coins - $9.99
  - 30,000 Coins - $19.99

- ⚡ Energy Refills
  - Full Energy - $0.99
  - +50 Energy - $0.49

#### Non-Consumable Items (ซื้อครั้งเดียว)
- 🚫 Remove Ads - $2.99
- 🎁 Starter Pack - $4.99 (once per account)
- 👑 VIP Status - $9.99 (permanent benefits)
- 🎨 Exclusive Character Skin - $2.99 each

#### Subscriptions (สมาชิกรายเดือน)
- 🥉 Bronze Membership - $4.99/month
  - Daily 50 gems
  - 10% bonus coins
  - No ads

- 🥈 Silver Membership - $9.99/month
  - Daily 100 gems
  - 20% bonus coins
  - No ads
  - Exclusive character

- 🥇 Gold Membership - $19.99/month
  - Daily 250 gems
  - 50% bonus coins
  - No ads
  - Exclusive character + skin
  - Priority support

### 2. Advertising (โฆษณา)

#### Ad Formats
- **Rewarded Video** (ผู้ใช้เลือกดูเพื่อรับรางวัล)
  - ดูวิดีโอ 30 วินาที ได้ 50 gems
  - ดูวิดีโอ ได้ extra life
  - ดูวิดีโอ ได้ hint ในข้อสอบ
  - Revenue: $10-20 per 1,000 views

- **Interstitial Ads** (โฆษณาเต็มหน้าจอ)
  - แสดงระหว่างด่าน
  - แสดงหลังจบเกม
  - Revenue: $5-10 per 1,000 impressions

- **Banner Ads** (โฆษณาแถบด้านล่าง)
  - แสดงตลอดเวลา
  - Revenue: $0.50-2 per 1,000 impressions

- **Native Ads** (โฆษณาที่กลมกลืนกับเกม)
  - Sponsored characters
  - Branded quiz questions
  - Revenue: Negotiated

#### Ad Networks
```bash
npm install expo-ads-admob
npm install react-native-fbads
```

**Recommended Setup:**
- Google AdMob (หลัก)
- Facebook Audience Network (สำรอง)
- Unity Ads (สำหรับ rewarded video)

#### Best Practices
- ✅ อย่าให้โฆษณารบกวน gameplay มากเกินไป
- ✅ เน้น rewarded video (ผู้ใช้ชอบ)
- ✅ ให้ option ซื้อเพื่อลบโฆษณา
- ✅ แสดงโฆษณาเฉพาะจุดที่เหมาะสม
- ❌ อย่าแสดงโฆษณาบ่อยเกินไป
- ❌ อย่าบังคับดูโฆษณา

### 3. Hybrid Model (แนะนำ)

**Free-to-Play + IAP + Ads**

#### สำหรับผู้ใช้ทั่วไป (Free)
- เล่นฟรีทุกด่าน
- ดูโฆษณาเพื่อรับรางวัลเพิ่ม
- ซื้อไอเทมได้ตามต้องการ

#### สำหรับผู้ใช้ที่จ่าย (Paying)
- ลบโฆษณา
- ซื้อ gems/coins
- Subscribe เพื่อสิทธิพิเศษ

**Expected Revenue Split:**
- 70% จาก IAP
- 20% จาก Subscriptions
- 10% จาก Ads

## 📊 Revenue Projections

### Scenario 1: Conservative (อนุรักษ์นิยม)
- Downloads เดือน 1: 1,000
- DAU (Daily Active Users): 200
- Conversion Rate (IAP): 2%
- ARPPU (Average Revenue Per Paying User): $5
- Ad Revenue per DAU: $0.05

**รายได้ต่อเดือน:**
- IAP: 200 users × 2% × $5 = $20
- Ads: 200 users × $0.05 × 30 days = $300
- **รวม: $320/month** (~11,000 บาท)

### Scenario 2: Moderate (ปานกลาง)
- Downloads เดือน 1: 5,000
- DAU: 1,000
- Conversion Rate: 3%
- ARPPU: $10
- Ad Revenue per DAU: $0.08

**รายได้ต่อเดือน:**
- IAP: 1,000 × 3% × $10 = $300
- Ads: 1,000 × $0.08 × 30 = $2,400
- Subscriptions: 50 users × $9.99 = $500
- **รวม: $3,200/month** (~110,000 บาท)

### Scenario 3: Optimistic ( lạc quan)
- Downloads เดือน 1: 20,000
- DAU: 5,000
- Conversion Rate: 5%
- ARPPU: $15
- Ad Revenue per DAU: $0.10

**รายได้ต่อเดือน:**
- IAP: 5,000 × 5% × $15 = $3,750
- Ads: 5,000 × $0.10 × 30 = $15,000
- Subscriptions: 300 users × $9.99 = $3,000
- **รวม: $21,750/month** (~750,000 บาท)

## 💼 Funding Options

### 1. Bootstrapping (ทุนตัวเอง)
**ข้อดี:**
- ไม่ต้องแบ่ง equity
- ตัดสินใจได้เอง
- ไม่ต้องรายงานนักลงทุน

**ข้อเสีย:**
- ทุนจำกัด
- ความเสี่ยงสูง
- เติบโตช้า

**เหมาะสำหรับ:**
- โปรเจกต์เล็ก
- ทีมเล็ก (1-3 คน)
- มีเงินสำรอง

### 2. Friends & Family (เพื่อนและครอบครัว)
**จำนวน:** 50,000 - 500,000 บาท

**ข้อดี:**
- ได้เงินเร็ว
- ดอกเบี้ยต่ำหรือไม่มี
- ยืดหยุ่น

**ข้อเสีย:**
- อาจเสียความสัมพันธ์
- ไม่มีความเชี่ยวชาญ
- ทุนจำกัด

### 3. Angel Investors (นักลงทุนเทวดา)
**จำนวน:** 500,000 - 5,000,000 บาท

**ข้อดี:**
- ได้เงินและคำแนะนำ
- Connection
- ยืดหยุ่นกว่า VC

**ข้อเสีย:**
- ต้องแบ่ง equity (10-20%)
- ต้องรายงานผล
- อาจมีความเห็นไม่ตรงกัน

**หาได้จาก:**
- Angel investment networks
- Startup events
- LinkedIn
- Referrals

### 4. Venture Capital (VC)
**จำนวน:** 5,000,000 - 50,000,000+ บาท

**ข้อดี:**
- เงินเยอะ
- ความเชี่ยวชาญสูง
- Connection กว้าง

**ข้อเสีย:**
- ต้องแบ่ง equity มาก (20-40%)
- ความกดดันสูง
- ต้องโตเร็ว
- ต้อง exit ใน 5-7 ปี

**VC ในไทยที่สนใจเกม:**
- 500 TukTuks
- Golden Gate Ventures
- Jungle Ventures
- East Ventures

### 5. Government Grants (เงินสนับสนุนรัฐบาล)
**จำนวน:** 100,000 - 2,000,000 บาท

**แหล่งทุน:**
- **DEPA** (Digital Economy Promotion Agency)
  - สนับสนุน startup ด้านดิจิทัล
  - ไม่ต้องคืนเงิน
  - ต้อง match fund

- **NESDB** (สำนักงานสภาพัฒนาการเศรษฐกิจและสังคมแห่งชาติ)
  - สนับสนุนนวัตกรรม
  - ต้องมี impact ต่อสังคม

- **NSTDA** (สำนักงานพัฒนาวิทยาศาสตร์และเทคโนโลยีแห่งชาติ)
  - สนับสนุน tech startup
  - มี incubator

**ข้อดี:**
- ไม่ต้องแบ่ง equity
- ได้ credibility
- มี network

**ข้อเสีย:**
- ใช้เวลานาน
- เอกสารเยอะ
- ต้องรายงานผล

### 6. Crowdfunding (ระดมทุนจากมวลชน)

#### Reward-based (ให้รางวัล)
- **Kickstarter**
- **Indiegogo**
- **Taefund** (ไทย)

**ตัวอย่าง:**
- ตั้งเป้า: 500,000 บาท
- Rewards:
  - 500 บาท: Early access + exclusive character
  - 1,000 บาท: Above + name in credits
  - 5,000 บาท: Above + 1-on-1 with developers
  - 10,000 บาท: Above + profit sharing 1%

#### Equity-based (ให้หุ้น)
- **Seedrs**
- **Crowdcube**
- **Ascend Money** (ไทย)

**ข้อดี:**
- ได้เงินและ validation
- Marketing ฟรี
- ได้ early adopters

**ข้อเสีย:**
- ต้องทำ campaign ดี
- ใช้เวลา
- ถ้าไม่ครบเป้าไม่ได้เงิน

### 7. Publisher (ผู้จัดจำหน่าย)
**ตัวอย่าง:**
- Voodoo
- Ketchapp
- SayGames
- Lion Studios

**ข้อดี:**
- ได้เงินล่วงหน้า (advance)
- ได้ marketing support
- ได้ distribution
- ไม่ต้องกังวลเรื่อง ASO

**ข้อเสีย:**
- ต้องแบ่ง revenue (50-70% ให้ publisher)
- เสีย creative control
- อาจได้ IP กลับคืนยาก

**Deal Structure:**
- Advance: $10,000 - $100,000
- Revenue Share: 30-50% ให้ developer
- Marketing Budget: Publisher จ่าย
- Term: 2-5 ปี

## 📝 Pitch Deck Structure

### 1. Problem (ปัญหา)
- นักเรียนเตรียมสอบราชการเบื่อการอ่านหนังสือ
- วิธีเรียนเดิมๆ น่าเบื่อ
- ขแรงจูงใจในการเรียน

### 2. Solution (วิธีแก้)
- เกม RPG ควิซที่ทำให้เรียนสนุก
- เรียนรู้ผ่าน gameplay
- มีแรงจูงใจจาก progression system

### 3. Market Size (ขนาดตลาด)
- **TAM** (Total Addressable Market):
  - คนเตรียมสอบราชการในไทย: 500,000 คน/ปี
  - ตลาดเกมมือถือไทย: 2,000 ล้านบาท/ปี

- **SAM** (Serviceable Available Market):
  - คนเตรียมสอบที่ใช้สมาร์ทโฟน: 300,000 คน
  - ยินดีจ่ายเงิน: 50,000 คน

- **SOM** (Serviceable Obtainable Market):
  - ปี 1: 5,000 users (10%)
  - ปี 2: 25,000 users
  - ปี 3: 100,000 users

### 4. Product (ผลิตภัณฑ์)
- แสดง screenshots
- แสดง gameplay video
- Highlight features
- Roadmap

### 5. Business Model (โมเดลธุรกิจ)
- Free-to-play
- IAP + Ads + Subscriptions
- LTV (Lifetime Value): $10-50
- CAC (Customer Acquisition Cost): $1-5

### 6. Traction (ผลลัพธ์)
- ถ้ามีแล้ว:
  - Downloads
  - DAU/MAU
  - Revenue
  - Retention rate

- ถ้ายังไม่มี:
  - Survey results
  - Waitlist signups
  - Letters of intent

### 7. Competition (คู่แข่ง)
- **Direct**: เกมควิซอื่นๆ
- **Indirect**: หนังสือเรียน, คอร์สเรียนออนไลน์
- **Competitive Advantage**:
  - เกมแรกในไทยที่ผสม RPG + ควิซเตรียมสอบ
  - เนื้อหาตรงกับสอบจริง
  - ทีมมีประสบการณ์ทั้งเกมและการศึกษา

### 8. Team (ทีม)
- Founder 1: Ex-game developer (5 years)
- Founder 2: Ex-teacher, education expert
- Founder 3: Marketing specialist
- Advisors: Industry experts

### 9. Financial Projections (ประมาณการการเงิน)
- Year 1: Revenue 2M, Expense 1.5M, Profit 0.5M
- Year 2: Revenue 10M, Expense 5M, Profit 5M
- Year 3: Revenue 50M, Expense 20M, Profit 30M

### 10. Ask (สิ่งที่ต้องการ)
- ต้องการ: 2,000,000 บาท
- แลกกับ: 10% equity
- Valuation: 20M pre-money
- Use of funds:
  - 40% Development (ทีม dev)
  - 30% Marketing
  - 20% Content creation
  - 10% Operations

## 💰 Valuation Methods

### 1. Scorecard Method
- Average valuation of similar startups: 15M บาท
- Adjustment factors:
  - Team: +20% (มีประสบการณ์)
  - Product: +10% (มี prototype)
  - Market: +15% (ตลาดโต)
  - Competition: -10% (มีคู่แข่ง)
- **Valuation: 15M × 1.35 = 20.25M บาท**

### 2. Berkus Method
- Sound idea: +2M
- Prototype: +2M
- Team: +2M
- Strategic relationships: +1M
- Revenue: +0M (ยังไม่มี)
- **Valuation: 7M บาท**

### 3. Risk Factor Summation
- Base valuation: 10M
- Adjust for 14 risks (±2M each)
- **Valuation: 8-15M บาท**

## 📊 Key Metrics for Investors

### User Metrics
- **DAU/MAU Ratio**: 20%+ (ดี)
- **Retention D1**: 40%+ (ดี)
- **Retention D7**: 20%+ (ดี)
- **Retention D30**: 10%+ (ดี)
- **Session Length**: 10+ นาที
- **Sessions per Day**: 3+

### Revenue Metrics
- **Conversion Rate**: 2-5%
- **ARPPU**: $10-50
- **ARPU**: $0.50-5
- **LTV**: $10-100
- **LTV/CAC Ratio**: 3:1+ (ดี)

### Growth Metrics
- **MoM Growth**: 20%+ (ดี)
- **Viral Coefficient**: 1+ (viral)
- **Organic Installs**: 50%+

## 🎯 Exit Strategies

### 1. Acquisition (ถูกซื้อ)
**Potential Acquirers:**
- Game publishers (Voodoo, Ketchapp)
- Education companies (Ruangguru, Byju's)
- Thai companies (Sanook, Mthai)

**Exit Multiple:** 3-10x revenue
**Timeline:** 3-5 ปี

### 2. IPO (เข้าตลาดหุ้น)
**Requirements:**
- Revenue 100M+ บาท/ปี
- Profit positive
- Growth 50%+ YoY

**Timeline:** 5-7 ปี

### 3. Merger (รวมกิจการ)
- รวมกับบริษัทเกมหรือการศึกษา
- แลกหุ้น
**Timeline:** 3-5 ปี

### 4. Management Buyout (ทีมซื้อคืน)
- ทีมซื้อหุ้นคืนจากนักลงทุน
- ใช้ profit ซื้อคืน
**Timeline:** 5-10 ปี

## 📞 Investor Outreach

### Warm Introductions (แนะนำผ่านคนรู้จัก)
- หาจาก LinkedIn
- ถาม advisors
- ถามเพื่อนร่วมวงการ

### Cold Outreach (ติดต่อตรง)
**Email Template:**
```
Subject: [Game Name] - Pre-seed Investment Opportunity

Hi [Investor Name],

I'm [Your Name], founder of [Company]. We're building 
a mobile game that helps students prepare for government 
exams through gamification.

Traction:
- [X] users in beta
- [X]% retention
- [X] revenue (if any)

We're raising [X]M THB to [use of funds].

Would you be open to a 15-min call next week?

Best,
[Your Name]
```

### Events & Competitions
- Techsauce Global Summit
- Startup Thailand
- Echelon (Singapore)
- Slingshot (Singapore)
- Demo Day (accelerators)

## 📚 Resources

### Books
- "Venture Deals" by Brad Feld
- "The Lean Startup" by Eric Ries
- "Zero to One" by Peter Thiel
- "Rework" by Jason Fried

### Websites
- Crunchbase (หา investors)
- AngelList (หา investors และ jobs)
- PitchBook (data และ analytics)

### Tools
- Canva (ทำ pitch deck)
- DocSend (share pitch deck)
- Carta (manage equity)

---

**Remember:**
- Funding is a means, not an end
- Build something people want
- Revenue > Funding
- Choose investors wisely (they're your partners)

**Good Luck! 💰🚀**
