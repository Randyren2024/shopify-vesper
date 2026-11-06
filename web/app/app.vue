<script setup lang="ts">
import { theme as antdThemeTools } from 'ant-design-vue'

const { refresh } = useCart()
const { scheme, sync } = useTheme()

// Cart is read once per page load so the header badge is server-rendered.
await callOnce('vesper-cart-bootstrap', () => refresh())

onMounted(sync)

const antdTheme = computed(() => {
  const dark = scheme.value === 'dark'
  const primary = dark ? '#8de600' : '#1e3d1e'

  return {
    algorithm: dark ? antdThemeTools.darkAlgorithm : antdThemeTools.defaultAlgorithm,
    token: {
      // Vesper brand palette, with Ant Design semantic states.
      colorPrimary: primary,
      colorPrimaryHover: dark ? '#a5f02e' : '#2d5a2d',
      colorPrimaryActive: dark ? '#72bf00' : '#16301a',
      colorInfo: primary,
      colorSuccess: dark ? '#8de600' : '#389e0d',
      colorWarning: dark ? '#f08a3c' : '#c85a0a',
      colorError: dark ? '#ff7875' : '#cf3f36',

      // Surfaces and text stay in sync with tokens.css.
      colorBgLayout: dark ? '#070a08' : '#f8f7f4',
      colorBgContainer: dark ? '#101713' : '#ffffff',
      colorBgElevated: dark ? '#142019' : '#ffffff',
      colorFillAlter: dark ? 'rgba(255,255,255,.045)' : 'rgba(17,17,16,.035)',
      colorFillSecondary: dark ? 'rgba(255,255,255,.07)' : 'rgba(17,17,16,.045)',
      colorText: dark ? '#f1f4ee' : '#111110',
      colorTextHeading: dark ? '#f1f4ee' : '#111110',
      colorTextSecondary: dark ? '#a6b0a7' : '#6b6b68',
      colorTextTertiary: dark ? 'rgba(241,244,238,.62)' : 'rgba(17,17,16,.55)',
      colorTextLabel: dark ? '#c6cec6' : '#50534f',
      colorBorder: dark ? 'rgba(255,255,255,.16)' : 'rgba(17,17,16,.14)',
      colorBorderSecondary: dark ? 'rgba(255,255,255,.10)' : 'rgba(17,17,16,.09)',
      colorSplit: dark ? 'rgba(255,255,255,.10)' : 'rgba(17,17,16,.08)',
      colorLink: primary,
      colorLinkHover: dark ? '#a5f02e' : '#2d5a2d',
      colorLinkActive: dark ? '#72bf00' : '#16301a',
      colorIcon: dark ? '#a6b0a7' : '#6b6b68',
      colorIconHover: dark ? '#f1f4ee' : '#111110',

      // Barlow is the shared interface face; condensed Barlow remains the
      // display face for Vesper's editorial headings and numeric callouts.
      fontFamily: '"Barlow", system-ui, -apple-system, "Segoe UI", Arial, sans-serif',
      fontFamilyCode: 'ui-monospace, SFMono-Regular, Consolas, monospace',
      fontSize: 14,
      fontSizeSM: 12,
      fontSizeLG: 16,
      fontSizeXL: 20,
      fontSizeHeading1: 44,
      fontSizeHeading2: 34,
      fontSizeHeading3: 27,
      fontSizeHeading4: 21,
      fontSizeHeading5: 17,
      fontWeightStrong: 700,
      lineHeight: 1.6,
      lineHeightHeading1: 1.02,
      lineHeightHeading2: 1.08,
      lineHeightHeading3: 1.12,
      lineHeightHeading4: 1.18,
      lineHeightHeading5: 1.25,

      borderRadius: 12,
      borderRadiusSM: 8,
      borderRadiusLG: 18,
      borderRadiusOuter: 22,
      controlHeight: 44,
      controlHeightSM: 32,
      controlHeightLG: 50,
      controlOutline: dark ? 'rgba(141,230,0,.20)' : 'rgba(30,61,30,.16)',
      controlOutlineWidth: 3,
    },
  }
})
</script>

<template>
  <a-config-provider :theme="antdTheme">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </a-config-provider>
</template>
