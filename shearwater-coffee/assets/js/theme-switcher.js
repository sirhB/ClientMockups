(function(){
var THEMES=[["01-tide-chart","Tide Chart"],["02-label-wall","Label Wall"],["03-trade-counter","Trade Counter"],["04-macro","Macro"],["05-color-block","Color Block"]],
KEY='sw-theme',BASE=document.documentElement.dataset.base||'';
function cur(){var q=new URLSearchParams(location.search).get('theme');if(q&&THEMES.some(function(t){return t[0]==q}))return q;try{return localStorage.getItem(KEY)||THEMES[0][0]}catch(e){return THEMES[0][0]}}
function apply(id){
 try{localStorage.setItem(KEY,id)}catch(e){}
 document.querySelectorAll('link[data-theme]').forEach(function(l){l.disabled=l.dataset.theme!==id});
 document.querySelectorAll('.T').forEach(function(s){s.classList.toggle('on',s.dataset.theme===id)});
 document.body.className='th-'+id;
 document.querySelectorAll('.ts .pn button').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.id===id)});
 var lb=document.querySelector('.ts .tg');if(lb)lb.textContent='◐ Theme: '+THEMES.find(function(t){return t[0]==id})[1];
}
function wire(){
 document.querySelectorAll('.nv').forEach(function(n){if(n.querySelector('.nv-tg'))return;var b=document.createElement('button');b.className='nv-tg';b.type='button';b.setAttribute('aria-label','Menu');b.setAttribute('aria-expanded','false');b.innerHTML='&#9776;';b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)});var lg=n.querySelector('.lg');lg?lg.after(b):n.prepend(b)});
 var MAP={shop:'shop.html',coffee:'shop.html',subscribe:'subscriptions.html',subscriptions:'subscriptions.html',wholesale:'wholesale.html','our story':'our-story.html',story:'our-story.html',visit:'visit.html',roastery:'visit.html',contact:'visit.html',home:'index.html'};
 document.querySelectorAll('.nv a[data-nav], .nv [data-nav]').forEach(function(el){
   var k=(el.getAttribute('data-nav')||'').toLowerCase();
   var href=k==='home'?BASE+'index.html':(MAP[k]?BASE+MAP[k]:null);
   if(href){el.style.cursor='pointer';el.addEventListener('click',function(e){e.preventDefault();location.href=href+(location.search||'')})}
 });
 document.querySelectorAll('[data-product]').forEach(function(el){
   el.style.cursor='pointer';
   el.addEventListener('click',function(){location.href=BASE+'product.html?id='+el.dataset.product+(location.search?('&'+location.search.slice(1).replace(/theme=[^&]+&?/,'')):'')});
 });
}
var w=document.createElement('div');w.className='ts';
w.innerHTML='<div class="pn" role="menu">'+THEMES.map(function(t){return '<button type="button" data-id="'+t[0]+'">'+t[1]+'</button>'}).join('')+'</div><button type="button" class="tg" aria-haspopup="true"></button>';
document.body.appendChild(w);
w.querySelector('.tg').addEventListener('click',function(){w.classList.toggle('open')});
w.querySelectorAll('.pn button').forEach(function(b){b.addEventListener('click',function(){apply(b.dataset.id);w.classList.remove('open');var u=new URL(location.href);u.searchParams.set('theme',b.dataset.id);history.replaceState(null,'',u)});});
wire();apply(cur());
})();
