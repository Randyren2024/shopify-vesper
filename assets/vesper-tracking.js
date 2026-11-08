/* ==========================================================================
   Vesper tracking bridge
   Mirrors the Nuxt storefront's GA4 event contract through GTM dataLayer.
   Consent and tag routing remain controlled by the connected GTM container.
   ========================================================================== */
(function () {
  'use strict';

  var Vesper = (window.Vesper = window.Vesper || {});

  function trackEvent(name, params) {
    if (!name) return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: name }, params || {}));
  }

  function currency() {
    return document.documentElement.dataset.currency || 'AUD';
  }

  function toGa4Item(item, quantity) {
    if (!item) return null;
    var unitPrice = Number(item.final_price || item.price || 0) / 100;
    return {
      item_id: item.handle || String(item.product_id || item.variant_id || ''),
      item_name: item.product_title || item.title || '',
      item_variant: item.variant_title || '',
      price: unitPrice,
      quantity: Number(quantity || item.quantity || 1),
    };
  }

  function trackCartEvent(name, cart) {
    if (!cart) return;
    var items = (cart.items || []).map(function (item) {
      return toGa4Item(item, item.quantity);
    }).filter(Boolean);

    trackEvent(name, {
      currency: currency(),
      value: Number(cart.total_price || 0) / 100,
      items: items,
    });
  }

  Vesper.trackEvent = trackEvent;
  Vesper.trackCartEvent = trackCartEvent;
  Vesper.toGa4Item = toGa4Item;

  function initTracking() {
    var product = document.querySelector('[data-ga4-product]');
    if (product && product.dataset.itemId) {
      var price = Number(product.dataset.itemPrice || 0);
      trackEvent('view_item', {
        currency: currency(),
        value: price,
        items: [{
          item_id: product.dataset.itemId,
          item_name: product.dataset.itemName || '',
          price: price,
          quantity: 1,
        }],
      });
    }

    document.querySelectorAll('[data-lead-success]').forEach(function (success) {
      trackEvent('generate_lead', {
        form: success.dataset.leadForm || 'shopify_contact',
        product: success.dataset.leadProduct || null,
      });
    });

    document.addEventListener('click', function (event) {
      var demoButton = event.target.closest('[data-request-demo]');
      if (demoButton) {
        var productRoot = demoButton.closest('[data-ga4-product]');
        trackEvent('contact', {
          method: 'whatsapp',
          source: productRoot ? 'product_page' : 'demo_cta',
          item_id: productRoot ? productRoot.dataset.itemId : undefined,
          item_name: productRoot ? productRoot.dataset.itemName : undefined,
        });
      }

      var whatsapp = event.target.closest('a[href*="wa.me"]');
      if (whatsapp) {
        trackEvent('contact', {
          method: 'whatsapp',
          source: whatsapp.dataset.contactSource || 'link',
        });
      }

      var checkout = event.target.closest('a[href*="/checkout"]');
      if (checkout && Vesper.cart && Vesper.cart.state) {
        trackCartEvent('begin_checkout', Vesper.cart.state);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTracking);
  } else {
    initTracking();
  }
})();
