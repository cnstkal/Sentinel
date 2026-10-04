/* Live crisis feed — refreshed by the scheduled updater. */
(function(){
  const esc=s=>String(s??'').replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
  const levelRank={관심:1,주의:2,경계:3,심각:4};
  const cls={관심:'interest',주의:'caution',경계:'warning',심각:'critical'};

  async function load(){
    try{
      const res=await fetch('./data/live-crisis.json?v='+Date.now(),{cache:'no-store'});
      if(!res.ok) throw new Error('live feed '+res.status);
      const feed=await res.json();
      window.LIVE_CRISIS=feed;
      apply(feed);
      window.dispatchEvent(new CustomEvent('ssa-live-crisis-updated',{detail:feed}));
    }catch(e){
      console.warn('[Sentinel] live crisis feed unavailable',e);
    }
  }

  function apply(feed){
    const national=feed?.nationalWarning;
    const home=document.querySelector('.hero-notice');
    if(home && national && national.level){
      const stage={관심:'1단계',주의:'2단계',경계:'3단계',심각:'4단계'}[national.level]||'';
      const strong=home.querySelector('strong'), span=home.querySelector('span');
      if(strong) strong.textContent=national.level+' · '+stage;
      if(span) span.innerHTML=esc(national.issuedAtDisplay||feed.updatedAtDisplay||'')+' 발령<br>'+esc(national.title||'전국 위기경보');
    }

    const byRegion={};
    (feed?.regionalAlerts||[]).forEach(a=>{
      const old=byRegion[a.region];
      if(!old || (levelRank[a.level]||0)>(levelRank[old.level]||0) || String(a.issuedAt)>String(old.issuedAt)) byRegion[a.region]=a;
    });

    document.querySelectorAll('.crisis-map-svg .region[data-region]').forEach(el=>{
      const a=byRegion[el.dataset.region];
      if(!a)return;
      el.classList.remove('region-interest','region-caution','region-warning');
      el.classList.add(({관심:'region-interest',주의:'region-caution',경계:'region-warning'}[a.level])||'region-interest');
      const title=el.querySelector('title');
      if(title)title.textContent=el.dataset.region+' · '+a.level;
    });

    const stamp=document.querySelector('#mapTitle')?.parentElement?.querySelector('small');
    if(stamp) stamp.textContent='17개 시·도 · 최종 업데이트 '+(feed.updatedAtDisplay||'-')+' 기준';

    const root=document.getElementById('alertHistoryList');
    if(root && Array.isArray(feed.history) && feed.history.length){
      const current=Array.isArray(window.__SSA_BASE_ALERT_HISTORY)?window.__SSA_BASE_ALERT_HISTORY:[];
      const merged=[...feed.history,...current];
      const seen=new Set();
      const rows=merged.filter(x=>{
        const k=[x.issuedAt,x.region,x.title].join('|');
        if(seen.has(k))return false; seen.add(k); return true;
      }).sort((a,b)=>String(b.issuedAt).localeCompare(String(a.issuedAt))).slice(0,100);
      root.innerHTML=rows.map(x=>'<article class="alert-item"><time class="alert-time">'+esc(x.issuedAtDisplay||x.issuedAt)+'</time><span class="alert-region">'+esc(x.region||'전국')+'</span><span class="alert-title">'+esc(x.title||x.message||'')+'</span><b class="alert-level '+(cls[x.level]||'caution')+'">'+esc(x.level||'안내')+'</b></article>').join('');
    }
  }

  window.__ssaLiveCrisis={load,apply};
  document.addEventListener('DOMContentLoaded',load);
  setInterval(load,15000);
})();