# 📊 Analytics & Data Guide

## 🎯 คู่มือการวิเคราะห์ข้อมูลเกม

### ทำไมต้องวิเคราะห์ข้อมูล?

#### ประโยชน์ของ Analytics
1. **เข้าใจผู้เล่น** - รู้ว่าผู้เล่นทำอะไรในเกม
2. **ปรับปรุงเกม** - ใช้ข้อมูลตัดสินใจพัฒนา
3. **เพิ่มรายได้** - หาจุดที่สร้างรายได้ดีที่สุด
4. **ลดการเลิกเล่น** - หาสาเหตุและแก้ปัญหา
5. **การตลาดที่ดีขึ้น** - รู้ว่า channel ไหนดีที่สุด
6. **พยากรณ์** - คาดการณ์แนวโน้มในอนาคต

---

## 📈 Key Metrics (KPIs)

### User Acquisition Metrics

#### 1. Installs (จำนวนการติดตั้ง)
- **Total Installs** - จำนวนติดตั้งทั้งหมด
- **New Installs** - ติดตั้งใหม่ในช่วงเวลา
- **Organic Installs** - ติดตั้งจากธรรมชาติ (ไม่เสียเงิน)
- **Paid Installs** - ติดตั้งจากโฆษณา

#### 2. Cost Per Install (CPI)
```
CPI = Total Ad Spend / Total Installs
```
**เป้าหมาย:** < 50 THB สำหรับไทย

#### 3. Conversion Rate
```
Conversion Rate = (Installs / Page Views) × 100
```
**เป้าหมาย:** 20-30%

### Engagement Metrics

#### 1. Daily Active Users (DAU)
- จำนวนผู้เล่นที่ไม่ซ้ำกันในวันนั้น
- **สูตร:** นับ unique users ที่เปิดเกมในวันนั้น

#### 2. Monthly Active Users (MAU)
- จำนวนผู้เล่นที่ไม่ซ้ำกันในเดือนนั้น
- **สูตร:** นับ unique users ที่เปิดเกมในเดือนนั้น

#### 3. DAU/MAU Ratio (Stickiness)
```
Stickiness = (DAU / MAU) × 100
```
**เป้าหมาย:**
- < 10% = ต่ำ
- 10-20% = ปานกลาง
- 20-30% = ดี
- > 30% = ยอดเยี่ยม

#### 4. Sessions per DAU
- จำนวนครั้งที่เล่นเฉลี่ยต่อคนต่อวัน
- **สูตร:** Total Sessions / DAU
- **เป้าหมาย:** 3+ sessions/day

#### 5. Session Length
- ระยะเวลาเล่นเฉลี่ยต่อครั้ง
- **สูตร:** Total Time Spent / Total Sessions
- **เป้าหมาย:** 10+ นาที

#### 6. Session Interval
- เวลาระหว่าง session
- **เป้าหมาย:** < 4 ชั่วโมง

### Retention Metrics

#### 1. Day 1 Retention (D1)
- % ที่กลับมาเล่นในวันถัดไป
```
D1 Retention = (Users who return on Day 1 / New Users on Day 0) × 100
```
**เป้าหมาย:**
- < 20% = ต้องปรับปรุง
- 20-30% = ปานกลาง
- 30-40% = ดี
- > 40% = ยอดเยี่ยม

#### 2. Day 7 Retention (D7)
- % ที่กลับมาเล่นในวันที่ 7
**เป้าหมาย:** 15-25%

#### 3. Day 30 Retention (D30)
- % ที่กลับมาเล่นในวันที่ 30
**เป้าหมาย:** 5-15%

#### 4. Retention Curve
- กราฟแสดง retention แต่ละวัน
- ใช้หาจุดที่ผู้เล่นเลิกเล่น

### Monetization Metrics

#### 1. Average Revenue Per User (ARPU)
```
ARPU = Total Revenue / Total Users
```
**เป้าหมาย:** $0.05 - $0.50 per day

#### 2. Average Revenue Per Paying User (ARPPU)
```
ARPPU = Total Revenue / Total Paying Users
```
**เป้าหมาย:** $5 - $50 per month

#### 3. Conversion Rate (Paying Users)
```
Conversion Rate = (Paying Users / Total Users) × 100
```
**เป้าหมาย:**
- < 1% = ต่ำ
- 1-3% = ปานกลาง
- 3-5% = ดี
- > 5% = ยอดเยี่ยม

#### 4. Lifetime Value (LTV)
- รายได้เฉลี่ยที่ผู้เล่นหนึ่งคนสร้างตลอดอายุการเล่น
```
LTV = ARPU × Average Lifespan (days)
```
หรือ
```
LTV = ARPPU × Conversion Rate × Average Lifespan
```
**เป้าหมาย:** LTV > 3× CPI

#### 5. LTV/CAC Ratio
```
LTV/CAC = Lifetime Value / Customer Acquisition Cost
```
**เป้าหมาย:** > 3:1

### Performance Metrics

#### 1. Crash Rate
```
Crash Rate = (Crashes / Total Sessions) × 100
```
**เป้าหมาย:** < 1%

#### 2. Load Time
- เวลาโหลดเกมเฉลี่ย
**เป้าหมาย:** < 5 วินาที

#### 3. ANR Rate (Application Not Responding)
```
ANR Rate = (ANRs / Total Sessions) × 100
```
**เป้าหมาย:** < 0.5%

### Level/Gameplay Metrics

#### 1. Level Completion Rate
```
Completion Rate = (Players who completed level / Players who started level) × 100
```
**เป้าหมาย:** 60-80%

#### 2. Average Stars per Level
- คะแนนเฉลี่ยที่ได้ในแต่ละด่าน
**เป้าหมาย:** 2-2.5 stars

#### 3. Attempts per Level
- จำนวนครั้งที่พยายามผ่านด่าน
**เป้าหมาย:** 2-4 attempts

#### 4. Drop-off Points
- ด่านที่ผู้เล่นเลิกเล่นมากที่สุด
**เป้าหมาย:** ระบุและปรับปรุงด่านเหล่านั้น

#### 5. Quiz Accuracy
- % การตอบคำถามถูก
```
Accuracy = (Correct Answers / Total Answers) × 100
```
**เป้าหมาย:** 50-70% (ไม่ยากหรือง่ายเกินไป)

---

## 🔧 Analytics Tools

### 1. Firebase Analytics (แนะนำ)

#### การติดตั้ง
```bash
npm install @react-native-firebase/app
npm install @react-native-firebase/analytics
```

#### Setup
```typescript
// src/utils/analytics.ts
import analytics from '@react-native-firebase/analytics';

// Track screen view
await analytics().logScreenView({
  screen_name: 'HomeScreen',
  screen_class: 'HomeScreen',
});

// Track custom event
await analytics().logEvent('level_completed', {
  level_id: 5,
  difficulty: 'easy',
  time_taken: 120,
  stars: 3,
});

// Track user property
await analytics().setUserProperty('player_level', '10');
```

#### Events to Track
```typescript
// User Progression
- 'tutorial_start'
- 'tutorial_complete'
- 'level_start'
- 'level_complete'
- 'level_fail'
- 'boss_battle_start'
- 'boss_battle_complete'

// Quiz Performance
- 'question_answered'
- 'question_correct'
- 'question_wrong'
- 'hint_used'
- 'time_bonus_earned'

// Economy
- 'coin_earned'
- 'gem_earned'
- 'coin_spent'
- 'gem_spent'
- 'item_purchased'
- 'character_purchased'
- 'character_upgraded'
- 'daily_reward_claimed'

// Engagement
- 'session_start'
- 'session_end'
- 'feature_used'
- 'settings_changed'
- 'language_changed'

// Monetization
- 'iap_started'
- 'iap_completed'
- 'iap_failed'
- 'ad_watched'
- 'ad_skipped'
```

### 2. Mixpanel

#### การติดตั้ง
```bash
npm install mixpanel-react-native
```

#### Setup
```typescript
import Mixpanel from 'mixpanel-react-native';

const mixpanel = new Mixpanel();
await mixpanel.init('YOUR_PROJECT_TOKEN');

// Track event
mixpanel.track('Level Completed', {
  'Level': 5,
  'Difficulty': 'Easy',
  'Time': 120,
});

// Set people properties
mixpanel.people.set({
  '$name': 'Player123',
  '$email': 'player@example.com',
  'Level': 10,
  'Coins': 5000,
});
```

#### ข้อดีของ Mixpanel
- Funnel analysis
- Retention analysis
- A/B testing
- User segmentation
- Revenue tracking

### 3. Amplitude

#### การติดตั้ง
```bash
npm install amplitude-js
```

#### Setup
```typescript
import * as amplitude from 'amplitude-js';

amplitude.getInstance().init('YOUR_API_KEY');

// Track event
amplitude.getInstance().logEvent('Level Completed', {
  level_id: 5,
  difficulty: 'easy',
});

// Set user ID
amplitude.getInstance().setUserId('player_123');

// Set user properties
amplitude.getInstance().setUserProperties({
  player_level: 10,
  total_coins: 5000,
});
```

### 4. Unity Analytics (ถ้าใช้ Unity)
- Built-in Unity
- Free for small studios
- Good for game-specific metrics

### 5. App Annie / data.ai
- Market intelligence
- Competitor analysis
- Store rankings
- Revenue estimates

### 6. Custom Analytics Dashboard

#### สร้าง Dashboard เอง
```typescript
// src/utils/customAnalytics.ts
class Analytics {
  private events: AnalyticsEvent[] = [];
  
  track(event: AnalyticsEvent) {
    this.events.push(event);
    // Send to server
    this.sendToServer(event);
    // Store locally
    this.storeLocally(event);
  }
  
  getSessionData() {
    return {
      session_id: uuid(),
      start_time: Date.now(),
      user_id: this.getUserId(),
      device_info: this.getDeviceInfo(),
    };
  }
}
```

---

## 📊 Data Analysis Techniques

### 1. Cohort Analysis

#### คืออะไร?
- แบ่งผู้ใช้ตามกลุ่ม (cohort)
- ติดตามพฤติกรรมแต่ละกลุ่มตามเวลา

#### ตัวอย่าง
```
Cohort: Users who installed in Week 1
- D1 Retention: 35%
- D7 Retention: 18%
- D30 Retention: 8%

Cohort: Users who installed in Week 2
- D1 Retention: 40%
- D7 Retention: 22%
- D30 Retention: 10%

=> Improvement! Week 2 cohort is better.
```

#### การใช้งาน
- หาว่า update ไหนทำให้ retention ดีขึ้น
- เปรียบเทียบ traffic sources
- วิเคราะห์ผลของ marketing campaign

### 2. Funnel Analysis

#### คืออะไร?
- ติดตามขั้นตอนที่ผู้ใช้ทำ
- หาจุดที่ผู้ใช้หลุดออก

#### ตัวอย่าง Funnel: First Time User
```
Step 1: Install App (100%)
Step 2: Open App (90%)
Step 3: Complete Tutorial (70%)
Step 4: Play Level 1 (65%)
Step 5: Complete Level 1 (50%)
Step 6: Play Level 2 (45%)

Drop-off points:
- Tutorial: 30% drop-off => Improve tutorial
- Level 1: 15% drop-off => Level might be too hard
```

#### การใช้งาน
- หาจุดที่ผู้เล่นเลิกเล่น
- ปรับปรุง onboarding
- Optimize conversion funnels

### 3. Segmentation

#### แบ่งผู้ใช้ตาม
- **Demographics**: Age, gender, location
- **Behavior**: Play frequency, spending habits
- **Progress**: Level, achievements
- **Source**: Organic, paid, referral
- **Device**: iOS, Android, tablet

#### ตัวอย่าง Segments
```
Segment: "Whales" (Big Spenders)
- Criteria: Spent > $100
- Size: 2% of users
- Characteristics: High level, daily players
- Action: Offer VIP treatment, exclusive items

Segment: "At Risk"
- Criteria: Played daily, now inactive for 7 days
- Size: 15% of users
- Action: Send re-engagement push notification

Segment: "Tutorial Drop-offs"
- Criteria: Started tutorial, didn't complete
- Size: 30% of new users
- Action: Improve tutorial, offer skip option
```

### 4. A/B Testing

#### คืออะไร?
- ทดสอบ 2 versions (A และ B)
- ดูว่า version ไหนดีกว่า

#### ตัวอย่าง Tests
```
Test 1: Tutorial Length
- Version A: 5 steps (current)
- Version B: 3 steps (shorter)
- Metric: Tutorial completion rate
- Result: B has 20% higher completion => Implement B

Test 2: First Purchase Offer
- Version A: 50% off gems
- Version B: Bonus character + 50% off
- Metric: Conversion rate
- Result: B has 2x conversion => Implement B

Test 3: Level Difficulty
- Version A: Current difficulty
- Version B: 10% easier
- Metric: Level completion rate, D7 retention
- Result: B has better retention => Implement B
```

#### Best Practices
- Test one variable at a time
- Large enough sample size
- Run test long enough (at least 1 week)
- Statistical significance (p-value < 0.05)

### 5. Predictive Analytics

#### คืออะไร?
- ใช้ข้อมูลในอดีตพยากรณ์อนาคต
- Machine learning models

#### ตัวอย่าง Applications
```
Churn Prediction:
- Input: Play frequency, session length, spending, level
- Output: Probability of churning in next 7 days
- Action: Target high-risk users with retention campaign

LTV Prediction:
- Input: First week behavior, demographics, source
- Output: Predicted LTV
- Action: Adjust CPI based on predicted LTV

Spending Propensity:
- Input: Gameplay patterns, engagement, progression
- Output: Likelihood to purchase
- Action: Show targeted offers to high-propensity users
```

---

## 📱 Implementation Guide

### Step 1: Define Goals
```
Business Goals:
- Reach 10,000 MAU in 3 months
- Achieve 5% conversion rate
- Generate $5,000/month revenue

Product Goals:
- D1 Retention > 40%
- D7 Retention > 20%
- Average session length > 10 minutes
```

### Step 2: Define Metrics
```
For each goal, define metrics:

Goal: Increase Retention
Metrics: D1, D7, D30 retention, churn rate

Goal: Increase Revenue
Metrics: ARPU, ARPPU, conversion rate, LTV

Goal: Improve Engagement
Metrics: DAU/MAU, sessions/day, session length
```

### Step 3: Implement Tracking
```typescript
// src/analytics/tracking.ts

import analytics from '@react-native-firebase/analytics';

export const trackLevelComplete = async (
  levelId: number,
  difficulty: string,
  timeTaken: number,
  stars: number
) => {
  await analytics().logEvent('level_complete', {
    level_id: levelId,
    difficulty,
    time_taken: timeTaken,
    stars,
  });
};

export const trackPurchase = async (
  itemId: string,
  itemType: string,
  amount: number,
  currency: string
) => {
  await analytics().logEvent('purchase', {
    item_id: itemId,
    item_type: itemType,
    value: amount,
    currency,
  });
};

export const trackTutorialStep = async (
  stepNumber: number,
  completed: boolean
) => {
  await analytics().logEvent('tutorial_step', {
    step_number: stepNumber,
    completed,
  });
};
```

### Step 4: Create Dashboards

#### Google Data Studio (Free)
- Connect to Firebase
- Create custom dashboards
- Share with team
- Auto-refresh

#### Tableau / Power BI
- More advanced features
- Better visualizations
- More expensive

#### Custom Dashboard
```typescript
// Example dashboard components
const Dashboard = () => {
  return (
    <View>
      <MetricCard title="DAU" value={dau} trend={dauTrend} />
      <MetricCard title="Retention D1" value={d1Retention} />
      <MetricCard title="Revenue" value={revenue} />
      <Chart title="User Growth" data={userGrowthData} />
      <Chart title="Retention Curve" data={retentionData} />
    </View>
  );
};
```

### Step 5: Regular Review

#### Daily Checks
- DAU
- Crashes
- Revenue
- Major issues

#### Weekly Review
- Retention rates
- Level progression
- Top levels by drop-off
- Revenue breakdown
- User feedback themes

#### Monthly Review
- Overall growth
- Cohort analysis
- A/B test results
- Marketing ROI
- Feature performance

#### Quarterly Review
- Long-term trends
- Strategic decisions
- Roadmap adjustments
- Budget allocation

---

## 📊 Sample Reports

### Daily Report Template
```
Date: 2024-01-15

Key Metrics:
- DAU: 1,234 (+5% vs yesterday)
- New Users: 345
- D1 Retention: 38%
- Revenue: $456
- Crashes: 12 (0.97%)

Highlights:
- New level 21 launched, 80% completion rate
- Weekend event started, 20% increase in engagement
- No major bugs reported

Issues:
- Slight increase in crash rate on Android 11
- Investigating

Action Items:
- Monitor Android crash rate
- Prepare weekend event report
```

### Weekly Report Template
```
Week: Jan 8-14, 2024

User Metrics:
- MAU: 8,500 (+12% vs last week)
- DAU/MAU: 18%
- New Users: 2,345
- D1 Retention: 39%
- D7 Retention: 21%
- D30 Retention: 9%

Engagement:
- Sessions/DAU: 3.2
- Avg Session Length: 11 minutes
- Total Play Time: 45,000 hours

Monetization:
- Revenue: $3,200
- ARPU: $0.38
- ARPPU: $12.50
- Conversion Rate: 3.2%
- Paying Users: 256

Top Levels:
- Most Played: Level 5 (1,234 plays)
- Highest Completion: Level 1 (95%)
- Lowest Completion: Level 15 (45%) => Needs adjustment

Events:
- Weekend event: 2,000 participants
- Contest: 150 submissions

Next Week:
- Launch level 22-25
- Start A/B test on tutorial
- Valentine's event planning
```

### Monthly Report Template
```
Month: January 2024

Growth:
- Total Users: 50,000 (+25% vs last month)
- MAU: 15,000 (+30%)
- Organic Growth: 60%
- Paid Growth: 40%

Retention:
- D1: 40% (target: 40%) ✅
- D7: 22% (target: 20%) ✅
- D30: 10% (target: 10%) ✅

Revenue:
- Total: $12,500 (+40% vs last month)
- IAP: $10,000 (80%)
- Ads: $2,500 (20%)
- LTV: $25 (target: $20) ✅

Marketing:
- Total Spend: $4,000
- CPI: $2.50 (target: $3.00) ✅
- LTV/CAC: 10:1 (target: 3:1) ✅

Product Updates:
- Launched 10 new levels
- Added 2 new characters
- Improved tutorial (completion +15%)
- Fixed 50+ bugs

Key Learnings:
- Easier early levels improve retention
- Weekend events drive 30% engagement boost
- Character upgrades are most popular IAP

Next Month Goals:
- Launch Valentine's event
- Add PvP mode (beta)
- Reach 20,000 MAU
- Improve D7 retention to 25%
```

---

## 🎯 Common Problems & Solutions

### Problem 1: Low Retention
**Symptoms:**
- D1 < 30%
- D7 < 15%

**Possible Causes:**
- Tutorial too long/boring
- Early levels too hard
- Unclear game objectives
- Technical issues (crashes, bugs)

**Solutions:**
- Shorten tutorial
- Reduce early level difficulty
- Add clearer goals and rewards
- Fix technical issues
- Add early rewards

### Problem 2: Low Conversion
**Symptoms:**
- Conversion rate < 2%
- Few purchases

**Possible Causes:**
- Prices too high
- No compelling offers
- Poor timing of offers
- No payment methods

**Solutions:**
- A/B test prices
- Create starter packs
- Show offers after positive moments
- Add more payment methods
- Improve store UX

### Problem 3: High Churn
**Symptoms:**
- Players quit after level X
- Sudden drop in DAU

**Possible Causes:**
- Difficulty spike
- Boring gameplay loop
- No new content
- Better competitor

**Solutions:**
- Analyze drop-off points
- Add variety to gameplay
- Regular content updates
- Add social features
- Re-engagement campaigns

### Problem 4: Low Engagement
**Symptoms:**
- Sessions/day < 2
- Session length < 5 minutes

**Possible Causes:**
- Not enough content
- No daily rewards
- No social features
- Gameplay not engaging

**Solutions:**
- Add more levels
- Implement daily quests
- Add leaderboards, guilds
- Improve core gameplay loop
- Add events

---

## 📚 Resources

### Books
- "Lean Analytics" by Alistair Croll
- "Data-Driven" by Dan Wagner
- "Measure What Matters" by John Doerr

### Courses
- Google Analytics Academy (Free)
- Mixpanel Analytics Courses (Free)
- Coursera: Data Science Specialization

### Blogs
- Firebase Blog
- Mixpanel Blog
- Amplitude Blog
- Mobile Dev Memo

### Tools
- Google Analytics
- Firebase Analytics
- Mixpanel
- Amplitude
- App Annie / data.ai
- Tableau
- Google Data Studio

---

**Remember:**
- Data informs decisions, doesn't make them
- Quality over quantity of metrics
- Act on insights, don't just collect data
- Privacy matters - be transparent
- Test, measure, learn, iterate

**Use data to build a better game! 📊🎮**
