// ─── CURSOR ───
const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursorRing");

if (cursor && ring) {
  document.addEventListener("mousemove", (e) => {
    const x = e.clientX, y = e.clientY;
    cursor.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
    ring.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
  }, { passive: true });
}

// ─── NAV SCROLL ───
const nav = document.getElementById("nav");
if (nav) {
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 60);
  }, { passive: true });
}

// ─── MOBILE MENU ───
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const mobileClose = document.getElementById("mobileClose");

if (hamburger && mobileMenu && mobileClose) {
  function openMenu() {
    mobileMenu.classList.add("open");
    hamburger.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeMenu() {
    mobileMenu.classList.remove("open");
    hamburger.classList.remove("open");
    document.body.style.overflow = "";
  }
  hamburger.addEventListener("click", openMenu);
  mobileClose.addEventListener("click", closeMenu);
  document.querySelectorAll(".mobile-link").forEach(link => {
    link.addEventListener("click", closeMenu);
  });
}

// ─── SCROLL REVEAL ───
const reveals = document.querySelectorAll(".reveal");
const obs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add("visible"), i * 60);
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => obs.observe(el));

// ─── CONTACT FORM ───
const form = document.getElementById("contactForm");
const formSubmit = document.getElementById("formSubmit");
const formSuccess = document.getElementById("formSuccess");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Basic validation
    const required = form.querySelectorAll("[required]");
    let valid = true;
    required.forEach(field => {
      field.style.borderBottomColor = "";
      if (!field.value.trim()) {
        field.style.borderBottomColor = "rgba(255,80,80,0.6)";
        valid = false;
      }
    });
    if (!valid) return;

    // Disable button
    formSubmit.disabled = true;
    formSubmit.querySelector(".submit-text").textContent = "Sending…";

    // Build WhatsApp message as fallback / primary delivery
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const projectType = document.getElementById("projectType").value;
    const budget = document.getElementById("budget").value;
    const timeline = document.getElementById("timeline").value;
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    const waText = encodeURIComponent(
      `*New Project Enquiry — JahawiDevs*\n\n` +
      `*Name:* ${name}\n` +
      `*Email:* ${email}\n` +
      `*Phone:* ${phone || "—"}\n\n` +
      `*Project Type:* ${projectType}\n` +
      `*Budget:* ${budget}\n` +
      `*Timeline:* ${timeline}\n\n` +
      `*Message:*\n${message}`
    );

    // Attempt mailto first, then open WhatsApp
    const mailtoSubject = encodeURIComponent(`New Project Enquiry from ${name}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "—"}\n\nProject Type: ${projectType}\nBudget: ${budget}\nTimeline: ${timeline}\n\nMessage:\n${message}`
    );

    // Open mailto
    window.location.href = `mailto:vicohawi@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

    // Show success state
    setTimeout(() => {
      formSubmit.style.display = "none";
      formSuccess.classList.add("visible");
    }, 600);
  });
}
