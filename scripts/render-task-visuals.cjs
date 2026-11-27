// Optional local authoring tool. Build verifies committed outputs without Sharp.
// NODE_PATH=/path/to/node_modules node scripts/render-task-visuals.cjs
const fs = require('node:fs');
const crypto = require('node:crypto');
const sharp = require('sharp');
const root = 'assets/task-visuals';
const input = fs.readFileSync(`${root}/content.json`);
const rows = JSON.parse(input);
const escape = s => s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const hash = s => crypto.createHash('sha256').update(s).digest('hex');
function wrap(s, max) {
  const words = /[\u3400-\u9fff]/.test(s) ? [...s] : s.split(' ');
  const sep = /[\u3400-\u9fff]/.test(s) ? '' : ' ';
  const result = []; let line = '';
  for (const word of words) { if ((line + sep + word).trim().length > max && line) { result.push(line); line = word; } else line = (line + sep + word).trim(); }
  if (line) result.push(line); return result;
}
(async () => {
 const manifest = {contentSha256: hash(input), rendererSha256: hash(fs.readFileSync(__filename)), files:{}};
 const registry = JSON.parse(fs.readFileSync('data/editorial-images.json'));
 for (const row of rows) for (const [locale,[title,labels,boundary]] of Object.entries(row.locales)) {
  const cn = locale !== 'en';
  const text = (x,y,s,size=24,color='#24394c',weight=500,anchor='middle') => `<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="${size}" fill="${color}" font-weight="${weight}">${escape(s)}</text>`;
  const line = (d, arrow=true, color='#287c75') => `<path d="${d}" stroke="${color}" stroke-width="3" fill="none"${arrow?' marker-end="url(#arrow)"':''}/>`;
  const node = (i,y,options={}) => {
   const width=options.width??552, x=options.x??44, center=x+width/2;
   const lines=wrap(labels[i],cn?22:40); if(lines.length>2) throw Error(`Too much text: ${row.slug}/${locale}/${i}`);
   return `<rect x="${x}" y="${y}" width="${width}" height="78" rx="${options.round?39:12}" fill="${options.fill??'#e9f5f0'}" stroke="#39877d" stroke-width="2"/>`+lines.map((s,j)=>text(center,y+(lines.length===1?47:32)+j*29,s,24)).join('');
  };
  let svg='<svg xmlns="http://www.w3.org/2000/svg" width="640" height="640" viewBox="0 0 640 640"><defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8" fill="#287c75"/></marker></defs><rect width="640" height="640" fill="#fcfdfb"/><g font-family="Arial, PingFang SC, PingFang TC, sans-serif">';
  svg+=text(320,43,title,cn?25:24,'#133f40',700);
  const y=[85,203,321,439];
  switch(row.mode) {
   case 'storage':
    svg+=text(44,110,labels[0],24,'#24394c',500,'start')+'<rect x="44" y="128" width="396" height="40" rx="5" fill="#65bca1"/>';
    svg+=text(44,218,labels[1],24,'#24394c',500,'start')+'<rect x="44" y="236" width="528" height="40" rx="5" fill="#287c75"/>';
    svg+=node(2,321,{fill:'#fff4df'})+node(3,439); break;
   case 'parallel':
    // Three independent lanes feed one comparison/check, not one another.
    [0,1,2].forEach((i)=>{svg+=node(i,85+i*110,{width:510,x:44})+line(`M554 ${124+i*110} H590 V420 H320 V435`);});
    svg+=node(3,439,{fill:'#d2ebe3'});break;
   case 'gates':
    svg+=node(0,85)+node(1,203)+line('M596 124 H615 V304 H320 V317')+line('M596 242 H615',false);
    svg+=node(2,321,{fill:'#d2ebe3'})+line('M320 399 V434')+node(3,439);break;
   case 'split':
    svg+=node(0,85,{round:true})+line('M320 163 V180 H24 V360 H39')+line('M320 180 V198');
    svg+=node(1,203)+node(2,321,{fill:'#fff4df'})+line('M596 242 H615 V420 H320 V434')+node(3,439);break;
   case 'separate':
    // Two independent pairs; dashed separator prevents an implied sequence.
    svg+=node(0,85)+node(1,185,{fill:'#fff4df'})+line('M44 285 H596',false,'#a6b6bd')+node(2,305)+node(3,405,{fill:'#fff4df'}); break;
   case 'clock':
    // All four labels align to one vertical instant, not successive launches.
    svg+=line('M35 95 V512',false);
    y.forEach((p,i)=>{svg+=line(`M35 ${p+39} H44`,false)+`<circle cx="35" cy="${p+39}" r="6" fill="#287c75"/>`+node(i,p);});break;
   case 'filter':
    y.forEach((p,i)=>{const width=552-i*34;svg+=node(i,p,{width,x:(640-width)/2});if(i<3)svg+=line(`M320 ${p+78} V${y[i+1]-5}`);});break;
   case 'timeline':
    svg+=line('M27 95 V515',false);y.forEach((p,i)=>{svg+=`<circle cx="27" cy="${p+39}" r="7" fill="#287c75"/>`+node(i,p,{fill:i===3?'#fff4df':'#e9f5f0'});});break;
   default:
    y.forEach((p,i)=>{svg+=node(i,p);if(i<3)svg+=line(`M320 ${p+78} V${y[i+1]-5}`);});
    if(row.mode==='cycle')svg+=line('M596 478 H616 V66 H320 V80');
  }
  const notes=wrap(boundary,cn?32:56);if(notes.length>2)throw Error('Boundary too long');
  svg+=notes.map((s,i)=>text(320,557+i*24,s,18,'#4e6373')).join('');
  svg+=text(320,620,locale==='zh-Hant'?'AniimoDex · 原創解釋圖 · 非遊戲介面':cn?'AniimoDex · 原创解释图 · 非游戏界面':'AniimoDex · Original explanation · Not game UI',16,'#4e6373')+'</g></svg>\n';
  const name=`${row.kind}-${locale}`, sp=`${root}/${name}.svg`, wp=`public/images/guides/${name}-diagram.webp`;
  fs.writeFileSync(sp,svg);await sharp(Buffer.from(svg)).webp({quality:88}).toFile(wp);
  for(const file of [sp,wp])manifest.files[file]=hash(fs.readFileSync(file));
  const explanation = labels.join(cn?'；':'; ');
  registry[name]={src:wp.replace('public',''),width:640,height:640,
   alt:`${title}: ${explanation}.`,
   caption:locale==='zh-Hant'?`AniimoDex 原創解釋圖：${title}。${boundary} 依據本頁已註明日期的正文與來源整理；不是實機截圖，未新增遊戲驗證。`:cn?`AniimoDex 原创解释图：${title}。${boundary} 依据本页已注明日期的正文与来源整理；不是实机截图，未新增游戏验证。`:`Original AniimoDex explanation: ${title}. ${boundary} Based on this page’s dated text and sources, not a game capture or new gameplay verification.`,
   source:`/${locale}/guide/${row.slug}/#official-sources`, rights:'Original AniimoDex SVG geometry and editorial wording, rasterized to WebP with Sharp. No copied game artwork, UI or external media. Owned site illustration; underlying game names remain their owners’ property.',
   observedAt:'2026-11-27',previewUsage:'body-only',previewReason:'Task-specific labelled relationship diagram; helps interpret the HTML answer but is text-led, so not selected as a preferred search/social image.'};
 }
 fs.writeFileSync(`${root}/manifest.json`,JSON.stringify(manifest,null,2)+'\n');
 fs.writeFileSync('data/editorial-images.json',JSON.stringify(registry,null,2)+'\n');
 console.log(`Rendered ${rows.length} tasks in 3 locales.`);
})();
