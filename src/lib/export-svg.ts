/* ── SVG Export ──
   Serializes the rendered SVG element to a downloadable file. */

export function exportSVG(svg: SVGSVGElement): void {
  const serializer = new XMLSerializer()
  const source = serializer.serializeToString(svg)
  const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = 'diagram.svg'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
