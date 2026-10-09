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

  function init() {
    document.querySelectorAll('[data-accordion]').forEach(initAccordion);
    initMobileMenu();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
