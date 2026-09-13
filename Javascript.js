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
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  errorMessage.classList.add("hidden");
  successMessage.classList.add("hidden");
  submitButton.disabled = true;

  try {
    const formData = new FormData(form);

    const response = await fetch("https://formcarry.com/s/PpHcw0PU6qD", {
      method: "POST",
      body: formData
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
