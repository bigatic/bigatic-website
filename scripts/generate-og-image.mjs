import sharp from 'sharp';
import { Buffer } from 'node:buffer';

const width = 1200;
const height = 630;

const background = Buffer.from(`
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#f8fbff"/>
        <stop offset="1" stop-color="#edf7f1"/>
      </linearGradient>
      <linearGradient id="line" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#0757b5"/>
        <stop offset="1" stop-color="#00a828"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#bg)"/>
    <circle cx="1110" cy="20" r="250" fill="#0757b5" opacity=".045"/>
    <circle cx="1110" cy="20" r="172" fill="none" stroke="#0757b5" stroke-width="2" opacity=".12"/>
    <circle cx="70" cy="620" r="180" fill="#00a828" opacity=".045"/>
    <rect x="70" y="74" width="354" height="354" rx="48" fill="#fff" stroke="#d7e2ec"/>
    <g fill="#17395f" font-family="Arial, Helvetica, sans-serif">
      <text x="492" y="190" font-size="30" font-weight="700" letter-spacing="4">RESEARCH · INVESTIGACIÓN</text>
      <text x="486" y="305" font-size="112" font-weight="800" letter-spacing="2">BIGATIC</text>
      <rect x="492" y="338" width="520" height="6" rx="3" fill="url(#line)"/>
      <text x="492" y="407" font-size="38" font-weight="700">Software Engineering</text>
      <text x="492" y="454" font-size="31" font-weight="500" fill="#315373">Universidad de Santander · UDES</text>
      <text x="1127" y="575" text-anchor="end" font-size="25" font-weight="700" fill="#315373">bigatic.org</text>
    </g>
  </svg>
`);

const bigaticLogo = await sharp('public/branding/bigatic/logo-bigatic.png')
  .resize(300, 300, { fit: 'contain' })
  .png()
  .toBuffer();

const udesLogo = await sharp('public/branding/udes/udes-logo-principal.svg')
  .resize({ width: 350, height: 101, fit: 'contain', position: 'left' })
  .png()
  .toBuffer();

await sharp(background)
  .composite([
    { input: bigaticLogo, left: 97, top: 101 },
    { input: udesLogo, left: 72, top: 504 },
  ])
  .png({ compressionLevel: 9, palette: true })
  .toFile('public/images/og-default.png');

console.log('Generated public/images/og-default.png (1200×630).');
