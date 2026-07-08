# Minimal Cute Zombie Design System

## Overview
Design system ที่ผสมผสานระหว่าง:
- **Minimal UI** - สะอาด, เรียบง่าย, สบายตา
- **Cute Zombie Theme** - ซอมบี้น่ารัก, ไม่น่ากลัว
- **Modern Gradients** - สีสดใสแบบ gradient
- **Card-based Layout** - ออกแบบเป็นการ์ดซ้อนกัน

## Color Palette

### Primary Colors (Zombie Cute)
```
🧟 Zombie Green: #84CC16 → #A3E635 (lime gradient)
🩸 Blood Red: #F87171 → #FCA5A5 (soft red)
🧠 Brain Purple: #C084FC → #E9B5FA (cute purple)
💀 Bone White: #FEF3C7 → #FDE68A (warm bone)
🌙 Night Blue: #6366F1 → #818CF8 (indigo night)
```

### Background Colors
```
Dark Base: #0F172A (slate 900)
Card Dark: #1E293B (slate 800)
Card Light: #334155 (slate 700)
Overlay: rgba(15, 23, 42, 0.8)
```

### Accent Colors (Category-specific)
```
🧠 Analytical: #6366F1 → #8B5CF6 (indigo gradient)
🌐 English: #06B6D4 → #3B82F6 (cyan gradient)
⚖️ Ethics: #F59E0B → #EF4444 (amber gradient)
```

### Gradient Presets
```typescript
// Zombie Cute Gradients
zombieGreen: ['#84CC16', '#A3E635']
bloodRed: ['#F87171', '#FCA5A5']
brainPurple: ['#C084FC', '#E9B5FA']
boneWhite: ['#FEF3C7', '#FDE68A']
nightBlue: ['#6366F1', '#818CF8']

// Category Gradients
analytical: ['#6366F1', '#8B5CF6']
english: ['#06B6D4', '#3B82F6']
ethics: ['#F59E0B', '#EF4444']
```

## Typography

### Font Family
```
Main: 'Kanit' (Thai) + 'Poppins' (English)
Headers: Bold, ExtraBold
Body: Regular, Medium
```

### Font Sizes
```
xs: 10px (captions, badges)
sm: 12px (labels, secondary text)
base: 14px (body text)
lg: 16px (buttons, cards)
xl: 18px (section titles)
2xl: 24px (page titles)
3xl: 32px (headers)
```

### Font Weights
```
Regular: 400
Medium: 500
Semibold: 600
Bold: 700
ExtraBold: 800
```

## Component Styles

### Cards
```typescript
{
  borderRadius: 24,
  padding: 20,
  borderWidth: 2,
  borderColor: 'rgba(255, 255, 255, 0.1)',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 12,
  elevation: 8,
  // Gradient background
  backgroundGradient: ['#1E293B', '#334155']
}
```

### Buttons
```typescript
{
  borderRadius: 16,
  paddingVertical: 14,
  paddingHorizontal: 24,
  fontWeight: '700',
  fontSize: 16,
  // Gradient background with icon
  hasIcon: true,
  iconPosition: 'left'
}
```

### Character Cards
```typescript
{
  borderRadius: 20,
  overflow: 'hidden',
  // Character illustration on top
  illustrationHeight: 120,
  // Info section below
  infoPadding: 16,
  // Cute badge for rarity
  rarityBadge: {
    position: 'top-right',
    style: 'circular'
  }
}
```

### Stat Cards
```typescript
{
  borderRadius: 20,
  padding: 16,
  // Icon + Value + Label
  layout: 'vertical',
  iconSize: 32,
  valueSize: 24,
  labelSize: 12,
  // Gradient background
  hasGradient: true
}
```

## Illustration Style

### Zombie Characters
```
Style: Minimal, Cute, Chibi
Proportions: Big head, small body
Eyes: Large, expressive
Colors: Soft green, pastel tones
Expressions: Happy, determined, thinking
```

### Mascot "Zombie Pete"
```
Head: Round, soft green (#84CC16)
Eyes: Large, black with white highlights
Mouth: Simple curved line (smile)
Body: Small, simplified
Accessories: 
  - Brain icon 🧠
  - Bandages 🩹
  - Cute clothes
```

### Background Elements
```
Style: Minimal, geometric
Patterns: 
  - Dotted grids
  - Wavy lines
  - Floating shapes
Colors: Muted tones of primary colors
Opacity: 20-40%
```

## Layout Patterns

### Header Pattern
```typescript
<LinearGradient colors={['#6366F1', '#8B5CF6']}>
  <View style={headerContent}>
    <BackButton />
    <Title />
    <ActionButton />
  </View>
</LinearGradient>
```

### Card Grid Pattern
```typescript
<ScrollView>
  <View style={cardGrid}>
    {items.map(item => (
      <Card key={item.id} style={gridCard}>
        <Illustration />
        <Title />
        <Stats />
      </Card>
    ))}
  </View>
</ScrollView>
```

### Character Showcase Pattern
```typescript
<View style={characterShowcase}>
  <CharacterIllustration size="large" />
  <View style={characterInfo}>
    <Name />
    <RarityBadge />
    <Stats />
  </View>
</View>
```

## Animation Guidelines

### Micro-interactions
```
Button Press: Scale 0.95, 100ms
Card Hover: Lift 4px, shadow increase
Page Transition: Slide + Fade, 300ms
Success: Bounce + Confetti
Error: Shake horizontal
```

### Character Animations
```
Idle: Gentle bounce (1s loop)
Happy: Jump + sparkle
Thinking: Head tilt + thought bubble
Worried: Sweat drop + shake
Victory: Dance + confetti
```

### Gradient Animations
```
Flowing Gradient: Slow color shift (5s loop)
Pulse Glow: Opacity 0.5 → 1 (2s loop)
Shimmer: Light sweep left→right (3s)
```

## Screen Templates

### Home Screen Layout
```
┌─────────────────────────┐
│  Gradient Header        │
│  [Avatar] [Name] [Lvl]  │
│  [Coins] [Gems] [Gold]  │
├─────────────────────────┤
│  Character Showcase     │
│  ┌─────────────────┐    │
│  │   Illustration  │    │
│  │   + Stats       │    │
│  └─────────────────┘    │
├─────────────────────────┤
│  Menu Grid (2x2)        │
│  ┌───┐ ┌───┐           │
│  │ 📚 │ │ ⚔️ │           │
│  ├───┤ ├───┤           │
│  │ 🛒 │ │ ⚙️ │           │
│  └───┘ └───┘           │
└─────────────────────────┘
```

### Category Selection Layout
```
┌─────────────────────────┐
│  Title + Progress       │
├─────────────────────────┤
│  Mascot Message         │
├─────────────────────────┤
│  Category Card 1        │
│  ┌─────────────────┐    │
│  │ 🧠 Icon + Info  │    │
│  │ [Topics...]     │    │
│  └─────────────────┘    │
│  Category Card 2        │
│  Category Card 3        │
└─────────────────────────┘
```

### Level Map Layout
```
┌─────────────────────────┐
│  Back | Title | Stats   │
├─────────────────────────┤
│  Mascot Guide           │
├─────────────────────────┤
│  Zone 1 (Gradient)      │
│  ●──●──●──●            │
│  Zone 2 (Gradient)      │
│  ●──●──●──BOSS         │
└─────────────────────────┘
```

### Battle Screen Layout
```
┌─────────────────────────┐
│  Timer | Wave | Power   │
├─────────────────────────┤
│  [Player] VS [Enemy]    │
│  Health Bars (Gradient) │
├─────────────────────────┤
│  Mascot Reaction        │
├─────────────────────────┤
│  Question Card          │
│  ┌─────────────────┐    │
│  │ Question Text   │    │
│  ├─────────────────┤    │
│  │ [Answer A]      │    │
│  │ [Answer B]      │    │
│  │ [Answer C]      │    │
│  │ [Answer D]      │    │
│  └─────────────────┘    │
└─────────────────────────┘
```

## Icon Style

### Design Principles
```
Style: Minimal, line icons
Stroke: 2px, rounded caps
Size: 24x24 (standard)
Colors: White or category color
Fill: Outlined or soft fill
```

### Icon Set
```
Navigation: ← → ↑ ↓ 🏠 🔙
Actions: ⚔️ 🛒 ⚙️ 📚 🎮
Stats: 💪 🧠 ⚡ 🎯 🏆
Currency: 🪙 💎 🪙 🏅
Categories: 🧠 🌐 ⚖️
Status: ✅ ❌ ⏱️ 🔒 🔓
```

## Spacing System

### Base Unit: 4px
```
xs: 4px
sm: 8px
md: 12px
lg: 16px
xl: 20px
2xl: 24px
3xl: 32px
4xl: 40px
```

### Layout Spacing
```
Screen Padding: 20px
Card Margin: 16px
Element Gap: 12px
Section Gap: 32px
```

## Border Radius

```
Small: 8px (buttons, badges)
Medium: 16px (cards, inputs)
Large: 24px (modals, sheets)
Circular: 9999px (avatars, icons)
```

## Shadows & Elevation

### Light Shadow (Cards)
```
shadowColor: '#000'
shadowOffset: { width: 0, height: 2 }
shadowOpacity: 0.1
shadowRadius: 8
elevation: 4
```

### Medium Shadow (Floating)
```
shadowColor: '#000'
shadowOffset: { width: 0, height: 4 }
shadowOpacity: 0.2
shadowRadius: 12
elevation: 8
```

### Heavy Shadow (Modal)
```
shadowColor: '#000'
shadowOffset: { width: 0, height: 8 }
shadowOpacity: 0.3
shadowRadius: 24
elevation: 16
```

## Implementation Priority

### Phase 1: Core Components
1. ✅ Update Card component with new gradients
2. ✅ Update Button component with modern style
3. ✅ Update Mascot with cute expressions
4. ✅ Create stat card component

### Phase 2: Screen Updates
1. ✅ HomeScreen - Modern gradient + cards
2. ✅ CategoriesScreen - Colorful category cards
3. ✅ LevelMapScreen - Gradient zones
4. ✅ BattleScreen - Modern question UI

### Phase 3: Polish
1. ⏳ Character illustrations (cute zombie style)
2. ⏳ Background patterns
3. ⏳ Micro-interactions
4. ⏳ Sound effects

### Phase 4: Additional Screens
1. ⏳ ProfileScreen
2. ⏳ ShopScreen
3. ⏳ SettingsScreen
4. ⏳ CharactersScreen

## Example Code Snippets

### Gradient Card
```typescript
<LinearGradient
  colors={['#6366F1', '#8B5CF6']}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={styles.card}
>
  <View style={styles.cardContent}>
    <Text style={styles.cardTitle}>Title</Text>
    <Text style={styles.cardDescription}>Description</Text>
  </View>
</LinearGradient>
```

### Cute Stat Display
```typescript
<View style={styles.statCard}>
  <Text style={styles.statIcon}>🧠</Text>
  <Text style={styles.statValue}>1,234</Text>
  <Text style={styles.statLabel}>Intelligence</Text>
</View>
```

### Character Card
```typescript
<Card variant="character">
  <View style={styles.characterArt}>
    <Text style={styles.characterEmoji}>🧟</Text>
  </View>
  <View style={styles.characterInfo}>
    <Text style={styles.characterName}>Zombie Pete</Text>
    <View style={styles.rarityBadge}>
      <Text>⭐⭐⭐</Text>
    </View>
  </View>
</Card>
```

## Notes

- Keep it minimal and cute, not scary
- Use soft, pastel colors for zombie theme
- Gradients should be smooth and modern
- Typography must be clean and readable
- Animations should be subtle and smooth
- Character design: big eyes, small body, cute expressions
- Maintain consistency across all screens
