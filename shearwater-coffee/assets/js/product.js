(function(){
var id=new URLSearchParams(location.search).get('id')||'sumatra-takengon';
function apply(d){
  var p=d.products.find(function(x){return x.id===id})||d.products.find(function(x){return x.featured})||d.products[0];
  document.title=p.name+' · Shearwater Organic Coffee Roasters';
  document.querySelectorAll('[data-bind]').forEach(function(el){
    var k=el.getAttribute('data-bind');
    if(k==='name')el.textContent=p.name;
    if(k==='origin')el.textContent=p.origin;
    if(k==='taste')el.textContent=p.taste;
    if(k==='price')el.textContent='$'+p.price.toFixed(2);
    if(k==='img'){el.src='assets/img/labels/'+p.img;el.alt=p.name;}
  });
  document.querySelectorAll('[data-buy]').forEach(function(b){if(!/^sub-/.test(b.getAttribute('data-buy')))b.setAttribute('data-buy',p.id)});
  document.querySelectorAll('[data-notes]').forEach(function(n){
    n.innerHTML=p.notes?Object.keys(p.notes).map(function(k){return '<div><small>'+k+'</small>'+p.notes[k]+'</div>'}).join(''):'<div><small>Origin notes</small>[To be supplied by the roaster]</div>';
  });
}
if(window.SW_PRODUCTS)apply(window.SW_PRODUCTS);
})();
