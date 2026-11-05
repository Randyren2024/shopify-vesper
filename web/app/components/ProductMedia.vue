<script setup lang="ts">
import type { ShopProduct } from '#shared/types'

const props = defineProps<{
  product: ShopProduct
  heroImage: string
}>()

const images = computed(() => {
  const list = props.product.images.length
    ? props.product.images.map((image) => ({
        url: image.url,
        alt: image.altText || props.product.title,
      }))
    : [{ url: props.heroImage, alt: props.product.title }]
  return list.filter((image) => Boolean(image.url))
})

const active = ref(0)
const activeImage = computed(() => images.value[active.value] ?? images.value[0] ?? null)

watch(
  () => props.product.handle,
  () => {
    active.value = 0
  },
)
</script>

<template>
  <div class="pdp-media" data-reveal="left">
    <div class="pdp-media__main">
      <img
        v-if="activeImage"
        :src="activeImage.url"
        :alt="activeImage.alt"
        loading="eager"
      >
    </div>

    <div v-if="images.length > 1" class="pdp-media__thumbs">
      <button
        v-for="(image, index) in images"
        :key="image.url"
        type="button"
        class="pdp-thumb"
        :class="{ 'is-active': index === active }"
        :aria-label="`Show image ${index + 1}`"
        @click="active = index"
      >
        <img :src="image.url" alt="" loading="lazy">
      </button>
    </div>
  </div>
</template>
