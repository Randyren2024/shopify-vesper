<script setup lang="ts">
import type { LandingSpecItem } from '#shared/types'

defineProps<{
  metric: { value: string; label: string; note: string }
  rows: LandingSpecItem[]
}>()
</script>

<template>
  <section class="lp-section lp-section--tight">
    <div class="lp-container lp-metrics">
      <div class="lp-metric" data-reveal="left">
        <span class="v-eyebrow">{{ metric.label }}</span>
        <div class="lp-metric__value">{{ metric.value }}</div>
        <p class="lp-metric__note">{{ metric.note }}</p>
      </div>

      <div class="lp-data" data-reveal="right">
        <div v-for="row in rows" :key="row.label" class="lp-data__row">
          <span>{{ row.label }}</span>
          <strong>{{ row.value }}</strong>
        </div>
      </div>
    </div>
  </section>
</template>
