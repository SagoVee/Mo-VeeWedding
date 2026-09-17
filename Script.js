document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuToggle && mobileMenu) {
    const mobileLinks = mobileMenu.querySelectorAll("a");

    menuToggle.addEventListener("click", () => {
      const open = !mobileMenu.classList.toggle("hidden");
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    });

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
      });
    });
  }
});

// RSVP form setup
const form = document.getElementById("rsvp-form");
const submitButton = document.getElementById("rsvp-submit");
const errorMessage = document.getElementById("form-error");

if (form) {
  form.addEventListener("submit", () => {
    // Hide previous error
    errorMessage.classList.add("hidden");

    // Prevent multiple clicks
    submitButton.disabled = true;

    // Change button text while submitting
    const buttonText = submitButton.querySelector("span");

    if (buttonText) {
      buttonText.textContent = "Sending RSVP...";
    }
  });
}