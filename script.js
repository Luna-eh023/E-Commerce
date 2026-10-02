var data=[
 {a:"💬",t:"Nina Store",d:"Pagi kak untuk Lamborghininya mau warna apa ya kak?",e:["😍","🤗"]},
 {a:"🕒",t:"08:12",d:"Pesanan Rolex anda belum dibayar! Segera Check out sebelum kehabisan.",e:["😠","😭"]},
 {a:"👤",t:"Kang Info Paket",d:"Paket kamu sudah sampai!!!",e:["😍","😋"]},
 {a:"📦",t:"Pria Solo",d:"Baik kak. Pesannya sedang dikemas ya.",e:["❤️","😄"]}
];
var list=document.getElementById('list'),card=document.getElementById('card'),bell=document.getElementById('bell'),badge=document.getElementById('badge');
data.forEach(function(n,i){
  var el=document.createElement('div');el.className='item';el.style.animationDelay=(i*70)+'ms';
  el.innerHTML='<div class="ava">'+n.a+'</div><div class="txt"><div class="t">'+n.t+'</div><div class="d">'+n.d+'</div></div><div class="emo"></div>';
  var box=el.querySelector('.emo');
  n.e.forEach(function(x){
    var b=document.createElement('button');b.textContent=x;
    b.onclick=function(){box.querySelectorAll('button').forEach(function(o){if(o!==b)o.classList.remove('on')});b.classList.remove('on');void b.offsetWidth;b.classList.add('on')};
    box.appendChild(b);
  });
  list.appendChild(el);
});
bell.onclick=function(){
  var hidden=card.classList.toggle('hide');
  bell.classList.remove('ring');void bell.offsetWidth;bell.classList.add('ring');
  badge.style.visibility=hidden?'visible':'hidden';
};
