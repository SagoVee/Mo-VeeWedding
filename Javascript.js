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
  // RSVP Form Handling
async function submitForm(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form values (matching PHP field names)
    const guestName  = document.getElementById('guest-name').value.trim();
    const attendance = document.getElementById('attendance').value.trim();
    const mobile     = document.getElementById('phone')?.value.trim() || "";
    const email      = document.getElementById('email')?.value.trim() || "";
    const message    = document.getElementById('Comments').value.trim();
    const dietary    = document.getElementById('dietary-notes')?.value.trim() || "";
    const song       = document.getElementById('song-request')?.value.trim() || "";

    // Basic validation
    if (!guestName || !attendance) {
        alert("Please fill in your name and attendance choice.");
        return;
    }

    // Build form data with PHP field names
    const formData = new FormData();
    formData.append("guest-name", guestName);
    formData.append("attendance", attendance);
    formData.append("mobile", mobile);
    formData.append("email", email);
    formData.append("message", message);
    formData.append("dietary-notes", dietary);
    formData.append("song-request", song);

    try {
        const response = await fetch("rsvp.php", {
            method: "POST",
            body: formData
        });

        const result = await response.text();
        // Show feedback
        document.getElementById("form-success").textContent = result;
        document.getElementById("form-success").classList.remove("hidden");
        document.getElementById("form-error").classList.add("hidden");

        // Reset form
        document.getElementById("rsvp-form").reset();
    } catch (error) {
        console.error("Submission failed:", error);
        document.getElementById("form-error").textContent = "Error submitting form. Please try again.";
        document.getElementById("form-error").classList.remove("hidden");
        document.getElementById("form-success").classList.add("hidden");
    }
  }
  