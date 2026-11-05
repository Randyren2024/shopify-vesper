<script setup lang="ts">
import type { LandingContent, ShopProduct } from '#shared/types'

const props = defineProps<{
  landing: LandingContent
  product: ShopProduct
}>()

const config = useRuntimeConfig()

const heroImage = computed(
  () => props.landing.heroImage || props.product.featuredImage?.url || '',
)

const badgeTitle = computed(() =>
  props.product.availableForSale ? 'In stock, ready to ship' : 'Currently unavailable',
)

const whatsappHref = computed(() => {
  const message = `Hello! I would like to request a demo of the ${props.landing.code} ${props.landing.name}.`
  return `https://wa.me/${config.public.whatsapp}?text=${encodeURIComponent(message)}`
})
</script>

<template>
  <section class="lp-hero">
    <div class="lp-container lp-hero__wrap">
      <div class="lp-hero__copy" data-reveal>
        <span class="v-eyebrow">{{ landing.categoryLabel }}</span>

        <h1>
          {{ landing.code }}
          <span>{{ landing.name }}</span>
        </h1>

        <p class="lp-hero__lead">{{ landing.lead }}</p>

        <div class="lp-hero__actions">
          <a href="#specs" class="v-btn v-btn--primary v-btn--lg">
            View specifications
            <AppIcon name="arrow-right" :size="16" />
          </a>
          <a :href="whatsappHref" target="_blank" rel="noopener" class="v-btn v-btn--outline v-btn--lg">
            <AppIcon name="whatsapp" :size="16" />
            Request a demo
          </a>
        </div>

        <div v-if="landing.stats.length" class="lp-hero__stats">
          <span v-for="stat in landing.stats" :key="stat.label" class="lp-mini-stat">
            {{ stat.value }} · {{ stat.label }}
          </span>
        </div>
      </div>

      <div class="lp-hero__media" data-reveal="right">
        <div class="lp-hero__card">
          <img v-if="heroImage" :src="heroImage" :alt="`${landing.code} ${landing.name}`">
        </div>

        <div class="lp-hero__badge">
          <strong>{{ badgeTitle }}</strong>
          <span>Talk to the team before you order — we size the machine to your ground.</span>
        </div>
      </div>
    </div>
  </section>
</template>
