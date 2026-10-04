/* 센티넬안전관리청 숨겨진 기록 — 이스터에그 모음 */
(function(){
  const seen=new Set();
  let toastTimer;
  function toast(message){
    let el=document.getElementById('ssaEggToast');
    if(!el){
      el=document.createElement('div');
      el.id='ssaEggToast';
      el.setAttribute('aria-live','polite');
      el.style.cssText='position:fixed;left:50%;bottom:28px;transform:translateX(-50%);z-index:99999;padding:11px 16px;background:rgba(10,28,55,.94);color:#fff;border:1px solid rgba(255,255,255,.2);border-radius:6px;font-size:12px;line-height:1.5;box-shadow:0 8px 30px rgba(0,0,0,.2);opacity:0;pointer-events:none;transition:opacity .2s;max-width:min(88vw,520px);text-align:center';
      document.body.appendChild(el);
    }
    clearTimeout(toastTimer); el.textContent=message; el.style.opacity='1';
    toastTimer=setTimeout(()=>el.style.opacity='0',4200);
  }
  function found(id,message){if(seen.has(id))return;seen.add(id);toast(message)}
  function clicks(el,count,id,message,windowMs=1800){
    if(!el)return; let n=0,last=0;
    el.addEventListener('click',()=>{
      const now=Date.now(); if(now-last>windowMs)n=0; last=now; n++;
      if(n>=count){n=0;found(id,message)}
    });
  }
  document.addEventListener('DOMContentLoaded',()=>{
    const search=document.getElementById('searchInput');
    search?.addEventListener('input',()=>{
      if(search.value.replace(/\s/g,'')==='2002')found('egg02','검색 색인: 2002년 자료 1건 · 열람 권한이 제한되어 있습니다.');\n      if(search.value.replace(/\s/g,'')==='2005')found('egg13','보존자료 색인: 2005년 초기 대응기록 · 일부 작전기록은 현재도 제한 열람입니다.');
    });
    clicks(document.getElementById('siteCurrentDateTime'),5,'egg03','시각 동기화 기록 · 마지막 확인: 정상 · 다음 확인: 자동 처리');
    const copyright=[...document.querySelectorAll('.footer-info')].find(x=>x.textContent.includes('Copyright'));
    clicks(copyright,3,'egg04','보존 문서: 이 페이지의 모든 시각은 한국 표준시를 기준으로 기록됩니다.');
    clicks(document.getElementById('allMenu'),6,'egg05','관리자 메모 · 메뉴 구조는 2002년 이후 세 차례 변경되었습니다.');
    clicks(document.querySelector('.crisis-map-svg [data-region="서울특별시"]'),3,'egg06','서울 · 현황 조회 완료 · 상세 현장기록은 공개 대상이 아닙니다.');
    clicks(document.querySelector('.crisis-map-svg [data-region="제주특별자치도"]'),4,'egg07','제주 현장기록 04번 · 신호는 확인되었으나 발신 위치는 기록되지 않았습니다.');
    const admin=document.getElementById('adminModeBtn'); let hoverTimer;
    admin?.addEventListener('mouseenter',()=>{hoverTimer=setTimeout(()=>found('egg08','관리자 권한 확인 · 현재 계정에는 해당 기록을 열람할 권한이 없습니다.'),5000)});
    admin?.addEventListener('mouseleave',()=>clearTimeout(hoverTimer));
    let keys='';
    document.addEventListener('keydown',e=>{
      if(e.key.length!==1)return; keys=(keys+e.key.toUpperCase()).slice(-3);
      if(keys==='SSA'){found('egg09','SSA 내부 단축키 · 정상 작동합니다. 이 기능은 공개 안내서에 수록되어 있지 않습니다.');keys=''}
    });
    let aruCount=0;
    search?.addEventListener('change',()=>{
      if(search.value.trim().toUpperCase()==='ARU'){aruCount++;if(aruCount>=3){found('egg10','ARU 운용기록 · 03:17에 자동 점검이 예약되어 있습니다.');aruCount=0}}
    });
    document.addEventListener('click',e=>{
      const a=e.target.closest('#briefing .board-row:last-child'); if(a){
        const now=Date.now(); const s=window.__ssaEggBriefing||{n:0,last:0};
        if(now-s.last>1600)s.n=0; s.n++;s.last=now;window.__ssaEggBriefing=s;
        if(s.n>=3){s.n=0;found('egg11','정책자료 보관번호 SSA-2026-001 · 원문에는 공개되지 않은 부록이 존재합니다.')}
      }
      const p=e.target.closest('#noticeArticle .notice-article-body p:last-child'); if(p){
        const now=Date.now(); const s=window.__ssaEggNotice||{n:0,last:0};
        if(now-s.last>1700)s.n=0;s.n++;s.last=now;window.__ssaEggNotice=s;
        if(s.n>=4){s.n=0;found('egg12','점검기록 36-04 · 기록상태: 확인 필요 · 담당자에게 자동 전달되었습니다.')}
      }
    });
  });
})();