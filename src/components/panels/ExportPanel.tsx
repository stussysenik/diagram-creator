import { useState, useCallback } from 'react'
import { Flex, Text, Input, Button, Box } from '@chakra-ui/react'
import { useExport } from '../../hooks/use-export'
import { useShareLink } from '../../hooks/use-share-link'
import { useStore } from '../../store'
import type { RefObject } from 'react'

interface Props {
  svgRef: RefObject<SVGSVGElement | null>
}

export function ExportPanel({ svgRef }: Props) {
  const { canvasWidth, canvasHeight } = useStore((s) => s.config)
  const [exportW, setExportW] = useState(canvasWidth)
  const [exportH, setExportH] = useState(canvasHeight)
  const [lockRatio, setLockRatio] = useState(true)
  const [copied, setCopied] = useState(false)
  const { exportSVG, exportAVIF, exportTIFF } = useExport(svgRef)
  const { copyToClipboard } = useShareLink()

  const aspectRatio = canvasWidth / canvasHeight

  const handleWidthChange = useCallback((w: number) => {
    setExportW(w)
    if (lockRatio) setExportH(Math.round(w / aspectRatio))
  }, [lockRatio, aspectRatio])

  const handleHeightChange = useCallback((h: number) => {
    setExportH(h)
    if (lockRatio) setExportW(Math.round(h * aspectRatio))
  }, [lockRatio, aspectRatio])

  const matchCanvas = () => {
    setExportW(canvasWidth)
    setExportH(canvasHeight)
  }

  const applyScale = (scale: number) => {
    setExportW(canvasWidth * scale)
    setExportH(canvasHeight * scale)
  }

  const handleShare = async () => {
    await copyToClipboard()
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <Flex align="center" gap={3} py={1}>
        <Text fontSize="xs" color="fg.muted" minW="80px" flexShrink={0}>Width (px)</Text>
        <Input size="xs" type="number" value={exportW} min={100} max={8000} onChange={(e) => handleWidthChange(Number(e.target.value))} maxW="100px" />
      </Flex>
      <Flex align="center" gap={3} py={1}>
        <Text fontSize="xs" color="fg.muted" minW="80px" flexShrink={0}>Height (px)</Text>
        <Input size="xs" type="number" value={exportH} min={100} max={8000} onChange={(e) => handleHeightChange(Number(e.target.value))} maxW="100px" />
      </Flex>
      <Flex align="center" gap={2} py={1}>
        <Button size="xs" variant={lockRatio ? 'solid' : 'outline'} onClick={() => setLockRatio(!lockRatio)}>
          {lockRatio ? '🔒' : '🔓'}
        </Button>
        <Button size="xs" variant="outline" onClick={matchCanvas}>Match canvas</Button>
        <Button size="xs" variant="outline" onClick={() => applyScale(2)}>2×</Button>
        <Button size="xs" variant="outline" onClick={() => applyScale(4)}>4×</Button>
      </Flex>
      <Box display="flex" flexWrap="wrap" gap={2} pt={2}>
        <Button size="xs" colorPalette="blue" onClick={exportSVG}>SVG</Button>
        <Button size="xs" colorPalette="purple" onClick={() => exportAVIF(exportW, exportH)}>AVIF</Button>
        <Button size="xs" colorPalette="teal" onClick={() => exportTIFF(exportW, exportH)}>TIFF</Button>
        <Button size="xs" variant="outline" onClick={handleShare}>
          {copied ? 'Copied!' : 'Share Link'}
        </Button>
      </Box>
    </>
  )
}
