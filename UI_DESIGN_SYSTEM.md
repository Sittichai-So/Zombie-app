# Zombie Theme UI Design System

## Overview
This document describes the modern UI design system applied to the Zombie Quiz RPG app, featuring glassmorphism effects, gradient accents, and our friendly mascot "Zombie Pete".

## Design Philosophy
- **Dark Theme**: Deep space blues and blacks (#0a0e1a, #1a1a2e) as base
- **Neon Accents**: Vibrant zombie-themed colors (toxic green, blood red, radioactive purple)
- **Glassmorphism**: Semi-transparent cards with blur effects and subtle borders
- **Gradients**: Smooth color transitions for depth and modern appeal
- **Mascot Integration**: "Zombie Pete" appears throughout the app for guidance and personality

## Color Palette

### Primary Colors
```javascript
// Backgrounds
BACKGROUND_DARK: '#0a0e1a'
BACKGROUND_CARD: '#1a1a2e'
BACKGROUND_GLASS: 'rgba(22, 33, 62, 0.95)'

// Accent Colors
ZOMBIE_RED: '#e94560'        // Primary action color
TOXIC_GREEN: '#22c55e'       // Success states
RADIOACTIVE_PURPLE: '#a855f7' // Mascot and special features
GOLD: '#ffd700'              // Premium currency
COIN_GOLD: '#f39c12'         // Regular currency
```

### Rarity Colors
```javascript
LEGENDARY: '#f39c12'  // Orange-gold
EPIC: '#9b59b6'       // Purple
RARE: '#3498db'       // Blue
COMMON: '#95a5a6'     // Gray
```

## Component System

### 1. Button Component
Modern gradient buttons with shadow effects:

```tsx
<Button
  title="Start Game"
  onPress={handleStart}
  variant="primary" // primary | secondary | danger | success | mascot
  size="large"      // small | medium | large
  icon="⚔️"
  gradient={true}
/>
```

**Variants:**
- `primary`: Red gradient (#e94560 → #c0354a)
- `secondary`: Blue gradient (#0f3460 → #16213e)
- `danger`: Red alert (#ef4444 → #dc2626)
- `success`: Green success (#22c55e → #16a34a)
- `mascot`: Purple special (#a855f7 → #7c3aed)

### 2. Card Component
Glassmorphic cards with variant borders:

```tsx
<Card
  title="Character Card"
  variant="character" // default | character | item | stat | mascot
  gradient={true}
>
  {children}
</Card>
```

**Features:**
- Rounded corners (20px)
- Shadow elevation
- Variant-specific border colors
- Optional gradient backgrounds
- Glassmorphism backdrop blur

### 3. Mascot Component
"Zombie Pete" - Your friendly zombie guide:

```tsx
<Mascot
  emotion="happy"    // happy | excited | thinking | worried | celebrating
  size="medium"      // small | medium | large
  message="Ready!"   // Optional speech bubble
  animated={true}
/>
```

**Features:**
- Bounce animation
- Glow effect
- Speech bubble for messages
- Gradient border ring
- Shadow effects

## Design Patterns

### Header Design
```tsx
<LinearGradient
  colors={['rgba(22, 33, 62, 0.95)', 'rgba(6, 10, 20, 0.8)']}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={styles.header}
>
  {/* Header content */}
</LinearGradient>
```

### Currency Display
```tsx
<LinearGradient
  colors={['rgba(243, 156, 18, 0.2)', 'rgba(243, 156, 18, 0.1)']}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={styles.coinBox}
>
  <Text>🪙</Text>
  <Text>{coins}</Text>
</LinearGradient>
```

### Character Display Card
```tsx
<LinearGradient
  colors={['rgba(233, 69, 96, 0.15)', 'rgba(22, 33, 62, 0.8)']}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={styles.characterFrame}
>
  {/* Character content with rarity-based borders */}
</LinearGradient>
```

### Modal/Popup Design
```tsx
<LinearGradient
  colors={['#2d1b4e', '#1a1a2e']}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={styles.modalContent}
>
  <Mascot emotion="celebrating" message="Congratulations!" />
  {/* Modal content */}
</LinearGradient>
```

## Styling Guidelines

### Shadows & Elevation
```javascript
shadowColor: '#000',
shadowOffset: { width: 0, height: 4 },
shadowOpacity: 0.3,
shadowRadius: 8,
elevation: 6  // Android
```

### Borders
```javascript
// Glassmorphism border
borderWidth: 1,
borderColor: 'rgba(233, 69, 96, 0.3)',

// Strong accent border
borderWidth: 2,
borderColor: '#e94560',
```

### Text Effects
```javascript
// Title with shadow
textShadowColor: 'rgba(233, 69, 96, 0.5)',
textShadowOffset: { width: 0, height: 2 },
textShadowRadius: 4,
```

### Spacing
- Card padding: 18px
- Margin between elements: 8-16px
- Section padding: 20px horizontal
- Border radius: 16-30px (larger for containers)

## Animation Guidelines

### Pulse Animation (for important buttons)
```tsx
Animated.loop(
  Animated.sequence([
    Animated.timing(scaleAnim, {
      toValue: 1.03,
      duration: 900,
      useNativeDriver: Platform.OS !== 'web',
    }),
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 900,
      useNativeDriver: Platform.OS !== 'web',
    }),
  ])
).start();
```

### Fade In
```tsx
Animated.timing(fadeAnim, {
  toValue: 1,
  duration: 800,
  useNativeDriver: Platform.OS !== 'web',
}).start();
```

## Mascot Usage Examples

### Home Screen
```tsx
<Mascot 
  emotion="happy" 
  size="medium"
  message="พร้อมสู้ซอมบี้หรือยัง!"
/>
```

### Empty State
```tsx
<Mascot 
  emotion="thinking" 
  size="small" 
  message="เลือกตัวละครของคุณ!" 
/>
```

### Success/Reward
```tsx
<Mascot 
  emotion="celebrating" 
  size="small" 
  message="ยินดีด้วย!" 
/>
```

### Battle Victory
```tsx
<Mascot 
  emotion="excited" 
  size="medium"
  message="สุดยอด!"
/>
```

## Screen-Specific Patterns

### Home Screen
- Large gradient header with user info
- Mascot greeting section
- Character showcase with rarity glow
- Primary action button (Start Game) - prominent
- Secondary actions in 2x2 grid

### Battle Screen
- Enemy display with health bar
- Question card with timer
- Answer buttons with feedback
- Combo counter with mascot reactions

### Character Select Screen
- Character grid with rarity borders
- Detailed character card
- Stats display with icons
- Selection indicator

### Shop Screen
- Item cards with gradient backgrounds
- Currency display
- Purchase confirmation modals
- Mascot recommendations

### Profile Screen
- User avatar with level badge
- Statistics grid
- Progress bars with gradients
- Achievement badges

### Settings Screen
- Toggle switches with custom styling
- Language selector
- About/Terms modals
- Reset confirmation with mascot warning

## Implementation Checklist

For each screen, ensure:
- [ ] Gradient headers
- [ ] Glassmorphism cards
- [ ] Consistent spacing (20px sections)
- [ ] Shadow elevation on interactive elements
- [ ] Mascot integration where appropriate
- [ ] Currency displays with gradients
- [ ] Rounded corners (16-20px minimum)
- [ ] Text shadows on titles
- [ ] Smooth animations
- [ ] Zombie theme colors maintained

## Accessibility Considerations

- Maintain sufficient contrast ratios
- Use semantic colors (red for danger, green for success)
- Provide text alternatives for emoji icons
- Ensure touch targets are at least 44x44px
- Support dynamic type sizing

## Performance Tips

- Use `useNativeDriver: true` for animations when possible
- Memoize expensive gradient calculations
- Optimize image loading for character art
- Use Platform.OS checks for web compatibility

## Future Enhancements

1. **Dark/Light Theme Toggle**: Extend palette for light mode
2. **Seasonal Themes**: Halloween, Christmas mascot outfits
3. **Achievement Animations**: Special mascot dances
4. **Particle Effects**: Battle success confetti
5. **Haptic Feedback**: Enhanced vibration patterns

---

**Last Updated**: 2026-07-07
**Version**: 2.0.0
**Theme**: Zombie Quiz RPG - Modern Glassmorphism
