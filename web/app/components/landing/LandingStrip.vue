<script setup lang="ts">
import type { LandingStat } from '#shared/types'

defineProps<{ stats: LandingStat[] }>()
</script>

<template>
  <div class="lp-strip">
    <div class="lp-container lp-strip__grid">
      <div v-for="stat in stats" :key="stat.label" class="lp-strip__item">
        <strong>{{ stat.value }}</strong>
        <span>{{ stat.label }}</span>
      </div>
    </div>
  </div>
</template>
