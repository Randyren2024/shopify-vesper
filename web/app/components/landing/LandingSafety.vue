<script setup lang="ts">
defineProps<{
  items: { title: string; text: string }[]
}>()
</script>

<template>
  <section class="lp-section lp-section--tight lp-safety">
    <div class="lp-container">
      <header class="lp-section-head" data-reveal>
        <span class="v-eyebrow">Safety</span>
        <h2>Designed to stop before something goes wrong</h2>
      </header>

      <div class="lp-grid lp-grid--3">
        <article v-for="item in items" :key="item.title" class="lp-safety__card" data-reveal>
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
