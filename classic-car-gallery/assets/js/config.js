/*!
 * Site configuration: The Classic Car Gallery
 * ------------------------------------------------------------------
 * STRIPE INTEGRATION PLACEHOLDER: NO LIVE KEYS IN THIS REPO.
 *
 * To enable payments later:
 *  1. Set payments.enabled = true.
 *  2. Choose a mode:
 *     - "paymentLink": put Stripe Payment Link URLs in paymentLinks
 *       (no server needed; good for fixed deposits).
 *     - "checkout": deploy a small server endpoint that creates a
 *       Stripe Checkout Session using your SECRET key (server-side only)
 *       and returns { url }. Point checkoutSessionEndpoint at it.
 *  3. publishableKey is only needed if you later use Stripe.js / Elements.
 *     Use a pk_test_ key while testing. NEVER put a secret (sk_) key here.
 */
window.CCG_CONFIG = {
  business: { name: "The Classic Car Gallery", phone: "203-256-9800" },

  forms: {
    // TODO: set to a form backend (e.g. Formspree, Netlify Forms, or your own API).
    // While null, enquiries are validated and shown as a demo confirmation only.
    enquiryEndpoint: null
  },

  payments: {
    enabled: false,                 // <-- STRIPE: flip to true when configured
    provider: "stripe",
    mode: "checkout",               // "checkout" | "paymentLink"
    publishableKey: "pk_test_REPLACE_ME",
    currency: "usd",
    checkoutSessionEndpoint: "/api/stripe/create-checkout-session", // <-- STRIPE: your server endpoint
    successUrl: "pay/index.html?status=success",
    cancelUrl:  "pay/index.html?status=cancelled",

    // Optional deposits per service (amounts in cents). Leave empty until the client confirms pricing.
    // Example: { "Secure Auto-Storage": 0 }
    serviceDeposits: {},

    // Payment Link mode: map invoice id or service name -> https://buy.stripe.com/... URL
    paymentLinks: {}
  },

  invoices: { source: "data/invoices.json" } // DEMO stub; replace with a real API lookup
};
