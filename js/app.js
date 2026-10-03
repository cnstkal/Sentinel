/* Sentinel Safety Administration — consolidated JavaScript */

/* ===== ORIGINAL SCRIPT BLOCK 1 ===== */

(function(){
 const navTriggers=[...document.querySelectorAll('.nav-trigger')];
 const mobile=document.getElementById('mobileMenu');
 const all=document.getElementById('allMenu');
 function show(hash){
   let id=(hash||'#home').replace('#','').split('?')[0];
   if(!document.getElementById(id)) id='home';
   document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active',p.id===id));
   document.querySelectorAll('.side-nav a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+id));
   window.scrollTo({top:0,behavior:'smooth'});
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
 if(typeof PRESS_DATA!=='undefined') PRESS_DATA.forEach(x=>index.push({title:x[1],desc:x[5]||x[4]||'',text:norm(x.join(' ')),href:'#press'}));
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
   return '<article class="search-result-item"><a href="'+x.href+'"><b>'+esc(x.title)+'</b><p>'+esc(desc)+'</p></a></article>';
 }).join('');
}
 const regForm=document.getElementById('registrationSearch');
 regForm?.addEventListener('submit',e=>{e.preventDefault();const q=document.getElementById('regNo').value.trim().toUpperCase();const db={'SN-26018492':['SN-26018492','괴수','3등급','등록','서울특별시','2026.09.29'],'SN-26017421':['SN-26017421','괴수','4등급','관찰','인천광역시','2026.09.30'],'GD-26088317':['GD-26088317','가이드','-','등록','서울특별시','2026.09.28']};const r=db[q], box=document.getElementById('regResult');box.hidden=false;box.innerHTML=r?'<h2>등록정보 확인</h2><dl><dt>등록번호</dt><dd>'+r[0]+'</dd><dt>구분</dt><dd>'+r[1]+'</dd><dt>등급</dt><dd>'+r[2]+'</dd><dt>관리상태</dt><dd>'+r[3]+'</dd><dt>관리지역</dt><dd>'+r[4]+'</dd><dt>최종 갱신</dt><dd>'+r[5]+'</dd></dl>':'<h2>조회 결과가 없습니다.</h2><p>입력하신 등록번호를 확인하시기 바랍니다.</p>'});
 let idx=0,playing=true,timer;const slides=document.getElementById('slides'),count=3;function move(n){if(!slides)return;idx=(idx+n+count)%count;slides.style.transform='translateX(-'+idx*100+'%)'}function restart(){clearInterval(timer);if(playing)timer=setInterval(()=>move(1),5000)}(document.getElementById('prevSlide')||{}).onclick=()=>{move(-1);restart()};(document.getElementById('nextSlide')||{}).onclick=()=>{move(1);restart()};(document.getElementById('playSlide')||{}).onclick=()=>{playing=!playing;document.getElementById('playSlide').textContent=playing?'Ⅱ':'▶';document.getElementById('playSlide').setAttribute('aria-label',playing?'슬라이드 자동재생 일시정지':'슬라이드 자동재생 재생');restart()};restart();
 document.querySelectorAll('.press-tabs').forEach(tabs=>{tabs.querySelectorAll('button[data-tab]').forEach(btn=>btn.addEventListener('click',()=>{tabs.querySelectorAll('button[data-tab]').forEach(b=>b.classList.toggle('active',b===btn));const root=tabs.parentElement;root.querySelectorAll('.press-list').forEach(list=>list.hidden=list.id!==btn.dataset.tab)}))});
 document.querySelectorAll('.rating').forEach(r=>{const bs=[...r.querySelectorAll('button')];bs.forEach((b,i)=>b.addEventListener('click',()=>bs.forEach((x,j)=>x.classList.toggle('on',j<=i))))});
 show(location.hash);
})();


/* ===== ORIGINAL SCRIPT BLOCK 2 ===== */

const PRESS_DATA=[["2026.09.29","센티넬안전관리청, 2026년 하반기 표준대응 장치 안전점검 실시","대변인실","안전관리","전국 15개 지역관리국이 운용 중인 표준대응 장치에 대한 하반기 정기 안전점검을 실시한다. 이번 점검은 장치의 물리적 안전상태뿐 아니라 현장요원의 운용기록, 비상정지 절차, 시민 접근 통제체계까지 함께 확인하는 방식으로 진행된다.","청은 장치 자체의 성능보다 실제 현장에서 안전절차가 제대로 작동하는지를 중점적으로 살필 계획이다. 점검 과정에서 즉시 조치가 가능한 사항은 현장에서 보완하고, 추가 정비가 필요한 장치는 운용기관과 일정을 조정해 순차적으로 재점검한다.","국민에게 공개되는 점검 결과에는 기관별 적합 여부와 개선조치 현황을 포함하고, 장치의 취약점이나 대응능력 등 안전상 공개가 제한되는 정보는 제외한다."],["2026.09.18","전국 권역지원센터 24시간 상담체계로 전환","권익보호과","권익보호","서울 대표센터를 포함한 6개 권역지원센터의 상담체계를 24시간 운영으로 전환한다. 야간 시간대 등록 절차와 안전확인 요청에 대한 기본 상담을 받을 수 있도록 전문 상담인력을 확대 배치한다.","긴급한 생명·신체 위험은 기존과 같이 119 또는 112를 이용하며, 권역지원센터는 행정절차 안내와 안전확인 요청 접수, 보호지원기관 연계 등을 담당한다.","청은 상담 기록에 포함되는 개인정보를 최소화하고, 본인의 동의 없이 능력 관련 정보가 외부로 전달되지 않도록 별도의 접근권한 관리체계를 적용한다고 밝혔다."],["2026.09.11","민간 능력중개업체 관리감독 실태점검 결과 발표","감독총괄과","감독","청이 등록된 민간 능력중개업체 312곳을 대상으로 실시한 상반기 실태점검 결과를 공개했다. 주요 점검 대상은 동조 전 설명절차, 개인정보 보관, 중단 요청 처리, 광고 내용의 사실성 등이었다.","점검 과정에서 행정상 보완이 필요한 업체에는 시정명령과 개선권고가 내려졌으며, 반복적으로 기준을 위반한 업체는 별도의 행정절차에 따라 관리하기로 했다.","청은 중개 서비스를 이용하는 국민이 계약 전 업체의 등록 여부와 표준계약서 사용 여부를 확인할 수 있도록 관련 정보를 누리집에서 제공할 예정이다."],["2026.09.05","동조권 보호 강화안 전국 시행에 따른 현장 대응지침 배포","동조지원과","권익보호","동조 과정에서 의사 확인과 중단 요청이 실질적으로 보장될 수 있도록 개정된 현장 대응지침을 전국 지역관리국에 배포했다. 지침에는 사전 설명, 의사 확인, 중단 요청 접수, 사후 기록의 네 단계가 포함됐다.","특히 의사표현이 어려운 상황에서는 주변인의 추정만으로 동조 여부를 결정하지 않도록 하고, 가능한 범위에서 본인의 의사를 반복 확인하도록 절차를 명확히 했다.","청은 현장 담당자 교육을 통해 개정 지침의 적용 사례를 공유하고, 분기별 이행점검을 실시할 계획이다."],["2026.08.29","서울 대표센터, 주말 등록상담 시범운영 실시","서울권역지원센터","지역지원","서울권역지원센터가 평일 방문이 어려운 국민을 위해 토요일 등록상담을 시범 운영한다. 시범기간에는 신규 등록 절차, 등록정보 변경, 정기 확인 일정 조회 등을 중심으로 상담한다.","상담은 사전 예약을 원칙으로 하며 현장에서 능력 검사를 실시하지 않는다. 검사나 등급판정이 필요한 경우에는 별도 절차를 안내한다.","시범운영 결과에 따라 다른 권역지원센터로 주말 상담 확대 여부를 검토할 예정이다."],["2026.08.22","폭염 속 능력 출력 증가 사례 분석…여름철 안전수칙 공개","재난대응과","재난대응","최근 5년간 여름철 신고자료를 분석한 결과 고온 환경에서 일부 능력의 출력이나 지속시간이 평소와 달라졌다는 안전확인 요청이 반복적으로 접수된 것으로 나타났다.","청은 고온다습한 환경에서 무리한 능력 사용을 피하고, 평소와 다른 신체 반응이나 주변 환경 변화가 발생하면 즉시 사용을 중단하도록 안내했다.","이번 분석은 특정 능력이나 개인의 특성을 판단하기 위한 자료가 아니라 계절별 안전관리 기준을 마련하기 위한 참고자료로 활용된다."],["2026.08.15","지하철 역사 내 ARU 안전구역 표시체계 전국 표준화","ARU운용과","ARU","지하철과 대형 환승시설에 설치된 공공안전 자율대응장치 주변의 안전구역 표시를 하나의 디자인으로 통일한다. 이용자가 처음 방문한 역사에서도 장치의 작동범위와 대피방향을 쉽게 확인할 수 있도록 색상과 표지 규격을 표준화한다.","새 표지는 기존 시설의 안내체계를 방해하지 않는 범위에서 설치하며, 시각장애인과 외국인을 위한 음성·다국어 안내도 단계적으로 확대한다.","청은 올해 말까지 주요 환승역을 우선 적용한 뒤 전국 시설로 확대할 계획이다."],["2026.08.07","괴수 등록정보 모바일 조회 서비스 개편","등록관리과","등록관리","등록번호를 이용해 본인의 공개 가능한 등록상태를 확인하는 모바일 서비스를 개편한다. 화면 구성을 단순화하고 최근 갱신일, 관리상태, 다음 확인 예정일을 한 화면에서 확인할 수 있도록 했다.","타인의 등록정보를 조회할 수 없도록 본인확인 절차를 별도로 적용하며, 검색 기록은 최소한으로 보관한다.","청은 앞으로 모바일을 통한 주소 변경과 상담 예약 등 추가 기능도 단계적으로 도입할 계획이라고 밝혔다."],["2026.07.31","학교 주변 능력안전구역 시범사업 2단계 추진","어린이안전과","학교안전","초·중·고교 주변에서 발생할 수 있는 괴수 관련 안전사고에 대응하기 위한 학교 주변 능력안전구역 시범사업을 확대한다. 등하교 시간대 안전확인 순찰과 학교 담당자 대상 교육을 함께 실시한다.","학교에는 능력 보유 학생의 개인정보가 불필요하게 공개되지 않도록 별도의 대응지침을 제공한다. 학교 구성원 누구나 신고할 수 있는 간편한 안전확인 창구도 운영한다.","시범사업 평가는 사고 건수뿐 아니라 학생과 교직원의 체감 안전도, 신고 접근성 등을 함께 고려해 실시한다."],["2026.07.24","해안 관광지 성수기 안전확인 지원반 운영","현장대응과","현장대응","여름 휴가철을 맞아 부산·강릉·제주 등 주요 해안 관광지에 임시 안전확인 지원반을 운영한다. 관광객이 몰리는 시간대에는 현장 안내와 신고 접수 지원을 강화한다.","지원반은 현장 상황을 직접 통제하기보다 지역관리국과 지자체의 대응을 지원하는 역할을 수행한다. 관광객에게는 능력 사용으로 인한 위험이 발생했을 경우 현장 안내요원의 지시에 따르고 임의로 접근하지 않을 것을 당부했다.","운영기간 동안 접수된 민원과 안전확인 요청은 지역별 특성을 분석하는 자료로 활용할 예정이다."],["2026.07.17","등록 센티넬 정기 안전교육 온라인 과정 개설","교육운영과","교육","등록 센티넬을 대상으로 하는 정기 안전교육의 일부 과정을 온라인으로 전환한다. 교육은 능력 사용 전후 안전확인, 공공장소 이용 시 주의사항, 긴급상황 신고절차 등 생활과 밀접한 내용으로 구성된다.","온라인 과정은 모바일에서도 수강할 수 있으며 교육 이수 여부는 기존 등록관리 시스템과 연계된다.","청은 교육 접근성을 높이면서도 고위험 등급에 대해서는 기존 대면교육을 유지할 방침이다."],["2026.07.10","국가 능력안전 통계 연보 첫 공개…10년간 신고 추이 분석","통계기획팀","통계","센티넬안전관리청이 기관 설립 이후 처음으로 국가 능력안전 통계 연보를 공개한다. 연보에는 신고 건수, 안전확인 요청, 등록 현황, ARU 점검 결과 등 국민이 이해하기 쉬운 통계가 수록된다.","개인을 특정할 수 있는 정보는 통계에서 제외하고 지역별 수치 역시 필요한 경우 일정 범위로 묶어 공개한다.","청은 앞으로 매년 통계 연보를 발간해 정책 수립과 국민의 정보 접근성을 높이겠다고 밝혔다."],["2026.07.03","야간 도심 능력활동 신고 증가…여름철 순찰체계 조정","상황총괄과","재난대응","최근 여름철 야간 시간대 도심에서 능력활동 관련 안전확인 요청이 증가함에 따라 지역관리국의 순찰 및 상담 지원시간을 조정한다. 조정 대상은 유흥·상업시설 밀집지역과 대중교통 환승거점이다.","청은 단순한 능력 사용 자체를 위험행위로 판단하지 않으며, 주변 사람의 안전을 위협하거나 시설 피해가 발생할 우려가 있는 경우에 한해 안전확인을 실시한다고 설명했다.","지역별 상황에 따라 지원시간은 탄력적으로 운영될 예정이다."],["2026.06.26","가이드 보호지원 프로그램 이용자 1만 명 돌파","가이드보호과","권익보호","가이드 보호지원 프로그램 누적 이용자가 1만 명을 넘어섰다. 프로그램은 동조 과정에서 발생할 수 있는 심리적 부담과 생활상의 어려움에 대한 상담, 의료·복지기관 연계 등을 지원한다.","지원 신청 여부와 상담 내용은 원칙적으로 외부에 공개되지 않으며, 긴급한 안전 문제가 있는 경우를 제외하면 본인의 동의 없이 관계기관에 정보를 제공하지 않는다.","청은 지역별 지원 격차를 줄이기 위해 권역지원센터와 전문기관의 연계망을 확대할 계획이다."],["2026.06.19","ARU 오작동 신고 1회 통합창구 개설","ARU운용과","ARU","공공안전 자율대응장치의 이상작동이나 시설 관련 불편을 한 번에 신고할 수 있는 통합창구를 개설한다. 기존에는 운용기관별로 신고처가 달라 국민이 담당기관을 찾기 어려운 경우가 있었다.","통합창구에 접수된 신고는 위치와 장치 식별정보를 기준으로 해당 지역관리국 또는 운용기관에 자동 배분된다.","긴급 위험이 발생한 경우에는 기존 긴급신고 체계를 우선 이용하도록 안내한다."],["2026.06.12","지역관리국 민원 처리기간 공개 확대","민원지원과","민원","지역관리국별 민원 처리 현황과 평균 처리기간을 누리집에서 확인할 수 있도록 공개 범위를 확대한다. 국민이 접수 후 처리 단계가 어디에 있는지 쉽게 확인할 수 있도록 상태표시도 개편한다.","단순 상담과 법정 민원을 구분해 처리기간을 표시하고, 개인정보나 조사 중인 사건의 세부 내용은 공개하지 않는다.","청은 공개된 처리자료를 내부 업무개선에도 활용할 예정이다."],["2026.06.05","대형 공연장 능력안전 운영지침 마련","다중이용시설안전과","다중이용시설","콘서트와 스포츠 경기 등 대규모 관객이 모이는 시설을 위한 능력안전 운영지침을 마련했다. 지침에는 입장 전 안내, 비상통로 확보, 현장 신고체계, ARU 운용기관과 시설관리자의 역할이 포함된다.","공연을 제한하는 것이 아니라 관객과 능력 보유자가 함께 안전하게 시설을 이용할 수 있도록 사전 준비체계를 마련하는 데 목적이 있다.","주요 공연장과 협력해 실제 상황을 가정한 모의훈련도 진행할 예정이다."],["2026.05.29","센티넬 안전교육 콘텐츠, 청소년 눈높이에 맞춰 전면 개편","홍보담당관","교육","중·고등학생이 능력안전 제도를 쉽게 이해할 수 있도록 온라인 교육 콘텐츠를 개편한다. 기존의 법령 중심 설명을 생활 사례와 짧은 영상 중심으로 바꾸고 신고와 개인정보 보호 방법을 함께 소개한다.","콘텐츠에는 능력 보유 학생을 특정하거나 낙인찍지 않도록 하는 학교생활 사례가 포함된다.","교육자료는 학교가 자율적으로 활용할 수 있도록 공개 배포한다."],["2026.05.22","봄철 산행 증가에 따라 산악지역 안전확인 체계 강화","강원지역관리국","현장대응","봄철 등산객 증가에 맞춰 산악지역의 능력안전 대응체계를 강화한다. 강원권역지원센터와 지역관리국은 주요 탐방로의 신고 위치 확인체계와 현장 연락망을 점검한다.","산악지역에서는 통신환경에 따라 신고 위치가 정확하지 않을 수 있어 신고자에게 주변 지형지물과 탐방로 정보를 함께 알려줄 것을 당부했다.","산림·소방 관계기관과의 공동 대응훈련도 순차적으로 실시한다."],["2026.05.15","전국 6개 권역지원센터, 찾아가는 등록상담 운영","권역지원센터운영팀","지역지원","거주지와 센터 간 거리가 먼 국민을 위해 권역지원센터가 직접 지역을 방문하는 찾아가는 등록상담을 운영한다. 주민센터와 공공시설을 활용해 등록 절차와 제도 상담을 제공한다.","현장에서는 서류 안내와 상담을 중심으로 진행하며, 등급판정 등 전문 절차가 필요한 경우 별도 예약을 안내한다.","첫 운영지역은 도서·산간지역과 센터 접근성이 낮은 지역을 중심으로 선정한다."],["2026.05.08","능력안전 민원 데이터 분석으로 반복 불편 12건 개선","민원지원과","민원","최근 1년간 접수된 민원을 분석해 국민이 반복적으로 겪는 행정 불편 12개 항목을 선정하고 개선방안을 마련했다. 주요 개선사항은 서류 제출 절차 간소화, 안내문 용어 정비, 온라인 예약 화면 개선 등이다.","청은 민원인이 이해하기 어려운 행정용어를 줄이고 동일한 정보를 여러 창구에 반복 제출하지 않도록 시스템 연계를 확대한다.","개선 결과는 분기별로 공개한다."],["2026.05.01","전국 대학 캠퍼스 능력안전 담당자 협의체 출범","교육협력과","교육","대학 캠퍼스에서 발생할 수 있는 능력 관련 안전사고에 공동 대응하기 위한 전국 대학 담당자 협의체를 출범한다. 대학별 안전담당자와 지역관리국이 정기적으로 사례와 대응절차를 공유한다.","협의체는 학생 개인의 등록 여부를 공유하는 조직이 아니라 캠퍼스 안전관리 절차와 교육자료를 공유하는 실무협의체로 운영된다.","하반기에는 대학 기숙사와 연구시설을 대상으로 별도 안전교육 자료를 배포할 예정이다."],["2026.04.24","ARU 배치시설 야간 소음 민원 감소 위한 운용기준 개선","ARU운용과","ARU","공공시설 주변에서 발생한 야간 장치 작동음 관련 민원을 분석해 운용기준을 일부 개선한다. 안전에 지장이 없는 범위에서 경보음의 방향성과 단계별 출력 기준을 조정한다.","안전 확보가 필요한 긴급 상황에서는 기존 대응 기준이 우선 적용된다.","변경된 기준은 시범시설에서 검증한 뒤 전국 운용기관에 적용할 예정이다."],["2026.04.17","인천·경기권역지원센터, 공항·항만 안전지원 협약","인천·경기권역지원센터","지역지원","인천·경기권역지원센터가 공항과 항만의 능력안전 담당기관과 협력체계를 구축했다. 해외 입국자와 대규모 이동객이 몰리는 시설에서 안전확인 요청이 발생했을 때 연락체계를 신속하게 연결하는 것이 목적이다.","개인정보는 관계 법령에 따라 필요한 범위에서만 처리하며, 일반적인 여행객의 능력 보유 여부를 별도로 확인하지 않는다.","협약기관은 정기적으로 비상연락망을 점검하고 합동교육을 실시한다."],["2026.04.10","능력 관련 허위정보 확산 방지 위한 공식 확인창구 운영","정보보호과","정보보호","온라인에서 확산되는 능력 관련 허위정보와 잘못된 안전수칙에 대응하기 위해 공식 확인창구를 운영한다. 국민이 온라인 게시물의 내용을 제보하면 관계 부서가 사실관계를 확인해 안내한다.","청은 개인이나 특정 집단을 대상으로 한 비난·신상공개성 게시물은 사실확인 대상과 별개로 개인정보 침해 여부를 검토할 수 있다고 설명했다.","확인된 내용은 사례별로 누리집에 게시해 유사한 오해가 반복되지 않도록 할 예정이다."],["2026.04.03","봄철 축제기간 임시 능력안전 안내소 운영","지역관리국총괄과","축제안전","지역축제와 벚꽃 명소 등 방문객이 많은 장소에 임시 능력안전 안내소를 설치한다. 안내소에서는 안전수칙, 신고방법, 지역지원센터 연락처 등을 제공한다.","안내소는 능력 보유자를 확인하거나 통제하기 위한 시설이 아니라 방문객에게 안전정보를 제공하는 목적으로 운영된다.","올해는 수도권과 주요 관광도시를 중심으로 시범 운영하고 결과를 분석한다."],["2026.03.27","괴수 등급판정 이의신청 절차 온라인화","등급판정과","등록관리","등급판정 결과에 이견이 있는 국민이 온라인으로 이의신청 절차를 확인하고 관련 서류를 제출할 수 있도록 시스템을 개편한다.","이의신청은 판정 결과를 다시 검토하는 절차이며, 신청 사실만으로 관리등급이나 등록상태가 자동 변경되는 것은 아니다.","청은 처리 과정에서 신청인의 개인정보와 의료·능력 관련 민감정보가 불필요하게 노출되지 않도록 접근권한을 제한한다."],["2026.03.20","서울센터 주변 보행안전 개선…출입동선 전면 개편","서울권역지원센터","지역지원","서울 대표센터 이용자가 증가함에 따라 센터 주변 보행동선과 방문객 출입체계를 개편한다. 민원 방문객과 직원 차량의 동선을 분리하고 장애인 접근경로를 명확하게 표시한다.","센터 내부 상담공간에는 개인정보 보호를 위한 별도 상담구역을 마련한다.","공사는 민원서비스 운영을 중단하지 않는 범위에서 단계적으로 진행된다."],["2026.03.13","전국 지역관리국 상황실 공통 운영프로그램 도입","상황총괄과","재난대응","15개 지역관리국의 상황실에서 사용하는 사건·신고 분류체계를 하나로 통일한다. 지역별 상황을 비교할 수 있는 공통 지표와 긴급 연락체계를 적용한다.","새 시스템은 개인의 능력정보를 공유하는 시스템이 아니라 신고와 현장지원의 진행상황을 관리하는 행정시스템이다.","상황실 담당자 교육을 마친 지역부터 순차적으로 전환한다."],["2026.03.06","공공시설 ARU 점검결과 시민 확인 서비스 시범운영","ARU운용과","정보공개","공공시설에 설치된 ARU의 최근 안전점검 실시 여부를 시민이 확인할 수 있는 서비스를 시범운영한다. 시설명과 점검일, 점검상태 등 공개 가능한 정보만 제공한다.","장치의 위치를 세부 좌표로 표시하거나 보안상 민감한 정보는 공개하지 않는다.","시범서비스 이용자의 의견을 반영해 공개범위를 조정할 예정이다."],["2026.02.27","겨울철 한파 이후 능력안전 시설 특별점검 완료","재난대응과","시설안전","한파와 결빙으로 인한 시설물 손상 가능성을 확인하기 위해 전국 주요 ARU 설치시설을 특별점검했다. 전원시설, 외부 센서, 비상정지 장치 등을 중점적으로 확인했다.","경미한 시설 보완사항은 현장에서 조치했으며 추가 정비가 필요한 시설은 운용기관별 일정에 따라 개선한다.","점검 결과는 안전상 필요한 범위에서 기관별 공개자료에 반영할 예정이다."],["2026.02.20","능력안전 표준용어 48개 정비…국민 안내문부터 적용","홍보담당관","행정개선","청이 국민 안내문과 민원창구에서 사용되는 능력안전 관련 용어 48개를 정비한다. 전문용어를 그대로 사용하는 대신 국민이 의미를 바로 이해할 수 있는 표현을 우선 적용한다.","변경된 용어는 누리집과 안내문, 상담 스크립트에 먼저 적용하고 이후 관련 규정과 교육자료에도 순차 반영한다.","전문가와 국민을 대상으로 한 이해도 조사를 통해 추가 정비 항목을 검토한다."],["2026.02.13","가이드 동조 전 설명자료, 7개 언어로 확대","가이드보호과","다문화","외국 국적 가이드와 보호대상자가 동조 관련 권리를 이해할 수 있도록 표준 설명자료를 7개 언어로 확대한다. 설명자료에는 동조 전 확인사항과 중단 요청 방법, 개인정보 보호 내용을 담는다.","번역자료는 단순한 직역이 아니라 국내 제도상 권리와 절차가 정확히 전달되도록 전문 검수를 거친다.","권역지원센터와 외국인 지원기관을 통해 자료를 배포할 예정이다."],["2026.02.06","설 명절 귀성기간 주요 환승시설 안전지원반 운영","재난대응과","명절안전","설 연휴 기간 고속철도역과 버스터미널 등 주요 환승시설에 안전지원반을 배치한다. 대규모 이동으로 신고가 집중될 가능성에 대비해 현장 안내와 관계기관 연락체계를 점검한다.","지원반은 승객의 능력 보유 여부를 확인하지 않으며, 실제 안전사고나 현장 위험이 발생한 경우에만 대응절차에 따라 지원한다.","연휴 종료 후 접수 현황을 분석해 다음 명절 대응계획에 반영한다."],["2026.01.30","2026년 능력안전 연구지원 과제 18건 선정","정책기획과","연구","능력안전 정책과 현장 대응체계를 개선하기 위한 연구지원 과제 18건을 선정했다. 연구 분야에는 공공시설 안전, 동조권 보호, ARU 인간공학, 통계모델 등이 포함된다.","선정된 연구는 개인정보 보호와 연구윤리 기준을 준수하며, 정책 활용도가 높은 결과는 국민에게 공개할 예정이다.","연구 결과는 향후 안전기준 개정과 교육자료 개발에 활용한다."],["2026.01.23","지역별 능력안전 교육격차 해소 위한 이동교육단 출범","교육운영과","교육","교육 접근성이 낮은 지역을 찾아가는 이동교육단을 출범한다. 지역관리국 담당자와 전문강사가 주민과 시설관리자를 대상으로 실제 생활에서 필요한 안전수칙을 교육한다.","첫 교육지역은 도서지역과 산간지역을 우선 선정하며, 지역별 수요조사를 통해 교육내용을 조정한다.","교육 참석 여부나 개인의 능력정보는 별도로 수집하지 않는다."],["2026.01.16","ARU 제조·운용기관 안전인증 기준 개정안 행정예고","ARU운용과","법령","공공안전 자율대응장치의 제조와 운용 과정에서 요구되는 안전인증 기준 개정안을 행정예고한다. 장치의 비상정지, 오작동 기록, 정기점검 이력 관리 기준을 강화하는 내용이 포함된다.","개정안에 대한 의견은 정해진 기간 동안 누구나 제출할 수 있으며, 제출된 의견은 검토 후 최종 기준에 반영한다.","청은 기술 변화에 맞춰 안전인증 기준을 주기적으로 재검토할 예정이다."],["2026.01.09","새해 첫 전국 안전점검회의 개최…지역별 위험요인 공유","상황총괄과","안전관리","센티넬안전관리청이 15개 지역관리국과 6개 권역지원센터가 참여하는 전국 안전점검회의를 개최했다. 지난해 주요 안전확인 사례와 개선조치 이행현황을 공유하고 올해 중점관리 분야를 논의했다.","올해는 다중이용시설, 학교 주변, 대중교통시설의 안전절차를 집중적으로 점검한다.","회의 결과 중 공개 가능한 정책방향과 점검계획은 누리집을 통해 순차적으로 공개한다."],["2025.12.26","연말연시 다중이용시설 안전관리 특별기간 운영","재난대응과","시설안전","연말연시 인파가 집중되는 주요 상업시설과 환승시설을 대상으로 특별 안전관리기간을 운영한다. 지역관리국은 시설관리자와 비상연락망을 점검하고 현장 신고창구를 안내한다.","이번 조치는 특정 능력 보유자를 대상으로 한 단속이 아니라 모든 이용자의 안전을 확보하기 위한 시설 중심의 예방조치다.","시설별 자체점검 결과와 현장 의견을 취합해 다음 연도 다중이용시설 안전지침에 반영한다."],["2025.12.19","2026년 국민 능력안전 정책자료 공개계획 발표","정책기획과","정책","센티넬안전관리청이 2026년 한 해 동안 공개할 주요 정책자료의 분야와 일정을 안내했다. 안전통계, ARU 점검, 권익보호, 지역지원 등 국민 관심도가 높은 자료를 중심으로 공개를 확대한다.","공개 과정에서 개인을 식별할 수 있는 정보와 장치 운용에 직접적인 위험을 줄 수 있는 정보는 관련 기준에 따라 제외한다.","청은 국민이 정책자료의 작성 배경과 활용 목적을 함께 이해할 수 있도록 자료별 설명을 강화할 예정이다."]];
function renderPressPage(page=1,filter=''){
 const table=document.querySelector('.press-table tbody'); if(!table)return;
 const q=filter.trim().toLowerCase();
 const filtered=PRESS_DATA.map((x,i)=>({x,i})).filter(o=>!q||o.x.some(v=>String(v).toLowerCase().includes(q)));
 const total=Math.ceil(filtered.length/10), p=Math.min(Math.max(1,page),Math.max(total,1));
 table.innerHTML=filtered.slice((p-1)*10,p*10).map(o=>'<tr><td>'+(40-o.i)+'</td><td><a class="press-detail-link" href="#press-view?id='+o.i+'">'+o.x[1]+'</a></td><td><span class="file"><i>PDF</i></span></td><td>'+o.x[2]+'</td><td>'+o.x[0]+'</td><td>'+((o.i*137+684).toLocaleString())+'</td></tr>').join('');
 document.querySelector('.press .count');
 const count=document.querySelector('#press .count'); if(count)count.textContent='총 '+filtered.length+'건 · '+p+' / '+total+' 페이지';
 const nav=document.getElementById('pressPagination'); nav.innerHTML=Array.from({length:total},(_,i)=>'<button type="button" class="'+(i+1===p?'active':'')+'" data-page="'+(i+1)+'">'+(i+1)+'</button>').join('');
 nav.querySelectorAll('button').forEach(b=>b.onclick=()=>renderPressPage(+b.dataset.page,q));
}
function renderPressDetail(id){
 const x=PRESS_DATA[Number(id)]; if(!x)return;
 document.getElementById('pressArticle').innerHTML='<div class="press-article-meta"><span>보도자료</span><time>'+x[0]+'</time></div><h1>'+x[1]+'</h1><div class="press-article-info"><span>작성부서 '+x[2]+'</span><span>분야 '+x[3]+'</span></div><div class="press-article-body"><p>'+x[4]+'</p><p>'+x[5]+'</p><p>'+x[6]+'</p></div><div class="press-article-footer"><span>담당부서: '+x[2]+'</span><span>대표전화 044-201-3001</span><span>최종 수정일: '+x[0]+'.</span></div><a class="article-back" href="#press">목록으로 돌아가기</a>';
}
document.addEventListener('submit',e=>{if(e.target.id==='pressSearch'||e.target.closest('#press')&&e.target.classList.contains('board-search')){e.preventDefault();renderPressPage(1,document.getElementById('pressSearch').value)}});
document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#press-view"]');if(a){setTimeout(()=>{const m=a.getAttribute('href').match(/id=(\d+)/);if(m)renderPressDetail(m[1])},0)}});
window.addEventListener('hashchange',()=>{const m=location.hash.match(/^#press-view\?id=(\d+)/);if(m)renderPressDetail(m[1]);else if(location.hash==='#press'||location.hash==='#home')setTimeout(()=>renderPressPage(1,''),0)});
setTimeout(()=>renderPressPage(1,''),0);


/* ===== ORIGINAL SCRIPT BLOCK 3 ===== */

const NOTICE_DATA=[["36","2026년 하반기 표준대응 장치 정기 안전점검에 따른 일부 시설 운용중지 안내","운용기획과","2026.09.24","PDF","10월 1일부터 18일까지 전국 공공시설 428개소의 표준대응 장치 정기점검을 실시한다.","점검 시간에는 일부 시설의 ARU 운용이 일시 중지될 수 있으며 해당 시설에는 사전 안내와 현장 통제가 진행된다.","시설 이용자는 현장 안내에 따라 이용시간을 조정해야 하며 긴급한 안전문제는 활동 신고 창구로 접수할 수 있다."],["35","권역지원센터 야간 상담체계 전환 및 긴급 안전확인 접수 안내","권익보호과","2026.09.18","HWP","9월 30일부터 6개 권역지원센터의 상담 접수시간을 다음 날 오전 1시까지 확대한다.","야간에는 등록 절차와 안전확인 요청, 권익보호 상담을 받을 수 있으며 긴급한 생명·신체 위험은 119·112를 이용해야 한다.","접수된 안전확인 요청은 관할 지역관리국으로 전달하고 현장 확인이 필요한 경우 담당기관이 별도로 연락한다."],["34","민간 능력중개업체 등록정보 확인 의무 및 이용자 유의사항 안내","감독총괄과","2026.09.11","PDF","능력중개 서비스를 이용하기 전에 업체의 등록번호와 영업상태를 확인할 수 있도록 공개정보 조회 항목을 확대한다.","중개업체는 동조 범위와 비용, 개인정보 처리방법을 계약 전에 설명해야 하며 동의하지 않은 추가 절차를 요구할 수 없다.","등록되지 않은 업체나 동의절차 위반 사례는 관련 자료와 함께 감독총괄과에 신고할 수 있다."],["33","국가 위기경보 단계 상향에 따른 지역별 안전수칙 준수 안내","홍보담당관","2026.08.30","-","주의 단계에서는 대규모 능력활동을 자제하고 다중이용시설의 비상통로와 안내방송을 확인하도록 안내한다.","지역별 경보 단계가 다른 경우 해당 지역관리국의 안내를 우선 적용한다.","단계 변경은 누리집과 재난문자를 통해 알리며 긴급한 위험은 119·112를 이용한다."],["32","등록 센티넬 2026년 하반기 정기 안전교육 이수기한 안내","교육운영과","2026.08.21","PDF","하반기 정기 안전교육 대상자는 10월 31일까지 교육을 이수해야 한다.","교육은 온라인 2시간과 안전확인 실습 1회로 구성되며 등록번호로 대상 여부를 확인할 수 있다.","기한 내 이수가 어려운 경우 관할 지역관리국에 연장 사유를 제출할 수 있다."],["31","2026년도 능력등급 재판정 신청기간 및 제출서류 안내","등록관리과","2026.08.13","-","능력등급 재판정은 8월 17일부터 9월 30일까지 접수하며 최근 검사자료와 기존 판정자료를 함께 제출할 수 있다.","재판정에서는 능력 출력뿐 아니라 발현 안정성과 주변 안전에 미치는 영향을 함께 확인한다.","결과에 이견이 있는 신청인은 결과 통지일로부터 30일 이내 이의신청을 할 수 있다."],["30","폭염특보 기간 중 고출력 능력 사용 관련 안전관리 강화 안내","재난대응과","2026.08.05","PDF","폭염특보 지역에서는 오후 1시부터 5시까지 고출력 능력활동에 대한 안전확인을 강화한다.","고온환경에서는 출력이 불안정해질 수 있어 밀폐공간이나 인파가 많은 장소에서 장시간 활동을 피하도록 안내한다.","공공시설에서 이상 반응이 발생하면 활동을 중지하고 시설 관리자의 안내에 따라 안전확인을 요청해야 한다."],["29","서울권역지원센터 주말 등록업무 시범운영 및 사전예약 안내","권역지원과","2026.07.29","HWP","서울권역지원센터가 토요일 등록상담을 시범 운영하며 방문 전 온라인 예약을 받는다.","주말 창구에서는 신규 등록과 등록정보 정정, 등급판정 절차 안내를 우선 처리한다.","예약 없이 방문할 경우 대기시간이 길어질 수 있으며 본인 확인을 위한 신분증을 지참해야 한다."],["28","공공시설 ARU 안전점검 결과 공개범위 및 확인방법 안내","ARU안전과","2026.07.22","PDF","공공시설 ARU 점검결과에서 시설별 점검일과 인증상태, 개선조치 여부를 확인할 수 있도록 공개항목을 정비한다.","보안상 공개가 제한되는 기술정보는 제외하고 시민 안전에 필요한 점검결과를 제공한다.","공개된 결과에 오류가 있는 경우 시설명과 점검일을 적어 정정 요청을 제출할 수 있다."],["27","학교 주변 능력안전구역 운영기준 변경 및 학교 대응절차 안내","생활안전과","2026.07.15","-","학교 주변 능력안전구역의 운영시간을 등하교 시간 중심으로 조정하고 학교별 담당자를 지정한다.","학생 개인의 능력 여부를 확인하는 방식이 아니라 시설 안전관리와 신고체계를 강화하는 방식으로 운영한다.","사고 발생 시 학교 담당자와 지역관리국에 보고하며 학생 개인정보는 별도 보호절차에 따라 관리한다."],["26","해안 관광지 성수기 특별안전관리기간 운영 및 현장 신고 안내","지역대응과","2026.07.08","PDF","7월 15일부터 8월 31일까지 주요 해수욕장과 항만 주변에 임시 안전안내소를 설치한다.","관광객이 몰리는 시간대에는 안전확인 인력을 증원하고 능력활동으로 인한 시설 피해 신고를 현장에서 접수한다.","해상에서 이상 상황이 발생하면 현장 안내요원의 지시에 따르고 필요한 경우 관계기관과 연계한다."],["25","가이드 권익보호 상담기록 개인정보 처리기준 안내","권익보호과","2026.06.30","HWP","가이드 상담기록은 상담 목적에 필요한 범위에서만 수집하고 보존기간이 지나면 정해진 절차에 따라 폐기한다.","상담 내용은 원칙적으로 비공개이며 긴급한 안전조치가 필요한 경우에만 제한적으로 제공될 수 있다.","본인 상담기록의 열람이나 정정이 필요한 경우 본인 확인 후 권익보호과에 신청할 수 있다."],["24","ARU 오작동·이상작동 신고 통합창구 개편 안내","ARU안전과","2026.06.24","PDF","ARU 오작동 신고 창구를 하나로 통합해 장치 위치와 시설정보를 입력하면 관할 기관을 자동으로 확인하도록 개편한다.","신고자는 동일한 내용을 여러 기관에 반복 접수할 필요 없이 하나의 접수번호로 처리상태를 확인할 수 있다.","즉각적인 위험이 있는 경우에는 온라인 신고보다 현장 긴급신고를 우선 이용해야 한다."],["23","지역관리국 민원 처리단계 조회서비스 운영방법 안내","민원총괄과","2026.06.17","-","지역관리국별 민원 처리단계와 평균 처리기간을 누리집에서 확인할 수 있도록 공개 범위를 확대한다.","민원은 접수, 담당자 배정, 관계부서 검토, 처리완료 단계로 관리하며 법정 처리기간이 적용되는 민원은 별도 기준을 따른다.","조사 중인 사건의 세부내용이나 제3자의 개인정보는 처리현황 화면에 표시하지 않는다."],["22","대형 공연장 능력안전 관리지침 개정 및 시설관리자 준수사항 안내","다중이용시설과","2026.06.10","PDF","대형 공연장 운영자는 공연 전 안전계획에 능력활동 발생 시 대피동선과 신고체계를 포함해야 한다.","관객 입장 전 안내방송을 실시하고 비상통로와 ARU 작동상태를 확인하며 현장 신고 담당자를 지정해야 한다.","청은 일률적인 활동 제한 대신 시설 규모와 관객 특성에 맞는 안전계획을 적용하도록 했다."],["21","청소년 능력안전 교육자료 개편에 따른 학교 이용방법 안내","교육운영과","2026.06.03","-","청소년 교육자료를 능력 사용과 신고, 개인정보 보호 사례 중심으로 개편한다.","자료에는 능력 보유 여부를 이유로 타인을 촬영하거나 개인정보를 공유해서는 안 된다는 내용과 사고 신고 절차를 담는다.","학교는 자료를 활용할 수 있으며 학생의 능력정보를 별도로 수집해 청에 제출할 필요는 없다."],["20","산악지역 안전확인 요청 증가에 따른 탐방객 신고요령 안내","지역대응과","2026.05.27","PDF","주요 산악 탐방로의 안전확인 요청 위치정보를 정비하고 표지판의 위치번호를 신고체계와 연계한다.","탐방 중 이상 반응이나 시설 피해를 발견한 경우 위치번호와 함께 신고하면 현장 확인에 도움이 된다.","통신이 불안정한 지역에서는 일행과 함께 이동하고 위험지역에 임의로 접근하지 않도록 안내한다."],["19","찾아가는 등록상담 대상지역 및 방문상담 신청방법 안내","등록관리과","2026.05.20","HWP","찾아가는 등록상담은 등록 절차를 직접 방문하기 어려운 지역을 대상으로 순회 방식으로 운영한다.","신규 등록과 등록정보 정정, 등급판정 신청에 필요한 서류를 현장에서 확인하고 접수 가능한 업무를 안내한다.","방문 일정은 지역별 수요에 따라 정하며 신청자는 본인확인 서류를 준비해야 한다."],["18","대학 캠퍼스 능력안전 담당자 지정 및 사고보고 절차 안내","생활안전과","2026.05.13","-","대학별 능력안전 담당자를 지정해 사고 발생 시 학교와 지역관리국 간 연락체계를 단일화한다.","담당자는 학생 개인의 능력정보를 관리하는 사람이 아니라 시설 안전과 사고보고를 담당한다.","사고가 발생하면 학교 내부 신고와 함께 지역관리국에 안전확인을 요청할 수 있다."],["17","공공시설 ARU 야간 운용기준 변경에 따른 이용자 안내","ARU안전과","2026.05.06","PDF","공공시설의 야간 ARU 운용시간을 시설 이용시간과 연계해 조정하고 변경 시설에는 사전 안내를 실시한다.","운용시간이 변경되어도 이상작동 신고는 24시간 접수하며 시설 주변 소음이나 반복 경보도 신고할 수 있다.","신고할 때 시설 위치와 발생시간을 함께 적으면 현장 확인에 도움이 된다."],["16","공항·항만 능력안전 협력체계 개편 및 해외입국자 안전확인 안내","국제협력과","2026.04.29","PDF","공항과 항만의 능력안전 담당기관 간 연락체계를 통합하고 입국 과정에서 필요한 안전확인 절차를 안내한다.","능력 관련 신고가 필요한 입국자는 안내된 창구를 이용할 수 있으며 개인정보는 목적 범위에서만 처리한다.","공항·항만에서 발생한 안전사고는 시설 운영기관과 지역관리국이 공동으로 현장을 확인한다."],["15","능력 관련 허위정보 신고·정정 요청창구 운영기준 안내","홍보담당관","2026.04.22","-","온라인에서 유통되는 능력 관련 정보 가운데 사실관계 확인이 필요한 내용을 신고할 수 있는 창구를 운영한다.","신고된 내용은 사실 확인 대상이 되며 단순 의견이나 개인 간 분쟁은 조사 대상에서 제외될 수 있다.","공공정보 오류가 확인되면 공식 자료를 통해 사실관계를 정정하거나 안내한다."],["14","지역축제 기간 임시 안전안내소 운영지역 및 이용방법 안내","지역대응과","2026.04.15","HWP","지역축제 기간 행사장 주변에 임시 안전안내소를 설치하고 활동 신고와 안전수칙 안내를 함께 제공한다.","행사 주최자는 비상통로와 대피장소를 지정하고 ARU 운용시설의 점검상태를 행사 전에 확인해야 한다.","관람객은 통제선 안으로 임의 진입하지 말고 이상 상황을 발견하면 현장 안내요원에게 알려야 한다."],["13","능력등급 판정 결과 이의신청 접수기간 및 처리절차 안내","등록관리과","2026.04.08","PDF","능력등급 판정 결과에 이의가 있는 경우 결과 통지일로부터 30일 이내 이의신청서를 제출할 수 있다.","기존 판정자료와 새로 제출한 자료를 함께 검토하며 필요한 경우 재검사를 실시할 수 있다.","접수 여부와 처리결과는 신청인이 부여받은 접수번호로 확인할 수 있다."],["12","서울권역지원센터 방문객 출입동선 변경 및 민원실 이용 안내","서울지역관리국","2026.04.01","-","서울권역지원센터 민원실의 방문객 동선을 변경하고 등록·상담 창구를 층별로 구분한다.","신규 등록과 등급 관련 업무는 안내창구에서 접수한 뒤 담당 창구로 이동하며 개인정보 상담은 별도 공간에서 진행한다.","방문자는 신분증을 지참하고 대리 신청인은 위임 관련 서류를 준비해야 한다."],["11","지역관리국 상황실 시스템 전환에 따른 신고접수 처리기준 안내","상황총괄과","2026.03.25","PDF","상황실 시스템 전환 기간에도 활동 신고와 안전확인 접수는 중단하지 않고 기존 접수체계를 병행 운영한다.","전환 기간에는 일부 처리상태 표시가 늦어질 수 있으나 기존 접수번호와 담당기관 정보는 유지된다.","긴급한 신고는 상황실 전화 또는 긴급신고 체계를 이용하도록 안내한다."],["10","공공시설 ARU 점검정보 시민 확인서비스 운영 확대 안내","ARU안전과","2026.03.18","-","공공시설 ARU 점검상태를 시민이 직접 확인할 수 있는 조회 서비스를 확대한다.","시설명이나 주소를 입력하면 최근 점검일과 인증상태, 개선조치 완료 여부를 확인할 수 있으며 개인 능력정보는 조회되지 않는다.","표시된 정보와 현장 안내가 다른 경우 시설명과 위치를 첨부해 정정 요청을 할 수 있다."],["9","한파 이후 ARU 설치시설 특별점검에 따른 일부 시설 이용제한 안내","시설점검과","2026.03.11","PDF","한파로 전원 및 통신 이상 가능성이 확인된 ARU 설치시설을 특별점검한다.","점검이 끝나지 않은 시설은 장치 운용을 제한할 수 있으며 이용자에게 우회 동선과 임시 안전관리 방법을 안내한다.","시설별 점검 완료 여부는 ARU 시설조회에서 순차적으로 공개한다."],["8","능력안전 행정 표준용어 개정에 따른 민원서식 변경 안내","정책기획과","2026.03.04","HWP","행정문서에서 사용하는 안전관리 용어를 정비해 기관별로 달리 사용하던 표현을 통일한다.","개정 용어는 안전확인, 현장 안정화, 보호관리 등 국민 안내문과 민원서식에서 반복적으로 사용하는 표현에 적용한다.","용어 변경은 기존 등록정보나 개인의 권리·의무를 변경하는 조치가 아니며 서식부터 순차적으로 적용한다."],["7","가이드 동조 관련 권익보호 설명자료 개정 및 제공방법 안내","권익보호과","2026.02.25","PDF","가이드가 동조 과정에서 확인해야 할 권리와 지원절차를 7개 언어로 제공한다.","자료에는 동조 전 설명받아야 할 사항, 동의 철회 방법, 상담 및 권익보호 지원 신청 절차를 담았다.","번역자료는 자료실에서 제공하며 법적 판단이 필요한 경우 한국어 원문을 기준으로 한다."],["6","설 연휴 다중이용시설 특별안전관리기간 및 신고체계 안내","재난대응과","2026.02.11","-","설 연휴 기간 주요 역사와 터미널 등 다중이용시설의 안전확인을 강화한다.","혼잡 시간대에는 현장 안전요원을 추가 배치하고 ARU 시설의 비상정지 상태와 대피동선을 점검한다.","시설 내 이상 상황은 현장 안내요원에게 알리거나 활동 신고를 이용할 수 있으며 긴급 위험은 119·112로 신고한다."],["5","2026년 능력안전 연구지원사업 신청기간 및 지원대상 안내","연구지원과","2026.02.04","PDF","2026년 연구지원사업은 능력 안전성, ARU 신뢰성, 가이드 권익보호 등 3개 분야 18개 과제를 지원한다.","연구기관은 정해진 기간 내 연구계획서를 제출하며 선정 과제에는 연구기간과 결과공개 조건이 적용된다.","개인 식별이 가능한 능력정보를 연구에 사용하는 경우 별도의 보호조치와 동의 절차를 갖춰야 한다."],["4","상반기 찾아가는 능력안전 이동교육 신청기관 모집 안내","교육운영과","2026.01.21","HWP","상반기 이동교육단은 지역 학교와 공공기관의 신청을 받아 현장 교육을 실시한다.","교육은 능력활동 신고방법, 위기경보별 행동요령, 개인정보 보호와 ARU 안전수칙으로 구성된다.","교육 신청은 기관 단위로 가능하며 지역별 일정은 신청 수요를 반영해 확정한다."],["3","공공안전 자율대응장치 안전인증 기준 개정안 행정예고 안내","ARU안전과","2026.01.14","PDF","ARU 안전인증 기준 개정안에 비상정지 기능, 통신장애 대응, 오작동 기록보존 기준을 반영한다.","개정안은 운용기관과 제조·설치업체가 준비할 수 있도록 의견제출 기간을 거쳐 확정할 예정이다.","국민은 개정안 전문과 조문별 설명자료를 확인하고 의견을 제출할 수 있다."],["2","2026년 지역관리국 정기 안전점검 일정 및 국민 확인방법 안내","상황총괄과","2026.01.07","-","2026년 지역관리국 정기 안전점검은 시설점검, 신고처리, 개인정보 관리 분야로 나누어 실시한다.","각 지역관리국은 점검 일정과 주요 결과를 순차적으로 공개하며 즉시 개선이 필요한 사항은 별도 조치한다.","공개된 점검결과에 사실관계 오류가 있는 경우 담당부서에 의견을 제출할 수 있다."],["1","2026년 국민 능력안전 정책자료 공개일정 및 의견제출 안내","정책기획과","2025.12.19","PDF","2026년 공개 예정 정책자료의 월별 공개일정과 의견제출 방법을 사전에 안내한다.","등록·등급, ARU 안전관리, 권익보호, 지역대응체계 자료가 순차적으로 공개된다.","공개된 정책자료에 대한 의견은 자료별 의견제출 기간 안에 온라인으로 제출할 수 있다."]];
function renderNoticeDetail(id){
 const x=NOTICE_DATA[Number(id)]; if(!x)return;
 const deptPhones={"운용기획과":"044-201-3318","권익보호과":"044-201-3416","감독총괄과":"044-201-3351","홍보담당관":"044-201-3452","교육운영과":"044-201-3238","등록관리과":"044-201-3224","재난대응과":"044-201-3271","권역지원과":"044-201-3294","ARU안전과":"044-201-3332","생활안전과":"044-201-3264","지역대응과":"044-201-3287","민원총괄과":"044-201-3407","다중이용시설과":"044-201-3246","국제협력과":"044-201-3471","상황총괄과":"044-201-3274","시설점검과":"044-201-3326","정책기획과":"044-201-3142","연구지원과":"044-201-3167"};
 const phone=deptPhones[x[2]]||'044-201-3001';
 document.getElementById('noticeArticle').innerHTML='<div class="notice-article-meta"><span>공지사항</span><time>'+x[3]+'</time></div><h1>'+x[1]+'</h1><div class="notice-article-info"><span>담당부서 '+x[2]+'</span><span>첨부 '+x[4]+'</span></div><div class="notice-article-body"><p>'+x[5]+'</p><p>'+x[6]+'</p><p>'+x[7]+'</p></div><div class="notice-article-footer"><span>담당부서: '+x[2]+'</span><span>전화 '+phone+'</span><span>최종 수정일: '+x[3]+'</span></div><a class="article-back" href="#notice">목록으로 돌아가기</a>';
}
window.addEventListener('hashchange',()=>{const m=location.hash.match(/^#notice-view\?id=(\d+)/);if(m)renderNoticeDetail(m[1]);});
if(location.hash.startsWith('#notice-view')){const m=location.hash.match(/id=(\d+)/);if(m)renderNoticeDetail(m[1]);}


/* ===== ORIGINAL SCRIPT BLOCK 4 ===== */

(function(){
 const rows=[...document.querySelectorAll('#notice tbody tr[data-notice-row]')];
 const nav=document.getElementById('noticePagination');
 const count=document.querySelector('#notice .board-tools .count');
 const totalPages=Math.ceil(rows.length/10);
 function page(p){
   p=Math.max(1,Math.min(totalPages,p));
   rows.forEach((r,i)=>r.style.display=(i>=(p-1)*10&&i<p*10)?'':'none');
   if(count)count.textContent='전체 36건 · '+p+' / '+totalPages+' 페이지';
   if(nav)nav.innerHTML='<button type="button" data-p="1">«</button><button type="button" data-p="'+Math.max(1,p-1)+'">‹</button>'+Array.from({length:totalPages},(_,i)=>'<button type="button" class="'+(i+1===p?'active':'')+'" data-p="'+(i+1)+'">'+(i+1)+'</button>').join('')+'<button type="button" data-p="'+Math.min(totalPages,p+1)+'">›</button><button type="button" data-p="'+totalPages+'">»</button>';
 }
 nav?.addEventListener('click',e=>{const b=e.target.closest('button[data-p]');if(b)page(+b.dataset.p)});
 page(1);
})();


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


/* ===== ORIGINAL SCRIPT BLOCK 7 ===== */

(function(){
 const f=document.getElementById('civilStatusForm'),r=document.getElementById('civilStatusResult');
 f?.addEventListener('submit',e=>{
  e.preventDefault(); const no=document.getElementById('civilNo').value.trim().toUpperCase();
  const known={'MIN-260930-1842':['등록정보 정정','2026.09.30','검토 중','서울지역관리국'],'MIN-260928-0731':['ARU 시설 점검 요청','2026.09.28','처리완료','경기남부지역관리국'],'MIN-260925-4216':['능력등급 판정 이의신청','2026.09.25','관계부서 검토','등록관리과']};
  const x=known[no]||['안전 관련 민원','2026.09.30','접수 확인 중','관할 지역관리국'];
  r.hidden=false;
  r.innerHTML='<div class="result-head"><span>처리현황 조회</span><b>'+no+'</b></div><dl><div><dt>민원유형</dt><dd>'+x[0]+'</dd></div><div><dt>접수일</dt><dd>'+x[1]+'</dd></div><div><dt>현재 단계</dt><dd>'+x[2]+'</dd></div><div><dt>담당기관</dt><dd>'+x[3]+'</dd></div></dl><p>처리 단계가 변경되면 민원 신청 시 등록한 연락수단을 통해 안내됩니다.</p>';
 });
})();
 const sentinelProfiles=[
  {name:'김도윤',age:'28세',gender:'남성',center:'서울권역지원센터',grade:'S',type:'에너지형',status:'등록·운용',joined:'2021.04.16'},
  {name:'이서윤',age:'24세',gender:'여성',center:'인천·경기권역지원센터',grade:'A',type:'인지·감각형',status:'등록·운용',joined:'2023.08.21'},
  {name:'박준혁',age:'31세',gender:'남성',center:'서울권역지원센터',grade:'B',type:'물리변환형',status:'등록·운용',joined:'2020.11.03'},
  {name:'최하은',age:'22세',gender:'여성',center:'충청권역지원센터',grade:'D',type:'환경영향형',status:'등록·운용',joined:'2025.02.14'},
  {name:'정우진',age:'35세',gender:'남성',center:'강원권역지원센터',grade:'C',type:'공간·이동형',status:'등록·운용',joined:'2019.06.28'},
  {name:'한지민',age:'27세',gender:'여성',center:'서울권역지원센터',grade:'A',type:'생체영향형',status:'등록·운용',joined:'2022.09.07'},
  {name:'오현석',age:'29세',gender:'남성',center:'영남·제주권역지원센터',grade:'B',type:'에너지형',status:'등록·운용',joined:'2021.12.11'},
  {name:'윤채원',age:'26세',gender:'여성',center:'호남권역지원센터',grade:'C',type:'인지·감각형',status:'등록·운용',joined:'2023.03.19'},
  {name:'강민재',age:'33세',gender:'남성',center:'인천·경기권역지원센터',grade:'A',type:'물리변환형',status:'등록·운용',joined:'2020.05.26'},
  {name:'서예린',age:'21세',gender:'여성',center:'서울권역지원센터',grade:'D',type:'공간·이동형',status:'등록·운용',joined:'2025.07.02'}
 ];
 window.__sentinelData=window.__sentinelData||sentinelProfiles;
 function getSentinelData(){return window.__sentinelData||sentinelProfiles}
 function renderSentinelProfile(){
  const panel=document.getElementById('sentinelProfileContent');if(!panel)return;
  const id=new URLSearchParams(location.hash.split('?')[1]||'').get('id'),x=getSentinelData()[Number(id)];
  if(!x){panel.innerHTML='<div class="notice-area">센티넬 정보를 찾을 수 없습니다.</div>';return}
  panel.innerHTML='<div class="sentinel-profile-head"><div class="sentinel-detail-photo">증명사진</div><div><h2>'+x.name+' <span class="sentinel-grade">'+x.grade+'</span></h2><p>'+x.center+' · '+x.status+'</p></div><button type="button" class="profile-admin-edit" data-profile-edit="'+Number(id)+'">정보 수정</button></div><div class="sentinel-profile-table"><div><span>나이</span><b>'+x.age+'</b></div><div><span>성별</span><b>'+x.gender+'</b></div><div><span>소속 센터</span><b>'+x.center+'</b></div><div><span>등급</span><b>'+x.grade+'</b></div><div><span>능력 유형</span><b>'+x.type+'</b></div><div><span>등록 상태</span><b>'+x.status+'</b></div><div><span>최초 등록일</span><b>'+x.joined+'</b></div></div><div class="notice-area"><strong>공개 범위 안내</strong><br>개인의 안전과 권익 보호를 위해 상세 능력 정보 및 개인식별정보는 공개하지 않습니다.</div><a class="back-to-list" href="#sentinels">← 센티넬 목록으로</a>';
 }
 window.__renderSentinelProfile=renderSentinelProfile;
 renderSentinelProfile();
 window.addEventListener('hashchange',renderSentinelProfile);
 // Restore the page represented by the URL hash after refresh/direct navigation.
 if(location.hash){
   const initialId=location.hash.replace('#','').split('?')[0];
   if(document.getElementById(initialId)){
     show(location.hash);
     if(initialId==='searchPage'){
       const initialQuery=new URLSearchParams(location.hash.split('?')[1]||'').get('query')||'';
       if(initialQuery) renderSearch(initialQuery);
     }
   }
 }


/* ===== ORIGINAL SCRIPT BLOCK 8 ===== */

(function(){
const ADMIN_ENABLED = true; // false로 바꾸면 관리자 기능 전체를 숨길 수 있습니다.
const CLOUDINARY_CLOUD = 'dbljkloal';
const CLOUDINARY_PRESET = 'Everything';
const ADMIN_PASS = 'sentinel2026';
const BASE='https://res.cloudinary.com/'+CLOUDINARY_CLOUD+'/image/';
const API=BASE.replace('res.cloudinary.com','api.cloudinary.com/v1_1')+'upload';
const RAW_BASE='https://res.cloudinary.com/'+CLOUDINARY_CLOUD+'/raw/upload/';
const RAW_LIST='https://res.cloudinary.com/'+CLOUDINARY_CLOUD+'/raw/list/sentinel_profile_config_v1.json';
const RAW_API='https://api.cloudinary.com/v1_1/'+CLOUDINARY_CLOUD+'/raw/upload';
const MAX=10*1024*1024, CK='ssa_shared_v2';
const PIXEL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
const $=(q,r=document)=>r.querySelector(q), $$=(q,r=document)=>[...r.querySelectorAll(q)];
let shared={},warned=false;
try{shared=JSON.parse(localStorage.getItem(CK)||'{}')}catch(e){}
const keep=()=>{try{localStorage.setItem(CK,JSON.stringify(shared))}catch(e){}};
const url=(p,w)=>BASE+'upload/c_fill,g_auto,w_'+(w||500)+',h_'+Math.round((w||500)*1.24)+',q_auto,f_auto/v'+p.v+'/'+p.id;
const tag=k=>'ssa_k_'+k;
const rows=[]; // {key,box,btn,del,inp}

function toast(m,err){const t=document.createElement('div');t.className='toast'+(err?' err':'');t.setAttribute('role','status');t.textContent=m;document.body.appendChild(t);setTimeout(()=>t.remove(),3600)}

/* ---------- 화면 반영 ---------- */
function paint(r){
 const p=shared[r.key],box=r.box;let img=$('img',box);
 if(!img){img=document.createElement('img');box.prepend(img)}
 if(p){img.src=url(p);img.hidden=false;img.loading='lazy';img.alt=r.name+' 사진';box.classList.add('has-img');box.dataset.full=url(p,1000)}
 else if(box.dataset.base){img.src=box.dataset.base;img.hidden=false;box.classList.add('has-img');box.dataset.full=box.dataset.base}
 else{img.removeAttribute('src');img.hidden=true;box.classList.remove('has-img');delete box.dataset.full}
}
const paintAll=()=>rows.forEach(paint);

/* ---------- 공유 목록 불러오기 (모든 접속자 공통) ---------- */
async function pull(r){
 try{
  const res=await fetch(BASE+'list/'+tag(r.key)+'.json?_='+Math.floor(Date.now()/20000),{cache:'no-store'});
  if(!res.ok)throw new Error(res.status);
  const j=await res.json(),a=(j.resources||[]).sort((x,y)=>y.version-x.version)[0];
  if(!a||a.width===1&&a.height===1)delete shared[r.key];
  else shared[r.key]={id:a.public_id,v:a.version};
  return true;
 }catch(e){return e.message==='404'}
}
async function sync(){
 const ok=await Promise.all(rows.map(pull));
 if(ok.some(x=>!x))warned=true;
 keep();paintAll();document.body.classList.remove('photos-loading');
 if(window.__profilePhoto)window.__profilePhoto();
}

/* ---------- 업로드 ---------- */
function send(r,file,remove){
 const fd=new FormData();fd.append('file',file);fd.append('upload_preset',CLOUDINARY_PRESET);fd.append('folder','sentinel');fd.append('tags','ssa_photo,'+tag(r.key));
 const bar=document.createElement('div');bar.className='photo-bar';r.box.appendChild(bar);r.box.classList.add('uploading');
 const x=new XMLHttpRequest();x.open('POST',API);
 const done=()=>{bar.remove();r.box.classList.remove('uploading');paint(r)};
 x.upload.onprogress=e=>{if(e.lengthComputable)bar.style.width=(e.loaded/e.total*100)+'%'};
 x.onload=()=>{try{const j=JSON.parse(x.responseText);if(x.status<200||x.status>=300||!j.public_id)throw new Error((j.error&&j.error.message)||x.status);if(remove)delete shared[r.key];else shared[r.key]={id:j.public_id,v:j.version};keep();done();toast(remove?'사진이 삭제되었습니다.':'사진이 등록되었습니다. 모든 접속자에게 표시됩니다.')}catch(e){done();toast('업로드 실패: '+e.message,1)}};
 x.onerror=()=>{done();toast('네트워크 오류로 처리하지 못했습니다.',1)};x.send(fd);
}
function pick(r,f){
 if(!/^image\//.test(f.type))return toast('이미지 파일만 등록할 수 있습니다.',1);
 if(f.size>MAX)return toast('10MB 이하 사진만 등록할 수 있습니다.',1);
 send(r,f,false);
}

/* ---------- 행 초기화 ---------- */
function init(sel,photoSel,keyFn){
 $$(sel).forEach((row,i)=>{
  const box=$(photoSel,row),nm=$('strong',row);if(!box||!nm)return;
  const r={key:keyFn(row,i,nm),name:nm.textContent.trim(),box,row},im=$('img',box);
  if(im&&im.getAttribute('src'))box.dataset.base=im.getAttribute('src');
  const link=$('.sentinel-detail-btn',row),hh=link?link.getAttribute('href'):(row.dataset.sentinelHref||row.dataset.apostleHref||'');if(hh)row.dataset.href=hh;row.tabIndex=0;row.setAttribute('role','link');
  r.inp=document.createElement('input');r.inp.type='file';r.inp.accept='image/*';r.inp.hidden=true;
  r.inp.onchange=()=>{if(r.inp.files[0])pick(r,r.inp.files[0]);r.inp.value=''};
  box.addEventListener('click',e=>{if(!document.body.classList.contains('photo-admin'))return;e.stopPropagation();r.inp.click()});
  row.appendChild(r.inp);rows.push(r);
 });
}
init('.sentinel-row','.sentinel-photo',(row,i)=>'s'+i);
init('.apostle-row','.apostle-photo',(row,i,nm)=>'a'+nm.textContent.replace(/[^A-Za-z0-9]/g,'').toLowerCase());

/* ---------- 행 클릭 → 상세 ---------- */
const go=e=>{const r=e.target.closest('[data-href]');if(!r||e.target.closest('.row-actions')||e.target.closest('input[type="file"]')||e.target.closest('.admin-edit-btn'))return;
 if(e.type==='keydown'&&e.key!=='Enter')return;location.hash=r.dataset.href};
document.addEventListener('click',go);document.addEventListener('keydown',go);

/* ---------- 검색 ---------- */
[['.sentinel-list','이름·센터로 검색'],['.apostle-list','코드·등급·지역으로 검색']].forEach(([q,ph])=>{
 const l=$(q);if(!l)return;
 const i=document.createElement('input');i.type='search';i.className='list-search';i.placeholder=ph;i.setAttribute('aria-label',ph);
 const em=document.createElement('p');em.className='list-empty';em.hidden=true;em.textContent='검색 결과가 없습니다.';
 i.oninput=()=>{const v=i.value.trim().toLowerCase();let n=0;
  [...l.children].forEach(c=>{const m=!v||c.textContent.toLowerCase().includes(v);c.hidden=!m;if(m)n++});em.hidden=n>0};
 l.before(i);l.after(em);
});

/* ---------- 확대 보기 ---------- */
document.addEventListener('click',e=>{
 const b=e.target.closest('.sentinel-detail-photo img');if(!b)return;
 const src=b.dataset?.full||b.src;if(!src)return;
 const o=document.createElement('div');o.className='lightbox';o.setAttribute('role','dialog');o.setAttribute('aria-label','사진 확대');
 const im=new Image();im.src=src;im.alt='확대 사진';o.appendChild(im);
 const close=()=>{o.remove();removeEventListener('keydown',k)},k=ev=>{if(ev.key==='Escape')close()};
 o.onclick=close;addEventListener('keydown',k);document.body.appendChild(o);
});

/* ---------- 상세페이지 사진 ---------- */
window.__profilePhoto=function(){
 const ap=$('#apostleProfileContent .sentinel-detail-photo');
 if(ap){const w=$$('.apostle-row')[+new URLSearchParams(location.hash.split('?')[1]||'').get('id')],im=w&&$('.apostle-photo img',w);
  if(im&&im.getAttribute('src')&&!$('img',ap)){ap.textContent='';const i=new Image();i.src=im.src;i.alt='괴수 사진';ap.appendChild(i)}}
 const p=$('#sentinelProfileContent .sentinel-detail-photo');if(!p)return;
 const id=new URLSearchParams(location.hash.split('?')[1]||'').get('id'),w=$$('.sentinel-row')[+id],im=w&&$('.sentinel-photo img',w);
 if(im&&im.getAttribute('src')&&!$('img',p)){p.textContent='';const i=new Image();i.src=im.src;i.alt='증명사진';p.appendChild(i)}
};
addEventListener('hashchange',()=>{setTimeout(window.__profilePhoto,0);window.__renderSentinelProfile?.();ensureEditButtons()});

/* ===== ADMIN MODE START ===== */
let profileSaveBusy=false;
function currentProfiles(){return(window.__sentinelData||sentinelProfiles).map(x=>({...x}))}
function applyProfiles(){
 const data=currentProfiles();
 $$('.sentinel-row').forEach((row,i)=>{const x=data[i];if(!x)return;const strong=$('.sentinel-info>strong',row),dds=$$('.sentinel-info dd',row);if(strong)strong.textContent=x.name||'-';if(dds[0])dds[0].textContent=x.age||'-';if(dds[1])dds[1].textContent=x.gender||'-';if(dds[2])dds[2].textContent=x.center||'-';row.querySelector('.sentinel-photo')?.setAttribute('aria-label',(x.name||'센티넬')+' 사진');const edit=row.querySelector('.admin-edit-btn');if(edit)edit.dataset.profileEdit=i});
 if(window.__renderSentinelProfile)window.__renderSentinelProfile();ensureEditButtons();
}
function ensureEditButtons(){
 $$('.sentinel-row').forEach((row,i)=>{let b=row.querySelector('.admin-edit-btn');if(document.body.classList.contains('photo-admin')){if(!b){b=document.createElement('button');b.type='button';b.className='admin-edit-btn';b.textContent='정보 수정';b.dataset.profileEdit=i;b.onclick=e=>{e.preventDefault();e.stopPropagation();openProfileEditor(i)};row.appendChild(b)}}else if(b)b.remove()});
}
function profileModal(){
 let m=document.getElementById('sentinelAdminModal');if(m)return m;
 m=document.createElement('div');m.id='sentinelAdminModal';m.className='admin-modal';m.hidden=true;
 m.innerHTML='<div class="admin-modal-card" role="dialog" aria-modal="true" aria-labelledby="adminModalTitle"><div class="admin-modal-head"><strong id="adminModalTitle">센티넬 정보 수정</strong><button type="button" class="admin-modal-close" aria-label="닫기">×</button></div><form class="admin-form" id="sentinelAdminForm"><div class="admin-form-grid"><label>이름<input name="name" required></label><label>나이<input name="age"></label><label>성별<input name="gender"></label><label>소속 센터<input name="center"></label><label>등급<input name="grade"></label><label>능력 유형<input name="type"></label><label>등록 상태<input name="status"></label><label>최초 등록일<input name="joined"></label></div><div class="admin-note">사진은 별도 버튼 없이 사진 영역을 클릭해서 바로 등록하거나 변경할 수 있습니다.</div><div class="admin-form-actions"><button type="button" class="admin-cancel">취소</button><button type="submit" class="primary">저장</button></div></form></div>';
 document.body.appendChild(m);const close=()=>{m.hidden=true};$('.admin-modal-close',m).onclick=close;$('.admin-cancel',m).onclick=close;m.addEventListener('click',e=>{if(e.target===m)close()});
 $('#sentinelAdminForm',m).addEventListener('submit',async e=>{e.preventDefault();const idx=Number(m.dataset.index),data=currentProfiles(),x=data[idx];if(!x)return;const fd=new FormData(e.currentTarget),next={...x};['name','age','gender','center','grade','type','status','joined'].forEach(k=>next[k]=String(fd.get(k)||'').trim());data[idx]=next;window.__sentinelData=data;applyProfiles();close();window.__ssaSync&&window.__ssaSync();await saveProfiles(data)});
 return m;
}
function openProfileEditor(i){
 if(!document.body.classList.contains('photo-admin'))return;const data=currentProfiles(),x=data[i];if(!x)return;const m=profileModal();m.dataset.index=i;const form=$('#sentinelAdminForm',m);['name','age','gender','center','grade','type','status','joined'].forEach(k=>form.elements[k].value=x[k]||'');m.hidden=false;form.elements.name.focus();
}
async function loadProfiles(){
 try{const res=await fetch(RAW_LIST+'?_='+Date.now(),{cache:'no-store'});if(!res.ok)throw Error(res.status);const j=await res.json(),a=(j.resources||[]).sort((x,y)=>(y.version||0)-(x.version||0))[0];if(!a)return;const p=await fetch(RAW_BASE+'v'+a.version+'/'+a.public_id+'?_='+Date.now(),{cache:'no-store'}).then(x=>x.json());if(!window.__ssaOwned&&Array.isArray(p.profiles)&&p.profiles.length){window.__sentinelData=p.profiles;localStorage.setItem('sentinel_profiles_cache',JSON.stringify(p.profiles));applyProfiles()}}
 catch(e){try{const p=JSON.parse(localStorage.getItem('sentinel_profiles_cache')||'null');if(!window.__ssaOwned&&Array.isArray(p)){window.__sentinelData=p;applyProfiles()}}catch(_){}}
}
async function saveProfiles(data){
 if(profileSaveBusy)return;profileSaveBusy=true;const payload=JSON.stringify({version:1,updatedAt:new Date().toISOString(),profiles:data});
 try{const id='sentinel-profiles-'+Date.now()+'.json',blob=new Blob([payload],{type:'application/json'}),fd=new FormData();fd.append('file',blob,id);fd.append('upload_preset',CLOUDINARY_PRESET);fd.append('public_id',id);fd.append('folder','sentinel-config');fd.append('tags','sentinel_profile_config_v1');const res=await fetch(RAW_API,{method:'POST',body:fd}),j=await res.json();if(!res.ok||!j.public_id)throw Error(j.error?.message||res.status);localStorage.setItem('sentinel_profiles_cache',payload);toast('센티넬 정보가 저장되었습니다. 모든 접속자에게 반영됩니다.')}
 catch(e){localStorage.setItem('sentinel_profiles_cache',payload);toast('공유 저장에 실패해 이 기기에만 임시 저장되었습니다.',1)}
 finally{profileSaveBusy=false}
}
function admin(on){
 document.body.classList.toggle('photo-admin',on);const b=document.getElementById('adminModeBtn');if(b){b.textContent=on?'관리자 모드 종료':'관리자 모드';b.classList.toggle('active',on)}ensureEditButtons();if(on){profileModal();toast('관리자 모드가 켜졌습니다. 사진 영역을 눌러 사진을 등록하세요.')}else{const m=document.getElementById('sentinelAdminModal');if(m)m.hidden=true}
}
function enterAdmin(){
 if(!ADMIN_ENABLED)return;
 if(document.body.classList.contains('photo-admin')){
  sessionStorage.removeItem('ssa_admin');
  admin(false);
  return;
 }
 sessionStorage.setItem('ssa_admin','1');
 admin(true);
}
document.getElementById('adminModeBtn')?.addEventListener('click',enterAdmin);
document.getElementById('adminModeBtnMobile')?.addEventListener('click',e=>{e.stopPropagation();enterAdmin()});
document.querySelectorAll('.apostle-row[data-apostle-href]').forEach(row=>{
 row.addEventListener('click',e=>{
  location.hash=row.dataset.apostleHref;
  
 });
 row.addEventListener('keydown',e=>{
  if(e.key==='Enter'||e.key===' '){e.preventDefault();location.hash=row.dataset.apostleHref;show(row.dataset.apostleHref)}
 });
});
document.querySelectorAll('.sentinel-row[data-sentinel-href]').forEach(row=>{
 row.addEventListener('click',e=>{
  if(e.target.closest('button,a,input,select,textarea,[data-profile-edit]'))return;
  location.hash=row.dataset.sentinelHref;
  
 });
 row.addEventListener('keydown',e=>{
  if(e.key==='Enter'||e.key===' '){
   e.preventDefault();
   location.hash=row.dataset.sentinelHref;
   
  }
 });
});
document.addEventListener('click',e=>{
 const b=e.target.closest('[data-profile-edit]');if(b&&document.body.classList.contains('photo-admin')){e.preventDefault();e.stopPropagation();openProfileEditor(Number(b.dataset.profileEdit))}
 const box=e.target.closest('#sentinelProfileContent .sentinel-detail-photo');if(box&&document.body.classList.contains('photo-admin')){const id=Number(new URLSearchParams(location.hash.split('?')[1]||'').get('id'));window.__ssaPick&&window.__ssaPick('s',id)}
});
if(!ADMIN_ENABLED){document.getElementById('adminModeBtn')?.remove();sessionStorage.removeItem('ssa_admin')}else if(sessionStorage.getItem('ssa_admin'))admin(true);
/* ===== ADMIN MODE END ===== */
document.body.classList.add('photos-loading');
paintAll();sync();loadProfiles();ensureEditButtons();
setInterval(()=>{if(!document.hidden){sync();loadProfiles()}},120000);
})();


/* ===== ORIGINAL SCRIPT BLOCK 9 ===== */

(function(){
const box=document.getElementById('apostleProfileContent');
function render(){
 if(!box)return;
 const X=v=>String(v==null?'':v).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const id=+new URLSearchParams(location.hash.split('?')[1]||'').get('id'),r=document.querySelectorAll('.apostle-row')[id];
 if(!r){box.innerHTML='<div class="notice-area">괴수 정보를 찾을 수 없습니다.</div>';return}
 const dd=[...r.querySelectorAll('.apostle-info dd')].map(x=>x.textContent.trim()),code=r.querySelector('strong').textContent.trim(),ds=r.dataset,
  grade=dd[0]||'-',st=dd[1]||'-',rg=dd[2]||'-',type=ds.type||code,m=code.match(/(\d\d)(\d\d)(\d\d)$/),
  joined=ds.joined||(m?'20'+m[1]+'.'+m[2]+'.'+m[3]:'-'),sp=ds.special||'해당 없음',
  row=(k,v,f)=>'<div data-f="'+f+'"><span>'+k+'</span><b>'+X(v)+'</b></div>';
 box.dataset.id=id;
 box.innerHTML='<div class="sentinel-profile-head"><div class="sentinel-detail-photo">사진</div><div><h2 data-f="code">'+X(code)+' <span class="sentinel-grade" data-f="grade">'+X(grade)+'</span></h2><p data-f="rg">'+X(rg)+' · '+X(st)+'</p></div><button type="button" class="admin-only prof-edit">정보 수정</button></div><div class="sentinel-profile-table">'
  +row('괴수 코드',code,'code')+row('등급',grade,'grade')+row('능력 유형',type,'type')+row('관리 상태',st,'st')+row('관할 지역',rg,'rg')+row('최초 등록일',joined,'joined')+row('특이 구분',sp,'special')
  +'</div><div class="notice-area"><strong>공개 범위 안내</strong><br>괴수의 개인식별정보와 상세 능력 정보는 공개하지 않으며, 등록 코드를 기준으로 기본정보만 안내합니다.</div><a class="back-to-list" href="#apostles">← 괴수 목록으로</a>';
 if(window.__profilePhoto)window.__profilePhoto();
}
box&&box.addEventListener('click',e=>{
 if(!document.body.classList.contains('photo-admin'))return;
 const t=e.target.closest('[data-f],.prof-edit');if(!t)return;
 window.__ssaEditA&&window.__ssaEditA(+box.dataset.id,t.dataset.f||'code');
});
addEventListener('hashchange',render);render();
/* 더블탭·핀치 확대 방지 (iOS) */
['gesturestart','gesturechange'].forEach(t=>document.addEventListener(t,e=>e.preventDefault()));
let lt=0;document.addEventListener('touchend',e=>{const n=Date.now();if(n-lt<350)e.preventDefault();lt=n},{passive:false});
const fl=document.querySelector('.footer-links .container');

})();


/* ===== ORIGINAL SCRIPT BLOCK 10 ===== */

(function(){
const $=(q,r=document)=>r.querySelector(q),$$=(q,r=document)=>[...r.querySelectorAll(q)];
const CL='dbljkloal',TAG='ssa_lists_v1',LK='ssa_lists_cache';
const LIST='https://res.cloudinary.com/'+CL+'/raw/list/'+TAG+'.json',RB='https://res.cloudinary.com/'+CL+'/raw/upload/',RAPI='https://api.cloudinary.com/v1_1/'+CL+'/raw/upload';
const E=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const adm=()=>document.body.classList.contains('photo-admin');
let M=null,tm;
const SF=[['name','이름'],['age','나이'],['gender','성별'],['center','소속 센터'],['grade','등급'],['type','능력 유형'],['status','등록 상태'],['joined','등록일']],
AF=[['code','괴수 코드'],['grade','등급'],['type','능력 유형'],['st','관리 상태'],['rg','관할 지역'],['joined','최초 등록일'],['special','특이 구분']];
function toast(m,e){const d=document.createElement('div');d.className='ssa-toast'+(e?' e':'');d.textContent=m;document.body.appendChild(d);setTimeout(()=>d.remove(),3200)}
const BAR='<div class="adm-bar"><button type="button" data-a="photo">사진 변경</button><button type="button" data-a="nophoto">사진 삭제</button><button type="button" data-a="edit">수정</button><button type="button" class="d" data-a="del">삭제</button></div>';
const ph=(c,s,img)=>'<div class="'+c+(img?' has-img':'')+'"><img src="'+E(img)+'" alt=""'+(img?'':' hidden')+'><span>'+s+'</span></div>';
const sRow=(x,i)=>{const p=x.p,h='#sentinel-profile?id='+i;return '<article class="sentinel-row" data-href="'+h+'" tabindex="0" role="link">'+ph('sentinel-photo','증명사진',x.img)+'<div class="sentinel-info"><strong>'+E(p.name)+'</strong><dl><div><dt>나이</dt><dd>'+E(p.age)+'</dd></div><div><dt>성별</dt><dd>'+E(p.gender)+'</dd></div><div><dt>센터</dt><dd>'+E(p.center)+'</dd></div></dl></div>'+BAR+'</article>'};
const aRow=(x,i)=>{const h='#apostle-profile?id='+i;return '<article class="apostle-row" data-href="'+h+'" data-type="'+E(x.type)+'" data-joined="'+E(x.joined)+'" data-special="'+E(x.special)+'" tabindex="0" role="link">'+ph('apostle-photo','괴수 이미지',x.img)+'<div class="apostle-info"><strong>'+E(x.code)+'</strong><dl><div><dt>등급</dt><dd>'+E(x.grade)+'</dd></div><div><dt>상태</dt><dd>'+E(x.st)+'</dd></div><div><dt>관할 지역</dt><dd>'+E(x.rg)+'</dd></div></dl></div>'+BAR+'</article>'};
function adopt(){const d=window.__sentinelData||[];M={s:$$('.sentinel-row').map((r,i)=>({p:{...(d[i]||{})},img:$('.sentinel-photo img',r)?.getAttribute('src')||''})),a:$$('.apostle-row').map(r=>{const dd=$$('.apostle-info dd',r).map(x=>x.textContent.trim()),code=($('strong',r)||{textContent:''}).textContent.trim(),mm=code.match(/(\d\d)(\d\d)(\d\d)$/);return {code,grade:dd[0]||'',type:r.dataset.type||code,st:dd[1]||'',rg:dd[2]||'',joined:r.dataset.joined||(mm?'20'+mm[1]+'.'+mm[2]+'.'+mm[3]:'-'),special:r.dataset.special||'해당 없음',img:$('.apostle-photo img',r)?.getAttribute('src')||''}})}}
function ensure(){if(M)return true;if(document.body.classList.contains('photos-loading')){toast('사진을 불러오는 중입니다. 잠시 후 다시 눌러주세요.',1);return false}adopt();render();return true}
function addBtns(){[['s','.sentinel-list','센티넬'],['a','.apostle-list','괴수']].forEach(([k,q,n])=>{const l=$(q);if(!l||$('.adm-add[data-k="'+k+'"]'))return;const b=document.createElement('button');b.type='button';b.className='adm-add';b.dataset.k=k;b.textContent='＋ '+n+' 추가';const em=l.nextElementSibling;(em&&em.classList.contains('list-empty')?em:l).after(b)})}
function render(){window.__ssaOwned=true;const S=$('.sentinel-list'),A=$('.apostle-list');if(S)S.innerHTML=M.s.map(sRow).join('');if(A){M.a.sort((x,y)=>{const ax=parseInt(String(x.grade||'').match(/\\d+/)?.[0]||'999',10),ay=parseInt(String(y.grade||'').match(/\\d+/)?.[0]||'999',10);return ax-ay});A.innerHTML=M.a.map(aRow).join('')}window.__sentinelData=M.s.map(x=>({...x.p}));addBtns();if(/profile/.test(location.hash))dispatchEvent(new Event('hashchange'))}
async function upload(){const id='ssa-lists-'+Date.now()+'.json',payload=JSON.stringify({v:2,M}),fd=new FormData();fd.append('file',new Blob([payload],{type:'application/json'}),id);fd.append('upload_preset','Everything');fd.append('public_id',id);fd.append('folder','sentinel-config');fd.append('tags',TAG);try{const r=await fetch(RAPI,{method:'POST',body:fd}),j=await r.json();if(!r.ok||!j.public_id)throw new Error(j.error?.message||r.status);toast('저장되었습니다. 모든 접속자에게 반영됩니다.')}catch(e){toast('공유 설정 저장 실패: '+e.message,1)}}
function persist(){try{localStorage.setItem(LK,JSON.stringify(M))}catch(e){toast('저장 공간이 부족합니다.',1)}clearTimeout(tm);tm=setTimeout(upload,700)}
const commit=()=>{render();persist()};
function shrink(f){return new Promise((ok,no)=>{const im=new Image(),u=URL.createObjectURL(f);im.onload=()=>{const W=800,H=992,c=document.createElement('canvas');c.width=W;c.height=H;const ctx=c.getContext('2d'),s=Math.max(W/im.width,H/im.height),w=Math.round(im.width*s),h=Math.round(im.height*s);ctx.drawImage(im,(W-w)/2,(H-h)/2,w,h);URL.revokeObjectURL(u);c.toBlob(b=>b?ok(b):no(new Error('이미지 변환 실패')),'image/jpeg',.9)};im.onerror=no;im.src=u})}
async function uploadPhoto(file,kind,index){
 const form=new FormData();
 form.append('file',file);
 form.append('upload_preset','Everything');
 form.append('folder','sentinel/photos');
 form.append('tags','ssa_photo,'+kind+'_'+index);
 const res=await fetch('https://api.cloudinary.com/v1_1/'+CL+'/image/upload',{method:'POST',body:form});
 const j=await res.json();
 if(!res.ok||!j.secure_url)throw new Error(j.error?.message||'사진 업로드 실패');
 return {url:j.secure_url,public_id:j.public_id,version:j.version||Date.now()};
}
async function pick(k,i){const f=document.createElement('input');f.type='file';f.accept='image/*';f.onchange=async()=>{if(!f.files[0]||!ensure())return;try{const blob=await shrink(f.files[0]);toast('사진을 서버에 업로드하는 중입니다.');const p=await uploadPhoto(blob,k,i);M[k][i].img=p.url;commit()}catch(e){toast('사진 업로드 실패: '+e.message,1)}};f.click()}
window.__ssaPick=pick;window.__ssaEditA=(i,f)=>{if(!ensure()||!M.a[i])return;modal('a',i);const m=document.getElementById('ssaModal'),inp=m&&m.querySelector('input[name="'+f+'"]');inp&&inp.focus()};
window.__ssaSync=()=>{if(!ensure())return;const d=window.__sentinelData||[];M.s.forEach((x,i)=>{if(d[i])x.p={...d[i]}});commit()};
function modal(k,i){let m=$('#ssaModal');if(m)m.remove();m=document.createElement('div');m.id='ssaModal';m.className='admin-modal';const o=k==='s'?M.s[i].p:M.a[i],F=k==='s'?SF:AF;
m.innerHTML='<div class="admin-modal-card"><div class="admin-modal-head"><strong>'+(k==='s'?'센티넬':'괴수')+' 정보 수정</strong><button type="button" class="admin-modal-close">×</button></div><form class="admin-form"><div class="admin-form-grid">'+F.map(([n,l])=>'<label>'+l+'<input name="'+n+'" value="'+E(o[n])+'"></label>').join('')+'</div><div class="admin-form-actions"><button type="button" class="c">취소</button><button class="primary">저장</button></div></form></div>';
document.body.appendChild(m);const x=()=>m.remove();$('.admin-modal-close',m).onclick=x;$('.c',m).onclick=x;m.onclick=e=>{if(e.target===m)x()};
$('form',m).onsubmit=e=>{e.preventDefault();const fd=new FormData(e.target);F.forEach(([n])=>o[n]=String(fd.get(n)||'').trim());x();commit()}}
function act(k,i,a){if(a==='photo')return pick(k,i);if(!ensure())return;
if(a==='nophoto'){M[k][i].img='';commit()}
else if(a==='edit')modal(k,i)
else if(a==='del'){if(confirm('이 항목을 삭제할까요?')){M[k].splice(i,1);commit()}}
else if(a==='add'){M[k].push(k==='s'?{p:{name:'새 센티넬',age:'-',gender:'-',center:'-',grade:'-',type:'-',status:'등록·운용',joined:'-'},img:''}:{code:'SA-'+new Date().toISOString().slice(2,10).replace(/-/g,''),grade:'3등급',type:'-',st:'등록',rg:'지역',joined:'-',special:'해당 없음',img:''});commit();modal(k,M[k].length-1)}}
document.addEventListener('click',e=>{if(!adm())return;const t=e.target,add=t.closest('.adm-add');if(add){e.preventDefault();e.stopImmediatePropagation();return act(add.dataset.k,0,'add')}
const row=t.closest('.sentinel-row,.apostle-row');if(!row)return;const b=t.closest('.adm-bar button'),p=t.closest('.sentinel-photo,.apostle-photo');if(!b&&!p)return;
e.preventDefault();e.stopImmediatePropagation();const k=row.classList.contains('sentinel-row')?'s':'a',i=$$(k==='s'?'.sentinel-row':'.apostle-row').indexOf(row);act(k,i,b?b.dataset.a:'photo')},true);
let tries=0;function watch(){const on=adm(),b=$('#adminModeBtnMobile');if(b){b.textContent=on?'관리자 종료':'관리자 모드';b.classList.toggle('active',on)}if(on&&!M&&!document.body.classList.contains('photos-loading'))ensure();else if(on&&!M&&tries++<20)setTimeout(watch,800)}
new MutationObserver(()=>{tries=0;watch()}).observe(document.body,{attributes:true,attributeFilter:['class']});
addBtns();watch();
(async function(){try{const c=JSON.parse(localStorage.getItem(LK)||'null');if(c&&c.s){M=c;render()}}catch(e){}
try{const r=await fetch(LIST+'?_='+Date.now(),{cache:'no-store'});if(!r.ok)throw 0;const j=await r.json(),a=(j.resources||[]).sort((x,y)=>(y.version||0)-(x.version||0))[0];if(!a)return;const p=await fetch(RB+'v'+a.version+'/'+a.public_id+'?_='+Date.now(),{cache:'no-store'}).then(x=>x.json());if(p.M&&p.M.s){M=p.M;render();try{localStorage.setItem(LK,JSON.stringify(M))}catch(e){}}}catch(e){}})();
})();


/* ===== ORIGINAL SCRIPT BLOCK 11 ===== */

(function(){
const go=e=>{
 const r=e.target.closest('[data-apostle-href],[data-sentinel-href],.apostle-row[data-href],.sentinel-row[data-href]');
 if(!r||e.target.closest('button,input,select,textarea,a,.adm-bar,.admin-edit-btn'))return;
 if(document.body.classList.contains('photo-admin')&&e.target.closest('.apostle-photo,.sentinel-photo'))return;
 if(e.type==='keydown'&&e.key!=='Enter'&&e.key!==' ')return;
 e.preventDefault();
 const h=r.dataset.apostleHref||r.dataset.sentinelHref||r.dataset.href;
 if(h&&location.hash!==h)location.hash=h;
};
document.addEventListener('click',go);document.addEventListener('keydown',go);
})();


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
function renderRuleDetail(id){
 const x=RULE_DATA[Number(id)];if(!x)return;
 document.getElementById('ruleArticle').innerHTML='<div class="press-article-meta"><span>'+x[1]+'</span><time>'+x[2]+'</time></div><h1>'+x[0]+'</h1><div class="press-article-info"><span>발령부서 '+x[4]+'</span><span>발령일 '+x[2]+'</span></div><div class="press-article-body"><h3>주요 내용</h3><p>'+x[3]+'</p><h3>적용 범위</h3><p>센티넬안전관리청 및 관련 지역관리국의 해당 업무 처리에 적용됩니다.</p><h3>담당 부서</h3><p>'+x[4]+'</p></div>';
}
document.addEventListener('click',e=>{
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
