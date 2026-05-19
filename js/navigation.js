// Navigation and Progress Tracking
// Handles module transitions with CSS transform translateX animations
// and bottom navigation bar progress indicators.

/**
 * Transition between two module sections using a horizontal slide animation.
 * Called by app.js navigateToModule() when the user navigates between modules.
 *
 * @param {string} previousModule - ID of the section being navigated away from
 * @param {string} nextModule - ID of the section being navigated to
 */
function transitionToModule(previousModule, nextModule) {
  var prevSection = document.getElementById(previousModule);
  var nextSection = document.getElementById(nextModule);

  if (!prevSection || !nextSection) {
    return;
  }

  // Determine slide direction based on module order
  var prevIndex = MODULE_ORDER.indexOf(previousModule);
  var nextIndex = MODULE_ORDER.indexOf(nextModule);
  var goingForward = nextIndex > prevIndex;

  // Slide-out the previous section
  prevSection.style.transition = 'transform 500ms ease-in-out, opacity 500ms ease-in-out';
  prevSection.style.transform = goingForward ? 'translateX(-100%)' : 'translateX(100%)';
  prevSection.style.opacity = '0';

  // Prepare the next section off-screen on the opposite side
  nextSection.style.transition = 'none';
  nextSection.style.transform = goingForward ? 'translateX(100%)' : 'translateX(-100%)';
  nextSection.style.opacity = '0';
  nextSection.classList.add('active');

  // Force a reflow so the initial position is applied before animating
  void nextSection.offsetWidth;

  // Slide-in the next section
  nextSection.style.transition = 'transform 500ms ease-in-out, opacity 500ms ease-in-out';
  nextSection.style.transform = 'translateX(0)';
  nextSection.style.opacity = '1';

  // After the animation completes, clean up the previous section
  setTimeout(function () {
    prevSection.classList.remove('active');
    prevSection.style.transition = '';
    prevSection.style.transform = '';
    prevSection.style.opacity = '';
  }, 500);
}

/**
 * Update the bottom navigation bar's progress circles.
 * Iterates through MODULE_ORDER and marks each module as visited or current.
 */
function updateProgressIndicator() {
  var navItems = document.querySelectorAll('#bottom-nav .nav-item');

  navItems.forEach(function (item, index) {
    var moduleName = MODULE_ORDER[index];
    var indicator = item.querySelector('.nav-indicator');

    if (!indicator) {
      return;
    }

    // Remove all state classes
    indicator.classList.remove('visited', 'current');

    if (moduleName === appState.currentModule) {
      indicator.classList.add('current');
    } else if (appState.visitedModules.has(moduleName)) {
      indicator.classList.add('visited');
    }
  });
}

/**
 * Initialize the bottom navigation bar by creating nav items
 * and attaching click handlers for each module.
 */
function initNavigation() {
  var bottomNav = document.getElementById('bottom-nav');

  if (!bottomNav) {
    return;
  }

  // Module display labels and icons
  var moduleLabels = {
    landing: '🏠',
    training: '🧠',
    resources: '💻',
    usage: '🤖',
    customization: '🎨'
  };

  // Build nav items for each module (insert before the sound toggle if present)
  var soundToggle = bottomNav.querySelector('.sound-toggle');

  MODULE_ORDER.forEach(function (moduleName) {
    var navItem = document.createElement('button');
    navItem.className = 'nav-item';
    navItem.setAttribute('aria-label', 'Navigate to ' + moduleName + ' module');
    navItem.setAttribute('data-module', moduleName);

    var icon = document.createElement('span');
    icon.className = 'nav-icon';
    icon.textContent = moduleLabels[moduleName] || '○';

    var indicator = document.createElement('span');
    indicator.className = 'nav-indicator';

    navItem.appendChild(icon);
    navItem.appendChild(indicator);

    navItem.addEventListener('click', function () {
      navigateToModule(moduleName);
    });

    // Insert before sound toggle to keep it at the end
    if (soundToggle) {
      bottomNav.insertBefore(navItem, soundToggle);
    } else {
      bottomNav.appendChild(navItem);
    }
  });

  // Set initial progress state
  updateProgressIndicator();
}

// Initialize navigation when the DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  initNavigation();
});
