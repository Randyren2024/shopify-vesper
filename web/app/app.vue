<script setup lang="ts">
const { refresh } = useCart()

// Cart is read once per page load so the header badge is server-rendered.
await callOnce('vesper-cart-bootstrap', () => refresh())
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
