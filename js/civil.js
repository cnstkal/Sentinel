/* ===== ORIGINAL SCRIPT BLOCK 12 ===== */

(function(){
 const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
 const mf=document.getElementById('malfunctionForm'), mr=document.getElementById('malResult');
 mf?.addEventListener('submit',e=>{
   e.preventDefault();
   const no='SSA-ARU-2026-'+String(Math.floor(100000+Math.random()*899999));
   const region=document.getElementById('malRegion').value, type=document.getElementById('malType').value;
   const time=document.getElementById('malTime').value.replace('T',' ');
   mf.hidden=true; mr.hidden=false;
   mr.innerHTML='<div class="result-head"><span>접수완료</span><b>오작동 신고가 정상적으로 접수되었습니다.</b></div><dl><div><dt>접수번호</dt><dd>'+no+'</dd></div><div><dt>신고유형</dt><dd>ARU 오작동 신고</dd></div><div><dt>오작동 유형</dt><dd>'+esc(type)+'</dd></div><div><dt>발생지역</dt><dd>'+esc(region)+'</dd></div><div><dt>발생시각</dt><dd>'+esc(time)+'</dd></div></dl><p>접수된 내용은 관할 안전관리 부서에서 확인하며 필요한 경우 추가 확인 절차가 진행됩니다.</p><button type="button" class="submit" id="newMalReport">새 신고 작성</button>';
   document.getElementById('newMalReport').onclick=()=>{mf.reset();mf.hidden=false;mr.hidden=true};
   mr.scrollIntoView({behavior:'smooth',block:'start'});
 });
 const faqSearch=()=>{
   const q=(document.getElementById('faqSearch')?.value||'').trim().toLowerCase();
   let shown=0;
   document.querySelectorAll('#faqList [data-faq]').forEach(d=>{const ok=!q||d.textContent.toLowerCase().includes(q);d.style.display=ok?'':'none';if(ok)shown++});
   const empty=document.getElementById('faqEmpty');if(empty)empty.hidden=shown!==0;
 };
 document.getElementById('faqSearchBtn')?.addEventListener('click',faqSearch);
 document.getElementById('faqSearch')?.addEventListener('input',faqSearch);
 document.getElementById('faqSearch')?.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();faqSearch()}});
 const cases={
  'SSA-2026-100001':{type:'괴수 활동 신고',date:'2026.09.29 14:18',region:'서울특별시',dept:'서울지역관리국 상황실',status:'처리중',step:3,summary:'도심 상업시설 인근 이상 활동 신고',updated:'2026.10.01 09:20'},
  'SSA-2026-100002':{type:'이상징후 신고',date:'2026.09.27 08:42',region:'인천광역시',dept:'인천지역관리국 안전확인과',status:'내용확인',step:2,summary:'공공시설 주변 에너지 이상 반응 신고',updated:'2026.09.30 16:05'},
  'SSA-ARU-2026-100003':{type:'ARU 오작동 신고',date:'2026.09.24 19:11',region:'경기도',dept:'경기지역관리국 ARU안전과',status:'처리완료',step:4,summary:'공공시설 ARU 통신 장애 신고',updated:'2026.09.26 11:30'},
  'SSA-2026-100004':{type:'민원 상담',date:'2026.09.20 10:26',region:'대전광역시',dept:'민원총괄과',status:'접수완료',step:1,summary:'등록정보 정정 관련 상담 신청',updated:'2026.09.20 10:26'}
 };
 document.getElementById('statusForm')?.addEventListener('submit',e=>{
   e.preventDefault();
   const key=document.getElementById('statusNumber').value.trim().toUpperCase(), box=document.getElementById('statusResult'), x=cases[key];
   box.hidden=false; box.className='status-result';
   if(!x){box.innerHTML='<div class="status-result-head"><b>조회 결과가 없습니다.</b></div><div class="status-result-note">입력한 접수번호를 다시 확인해 주세요. 예시 접수번호는 <strong>SSA-2026-100001</strong>입니다.</div>';return}
   box.innerHTML='<div class="status-result-head"><span class="status-badge">'+esc(x.status)+'</span><b>'+esc(x.type)+'</b></div><dl><dt>접수번호</dt><dd>'+esc(key)+'</dd><dt>접수일시</dt><dd>'+esc(x.date)+'</dd><dt>발생지역</dt><dd>'+esc(x.region)+'</dd><dt>담당부서</dt><dd>'+esc(x.dept)+'</dd><dt>현재 단계</dt><dd>'+esc(x.status)+' · '+x.step+'단계</dd><dt>최근 처리일</dt><dd>'+esc(x.updated)+'</dd></dl><div class="status-result-note"><strong>민원 요약</strong><br>'+esc(x.summary)+'<br><br>처리상태는 가상 서비스 데이터이며 실제 기관의 민원 처리 결과와는 관련이 없습니다.</div>';
   box.scrollIntoView({behavior:'smooth',block:'start'});
 });
})();
