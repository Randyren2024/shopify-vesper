<script setup lang="ts">
const config = useRuntimeConfig()
const year = new Date().getFullYear()

const productLinks = [
  { label: 'Lawn Mowers', to: '/products?category=lawn-mower' },
  { label: 'Precision Agriculture', to: '/products?category=precision-agriculture' },
  { label: 'Precision Spraying', to: '/products?category=precision-spraying' },
  { label: 'Land Leveling', to: '/products?category=land-leveling' },
  { label: 'Agricultural Robots', to: '/products?category=agricultural-robotics' },
  { label: 'Machine Control', to: '/products?category=machine-control' },
]

const companyLinks = [
  { label: 'About Vesper', to: '/about' },
  { label: 'Support', to: '/support' },
  { label: 'Contact', to: '/contact' },
  { label: 'All products', to: '/products' },
]
</script>

<template>
  <footer class="site-footer">
    <div class="v-container">
      <div class="site-footer__grid">
        <div class="site-footer__brand">
          <img src="/brand/vesper-logo-white.svg" alt="Vesper" width="557" height="83">
          <p class="site-footer__tagline">
            Bridging China's intelligent hardware technology with Australian agriculture.
          </p>
        </div>

        <div>
          <div class="site-footer__heading">Products</div>
          <NuxtLink v-for="link in productLinks" :key="link.to" :to="link.to" class="site-footer__link">
            {{ link.label }}
          </NuxtLink>
        </div>

        <div>
          <div class="site-footer__heading">Company</div>
          <NuxtLink v-for="link in companyLinks" :key="link.to" :to="link.to" class="site-footer__link">
            {{ link.label }}
          </NuxtLink>
        </div>

        <div>
          <div class="site-footer__heading">Contact</div>
          <a class="site-footer__link" :href="`mailto:${config.public.email}`">
            {{ config.public.email }}
          </a>
          <a class="site-footer__link" :href="`tel:${config.public.phone}`">
            {{ config.public.phone }}
          </a>
          <span class="site-footer__link">Perth, Western Australia</span>
        </div>
      </div>

      <div class="site-footer__bottom">
        <span>© {{ year }} Vesper. All rights reserved.</span>
        <span>Payments and orders are processed securely by Shopify.</span>
      </div>
    </div>
  </footer>
</template>
