/* Scheduled publication and live crisis layer */
(function(){
  const now=()=>Date.now();
  const t=s=>{const v=Date.parse(s);return Number.isNaN(v)?0:v};
  const published=x=>t(x.publishAt)<=now();
  const active=x=>t(x.startAt)<=now()&&t(x.endAt)>now();
  const merge=(base,extra,key)=>{
    const set=new Set(base.map(key));
    return base.concat(extra.filter(x=>!set.has(key(x))));
  };

  function applyBoards(){
    const s=window.SCHEDULED_CONTENT||{};
    window.NOTICE_DATA=merge(
      Array.isArray(window.NOTICE_DATA)?window.NOTICE_DATA:[],
      (s.notices||[]).filter(published).map(x=>[x.no,x.title,x.department,x.date,x.file,...x.body]),
      x=>x[1]
    );
    window.PRESS_DATA=merge(
      Array.isArray(window.PRESS_DATA)?window.PRESS_DATA:[],
      (s.press||[]).filter(published).map(x=>[x.date,x.title,x.department,x.category,...x.body]),
      x=>x[1]
    );
    window.BRIEFING_DATA=merge(
      Array.isArray(window.BRIEFING_DATA)?window.BRIEFING_DATA:[],
      (s.briefing||[]).filter(published).map(x=>[x.date,x.title,x.department,x.category,...x.body]),
      x=>x[1]
    );
  }

  function applyCrisisMap(){
    const root=document.querySelector('.crisis-map-svg');
    if(!root)return;

    const levelClass={관심:'region-interest',주의:'region-caution',경계:'region-warning'};
    const labelClass={관심:'label-interest',주의:'label-caution',경계:'label-warning'};
    const levelRank={관심:1,주의:2,경계:3};
    const regions=[...root.querySelectorAll('.region[data-region]')];
    const labels=[...root.querySelectorAll('.map-status-label')];

    regions.forEach(el=>{
      if(!el.dataset.baseClass){
        el.dataset.baseClass=[...el.classList].find(c=>c.startsWith('region-'))||'region-interest';
      }
      el.classList.remove('region-interest','region-caution','region-warning');
      el.classList.add(el.dataset.baseClass);
    });

    labels.forEach(el=>{
      if(!el.dataset.baseLabelClass){
        el.dataset.baseLabelClass=[...el.classList].find(c=>c.startsWith('label-'))||'label-interest';
      }
      el.classList.remove('label-interest','label-caution','label-warning');
      el.classList.add(el.dataset.baseLabelClass);
    });

    const activeAlerts=(window.SCHEDULED_CONTENT?.alerts||[]).filter(active);
    const byRegion={};

    activeAlerts.forEach(alert=>{
      const current=byRegion[alert.region];
      if(!current || t(alert.startAt)>t(current.startAt)) byRegion[alert.region]=alert;
    });

    Object.entries(byRegion).forEach(([region,alert])=>{
      const cls=levelClass[alert.level]||'region-interest';
      regions.filter(el=>el.dataset.region===region).forEach(el=>{
        el.classList.remove('region-interest','region-caution','region-warning');
        el.classList.add(cls);
        const title=el.querySelector('title');
        if(title)title.textContent=region+' · '+alert.level;
      });

      const short=region
        .replace('특별자치도','')
        .replace('특별시','')
        .replace('광역시','');

      labels.forEach(label=>{
        const text=(label.textContent||'').trim();
        if(text===short){
          label.classList.remove('label-interest','label-caution','label-warning');
          label.classList.add(labelClass[alert.level]||'label-interest');
        }
      });
    });

    const currentAlert=activeAlerts
      .slice()
      .sort((a,b)=>{
        const levelDiff=(levelRank[b.level]||0)-(levelRank[a.level]||0);
        return levelDiff||t(b.startAt)-t(a.startAt);
      })[0];

    const home=document.querySelector('.hero-notice');
    if(home){
      const strong=home.querySelector('strong');
      const span=home.querySelector('span');

      if(currentAlert){
        const stage={관심:'1단계',주의:'2단계',경계:'3단계'}[currentAlert.level]||'';
        const issued=new Date(currentAlert.startAt);
        if(strong)strong.textContent=currentAlert.level+' · '+stage;
        if(span){
          span.innerHTML=
            issued.getFullYear()+'.'+String(issued.getMonth()+1).padStart(2,'0')+'.'+String(issued.getDate()).padStart(2,'0')+
            '. '+issued.toLocaleTimeString('ko-KR',{hour:'2-digit',minute:'2-digit'})+
            ' 발령<br>'+currentAlert.region+' · '+currentAlert.title;
        }
      }else{
        if(strong)strong.textContent='현재 별도 위기경보 없음';
        if(span)span.textContent='현재 시간 기준 진행 중인 예약 위기경보가 없습니다.';
      }
    }
  }

  function apply(){
    applyBoards();
    applyCrisisMap();
    window.dispatchEvent(new CustomEvent('ssa-scheduled-updated'));
  }

  window.__ssaScheduler={refresh:apply,published,active,applyCrisisMap};

  document.addEventListener('DOMContentLoaded',apply);
  apply();
  setInterval(apply,15000);
})();