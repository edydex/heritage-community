'use strict';
const path = require('node:path');
const crypto = require('node:crypto');
const app = process.argv[2];
const archive = path.join(app, 'Contents/Resources/app.asar');
const sharp = require(path.join(archive, 'node_modules/sharp'));
const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
(async () => {
  const svg = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="128" height="72"><rect width="128" height="72" fill="#184e71"/><circle cx="38" cy="36" r="23" fill="#ffbf69"/><path d="M80 10 L112 62 L66 62 Z" fill="white"/></svg>');
  const png = await sharp(svg).resize(256, 144).png().toBuffer();
  const jpeg = await sharp(png).jpeg({ quality: 90 }).toBuffer();
  const webp = await sharp(png).webp({ quality: 90 }).toBuffer();
  const outputs = {};
  for (const [name, encoded] of Object.entries({ png, jpeg, webp })) {
    const decoded = await sharp(encoded).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    if (decoded.info.width !== 256 || decoded.info.height !== 144 || decoded.info.channels !== 4) throw new Error('Unexpected image dimensions.');
    outputs[name] = { encodedSha256: hash(encoded), decodedSha256: hash(decoded.data), width: decoded.info.width, height: decoded.info.height };
  }
  const loaded = process.report.getReport().sharedObjects.filter(p => /libvips|libffmpeg/.test(p));
  if (loaded.length !== 2 || loaded.some(p => !p.startsWith(app + '/'))) throw new Error('Expected the copied app libraries, not system fallbacks.');
  console.log(JSON.stringify({ outputs, loadedLibraries: loaded, vipsVersion: sharp.versions.vips, electron: process.versions.electron }));
})().catch(error => { console.error(error.message); process.exitCode = 1; });
