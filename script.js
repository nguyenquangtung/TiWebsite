// ========================
// SCROLL FADE-IN ANIMATION
// ========================
const fadeEls = document.querySelectorAll(
  '.service-card, .why-card, .testimonial-card, .step, .stat-item'
);

fadeEls.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

fadeEls.forEach(el => observer.observe(el));

// ========================
// STICKY HEADER SHADOW
// ========================
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)';
  } else {
    header.style.boxShadow = '0 2px 12px rgba(0,0,0,0.07)';
  }
});

// ========================
// COUNTER ANIMATION
// ========================
function animateCounter(el, target, suffix = '') {
  let start = 0;
  const duration = 1800;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const nums = [
          { el: document.querySelectorAll('.stat-number')[0], val: 500, suffix: '+' },
          { el: document.querySelectorAll('.stat-number')[1], val: 30, suffix: "'" },
          { el: document.querySelectorAll('.stat-number')[2], val: 5, suffix: '+' },
          { el: document.querySelectorAll('.stat-number')[3], val: 24, suffix: '/7' },
        ];
        nums.forEach(({ el, val, suffix }) => {
          if (el) animateCounter(el, val, suffix);
        });
        statsObserver.disconnect();
      }
    });
  },
  { threshold: 0.3 }
);

const statsBanner = document.querySelector('.stats-banner');
if (statsBanner) statsObserver.observe(statsBanner);

// ========================
// PHONE CLICK TRACKING
// ========================
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
  link.addEventListener('click', () => {
    console.log('📞 Cuộc gọi được thực hiện từ website');
  });
});

// ========================
// SMOOTH SCROLL FOR ANCHORS
// ========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
