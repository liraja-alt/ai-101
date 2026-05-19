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
      sunny: "Wear sunglasses and a t-shirt! 😎",
      raining: "Don't forget your raincoat and boots! 🌂",
      snowing: "Wear your warmest coat and a woolly hat! 🧣",
      party: "Put on your fanciest outfit! 👗"
    };

    this.contextCombinations = {
      'sunny,party': "Wear your party outfit with sunglasses! ☀️🎉",
      'raining,party': "Bring an umbrella over your party clothes! 🌧️🎉",
      'snowing,party': "Wear your warm coat over your party clothes! 🎉❄️",
      'sunny,raining': "Wear a t-shirt but bring an umbrella just in case! ☀️🌧️",
      'sunny,snowing': "It's confusing weather! Wear layers you can take off! ☀️❄️",
      'raining,snowing': "Wear waterproof boots and your warmest coat! 🌧️❄️"
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
      currentSection.style.display = 'none';
    }

    if (nextSection) {
      nextSection.style.display = '';
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
    const contexts = this.selectedContexts.sort();
    let response = '';

    // Check for combinations first (2 contexts)
    if (contexts.length >= 2) {
      // Try to find a combination match
      const key = contexts.slice(0, 2).join(',');
      if (this.contextCombinations[key]) {
        response = this.contextCombinations[key];
      } else {
        // Fallback: use the last added context
        response = this.contextResponses[contexts[contexts.length - 1]];
      }
    } else if (contexts.length === 1) {
      response = this.contextResponses[contexts[0]];
    }

    if (response) {
      this.typewriterEffect(response, () => {
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

    // Switch back to knowledge tab
    this.currentSubSection = '';
    this.switchTab('knowledge');
  }
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
  window.customizationModule = new CustomizationModule();
});
