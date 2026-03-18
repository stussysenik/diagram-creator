/* ── ControlPanel ──
   Accordion wrapper for all configuration panels. */

import { Accordion, Box } from '@chakra-ui/react'
import type { RefObject } from 'react'
import { LayoutPanel } from './LayoutPanel'
import { StepsPanel } from './StepsPanel'
import { CanvasPanel } from './CanvasPanel'
import { BackgroundPanel } from './BackgroundPanel'
import { BoxesPanel } from './BoxesPanel'
import { BordersPanel } from './BordersPanel'
import { TypographyPanel } from './TypographyPanel'
import { ArrowsPanel } from './ArrowsPanel'
import { FeedbackPanel } from './FeedbackPanel'
import { ExportPanel } from './ExportPanel'

interface Props {
  svgRef: RefObject<SVGSVGElement | null>
}

const sections = [
  { value: 'layout', title: 'Layout', component: LayoutPanel },
  { value: 'steps', title: 'Steps', component: StepsPanel },
  { value: 'canvas', title: 'Canvas', component: CanvasPanel },
  { value: 'background', title: 'Background', component: BackgroundPanel },
  { value: 'boxes', title: 'Boxes', component: BoxesPanel },
  { value: 'borders', title: 'Borders', component: BordersPanel },
  { value: 'typography', title: 'Typography', component: TypographyPanel },
  { value: 'arrows', title: 'Arrows', component: ArrowsPanel },
  { value: 'feedback', title: 'Feedback Loop', component: FeedbackPanel },
] as const

export function ControlPanel({ svgRef }: Props) {
  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <Accordion.Root
        multiple
        defaultValue={['layout', 'steps', 'canvas', 'background', 'boxes', 'borders', 'typography', 'arrows', 'feedback']}
        variant="enclosed"
        size="sm"
      >
        {sections.map(({ value, title, component: Panel }) => (
          <Accordion.Item key={value} value={value}>
            <Accordion.ItemTrigger>
              <Box
                flex={1}
                textAlign="left"
                fontSize="xs"
                fontWeight={600}
                textTransform="uppercase"
                letterSpacing="0.05em"
                color="fg.muted"
              >
                {title}
              </Box>
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Box px={3} pb={2}>
                <Panel />
              </Box>
            </Accordion.ItemContent>
          </Accordion.Item>
        ))}

        <Accordion.Item value="export">
          <Accordion.ItemTrigger>
            <Box
              flex={1}
              textAlign="left"
              fontSize="xs"
              fontWeight={600}
              textTransform="uppercase"
              letterSpacing="0.05em"
              color="fg.muted"
            >
              Export
            </Box>
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Box px={3} pb={2}>
              <ExportPanel svgRef={svgRef} />
            </Box>
          </Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.Root>
    </Box>
  )
}
