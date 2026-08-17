/* ==========================================================================
   MARIA CHRISTINA — PORTFOLIO SCRIPT
  
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  setupHamburgerMenu();
  setupBackgroundCustomizer();
  setupBackToTopButton();
  setupFadeInAnimations();
});


/* ==========================================================================
    HAMBURGER MENU
   ========================================================================== */
function setupHamburgerMenu() {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const navMenu = document.getElementById("navMenu");

  // If either element is missing, stop here so nothing breaks.
  if (!hamburgerBtn || !navMenu) return;

  // Opens the menu if it's closed, closes it if it's open.
  function toggleMenu() {
    const isOpen = navMenu.classList.toggle("is-open");
    hamburgerBtn.classList.toggle("is-open", isOpen);

    // Keep screen readers informed about the menu's state.
    hamburgerBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  }

  // Fully closes the menu (used when clicking a link or outside the menu).
  function closeMenu() {
    navMenu.classList.remove("is-open");
    hamburgerBtn.classList.remove("is-open");
    hamburgerBtn.setAttribute("aria-expanded", "false");
  }

  hamburgerBtn.addEventListener("click", toggleMenu);

  // Close the menu automatically once a link is tapped.
  const navLinks = navMenu.querySelectorAll("a");
  navLinks.forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  // Close the menu if the visitor clicks anywhere outside of it.
  document.addEventListener("click", function (event) {
    const clickedInsideMenu = navMenu.contains(event.target);
    const clickedHamburger = hamburgerBtn.contains(event.target);

    if (!clickedInsideMenu && !clickedHamburger && navMenu.classList.contains("is-open")) {
      closeMenu();
    }
  });
}


/* ==========================================================================
    BACKGROUND CUSTOMIZER
    ========================================================================= */
function setupBackgroundCustomizer() {
  const uploadInput = document.getElementById("bgUpload");
  const resetButton = document.getElementById("bgReset");

  if (!uploadInput || !resetButton) return;

  const STORAGE_KEY = "portfolioCustomBackground";

  // Applies a given image (as a data URL string) as the page background.
  function applyBackground(dataUrl) {
    document.body.style.backgroundImage = "url('" + dataUrl + "')";
    document.body.classList.add("has-custom-bg");
  }

  // Removes any custom background and goes back to the default cream color.
  function clearBackground() {
    document.body.style.backgroundImage = "";
    document.body.classList.remove("has-custom-bg");
  }

  // On page load, check if a background was saved before and re-apply it.
  const savedBackground = localStorage.getItem(STORAGE_KEY);
  if (savedBackground) {
    applyBackground(savedBackground);
  }

  // When the visitor picks a file, read it and preview it immediately.
  uploadInput.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (!file) return;

    // FileReader lets us read the picked file inside the browser,
    // without uploading it anywhere.
    const reader = new FileReader();

    reader.onload = function () {
      const dataUrl = reader.result; // a text version of the image we can use as a CSS background
      applyBackground(dataUrl);

      // Save it so it's still there after the page is refreshed.
      try {
        localStorage.setItem(STORAGE_KEY, dataUrl);
      } catch (error) {
        // Very large images can be too big for localStorage — this
        // just means the preview works but won't be saved permanently.
        console.warn("Background applied, but was too large to save permanently.");
      }
    };

    reader.readAsDataURL(file);
  });

  // "Reset Background" button clears both the preview and the saved copy.
  resetButton.addEventListener("click", function () {
    clearBackground();
    localStorage.removeItem(STORAGE_KEY);
    uploadInput.value = ""; // lets the same file be selected again later
  });
}


/* ==========================================================================
    BACK TO TOP BUTTON
   ========================================================================== */
function setupBackToTopButton() {
  const backToTopBtn = document.getElementById("backToTopBtn");
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}


/* ==========================================================================
    FADE-IN ANIMATIONS ON SCROLL
   ========================================================================== */
function setupFadeInAnimations() {
  const fadeElements = document.querySelectorAll(".fade-in");
  if (!fadeElements.length) return;

  
  if (!("IntersectionObserver" in window)) {
    fadeElements.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  const observer = new IntersectionObserver(
    function (entries, observerInstance) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          
          observerInstance.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  fadeElements.forEach(function (el) {
    observer.observe(el);
  });
}