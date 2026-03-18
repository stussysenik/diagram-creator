/* ── Raster Export ──
   Converts SVG to Canvas, then exports as AVIF or TIFF.
   AVIF uses native browser canvas.toBlob().
   TIFF falls back to a basic uncompressed TIFF encoder. */

function svgToCanvas(svg: SVGSVGElement, width: number, height: number): Promise<HTMLCanvasElement> {
  return new Promise((resolve, reject) => {
    const serializer = new XMLSerializer()
    const source = serializer.serializeToString(svg)
    const encoded = encodeURIComponent(source)
    const dataUrl = `data:image/svg+xml;charset=utf-8,${encoded}`

    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0, width, height)
      resolve(canvas)
    }
    img.onerror = reject
    img.src = dataUrl
  })
}

function download(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export async function exportAVIF(svg: SVGSVGElement, width: number, height: number): Promise<void> {
  const canvas = await svgToCanvas(svg, width, height)

  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          download(blob, `diagram-${width}x${height}.avif`)
        }
        resolve()
      },
      'image/avif',
      0.9
    )
  })
}

/* TIFF encoder — minimal uncompressed TIFF for lossless export.
   Writes a single-strip, 8-bit RGBA TIFF. No external dependencies. */
function encodeTIFF(imageData: ImageData): ArrayBuffer {
  const { width, height, data } = imageData
  const pixelBytes = width * height * 4
  const ifdOffset = 8
  const ifdEntryCount = 12
  const ifdSize = 2 + ifdEntryCount * 12 + 4
  const dataOffset = ifdOffset + ifdSize + 24 // extra space for value arrays
  const totalSize = dataOffset + pixelBytes

  const buf = new ArrayBuffer(totalSize)
  const view = new DataView(buf)
  const bytes = new Uint8Array(buf)

  // Header — little-endian TIFF
  view.setUint16(0, 0x4949, false) // 'II'
  view.setUint16(2, 42, true)
  view.setUint32(4, ifdOffset, true)

  let off = ifdOffset
  view.setUint16(off, ifdEntryCount, true); off += 2

  const writeEntry = (tag: number, type: number, count: number, value: number) => {
    view.setUint16(off, tag, true); off += 2
    view.setUint16(off, type, true); off += 2
    view.setUint32(off, count, true); off += 4
    view.setUint32(off, value, true); off += 4
  }

  // BitsPerSample offset (4 shorts = 8 bytes)
  const bpsOffset = ifdOffset + ifdSize
  // SampleFormat offset (4 shorts = 8 bytes)
  const sfOffset = bpsOffset + 8
  // ExtraSamples offset
  const esOffset = sfOffset + 8

  writeEntry(256, 3, 1, width)          // ImageWidth
  writeEntry(257, 3, 1, height)         // ImageLength
  writeEntry(258, 3, 4, bpsOffset)      // BitsPerSample → offset
  writeEntry(259, 3, 1, 1)             // Compression: None
  writeEntry(262, 3, 1, 2)             // PhotometricInterpretation: RGB
  writeEntry(273, 4, 1, dataOffset)     // StripOffsets
  writeEntry(277, 3, 1, 4)             // SamplesPerPixel
  writeEntry(278, 4, 1, height)         // RowsPerStrip
  writeEntry(279, 4, 1, pixelBytes)     // StripByteCounts
  writeEntry(282, 5, 1, esOffset)       // XResolution (reuse space)
  writeEntry(283, 5, 1, esOffset)       // YResolution
  writeEntry(338, 3, 1, 2)             // ExtraSamples: unassociated alpha

  // Next IFD = 0 (no more images)
  view.setUint32(off, 0, true)

  // BitsPerSample values: 8,8,8,8
  for (let i = 0; i < 4; i++) {
    view.setUint16(bpsOffset + i * 2, 8, true)
  }

  // SampleFormat: 1,1,1,1 (unsigned integer)
  for (let i = 0; i < 4; i++) {
    view.setUint16(sfOffset + i * 2, 1, true)
  }

  // Resolution rational: 72/1
  view.setUint32(esOffset, 72, true)
  view.setUint32(esOffset + 4, 1, true)

  // Pixel data (RGBA straight from canvas)
  bytes.set(data, dataOffset)

  return buf
}

export async function exportTIFF(svg: SVGSVGElement, width: number, height: number): Promise<void> {
  const canvas = await svgToCanvas(svg, width, height)
  const ctx = canvas.getContext('2d')!
  const imageData = ctx.getImageData(0, 0, width, height)
  const tiffBuffer = encodeTIFF(imageData)
  const blob = new Blob([tiffBuffer], { type: 'image/tiff' })
  download(blob, `diagram-${width}x${height}.tiff`)
}
