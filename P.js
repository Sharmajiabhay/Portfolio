(function(){
  let pct = 0;
  const pctEl = document.getElementById('loader-pct');
  const msgs = ['LOADING ASSETS...','MAPPING FIBERS...','CALIBRATING GIS...','DEPLOYING NODES...','COMPLETE'];
  let mIdx = 0;
  const iv = setInterval(()=>{
    pct += Math.random()*18 + 4;
    if(pct>100) pct=100;
    pctEl.textContent = msgs[Math.min(mIdx,msgs.length-1)] + ' ' + Math.floor(pct) + '%';
    mIdx = Math.floor(pct/25);
    if(pct>=100){
      clearInterval(iv);
      setTimeout(()=>document.getElementById('loader').classList.add('hidden'), 400);
    }
  }, 120);
})();
 
/* ─── PARTICLES ─── */
(function(){
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles=[];
  function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight;}
  resize();window.addEventListener('resize',resize);
  for(let i=0;i<70;i++){
    particles.push({
      x:Math.random()*2000,y:Math.random()*1200,
      vx:(Math.random()-.5)*0.3,vy:(Math.random()-.5)*0.3,
      r:Math.random()*1.5+0.5,
      alpha:Math.random()*0.5+0.1
    });
  }
  function draw(){
    ctx.clearRect(0,0,W,H);
    particles.forEach(p=>{
      p.x+=p.vx;p.y+=p.vy;
      if(p.x<0)p.x=W;if(p.x>W)p.x=0;
      if(p.y<0)p.y=H;if(p.y>H)p.y=0;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(0,212,255,${p.alpha})`;ctx.fill();
    });
    // connection lines
    for(let i=0;i<particles.length;i++){
      for(let j=i+1;j<particles.length;j++){
        const dx=particles[i].x-particles[j].x, dy=particles[i].y-particles[j].y;
        const d=Math.sqrt(dx*dx+dy*dy);
        if(d<120){
          ctx.beginPath();
          ctx.moveTo(particles[i].x,particles[i].y);
          ctx.lineTo(particles[j].x,particles[j].y);
          ctx.strokeStyle=`rgba(0,212,255,${0.12*(1-d/120)})`;
          ctx.lineWidth=0.5;ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();
 
/* ─── HERO SLIDER ─── */
let slideIdx=0;
const slides=document.querySelectorAll('.hero-slide');
const dots=document.querySelectorAll('.dot');
function goSlide(i){
  slides[slideIdx].classList.remove('active');
  dots[slideIdx].classList.remove('active');
  slideIdx=i;
  slides[slideIdx].classList.add('active');
  dots[slideIdx].classList.add('active');
}
setInterval(()=>goSlide((slideIdx+1)%slides.length),5000);
 
/* ─── CIRCUIT LINES ─── */
(function(){
  const cb=document.getElementById('circuit-bg');
  for(let i=0;i<8;i++){
    const l=document.createElement('div');
    l.className='circuit-line';
    l.style.cssText=`top:${10+Math.random()*80}%;height:1px;width:${150+Math.random()*200}px;animation-delay:${Math.random()*6}s;animation-duration:${4+Math.random()*4}s`;
    cb.appendChild(l);
  }
})();
 
/* ─── NAVBAR SCROLL ─── */
const nav=document.getElementById('navbar');
const backTop=document.getElementById('back-top');
window.addEventListener('scroll',()=>{
  nav.classList.toggle('scrolled',window.scrollY>50);
  backTop.classList.toggle('visible',window.scrollY>400);
});
 
/* ─── MOBILE MENU ─── */
function toggleMenu(){
  const m=document.getElementById('mobile-menu');
  m.style.display = m.style.display==='flex' ? 'none' : 'flex';
}
 
/* ─── REVEAL ON SCROLL ─── */
const revealEls=document.querySelectorAll('.reveal');
const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('visible');
      /* Skill bars */
      e.target.querySelectorAll('.bar-fill').forEach(bar=>{
        bar.style.width=bar.dataset.pct+'%';
      });
    }
  });
},{threshold:0.15});
revealEls.forEach(el=>io.observe(el));
 
/* ─── CONTACT FORM ─── */
function submitForm(){
  const n=document.getElementById('f-name').value.trim();
  const e=document.getElementById('f-email').value.trim();
  const m=document.getElementById('f-msg').value.trim();
  if(!n||!e||!m){alert('Please fill in all required fields.');return;}
  const msg=document.getElementById('form-msg');
  msg.style.display='block';
  ['f-name','f-email','f-subject','f-msg'].forEach(id=>document.getElementById(id).value='');
  setTimeout(()=>{msg.style.display='none';},6000);
}