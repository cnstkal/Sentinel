/* ===== 사이트 실시간 현재 날짜·시간 ===== */
(function(){
  const TZ='Asia/Seoul';

  function parts(){
    return new Intl.DateTimeFormat('ko-KR',{
      timeZone:TZ,
      year:'numeric',month:'2-digit',day:'2-digit',
      hour:'2-digit',minute:'2-digit',second:'2-digit',
      hour12:false
    }).formatToParts(new Date()).reduce((o,p)=>(o[p.type]=p.value,o),{});
  }

  function update(){
    const p=parts();
    const dateTime=p.year+'.'+p.month+'.'+p.day+' '+p.hour+':'+p.minute+':'+p.second;
    const iso=p.year+'-'+p.month+'-'+p.day+'T'+p.hour+':'+p.minute+':'+p.second+'+09:00';

    const el=document.getElementById('siteCurrentDateTime');
    if(el){
      el.textContent=dateTime;
      el.dateTime=iso;
    }

    document.querySelectorAll('input[type="datetime-local"]').forEach(input=>{
      if(input.dataset.liveClockInitialized==='true')return;
      const value=p.year+'-'+p.month+'-'+p.day+'T'+p.hour+':'+p.minute;
      if(!input.value)input.value=value;
      input.dataset.liveClockInitialized='true';
    });

    document.documentElement.dataset.siteDate=p.year+'.'+p.month+'.'+p.day;
    document.documentElement.dataset.siteTime=p.hour+':'+p.minute+':'+p.second;
  }

  update();
  setInterval(update,1000);
})();