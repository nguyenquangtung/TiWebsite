const fs = require('fs');
const path = require('path');

const cssFile = path.join(__dirname, 'style.css');
const existing = fs.readFileSync(cssFile, 'utf8');

// Remove old promo CSS block (everything from /* ===== PROMO or .promo-section to end of that block)
// We'll find the promo section marker and remove from there to end of file, then re-add


const promoCSS = `

/* ============================================================
   PROMO SECTION - CHU DE LE 30/4 - 1/5
   ============================================================ */

/* -- Wrapper section -- */
.promo-section {
  position: relative;
  padding: 0 0 60px;
  background: linear-gradient(160deg, #c0392b 0%, #e84118 35%, #f39c12 70%, #e84118 100%);
  overflow: hidden;
}

/* -- Phao hoa nen -- */
.promo-fireworks { position: absolute; inset: 0; pointer-events: none; z-index: 0; }
.fw { position: absolute; font-size: 2.2rem; animation: fw-float 4s ease-in-out infinite; opacity: .55; user-select: none; }
.fw-1 { top: 8%;  left: 5%;  animation-delay: 0s;   font-size: 2.8rem; }
.fw-2 { top: 20%; right: 6%; animation-delay: .8s;  font-size: 2rem; }
.fw-3 { top: 55%; left: 3%;  animation-delay: 1.5s; font-size: 1.8rem; }
.fw-4 { bottom: 15%; right: 4%; animation-delay: 2.2s; font-size: 2.5rem; }
.fw-5 { bottom: 30%; left: 10%; animation-delay: .4s; font-size: 1.6rem; }
@keyframes fw-float {
  0%,100% { transform: translateY(0) rotate(-10deg) scale(1); opacity: .5; }
  50%      { transform: translateY(-22px) rotate(10deg) scale(1.15); opacity: .85; }
}

/* -- Ribbon ticker -- */
.promo-ribbon-bar { background: rgba(0,0,0,.35); backdrop-filter: blur(4px); overflow: hidden; white-space: nowrap; padding: 10px 0; position: relative; z-index: 2; }
.ribbon-track { display: inline-block; animation: ribbon-scroll 32s linear infinite; white-space: nowrap; }
.ribbon-track span { display: inline-block; color: #fff; font-size: .82rem; font-weight: 700; letter-spacing: .04em; padding: 0 28px; opacity: .92; }
.ribbon-track span:nth-child(even) { color: #fde68a; }
@keyframes ribbon-scroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* -- Layout container -- */
.promo-container { position: relative; z-index: 2; display: grid; grid-template-columns: 1fr 1fr; gap: 36px; align-items: start; padding-top: 44px; }

/* -- LEFT COL -- */
.promo-left-col { display: flex; flex-direction: column; gap: 24px; }
.promo-holiday-header { display: flex; flex-direction: column; gap: 12px; }
.promo-flag-row { display: flex; align-items: center; gap: 14px; }
.vn-flag { font-size: 2rem; filter: drop-shadow(0 2px 6px rgba(0,0,0,.3)); }
.promo-dates-badge { display: flex; align-items: center; gap: 6px; }
.date-pill { background: #fff; color: #c0392b; font-size: .85rem; font-weight: 900; padding: 4px 14px; border-radius: 50px; letter-spacing: .04em; box-shadow: 0 2px 8px rgba(0,0,0,.2); }
.date-dash { color: #fff; font-weight: 800; font-size: 1.1rem; }
.promo-holiday-tag { display: inline-block; background: rgba(255,255,255,.18); border: 1.5px solid rgba(255,255,255,.45); color: #fff; font-size: .78rem; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; padding: 5px 16px; border-radius: 50px; backdrop-filter: blur(6px); width: fit-content; }

.promo-title { font-size: clamp(1.75rem, 4vw, 2.6rem); font-weight: 900; color: #fff; line-height: 1.2; text-shadow: 0 2px 12px rgba(0,0,0,.25); }
.promo-title-highlight { color: #fde68a; }
.promo-subtitle { color: rgba(255,255,255,.88); font-size: .95rem; line-height: 1.65; }

/* Countdown */
.promo-countdown-wrap { background: rgba(0,0,0,.28); border: 1.5px solid rgba(255,255,255,.2); border-radius: 18px; padding: 18px 20px; backdrop-filter: blur(8px); }
.countdown-label { color: rgba(255,255,255,.8); font-size: .8rem; font-weight: 600; margin-bottom: 12px; display: flex; align-items: center; gap: 7px; }
.countdown-label i { color: #fde68a; }
.promo-countdown { display: flex; align-items: center; gap: 6px; }
.cd-block { display: flex; flex-direction: column; align-items: center; min-width: 58px; background: rgba(255,255,255,.15); border-radius: 12px; padding: 10px 8px 8px; }
.cd-num { font-size: 2rem; font-weight: 900; color: #fff; line-height: 1; font-variant-numeric: tabular-nums; text-shadow: 0 2px 8px rgba(0,0,0,.3); }
.cd-unit { font-size: .65rem; font-weight: 700; color: #fde68a; letter-spacing: .06em; text-transform: uppercase; margin-top: 3px; }
.cd-sep { font-size: 1.6rem; font-weight: 900; color: #fde68a; line-height: 1; margin-bottom: 12px; }
.promo-expired-msg { color: #fde68a; font-size: .88rem; font-weight: 700; display: flex; align-items: center; gap: 8px; margin-top: 8px; }

/* CTA buttons */
.promo-actions { display: flex; flex-direction: column; gap: 12px; }
.btn-promo-call,
.btn-promo-zalo { display: flex; align-items: center; gap: 14px; border-radius: 16px; padding: 14px 22px; font-size: 1rem; font-weight: 800; cursor: pointer; border: none; text-decoration: none; transition: transform .18s, box-shadow .18s; }
.btn-promo-call { background: linear-gradient(135deg, #fff 0%, #f1f5f9 100%); color: #c0392b; box-shadow: 0 6px 24px rgba(0,0,0,.22); }
.btn-promo-call i { font-size: 1.25rem; color: #c0392b; }
.btn-promo-call small { display: block; font-size: .72rem; font-weight: 500; color: #64748b; }
.btn-promo-call:hover { transform: translateY(-3px); box-shadow: 0 10px 32px rgba(0,0,0,.28); }
.btn-promo-zalo { background: linear-gradient(135deg, #0068ff 0%, #0096ff 100%); color: #fff; box-shadow: 0 6px 24px rgba(0,104,255,.35); }
.btn-promo-zalo i { font-size: 1.25rem; }
.btn-promo-zalo small { display: block; font-size: .72rem; font-weight: 500; opacity: .8; }
.btn-promo-zalo:hover { transform: translateY(-3px); box-shadow: 0 10px 32px rgba(0,104,255,.45); }
.pulse { animation: pulse-cta 2.2s infinite; }
@keyframes pulse-cta {
  0%,100% { box-shadow: 0 6px 24px rgba(255,255,255,.25); }
  50%      { box-shadow: 0 6px 36px rgba(255,255,255,.55), 0 0 0 8px rgba(255,255,255,.08); }
}

/* -- RIGHT COL -- */
.promo-right-col { display: flex; flex-direction: column; gap: 22px; align-items: center; }

/* Starburst badge */
.promo-starburst-wrap { display: flex; justify-content: center; }
.promo-starburst {
  position: relative;
  width: 150px; height: 150px;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  background: #fde68a; color: #c0392b;
  clip-path: polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%);
  filter: drop-shadow(0 4px 16px rgba(0,0,0,.3));
  animation: star-spin 8s linear infinite;
}
@keyframes star-spin {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.promo-starburst > * { animation: star-spin-rev 8s linear infinite; }
@keyframes star-spin-rev {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(-360deg); }
}
.star-off { font-size: 2.6rem; font-weight: 900; line-height: 1; color: #c0392b; }
.star-label { font-size: .72rem; font-weight: 900; letter-spacing: .1em; text-transform: uppercase; color: #7f1d1d; margin-top: 2px; }
.star-sub { font-size: .65rem; color: #92400e; font-weight: 600; }

/* Promo perks list */
.promo-perks { width: 100%; list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
.promo-perks li { display: flex; align-items: center; gap: 12px; background: rgba(255,255,255,.15); border: 1.5px solid rgba(255,255,255,.25); border-radius: 12px; padding: 12px 16px; color: #fff; font-size: .9rem; font-weight: 600; backdrop-filter: blur(6px); transition: background .2s; }
.promo-perks li:hover { background: rgba(255,255,255,.22); }
.promo-perks li .perk-icon { font-size: 1.3rem; flex-shrink: 0; }

/* -- Scratch card -- */
.scratch-wrap { width: 100%; background: rgba(0,0,0,.25); border: 1.5px solid rgba(255,255,255,.2); border-radius: 20px; padding: 20px; backdrop-filter: blur(8px); display: flex; flex-direction: column; align-items: center; gap: 12px; }
.promo-code-label { color: #fff; font-size: .88rem; font-weight: 700; text-align: center; }
.scratch-card { position: relative; width: 260px; height: 120px; border-radius: 16px; overflow: hidden; cursor: crosshair; box-shadow: 0 6px 24px rgba(0,0,0,.3); user-select: none; }
.scratch-reveal { position: absolute; inset: 0; background: linear-gradient(135deg, #fff8e1 0%, #fff3cd 100%); display: flex; align-items: center; justify-content: center; }
.scratch-code-inner { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.scratch-icon { font-size: 1.6rem; }
.scratch-code-text { font-size: 2rem; font-weight: 900; color: #c0392b; letter-spacing: .1em; }
.scratch-label { font-size: .7rem; color: #78350f; font-weight: 600; }
.scratch-canvas { position: absolute; inset: 0; width: 100%; height: 100%; border-radius: 16px; }
.scratch-hint { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; gap: 8px; background: linear-gradient(135deg, #c0392b 0%, #e84118 50%, #f39c12 100%); color: #fff; font-size: .9rem; font-weight: 700; pointer-events: none; border-radius: 16px; transition: opacity .3s; }
.scratch-hint i { font-size: 1.1rem; animation: wiggle .8s ease-in-out infinite alternate; }
@keyframes wiggle {
  0%   { transform: rotate(-10deg) scale(1); }
  100% { transform: rotate(10deg) scale(1.2); }
}
.scratch-actions { display: flex; flex-direction: column; align-items: center; gap: 8px; width: 100%; }
.promo-copy-btn { display: flex; align-items: center; gap: 8px; background: #fff; color: #c0392b; border: none; border-radius: 50px; padding: 10px 28px; font-size: .9rem; font-weight: 800; cursor: pointer; transition: transform .18s, box-shadow .18s; box-shadow: 0 4px 14px rgba(0,0,0,.2); }
.promo-copy-btn:hover { transform: scale(1.04); box-shadow: 0 6px 20px rgba(0,0,0,.28); }
.promo-code-hint { color: rgba(255,255,255,.8); font-size: .78rem; text-align: center; }
.scratch-sub-hint { color: rgba(255,255,255,.65); font-size: .78rem; text-align: center; }
.promo-note { color: rgba(255,255,255,.55); font-size: .75rem; text-align: center; font-style: italic; }

/* Confetti canvas */
#confetti-canvas { position: fixed; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 9999; }

/* -- Responsive -- */
@media (max-width: 960px) {
  .promo-container { grid-template-columns: 1fr; gap: 28px; padding-top: 36px; }
  .promo-right-col { align-items: stretch; }
  .promo-starburst-wrap { justify-content: flex-start; }
}
@media (max-width: 640px) {
  .promo-section { padding-bottom: 44px; }
  .promo-container { padding-top: 28px; gap: 24px; }
  .promo-title { font-size: 1.65rem; }
  .cd-block { min-width: 50px; padding: 8px 6px 6px; }
  .cd-num { font-size: 1.65rem; }
  .promo-starburst { width: 120px; height: 120px; }
  .star-off { font-size: 2rem; }
  .scratch-card { width: 240px; height: 110px; }
  .fw { font-size: 1.4rem; }
  .fw-1 { font-size: 2rem; }
  .fw-4 { font-size: 1.8rem; }
  .ribbon-track span { font-size: .75rem; padding: 0 18px; }
  .btn-promo-call,
  .btn-promo-zalo { font-size: .9rem; padding: 12px 18px; gap: 10px; }
}
`;

// Find the old promo section in CSS and remove it
// Look for "/* ===== PROMO" or find first occurrence of ".promo-section" block start
let base = existing.replace(/\n\/\* test \*\//g, '');

// Remove old promo block: find marker /* ===== PROMO or the section starting with .promo-section
const promoMarkers = [
  '/* ===== PROMO',
  '/* =====\n   PROMO',
];
let cutIdx = -1;
for (const marker of promoMarkers) {
  const i = base.indexOf(marker);
  if (i > -1 && (cutIdx === -1 || i < cutIdx)) cutIdx = i;
}
// Also check for .promo-bg-shapes or .promo-section as fallback
if (cutIdx === -1) {
  // find the line that starts the promo section (look 200 chars before .promo-section)
  const psIdx = base.indexOf('.promo-section');
  if (psIdx > -1) {
    // Go back to find the preceding comment block start
    const before = base.lastIndexOf('/* =====', psIdx);
    cutIdx = before > -1 ? before : psIdx;
  }
}

if (cutIdx > -1) {
  base = base.substring(0, cutIdx).trimEnd();
  console.log('Old promo CSS removed at index: ' + cutIdx);
} else {
  console.log('No old promo CSS found, appending fresh.');
}

fs.writeFileSync(cssFile, base + promoCSS, 'utf8');
console.log('Done! CSS promo added. Total length: ' + (base + promoCSS).length);
