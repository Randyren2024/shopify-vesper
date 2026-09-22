/* ==========================================================================
   Vesper AgriTech — theme runtime
   Replaces the Vue/Ant Design interactions with vanilla JS + the Shopify
   Ajax Cart API (https://shopify.dev/docs/api/ajax/reference/cart).
   ========================================================================== */
(function () {
  'use strict';

  var Vesper = (window.Vesper = window.Vesper || {});

  /* ---------------------------------------------------------------- utils */

  function money(cents) {
    var format = document.documentElement.dataset.moneyFormat || '${{amount}}';
    var value = (cents / 100).toFixed(2);
    var parts = value.split('.');
    var whole = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    var decimal = parts[1];

    return format
      .replace(/\{\{\s*amount\s*\}\}/, whole + '.' + decimal)
      .replace(/\{\{\s*amount_no_decimals\s*\}\}/, whole)
      .replace(/\{\{\s*amount_with_comma_separator\s*\}\}/, whole.replace(/,/g, '.') + ',' + decimal)
      .replace(/\{\{\s*amount_no_decimals_with_comma_separator\s*\}\}/, whole.replace(/,/g, '.'));
  }

  Vesper.money = money;

  function on(root, event, selector, handler) {
    (root || document).addEventListener(event, function (e) {
      var target = e.target.closest(selector);
      if (target && (root || document).contains(target)) handler(e, target);
    });
  }

  function escapeHtml(str) {
    return String(str == null ? '' : str).replace(/[&<>"']/g, function (char) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char];
    });
  }

  function icon(name, extraClass) {
    var path =
      {
        close: 'M6 6l12 12M18 6L6 18',
        check: 'M5 13l4 4L19 7',
        minus: 'M5 12h14',
        plus: 'M12 5v14M5 12h14',
      }[name] || '';

    return (
      '<svg class="v-icon ' +
      (extraClass || '') +
      '" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="' +
      path +
      '" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    );
  }

  /* ---------------------------------------------------------------- toast */

  Vesper.toast = function (message, variant) {
    var stack = document.querySelector('[data-vesper-toasts]');
    if (!stack) {
      stack = document.createElement('div');
      stack.className = 'v-toast-stack';
      stack.setAttribute('data-vesper-toasts', '');
      document.body.appendChild(stack);
    }

    var el = document.createElement('div');
    el.className = 'v-toast' + (variant === 'error' ? ' v-toast--error' : '');
    el.setAttribute('role', 'status');
    el.innerHTML = icon(variant === 'error' ? 'close' : 'check') + '<span>' + escapeHtml(message) + '</span>';
    stack.appendChild(el);

    setTimeout(function () {
      el.style.transition = 'opacity .3s ease';
      el.style.opacity = '0';
      setTimeout(function () {
        el.remove();
      }, 300);
    }, 2600);
  };

  /* ---------------------------------------------------------------- drawer */

  function openDrawer(id) {
    var drawer = document.getElementById(id);
    if (!drawer) return;

    drawer.dataset.open = 'true';
    document.documentElement.style.overflow = 'hidden';

    var focusable = drawer.querySelector('button, a[href], input');
    if (focusable) focusable.focus({ preventScroll: true });
  }

  function closeDrawer(drawer) {
    if (!drawer) return;

    drawer.dataset.open = 'false';
    document.documentElement.style.overflow = '';

    if (drawer.dataset.returnFocus) {
      var trigger = document.querySelector(drawer.dataset.returnFocus);
      if (trigger) trigger.focus({ preventScroll: true });
    }
  }

  Vesper.openDrawer = openDrawer;
  Vesper.closeDrawer = closeDrawer;

  function bindDrawers() {
    document.addEventListener('click', function (e) {
      var opener = e.target.closest('[data-drawer-open]');
      if (opener) {
        e.preventDefault();
        openDrawer(opener.getAttribute('data-drawer-open'));
        return;
      }

      var closer = e.target.closest('[data-drawer-close]');
      if (closer) {
        e.preventDefault();
        closeDrawer(closer.closest('.v-drawer'));
        return;
      }

      if (e.target.classList && e.target.classList.contains('v-drawer__overlay')) {
        closeDrawer(e.target.closest('.v-drawer'));
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      document.querySelectorAll('.v-drawer[data-open="true"]').forEach(function (drawer) {
        closeDrawer(drawer);
      });
    });
  }

  /* ------------------------------------------------------- nav dropdowns */

  function bindNavDropdowns() {
    var dropdowns = document.querySelectorAll('[data-nav-dropdown]');
    if (!dropdowns.length) return;

    function closeAll(except) {
      dropdowns.forEach(function (dd) {
        if (dd === except) return;
        dd.dataset.open = 'false';
        var trigger = dd.querySelector('[aria-expanded]');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      });
    }

    dropdowns.forEach(function (dd) {
      var trigger = dd.querySelector('[aria-expanded]');
      if (!trigger) return;

      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        var next = dd.dataset.open !== 'true';
        closeAll(dd);
        dd.dataset.open = String(next);
        trigger.setAttribute('aria-expanded', String(next));
      });

      dd.addEventListener('mouseenter', function () {
        dd.dataset.open = 'true';
        trigger.setAttribute('aria-expanded', 'true');
      });

      dd.addEventListener('mouseleave', function () {
        dd.dataset.open = 'false';
        trigger.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', function (e) {
      if (!e.target.closest('[data-nav-dropdown]')) closeAll(null);
    });
  }

  /* ----------------------------------------------------------- accordions */

  function bindAccordions() {
    on(document, 'click', '[data-accordion-trigger]', function (e, trigger) {
      e.preventDefault();

      var item = trigger.closest('.v-accordion__item');
      if (!item) return;

      var accordion = item.closest('[data-accordion]');
      var single = accordion && accordion.dataset.accordionSingle === 'true';
      var next = item.dataset.open !== 'true';

      if (single && accordion) {
        accordion.querySelectorAll('.v-accordion__item').forEach(function (other) {
          other.dataset.open = 'false';
          var otherTrigger = other.querySelector('[data-accordion-trigger]');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        });
      }

      item.dataset.open = String(next);
      trigger.setAttribute('aria-expanded', String(next));
    });
  }

  /* ---------------------------------------------------------------- tabs */

  function bindTabs() {
    on(document, 'click', '[data-tab]', function (e, tab) {
      e.preventDefault();

      var group = tab.closest('[data-tabs]');
      if (!group) return;

      var name = tab.getAttribute('data-tab');

      group.querySelectorAll('[data-tab]').forEach(function (other) {
        other.setAttribute('aria-selected', String(other === tab));
      });

      group.querySelectorAll('[data-tab-panel]').forEach(function (panel) {
        panel.hidden = panel.getAttribute('data-tab-panel') !== name;
      });
    });
  }

  /* ------------------------------------------------------------ carousel */

  function bindCarousels() {
    document.querySelectorAll('[data-carousel]').forEach(function (carousel) {
      var track = carousel.querySelector('[data-carousel-track]');
      if (!track) return;

      var slides = track.querySelectorAll('.v-carousel__slide');

      function slideOffset(index) {
        var slide = slides[index];
        if (!slide) return 0;
        return slide.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft;
      }

      function step(direction) {
        var slide = track.querySelector('.v-carousel__slide');
        var amount = slide ? slide.getBoundingClientRect().width + 20 : track.clientWidth * 0.8;
        track.scrollBy({ left: direction * amount, behavior: 'smooth' });
      }

      var prev = carousel.querySelector('[data-carousel-prev]');
      var next = carousel.querySelector('[data-carousel-next]');

      if (prev) prev.addEventListener('click', function () { step(-1); });
      if (next) next.addEventListener('click', function () { step(1); });

      var thumbs = carousel.querySelectorAll('[data-carousel-thumb]');
      if (!thumbs.length) return;

      function setActive(index) {
        thumbs.forEach(function (thumb, i) {
          thumb.classList.toggle('is-active', i === index);
        });
      }

      thumbs.forEach(function (thumb) {
        thumb.addEventListener('click', function () {
          var index = parseInt(thumb.getAttribute('data-carousel-thumb'), 10) || 0;
          track.scrollTo({ left: slideOffset(index), behavior: 'smooth' });
          setActive(index);
        });
      });

      track.addEventListener('scroll', function () {
        var current = 0;
        for (var i = 0; i < slides.length; i++) {
          if (slideOffset(i) <= track.scrollLeft + 8) current = i;
        }
        setActive(current);
      }, { passive: true });
    });
  }

  /* ------------------------------------------------------- fade carousel */

  function bindFadeCarousels() {
    document.querySelectorAll('[data-fade-carousel]').forEach(function (carousel) {
      var panels = carousel.querySelectorAll('[data-fade-panel]');
      var images = carousel.querySelectorAll('[data-fade-image]');
      var dots = carousel.querySelectorAll('[data-carousel-dot]');
      var region = carousel.querySelector('[data-fade-region]');
      var toggle = carousel.querySelector('[data-carousel-toggle]');
      var toggleIcon = carousel.querySelector('[data-carousel-toggle-icon]');
      var count = panels.length;
      if (count < 2) return;

      var index = 0;
      var timer = null;
      var playing = true;
      var touchStartX = null;

      function show(next) {
        index = (next + count) % count;

        panels.forEach(function (panel, i) {
          panel.classList.toggle('is-active', i === index);
        });

        images.forEach(function (image, i) {
          image.classList.toggle('is-active', i === index);
        });

        dots.forEach(function (dot, i) {
          var active = i === index;
          dot.classList.toggle('is-active', active);
          dot.setAttribute('aria-selected', active ? 'true' : 'false');
        });
      }

      function start() {
        stop();
        timer = setInterval(function () {
          show(index + 1);
        }, 5000);
      }

      function stop() {
        if (timer) {
          clearInterval(timer);
          timer = null;
        }
      }

      function setPlaying(next) {
        playing = next;
        if (playing) {
          start();
        } else {
          stop();
        }

        if (toggle) {
          toggle.setAttribute('aria-pressed', playing ? 'true' : 'false');
          toggle.setAttribute('aria-label', playing ? 'Pause slideshow' : 'Play slideshow');
        }
        if (toggleIcon) toggleIcon.textContent = playing ? '\u275A\u275A' : '\u25B6';
      }

      function goTo(next) {
        show(next);
        if (playing) start();
      }

      var prev = carousel.querySelector('[data-carousel-prev]');
      var next = carousel.querySelector('[data-carousel-next]');
      if (prev) prev.addEventListener('click', function () { goTo(index - 1); });
      if (next) next.addEventListener('click', function () { goTo(index + 1); });

      dots.forEach(function (dot) {
        dot.addEventListener('click', function () {
          goTo(parseInt(dot.getAttribute('data-carousel-dot'), 10) || 0);
        });
      });

      if (toggle) {
        toggle.addEventListener('click', function () { setPlaying(!playing); });
      }

      if (region) {
        region.addEventListener('keydown', function (event) {
          if (event.key === 'ArrowLeft') {
            goTo(index - 1);
          } else if (event.key === 'ArrowRight') {
            goTo(index + 1);
          }
        });

        region.addEventListener(
          'touchstart',
          function (event) {
            touchStartX = event.touches[0].clientX;
          },
          { passive: true }
        );

        region.addEventListener('touchend', function (event) {
          if (touchStartX === null) return;
          var diff = touchStartX - event.changedTouches[0].clientX;
          touchStartX = null;
          if (Math.abs(diff) > 50) goTo(index + (diff > 0 ? 1 : -1));
        });
      }

      setPlaying(true);
    });
  }

  /* ------------------------------------------------------------ reveal */

  function bindReveal() {
    var targets = document.querySelectorAll('[data-reveal]');
    if (!targets.length) return;

    if (!('IntersectionObserver' in window)) {
      targets.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -60px 0px', threshold: 0.12 }
    );

    targets.forEach(function (el) { observer.observe(el); });
  }

  /* ------------------------------------------------------ quantity inputs */

  function bindQuantity() {
    on(document, 'click', '[data-qty-step]', function (e, btn) {
      e.preventDefault();

      var wrapper = btn.closest('[data-qty]');
      if (!wrapper) return;

      var input = wrapper.querySelector('input');
      if (!input) return;

      var min = parseInt(input.getAttribute('min') || '0', 10);
      var step = parseInt(btn.getAttribute('data-qty-step'), 10) || 1;
      var value = Math.max(min, (parseInt(input.value, 10) || 0) + step);

      input.value = value;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
  }

  /* ------------------------------------------------------------ cart API */

  var Cart = (Vesper.cart = {
    state: null,

    /* The Ajax Cart API payload has no cart_url / checkout_url, so build them
       from the shop root the layout exposes on <html data-shop-url>. */
    url: function (path) {
      var root = document.documentElement.dataset.shopUrl || '';
      return root + path;
    },

    endpoint: function (action) {
      var url = document.documentElement.dataset.shopUrl || '';
      return url + '/cart' + (action ? '/' + action : '') + '.js';
    },

    request: function (action, body) {
      var options = { headers: { 'Content-Type': 'application/json' } };

      if (body) {
        options.method = 'POST';
        options.body = JSON.stringify(body);
      }

      return fetch(Cart.endpoint(action), options).then(function (response) {
        return response.json().then(function (data) {
          if (!response.ok) throw data;
          return data;
        });
      });
    },

    refresh: function () {
      return Cart.request().then(function (cart) {
        Cart.state = cart;
        Cart.render();
        return cart;
      });
    },

    add: function (variantId, quantity, properties) {
      return Cart.request('add', {
        items: [{ id: Number(variantId), quantity: quantity || 1, properties: properties || undefined }],
      })
        .then(function () {
          return Cart.refresh();
        })
        .then(function (cart) {
          Vesper.toast('Added to cart');
          return cart;
        })
        .catch(function (error) {
          Vesper.toast((error && error.description) || 'Could not add to cart', 'error');
          throw error;
        });
    },

    change: function (variantId, quantity) {
      return Cart.request('change', { id: Number(variantId), quantity: quantity })
        .then(function (cart) {
          Cart.state = cart;
          Cart.render();
          return cart;
        })
        .catch(function (error) {
          Vesper.toast((error && error.description) || 'Could not update cart', 'error');
          throw error;
        });
    },

    render: function () {
      var cart = Cart.state;
      if (!cart) return;

      document.querySelectorAll('[data-cart-count]').forEach(function (el) {
        el.textContent = cart.item_count;
        el.hidden = cart.item_count === 0;
      });

      var body = document.querySelector('[data-cart-drawer-body]');
      if (body) body.innerHTML = Cart.linesHtml(cart);

      var foot = document.querySelector('[data-cart-drawer-foot]');
      if (foot) foot.innerHTML = Cart.footHtml(cart);

      Cart.renderPage();
    },

    /* Re-render the /cart page section through the Section Rendering API. */
    renderPage: function () {
      if (!document.querySelector('[data-cart-page]')) return;

      var url = document.documentElement.dataset.shopUrl || '';
      var mount = document.querySelector('#shopify-section-main');

      fetch(url + '/cart?sections=main')
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (!data || !data.main || !mount) return;

          var holder = document.createElement('div');
          holder.innerHTML = data.main;
          var fresh = holder.firstElementChild;
          if (fresh) mount.innerHTML = fresh.innerHTML;
        })
        .catch(function () {});
    },

    linesHtml: function (cart) {
      if (!cart.items.length) {
        return (
          '<div class="v-cart-empty">' +
          '<svg class="v-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.5a2 2 0 0 0 2-1.55L20.5 8H6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
          '<p>Your cart is empty.</p>' +
          '<a class="v-btn v-btn--primary" href="' + Cart.url('/collections/all') + '">Continue shopping</a>' +
          '</div>'
        );
      }

      return (
        '<ul class="v-cart-lines">' +
        cart.items
          .map(function (item) {
            return (
              '<li class="v-cart-line">' +
              '<img class="v-cart-line__img" src="' + escapeHtml(item.image || '') + '" alt="' + escapeHtml(item.product_title) + '" loading="lazy">' +
              '<div>' +
              '<p class="v-cart-line__title">' + escapeHtml(item.product_title) + '</p>' +
              (item.variant_title && item.variant_title !== 'Default Title'
                ? '<p class="v-cart-line__variant">' + escapeHtml(item.variant_title) + '</p>'
                : '') +
              '<div data-qty>' +
              '<div class="v-qty">' +
              '<button type="button" data-cart-change="' + item.variant_id + '" data-qty-value="' + (item.quantity - 1) + '" aria-label="Decrease quantity">' + icon('minus') + '</button>' +
              '<input type="number" min="0" value="' + item.quantity + '" data-cart-input="' + item.variant_id + '" aria-label="Quantity">' +
              '<button type="button" data-cart-change="' + item.variant_id + '" data-qty-value="' + (item.quantity + 1) + '" aria-label="Increase quantity">' + icon('plus') + '</button>' +
              '</div>' +
              '</div>' +
              '</div>' +
              '<div>' +
              '<div class="v-cart-line__price">' + money(item.final_line_price) + '</div>' +
              '<button type="button" class="v-cart-line__remove" data-cart-change="' + item.variant_id + '" data-qty-value="0" aria-label="Remove item">' + icon('close') + '</button>' +
              '</div>' +
              '</li>'
            );
          })
          .join('') +
        '</ul>'
      );
    },

    footHtml: function (cart) {
      if (!cart.items.length) return '';

      return (
        '<div class="v-cart-summary"><span>Subtotal</span><span>' + money(cart.total_price) + '</span></div>' +
        '<p class="v-cart-note">Taxes and shipping calculated at checkout.</p>' +
        '<a class="v-btn v-btn--primary v-btn--block v-btn--lg" href="' + Cart.url('/checkout') + '">Checkout</a>' +
        '<a class="v-btn v-btn--ghost v-btn--block" style="margin-top:10px" href="' + Cart.url('/cart') + '">View cart</a>'
      );
    },
  });

  function bindCart() {
    on(document, 'submit', '[data-product-form]', function (e, form) {
      e.preventDefault();

      var variantInput = form.querySelector('[name="id"]');
      var quantityInput = form.querySelector('[name="quantity"]');

      if (!variantInput || !variantInput.value) {
        Vesper.toast('Please select a variant', 'error');
        return;
      }

      Cart.add(variantInput.value, quantityInput ? parseInt(quantityInput.value, 10) || 1 : 1).then(function () {
        openDrawer('vesper-cart-drawer');
      });
    });

    on(document, 'click', '[data-cart-change]', function (e, btn) {
      e.preventDefault();
      Cart.change(btn.getAttribute('data-cart-change'), parseInt(btn.getAttribute('data-qty-value'), 10));
    });

    on(document, 'change', '[data-cart-input]', function (e, input) {
      Cart.change(input.getAttribute('data-cart-input'), parseInt(input.value, 10) || 0);
    });

    var cartTrigger = document.querySelector('[data-drawer-open="vesper-cart-drawer"]');
    if (cartTrigger) {
      cartTrigger.addEventListener('click', function () {
        Cart.refresh();
      });
    }
  }

  /* --------------------------------------------------------- variant pick */

  function bindVariantPicker() {
    on(document, 'change', '[data-variant-picker]', function (e, select) {
      var variantId = select.value;
      var form = document.querySelector('[data-product-form]');
      if (!form) return;

      var input = form.querySelector('[name="id"]');
      if (input) input.value = variantId;

      var option = select.options[select.selectedIndex];

      document.querySelectorAll('[data-variant-price]').forEach(function (el) {
        el.textContent = option.getAttribute('data-price') || '';
      });

      document.querySelectorAll('[data-variant-compare]').forEach(function (el) {
        var compare = option.getAttribute('data-compare') || '';
        el.textContent = compare;
        el.hidden = !compare;
      });

      document.querySelectorAll('[data-variant-stock]').forEach(function (el) {
        el.textContent = option.getAttribute('data-stock-label') || '';
      });

      var button = form.querySelector('[data-add-to-cart]');
      if (button) {
        var available = option.getAttribute('data-available') !== 'false';
        button.disabled = !available;
        button.textContent = available ? button.dataset.addLabel || 'Add to cart' : 'Sold out';
      }
    });
  }

  /* --------------------------------------------------------------- demo CTA */

  function bindDemoCta() {
    on(document, 'click', '[data-request-demo]', function (e, el) {
      e.preventDefault();

      var phone = el.getAttribute('data-whatsapp') || document.documentElement.dataset.whatsapp;
      var message = el.getAttribute('data-message') || 'Hello! I would like to request a demo of Vesper AgriTech products.';

      if (!phone) return;
      window.open('https://wa.me/' + phone + '?text=' + encodeURIComponent(message), '_blank', 'noopener');
    });
  }

  /* ------------------------------------------------------------------ init */

  function init() {
    bindDrawers();
    bindNavDropdowns();
    bindAccordions();
    bindTabs();
    bindCarousels();
    bindFadeCarousels();
    bindReveal();
    bindQuantity();
    bindCart();
    bindVariantPicker();
    bindDemoCta();

    if (document.querySelector('[data-cart-count]')) {
      Cart.refresh().catch(function () {});
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
