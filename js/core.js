/* ===== ORIGINAL SCRIPT BLOCK 1 ===== */

(function(){
 const navTriggers=[...document.querySelectorAll('.nav-trigger')];
 const mobile=document.getElementById('mobileMenu');
 const all=document.getElementById('allMenu');
 function show(hash){
   let id=(hash||'#home').replace('#','').split('?')[0];
   if(!document.getElementById(id)) id='home';
   document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active',p.id===id));
   document.querySelectorAll('.side-nav a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+id));
   window.scrollTo({top:0,behavior:'smooth'});
 }
 window.addEventListener('hashchange',()=>show(location.hash));
 document.addEventListener('click',e=>{
   const a=e.target.closest('a[href^="#"]'); if(!a) return;
   const h=a.getAttribute('href'); if(h==='#' || h==='#login'||h==='#join'||h==='#english'||h==='#sitemap') return;
   const id=h.replace('#','').split('?')[0];
   if(document.getElementById(id)){e.preventDefault();location.hash=h;show(h)}
 });
 document.getElementById('fontUp')?.addEventListener('click',()=>document.body.classList.add('large'));
 document.getElementById('fontDown')?.addEventListener('click',()=>document.body.classList.remove('large'));
 document.getElementById('contrastBtn')?.addEventListener('click',()=>document.body.classList.toggle('contrast'));
 navTriggers.forEach(btn=>btn.addEventListener('click',()=>{const x=btn.getAttribute('aria-expanded')==='true';navTriggers.forEach(b=>b.setAttribute('aria-expanded','false'));btn.setAttribute('aria-expanded',String(!x))}));
 const panel=document.getElementById('mobilePanel'), closePanel=document.getElementById('closeMobilePanel');
 function togglePanel(open){panel.hidden=!open;document.body.classList.toggle('menu-open',open);all.setAttribute('aria-expanded',String(open));}
 all.addEventListener('click',()=>togglePanel(panel.hidden));
 closePanel.addEventListener('click',()=>togglePanel(false));
 panel.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(a)togglePanel(false)});
 const searchForm=document.getElementById('siteSearch'), input=document.getElementById('searchInput');
 searchForm.addEventListener('submit',e=>{e.preventDefault();const q=input.value.trim();if(!q)return;location.hash='searchPage?query='+encodeURIComponent(q);show('#searchPage');renderSearch(q)});
 function renderSearch(q){
 const root=document.getElementById('searchItems');
 const summary=document.getElementById('searchSummary');
 const query=q.trim().toLowerCase();
 const norm=s=>String(s||'').toLowerCase().replace(/\\s+/g,' ').trim();
 const esc=s=>String(s||'').replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
 const index=[];
 document.querySelectorAll('.page:not(#searchPage)').forEach(page=>{
   const title=page.querySelector('.content-head h1, h1');
   const desc=page.querySelector('.content-head p');
   const text=norm(page.innerText);
   if(title && text) index.push({title:title.textContent.trim(),desc:desc?desc.textContent.trim():'',text,href:'#'+page.id});
 });
 if(typeof NOTICE_DATA!=='undefined') NOTICE_DATA.forEach(x=>index.push({title:x[1],desc:x[5]||x[6]||'',text:norm(x.join(' ')),href:'#notice'}));
 if(typeof PRESS_DATA!=='undefined') PRESS_DATA.forEach(x=>index.push({title:x[1],desc:x[5]||x[4]||'',text:norm(x.join(' ')),href:'#press'}));
 const tokens=query.split(/\\s+/).filter(Boolean);
 const results=index.map(item=>{
   let score=0;
   if(norm(item.title).includes(query)) score+=100;
   if(norm(item.desc).includes(query)) score+=35;
   tokens.forEach(t=>{if(item.text.includes(t)) score+=10});
   return {...item,score};
 }).filter(x=>x.score>0).sort((a,b)=>b.score-a.score);
 summary.textContent='“'+q+'”에 대한 검색 결과 '+results.length+'건입니다.';
 if(!results.length){root.innerHTML='<div class="notice-area">검색어와 일치하는 정보가 없습니다. 다른 검색어로 다시 검색해 주세요.</div>';return}
 const unique=new Set();
 root.innerHTML=results.filter(x=>{const k=x.href+'|'+x.title;if(unique.has(k))return false;unique.add(k);return true}).slice(0,30).map(x=>{
   const desc=x.desc||'센티넬안전관리청 누리집에서 제공하는 관련 정보입니다.';
   return '<article class="search-result-item"><a href="'+x.href+'"><b>'+esc(x.title)+'</b><p>'+esc(desc)+'</p></a></article>';
 }).join('');
}
 const regForm=document.getElementById('registrationSearch');
 regForm?.addEventListener('submit',e=>{e.preventDefault();const q=document.getElementById('regNo').value.trim().toUpperCase();const db={'SN-26018492':['SN-26018492','괴수','3등급','등록','서울특별시','2026.09.29'],'SN-26017421':['SN-26017421','괴수','4등급','관찰','인천광역시','2026.09.30'],'GD-26088317':['GD-26088317','가이드','-','등록','서울특별시','2026.09.28']};const r=db[q], box=document.getElementById('regResult');box.hidden=false;box.innerHTML=r?'<h2>등록정보 확인</h2><dl><dt>등록번호</dt><dd>'+r[0]+'</dd><dt>구분</dt><dd>'+r[1]+'</dd><dt>등급</dt><dd>'+r[2]+'</dd><dt>관리상태</dt><dd>'+r[3]+'</dd><dt>관리지역</dt><dd>'+r[4]+'</dd><dt>최종 갱신</dt><dd>'+r[5]+'</dd></dl>':'<h2>조회 결과가 없습니다.</h2><p>입력하신 등록번호를 확인하시기 바랍니다.</p>'});
 let idx=0,playing=true,timer;const slides=document.getElementById('slides'),count=3;function move(n){if(!slides)return;idx=(idx+n+count)%count;slides.style.transform='translateX(-'+idx*100+'%)'}function restart(){clearInterval(timer);if(playing)timer=setInterval(()=>move(1),5000)}(document.getElementById('prevSlide')||{}).onclick=()=>{move(-1);restart()};(document.getElementById('nextSlide')||{}).onclick=()=>{move(1);restart()};(document.getElementById('playSlide')||{}).onclick=()=>{playing=!playing;document.getElementById('playSlide').textContent=playing?'Ⅱ':'▶';document.getElementById('playSlide').setAttribute('aria-label',playing?'슬라이드 자동재생 일시정지':'슬라이드 자동재생 재생');restart()};restart();
 document.querySelectorAll('.press-tabs').forEach(tabs=>{tabs.querySelectorAll('button[data-tab]').forEach(btn=>btn.addEventListener('click',()=>{tabs.querySelectorAll('button[data-tab]').forEach(b=>b.classList.toggle('active',b===btn));const root=tabs.parentElement;root.querySelectorAll('.press-list').forEach(list=>list.hidden=list.id!==btn.dataset.tab)}))});
 document.querySelectorAll('.rating').forEach(r=>{const bs=[...r.querySelectorAll('button')];bs.forEach((b,i)=>b.addEventListener('click',()=>bs.forEach((x,j)=>x.classList.toggle('on',j<=i))))});
 show(location.hash);
})();



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



/* ===== ORIGINAL SCRIPT BLOCK 5 ===== */

(function(){
 const wrap=document.getElementById('reportFormWrap'), form=document.getElementById('activityReportForm'), result=document.getElementById('reportResult'), title=document.getElementById('reportTypeTitle');
 let selectedType='괴수 활동';
 document.querySelectorAll('[data-report-type]').forEach(btn=>btn.addEventListener('click',()=>{
   selectedType=btn.dataset.reportType; title.textContent=selectedType+' 신고';
   wrap.hidden=false; result.hidden=true; form.hidden=false;
   wrap.scrollIntoView({behavior:'smooth',block:'start'});
 }));
 document.getElementById('reportCancel')?.addEventListener('click',()=>{wrap.hidden=true;form.reset();result.hidden=true});
 form?.addEventListener('submit',e=>{
   e.preventDefault();
   const no='SSA-2026-'+String(Math.floor(100000+Math.random()*899999));
   const region=document.getElementById('reportRegion').value;
   const time=document.getElementById('reportTime').value.replace('T',' ');
   form.hidden=true; result.hidden=false;
   result.innerHTML='<div class="result-head"><span>접수완료</span><b>신고가 정상적으로 접수되었습니다.</b></div><dl><div><dt>접수번호</dt><dd>'+no+'</dd></div><div><dt>신고유형</dt><dd>'+selectedType+'</dd></div><div><dt>발생지역</dt><dd>'+region+'</dd></div><div><dt>발생시각</dt><dd>'+time+'</dd></div></dl><p>접수된 내용은 관할 지역관리국에 전달되어 신고 내용 확인 및 필요한 안전확인 절차가 진행됩니다.</p><button type="button" class="submit" id="newReport">새 신고 작성</button>';
   document.getElementById('newReport').onclick=()=>{form.reset();form.hidden=false;result.hidden=true};
   result.scrollIntoView({behavior:'smooth',block:'start'});
 });
})();



/* ===== ORIGINAL SCRIPT BLOCK 6 ===== */

(function(){
 const pop=document.getElementById('entryPopups');
 if(!pop)return;
 const dayKey='sentinel_popup_'+new Date().toLocaleDateString('ko-KR');
 if(localStorage.getItem(dayKey)!=='closed')pop.hidden=false;
 const close=(allDay)=>{
   if(allDay)localStorage.setItem(dayKey,'closed');
   pop.hidden=true;
 };
 pop.querySelectorAll('[data-close-popup]').forEach(b=>b.addEventListener('click',()=>close(false)));
 pop.querySelectorAll('[data-hide-day]').forEach(b=>b.addEventListener('click',()=>close(true)));
 pop.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>close(false)));
 const form=document.getElementById('surveyForm');
 if(form)form.addEventListener('submit',e=>{
   e.preventDefault();
   form.hidden=true;
   const r=document.getElementById('surveyResult');
   r.hidden=false;
   r.innerHTML='<div class="result-head"><span>제출완료</span><b>설문이 정상적으로 제출되었습니다.</b></div><p>응답해 주셔서 감사합니다. 제출된 의견은 누리집 서비스 개선을 위한 참고자료로 활용됩니다.</p><a class="submit" href="#home">홈으로 돌아가기</a>';
 });
})();



/* ===== ORIGINAL SCRIPT BLOCK 11 ===== */

(function(){
const go=e=>{
 const r=e.target.closest('[data-apostle-href],[data-sentinel-href],.apostle-row[data-href],.sentinel-row[data-href]');
 if(!r||e.target.closest('button,input,select,textarea,a,.adm-bar,.admin-edit-btn'))return;
 if(document.body.classList.contains('photo-admin')&&e.target.closest('.apostle-photo,.sentinel-photo'))return;
 if(e.type==='keydown'&&e.key!=='Enter'&&e.key!==' ')return;
 e.preventDefault();
 const h=r.dataset.apostleHref||r.dataset.sentinelHref||r.dataset.href;
 if(h&&location.hash!==h)location.hash=h;
};
document.addEventListener('click',go);document.addEventListener('keydown',go);
})();



/* ===== ADMIN BUTTON FALLBACK ===== */
document.addEventListener('click',function(e){
 const btn=e.target.closest('#adminModeBtn,#adminModeBtnMobile');
 if(!btn||typeof window.__ssaEnterAdmin!=='function')return;
 e.preventDefault();
 e.stopPropagation();
 window.__ssaEnterAdmin();
},true);
