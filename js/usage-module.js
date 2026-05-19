// AI Usage Matching Game Logic

/**
 * MatchingGame class implements click-to-match pairing logic
 * for the AI Usage module. Users click an app card, then click
 * a description card to form a pair.
 */
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
    this.selectedApp = null;
    this.feedbackEl = null;
    this.encouragements = [
      'Almost! Try another one! 🌟',
      'Good thinking! Try again! 💪',
      'So close! Give it another shot! ✨',
      'Not quite — you got this! 🎯',
      'Keep trying, you\'re doing great! 🌈'
    ];
    this.encouragementIndex = 0;
  }

  /**
   * Initialize the matching game by binding event listeners.
   */
  init() {
    this.feedbackEl = document.querySelector('.matching-feedback');
    const appCards = document.querySelectorAll('.match-card--app');
    const descCards = document.querySelectorAll('.match-card--desc');

    appCards.forEach(card => {
      card.addEventListener('click', () => this.selectApp(card));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.selectApp(card);
        }
      });
    });

    descCards.forEach(card => {
      card.addEventListener('click', () => this.selectDesc(card));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.selectDesc(card);
        }
      });
    });
  }

  /**
   * Handle clicking an app card (left column).
   * Selects it visually and stores the reference.
   */
  selectApp(card) {
    const pair = card.getAttribute('data-pair');

    // Don't allow selecting already matched cards
    if (this.matched.has(pair)) return;

    // Deselect previous selection
    if (this.selectedApp) {
      this.selectedApp.classList.remove('selected');
    }

    // Select this card
    this.selectedApp = card;
    card.classList.add('selected');
  }

  /**
   * Handle clicking a description card (right column).
   * Checks if it matches the currently selected app card.
   */
  selectDesc(card) {
    const descPair = card.getAttribute('data-pair');

    // Don't allow selecting already matched cards
    if (this.matched.has(descPair)) return;

    // Must have an app selected first
    if (!this.selectedApp) {
      this.showFeedback('Pick an app on the left first! 👈');
      return;
    }

    const appPair = this.selectedApp.getAttribute('data-pair');

    if (appPair === descPair) {
      this.handleCorrectMatch(this.selectedApp, card, appPair);
    } else {
      this.handleIncorrectMatch(this.selectedApp, card);
    }
  }

  /**
   * Handle a correct match: green background, star animation, increment count.
   */
  handleCorrectMatch(appCard, descCard, pairId) {
    this.matched.add(pairId);

    // Play click sound for match
    if (typeof playClickSound === 'function') {
      playClickSound();
    }

    // Add matched class (green background)
    appCard.classList.remove('selected');
    appCard.classList.add('matched');
    descCard.classList.add('matched');

    // Star animation on both cards
    this.showStarAnimation(appCard);
    this.showStarAnimation(descCard);

    // Clear selection
    this.selectedApp = null;

    // Show positive feedback
    this.showFeedback('Great match! ⭐');

    // Check if all pairs are matched
    if (this.matched.size === this.pairs.length) {
      setTimeout(() => this.celebrate(), 600);
    }
  }

  /**
   * Handle an incorrect match: shake animation and encouraging text.
   */
  handleIncorrectMatch(appCard, descCard) {
    // Add shake animation to both cards
    appCard.classList.add('animate-shake');
    descCard.classList.add('animate-shake');

    // Remove shake after animation completes
    setTimeout(() => {
      appCard.classList.remove('animate-shake');
      descCard.classList.remove('animate-shake');
    }, 400);

    // Deselect app card
    appCard.classList.remove('selected');
    this.selectedApp = null;

    // Show encouraging text
    const message = this.encouragements[this.encouragementIndex % this.encouragements.length];
    this.encouragementIndex++;
    this.showFeedback(message);
  }

  /**
   * Display feedback text in the feedback area.
   */
  showFeedback(message) {
    if (!this.feedbackEl) return;
    this.feedbackEl.textContent = message;
    this.feedbackEl.classList.remove('animate-fade-in');
    // Force reflow to restart animation
    void this.feedbackEl.offsetWidth;
    this.feedbackEl.classList.add('animate-fade-in');
  }

  /**
   * Show a star animation on a card element.
   */
  showStarAnimation(card) {
    const star = document.createElement('span');
    star.className = 'match-star animate-star-burst';
    star.textContent = '⭐';
    card.appendChild(star);

    // Remove star element after animation
    setTimeout(() => {
      if (star.parentNode) {
        star.parentNode.removeChild(star);
      }
    }, 600);
  }

  /**
   * Trigger celebration when all pairs are matched.
   * Confetti + star burst effect.
   */
  celebrate() {
    this.showFeedback('Amazing! You matched them all! 🎉🌟');

    // Play success sound
    if (typeof playSuccessSound === 'function') {
      playSuccessSound();
    }

    // Mark module progress
    if (typeof markModuleProgress === 'function') {
      markModuleProgress('usage', 'matching-game');
    }

    // Create confetti particles
    this.createConfetti();

    // Create star burst in the center
    this.createStarBurst();
  }

  /**
   * Create confetti particles across the usage section.
   */
  createConfetti() {
    const container = document.querySelector('#usage .module-content');
    if (!container) return;

    const colors = ['#4A90D9', '#7B68EE', '#FF8C42', '#4CAF50', '#FF6B9D', '#FFD700'];

    for (let i = 0; i < 40; i++) {
      const particle = document.createElement('div');
      particle.className = 'confetti-particle animate-confetti';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.animationDelay = Math.random() * 0.5 + 's';
      particle.style.animationDuration = (1.5 + Math.random()) + 's';
      container.appendChild(particle);

      // Clean up after animation
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 3000);
    }
  }

  /**
   * Create a star burst effect in the matching area.
   */
  createStarBurst() {
    const matchingArea = document.querySelector('.usage-matching');
    if (!matchingArea) return;

    const stars = ['⭐', '🌟', '✨', '💫'];

    for (let i = 0; i < 8; i++) {
      const star = document.createElement('span');
      star.className = 'celebration-star animate-star-burst';
      star.textContent = stars[Math.floor(Math.random() * stars.length)];
      star.style.position = 'absolute';
      star.style.left = (20 + Math.random() * 60) + '%';
      star.style.top = (20 + Math.random() * 60) + '%';
      star.style.fontSize = (1.5 + Math.random() * 1.5) + 'rem';
      star.style.animationDelay = (Math.random() * 0.3) + 's';
      matchingArea.appendChild(star);

      // Clean up after animation
      setTimeout(() => {
        if (star.parentNode) {
          star.parentNode.removeChild(star);
        }
      }, 1000);
    }
  }

  /**
   * Reset the matching game to its initial state so it can be replayed.
   */
  reset() {
    this.matched = new Set();
    this.selectedApp = null;
    this.encouragementIndex = 0;

    // Reset all cards
    const allCards = document.querySelectorAll('.match-card');
    allCards.forEach(card => {
      card.classList.remove('matched', 'selected');
      card.style.pointerEvents = '';
    });

    // Clear feedback
    if (this.feedbackEl) {
      this.feedbackEl.textContent = '';
    }
  }
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
  window.matchingGame = new MatchingGame();
  window.matchingGame.init();
});
