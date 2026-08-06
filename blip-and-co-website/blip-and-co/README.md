# Daxter Design — Website

A clean, animated multi‑page website showcasing videos, sticker designs, creator info, and support options.  
Built with plain HTML, CSS, and JavaScript — no frameworks, no backend, no build tools.

Works on any static host (Netlify, Vercel, GitHub Pages) or by simply opening the files locally.

---

## Project Structure

### HTML Pages

- index.html — Homepage  
  - Hero section  
  - Featured video  
  - Auto‑rotating featured sticker gallery  
  - Navigation + footer

- videos.html — Video archive  
  - Displays all videos from data.js  
  - Thumbnails auto‑generated from YouTube links

- shop.html — Sticker shop  
  - Shows all stickers from data.js  
  - Each sticker links to its Etsy page

- about.html — Creator bio  
  - Personal info  
  - Art style  
  - Character origins

- contact.html — Contact page  
  - Simple contact info  
  - Social links

- support.html — Support page  
  - Ways to support the creator  
  - Checklist section

---

## CSS

### css/style.css

Contains the full design system:

- Colors  
- Typography  
- Buttons  
- Layout grids  
- Hero section  
- Featured sticker auto‑rotate gallery  
- Sticker shop layout  
- Video cards  
- Footer styles  
- Page‑specific sections (About, Support, etc.)

---

## JavaScript

### js/data.js

Your site’s content source:

- DEFAULT_VIDEOS — YouTube videos  
- DEFAULT_STICKERS — Sticker designs + Etsy links  
- DEFAULT_UPDATES — Optional updates/blog entries

All pages read from this file.

---

### js/shared.js

Shared utilities:

- Navigation toggle  
- Blob animation generator  
- Reusable UI helpers

---

### js/main.js

Page logic:

- Featured video loader  
- Featured sticker auto‑rotate gallery  
- Video grid rendering  
- Shop grid rendering

---

### js/footer.js

Injects the footer into every page.

---

## Images

All images live in:

/img

You can add:

- Your photo  
- Sticker images  
- Thumbnails  
- Logos  
- Art assets

Just reference them in HTML or data.js.

---

## Adding Content

### Add a new video

In js/data.js, inside DEFAULT_VIDEOS:

{
title: "My New Video",
description: "Short description",
url: "https://www.youtube.com/watch?v=xxxxxxx",
thumb: "https://img.youtube.com/vi/xxxxxxx/hqdefault.jpg",
featured: false
}


Set featured: true for the homepage video.

---

### Add a new sticker

Inside DEFAULT_STICKERS:

{
id: "dax010",
name: "New Sticker",
img: "img/newsticker.png",
etsy: "https://www.etsy.com/listing/xxxxxxx"
}


It will automatically appear in:

- Shop page  
- Featured sticker auto‑rotate gallery

---

## Hosting

This is a static site — no backend required.

You can host it anywhere:

- Netlify  
- Vercel  
- GitHub Pages  
- Cloudflare Pages  
- Your own server

Just upload the folder.

---

## SEO

Already includes:

- Unique <title> per page  
- Meta descriptions  
- Clean semantic HTML  
- Fast loading (no frameworks)

You can add:

- sitemap.xml  
- robots.txt  
- OpenGraph tags for videos/stickers

---

## Performance

- No frameworks  
- No build step  
- Lightweight CSS  
- Minimal JavaScript  
- Works offline  
- Loads instantly

---

## Accessibility

- Visible focus states  
- Reduced‑motion friendly  
- High contrast text  
- Mobile‑friendly layout
