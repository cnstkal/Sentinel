/* ===== APOSTLE PHOTO LIGHTBOX FINAL ===== */
(function(){
 function zoom(src,alt){
  if(!src)return;
  var old=document.querySelector('.apostle-photo-lightbox');
  if(old)old.remove();
  var o=document.createElement('div');
  o.className='apostle-photo-lightbox';
  o.innerHTML='<img alt="">';
  var im=o.querySelector('img'); im.src=src; im.alt=alt||'괴수 사진 확대';
  function close(){o.remove();document.removeEventListener('keydown',esc)}
  function esc(e){if(e.key==='Escape')close()}
  o.addEventListener('click',close);
  im.addEventListener('click',function(e){e.stopPropagation()});
  document.addEventListener('keydown',esc);
  document.body.appendChild(o);
 }
 document.addEventListener('click',function(e){
  var im=e.target.closest('.apostle-photo img,.sentinel-detail-photo img');
  if(!im)return;
  if(e.target.closest('.official-photo-actions'))return;
  e.preventDefault();
  e.stopImmediatePropagation();
  zoom(im.currentSrc||im.src,im.alt);
 },true);
})();
