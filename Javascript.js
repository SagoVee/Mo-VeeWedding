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
const successMessage = document.getElementById("form-success");

// Replace with your actual SplitForm access key
const SPLITFORM_KEY = "c48273f0b54447aeaf7e2761ecd812c2";

// Replace with the URL of your thank-you page
const THANK_YOU_URL = "https://sagovee.github.io/Mo-VeeWedding/thank-you.html";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  errorMessage.classList.add("hidden");
  successMessage.classList.add("hidden");
  submitButton.disabled = true;

  try {
    const data = new FormData(form);
    data.set("access_key", SPLITFORM_KEY);
    data.set("subject", "New RSVP submission");
    // Add redirect field so SplitForm knows where to send guests
    data.set("redirect", THANK_YOU_URL);

    const res = await fetch("https://splitforms.com/api/submit", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });

    const json = await res.json();
    if (json.success) {
      // If SplitForm handles redirect, guests will be sent to THANK_YOU_URL
      // If not, we can force it here:
      window.location.href = THANK_YOU_URL;
    } else {
      errorMessage.textContent = "Error: " + (json.message || "Try again");
      errorMessage.classList.remove("hidden");
    }
  } catch (err) {
    errorMessage.textContent = "Network error. Please try again.";
    errorMessage.classList.remove("hidden");
  }

  submitButton.disabled = false;
});
