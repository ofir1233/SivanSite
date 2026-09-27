// ---- Easy edits -----------------------------------------------------------
// Prices: leave null to show "מחיר לפי בקשה" (price on request).
// To show a real price, put the text in quotes, for example: workshop: "180 ₪ למשתתף".
// Then in index.html change that card's button "לפרטים ומחיר" to "לפרטים ולהרשמה",
// and in its data-wa text change "ואשמח לפרטים ולמחיר" to "ואשמח לפרטים".
const PRICES = {
  workshop: null,   // סדנה למתחילים
  course: null,     // כרטיסייה ל-4 מפגשים
  event: null,      // ימי הולדת וגיבוש
  couples: null,    // סדנת אובניים לשניים
};
const WHATSAPP = "972509809049"; // 050-9809049 in international format
// ---------------------------------------------------------------------------

document.documentElement.classList.add("js");

document.querySelectorAll("[data-price]").forEach(el => {
  const price = PRICES[el.dataset.price];
  el.textContent = price ? `מחיר: ${price}` : "מחיר לפי בקשה";
});

// Every button with data-wa opens WhatsApp with a ready message.
document.querySelectorAll("[data-wa]").forEach(el => {
  el.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(el.dataset.wa)}`;
  el.target = "_blank";
  el.rel = "noopener";
  // Screen readers hear that the button opens WhatsApp when its text does not say so.
  if (!el.hasAttribute("aria-label") && !el.textContent.includes("וואטסאפ")) el.insertAdjacentHTML("beforeend", '<span class="sr-only"> (בוואטסאפ)</span>');
});

// Opening videos: one full-screen video on phones, three side by side on wider screens.
// Only the set on screen loads and plays. It pauses when scrolled away, when the tab is hidden
// or with the pause button, and motion-sensitive visitors get the still frames.
const phoneQuery = matchMedia("(max-width: 900px)"); // same breakpoint as styles.css
const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
const pauseBtn = document.querySelector(".hero-pause");
let heroOnScreen = true, stopped = false;
const syncVideos = () => document.querySelectorAll(".hero-media video").forEach(video => {
  const shown = video.matches(phoneQuery.matches ? ".hero-phone" : ".hero-reel video");
  if (shown && !video.poster) video.poster = video.dataset.poster;
  const play = shown && !calm && !stopped && heroOnScreen && !document.hidden;
  if (play && !video.getAttribute("src")) video.src = video.dataset.src;
  play ? video.play().catch(() => {}) : video.pause();
});
if (!calm) {
  pauseBtn.hidden = false;
  pauseBtn.addEventListener("click", () => { stopped = !stopped; pauseBtn.setAttribute("aria-pressed", stopped); syncVideos(); });
}
phoneQuery.addEventListener("change", syncVideos);
document.addEventListener("visibilitychange", syncVideos);
new IntersectionObserver(entries => { heroOnScreen = entries[entries.length - 1].isIntersecting; syncVideos(); })
  .observe(document.querySelector(".hero"));
syncVideos();

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
// Keyboard users: the menu closes when focus moves past the header.
document.querySelector(".top").addEventListener("focusout", e => {
  if (nav.classList.contains("open") && e.relatedTarget && !e.relatedTarget.closest(".top")) setMenu(false);
});

// Highlight the menu item of the section on screen.
const links = [...nav.querySelectorAll("a[href^='#']")];
const observer = new IntersectionObserver(entries => {
  const hits = entries.filter(e => e.isIntersecting).map(e => e.target.id);
  if (!hits.length) return;
  // Side-by-side cards enter together: prefer the one that was clicked in the menu.
  const id = hits.includes(location.hash.slice(1)) ? location.hash.slice(1) : hits[0];
  links.forEach(a => a.hash === `#${id}` ? a.setAttribute("aria-current", "location") : a.removeAttribute("aria-current"));
}, { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("#main > section:not(.offers), .offer[id]").forEach(el => observer.observe(el));

// Sections fade in as they scroll into view (a plain scroll check, so nothing can stay hidden).
const reveals = [...document.querySelectorAll(".about-layout, .offers-grid, .step-list, .gallery .grid, .faq .wrap, .contact-grid")];
reveals.forEach(el => el.classList.add("reveal"));
const reveal = () => {
  const line = innerHeight ? innerHeight * 0.92 : Infinity;
  reveals.forEach(el => { if (el.getBoundingClientRect().top < line) el.classList.add("shown"); });
};
addEventListener("scroll", reveal, { passive: true });
addEventListener("resize", reveal);
reveal();
