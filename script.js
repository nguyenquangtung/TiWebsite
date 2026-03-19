/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║              script.js – SỬA CỬA NHANH                      ║
 * ╠══════════════════════════════════════════════════════════════╣
 * ║  1. CONFIG INJECTION   – đọc window.SITE_CONFIG → inject DOM ║
 * ║  2. SCROLL ANIMATION   – fade 2 chiều (xuống hiện, lên reset)║
 * ║  3. MOBILE MENU        – toggle + aria-expanded              ║
 * ║  4. STICKY HEADER      – box-shadow khi scroll               ║
 * ║  5. COUNTER ANIMATION  – đếm số khi vào viewport             ║
 * ║  6. GALLERY FILTER     – tab filter + aria-selected          ║
 * ║  7. LIGHTBOX           – keyboard + swipe                    ║
 * ║  8. SMOOTH SCROLL      – anchor links                        ║
 * ║  9. TESTIMONIALS SLIDER– autoplay + dots + swipe             ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

'use strict';

/* ─────────────────────────────────────────────────────────────────
   HELPER: lấy element an toàn
   ───────────────────────────────────────────────────────────────── */
const $  = (id) => document.getElementById(id);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/* ══════════════════════════════════════════════════════════════════
   1. CONFIG INJECTION
   ══════════════════════════════════════════════════════════════════ */
(function injectConfig() {
  const C = window.SITE_CONFIG;
  if (!C) {
    console.warn('[script.js] window.SITE_CONFIG chưa được định nghĩa. Kiểm tra config.js.');
    return;
  }

  const biz     = C.business     || {};
  const cnt     = C.contact      || {};
  const seo     = C.seo          || {};
  const stats   = C.stats        || [];
  const areas   = C.serviceAreas || [];
  const year    = C.footerYear   || new Date().getFullYear();

  const phone        = cnt.phone        || '';
  const phoneDisplay = cnt.phoneDisplay || phone;
  const zaloHref     = cnt.zalo         || '#';
  const fbHref       = cnt.facebook     || '#';
  const ttHref       = cnt.tiktok       || '#';
  const ttName       = cnt.ttName       || '';
  const hours        = cnt.workingHours || '';
  const telHref      = phone ? `tel:${phone}` : '#';

  /* ── Helpers ── */
  function setLink(id, href) {
    const el = $(id);
    if (el) el.href = href;
  }
  function setText(id, text) {
    const el = $(id);
    if (el) el.textContent = text;
  }
  function setLinkAndText(linkId, textId, href, text) {
    setLink(linkId, href);
    setText(textId, text);
  }

  /* ── HEADER ── */
  setText('js-tagline',           biz.tagline || '');
  setLinkAndText('js-header-phone', 'js-header-phone-text', telHref, phoneDisplay);
  setLinkAndText('js-mobile-phone', 'js-mobile-phone-text', telHref, phoneDisplay);

  /* ── HERO ── */
  setLinkAndText('js-hero-phone', 'js-hero-phone-text', telHref, phoneDisplay);
  setLink('js-hero-zalo', zaloHref);
  setLink('js-hero-fb',   fbHref);
  setLink('js-hero-tt',   ttHref);
  setText('js-response-time', biz.responseTime || '30 phút');

  /* ── GALLERY social buttons ── */
  setLink('js-gallery-fb', fbHref);
  setLink('js-gallery-tt', ttHref);
  /* ── SOCIAL CARDS ── */
  setLink('js-sc-fb',        fbHref);
  setText('js-sc-fb-name',   cnt.fbName || '');
  setLink('js-sc-tt',        ttHref);
  setText('js-sc-tt-name',   ttName);
  setLink('js-sc-zalo',      zaloHref);
  setText('js-sc-zalo-name', phoneDisplay);

  /* ── CTA ── */
  setLinkAndText('js-cta-phone', 'js-cta-phone-text', telHref, phoneDisplay);
  setLink('js-cta-zalo', zaloHref);
  setLink('js-cta-fb',   fbHref);

  /* ── MAP ── */
  const mapPhoneEl = $('js-map-phone');
  if (mapPhoneEl) {
    mapPhoneEl.href      = telHref;
    mapPhoneEl.innerHTML = `<i class="fa-solid fa-phone-volume"></i> Gọi Ngay – ${phoneDisplay}`;
  }

  /* ── FOOTER ── */
  setLink('js-footer-fb',      fbHref);
  setLink('js-footer-tt',      ttHref);
  setLink('js-footer-zalo',    zaloHref);
  setLinkAndText('js-footer-phone', 'js-footer-phone-text', telHref, phoneDisplay);
  setText('js-footer-hours',   hours);
  setLink('js-footer-fb-link', fbHref);
  setLink('js-footer-tt-link', ttHref);

  /* ── FOOTER BOTTOM ── */
  setLink('js-footer-bottom-fb', fbHref);
  setLink('js-footer-bottom-tt', ttHref);

  /* ── FLOATING BUTTONS ── */
  setLink('js-float-phone', telHref);
  setLink('js-float-zalo',  zaloHref);
  setLink('js-float-fb',    fbHref);
  setLink('js-float-tt',    ttHref);

  /* ── Tất cả nút "Gọi Tư Vấn" trong services / overlay ── */
  $$('.js-phone-link').forEach(el => { el.href = telHref; });

  /* ── FOOTER COPYRIGHT ── */
  const copyEl = $('js-footer-copy');
  if (copyEl) {
    copyEl.innerHTML =
      `© ${year} ${biz.name || 'Dịch Vụ Sửa Cửa Nhanh'} | Hotline: <a href="${telHref}">${phoneDisplay}</a>`;
  }

  /* ── RENDER STATS GRID ── */
  const statsGrid = $('js-stats-grid');
  if (statsGrid && stats.length) {
    statsGrid.innerHTML = stats.map(s => `
      <div class="stat-item">
        <span class="stat-number" data-target="${s.value}">0</span><span class="stat-suffix">${s.suffix}</span>
        <p>${s.label}</p>
      </div>`).join('');
  }

  /* ── RENDER MAP AREAS ── */
  const areasList = $('js-map-areas');
  if (areasList && areas.length) {
    areasList.innerHTML = areas.map(a =>
      `<li><i class="fa-solid fa-check" aria-hidden="true"></i> ${a}</li>`
    ).join('');
  }

  /* ── CẬP NHẬT SEO META ── */
  if (seo.canonical) {
    const canonical = document.getElementById('canonicalTag');
    if (canonical) canonical.href = seo.canonical;
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.content = seo.canonical;
  }
  if (seo.ogImage) {
    const ogImg = $('ogImage');
    if (ogImg) ogImg.content = seo.ogImage;
  }

  /* ── CẬP NHẬT SCHEMA JSON-LD ── */
  const schemaEl = $('schemaLD');
  if (schemaEl) {
    try {
      const schema = JSON.parse(schemaEl.textContent);
      if (biz.name)        schema.name                    = biz.name;
      if (biz.description) schema.description             = biz.description;
      if (phone)           schema.telephone               = `+84${phone.replace(/^0/, '')}`;
      if (biz.city)        schema.address.addressLocality = biz.city;
      if (biz.country)     schema.address.addressCountry  = biz.country;
      schema.sameAs = [fbHref, ttHref, zaloHref].filter(u => u && u !== '#');
      schemaEl.textContent = JSON.stringify(schema, null, 2);
    } catch (e) {
      console.warn('[script.js] Không thể cập nhật Schema JSON-LD:', e);
    }
  }
})();


/* ══════════════════════════════════════════════════════════════════
   2. SCROLL ANIMATION 2 CHIỀU
   – Khi phần tử vào viewport     → thêm .visible (hiệu ứng hiện)
   – Khi phần tử ra khỏi viewport phía TRÊN → xóa .visible
     → lần kéo xuống tiếp theo sẽ animate lại
   – Khi phần tử bên dưới viewport → không làm gì (chờ scroll tới)
   ══════════════════════════════════════════════════════════════════ */
(function initScrollAnimation() {
  const SELECTORS = [
    '.service-card', '.why-card', '.step',
    '.stat-item', '.gallery-item', '.social-card',
    '.tcard', '.map-info-card', '.section-header',
    '.hero-trust', '.rating-summary', '.process-steps',
    '.promo-countdown-wrap', '.promo-code-wrap', '.promo-actions', '.promo-right'
  ];

  const targets = $$(SELECTORS.join(', '));

  // Tôn trọng cài đặt accessibility của người dùng
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    targets.forEach(el => el.classList.add('fade-in', 'visible'));
    return;
  }

  targets.forEach(el => el.classList.add('fade-in'));

  // Tính stagger delay theo thứ tự trong cùng parent
  function getStaggerDelay(el) {
    const siblings = $$(':scope > .fade-in', el.parentElement);
    const idx = siblings.indexOf(el);
    return idx >= 0 ? idx * 70 : 0;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el   = entry.target;
      const rect = entry.boundingClientRect;

      if (entry.isIntersecting) {
        // Vào viewport → animate với stagger
        const delay = getStaggerDelay(el);
        setTimeout(() => el.classList.add('visible'), delay);
      } else if (rect.bottom < 0) {
        // Ra khỏi viewport phía TRÊN (đã cuộn qua) → reset để animate lại khi kéo xuống
        el.classList.remove('visible');
      }
      // rect.top > window.innerHeight → bên dưới viewport, không làm gì
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  targets.forEach(el => observer.observe(el));
})();


/* ══════════════════════════════════════════════════════════════════
   3. MOBILE MENU
   ══════════════════════════════════════════════════════════════════ */
(function initMobileMenu() {
  const toggle    = $('menuToggle');
  const mobileNav = $('mobileNav');
  if (!toggle || !mobileNav) return;

  function openMenu() {
    mobileNav.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
  }
  function closeMenu() {
    mobileNav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', () =>
    mobileNav.classList.contains('open') ? closeMenu() : openMenu()
  );

  // Đóng khi click link bên trong
  $$('.mobile-nav-link, .mobile-nav-call', mobileNav).forEach(link =>
    link.addEventListener('click', closeMenu)
  );

  // Đóng khi click ra ngoài
  document.addEventListener('click', (e) => {
    if (!mobileNav.contains(e.target) && !toggle.contains(e.target)) closeMenu();
  });

  // Đóng khi nhấn Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
})();


/* ══════════════════════════════════════════════════════════════════
   4. STICKY HEADER SHADOW
   ══════════════════════════════════════════════════════════════════ */
(function initStickyHeader() {
  const header = $('header');
  if (!header) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        header.style.boxShadow = window.scrollY > 20
          ? '0 4px 24px rgba(0,0,0,0.12)'
          : '';
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();


/* ══════════════════════════════════════════════════════════════════
   5. COUNTER ANIMATION
   ══════════════════════════════════════════════════════════════════ */
(function initCounters() {
  function attachCounters() {
    const counters = $$('.stat-number[data-target]');
    if (!counters.length) return false;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el       = entry.target;
        const target   = +el.dataset.target;
        const suffix   = el.nextElementSibling; // .stat-suffix
        const duration = 1600;
        let start = null;

        if (suffix) suffix.style.opacity = '0';

        const tick = (ts) => {
          if (!start) start = ts;
          const progress = Math.min((ts - start) / duration, 1);
          const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
          el.textContent = Math.floor(eased * target);
          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            el.textContent = target;
            if (suffix) {
              suffix.style.transition = 'opacity 0.3s';
              suffix.style.opacity    = '1';
            }
          }
        };
        requestAnimationFrame(tick);
        observer.unobserve(el);
      });
    }, { threshold: 0.4 });

    counters.forEach(el => observer.observe(el));
    return true;
  }

  // Thử attach ngay; nếu stats chưa render (inject bởi config) thì dùng MutationObserver
  if (!attachCounters()) {
    const statsGrid = $('js-stats-grid');
    if (statsGrid) {
      const mo = new MutationObserver(() => {
        if (attachCounters()) mo.disconnect();
      });
      mo.observe(statsGrid, { childList: true });
    }
  }
})();


/* ══════════════════════════════════════════════════════════════════
   6. GALLERY FILTER
   ══════════════════════════════════════════════════════════════════ */
(function initGalleryFilter() {
  const tabs         = $$('.gallery-tab');
  const galleryItems = $$('.gallery-item');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Cập nhật active + aria-selected
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filter = tab.dataset.filter;
      galleryItems.forEach((item, i) => {
        const match = filter === 'all' || item.dataset.category === filter;
        item.style.display = match ? '' : 'none';
        if (match) {
          item.classList.remove('visible');
          setTimeout(() => item.classList.add('visible'), i * 60);
        }
      });
    });
  });
})();


/* ══════════════════════════════════════════════════════════════════
   7. LIGHTBOX
   ══════════════════════════════════════════════════════════════════ */
(function initLightbox() {
  const lightbox        = $('lightbox');
  const lightboxImg     = $('lightboxImg');
  const lightboxCaption = $('lightboxCaption');
  if (!lightbox || !lightboxImg) return;

  const galleryItems = $$('.gallery-item');
  let currentIndex = 0;
  let visibleItems = [];

  lightboxImg.style.transition = 'opacity 0.15s ease';

  function getVisibleItems() {
    return galleryItems.filter(item => item.style.display !== 'none');
  }

  function openLightbox(index) {
    visibleItems = getVisibleItems();
    if (!visibleItems.length) return;
    currentIndex = index;
    const item = visibleItems[currentIndex];
    const img  = item?.querySelector('img');
    if (!img || img.style.display === 'none') return;

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    if (lightboxCaption) lightboxCaption.textContent = item.dataset.caption || img.alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    $('lightboxCloseBtn')?.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function navigate(dir) {
    visibleItems = getVisibleItems();
    currentIndex = (currentIndex + dir + visibleItems.length) % visibleItems.length;
    const item = visibleItems[currentIndex];
    const img  = item?.querySelector('img');
    if (!img || img.style.display === 'none') return;

    lightboxImg.style.opacity = '0';
    setTimeout(() => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      if (lightboxCaption) lightboxCaption.textContent = item.dataset.caption || img.alt;
      lightboxImg.style.opacity = '1';
    }, 150);
  }

  // Mở lightbox khi click / Enter / Space trên gallery item
  galleryItems.forEach(item => {
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');

    item.addEventListener('click', () => {
      const all = getVisibleItems();
      const idx = all.indexOf(item);
      if (idx >= 0) openLightbox(idx);
    });

    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });
  });

  $('lightboxClose')   ?.addEventListener('click', closeLightbox);
  $('lightboxCloseBtn')?.addEventListener('click', closeLightbox);
  $('lightboxPrev')    ?.addEventListener('click', () => navigate(-1));
  $('lightboxNext')    ?.addEventListener('click', () => navigate(1));

  // Keyboard
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });

  // Touch / swipe trong lightbox
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  lightbox.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) dx < 0 ? navigate(1) : navigate(-1);
  });
})();


/* ══════════════════════════════════════════════════════════════════
   8. SMOOTH SCROLL
   ══════════════════════════════════════════════════════════════════ */
(function initSmoothScroll() {
  const header = $('header');

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return; // bỏ qua pure "#" links
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const headerH = header?.offsetHeight || 70;
      const y       = target.getBoundingClientRect().top + window.pageYOffset - headerH - 12;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });
})();


/* ══════════════════════════════════════════════════════════════════
   9. TESTIMONIALS SLIDER
   ══════════════════════════════════════════════════════════════════ */
(function initTestimonialsSlider() {
  const track    = $('tTrack');
  const viewport = $('tViewport');
  const dotsWrap = $('tDots');
  const btnPrev  = $('tPrev');
  const btnNext  = $('tNext');
  if (!track || !viewport) return;

  const cards   = $$('.tcard', track);
  let current   = 0;
  let autoTimer = null;
  let isHovered = false;

  /* Số card hiển thị theo viewport width */
  function perView() {
    const vw = viewport.offsetWidth;
    if (vw < 640)  return 1;
    if (vw < 1024) return 2;
    return 3;
  }

  /* Tổng số vị trí có thể scroll tới */
  function totalSlides() {
    return Math.max(1, cards.length - perView() + 1);
  }

  /* Scroll đến slide idx */
  function goTo(idx) {
    const max  = totalSlides() - 1;
    current    = Math.max(0, Math.min(idx, max));
    const cardW = cards[0]?.offsetWidth || 0;
    const gap   = 24; // khớp CSS gap của .tslider-track
    track.style.transform = `translateX(-${current * (cardW + gap)}px)`;
    renderDots();
  }

  /* Render navigation dots */
  function renderDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = '';
    const total = totalSlides();
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('button');
      dot.className = 'tslider-dot' + (i === current ? ' active' : '');
      dot.setAttribute('aria-label', `Chuyển đến slide ${i + 1}`);
      dot.addEventListener('click', () => { goTo(i); resetAuto(); });
      dotsWrap.appendChild(dot);
    }
  }

  /* Autoplay 4 giây */
  function startAuto() {
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = setInterval(() => {
      if (!isHovered) goTo(current + 1 < totalSlides() ? current + 1 : 0);
    }, 4000);
  }
  function resetAuto() {
    clearInterval(autoTimer);
    startAuto();
  }

  /* Nút Prev / Next */
  btnPrev?.addEventListener('click', () => {
    goTo(current - 1 < 0 ? totalSlides() - 1 : current - 1);
    resetAuto();
  });
  btnNext?.addEventListener('click', () => {
    goTo(current + 1 < totalSlides() ? current + 1 : 0);
    resetAuto();
  });

  /* Pause khi hover chuột */
  viewport.addEventListener('mouseenter', () => { isHovered = true;  });
  viewport.addEventListener('mouseleave', () => { isHovered = false; });

  /* Touch / swipe mobile */
  let touchStartX = 0;
  viewport.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  viewport.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) dx < 0 ? btnNext?.click() : btnPrev?.click();
  });

  /* Cập nhật lại khi resize */
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => goTo(Math.min(current, totalSlides() - 1)), 200);
  });
  /* Khởi động */
  renderDots();
  startAuto();
})();


/* ══════════════════════════════════════════════════════════════════
   10. PROMO SECTION
   – Inject text từ config, render perks
   – Đếm ngược thời gian thực đến deadline
   – SCRATCH CARD: cào canvas để lộ mã
   – Nút copy to clipboard + feedback
   ══════════════════════════════════════════════════════════════════ */
(function initPromo() {
  const C = window.SITE_CONFIG;
  if (!C || !C.promo || !C.promo.enabled) return;

  const p            = C.promo;
  const cnt          = C.contact       || {};
  const phone        = cnt.phone       || '';
  const telHref      = phone ? `tel:${phone}` : '#';
  const phoneDisplay = cnt.phoneDisplay || phone;
  const zaloHref     = cnt.zalo        || '#';

  /* ── Helpers ── */
  function setText(id, text) { const el = $(id); if (el) el.textContent = text; }

  /* ── Inject text ── */
  setText('js-promo-badge',    p.badge);
  setText('promo-title',       p.title);
  setText('js-promo-subtitle', p.subtitle);
  setText('js-scratch-code-text', p.code);   // nằm trong scratch reveal
  setText('js-promo-code',     p.code);      // fallback nếu còn id cũ
  setText('js-promo-discount', p.discount);
  setText('js-promo-note',     p.note);

  // Nút gọi / zalo
  const phoneBtn = $('js-promo-phone');
  if (phoneBtn) {
    phoneBtn.href = telHref;
    phoneBtn.querySelector('span').innerHTML =
      `<small>Gọi ngay để dùng mã</small>${phoneDisplay}`;
  }
  const zaloBtn = $('js-promo-zalo');
  if (zaloBtn) zaloBtn.href = zaloHref;

  /* ── Render perks ── */
  const perksList = $('js-promo-perks');
  if (perksList && p.perks?.length) {
    perksList.innerHTML = p.perks.map(perk => `
      <li>
        <span class="perk-icon" aria-hidden="true"><i class="fa-solid ${perk.icon}"></i></span>
        ${perk.text}
      </li>`).join('');
  }

  /* ══════════════════════════════════════════════════════
     SCRATCH CARD
     ══════════════════════════════════════════════════════ */
  (function initScratch() {
    const card      = $('js-scratch-card');
    const canvas    = $('js-scratch-canvas');
    const hint      = $('js-scratch-hint');
    const subHint   = $('js-scratch-sub-hint');
    const actionsEl = $('js-scratch-actions');
    if (!card || !canvas) return;

    const ctx = canvas.getContext('2d');
    let isDrawing  = false;
    let isDone     = false;
    let totalPx    = 0;
    let clearedPx  = 0;
    const THRESHOLD = 0.52;   // 52% diện tích cào → hoàn thành
    const BRUSH_R   = 28;     // bán kính cọ (px)

    /* ── Vẽ lớp bạc ban đầu ── */
    function initCanvas() {
      const rect = card.getBoundingClientRect();
      canvas.width  = rect.width  || card.offsetWidth;
      canvas.height = rect.height || card.offsetHeight;
      totalPx = canvas.width * canvas.height;

      // Gradient bạc
      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0.00, '#c0c0c0');
      grad.addColorStop(0.25, '#e8e8e8');
      grad.addColorStop(0.50, '#a9a9a9');
      grad.addColorStop(0.75, '#d4d4d4');
      grad.addColorStop(1.00, '#b0b0b0');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Hoạ tiết chấm bi lên lớp bạc
      ctx.fillStyle = 'rgba(255,255,255,0.12)';
      for (let x = 20; x < canvas.width; x += 28) {
        for (let y = 20; y < canvas.height; y += 28) {
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Text gợi ý trên lớp bạc
      ctx.fillStyle = 'rgba(80,80,80,0.55)';
      ctx.font = 'bold 15px "Be Vietnam Pro", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('✦ CÀO ĐỂ NHẬN MÃ ✦', canvas.width / 2, canvas.height / 2);
    }

    /* ── Cào tại điểm (x, y) ── */
    function scratch(x, y) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, BRUSH_R, 0, Math.PI * 2);
      ctx.fill();
    }

    /* ── Tính % đã cào ── */
    function calcCleared() {
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let cleared = 0;
      // alpha channel (index 3): 0 = transparent = đã cào
      for (let i = 3; i < data.length; i += 4) {
        if (data[i] === 0) cleared++;
      }
      return cleared / totalPx;
    }

    /* ── Hoàn thành: fade canvas ra, hiện nút copy ── */
    function complete() {
      if (isDone) return;
      isDone = true;
      card.classList.add('done');

      // Fade out toàn bộ canvas
      canvas.style.opacity = '0';
      setTimeout(() => { canvas.style.display = 'none'; }, 400);

      // Ẩn hint phụ, hiện actions
      if (subHint)   { subHint.classList.add('hidden'); }
      if (actionsEl) { actionsEl.style.display = 'flex'; }

      // Confetti nhỏ
      spawnConfetti(card);
    }

    /* ── Lấy tọa độ chuẩn hoá (mouse + touch) ── */
    function getPos(e) {
      const rect = canvas.getBoundingClientRect();
      const src  = e.touches ? e.touches[0] : e;
      return {
        x: src.clientX - rect.left,
        y: src.clientY - rect.top,
      };
    }

    /* ── Kiểm tra sau mỗi nét cào ── */
    function checkProgress() {
      // Lấy mẫu mỗi 300ms để không lag
      const pct = calcCleared();
      if (pct >= THRESHOLD) complete();
    }

    let checkTimer = null;
    function debouncedCheck() {
      clearTimeout(checkTimer);
      checkTimer = setTimeout(checkProgress, 120);
    }

    /* ── Event: Mouse ── */
    canvas.addEventListener('mousedown', (e) => {
      if (isDone) return;
      isDrawing = true;
      card.classList.add('scratching');
      if (hint) hint.style.opacity = '0';
      const { x, y } = getPos(e);
      scratch(x, y);
    });
    canvas.addEventListener('mousemove', (e) => {
      if (!isDrawing || isDone) return;
      const { x, y } = getPos(e);
      scratch(x, y);
      debouncedCheck();
    });
    canvas.addEventListener('mouseup',   () => { isDrawing = false; card.classList.remove('scratching'); checkProgress(); });
    canvas.addEventListener('mouseleave',() => { isDrawing = false; card.classList.remove('scratching'); });

    /* ── Event: Touch ── */
    canvas.addEventListener('touchstart', (e) => {
      if (isDone) return;
      e.preventDefault();
      isDrawing = true;
      card.classList.add('scratching');
      if (hint) hint.style.opacity = '0';
      const { x, y } = getPos(e);
      scratch(x, y);
    }, { passive: false });
    canvas.addEventListener('touchmove', (e) => {
      if (!isDrawing || isDone) return;
      e.preventDefault();
      const { x, y } = getPos(e);
      scratch(x, y);
      debouncedCheck();
    }, { passive: false });
    canvas.addEventListener('touchend', () => { isDrawing = false; card.classList.remove('scratching'); checkProgress(); });

    /* ── Confetti ── */
    function spawnConfetti(parent) {
      const colors = ['#fdcb6e','#e17055','#74b9ff','#55efc4','#fd79a8','#a29bfe'];
      for (let i = 0; i < 28; i++) {
        const dot = document.createElement('span');
        dot.className = 'scratch-confetti';
        dot.style.cssText = `
          position:absolute;
          width:${6 + Math.random()*6}px;
          height:${6 + Math.random()*6}px;
          background:${colors[Math.floor(Math.random()*colors.length)]};
          border-radius:${Math.random()>.5?'50%':'3px'};
          left:${10+Math.random()*80}%;
          top:${10+Math.random()*80}%;
          pointer-events:none;
          animation: confetti-pop ${0.5+Math.random()*.6}s ease-out ${Math.random()*.3}s both;
          z-index:10;
        `;
        parent.appendChild(dot);
        setTimeout(() => dot.remove(), 1200);
      }
    }

    /* ── Khởi động ── */
    // Đợi layout ổn định trước khi vẽ
    if (document.readyState === 'complete') {
      initCanvas();
    } else {
      window.addEventListener('load', initCanvas, { once: true });
    }

    // Resize: vẽ lại nếu chưa done
    let resizeT;
    window.addEventListener('resize', () => {
      clearTimeout(resizeT);
      resizeT = setTimeout(() => { if (!isDone) initCanvas(); }, 250);
    });
  })();

  /* ══════════════════════════════════════════════════════
     COUNTDOWN TIMER
     ══════════════════════════════════════════════════════ */
  const deadline = new Date(p.deadline).getTime();
  const elDays   = $('cd-days');
  const elHours  = $('cd-hours');
  const elMins   = $('cd-mins');
  const elSecs   = $('cd-secs');
  const cdWrap   = $('js-promo-countdown');
  const expMsg   = $('js-promo-expired');

  function pad(n) { return String(n).padStart(2, '0'); }

  function flash(el) {
    if (!el) return;
    el.classList.remove('flash');
    void el.offsetWidth;
    el.classList.add('flash');
    setTimeout(() => el.classList.remove('flash'), 350);
  }

  let prevSecs = -1;
  function tick() {
    const diff = deadline - Date.now();
    if (diff <= 0) {
      if (cdWrap) cdWrap.style.display = 'none';
      if (expMsg) expMsg.style.display = 'flex';
      return;
    }
    const totalSecs = Math.floor(diff / 1000);
    const days  = Math.floor(totalSecs / 86400);
    const hours = Math.floor((totalSecs % 86400) / 3600);
    const mins  = Math.floor((totalSecs % 3600) / 60);
    const secs  = totalSecs % 60;
    if (elDays)  elDays.textContent  = pad(days);
    if (elHours) elHours.textContent = pad(hours);
    if (elMins)  elMins.textContent  = pad(mins);
    if (elSecs && secs !== prevSecs) {
      elSecs.textContent = pad(secs);
      flash(elSecs);
      if (secs === 59) flash(elMins);
      prevSecs = secs;
    }
    setTimeout(tick, 1000);
  }
  tick();

  /* ══════════════════════════════════════════════════════
     COPY MÃ
     ══════════════════════════════════════════════════════ */
  const copyBtn   = $('js-promo-copy');
  const copyIcon  = $('js-copy-icon');
  const copyLabel = $('js-copy-label');

  copyBtn?.addEventListener('click', async () => {
    const code = p.code || '';
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = code;
      ta.style.cssText = 'position:fixed;top:-999px;left:-999px';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    copyBtn.classList.add('copied');
    if (copyIcon)  copyIcon.className   = 'fa-solid fa-circle-check';
    if (copyLabel) copyLabel.textContent = 'Đã sao chép!';
    setTimeout(() => {
      copyBtn.classList.remove('copied');
      if (copyIcon)  copyIcon.className   = 'fa-regular fa-copy';
      if (copyLabel) copyLabel.textContent = 'Sao chép mã';
    }, 2500);
  });
})();
