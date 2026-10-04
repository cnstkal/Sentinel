/* ===== ORIGINAL SCRIPT BLOCK 4 ===== */

(function(){
 const rows=[...document.querySelectorAll('#notice tbody tr[data-notice-row]')];
 const nav=document.getElementById('noticePagination');
 const count=document.querySelector('#notice .board-tools .count');
 const totalPages=Math.ceil(rows.length/10);
 function page(p){
   p=Math.max(1,Math.min(totalPages,p));
   rows.forEach((r,i)=>r.style.display=(i>=(p-1)*10&&i<p*10)?'':'none');
   if(count)count.textContent='전체 36건 · '+p+' / '+totalPages+' 페이지';
   if(nav)nav.innerHTML='<button type="button" data-p="1">«</button><button type="button" data-p="'+Math.max(1,p-1)+'">‹</button>'+Array.from({length:totalPages},(_,i)=>'<button type="button" class="'+(i+1===p?'active':'')+'" data-p="'+(i+1)+'">'+(i+1)+'</button>').join('')+'<button type="button" data-p="'+Math.min(totalPages,p+1)+'">›</button><button type="button" data-p="'+totalPages+'">»</button>';
 }
 nav?.addEventListener('click',e=>{const b=e.target.closest('button[data-p]');if(b)page(+b.dataset.p)});
 page(1);
})();
