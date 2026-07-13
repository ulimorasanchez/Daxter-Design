# Blip & Co. — Website

A complete, animated multi-page website for an animated-shorts creator with a
sticker shop. Plain HTML/CSS/JS — no build step, no framework, works by
opening the files or dropping them on any static host.

## What's inside

```
index.html          Home — hero, intro, featured video, platform links, newsletter
videos.html         Video archive — sort by newest/most popular, filter by platform
shop.html           Sticker shop — filter/sort, add to cart, bundles, stock states
cart.html           Cart + demo checkout form
about.html          Creator bio, character origin story, contact form
updates.html        Blog/updates feed — filter by video / sticker / BTS / event
admin.html          Studio dashboard — add/edit/delete everything, no code
css/style.css       Design system (colors, type, components, animation)
js/data.js          Starter content + fallback content (safe to leave as-is)
js/supabase-config.js   <-- PASTE YOUR SUPABASE URL + KEY HERE
js/store.js          Data layer — syncs with Supabase, or falls back to local-only
js/main.js          Shared logic: nav, cart, icons, illustration generator, confetti
js/footer.js        Shared footer, injected on every page
sql/setup.sql        <-- RUN THIS ONCE in Supabase's SQL Editor
```

## Admin dashboard (recommended — no code at all)

Go to **`admin.html`** (there's also a quiet "Studio login" link in the
footer of every page).

**Once Supabase is connected** (see below), this is a real login with
your own email + password, and everything you save goes live for every
visitor immediately — no export step, no redeploying.

**Before Supabase is connected**, the dashboard still works, but as a
local-only preview: it uses a single shared password (starter:
`blipco2026`, changeable under Settings) and saves to that browser only.

From the dashboard you can, all through forms and buttons:
- **Add / edit / delete videos** — title, description, platform, link,
  date, view count, "featured on homepage," and an optional thumbnail
  upload (drag in a real image and it replaces the generated art).
- **Add / edit / delete stickers** — name, description, price, category,
  stock count, the "New release" tag, and an optional image upload.
- **Add / edit / delete blog/update posts** — title, category, date,
  text, optional image.

## Setting up the live backend (Supabase) — ~15 minutes, free

This is what makes admin edits appear for every visitor on the real link,
not just in your own browser.

1. **Create a project.** Go to [supabase.com](https://supabase.com), sign
   up free, click "New project." Pick any name/password/region (save the
   database password somewhere — you likely won't need it again, but keep
   it just in case).
2. **Create the table.** In your new project, open the **SQL Editor**
   (left sidebar), click "New query," paste in the entire contents of
   **`sql/setup.sql`** from this folder, and click **Run**. This creates
   the `content` table and the security rules (anyone can read, only
   signed-in admins can write).
3. **Turn on Realtime (optional but nice).** Database → Replication →
   toggle on the `content` table. This makes edits appear instantly on
   any other open tab/device, not just after a refresh.
4. **Create your admin account.** Authentication → Users → "Add user" →
   enter your email and a password → create. This is what you'll log
   into `admin.html` with. Add more teammates the same way later if needed.
5. **Get your API keys.** Project Settings → API. Copy the **Project URL**
   and the **`anon` `public`** key (not the `service_role` one — that one
   must never go in a public file).
6. **Paste them in.** Open **`js/supabase-config.js`** and replace the two
   placeholder strings with the values from step 5. Save.
7. **Seed your starter content.** Redeploy the site (or just open
   `admin.html` locally), log in with the account from step 4, and click
   **"Reset / reseed defaults"** — this copies everything currently in
   `js/data.js` into your new database so the shop/videos pages aren't empty.
8. Done. From now on, anything you add/edit/delete in the dashboard is
   live for everyone on the real link within a second or two.

**Security note:** the `anon` key is safe to put in a public file — it
can only do what the SQL policies allow (public read, write only if
signed in). Never paste the `service_role` key anywhere in this project.

## Editing content directly in the file (alternative to the dashboard)

Open **`js/data.js`**. It has four lists:

- `VIDEOS` — add a new `{ ... }` entry at the top for a new video. Set
  `platform` to `"youtube"`, `"tiktok"`, or `"instagram"`, and `date` to
  `"YYYY-MM-DD"`. Set `featured: true` on the one you want on the homepage.
- `STICKERS` — add a new entry for a new design. Set `isNew: true` to show
  the "NEW RELEASE" tag, and `stock` to however many you have (the shop
  automatically shows "Only X left" under 15, and "Sold out" at 0).
- `BUNDLES` — multi-sticker packs; `items` references sticker IDs above.
- `UPDATES` — blog/announcement posts. `type` is `"video"`, `"sticker"`,
  `"bts"`, or `"event"`.

Copy an existing object, change the text, save the file, refresh the site.
Every page (home, videos, shop, updates) pulls from this one file, so
nothing else needs to change.

### Using your own images instead of the generated illustrations

Every video and sticker currently renders a small generated cartoon (see
`sceneArt()` / `stickerArt()` in `js/main.js`) so the site looks fully
populated with zero setup. To swap in real photos/renders:

1. Drop your image files in a new `/assets` folder.
2. In the relevant HTML file, replace the call like
   `${sceneArt(v.thumb)}` with `<img src="assets/your-file.jpg">`.

Uploading images through the **admin dashboard** works differently: they're
stored directly as part of the item's data (as a compact embedded image),
which is what makes them sync through Supabase automatically. Keep
uploaded images reasonably small (a few hundred KB, not multi-MB camera
photos) — resize/compress before uploading if needed, since large images
make the database rows bigger and the pages slower to load.

## Connecting real payments

`cart.html` currently simulates checkout (it clears the cart and shows a
confirmation — no money moves). To take real payments:

- **Stripe** — easiest path is [Stripe Checkout](https://stripe.com/docs/checkout/quickstart):
  create a small serverless function (Stripe, Vercel, Netlify, or Cloudflare
  Workers all have free tiers) that takes the cart array and returns a
  Stripe Checkout Session URL, then redirect the browser there instead of
  showing the on-page form.
- **PayPal** — similar pattern using PayPal's Checkout SDK.
- Either way, the cart data (`getCart()` in `js/main.js`) is already
  structured as `[{ id, qty }]`, so it's a straightforward payload to send
  to whichever payment function you set up.

## Backups and offline use

Even with Supabase connected, the **"Export updated data.js"** button in
the dashboard still works — it downloads a snapshot of everything
currently live, which is handy as a backup or if you ever want to move
off Supabase later. That exported file can replace `js/data.js` and the
site keeps working using it as the fallback starter content.

## Hosting

This is a static site — drag the whole `site` folder into Netlify or
Vercel's "deploy" drop zone, or push it to a GitHub repo and enable GitHub
Pages. No server, database, or build step required for the current version.

## SEO notes already in place

- Each page has a unique `<title>` and `<meta name="description">`.
- Semantic headings (`h1` per page, `h2`/`h3` for sections).
- `og:title` / `og:description` on the homepage — copy this pattern onto
  other pages if you want richer link previews on social media.
- Add a `sitemap.xml` and `robots.txt` once the site is live at a real
  domain, and consider per-video/per-sticker pages if SEO for individual
  items matters later (currently they're catalog entries, not separate URLs).

## Accessibility & performance

- Respects `prefers-reduced-motion`.
- Visible focus states on form fields.
- No external JS frameworks — pages load fast even on slow connections.
- Fonts load from Google Fonts CDN; self-host them if you need to work
  fully offline or want to shave a network request.
