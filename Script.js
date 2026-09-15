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

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  errorMessage.classList.add("hidden");
  successMessage.classList.add("hidden");
  submitButton.disabled = true;

  try {
    const data = new FormData(form);

    const res = await fetch("https://splitforms.com/api/submit", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });

    const json = await res.json();
    if (json.success) {
      // Reset form
      form.reset();

      // Show inline success briefly (optional)
      successMessage.classList.remove("hidden");

      // Force redirect to your thank-you page
      window.location.href = "https://sagovee.github.io/Mo-VeeWedding/Thank-you.html";
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
