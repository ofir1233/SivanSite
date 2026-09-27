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
