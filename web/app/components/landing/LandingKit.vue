<script setup lang="ts">
defineProps<{ items: { label: string; qty: string }[] }>()
</script>

<template>
  <section class="lp-section lp-section--tight">
    <div class="lp-container">
      <header class="lp-section-head" data-reveal>
        <span class="v-eyebrow">In the box</span>
        <h2>What ships with it</h2>
      </header>

      <div class="lp-kit" data-reveal>
        <div v-for="item in items" :key="item.label" class="lp-kit__item">
          <span>{{ item.label }}</span>
          <strong>×{{ item.qty }}</strong>
        </div>
      </div>
    </div>
  </section>
</template>
