<script setup lang="ts">
const config = useRuntimeConfig()

const whatsappHref = computed(
  () =>
    `https://wa.me/${config.public.whatsapp}?text=${encodeURIComponent(
      'Hello! I need support with a Vesper product.',
    )}`,
)

const channels = [
  {
    icon: 'phone',
    title: 'Phone support',
    value: config.public.phone,
    action: `tel:${config.public.phone}`,
    label: 'Call now',
  },
  {
    icon: 'whatsapp',
    title: 'WhatsApp',
    value: config.public.phone,
    action: whatsappHref.value,
    label: 'Message on WhatsApp',
  },
  {
    icon: 'mail',
    title: 'Email support',
    value: 'market@vesperinno.com',
    action: 'mailto:market@vesperinno.com',
    label: 'Send email',
  },
]

const servicePoints = [
  { city: 'Sydney, NSW', role: 'Main service centre', detail: 'Full diagnostics, repairs and parts' },
  { city: 'Melbourne, VIC', role: 'Authorised partner', detail: 'Sales and basic service' },
  { city: 'Perth, WA', role: 'Authorised partner', detail: 'Sales and basic service' },
  { city: 'Brisbane, QLD', role: 'Authorised partner', detail: 'Sales and basic service' },
]

const warranty = [
  {
    title: 'Standard warranty',
    text: 'All Vesper AgriTech products carry a standard 12-month warranty covering manufacturing defects, starting from the date of purchase.',
  },
  {
    title: 'Extended warranty',
    text: 'Extended warranty options are available for purchase. Contact us for plans and pricing.',
  },
  {
    title: 'Warranty claim process',
    text: 'Contact support with your purchase details and a description of the issue. We will guide you through troubleshooting, and arrange a repair or replacement unit if needed.',
  },
  {
    title: 'Spare parts & accessories',
    text: 'Spare parts are available for all our products, typically with a 3–7 business day lead time within Australia.',
  },
]

useSeoMeta({
  title: 'Support | Vesper',
  description:
    'Vesper product support: phone, WhatsApp and email, four Australian service locations, warranty information and spare parts.',
  ogTitle: 'Vesper Support',
  ogDescription:
    'Phone, WhatsApp and email support, four Australian service locations, warranty and spare parts.',
  ogType: 'website',
})

useHead({
  link: [{ rel: 'canonical', href: `${config.public.siteUrl}/support` }],
})
</script>

<template>
  <div>
    <section class="pg-hero">
      <div class="v-container">
        <span class="v-eyebrow">Support</span>
        <h1>Product support</h1>
        <p>
          Parts, diagnostics and technical help from people who know the machines — plus four
          service locations across Australia.
        </p>
        <div class="pg-hero__meta">
          <span>Mon–Fri 9:00 am – 5:00 pm</span>
          <span>3–7 day parts lead time in Australia</span>
        </div>
      </div>
    </section>

    <section class="v-section">
      <div class="v-container">
        <div class="sp-grid">
          <a
            v-for="channel in channels"
            :key="channel.title"
            :href="channel.action"
            class="sp-card"
            :target="channel.action.startsWith('http') ? '_blank' : undefined"
            :rel="channel.action.startsWith('http') ? 'noopener' : undefined"
            data-reveal
          >
            <span class="sp-card__icon">
              <AppIcon :name="channel.icon" :size="18" />
            </span>
            <h2>{{ channel.title }}</h2>
            <p>{{ channel.value }}</p>
            <span class="p-card__cta">{{ channel.label }} →</span>
          </a>
        </div>
      </div>
    </section>

    <section class="v-section" style="padding-top: 0">
      <div class="v-container">
        <header class="lp-section-head" data-reveal>
          <span class="v-eyebrow">Service network</span>
          <h2>Where we can help in person</h2>
        </header>

        <div class="lp-table-wrap" data-reveal>
          <table class="lp-table">
            <thead>
              <tr>
                <th>Location</th>
                <th>Role</th>
                <th>Capability</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="point in servicePoints" :key="point.city">
                <td>{{ point.city }}</td>
                <td>{{ point.role }}</td>
                <td>{{ point.detail }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section class="v-section" style="padding-top: 0">
      <div class="v-container">
        <header class="lp-section-head" data-reveal>
          <span class="v-eyebrow">Warranty</span>
          <h2>Warranty and spare parts</h2>
        </header>

        <div class="lp-grid lp-grid--2">
          <article v-for="item in warranty" :key="item.title" class="lp-feature" data-reveal>
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </article>
        </div>

        <div class="ab-cta" style="margin-top: 40px" data-reveal>
          <span class="v-eyebrow">Need a person?</span>
          <h2>Talk to the support desk</h2>
          <p>Send through the model and a description of the issue, and we will take it from there.</p>
          <div class="ab-cta__actions">
            <NuxtLink to="/contact" class="v-btn v-btn--primary v-btn--lg">
              Contact support
              <AppIcon name="arrow-right" :size="16" />
            </NuxtLink>
            <a :href="whatsappHref" target="_blank" rel="noopener" class="v-btn v-btn--outline v-btn--lg">
              <AppIcon name="whatsapp" :size="16" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
