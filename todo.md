# 瞬说 (ShuoShuo) - 语言学习APP Web版 MVP

## Design Guidelines

### Design References
- **Duolingo**: Playful, colorful, gamified learning experience
- **多邻国/Babbel**: Clean mobile-first design, card-based interactions
- **Style**: Modern Mobile-First + Playful + Warm Gradients

### Color Palette
- Primary: #FF6B35 (Warm Orange - main CTA, energy)
- Secondary: #7C3AED (Purple - accent, achievements)
- Success: #10B981 (Green - correct/remembered)
- Warning: #F59E0B (Yellow - slow pace)
- Error: #EF4444 (Red - skip/wrong)
- Background: #FAFAF8 (Warm White)
- Card: #FFFFFF
- Text Primary: #1A1A2E (Dark Navy)
- Text Secondary: #6B7280 (Gray)
- Gradient: linear-gradient(135deg, #FF6B35, #FF8C61)

### Typography
- Headings: Inter, font-weight 700
- Body: Inter, font-weight 400
- Chinese UI text throughout (matching PRD)

### Key Component Styles
- Cards: White bg, rounded-2xl, shadow-lg, hover lift
- Buttons: Rounded-full, gradient bg for primary, bold text
- Flash Cards: Full-screen, swipeable, large imagery
- Bottom Nav: Fixed bottom, 4 tabs with icons
- Mobile viewport: max-w-md centered

### Images to Generate
1. **hero-language-learning.jpg** - Colorful abstract illustration of language learning, speech bubbles, books, globe (Style: minimalist, vibrant colors)
2. **flashcard-coffee.jpg** - Beautiful coffee cup on cafe table, warm lighting, cozy atmosphere (Style: photorealistic)
3. **flashcard-hello.jpg** - Friendly people waving hello on a street, diverse group, warm sunlight (Style: photorealistic)
4. **flashcard-eat.jpg** - Delicious food spread on a dining table, appetizing, bright colors (Style: photorealistic)
5. **drama-cafe-scene.jpg** - Two people chatting at a cafe counter, friendly conversation scene (Style: cartoon/illustration, warm tones)
6. **drama-street-scene.jpg** - Person asking for directions on a city street, helpful interaction (Style: cartoon/illustration, warm tones)

---

## Development Tasks & Files

### Files to Create (8 files max):

1. **src/pages/Index.tsx** - Homepage with brand intro, bottom nav, today's stats, best dubbing showcase
2. **src/pages/FlashCardHome.tsx** - Flash memory entry page with mode selection, emotion groups, progress stats
3. **src/pages/FlashCardStudy.tsx** - Full-screen swipeable flash card study page with gesture interactions
4. **src/pages/DramaList.tsx** - Drama dubbing list with category/difficulty filters, search, card grid
5. **src/pages/DramaDubbing.tsx** - Complete dubbing flow: preview → record → score → result
6. **src/pages/Profile.tsx** - User profile, stats, my vocabulary, my works, settings
7. **src/components/BottomNav.tsx** - Shared bottom navigation component (首页/闪记/配音/我的)
8. **src/data/mockData.ts** - All mock data (flashcards, dramas, user stats)