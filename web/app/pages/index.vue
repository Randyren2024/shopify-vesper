<script setup lang="ts">
import type { CatalogCategory, ShopProduct } from '#shared/types'

const config = useRuntimeConfig()

const { data: catalog } = await useFetch<{ source: string; products: ShopProduct[] }>(
  '/api/products',
  { key: 'home-products' },
)

const { data: categoryData } = await useFetch<{ categories: CatalogCategory[] }>(
  '/api/categories',
  { key: 'home-categories' },
)

const products = computed(() => catalog.value?.products ?? [])
const categories = computed(() => categoryData.value?.categories ?? [])

const featured = computed(() => {
  const handles = ['vesper-s1-4wd-50', 'af718', 'aries300n', 'v600']
  const picked = handles
    .map((handle) => products.value.find((product) => product.handle === handle))
    .filter((product): product is ShopProduct => Boolean(product))
  if (picked.length >= 4) return picked.slice(0, 4)
  return products.value.slice(0, 4)
})

const isFallback = computed(() => catalog.value?.source === 'fallback')

useSeoMeta({
  title: 'Vesper — Intelligent equipment for Australian agriculture',
  description:
    'Remote-controlled slope mowers, orchard robots, autosteering and precision spraying systems, supported from Perth and delivered across Australia.',
  ogTitle: 'Vesper — Intelligent equipment for Australian agriculture',
  ogDescription:
    'Remote-controlled slope mowers, orchard robots, autosteering and precision spraying systems, supported from Perth and delivered across Australia.',
  ogType: 'website',
  ogImage: `${config.public.siteUrl}/brand/media/agriculture-6502282.webp`,
})

useHead({
  link: [{ rel: 'canonical', href: `${config.public.siteUrl}/` }],
})

const reasons = [
  {
    icon: 'shield',
    title: 'Field-proven hardware',
    text: 'Every machine is selected for Australian conditions — heat, dust, steep country and long service intervals.',
  },
  {
    icon: 'wrench',
    title: 'Local parts and service',
    text: 'Spares and technical support run out of Perth, so a breakdown does not become a season lost.',
  },
  {
    icon: 'headset',
    title: 'Sized to your ground',
    text: 'We talk through slope, soil and canopy before quoting, rather than shipping a spec sheet.',
  },
  {
    icon: 'truck',
    title: 'Delivered Australia-wide',
    text: 'Freight, commissioning and operator handover are arranged as part of the order.',
  },
]
</script>

<template>
  <div class="lp">
    <section class="lp-hero">
      <div class="lp-container lp-hero__wrap">
        <div class="lp-hero__copy" data-reveal>
          <span class="v-eyebrow">Vesper · Australian agriculture</span>

          <h1>
            Intelligent machines
            <span>for the ground you work</span>
          </h1>

          <p class="lp-hero__lead">
            Remote-controlled slope mowers, autonomous orchard sprayers, autosteering and precision
            spraying — sourced, supported and serviced from Western Australia.
          </p>

          <div class="lp-hero__actions">
            <NuxtLink to="/products" class="v-btn v-btn--primary v-btn--lg">
              Explore the range
              <AppIcon name="arrow-right" :size="16" />
            </NuxtLink>
            <NuxtLink to="/contact" class="v-btn v-btn--outline v-btn--lg">
              Talk to the team
            </NuxtLink>
          </div>

          <div class="lp-hero__stats">
            <span class="lp-mini-stat">6 product families</span>
            <span class="lp-mini-stat">Perth-based support</span>
            <span class="lp-mini-stat">Australia-wide delivery</span>
            <span class="lp-mini-stat">Shopify-secured checkout</span>
          </div>
        </div>

        <div class="lp-hero__media" data-reveal="right">
          <div class="lp-hero__card">
            <img
              src="/brand/media/agriculture-6502282.webp"
              alt="Australian farmland at golden hour"
              width="1200"
              height="800"
            >
          </div>
          <div class="lp-hero__badge">
            <strong>Built for Australian conditions</strong>
            <span>Slope, dust and heat are part of the specification, not an afterthought.</span>
          </div>
        </div>
      </div>
    </section>

    <div class="lp-strip">
      <div class="lp-container lp-strip__grid">
        <div class="lp-strip__item">
          <strong>50°</strong>
          <span>Maximum slope handled</span>
        </div>
        <div class="lp-strip__item">
          <strong>±2.5 cm</strong>
          <span>Autosteering accuracy</span>
        </div>
        <div class="lp-strip__item">
          <strong>300 L</strong>
          <span>Orchard sprayer tank</span>
        </div>
        <div class="lp-strip__item">
          <strong>8 h</strong>
          <span>Hybrid robot runtime</span>
        </div>
        <div class="lp-strip__item">
          <strong>24 mo</strong>
          <span>Standard warranty</span>
        </div>
      </div>
    </div>

    <section class="lp-section">
      <div class="lp-container">
        <header class="lp-section-head" data-reveal>
          <span class="v-eyebrow">Product families</span>
          <h2>Pick the job, then the machine</h2>
          <p class="v-lead">
            Six families covering mowing, spraying, steering, leveling and machine control — all
            backed by the same local support desk.
          </p>
        </header>

        <div class="lp-grid lp-grid--3">
          <NuxtLink
            v-for="category in categories"
            :key="category.id"
            :to="`/products?category=${category.id}`"
            class="lp-feature"
            data-reveal
          >
            <span class="lp-feature__icon">
              <AppIcon name="grid" :size="19" />
            </span>
            <h3>{{ category.label }}</h3>
            <p>{{ category.blurb }}</p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="lp-section lp-section--tight">
      <div class="lp-container">
        <header class="lp-section-head" data-reveal>
          <span class="v-eyebrow">Featured</span>
          <h2>Machines customers ask about first</h2>
          <p v-if="isFallback" class="v-lead">
            Showing the bundled catalogue. Add a Storefront API token to <code>.env</code> to load
            live Shopify products.
          </p>
        </header>

        <div class="p-grid">
          <ProductCard
            v-for="product in featured"
            :key="product.id"
            :product="product"
            data-reveal
          />
        </div>

        <div style="margin-top: 32px">
          <NuxtLink to="/products" class="v-btn v-btn--outline v-btn--lg">
            View all products
            <AppIcon name="arrow-right" :size="16" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="lp-section">
      <div class="lp-container">
        <header class="lp-section-head" data-reveal>
          <span class="v-eyebrow">Why Vesper</span>
          <h2>Equipment is the easy part</h2>
          <p class="v-lead">
            The difference is what happens after delivery — parts, setup and someone who knows the
            machine.
          </p>
        </header>

        <div class="lp-grid lp-grid--4">
          <article v-for="reason in reasons" :key="reason.title" class="lp-feature" data-reveal>
            <span class="lp-feature__icon">
              <AppIcon :name="reason.icon" :size="19" />
            </span>
            <h3>{{ reason.title }}</h3>
            <p>{{ reason.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="lp-cta">
      <div class="lp-container">
        <div class="lp-cta__box" data-reveal>
          <div>
            <span class="v-eyebrow">Next step</span>
            <h2>Tell us what you are trying to clear</h2>
            <p>
              Send through the slope, acreage or crop, and we will come back with the right machine,
              freight and lead time.
            </p>
          </div>
          <div class="lp-cta__actions">
            <NuxtLink to="/contact" class="v-btn v-btn--primary v-btn--lg">
              Request a quote
              <AppIcon name="arrow-right" :size="16" />
            </NuxtLink>
            <NuxtLink to="/about" class="v-btn v-btn--outline v-btn--lg">About Vesper</NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
