<script setup lang="ts">
const config = useRuntimeConfig()

const journey = [
  {
    year: '2015–2018',
    title: 'DJI Intelligent Perception System Team',
    description:
      'Core member, pioneered mass production of 8,000 units per day. DJI held 90% market share in consumer and agricultural drones.',
    logo: '/brand/media/dji_logo.webp',
  },
  {
    year: '2018–2022',
    title: 'Alibaba DAMO Academy',
    description:
      'Architect for the robotics team, reporting to Professor Tan Ping (3D vision). Focused on spatial intelligence and robotics technologies.',
    logo: '/brand/media/alibaba_damo_academy_logo.webp',
  },
  {
    year: '2022',
    title: 'Robotic Lawn Mower Company',
    description:
      'Co-founded a robotics company with investment from Mr Lei Jun (Xiaomi) and Mr Zeng Liqing (Tencent). Achieved mass production and overseas export.',
    logo: '/brand/media/xiaomi_logo.webp',
  },
  {
    year: '2024',
    title: 'Vesper Robot Mowers',
    description:
      'Extended expertise to large-scale agriculture. Partnered with the Australia–China Agricultural Association and established the agricultural robot and mower product matrix.',
    logo: '/brand/media/logo.webp',
  },
]

const values = [
  {
    icon: 'rocket',
    title: 'Technical Excellence',
    description:
      'The highest standards in product selection and technical validation, so every solution meets rigorous quality benchmarks.',
  },
  {
    icon: 'users',
    title: 'Customer Partnership',
    description:
      'Clients are long-term partners: support runs from product selection through to after-sales service.',
  },
  {
    icon: 'grid',
    title: 'Market Intelligence',
    description:
      'A working understanding of both Chinese manufacturing capability and Australian market needs.',
  },
  {
    icon: 'map-pin',
    title: 'Localized Service',
    description:
      'Local service systems and spare parts, so customers get a complete solution rather than a box.',
  },
]

const stats = [
  {
    icon: 'precision-agriculture',
    value: '10+',
    title: 'Years of experience',
    description: 'Deep agricultural technology expertise, continuously innovating since 2014.',
  },
  {
    icon: 'grid',
    value: '6',
    title: 'Product families',
    description:
      'Precision agriculture, autonomous robots, mowing and smart farming systems.',
  },
  {
    icon: 'map-pin',
    value: 'AU',
    title: 'Australian market',
    description: 'Headquartered in Australia, serving customers across Oceania.',
  },
  {
    icon: 'users',
    value: '4',
    title: 'Service locations',
    description: 'Sydney, Melbourne, Perth and Brisbane partners for sales and service.',
  },
]

useSeoMeta({
  title: 'About | Vesper',
  description:
    "Vesper builds the bridge between China's intelligent hardware technology and Australian agriculture — from DJI lineage to autonomous field robots.",
  ogTitle: 'About Vesper',
  ogDescription:
    "Vesper builds the bridge between China's intelligent hardware technology and Australian agriculture.",
  ogType: 'website',
})

useHead(() => ({
  link: [{ rel: 'canonical', href: `${config.public.siteUrl}/about` }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Vesper Robot Mowers Pty. Ltd.',
        url: config.public.siteUrl,
        email: config.public.email,
        telephone: config.public.phone,
        address: {
          '@type': 'PostalAddress',
          streetAddress: '3 Read Street',
          addressLocality: 'Templestowe',
          addressRegion: 'VIC',
          postalCode: '3106',
          addressCountry: 'AU',
        },
      }),
    },
  ],
}))
</script>

<template>
  <div class="vesper-about">
    <div class="ab-lead">
      <div class="v-container">
        <p class="ab-lead__text" data-reveal>
          Bridging China's intelligent hardware technology with Australia agriculture
        </p>
      </div>
    </div>

    <section class="ab-section ab-section--paper">
      <div class="v-container">
        <header class="ab-head" data-reveal>
          <span class="ab-head__index">01 — Story</span>
          <h2 class="ab-head__title">Building the bridge between technology and agriculture</h2>
          <p class="ab-head__sub">About Vesper Robot Mowers</p>
        </header>

        <div class="ab-story">
          <div class="ab-story__body" data-reveal>
            <p>
              Vesper Robot Mowers is committed to building an efficient bridge between China's
              intelligent hardware technology and the local needs of Australia. With deep expertise
              accumulated from residential scenarios through to large-scale agriculture, we provide
              comprehensive product solutions and services for the Australian market.
            </p>
            <p>
              Based in Australia with strong connections to China's technology ecosystem, we
              leverage full-chain capabilities — spanning R&amp;D, mass production and overseas
              service systems — to deliver agricultural robotics that improve efficiency and
              sustainability.
            </p>
          </div>

          <figure class="ab-story__figure" data-reveal="right">
            <img
              src="/brand/media/agriculture-6502282.webp"
              alt="Australian farmland"
              loading="lazy"
            >
          </figure>
        </div>
      </div>
    </section>

    <section class="ab-section ab-section--tint">
      <div class="v-container">
        <header class="ab-head" data-reveal>
          <span class="ab-head__index">02 — Journey</span>
          <h2 class="ab-head__title">From drones to agricultural robotics</h2>
          <p class="ab-head__sub">Our journey</p>
        </header>

        <ol class="ab-steps">
          <li v-for="item in journey" :key="item.year" class="ab-step" data-reveal>
            <span class="ab-step__year">{{ item.year }}</span>
            <span class="ab-step__logo">
              <img :src="item.logo" :alt="item.title" loading="lazy">
            </span>
            <div class="ab-step__body">
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <section class="ab-section ab-section--white">
      <div class="v-container">
        <header class="ab-head" data-reveal>
          <span class="ab-head__index">03 — Leadership</span>
          <h2 class="ab-head__title">Expertise driving innovation</h2>
          <p class="ab-head__sub">Leadership team</p>
        </header>

        <article class="ab-profile" data-reveal>
          <div class="ab-profile__photo">
            <img
              src="/brand/media/mr-gan-founder.webp"
              alt="Alan Gan, Founder and CEO of Vesper Robot Mowers"
              loading="lazy"
            >
          </div>
          <div class="ab-profile__body">
            <h3>Alan Gan</h3>
            <div class="ab-profile__role">Founder &amp; CEO</div>
            <p>
              A top-tier expert in the drone and robotics industry with more than 15 years of deep
              experience. Former core member of DJI's intelligent perception system team and
              architect at Alibaba DAMO Academy.
            </p>
            <p>
              Led industry-first mass production of 8,000 units per day at DJI, and co-founded a
              robotic lawn mower company that secured investment from Mr Lei Jun (Xiaomi) and Mr
              Zeng Liqing (Tencent).
            </p>
          </div>
        </article>
      </div>
    </section>

    <section class="ab-section ab-section--paper">
      <div class="v-container">
        <header class="ab-head" data-reveal>
          <span class="ab-head__index">04 — Values</span>
          <h2 class="ab-head__title">What drives us forward</h2>
          <p class="ab-head__sub">Our values</p>
        </header>

        <div class="ab-values">
          <article v-for="value in values" :key="value.title" class="ab-value" data-reveal>
            <span class="ab-value__icon">
              <AppIcon :name="value.icon" :size="18" />
            </span>
            <h3>{{ value.title }}</h3>
            <p>{{ value.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="ab-section ab-section--white">
      <div class="v-container">
        <header class="ab-head" data-reveal>
          <span class="ab-head__index">05 — Track record</span>
          <h2 class="ab-head__title">Our proven track record</h2>
          <p class="ab-head__sub">Why choose us</p>
        </header>

        <div class="ab-stats">
          <article v-for="stat in stats" :key="stat.title" class="ab-stat" data-reveal>
            <span class="ab-stat__icon">
              <AppIcon :name="stat.icon" :size="18" />
            </span>
            <strong>{{ stat.value }}</strong>
            <h3>{{ stat.title }}</h3>
            <p>{{ stat.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="ab-section ab-section--paper">
      <div class="v-container">
        <div class="ab-cta" data-reveal>
          <span class="v-eyebrow">Next step</span>
          <h2>Ready to transform your agriculture?</h2>
          <p>
            Whether you need agricultural robots, intelligent navigation systems or a custom
            configuration, our team will help you find the right technology.
          </p>

          <div class="ab-cta__actions">
            <NuxtLink to="/contact" class="v-btn v-btn--primary v-btn--lg">
              Contact us
              <AppIcon name="arrow-right" :size="16" />
            </NuxtLink>
            <NuxtLink to="/products" class="v-btn v-btn--outline v-btn--lg">Browse products</NuxtLink>
          </div>

          <div class="ab-cta__contacts">
            <a :href="`mailto:${config.public.email}`">
              <AppIcon name="mail" :size="15" />
              {{ config.public.email }}
            </a>
            <a :href="`tel:${config.public.phone}`">
              <AppIcon name="phone" :size="15" />
              {{ config.public.phone }}
            </a>
            <span>
              <AppIcon name="map-pin" :size="15" />
              3 Read Street, Templestowe VIC 3106
            </span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
