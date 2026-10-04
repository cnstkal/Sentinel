/* ===== ORIGINAL SCRIPT BLOCK 9 ===== */

(function(){
const box=document.getElementById('apostleProfileContent');
function render(){
 if(!box)return;
 const X=v=>String(v==null?'':v).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const id=+new URLSearchParams(location.hash.split('?')[1]||'').get('id'),r=document.querySelectorAll('.apostle-row')[id];
 if(!r){box.innerHTML='<div class="notice-area">괴수 정보를 찾을 수 없습니다.</div>';return}
 const dd=[...r.querySelectorAll('.apostle-info dd')].map(x=>x.textContent.trim()),code=r.querySelector('strong').textContent.trim(),ds=r.dataset,
  grade=dd[0]||'-',st=(dd[1]||'-').split(' · ')[0],rg=dd[2]||'-',type=ds.type||code,m=code.match(/(\d\d)(\d\d)(\d\d)$/),
  joined=ds.joined||(m?'20'+m[1]+'.'+m[2]+'.'+m[3]:'-'),sp=ds.special||'해당 없음',
  row=(k,v,f)=>'<div data-f="'+f+'"><span>'+k+'</span><b>'+X(v)+'</b></div>';
 box.dataset.id=id;
 box.innerHTML='<div class="sentinel-profile-head"><div class="sentinel-detail-photo">사진</div><div><h2 data-f="code">'+X(code)+' <span class="sentinel-grade" data-f="grade">'+X(grade)+'</span></h2><p>'+X(st)+'</p></div><button type="button" class="admin-only prof-edit">정보 수정</button></div><div class="sentinel-profile-table">'
  +row('괴수 코드',code,'code')+row('등급',grade,'grade')+row('능력 유형',type,'type')+row('관리 상태',st,'st')+row('최초 등록일',joined,'joined')+row('특이 구분',sp,'special')
  +'</div><div class="notice-area"><strong>공개 범위 안내</strong><br>괴수의 개인식별정보와 상세 능력 정보는 공개하지 않으며, 등록 코드를 기준으로 기본정보만 안내합니다.</div><a class="back-to-list" href="#apostles">← 괴수 목록으로</a>';
 const detailPhoto=box.querySelector('.sentinel-detail-photo'),listImg=r.querySelector('.apostle-photo img'),src=listImg?.getAttribute('src');
 if(detailPhoto&&src){detailPhoto.innerHTML='<img src="'+X(src)+'" alt="괴수 사진">';}
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
AF=[['code','괴수 코드'],['grade','등급'],['type','능력 유형'],['st','관리 상태'],['joined','최초 등록일'],['special','특이 구분']];
const DEFAULT_A=[
 {code:'에너지형 괴수',grade:'1등급',type:'고출력 전격·에너지 방출형',st:'희귀',joined:'2011.06.17',special:'고출력 전격'},
 {code:'인지·감각형 괴수',grade:'2등급',type:'감각 교란·인지 간섭형',st:'관찰',joined:'2006.04.22',special:'인지 간섭'},
 {code:'물리변환형 괴수',grade:'3등급',type:'물질 변환·신체 변형형',st:'관리',joined:'2004.09.17',special:'물질 변환'},
 {code:'생체영향형 괴수',grade:'3등급',type:'생체 변형·생리 영향형',st:'관리',joined:'2008.07.03',special:'생체 영향'},
 {code:'환경영향형 괴수',grade:'4등급',type:'환경 변화·생태 교란형',st:'관찰',joined:'2013.11.29',special:'환경 변화'},
 {code:'공간이동형 괴수',grade:'2등급',type:'공간 이동·거리 왜곡형',st:'추적',joined:'2016.02.14',special:'공간 이동'},
 {code:'에너지형 괴수',grade:'5등급',type:'에너지 방출·흡수형',st:'관찰',joined:'2003.08.11',special:'에너지 방출'},
 {code:'인지·감각형 괴수',grade:'3등급',type:'감각 증폭·인지 교란형',st:'관리',joined:'2019.05.26',special:'감각 교란'}
];
function toast(m,e){const d=document.createElement('div');d.className='ssa-toast'+(e?' e':'');d.textContent=m;document.body.appendChild(d);setTimeout(()=>d.remove(),3200)}
const BAR='<div class="adm-bar"><button type="button" data-a="photo">사진 변경</button><button type="button" data-a="nophoto">사진 삭제</button><button type="button" data-a="edit">수정</button><button type="button" class="d" data-a="del">삭제</button></div>';
const ph=(c,s,img)=>'<div class="'+c+(img?' has-img':'')+'"><img src="'+E(img)+'" alt=""'+(img?'':' hidden')+'><span>'+s+'</span></div>';
const sRow=(x,i)=>{const p=x.p,h='#sentinel-profile?id='+i;return '<article class="sentinel-row" data-href="'+h+'" tabindex="0" role="link">'+ph('sentinel-photo','증명사진',x.img)+'<div class="sentinel-info"><strong>'+E(p.name)+'</strong><dl><div><dt>나이</dt><dd>'+E(p.age)+'</dd></div><div><dt>성별</dt><dd>'+E(p.gender)+'</dd></div><div><dt>센터</dt><dd>'+E(p.center)+'</dd></div></dl></div>'+BAR+'</article>'};
const aRow=(x,i)=>{const h='#apostle-profile?id='+i;const key=String(x.code||('BEAST-'+i));return '<article class="apostle-row" data-beast-key="'+E(key)+'" data-href="'+h+'" data-type="'+E(x.type)+'" data-joined="'+E(x.joined)+'" data-special="'+E(x.special)+'" data-rg="'+E(x.rg)+'" tabindex="0" role="link">'+ph('apostle-photo','괴수 이미지',x.img)+'<div class="apostle-info"><strong>'+E(x.code)+'</strong><dl><div><dt>등급</dt><dd>'+E(x.grade)+'</dd></div><div><dt>상태</dt><dd>'+E(String(x.st||'').split(' · ')[0])+'</dd></div></dl></div>'+BAR+'</article>'};
function adopt(){const d=window.__sentinelData||[];M={s:$$('.sentinel-row').map((r,i)=>({p:{...(d[i]||{})},img:$('.sentinel-photo img',r)?.getAttribute('src')||''})),a:$$('.apostle-row').map(r=>{const dd=$$('.apostle-info dd',r).map(x=>x.textContent.trim()),code=($('strong',r)||{textContent:''}).textContent.trim(),mm=code.match(/(\d\d)(\d\d)(\d\d)$/);return {code,grade:dd[0]||'',type:r.dataset.type||code,st:dd[1]||'',rg:r.dataset.rg||'',joined:r.dataset.joined||(mm?'20'+mm[1]+'.'+mm[2]+'.'+mm[3]:'-'),special:r.dataset.special||'해당 없음',img:$('.apostle-photo img',r)?.getAttribute('src')||''}})}}
function ensure(){if(M)return true;if(document.body.classList.contains('photos-loading')){toast('사진을 불러오는 중입니다. 잠시 후 다시 눌러주세요.',1);return false}adopt();render();return true}
function addBtns(){[['s','.sentinel-list','센티넬'],['a','.apostle-list','괴수']].forEach(([k,q,n])=>{const l=$(q);if(!l||$('.adm-add[data-k="'+k+'"]'))return;const b=document.createElement('button');b.type='button';b.className='adm-add';b.dataset.k=k;b.textContent='＋ '+n+' 추가';const em=l.nextElementSibling;(em&&em.classList.contains('list-empty')?em:l).after(b)})}
function render(){window.__ssaOwned=true;const S=$('.sentinel-list'),A=$('.apostle-list');if(S)S.innerHTML=M.s.map(sRow).join('');if(A){M.a.sort((x,y)=>{const ax=parseInt(String(x.grade||'').match(/\\d+/)?.[0]||'999',10),ay=parseInt(String(y.grade||'').match(/\\d+/)?.[0]||'999',10);return ax-ay});A.innerHTML=M.a.map(aRow).join('')}window.__sentinelData=M.s.map(x=>({...x.p}));addBtns();if(/profile/.test(location.hash)){dispatchEvent(new Event('hashchange'));setTimeout(()=>window.__profilePhoto?.(),0)}}
async function upload(){const id='ssa-lists-'+Date.now()+'.json',payload=JSON.stringify({v:3,M}),fd=new FormData();fd.append('file',new Blob([payload],{type:'application/json'}),id);fd.append('upload_preset','Everything');fd.append('public_id',id);fd.append('folder','sentinel-config');fd.append('tags',TAG);try{const r=await fetch(RAPI,{method:'POST',body:fd}),j=await r.json();if(!r.ok||!j.public_id)throw new Error(j.error?.message||r.status);pending=false;toast('저장되었습니다. 모든 접속자에게 반영됩니다.')}catch(e){toast('공유 설정 저장 실패: '+e.message+' (다시 시도합니다)',1);setTimeout(upload,3000)}}
let pending=false;
function persist(){pending=true;try{localStorage.setItem(LK,JSON.stringify(M))}catch(e){toast('저장 공간이 부족합니다.',1)}clearTimeout(tm);tm=setTimeout(upload,700)}
function applyDefaultA(force=false){
 if(!M)return false;
 if(!force && M._defaultVersion===3)return false;
 const old=M.a||[];
 const findImg=x=>{
  const same=old.filter(o=>o&&o.code===x.code&&o.grade===x.grade);
  const exact=same.find(o=>o.joined===x.joined&&o.img);
  return (exact||same.find(o=>o.img))?.img||'';
 };
 M.a=DEFAULT_A.map(x=>({...x,img:findImg(x)}));
 M._defaultVersion=3;
 return true;
}
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
async function pick(k,i){const f=document.createElement('input');f.type='file';f.accept='image/*';f.onchange=async()=>{if(!f.files[0]||!ensure())return;try{const blob=await shrink(f.files[0]);toast('사진을 서버에 업로드하는 중입니다.');const p=await uploadPhoto(blob,k,i);await pullRemote(true);if(!M||!M[k]||!M[k][i])throw new Error('목록이 변경되었습니다. 다시 시도해 주세요.');M[k][i].img=p.url;commit()}catch(e){toast('사진 업로드 실패: '+e.message,1)}};f.click()}
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
let lastPull=0;
async function pullRemote(force){
  if(pending&&!force)return false;
  let migrated=false;
  if(!M){try{const c=JSON.parse(localStorage.getItem(LK)||'null');if(c&&c.s){M=c;migrated=applyDefaultA();render()}}catch(e){}}
  try{
   const r=await fetch(LIST+'?_='+Date.now(),{cache:'no-store'});if(!r.ok)throw 0;
   const j=await r.json(),a=(j.resources||[]).sort((x,y)=>(y.version||0)-(x.version||0))[0];if(!a)throw 0;
   const p=await fetch(RB+'v'+a.version+'/'+a.public_id+'?_='+Date.now(),{cache:'no-store'}).then(x=>x.json());
   if(p.M&&p.M.s){
    if(!force&&pending)return false;
    const changed=JSON.stringify(M)!==JSON.stringify(p.M);
    M=p.M;migrated=applyDefaultA()||migrated;
    if(changed||migrated)render();
    try{localStorage.setItem(LK,JSON.stringify(M))}catch(e){}
   }
  }catch(e){}
  if(migrated&&!force)upload();
  lastPull=Date.now();
  return true;
}
pullRemote();
setInterval(()=>{if(!document.hidden)pullRemote()},60000);
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&Date.now()-lastPull>10000)pullRemote()});
addEventListener('focus',()=>{if(Date.now()-lastPull>10000)pullRemote()});
/* 괴수 상세 페이지 사진 탭 → 바로 사진 선택 */
document.addEventListener('click',e=>{
  if(!adm())return;
  const d=e.target.closest('#apostleProfileContent .sentinel-detail-photo');if(!d)return;
  const id=+new URLSearchParams(location.hash.split('?')[1]||'').get('id');
  const ph=$$('.apostle-row')[id]?.querySelector('.apostle-photo');
  if(ph){e.preventDefault();e.stopImmediatePropagation();ph.click()}
},true);
})();
