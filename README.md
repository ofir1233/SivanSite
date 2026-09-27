# Sivan Nave Ceramics – website

A one-page site in Hebrew for Sivan Nave's ceramics studio in Meitar. Plain HTML, CSS and a
little JavaScript: no build step, it runs on any static host.

## Preview on this PC

```bash
python -m http.server 8780
```

Then open http://127.0.0.1:8780

## Easy edits

- **Prices:** open `site.js` and fill in `PRICES`. `null` shows "מחיר לפי בקשה" (price on request).
  After filling a price, change that card's button "לפרטים ומחיר" to "לפרטים ולהרשמה" in `index.html`, and in its `data-wa` text "ואשמח לפרטים ולמחיר" to "ואשמח לפרטים".
- **Opening videos:** phones play `media/studio.mp4` with `media/studio-poster.jpg` as its still; wider screens play `media/walk-1.mp4`, `walk-2.mp4` and `walk-3.mp4` side by side,
  with `walk-1.jpg` to `walk-3.jpg` as stills. To swap one, save the new file under the same name. Visitors can stop them with the pause button in the corner of the opening.
- **Gallery:** real photos from the studio in `images/studio/`. To swap one, save a new photo under the same name.
  Captions are in `index.html`.
- **Sivan's photos:** `images/sivan.jpg` (the small round one), `images/sivan-studio.jpg` (About) and `images/sivan-flowers.jpg` (next to the contact details).
- **Texts:** all texts are in `index.html`.
- **FAQ:** each question and its answer are written twice in `index.html`: in the list near the bottom, and in the FAQPage block near the top (for Google). Change both.
- **Phone / WhatsApp number:** `WHATSAPP` in `site.js`, and in `index.html` search for `9049` and change the number in every match (call links, the visible number and the Google block at the top, each written a little differently).
- **WhatsApp messages:** the ready text of each button is its `data-wa` in `index.html`; `&#10;` starts a new line.

## Live site

The site is live on GitHub Pages at https://ofir1233.github.io/SivanSite/. A change pushed to the `main` branch goes online
within a few minutes, and browsers may keep showing the old version for up to 10 minutes, so reload (or open a private window)
to check. A custom domain (for example `sivan-ceramics.co.il`) can be connected in the repository's Pages settings; then change
the three full addresses at the top of `index.html` (canonical, og:url and og:image).
