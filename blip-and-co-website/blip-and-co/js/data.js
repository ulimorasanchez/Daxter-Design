/* =========================================================================
   BLIP & CO. — CONTENT FILE
   -------------------------------------------------------------------------
   This is the ONLY file you need to touch to publish new content.
   Copy an existing entry, change the values, save. The site updates
   automatically — no coding required.

   Rules:
   - Keep the commas between entries.
   - Wrap all text in straight quotes "like this".
   - Dates use the format "YYYY-MM-DD" so sorting works correctly.
   - Image paths point to /assets/... — drop your file in that folder
     and reuse the same name here (placeholders are illustrated inline
     for now so the site works before you add real art).
   ========================================================================= */

/* ---------------- VIDEOS ---------------- */
/* platform: "youtube" | "tiktok" | "instagram"                         */
const VIDEOS = [
  {
    id: "v001",
    title: "Blip vs. The Vending Machine",
    description: "Blip wants a snack. The vending machine has other plans. A three-minute war of wills ensues.",
    platform: "youtube",
    thumb: "blob-vend",
    url: "https://youtube.com/@blipandco",
    date: "2026-07-08",
    views: 184000,
    featured: true
  },
  {
    id: "v002",
    title: "Doodle Learns to Skateboard",
    description: "It does not go well. It goes wonderfully.",
    platform: "tiktok",
    thumb: "blob-skate",
    url: "https://tiktok.com/@blipandco",
    date: "2026-07-03",
    views: 921000,
    featured: false
  },
  {
    id: "v003",
    title: "Nib's 5-Second Nap",
    description: "A day in the life of the sleepiest bird-cat in the crew.",
    platform: "instagram",
    thumb: "blob-nap",
    url: "https://instagram.com/blipandco",
    date: "2026-06-29",
    views: 402000,
    featured: false
  },
  {
    id: "v004",
    title: "The Great Sticker Heist",
    description: "Blip discovers the sticker sheet is missing one (1) sticker. Chaos follows.",
    platform: "youtube",
    thumb: "blob-heist",
    url: "https://youtube.com/@blipandco",
    date: "2026-06-21",
    views: 276000,
    featured: false
  },
  {
    id: "v005",
    title: "Rainy Day Energy",
    description: "A quiet, cozy short about puddles, umbrellas, and one very determined blob.",
    platform: "instagram",
    thumb: "blob-rain",
    url: "https://instagram.com/blipandco",
    date: "2026-06-14",
    views: 158000,
    featured: false
  },
  {
    id: "v006",
    title: "Doodle vs. Gravity",
    description: "Doodle discovers stairs. Round two of an ongoing rivalry.",
    platform: "tiktok",
    thumb: "blob-stairs",
    url: "https://tiktok.com/@blipandco",
    date: "2026-06-07",
    views: 640000,
    featured: false
  }
];

/* ---------------- STICKERS ---------------- */
/* category: "blip" | "doodle" | "nib" | "duo" | "seasonal"             */
const STICKERS = [
  {
    id: "dax001",
    name: "FNAF Inspired Plushie Stickers",
    art: "sticker-generic",
    etsy: "https://www.etsy.com/listing/4435190882/fnaf-inspired-pushies-stickers"
  },
  {
    id: "dax002",
    name: "Tepig Pokémon Sticker",
    art: "sticker-generic",
    etsy: "https://www.etsy.com/listing/4383065811/tepig-pokemon-sticker"
  },
  {
    id: "dax003",
    name: "Jak & Daxter Vinyl Sticker",
    art: "sticker-generic",
    etsy: "https://www.etsy.com/listing/1852814408/jak-and-daxter-vinyl-sticker-3-76cm"
  },
  {
    id: "dax004",
    name: "Jak & Daxter Sticker Sheet",
    art: "sticker-generic",
    etsy: "https://www.etsy.com/listing/4510363533/jak-and-daxter-sticker-sheet"
  },
  {
    id: "dax005",
    name: "Kawaii Fruit Cat Stickers",
    art: "sticker-generic",
    etsy: "https://www.etsy.com/listing/4434171601/cute-fruit-cat-stickers-pack-kawaii"
  }
];

window.DEFAULT_STICKERS = STICKERS;


/* ---------------- BUNDLES ---------------- */
const BUNDLES = [
  {
    id: "b001",
    name: "Starter Crew Pack",
    description: "One sticker each of Blip, Doodle, and Nib — the whole gang, 15% off.",
    price: 8.5,
    items: ["s001", "s003", "s002"]
  }
];

/* ---------------- BLOG / UPDATES ---------------- */
/* type: "video" | "sticker" | "bts" | "event"                          */
const UPDATES = [
  {
    id: "u001",
    type: "sticker",
    title: "Three new stickers just dropped 🎉",
    date: "2026-07-09",
    excerpt: "Blip Mid-Zoom, Sleepy Nib, and the very chaotic Blip Sticker Heist are live in the shop right now — limited first-run stock.",
    art: "sticker-blip-run"
  },
  {
    id: "u002",
    type: "video",
    title: "New video: Blip vs. The Vending Machine",
    date: "2026-07-08",
    excerpt: "Three minutes. One machine. Zero snacks acquired. Our most-requested storyline finally gets an episode.",
    art: "blob-vend"
  },
  {
    id: "u003",
    type: "bts",
    title: "How we animate Doodle's ears (behind the scenes)",
    date: "2026-06-25",
    excerpt: "A quick breakdown of the squash-and-stretch rig that makes Doodle's ears the most expressive part of any shot.",
    art: "blob-skate"
  },
  {
    id: "u004",
    type: "event",
    title: "We're tabling at Sticker Con NYC — Aug 22–23",
    date: "2026-06-18",
    excerpt: "Come say hi at booth 114. We'll have an exclusive con-only sticker you can't get anywhere else.",
    art: "sticker-duo-fistbump"
  }
];

/* Make available to other scripts.
   These are the DEFAULT/starter values shipped with the site.
   Anything an admin adds/edits/deletes in admin.html is layered on top
   of these by js/store.js — this file itself never changes from the
   dashboard, so it always stays a safe fallback. */
window.DEFAULT_VIDEOS = VIDEOS;
window.DEFAULT_STICKERS = STICKERS;
window.DEFAULT_BUNDLES = BUNDLES;
window.DEFAULT_UPDATES = UPDATES;
