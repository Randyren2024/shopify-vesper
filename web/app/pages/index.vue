<script setup lang="ts">
/**
 * Homepage aligned 1:1 with the Shopify theme homepage
 * (templates/index.json section order: hero → demo-form → products → problem →
 * demonstrations → why → expert reviews → process → faq → cta).
 *
 * Copy is taken from the live section settings; product images are hot-linked
 * from the store CDN (same domain). The demo booking form is self-built and
 * posts to /api/contact, pushing a generate_lead event on success.
 */

const config = useRuntimeConfig()

useHead({
  titleTemplate: '%s',
  title: 'Vesper Robot',
})

useSeoMeta({
  description:
    'Robot mowers for Aussie slopes and small yards. Heavy-duty slope models for large yards and smart compact units for small yards. Melbourne East showroom, local support, live demos.',
  ogTitle: 'Vesper Robot',
  ogDescription:
    'Robot mowers for Aussie slopes and small yards. Book a free demo at our Melbourne East showroom.',
  ogType: 'website',
  ogImage: `${config.public.siteUrl}/home/banner-hd.webp`,
})

useHead({
  link: [{ rel: 'canonical', href: `${config.public.siteUrl}/` }],
})

/* ------------------------------------------------------------------ demo form */

const demoForm = reactive({
  phone: '',
  name: '',
  email: '',
  suburb: '',
  about: '',
  time: '',
})

const demoCountries = [
  { code: 'au', name: 'Australia', dial: 61 },
  { code: 'nz', name: 'New Zealand', dial: 64 },
  { code: 'us', name: 'United States', dial: 1 },
  { code: 'gb', name: 'United Kingdom', dial: 44 },
  { code: 'cn', name: 'China', dial: 86 },
  { code: 'sg', name: 'Singapore', dial: 65 },
  { code: 'my', name: 'Malaysia', dial: 60 },
  { code: 'jp', name: 'Japan', dial: 81 },
]

const demoCountryCode = ref('au')
const demoCountry = computed(
  () => demoCountries.find((c) => c.code === demoCountryCode.value) ?? demoCountries[0]!,
)
const demoFlag = computed(() => `https://cdn.shopify.com/static/images/flags/${demoCountry.value.code}.svg`)

/* Custom dropdown (teleported to <body> with global CSS): embedded webviews can't
   open native <select> popups and render the options in-page as grey chips. */
const phoneMenuOpen = ref(false)
const phoneBoxRef = ref<HTMLElement | null>(null)
const phoneMenuRef = ref<HTMLElement | null>(null)
const phoneMenuPos = ref({ top: 0, left: 0, minWidth: 0 })

function togglePhoneMenu() {
  if (!phoneMenuOpen.value && phoneBoxRef.value) {
    const r = phoneBoxRef.value.getBoundingClientRect()
    phoneMenuPos.value = { top: r.bottom + 4, left: r.left, minWidth: Math.max(r.width, 250) }
  }
  phoneMenuOpen.value = !phoneMenuOpen.value
}

function selectCountry(country: (typeof demoCountries)[number]) {
  demoCountryCode.value = country.code
  phoneMenuOpen.value = false
}

function onDocumentClick(event: MouseEvent) {
  if (!phoneMenuOpen.value) return
  const target = event.target as Node
  if (phoneBoxRef.value?.contains(target) || phoneMenuRef.value?.contains(target)) return
  phoneMenuOpen.value = false
}

function onDocumentKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') phoneMenuOpen.value = false
}

/* The menu is position:fixed — close it if the page scrolls underneath. */
function onWindowScroll() {
  if (phoneMenuOpen.value) phoneMenuOpen.value = false
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
  document.addEventListener('keydown', onDocumentKeydown)
  window.addEventListener('scroll', onWindowScroll)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick)
  document.removeEventListener('keydown', onDocumentKeydown)
  window.removeEventListener('scroll', onWindowScroll)
})

const demoTimes = ['12:00 – 3:00 PM', '3:00 – 6:00 PM', '7:00 – 9:00 PM']

const demoSending = ref(false)
const demoSent = ref(false)
const demoError = ref('')

async function submitDemo() {
  demoError.value = ''
  demoSending.value = true
  try {
    const message = [
      'In-home demo booking from the homepage.',
      demoForm.phone ? `Phone country: ${demoCountry.value.name} (+${demoCountry.value.dial})` : '',
      demoForm.suburb ? `Suburb: ${demoForm.suburb}` : '',
      demoForm.about ? `About the home: ${demoForm.about}` : '',
      demoForm.time ? `Preferred contact time: ${demoForm.time}` : '',
    ]
      .filter(Boolean)
      .join('\n')

    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: demoForm.name,
        email: demoForm.email,
        phone: demoForm.phone,
        message,
      },
    })
    demoSent.value = true
    trackEvent('generate_lead', { form: 'home_demo' })
  } catch (cause) {
    demoError.value = errorMessage(cause)
  } finally {
    demoSending.value = false
  }
}

/* -------------------------------------------------------------------- content */

const problemItems = [
  {
    title: 'Will it suit my home?',
    body: 'Every yard, pool and floor is different. Specs on a screen don\'t tell you what actually works.',
  },
  {
    title: 'Is it easy to use?',
    body: 'Setup and day-to-day operation can be more complex than a product video suggests.',
  },
  {
    title: 'Who helps me after I buy?',
    body: 'Online-only retailers can\'t answer your calls. We can — in person, in Melbourne.',
  },
]

const whyItems = [
  {
    title: 'DJI & Mowrator R&D Background',
    body: 'Our team has hands-on robotics R&D experience across drone and autonomous mower development.',
  },
  {
    title: 'Founded by Former Mowrator CTO',
    body: 'Our founder co-founded Mowrator and served as CTO — we know autonomous mowers from the ground up.',
  },
  {
    title: 'Based in Melbourne East',
    body: 'We\'re here for setup, guidance and ongoing support — not just the transaction.',
  },
  {
    title: 'Curated for Australian Conditions',
    body: 'We select products that actually work in Australian yards, pools and homes.',
  },
]

const processSteps = [
  {
    title: 'Tell Us About Your Home',
    body: 'Yard size, pool shape, floor type — the details that matter.',
  },
  {
    title: 'See the Robots Work',
    body: 'Watch live demos at our Melbourne East showroom.',
  },
  {
    title: 'Get Personal Advice',
    body: 'Our team recommends exactly what suits your situation.',
  },
  {
    title: 'Book an In-Home Demo',
    body: 'See the robot perform in your actual environment.',
  },
]

const faqs = [
  {
    question: 'Do I need Wi-Fi?',
    answer:
      'Most of our lawn mowers and pool robots work completely offline — no Wi-Fi or app required. Some smart vacuum models offer optional app control, but it\'s never mandatory.',
  },
  {
    question: 'Do I need a base station?',
    answer:
      'Our current smart lawn mowers do not require a base station. This is one of the key advantages of the range we carry.',
  },
  {
    question: 'Can I see the robots before buying?',
    answer:
      'Absolutely. Visit our Melbourne East showroom and see every robot in action before committing.',
  },
  {
    question: 'Can I book an in-home demo?',
    answer:
      'Yes. Fill in the form above and we\'ll be in touch to arrange a visit to your home.',
  },
  {
    question: 'What areas do you service?',
    answer:
      'We are based in Melbourne East and service surrounding suburbs. Contact us to confirm your area.',
  },
  {
    question: 'Do you provide support after purchase?',
    answer:
      'Yes — phone, email and in-person. We want the robot to work for you long-term.',
  },
  {
    question: 'Can someone help me choose the right robot?',
    answer:
      'That\'s our speciality. Come in, tell us about your home, and we\'ll walk you through the options that make sense for your situation.',
  },
]

const openFaqs = ref<boolean[]>(faqs.map(() => false))

function toggleFaq(index: number) {
  openFaqs.value[index] = !openFaqs.value[index]
}

/* ------------------------------------------------------------- expert reviews */

interface ExpertReview {
  name: string
  subs: string
  quote: string
  video: string
}

const reviews: ExpertReview[] = [
  {
    name: 'Enoylity Technology',
    subs: '730K subscribers',
    quote: 'No wire, no RTK. Its tri-camera AI vision lets the mower navigate on its own.',
    video: 'gaQ0U2Jm0m8',
  },
  {
    name: 'TechMagnet',
    subs: '463K subscribers',
    quote: 'One of the simplest smart mowers, with solid vision navigation and real mowing performance.',
    video: 'QpnGPYCdZGg',
  },
  {
    name: 'Florians Gartenwelt',
    subs: '119K subscribers',
    quote: 'TerraMow as an easy AI vision mower, with wire-free setup and straightforward installation.',
    video: 'dWlxpxP7574',
  },
  {
    name: 'TESTSIEGER TV',
    subs: '31.7K subscribers',
    quote: 'Camera-based navigation, easy setup, and strong obstacle detection make TerraMow stand out.',
    video: 'AG96kXhsuss',
  },
  {
    name: 'Valentine Lewis',
    subs: '269K subscribers',
    quote: 'A wire-free, RTK-free mower that makes lawn care much easier and more hands-off.',
    video: '9XuiPMaMltY',
  },
  {
    name: 'Wittmanns Welt',
    subs: '57.1K subscribers',
    quote: 'Set up in minutes, TerraMow makes wire-free mowing feel simple and intuitive.',
    video: '-54GCkNfvQo',
  },
]

const playingVideo = ref<string | null>(null)

const reviewTrack = ref<HTMLElement | null>(null)
const activeDot = ref(0)
const dotCount = ref(1)
let mobileMedia: MediaQueryList | null = null

function reviewsPerView() {
  return mobileMedia?.matches ? 2 : 4
}

function reviewsMaxIndex() {
  return Math.max(0, reviews.length - reviewsPerView())
}

function reviewStep(): number {
  const track = reviewTrack.value
  if (!track || track.children.length === 0) return 0
  const card = track.children[0] as HTMLElement
  const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0
  return card.getBoundingClientRect().width + gap
}

function syncReviews() {
  const track = reviewTrack.value
  if (!track) return
  const step = reviewStep()
  activeDot.value = step
    ? Math.min(Math.round(track.scrollLeft / step), reviewsMaxIndex())
    : 0
  dotCount.value = reviewsMaxIndex() + 1
}

function scrollReviews(direction: number) {
  reviewTrack.value?.scrollBy({ left: direction * reviewStep(), behavior: 'smooth' })
}

function goToDot(index: number) {
  reviewTrack.value?.scrollTo({ left: index * reviewStep(), behavior: 'smooth' })
}

onMounted(() => {
  mobileMedia = window.matchMedia('(max-width: 749px)')
  mobileMedia.addEventListener('change', syncReviews)
  syncReviews()
})

onBeforeUnmount(() => {
  mobileMedia?.removeEventListener('change', syncReviews)
})

const reviewPrevDisabled = computed(() => activeDot.value <= 0)
const reviewNextDisabled = computed(() => activeDot.value >= dotCount.value - 1)
</script>

<template>
  <div class="home">
    <!-- ============================================================ hero -->
    <section id="home-hero" class="hm-hero">
      <div class="hm-hero__bg">
        <picture>
          <source media="(max-width: 767px)" srcset="/home/banner-mobile-hd.webp" width="1125" height="652">
          <img
            src="/home/banner-hd.webp"
            alt="Vesper S1 robot mower"
            width="2048"
            height="1186"
            fetchpriority="high"
            decoding="async"
            style="object-position: 30% center"
          >
        </picture>
        <div class="hm-hero__scrim" aria-hidden="true" />
        <div class="hm-hero__fade" aria-hidden="true" />
      </div>

      <div class="hm-container hm-hero__content">
        <p class="hm-eyebrow hm-hero__eyebrow">Melbourne East&ensp;·&ensp;Local Support&ensp;·&ensp;Live Demos</p>
        <h1 class="hm-hero__heading">Robot Mowers: Aussie Slopes &amp; Small Yards</h1>
        <p class="hm-hero__body">
          Two ranges: heavy-duty slope models for large yards &amp; smart compact units for small yards.
        </p>
        <div class="hm-hero__actions">
          <a href="#demo" class="hm-btn hm-btn--accent">BOOK FREE DEMO</a>
        </div>
      </div>
    </section>

    <!-- ====================================================== demo form -->
    <section id="demo" class="hm-demo">
      <div class="hm-container">
        <div class="hm-demo__grid">
          <div>
            <p class="hm-eyebrow hm-eyebrow--on-dark hm-demo__eyebrow">In-Home Demo</p>
            <h2 class="hm-demo__heading">Want to See If It Works In Your Home?</h2>
            <p class="hm-demo__body">
              Book an in-home demo and see how the robot performs in your actual yard, pool, or floors.
            </p>
            <div class="hm-demo__bullets">
              <div class="hm-demo__bullet"><span />Free for Melbourne East area</div>
              <div class="hm-demo__bullet"><span />No commitment required</div>
              <div class="hm-demo__bullet"><span />Expert visits your home</div>
            </div>
          </div>

          <div class="hm-demo__card">
            <form v-if="!demoSent" class="sf-form" novalidate @submit.prevent="submitDemo">
              <div class="sf-phone">
                <button
                  type="button"
                  ref="phoneBoxRef"
                  class="sf-phone__select"
                  :aria-label="`Country code, ${demoCountry.name} +${demoCountry.dial}`"
                  :aria-expanded="phoneMenuOpen"
                  aria-haspopup="listbox"
                  @click="togglePhoneMenu"
                >
                  <img :src="demoFlag" alt="" width="21" height="15">
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="none" aria-hidden="true"><path d="M7.098.471H.902C.151.471-.27 1.224.194 1.738l3.098 3.433c.36.399 1.055.399 1.416 0L7.806 1.738c.463-.514.043-1.267-.708-1.267Z" fill="#5C5F62" /></svg>
                </button>
                <Teleport to="body">
                  <div
                    v-if="phoneMenuOpen"
                    ref="phoneMenuRef"
                    class="v-sf-phone-menu"
                    role="listbox"
                    aria-label="Country code"
                    :style="{ top: `${phoneMenuPos.top}px`, left: `${phoneMenuPos.left}px`, minWidth: `${phoneMenuPos.minWidth}px` }"
                  >
                    <button
                      v-for="country in demoCountries"
                      :key="country.code"
                      type="button"
                      role="option"
                      class="v-sf-phone-option"
                      :class="{ 'is-active': country.code === demoCountryCode }"
                      :aria-selected="country.code === demoCountryCode"
                      @click="selectCountry(country)"
                    >
                      <img :src="`https://cdn.shopify.com/static/images/flags/${country.code}.svg`" alt="" width="21" height="15">
                      <span class="v-sf-phone-option-name">{{ country.name }}</span>
                      <span class="v-sf-phone-option-dial">+{{ country.dial }}</span>
                    </button>
                  </div>
                </Teleport>
                <div class="sf-field sf-phone__field">
                  <input id="df-phone" v-model="demoForm.phone" class="sf-input" type="tel" autocomplete="tel" placeholder=" " required>
                  <label class="sf-label" for="df-phone">PHONE</label>
                </div>
              </div>

              <div class="sf-field">
                <input id="df-name" v-model="demoForm.name" class="sf-input" type="text" inputmode="text" autocomplete="off" placeholder=" " required>
                <label class="sf-label" for="df-name">NAME</label>
              </div>

              <div class="sf-field">
                <input id="df-email" v-model="demoForm.email" class="sf-input" type="text" inputmode="email" autocomplete="off" placeholder=" " required>
                <label class="sf-label" for="df-email">EMAIL</label>
              </div>

              <div class="sf-field">
                <input id="df-suburb" v-model="demoForm.suburb" class="sf-input" type="text" inputmode="text" autocomplete="off" placeholder=" " required>
                <label class="sf-label" for="df-suburb">Suburb</label>
              </div>

              <div class="sf-field">
                <textarea id="df-about" v-model="demoForm.about" class="sf-input sf-input--area" rows="3" placeholder=" " />
                <label class="sf-label" for="df-about">About your home (optional)</label>
              </div>

              <fieldset class="sf-radios">
                <legend class="sf-radios__legend">PREFERRED CONTACT TIME</legend>
                <div class="sf-radios__group" role="radiogroup" aria-label="Preferred contact time">
                  <label v-for="time in demoTimes" :key="time" class="sf-radios__row">
                    <input v-model="demoForm.time" class="sf-radios__input" type="radio" name="preferred-time" :value="time">
                    <span>{{ time }}</span>
                  </label>
                </div>
              </fieldset>

              <p v-if="demoError" class="sf-error">{{ demoError }}</p>

              <button type="submit" class="sf-submit" :disabled="demoSending">
                BOOK AN IN-HOME DEMO
              </button>

              <p class="sf-consent">
                By registering, you agree to receive marketing emails, SMS, and WhatsApp messages.
                Please review our
                <a href="https://www.vesperrobot.au/policies/privacy-policy" target="_blank" rel="noopener">Privacy Policy</a>
                and
                <a href="https://www.vesperrobot.au/policies/terms-of-service" target="_blank" rel="noopener">Terms of Service</a>
                for more information.
              </p>
            </form>

            <div v-else class="sf-success">
              <strong>Thanks — your demo request is in.</strong>
              <p>We'll be in touch shortly to arrange a visit to your home.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ======================================================= products -->
    <section id="products" class="hm-products">
      <div class="hm-container">
        <p class="hm-eyebrow hm-products__eyebrow">Products</p>
        <h2 class="hm-h2 hm-products__heading">Don't Choose From a Screen. See It Work.</h2>

        <div class="hm-feature">
          <div class="hm-feature__media">
            <img
              src="https://www.vesperrobot.au/cdn/shop/files/4WD-DT-1.webp?v=1790582441&width=900"
              :srcset="[
                'https://www.vesperrobot.au/cdn/shop/files/4WD-DT-1.webp?v=1790582441&width=600 600w',
                'https://www.vesperrobot.au/cdn/shop/files/4WD-DT-1.webp?v=1790582441&width=900 900w',
                'https://www.vesperrobot.au/cdn/shop/files/4WD-DT-1.webp?v=1790582441&width=1400 1400w',
              ].join(', ')"
              sizes="(min-width: 768px) 50vw, 100vw"
              alt="Vesper S1 4WD Grip Tread"
              width="1190"
              height="696"
              loading="lazy"
              decoding="async"
              style="object-position: 35% center"
            >
            <div class="hm-feature__shade" aria-hidden="true" />
            <div class="hm-feature__badge"><span>GRIP TREAD</span></div>
          </div>

          <div class="hm-feature__panel">
            <div>
              <p class="hm-eyebrow hm-eyebrow--on-dark hm-feature__eyebrow">Smart Lawn Mower</p>
              <h3 class="hm-feature__title">Vesper S1 4WD</h3>

              <div class="hm-feature__stats">
                <div class="hm-feature__stat">
                  <div class="hm-feature__stat-value">50°</div>
                  <div class="hm-feature__stat-label">Slope</div>
                  <div class="hm-feature__stat-cap">119% Grade</div>
                </div>
                <div class="hm-feature__stat">
                  <div class="hm-feature__stat-value">3000</div>
                  <div class="hm-feature__stat-label">m²</div>
                  <div class="hm-feature__stat-cap">Per Charge</div>
                </div>
                <div class="hm-feature__stat">
                  <div class="hm-feature__stat-value">4WD</div>
                  <div class="hm-feature__stat-label">Drive</div>
                  <div class="hm-feature__stat-cap">All Terrain</div>
                </div>
              </div>

              <ul class="hm-feature__bullets">
                <li><span />One-button automatic mowing</li>
                <li><span />No base station required</li>
                <li><span />No network needed</li>
                <li><span />Mowrator platform</li>
              </ul>
            </div>

            <a href="#demo" class="hm-btn hm-btn--outline-light">SEE IT WORK →</a>
          </div>
        </div>

        <div class="hm-cards">
          <div class="hm-card">
            <div class="hm-card__media" style="background: #EEECEA">
              <img
                src="https://www.vesperrobot.au/cdn/shop/files/4WD-WW-1_20107b08-335f-4779-8855-6374a5dc851b.webp?v=1791269038&width=700"
                :srcset="[
                  'https://www.vesperrobot.au/cdn/shop/files/4WD-WW-1_20107b08-335f-4779-8855-6374a5dc851b.webp?v=1791269038&width=400 400w',
                  'https://www.vesperrobot.au/cdn/shop/files/4WD-WW-1_20107b08-335f-4779-8855-6374a5dc851b.webp?v=1791269038&width=600 600w',
                  'https://www.vesperrobot.au/cdn/shop/files/4WD-WW-1_20107b08-335f-4779-8855-6374a5dc851b.webp?v=1791269038&width=900 900w',
                ].join(', ')"
                sizes="(min-width: 768px) 50vw, 100vw"
                alt="Vesper S1 4WD Wide Wheel"
                width="700"
                height="420"
                loading="lazy"
                decoding="async"
                style="object-position: 60% center; filter: saturate(0.85)"
              >
              <div class="hm-card__badge"><span>WIDE WHEEL</span></div>
            </div>
            <div class="hm-card__body">
              <p class="hm-eyebrow hm-card__eyebrow">Smart Lawn Mower</p>
              <h3 class="hm-card__title">Vesper S1 4WD</h3>
              <div class="hm-card__stats">
                <div><div class="hm-card__stat-value">40°</div><div class="hm-card__stat-label">Slope</div></div>
                <div><div class="hm-card__stat-value">85%</div><div class="hm-card__stat-label">Grade</div></div>
                <div><div class="hm-card__stat-value">3000 m²</div><div class="hm-card__stat-label">Per Charge</div></div>
              </div>
              <a href="#demo" class="hm-card__link">See It Work →</a>
            </div>
          </div>

          <div class="hm-card">
            <div class="hm-card__media" style="background: #D6E8EA">
              <img
                src="https://www.vesperrobot.au/cdn/shop/files/V1000_Left45_W_PCWELT.webp?v=1790676322&width=700"
                :srcset="[
                  'https://www.vesperrobot.au/cdn/shop/files/V1000_Left45_W_PCWELT.webp?v=1790676322&width=400 400w',
                  'https://www.vesperrobot.au/cdn/shop/files/V1000_Left45_W_PCWELT.webp?v=1790676322&width=600 600w',
                  'https://www.vesperrobot.au/cdn/shop/files/V1000_Left45_W_PCWELT.webp?v=1790676322&width=900 900w',
                ].join(', ')"
                sizes="(min-width: 768px) 50vw, 100vw"
                alt="Cordless pool robot"
                width="700"
                height="420"
                loading="lazy"
                decoding="async"
                style="object-position: center; filter: saturate(0.9)"
              >
            </div>
            <div class="hm-card__body">
              <p class="hm-eyebrow hm-card__eyebrow">Smart Lawn Robot</p>
              <h3 class="hm-card__title">Terramow V1000</h3>
              <ul class="hm-card__bullets">
                <li><span />No Wires. No Antennas. No Signal Issues.</li>
                <li><span />One-Click Auto Mapping</li>
                <li><span />Edge-to-Edge Perfection</li>
              </ul>
              <a href="#demo" class="hm-card__link">See It Work →</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ======================================================== problem -->
    <section id="problem" class="hm-problem">
      <div class="hm-container">
        <p class="hm-eyebrow hm-problem__eyebrow">The Problem</p>
        <h2 class="hm-h2 hm-h2--wide hm-problem__heading">Choosing a Robot Shouldn't Require a Research Project.</h2>

        <div class="hm-problem__list">
          <div v-for="(item, index) in problemItems" :key="item.title" class="hm-problem__row">
            <div class="hm-problem__num">{{ String(index + 1).padStart(2, '0') }}</div>
            <h3 class="hm-problem__title">{{ item.title }}</h3>
            <p class="hm-problem__body">{{ item.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ================================================== demonstrations -->
    <section id="demonstrations" class="hm-demo-section">
      <div class="hm-container hm-demo-section__content">
        <p class="hm-eyebrow hm-eyebrow--on-dark hm-demo-section__eyebrow">Live Demonstrations</p>
        <h2 class="hm-demo-section__heading">Don't ChooseFrom a Screen.</h2>
        <p class="hm-demo-section__body">
          Visit our Melbourne East showroom. See the robots work in person. Ask our team anything.
        </p>
        <a href="#demo" class="hm-btn hm-btn--green">Book Free Demo</a>
      </div>

      <div class="hm-demo-section__media" aria-hidden="true">
        <img
          src="/home/banner.jpg"
          alt=""
          width="1190"
          height="696"
          loading="lazy"
          decoding="async"
          style="object-position: 30% center"
        >
        <div class="hm-demo-section__shade" />
      </div>
    </section>

    <!-- ============================================================ why -->
    <section id="why-vesper" class="hm-why">
      <div class="hm-container">
        <div class="hm-why__grid">
          <div>
            <p class="hm-eyebrow hm-why__eyebrow">Why Vesper</p>
            <h2 class="hm-h2 hm-why__heading">Robotics Expertise.Local Support.</h2>
            <p class="hm-why__body">
              We understand the technology from the inside — and we explain it in a way that helps you
              make the right decision for your home.
            </p>
            <a href="#demo" class="hm-btn hm-btn--dark">BOOK FREE DEMO</a>
          </div>

          <div class="hm-why__list">
            <div v-for="item in whyItems" :key="item.title" class="hm-why__item">
              <h3>{{ item.title }}</h3>
              <p>{{ item.body }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================================================== expert reviews -->
    <section id="expert-reviews" class="hm-reviews">
      <div class="hm-reviews__inner">
        <h2 class="hm-reviews__heading">Expert Reviews</h2>
        <p class="hm-reviews__intro">
          TerraMow has been reviewed and tested by creators and technology channels around the world.
        </p>

        <div class="hm-reviews__carousel">
          <button
            type="button"
            class="hm-reviews__arrow hm-reviews__arrow--prev"
            aria-label="Previous reviews"
            :disabled="reviewPrevDisabled"
            @click="scrollReviews(-1)"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
          </button>

          <div ref="reviewTrack" class="hm-reviews__track" @scroll.passive="syncReviews">
            <article v-for="review in reviews" :key="review.video" class="hm-reviews__card">
              <div class="hm-reviews__media">
                <iframe
                  v-if="playingVideo === review.video"
                  :src="`https://www.youtube-nocookie.com/embed/${review.video}?autoplay=1&rel=0`"
                  :title="`${review.name} review`"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                />
                <button
                  v-else
                  type="button"
                  class="hm-reviews__poster"
                  :aria-label="`Play review from ${review.name}`"
                  @click="playingVideo = review.video"
                >
                  <img
                    :src="`https://i.ytimg.com/vi/${review.video}/hqdefault.jpg`"
                    :alt="`${review.name} review`"
                    width="480"
                    height="360"
                    loading="lazy"
                  >
                  <span class="hm-reviews__play" aria-hidden="true">
                    <svg viewBox="0 0 68 48"><path fill="#ff0000" d="M66.5 7.7a8.6 8.6 0 0 0-6-6C55.2 0 34 0 34 0S12.8 0 7.5 1.7a8.6 8.6 0 0 0-6 6A89.6 89.6 0 0 0 0 24a89.6 89.6 0 0 0 1.5 16.3 8.6 8.6 0 0 0 6 6C12.8 48 34 48 34 48s21.2 0 26.5-1.7a8.6 8.6 0 0 0 6-6A89.6 89.6 0 0 0 68 24a89.6 89.6 0 0 0-1.5-16.3z" /><path fill="#ffffff" d="M27 34l18-10-18-10z" /></svg>
                  </span>
                </button>
              </div>
              <div class="hm-reviews__body">
                <p class="hm-reviews__name">{{ review.name }}</p>
                <p class="hm-reviews__subs">{{ review.subs }}</p>
                <p class="hm-reviews__quote">{{ review.quote }}</p>
                <a
                  class="hm-reviews__link"
                  :href="`https://www.youtube.com/watch?v=${review.video}`"
                  target="_blank"
                  rel="noopener noreferrer"
                >View Full Video <span aria-hidden="true">→</span></a>
              </div>
            </article>
          </div>

          <button
            type="button"
            class="hm-reviews__arrow hm-reviews__arrow--next"
            aria-label="Next reviews"
            :disabled="reviewNextDisabled"
            @click="scrollReviews(1)"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
          </button>

          <div class="hm-reviews__dots">
            <button
              v-for="i in dotCount"
              :key="i"
              type="button"
              class="hm-reviews__dot"
              :class="{ 'is-active': i - 1 === activeDot }"
              :aria-label="`Go to review ${i}`"
              @click="goToDot(i - 1)"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- ======================================================== process -->
    <section id="how-it-works" class="hm-process">
      <div class="hm-container">
        <p class="hm-eyebrow hm-process__eyebrow">Process</p>
        <h2 class="hm-h2 hm-process__heading">See It. Ask. Try. Decide.</h2>

        <div class="hm-process__list">
          <div v-for="(step, index) in processSteps" :key="step.title" class="hm-process__row">
            <div class="hm-process__num">{{ String(index + 1).padStart(2, '0') }}</div>
            <h3 class="hm-process__title">{{ step.title }}</h3>
            <p class="hm-process__body">{{ step.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================ faq -->
    <section id="faq" class="hm-faq">
      <div class="hm-faq__inner">
        <p class="hm-eyebrow hm-faq__eyebrow">FAQ</p>
        <h2 class="hm-h2 hm-faq__heading">Common Questions.</h2>

        <div class="hm-faq__list">
          <div v-for="(faq, index) in faqs" :key="faq.question" class="hm-faq__item">
            <button
              type="button"
              class="hm-faq__trigger"
              :aria-expanded="openFaqs[index]"
              :aria-controls="`faq-panel-${index}`"
              @click="toggleFaq(index)"
            >
              <span>{{ faq.question }}</span>
              <span class="hm-faq__icon" :class="{ 'is-open': openFaqs[index] }">+</span>
            </button>
            <p v-show="openFaqs[index]" :id="`faq-panel-${index}`" class="hm-faq__answer">
              {{ faq.answer }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================ cta -->
    <section id="cta" class="hm-cta">
      <div class="hm-container hm-cta__inner">
        <h2 class="hm-cta__heading">Not Sure What Fits Your Home?</h2>
        <p class="hm-cta__body">Come see the robots work. Talk to our team. Find the right solution.</p>
        <div class="hm-cta__actions">
          <a href="#demo" class="hm-btn hm-btn--light">Book Free Demo</a>
          <NuxtLink to="/contact" class="hm-btn hm-btn--outline-light">Visit Us in Melbourne East</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Homepage mirrors the Shopify theme homepage (sections/vesper-*.liquid),
   which hardcodes its own light palette and Barlow type stack. Scoped to
   this page only. */

:global(html) {
  scroll-behavior: smooth;
}

/* Full-bleed hero: cancel the layout's fixed-header offset on this page. */
:global(.v-main:has(> .home)) {
  padding-top: 0;
}

.home {
  background: #f8f7f4;
  color: #111110;
  font-family: var(--v-font);
}

.hm-container {
  width: 100%;
  max-width: 80rem;
  margin-inline: auto;
  padding-inline: 24px;
}

/* ------------------------------------------------------------- shared */

.hm-eyebrow {
  margin: 0;
  font-family: var(--v-font);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #6b6b68;
}

.hm-eyebrow--on-dark {
  color: #6b6b68;
}

.hm-h2 {
  margin: 0;
  font-family: var(--v-font-display);
  font-weight: 700;
  font-size: 36px;
  line-height: 1;
  letter-spacing: -0.01em;
  text-transform: uppercase;
  color: #111110;
}

.hm-btn {
  display: inline-block;
  font-family: var(--v-font);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  padding: 14px 28px;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s;
}

.hm-btn--accent {
  background: #8de600;
  color: #111110;
}
.hm-btn--accent:hover {
  background: #78c500;
}

.hm-btn--green {
  background: #1e3d1e;
  color: #f8f7f4;
}
.hm-btn--green:hover {
  background: #2d5a2d;
}

.hm-btn--dark {
  background: #111110;
  color: #f8f7f4;
  padding: 13px 24px;
}
.hm-btn--dark:hover {
  background: #1e3d1e;
}

.hm-btn--light {
  background: #f8f7f4;
  color: #111110;
  padding: 14px 32px;
}
.hm-btn--light:hover {
  background: #eeecea;
}

.hm-btn--outline-light {
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #f8f7f4;
  background: transparent;
}
.hm-btn--outline-light:hover {
  border-color: #ffffff;
}

/* --------------------------------------------------------------- hero */

.hm-hero {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-top: 56px;
  min-height: 100svh;
  background: #eeecea;
}

.hm-hero__bg {
  position: absolute;
  inset: 0;
}
.hm-hero__bg picture {
  display: block;
  width: 100%;
  height: 100%;
}
.hm-hero__bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.hm-hero__scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    100deg,
    rgba(248, 247, 244, 0.8) 0%,
    rgba(248, 247, 244, 0.6) 42%,
    rgba(248, 247, 244, 0.15) 65%,
    rgba(248, 247, 244, 0.03) 100%
  );
}
.hm-hero__fade {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 128px;
  background: linear-gradient(transparent, rgba(238, 236, 234, 0.8));
}

.hm-hero__content {
  position: relative;
  padding-bottom: 64px;
}
.hm-hero__eyebrow {
  margin-bottom: 32px;
}
.hm-hero__heading {
  margin: 0 0 24px;
  max-width: 576px;
  font-family: var(--v-font-display);
  font-weight: 700;
  font-size: 48px;
  line-height: 1;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  color: #111110;
}
.hm-hero__body {
  margin: 0 0 40px;
  max-width: 400px;
  font-size: 17px;
  color: #6b6b68;
  line-height: 1.6;
}
.hm-hero__actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

@media (min-width: 640px) {
  .hm-hero__heading {
    font-size: 64px;
  }
  .hm-hero__actions {
    flex-direction: row;
  }
}
@media (min-width: 768px) {
  .hm-hero__heading {
    font-size: 80px;
  }
  .hm-hero__content {
    padding-bottom: 96px;
  }
}
@media (min-width: 1024px) {
  .hm-hero__heading {
    font-size: 96px;
  }
}

/* ---------------------------------------------------------- demo form */

.hm-demo {
  padding: 96px 0;
  background: #111110;
}
@media (min-width: 768px) {
  .hm-demo {
    padding: 128px 0;
  }
}

.hm-demo__grid {
  display: grid;
  gap: 48px;
}
@media (min-width: 768px) {
  .hm-demo__grid {
    grid-template-columns: 1fr 1fr;
    gap: 80px;
  }
}

.hm-demo__eyebrow {
  margin-bottom: 32px;
}
.hm-demo__heading {
  margin: 0 0 32px;
  font-family: var(--v-font-display);
  font-weight: 700;
  font-size: 36px;
  line-height: 1;
  letter-spacing: -0.01em;
  text-transform: uppercase;
  color: #f8f7f4;
}
@media (min-width: 768px) {
  .hm-demo__heading {
    font-size: 52px;
  }
}
.hm-demo__body {
  margin: 0 0 40px;
  max-width: 400px;
  font-size: 16px;
  color: rgba(248, 247, 244, 0.5);
  line-height: 1.7;
}
.hm-demo__bullets {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.hm-demo__bullet {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: rgba(248, 247, 244, 0.5);
}
.hm-demo__bullet span {
  width: 16px;
  height: 1px;
  background: #c85a0a;
  flex-shrink: 0;
}

.hm-demo__card {
  background: #f8f7f4;
  padding: 36px;
  align-self: start;
}

/* Values measured from the live Shopify Forms app form (shadow DOM). */
.sf-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-family: var(--v-font);
  font-size: 16px;
  color: #111110;
}
.sf-field {
  position: relative;
}
.sf-input {
  width: 100%;
  background: #fff;
  border: 0;
  border-radius: 5px;
  box-shadow: 0 0 0 1px rgba(32, 32, 32, 0.2);
  font-family: Arial, sans-serif;
  font-size: 14px;
  color: #202020;
  padding: 22.5px 15px 7.5px;
  height: 46px;
  margin: 0;
}
.sf-input--area {
  height: auto;
  min-height: 90px;
  padding: 26.5px 15px 15px;
  resize: vertical;
}
.sf-input:focus {
  outline: none;
  box-shadow: 0 0 0 1px #202020;
}
.sf-label {
  position: absolute;
  left: 15px;
  top: 16px;
  font-family: Arial, sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: rgba(32, 32, 32, 0.5);
  pointer-events: none;
  transition: top 0.12s ease, font-size 0.12s ease;
}
.sf-input:focus + .sf-label,
.sf-input:not(:placeholder-shown) + .sf-label {
  top: 6px;
  font-size: 11px;
}
.sf-phone {
  display: flex;
  gap: 8px;
}
.sf-phone__select {
  flex: none;
  width: 90px;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  background: #fff;
  border: 0;
  padding: 0;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 0 0 0 1px rgba(32, 32, 32, 0.2);
}
.sf-phone__select img {
  width: 21px;
  height: 15px;
  flex: none;
}
.sf-phone__select:focus-visible {
  box-shadow: 0 0 0 1px #202020;
}
.sf-phone__field {
  flex: 1;
}
.sf-radios {
  border: 0;
  padding: 0;
  margin: 0;
}
.sf-radios__legend {
  font-family: Arial, sans-serif;
  font-size: 14px;
  color: #202020;
  padding: 0 0 10px;
}
.sf-radios__group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.sf-radios__row {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--v-font);
  font-size: 16px;
  color: #111110;
  cursor: pointer;
}
.sf-radios__input {
  width: 16px;
  height: 16px;
  margin: 0;
  accent-color: #202020;
  flex-shrink: 0;
}
.sf-error {
  margin: 0;
  font-family: Arial, sans-serif;
  font-size: 12px;
  color: #d74848;
}
.sf-submit {
  width: 100%;
  border: 0;
  cursor: pointer;
  background: #202020;
  color: #fff;
  font-family: Arial, sans-serif;
  font-size: 14px;
  font-weight: 400;
  padding: 15px;
  border-radius: 5px;
  transition: background-color 0.2s;
}
.sf-submit:hover {
  background: #000;
}
.sf-submit:disabled {
  opacity: 0.6;
  cursor: default;
}
.sf-consent {
  margin: 0;
  font-family: Arial, sans-serif;
  font-size: 10px;
  line-height: 14px;
  color: #202020;
}
.sf-consent a {
  color: inherit;
  text-decoration: underline;
}
.sf-success strong {
  display: block;
  font-size: 15px;
  color: #1e3d1e;
  margin-bottom: 6px;
}
.sf-success p {
  margin: 0;
  font-size: 14px;
  color: #6b6b68;
  line-height: 1.6;
}

/* ----------------------------------------------------------- products */

.hm-products {
  padding: 96px 0;
  background: #eeecea;
}
@media (min-width: 768px) {
  .hm-products {
    padding: 128px 0;
  }
}

.hm-products__eyebrow {
  margin-bottom: 16px;
}
.hm-products__heading {
  margin-bottom: 64px;
  max-width: 576px;
}

.hm-feature {
  display: grid;
  margin-bottom: 16px;
  overflow: hidden;
  border: 1px solid rgba(17, 17, 16, 0.1);
  background: #111110;
}
@media (min-width: 768px) {
  .hm-feature {
    grid-template-columns: 1fr 1fr;
  }
}

.hm-feature__media {
  position: relative;
  min-height: 320px;
  overflow: hidden;
  background: #1e1e1c;
}
@media (min-width: 768px) {
  .hm-feature__media {
    min-height: 460px;
  }
}
.hm-feature__media img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
}
.hm-feature__shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, transparent 50%, rgba(17, 17, 16, 0.6));
}
.hm-feature__badge {
  position: absolute;
  top: 20px;
  left: 20px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding: 4px 10px;
}
.hm-feature__badge span {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.7);
}

.hm-feature__panel {
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 32px;
}
@media (min-width: 768px) {
  .hm-feature__panel {
    padding: 48px;
  }
}
.hm-feature__eyebrow {
  margin-bottom: 12px;
}
.hm-feature__title {
  margin: 0 0 32px;
  font-family: var(--v-font-display);
  font-weight: 700;
  font-size: 32px;
  line-height: 1;
  letter-spacing: -0.01em;
  text-transform: uppercase;
  color: #f8f7f4;
}
@media (min-width: 768px) {
  .hm-feature__title {
    font-size: 44px;
  }
}

.hm-feature__stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  margin-bottom: 32px;
  background: rgba(255, 255, 255, 0.1);
}
.hm-feature__stat {
  padding: 16px;
  background: #1e1e1c;
}
.hm-feature__stat-value {
  font-family: var(--v-font-display);
  font-weight: 700;
  font-size: 28px;
  line-height: 1;
  color: #c85a0a;
}
@media (min-width: 768px) {
  .hm-feature__stat-value {
    font-size: 36px;
  }
}
.hm-feature__stat-label {
  margin-top: 2px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #f8f7f4;
}
.hm-feature__stat-cap {
  margin-top: 2px;
  font-size: 11px;
  color: #6b6b68;
}

.hm-feature__bullets {
  list-style: none;
  margin: 0 0 32px;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.hm-feature__bullets li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: rgba(248, 247, 244, 0.65);
}
.hm-feature__bullets span {
  width: 16px;
  height: 1px;
  background: #c85a0a;
  flex-shrink: 0;
}
.hm-feature__panel .hm-btn--outline-light {
  align-self: flex-start;
  padding: 13px 24px;
}

.hm-cards {
  display: grid;
  gap: 16px;
}
@media (min-width: 768px) {
  .hm-cards {
    grid-template-columns: 1fr 1fr;
  }
}

.hm-card {
  overflow: hidden;
  border: 1px solid rgba(17, 17, 16, 0.1);
  background: #f8f7f4;
}
.hm-card__media {
  position: relative;
  height: 208px;
  overflow: hidden;
}
.hm-card__media img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.hm-card__badge {
  position: absolute;
  top: 16px;
  left: 16px;
  border: 1px solid rgba(17, 17, 16, 0.1);
  background: rgba(248, 247, 244, 0.85);
  padding: 3px 9px;
}
.hm-card__badge span {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: #111110;
}

.hm-card__body {
  padding: 24px;
}
.hm-card__eyebrow {
  margin-bottom: 6px;
}
.hm-card__title {
  margin: 0 0 16px;
  font-family: var(--v-font-display);
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  letter-spacing: -0.01em;
  text-transform: uppercase;
  color: #111110;
}
.hm-card__stats {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}
.hm-card__stat-value {
  font-family: var(--v-font-display);
  font-weight: 700;
  font-size: 22px;
  color: #c85a0a;
}
.hm-card__stat-label {
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #6b6b68;
}
.hm-card__bullets {
  list-style: none;
  margin: 0 0 20px;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.hm-card__bullets li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #6b6b68;
}
.hm-card__bullets span {
  width: 12px;
  height: 1px;
  background: #c85a0a;
  flex-shrink: 0;
}
.hm-card__link {
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  color: #111110;
  border-bottom: 1px solid #111110;
  padding-bottom: 2px;
  transition: color 0.2s, border-color 0.2s;
}
.hm-card__link:hover {
  color: #1e3d1e;
  border-color: #1e3d1e;
}

/* ------------------------------------------------------------ problem */

.hm-problem {
  padding: 96px 0;
  background: #f8f7f4;
}
@media (min-width: 768px) {
  .hm-problem {
    padding: 128px 0;
  }
}
.hm-problem__eyebrow {
  margin-bottom: 40px;
}
.hm-problem__heading {
  margin-bottom: 64px;
  max-width: 672px;
  line-height: 1.05;
}

.hm-problem__list {
  border-top: 1px solid rgba(17, 17, 16, 0.1);
}
.hm-problem__row {
  padding: 28px 0;
  border-bottom: 1px solid rgba(17, 17, 16, 0.1);
}
@media (min-width: 768px) {
  .hm-problem__row {
    display: flex;
    align-items: flex-start;
    gap: 64px;
  }
}
.hm-problem__num {
  margin-bottom: 8px;
  font-family: var(--v-font-display);
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.12em;
  color: #c85a0a;
}
@media (min-width: 768px) {
  .hm-problem__num {
    margin-bottom: 0;
    min-width: 32px;
  }
}
.hm-problem__title {
  margin: 0 0 4px;
  font-weight: 700;
  font-size: 18px;
  text-transform: uppercase;
  letter-spacing: -0.01em;
  color: #111110;
}
@media (min-width: 768px) {
  .hm-problem__title {
    margin: 0 16px 0 0;
    min-width: 260px;
  }
}
.hm-problem__body {
  margin: 0;
  max-width: 480px;
  font-size: 15px;
  color: #6b6b68;
  line-height: 1.6;
}

/* ------------------------------------------------------ demonstrations */

.hm-demo-section {
  position: relative;
  overflow: hidden;
  background: #111110;
}
.hm-demo-section__content {
  position: relative;
  z-index: 10;
  padding: 96px 24px;
}
@media (min-width: 768px) {
  .hm-demo-section__content {
    padding: 128px 24px;
  }
}
.hm-demo-section__eyebrow {
  margin-bottom: 32px;
}
.hm-demo-section__heading {
  margin: 0 0 20px;
  max-width: 576px;
  font-family: var(--v-font-display);
  font-weight: 700;
  font-size: 48px;
  line-height: 1;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  color: #f8f7f4;
}
@media (min-width: 768px) {
  .hm-demo-section__heading {
    font-size: 72px;
  }
}
.hm-demo-section__body {
  margin: 0 0 48px;
  max-width: 420px;
  font-size: 17px;
  color: rgba(248, 247, 244, 0.5);
  line-height: 1.6;
}
.hm-demo-section__media {
  display: none;
}
@media (min-width: 768px) {
  .hm-demo-section__media {
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 50%;
  }
  .hm-demo-section__media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.4;
  }
  .hm-demo-section__shade {
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, #111110 0%, transparent 50%);
  }
}

/* ---------------------------------------------------------------- why */

.hm-why {
  padding: 96px 0;
  background: #f8f7f4;
}
@media (min-width: 768px) {
  .hm-why {
    padding: 128px 0;
  }
}
.hm-why__grid {
  display: grid;
  gap: 48px;
}
@media (min-width: 768px) {
  .hm-why__grid {
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: start;
  }
}
.hm-why__eyebrow {
  margin-bottom: 32px;
}
.hm-why__heading {
  margin-bottom: 32px;
}
.hm-why__body {
  margin: 0 0 40px;
  max-width: 440px;
  font-size: 16px;
  color: #6b6b68;
  line-height: 1.7;
}
.hm-why__list {
  border-top: 1px solid rgba(17, 17, 16, 0.1);
}
.hm-why__item {
  padding: 20px 0;
  border-bottom: 1px solid rgba(17, 17, 16, 0.1);
}
.hm-why__item h3 {
  margin: 0 0 6px;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #111110;
}
.hm-why__item p {
  margin: 0;
  font-size: 14px;
  color: #6b6b68;
  line-height: 1.6;
}

/* ------------------------------------------------------ expert reviews */

.hm-reviews {
  display: block;
  padding: 48px 0;
  background: #f8f7f4;
  color: #222222;
}
.hm-reviews__inner {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}
.hm-reviews__heading {
  margin: 0 0 32px;
  font-family: var(--v-font-display);
  font-size: 36px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.025em;
  text-transform: uppercase;
  color: #111110;
}
@media (min-width: 750px) {
  .hm-reviews__heading {
    font-size: 52px;
  }
}
.hm-reviews__intro {
  max-width: 440px;
  margin: 0 0 32px;
  font-size: 16px;
  line-height: 1.7;
  color: #6b6b68;
}

.hm-reviews__carousel {
  position: relative;
}
.hm-reviews__track {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  scrollbar-width: none;
}
.hm-reviews__track::-webkit-scrollbar {
  display: none;
}
.hm-reviews__card {
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  width: calc((100% - 20px) / 2);
  min-width: 0;
  overflow: hidden;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  background: #ffffff;
  scroll-snap-align: start;
}
@media (min-width: 750px) {
  .hm-reviews__card {
    width: calc((100% - 60px) / 4);
  }
}
.hm-reviews__media {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #000000;
}
.hm-reviews__poster {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
}
.hm-reviews__poster img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.hm-reviews__poster:hover img {
  opacity: 0.85;
}
.hm-reviews__play {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}
.hm-reviews__play svg {
  width: 56px;
  height: 56px;
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.35));
}
.hm-reviews__media iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}
.hm-reviews__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 16px;
}
.hm-reviews__name {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.4;
  color: #222222;
}
.hm-reviews__subs {
  margin: 2px 0 0;
  font-size: 13px;
  line-height: 1.4;
  color: #777777;
}
.hm-reviews__quote {
  flex: 1;
  margin: 10px 0 0;
  font-size: 14px;
  line-height: 1.55;
  color: #555555;
}
.hm-reviews__link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 14px;
  color: #222222;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.hm-reviews__arrow {
  position: absolute;
  top: 34%;
  z-index: 2;
  display: none;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 9999px;
  background: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.18);
  color: #222222;
  cursor: pointer;
}
@media (min-width: 750px) {
  .hm-reviews__arrow {
    display: flex;
  }
}
.hm-reviews__arrow[disabled] {
  opacity: 0.35;
  cursor: default;
}
.hm-reviews__arrow--prev {
  left: -8px;
}
.hm-reviews__arrow--next {
  right: -8px;
}
.hm-reviews__dots {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
}
.hm-reviews__dot {
  width: 9px;
  height: 9px;
  padding: 0;
  border: 0;
  border-radius: 9999px;
  background: #d5d5d5;
  cursor: pointer;
}
.hm-reviews__dot.is-active {
  background: #3392ff;
}

/* ------------------------------------------------------------ process */

.hm-process {
  padding: 96px 0;
  background: #eeecea;
}
@media (min-width: 768px) {
  .hm-process {
    padding: 128px 0;
  }
}
.hm-process__eyebrow {
  margin-bottom: 32px;
}
.hm-process__heading {
  margin-bottom: 64px;
}
.hm-process__list {
  border-top: 1px solid rgba(17, 17, 16, 0.1);
}
.hm-process__row {
  padding: 24px 0;
  border-bottom: 1px solid rgba(17, 17, 16, 0.1);
}
@media (min-width: 768px) {
  .hm-process__row {
    display: flex;
    align-items: flex-start;
    gap: 64px;
  }
}
.hm-process__num {
  margin-bottom: 8px;
  font-family: var(--v-font-display);
  font-weight: 700;
  font-size: 36px;
  line-height: 1;
  color: rgba(17, 17, 16, 0.12);
}
@media (min-width: 768px) {
  .hm-process__num {
    margin-bottom: 0;
    min-width: 56px;
  }
}
.hm-process__title {
  margin: 0 0 4px;
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #111110;
}
@media (min-width: 768px) {
  .hm-process__title {
    margin: 0;
    min-width: 260px;
  }
}
.hm-process__body {
  margin: 0;
  max-width: 400px;
  font-size: 15px;
  color: #6b6b68;
  line-height: 1.6;
}

/* ---------------------------------------------------------------- faq */

.hm-faq {
  padding: 96px 0;
  background: #f8f7f4;
}
@media (min-width: 768px) {
  .hm-faq {
    padding: 128px 0;
  }
}
.hm-faq__inner {
  max-width: 768px;
  margin: 0 auto;
  padding: 0 24px;
}
.hm-faq__eyebrow {
  margin-bottom: 32px;
}
.hm-faq__heading {
  margin-bottom: 48px;
  font-size: 36px;
}
@media (min-width: 768px) {
  .hm-faq__heading {
    font-size: 48px;
  }
}
.hm-faq__list {
  border-top: 1px solid rgba(17, 17, 16, 0.1);
}
.hm-faq__item {
  border-bottom: 1px solid rgba(17, 17, 16, 0.1);
}
.hm-faq__trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 0;
  border: 0;
  background: none;
  cursor: pointer;
  text-align: left;
  font-family: var(--v-font);
}
.hm-faq__trigger > span:first-child {
  font-weight: 600;
  font-size: 15px;
  letter-spacing: 0.01em;
  color: #111110;
  transition: color 0.2s;
}
.hm-faq__trigger:hover > span:first-child {
  color: #1e3d1e;
}
.hm-faq__icon {
  flex-shrink: 0;
  font-size: 20px;
  line-height: 1;
  color: #6b6b68;
  transition: transform 0.25s;
}
.hm-faq__icon.is-open {
  transform: rotate(45deg);
}
.hm-faq__answer {
  margin: 0;
  padding-bottom: 20px;
  font-size: 15px;
  color: #6b6b68;
  line-height: 1.7;
}

/* ---------------------------------------------------------------- cta */

.hm-cta {
  padding: 96px 0;
  background: #1e3d1e;
}
@media (min-width: 768px) {
  .hm-cta {
    padding: 128px 0;
  }
}
.hm-cta__inner {
  text-align: center;
}
.hm-cta__heading {
  margin: 0 auto 20px;
  max-width: 672px;
  font-family: var(--v-font-display);
  font-weight: 700;
  font-size: 40px;
  line-height: 1;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  color: #f8f7f4;
}
@media (min-width: 768px) {
  .hm-cta__heading {
    font-size: 64px;
  }
}
.hm-cta__body {
  margin: 0 auto 40px;
  max-width: 400px;
  font-size: 16px;
  color: rgba(248, 247, 244, 0.6);
  line-height: 1.7;
}
.hm-cta__actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
}
@media (min-width: 640px) {
  .hm-cta__actions {
    flex-direction: row;
  }
}
.hm-cta .hm-btn--outline-light {
  border-color: rgba(248, 247, 244, 0.3);
}
</style>

<style>
/* Country dropdown is teleported to <body>, outside this component's scope.
   Global CSS with unique v-sf- prefixes — immune to scoped-attribute matching
   and to webviews that can't open native <select> popups. */
.v-sf-phone-menu {
  position: fixed;
  z-index: 9999;
  max-height: 240px;
  overflow-y: auto;
  padding: 4px 0;
  background: #fff;
  border-radius: 5px;
  box-shadow:
    0 0 0 1px rgba(32, 32, 32, 0.2),
    0 6px 20px rgba(17, 17, 16, 0.12);
  font-family: Arial, sans-serif;
}
.v-sf-phone-option {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 14px;
  background: none;
  border: 0;
  font-family: Arial, sans-serif;
  font-size: 14px;
  color: #202020;
  text-align: left;
  cursor: pointer;
}
.v-sf-phone-option img {
  width: 21px;
  height: 15px;
  flex: none;
}
.v-sf-phone-option:hover,
.v-sf-phone-option.is-active {
  background: #f6f6f6;
}
.v-sf-phone-option-name {
  flex: 1;
}
.v-sf-phone-option-dial {
  color: rgba(32, 32, 32, 0.55);
}
</style>
