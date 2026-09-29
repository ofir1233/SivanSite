# Sivan Nave Ceramics – website

A one-page site in Hebrew for Sivan Nave's ceramics studio in Meitar. Plain HTML, CSS and a
little JavaScript: no build step, it runs on any static host.

## Preview on this PC

```bash
python -m http.server 8780
```

Then open http://127.0.0.1:8780

## Easy edits

- **Prices:** open `site.js` and fill in `PRICES`. `null` shows no price (a note under the workshops says a price is sent on request).
  A filled price shows as "מחיר: …" under that workshop's line of facts. Then, in `index.html`, change that workshop's link "לפרטים ומחיר בוואטסאפ" to "לפרטים ולהרשמה בוואטסאפ", and in its `data-wa` text "ואשמח לפרטים ולמחיר" to "ואשמח לפרטים".
- **Opening videos:** phones play `media/studio.mp4` with `media/studio-poster.jpg` as its still; wider screens play `media/walk-1.mp4`, `walk-2.mp4` and `walk-3.mp4` side by side,
  with `walk-1.jpg` to `walk-3.jpg` as stills. To swap one, save the new file under the same name. Visitors can stop them with the pause button in the corner of the opening.
- **Gallery:** six real photos from the studio in `images/studio/`: two tall ones (`glaze-wall`, `plates`) at the ends and four square ones between them.
  To swap one, save a new photo under the same name. Each photo has a short caption (shown only under the photo when it opens large) and a longer
  `alt` description (read aloud to blind visitors), both in `index.html`. Tapping a photo opens it large, so a new photo looks best at about 1080px on its long side.
  `figurines` and `wheel-corner` are no longer on the page.
- **Sivan's photos:** `images/sivan-studio.jpg` (About) and `images/sivan-flowers.jpg` (next to the contact details). `images/sivan.jpg` is no longer used on the page.
- **Guests' words** (the "במילים שלהם" section after the gallery): real messages guests sent Sivan, in their own words. A quote may be
  shortened (mark a cut with …) but never reworded; first names only, no photos of guests. To add one, copy a `<figure class="voice">` block in
  `index.html` and change its text, name and workshop. Up to 6 fit: on wide screens 2 or 4 sit in two columns, 3, 5 or 6 in three.
- **Texts:** all texts are in `index.html`.
- **FAQ:** each question and its answer are written twice in `index.html`: in the list near the bottom, and in the FAQPage block near the top (for Google). Change both.
- **Phone / WhatsApp number:** `WHATSAPP` in `site.js`, and in `index.html` and `404.html` search for `9049` and change the number in every match (call links, the visible number and the Google block at the top, each written a little differently).
- **WhatsApp messages:** the ready text of each button is its `data-wa` in `index.html`. Each one starts with "הגעתי מהאתר" or "ראיתי באתר", so messages from the site are easy to spot, and any open question sits at the end, where the cursor lands. On phones a slim "כתבו לי בוואטסאפ" bar appears along the bottom of the screen once the opening has scrolled away (it is the last link inside the footer).
- **Link preview:** `images/og-image.jpg` (1200 × 630) is the picture WhatsApp and Facebook show when the site is shared. If it is replaced, raise the `?v=2` at the end of the `og:image` address in `index.html` (to `?v=3` and so on), so apps fetch the new one.
- **Google:** the address, the four workshops and the area served (Meitar, Beer Sheva, Omer, Lehavim) are in the LocalBusiness block at the top of `index.html`, with no prices. Once there are confirmed opening hours or a Google Business Profile, they can be added there. `robots.txt` and `sitemap.xml` point search engines to the page; after a large change, update the `lastmod` date in `sitemap.xml`.
- **Missing pages:** `404.html` is the page shown for an address that does not exist. It links back to the home page.

## Live site

The site is live on GitHub Pages at https://heresbysivan.com/. A change pushed to the `main` branch goes online
within a few minutes, and browsers may keep showing the old version for up to 10 minutes, so reload (or open a private window)
to check. A custom domain (for example `sivan-ceramics.co.il`) can be connected in the repository's Pages settings; then search for
`heresbysivan.com` in `index.html`, `robots.txt` and `sitemap.xml` and change every match.
