<script setup lang="ts">
import type { LandingContent, ShopProduct } from '#shared/types'

const props = defineProps<{
  landing: LandingContent
  product: ShopProduct
}>()

const config = useRuntimeConfig()

const whatsappHref = computed(() => {
  const message = `Hello! I'm interested in the ${props.landing.code} ${props.landing.name}. Could you send me pricing and lead time?`
  return `https://wa.me/${config.public.whatsapp}?text=${encodeURIComponent(message)}`
})
</script>

<template>
  <section class="lp-cta">
    <div class="lp-container">
      <div class="lp-cta__box" data-reveal>
        <div>
          <span class="v-eyebrow">Next step</span>
          <h2>Interested in the {{ landing.code }}?</h2>
          <p>
            Tell us about your ground and we will confirm the right configuration, freight and
            lead time. Orders and payments are handled by Shopify checkout.
          </p>
        </div>

        <div class="lp-cta__actions">
          <a :href="whatsappHref" target="_blank" rel="noopener" class="v-btn v-btn--primary v-btn--lg">
            <AppIcon name="whatsapp" :size="16" />
            Get a quote
          </a>
          <NuxtLink to="/contact" class="v-btn v-btn--outline v-btn--lg">
            Contact us
            <AppIcon name="arrow-right" :size="16" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
