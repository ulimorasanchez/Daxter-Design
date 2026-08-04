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
const DEFAULT_VIDEOS = [
  {
     title: "No Debí Quedarme a Dormir Aquí...",
    description: "Based on true facts.",
    url: "https://www.youtube.com/watch?v=rSP5WbecvGU",
    thumb: "https://img.youtube.com/vi/rSP5WbecvGU/hqdefault.jpg",
    featured: true
  },
  {
    title: "MI PEOR CONSULTA MEDICA",
    description: "My first YouTube video.",
    url: "https://www.youtube.com/watch?v=dCa6IOSAIt4",
    thumb: "https://img.youtube.com/vi/dCa6IOSAIt4/hqdefault.jpg",
    featured: true
  }
];


/* ---------------- STICKERS ---------------- */
/* category: "blip" | "doodle" | "nib" | "duo" | "seasonal"             */
const STICKERS = [
  {
    id: "dax001",
    name: "Fennekin Sticker",
    img: "https://i.etsystatic.com/38936010/r/il/0f4e8d/7273879187/il_1140xN.7273879187_7tv4.jpg",
    etsy: "https://www.etsy.com/listing/4375088572/fennekin-stickers"
  },
  {
    id: "dax002",
    name: "Froakie Stickers",
    img: "https://i.etsystatic.com/38936010/r/il/5941a8/7225941438/il_600x600.7225941438_46g9.jpg",
    etsy: "https://www.etsy.com/listing/4375091708/froakie-stickers"
  },
  {
    id: "dax003",
    name: "Gengar Stickers",
    img: "https://i.etsystatic.com/38936010/c/2064/2064/160/370/il/bfb5f8/6824696504/il_600x600.6824696504_k8yt.jpg",
    etsy: "https://www.etsy.com/listing/4297949926/gengar-stickers"
  },
  {
    id: "dax004",
    name: "Cute Fruit Cat Stickers Pack | Kawaii Waterproof Vinyl Cat Stickers | Avocado Strawberry Banana Cats",
    img: "https://i.etsystatic.com/38936010/r/il/db66f6/7558975822/il_600x600.7558975822_ju4d.jpg",
    etsy: "https://www.etsy.com/listing/4434171601/cute-fruit-cat-stickers-pack-kawaii"
  },
  {
    id: "dax005",
    name: "Gengar-inspired hard enamel pin",
    img: "https://i.etsystatic.com/38936010/r/il/4cc95d/7567298147/il_600x600.7567298147_co08.jpg",
    etsy: "https://www.etsy.com/listing/4426484144/gengar-inspired-hard-enamel-pin"
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
