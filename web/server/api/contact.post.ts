interface Body {
  name?: string
  email?: string
  phone?: string
  company?: string
  product?: string
  message?: string
}

/**
 * Proxies the contact form to Shopify's own contact endpoint, so enquiries land
 * in the store's customer email flow instead of a third-party service. Runs on
 * the server because Shopify does not send CORS headers for this endpoint.
 */
export default defineEventHandler(async (event) => {
  const body = await readBody<Body>(event)
  const name = String(body?.name ?? '').trim()
  const email = String(body?.email ?? '').trim()
  const message = String(body?.message ?? '').trim()

  if (!name || !email || !message) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name, email and message are required.',
    })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Please enter a valid email address.' })
  }

  const config = useRuntimeConfig()
  const domain = String(config.shopifyDomain || '')
    .replace(/^https?:\/\//, '')
    .replace(/\/$/, '')

  if (!domain) {
    throw createError({
      statusCode: 503,
      statusMessage:
        'Contact delivery is not configured yet. Set NUXT_SHOPIFY_DOMAIN in .env, or email us directly.',
    })
  }

  const payload = new URLSearchParams({
    utf8: '✓',
    form_type: 'customer',
    'contact[name]': name,
    'contact[email]': email,
    'contact[phone]': String(body?.phone ?? '').trim(),
    'contact[body]': [
      message,
      String(body?.company ?? '').trim() ? `Company: ${String(body?.company).trim()}` : '',
      String(body?.product ?? '').trim() ? `Product interest: ${String(body?.product).trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n\n'),
  })

  try {
    await $fetch(`https://${domain}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: payload.toString(),
      responseType: 'text',
      retry: 0,
      timeout: 15000,
    })
  } catch (error) {
    console.error('[contact] Shopify contact endpoint failed:', error)
    throw createError({
      statusCode: 502,
      statusMessage: 'We could not deliver your message. Please email info@vesperrobot.au instead.',
    })
  }

  return { ok: true }
})
