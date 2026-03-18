/* ── Export Hook ──
   Wraps SVG, AVIF, and TIFF export behind a ref-based API. */

import { useCallback, type RefObject } from 'react'
import { exportSVG } from '../lib/export-svg'
import { exportAVIF, exportTIFF } from '../lib/export-raster'

export function useExport(svgRef: RefObject<SVGSVGElement | null>) {
  const doExportSVG = useCallback(() => {
    if (svgRef.current) exportSVG(svgRef.current)
  }, [svgRef])

  const doExportAVIF = useCallback(
    (width: number, height: number) => {
      if (svgRef.current) exportAVIF(svgRef.current, width, height)
    },
    [svgRef]
  )

  const doExportTIFF = useCallback(
    (width: number, height: number) => {
      if (svgRef.current) exportTIFF(svgRef.current, width, height)
    },
    [svgRef]
  )

  return { exportSVG: doExportSVG, exportAVIF: doExportAVIF, exportTIFF: doExportTIFF }
}
