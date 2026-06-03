// ─── CURSOR (desktop only) ───────────────────────────────────────────────────
const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursorRing");
const isTouchDevice = window.matchMedia(
  "(hover: none) and (pointer: coarse)",
).matches;

if (!isTouchDevice && cursor && ring) {
  document.addEventListener(
    "mousemove",
    (e) => {
      const x = e.clientX,
        y = e.clientY;
      cursor.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
      ring.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
    },
    { passive: true },
  );
} else {
  if (cursor) cursor.style.display = "none";
  if (ring) ring.style.display = "none";
  document.body.style.cursor = "auto";
}

// ─── NAV SCROLL ──────────────────────────────────────────────────────────────
const nav = document.getElementById("nav");
if (nav) {
  window.addEventListener(
    "scroll",
    () => {
      nav.classList.toggle("scrolled", window.scrollY > 60);
    },
    { passive: true },
  );
}

// ─── MOBILE MENU ─────────────────────────────────────────────────────────────
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const mobileClose = document.getElementById("mobileClose");

function openMenu() {
  if (mobileMenu) mobileMenu.classList.add("open");
  if (hamburger) hamburger.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeMenu() {
  if (mobileMenu) mobileMenu.classList.remove("open");
  if (hamburger) hamburger.classList.remove("open");
  document.body.style.overflow = "";
}

if (hamburger) hamburger.addEventListener("click", openMenu);
if (mobileClose) mobileClose.addEventListener("click", closeMenu);
document.querySelectorAll(".mobile-link").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// ─── SCROLL REVEAL ────────────────────────────────────────────────────────────
const reveals = document.querySelectorAll(".reveal");
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add("visible"), i * 60);
        obs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 },
);
reveals.forEach((el) => obs.observe(el));

// ─── CONTACT FORM — EmailJS ───────────────────────────────────────────────────
// SETUP STEPS:
//   1. Go to https://www.emailjs.com and create a free account
//   2. Add a service (Gmail) → copy the Service ID
//   3. Create an email template — use these variables:
//      {{from_name}}, {{from_email}}, {{project_type}}, {{budget}},
//      {{timeline}}, {{phone}}, {{message}}
//   4. Copy your Public Key, Service ID, and Template ID
//   5. Replace the three placeholders below

const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID"; // e.g. "service_abc123"
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID"; // e.g. "template_xyz789"
// Public key is set in the <head> via emailjs.init("YOUR_EMAILJS_PUBLIC_KEY")

const form = document.getElementById("contactForm");
const formSubmit = document.getElementById("formSubmit");
const formSuccess = document.getElementById("formSuccess");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Validation
    const required = form.querySelectorAll("[required]");
    let valid = true;
    required.forEach((field) => {
      field.style.borderBottomColor = "";
      if (!field.value.trim()) {
        field.style.borderBottomColor = "rgba(255,80,80,0.6)";
        valid = false;
      }
    });
    if (!valid) return;

    // Disable button while sending
    formSubmit.disabled = true;
    formSubmit.querySelector(".submit-text").textContent = "Sending…";

    const templateParams = {
      from_name: document.getElementById("name").value.trim(),
      from_email: document.getElementById("email").value.trim(),
      project_type: document.getElementById("projectType").value.trim(),
      budget: document.getElementById("budget").value,
      timeline: document.getElementById("timeline")?.value || "—",
      phone: document.getElementById("phone").value.trim() || "—",
      message: document.getElementById("message").value.trim(),
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
      );
      formSubmit.style.display = "none";
      formSuccess.classList.add("visible");
    } catch (err) {
      console.error("EmailJS error:", err);
      formSubmit.disabled = false;
      formSubmit.querySelector(".submit-text").textContent = "Send Message";
      alert(
        "Something went wrong. Please try again or email me directly at vicohawi@gmail.com",
      );
    }
  });
}
