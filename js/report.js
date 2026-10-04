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
