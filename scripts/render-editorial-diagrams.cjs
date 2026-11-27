// Optional authoring tool. Install Sharp in your tooling environment, then run
// NODE_PATH=/path/to/node_modules node scripts/render-editorial-diagrams.cjs
// Build/CI validates the checked-in assets without needing Sharp.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const sharp = require('sharp');
const root = 'assets/editorial-diagrams';
const content = fs.readFileSync(`${root}/content.json`);
const data = JSON.parse(content);
const esc = s => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
(async () => {
  const manifest = { contentSha256: crypto.createHash('sha256').update(content).digest('hex'), files: {} };
  for (const [kind, group] of Object.entries(data)) for (const locale of ['en', 'zh-Hans', 'zh-Hant']) {
    const [title, subtitle, cards, footer] = group[locale];
    const text = (x,y,s,size=23,color='#d8e1ed',weight=400) => `<text x="${x}" y="${y}" font-size="${size}" fill="${color}" font-weight="${weight}">${esc(s)}</text>`;
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="720" height="720" viewBox="0 0 720 720"><rect width="720" height="720" fill="#101b2b"/><g font-family="Arial, PingFang SC, PingFang TC, sans-serif">`;
    svg += text(30,48,title,28,'#ffffff',700) + text(30,84,subtitle,20,'#b3c6da');
    cards.forEach(([heading, lines], i) => {
      const y = 115 + i*174;
      svg += `<rect x="24" y="${y}" width="672" height="148" rx="12" fill="#1d3048" stroke="#53758f"/>`;
      svg += text(44,y+36,heading,25,'#9ee4d2',700);
      lines.forEach((line,j)=>svg += text(44,y+72+j*29,line));
      if (i<2 && group.mode==='flow') svg += `<path d="M360 ${y+153} v14 m-6 -6 6 6 6 -6" stroke="#9ee4d2" stroke-width="3" fill="none"/>`;
    });
    svg += text(30,667,footer,18,'#b3c6da') + text(30,702,'AniimoDex • Editorial explanation / 编辑说明 / 編輯說明',16,'#88a1ba')+'</g></svg>';
    const name=`${kind}-${locale}`;
    const svgPath=`${root}/${name}.svg`, webPath=`public/images/guides/${name}-diagram.webp`;
    fs.writeFileSync(svgPath,svg+'\n');
    await sharp(Buffer.from(svg)).webp({quality:88}).toFile(webPath);
    for (const file of [svgPath,webPath]) manifest.files[file]=crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
  }
  fs.writeFileSync(`${root}/manifest.json`,JSON.stringify(manifest,null,2)+'\n');
})();
