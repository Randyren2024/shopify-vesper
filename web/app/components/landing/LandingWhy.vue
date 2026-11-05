<script setup lang="ts">
import type { LandingContent } from '#shared/types'

const props = defineProps<{ landing: LandingContent }>()

const mediaImage = computed(
  () => props.landing.gallery[0]?.image || props.landing.heroImage || '',
)
</script>

<template>
  <section class="lp-section">
    <div class="lp-container lp-split">
      <div class="lp-split__media" data-reveal="left">
        <img v-if="mediaImage" :src="mediaImage" :alt="`${landing.code} detail`" loading="lazy">
      </div>

      <div class="lp-split__body" data-reveal="right">
        <span class="v-eyebrow">Why this machine</span>
        <h2>Built for the ground you actually mow</h2>
        <p class="v-lead">Every point below is a specification decision, not a marketing claim.</p>

        <ol class="lp-list">
          <li v-for="(reason, index) in landing.why" :key="reason" class="lp-list__item">
            <span class="lp-list__num">{{ String(index + 1).padStart(2, '0') }}</span>
            <p>{{ reason }}</p>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>
