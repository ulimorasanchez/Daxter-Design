/* =========================================================================
   BLIP & CO. — STORE (Supabase-backed)
   -------------------------------------------------------------------------
   How this works:
   1. The moment this file runs, window.VIDEOS / STICKERS / BUNDLES / UPDATES
      are set to the starter content from data.js — so every page renders
      immediately with no loading spinner.
   2. In the background, it fetches the real content from Supabase. When
      that arrives, it replaces window.VIDEOS etc. and fires a
      "store:updated" event — pages listen for this and re-render, so the
      page silently "upgrades" to live data.
   3. Admin CRUD (upsertItem/deleteItem) writes straight to Supabase and
      requires a signed-in admin session (enforced by Row Level Security,
      not just by this file, so it's safe even if someone reads this code).

   If js/supabase-config.js still has the placeholder values (no project
   connected yet), this file quietly falls back to local-only behavior
   using the browser's storage, so the site and dashboard still work
   while you're setting things up.
   ========================================================================= */

const HAS_SUPABASE = typeof SUPABASE_URL !== "undefined"
  && SUPABASE_URL && !SUPABASE_URL.startsWith("PASTE_")
  && typeof window.supabase !== "undefined";

const sbClient = HAS_SUPABASE ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

window.__storeHydrated = false;

/* ---------------- initial (instant) state ---------------- */
window.VIDEOS = window.DEFAULT_VIDEOS;
window.STICKERS = window.DEFAULT_STICKERS;
window.BUNDLES = window.DEFAULT_BUNDLES;
window.UPDATES = window.DEFAULT_UPDATES;

/* ---------------- hydration (live data) ---------------- */
async function hydrateFromCloud(){
  if(!HAS_SUPABASE){
    const local = localStorage.getItem("blipco_admin_data_v1");
    if(local){
      try{
        const d = JSON.parse(local);
        window.VIDEOS = d.videos || window.VIDEOS;
        window.STICKERS = d.stickers || window.STICKERS;
        window.BUNDLES = d.bundles || window.BUNDLES;
        window.UPDATES = d.updates || window.UPDATES;
      }catch(e){}
    }
    markHydrated();
    return;
  }
  const { data, error } = await sbClient.from("content").select("*");
  if(error){ console.warn("Supabase read failed, showing starter content:", error.message); markHydrated(); return; }
  if(data && data.length){
    const grouped = { videos: [], stickers: [], bundles: [], updates: [] };
    data.forEach(row => { if(grouped[row.collection]) grouped[row.collection].push(row.payload); });
    window.VIDEOS = grouped.videos.length ? grouped.videos : window.VIDEOS;
    window.STICKERS = grouped.stickers.length ? grouped.stickers : window.STICKERS;
    window.BUNDLES = grouped.bundles.length ? grouped.bundles : window.BUNDLES;
    window.UPDATES = grouped.updates.length ? grouped.updates : window.UPDATES;
  }
  markHydrated();

  sbClient.channel("content-changes")
    .on("postgres_changes", { event: "*", schema: "public", table: "content" }, () => hydrateFromCloud())
    .subscribe();
}
function markHydrated(){
  window.__storeHydrated = true;
  window.dispatchEvent(new CustomEvent("store:updated"));
}
function onStoreUpdate(cb){
  window.addEventListener("store:updated", cb);
  if(window.__storeHydrated) cb();
}
hydrateFromCloud();

/* ---------------- CRUD (writes to Supabase, falls back to localStorage) ---------------- */
async function upsertItem(collection, item){
  if(HAS_SUPABASE){
    const { error } = await sbClient.from("content").upsert({ collection, id: item.id, payload: item, updated_at: new Date().toISOString() });
    if(error) throw error;
    const list = window[collection.toUpperCase()];
    const idx = list.findIndex(x => x.id === item.id);
    if(idx > -1) list[idx] = item; else list.unshift(item);
    window.dispatchEvent(new CustomEvent("store:updated"));
  } else {
    const d = localOverrides();
    const list = d[collection];
    const idx = list.findIndex(x => x.id === item.id);
    if(idx > -1) list[idx] = item; else list.unshift(item);
    saveLocalOverrides(d);
    applyLocal(d);
  }
}
async function deleteItem(collection, id){
  if(HAS_SUPABASE){
    const { error } = await sbClient.from("content").delete().eq("collection", collection).eq("id", id);
    if(error) throw error;
    window[collection.toUpperCase()] = window[collection.toUpperCase()].filter(x => x.id !== id);
    window.dispatchEvent(new CustomEvent("store:updated"));
  } else {
    const d = localOverrides();
    d[collection] = d[collection].filter(x => x.id !== id);
    saveLocalOverrides(d);
    applyLocal(d);
  }
}
function localOverrides(){
  try{
    const raw = localStorage.getItem("blipco_admin_data_v1");
    const o = raw ? JSON.parse(raw) : null;
    return {
      videos: (o && o.videos) || [...window.VIDEOS],
      stickers: (o && o.stickers) || [...window.STICKERS],
      bundles: (o && o.bundles) || [...window.BUNDLES],
      updates: (o && o.updates) || [...window.UPDATES]
    };
  }catch(e){ return { videos:[...window.VIDEOS], stickers:[...window.STICKERS], bundles:[...window.BUNDLES], updates:[...window.UPDATES] }; }
}
function saveLocalOverrides(d){ localStorage.setItem("blipco_admin_data_v1", JSON.stringify(d)); }
function applyLocal(d){
  window.VIDEOS = d.videos; window.STICKERS = d.stickers; window.BUNDLES = d.bundles; window.UPDATES = d.updates;
  window.dispatchEvent(new CustomEvent("store:updated"));
}

function resetLocalToDefaults(){
  localStorage.removeItem("blipco_admin_data_v1");
  window.VIDEOS = window.DEFAULT_VIDEOS;
  window.STICKERS = window.DEFAULT_STICKERS;
  window.BUNDLES = window.DEFAULT_BUNDLES;
  window.UPDATES = window.DEFAULT_UPDATES;
  window.dispatchEvent(new CustomEvent("store:updated"));
}

function nextId(prefix, list){
  let n = list.length + 1;
  let id = prefix + String(n).padStart(3, "0");
  while(list.some(x => x.id === id)){ n++; id = prefix + String(n).padStart(3, "0"); }
  return id;
}

async function seedDefaults(){
  if(!HAS_SUPABASE) throw new Error("Connect Supabase first (see README.md).");
  const rows = [
    ...window.DEFAULT_VIDEOS.map(v => ({ collection: "videos", id: v.id, payload: v })),
    ...window.DEFAULT_STICKERS.map(s => ({ collection: "stickers", id: s.id, payload: s })),
    ...window.DEFAULT_BUNDLES.map(b => ({ collection: "bundles", id: b.id, payload: b })),
    ...window.DEFAULT_UPDATES.map(u => ({ collection: "updates", id: u.id, payload: u }))
  ];
  const { error } = await sbClient.from("content").upsert(rows.map(r => ({ ...r, updated_at: new Date().toISOString() })));
  if(error) throw error;
  await hydrateFromCloud();
}

/* ---------------- export (backup / offline fallback) ---------------- */
function exportDataJS(){
  const stringify = arr => JSON.stringify(arr, null, 2);
  const content = "/* Blip & Co. -- content file, exported from the Admin dashboard on " + new Date().toISOString().slice(0,10) + ".\n" +
"   This is a backup snapshot. If Supabase is connected, it's already the\n" +
"   live source of truth -- this file is only used as the starter/fallback\n" +
"   content and for offline backups. */\n\n" +
"const VIDEOS = " + stringify(window.VIDEOS) + ";\n\n" +
"const STICKERS = " + stringify(window.STICKERS) + ";\n\n" +
"const BUNDLES = " + stringify(window.BUNDLES) + ";\n\n" +
"const UPDATES = " + stringify(window.UPDATES) + ";\n\n" +
"window.DEFAULT_VIDEOS = VIDEOS;\n" +
"window.DEFAULT_STICKERS = STICKERS;\n" +
"window.DEFAULT_BUNDLES = BUNDLES;\n" +
"window.DEFAULT_UPDATES = UPDATES;\n";
  const blob = new Blob([content], { type: "text/javascript" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "data.js";
  a.click();
  URL.revokeObjectURL(url);
}

/* ---------------- AUTH (real Supabase accounts) ---------------- */
let currentSession = null;
async function initAuth(){
  if(!HAS_SUPABASE){ return; }
  const { data } = await sbClient.auth.getSession();
  currentSession = data.session;
  window.dispatchEvent(new CustomEvent("auth:ready"));
  sbClient.auth.onAuthStateChange((_event, session) => {
    currentSession = session;
    window.dispatchEvent(new CustomEvent("auth:changed"));
  });
}
if(HAS_SUPABASE) initAuth(); else setTimeout(() => window.dispatchEvent(new CustomEvent("auth:ready")), 0);

function isAdminAuthed(){
  if(!HAS_SUPABASE) return sessionStorage.getItem("blipco_admin_authed") === "yes";
  return !!currentSession;
}
async function adminSignIn(email, password){
  if(!HAS_SUPABASE) throw new Error("Connect Supabase first (see README.md -> Setting up the live backend).");
  const { data, error } = await sbClient.auth.signInWithPassword({ email, password });
  if(error) throw error;
  currentSession = data.session;
  return data;
}
async function adminSignOut(){
  if(HAS_SUPABASE){ await sbClient.auth.signOut(); currentSession = null; }
  else { sessionStorage.removeItem("blipco_admin_authed"); }
}
function localFallbackLogin(password){
  const ok = password === (localStorage.getItem("blipco_admin_pass") || "blipco2026");
  if(ok) sessionStorage.setItem("blipco_admin_authed", "yes");
  return ok;
}
function setLocalFallbackPassword(pw){ localStorage.setItem("blipco_admin_pass", pw); }

/* ---------------- image upload helper ---------------- */
function fileToDataURL(file){
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/* rendering helper -- prefer an uploaded image over the generated art */
function mediaFor(item, fallbackSVG){
  if(item && item.image){
    return '<img src="' + item.image + '" alt="' + ((item.title||item.name||"").replace(/"/g,'')) + '" style="width:100%;height:100%;object-fit:cover;">';
  }
  return fallbackSVG;
}
