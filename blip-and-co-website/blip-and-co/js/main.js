/* =========================================================================
   BLIP & CO. — shared site behavior
   ========================================================================= */

/* ---------------- ICONS ---------------- */
const ICONS = {
  youtube: `<svg viewBox="0 0 24 24" fill="none"><rect x="1" y="4" width="22" height="16" rx="5" fill="#FF0033"/><path d="M10 8.5l7 3.5-7 3.5z" fill="#fff"/></svg>`,
  tiktok: `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="6" fill="#111"/><path d="M15.5 3.5c.4 1.8 1.7 3 3.7 3.2v2.6c-1.4 0-2.6-.4-3.7-1.1v5.9a4.9 4.9 0 1 1-4.9-4.9c.3 0 .6 0 .9.1v2.6a2.3 2.3 0 1 0 1.6 2.2V3.5h2.4z" fill="#25F4EE"/><path d="M14.9 3.5c.4 1.8 1.7 3 3.7 3.2v2.6c-1.4 0-2.6-.4-3.7-1.1v5.9a4.9 4.9 0 1 1-4.9-4.9c.3 0 .6 0 .9.1v2.6a2.3 2.3 0 1 0 1.6 2.2V3.5h2.4z" fill="#FE2C55" opacity=".85"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="7" fill="url(#ig)"/><defs><linearGradient id="ig" x1="0" y1="24" x2="24" y2="0"><stop stop-color="#FFDD55"/><stop offset=".5" stop-color="#FF3C7A"/><stop offset="1" stop-color="#8A3AB9"/></linearGradient></defs><circle cx="12" cy="12" r="4.2" stroke="#fff" stroke-width="1.6"/><circle cx="17.4" cy="6.6" r="1.1" fill="#fff"/></svg>`,
  cart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1.4" fill="currentColor" stroke="none"/><circle cx="18" cy="21" r="1.4" fill="currentColor" stroke="none"/><path d="M2 3h2l2.4 12.2a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.6L21 7H6"/></svg>`,
  menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>`,
  play: `<svg viewBox="0 0 24 24" fill="#fff"><circle cx="12" cy="12" r="11" fill="#2B1B4D" opacity=".01"/><path d="M9 7l9 5-9 5V7z"/></svg>`,
  sparkle: `<svg viewBox="0 0 24 24" fill="#FFC93C"><path d="M12 0c.7 5.8 1.5 6.6 7.3 7.3-5.8.7-6.6 1.5-7.3 7.3-.7-5.8-1.5-6.6-7.3-7.3C10.5 6.6 11.3 5.8 12 0z"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="M3 6l9 7 9-7"/></svg>`
};
function platformIcon(p){ return ICONS[p] || ""; }

/* ---------------- MASCOT / STICKER ART GENERATOR ----------------
   Procedural blob-character SVGs so the site is fully populated
   with on-brand illustration before real artwork is dropped in.
   Swap any of these for <img src="/assets/yourfile.png"> once you
   have final art — just replace the call site.
------------------------------------------------------------------ */
const PALETTES = {
  blip:  { body: "#FF5D8F", body2: "#FF8CAE", belly: "#FFE1EC", accent: "#2B1B4D" },
  doodle:{ body: "#FFC93C", body2: "#FFDD80", belly: "#FFF3D2", accent: "#2B1B4D" },
  nib:   { body: "#4CC9F0", body2: "#8BDFF6", belly: "#E4F8FF", accent: "#2B1B4D" },
  duo:   { body: "#3DDC97", body2: "#7CE8B8", belly: "#E3FBF0", accent: "#2B1B4D" },
  seasonal:{ body:"#B98CFF", body2:"#D3B6FF", belly:"#F1E7FF", accent:"#2B1B4D" }
};
let __gid = 0;
function blobCharacter({ palette = "blip", pose = "idle", ears = "round" } = {}){
  const c = PALETTES[palette] || PALETTES.blip;
  const gid = "g" + (__gid++);
  const earShape = ears === "long"
    ? `<ellipse cx="34" cy="30" rx="10" ry="20" fill="url(#${gid})" stroke="${c.accent}" stroke-width="4" transform="rotate(-18 34 30)"/>
       <ellipse cx="86" cy="30" rx="10" ry="20" fill="url(#${gid})" stroke="${c.accent}" stroke-width="4" transform="rotate(18 86 30)"/>`
    : ears === "crest"
    ? `<path d="M52 20 L60 2 L68 20 Z" fill="url(#${gid})" stroke="${c.accent}" stroke-width="4" stroke-linejoin="round"/>`
    : "";
  const armWiggle = pose === "run" ? "rotate(-25 30 95)" : pose === "wave" ? "rotate(20 95 90)" : "rotate(0)";
  return `
  <svg viewBox="0 0 120 130" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="${gid}" cx="38%" cy="30%" r="75%">
        <stop offset="0%" stop-color="${c.body2}"/>
        <stop offset="100%" stop-color="${c.body}"/>
      </radialGradient>
      <filter id="${gid}s" x="-30%" y="-20%" width="160%" height="150%">
        <feDropShadow dx="0" dy="5" stdDeviation="4" flood-color="${c.accent}" flood-opacity="0.18"/>
      </filter>
    </defs>
    <g filter="url(#${gid}s)">
      ${earShape}
      <ellipse cx="60" cy="76" rx="46" ry="42" fill="url(#${gid})" stroke="${c.accent}" stroke-width="4"/>
      <ellipse cx="44" cy="52" rx="13" ry="8" fill="#fff" opacity=".35"/>
      <ellipse cx="60" cy="88" rx="26" ry="20" fill="${c.belly}"/>
      <ellipse cx="26" cy="95" rx="8" ry="12" fill="url(#${gid})" stroke="${c.accent}" stroke-width="3.5" transform="${armWiggle}"/>
      <ellipse cx="94" cy="95" rx="8" ry="12" fill="url(#${gid})" stroke="${c.accent}" stroke-width="3.5"/>
      <circle cx="46" cy="70" r="8" fill="#fff" stroke="${c.accent}" stroke-width="3"/>
      <circle cx="74" cy="70" r="8" fill="#fff" stroke="${c.accent}" stroke-width="3"/>
      <circle cx="48.5" cy="68.5" r="3.4" fill="${c.accent}"/>
      <circle cx="76.5" cy="68.5" r="3.4" fill="${c.accent}"/>
      <circle cx="46.5" cy="67" r="1.3" fill="#fff"/>
      <circle cx="74.5" cy="67" r="1.3" fill="#fff"/>
      <circle cx="38" cy="82" r="5" fill="#FF97B4" opacity=".65"/>
      <circle cx="82" cy="82" r="5" fill="#FF97B4" opacity=".65"/>
      <path d="M52 90 Q60 97 68 90" stroke="${c.accent}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    </g>
  </svg>`;
}

/* Scene thumbnails for video cards — same blob language, simple settings */
function sceneArt(key){
  const scenes = {
    "blob-vend": { bg: "#FFE1EC", pal: "blip", pose:"run", extra:`<rect x="70" y="20" width="34" height="70" rx="4" fill="#B7B7C9" stroke="#2B1B4D" stroke-width="3"/><rect x="76" y="28" width="22" height="30" fill="#fff" opacity=".6"/>` },
    "blob-skate": { bg:"#FFF3D2", pal:"doodle", pose:"run", ears:"long", extra:`<rect x="10" y="112" width="70" height="8" rx="4" fill="#2B1B4D"/>` },
    "blob-nap": { bg:"#E4F8FF", pal:"nib", pose:"idle", ears:"crest", extra:`` },
    "blob-heist": { bg:"#F1E7FF", pal:"blip", pose:"wave", extra:`<rect x="14" y="30" width="26" height="18" rx="3" fill="#3DDC97" stroke="#2B1B4D" stroke-width="3"/>` },
    "blob-rain": { bg:"#E4F8FF", pal:"blip", pose:"idle", extra:`<path d="M20 20 l4 8 M40 14 l4 8 M60 18 l4 8" stroke="#4CC9F0" stroke-width="4" stroke-linecap="round"/>` },
    "blob-stairs": { bg:"#FFF3D2", pal:"doodle", pose:"run", ears:"long", extra:`<path d="M0 130 h20 v-14 h20 v-14 h20 v-14 h60 v42z" fill="#E9C77A"/>` }
  };
  const s = scenes[key] || { bg:"#FFE1EC", pal:"blip", pose:"idle" };
  return `<svg viewBox="0 0 120 130" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
    <rect width="120" height="130" fill="${s.bg}"/>
    ${s.extra || ""}
    <g transform="translate(0,4) scale(0.92)">${blobCharacter({palette:s.pal, pose:s.pose, ears:s.ears})}</g>
  </svg>`;
}

/* Sticker die-cut art — character + simple prop, sized to fill sticker frame */
function stickerArt(key){
  const map = {
    "sticker-blip-run": { pal:"blip", pose:"run" },
    "sticker-nib-sleep": { pal:"nib", pose:"idle", ears:"crest" },
    "sticker-doodle-skate": { pal:"doodle", pose:"run", ears:"long" },
    "sticker-duo-fistbump": { pal:"duo", pose:"wave" },
    "sticker-blip-rain": { pal:"blip", pose:"idle" },
    "sticker-nib-sideeye": { pal:"nib", pose:"idle", ears:"crest" },
    "sticker-doodle-loaf": { pal:"doodle", pose:"idle", ears:"long" },
    "sticker-blip-heist": { pal:"blip", pose:"wave" }
  };
  const s = map[key] || { pal:"blip", pose:"idle" };
  return blobCharacter(s);
}

/* Big hero mascot */
function heroBlip(){
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="heroGrad" cx="38%" cy="28%" r="75%">
        <stop offset="0%" stop-color="#FF8CAE"/>
        <stop offset="100%" stop-color="#FF5D8F"/>
      </radialGradient>
      <filter id="heroShadow" x="-30%" y="-20%" width="160%" height="150%">
        <feDropShadow dx="0" dy="8" stdDeviation="8" flood-color="#2B1B4D" flood-opacity="0.22"/>
      </filter>
    </defs>
    <ellipse cx="160" cy="230" rx="110" ry="20" fill="#2B1B4D" opacity=".08"/>
    <path d="M60 60 Q30 40 40 15" stroke="#FF5D8F" stroke-width="10" stroke-linecap="round" fill="none"/>
    <circle cx="40" cy="12" r="9" fill="#FFC93C" stroke="#2B1B4D" stroke-width="3"/>
    <g filter="url(#heroShadow)">
      <ellipse cx="160" cy="170" rx="120" ry="108" fill="url(#heroGrad)" stroke="#2B1B4D" stroke-width="6"/>
      <ellipse cx="120" cy="118" rx="32" ry="20" fill="#fff" opacity=".3"/>
      <ellipse cx="160" cy="196" rx="66" ry="50" fill="#FFE1EC"/>
      <ellipse cx="62" cy="210" rx="20" ry="28" fill="url(#heroGrad)" stroke="#2B1B4D" stroke-width="5" transform="rotate(-18 62 210)"/>
      <ellipse cx="258" cy="200" rx="20" ry="30" fill="url(#heroGrad)" stroke="#2B1B4D" stroke-width="5" transform="rotate(24 258 200)"/>
      <circle cx="122" cy="150" r="20" fill="#fff" stroke="#2B1B4D" stroke-width="5"/>
      <circle cx="198" cy="150" r="20" fill="#fff" stroke="#2B1B4D" stroke-width="5"/>
      <circle cx="128" cy="147" r="8.5" fill="#2B1B4D"/>
      <circle cx="204" cy="147" r="8.5" fill="#2B1B4D"/>
      <circle cx="124.5" cy="144" r="3" fill="#fff"/>
      <circle cx="200.5" cy="144" r="3" fill="#fff"/>
      <circle cx="98" cy="180" r="12" fill="#FF97B4" opacity=".6"/>
      <circle cx="222" cy="180" r="12" fill="#FF97B4" opacity=".6"/>
      <path d="M132 195 Q160 218 188 195" stroke="#2B1B4D" stroke-width="6" fill="none" stroke-linecap="round"/>
    </g>
  </svg>`;
}

/* ---------------- NAV ---------------- */
function initNav(){
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if(toggle && links){
    toggle.addEventListener("click", () => links.classList.toggle("open"));
  }
  const cartToggleEl = document.querySelector(".nav-toggle");
  if(cartToggleEl) cartToggleEl.innerHTML = ICONS.menu;
  document.querySelectorAll(".icon-cart-slot").forEach(el => el.innerHTML = ICONS.cart);
  updateCartBadge();
}

/* ---------------- CART (localStorage) ----------------
   Swap `checkout()` for a real Stripe/PayPal call when you connect
   payments — see README.md "Connecting real payments".
------------------------------------------------------------------ */
const CART_KEY = "blipco_cart_v1";
function getCart(){
  try{ return JSON.parse(localStorage.getItem(CART_KEY)) || []; }catch(e){ return []; }
}
function saveCart(cart){
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}
function addToCart(id, qty = 1, originEl){
  const cart = getCart();
  const line = cart.find(l => l.id === id);
  if(line){ line.qty += qty; } else { cart.push({ id, qty }); }
  saveCart(cart);
  showToast("Added to cart! 🎉");
  if(originEl){
    const r = originEl.getBoundingClientRect();
    confettiBurst(r.left + r.width/2, r.top + r.height/2);
  }
}
function removeFromCart(id){
  saveCart(getCart().filter(l => l.id !== id));
}
function setQty(id, qty){
  const cart = getCart();
  const line = cart.find(l => l.id === id);
  if(!line) return;
  line.qty = Math.max(1, qty);
  saveCart(cart);
}
function cartCount(){ return getCart().reduce((n,l) => n + l.qty, 0); }
function updateCartBadge(){
  document.querySelectorAll(".cart-count").forEach(el => el.textContent = cartCount());
}
function findStickerOrBundle(id){
  return (window.STICKERS||[]).find(s => s.id === id) || (window.BUNDLES||[]).find(b => b.id === id);
}

/* ---------------- TOAST ---------------- */
let toastTimer;
function showToast(msg){
  let toast = document.querySelector(".toast");
  if(!toast){
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

/* ---------------- HELPERS ---------------- */
function timeAgo(dateStr){
  const diff = (Date.now() - new Date(dateStr).getTime()) / 86400000;
  if(diff < 1) return "today";
  if(diff < 2) return "yesterday";
  if(diff < 30) return Math.floor(diff) + "d ago";
  return Math.floor(diff/30) + "mo ago";
}
function fmtPrice(n){ return "$" + n.toFixed(2); }

/* ---------------- BACKGROUND DECORATION ---------------- */
function injectBgBlobs(){
  if(document.querySelector(".bg-blob-field")) return;
  const field = document.createElement("div");
  field.className = "bg-blob-field";
  field.innerHTML = `
    <div class="bgb" style="width:340px; height:340px; top:-80px; left:-100px; background:var(--pink-light);"></div>
    <div class="bgb" style="width:260px; height:260px; top:40%; right:-90px; background:var(--sky); animation-delay:-6s;"></div>
    <div class="bgb" style="width:220px; height:220px; bottom:-60px; left:20%; background:var(--mint); animation-delay:-12s;"></div>
    <div class="bgb" style="width:200px; height:200px; top:10%; right:20%; background:var(--yellow); animation-delay:-3s;"></div>`;
  document.body.prepend(field);
}

/* ---------------- CONFETTI ---------------- */
const CONFETTI_COLORS = ["#FF5D8F", "#FFC93C", "#4CC9F0", "#3DDC97", "#B98CFF"];
function confettiBurst(x, y){
  const count = 14;
  for(let i = 0; i < count; i++){
    const piece = document.createElement("div");
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
    const dist = 60 + Math.random() * 60;
    piece.className = "confetti-piece";
    piece.style.left = x + "px";
    piece.style.top = y + "px";
    piece.style.width = (5 + Math.random() * 5) + "px";
    piece.style.height = piece.style.width;
    piece.style.background = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
    piece.style.setProperty("--dx", Math.cos(angle) * dist + "px");
    piece.style.setProperty("--dy", Math.sin(angle) * dist - 20 + "px");
    piece.style.setProperty("--rot2", (Math.random() * 360) + "deg");
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 850);
  }
}

document.addEventListener("DOMContentLoaded", () => { initNav(); injectBgBlobs(); });

