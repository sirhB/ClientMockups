/*!
 * Shearwater Organic Coffee Roasters — site config
 * STRIPE: no live keys in this repo.
 * To enable payments: set payments.enabled=true, fill publishableKey (pk_test_),
 * and either paymentLinks or a server checkoutSessionEndpoint. Never put sk_ keys here.
 */
window.SW_CONFIG = {
  business: {
    name: "Shearwater Organic Coffee Roasters",
    phone: "203-880-9565",
    address: "100 Corporate Drive, Unit B106, Trumbull, CT 06611"
  },
  forms: { enquiryEndpoint: null },
  payments: {
    enabled: false,
    provider: "stripe",
    mode: "checkout",
    publishableKey: "pk_test_REPLACE_ME",
    currency: "usd",
    checkoutSessionEndpoint: "/api/stripe/create-checkout-session",
    successUrl: "pay/index.html?status=success",
    cancelUrl: "pay/index.html?status=cancelled",
    productPrices: {},
    paymentLinks: {}
  },
  products: { source: "data/products.json" }
};
