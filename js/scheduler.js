/* Scheduled publication layer */
(function(){
  const now=()=>Date.now(), t=s=>{const v=Date.parse(s);return Number.isNaN(v)?0:v};
  const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c]));
  const published=x=>t(x.publishAt)<=now();
  const active=x=>t(x.startAt)<=now()&&t(x.endAt)>now();
  const merge=(base,extra,key)=>{const set=new Set(base.map(key));return base.concat(extra.filter(x=>!set.has(key(x))))};
  function apply(){
    const s=window.SCHEDULED_CONTENT||{};
    window.NOTICE_DATA=merge(Array.isArray(window.NOTICE_DATA)?window.NOTICE_DATA:[],(s.notices||[]).filter(published).map(x=>[x.no,x.title,x.department,x.date,x.file,...x.body]),x=>x[1]);
    window.PRESS_DATA=merge(Array.isArray(window.PRESS_DATA)?window.PRESS_DATA:[],(s.press||[]).filter(published).map(x=>[x.date,x.title,x.department,x.category,...x.body]),x=>x[1]);
    window.BRIEFING_DATA=merge(Array.isArray(window.BRIEFING_DATA)?window.BRIEFING_DATA:[],(s.briefing||[]).filter(published).map(x=>[x.date,x.title,x.department,x.category,...x.body]),x=>x[1]);
    window.dispatchEvent(new CustomEvent("ssa-scheduled-updated"));
  }
  window.__ssaScheduler={refresh:apply,published,active};
  document.addEventListener("DOMContentLoaded",()=>{apply();setInterval(apply,15000)});
  apply();
})();