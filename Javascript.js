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

  // RSVP form
 const form = document.getElementById("rsvp-form");
const submitButton = document.getElementById("rsvp-submit");
const errorMessage = document.getElementById("form-error");
const successMessage = document.getElementById("form-success");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Hide old messages
  errorMessage.classList.add("hidden");
  successMessage.classList.add("hidden");

  // Disable button while submitting
  submitButton.disabled = true;

  try {
    const response = await fetch("https://formcarry.com/s/PpHcw0PU6qD", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        guest_name: document.getElementById("guest-name").value.trim(),
        attendance: document.getElementById("attendance").value,
        dietary_notes: document.getElementById("dietary-notes").value.trim(),
        song_request: document.getElementById("song-request").value.trim(),
        message: document.getElementById("message").value.trim(),
        submitted_at: new Date().toISOString()
      })
    });

    if (response.ok) {
      form.reset();
      successMessage.classList.remove("hidden");
    } else {
      errorMessage.textContent = "Your RSVP could not be submitted. Please try again.";
      errorMessage.classList.remove("hidden");
    }
  } catch (err) {
    errorMessage.textContent = "Network error. Please try again.";
    errorMessage.classList.remove("hidden");
  }

  submitButton.disabled = false;
});
