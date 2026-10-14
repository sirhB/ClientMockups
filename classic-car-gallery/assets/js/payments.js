/*!
 * Payments hook: STRIPE PLACEHOLDER
 * Public API (used by forms.js and pay.js):
 *   CCGPayments.isEnabled()                       -> boolean
 *   CCGPayments.depositFor(serviceName)           -> cents | null
 *   CCGPayments.start({ kind, reference, amount, description, email }) -> Promise
 *        kind: "invoice" | "deposit"; amount in cents
 * Nothing here talks to Stripe until CCG_CONFIG.payments.enabled === true.
 */
(function () {
  var cfg = (window.CCG_CONFIG && window.CCG_CONFIG.payments) || { enabled: false };
  var base = document.documentElement.dataset.base || "";

  function isEnabled() { return !!cfg.enabled; }
  function depositFor(service) {
    var v = cfg.serviceDeposits && cfg.serviceDeposits[service];
    return typeof v === "number" && v > 0 ? v : null;
  }

  function start(req) {
    if (!isEnabled()) {
      return Promise.reject(new Error("Online payments are not enabled yet. Please call " +
        ((window.CCG_CONFIG && CCG_CONFIG.business.phone) || "us") + " to pay."));
    }
    // --- STRIPE: Payment Link mode -----------------------------------------
    if (cfg.mode === "paymentLink") {
      var link = cfg.paymentLinks[req.reference] || cfg.paymentLinks[req.description];
      if (!link) return Promise.reject(new Error("No payment link configured for " + req.reference));
      var u = new URL(link);
      if (req.email) u.searchParams.set("prefilled_email", req.email);
      u.searchParams.set("client_reference_id", req.reference);
      location.href = u.toString();
      return Promise.resolve();
    }
    // --- STRIPE: Checkout Session mode (server creates the session) --------
    return fetch(cfg.checkoutSessionEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kind: req.kind, reference: req.reference, amount: req.amount,
        currency: cfg.currency, description: req.description, email: req.email,
        successUrl: new URL(base + cfg.successUrl, location.href).toString(),
        cancelUrl: new URL(base + cfg.cancelUrl, location.href).toString()
      })
    }).then(function (r) {
      if (!r.ok) throw new Error("Payment service unavailable (" + r.status + ")");
      return r.json();
    }).then(function (data) {
      if (!data.url) throw new Error("Checkout session did not return a URL");
      location.href = data.url; // redirect to Stripe-hosted Checkout
    });
  }

  window.CCGPayments = { isEnabled: isEnabled, depositFor: depositFor, start: start };
})();
