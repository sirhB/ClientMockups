(function(){
var THEMES=[["01-noir-cinema", "Noir Cinema"], ["02-pit-lane", "Pit Lane"], ["03-white-cube", "White Cube"], ["04-still-frame", "Still Frame"], ["05-the-catalogue", "The Catalogue"]],KEY='ccg-theme',page=document.documentElement.dataset.page,BASE=document.documentElement.dataset.base||'';
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
 var MAP={'inventory':'inventory.html','recently sold':'inventory.html','services':'contact.html','about':'contact.html','contact':'contact.html','pay invoice':'pay/index.html'};
 document.querySelectorAll('.nv span, .nv b.lg').forEach(function(el){var t=el.textContent.trim().toLowerCase();var href=el.classList.contains('lg')?BASE+'index.html':(MAP[t]?BASE+MAP[t]:(el.classList.contains('cta')?'tel:2032569800':null));if(href){el.style.cursor='pointer';el.setAttribute('role','link');el.tabIndex=0;el.addEventListener('click',function(){location.href=href})}});
 document.querySelectorAll('.T [style*="inv/disp"]').forEach(function(el){if(page==='detail')return;el.style.cursor='pointer';el.addEventListener('click',function(){location.href=BASE+'detail.html'})});
}
var w=document.createElement('div');w.className='ts';
w.innerHTML='<div class="pn" role="menu">'+THEMES.map(function(t){return '<button data-id="'+t[0]+'">'+t[1]+'</button>'}).join('')+'</div><button class="tg" aria-haspopup="true"></button>';
document.body.appendChild(w);
w.querySelector('.tg').addEventListener('click',function(){w.classList.toggle('open')});
w.querySelectorAll('.pn button').forEach(function(b){b.addEventListener('click',function(){apply(b.dataset.id);w.classList.remove('open')})});
wire();apply(cur());
})();