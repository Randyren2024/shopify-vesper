<script setup lang="ts">
import type { LandingMediaItem } from '#shared/types'

defineProps<{ items: LandingMediaItem[] }>()
</script>

<template>
  <section class="lp-section">
    <div class="lp-container">
      <header class="lp-section-head" data-reveal>
        <span class="v-eyebrow">Use cases</span>
        <h2>Where it earns its keep</h2>
      </header>

      <div class="lp-scenarios">
        <article v-for="item in items" :key="item.title" class="lp-scenario" data-reveal>
          <img :src="item.image" :alt="item.title" loading="lazy">
          <div class="lp-scenario__body">
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
