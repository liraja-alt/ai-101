# Design Document

## Introduction

This document describes the technical design for the AI Education Website — an interactive, single-page web application that teaches 8-9 year old children how AI works. The website is designed to be presented in a classroom setting by a parent visitor and covers four main topics: AI training, computing resources, AI usage, and AI customization (knowledge bases, context, prompts).

## Architecture Overview

The website will be built as a static single-page application (SPA) using vanilla HTML, CSS, and JavaScript. No backend server is required since all interactions are simulated client-side. This ensures:
- Zero deployment complexity (can be opened directly from a file or served from any static host)
- No authentication or accounts needed
- Works offline once loaded
- Instant response to all interactions

### Technology Stack

| Component | Technology | Rationale |
|-----------|-----------|-----------|
| Structure | HTML5 | Semantic, accessible, no build step |
| Styling | CSS3 with CSS Custom Properties | Animations, responsive design, theming |
| Interactivity | Vanilla JavaScript (ES6+) | No framework overhead, simple to maintain |
| Animations | CSS Animations + JavaScript | Smooth transitions, visual feedback |
| Icons/Illustrations | Inline SVG + CSS | Scalable, colorful, no external dependencies |

### File Structure

```
/
├── index.html              # Main entry point with all sections
├── css/
│   ├── styles.css          # Global styles, variables, typography
│   ├── navigation.css      # Navigation and progress bar styles
│   ├── modules.css         # Module-specific layouts
│   ├── interactions.css    # Interactive element styles
│   └── animations.css      # Keyframe animations and transitions
├── js/
│   ├── app.js              # Main application controller
│   ├── navigation.js       # Navigation and progress tracking
│   ├── training-module.js  # AI Training interactive logic
│   ├── resources-module.js # Computing Resources interactive logic
│   ├── usage-module.js     # AI Usage matching game logic
│   └── customization-module.js # Knowledge/Context/Prompts logic
└── assets/
    └── (inline SVGs used directly in HTML)
```

## Design Details

### Component 1: Landing Page and Navigation System

**Purpose:** Provide a welcoming entry point and allow the Presenter to navigate between modules.

**Design:**
- Full-screen landing page with a friendly title ("How Does AI Work?") and animated mascot character (a friendly robot drawn in SVG)
- Four large, colorful cards representing each module, each with an icon and short description
- Fixed bottom navigation bar with module icons and a progress indicator (filled circles for visited, empty for unvisited)
- Smooth slide transitions between modules using CSS transforms

**Navigation State Management:**
```javascript
const appState = {
  currentModule: 'landing', // 'landing' | 'training' | 'resources' | 'usage' | 'customization'
  visitedModules: new Set(),
  moduleProgress: {} // tracks completion of interactive elements per module
};
```

**Transitions:** CSS `transform: translateX()` with `transition: transform 0.5s ease-in-out` for smooth page slides.

### Component 2: AI Training Module

**Purpose:** Teach children how AI learns from examples using an interactive "feed the AI" exercise.

**Visual Metaphor:** A friendly robot character that starts confused and gradually becomes smarter as it receives more examples. Similar to teaching a puppy to recognize toys.

**Interactive Element — "Teach the Robot":**
1. Display a grid of simple images (cats, dogs, cars, flowers) as draggable cards
2. Learner drags images into a "training bucket" (the robot's "brain")
3. After each batch of images, the robot attempts to classify a new image
4. Visual progress bar shows the robot's "confidence" growing from 0% to 100%
5. After enough examples (~5-8 drags), the robot correctly identifies new images

**Implementation:**
```javascript
class TrainingSimulation {
  constructor() {
    this.examplesProvided = 0;
    this.confidenceLevel = 0;
    this.targetConfidence = 100;
  }
  
  addExample(category) {
    this.examplesProvided++;
    this.confidenceLevel = Math.min(100, this.examplesProvided * 15);
    this.updateVisuals();
  }
  
  updateVisuals() {
    // Update robot expression (confused → thinking → happy)
    // Update confidence bar
    // Trigger celebration animation at 100%
  }
}
```

**Visual States:**
- 0-30% confidence: Robot looks confused (question marks above head)
- 30-70% confidence: Robot looks thoughtful (thinking bubble)
- 70-100% confidence: Robot looks happy (stars and sparkles)

### Component 3: Computing Resources Module

**Purpose:** Explain why AI needs many powerful computers working together.

**Visual Metaphor:** Comparing AI training to reading all the books in a giant library. One person would take years, but many people reading together finish much faster.

**Interactive Element — "Speed Race":**
1. Display a visual task: "Sort 1000 pictures" represented as a pile of cards
2. Two lanes: "1 Computer" vs "Many Computers" (represented as friendly robot workers)
3. Learner clicks a "Start" button to begin the race
4. Single computer lane processes cards slowly (one at a time)
5. Many computers lane processes cards in parallel (groups at a time)
6. Visual counter shows progress and time difference
7. Clear conclusion text: "Many computers working together = faster AI training!"

**Implementation:**
```javascript
class ResourcesRace {
  constructor() {
    this.singleProgress = 0;
    this.parallelProgress = 0;
    this.totalCards = 100; // visual representation
    this.singleSpeed = 1;
    this.parallelSpeed = 8;
  }
  
  startRace() {
    this.raceInterval = setInterval(() => {
      this.singleProgress = Math.min(this.totalCards, this.singleProgress + this.singleSpeed);
      this.parallelProgress = Math.min(this.totalCards, this.parallelProgress + this.parallelSpeed);
      this.render();
      if (this.parallelProgress >= this.totalCards) {
        this.showConclusion();
      }
    }, 100);
  }
}
```

**Visual Design:**
- Animated conveyor belt metaphor with cards moving through
- Robot workers with hard hats for the "many computers" lane
- Celebration confetti when the parallel lane finishes

### Component 4: AI Usage Module

**Purpose:** Show real-world AI applications that children already encounter.

**Examples to include:**
1. Voice assistants (Siri, Alexa) — "AI that listens and talks"
2. Photo filters (Snapchat, Instagram) — "AI that sees faces"
3. Recommendations (YouTube, Netflix) — "AI that suggests videos"
4. Translation (Google Translate) — "AI that speaks many languages"
5. Autocorrect — "AI that helps you spell"

**Interactive Element — "Match the AI":**
1. Left column: AI application icons (microphone, camera, TV, globe, keyboard)
2. Right column: Descriptions of what they do (shuffled)
3. Learner drags or clicks to match pairs
4. Correct matches light up green with a star animation
5. Incorrect matches gently bounce back with encouraging text ("Try again!")
6. All matches complete triggers a celebration

**Implementation:**
```javascript
class MatchingGame {
  constructor() {
    this.pairs = [
      { app: 'Voice Assistant', icon: '🎤', description: 'Listens to your voice and answers questions' },
      { app: 'Photo Filters', icon: '📸', description: 'Finds your face and adds fun effects' },
      { app: 'Recommendations', icon: '📺', description: 'Suggests videos you might like' },
      { app: 'Translation', icon: '🌍', description: 'Changes words from one language to another' },
      { app: 'Autocorrect', icon: '⌨️', description: 'Fixes spelling mistakes as you type' }
    ];
    this.matched = new Set();
  }
  
  checkMatch(appIndex, descIndex) {
    if (appIndex === descIndex) {
      this.matched.add(appIndex);
      this.showSuccess(appIndex);
      if (this.matched.size === this.pairs.length) this.celebrate();
    } else {
      this.showEncouragement();
    }
  }
}
```

**Training vs Usage comparison:** A simple split-screen visual showing:
- Left: "Training AI" — slow clock, many computers, lots of data (like studying for years)
- Right: "Using AI" — fast lightning bolt, one phone, instant answer (like answering a question after studying)

### Component 5: AI Customization Module

**Purpose:** Teach how AI can be tuned using knowledge bases, context, and prompts.

**Sub-section 5a: Knowledge Bases**

**Visual Metaphor:** A bookshelf where you pick which books the robot reads before answering questions.

**Interactive Element — "Choose the Robot's Books":**
1. Display 3 bookshelves: "Animals", "Space", "Cooking"
2. A question is displayed: "Tell me something interesting!"
3. Learner clicks a bookshelf to "give" those books to the robot
4. Robot's answer changes based on selected bookshelf:
   - Animals: "Did you know octopuses have three hearts?"
   - Space: "Jupiter is so big that 1,300 Earths could fit inside it!"
   - Cooking: "You can make a cake with just 3 ingredients!"

**Sub-section 5b: Context**

**Visual Metaphor:** Giving the robot a "cheat sheet" with background information before asking a question.

**Interactive Element — "Give the Robot Clues":**
1. Display a question: "What should I wear today?"
2. Context cards available: "It's sunny", "It's raining", "It's snowing", "I'm going to a party"
3. Learner drags context cards into the robot's "clue box"
4. Robot's answer updates immediately based on provided context:
   - Sunny: "Wear sunglasses and a t-shirt!"
   - Raining: "Don't forget your raincoat and boots!"
   - Snowing + Party: "Wear your warm coat over your party clothes!"

**Sub-section 5c: Prompts**

**Visual Metaphor:** Asking the same question in different ways to get different types of answers.

**Interactive Element — "Ask Differently":**
1. Topic displayed: "Tell me about dogs"
2. Three prompt style buttons:
   - "Like a scientist" → "Dogs (Canis lupus familiaris) are mammals that were domesticated 15,000 years ago..."
   - "Like a storyteller" → "Once upon a time, a friendly dog named Max went on an adventure..."
   - "Like a comedian" → "Why do dogs wag their tails? Because no one else will wag it for them! 🐕"
3. Robot character changes appearance to match the style (lab coat, wizard hat, clown nose)
4. Response text appears with a typewriter animation

**Implementation:**
```javascript
class CustomizationModule {
  constructor() {
    this.currentSubSection = 'knowledge'; // 'knowledge' | 'context' | 'prompts'
    this.selectedKnowledge = null;
    this.selectedContext = [];
    this.selectedPromptStyle = null;
  }
  
  // Knowledge base responses
  knowledgeResponses = {
    animals: "Did you know octopuses have three hearts? 🐙",
    space: "Jupiter is so big that 1,300 Earths could fit inside! 🪐",
    cooking: "You can make a cake with just 3 ingredients! 🎂"
  };
  
  // Context-dependent responses
  getContextResponse(contexts) {
    // Combines context cards to generate appropriate response
    // Uses predefined response map for combinations
  }
  
  // Prompt style responses
  promptResponses = {
    scientist: { avatar: 'lab-coat', response: '...' },
    storyteller: { avatar: 'wizard-hat', response: '...' },
    comedian: { avatar: 'clown-nose', response: '...' }
  };
}
```

### Component 6: Visual Design System

**Color Palette:**
```css
:root {
  --primary-blue: #4A90D9;
  --secondary-purple: #7B68EE;
  --accent-orange: #FF8C42;
  --accent-green: #4CAF50;
  --accent-pink: #FF6B9D;
  --background-light: #F8F9FF;
  --text-dark: #2D3436;
  --text-light: #FFFFFF;
  --success-green: #66BB6A;
  --card-shadow: 0 4px 15px rgba(0,0,0,0.1);
}
```

**Typography:**
```css
body {
  font-family: 'Nunito', 'Comic Neue', sans-serif;
  font-size: 20px; /* Base size for readability on projector */
  line-height: 1.6;
}

h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }
.interactive-text { font-size: 1.3rem; }
```

**Responsive Breakpoints:**
- Primary target: 1920x1080 (classroom projector)
- Secondary: 1366x768 (laptop screen)
- Minimum: 1024x768

### Component 7: Animation and Feedback System

**Positive Feedback Animations:**
- Star burst: CSS keyframe animation with scaling stars
- Confetti: JavaScript-generated colored particles
- Robot celebration: SVG robot does a happy dance
- Sound effects: Optional click/success sounds (muted by default, Presenter can enable)

**Transition Animations:**
- Module transitions: Horizontal slide (500ms ease-in-out)
- Element appearances: Fade-in with slight upward movement (300ms)
- Interactive responses: Scale bounce (200ms)

**Encouraging Feedback for Incorrect Answers:**
- Gentle shake animation (not aggressive)
- Friendly text: "Almost! Try another one!" / "Good thinking! Try again!"
- No negative sounds or red colors for wrong answers

## Acceptance Criteria Mapping

| Requirement | Acceptance Criteria | Design Component |
|-------------|-------------------|-----------------|
| Req 1 (Navigation) | AC 1-4 | Component 1: Landing Page and Navigation |
| Req 2 (Training) | AC 1-5 | Component 2: Training Module |
| Req 3 (Resources) | AC 1-5 | Component 3: Resources Module |
| Req 4 (Usage) | AC 1-5 | Component 4: Usage Module |
| Req 5 (Knowledge) | AC 1-4 | Component 5a: Knowledge Bases |
| Req 6 (Context) | AC 1-4 | Component 5b: Context |
| Req 7 (Prompts) | AC 1-5 | Component 5c: Prompts |
| Req 8 (Visual) | AC 1-6 | Component 6: Visual Design System |
| Req 9 (Interactivity) | AC 1-5 | Component 7: Animation and Feedback |

## Constraints and Decisions

1. **No build tools required** — The website uses vanilla HTML/CSS/JS to minimize setup complexity and allow the Presenter to simply open the file in a browser
2. **No external API calls** — All AI responses are pre-scripted to ensure reliability during the classroom presentation and avoid network dependency
3. **No typing required from children** — All interactions are click-based or drag-and-drop to accommodate varying literacy levels
4. **Offline-capable** — All assets are bundled; no CDN dependencies for fonts or icons (use system fonts with web-safe fallbacks)
5. **Single HTML entry point** — While CSS and JS are in separate files for maintainability, the app can also be bundled into a single HTML file for easy distribution
6. **No framework dependencies** — Vanilla JS keeps the codebase simple, fast-loading, and free from version conflicts
7. **Presentation-optimized** — Designed for 1920x1080 projector display as the primary viewport
