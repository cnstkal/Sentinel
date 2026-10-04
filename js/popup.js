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
