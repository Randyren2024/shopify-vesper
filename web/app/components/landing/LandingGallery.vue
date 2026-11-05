<script setup lang="ts">
import type { LandingMediaItem } from '#shared/types'

defineProps<{
  eyebrow?: string
  title: string
  lead?: string
  items: LandingMediaItem[]
}>()
</script>

<template>
  <section class="lp-section">
    <div class="lp-container">
      <header class="lp-section-head" data-reveal>
        <span v-if="eyebrow" class="v-eyebrow">{{ eyebrow }}</span>
        <h2>{{ title }}</h2>
        <p v-if="lead" class="v-lead">{{ lead }}</p>
      </header>

      <div class="lp-gallery">
        <figure v-for="item in items" :key="item.title" class="lp-gallery__item" data-reveal>
          <img :src="item.image" :alt="item.title" loading="lazy">
          <figcaption class="lp-gallery__body">
            <h3>{{ item.title }}</h3>
            <p v-if="item.text">{{ item.text }}</p>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>
