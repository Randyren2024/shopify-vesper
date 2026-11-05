<script setup lang="ts">
import type { LandingHighlight } from '#shared/types'

defineProps<{
  eyebrow?: string
  title: string
  lead?: string
  highlights: LandingHighlight[]
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

      <div class="lp-grid lp-grid--3">
        <article
          v-for="(item, index) in highlights"
          :key="item.title"
          class="lp-feature"
          data-reveal
          :style="{ transitionDelay: `${index * 40}ms` }"
        >
          <span class="lp-feature__icon">
            <AppIcon :name="item.icon || 'check'" :size="19" />
          </span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
