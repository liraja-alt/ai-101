# AI 101 — How Does AI Work?

An interactive educational website that teaches 8-9 year old children how AI works. Designed as a classroom teaching tool for a parent visit presentation.

🌐 **Live site:** https://liraja-alt.github.io/ai-101/

## What it covers

The website has four interactive modules:

1. **How AI Learns** — Kids drag different images (cats, dogs, cars, flowers) into a robot's "brain" and watch its confidence grow. Teaches that AI needs many varied examples to learn.

2. **Super Computers** — A race between 1 computer and 8 computers sorting cards. Visually demonstrates why parallel computing makes AI training faster.

3. **AI All Around Us** — A matching game pairing AI applications (voice assistants, photo filters, translation, etc.) with what they do. Shows AI is already in everyday life.

4. **Make AI Your Own** — Three sub-sections teaching customization:
   - **Knowledge Bases** — Give the robot a specialized book (school rules, dinosaurs, Magic the Gathering) and it becomes an expert on that topic
   - **Context** — Add clues about the situation and the robot's answer changes accordingly
   - **Prompts** — Ask the same question in different styles (scientist, storyteller, comedian) and get different responses

## Features

- Fully offline — no external dependencies, no API calls, no CDN
- Optimized for 1920×1080 classroom projector display
- All interactions are click or drag-and-drop (no typing required)
- Positive feedback only — celebrations for success, gentle encouragement for mistakes
- Reset buttons on every module for repeated use
- Optional sound effects (muted by default)
- Accessible: 4.5:1 contrast, focus indicators, aria labels, reduced-motion support

## How to use

Just open `index.html` in any modern browser. No server, no build step, no installation needed.

For classroom use:
1. Connect your laptop to the projector
2. Open the website in full-screen mode (F11)
3. Navigate through modules using the bottom bar or the landing page cards
4. Let kids interact with the activities, use the reset button to repeat

## Tech stack

- HTML5
- CSS3 (custom properties, animations, responsive design)
- Vanilla JavaScript (ES6+)
- Inline SVG illustrations

Zero dependencies. Zero build tools. Works forever.
