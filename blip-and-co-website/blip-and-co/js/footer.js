document.addEventListener("DOMContentLoaded", () => {
  const footer = document.getElementById("footer");
  if(!footer) return;
  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="footer-brand"><span style="width:30px;height:30px;display:inline-block;">${typeof heroBlip==="function"?heroBlip():""}</span> Blip & Co.</div>
          <p style="max-width:32ch; margin-top:14px; font-size:14px;">Small animated stories about a hungry blob, his skateboarding dog, and one very sleepy bird. New shorts weekly.</p>
          <div style="display:flex; gap:10px; margin-top:16px;">
            <a href="https://youtube.com/@blipandco" target="_blank" rel="noopener" style="width:38px;height:38px;border-radius:50%;background:#3A2A63;display:flex;align-items:center;justify-content:center;padding:0;">${typeof ICONS!=="undefined"?ICONS.youtube:""}</a>
            <a href="https://tiktok.com/@blipandco" target="_blank" rel="noopener" style="width:38px;height:38px;border-radius:50%;background:#3A2A63;display:flex;align-items:center;justify-content:center;padding:0;">${typeof ICONS!=="undefined"?ICONS.tiktok:""}</a>
            <a href="https://instagram.com/blipandco" target="_blank" rel="noopener" style="width:38px;height:38px;border-radius:50%;background:#3A2A63;display:flex;align-items:center;justify-content:center;padding:0;">${typeof ICONS!=="undefined"?ICONS.instagram:""}</a>
          </div>
        </div>
        <div>
          <h4>Explore</h4>
          <a href="videos.html">Videos</a>
          <a href="shop.html">Sticker Shop</a>
          <a href="about.html">About</a>
          <a href="updates.html">Updates</a>
        </div>
        <div>
          <h4>Shop</h4>
          <a href="shop.html">All stickers</a>
          <a href="shop.html#bundles">Bundles</a>
          <a href="cart.html">Your cart</a>
        </div>
        <div>
          <h4>Say hi</h4>
          <a href="mailto:hello@blipandco.com">hello@blipandco.com</a>
          <a href="about.html#contact">Contact form</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} Blip & Co. All rights reserved.</span>
        <span>Made with a lot of coffee and one (1) drawing tablet. · <a href="admin.html" style="color:#8B7BAE;">Studio login</a></span>
      </div>
    </div>
  `;
  document.querySelectorAll('.footer-grid svg').forEach(s => { s.style.width="18px"; s.style.height="18px"; });
});
