/**
 * Vesper core
 * ---------------------------------------------------------------------------
 * Progressive enhancement for the commerce templates. Every one of these
 * behaviours degrades to a plain form submit when JavaScript is unavailable:
 *
 *   - product variant select  -> swaps the pre-rendered price + availability
 *   - product gallery         -> swaps the main image
 *   - cart line quantity      -> keeps the input in sync, then submits the line
 *
 * Prices are never formatted here. Each variant price is rendered by Liquid and
 * simply shown or hidden, so the store's currency format is always respected.
 */
(function () {
  "use strict";

  function on(root, event, selector, handler) {
    root.addEventListener(event, function (e) {
      var el = e.target.closest(selector);
      if (el && root.contains(el)) handler(e, el);
    });
  }

  /* ------------------------------------------------------------------ product */

  function initProduct(scope) {
    var select = scope.querySelector("[data-variant-select]");
    var prices = scope.querySelectorAll("[data-variant-price]");
    var submit = scope.querySelector("[data-add-to-cart]");
    var submitLabel = submit ? submit.textContent : "";

    function sync(selected) {
      var id = selected.value;

      if (prices.length) {
        Array.prototype.forEach.call(prices, function (el) {
          el.hidden = el.getAttribute("data-variant-price") !== id;
        });
      }

      if (submit) {
        var available = selected.getAttribute("data-available") === "true";
        submit.disabled = !available;
        submit.textContent = available ? submitLabel : submit.getAttribute("data-sold-out-label");
      }

      var url = new URL(window.location.href);
      if (select.getAttribute("data-update-url") === "true") {
        url.searchParams.set("variant", selected.value);
        window.history.replaceState({}, "", url.toString());
      }
    }

    if (select) {
      select.addEventListener("change", function () {
        sync(select.options[select.selectedIndex]);
      });
      sync(select.options[select.selectedIndex]);
    }

    /* Gallery */
    var main = scope.querySelector("[data-gallery-main]");
    on(scope, "click", "[data-gallery-thumb]", function (e, thumb) {
      if (!main) return;
      e.preventDefault();
      main.src = thumb.getAttribute("data-gallery-thumb");
      main.removeAttribute("srcset");
      Array.prototype.forEach.call(scope.querySelectorAll("[data-gallery-thumb]"), function (el) {
        el.setAttribute("aria-current", el === thumb ? "true" : "false");
      });
    });
  }

  /* ---------------------------------------------------------------- quantity */

  /**
   * The quantity stepper is shared by the product form and the cart lines. On
   * the product form it only changes the input, so the shopper sets a quantity
   * before adding to cart. A cart line carries `data-cart-line`, which means the
   * line should be saved as soon as the quantity changes.
   */
  on(document, "click", "[data-qty-step]", function (e, btn) {
    e.preventDefault();

    var wrapper = btn.closest(".v-qty");
    var input = wrapper ? wrapper.querySelector("[data-qty-input]") : null;
    if (!input) return;

    var min = parseInt(input.getAttribute("min"), 10) || 0;
    var step = parseInt(btn.getAttribute("data-qty-step"), 10);
    input.value = Math.max(min, (parseInt(input.value, 10) || 0) + step);

    var form = btn.closest("form");
    if (form && form.hasAttribute("data-cart-line")) form.submit();
  });

  /* -------------------------------------------------------------------- entry */

  function init() {
    var product = document.querySelector("[data-product]");
    if (product) initProduct(product);

    /* Everything else is a plain form submit, which doubles as the no-JS path. */
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
