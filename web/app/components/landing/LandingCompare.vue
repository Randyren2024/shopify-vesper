<script setup lang="ts">
import type { LandingCompare } from '#shared/types'

defineProps<{ compare: LandingCompare }>()
</script>

<template>
  <section class="lp-section">
    <div class="lp-container">
      <header class="lp-section-head" data-reveal>
        <span class="v-eyebrow">Comparison</span>
        <h2>How it stacks up</h2>
      </header>

      <div class="lp-table-wrap" data-reveal>
        <table class="lp-table">
          <thead>
            <tr>
              <th v-for="cell in compare.head" :key="cell">{{ cell }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in compare.rows" :key="row[0]">
              <td v-for="(cell, index) in row" :key="`${row[0]}-${index}`" :class="{ 'is-positive': index === 1 }">
                {{ cell }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>
