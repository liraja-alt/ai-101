// Main Application Controller
// Manages application state, module navigation, and progress tracking.

/**
 * Application state object.
 * Tracks the current module, visited modules, and interactive element completion.
 */
const appState = {
  currentModule: 'landing',
  visitedModules: new Set(),
  moduleProgress: {},
  soundEnabled: false
};

/**
 * Ordered list of modules for sequential navigation.
 */
const MODULE_ORDER = ['landing', 'training', 'resources', 'usage', 'customization'];

/* ===========================
   Sound System (Web Audio API)
   Muted by default. Presenter can enable via nav bar toggle.
   =========================== */

let audioContext = null;

/**
 * Lazily initialize the AudioContext (required after user gesture).
 */
function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
}

/**
 * Play a short click beep sound.
 */
function playClickSound() {
  if (!appState.soundEnabled) return;
  try {
    var ctx = getAudioContext();
    var oscillator = ctx.createOscillator();
    var gainNode = ctx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(600, ctx.currentTime);
    gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);
  } catch (e) {
    // Silently fail if audio is not available
  }
}

/**
 * Play an ascending success tone.
 */
function playSuccessSound() {
  if (!appState.soundEnabled) return;
  try {
    var ctx = getAudioContext();
    var oscillator = ctx.createOscillator();
    var gainNode = ctx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(400, ctx.currentTime);
    oscillator.frequency.linearRampToValueAtTime(800, ctx.currentTime + 0.25);
    gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.3);
  } catch (e) {
    // Silently fail if audio is not available
  }
}

/**
 * Toggle sound on/off and update the toggle button.
 */
function toggleSound() {
  appState.soundEnabled = !appState.soundEnabled;
  var btn = document.querySelector('.sound-toggle');
  if (btn) {
    btn.textContent = appState.soundEnabled ? '🔊' : '🔇';
    btn.setAttribute('aria-pressed', appState.soundEnabled ? 'true' : 'false');
    btn.setAttribute('title', appState.soundEnabled ? 'Sound effects (on)' : 'Sound effects (off)');
  }
  // Play a test click when enabling so user knows it works
  if (appState.soundEnabled) {
    playClickSound();
  }
}

/**
 * Navigate to a specific module by name.
 * Updates application state, marks the module as visited,
 * and triggers the visual transition via navigation.js.
 *
 * @param {string} moduleName - One of: 'landing', 'training', 'resources', 'usage', 'customization'
 */
function navigateToModule(moduleName) {
  if (!MODULE_ORDER.includes(moduleName)) {
    return;
  }

  var previousModule = appState.currentModule;
  appState.currentModule = moduleName;
  appState.visitedModules.add(moduleName);

  playClickSound();

  // Trigger the visual transition if navigation.js is loaded
  if (typeof transitionToModule === 'function') {
    transitionToModule(previousModule, moduleName);
  }

  // Update the navigation progress indicator if available
  if (typeof updateProgressIndicator === 'function') {
    updateProgressIndicator();
  }
}

/**
 * Record that an interactive element within a module has been completed.
 *
 * @param {string} moduleName - The module containing the element
 * @param {string} element - Identifier for the completed interactive element
 */
function markModuleProgress(moduleName, element) {
  if (!appState.moduleProgress[moduleName]) {
    appState.moduleProgress[moduleName] = new Set();
  }
  appState.moduleProgress[moduleName].add(element);
}

/**
 * Check whether all interactive elements in a module have been completed.
 * Returns false if no progress has been recorded for the module.
 *
 * @param {string} moduleName - The module to check
 * @returns {boolean} True if all registered elements are complete
 */
function isModuleComplete(moduleName) {
  var progress = appState.moduleProgress[moduleName];
  if (!progress || progress.size === 0) {
    return false;
  }

  // Each module defines its required elements count
  var requiredElements = getRequiredElements(moduleName);
  return progress.size >= requiredElements;
}

/**
 * Get the number of required interactive elements for a module.
 *
 * @param {string} moduleName - The module name
 * @returns {number} Number of required interactive elements
 */
function getRequiredElements(moduleName) {
  var requirements = {
    training: 1,      // Feed the AI exercise
    resources: 1,     // Speed race
    usage: 1,         // Matching game
    customization: 3  // Knowledge bases + Context + Prompts
  };
  return requirements[moduleName] || 0;
}

/**
 * Get the set of modules that have been visited.
 *
 * @returns {Set<string>} Set of visited module names
 */
function getVisitedModules() {
  return appState.visitedModules;
}

/**
 * Get the current module index in the MODULE_ORDER array.
 *
 * @returns {number} Index of the current module
 */
function getCurrentModuleIndex() {
  return MODULE_ORDER.indexOf(appState.currentModule);
}

// Initialize the application when the DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  // Mark the landing page as visited on load
  appState.visitedModules.add('landing');

  // Initialize sound toggle button
  var soundBtn = document.querySelector('.sound-toggle');
  if (soundBtn) {
    soundBtn.addEventListener('click', toggleSound);
  }
});
