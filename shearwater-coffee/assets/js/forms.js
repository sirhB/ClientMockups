(function(){
document.querySelectorAll('form[data-demo]').forEach(function(f){
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var ep=window.SW_CONFIG&&window.SW_CONFIG.forms&&window.SW_CONFIG.forms.enquiryEndpoint;
    if(ep){f.submit();return;}
    var n=f.querySelector('[name=name],[name=business]');
    alert('Thanks'+(n&&n.value?', '+n.value:'')+'. This is a demo confirmation — wire forms.enquiryEndpoint in config.js to collect real enquiries.');
    f.reset();
  });
});
})();
