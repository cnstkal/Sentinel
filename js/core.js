/* ===== ORIGINAL SCRIPT BLOCK 1 ===== */

(function(){
 const navTriggers=[...document.querySelectorAll('.nav-trigger')];
 const brand=document.querySelector('.brand');
 brand?.addEventListener('click',e=>{ e.preventDefault(); if(location.hash!=='#home'){location.hash='#home';} else {show('#home');} });
 const mobile=document.getElementById('mobileMenu');
 const all=document.getElementById('allMenu');
 function show(hash){
   let id=(hash||'#home').replace('#','').split('?')[0];
   if(!document.getElementById(id)) id='home';
   document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active',p.id===id));
   document.querySelectorAll('.side-nav a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+id));
   if(id==='notice-view'&&typeof window.__renderNoticeDetail==='function'){
    const m=(hash||'').match(/id=(\d+)/); if(m) window.__renderNoticeDetail(m[1]);
   }
   if(id==='press-view'&&typeof window.__renderPressDetail==='function'){
    const m=(hash||'').match(/id=(\d+)/); if(m) window.__renderPressDetail(m[1]);
   }
   if(id==='law-view'&&typeof window.__renderLawDetail==='function'){
    const m=(hash||'').match(/id=(\d+)/); if(m) window.__renderLawDetail(m[1]);
   }
   if(id==='briefing-view'&&typeof window.__renderBriefingDetail==='function'){
    const m=(hash||'').match(/id=(\d+)/); if(m) window.__renderBriefingDetail(m[1]);
   }
   if(id==='rules-view'&&typeof window.__renderRuleDetail==='function'){
    const m=(hash||'').match(/id=(\d+)/); if(m) window.__renderRuleDetail(m[1]);
   }
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
 regForm?.addEventListener('submit',e=>{e.preventDefault();const q=document.getElementById('regNo').value.trim().toUpperCase();const db={'SN-26018492':['SN-26018492','괴수','3등급','등록','서울특별시','2026.09.29'],'SN-26017421':['SN-26017421','괴수','4등급','관찰','인천광역시','2026.09.30']};const r=db[q], box=document.getElementById('regResult');box.hidden=false;box.innerHTML=r?'<h2>등록정보 확인</h2><dl><dt>등록번호</dt><dd>'+r[0]+'</dd><dt>구분</dt><dd>'+r[1]+'</dd><dt>등급</dt><dd>'+r[2]+'</dd><dt>관리상태</dt><dd>'+r[3]+'</dd><dt>관리지역</dt><dd>'+r[4]+'</dd><dt>최종 갱신</dt><dd>'+r[5]+'</dd></dl>':'<h2>조회 결과가 없습니다.</h2><p>입력하신 등록번호를 확인하시기 바랍니다.</p>'});
 let idx=0,playing=true,timer;const slides=document.getElementById('slides'),count=3;function move(n){if(!slides)return;idx=(idx+n+count)%count;slides.style.transform='translateX(-'+idx*100+'%)'}function restart(){clearInterval(timer);if(playing)timer=setInterval(()=>move(1),5000)}(document.getElementById('prevSlide')||{}).onclick=()=>{move(-1);restart()};(document.getElementById('nextSlide')||{}).onclick=()=>{move(1);restart()};(document.getElementById('playSlide')||{}).onclick=()=>{playing=!playing;document.getElementById('playSlide').textContent=playing?'Ⅱ':'▶';document.getElementById('playSlide').setAttribute('aria-label',playing?'슬라이드 자동재생 일시정지':'슬라이드 자동재생 재생');restart()};restart();
 document.querySelectorAll('.press-tabs').forEach(tabs=>{tabs.querySelectorAll('button[data-tab]').forEach(btn=>btn.addEventListener('click',()=>{tabs.querySelectorAll('button[data-tab]').forEach(b=>b.classList.toggle('active',b===btn));const root=tabs.parentElement;root.querySelectorAll('.press-list').forEach(list=>list.hidden=list.id!==btn.dataset.tab)}))});
 document.querySelectorAll('.rating').forEach(r=>{const bs=[...r.querySelectorAll('button')];bs.forEach((b,i)=>b.addEventListener('click',()=>bs.forEach((x,j)=>x.classList.toggle('on',j<=i))))});
 show(location.hash);
 const initialSearch=location.hash.match(/^#searchPage\\?query=(.*)$/);
 if(initialSearch){
   try{renderSearch(decodeURIComponent(initialSearch[1]||''));}catch(e){}
 }
})();
