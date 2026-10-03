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
   window.scrollTo({top:0,behavior:'auto'});
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
 if(typeof PRESS_DATA!=='undefined') PRESS_DATA.forEach(x=>index.push({title:x[1],desc:x[5]||x[4]||'',text:norm(x.join(' ')),href:'#press',type:'보도자료'}));
 document.querySelectorAll('.sentinel-row').forEach((row,i)=>{
   const name=row.querySelector('.sentinel-info>strong')?.textContent?.trim()||'';
   const grade=row.querySelector('.sentinel-grade')?.textContent?.trim()||'';
   const text=norm(row.innerText);
   if(name)index.push({title:name,desc:'센티넬 · '+(grade?grade+'급 · ':'')+(row.querySelector('.sentinel-info dd:nth-of-type(3)')?.textContent?.trim()||''),text,href:row.dataset.sentinelHref||'#sentinels',type:'센티넬'});
 });
 document.querySelectorAll('.guide-row').forEach(row=>{
   const name=row.querySelector('.guide-info>strong')?.textContent?.trim()||'';
   const text=norm(row.innerText);
   if(name)index.push({title:name,desc:'가이드 · '+(row.querySelector('.guide-info dd:nth-of-type(3)')?.textContent?.trim()||''),text,href:row.dataset.guideHref||'#guides',type:'가이드'});
 });
 document.querySelectorAll('.apostle-row').forEach(row=>{
   const name=row.querySelector('.apostle-info>strong')?.textContent?.trim()||'';
   const text=norm(row.innerText);
   if(name)index.push({title:name,desc:'괴수 · 등록 공개 정보',text,href:row.dataset.apostleHref||'#apostles',type:'괴수'});
 });
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
   return '<article class="search-result-item"><a href="'+x.href+'"><b>'+esc(x.title)+'</b>'+(x.type?'<em>'+esc(x.type)+'</em>':'')+'<p>'+esc(desc)+'</p></a></article>';
 }).join('');
}
 const regForm=document.getElementById('registrationSearch');
 regForm?.addEventListener('submit',e=>{e.preventDefault();const q=document.getElementById('regNo').value.trim().toUpperCase();const db={'SN-26018492':['SN-26018492','괴수','3등급','등록','서울특별시','2026.09.29'],'SN-26017421':['SN-26017421','괴수','4등급','관찰','인천광역시','2026.09.30'],'GD-26088317':['GD-26088317','가이드','-','등록','서울특별시','2026.09.28']};const r=db[q], box=document.getElementById('regResult');box.hidden=false;box.innerHTML=r?'<h2>등록정보 확인</h2><dl><dt>등록번호</dt><dd>'+r[0]+'</dd><dt>구분</dt><dd>'+r[1]+'</dd><dt>등급</dt><dd>'+r[2]+'</dd><dt>관리상태</dt><dd>'+r[3]+'</dd><dt>관리지역</dt><dd>'+r[4]+'</dd><dt>최종 갱신</dt><dd>'+r[5]+'</dd></dl>':'<h2>조회 결과가 없습니다.</h2><p>입력하신 등록번호를 확인하시기 바랍니다.</p>'});
 let idx=0,playing=true,timer;const slides=document.getElementById('slides'),count=3;function move(n){if(!slides)return;idx=(idx+n+count)%count;slides.style.transform='translateX(-'+idx*100+'%)'}function restart(){clearInterval(timer);if(playing)timer=setInterval(()=>move(1),5000)}(document.getElementById('prevSlide')||{}).onclick=()=>{move(-1);restart()};(document.getElementById('nextSlide')||{}).onclick=()=>{move(1);restart()};(document.getElementById('playSlide')||{}).onclick=()=>{playing=!playing;document.getElementById('playSlide').textContent=playing?'Ⅱ':'▶';document.getElementById('playSlide').setAttribute('aria-label',playing?'슬라이드 자동재생 일시정지':'슬라이드 자동재생 재생');restart()};restart();
 document.querySelectorAll('.press-tabs').forEach(tabs=>{tabs.querySelectorAll('button[data-tab]').forEach(btn=>btn.addEventListener('click',()=>{tabs.querySelectorAll('button[data-tab]').forEach(b=>b.classList.toggle('active',b===btn));const root=tabs.parentElement;root.querySelectorAll('.press-list').forEach(list=>list.hidden=list.id!==btn.dataset.tab)}))});
 document.querySelectorAll('.rating').forEach(r=>{const bs=[...r.querySelectorAll('button')];bs.forEach((b,i)=>b.addEventListener('click',()=>bs.forEach((x,j)=>x.classList.toggle('on',j<=i))))});
 show(location.hash);
 const initialSearch=location.hash.match(/^#searchPage\\?query=(.*)$/);
 if(initialSearch){
   try{renderSearch(decodeURIComponent(initialSearch[1]||''));}catch(e){}
 }
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

/* ===== SITE EASTER EGGS ===== */
(function(){
 const seenKey='ssa_easter_eggs_v1';
 const seen=()=>{try{return JSON.parse(localStorage.getItem(seenKey)||'{}')}catch(e){return{}}};
 const mark=k=>{const x=seen();x[k]=1;try{localStorage.setItem(seenKey,JSON.stringify(x))}catch(e){}};

 function popup(title,body){
  if(document.getElementById('ssa-easter-popup'))return;
  const o=document.createElement('div');o.id='ssa-easter-popup';
  o.style.cssText='position:fixed;inset:0;z-index:100000;background:rgba(8,24,44,.48);display:flex;align-items:center;justify-content:center;padding:20px';
  o.innerHTML='<div style="width:min(440px,100%);background:#fff;border:1px solid #b9c7d8;border-radius:8px;box-shadow:0 18px 60px rgba(0,0,0,.22);overflow:hidden"><div style="padding:14px 18px;background:#103c70;color:#fff;font-weight:700">'+title+'</div><div style="padding:20px 18px;color:#26384d;line-height:1.75;font-size:13px">'+body+'</div><div style="padding:10px 18px;border-top:1px solid #e5eaf0;text-align:right"><button type="button" style="border:0;border-radius:4px;background:#1557a6;color:#fff;padding:7px 14px;cursor:pointer">확인</button></div></div>';
  o.querySelector('button').onclick=()=>o.remove();o.onclick=e=>{if(e.target===o)o.remove()};document.body.appendChild(o);
 }

 /* 1. 청 로고를 짧은 시간 안에 7회 클릭 */
 let clicks=0,timer=0;
 document.addEventListener('click',e=>{
  const logo=e.target.closest('.emblem,.brand');
  if(!logo)return;
  clicks++;clearTimeout(timer);timer=setTimeout(()=>clicks=0,1600);
  if(clicks>=7){
   clicks=0;mark('logo');
   popup('시스템 점검 기록','2007년 3월 14일, 중앙 관제 서버에서 11초간 미확인 신호가 감지되었습니다.<br><br><small>※ 현재까지 원인은 확인되지 않았습니다.</small>');
  }
 });

 /* 2. 검색창에 특정 문자열을 입력 */
 document.addEventListener('submit',e=>{
  const form=e.target.closest('#siteSearch');if(!form)return;
  const input=document.getElementById('searchInput'),v=(input?.value||'').trim().toLowerCase();
  if(v==='관제실' || v==='control room'){
   e.preventDefault();mark('control');
   popup('내부 문서 열람','문서번호 SSA-INT-041<br><br>해당 문서는 공개 대상이 아닙니다.<br><br><small>접근 기록이 남았습니다.</small>');
  }
 });

 /* 3. 키보드 비밀 입력 */
 let seq='';
 const secret='sentinel';
 document.addEventListener('keydown',e=>{
  if(e.key.length!==1)return;
  seq=(seq+e.key.toLowerCase()).slice(-secret.length);
  if(seq===secret){
   seq='';mark('keyboard');
   popup('인증 완료','<strong>환영합니다.</strong><br><br>이 화면을 발견했다면 당신은 이미 충분히 오래 이 사이트를 둘러보고 있습니다.<br><br><small>SSA / INTERNAL ARCHIVE</small>');
  }
 });

 /* 4. 특정 연혁 항목을 길게 누르기 */
 let pressTimer;
 document.addEventListener('pointerdown',e=>{
  const h=e.target.closest('.history-list article');if(!h)return;
  pressTimer=setTimeout(()=>{
   mark('history');
   popup('기록 열람','기록 보존 상태: 정상<br>원본 문서와 대조 완료<br><br><small>일부 기록은 의도적으로 공개되지 않았습니다.</small>');
  },1800);
 });
 document.addEventListener('pointerup',()=>clearTimeout(pressTimer));
 document.addEventListener('pointercancel',()=>clearTimeout(pressTimer));
})();


/* ===== ADMIN BUTTON FALLBACK ===== */
(function(){
 function fallbackAdmin(){
  const on=document.body.classList.toggle('photo-admin');
  if(on)sessionStorage.setItem('ssa_admin','1');else sessionStorage.removeItem('ssa_admin');
  document.querySelectorAll('#adminModeBtn,#adminModeBtnMobile').forEach(b=>{
   b.textContent=on?'관리자 모드 종료':'관리자 모드';
   b.classList.toggle('active',on);
  });
  if(typeof window.__ssaEnterAdmin==='function'){
   const hasReal=window.__ssaEnterAdmin;
   /* sentinel.js가 정상 로드된 경우에는 실제 관리자 로직을 사용 */
   document.body.classList.toggle('photo-admin',!on);
   hasReal();
  }
 }
 window.__ssaAdminFallback=fallbackAdmin;
 document.addEventListener('click',function(e){
  const btn=e.target.closest('#adminModeBtn,#adminModeBtnMobile');
  if(!btn)return;
  e.preventDefault();
  e.stopImmediatePropagation();
  if(typeof window.__ssaEnterAdmin==='function')window.__ssaEnterAdmin();
  else fallbackAdmin();
 },true);
 window.addEventListener('DOMContentLoaded',function(){
  if(sessionStorage.getItem('ssa_admin')==='1' && typeof window.__ssaEnterAdmin==='function')window.__ssaEnterAdmin();
 });
})();

/* ===== CRISIS MAP REGION INFO ===== */
(function(){
 const labels={interest:'관심',caution:'주의',warning:'경계',serious:'심각'};
 const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
 function bind(){
   const map=document.querySelector('.crisis-map-svg');if(!map||map.dataset.regionBound)return;
   const host=document.querySelector('.map-box');if(!host)return;
   map.dataset.regionBound='1';
   const box=document.createElement('div');box.className='map-region-popover';box.hidden=true;host.appendChild(box);
   map.querySelectorAll('.region[data-region]').forEach(path=>{
     path.setAttribute('tabindex','0');path.setAttribute('role','button');
     const open=()=>{
       const region=path.dataset.region||'';
       const cls=[...path.classList].find(c=>c.startsWith('region-'));const key=cls?.replace('region-','')||'interest';
       box.innerHTML='<button type="button" class="map-region-close" aria-label="닫기">×</button><strong>'+esc(region)+'</strong><span>현재 위기경보 <b class="lv-'+esc(key)+'">'+esc(labels[key]||'미정')+'</b></span><small>최종 업데이트 2026.10.03 18시 기준</small>';
       box.hidden=false;
     };
     path.addEventListener('click',e=>{e.stopPropagation();open()});
     path.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}});
   });
   box.addEventListener('click',e=>{if(e.target.closest('.map-region-close'))box.hidden=true});
   document.addEventListener('click',e=>{if(!box.hidden&&!box.contains(e.target)&&!e.target.closest('.crisis-map-svg'))box.hidden=true});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind);else bind();
})();
