// @ts-nocheck
function initSite(){
const ac=new AbortController();const cleanup=[];

const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
// nav
const burger=$('.burger'),menu=$('.menu');
if(burger){burger.addEventListener('click',()=>{const o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o)});
$$('.menu a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');burger.setAttribute('aria-expanded',false)}));}
// reveal + skills
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.2});
$$('.rv,.skill').forEach(el=>io.observe(el));
// skill expand
$$('.skill .more').forEach(b=>b.addEventListener('click',()=>{const s=b.closest('.skill');const o=s.classList.toggle('open');b.setAttribute('aria-expanded',o);b.textContent=o?'Hide details':'What is behind this'}));
// active nav link
const secs=$$('main section[id]');
if(secs.length){const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){$$('.menu a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id))}}),{rootMargin:'-45% 0px -50% 0px'});secs.forEach(s=>so.observe(s));}
// image viewer (native dialog: focus trap, Escape, backdrop)
const modal=document.createElement('dialog');modal.className='viewer';modal.setAttribute('aria-label','Image viewer');
modal.innerHTML='<div class="box"><button class="x" type="button" aria-label="Close viewer">×</button><div class="view"><img alt=""></div><span class="cap"></span></div>';
document.body.appendChild(modal);
const mimg=$('img',modal),mcap=$('.cap',modal);let last=null;
function openM(src,alt,cap,from){last=from||document.activeElement;mimg.src=src;mimg.alt=alt;mcap.textContent=(cap||'')+' · click the image to zoom';modal.classList.remove('zoom');hidePv();if(!modal.open)modal.showModal();$('.x',modal).focus()}
function closeM(){modal.close()}
modal.addEventListener('close',()=>{modal.classList.remove('zoom');if(last&&document.contains(last))last.focus()});
$('.x',modal).addEventListener('click',closeM);
modal.addEventListener('click',e=>{if(e.target===modal||e.target.classList.contains('box'))closeM()});
mimg.addEventListener('click',()=>modal.classList.toggle('zoom'));
$$('[data-full]').forEach(b=>b.addEventListener('click',()=>openM(b.dataset.full,b.dataset.alt||'',b.dataset.cap||'',b)));
// cert hover preview (mouse only)
const pv=document.createElement('div');pv.className='pv';pv.innerHTML='<img alt=""><small></small>';document.body.appendChild(pv);
let ht=null,cur=null;
function hidePv(){pv.classList.remove('show');cur=null}
function showPv(card){clearTimeout(ht);cur=card;const t=$('[data-full]',card);$('img',pv).src=t.dataset.thumb||t.dataset.full;$('img',pv).alt='Preview of '+(t.dataset.alt||'');$('small',pv).textContent='Click to open the full certificate';
 const r=card.getBoundingClientRect(),w=Math.min(460,innerWidth*.9);pv.style.width=w+'px';pv.classList.add('show');
 const h=pv.offsetHeight;let left=Math.min(Math.max(10,r.left+r.width/2-w/2),innerWidth-w-10);
 let top=r.top-h-8;if(top<10)top=Math.min(r.bottom+8,innerHeight-h-10);pv.style.left=left+'px';pv.style.top=Math.max(10,top)+'px'}
{
 $$('.cc').forEach(c=>{c.addEventListener('pointerenter',e=>{if(e.pointerType!=='mouse')return;clearTimeout(ht);ht=setTimeout(()=>showPv(c),120)});c.addEventListener('pointerleave',e=>{if(e.pointerType!=='mouse')return;clearTimeout(ht);ht=setTimeout(hidePv,220)});
  c.addEventListener('focusin',()=>showPv(c));c.addEventListener('focusout',()=>{ht=setTimeout(hidePv,150)})});
 pv.addEventListener('pointerenter',()=>clearTimeout(ht));pv.addEventListener('pointerleave',()=>{ht=setTimeout(hidePv,220)});
 pv.addEventListener('click',()=>{if(cur){const t=$('[data-full]',cur);openM(t.dataset.full,t.dataset.alt||'',t.dataset.cap||'',t)}});
 pv.style.cursor='zoom-in';
 addEventListener('scroll',hidePv,{passive:true});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')hidePv()});
}

return ()=>{try{modal.remove();pv.remove();io.disconnect()}catch(e){}};
}

initSite();
