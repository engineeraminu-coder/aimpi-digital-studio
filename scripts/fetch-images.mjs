// Run on a machine with internet:  npm i -D sharp && npm run images
// Reads images.manifest.json, downloads each licensed photo you chose, converts to WebP.
// Paste the Unsplash/Pexels download URL + photographer credit into the manifest.
import fs from 'fs';import sharp from 'sharp';
const m=JSON.parse(fs.readFileSync('images.manifest.json','utf8'));const credits=[];
for(const [name,e] of Object.entries(m)){
 if(!e.url){console.log('skip (no url):',name);continue}
 const buf=Buffer.from(await (await fetch(e.url)).arrayBuffer());
 await sharp(buf).resize({width:1800,withoutEnlargement:true}).webp({quality:78}).toFile(`public/images/${name}.webp`);
 credits.push(`${name}: ${e.credit||''} (${e.source||''})`);console.log('ok',name)}
fs.writeFileSync('public/images/CREDITS.txt',credits.join('\n'));
