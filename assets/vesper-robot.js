(function () {
  'use strict';

  // FAQ accordion, single-open, matching the behaviour of the original build:
  // opening a row closes any other, and the "+" rotates 45 degrees when open.
  function initAccordion(root) {
    var items = Array.prototype.slice.call(root.querySelectorAll('[data-accordion-item]'));

    function setState(item, isOpen) {
      var panel = item.querySelector('[data-accordion-panel]');
      var icon = item.querySelector('[data-accordion-icon]');
      var trigger = item.querySelector('[data-accordion-trigger]');

      item.setAttribute('data-open', isOpen ? 'true' : 'false');
      if (panel) panel.hidden = !isOpen;
      if (icon) icon.style.transform = isOpen ? 'rotate(45deg)' : 'none';
      if (trigger) trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }

    root.querySelectorAll('[data-accordion-trigger]').forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        var item = trigger.closest('[data-accordion-item]');
        var willOpen = item.getAttribute('data-open') !== 'true';

        items.forEach(function (other) {
          setState(other, false);
        });

        if (willOpen) setState(item, true);
      });
    });
  }

  function initMobileMenu() {
    var toggle = document.querySelector('[data-menu-toggle]');
    var panel = document.querySelector('[data-menu-panel]');
    if (!toggle || !panel) return;

    function setOpen(isOpen) {
      panel.hidden = !isOpen;
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }

    toggle.addEventListener('click', function () {
      setOpen(panel.hidden);
    });

    panel.addEventListener('click', function (event) {
      if (event.target.closest('a')) setOpen(false);
    });
  }

  // On phones the booking form is moved directly below the hero via CSS, so the
  // hero CTA should scroll to it instead of leaving the page. Desktop keeps the
  // original link untouched.
  function initMobileHeroCta() {
    var cta = document.querySelector('[data-hero-cta]');
    if (!cta) return;

    var query = window.matchMedia('(max-width: 767px)');
    var originalHref = cta.getAttribute('href');

    function apply() {
      cta.setAttribute('href', query.matches ? '#demo' : originalHref);
    }

    apply();
    if (query.addEventListener) query.addEventListener('change', apply);
    else query.addListener(apply);
  }

  // Shopify Forms renders its fields inside an open shadow root, so the theme
  // stylesheet cannot reach them. On phones we inject a tiny stylesheet into
  // that root so every field is full width and every tap target is finger sized.
  function initMobileFormStyles() {
    var query = window.matchMedia('(max-width: 767px)');
    var rules = [
      'input:not([type="radio"]):not([type="checkbox"]):not([type="hidden"]),select,textarea{width:100%!important;min-width:0!important;box-sizing:border-box!important;font-size:16px!important}',
      'input:not([type="radio"]):not([type="checkbox"]),select{min-height:44px!important}',
      'textarea{min-height:96px!important}',
      // Only the submit button is stretched. The country picker next to the phone
      // field is also a <button>, and full width would break that row.
      'button:not([type="button"]):not([aria-haspopup]),[type="submit"]{width:100%!important;min-height:52px!important;font-size:16px!important}',
      'button[type="button"],button[aria-haspopup]{width:auto!important;min-height:44px!important}',
      'fieldset{border:0!important;margin:0 0 14px!important;padding:0!important}',
      'label:has(input[type="radio"]),label:has(input[type="checkbox"]){display:flex!important;align-items:center!important;gap:10px!important;min-height:44px!important;padding:6px 4px!important;box-sizing:border-box!important}',
      'input[type="radio"],input[type="checkbox"]{width:20px!important;height:20px!important;flex:none!important;margin:0!important}'
    ].join('');

    var styleEl = null;

    function findRoot() {
      var host = document.querySelector('#demo shopify-forms-embed') || document.querySelector('shopify-forms-embed');
      return host && host.shadowRoot ? host.shadowRoot : null;
    }

    function apply() {
      if (!query.matches) {
        if (styleEl && styleEl.parentNode) styleEl.parentNode.removeChild(styleEl);
        styleEl = null;
        return;
      }
      var root = findRoot();
      if (!root) return;
      if (styleEl && styleEl.parentNode === root) return;

      if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.setAttribute('data-vesper-mobile-form', '');
      }
      styleEl.textContent = rules;
      root.appendChild(styleEl);
    }

    var ticks = 0;
    var timer = setInterval(function () {
      apply();
      if (++ticks > 40) clearInterval(timer);
    }, 250);

    apply();
    if (query.addEventListener) query.addEventListener('change', apply);
    else query.addListener(apply);
  }

  function init() {
    document.querySelectorAll('[data-accordion]').forEach(initAccordion);
    initMobileMenu();
    initMobileHeroCta();
    initMobileFormStyles();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
