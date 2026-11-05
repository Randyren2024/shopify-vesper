<script setup lang="ts">
/**
 * Single icon set for the storefront, matching the Liquid theme's
 * snippets/vesper-icons.liquid: 24×24 viewBox, 1.5 stroke, currentColor.
 */
const props = withDefaults(
  defineProps<{
    name: string
    size?: number | string
    strokeWidth?: number | string
  }>(),
  { size: 16, strokeWidth: 1.5 },
)

const ICONS: Record<string, string> = {
  menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  sun:
    '<circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4"/>',
  moon: '<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5z"/>',
  'chevron-down': '<path d="M6 9l6 6 6-6"/>',
  'chevron-right': '<path d="M9 6l6 6-6 6"/>',
  'chevron-left': '<path d="M15 6l-6 6 6 6"/>',
  'arrow-right': '<path d="M4 12h15M13 6l6 6-6 6"/>',
  cart:
    '<circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/><path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L21 8H6"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  check: '<path d="M4 12.5l5 5L20 6.5"/>',
  trash: '<path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13"/>',
  phone:
    '<path d="M6.6 3.5l3 .4 1.2 3.4-2 1.4a12 12 0 0 0 5.9 5.9l1.4-2 3.4 1.2.4 3a2 2 0 0 1-2.2 2.2C11.5 19.3 4.7 12.5 4.4 5.7a2 2 0 0 1 2.2-2.2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  'map-pin':
    '<path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  whatsapp:
    '<path d="M20 11.6a8.4 8.4 0 0 1-12.5 7.4L3 20.5l1.6-4.4A8.4 8.4 0 1 1 20 11.6z"/><path d="M9 8.5c-.3 0-.6.1-.8.4-.3.3-.7.8-.7 1.8 0 1.1.8 2.2 1 2.4.2.3 1.6 2.4 3.9 3.4 1.9.8 2.3.6 2.7.6.5 0 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.2-.2-.5-.3l-1.6-.8c-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1-.3-.1-1.1-.4-2-1.3-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.4.1-.5l.4-.4c.1-.2.1-.3.2-.4 0-.2 0-.3-.1-.5l-.7-1.6c-.2-.4-.4-.4-.5-.4z"/>',
  shield: '<path d="M12 3l7 3v6c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6z"/>',
  truck:
    '<path d="M3 7h11v9H3zM14 11h4l3 3v2h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/>',
  headset:
    '<path d="M4 13a8 8 0 0 1 16 0"/><path d="M4 13v3a2 2 0 0 0 2 2h2v-6H4"/><path d="M20 13v3a2 2 0 0 1-2 2h-2v-6h4"/>',
  wrench: '<path d="M14.5 6.5a4 4 0 1 0 5 5L21 9l-3-3zM13 8L4 17l3 3 9-9"/>',
  rocket:
    '<path d="M5 15l-2 6 6-2 9-9a6 6 0 0 0-4-4z"/><circle cx="14.5" cy="9.5" r="1.4"/>',
  grid:
    '<rect x="3" y="3" width="7" height="7" rx="1.4"/><rect x="14" y="3" width="7" height="7" rx="1.4"/><rect x="3" y="14" width="7" height="7" rx="1.4"/><rect x="14" y="14" width="7" height="7" rx="1.4"/>',
  users:
    '<circle cx="9" cy="8" r="3.4"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 5.2a3.4 3.4 0 0 1 0 6.6M18 20a6.4 6.4 0 0 0-2-4.6"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
  star: '<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.3-4.1 5.9-.9z"/>',
  linkedin:
    '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7 10v7M7 7v.01M11.5 17v-4a2.5 2.5 0 0 1 5 0v4"/>',
  'precision-agriculture':
    '<path d="M12 21V9M12 9c0-3.3 2.7-6 6-6 0 3.3-2.7 6-6 6zM12 13c-2.8 0-5-2.2-5-5 2.8 0 5 2.2 5 5z"/><path d="M4 21h16"/>',
  battery:
    '<rect x="2" y="7" width="16" height="10" rx="2"/><path d="M20 10v4"/><path d="M6 10v4M10 10v4M14 10v4"/>',
}
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="strokeWidth"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
    v-html="ICONS[name] ?? ICONS.check"
  />
</template>
