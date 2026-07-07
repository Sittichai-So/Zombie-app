# Assets Directory

This directory contains all game assets including images, sounds, and fonts.

## Structure

```
assets/
├── images/
│   ├── characters/      # Character sprites and portraits
│   ├── backgrounds/     # Level backgrounds
│   ├── ui/              # UI elements (buttons, icons, etc.)
│   ├── effects/         # Visual effects
│   ├── icon.png         # App icon
│   ├── splash.png       # Splash screen
│   ├── adaptive-icon.png # Android adaptive icon
│   └── favicon.png      # Web favicon
├── sounds/
│   ├── music/           # Background music
│   ├── sfx/             # Sound effects
│   │   ├── battle.mp3   # Battle theme
│   │   ├── victory.mp3  # Victory fanfare
│   │   ├── defeat.mp3   # Defeat sound
│   │   ├── correct.mp3  # Correct answer
│   │   ├── wrong.mp3    # Wrong answer
│   │   └── click.mp3    # UI click sound
│   └── voice/           # Voice overs (if any)
└── fonts/               # Custom fonts
```

## Placeholder Assets

Currently, all assets are placeholders. Replace them with your own assets:

### Character Images
- Size: 512x512px (recommended)
- Format: PNG with transparency
- Style: Consistent art style across all characters

### Background Images
- Size: 1080x1920px (Full HD portrait)
- Format: PNG or JPG
- Style: Matching the game theme

### Sound Effects
- Format: MP3 or WAV
- Quality: 128kbps or higher
- Length: Short loops for music, brief for SFX

## Asset Credits

When adding assets, make sure to:
1. Own the rights or have proper licenses
2. Credit the original creators
3. Follow asset store terms of use

## Optimization Tips

- Compress images without losing quality
- Use appropriate resolutions for different devices
- Consider using sprite sheets for animations
- Keep file sizes reasonable for mobile download
