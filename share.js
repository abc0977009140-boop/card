(function(){
  var url = location.href.split('#')[0];
  var t = document.getElementById('toast');
  var line = document.getElementById('line');
  var copy = document.getElementById('copy');
  if (line) line.href = 'https://social-plugins.line.me/lineit/share?url=' + encodeURIComponent(url);
  function done(){ if(!t) return; t.classList.add('on'); setTimeout(function(){ t.classList.remove('on'); }, 1600); }
  function fallback(){
    var i = document.createElement('input');
    i.value = url; i.style.position = 'fixed'; i.style.opacity = '0';
    document.body.appendChild(i); i.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(i); done();
  }
  if (copy) copy.addEventListener('click', function(){
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(done, fallback);
    } else { fallback(); }
  });
})();

/* ---- carousel ---- */
(function(){
  var track=document.getElementById('track'); if(!track) return;
  var imgs=track.querySelectorAll('img'), n=imgs.length;
  var dots=document.getElementById('dots'), count=document.getElementById('count');
  var prev=document.getElementById('prev'), next=document.getElementById('next');
  var cur=0, btns=[];
  for(var i=0;i<n;i++){(function(k){
    var b=document.createElement('button');
    b.className='dt'+(k===0?' on':''); b.type='button';
    b.setAttribute('aria-label','第 '+(k+1)+' 張');
    b.addEventListener('click',function(){go(k);});
    if(dots) dots.appendChild(b); btns.push(b);
  })(i);}
  function paint(){
    for(var i=0;i<btns.length;i++) btns[i].className='dt'+(i===cur?' on':'');
    if(count) count.textContent=(cur+1)+' / '+n;
    if(prev) prev.disabled=(cur===0);
    if(next) next.disabled=(cur===n-1);
  }
  function go(k){
    cur=Math.max(0,Math.min(n-1,k));
    track.scrollTo({left:cur*track.clientWidth,behavior:'smooth'});
    paint();
  }
  var t=null;
  track.addEventListener('scroll',function(){
    if(t) clearTimeout(t);
    t=setTimeout(function(){
      var k=Math.round(track.scrollLeft/track.clientWidth);
      if(k!==cur){cur=k;paint();}
    },90);
  });
  if(prev) prev.addEventListener('click',function(){go(cur-1);});
  if(next) next.addEventListener('click',function(){go(cur+1);});
  document.addEventListener('keydown',function(e){
    if(e.key==='ArrowLeft') go(cur-1);
    if(e.key==='ArrowRight') go(cur+1);
  });
  window.addEventListener('resize',function(){track.scrollLeft=cur*track.clientWidth;});
  paint();
})();

/* ---- category filter ---- */
(function(){
  var chips=document.querySelectorAll('.chip'); if(!chips.length) return;
  var cards=document.querySelectorAll('.card');
  for(var i=0;i<chips.length;i++){(function(c){
    c.addEventListener('click',function(){
      for(var j=0;j<chips.length;j++) chips[j].classList.remove('on');
      c.classList.add('on');
      var k=c.getAttribute('data-cat');
      for(var j=0;j<cards.length;j++){
        var m=(k==='all'||cards[j].getAttribute('data-cat')===k);
        cards[j].classList.toggle('hide',!m);
      }
    });
  })(chips[i]);}
})();
