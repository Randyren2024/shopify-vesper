<script setup lang="ts">
import type { LandingContent, ShopProduct } from '#shared/types'

definePageMeta({
  key: (route) => route.fullPath,
})

const route = useRoute()
const config = useRuntimeConfig()

const { data, error } = await useFetch<{
  source: 'shopify' | 'fallback'
  product: ShopProduct
  landing: LandingContent
}>(() => `/api/products/${route.params.handle}`, {
  key: 'product-detail',
})

if (error.value || !data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Product not found' })
}

const product = computed(() => data.value!.product)
const landing = computed(() => data.value!.landing)

const heroImage = computed(
  () => landing.value.heroImage || product.value.featuredImage?.url || '',
)

const absoluteHero = computed(() =>
  heroImage.value.startsWith('http')
    ? heroImage.value
    : `${config.public.siteUrl}${heroImage.value}`,
)

const metaDescription = computed(() => {
  const text = landing.value.lead || landing.value.tagline
  return text.length > 158 ? `${text.slice(0, 155).trimEnd()}…` : text
})

useSeoMeta({
  title: () => `${landing.value.code} ${landing.value.name}`,
  description: () => metaDescription.value,
  ogTitle: () => `${landing.value.code} ${landing.value.name} | Vesper`,
  ogDescription: () => metaDescription.value,
  ogType: 'website',
  ogImage: () => absoluteHero.value,
  twitterCard: 'summary_large_image',
  twitterTitle: () => `${landing.value.code} ${landing.value.name} | Vesper`,
  twitterDescription: () => metaDescription.value,
  twitterImage: () => absoluteHero.value,
})

const productLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: `${landing.value.code} ${landing.value.name}`,
  description: metaDescription.value,
  image: [absoluteHero.value],
  sku: landing.value.code,
  category: landing.value.categoryLabel,
  brand: { '@type': 'Brand', name: 'Vesper' },
  offers: {
    '@type': 'Offer',
    url: `${config.public.siteUrl}/products/${product.value.handle}`,
    priceCurrency: product.value.priceRange.minVariantPrice.currencyCode,
    price: product.value.priceRange.minVariantPrice.amount,
    availability: product.value.availableForSale
      ? 'https://schema.org/InStock'
      : 'https://schema.org/OutOfStock',
    seller: { '@type': 'Organization', name: 'Vesper' },
  },
}))

const breadcrumbLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${config.public.siteUrl}/` },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Products',
      item: `${config.public.siteUrl}/products`,
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: landing.value.categoryLabel,
      item: `${config.public.siteUrl}/products?category=${landing.value.category}`,
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: `${landing.value.code} ${landing.value.name}`,
      item: `${config.public.siteUrl}/products/${product.value.handle}`,
    },
  ],
}))

useHead(() => ({
  link: [{ rel: 'canonical', href: `${config.public.siteUrl}/products/${product.value.handle}` }],
  script: [
    { type: 'application/ld+json', innerHTML: JSON.stringify(productLd.value) },
    { type: 'application/ld+json', innerHTML: JSON.stringify(breadcrumbLd.value) },
  ],
}))
</script>

<template>
  <div class="lp">
    <div class="v-container pdp-breadcrumb">
      <nav class="v-breadcrumb" aria-label="Breadcrumb">
        <NuxtLink to="/">Home</NuxtLink>
        <AppIcon name="chevron-right" :size="13" />
        <NuxtLink to="/products">Products</NuxtLink>
        <AppIcon name="chevron-right" :size="13" />
        <NuxtLink :to="`/products?category=${landing.category}`">{{ landing.categoryLabel }}</NuxtLink>
        <AppIcon name="chevron-right" :size="13" />
        <span aria-current="page">{{ landing.code }}</span>
      </nav>
    </div>

    <section class="lp-section lp-section--tight">
      <div class="lp-container pdp-head">
        <ProductMedia :product="product" :hero-image="heroImage" />
        <ProductBuyPanel :product="product" :landing="landing" />
      </div>
    </section>

    <LandingStrip v-if="landing.stats.length" :stats="landing.stats" />

    <LandingHighlights
      v-if="landing.highlights.length"
      eyebrow="Highlights"
      :title="`What makes the ${landing.code} different`"
      :highlights="landing.highlights"
    />

    <LandingWhy v-if="landing.why.length" :landing="landing" />

    <LandingMetric
      v-if="landing.metric && landing.dataRows.length"
      :metric="landing.metric"
      :rows="landing.dataRows"
    />

    <LandingGallery
      v-if="landing.gallery.length"
      eyebrow="Detail"
      title="Close-up on the engineering"
      :items="landing.gallery"
    />

    <LandingSafety v-if="landing.safety.length" :items="landing.safety" />

    <LandingCompare v-if="landing.compare" :compare="landing.compare" />

    <LandingScenarios v-if="landing.scenarios.length" :items="landing.scenarios" />

    <LandingSpecs v-if="landing.specs.length" :groups="landing.specs" :code="landing.code" />

    <LandingKit v-if="landing.kit.length" :items="landing.kit" />

    <LandingCta :landing="landing" :product="product" />
  </div>
</template>
