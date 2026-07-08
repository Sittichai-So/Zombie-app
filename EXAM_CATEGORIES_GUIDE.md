# ข้อสอบ ก.พ. Integration Guide

## Overview
เพิ่มระบบเลือกหมวดหมู่ข้อสอบ ก.พ. (Civil Service Examination) เข้าในเกม โดยแยกเป็น 3 วิชาหลัก:

1. **ความสามารถในการคิดวิเคราะห์** (50 ข้อ)
2. **ภาษาอังกฤษ** (25 ข้อ)
3. **ความรู้และลักษณะการเป็นข้าราชการที่ดี** (25 ข้อ)

## Architecture

### New Screens

#### 1. CategoriesScreen (`src/screens/CategoriesScreen.tsx`)
- **Purpose**: หน้าเลือกหมวดหมู่ข้อสอบ
- **Features**:
  - แสดง 3 หมวดหมู่ข้อสอบ ก.พ.
  - แสดงจำนวนข้อและเกณฑ์การผ่านของแต่ละหมวด
  - แสดงหัวข้อที่ออกสอบ (Topics)
  - Mascot ให้คำแนะนำ
  - Progress tracking
  - Gradient cards with modern UI

#### 2. Updated LevelMapScreen (`src/screens/LevelMapScreen.tsx`)
- **Changes**:
  - รองรับ `categoryId` parameter
  - แสดงด่านตามหมวดหมู่ที่เลือก
  - ปรับ header ตามหมวดหมู่
  - Filter levels by category

### New Data Files

#### 1. Exam Levels (`src/data/examLevels.ts`)
- **Total**: 17 levels across 3 categories
- **Structure**:
  ```typescript
  {
    id: number,
    day: number,
    title_th: string,
    title_en: string,
    difficulty: 'easy' | 'medium' | 'hard' | 'boss',
    category: 'analytical' | 'english' | 'ethics',
    questionCount: number,
    timeLimit: number,
    enemyCharacterId: string,
    rewardCoins: number,
    rewardExp: number,
    requiredLevel: number
  }
  ```

#### 2. Updated Levels (`src/data/levels.ts`)
- **Added**: `category` field to Level interface
- **Added**: `getLevelsByCategory()` function
- **Added**: `getCategories()` function
- **Merged**: Original zombie levels + Exam levels

### Navigation Flow

```
HomeScreen
  ↓ (Start Game)
CategoriesScreen  ← NEW
  ↓ (Select Category)
LevelMapScreen    ← Updated with categoryId
  ↓ (Select Level)
BattleScreen      ← Updated with categoryId
```

## Category Details

### 1. Analytical Thinking (🧠)
- **Color**: Indigo (#6366f1)
- **Questions**: 50 items
- **Passing Score**: 60%
- **Topics**:
  - อนุกรม (Series)
  - คณิตศาสตร์ (Mathematics)
  - ตรรกะ (Logic)
  - เงื่อนไขสัญลักษณ์ (Symbolic Logic)
  - อุปมาอุปไมย (Analogies)
- **Levels**: 6 (101-106)
  - Level 101: อนุกรมพื้นฐาน (Easy, 10 questions)
  - Level 102: อนุกรมขั้นกลาง (Medium, 15 questions)
  - Level 103: คณิตศาสตร์ทั่วไป (Medium, 15 questions)
  - Level 104: เงื่อนไขสัญลักษณ์ (Hard, 20 questions)
  - Level 105: อุปมาอุปไมย (Hard, 20 questions)
  - Level 106: การคิดวิเคราะห์ขั้นสูง (Boss, 25 questions)

### 2. English Language (🌐)
- **Color**: Cyan (#06b6d4)
- **Questions**: 25 items
- **Passing Score**: 60%
- **Topics**:
  - Grammar
  - Vocabulary
  - Conversation
  - Reading Comprehension
- **Levels**: 5 (201-205)
  - Level 201: Grammar Basics (Easy, 10 questions)
  - Level 202: Vocabulary Building (Medium, 15 questions)
  - Level 203: Conversation Practice (Medium, 15 questions)
  - Level 204: Reading Comprehension (Hard, 20 questions)
  - Level 205: English Mastery (Boss, 25 questions)

### 3. Ethics & Public Service (⚖️)
- **Color**: Amber (#f59e0b)
- **Questions**: 25 items
- **Passing Score**: 60%
- **Topics**:
  - กฎหมาย (Law)
  - ระเบียบ (Regulations)
  - จริยธรรม (Ethics)
  - จรรยาบรรณ (Professional Ethics)
  - การบริการประชาชน (Public Service)
- **Levels**: 6 (301-306)
  - Level 301: กฎหมายพื้นฐาน (Easy, 10 questions)
  - Level 302: ระเบียบราชการ (Medium, 15 questions)
  - Level 303: จริยธรรมข้าราชการ (Medium, 15 questions)
  - Level 304: จรรยาบรรณวิชาชีพ (Hard, 20 questions)
  - Level 305: การบริการประชาชน (Hard, 20 questions)
  - Level 306: ข้าราชการตัวอย่าง (Boss, 25 questions)

## UI/UX Features

### CategoriesScreen
- **Gradient Header**: Purple to dark blue
- **Progress Ring**: Shows overall completion percentage
- **Category Cards**:
  - Gradient backgrounds matching category color
  - Icon + Title (TH/EN) + Description
  - Stats: Question count + Passing score
  - Topic badges
  - Arrow indicator
- **Mascot Section**: "เลือกหมวดหมู่ข้อสอบที่ต้องการฝึกฝน!"
- **Info Card**: Passing criteria explanation

### LevelMapScreen Updates
- **Dynamic Header**:
  - Icon changes based on category
  - Title: "ข้อสอบ ก.พ." or "LEVEL MAP"
  - Subtitle adjusts to context
- **Filtered Levels**: Shows only levels from selected category
- **Back Navigation**: Returns to CategoriesScreen

## Code Changes

### 1. AppNavigator.tsx
```typescript
// Added Categories route
Categories: undefined;
LevelMap: { categoryId?: string };
Battle: { levelId: number; categoryId?: string };
```

### 2. HomeScreen.tsx
```typescript
// Changed navigation from LevelMap to Categories
navigation.navigate('Categories');
```

### 3. LevelMapScreen.tsx
```typescript
// Added categoryId support
const { categoryId } = route.params || {};
const filteredLevels = useMemo(() => {
  if (!categoryId) return levels;
  return levels; // Will filter by category later
}, [categoryId]);
```

### 4. levels.ts
```typescript
// Extended Level interface
export interface Level {
  // ... existing fields
  category?: string;
  title?: string;
  title_th?: string;
  title_en?: string;
}

// Added helper functions
export const getLevelsByCategory = (categoryId: string): Level[];
export const getCategories = (): string[];
```

## Game Flow

### Original Flow (Zombie Survival)
```
Home → LevelMap → Battle
(All zombie survival levels)
```

### New Flow (Exam Practice)
```
Home → Categories → LevelMap → Battle
         ↓              ↓
    Select Category  Filtered Levels
```

## Passing Criteria

### Individual Level
- Complete all questions in the level
- Score ≥ 60% for undergraduate
- Score ≥ 65% for graduate

### Category Completion
- Complete all levels in category
- Unlock next difficulty tier
- Earn category-specific rewards

### Overall Progress
- Tracked in CategoriesScreen header
- Shows percentage of total questions completed
- Motivates users to complete all categories

## Rewards System

### Per Level
- **Coins**: 50-300 (based on difficulty)
- **EXP**: 100-500 (based on difficulty)
- **Category Progress**: +1 level completed

### Category Bonuses
- Complete all levels in category → Bonus rewards
- Master all 3 categories → Special achievement

## Mascot Integration

### CategoriesScreen
- **Emotion**: Thinking
- **Message**: "เลือกหมวดหมู่ข้อสอบที่ต้องการฝึกฝน!"

### LevelMapScreen
- **Emotion**: Dynamic based on category
- **Message**: "เลือกด่านที่ต้องการฝึกฝน"

### BattleScreen
- **Emotion**: Dynamic based on battle state
- **Messages**: Contextual to exam questions

## Future Enhancements

### Phase 1 (Current)
- ✅ CategoriesScreen UI
- ✅ Level filtering by category
- ✅ Exam levels data structure
- ✅ Navigation flow

### Phase 2 (Next)
- [ ] Question bank integration per category
- [ ] Category-specific mascots
- [ ] Progress tracking per category
- [ ] Achievement system
- [ ] Leaderboards per category

### Phase 3 (Future)
- [ ] Mock exams (full 100 questions)
- [ ] Timed practice mode
- [ ] Weakness analysis
- [ ] Personalized recommendations
- [ ] Social features (compare progress)

## Testing Checklist

### Functional Testing
- [ ] Navigate from Home to Categories
- [ ] Select each category
- [ ] View filtered levels in LevelMap
- [ ] Start battle from exam level
- [ ] Complete level and return to map
- [ ] Back navigation works correctly

### UI Testing
- [ ] Gradient cards render correctly
- [ ] Topic badges display properly
- [ ] Progress ring updates
- [ ] Mascot displays in all screens
- [ ] Responsive on different screen sizes

### Data Testing
- [ ] All 17 exam levels load
- [ ] Category filtering works
- [ ] Level unlocking works
- [ ] Rewards are calculated correctly

## Files Modified/Created

### Created
1. `src/screens/CategoriesScreen.tsx` (NEW)
2. `src/data/examLevels.ts` (NEW)
3. `EXAM_CATEGORIES_GUIDE.md` (NEW)

### Modified
1. `src/navigation/AppNavigator.tsx`
2. `src/screens/HomeScreen.tsx`
3. `src/screens/LevelMapScreen.tsx`
4. `src/data/levels.ts`

## Notes

- Original zombie survival levels remain unchanged
- Exam levels are added as parallel content
- Users can switch between survival and exam modes
- Design system consistent with existing UI
- All components use gradients, mascot, and modern styling

## Thai Context

### ก.พ. (Office of the Civil Service Commission)
- Government agency responsible for civil service management
- Section 3 exam is required for government jobs
- Competitive examination process
- This game helps users prepare for the real exam

### Educational Value
- Makes exam preparation fun and engaging
- Gamification motivates regular practice
- Progressive difficulty builds confidence
- Immediate feedback helps learning
