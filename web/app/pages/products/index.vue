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
const categoryOptions = computed(() => categories.value.map((item) => ({ label: item.label, value: item.id })))
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
        <div class="catalogue-controls">
          <div class="catalogue-controls__filter">
            <span class="catalogue-controls__label">Filter by category</span>
            <a-select
              :value="activeCategory || undefined"
              :options="categoryOptions"
              placeholder="All product categories"
              allow-clear
              show-search
              option-filter-prop="label"
              class="catalogue-controls__select"
              @change="selectCategory(String($event ?? ''))"
            />
          </div>
          <a-tag color="green">{{ filtered.length }} {{ filtered.length === 1 ? 'item' : 'items' }}</a-tag>
        </div>

        <a-alert
          v-if="isFallback"
          class="catalogue-preview-alert"
          type="info"
          show-icon
          message="Preview catalogue"
          description="This page is showing the bundled preview catalogue. Connect a Shopify Storefront API token to load live products and availability."
        />

        <div v-if="filtered.length" class="p-grid">
          <ProductCard v-for="product in filtered" :key="product.id" :product="product" />
        </div>

        <div v-else class="cart-empty">
          <a-empty description="Nothing in this category yet" />
          <p>Tell us what you need and we will source it — most of our range is configured to order.</p>
          <NuxtLink to="/contact" class="v-btn v-btn--primary">Talk to the team</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
