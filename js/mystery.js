/* ===== THE 17TH OBSERVATION / BAek Cheong-sim mystery layer ===== */
(function(){
  const KEY=[48,56,49,55].map(n=>String.fromCharCode(n)).join('');
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
    if(localStorage.getItem('ssa_17_unlocked')==='1'){showArchiveRecord();return;}
    const o=modal('보존기록 열람 인증',
      '<p class="mystery-lead">해당 기록은 공개 범위가 제한된 초기 작전자료입니다.</p>'+
      '<p class="mystery-muted">문서번호 <b>SSA-O-2005-17</b></p>'+
      '<form id="mysteryPasswordForm" class="mystery-password-form">'+
      '<label for="mysteryPassword">비밀번호</label><input id="mysteryPassword" type="password" inputmode="numeric" autocomplete="off" maxlength="12" placeholder="비밀번호 입력">'+
      '<button type="submit">열람</button><p id="mysteryPasswordError" class="mystery-error" aria-live="polite"></p></form>'+
      '');
    const form=o.querySelector('#mysteryPasswordForm'),input=o.querySelector('#mysteryPassword'),err=o.querySelector('#mysteryPasswordError');
    form.addEventListener('submit',e=>{
      e.preventDefault();
      if(input.value.trim()===KEY){o.remove();localStorage.setItem('ssa_17_unlocked','1');showArchiveRecord();return;}
      err.textContent='인증에 실패했습니다. 관련 공개기록을 다시 확인해 주세요.';
      input.value='';input.focus();
    });
    input.focus();
  }

  function showArchiveRecord(){
    const years={
      "2002":[
        {date:"2002.05.23",label:"괴수 대응 출동"},
        {date:"2002.06.11",label:"현장 출동"},
        {date:"2002.07.03",label:"이상징후 대응"},
        {date:"2002.07.27",label:"괴수 대응 출동"},
        {date:"2002.08.09",label:"현장 출동"},
        {date:"2002.09.14",label:"도심권 출동"},
        {date:"2002.10.02",label:"현장 출동"},
        {date:"2002.10.21",label:"괴수 대응 출동"},
        {date:"2002.11.08",label:"현장 출동"},
        {date:"2002.11.19",label:"이상징후 대응"},
        {date:"2002.12.12",label:"연말 현장 출동"},
        {date:"2002.12.27",label:"괴수 대응 출동"},
        {date:"2002.05.06",label:"첫 출동",detail:[
          ["09:10","출동","최초 괴수 발생지역 현장 투입","백청심 포함 3명 현장 투입. 주민 대피와 현장 통제를 시작함.","수도권 외곽 / 통제구역 설정"],
          ["11:36","현장 도착","주민 대피 및 위험구역 통제","민간인 대피 완료. 미확인 생체반응이 확인된 건물 주변을 통제구역으로 지정.","추가 피해 없음"],
          ["16:22","귀환","초기 대응반 본부 복귀","현장 수습 후 장비 반납 및 경과보고 제출.","후속 관측 인원으로 지정"]
        ]}
      ],
      "2003":[
        {date:"2003.01.14",label:"현장 출동"},{date:"2003.02.07",label:"괴수 대응 출동"},
        {date:"2003.03.19",label:"현장 출동"},{date:"2003.04.08",label:"이상징후 대응"},
        {date:"2003.05.17",label:"현장 출동"},{date:"2003.06.21",label:"괴수 대응 출동"},
        {date:"2003.07.05",label:"현장 출동"},{date:"2003.08.16",label:"도심권 출동"},
        {date:"2003.09.03",label:"현장 출동"},{date:"2003.10.12",label:"이상징후 대응"},
        {date:"2003.11.03",label:"괴수 대응 출동"},{date:"2003.12.18",label:"현장 출동"},
        {date:"2003.12.27",label:"연말 현장 출동"}
      ],
      "2004":[
        {date:"2004.01.09",label:"현장 출동"},{date:"2004.02.18",label:"괴수 대응 출동"},
        {date:"2004.03.12",label:"현장 출동"},{date:"2004.04.06",label:"이상징후 대응"},
        {date:"2004.05.15",label:"현장 출동"},{date:"2004.06.03",label:"괴수 대응 출동"},
        {date:"2004.07.22",label:"현장 출동"},{date:"2004.08.11",label:"도심권 출동"},
        {date:"2004.09.04",label:"현장 출동"},{date:"2004.10.17",label:"이상징후 대응"},
        {date:"2004.11.06",label:"괴수 대응 출동"},{date:"2004.12.16",label:"현장 출동"},
        {date:"2004.12.28",label:"연말 현장 출동"}
      ],
      "2005":[
        {date:"2005.01.13",label:"현장 출동"},{date:"2005.01.27",label:"괴수 대응 출동"},{date:"2005.02.11",label:"괴수 대응 출동"},
        {date:"2005.03.08",label:"현장 출동"},{date:"2005.03.24",label:"이상징후 대응"},{date:"2005.04.19",label:"이상징후 대응"},
        {date:"2005.05.07",label:"현장 출동"},{date:"2005.05.26",label:"괴수 대응 출동"},{date:"2005.06.28",label:"괴수 대응 출동"},
        {date:"2005.07.05",label:"현장 출동"},{date:"2005.07.16",label:"현장 출동"},{date:"2005.08.17",label:"순직 작전",detail:[
          ["05:42","출동","수도권 제3현장대응반 출동","미확인 생체반응 신고 접수. 백청심 외 4명 출동.","서울 동부권 외곽 산업단지"],
          ["06:18","현장 도착","1차 안전구역 설정","민간인 대피 완료. 반경 300m 통제선 설정.","통제선 유지 / 추가 인원 요청 없음"],
          ["07:03","현장 확인","미확인 개체 흔적 확인","폐창고 내부에서 비정상적인 열원과 잔류물 발견. 개체는 확인되지 않음.","백청심 담당 / 사진 06매"],
          ["08:27","능력 발현","백청심 능력 반응 확인","현장 진입 직후 능력 반응 발생. 기존 자료보다 높은 반응이 측정됨.","계측기 03호 / 원자료 별도 보존"],
          ["08:31","괴수 발생","미확인 개체 출현","통제구역 중앙에서 미확인 개체 출현. 대응반 방어대형 전환.","당시 판정 보류 / 주민 피해 없음"],
          ["08:46","교전","1차 제압 시도","개체 이동경로 차단 및 억제 시도. 백청심의 위치를 지속적으로 추적하는 양상 확인.","대응반 2명 경상"],
          ["09:12","지원 요청","추가 대응인력 요청","현장 상황 악화로 지원반 요청. 백청심은 현장 잔류.","09:11 이후 일부 통신 불안정"],
          ["09:28","복귀","현장대응반 일부 귀환","1차 대응인력 복귀 시작. 백청심은 현장 확인을 위해 잔류.","복귀 3명 / 잔류 2명"],
          ["09:41","신호 소실","백청심 위치 신호 중단","위치 신호 및 통신 응답이 동시에 중단됨. 재진입 보류.","통제구역 북측 / 응답 없음"],
          ["11:06","수습","현장 수습","개체 제압 완료. 백청심의 장비 일부 확인.","통신기 1점 / 보호장비 일부"],
          ["14:20","귀환","제3현장대응반 본부 복귀","잔여 인원 및 장비 본부 복귀.","수도권 초기대응본부"]
        ]},
        {date:"2005.08.18",label:"순직 처리"}
      ]
    };

    const detail=list=>list.map(x=>'<article class="archive-log-entry"><time><b>'+x[0]+'</b></time><div><span class="archive-log-type">'+x[1]+'</span><h4>'+x[2]+'</h4><p>'+x[3]+'</p><small>'+x[4]+'</small></div></article>').join('');
    const openDetail=item=>{
      const parts=item.date.split('.');
      modal(parts[1]+'월 '+parts[2]+'일 · '+item.label,
        '<div class="mystery-document archive-detail">'+
        '<button type="button" class="archive-back-button" data-archive-back>← 보존기록 목록으로</button>'+
        '<div class="mystery-doc-meta"><span>백청심 현장자료</span><span>'+item.date+'</span></div>'+
        '<div class="archive-log-list">'+detail(item.detail)+'</div>'+
        '</div>');
      const detailModal=document.getElementById('mysteryModal');
      detailModal?.querySelector('[data-archive-back]')?.addEventListener('click',()=>{
        detailModal.remove();
        showArchiveRecord();
      });
    };
    const list=items=>items.slice().sort((a,b)=>a.date.localeCompare(b.date)).map(item=>{
      const clickable=!!item.detail;
      return '<button type="button" class="archive-date-row'+(clickable?' is-detail':'')+'" '+(clickable?'data-archive-detail="'+item.date+'"':'')+'>'+
        '<span class="archive-date">'+item.date.slice(5).replace('.','월 ')+'일</span>'+
        '<span class="archive-date-label">'+item.label+'</span>'+
        (clickable?'<span class="archive-date-arrow">›</span>':'')+'</button>';
    }).join('');
    const tabs=Object.keys(years).map(y=>'<button type="button" class="archive-year-tab'+(y==='2005'?' active':'')+'" data-archive-year="'+y+'">'+y+'년</button>').join('');

    const o=modal('SSA-O-2005-17 · 백청심 현장자료',
      '<div class="mystery-document archive-log-document">'+
      '<div class="mystery-doc-meta"><span>문서번호 SSA-O-2005-17</span><span>대상 백청심</span></div>'+
      '<div class="archive-log-head"><strong>백청심 활동 자료</strong><span>2002.05 ~ 2005.12</span></div>'+
      '<div class="archive-year-tabs" role="tablist" aria-label="연도별 현장자료">'+tabs+'</div>'+
      '<div class="archive-year-panel archive-date-list" id="archiveYearPanel">'+list(years["2005"])+'</div>'+
      '<div class="archive-log-footer"><span>보존자료 범위</span><b>2002.01 ~ 2005.12</b><small>자세한 현장자료는 일부 날짜만 공개됨.</small></div>'+
      '</div>');
    if(o){
      localStorage.setItem('ssa_17_unlocked','1');
      const panel=o.querySelector('#archiveYearPanel');
      const bind=()=>{
        o.querySelectorAll('[data-archive-detail]').forEach(btn=>btn.addEventListener('click',()=>{
          const active=o.querySelector('.archive-year-tab.active')?.dataset.archiveYear||'2005';
          const item=(years[active]||[]).find(x=>x.date===btn.dataset.archiveDetail);
          if(item?.detail) openDetail(item);
        }));
      };
      o.querySelectorAll('[data-archive-year]').forEach(tab=>tab.addEventListener('click',()=>{
        o.querySelectorAll('[data-archive-year]').forEach(x=>x.classList.remove('active'));
        tab.classList.add('active');
        panel.innerHTML=list(years[tab.dataset.archiveYear]);
        bind();
      }));
      bind();
    }
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
        '<p>초기 보존문서의 식별번호에는 현장자료를 추적하기 위한 내부 규칙이 적용되어 있다.</p><p class="mystery-muted">공개된 문서번호만으로는 열람 인증정보를 바로 확인할 수 없다.</p>');
      if(kind==='2005') modal('사건 연도 대조',
        '<p>백청심의 추모기록과 초기 현장자료는 서로 다른 문서 체계로 보존되어 있다.</p><p class="mystery-muted">두 자료의 날짜 표기를 대조하면 인증에 필요한 단서를 좁힐 수 있다.</p>');
      if(kind==='record') modal('기록 항목 안내',
        '<p>추모기록은 인적사항만을 공개하지만, 일부 초기 인물의 <b>기록</b> 항목은 별도 보존문서와 연결된다.</p><p class="mystery-muted">연결 대상은 모든 순직자에게 동일하지 않다.</p>');
    }
  });

  function caseBoard(){
    if(localStorage.getItem('ssa_17_unlocked')!=='1'){modal('연계기록 접근 제한','<p class="mystery-lead">공개된 추모기록에서 연결 가능한 보존자료를 먼저 확인해 주세요.</p>');return;}
    const found=JSON.parse(localStorage.getItem('ssa_case_clues')||'[]'), has=x=>found.includes(x);
    const card=(id,title,date,desc,locked)=>'<button type="button" class="case-link-card" data-case-id="'+id+'"><span>'+date+'</span><b>'+title+'</b><small>'+desc+'</small><em>'+(has(id)?'확인 완료':locked?'추가 단서 필요':'열람 가능')+'</em></button>';
    const o=modal('사건 연계 기록 · CASE 17','<div class="mystery-document case-board"><p class="mystery-lead">서로 다른 부서의 기록을 날짜와 문서번호로 대조하세요.</p><div class="case-link-grid">'+card('A','초기 대응반 인사기록','2002.05.06','백청심의 최초 출동 당시 소속 기록.',false)+card('B','괴수 분류 변경기록','2004.11.06','개체 판정 기준이 변경된 흔적.',!has('A'))+card('C','순직 작전 사후보고','2005.08.18','공개 발표와 보존자료 사이의 불일치.',!has('B'))+'</div><div class="case-progress"><b>확보한 연계기록</b><span>'+found.length+' / 3</span></div></div>');
    o.querySelectorAll('[data-case-id]').forEach(btn=>btn.addEventListener('click',()=>{
      const id=btn.dataset.caseId,current=JSON.parse(localStorage.getItem('ssa_case_clues')||'[]');
      if((id==='B'&&!current.includes('A'))||(id==='C'&&!current.includes('B'))){modal('열람 순서 확인','<p>앞선 기록과 날짜를 먼저 대조해야 합니다.</p>');return;}
      const docs={
        A:['초기 대응반 인사기록 · 2002.05.06','<p>백청심은 최초 출동 당시 <b>초기 국가능력안전 대응반</b> 소속으로 기재되어 있다.</p><div class="mystery-note"><strong>비고</strong>같은 날짜의 현장기록에는 별도의 관측 인원 지정 문구가 남아 있다.</div>'],
        B:['괴수 분류 변경기록 · 2004.11.06','<p>내부 분류표의 일부 문구가 수정되었다.</p><div class="mystery-note"><strong>변경 전</strong>“현장 능력 반응과 개체 반응의 상관관계 없음”</div><div class="mystery-note"><strong>변경 후</strong>“상관관계는 개별 사건자료에 따라 재검토할 수 있음”</div><p class="mystery-muted">수정 승인자는 공개 목록에서 확인되지 않는다.</p>'],
        C:['순직 작전 사후보고 · 2005.08.18','<p>공개 추모기록은 “괴수 대응 작전 중 순직”으로 정리되어 있다.</p><div class="mystery-note"><strong>보존자료와의 차이</strong>08:27 능력 반응이 기존 자료보다 높게 측정되었고, 09:41 위치 신호가 통신과 동시에 끊겼다.</div><p>그러나 사후보고에는 두 항목이 모두 누락되어 있다.</p><p class="mystery-muted">다음 단서는 다른 센티넬의 기록에서 확인할 수 있다.</p>']
      };
      if(!current.includes(id)){current.push(id);localStorage.setItem('ssa_case_clues',JSON.stringify(current));}
      modal(docs[id][0],'<div class="mystery-document">'+docs[id][1]+'<button type="button" class="case-next-button" data-case-next>연계기록으로 돌아가기</button></div>');
      document.getElementById('mysteryModal')?.querySelector('[data-case-next]')?.addEventListener('click',()=>{document.getElementById('mysteryModal')?.remove();caseBoard();});
    }));
  }
  function injectCaseEntry(){
    if(document.getElementById('ssaCaseEntry')||localStorage.getItem('ssa_17_unlocked')!=='1')return;
    const target=document.querySelector('.baek-profile-page .content-body')||document.querySelector('#memorial .container');if(!target)return;
    const box=document.createElement('section');box.id='ssaCaseEntry';box.className='case-entry-panel';
    box.innerHTML='<div><span>CASE 17 · 기록 대조</span><h3>백청심 사건에서 확인된 연계기록</h3><p>하나의 사건으로 보였던 기록은 다른 인물과 다른 연도의 자료로 이어집니다.</p></div><button type="button">연계기록 열람 →</button>';
    target.appendChild(box);box.querySelector('button').onclick=caseBoard;
  }
  window.addEventListener('hashchange',injectCaseEntry);setTimeout(injectCaseEntry,250);window.__ssaMysteryCaseBoard=caseBoard;
  window.__ssaMysteryUnlock=password;
  window.__ssaShow17=showArchiveRecord;
})();
/* investigation review */
(function(){function run(){if(location.hash!=='#baek-profile'||document.getElementById('ssaRecordReview'))return;var b=document.querySelector('#baek-profile .content-body');if(!b)return;var n=document.createElement('section');n.id='ssaRecordReview';n.className='ssa-record-review';var done=0;try{done=JSON.parse(localStorage.getItem('ssa_case_clues')||'[]').length}catch(e){}n.innerHTML='<div class="ssa-review-head"><div><span>기록 대조 현황</span><h2>백청심 사건 관련 열람 기록</h2><p>공개 기록과 보존자료를 대조한 결과입니다.</p></div><b>'+done+'/3</b></div><div class="ssa-review-grid"><button class="ssa-review-item" data-r="a"><span>01</span><b>2002.04 · 초기 대응기록</b><small>위원회 설립 시점과 최초 출동 시점을 대조합니다.</small></button><button class="ssa-review-item" data-r="b"><span>02</span><b>2004.11 · 분류 변경기록</b><small>능력 반응과 개체 반응의 관계를 확인합니다.</small></button><button class="ssa-review-item" data-r="c"><span>03</span><b>2011 이후 · 추모기록 표기</b><small>사건을 설명하는 행정용어의 변화를 확인합니다.</small></button></div><div class="ssa-review-next"><span>다음 확인 권고</span><strong>'+(done>=3?'초기 괴수 발생 관련 공개기록과 2002년 연혁을 함께 대조해 주세요.':'CASE 17의 연계기록을 먼저 모두 확인해 주세요.')+'</strong></div>';b.insertBefore(n,b.querySelector('.back-to-list')||null);n.querySelectorAll('[data-r]').forEach(function(x){x.onclick=function(){location.hash=x.dataset.r==='a'?'#archive2005':x.dataset.r==='b'?'#classification':'#memorial'}})}window.addEventListener('hashchange',function(){setTimeout(run,150)});setTimeout(run,400)})();
