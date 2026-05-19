/* ===========================
   AI Education Website
   Shared Utility Functions
   =========================== */

/**
 * Encouraging messages for gentle error feedback.
 */
const ENCOURAGING_MESSAGES = [
  "Almost! Try another one! 🌟",
  "Good thinking! Try again! 💪",
  "So close! Give it another shot! ✨",
  "Not quite — you got this! 🎯",
  "Keep trying, you're doing great! 🌈"
];

/**
 * Creates a star burst animation inside a container.
 * Stars scale up and fade out using the animate-star-burst class.
 * @param {HTMLElement} container - The element to append stars to.
 * @param {number} [count=5] - Number of stars to create.
 */
function createStarBurst(container, count = 5) {
  for (let i = 0; i < count; i++) {
    const star = document.createElement('span');
    star.textContent = '⭐';
    star.className = 'animate-star-burst';
    star.style.position = 'absolute';
    star.style.left = `${Math.random() * 80 + 10}%`;
    star.style.top = `${Math.random() * 80 + 10}%`;
    star.style.fontSize = `${Math.random() * 1.2 + 0.8}rem`;
    star.style.pointerEvents = 'none';
    star.style.zIndex = '100';
    container.appendChild(star);

    // Remove after animation completes (600ms matches keyframe duration)
    setTimeout(() => {
      if (star.parentNode) {
        star.parentNode.removeChild(star);
      }
    }, 600);
  }
}

/**
 * Creates confetti particles inside a container.
 * Particles fall with random colors and rotation.
 * @param {HTMLElement} container - The element to append confetti to.
 * @param {number} [count=20] - Number of confetti particles to create.
 */
function createConfetti(container, count = 20) {
  const colors = ['#FF8C42', '#7B68EE', '#4CAF50', '#FF6B9D', '#FFD700', '#4A90D9'];

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'confetti-particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.width = `${Math.random() * 8 + 6}px`;
    particle.style.height = `${Math.random() * 8 + 6}px`;
    particle.style.animationDuration = `${Math.random() * 1 + 1.5}s`;
    particle.style.animationDelay = `${Math.random() * 0.3}s`;
    container.appendChild(particle);

    // Remove after animation completes
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    }, 2500);
  }
}

/**
 * Shows a feedback text message inside a container.
 * The message fades in, stays visible, then fades out after 2 seconds.
 * @param {HTMLElement} container - The element to append the feedback text to.
 * @param {string} message - The text message to display.
 * @param {string} [type='positive'] - The type: 'positive' (green) or 'encouraging' (purple).
 */
function showFeedbackText(container, message, type = 'positive') {
  const feedback = document.createElement('div');
  feedback.className = `feedback-text feedback-text--${type}`;
  feedback.textContent = message;
  container.appendChild(feedback);

  // Trigger fade-in on next frame
  requestAnimationFrame(() => {
    feedback.classList.add('visible');
  });

  // Fade out and remove after 2 seconds
  setTimeout(() => {
    feedback.classList.remove('visible');
    setTimeout(() => {
      if (feedback.parentNode) {
        feedback.parentNode.removeChild(feedback);
      }
    }, 300);
  }, 2000);
}

/**
 * Adds a shake animation to an element for gentle error feedback.
 * The animation class is removed after 400ms.
 * @param {HTMLElement} element - The element to shake.
 */
function showShakeAnimation(element) {
  element.classList.add('animate-shake');
  setTimeout(() => {
    element.classList.remove('animate-shake');
  }, 400);
}

/**
 * Picks a random encouraging message and displays it in the container.
 * Uses the 'encouraging' feedback type (purple color).
 * @param {HTMLElement} container - The element to show the message in.
 */
function showEncouragement(container) {
  const message = ENCOURAGING_MESSAGES[Math.floor(Math.random() * ENCOURAGING_MESSAGES.length)];
  showFeedbackText(container, message, 'encouraging');
}
