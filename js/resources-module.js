// Computing Resources Interactive Logic
// Implements the speed race comparing single vs parallel computing.

class ResourcesRace {
  constructor() {
    this.singleProgress = 0;
    this.parallelProgress = 0;
    this.totalCards = 100;
    this.singleSpeed = 1;
    this.parallelSpeed = 8;
    this.raceInterval = null;
    this.parallelFinished = false;

    this.startBtn = document.querySelector('.race-start-btn');
    this.singleFill = document.getElementById('single-fill');
    this.parallelFill = document.getElementById('parallel-fill');
    this.singleCounter = document.getElementById('single-counter');
    this.parallelCounter = document.getElementById('parallel-counter');
    this.conclusionEl = document.querySelector('.race-conclusion');
    this.factsEl = document.querySelector('.resources-facts');

    this.init();
  }

  init() {
    if (this.startBtn) {
      this.startBtn.addEventListener('click', () => this.startRace());
    }
  }

  startRace() {
    // Disable the start button
    if (this.startBtn) {
      this.startBtn.disabled = true;
      this.startBtn.style.opacity = '0.6';
      this.startBtn.style.cursor = 'not-allowed';
    }

    // Play click sound
    if (typeof playClickSound === 'function') {
      playClickSound();
    }

    // Reset state in case of re-run
    this.singleProgress = 0;
    this.parallelProgress = 0;
    this.parallelFinished = false;

    this.raceInterval = setInterval(() => this.tick(), 100);
  }

  tick() {
    // Increment progress
    this.singleProgress = Math.min(this.totalCards, this.singleProgress + this.singleSpeed);
    this.parallelProgress = Math.min(this.totalCards, this.parallelProgress + this.parallelSpeed);

    // Update progress bar widths
    const singlePercent = (this.singleProgress / this.totalCards) * 100;
    const parallelPercent = (this.parallelProgress / this.totalCards) * 100;

    if (this.singleFill) this.singleFill.style.width = singlePercent + '%';
    if (this.parallelFill) this.parallelFill.style.width = parallelPercent + '%';

    // Update counter text
    if (this.singleCounter) this.singleCounter.textContent = this.singleProgress;
    if (this.parallelCounter) this.parallelCounter.textContent = this.parallelProgress;

    // Check if parallel lane finished
    if (this.parallelProgress >= this.totalCards && !this.parallelFinished) {
      this.parallelFinished = true;
      this.showConclusion();
    }

    // Check if single lane also finished
    if (this.singleProgress >= this.totalCards) {
      this.endRace();
    }
  }

  showConclusion() {
    // Show the conclusion div with animation
    if (this.conclusionEl) {
      this.conclusionEl.style.display = 'block';
      this.conclusionEl.classList.add('animate-fade-in');
    }

    // Play success sound
    if (typeof playSuccessSound === 'function') {
      playSuccessSound();
    }

    // Trigger confetti celebration
    this.celebrate();

    // Mark module progress
    if (typeof markModuleProgress === 'function') {
      markModuleProgress('resources', 'speed-race');
    }
  }

  endRace() {
    // Clear the interval when single lane finishes
    clearInterval(this.raceInterval);
    this.raceInterval = null;

    // Show the resources facts section
    if (this.factsEl) {
      this.factsEl.style.display = 'flex';
      this.factsEl.classList.add('animate-fade-in');
    }
  }

  /**
   * Reset the race to its initial state so it can be replayed.
   */
  reset() {
    // Clear any running interval
    if (this.raceInterval) {
      clearInterval(this.raceInterval);
      this.raceInterval = null;
    }

    // Reset state
    this.singleProgress = 0;
    this.parallelProgress = 0;
    this.parallelFinished = false;

    // Reset progress bars
    if (this.singleFill) this.singleFill.style.width = '0%';
    if (this.parallelFill) this.parallelFill.style.width = '0%';

    // Reset counters
    if (this.singleCounter) this.singleCounter.textContent = '0';
    if (this.parallelCounter) this.parallelCounter.textContent = '0';

    // Hide conclusion and facts
    if (this.conclusionEl) {
      this.conclusionEl.style.display = 'none';
      this.conclusionEl.classList.remove('animate-fade-in');
    }
    if (this.factsEl) {
      this.factsEl.style.display = 'none';
      this.factsEl.classList.remove('animate-fade-in');
    }

    // Re-enable start button
    if (this.startBtn) {
      this.startBtn.disabled = false;
      this.startBtn.style.opacity = '';
      this.startBtn.style.cursor = '';
    }
  }

  celebrate() {
    // Create confetti particles
    var container = this.conclusionEl ? this.conclusionEl.parentElement : document.querySelector('#resources .module-content');
    if (!container) return;

    const colors = ['#FFD700', '#FF8C42', '#7B68EE', '#4CAF50', '#FF6B9D', '#4A90D9'];

    for (let i = 0; i < 40; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti-particle';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = Math.random() * 0.5 + 's';
      confetti.style.animationDuration = (1.5 + Math.random() * 1.5) + 's';
      container.appendChild(confetti);

      // Remove particle after animation
      confetti.addEventListener('animationend', () => confetti.remove());
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  window.resourcesRace = new ResourcesRace();
});
