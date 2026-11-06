<script setup lang="ts">
import { theme as antdThemeTools } from 'ant-design-vue'

const { refresh } = useCart()
const { scheme, sync } = useTheme()

// Cart is read once per page load so the header badge is server-rendered.
await callOnce('vesper-cart-bootstrap', () => refresh())

onMounted(sync)

const antdTheme = computed(() => {
  const dark = scheme.value === 'dark'
  return {
    algorithm: dark ? antdThemeTools.darkAlgorithm : antdThemeTools.defaultAlgorithm,
    token: {
      colorPrimary: dark ? '#8de600' : '#1e3d1e',
      colorInfo: dark ? '#8de600' : '#1e3d1e',
      colorSuccess: '#389e0d',
      colorWarning: dark ? '#f08a3c' : '#c85a0a',
      colorError: '#cf3f36',
      colorBgContainer: dark ? '#101713' : '#ffffff',
      colorBgElevated: dark ? '#142019' : '#ffffff',
      colorText: dark ? '#f1f4ee' : '#111110',
      colorTextSecondary: dark ? '#a6b0a7' : '#6b6b68',
      colorBorder: dark ? 'rgba(255,255,255,.16)' : 'rgba(17,17,16,.14)',
      borderRadius: 12,
      borderRadiusLG: 18,
      controlHeight: 44,
      controlHeightLG: 50,
      fontFamily: '"Barlow", system-ui, -apple-system, "Segoe UI", Arial, sans-serif',
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
