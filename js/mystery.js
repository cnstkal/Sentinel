/* ===== THE 17TH OBSERVATION / BAek Cheong-sim mystery layer ===== */
(function(){
  const KEY=[50,48,48,53,49,55].map(n=>String.fromCharCode(n)).join('');
  const esc=s=>String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const modal=(title,body,opts={})=>{
    document.getElementById('mysteryModal')?.remove();
    const o=document.createElement('div');
    o.id='mysteryModal';o.className='mystery-modal';
    o.innerHTML='<div class="mystery-dialog" role="dialog" aria-modal="true" aria-labelledby="mysteryTitle">'+
      '<div class="mystery-dialog-head"><span class="mystery-classified">ARCHIVE ACCESS</span><button type="button" class="mystery-close" aria-label="닫기">×</button></div>'+
      '<div class="mystery-dialog-body"><h2 id="mysteryTitle">'+title+'</h2>'+body+'</div></div>';
    document.body.appendChild(o);
    const close=()=>o.remove();
    o.querySelector('.mystery-close').onclick=close;
    o.addEventListener('click',e=>{if(e.target===o)close()});
    document.addEventListener('keydown',function k(e){if(e.key==='Escape'){close();document.removeEventListener('keydown',k)}},{once:true});
    return o;
  };

  function password(){
    const o=modal('보존기록 열람 인증',
      '<p class="mystery-lead">해당 기록은 공개 범위가 제한된 초기 작전자료입니다.</p>'+
      '<p class="mystery-muted">문서번호 <b>SSA-O-2005-17</b></p>'+
      '<form id="mysteryPasswordForm" class="mystery-password-form">'+
      '<label for="mysteryPassword">비밀번호</label><input id="mysteryPassword" type="password" inputmode="numeric" autocomplete="off" maxlength="12" placeholder="비밀번호 입력">'+
      '<button type="submit">열람</button><p id="mysteryPasswordError" class="mystery-error" aria-live="polite"></p></form>'+
      '<div class="mystery-hint-line">보안상 비밀번호 자체는 이 화면에서 안내하지 않습니다.</div>');
    const form=o.querySelector('#mysteryPasswordForm'),input=o.querySelector('#mysteryPassword'),err=o.querySelector('#mysteryPasswordError');
    form.addEventListener('submit',e=>{
      e.preventDefault();
      if(input.value.trim()===KEY){o.remove();sessionStorage.setItem('ssa_17_unlocked','1');showArchiveRecord();return;}
      err.textContent='인증에 실패했습니다. 관련 공개기록을 다시 확인해 주세요.';
      input.value='';input.focus();
    });
    input.focus();
  }

  function showArchiveRecord(){
    const o=modal('SSA-O-2005-17 · 제한 공개 기록',
      '<div class="mystery-document">'+
      '<div class="mystery-doc-meta"><span>기록자 백청심</span><span>2005.08 · 관측기록 17</span></div>'+
      '<h3>제17차 현장 관측기록</h3>'+
      '<p>기존 관측 01~16에서 반복 확인된 현상이 이번 관측에서도 재현됨.</p>'+
      '<p>괴수 발생 직전 센티넬 능력 발현 기록이 선행하는 사례가 다시 확인되었다.</p>'+
      '<p class="mystery-redacted">단순한 상관관계로 판단하기에는 반복 횟수가 지나치게 많음.</p>'+
      '<p>이번 관측에서는 반대 방향의 반응도 확인됨. <b>괴수가 센티넬의 능력 발현에 반응한 것이 아니라, 능력 발현 이후 괴수 현상이 발생했다.</b></p>'+
      '<div class="mystery-note"><strong>백청심 메모</strong><br>17번째 기록을 공식 작전보고서에 포함하지 않는다.<br>원본과 공개본의 시각이 일치하지 않는다.<br>다음 관측은 필요하지 않다.</div>'+
      '<p class="mystery-redacted">사유: ████████████████████████</p>'+
      '<div class="mystery-stamp">원문 보존 상태 · 일부 복구</div>'+
      '</div>');
    if(o) sessionStorage.setItem('ssa_17_unlocked','1');
  }

  function baekProfile(){
    location.hash='#baek-profile';
  }

  document.addEventListener('click',e=>{
    const unlock=e.target.closest('[data-mystery-unlock]');
    if(unlock){e.preventDefault();password();return;}
    const profile=e.target.closest('[data-baek-profile]');
    if(profile){e.preventDefault();baekProfile();return;}
    const clue=e.target.closest('[data-mystery-clue]');
    if(clue){
      e.preventDefault();
      const kind=clue.dataset.mysteryClueKind;
      if(kind==='17') modal('문서 식별정보',
        '<p>初期 보존문서의 문서번호 끝자리는 내부 관측기록 번호로 사용되었다.</p><div class="mystery-code">…-17</div><p class="mystery-muted">동일한 번호가 서로 다른 연도의 자료에서 반복된다.</p>');
      if(kind==='2005') modal('사건 연도 대조',
        '<p>백청심의 공식 순직기록은 <b>2005년</b>으로 정리되어 있다.</p><p class="mystery-muted">공식 기록과 현장 원본의 날짜를 대조할 필요가 있다는 메모가 남아 있다.</p>');
      if(kind==='record') modal('기록 항목 안내',
        '<p>추모기록은 인적사항만을 공개하지만, 일부 초기 인물의 <b>기록</b> 항목은 별도 보존문서와 연결된다.</p><p class="mystery-muted">연결 대상은 모든 순직자에게 동일하지 않다.</p>');
    }
  });

  window.__ssaMysteryUnlock=password;
  window.__ssaShow17=showArchiveRecord;
})();