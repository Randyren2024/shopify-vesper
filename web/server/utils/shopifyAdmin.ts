interface AdminConnection {
  endpoint: string
  host: string
}

let cachedToken: { value: string; expiresAt: number } | null = null

/**
 * Admin API credentials live in private runtime config. Either a static token
 * (NUXT_SHOPIFY_ADMIN_TOKEN) or OAuth client credentials can be supplied.
 */
export function adminConnection(): AdminConnection | null {
  const config = useRuntimeConfig()
  const domain = String(config.shopifyDomain || '').trim()
  if (!domain) return null
  const host = domain.replace(/^https?:\/\//, '').replace(/\/$/, '')
  const version = String(config.shopifyApiVersion || '2025-10').trim()
  return { endpoint: `https://${host}/admin/api/${version}/graphql.json`, host }
}

export function isAdminConfigured(): boolean {
  const config = useRuntimeConfig()
  const staticToken = String(config.shopifyAdminToken || '').trim()
  const clientId = String(config.shopifyAdminClientId || '').trim()
  const clientSecret = String(config.shopifyAdminClientSecret || '').trim()
  return adminConnection() !== null && Boolean(staticToken || (clientId && clientSecret))
}

async function adminToken(connection: AdminConnection): Promise<string | null> {
  const config = useRuntimeConfig()
  const staticToken = String(config.shopifyAdminToken || '').trim()
  if (staticToken) return staticToken

  const clientId = String(config.shopifyAdminClientId || '').trim()
  const clientSecret = String(config.shopifyAdminClientSecret || '').trim()
  if (!clientId || !clientSecret) return null

  if (cachedToken && cachedToken.expiresAt > Date.now()) return cachedToken.value

  const response = await $fetch<{ access_token?: string; expires_in?: number; error?: string }>(
    `https://${connection.host}/admin/oauth/access_token`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
      }).toString(),
      retry: 0,
      timeout: 15000,
    },
  )

  if (!response.access_token) throw new Error(`SHOPIFY_ADMIN_TOKEN_FAILED: ${response.error || 'no token'}`)

  const lifetime = Math.max(120, Number(response.expires_in) || 86400) - 120
  cachedToken = { value: response.access_token, expiresAt: Date.now() + lifetime * 1000 }
  return cachedToken.value
}

export async function adminGraphql<T>(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<T> {
  const connection = adminConnection()
  if (!connection) throw new Error('SHOPIFY_ADMIN_NOT_CONFIGURED')
  const token = await adminToken(connection)
  if (!token) throw new Error('SHOPIFY_ADMIN_NOT_CONFIGURED')

  const response = await $fetch<{ data?: T; errors?: { message: string }[] }>(connection.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Shopify-Access-Token': token,
    },
    body: { query, variables },
    retry: 0,
    timeout: 15000,
  })

  if (response.errors?.length) {
    throw new Error(response.errors.map((error) => error.message).join('; '))
  }
  if (!response.data) throw new Error('Empty Admin API response')
  return response.data
}
