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

  // RSVP form
  const form = document.getElementById("rsvp-form");
  const submitButton = document.getElementById("rsvp-submit");
  const errorMessage = document.getElementById("form-error");
  const successMessage = document.getElementById("form-success");
  let currentRecordCount = 0;
  let sheetReady = false;

  const dataHandler = {
    onDataChanged(data) {
      currentRecordCount = data.length;
    }
  };

  async function initializeSheet() {
    const result = await window.dataSdk.init(dataHandler);
    if (result.isOk) {
      sheetReady = true;
    } else if (errorMessage) {
      errorMessage.textContent = "We could not connect to the RSVP sheet. Please try again shortly.";
      errorMessage.classList.remove("hidden");
    }
  }

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (errorMessage) errorMessage.classList.add("hidden");
      if (successMessage) successMessage.classList.add("hidden");

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      if (!sheetReady) {
        if (errorMessage) {
          errorMessage.textContent = "The RSVP form is still getting ready. Please try again in a moment.";
          errorMessage.classList.remove("hidden");
        }
        return;
      }

      if (currentRecordCount >= 999) {
        if (errorMessage) {
          errorMessage.textContent = "The RSVP list is currently full. Please contact the couple directly.";
          errorMessage.classList.remove("hidden");
        }
        return;
      }

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.classList.add("opacity-60", "cursor-wait");
      }

      const response = await window.dataSdk.create({
        guest_name: document.getElementById("guest-name")?.value.trim(),
        attendance: document.getElementById("attendance")?.value,
        guest_count: Number(document.getElementById("guest-count")?.value),
        dietary_notes: document.getElementById("dietary-notes")?.value.trim(),
        message: document.getElementById("message")?.value.trim(),
        submitted_at: new Date().toISOString()
      });

      if (submitButton) {
        submitButton.disabled = false;
        submitButton.classList.remove("opacity-60", "cursor-wait");
      }

      if (response.isOk) {
        form.reset();
        if (successMessage) successMessage.classList.remove("hidden");
      } else if (errorMessage) {
        errorMessage.textContent = "Your RSVP could not be submitted. Please try again.";
        errorMessage.classList.remove("hidden");
      }
    });
  }

  // Initialize icons and sheet
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
  initializeSheet();
});
