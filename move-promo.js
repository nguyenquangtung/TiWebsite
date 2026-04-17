const fs = require('fs');
const htmlFile = 't:/TungWorkspace/website/index.html';
let html = fs.readFileSync(htmlFile, 'utf8');

// Lay promo block
const promoStart = html.indexOf('  <!-- ===================== PROMO ===================== -->');
const promoEnd   = html.indexOf('  <!-- ===================== CTA ===================== -->');

if (promoStart === -1 || promoEnd === -1) {
  console.log('ERROR: markers not found', { promoStart, promoEnd });
  process.exit(1);
}

const promoBlock = html.substring(promoStart, promoEnd);

// Xoa promo khoi vi tri cu
let htmlNoPromo = html.substring(0, promoStart) + html.substring(promoEnd);

// Chen promo vao sau hero (truoc stats)
const statsMarker = '  <!-- ===================== STATS ===================== -->';
const insertIdx = htmlNoPromo.indexOf(statsMarker);

if (insertIdx === -1) {
  console.log('ERROR: stats marker not found');
  process.exit(1);
}

const result = htmlNoPromo.substring(0, insertIdx) + promoBlock + '\n' + htmlNoPromo.substring(insertIdx);

fs.writeFileSync(htmlFile, result, 'utf8');
console.log('Done. Promo moved up. File length:', result.length);
