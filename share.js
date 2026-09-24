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
