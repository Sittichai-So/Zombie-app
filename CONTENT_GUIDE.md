# 📝 Content Creation Guide

## 🎯 คู่มือการสร้างเนื้อหาเกม Zombie Quiz RPG

### ประเภทของเนื้อหาในเกม

#### 1. Quiz Questions (ข้อสอบ)
- ความรู้ทั่วไป
- ภาษาไทย
- คณิตศาสตร์
- วิทยาศาสตร์
- สังคมศึกษา
- ภาษาอังกฤษ

#### 2. Characters (ตัวละคร)
- ตัวละครผู้เล่น
- ตัวละครศัตรู
- บอสแต่ละด่าน

#### 3. Levels (ด่าน)
- ด่านปกติ
- ด่านบอส
- Event levels

#### 4. Story & Lore (เรื่องราว)
- Background story
- Character backstories
- Level narratives
- Dialogues

#### 5. UI Text (ข้อความอินเทอร์เฟซ)
- Button labels
- Menu items
- Notifications
- Tutorial text

---

## 📚 Quiz Question Creation

### Question Structure

```typescript
interface QuizQuestion {
  id: string;
  category: 'generalKnowledge' | 'thaiLanguage' | 'mathematics' | 
            'science' | 'socialStudies' | 'english';
  difficulty: 'easy' | 'medium' | 'hard';
  
  // Thai version
  questionTH: string;
  optionsTH: string[];
  correctAnswerTH: number;
  explanationTH: string;
  
  // English version
  questionEN: string;
  optionsEN: string[];
  correctAnswerEN: number;
  explanationEN: string;
}
```

### Question Writing Guidelines

#### 1. Question Stem (โจทย์)
**Do:**
- Clear and concise
- One correct answer
- Relevant to exam syllabus
- Age-appropriate language
- Culturally appropriate

**Don't:**
- Ambiguous or vague
- Multiple correct answers
- Too easy or too hard
- Offensive content
- Outdated information

**ตัวอย่างที่ดี:**
```
❓ "นายกรัฐมนตรีคนแรกของประเทศไทยคือใคร?"
✅ ก. พระยามโนปกรณ์นิติธาดา
❌ ข. จอมพล ป. พิบูลสงคราม
❌ ค. นายปรีดี พนมยงค์
❌ ง. จอมพลแปลก พิบูลสงคราม
```

**ตัวอย่างที่ไม่ดี:**
```
❓ "ใครเป็นนายกฯ?" (คลุมเครือเกินไป)
❓ "ข้อใดถูกที่สุด?" (มีหลายข้อที่ถูก)
```

#### 2. Options (ตัวเลือก)
**Best Practices:**
- 4 options (A, B, C, D)
- Similar length
- Plausible distractors
- Random correct answer position
- No patterns (e.g., C is always correct)

**ตัวอย่าง:**
```
Good:
ก. 2475 (สั้นเท่ากัน, น่าเชื่อถือ)
ข. 2480
ค. 2478
ง. 2482

Bad:
ก. 2475 (สั้นมาก)
ข. ปี พ.ศ. 2480 ที่มีการเปลี่ยนแปลงการปกครอง (ยาวมาก)
ค. 2478
ง. 2482
```

#### 3. Explanation (คำอธิบาย)
**Should Include:**
- Why the answer is correct
- Why other options are wrong
- Additional context
- Reference source (if applicable)

**ตัวอย่าง:**
```
✅ คำตอบที่ถูกต้องคือ ก. พระยามโนปกรณ์นิติธาดา

พระยามโนปกรณ์นิติธาดาเป็นนายกรัฐมนตรีคนแรกของประเทศไทย 
ดำรงตำแหน่งเมื่อปี พ.ศ. 2475 หลังการเปลี่ยนแปลงการปกครอง

ตัวเลือกอื่นผิดเพราะ:
- ข. จอมพล ป. พิบูลสงคราม เป็นนายกรัฐมนตรีคนที่ 3
- ค. นายปรีดี พนมยงค์ เป็นนายกรัฐมนตรีคนที่ 4
- ง. จอมพลแปลก พิบูลสงคราม เป็นชื่อเดิมของ จอมพล ป.
```

### Question Categories

#### 1. ความรู้ทั่วไป (General Knowledge)

**Topics:**
- ประวัติศาสตร์ไทย
- ภูมิศาสตร์
- วัฒนธรรมไทย
- เหตุการณ์ปัจจุบัน
- องค์กรระหว่างประเทศ

**ตัวอย่างข้อสอบ:**
```
1. ประเทศไทยมีพื้นที่กี่ตารางกิโลเมตร?
   ก. 513,120 ตร.กม.
   ข. 514,120 ตร.กม.
   ค. 515,120 ตร.กม.
   ง. 516,120 ตร.กม.
   
   คำตอบ: ก. 513,120 ตร.กม.

2. ASEAN ก่อตั้งขึ้นในปีใด?
   ก. 2508
   ข. 2510
   ค. 2512
   ง. 2514
   
   คำตอบ: ข. 2510
```

#### 2. ภาษาไทย (Thai Language)

**Topics:**
- ไวยากรณ์ไทย
- คำศัพท์
- สำนวน สุภาษิต
- การอ่านจับใจความ
- การเขียน

**ตัวอย่างข้อสอบ:**
```
1. ข้อใดใช้คำผิด?
   ก. เขาทำอาหารอร่อยมาก
   ข. เธอเรียนหนังสือขยัน
   ค. เด็กๆ เล่นกันอย่างสนุกสนาน
   ง. พ่อแม่รักลูกมาก
   
   คำตอบ: ข. (ควรเป็น "เธอขยันเรียนหนังสือ")

2. "สีซอให้ควายฟัง" หมายถึงอะไร?
   ก. สอนคนโง่
   ข. เล่นดนตรีให้สัตว์ฟัง
   ค. ทำสิ่งไร้ประโยชน์
   ง. รักสัตว์
   
   คำตอบ: ค. ทำสิ่งไร้ประโยชน์
```

#### 3. คณิตศาสตร์ (Mathematics)

**Topics:**
- เลขาคณิต
- พีชคณิต
- สถิติ
- ความน่าจะเป็น
- โจทย์ปัญหา

**ตัวอย่างข้อสอบ:**
```
1. ถ้า x + 5 = 12 แล้ว x มีค่าเท่าใด?
   ก. 5
   ข. 6
   ค. 7
   ง. 8
   
   คำตอบ: ค. 7

2. พื้นที่ของวงกลมที่มีรัศมี 7 ซม. เท่ากับเท่าใด?
   (กำหนด π = 22/7)
   ก. 144 ตร.ซม.
   ข. 154 ตร.ซม.
   ค. 164 ตร.ซม.
   ง. 174 ตร.ซม.
   
   คำตอบ: ข. 154 ตร.ซม.
   (พื้นที่ = πr² = 22/7 × 7² = 154)
```

#### 4. วิทยาศาสตร์ (Science)

**Topics:**
- ฟิสิกส์
- เคมี
- ชีววิทยา
- โลกศาสตร์
- เทคโนโลยี

**ตัวอย่างข้อสอบ:**
```
1. ธาตุใดมีสัญลักษณ์เคมีเป็น "O"?
   ก. ทองคำ
   ข. ออกซิเจน
   ค. ออสเมียม
   ง. โอสเมียม
   
   คำตอบ: ข. ออกซิเจน

2. แรงโน้มถ่วงของโลกมีค่าประมาณเท่าใด?
   ก. 8.9 m/s²
   ข. 9.8 m/s²
   ค. 10.8 m/s²
   ง. 11.8 m/s²
   
   คำตอบ: ข. 9.8 m/s²
```

#### 5. สังคมศึกษา (Social Studies)

**Topics:**
- ศาสนาและศีลธรรม
- หน้าที่พลเมือง
- เศรษฐศาสตร์
- ประวัติศาสตร์
- ภูมิศาสตร์

**ตัวอย่างข้อสอบ:**
```
1. พระพุทธศาสนาเผยแพร่เข้าสู่ประเทศไทยครั้งแรกในสมัยใด?
   ก. สมัยสุโขทัย
   ข. สมัยอยุธยา
   ค. สมัยทวารวดี
   ง. สมัยลพบุรี
   
   คำตอบ: ค. สมัยทวารวดี

2. กฎหมายสูงสุดของประเทศคืออะไร?
   ก. พระราชบัญญัติ
   ข. รัฐธรรมนูญ
   ค. พระราชกำหนด
   ง. กฎกระทรวง
   
   คำตอบ: ข. รัฐธรรมนูญ
```

#### 6. ภาษาอังกฤษ (English)

**Topics:**
- Grammar
- Vocabulary
- Reading comprehension
- Conversation
- Writing

**ตัวอย่างข้อสอบ:**
```
1. Choose the correct sentence:
   a) She don't like apples.
   b) She doesn't like apples.
   c) She not like apples.
   d) She no like apples.
   
   Answer: b) She doesn't like apples.

2. What is the synonym of "happy"?
   a) Sad
   b) Angry
   c) Joyful
   d) Tired
   
   Answer: c) Joyful
```

### Difficulty Levels

#### Easy (ง่าย)
- Basic knowledge
- Direct questions
- Common facts
- 1-step calculation

**Characteristics:**
- 80%+ should answer correctly
- Recall-based
- No tricks

#### Medium (ปานกลาง)
- Application of knowledge
- Some analysis required
- 2-3 step calculations
- Less common facts

**Characteristics:**
- 50-80% should answer correctly
- Understanding-based
- Some distractors

#### Hard (ยาก)
- Complex analysis
- Multiple concepts
- Multi-step calculations
- Rare or detailed knowledge

**Characteristics:**
- 20-50% should answer correctly
- Critical thinking required
- Tricky distractors

### Question Quality Checklist

Before adding a question, check:
- [ ] Question is clear and unambiguous
- [ ] Only one correct answer
- [ ] All options are plausible
- [ ] Correct answer is verified
- [ ] Explanation is accurate
- [ ] Difficulty level is appropriate
- [ ] Language is correct (TH & EN)
- [ ] No cultural sensitivity issues
- [ ] Aligned with exam syllabus
- [ ] Not outdated

---

## 🎨 Character Creation

### Character Profile Template

```typescript
interface Character {
  // Basic Info
  id: string;
  nameTH: string;
  nameEN: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  faction: 'zombie' | 'human';
  
  // Stats
  baseStats: {
    attack: number;
    defense: number;
    speed: number;
    health: number;
  };
  growthRate: number; // 1.1 = 10% per level
  
  // Skills
  skills: Skill[];
  
  // Visual
  emoji: string; // Placeholder
  spritePath: string; // Actual sprite
  
  // Story
  backstoryTH: string;
  backstoryEN: string;
  voiceLines?: {
    battleStart: string;
    skillUse: string;
    victory: string;
    defeat: string;
  };
  
  // Acquisition
  unlockMethod: 'starter' | 'shop' | 'event' | 'gacha';
  cost?: number; // In coins or gems
}
```

### Character Design Principles

#### 1. Faction Balance

**Zombie Characters:**
- Higher attack
- Lower defense
- Intimidating appearance
- Dark color palette

**Human Characters:**
- Balanced stats
- Higher defense
- Heroic appearance
- Bright color palette

#### 2. Rarity Differences

**Common (💚):**
- Basic stats
- 1 simple skill
- Easy to obtain
- Good for beginners

**Rare (💙):**
- Better stats
- 2 skills
- Moderate cost
- Viable for mid-game

**Epic (💜):**
- High stats
- 3 skills (1 ultimate)
- High cost
- End-game viable

**Legendary (👑):**
- Highest stats
- 4 skills (2 ultimates)
- Very high cost
- Meta-defining

#### 3. Character Archetypes

**Tank:**
- High health & defense
- Low speed
- Protective skills

**Damage Dealer:**
- High attack
- Low defense
- Offensive skills

**Support:**
- Healing/buff skills
- Medium stats
- Team utility

**Speed:**
- High speed
- First strike advantage
- Evasion skills

### Example Characters

#### 1. ซอมบี้น้อย (Little Zombie) - Common
```
Name: ซอมบี้น้อย / Little Zombie
Rarity: Common 💚
Faction: Zombie

Stats:
- Attack: 50
- Defense: 30
- Speed: 40
- Health: 100

Skills:
1. Basic Bite: Deal 120% damage

Backstory:
ซอมบี้ตัวน้อยที่เพิ่งตื่นขึ้นมา ยังไม่เก่งมากแต่มีความพยายามสูง
อยากเป็นซอมบี้ที่แข็งแกร่งที่สุด

A Little zombie who just woke up. Not very strong but very 
determined to become the strongest zombie.
```

#### 2. นักเรียนขยัน (Diligent Student) - Common
```
Name: นักเรียนขยัน / Diligent Student
Rarity: Common 💚
Faction: Human

Stats:
- Attack: 40
- Defense: 40
- Speed: 50
- Health: 90

Skills:
1. Study Hard: Increase own attack by 20% for 2 turns

Backstory:
นักเรียนที่ตั้งใจเรียนมาก เชื่อว่าความรู้คือพลัง
พร้อมจะสู้เพื่ออนาคตที่ดีกว่า

A diligent student who believes knowledge is power. 
Ready to fight for a better future.
```

#### 3. ซอมบี้ทหาร (Soldier Zombie) - Rare
```
Name: ซอมบี้ทหาร / Soldier Zombie
Rarity: Rare 💙
Faction: Zombie

Stats:
- Attack: 70
- Defense: 50
- Speed: 45
- Health: 130

Skills:
1. Military Strike: Deal 150% damage
2. Undead Resilience: Reduce damage taken by 30% for 1 turn

Backstory:
ทหารที่กลายเป็นซอมบี้ ยังคงทักษะการต่อสู้ไว้ได้
อันตรายกว่าซอมบี้ทั่วไปมาก

A soldier turned zombie who retained combat skills. 
Much more dangerous than regular zombies.
```

#### 4. ข้าราชการระดับสูง (Senior Officer) - Rare
```
Name: ข้าราชการระดับสูง / Senior Officer
Rarity: Rare 💙
Faction: Human

Stats:
- Attack: 60
- Defense: 60
- Speed: 40
- Health: 120

Skills:
1. Authority: Deal 140% damage and reduce enemy attack
2. Leadership: Increase all allies' defense by 20%

Backstory:
ข้าราชการผู้มีประสบการณ์ เป็นผู้นำที่ลูกน้องเคารพ
ใช้ปัญญาและอำนาจในการต่อสู้

An experienced officer who is respected by subordinates. 
Uses wisdom and authority in battle.
```

### Character Naming

#### Thai Names
- Descriptive of role/ability
- Easy to remember
- Culturally appropriate
- 2-4 syllables

#### English Names
- Match Thai meaning
- Easy to pronounce
- International appeal
- 1-3 words

**ตัวอย่าง:**
- ซอมบี้น้อย → Little Zombie
- นักเรียนขยัน → Diligent Student
- ซอมบี้ทหาร → Soldier Zombie
- เทพเจ้าแห่งการสอบ → God of Exams

---

## 🗺️ Level Design

### Level Structure

```typescript
interface Level {
  id: number;
  nameTH: string;
  nameEN: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'boss';
  
  // Requirements
  requiredLevel: number;
  prerequisiteLevel?: number;
  
  // Battle config
  enemy: Character;
  questionCount: number;
  timeLimit: number; // seconds
  questions: QuizQuestion[];
  
  // Rewards
  rewards: {
    coins: number;
    gems: number;
    exp: number;
    items?: string[];
  };
  
  // Story
  introTextTH?: string;
  introTextEN?: string;
  victoryTextTH?: string;
  victoryTextEN?: string;
  
  // Environment
  backgroundPath: string;
  musicTrack: string;
}
```

### Level Progression

#### Easy Levels (1-5)
**Purpose:** Tutorial & early game
- Simple enemies
- 3-5 questions
- 60-90 seconds
- High success rate (80%+)
- Basic rewards

**ตัวอย่าง:**
```
Level 1: "เริ่มต้นการต่อสู้" / "First Battle"
- Enemy: ซอมบี้น้อย
- Questions: 3
- Time: 60 seconds
- Reward: 100 coins, 10 gems, 50 exp

Level 5: "บอสแรก" / "First Boss"
- Enemy: ซอมบี้ทหาร (boss version)
- Questions: 5
- Time: 90 seconds
- Reward: 500 coins, 50 gems, 250 exp
```

#### Medium Levels (6-10)
**Purpose:** Skill development
- Stronger enemies
- 5-7 questions
- 90-120 seconds
- Moderate success rate (60-80%)
- Better rewards

#### Hard Levels (11-15)
**Purpose:** Challenge
- Tough enemies
- 7-10 questions
- 120-150 seconds
- Lower success rate (40-60%)
- Great rewards

#### Expert Levels (16-20)
**Purpose:** End-game content
- Very strong enemies
- 10-15 questions
- 150-180 seconds
- Low success rate (20-40%)
- Best rewards

### Level Themes

#### Theme Ideas:
1. **School/University** - Classrooms, libraries
2. **Government Office** - Ministries, departments
3. **Historical Sites** - Temples, palaces
4. **Modern City** - Skyscrapers, malls
5. **Nature** - Forests, mountains, beaches
6. **Fantasy** - Castles, dungeons

#### Example Level Themes:
```
Levels 1-3: "โรงเรียนเก่า" / "Old School"
Levels 4-5: "สำนักงานเขต" / "District Office"
Levels 6-8: "มหาวิทยาลัย" / "University"
Levels 9-10: "กระทรวง" / "Ministry"
Levels 11-13: "วัดโบราณ" / "Ancient Temple"
Levels 14-15: "พระราชวัง" / "Royal Palace"
Levels 16-18: "เมืองบาดาล" / "Underwater City"
Levels 19-20: "สวรรค์" / "Heaven"
```

### Boss Design

#### Boss Characteristics:
- Higher stats than normal enemies
- Special dialogue
- Unique background
- Better rewards
- Cutscene before battle

#### Boss Pattern:
```
Boss Battle Flow:
1. Intro cutscene
2. Boss appears with special effect
3. Boss dialogue
4. Battle starts
5. Boss has 2 phases (50% HP trigger)
6. Victory cutscene
7. Rewards
```

#### Example Boss:
```
Level 20 Boss: "เทพเจ้าแห่งการสอบ" / "God of Exams"

Intro:
"เจ้ากล้าท้าทายข้าเหรอ? ได้เลย มาทดสอบความรู้ของเจ้า!"

Phase 1 (100-50% HP):
- Normal questions
- Regular attacks

Phase 2 (50-0% HP):
- Harder questions
- Special attacks
- Time reduced by 20%

Victory:
"ไม่เลวเลยเจ้าหนู เจ้าพร้อมแล้วสำหรับการสอบจริง!"

Reward:
- 5,000 coins
- 500 gems
- Exclusive character unlock
- Title: "Exam Master"
```

---

## 📖 Story & Lore

### Main Story Arc

#### Act 1: The Outbreak
```
Background:
ไวรัสประหลาดทำให้คนกลายเป็นซอมบี้ แต่ซอมบี้เหล่านี้ไม่ธรรมดา
พวกมันชอบตอบคำถามและท้าทายให้มนุษย์ตอบคำถาม

Protagonist:
นักเรียนเตรียมสอบราชการที่บังเอิญพบเข้า
ต้องต่อสู้ด้วยการตอบคำถามเพื่อเอาชีวิตรอด

Goal:
หาทางรักษาไวรัสและหยุดการระบาด
```

#### Act 2: The Journey
```
Travel through different areas:
- Schools
- Government offices
- Historical sites
- Cities

Meet allies:
- Other students
- Teachers
- Government officers
- Experts

Face bosses:
- Zombie teachers
- Zombie officers
- Zombie experts
```

#### Act 3: The Truth
```
Revelation:
ไวรัสไม่ได้เกิดจากอุบัติเหตุ
แต่เป็นการทดลองเพื่อสร้าง "มนุษย์ที่สมบูรณ์แบบ"

Final Boss:
ผู้สร้างไวรัส - "เทพเจ้าแห่งการสอบ"

Ending:
หากรักษาสำเร็จ = Good ending
หากไม่สามารถรักษา = Bittersweet ending
```

### Character Backstories

#### Template:
```
[Character Name]

Early Life:
[Childhood and background]

Turning Point:
[Event that changed their life]

Current Situation:
[Where they are now]

Motivation:
[What drives them]

Secret:
[Hidden truth about them]
```

#### Example:
```
ซอมบี้ทหาร (Soldier Zombie)

Early Life:
เกิดในครอบครัวทหาร รับราชการทหารมาตั้งแต่อายุ 20 ปี
เป็นทหารที่มีความสามารถสูง ได้รับเหรียญกล้าหาญหลายเหรียญ

Turning Point:
ระหว่างปฏิบัติภารกิจพิเศษ ติดเชื้อไวรัสซอมบี้
แต่ยังคงสติสัมปชัญญะและทักษะการต่อสู้ไว้ได้

Current Situation:
เป็นบอสของด่านที่ 5 คอยทดสอบผู้ที่ต้องการผ่านด่าน

Motivation:
ต้องการหาคนที่แข็งแกร่งพอที่จะหยุดการระบาดของไวรัส

Secret:
จริงๆ แล้วกำลังหาวิธีรักษาไวรัสอย่างลับๆ
```

### Dialogue Writing

#### Battle Dialogues:

**Battle Start:**
```
Player: "มาเริ่มกันเลย!"
Enemy: "มาดูกันว่าเจ้าจะตอบได้กี่ข้อ!"

Player: "ฉันพร้อมแล้ว!"
Enemy: "งั้นเริ่มเลย!"
```

**Using Skill:**
```
Player: "รับไปเลย!"
Enemy: "ไม่เลวนะ!"

Player: "สกิลพิเศษ!"
Enemy: "น่ากลัวจัง!"
```

**Victory:**
```
Player: "ชนะแล้ว!"
Player: "เก่งมาก!"
Player: "ผ่านไปอีกด่าน!"
```

**Defeat:**
```
Player: "ไม่จริง..."
Player: "ต้องพยายามมากกว่านี้"
Player: "ไว้เจอกันใหม่"
```

---

## 🌐 Localization (Translation)

### Translation Guidelines

#### 1. Maintain Meaning
- Translate meaning, not words
- Adapt cultural references
- Keep tone consistent

#### 2. Length Considerations
- Thai text is often longer than English
- UI must accommodate both
- Button labels should be short

#### 3. Cultural Adaptation
```
Example:
TH: "ทำบุญตักบาตร"
EN: "Make merit" (not literal translation)

TH: "สอบเอนทรานซ์"
EN: "University entrance exam"
```

#### 4. Consistency
- Use glossary for key terms
- Consistent character names
- Consistent terminology

### Translation Process

1. **Write in Thai first** (primary language)
2. **Translate to English**
3. **Review by native speaker**
4. **Test in-game**
5. **Adjust based on feedback**

### Common Terms Translation

```
เกม = Game
ข้อสอบ = Quiz/Exam question
ด่าน = Level
บอส = Boss
ตัวละคร = Character
ไอเทม = Item
เหรียญ = Coin
อัญมณี = Gem
พลังโจมตี = Attack
พลังป้องกัน = Defense
ความเร็ว = Speed
เลือด/พลังชีวิต = Health/HP
เลเวล = Level
ประสบการณ์ = Experience (EXP)
ทักษะ/สกิล = Skill
อัพเกรด = Upgrade
ร้านค้า = Shop
```

---

## 📋 Content Calendar

### Monthly Content Plan

#### Week 1-2: Quiz Questions
- Write 20 new questions
- Review and fact-check
- Translate to English
- Add to game

#### Week 3: Characters
- Design 1-2 new characters
- Write backstories
- Create stats and skills
- Balance testing

#### Week 4: Levels
- Design 2-3 new levels
- Write level dialogues
- Set rewards
- Test difficulty

### Quality Assurance

#### Before Publishing:
- [ ] Fact-check all information
- [ ] Proofread Thai text
- [ ] Proofread English text
- [ ] Test in-game
- [ ] Get feedback from beta testers
- [ ] Check cultural sensitivity
- [ ] Verify difficulty balance
- [ ] Ensure no duplicates

---

**Remember:**
- Quality over quantity
- Keep content fresh and updated
- Listen to player feedback
- Maintain consistency
- Respect cultural sensitivities

**Create amazing content! 📝✨**
