<script setup lang="ts">
const config = useRuntimeConfig()

const whatsappHref = computed(
  () =>
    `https://wa.me/${config.public.whatsapp}?text=${encodeURIComponent(
      'Hello! I would like to talk to Vesper about agricultural equipment.',
    )}`,
)

useSeoMeta({
  title: 'Contact | Vesper',
  description:
    'Talk to Vesper about slope mowers, robotic sprayers, autosteering and precision agriculture. Based in Australia, replying within one business day.',
  ogTitle: 'Contact Vesper',
  ogDescription:
    'Talk to Vesper about slope mowers, robotic sprayers, autosteering and precision agriculture.',
  ogType: 'website',
})

useHead({
  link: [{ rel: 'canonical', href: `${config.public.siteUrl}/contact` }],
})
</script>

<template>
  <div>
    <section class="pg-hero">
      <div class="v-container">
        <span class="v-eyebrow">Get in touch</span>
        <h1>Contact Information</h1>
        <p>Send us a message and we will get back to you within one business day.</p>
      </div>
    </section>

    <section class="v-section">
      <div class="v-container ct-layout">
        <aside class="ct-aside" data-reveal="left">
          <span class="v-eyebrow">Talk to a person</span>
          <h2 style="margin-top: 12px; font-size: clamp(1.6rem, 3vw, 2.3rem)">
            Tell us about your ground
          </h2>
          <p class="ct-aside__sub">
            Slope, acreage, crop and access all change the recommendation. A short conversation
            usually saves a wrong purchase.
          </p>

          <ul class="ct-list">
            <li class="ct-item">
              <span class="ct-item__icon"><AppIcon name="phone" :size="17" /></span>
              <div>
                <div class="ct-item__label">Phone</div>
                <div class="ct-item__value">
                  <a :href="`tel:${config.public.phone}`">{{ config.public.phone }}</a>
                </div>
              </div>
              <AppIcon name="arrow-right" :size="15" />
            </li>

            <li class="ct-item">
              <span class="ct-item__icon"><AppIcon name="mail" :size="17" /></span>
              <div>
                <div class="ct-item__label">Email</div>
                <div class="ct-item__value">
                  <a :href="`mailto:${config.public.email}`">{{ config.public.email }}</a>
                </div>
              </div>
              <AppIcon name="arrow-right" :size="15" />
            </li>

            <li class="ct-item">
              <span class="ct-item__icon"><AppIcon name="whatsapp" :size="17" /></span>
              <div>
                <div class="ct-item__label">WhatsApp</div>
                <div class="ct-item__value">
                  <a :href="whatsappHref" target="_blank" rel="noopener">{{ config.public.phone }}</a>
                </div>
                <div class="ct-item__note">Prefer WhatsApp? Chat with us.</div>
              </div>
              <AppIcon name="arrow-right" :size="15" />
            </li>

            <li class="ct-item">
              <span class="ct-item__icon"><AppIcon name="map-pin" :size="17" /></span>
              <div>
                <div class="ct-item__label">Address</div>
                <div class="ct-item__value">3 Read Street, Templestowe VIC 3106</div>
                <div class="ct-item__note">Showroom visits by appointment</div>
              </div>
            </li>
          </ul>

          <div class="ct-hours">
            <div class="ct-hours__row">
              <span>Business hours</span>
              <strong>Mon–Fri 9:00 am – 5:00 pm</strong>
            </div>
            <div class="ct-hours__row">
              <span>Company</span>
              <strong>Vesper Robot Mowers Pty. Ltd.</strong>
            </div>
            <div class="ct-hours__row">
              <span>ABN</span>
              <strong>71 702 120 143</strong>
            </div>
          </div>
        </aside>

        <div data-reveal>
          <ContactForm />
        </div>
      </div>
    </section>
  </div>
</template>
