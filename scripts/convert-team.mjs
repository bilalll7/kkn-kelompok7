import fs from 'node:fs/promises';
import convert from 'heic-convert';
import sharp from 'sharp';
const dir='references/poto per orng';
await fs.mkdir('public/images/team',{recursive:true});
const members=[];
for(const file of (await fs.readdir(dir)).sort()){
 const raw=await fs.readFile(dir+'/'+file);
 const buffer=await convert({buffer:raw,format:'JPEG',quality:1});
 const meta=await sharp(buffer).metadata();
 const slug=file.split('.')[0].replaceAll(' ','-');
 await sharp(buffer).rotate().resize(900,1200,{fit:'contain',background:'#f5f6f8'}).webp({quality:88}).toFile('public/images/team/'+slug+'.webp');
 const name=file.split('.')[0].split(' ')[0];members.push({name:name[0].toUpperCase()+name.slice(1),src:'/images/team/'+slug+'.webp',original:file,width:meta.width,height:meta.height});
}
await fs.writeFile('src/data/portraits.ts','export const portraits = '+JSON.stringify(members,null,2)+';\n');
await fs.appendFile('ASSET_MAPPING.md','\n## Potret anggota\nNama tampilan mengikuti nama berkas, bukan identifikasi wajah. Peran dalam nama berkas tidak digunakan.\n\n|Asli|WebP|Dimensi sumber|Penggunaan|\n|---|---|---|---|\n'+members.map(m=>`|${m.original}|${m.src}|${m.width} × ${m.height}|/tentang|\n`).join(''));
console.log('Converted',members.length);
