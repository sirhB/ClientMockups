(function(){
var C=window.SW_CONFIG&&window.SW_CONFIG.payments;
if(!C)return;
document.querySelectorAll('[data-buy]').forEach(function(btn){
  btn.addEventListener('click',function(e){
    if(!C.enabled){e.preventDefault();alert('Payments are not connected yet. This demo is Stripe-ready — set payments.enabled in assets/js/config.js when keys are available.');return;}
    var id=btn.getAttribute('data-buy');
    if(C.mode==='paymentLink'&&C.paymentLinks[id]){location.href=C.paymentLinks[id];return;}
    alert('Stripe Checkout endpoint is configured but this static demo cannot call it without a server.');
  });
});
})();
