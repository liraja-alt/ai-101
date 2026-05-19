// Knowledge/Context/Prompts Logic

/**
 * CustomizationModule class
 * Manages the three sub-sections: Knowledge Bases, Context, and Prompts.
 * Handles tab switching, typewriter animation, drag-and-drop context,
 * and robot costume changes.
 */
class CustomizationModule {
  constructor() {
    this.currentSubSection = 'knowledge';
    this.selectedKnowledge = null;
    this.selectedContexts = [];
    this.selectedPromptStyle = null;
    this.typewriterTimeout = null;
    this.completedSections = new Set();

    // Pre-scripted responses
    this.knowledgeResponses = {
      school: "Remember: always walk in the hallways, raise your hand before speaking, and be kind to everyone! Your school's rule #1 is: respect others. 🏫",
      dinosaurs: "The T-Rex had teeth as big as bananas! And the Brachiosaurus was taller than a 4-story building. The fastest dinosaur could run 60 km/h! 🦕",
      mtg: "A great beginner tip: always keep lands balanced in your deck — about 24 lands for a 60-card deck. And remember, instant spells can be played on your opponent's turn to surprise them! 🃏"
    };

    this.contextResponses = {
      sunny: "Hmm, maybe something light? I'm not sure what exactly... 😅",
      raining: "You might need something waterproof... I think? 🤔",
      snowing: "Something warm probably? I'm not totally sure... 🤔",
      party: "Something nice maybe? I don't know what kind of event it is... 🤔"
    };

    this.contextCombinations = {
      // 2 clues — more specific
      'party,sunny': "A light party outfit with sunglasses! Since it's sunny and you're going out, a dress or nice shorts would work! ☀️🎉",
      'party,raining': "Your party clothes with a raincoat on top and waterproof shoes! You'll stay dry and look great! 🌧️🎉",
      'party,snowing': "Your warm coat over your party clothes, plus boots! You'll be cozy getting there and fancy once inside! ❄️🎉",
      'raining,sunny': "A t-shirt with a light rain jacket — it might be a sun shower! Bring sunglasses too! ☀️🌧️",
      'snowing,sunny': "A warm coat but with sunglasses — the sun on snow is super bright! 😎❄️",
      'raining,snowing': "Waterproof boots and your warmest coat — it's cold and wet out there! 🌧️❄️",
      // 3 clues — very specific
      'party,raining,sunny': "A nice outfit with a light waterproof jacket and sunglasses in your pocket — the weather is tricky but you'll be ready for anything at the party! ☀️🌧️🎉",
      'party,snowing,sunny': "Your fanciest warm outfit with sunglasses — the snow will sparkle in the sun and you'll look amazing at the party! ☀️❄️🎉",
      'party,raining,snowing': "Waterproof boots, your warmest fancy coat, and an umbrella — you'll arrive at the party dry, warm, and looking great! 🌧️❄️🎉",
      'raining,snowing,sunny': "Wow, wild weather! Wear layers: waterproof coat, warm sweater, and keep sunglasses handy. Be ready for everything! ☀️🌧️❄️",
      // 4 clues — maximum precision
      'party,raining,snowing,sunny': "What crazy weather! Here's the perfect plan: waterproof boots, warm coat, party outfit underneath, sunglasses in your pocket, and an umbrella. You're prepared for absolutely everything AND you'll look fantastic at the party! ☀️🌧️❄️🎉"
    };

    this.promptResponses = {
      scientist: {
        costume: 'lab-coat',
        response: "Dogs (Canis lupus familiaris) are mammals domesticated 15,000 years ago. They have 42 teeth and can smell 10,000 times better than humans! 🔬"
      },
      storyteller: {
        costume: 'wizard-hat',
        response: "Once upon a time, a friendly dog named Max went on an adventure through the enchanted forest, wagging his tail with joy... 📖✨"
      },
      comedian: {
        costume: 'clown-nose',
        response: "Why do dogs wag their tails? Because no one else will wag it for them! 🐕😂"
      }
    };

    this.init();
  }

  init() {
    this.bindTabs();
    this.bindKnowledge();
    this.bindContext();
    this.bindPrompts();
  }

  // --- Tab Switching ---

  bindTabs() {
    const tabs = document.querySelectorAll('.custom-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetTab = tab.getAttribute('data-tab');
        this.switchTab(targetTab);
      });
    });
  }

  switchTab(tabName) {
    if (this.currentSubSection === tabName) return;

    // Update tab buttons
    const tabs = document.querySelectorAll('.custom-tab');
    tabs.forEach(tab => {
      const isActive = tab.getAttribute('data-tab') === tabName;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    // Hide current sub-section with transition
    const currentSection = document.querySelector(`.sub-section[data-section="${this.currentSubSection}"]`);
    const nextSection = document.querySelector(`.sub-section[data-section="${tabName}"]`);

    if (currentSection) {
      currentSection.classList.remove('active');
    }

    if (nextSection) {
      // Trigger reflow for animation
      void nextSection.offsetWidth;
      nextSection.classList.add('active');
    }

    // Clear response and reset robot costume
    this.clearResponse();
    this.clearCostume();

    this.currentSubSection = tabName;
  }

  // --- Typewriter Effect ---

  typewriterEffect(text, callback) {
    // Clear any existing typewriter animation
    if (this.typewriterTimeout) {
      clearTimeout(this.typewriterTimeout);
    }

    const responseEl = document.querySelector('.custom-response .response-text');
    const cursorEl = document.querySelector('.custom-response .typewriter-cursor');
    if (!responseEl) return;

    responseEl.textContent = '';
    if (cursorEl) cursorEl.style.display = 'inline';

    let index = 0;
    const type = () => {
      if (index < text.length) {
        responseEl.textContent += text[index];
        index++;
        this.typewriterTimeout = setTimeout(type, 30);
      } else {
        // Hide cursor when done
        if (cursorEl) cursorEl.style.display = 'none';
        if (callback) callback();
      }
    };

    type();
  }

  clearResponse() {
    if (this.typewriterTimeout) {
      clearTimeout(this.typewriterTimeout);
      this.typewriterTimeout = null;
    }
    const responseEl = document.querySelector('.custom-response .response-text');
    const cursorEl = document.querySelector('.custom-response .typewriter-cursor');
    if (responseEl) responseEl.textContent = '';
    if (cursorEl) cursorEl.style.display = 'none';
  }

  // --- Robot Costume ---

  clearCostume() {
    const overlays = document.querySelectorAll('.costume-overlay');
    overlays.forEach(overlay => {
      overlay.style.display = 'none';
      overlay.setAttribute('aria-hidden', 'true');
    });
  }

  setCostume(costumeType) {
    this.clearCostume();
    const overlay = document.querySelector(`.costume-${costumeType}`);
    if (overlay) {
      overlay.style.display = 'block';
      overlay.setAttribute('aria-hidden', 'false');
      // Add a bounce animation to the robot
      const robot = document.querySelector('.custom-robot');
      if (robot) {
        robot.classList.add('animate-bounce');
        setTimeout(() => robot.classList.remove('animate-bounce'), 300);
      }
    }
  }

  // --- Knowledge Bases ---

  bindKnowledge() {
    const buttons = document.querySelectorAll('.bookshelf-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const knowledge = btn.getAttribute('data-knowledge');
        this.selectKnowledge(knowledge);

        // Update active state
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }

  selectKnowledge(knowledge) {
    this.selectedKnowledge = knowledge;
    const response = this.knowledgeResponses[knowledge];
    if (response) {
      if (typeof playClickSound === 'function') playClickSound();
      this.typewriterEffect(response, () => {
        this.markSectionComplete('knowledge');
      });
    }
  }

  // --- Context (Drag and Drop) ---

  bindContext() {
    const cards = document.querySelectorAll('.context-card');
    const dropZone = document.querySelector('.context-drop');

    cards.forEach(card => {
      card.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', card.getAttribute('data-context'));
        card.classList.add('dragging');
      });

      card.addEventListener('dragend', () => {
        card.classList.remove('dragging');
      });

      // Touch support for mobile/tablet
      card.addEventListener('click', () => {
        const context = card.getAttribute('data-context');
        this.addContext(context, card);
      });
    });

    if (dropZone) {
      dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
      });

      dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('drag-over');
      });

      dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        const context = e.dataTransfer.getData('text/plain');
        const card = document.querySelector(`.context-card[data-context="${context}"]`);
        this.addContext(context, card);
      });
    }
  }

  addContext(context, card) {
    if (this.selectedContexts.includes(context)) return;

    this.selectedContexts.push(context);

    // Play click sound
    if (typeof playClickSound === 'function') playClickSound();

    // Visual feedback on the card
    if (card) {
      card.classList.add('context-used');
      card.setAttribute('draggable', 'false');
    }

    // Update drop zone text
    const dropText = document.querySelector('.context-drop__text');
    if (dropText) {
      dropText.textContent = this.selectedContexts.length + ' clue(s) added!';
    }

    // Generate response based on contexts
    this.updateContextResponse();
  }

  updateContextResponse() {
    const contexts = this.selectedContexts.slice().sort();
    let response = '';

    // Try the full combination first (most specific), then fall back to fewer clues
    const fullKey = contexts.join(',');
    if (this.contextCombinations[fullKey]) {
      response = this.contextCombinations[fullKey];
    } else if (contexts.length >= 2) {
      // Try pairs from the end (most recently added context matters)
      const pairKey = contexts.slice(-2).sort().join(',');
      if (this.contextCombinations[pairKey]) {
        response = this.contextCombinations[pairKey];
      } else {
        response = this.contextResponses[contexts[contexts.length - 1]];
      }
    } else if (contexts.length === 1) {
      response = this.contextResponses[contexts[0]];
    }

    // Add a hint about accuracy based on number of clues
    let prefix = '';
    if (contexts.length === 1) {
      prefix = "🟡 With just 1 clue, I can only guess... ";
    } else if (contexts.length === 2) {
      prefix = "🟠 With 2 clues, I'm more confident! ";
    } else if (contexts.length === 3) {
      prefix = "🟢 With 3 clues, I'm very specific! ";
    } else if (contexts.length >= 4) {
      prefix = "⭐ With all the clues, I know exactly! ";
    }

    if (response) {
      this.typewriterEffect(prefix + response, () => {
        this.markSectionComplete('context');
      });
    }
  }

  // --- Prompts ---

  bindPrompts() {
    const buttons = document.querySelectorAll('.prompt-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const promptStyle = btn.getAttribute('data-prompt');
        this.selectPromptStyle(promptStyle);

        // Update active state
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }

  selectPromptStyle(style) {
    this.selectedPromptStyle = style;
    const data = this.promptResponses[style];
    if (data) {
      if (typeof playClickSound === 'function') playClickSound();
      // Change robot costume
      this.setCostume(data.costume);
      // Show response with typewriter
      this.typewriterEffect(data.response, () => {
        this.markSectionComplete('prompts');
      });
    }
  }

  // --- Progress Tracking ---

  markSectionComplete(section) {
    if (!this.completedSections.has(section)) {
      this.completedSections.add(section);
      if (typeof markModuleProgress === 'function') {
        markModuleProgress('customization', section);
      }
    }
  }

  /**
   * Reset the customization module to its initial state so it can be replayed.
   */
  reset() {
    // Reset state
    this.selectedKnowledge = null;
    this.selectedContexts = [];
    this.selectedPromptStyle = null;
    this.completedSections = new Set();

    // Clear response
    this.clearResponse();
    this.clearCostume();

    // Reset knowledge buttons
    document.querySelectorAll('.bookshelf-btn').forEach(btn => btn.classList.remove('active'));

    // Reset context cards
    document.querySelectorAll('.context-card').forEach(card => {
      card.classList.remove('context-used', 'dragging');
      card.setAttribute('draggable', 'true');
    });
    const dropText = document.querySelector('.context-drop__text');
    if (dropText) dropText.textContent = 'Drop clues here!';

    // Reset prompt buttons
    document.querySelectorAll('.prompt-btn').forEach(btn => btn.classList.remove('active'));

    // Hide all sub-sections, then show knowledge
    document.querySelectorAll('.sub-section').forEach(s => s.classList.remove('active'));
    const knowledgeSection = document.querySelector('.sub-section[data-section="knowledge"]');
    if (knowledgeSection) knowledgeSection.classList.add('active');

    // Reset tabs
    document.querySelectorAll('.custom-tab').forEach(tab => {
      const isKnowledge = tab.getAttribute('data-tab') === 'knowledge';
      tab.classList.toggle('active', isKnowledge);
      tab.setAttribute('aria-pressed', isKnowledge ? 'true' : 'false');
    });

    this.currentSubSection = 'knowledge';
  }
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
  window.customizationModule = new CustomizationModule();
});
