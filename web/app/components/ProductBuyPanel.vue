<script setup lang="ts">
import type { LandingContent, ShopProduct } from '#shared/types'

const props = defineProps<{
  product: ShopProduct
  landing: LandingContent
}>()

const config = useRuntimeConfig()
const { add, pending, checkoutEnabled } = useCart()

const variants = computed(() => props.product.variants)
const selectedId = ref(variants.value[0]?.id ?? '')
const quantity = ref(1)
const added = ref(false)
const error = ref('')
const openPanel = ref<'why' | 'features' | null>(null)

const variant = computed(
  () => variants.value.find((item) => item.id === selectedId.value) ?? variants.value[0] ?? null,
)

watch(
  () => props.product.handle,
  () => {
    selectedId.value = variants.value[0]?.id ?? ''
    quantity.value = 1
    error.value = ''
  },
)

const price = computed(() => formatMoney(variant.value?.price ?? props.product.priceRange.minVariantPrice))
const compareAt = computed(() => {
  const value = variant.value?.compareAtPrice ?? props.product.compareAtPrice
  if (!value) return null
  const now = variant.value?.price ?? props.product.priceRange.minVariantPrice
  return Number(value.amount) > Number(now.amount) ? formatMoney(value) : null
})

const inStock = computed(() => variant.value?.availableForSale ?? props.product.availableForSale)

const whatsappHref = computed(() => {
  const message = `Hello! I would like to request a demo of the ${props.landing.code} ${props.landing.name}.`
  return `https://wa.me/${config.public.whatsapp}?text=${encodeURIComponent(message)}`
})

async function addToCart() {
  if (!variant.value) return
  error.value = ''
  try {
    await add(variant.value.id, quantity.value)
    added.value = true
    window.setTimeout(() => {
      added.value = false
    }, 2600)
  } catch (cause) {
    error.value = errorMessage(cause)
  }
}

function togglePanel(panel: 'why' | 'features') {
  openPanel.value = openPanel.value === panel ? null : panel
}
</script>

<template>
  <div class="pdp-buy" data-reveal="right">
    <div>
      <div class="pdp-buy__cat">{{ landing.categoryLabel }}</div>
      <h1>{{ landing.code }} — {{ landing.name }}</h1>
      <p class="pdp-buy__tagline" style="margin-top: 14px">{{ landing.tagline }}</p>
    </div>

    <div v-if="landing.badges.length" class="pdp-buy__badges">
      <span v-for="badge in landing.badges" :key="badge" class="v-badge">{{ badge }}</span>
    </div>

    <div class="pdp-buy__panel">
      <div class="pdp-price">
        <span class="pdp-price__now">{{ price }}</span>
        <span v-if="compareAt" class="pdp-price__was">{{ compareAt }}</span>
        <span class="pdp-price__stock" :class="{ 'is-out': !inStock }">
          {{ inStock ? 'In stock' : 'Out of stock' }}
        </span>
      </div>

      <div v-if="variants.length > 1" class="v-field">
        <label for="variant">Configuration</label>
        <select id="variant" v-model="selectedId" class="v-select">
          <option v-for="item in variants" :key="item.id" :value="item.id" :disabled="!item.availableForSale">
            {{ item.title }}{{ item.availableForSale ? '' : ' — sold out' }}
          </option>
        </select>
      </div>

      <div class="pdp-qty">
        <span class="pdp-qty__label">Quantity</span>
        <QuantityStepper v-model="quantity" :min="1" :max="20" />
      </div>

      <button
        type="button"
        class="v-btn v-btn--primary v-btn--block v-btn--lg"
        :disabled="pending || !inStock"
        @click="addToCart"
      >
        <AppIcon :name="added ? 'check' : 'cart'" :size="17" />
        <span v-if="added">Added to cart</span>
        <span v-else-if="pending">Adding…</span>
        <span v-else-if="inStock">Add to cart — {{ price }}</span>
        <span v-else>Out of stock</span>
      </button>

      <a :href="whatsappHref" target="_blank" rel="noopener" class="v-btn v-btn--outline v-btn--block">
        <AppIcon name="whatsapp" :size="16" />
        Request a demo
      </a>

      <p v-if="error" class="v-form-note v-form-note--error">{{ error }}</p>

      <p v-if="!checkoutEnabled" class="cart-summary__note">
        Preview catalogue: product data comes from the bundled catalogue. Add a Storefront API
        token to <code>.env</code> to switch to live Shopify products and checkout.
      </p>
    </div>

    <div class="v-accordion">
      <div class="v-accordion__item" :class="{ 'is-open': openPanel === 'why' }">
        <button
          type="button"
          class="v-accordion__trigger"
          :aria-expanded="openPanel === 'why'"
          @click="togglePanel('why')"
        >
          <span>Why you'll choose it</span>
          <AppIcon name="chevron-down" :size="16" />
        </button>
        <div class="v-accordion__panel">
          <ul class="v-check-list">
            <li v-for="reason in landing.why" :key="reason">
              <AppIcon name="check" :size="15" />
              <span>{{ reason }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="v-accordion__item" :class="{ 'is-open': openPanel === 'features' }">
        <button
          type="button"
          class="v-accordion__trigger"
          :aria-expanded="openPanel === 'features'"
          @click="togglePanel('features')"
        >
          <span>Key features</span>
          <AppIcon name="chevron-down" :size="16" />
        </button>
        <div class="v-accordion__panel">
          <ul class="v-check-list">
            <li v-for="feature in landing.features" :key="feature">
              <AppIcon name="check" :size="15" />
              <span>{{ feature }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="pdp-buy__links">
      <a href="#specs" class="pdp-buy__link">
        <AppIcon name="grid" :size="15" />
        Full specifications
      </a>
      <NuxtLink to="/support" class="pdp-buy__link">
        <AppIcon name="headset" :size="15" />
        Product support
      </NuxtLink>
      <NuxtLink to="/contact" class="pdp-buy__link">
        <AppIcon name="phone" :size="15" />
        Talk to us
      </NuxtLink>
    </div>
  </div>
</template>
