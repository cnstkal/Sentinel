/* ===== ORIGINAL SCRIPT BLOCK 13 ===== */

(function(){
 const data=[
  ['2026.09.30 01:42','전국','주의','전국 위기경보 2단계 발령. 지역별 안전수칙과 현장 안내를 확인해 주세요.'],
  ['2026.09.29 18:20','서울특별시','주의','도심 일부 지역 능력 이상징후 확인에 따른 주변 접근 자제 및 신고 안내.'],
  ['2026.09.27 21:05','경기도','관심','공공시설 주변 이상반응 확인에 따른 안전거리 유지 안내.'],
  ['2026.09.25 14:33','인천광역시','관심','항만 인근 안전확인 활동에 따른 현장 안내요원 지시에 따라 주세요.'],
  ['2026.09.22 09:10','강원도','주의','산악지역 괴수 활동 신고 증가에 따른 탐방객 안전수칙 안내.'],
  ['2026.09.18 17:45','경상남도','관심','다중이용시설 ARU 정기점검에 따른 일부 출입동선 변경 안내.'],
  ['2026.09.15 12:08','부산광역시','주의','해안지역 이상징후 확인에 따른 해안 접근 자제 및 안전확인 안내.'],
  ['2026.09.11 16:40','경상북도','관심','지역관리국 안전확인 기간 중 신고 접수방법 및 긴급상황 대응 안내.'],
  ['2026.09.05 08:25','충청남도','주의','공공시설 ARU 이상작동 확인에 따른 주변 접근 금지 안내.'],
  ['2026.08.30 19:32','제주특별자치도','관심','관광지 안전확인 강화에 따른 현장 안전요원 안내 준수 요청.']
 ];
 const cls={관심:'interest',주의:'caution',경계:'warning',심각:'critical'};
 function render(){
  const rg=document.getElementById('alertRegionFilter')?.value||'',lv=document.getElementById('alertLevelFilter')?.value||'',root=document.getElementById('alertHistoryList');
  if(!root)return;
  const rows=data.filter(x=>(!rg||x[1]===rg)&&(!lv||x[2]===lv));
  root.innerHTML=rows.length?rows.map(x=>'<article class="alert-item"><time class="alert-time">'+x[0]+'</time><span class="alert-region">'+x[1]+'</span><span class="alert-title">'+x[3]+'</span><b class="alert-level '+cls[x[2]]+'">'+x[2]+'</b></article>').join(''):'<div class="notice-area">조건에 맞는 재난문자 이력이 없습니다.</div>';
 }
 ['alertRegionFilter','alertLevelFilter'].forEach(id=>document.getElementById(id)?.addEventListener('change',render));
 document.getElementById('alertFilterReset')?.addEventListener('click',()=>{document.getElementById('alertRegionFilter').value='';document.getElementById('alertLevelFilter').value='';render()});
 render();
 window.addEventListener('hashchange',render);
 document.addEventListener('click',e=>{
  const a=e.target.closest('a[href^="#guidance?type="]');if(!a)return;
  const type=new URLSearchParams(a.getAttribute('href').split('?')[1]).get('type');
  const title={sentinel:'능력 이상징후 발견',beast:'괴수 출현·활동 발견',aru:'ARU 이상작동',evac:'대피 안내를 받은 경우'}[type]||'기본 안전수칙';
  const root=document.getElementById('guidanceDetail');if(root){root.querySelector('h2').textContent=title;root.querySelector('ol').innerHTML={
   sentinel:'<li>이상반응이 나타나는 장소에서 안전거리를 확보합니다.</li><li>현장 상황을 직접 확인하려고 접근하지 않습니다.</li><li>필요한 경우 활동 신고를 통해 위치와 상황을 알립니다.</li><li>어지럼증·의식저하 등 이상이 느껴지면 주변에 도움을 요청하고 긴급기관에 연락합니다.</li>',
   beast:'<li>괴수와 최대한 거리를 두고 이동 경로를 피합니다.</li><li>괴수를 자극하거나 촬영을 위해 접근하지 않습니다.</li><li>주변 사람에게 위험을 알리고 안전한 실내 등으로 이동합니다.</li><li>위치와 상황을 활동 신고로 알리고 긴급한 위험은 119·112로 신고합니다.</li>',
   aru:'<li>이상작동 중인 ARU에 접근하거나 임의로 조작하지 않습니다.</li><li>경보음이나 표시등을 확인하고 주변의 접근을 막습니다.</li><li>장치 식별번호와 위치를 확인해 오작동 신고를 이용합니다.</li><li>감전·화재 등 즉각적인 위험이 있으면 긴급기관에 연락합니다.</li>',
   evac:'<li>대피 안내가 내려진 경우 안내된 방향으로 침착하게 이동합니다.</li><li>엘리베이터 등 위험할 수 있는 시설 이용은 현장 안내에 따릅니다.</li><li>대피 중 위험지역으로 되돌아가지 않습니다.</li><li>공식 안내가 있을 때까지 안전한 장소에서 대기합니다.</li>'
  }[type]||'';root.scrollIntoView({behavior:'smooth',block:'start'})}
 });
})();

/* ===== ORIGINAL SCRIPT BLOCK 14 ===== */

const BRIEFING_DATA=[
["2026.09.26","2026년 하반기 센티넬 안전관리 정책 추진방향","정책기획과","안전관리","하반기에는 지역 대응체계 정비와 현장 안전확인 절차의 표준화를 중심으로 안전관리 체계를 운영한다.","지역관리국과 권역지원센터의 역할을 구분하고, 신고 접수부터 현장 확인까지의 공통 절차를 정비한다.","공공안전 자율대응장치의 정기점검 결과와 공개 가능한 개선조치 현황도 순차적으로 안내한다."],
["2026.09.12","괴수 등록·등급판정 제도 개선","등록관리과","등록관리","괴수 등록 과정에서 반복적으로 요구되는 서류를 정비하고 등록정보 확인 절차를 온라인 중심으로 개선한다.","등급판정 결과의 설명자료를 확대하고 판정 결과에 이견이 있는 경우 이의신청 절차와 제출자료를 확인하기 쉽게 안내한다.","개인 식별정보와 안전상 공개가 제한되는 정보는 기존 보호기준에 따라 공개 대상에서 제외한다."],
["2026.08.28","권역지원센터 운영체계 개편","권역지원과","지역지원","6개 권역지원센터의 상담·등록 지원 기능을 지역관리국과 연계해 운영하는 체계로 개편한다.","야간 상담과 안전확인 요청 접수 기능을 단계적으로 확대하고, 센터에서 처리하기 어려운 업무는 관할 기관으로 신속하게 전달한다.","상담기록은 업무에 필요한 범위에서만 관리하며 개인정보 접근권한을 별도로 관리한다."],
["2026.08.14","공공안전 자율대응장치 안전관리 기준 개편","ARU안전과","ARU","ARU의 정기점검 항목에 비상정지 기능과 통신장애 대응상태, 오작동 기록관리 항목을 보강한다.","시설관리자는 점검 이력과 이상작동 신고처리 결과를 정해진 방식으로 기록하고, 중대한 이상이 확인된 장치는 추가 확인 전까지 운용을 제한할 수 있다.","시민이 확인할 수 있는 점검일과 안전상태 등 공개정보의 범위도 함께 정비한다."],
["2026.07.31","학교 주변 능력안전구역 시범사업 2단계","생활안전과","학교안전","학교 주변의 안전확인 순찰과 신고체계를 정비하고 등하교 시간대의 대응절차를 표준화한다.","학교는 시설 안전관리와 사고보고를 중심으로 대응하며 학생 개인의 능력정보는 필요한 범위에서만 보호절차에 따라 처리한다.","시범사업 결과는 현장 의견과 신고 접근성, 대응절차 이행현황 등을 종합해 다음 단계 운영자료로 활용한다."],
["2026.07.10","국가 능력안전 통계 공개체계","통계기획팀","통계","신고 건수, 안전확인 요청, 등록 현황, ARU 점검 등 주요 지표를 연도별로 정리해 공개하는 통계체계를 마련한다.","개인을 특정할 수 있는 정보는 제외하고 필요한 경우 지역별 자료를 일정 범위로 묶어 공개한다.","통계 작성 기준과 용어를 함께 공개해 자료의 의미와 활용 범위를 확인할 수 있도록 한다."]
];
function renderBriefingDetail(id){
 const x=BRIEFING_DATA[Number(id)];if(!x)return;
 document.getElementById('briefingArticle').innerHTML='<div class="press-article-meta"><span>정책브리핑</span><time>'+x[0]+'</time></div><h1>'+x[1]+'</h1><div class="press-article-info"><span>담당부서 '+x[2]+'</span><span>분야 '+x[3]+'</span></div><div class="press-article-body"><p>'+x[4]+'</p><p>'+x[5]+'</p><p>'+x[6]+'</p></div><div class="press-article-footer"><span>담당부서: '+x[2]+'</span><span>대표전화 044-201-3001</span><span>최종 수정일: '+x[0]+'</span></div>';
}
window.__renderBriefingDetail=renderBriefingDetail;
window.addEventListener('hashchange',()=>{const m=location.hash.match(/^#briefing-view\?id=(\d+)/);if(m)renderBriefingDetail(m[1])});
document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#briefing-view"]');if(a){const m=a.getAttribute('href').match(/id=(\d+)/);if(m)setTimeout(()=>renderBriefingDetail(m[1]),0)}});

/* ===== ORIGINAL SCRIPT BLOCK 15 ===== */

const LAW_DATA=[
["국민능력안전기본법","법률","2026.06.30","능력 보유자의 권리 보호와 국민 안전 확보를 위한 기본 원칙, 국가와 지방자치단체의 책무, 등록 및 안전관리 체계의 기본사항을 규정한다.","정책기획과"],
["공공안전 자율대응장치법","법률","2026.05.18","공공안전 자율대응장치의 설치·운용·점검 및 안전인증에 관한 기준과 운용기관의 책임을 규정한다.","ARU안전과"],
["괴수 등록 및 관리에 관한 법률","법률","2026.04.12","괴수의 등록, 분류, 등급판정, 안전관리 및 관련 정보의 보호에 관한 사항을 정한다.","등록관리과"],
["국민능력안전기본법 시행령","대통령령","2026.07.01","기본법에서 위임된 등록관리, 지역관리국 운영, 안전확인 절차와 국가 안전통계 작성에 관한 세부사항을 정한다.","정책기획과"],
["공공안전 자율대응장치법 시행규칙","부령","2026.06.01","ARU 안전인증 신청, 정기점검 기록, 비상정지 확인 및 이상작동 보고에 필요한 서식과 절차를 규정한다.","ARU안전과"],
["괴수 등록 및 관리에 관한 법률 시행규칙","부령","2026.05.02","괴수 등록 신청, 등록정보 변경, 등급판정 신청 및 이의신청에 필요한 서류와 처리절차를 정한다.","등록관리과"]
];
const RULE_DATA=[
["공공안전 자율대응장치 정기점검 업무지침","훈령","2026.09.20","ARU 설치시설의 정기점검 주기, 점검항목, 이상 발견 시 조치 및 결과 기록방법을 정한다.","ARU안전과"],
["괴수 등급판정 업무처리규정","예규","2026.09.05","등급판정 신청 접수부터 검사, 판정, 결과 통지 및 이의신청 안내까지의 내부 처리절차를 정한다.","등급판정과"],
["지역관리국 안전확인 대응지침","지침","2026.08.25","지역관리국이 안전확인 요청을 접수했을 때 현장 확인과 관계기관 협조를 진행하는 표준절차를 정한다.","상황총괄과"],
["센티넬 등록정보 보호 및 접근관리 지침","지침","2026.08.08","등록정보와 개인식별정보의 접근권한, 열람기록, 보존 및 정정 요청 처리 기준을 정한다.","등록관리과"],
["다중이용시설 능력안전 관리지침","고시","2026.07.15","공연장, 환승시설 등 다중이용시설에서 적용할 안전계획, 신고체계와 비상동선 관리기준을 정한다.","다중이용시설과"],
["능력안전 민원 처리기준","예규","2026.06.22","민원 접수, 담당부서 배정, 처리기한 안내, 보완요청 및 처리결과 통지에 관한 세부기준을 정한다.","민원총괄과"],
["공공시설 ARU 점검결과 공개기준","고시","2026.05.30","시민에게 공개할 수 있는 ARU 점검정보의 범위와 보안상 공개를 제한하는 정보의 처리기준을 정한다.","정보보호과"],
["동조 과정 권익보호 현장대응지침","지침","2026.05.10","동조 전 설명, 의사 확인, 중단 요청, 사후 기록 등 권익보호를 위한 현장 대응절차를 정한다.","권익보호과"]
];
function renderLawRuleList(){
 const law=document.getElementById('lawList'),rule=document.getElementById('ruleList');
 if(law)law.innerHTML=LAW_DATA.map((x,i)=>'<a class="law-card" href="#law-view?id='+i+'"><div class="law-meta"><span class="law-type">'+x[1]+'</span><span>시행 '+x[2]+'</span></div><h3>'+x[0]+'</h3><p>'+x[3]+'</p></a>').join('');
 if(rule)rule.innerHTML=RULE_DATA.map((x,i)=>'<a class="rule-card" href="#rules-view?id='+i+'"><div class="rule-meta"><span class="rule-type">'+x[1]+'</span><span>발령 '+x[2]+'</span></div><h3>'+x[0]+'</h3><p>'+x[3]+'</p></a>').join('');
}
function renderLawDetail(id){
 const x=LAW_DATA[Number(id)];if(!x)return;
 document.getElementById('lawArticle').innerHTML='<div class="press-article-meta"><span>'+x[1]+'</span><time>'+x[2]+'</time></div><h1>'+x[0]+'</h1><div class="press-article-info"><span>소관부서 '+x[4]+'</span><span>시행일 '+x[2]+'</span></div><div class="press-article-body"><h3>주요 내용</h3><p>'+x[3]+'</p><h3>소관 부서</h3><p>'+x[4]+'에서 법령 관련 업무를 담당합니다.</p><h3>정보 안내</h3><p>법령의 세부 조문과 부칙은 법령 원문 페이지에서 확인할 수 있도록 구성되어 있습니다.</p></div>';
}

window.__renderLawDetail=renderLawDetail;function renderRuleDetail(id){
 const x=RULE_DATA[Number(id)];if(!x)return;
 document.getElementById('ruleArticle').innerHTML='<div class="press-article-meta"><span>'+x[1]+'</span><time>'+x[2]+'</time></div><h1>'+x[0]+'</h1><div class="press-article-info"><span>발령부서 '+x[4]+'</span><span>발령일 '+x[2]+'</span></div><div class="press-article-body"><h3>주요 내용</h3><p>'+x[3]+'</p><h3>적용 범위</h3><p>센티넬안전관리청 및 관련 지역관리국의 해당 업무 처리에 적용됩니다.</p><h3>담당 부서</h3><p>'+x[4]+'</p></div>';
}

window.__renderRuleDetail=renderRuleDetail;document.addEventListener('click',e=>{
 const l=e.target.closest('a[href^="#law-view"]'),r=e.target.closest('a[href^="#rules-view"]');
 if(l){const m=l.getAttribute('href').match(/id=(\d+)/);if(m)setTimeout(()=>renderLawDetail(m[1]),0)}
 if(r){const m=r.getAttribute('href').match(/id=(\d+)/);if(m)setTimeout(()=>renderRuleDetail(m[1]),0)}
});
window.addEventListener('hashchange',()=>{
 let m=location.hash.match(/^#law-view\?id=(\d+)/);if(m){renderLawDetail(m[1]);return}
 m=location.hash.match(/^#rules-view\?id=(\d+)/);if(m){renderRuleDetail(m[1]);return}
 if(location.hash==='#law'||location.hash==='#rules')renderLawRuleList();
});
setTimeout(renderLawRuleList,0);

/* Scheduled content refresh */
window.addEventListener('ssa-scheduled-updated',()=>{
  try{renderPressPage(1,'')}catch(e){}
  try{renderNoticePage?.(1,'')}catch(e){}
  try{renderBriefingPage?.(1,'')}catch(e){}
});
