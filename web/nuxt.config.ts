export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: false },

  css: [
    '~/assets/css/tokens.css',
    '~/assets/css/base.css',
    '~/assets/css/inner.css',
    '~/assets/css/landing.css',
    '~/assets/css/dedicated.css',
  ],

  /**
   * Storefront API credentials stay server-side only. Every GraphQL call goes
   * through a Nitro route (see server/utils/shopify.ts), so the token is never
   * serialised into the client bundle.
   */
  runtimeConfig: {
    shopifyDomain: '',
    shopifyStorefrontToken: '',
    shopifyApiVersion: '2025-10',
    public: {
      siteUrl: 'https://www.vesperrobot.au',
      storeDomain: 'www.vesperrobot.au',
      whatsapp: '61448290926',
      email: 'info@vesperrobot.au',
      phone: '+61448290926',
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      titleTemplate: '%s | Vesper',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#f8f7f4' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/brand/vesper-logo.svg' },
      ],
      script: [
        {
          // Applies the stored colour scheme before the first paint (no flash).
          innerHTML: `(function(){var r=document.documentElement;r.classList.add('js');try{var s=localStorage.getItem('vesper-theme');var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d){r.setAttribute('data-theme','dark');}}catch(e){}})();`,
          tagPriority: 'critical',
        },
      ],
    },
  },

  nitro: {
    compressPublicAssets: true,
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },
})
