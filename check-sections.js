const fs = require('fs');
const h = fs.readFileSync('t:/TungWorkspace/website/index.html', 'utf8');
const lines = h.split('\n');
const out = [];
lines.forEach(function(l, i) {
  const t = l.trim();
  if (t.indexOf('<!-- ===') > -1 || (t.indexOf('<section') > -1 && t.indexOf('section-header') === -1)) {
    out.push((i+1) + ': ' + t.substring(0, 90));
  }
});
fs.writeFileSync('t:/TungWorkspace/website/_sections.txt', out.join('\n'), 'utf8');
console.log('Written to _sections.txt');
