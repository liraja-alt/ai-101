// AI Training Interactive Logic
// Implements drag-and-drop training simulation where children teach a robot by providing examples.

/**
 * Global celebration function triggered when confidence reaches 100%.
 * Creates a star burst effect around the robot and confetti particles
 * falling from the top of the training section.
 */
function celebrate() {
  var robotContainer = document.querySelector('.training-robot');
  var trainingSection = document.querySelector('#training .module-content');

  // --- Star Burst Effect ---
  var starCount = 6;
  var starChars = ['⭐', '✨', '⭐', '✨', '⭐', '✨'];

  for (var i = 0; i < starCount; i++) {
    var star = document.createElement('span');
    star.textContent = starChars[i % starChars.length];
    star.className = 'animate-star-burst';
    star.style.position = 'absolute';
    star.style.fontSize = (18 + Math.random() * 14) + 'px';
    star.style.top = (Math.random() * 100) + '%';
    star.style.left = (Math.random() * 100) + '%';
    star.style.pointerEvents = 'none';
    star.style.zIndex = '10';

    if (robotContainer) {
      robotContainer.appendChild(star);
    }

    // Remove star after animation completes (~600ms)
    (function (el) {
      setTimeout(function () {
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
      }, 650);
    })(star);
  }

  // --- Confetti Particles ---
  var confettiCount = 18;
  var colors = ['#FF8C42', '#7B68EE', '#4CAF50', '#FF6B9D', '#FFD700', '#4A90D9'];

  for (var j = 0; j < confettiCount; j++) {
    var particle = document.createElement('div');
    particle.className = 'animate-confetti';
    particle.style.position = 'absolute';
    particle.style.top = '0';
    particle.style.left = (Math.random() * 100) + '%';
    particle.style.width = (6 + Math.random() * 6) + 'px';
    particle.style.height = (6 + Math.random() * 6) + 'px';
    particle.style.backgroundColor = colors[j % colors.length];
    particle.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '10';
    particle.style.animationDelay = (Math.random() * 0.3) + 's';

    if (trainingSection) {
      trainingSection.style.position = 'relative';
      trainingSection.style.overflow = 'hidden';
      trainingSection.appendChild(particle);
    }

    // Remove particle after animation completes (~2s + delay)
    (function (el) {
      setTimeout(function () {
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
      }, 2500);
    })(particle);
  }
}

/**
 * TrainingSimulation class manages the drag-and-drop interaction
 * for the AI Training module. Children drag example images into
 * the robot's "brain" bucket to increase its confidence level.
 */
class TrainingSimulation {
  constructor() {
    this.examplesProvided = 0;
    this.confidenceLevel = 0;
    this.targetConfidence = 100;
    this.confidencePerExample = 15;
    this.currentRobotState = 'confused';
    this.draggedCard = null;

    this.cards = document.querySelectorAll('.training-card');
    this.bucket = document.querySelector('.training-bucket');
    this.confidenceFill = document.querySelector('.confidence-fill');
    this.confidenceValue = document.querySelector('.confidence-value');
    this.robotConfused = document.querySelector('.robot-confused');
    this.robotThinking = document.querySelector('.robot-thinking');
    this.robotHappy = document.querySelector('.robot-happy');
    this.explanation = document.querySelector('.training-explanation');

    this.setupDragAndDrop();
  }

  /**
   * Set up drag-and-drop event listeners on all training cards and the bucket.
   */
  setupDragAndDrop() {
    // Card drag events
    this.cards.forEach(function (card) {
      card.addEventListener('dragstart', this.handleDragStart.bind(this));
      card.addEventListener('dragend', this.handleDragEnd.bind(this));
    }.bind(this));

    // Bucket drop zone events
    if (this.bucket) {
      this.bucket.addEventListener('dragover', this.handleDragOver.bind(this));
      this.bucket.addEventListener('dragleave', this.handleDragLeave.bind(this));
      this.bucket.addEventListener('drop', this.handleDrop.bind(this));
    }
  }

  /**
   * Handle dragstart: store reference to dragged card and add visual class.
   * @param {DragEvent} e
   */
  handleDragStart(e) {
    this.draggedCard = e.currentTarget;
    this.draggedCard.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', e.currentTarget.dataset.category);
  }

  /**
   * Handle dragend: remove dragging class.
   * @param {DragEvent} e
   */
  handleDragEnd(e) {
    e.currentTarget.classList.remove('dragging');
  }

  /**
   * Handle dragover on bucket: allow drop and add highlight.
   * @param {DragEvent} e
   */
  handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    this.bucket.classList.add('highlight');
  }

  /**
   * Handle dragleave on bucket: remove highlight.
   * @param {DragEvent} e
   */
  handleDragLeave(e) {
    this.bucket.classList.remove('highlight');
  }

  /**
   * Handle drop on bucket: process the dropped card.
   * @param {DragEvent} e
   */
  handleDrop(e) {
    e.preventDefault();
    this.bucket.classList.remove('highlight');

    var category = e.dataTransfer.getData('text/plain');

    if (this.draggedCard && category) {
      this.addExample(category);
      this.fadeOutCard(this.draggedCard);
    }

    this.draggedCard = null;
  }

  /**
   * Process a new training example.
   * Increments count, updates confidence, and refreshes visuals.
   * @param {string} category - The category of the dropped card
   */
  addExample(category) {
    this.examplesProvided++;
    this.confidenceLevel = Math.min(100, this.examplesProvided * this.confidencePerExample);
    this.updateConfidenceBar();
    this.updateRobotState();
    this.updateExplanation();

    // Play click sound on each example added
    if (typeof playClickSound === 'function') {
      playClickSound();
    }

    if (this.confidenceLevel >= 100) {
      this.triggerCelebration();
    }
  }

  /**
   * Fade out and remove the dropped card from the grid.
   * @param {HTMLElement} card
   */
  fadeOutCard(card) {
    card.classList.add('fade-out');
    card.setAttribute('draggable', 'false');
    setTimeout(function () {
      card.style.visibility = 'hidden';
      card.style.pointerEvents = 'none';
    }, 400);
  }

  /**
   * Update the confidence bar width and percentage text.
   */
  updateConfidenceBar() {
    if (this.confidenceFill) {
      this.confidenceFill.style.width = this.confidenceLevel + '%';
    }
    if (this.confidenceValue) {
      this.confidenceValue.textContent = this.confidenceLevel + '%';
    }
  }

  /**
   * Update the robot's visual state based on confidence thresholds.
   * 0-30%: confused, 30-70%: thinking, 70-100%: happy
   * Adds animate-fade-in class when a new state becomes visible.
   */
  updateRobotState() {
    if (!this.robotConfused || !this.robotThinking || !this.robotHappy) {
      return;
    }

    var newState;
    if (this.confidenceLevel <= 30) {
      newState = 'confused';
    } else if (this.confidenceLevel <= 70) {
      newState = 'thinking';
    } else {
      newState = 'happy';
    }

    // Only animate if the state actually changed
    if (newState === this.currentRobotState) {
      return;
    }

    var previousState = this.currentRobotState;
    this.currentRobotState = newState;

    // Hide all states
    this.robotConfused.style.display = 'none';
    this.robotThinking.style.display = 'none';
    this.robotHappy.style.display = 'none';

    // Remove previous fade-in classes
    this.robotConfused.classList.remove('animate-fade-in');
    this.robotThinking.classList.remove('animate-fade-in');
    this.robotHappy.classList.remove('animate-fade-in');

    // Show the active state with fade-in animation
    var activeElement;
    if (newState === 'confused') {
      activeElement = this.robotConfused;
    } else if (newState === 'thinking') {
      activeElement = this.robotThinking;
    } else {
      activeElement = this.robotHappy;
    }

    activeElement.style.display = '';
    // Only add animation when transitioning from a previous state (not on initial load)
    if (previousState) {
      activeElement.classList.add('animate-fade-in');
    }
  }

  /**
   * Update the explanation text based on progress.
   */
  updateExplanation() {
    if (!this.explanation) {
      return;
    }

    if (this.confidenceLevel <= 30) {
      this.explanation.innerHTML = '<p>The robot is still confused. Keep dragging more pictures to help it learn!</p>';
    } else if (this.confidenceLevel <= 70) {
      this.explanation.innerHTML = '<p>The robot is starting to understand! It needs more examples to be sure.</p>';
    } else if (this.confidenceLevel < 100) {
      this.explanation.innerHTML = '<p>Almost there! The robot is getting really smart. Just a few more examples!</p>';
    } else {
      this.explanation.innerHTML = '<p>🎉 Amazing! The robot learned from all your examples and can now recognize things on its own!</p>';
    }
  }

  /**
   * Reset the training module to its initial state so it can be replayed.
   */
  reset() {
    this.examplesProvided = 0;
    this.confidenceLevel = 0;
    this.currentRobotState = 'confused';

    // Reset confidence bar
    this.updateConfidenceBar();

    // Reset robot state
    if (this.robotConfused) this.robotConfused.style.display = '';
    if (this.robotThinking) this.robotThinking.style.display = 'none';
    if (this.robotHappy) {
      this.robotHappy.style.display = 'none';
      this.robotHappy.classList.remove('animate-happy-dance');
    }

    // Reset all cards to visible and draggable
    this.cards.forEach(function (card) {
      card.classList.remove('fade-out', 'dragging');
      card.style.visibility = '';
      card.style.pointerEvents = '';
      card.setAttribute('draggable', 'true');
    });

    // Reset explanation text
    if (this.explanation) {
      this.explanation.innerHTML = '<p>Drag the pictures into the robot\'s brain. The more examples you give, the smarter the robot gets!</p>';
    }
  }

  /**
   * Trigger celebration when confidence reaches 100%.
   * Adds happy dance animation and marks module progress.
   */
  triggerCelebration() {
    // Play success sound
    if (typeof playSuccessSound === 'function') {
      playSuccessSound();
    }

    // Add happy dance animation to the robot
    if (this.robotHappy) {
      this.robotHappy.classList.add('animate-happy-dance');
    }

    // Call celebration function if available (from animations or app)
    if (typeof celebrate === 'function') {
      celebrate();
    }

    // Mark module progress in app.js
    if (typeof markModuleProgress === 'function') {
      markModuleProgress('training', 'feed-ai');
    }
  }
}

// Global reference for the training simulation instance
var trainingSimulation = null;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  trainingSimulation = new TrainingSimulation();
});
