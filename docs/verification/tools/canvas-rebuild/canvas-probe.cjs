'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const [app, output] = process.argv.slice(2);
const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const archive = path.join(app, 'Contents/Resources/app.asar');
const canvas = require(path.join(archive, 'node_modules/@napi-rs/canvas'));
const engine = require(path.join(archive, 'src/services/pdf/PdfEngine.js'));

function pdfFixture() {
  const texts = ['Heritage PDF rendering', 'Second page: service notes'];
  const streams = texts.map(text => '0.08 0.24 0.36 rg 0 0 480 270 re f\n'
    + '1 0.74 0.41 rg 24 35 110 75 re f\n'
    + `1 1 1 rg BT /F1 22 Tf 24 195 Td (${text}) Tj ET`);
  const objects = [null,
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R 6 0 R] /Count 2 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 480 270] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>',
    `<< /Length ${Buffer.byteLength(streams[0])} >>\nstream\n${streams[0]}\nendstream`,
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 480 270] /Resources << /Font << /F1 5 0 R >> >> /Contents 7 0 R >>',
    `<< /Length ${Buffer.byteLength(streams[1])} >>\nstream\n${streams[1]}\nendstream`,
  ];
  const parts = [Buffer.from('%PDF-1.7\n')];
  const offsets = [0];
  for (let i = 1; i < objects.length; i++) {
    offsets[i] = parts.reduce((sum, part) => sum + part.length, 0);
    parts.push(Buffer.from(`${i} 0 obj\n${objects[i]}\nendobj\n`));
  }
  const xref = parts.reduce((sum, part) => sum + part.length, 0);
  parts.push(Buffer.from(['xref', `0 ${objects.length}`, '0000000000 65535 f ',
    ...offsets.slice(1).map(n => `${String(n).padStart(10, '0')} 00000 n `),
    'trailer', `<< /Size ${objects.length} /Root 1 0 R >>`, 'startxref', String(xref), '%%EOF', '',
  ].join('\n')));
  return {bytes: Buffer.concat(parts), texts};
}

async function decodedRecord(bytes) {
  const image = await canvas.loadImage(bytes);
  const target = canvas.createCanvas(image.width, image.height);
  const ctx = target.getContext('2d');
  ctx.drawImage(image, 0, 0);
  const rgba = Buffer.from(ctx.getImageData(0, 0, image.width, image.height).data);
  assert.equal(image.width, 480);
  assert.equal(image.height, 270);
  assert.ok(new Set(rgba).size > 100, 'Expected nontrivial rendered image');
  return {width: image.width, height: image.height, encodedSha256: hash(bytes), rgbaSha256: hash(rgba)};
}

(async () => {
  fs.mkdirSync(output, {recursive: true});
  const fontPath = '/System/Library/Fonts/Supplemental/Arial.ttf';
  assert.ok(canvas.GlobalFonts.registerFromPath(fontPath, 'HeritageProbe'));
  const target = canvas.createCanvas(480, 270);
  const ctx = target.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 480, 270);
  gradient.addColorStop(0, '#123e61'); gradient.addColorStop(1, '#2b7868');
  ctx.fillStyle = gradient; ctx.fillRect(0, 0, 480, 270);
  ctx.font = '28px HeritageProbe'; ctx.fillStyle = '#ffffff';
  const texts = ['Heritage · Word of Truth', 'Слово истины · Иоанна 3:16'];
  texts.forEach((text, i) => ctx.fillText(text, 22, 52 + 45 * i));
  ctx.strokeStyle = '#ffc069'; ctx.lineWidth = 7; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(25, 145); ctx.bezierCurveTo(115, 100, 200, 205, 330, 151); ctx.stroke();
  ctx.globalAlpha = 0.45; ctx.fillStyle = '#ffc069'; ctx.fillRect(24, 184, 225, 42); ctx.globalAlpha = 1;
  ctx.fillStyle = 'white'; ctx.font = '20px HeritageProbe'; ctx.fillText('Teaching / Учение', 36, 212);
  const metrics = texts.map(text => ({text, width: ctx.measureText(text).width}));
  const images = {};
  for (const format of ['png', 'jpeg', 'webp']) {
    const encoded = await target.encode(format);
    fs.writeFileSync(path.join(output, `canvas.${format}`), encoded);
    images[format] = await decodedRecord(encoded);
  }
  const {bytes, texts: expectedTexts} = pdfFixture();
  fs.writeFileSync(path.join(output, 'fixture.pdf'), bytes);
  const inputHash = hash(bytes);
  const document = await engine.openPdf(bytes);
  const pages = [];
  try {
    assert.equal(document.pageCount, 2);
    for (let i = 0; i < 2; i++) {
      const text = await document.extractPageText(i, {maximumCharacters: 256});
      assert.equal(text.text, expectedTexts[i]);
      const rendered = await document.renderPageToPng(i, {maximumWidth: 480, maximumHeight: 270});
      assert.equal(rendered.width, 480); assert.equal(rendered.height, 270);
      fs.writeFileSync(path.join(output, `pdf-page-${i + 1}.png`), rendered.png);
      pages.push({text: text.text, ...await decodedRecord(rendered.png)});
    }
  } finally { await document.close(); }
  assert.equal(hash(bytes), inputHash);
  process.report.excludeNetwork = true;
  const loaded = process.report.getReport().sharedObjects.filter(p => /skia.*\.node$/.test(p));
  assert.equal(loaded.length, 1);
  assert.ok(loaded[0].startsWith(app + '/'));
  console.log(JSON.stringify({electron: process.versions.electron, node: process.versions.node,
    native: {path: loaded[0], sha256: hash(fs.readFileSync(loaded[0]))}, fontSha256: hash(fs.readFileSync(fontPath)),
    images, metrics, pdf: {renderer: engine.PDF_RENDERER_PROVENANCE.version, fixtureSha256: inputHash, pages}}, null, 2));
})().catch(error => { console.error(error); process.exitCode = 1; });
