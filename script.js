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

// ─── CONTACT FORM — mailto fallback (replace with EmailJS when ready) ────────
const form = document.getElementById("contactForm");
const formSubmit = document.getElementById("formSubmit");
const formSuccess = document.getElementById("formSuccess");

if (form) {
  form.addEventListener("submit", (e) => {
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

    const name = document.getElementById("name")?.value.trim() || "";
    const email = document.getElementById("email")?.value.trim() || "";
    const projectType =
      document.getElementById("projectType")?.value.trim() || "";
    const budget = document.getElementById("budget")?.value || "";
    const timeline = document.getElementById("timeline")?.value || "";
    const phone = document.getElementById("phone")?.value.trim() || "—";
    const message = document.getElementById("message")?.value.trim() || "";

    const subject = encodeURIComponent(`New Project Enquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone/WhatsApp: ${phone}\n\nProject Type: ${projectType}\nBudget: ${budget}\nTimeline: ${timeline}\n\nMessage:\n${message}`,
    );

    // Open mailto — user's email client sends the message
    window.location.href = `mailto:vicohawi@gmail.com?subject=${subject}&body=${body}`;

    // Show success state after a short delay
    setTimeout(() => {
      if (formSubmit) formSubmit.style.display = "none";
      if (formSuccess) formSuccess.classList.add("visible");
    }, 400);
  });
}
