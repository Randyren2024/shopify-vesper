<script setup lang="ts">
import type { LandingSpecGroup } from '#shared/types'

defineProps<{
  groups: LandingSpecGroup[]
  code: string
}>()
</script>

<template>
  <section id="specs" class="lp-section">
    <div class="lp-container">
      <header class="lp-section-head" data-reveal>
        <span class="v-eyebrow">Specifications</span>
        <h2>{{ code }} full specification</h2>
      </header>

      <div class="lp-spec-groups">
        <div v-for="group in groups" :key="group.title" data-reveal>
          <div class="lp-spec-group__title">{{ group.title }}</div>
          <div class="lp-specs">
            <div v-for="item in group.items" :key="item.label" class="lp-spec">
              <span>{{ item.label }}</span>
              <strong>{{ item.value }}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
