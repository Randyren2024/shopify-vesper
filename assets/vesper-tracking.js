/* ==========================================================================
   Vesper tracking bridge
   Mirrors the Nuxt storefront's GA4 event contract through GTM dataLayer.
   Consent and tag routing remain controlled by the connected GTM container.

   Lead events (`generate_lead`) follow the Nuxt contract in
   web/app/composables/useTrack.ts:
     - home_demo      -> { form: 'home_demo' }                     (no product)
     - contact_page   -> { form: 'contact_page', product: <value|null> }
     - product_quote  -> { form: 'product_quote', product: <code> }
   The native Shopify contact form reloads the page on submit, so the event is
   reported from the reloaded success page, not from the submit callback. A
   one-shot sessionStorage marker keeps that to exactly one event per
   submission instead of one per page view of the success markup.
   ========================================================================== */
(function () {
  'use strict';

  var Vesper = (window.Vesper = window.Vesper || {});
  var LEAD_PENDING_KEY = 'vesper:lead:pending';
  var LEAD_PENDING_TTL = 15 * 60 * 1000;

  var leadStore = (function () {
    try {
      var store = window.sessionStorage;
      store.setItem(LEAD_PENDING_KEY + ':probe', '1');
      store.removeItem(LEAD_PENDING_KEY + ':probe');
      return store;
    } catch (error) {
      return null;
    }
  })();

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

  /* ---------------------------------------------------------------- leads */

  function rememberPendingLead(scope) {
    if (!leadStore) return;
    try {
      leadStore.setItem(LEAD_PENDING_KEY, JSON.stringify({
        form: scope.getAttribute('data-lead-form') || '',
        ts: Date.now(),
      }));
    } catch (error) {
      // Storage unavailable: fall back to reporting from the success markup.
    }
  }

  function takePendingLead() {
    if (!leadStore) return null;
    try {
      var raw = leadStore.getItem(LEAD_PENDING_KEY);
      if (!raw) return null;
      leadStore.removeItem(LEAD_PENDING_KEY);
      var pending = JSON.parse(raw);
      if (!pending || !pending.form) return null;
      if (Date.now() - Number(pending.ts || 0) > LEAD_PENDING_TTL) return null;
      return pending;
    } catch (error) {
      return null;
    }
  }

  function leadParams(node) {
    var params = { form: node.getAttribute('data-lead-form') };
    var product = node.getAttribute('data-lead-product');
    // Nuxt omits `product` for forms without product context (home_demo) and
    // sends null for an empty selection (contact_page), so mirror both cases.
    if (product !== null) params.product = product || null;
    return params;
  }

  function reportPendingLeads() {
    var successes = Array.prototype.slice.call(
      document.querySelectorAll('[data-lead-success]')
    );
    if (!successes.length) return;

    var pending = takePendingLead();
    // Without a submission marker the markup was re-rendered (refresh, back
    // navigation) and the lead has already been counted: skip it.
    if (!pending && leadStore) return;

    successes.forEach(function (node) {
      var form = node.getAttribute('data-lead-form');
      if (!form) return;
      if (pending && form !== pending.form) return;
      trackEvent('generate_lead', leadParams(node));
    });
  }

  /* --------------------------------------------------------------- startup */

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

    reportPendingLeads();

    document.addEventListener('submit', function (event) {
      var form = event.target;
      if (!form || !form.closest) return;
      var scope = form.closest('[data-lead-form]');
      if (scope) rememberPendingLead(scope);
    }, true);

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