'use strict';
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const app = fs.realpathSync(process.argv[2]);
const output = path.resolve(process.argv[3]);
const sharp = require(path.join(app, 'Contents/Resources/app.asar/node_modules/sharp'));
const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex');

(async () => {
  fs.mkdirSync(output, { recursive: true });
  const svg = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360"><defs><linearGradient id="g"><stop stop-color="#143e5b"/><stop offset="1" stop-color="#071824"/></linearGradient></defs><rect width="640" height="360" fill="url(#g)"/><circle cx="95" cy="220" r="58" fill="#e3b161"/><path d="M180 170 Q260 290 340 170 L310 275 Z" fill="#9ccdb3" opacity=".65"/><g fill="white" font-family="Arial" font-size="30"><text x="32" y="56">Grace and peace</text><text x="32" y="108">Благодать и мир</text></g><rect x="408" y="170" width="144" height="104" rx="16" fill="#ffffff" opacity=".35"/></svg>');
  fs.writeFileSync(path.join(output, 'source.svg'), svg);
  const png = await sharp(svg).resize(960, 540).png().toBuffer();
  const fixtures = {
    png,
    jpeg: await sharp(png).jpeg({quality: 90}).toBuffer(),
    webp: await sharp(png).webp({quality: 90}).toBuffer(),
    avif: await sharp(png).avif({lossless: true, effort: 4}).toBuffer(),
    tiff: await sharp(png).tiff({compression: 'lzw'}).toBuffer(),
    gif: await sharp(png).gif({colours: 128}).toBuffer(),
    palettePng: await sharp(png).png({palette: true, colours: 128}).toBuffer(),
    pangoText: await sharp({text: {text: 'Grace and peace\nБлагодать и мир', font: 'Arial 28', rgba: true}}).png().toBuffer(),
  };
  const outputs = {};
  for (const [name, encoded] of Object.entries(fixtures)) {
    const metadata = await sharp(encoded).metadata();
    const decoded = await sharp(encoded).ensureAlpha().raw().toBuffer({resolveWithObject: true});
    if (decoded.info.channels !== 4 || decoded.info.width < 1 || decoded.info.height < 1) throw new Error(`Invalid decoded image: ${name}`);
    if (name !== 'pangoText' && (decoded.info.width !== 960 || decoded.info.height !== 540)) throw new Error(`Wrong dimensions: ${name}`);
    fs.writeFileSync(path.join(output, `${name}.${metadata.format}`), encoded);
    fs.writeFileSync(path.join(output, `${name}.rgba`), decoded.data);
    outputs[name] = {bytes: encoded.length, encodedSha256: hash(encoded), decodedSha256: hash(decoded.data), format: metadata.format, width: decoded.info.width, height: decoded.info.height, channels: decoded.info.channels};
  }
  const loadedLibraries = process.report.getReport().sharedObjects.filter(p => /^lib(?:vips|ffmpeg).*\.dylib$/.test(path.basename(p)));
  if (loadedLibraries.length !== 2 || loadedLibraries.some(p => !p.startsWith(app + '/'))) throw new Error('Unexpected library fallback outside the chosen app.');
  const report = {app, versions: sharp.versions, outputs, loadedLibraries, formats: sharp.format, electron: process.versions.electron};
  fs.writeFileSync(path.join(output, 'result.json'), JSON.stringify(report, null, 2)+'\n');
  console.log(JSON.stringify(report));
})().catch(error => { console.error(error.stack); process.exitCode = 1; });
