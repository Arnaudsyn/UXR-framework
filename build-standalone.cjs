// Keep the portable HTML copy in sync with the hosted source.
const fs = require('node:fs');
const path = require('node:path');
const read = file => fs.readFileSync(path.join(__dirname, 'docs', file), 'utf8');
let html = read('index.html')
  .replace(/<link rel="stylesheet" href="styles\.css(?:\?[^\"]*)?">/, () => `<style>${read('styles.css')}</style>`)
  .replace('<script src="content.js" defer></script>', '')
  .replace(/<script src="app\.js(?:\?[^\"]*)?" defer><\/script>/, '')
  .replace('<script src="knowledge.js" defer></script>', '')
  .replace('</body>', () => `<script>${read('content.js')}</script><script>${read('knowledge.js')}</script><script>${read('app.js')}</script></body>`);
fs.writeFileSync(path.join(__dirname, 'research-compass.html'), html);
console.log('Standalone HTML updated.');
