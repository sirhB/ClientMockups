/*! Invoice payment page: loads demo invoice from data/invoices.json, Pay button -> CCGPayments (Stripe hook) */
(function () {
  var cfg = window.CCG_CONFIG, base = document.documentElement.dataset.base || "";
  var params = new URLSearchParams(location.search);
  var money = function (c) { return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(c / 100); };
  // Fallback copy so the demo also works when opened from file:// (fetch blocked)
  var FALLBACK = null;

  function roots() { return document.querySelectorAll(".T [data-invoice-root]"); }
  function each(fn) { roots().forEach(fn); }

  function load() {
    return fetch(base + cfg.invoices.source).then(function (r) { if (!r.ok) throw 0; return r.json(); })
      .catch(function () { return FALLBACK || { invoices: {} }; });
  }

  function render(inv) {
    var total = inv.lines.reduce(function (s, l) { return s + l.amount; }, 0);
    each(function (root) {
      root.querySelector("[data-invoice-err]").hidden = true;
      var v = root.querySelector("[data-invoice-view]"); v.hidden = false;
      var set = function (k, t) { var el = v.querySelector('[data-f="' + k + '"]'); if (el) el.textContent = t; };
      set("id", inv.id); set("customer", inv.customer); set("issued", inv.issued); set("due", inv.due);
      set("vehicle", inv.vehicle); set("status", inv.status); set("total", money(total));
      v.querySelector('[data-f="lines"]').innerHTML = inv.lines.map(function (l) {
        return "<tr><td>" + l.description + "</td><td>" + l.service + "</td><td>" + money(l.amount) + "</td></tr>";
      }).join("");
      var btn = v.querySelector("[data-pay-invoice]"), msg = v.querySelector("[data-pay-msg]");
      var paid = /paid/i.test(inv.status);
      btn.disabled = paid; btn.textContent = paid ? "Paid — thank you" : "Pay " + money(total);
      btn.onclick = function () {
        msg.textContent = "Redirecting to secure checkout…";
        // ===== STRIPE HOOK =====================================================
        // CCGPayments.start() uses Stripe Checkout (server session) or a Stripe
        // Payment Link depending on CCG_CONFIG.payments.mode. Disabled by default.
        CCGPayments.start({ kind: "invoice", reference: inv.id, amount: total, description: "Invoice " + inv.id })
          .catch(function (e) { msg.textContent = e.message; });
        // =======================================================================
      };
      var f = root.querySelector("[data-invoice-find] input"); if (f) f.value = inv.id;
    });
  }
  function err(t) { each(function (root) { root.querySelector("[data-invoice-view]").hidden = true; var e = root.querySelector("[data-invoice-err]"); e.hidden = false; e.textContent = t; }); }

  function lookup(id) {
    load().then(function (db) {
      var inv = db.invoices[(id || "").trim().toUpperCase()];
      if (inv) render(inv); else err("We couldn’t find invoice “" + id + "”. Please check the number or call " + cfg.business.phone + ".");
    });
  }
  document.querySelectorAll("[data-invoice-find]").forEach(function (f) {
    f.addEventListener("submit", function (e) { e.preventDefault(); var id = f.invoice.value; history.replaceState(null, "", "?invoice=" + encodeURIComponent(id)); lookup(id); });
  });
  var st = params.get("status");
  if (st) each(function (root) { var e = root.querySelector("[data-invoice-err]"); e.hidden = false; e.textContent = st === "success" ? "Payment received — thank you." : "Payment cancelled. You have not been charged."; });
  if (params.get("invoice")) lookup(params.get("invoice"));
})();
