const fs = require('fs');
const cssFile = 't:/TungWorkspace/website/style.css';
let css = fs.readFileSync(cssFile, 'utf8');

const mapCSS = `

/* ============================================================
   MAP SECTION
   ============================================================ */
.map-section { padding: 80px 0; background: var(--bg); }
.map-wrapper {
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 32px;
  align-items: start;
}

/* Info column */
.map-info {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.map-info-card {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  background: var(--white);
  border-radius: var(--radius-sm);
  padding: 16px 18px;
  box-shadow: var(--shadow);
}
.map-info-icon {
  width: 38px; height: 38px;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--primary), var(--primary-light));
  color: #fff;
  display: flex; align-items: center; justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
}
.map-info-card h4 { font-size: .88rem; font-weight: 700; color: var(--text); margin: 0 0 3px; }
.map-info-card p  { font-size: .82rem; color: var(--text-light); margin: 0; }
.map-info-card a  { color: var(--primary); font-weight: 700; }

/* Areas card */
.map-areas {
  background: var(--white);
  border-radius: var(--radius-sm);
  padding: 16px 18px;
  box-shadow: 0 2px 12px rgba(0,0,0,.07);
  flex: 1;
}
.map-areas h4 { margin: 0 0 12px; font-size: .95rem; font-weight: 700; color: #1e293b; display: flex; align-items: center; gap: 8px; }
.map-areas h4 i { color: #e8380d; }
.map-areas ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 7px; }
.map-areas li { font-size: .85rem; color: #475569; display: flex; align-items: center; gap: 8px; }
.map-areas li i { color: #22c55e; font-size: .8rem; }

/* Call button in map */
.map-call-btn { width: 100%; justify-content: center; font-size: 1rem; padding: 14px 20px; }

/* Map embed column */
.map-embed-wrap {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 40px rgba(0,0,0,.14);
  min-height: 480px;
}
.map-embed-wrap iframe { display: block; width: 100%; height: 100%; min-height: 480px; }

/* Badge overlay */
.map-overlay-badge {
  position: absolute;
  bottom: 20px; right: 20px;
  background: linear-gradient(135deg, #e8380d, #ff6b3d);
  color: #fff;
  border-radius: 14px;
  padding: 12px 18px;
  display: flex; align-items: center; gap: 10px;
  box-shadow: 0 4px 20px rgba(232,56,13,.45);
  font-size: .85rem;
  line-height: 1.3;
  pointer-events: none;
}
.map-overlay-badge i { font-size: 1.3rem; }
.map-overlay-badge strong { font-size: 1.1rem; font-weight: 800; }

/* Responsive map */
@media (max-width: 1024px) {
  .map-wrapper { grid-template-columns: 1fr; }
  .map-embed-wrap { min-height: 380px; }
  .map-embed-wrap iframe { min-height: 380px; }
  .map-info { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .map-areas { grid-column: 1 / -1; }
  .map-call-btn { grid-column: 1 / -1; }
}
@media (max-width: 640px) {
  .map-section { padding: 60px 0; }
  .map-info { display: flex; flex-direction: column; }
  .map-embed-wrap { min-height: 300px; }
  .map-embed-wrap iframe { min-height: 300px; }
  .map-overlay-badge { bottom: 12px; right: 12px; padding: 10px 14px; font-size: .78rem; }
}

`;

// Insert mapCSS right before the promo block
const promoMarker = '/* ============================================================\n   PROMO SECTION';
const idx = css.indexOf(promoMarker);
if (idx === -1) {
  // Append at end
  css = css + mapCSS;
  console.log('Appended map CSS at end');
} else {
  css = css.substring(0, idx) + mapCSS + css.substring(idx);
  console.log('Inserted map CSS before promo block at index:', idx);
}

fs.writeFileSync(cssFile, css, 'utf8');
console.log('Done. Total length:', css.length);
