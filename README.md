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
- **Photos:** `images/hero.jpg` (top of the page) and `images/work-1.jpg` to `work-6.jpg` (gallery, square).
  To swap one, save a new photo under the same name. The captions are in `index.html`.
  The current gallery photos were made with Google AI Studio from Sivan's Instagram posts: each one recreates a
  real piece of hers (hamsas, mugs, dog figurine, bowl, flower plate) as a clean product shot. The hero photo is a
  generated studio scene. Replace any of them with real photos whenever you have good ones.
- **Sivan's photo:** `images/sivan.jpg`.
- **Texts:** all texts are in `index.html`.
- **WhatsApp number:** `WHATSAPP` in `site.js`.

## Going online (free)

Nothing is online yet. The simplest free options:

- **GitHub Pages:** push this folder to a GitHub repository and turn on Pages. Address:
  `https://<account>.github.io/sivan-nave-ceramics/`
- **Netlify Drop:** drag this folder onto https://app.netlify.com/drop. Address:
  `https://<name>.netlify.app`

A custom domain (for example `sivan-ceramics.co.il`) can be connected later to either one.

Once the site has its address, change `og:image` in `index.html` to the full address
(for example `https://sivan-ceramics.co.il/images/og-image.jpg`) so WhatsApp and Facebook show the preview picture.
