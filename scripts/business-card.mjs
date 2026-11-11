// Arabic business card generator (front + back, in the site's social-image style).
//
//   node scripts/business-card.mjs /tmp/card          # writes SVGs + print.html
//   google-chrome --headless=new --force-device-scale-factor=2 --window-size=1050,600 \
//     --screenshot=public/covers/business-card-ar-front.png file:///tmp/card/business-card-ar-front.svg
//   (same for -back; for print, split print.html per side, --print-to-pdf each, then pdfunite)
//
// Trim size 3.5×2 in @300dpi; *-print.svg adds a 3mm bleed. Arabic text uses
// direction="rtl" text-anchor="start" (start = right edge in RTL).
import QR from "qrcode";
import { writeFileSync } from "node:fs";

const OUT = process.argv[2];
const SITE = "https://portifolio-pink-gamma.vercel.app/ar";
const WA = "https://wa.me/249101062021";
const PHONE = "+249 10 106 2021";
const EMAIL = "tsgo132@gmail.com";
const W = 1050, H = 600; // 3.5 × 2 in @ 300 dpi
const BLEED = 35;        // ≈ 3 mm @ 300 dpi

const C = { bg: "#F4F3EF", surface: "#FFFFFF", line: "#D8D8D2", fg: "#0B0B0B", muted: "#777872", accent: "#155EFF" };
const AR = `'Noto Kufi Arabic','Noto Sans Arabic','Tahoma',sans-serif`;
const MONO = `'JetBrains Mono','DejaVu Sans Mono',ui-monospace,monospace`;
// In SVG, text-anchor follows the writing direction: "start" = right edge for RTL.
const RTL = `direction="rtl" text-anchor="start"`;

function qrPath(text, x, y, size) {
  const qr = QR.create(text, { errorCorrectionLevel: "Q" });
  const n = qr.modules.size;
  let d = "";
  for (let r = 0; r < n; r++)
    for (let c = 0; c < n; c++)
      if (qr.modules.get(r, c)) d += `M${c} ${r}h1v1h-1z`;
  // single path in module units → no hairline seams between modules
  return `<path transform="translate(${x} ${y}) scale(${size / n})" d="${d}" fill="${C.fg}" shape-rendering="crispEdges"/>`;
}

function backdrop({ fill, gridStroke, gridOpacity, grain }, b) {
  let s = `<rect x="${-b}" y="${-b}" width="${W + 2 * b}" height="${H + 2 * b}" fill="${fill}"/>
  <rect x="${-b}" y="${-b}" width="${W + 2 * b}" height="${H + 2 * b}" fill="url(#glow)"/>`;
  for (let x = 0; x <= W; x += 75)
    s += `<line x1="${x + 0.5}" y1="${-b}" x2="${x + 0.5}" y2="${H + b}" stroke="${gridStroke}" stroke-opacity="${gridOpacity}"/>`;
  // grain sits under the content so panels and QR stay clean white
  s += `<rect x="${-b}" y="${-b}" width="${W + 2 * b}" height="${H + 2 * b}" fill="#000" filter="url(#grain)" opacity="${grain}"/>`;
  const mk = (x, y) => `<path d="M${x - 10} ${y}h20M${x} ${y - 10}v20" stroke="${C.accent}" stroke-opacity="0.8"/>`;
  s += [[30, 30], [W - 30, 30], [30, H - 30], [W - 30, H - 30]].map(([x, y]) => mk(x, y)).join("");
  return s;
}

const defs = `<defs>
  <linearGradient id="glow" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.accent}" stop-opacity="0.12"/><stop offset="1" stop-color="${C.accent}" stop-opacity="0"/></linearGradient>
  <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 1 1 0 0"/></filter>
</defs>`;

function svg(body, b) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W + 2 * b}" height="${H + 2 * b}" viewBox="${-b} ${-b} ${W + 2 * b} ${H + 2 * b}">
  ${defs}
  ${body(b)}
</svg>
`;
}

// QR card panel (same geometry on both sides so the card feels like one system)
function qrPanel({ title, sub, data, caption, captionFont = MONO, captionSize = 11, captionFill = C.muted }) {
  return `<rect x="60" y="100" width="300" height="420" rx="16" fill="${C.surface}" stroke="${C.line}"/>
  <g font-family="${AR}" ${RTL}>
    <text x="336" y="140" font-size="18" font-weight="700" fill="${C.accent}">${title}</text>
    <text x="336" y="164" font-size="14" fill="${C.muted}">${sub}</text>
  </g>
  <rect x="85" y="186" width="250" height="250" rx="10" fill="${C.surface}" stroke="${C.line}"/>
  ${qrPath(data, 112, 213, 196)}
  <text x="210" y="482" text-anchor="middle" direction="ltr" font-family="${captionFont}" font-size="${captionSize}" font-weight="700" fill="${captionFill}">${caption}</text>`;
}

const services = [
  "استقبال طلبات واتساب ومتابعتها تلقائياً",
  "برامج لإدارة المبيعات والمخزون والفواتير",
  "مواقع وتطبيقات تعمل حتى مع ضعف الإنترنت",
  "حماية أنظمتك وبياناتك من الاختراق",
];

const R = 990; // right edge of the RTL column

const front = (b) => `${backdrop({ fill: C.bg, gridStroke: C.line, gridOpacity: 0.4, grain: 0.035 }, b)}

  <!-- header -->
  <text x="60" y="76" font-family="${MONO}" font-size="30" font-weight="700" fill="${C.fg}">TK<tspan fill="${C.accent}">/</tspan></text>
  <text x="${R}" y="74" font-family="${AR}" ${RTL} font-size="18" fill="${C.accent}">برمجيات مصمّمة لواقع السودان</text>

  <!-- identity -->
  <g font-family="${AR}" ${RTL}>
    <text x="${R}" y="140" font-size="19" font-weight="700" fill="${C.muted}">مهندس برمجيات · حلول تقنية للأعمال</text>
    <text x="${R}" y="208" font-size="50" font-weight="700" fill="${C.fg}">تاج السر خالد بن الوليد</text>
  </g>
  <rect x="${R - 56}" y="244" width="56" height="4" fill="${C.accent}"/>
  <rect x="${R - 66}" y="241" width="10" height="10" fill="${C.accent}" opacity="0.35"/>

  <!-- services -->
  <g font-family="${AR}" ${RTL} font-size="18" fill="${C.fg}">
    ${services.map((s, i) => `<rect x="${R - 7}" y="${286 + i * 36}" width="7" height="7" fill="${C.accent}"/><text x="${R - 20}" y="${296 + i * 36}">${s}</text>`).join("\n    ")}
  </g>

  <!-- contact -->
  <line x1="410" y1="440" x2="${R}" y2="440" stroke="${C.line}"/>
  <g font-family="${AR}" ${RTL} font-size="14" fill="${C.muted}">
    <text x="${R}" y="478">واتساب</text>
    <text x="${R}" y="516">البريد</text>
    <text x="560" y="478">العنوان</text>
  </g>
  <g font-family="${MONO}" text-anchor="end" direction="ltr" fill="${C.fg}">
    <text x="${R - 70}" y="479" font-size="19" font-weight="700">${PHONE}</text>
    <text x="${R - 70}" y="517" font-size="16">${EMAIL}</text>
  </g>
  <text x="500" y="478" font-family="${AR}" ${RTL} font-size="16" fill="${C.fg}">الخرطوم، السودان</text>

  <!-- footer -->
  <text x="${R}" y="562" font-family="${MONO}" text-anchor="end" font-size="11" fill="${C.muted}" letter-spacing="5">TAJELSIR / SYSTEMS</text>

  ${qrPanel({ title: "امسح الرمز", sub: "للاطلاع على أعمالي", data: SITE, caption: "portifolio-pink-gamma.vercel.app/ar" })}`;

const back = (b) => `${backdrop({ fill: C.fg, gridStroke: "#FFFFFF", gridOpacity: 0.06, grain: 0.05 }, b)}

  <!-- brand (reads first, on the right) -->
  <text x="700" y="250" text-anchor="middle" font-family="${MONO}" font-size="110" font-weight="700" fill="#FFFFFF">TK<tspan fill="${C.accent}">/</tspan></text>
  <text x="700" y="298" text-anchor="middle" font-family="${MONO}" font-size="15" fill="#FFFFFF" fill-opacity="0.6" letter-spacing="8">TAJELSIR / SYSTEMS</text>
  <line x1="660" y1="332" x2="740" y2="332" stroke="${C.accent}" stroke-width="3"/>
  <g font-family="${AR}" direction="rtl" text-anchor="middle" fill="#FFFFFF">
    <text x="700" y="384" font-size="26" font-weight="700">برمجيات مصمّمة لواقع السودان</text>
    <text x="700" y="424" font-size="16" fill-opacity="0.6">أنظمة موثوقة تعمل حتى مع انقطاع الشبكة</text>
    <text x="700" y="520" font-size="13" fill-opacity="0.45">الخرطوم · السودان</text>
  </g>

  <!-- WhatsApp: the one action a customer should take -->
  ${qrPanel({ title: "راسلني على واتساب", sub: "للطلبات والاستفسارات", data: WA, caption: PHONE, captionSize: 16, captionFill: C.fg })}`;

for (const [name, body] of [["front", front], ["back", back]]) {
  writeFileSync(`${OUT}/business-card-ar-${name}.svg`, svg(body, 0));
  writeFileSync(`${OUT}/business-card-ar-${name}-print.svg`, svg(body, BLEED));
}

// two-page print sheet: trim 3.5×2in + 3mm bleed each side
const pw = (W + 2 * BLEED) / 300, ph = (H + 2 * BLEED) / 300;
writeFileSync(`${OUT}/print.html`, `<!doctype html><meta charset="utf-8"><style>
@page{size:${pw}in ${ph}in;margin:0}html,body{margin:0}
html,body{width:100%;height:100%;background:#0B0B0B}img{display:block;width:100vw;height:100vh;object-fit:fill;break-after:page}
</style><img src="business-card-ar-front-print.svg"><img src="business-card-ar-back-print.svg">`);
console.log("ok");
