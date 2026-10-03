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
 const guideProfiles=[
 {name:'김하린',age:'26세',gender:'여성',center:'서울권역지원센터',grade:'A',type:'공명 동조형',status:'등록·운용',joined:'2022.05.18'},
 {name:'박서준',age:'30세',gender:'남성',center:'인천·경기권역지원센터',grade:'B',type:'감응 안정형',status:'등록·운용',joined:'2021.09.04'},
 {name:'이유진',age:'23세',gender:'여성',center:'서울권역지원센터',grade:'B',type:'정신 동조형',status:'등록·운용',joined:'2024.01.22'},
 {name:'최민석',age:'34세',gender:'남성',center:'충청권역지원센터',grade:'C',type:'감각 증폭형',status:'등록·운용',joined:'2020.07.11'},
 {name:'정다은',age:'25세',gender:'여성',center:'강원권역지원센터',grade:'B',type:'공명 동조형',status:'등록·운용',joined:'2023.11.09'},
 {name:'한도현',age:'29세',gender:'남성',center:'영남·제주권역지원센터',grade:'A',type:'감응 안정형',status:'등록·운용',joined:'2021.03.27'},
 {name:'윤서아',age:'22세',gender:'여성',center:'호남권역지원센터',grade:'D',type:'감각 보조형',status:'등록·운용',joined:'2025.08.16'},
 {name:'강지훈',age:'32세',gender:'남성',center:'인천·경기권역지원센터',grade:'C',type:'정신 동조형',status:'등록·운용',joined:'2022.12.03'},
 {name:'송예은',age:'27세',gender:'여성',center:'충청권역지원센터',grade:'B',type:'공명 동조형',status:'등록·운용',joined:'2024.04.15'},
 {name:'오준호',age:'36세',gender:'남성',center:'영남·제주권역지원센터',grade:'D',type:'감응 안정형',status:'등록·운용',joined:'2019.10.21'}
];
window.__guideData=window.__guideData||guideProfiles;
function getGuideData(){return window.__guideData||guideProfiles}
function renderGuideProfile(){
 const panel=document.getElementById('guideProfileContent');if(!panel)return;
 const id=new URLSearchParams(location.hash.split('?')[1]||'').get('id'),x=getGuideData()[Number(id)];
 if(!x){panel.innerHTML='<div class="notice-area">가이드 정보를 찾을 수 없습니다.</div>';return}
 const gradeClass=String(x.grade||'').toUpperCase().replace(/[^A-Z]/g,'');
 const photoHtml='<div class="sentinel-detail-photo">증명사진</div>';
 panel.innerHTML='<div class="sentinel-profile-head"><div class="sentinel-detail-photo-wrap">'+photoHtml+'</div><div><h2>'+x.name+' <span class="sentinel-grade grade-'+gradeClass+'">'+x.grade+'</span></h2><p>'+x.center+' · '+x.status+'</p></div></div><div class="sentinel-profile-table"><div><span>나이</span><b>'+x.age+'</b></div><div><span>성별</span><b>'+x.gender+'</b></div><div><span>소속 센터</span><b>'+x.center+'</b></div><div><span>등급</span><b>'+x.grade+'</b></div><div><span>가이드 유형</span><b>'+x.type+'</b></div><div><span>등록 상태</span><b>'+x.status+'</b></div><div><span>최초 등록일</span><b>'+x.joined+'</b></div></div><div class="notice-area"><strong>공개 범위 안내</strong><br>개인의 안전과 권익 보호를 위해 상세 능력 정보 및 개인식별정보는 공개하지 않습니다.</div><a class="back-to-list" href="#guides">← 가이드 목록으로</a>';
}
window.__renderGuideProfile=renderGuideProfile;
renderGuideProfile();
window.addEventListener('hashchange',renderGuideProfile);

const sentinelProfiles=[
  {name:'김도윤',age:'28세',gender:'남성',center:'서울권역지원센터',grade:'S',type:'에너지형',status:'등록·운용',joined:'2021.04.16'},
  {name:'이서윤',age:'24세',gender:'여성',center:'인천·경기권역지원센터',grade:'A',type:'인지·감각형',status:'등록·운용',joined:'2023.08.21'},
  {name:'박준혁',age:'31세',gender:'남성',center:'서울권역지원센터',grade:'B',type:'물리변환형',status:'등록·운용',joined:'2020.11.03'},
  {name:'최하은',age:'22세',gender:'여성',center:'충청권역지원센터',grade:'B',type:'환경영향형',status:'등록·운용',joined:'2025.02.14'},
  {name:'정우진',age:'35세',gender:'남성',center:'강원권역지원센터',grade:'B',type:'공간·이동형',status:'등록·운용',joined:'2019.06.28'},
  {name:'한지민',age:'27세',gender:'여성',center:'서울권역지원센터',grade:'A',type:'생체영향형',status:'등록·운용',joined:'2022.09.07'},
  {name:'오현석',age:'29세',gender:'남성',center:'영남·제주권역지원센터',grade:'B',type:'에너지형',status:'등록·운용',joined:'2021.12.11'},
  {name:'윤채원',age:'26세',gender:'여성',center:'호남권역지원센터',grade:'B',type:'인지·감각형',status:'등록·운용',joined:'2023.03.19'},
  {name:'강민재',age:'33세',gender:'남성',center:'인천·경기권역지원센터',grade:'A',type:'물리변환형',status:'등록·운용',joined:'2020.05.26'},
  {name:'서예린',age:'21세',gender:'여성',center:'서울권역지원센터',grade:'B',type:'공간·이동형',status:'등록·운용',joined:'2025.07.02'}
 ];
 window.__sentinelData=window.__sentinelData||sentinelProfiles;
 function normalizeSentinelGrades(data){
 if(!Array.isArray(data))return {data,changed:false};
 let changed=false;
 const out=data.map(x=>{
  const y={...x};
  if(y.grade==='C'||y.grade==='D'){y.grade='B';changed=true}
  return y;
 });
 return {data:out,changed};
}
function getSentinelData(){return window.__sentinelData||sentinelProfiles}
 function renderSentinelProfile(){
  const panel=document.getElementById('sentinelProfileContent');if(!panel)return;
  const id=new URLSearchParams(location.hash.split('?')[1]||'').get('id'),x=getSentinelData()[Number(id)];
  if(!x){panel.innerHTML='<div class="notice-area">센티넬 정보를 찾을 수 없습니다.</div>';return}
  const gradeClass=String(x.grade||'').toUpperCase().replace(/[^A-Z]/g,'');
  const listRow=document.querySelectorAll('.sentinel-row')[Number(id)];
  const listPhoto=listRow?.querySelector('.sentinel-photo img')?.getAttribute('src')||'';
  const photoHtml=listPhoto?'<div class="sentinel-detail-photo"><img src="'+listPhoto+'" alt="'+x.name+' 증명사진"></div>':'<div class="sentinel-detail-photo">증명사진</div>';
  panel.innerHTML='<div class="sentinel-profile-head"><div class="sentinel-detail-photo-wrap">'+photoHtml+'</div><div><h2>'+x.name+' <span class="sentinel-grade grade-'+gradeClass+'">'+x.grade+'</span></h2><p>'+x.center+' · '+x.status+'</p></div><button type="button" class="profile-admin-edit" data-profile-edit="'+Number(id)+'">정보 수정</button></div><div class="sentinel-profile-table"><div><span>나이</span><b>'+x.age+'</b></div><div><span>성별</span><b>'+x.gender+'</b></div><div><span>소속 센터</span><b>'+x.center+'</b></div><div><span>등급</span><b>'+x.grade+'</b></div><div><span>능력 유형</span><b>'+x.type+'</b></div><div><span>등록 상태</span><b>'+x.status+'</b></div><div><span>최초 등록일</span><b>'+x.joined+'</b></div></div><div class="notice-area"><strong>공개 범위 안내</strong><br>개인의 안전과 권익 보호를 위해 상세 능력 정보 및 개인식별정보는 공개하지 않습니다.</div><a class="back-to-list" href="#sentinels">← 센티넬 목록으로</a>';
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
const ADMIN_ENABLED = true; // 관리자 기능은 항상 활성화
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
init('.guide-row','.guide-photo',(row,i)=>'g'+i);
window.__ssaPick=function(kind,id){const r=rows.find(x=>x.key===kind+String(id));if(r&&r.inp)r.inp.click()};
/* 가이드 증명사진: 항상 클릭하면 파일 선택창을 연다 */
function bindGuidePhotoPickers(){
 $('.guide-row').forEach((row,i)=>{
  const box=$('.guide-photo',row);
  if(!box||box.dataset.photoPickerBound==='1')return;
  const r=rows.find(x=>x.key==='g'+i);
  if(!r)return;
  box.dataset.photoPickerBound='1';
  box.style.cursor='pointer';
  box.addEventListener('click',e=>{
   e.preventDefault();e.stopPropagation();
   r.inp.click();
  });
 });
}
bindGuidePhotoPickers();
document.addEventListener('DOMContentLoaded',bindGuidePhotoPickers);


/* ---------- 행 클릭 → 상세 ---------- */
const go=e=>{const r=e.target.closest('[data-href],[data-guide-href]');if(!r||e.target.closest('.row-actions')||e.target.closest('input[type="file"]')||e.target.closest('.admin-edit-btn'))return;
 if(e.type==='keydown'&&e.key!=='Enter'&&e.key!==' ')return;e.preventDefault();const h=r.dataset.href||r.dataset.guideHref;if(h)location.hash=h};
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
 if(ap){
  const id=+new URLSearchParams(location.hash.split('?')[1]||'').get('id');
  const rows=$('.apostle-row'),w=rows[id],key=w?.dataset.beastKey;
  const im=w?.querySelector('.apostle-photo img');
  if(im&&im.getAttribute('src')&&!$('img',ap)){ap.textContent='';const i=new Image();i.src=im.src;i.alt='괴수 사진';i.dataset.beastKey=key||'';ap.appendChild(i)}
 }
 const gp=$('#guideProfileContent .sentinel-detail-photo');
 if(gp){const id=new URLSearchParams(location.hash.split('?')[1]||'').get('id'),r=rows.find(x=>x.key==='g'+id),src=r?.box?.querySelector('img')?.getAttribute('src');if(src){const cur=gp.querySelector('img')?.getAttribute('src');if(cur!==src){gp.textContent='';const i=new Image();i.src=src;i.alt='증명사진';gp.appendChild(i)}}}
 const p=$('#sentinelProfileContent .sentinel-detail-photo');if(!p)return;
 const id=new URLSearchParams(location.hash.split('?')[1]||'').get('id'),w=$('.sentinel-row')[+id],im=w&&$('.sentinel-photo img',w);
 if(im&&im.getAttribute('src')){
  const src=im.getAttribute('src'),cur=p.querySelector('img')?.getAttribute('src');
  if(cur!==src){p.textContent='';const i=new Image();i.src=src;i.alt='증명사진';p.appendChild(i)}
 }
};
addEventListener('hashchange',()=>{
 window.__renderSentinelProfile?.();
 [0,100,300,700,1500].forEach(t=>setTimeout(()=>window.__profilePhoto?.(),t));
 ensureEditButtons();
});

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
 try{
  const res=await fetch(RAW_LIST+'?_='+Date.now(),{cache:'no-store'});if(!res.ok)throw Error(res.status);
  const j=await res.json(),a=(j.resources||[]).sort((x,y)=>(y.version||0)-(x.version||0))[0];if(!a)throw Error('empty');
  const p=await fetch(RAW_BASE+'v'+a.version+'/'+a.public_id+'?_='+Date.now(),{cache:'no-store'}).then(x=>x.json());
  if(!window.__ssaOwned&&Array.isArray(p.profiles)&&p.profiles.length){
   const n=normalizeSentinelGrades(p.profiles);window.__sentinelData=n.data;
   localStorage.setItem('sentinel_profiles_cache',JSON.stringify(n.data));applyProfiles();
   if(n.changed)saveProfiles(n.data);
  }
 }catch(e){
  try{
   const p=JSON.parse(localStorage.getItem('sentinel_profiles_cache')||'null');
   if(!window.__ssaOwned&&Array.isArray(p)){
    const n=normalizeSentinelGrades(p);window.__sentinelData=n.data;applyProfiles();
    if(n.changed){localStorage.setItem('sentinel_profiles_cache',JSON.stringify(n.data));saveProfiles(n.data)}
   }
  }catch(_){}
 }
}
async function saveProfiles(data){
 if(profileSaveBusy)return;profileSaveBusy=true;const payload=JSON.stringify({version:1,updatedAt:new Date().toISOString(),profiles:data});
 try{const id='sentinel-profiles-'+Date.now()+'.json',blob=new Blob([payload],{type:'application/json'}),fd=new FormData();fd.append('file',blob,id);fd.append('upload_preset',CLOUDINARY_PRESET);fd.append('public_id',id);fd.append('folder','sentinel-config');fd.append('tags','sentinel_profile_config_v1');const res=await fetch(RAW_API,{method:'POST',body:fd}),j=await res.json();if(!res.ok||!j.public_id)throw Error(j.error?.message||res.status);localStorage.setItem('sentinel_profiles_cache',payload);toast('센티넬 정보가 저장되었습니다. 모든 접속자에게 반영됩니다.')}
 catch(e){localStorage.setItem('sentinel_profiles_cache',payload);toast('공유 저장에 실패해 이 기기에만 임시 저장되었습니다.',1)}
 finally{profileSaveBusy=false}
}
function admin(on){
 document.body.classList.toggle('photo-admin',on);const b=document.getElementById('adminModeBtn');if(b){b.textContent=on?'관리자 모드 종료':'관리자 모드';b.classList.toggle('active',on)}ensureEditButtons();saveBar();
 if(on){
  profileModal();
  window.__officialProfilePhotos?.addButtons?.();
  toast('관리자 모드가 켜졌습니다. 청장·간부 사진 영역에서 사진을 등록하거나 변경할 수 있습니다.');
 }else{
  const m=document.getElementById('sentinelAdminModal');if(m)m.hidden=true;
  window.__officialProfilePhotos?.addButtons?.();
 }
}
function enterAdmin(){ admin(true); }
window.__ssaEnterAdmin=enterAdmin;
function bindAdminButtons(){
 document.getElementById('adminModeBtn')?.remove();
 document.getElementById('adminModeBtnMobile')?.remove();
 admin(true);
}
bindAdminButtons();
document.addEventListener('DOMContentLoaded',bindAdminButtons);
document.querySelectorAll('.apostle-row[data-apostle-href]').forEach(row=>{
 row.addEventListener('click',e=>{
  location.hash=row.dataset.apostleHref;
  
 });
 row.addEventListener('keydown',e=>{
  if(e.key==='Enter'||e.key===' '){e.preventDefault();location.hash=row.dataset.apostleHref;show(row.dataset.apostleHref)}
 });
});
document.querySelectorAll('.guide-row[data-guide-href]').forEach(row=>{
 row.addEventListener('click',e=>{
  if(e.target.closest('button,a,input,select,textarea'))return;
  location.hash=row.dataset.guideHref;
 });
 row.addEventListener('keydown',e=>{
  if(e.key==='Enter'||e.key===' '){e.preventDefault();location.hash=row.dataset.guideHref;}
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
 const guideBox=e.target.closest('#guideProfileContent .sentinel-detail-photo');if(guideBox&&document.body.classList.contains('photo-admin')){const id=Number(new URLSearchParams(location.hash.split('?')[1]||'').get('id'));window.__ssaPick&&window.__ssaPick('g',id)}
});
document.getElementById('adminModeBtn')?.remove();document.getElementById('adminModeBtnMobile')?.remove();admin(true);
/* ===== ADMIN MODE END ===== */
document.body.classList.add('photos-loading');
paintAll();sync();loadProfiles();ensureEditButtons();
setInterval(()=>{if(!document.hidden){sync();loadProfiles()}},120000);
})();



/* ===== SENTINEL GRADE SORT ===== */
(function(){
 const order={S:0,A:1,B:2,C:3,D:4,E:5};
 function sortSentinels(){
  const list=document.querySelector('.sentinel-list');
  if(!list)return;
  const rows=[...list.querySelectorAll('.sentinel-row')];
  rows.sort((a,b)=>{
   const ga=(a.dataset.grade||a.querySelector('.sentinel-grade')?.textContent||'Z').trim().toUpperCase();
   const gb=(b.dataset.grade||b.querySelector('.sentinel-grade')?.textContent||'Z').trim().toUpperCase();
   return (order[ga]??99)-(order[gb]??99);
  });
  rows.forEach(row=>list.appendChild(row));
 }
 window.__sortSentinels=sortSentinels;
 document.addEventListener('DOMContentLoaded',sortSentinels);
 window.addEventListener('load',sortSentinels);
})();

/* ===== OFFICIAL PROFILE PHOTOS ===== */
(function(){
 const CL='dbljkloal',PRESET='Everything',MAX=10*1024*1024;
 const IMG_API='https://api.cloudinary.com/v1_1/'+CL+'/image/upload';
 const IMG_BASE='https://res.cloudinary.com/'+CL+'/image/upload/';
 const RAW_API='https://api.cloudinary.com/v1_1/'+CL+'/raw/upload';
 const RAW_BASE='https://res.cloudinary.com/'+CL+'/raw/upload/';
 const RAW_LIST='https://res.cloudinary.com/'+CL+'/raw/list/ssa_official_profile_config_v1.json';
 const TAG_PREFIX='ssa_official_';
 const PIXEL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
 let state={chief:'',leaders:{}},busy={},configBusy=false,dirty=false;
 let stateUpdatedAt='';
 function cacheState(updatedAt){
  try{
   localStorage.setItem('official_profile_cache_v1',JSON.stringify({
    version:1,updatedAt:updatedAt||stateUpdatedAt||new Date().toISOString(),state
   }));
  }catch(e){}
 }
 function readCachedState(){
  try{
   const raw=JSON.parse(localStorage.getItem('official_profile_cache_v1')||'null');
   if(raw&&raw.state)return {state:raw.state,updatedAt:String(raw.updatedAt||'')};
   if(raw&&typeof raw==='object'&&('chief' in raw||'leaders' in raw))return {state:raw,updatedAt:''};
  }catch(e){}
  return null;
 }
 function remoteIsNewer(a,b){
  if(!a)return true;
  if(!b)return false;
  const ta=Date.parse(a),tb=Date.parse(b);
  return Number.isFinite(ta)&&Number.isFinite(tb)?tb>=ta:true;
 }
 async function loadConfig(){
  const cached=readCachedState();
  try{
   const r=await fetch(RAW_LIST+'?_='+Date.now()+'_'+Math.random().toString(36).slice(2),{cache:'no-store'});
   if(!r.ok)throw 0;
   const j=await r.json(),a=(j.resources||[]).sort((x,y)=>(y.version||0)-(x.version||0))[0];
   if(!a)throw 0;
   const p=await fetch(RAW_BASE+'v'+a.version+'/'+a.public_id+'?_='+Date.now()+'_'+Math.random().toString(36).slice(2),{cache:'no-store'}).then(x=>x.json());
   if(p?.state){
    const remoteAt=String(p.updatedAt||'');
    if(!cached||remoteIsNewer(cached.updatedAt,remoteAt)){
     state={chief:String(p.state.chief||''),leaders:p.state.leaders||{}};
     stateUpdatedAt=remoteAt;
     cacheState(remoteAt);
    }else{
     state={chief:String(cached.state?.chief||''),leaders:cached.state?.leaders||{}};
     stateUpdatedAt=cached.updatedAt||'';
    }
    return true;
   }
  }catch(e){}
  if(cached){
   state={chief:String(cached.state?.chief||''),leaders:cached.state?.leaders||{}};
   stateUpdatedAt=cached.updatedAt||'';
   return true;
  }
  return false;
 }
 async function saveConfig(){
  if(configBusy)return false;
  configBusy=true;
  try{
   stateUpdatedAt=new Date().toISOString();
   const payload=JSON.stringify({version:1,updatedAt:stateUpdatedAt,state});
   const id='official-profile-config-'+Date.now()+'.json';
   const fd=new FormData();
   fd.append('file',new Blob([payload],{type:'application/json'}),id);
   fd.append('upload_preset',PRESET);
   fd.append('public_id',id);
   fd.append('folder','sentinel-config');
   fd.append('tags','ssa_official_profile_config_v1');
   const r=await fetch(RAW_API,{method:'POST',body:fd});
   const j=await r.json();
   if(!r.ok||!j.public_id)throw new Error(j.error?.message||'config upload failed');
   cacheState(stateUpdatedAt);
   return true;
  }catch(e){
   return false;
  }finally{configBusy=false}
 }

 const esc=s=>String(s||'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const leaderKey=name=>{
  let h=2166136261;
  for(let i=0;i<String(name).length;i++){h^=String(name).charCodeAt(i);h=Math.imul(h,16777619)}
  return 'leader_'+(h>>>0).toString(36);
 };
 const tagFor=key=>TAG_PREFIX+(key==='chief'?'chief':leaderKey(key));
 const cloudUrl=r=>IMG_BASE+'v'+r.version+'/'+r.public_id;

 function saveBar(){
  let bar=document.getElementById('officialPhotoSaveBar');
  if(!bar){
   bar=document.createElement('div');
   bar.id='officialPhotoSaveBar';
   bar.className='official-photo-save-bar';
   bar.innerHTML='<span>사진 변경사항이 있습니다.</span><button type="button" id="officialPhotoSaveBtn">사진 변경사항 저장</button>';
   document.body.appendChild(bar);
   document.getElementById('officialPhotoSaveBtn').addEventListener('click',async()=>{
    if(!dirty||configBusy)return;
    const btn=document.getElementById('officialPhotoSaveBtn');
    btn.disabled=true;btn.textContent='저장 중…';
    const ok=await saveConfig();
    if(ok){
     dirty=false;cacheState();bar.classList.add('saved');bar.querySelector('span').textContent='사진 변경사항이 저장되었습니다.';btn.textContent='저장됨';setTimeout(()=>{bar.classList.remove('show','saved');bar.querySelector('span').textContent='사진 변경사항이 있습니다.';btn.textContent='사진 변경사항 저장'},1200);
    }else{
     toast('저장에 실패했습니다. 다시 눌러주세요.',1);
    }
    btn.disabled=false;btn.textContent='사진 변경사항 저장';
   });
  }
  bar.classList.toggle('show',dirty&&document.body.classList.contains('photo-admin'));
}
function paint(){
  const chief=document.querySelector('.chief-mark');
  if(chief){
   chief.innerHTML=state.chief?'<img src="'+esc(state.chief)+'" alt="한서진 청장 증명사진">':'청장<br>증명사진';
   chief.classList.toggle('has-official-photo',!!state.chief);
  }
  document.querySelectorAll('.org-leader').forEach(card=>{
   const name=card.querySelector('h3')?.textContent.trim(),box=card.querySelector('.org-leader-photo'),src=state.leaders[name];
   if(!box)return;
   box.innerHTML=src?'<img src="'+esc(src)+'" alt="'+esc(name)+' 증명사진">':'증명사진';
   box.classList.toggle('has-official-photo',!!src);
  });
 }

 async function pull(key){
  for(let attempt=0;attempt<3;attempt++){
   try{
    const r=await fetch('https://res.cloudinary.com/'+CL+'/image/list/'+tagFor(key)+'.json?_='+Date.now()+'_'+attempt+'_'+Math.random().toString(36).slice(2),{cache:'no-store'});
    if(!r.ok)throw Error(r.status);
    const j=await r.json();
    const resources=(j.resources||[]).filter(a=>!(a.width===1&&a.height===1)&&a.public_id!=='pixel');
    const a=resources.sort((x,y)=>(y.version||0)-(x.version||0))[0];
    /* 목록이 일시적으로 비어 있거나 CDN이 오래된 목록을 주더라도
       이미 확인된 최신 사진을 빈 값/구버전으로 덮어쓰지 않는다. */
    if(!a)return;
    const next=cloudUrl(a);
    const current=key==='chief'?state.chief:state.leaders[key];
    const m=current&&current.match(/\/v(\d+)\//),currentVersion=m?Number(m[1]):0;
    if(currentVersion&&Number(a.version||0)<currentVersion)return;
    if(key==='chief')state.chief=next;
    else state.leaders[key]=next;
    return;
   }catch(e){
    if(attempt<2)await new Promise(resolve=>setTimeout(resolve,300*(attempt+1)));
   }
  }
 }

 async function load(){
  /* 먼저 공유 설정/브라우저 캐시를 복원한 뒤 Cloudinary 태그의 최신 사진으로 갱신한다.
     조회 실패나 지연 때문에 기존 사진이 빈 상태로 초기화되지 않도록 한다. */
  await loadConfig();
  let changed=false;
  paint();
  const names=[...document.querySelectorAll('.org-leader h3')].map(x=>x.textContent.trim());
  for(const key of ['chief',...names]){
   const before=key==='chief'?state.chief:state.leaders[key];
   await pull(key);
   const after=key==='chief'?state.chief:state.leaders[key];
   if(before!==after)changed=true;
  }
  if(changed)cacheState();
  paint();
  addButtons();
 }

 function addBar(box){
  const bar=document.createElement('div');bar.className='photo-bar';box.appendChild(bar);return bar;
 }

 function upload(file,key,remove=false){
  if(busy[key])return;
  if(!remove){
   if(!file||!/^image\//.test(file.type)){toast('이미지 파일만 등록할 수 있습니다.',1);return}
   if(file.size>MAX){toast('10MB 이하 사진만 등록할 수 있습니다.',1);return}
  }
  const box=key==='chief'?document.querySelector('.chief-mark'):[...document.querySelectorAll('.org-leader')].find(c=>leaderKey(c.querySelector('h3')?.textContent.trim())===key)?.querySelector('.org-leader-photo');
  if(!box)return;
  busy[key]=true;
  const bar=addBar(box),fd=new FormData();
  if(remove){
   fetch(PIXEL).then(r=>r.blob()).then(blob=>{
    fd.append('file',blob,'pixel.png');send(fd,key,box,bar,true);
   }).catch(()=>{bar.remove();busy[key]=false;toast('삭제 처리에 실패했습니다.',1)});
  }else{
   fd.append('file',file);send(fd,key,box,bar,false);
  }
 }

 function send(fd,key,box,bar,remove){
  fd.append('upload_preset',PRESET);
  fd.append('folder','sentinel/official');
  fd.append('tags','ssa_official_profile,'+tagFor(key));
  const x=new XMLHttpRequest();x.open('POST',IMG_API);
  x.upload.onprogress=e=>{if(e.lengthComputable)bar.style.width=(e.loaded/e.total*100)+'%'};
  x.onload=async()=>{
   try{
    const j=JSON.parse(x.responseText);
    if(x.status<200||x.status>=300||!j.public_id)throw Error(j.error?.message||x.status);
    const src=remove?'':j.secure_url;
    if(key==='chief')state.chief=src;
    else{
     const name=[...document.querySelectorAll('.org-leader h3')].map(e=>e.textContent.trim()).find(n=>leaderKey(n)===key);
     if(name)state.leaders[name]=src;
    }
    paint();addButtons();
    dirty=true;saveBar();
    toast(remove?'사진이 삭제되었습니다.':'사진이 등록되었습니다. 저장 버튼을 눌러야 영구 저장됩니다.');
   }catch(e){toast('사진 등록 실패: '+e.message,1)}
   bar.remove();busy[key]=false;
  };
  x.onerror=()=>{bar.remove();busy[key]=false;toast('네트워크 오류로 처리하지 못했습니다.',1)};
  x.send(fd);
 }

 function picker(key){
  const i=document.createElement('input');i.type='file';i.accept='image/*';
  i.onchange=()=>{if(i.files[0])upload(i.files[0],key);i.value=''};i.click();
 }

 function addButtons(){
  if(!document.body.classList.contains('photo-admin'))return;
  const chief=document.querySelector('.chief-mark');
  if(chief&&!chief.querySelector('.official-photo-actions')){
   const d=document.createElement('div');d.className='official-photo-actions';
   d.innerHTML='<button type="button" data-official-photo="chief">'+(state.chief?'사진 변경':'사진 등록')+'</button>'+(state.chief?'<button type="button" data-official-del="chief">삭제</button>':'');
   chief.appendChild(d);
  }
  document.querySelectorAll('.org-leader').forEach(card=>{
   const name=card.querySelector('h3')?.textContent.trim(),box=card.querySelector('.org-leader-photo');
   if(!box||box.querySelector('.official-photo-actions'))return;
   const has=!!state.leaders[name],key=leaderKey(name),d=document.createElement('div');
   d.className='official-photo-actions';
   d.innerHTML='<button type="button" data-official-photo="'+key+'">'+(has?'사진 변경':'사진 등록')+'</button>'+(has?'<button type="button" data-official-del="'+key+'">삭제</button>':'');
   box.appendChild(d);
  });
 }

 document.addEventListener('click',e=>{
  const up=e.target.closest('[data-official-photo]');
  if(up){e.preventDefault();e.stopPropagation();picker(up.dataset.officialPhoto);return}
  const del=e.target.closest('[data-official-del]');
  if(del){e.preventDefault();e.stopPropagation();upload(null,del.dataset.officialDel,true)}
 });

 const mo=new MutationObserver(()=>addButtons());mo.observe(document.body,{childList:true,subtree:true});
 window.__officialProfilePhotos={paint,load,addButtons,saveBar};
 const adminObserver=new MutationObserver(()=>{if(document.body.classList.contains('photo-admin'))addButtons()});
 adminObserver.observe(document.body,{attributes:true,attributeFilter:['class']});
 addEventListener('hashchange',()=>setTimeout(()=>{load()},0));
 load();
})();
