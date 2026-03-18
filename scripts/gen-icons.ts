/* Generate PWA icons from SVG template */
import { Resvg } from '@resvg/resvg-js'
import { writeFileSync } from 'fs'

function makeSvg(size: number): string {
  const pad = size * 0.15
  const inner = size - pad * 2
  const boxH = inner * 0.28
  const boxW = inner * 0.6
  const gap = inner * 0.12
  const cx = size / 2
  const boxX = cx - boxW / 2
  const y1 = pad + inner * 0.1
  const y2 = y1 + boxH + gap
  const stroke = Math.max(2, size * 0.02)
  const r = size * 0.12

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${r}" fill="#2563eb"/>
  <rect x="${boxX}" y="${y1}" width="${boxW}" height="${boxH}" rx="${stroke * 2}" fill="none" stroke="white" stroke-width="${stroke}"/>
  <rect x="${boxX}" y="${y2}" width="${boxW}" height="${boxH}" rx="${stroke * 2}" fill="none" stroke="white" stroke-width="${stroke}"/>
  <line x1="${cx}" y1="${y1 + boxH}" x2="${cx}" y2="${y2}" stroke="white" stroke-width="${stroke}"/>
  <polygon points="${cx},${y2} ${cx - stroke * 3},${y2 - stroke * 4} ${cx + stroke * 3},${y2 - stroke * 4}" fill="white"/>
</svg>`
}

for (const size of [192, 512]) {
  const svg = makeSvg(size)
  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: size } })
  const png = resvg.render().asPng()
  writeFileSync(`public/icons/icon-${size}.png`, png)
  console.log(`Generated icon-${size}.png (${png.length} bytes)`)
}

// Apple touch icon at 180px
const appleSvg = makeSvg(180)
const appleResvg = new Resvg(appleSvg, { fitTo: { mode: 'width', value: 180 } })
const applePng = appleResvg.render().asPng()
writeFileSync('public/icons/apple-touch-icon.png', applePng)
console.log(`Generated apple-touch-icon.png (${applePng.length} bytes)`)
