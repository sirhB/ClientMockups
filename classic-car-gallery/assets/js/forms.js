/*! Service enquiry form: validation, submission, optional deposit (Stripe hook) */
(function () {
  var cfg = window.CCG_CONFIG || { forms: {} };
  document.querySelectorAll("[data-enquiry-form]").forEach(function (form) {
    var msg = form.querySelector(".xf-msg");
    var payBtn = form.querySelector("[data-pay-deposit]");
    var sel = form.querySelector("select[name=service]");

    function sync() {
      var dep = window.CCGPayments && CCGPayments.isEnabled() && CCGPayments.depositFor(sel.value);
      if (payBtn) { payBtn.hidden = !dep; if (dep) payBtn.textContent = "Pay deposit · $" + (dep / 100).toFixed(2); }
    }
    sel.addEventListener("change", sync); sync();

    // Pre-select a service from ?service=...
    var q = new URLSearchParams(location.search).get("service");
    if (q) { sel.value = q; sync(); }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); msg.textContent = "Please complete the required fields."; return; }
      var data = Object.fromEntries(new FormData(form).entries());
      var ep = cfg.forms && cfg.forms.enquiryEndpoint;
      if (!ep) { // DEMO mode
        msg.textContent = "Thank you, " + data.name + ". Your " + data.service + " enquiry is ready to send (demo — no form backend configured).";
        form.reset(); sync(); return;
      }
      msg.textContent = "Sending…";
      fetch(ep, { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify(data) })
        .then(function (r) { if (!r.ok) throw 0; msg.textContent = "Thank you — we’ll be in touch shortly."; form.reset(); sync(); })
        .catch(function () { msg.textContent = "Sorry, that didn’t send. Please call " + cfg.business.phone + "."; });
    });

    if (payBtn) payBtn.addEventListener("click", function () {
      var email = form.email.value, dep = CCGPayments.depositFor(sel.value);
      CCGPayments.start({ kind: "deposit", reference: "DEP-" + sel.value, amount: dep, description: sel.value + " deposit", email: email })
        .catch(function (err) { msg.textContent = err.message; });
    });
  });
})();
