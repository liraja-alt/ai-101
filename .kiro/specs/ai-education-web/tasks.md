# Implementation Plan

## Overview

Build an interactive educational website teaching 8-9 year old children how AI works, covering training, computing resources, usage, and customization modules. Static SPA using vanilla HTML/CSS/JS.

## Task Dependency Graph

```
1 --> 2
1 --> 7
2 --> 3
2 --> 4
2 --> 5
2 --> 6
7 --> 3
7 --> 4
7 --> 5
7 --> 6
3 --> 8
4 --> 8
5 --> 8
6 --> 8
7 --> 8
```

## Tasks

- [x] 1. Project Setup and Base Structure
  - [x] 1.1 Create the project directory structure with `index.html`, `css/`, `js/`, and `assets/` folders
  - [x] 1.2 Create `css/styles.css` with CSS custom properties (color palette, typography, base reset) as defined in Component 6 of the design document
  - [x] 1.3 Create `index.html` with the HTML5 boilerplate, section containers for landing page and all four modules, and link all CSS/JS files
  - [x] 1.4 Create `css/animations.css` with keyframe animations for star burst, confetti, fade-in, slide transitions, and bounce effects
- [x] 2. Navigation System
  - [x] 2.1 Create `js/app.js` with the main application state management (currentModule, visitedModules, moduleProgress)
  - [x] 2.2 Create `js/navigation.js` with functions to transition between modules using CSS transform translateX with 500ms ease-in-out
  - [x] 2.3 Create `css/navigation.css` with styles for the fixed bottom navigation bar, module icons, and progress indicator (filled/empty circles)
  - [x] 2.4 Add the landing page content to `index.html` with a welcoming title, animated robot mascot SVG, and four colorful module cards
- [x] 3. AI Training Module
  - [x] 3.1 Add the Training Module HTML section with the robot character SVG (three visual states: confused, thinking, happy), image grid, and training bucket
  - [x] 3.2 Create `js/training-module.js` with the TrainingSimulation class implementing drag-and-drop of example images into the training bucket
  - [x] 3.3 Implement the confidence progression logic: each example adds ~15% confidence, robot expression updates at 30% and 70% thresholds
  - [x] 3.4 Add celebration animation when confidence reaches 100% (star burst + robot happy dance)
  - [x] 3.5 Add explanatory text panels with child-friendly language explaining "AI learns from many examples" with relatable numbers
- [x] 4. Computing Resources Module
  - [x] 4.1 Add the Resources Module HTML section with the library metaphor illustration, two race lanes (single vs parallel), and start button
  - [x] 4.2 Create `js/resources-module.js` with the ResourcesRace class implementing the speed comparison animation
  - [x] 4.3 Implement the race visualization: single lane processes 1 card per tick, parallel lane processes 8 cards per tick, with animated card movement
  - [x] 4.4 Add conclusion display when parallel lane finishes: "Many computers working together = faster AI training!" with confetti animation
  - [x] 4.5 Add child-friendly comparison text (e.g., "more computers than students in your school") and time-scale explanations
- [x] 5. AI Usage Module
  - [x] 5.1 Add the Usage Module HTML section with the five AI application cards (voice assistant, photo filters, recommendations, translation, autocorrect) and description cards
  - [x] 5.2 Create `js/usage-module.js` with the MatchingGame class implementing click-to-match pairing logic
  - [x] 5.3 Implement match feedback: correct matches light up green with star animation, incorrect matches bounce back with encouraging text
  - [x] 5.4 Add celebration animation when all five pairs are matched
  - [x] 5.5 Add the training-vs-usage split-screen comparison visual (slow clock + many computers vs fast lightning + one phone)
- [x] 6. AI Customization Module
  - [x] 6.1 Add the Customization Module HTML with three sub-section tabs (Knowledge Bases, Context, Prompts) and shared robot character
  - [x] 6.2 Create `js/customization-module.js` with the CustomizationModule class managing all three sub-sections
  - [x] 6.3 Implement Knowledge Bases sub-section: three bookshelf options (Animals, Space, Cooking) that change the robot's response with typewriter animation
  - [x] 6.4 Implement Context sub-section: draggable context cards ("It's sunny", "It's raining", "It's snowing", "I'm going to a party") that update the robot's answer to "What should I wear?"
  - [x] 6.5 Implement Prompts sub-section: three prompt style buttons (scientist, storyteller, comedian) that change both the robot's appearance and response text
  - [x] 6.6 Add visual transitions between sub-sections and robot costume changes (lab coat, wizard hat, clown nose) as inline SVG modifications
- [x] 7. Interactive Elements and Module Styles
  - [x] 7.1 Create `css/modules.css` with layout styles for all module sections (grid layouts, card styles, split-screen layouts)
  - [x] 7.2 Create `css/interactions.css` with styles for draggable elements, drop zones, buttons, match cards, and hover/active states
  - [x] 7.3 Implement drag-and-drop utility functions shared across modules (Training and Context use drag-and-drop) in a shared JS utility
  - [x] 7.4 Add positive feedback system: reusable functions for star burst, confetti particles, and encouraging text display
  - [x] 7.5 Add gentle error feedback: shake animation and friendly retry messages ("Almost! Try another one!")
- [x] 8. Polish and Classroom Optimization
  - [x] 8.1 Optimize all layouts for 1920x1080 projector display as primary viewport with 1366x768 laptop as secondary
  - [x] 8.2 Verify all text meets minimum 18px body size and 4.5:1 contrast ratio against backgrounds
  - [x] 8.3 Add optional sound toggle in navigation bar (muted by default) for click and success sound effects
  - [x] 8.4 Test all module transitions, interactive elements, and animations work smoothly in sequence
  - [x] 8.5 Ensure the website loads and functions fully offline with no external dependencies (inline all fonts, use system font fallbacks)

## Notes

- All AI responses are pre-scripted (no external API calls)
- No typing required from children — all interactions are click or drag-and-drop
- Primary viewport target is 1920x1080 classroom projector
- Must work fully offline with no external dependencies
