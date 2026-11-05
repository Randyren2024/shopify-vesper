<script setup lang="ts">
import type { CatalogCategory, ShopProduct } from '#shared/types'

const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()

const { data: catalog } = await useFetch<{ source: string; products: ShopProduct[] }>(
  '/api/products',
  { key: 'catalogue-products' },
)

const { data: categoryData } = await useFetch<{ categories: CatalogCategory[] }>(
  '/api/categories',
  { key: 'catalogue-categories' },
)

const products = computed(() => catalog.value?.products ?? [])
const categories = computed(() => categoryData.value?.categories ?? [])
const isFallback = computed(() => catalog.value?.source === 'fallback')

const activeCategory = computed(() => String(route.query.category ?? ''))

const activeLabel = computed(() => {
  if (!activeCategory.value) return 'All products'
  return categories.value.find((item) => item.id === activeCategory.value)?.label ?? 'All products'
})

const filtered = computed(() => {
  if (!activeCategory.value) return products.value
  return products.value.filter((product) => {
    const typeSlug = product.productType.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    return (
      product.tags.includes(activeCategory.value) ||
      typeSlug === activeCategory.value ||
      typeSlug.includes(activeCategory.value)
    )
  })
})

function selectCategory(id: string) {
  router.push({ path: '/products', query: id ? { category: id } : {} })
}

const title = computed(() =>
  activeCategory.value ? `${activeLabel.value} — Products` : 'Products',
)

useSeoMeta({
  title: () => `${title.value} | Vesper`,
  description:
    'Browse Vesper agricultural equipment: slope mowers, robotic orchard sprayers, autosteering systems, precision spraying and machine control.',
  ogTitle: () => `${title.value} | Vesper`,
  ogDescription:
    'Browse Vesper agricultural equipment: slope mowers, robotic orchard sprayers, autosteering systems, precision spraying and machine control.',
  ogType: 'website',
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: () =>
        `${config.public.siteUrl}/products${activeCategory.value ? `?category=${activeCategory.value}` : ''}`,
    },
  ],
})
</script>

<template>
  <div>
    <section class="pg-hero">
      <div class="v-container">
        <span class="v-eyebrow">Catalogue</span>
        <h1>{{ activeLabel }}</h1>
        <p>
          Every machine we stock is chosen for Australian conditions and supported from Perth.
          Filter by the job you need done.
        </p>
        <div class="pg-hero__meta">
          <span>{{ filtered.length }} products</span>
          <span>Prices in AUD, GST included</span>
          <span>Freight quoted per order</span>
        </div>
      </div>
    </section>

    <section class="v-section">
      <div class="v-container">
        <div class="flt">
          <button
            type="button"
            class="flt__chip"
            :class="{ 'is-active': !activeCategory }"
            @click="selectCategory('')"
          >
            All products
          </button>
          <button
            v-for="category in categories"
            :key="category.id"
            type="button"
            class="flt__chip"
            :class="{ 'is-active': activeCategory === category.id }"
            @click="selectCategory(category.id)"
          >
            {{ category.label }}
          </button>
        </div>

        <p v-if="isFallback" class="cart-summary__note" style="margin-bottom: 22px">
          Bundled catalogue preview — add a Storefront API token to <code>.env</code> to list live
          Shopify products.
        </p>

        <div v-if="filtered.length" class="p-grid">
          <ProductCard v-for="product in filtered" :key="product.id" :product="product" />
        </div>

        <div v-else class="cart-empty">
          <h2>Nothing in this category yet</h2>
          <p>Tell us what you need and we will source it — most of our range is configured to order.</p>
          <NuxtLink to="/contact" class="v-btn v-btn--primary">Talk to the team</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
