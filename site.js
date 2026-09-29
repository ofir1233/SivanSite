// ---- Easy edits -----------------------------------------------------------
// Prices: leave null and no price line shows (the note under the workshops says a price is sent on request).
// To show a real price, put the text in quotes, for example: workshop: "___ ₪ למשתתף" (with Sivan's own figure).
// It then shows as "מחיר: …" under that workshop's line of facts. Also, in index.html, change that
// workshop's link "לפרטים ומחיר בוואטסאפ" to "לפרטים ולהרשמה בוואטסאפ", and in its data-wa text
// change "ואשמח לפרטים ולמחיר" to "ואשמח לפרטים".
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
  el.textContent = price ? `מחיר: ${price}` : "";
  el.hidden = !price;
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
// or with the pause button. Motion-sensitive visitors, and visitors saving data or on a very slow
// connection, get the still frames and the videos never download.
const phoneQuery = matchMedia("(max-width: 900px)"); // same breakpoint as styles.css
const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
const net = navigator.connection;
const lean = !!net && (net.saveData || ["slow-2g", "2g"].includes(net.effectiveType));
const pauseBtn = document.querySelector(".hero-pause");
const heroVideos = [...document.querySelectorAll(".hero-media video")];
const isShown = video => video.matches(phoneQuery.matches ? ".hero-phone" : ".hero-reel video");
let heroOnScreen = true, stopped = false;
const syncVideos = () => heroVideos.forEach(video => {
  const shown = isShown(video);
  if (shown && !video.poster) video.poster = video.dataset.poster;
  const play = shown && !calm && !lean && !stopped && heroOnScreen && !document.hidden;
  if (play && !video.getAttribute("src")) video.src = video.dataset.src;
  // If the browser refuses to play (autoplay blocked, a missing file), the button has nothing to pause.
  if (play) video.play().catch(err => { if (err.name !== "AbortError") pauseBtn.hidden = true; });
  else video.pause();
});
// The button follows what the videos actually do: "pause" while they play, "play" while they are still.
const syncButton = () => pauseBtn.setAttribute("aria-pressed", !heroVideos.some(v => isShown(v) && !v.paused));
if (!calm && !lean) {
  pauseBtn.hidden = false;
  heroVideos.forEach(v => { v.addEventListener("play", syncButton); v.addEventListener("pause", syncButton); });
  pauseBtn.addEventListener("click", () => { stopped = pauseBtn.getAttribute("aria-pressed") !== "true"; syncVideos(); syncButton(); });
}
phoneQuery.addEventListener("change", () => { syncVideos(); syncButton(); });
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

// Highlight the menu item of the section on screen (sections without a menu item clear it).
const links = [...nav.querySelectorAll("a[href^='#']")];
const observer = new IntersectionObserver(entries => {
  const hit = entries.find(e => e.isIntersecting);
  if (!hit) return;
  links.forEach(a => a.hash === `#${hit.target.id}` ? a.setAttribute("aria-current", "location") : a.removeAttribute("aria-current"));
}, { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("#main > section[id], .hero").forEach(el => observer.observe(el)); // the opening clears it

// Phones: the WhatsApp bar shows once the opening has scrolled away, and steps aside while the
// contact section or the footer (which have their own WhatsApp links) is on screen.
const onScreen = new Map();
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(e => onScreen.set(e.target, e.isIntersecting));
  document.documentElement.classList.toggle("wa-bar-on", ![...onScreen.values()].some(Boolean));
});
document.querySelectorAll(".hero, #contact, .foot").forEach(el => barObserver.observe(el));

// Sections fade in as they scroll into view (a plain scroll check, so nothing can stay hidden).
const reveals = [...document.querySelectorAll(".about-layout, .offers-grid, .step-list, .gallery .grid, .voices .wrap, .faq .wrap, .contact-grid")];
reveals.forEach(el => el.classList.add("reveal"));
const reveal = () => {
  const line = innerHeight ? innerHeight * 0.92 : Infinity;
  reveals.forEach(el => { if (el.getBoundingClientRect().top < line) el.classList.add("shown"); });
};
addEventListener("scroll", reveal, { passive: true });
addEventListener("resize", reveal);
reveal();

// Gallery: tap a photo to see it large. Arrows, swipe and Esc work too.
const lightbox = document.querySelector(".lightbox");
if (lightbox && lightbox.showModal) {
  const tiles = [...document.querySelectorAll(".gallery .tile")];
  const n = tiles.length;
  let bigImg = null; // the large <img> is made on first open, so the page never holds an image without a source
  const photo = i => tiles[(i + n) % n].querySelector("img");
  const srcOf = img => img.currentSrc || img.src;
  const captionOf = tile => tile.querySelector("figcaption").textContent;
  let at = 0, opener = null, x0 = null, y0 = 0;
  const show = i => {
    at = (i + n) % n;
    if (!bigImg) {
      bigImg = Object.assign(new Image(), { className: "lb-img", decoding: "async" });
      lightbox.querySelector(".lb-figure").prepend(bigImg);
    }
    bigImg.src = srcOf(photo(at));
    bigImg.alt = photo(at).alt;
    lightbox.querySelector(".lb-text").textContent = captionOf(tiles[at]);
    lightbox.querySelector(".lb-count").textContent = `${at + 1} מתוך ${n}`;
    if (!lightbox.open) lightbox.showModal();
    [at - 1, at + 1].forEach(j => { new Image().src = srcOf(photo(j)); }); // the neighbours load in advance
  };
  tiles.forEach((tile, i) => {
    const btn = document.createElement("button");
    btn.className = "tile-open";
    btn.type = "button";
    btn.setAttribute("aria-label", `הגדלת התמונה: ${captionOf(tile)}`);
    btn.addEventListener("click", () => { opener = btn; show(i); });
    tile.append(btn);
  });
  // Right to left: "next" sits on the left.
  lightbox.querySelector(".lb-close").addEventListener("click", () => lightbox.close());
  lightbox.querySelector(".lb-next").addEventListener("click", () => show(at + 1));
  lightbox.querySelector(".lb-prev").addEventListener("click", () => show(at - 1));
  lightbox.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft") show(at + 1);
    else if (e.key === "ArrowRight") show(at - 1);
  });
  // A click on the dark space around the photo closes it.
  lightbox.addEventListener("click", e => { if (e.target === lightbox || e.target.classList.contains("lb-figure")) lightbox.close(); });
  // Swipe: dragging the photo to the right brings in the next one from the left. Two fingers (zoom) are ignored.
  lightbox.addEventListener("touchstart", e => {
    x0 = e.touches.length > 1 ? null : e.touches[0].clientX;
    y0 = e.touches[0].clientY;
  }, { passive: true });
  lightbox.addEventListener("touchend", e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) show(dx > 0 ? at + 1 : at - 1);
  }, { passive: true });
  lightbox.addEventListener("close", () => { if (opener) opener.focus(); });
}
