// ---- Easy edits -----------------------------------------------------------
// Prices: leave null to show "מחיר לפי בקשה" (price on request).
// To show a real price, put the text in quotes, for example: workshop: "180 ₪ למשתתף".
const PRICES = {
  workshop: null,   // סדנה למתחילים
  course: null,     // קורס מעמיק
  event: null,      // ימי הולדת וגיבוש
};
const WHATSAPP = "972509809049"; // 050-9809049 in international format
// ---------------------------------------------------------------------------

document.querySelectorAll("[data-price]").forEach(el => {
  const price = PRICES[el.dataset.price];
  el.textContent = price ? `מחיר: ${price}` : "מחיר לפי בקשה";
});

// Every button with data-wa opens WhatsApp with a ready message.
document.querySelectorAll("[data-wa]").forEach(el => {
  el.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(el.dataset.wa)}`;
  el.target = "_blank";
  el.rel = "noopener";
});

// Photos: drop a file with the name in data-photo into images/ and it replaces the drawing.
document.querySelectorAll(".photo-slot[data-photo]").forEach(slot => {
  const img = new Image();
  img.onload = () => {
    img.alt = slot.getAttribute("aria-label") || slot.querySelector("figcaption")?.textContent || "";
    slot.querySelector("svg")?.replaceWith(img);
  };
  img.src = slot.dataset.photo;
});

document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu: the button opens and closes the navigation.
const menuBtn = document.querySelector(".menu-btn");
const nav = document.getElementById("site-nav");
const setMenu = open => {
  nav.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", open);
  menuBtn.setAttribute("aria-label", open ? "סגירת תפריט" : "תפריט");
};
menuBtn.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
nav.addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && nav.classList.contains("open")) { setMenu(false); menuBtn.focus(); }
});
document.addEventListener("click", e => {
  if (nav.classList.contains("open") && !e.target.closest(".top")) setMenu(false);
});

// Highlight the menu item of the section on screen.
const links = [...nav.querySelectorAll("a[href^='#']")];
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    // The three offer cards share one section, so it lights up the first of them.
    const id = entry.target.id || entry.target.querySelector("article[id]")?.id;
    links.forEach(a => a.hash === `#${id}` ? a.setAttribute("aria-current", "location") : a.removeAttribute("aria-current"));
  });
}, { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("#main > section").forEach(section => observer.observe(section));
