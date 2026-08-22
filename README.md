# Happy Birthday — A Personal Love Story ❤️

An interactive, cinematic 3D birthday website built as a personal digital love story.
Created with React, Vite, Tailwind CSS, Three.js (React Three Fiber), and Framer Motion.

## The Experience

The journey flows through 10 connected scenes:

1. **Intro / Surprise** — a cinematic dark screen with a glowing "Open Your Surprise" button that bursts particles and floating hearts
2. **Birthday Hero** — a glowing 3D heart that breathes and rotates with parallax
3. **Her Photo** — a framed photo that tilts and floats with your mouse
4. **Our Memories** — 3D polaroid cards that float, glow on hover, and open in a lightbox
5. **Our Timeline** — an animated vertical timeline with glowing connecting lines
6. **3D Memory Space** — a dreamy universe with a moon, stars, and floating photos
7. **Reasons I Love You** — glowing cards that reveal personal messages on click
8. **Personal Letter** — a handwritten-style letter that types itself out
9. **Birthday Cake** — an interactive 3D cake; blow the candles to trigger fireworks
10. **Final Surprise** — a cinematic closing with a glowing heart and floating memories

## Getting Started

The dev server runs automatically. To run locally on your own machine:

```bash
npm install
npm run dev
```

Open the URL shown in your terminal.

## Customizing the Website

### 1. All text and content — one file

Edit **`src/config/birthdayConfig.ts`** to change everything:

- `name` — her name (used in the final section)
- `birthday` — the birthday date
- `heroTitle`, `heroSubtitle1`, `heroSubtitle2` — the birthday hero messages
- `photoTitle`, `photoMessage` — the text beside her photo
- `memories` — array of `{ image, caption }` for each memory photo
- `timeline` — array of `{ title, date, description, emoji }` for each milestone
- `memorySpaceTitle`, `memorySpaceMessage` — the 3D space text
- `reasons` — array of `{ title, emoji, message }` for each reason card
- `letterTitle`, `letter` — the personal letter (shown as handwriting)
- `cakeTitle`, `cakeButton`, `cakeFinalMessage` — the cake section text
- `finalSurpriseTitle`, `finalThankYou`, `finalMessage`, `finalGratitude` — the closing

### 2. Adding photos

Replace the files in **`public/images/`**:

```
public/images/her-photo.jpg      ← her main photo
public/images/memory1.jpg        ← memory photo 1
public/images/memory2.jpg        ← memory photo 2
public/images/memory3.jpg        ← memory photo 3
public/images/memory4.jpg        ← memory photo 4
public/images/memory5.jpg        ← memory photo 5
public/images/memory6.jpg        ← memory photo 6
```

Keep the same filenames, or change the paths in `birthdayConfig.ts` (`memories[].image` and `photoImage`).

Recommended: use portrait-oriented photos for `her-photo.jpg` and landscape for memories. The placeholders are royalty-free stock photos you can replace freely.

### 3. Adding background music

Replace the file at:

```
public/audio/romantic-song.mp3
```

Music starts automatically after the "Open Your Surprise" button is clicked (browsers block autoplay before user interaction). A play/pause button appears in the top-right corner with a pulsing animation when music is playing.

Use any romantic song in MP3 format. Keep the filename `romantic-song.mp3`, or update the path in `src/components/MusicControl.tsx`.

## Project Structure

```
public/
  images/         ← replace photos here
  audio/          ← replace romantic-song.mp3 here
src/
  config/
    birthdayConfig.ts    ← edit this one file to personalize everything
  components/
    three/
      BackgroundScene.tsx  ← global particle/heart background
      Shapes.tsx           ← reusable 3D particles, hearts, spheres
    sections/
      IntroPage.tsx
      HeroSection.tsx
      PhotoSection.tsx
      MemoriesSection.tsx
      TimelineSection.tsx
      MemorySpaceSection.tsx
      ReasonsSection.tsx
      LetterSection.tsx
      CakeSection.tsx
      FinalSection.tsx
    Navigation.tsx         ← bottom nav + scroll progress bar
    MusicControl.tsx       ← background music play/pause
  App.tsx                  ← orchestrates all sections
  index.css                ← fonts, theme, scrollbar
```

## Performance

- Particle counts and 3D effects auto-reduce on mobile.
- The 3D background uses a fixed canvas with capped pixel ratio for smooth framerates.
- All sections lazy-animate into view only once.

## Tech

- React 18 + Vite
- Tailwind CSS 3
- Three.js + React Three Fiber + Drei
- Framer Motion
- Lucide React icons
- Google Fonts: Cormorant Garamond (body) + Dancing Script (handwriting)
