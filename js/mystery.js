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
    const o=modal('SSA-O-2005-17 · 백청심 현장기록',
      '<div class="mystery-document archive-log-document">'+
      '<div class="mystery-doc-meta"><span>문서번호 SSA-O-2005-17</span><span>기록대상 백청심</span></div>'+
      '<div class="archive-log-head"><strong>초기 괴수 대응 현장기록</strong><span>2005.08.17 · 보존본</span></div>'+
      '<div class="archive-log-list">'+
        '<article class="archive-log-entry"><time>2005.08.17<br><b>05:42</b></time><div><span class="archive-log-type">출동 명령</span><h4>수도권 제3현장대응반 출동 지시</h4><p>서울 동부권에서 미확인 생체반응 신고 접수. 백청심 외 4명 출동.</p><small>출동지점 · 서울 동부권 외곽 산업단지</small></div></article>'+
        '<article class="archive-log-entry"><time>2005.08.17<br><b>06:18</b></time><div><span class="archive-log-type">출정 기록</span><h4>현장 도착 및 1차 안전구역 설정</h4><p>주변 민간인 대피 완료. 현장 반경 300m 통제선 설정. 특이한 진동 및 고주파음 확인.</p><small>현장상태 · 통제선 유지 / 추가 인원 요청 없음</small></div></article>'+
        '<article class="archive-log-entry"><time>2005.08.17<br><b>07:03</b></time><div><span class="archive-log-type">현장 기록</span><h4>미확인 개체 흔적 확인</h4><p>폐창고 내부에서 비정상적인 열원과 생체조직 잔류물 발견. 개체는 확인되지 않음.</p><small>담당 · 백청심 / 현장 사진 06매 보존</small></div></article>'+
        '<article class="archive-log-entry"><time>2005.08.17<br><b>08:27</b></time><div><span class="archive-log-type">능력 발현</span><h4>백청심 능력 반응 기록</h4><p>현장 진입 직후 능력 반응 발생. 기존 안전기록과 비교해 반응 강도가 비정상적으로 높음.</p><small>측정 · 현장 계측기 03호 / 원자료 별도 보존</small></div></article>'+
        '<article class="archive-log-entry"><time>2005.08.17<br><b>08:31</b></time><div><span class="archive-log-type">괴수 발생</span><h4>괴수 개체 출현</h4><p>통제구역 중앙에서 미확인 개체 출현. 현장대응반 즉시 방어대형으로 전환.</p><small>개체분류 · 당시 판정 보류 / 주민 피해 없음</small></div></article>'+
        '<article class="archive-log-entry"><time>2005.08.17<br><b>08:46</b></time><div><span class="archive-log-type">교전 기록</span><h4>1차 제압 시도</h4><p>개체 이동경로 차단 및 능력 억제 시도. 개체가 백청심의 위치를 지속적으로 추적하는 양상 확인.</p><small>상태 · 현장대응반 2명 경상</small></div></article>'+
        '<article class="archive-log-entry"><time>2005.08.17<br><b>09:12</b></time><div><span class="archive-log-type">통신 기록</span><h4>지원반 도착 요청</h4><p>현장 상황 악화로 추가 대응인력 요청. 백청심은 현장 잔류 및 후방 대피로 확보를 담당.</p><small>통신상태 · 09:11 이후 일부 기록 불안정</small></div></article>'+
        '<article class="archive-log-entry"><time>2005.08.17<br><b>09:28</b></time><div><span class="archive-log-type">복귀 기록</span><h4>현장대응반 일부 복귀</h4><p>민간인 대피 완료에 따라 1차 대응인력 복귀 시작. 백청심은 현장 확인을 위해 잔류.</p><small>복귀 인원 · 3명 / 잔류 인원 · 2명</small></div></article>'+
        '<article class="archive-log-entry archive-log-critical"><time>2005.08.17<br><b>09:41</b></time><div><span class="archive-log-type">마지막 확인</span><h4>백청심 현장 신호 소실</h4><p>백청심의 위치 신호 및 통신 응답이 동시에 중단됨. 현장 재진입은 위험도 상승으로 보류.</p><small>최종 확인 위치 · 통제구역 북측 / 상태 · 응답 없음</small></div></article>'+
        '<article class="archive-log-entry"><time>2005.08.17<br><b>11:06</b></time><div><span class="archive-log-type">수습 기록</span><h4>현장 수습 및 잔류 개체 확인</h4><p>괴수 개체 제압 완료. 현장 수습 과정에서 백청심의 장비 일부 확인.</p><small>수습품 · 통신기 1점 / 보호장비 일부 / 개인기록물 없음</small></div></article>'+
        '<article class="archive-log-entry"><time>2005.08.17<br><b>14:20</b></time><div><span class="archive-log-type">복귀 기록</span><h4>제3현장대응반 귀환</h4><p>잔여 인원 및 장비 본부 복귀. 현장 보고서는 당일 18:00까지 제출하도록 지시.</p><small>귀환지 · 수도권 초기대응본부</small></div></article>'+
        '<article class="archive-log-entry"><time>2005.08.18<br><b>18:04</b></time><div><span class="archive-log-type">사망 기록</span><h4>백청심 순직 처리</h4><p>전일 작전 중 행방불명된 백청심을 순직 처리. 유가족 통보 및 장비 회수 절차 진행.</p><small>처리번호 · SSA-C-2005-0818-03</small></div></article>'+
      '</div>'+
      '<div class="archive-log-footer"><span>보존본 열람 기록</span><b>2005.08.17 ~ 2005.08.18</b><small>일부 원자료는 현행 보안기준에 따라 비공개 처리됨.</small></div>'+
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