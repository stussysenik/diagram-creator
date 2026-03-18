/* ── TemplateGallery ──
   Modal dialog with a grid of template cards. */

import { Dialog, Portal, SimpleGrid, Button, CloseButton, Box } from '@chakra-ui/react'
import { useState } from 'react'
import { TEMPLATES } from '../../data/templates'
import { TemplateCard } from './TemplateCard'
import { useStore } from '../../store'

export function TemplateGallery() {
  const [open, setOpen] = useState(false)
  const loadConfig = useStore((s) => s.loadConfig)

  const handleSelect = (index: number) => {
    loadConfig(structuredClone(TEMPLATES[index].config))
    setOpen(false)
  }

  return (
    <>
      <Button size="xs" variant="outline" onClick={() => setOpen(true)}>
        Templates
      </Button>

      <Dialog.Root open={open} onOpenChange={(d) => setOpen(d.open)} size="lg">
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Template Gallery</Dialog.Title>
                <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Dialog.CloseTrigger>
              </Dialog.Header>
              <Dialog.Body pb={6}>
                <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={4}>
                  {TEMPLATES.map((template, i) => (
                    <TemplateCard
                      key={template.name}
                      template={template}
                      onSelect={() => handleSelect(i)}
                    />
                  ))}
                </SimpleGrid>
              </Dialog.Body>
              <Dialog.Footer>
                <Box />
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  )
}
