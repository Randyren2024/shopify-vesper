<script setup lang="ts">
const config = useRuntimeConfig()

const form = reactive({
  name: '',
  email: '',
  phone: '',
  company: '',
  product: '',
  message: '',
})

const sending = ref(false)
const sent = ref(false)
const error = ref('')

async function submit() {
  error.value = ''
  sending.value = true
  try {
    await $fetch('/api/contact', { method: 'POST', body: { ...form } })
    sent.value = true
    trackEvent('generate_lead', { form: 'contact_page', product: form.product || null })
    form.name = ''
    form.email = ''
    form.phone = ''
    form.company = ''
    form.product = ''
    form.message = ''
  } catch (cause) {
    error.value = errorMessage(cause)
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <div class="ct-form">
    <h2 style="font-size: 1.3rem">Send us a message</h2>
    <p style="margin: 8px 0 22px; color: var(--v-ink-soft); font-size: 0.92rem">
      Tell us what you are working with and we will reply within one business day.
    </p>

    <form v-if="!sent" @submit.prevent="submit">
      <div class="ct-form__grid">
        <div class="v-field">
          <label for="cf-name">Name</label>
          <input id="cf-name" v-model="form.name" class="v-input" type="text" autocomplete="name" required>
        </div>
        <div class="v-field">
          <label for="cf-email">Email</label>
          <input id="cf-email" v-model="form.email" class="v-input" type="email" autocomplete="email" required>
        </div>
        <div class="v-field">
          <label for="cf-phone">Phone</label>
          <input id="cf-phone" v-model="form.phone" class="v-input" type="tel" autocomplete="tel">
        </div>
        <div class="v-field">
          <label for="cf-company">Company</label>
          <input id="cf-company" v-model="form.company" class="v-input" type="text" autocomplete="organization">
        </div>
        <div class="v-field ct-form__full">
          <label for="cf-product">Product interest</label>
          <input
            id="cf-product"
            v-model="form.product"
            class="v-input"
            type="text"
            placeholder="e.g. Mowrator S1 4WD, AF718, orchard sprayer"
          >
        </div>
        <div class="v-field ct-form__full">
          <label for="cf-message">How can we help?</label>
          <textarea id="cf-message" v-model="form.message" class="v-textarea" required></textarea>
        </div>
      </div>

      <p v-if="error" class="v-form-note v-form-note--error" style="margin-top: 16px">{{ error }}</p>

      <div class="ct-form__foot">
        <p>
          We use your details only to answer this enquiry. Prefer email?
          <a :href="`mailto:${config.public.email}`" style="text-decoration: underline">{{ config.public.email }}</a>
        </p>
        <button type="submit" class="v-btn v-btn--primary v-btn--lg" :disabled="sending">
          <AppIcon name="mail" :size="16" />
          {{ sending ? 'Sending…' : 'Send message' }}
        </button>
      </div>
    </form>

    <div v-else class="v-form-note v-form-note--ok">
      <strong>Thanks — your message is on its way.</strong>
      <p style="margin-top: 6px">
        We will reply within one business day. If it is urgent, call
        <a :href="`tel:${config.public.phone}`" style="text-decoration: underline">{{ config.public.phone }}</a>.
      </p>
      <button type="button" class="v-btn v-btn--ghost" style="margin-top: 10px" @click="sent = false">
        Send another message
      </button>
    </div>
  </div>
</template>
