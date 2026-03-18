/* ── TopBar ──
   Mobile header with hamburger menu and title. */

import { Flex, IconButton, Text } from '@chakra-ui/react'

interface Props {
  onToggle: () => void
}

export function TopBar({ onToggle }: Props) {
  return (
    <Flex
      display={{ base: 'flex', md: 'none' }}
      position="fixed"
      top={0}
      left={0}
      right={0}
      h="48px"
      px={3}
      align="center"
      gap={3}
      bg="bg"
      borderBottom="1px solid"
      borderColor="border"
      zIndex={1001}
    >
      <IconButton
        aria-label="Toggle sidebar"
        size="sm"
        variant="outline"
        onClick={onToggle}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <rect y="2" width="16" height="2" rx="1" />
          <rect y="7" width="16" height="2" rx="1" />
          <rect y="12" width="16" height="2" rx="1" />
        </svg>
      </IconButton>
      <Text fontSize="sm" fontWeight={700} letterSpacing="-0.02em">
        Diagram Creator
      </Text>
    </Flex>
  )
}
