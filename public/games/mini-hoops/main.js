const W=960,H=540;
const config={ type: Phaser.AUTO, parent:'game', width:W, height:H, backgroundColor:'#1b2246', physics:{default:'arcade', arcade:{gravity:{y:1000}}}, scene:{preload,create,update} };
const HS_KEY='hs-hoops'; let ball, rim, score=0, timeLeft=60, dragging=false, startPos=null, paused=false, timerEvt;

function preload(){}

function create(){
  window.__scene = this;
  this.add.rectangle(W/2, H-20, W, 40, 0x0f1530);
  rim = this.physics.add.staticGroup();
  const back = this.add.rectangle(W/2+200,200,10,120,0xffffff); this.physics.add.existing(back,true);
  const hoop = this.add.rectangle(W/2,220,120,10,0xff6b6b); this.physics.add.existing(hoop,true);
  rim.add(back); rim.add(hoop);

  ball = this.physics.add.circle(W/2, H-60, 18, 0xffe066);
  ball.setBounce(0.7); ball.setCollideWorldBounds(true);
  this.physics.add.collider(ball, rim);

  this.input.on('pointerdown',(p)=>{ dragging=true; startPos={x:p.x,y:p.y}; });
  this.input.on('pointerup',(p)=>{
    if(!dragging) return; dragging=false;
    const dx = p.x - startPos.x, dy = p.y - startPos.y;
    ball.setVelocity(dx*3, dy*3);
  });

  // scoring zone below hoop
  const zone = this.add.zone(W/2, 260, 100, 40);
  this.physics.world.enable(zone);
  zone.body.setAllowGravity(false);
  zone.body.moves=false;
  this.physics.add.overlap(ball, zone, scored, null, this);

  timerEvt = this.time.addEvent({ delay:1000, loop:true, callback:()=>{ if(!paused){ timeLeft--; updateHUD(); if(timeLeft<=0) gameOver.call(this); } } });
  updateHUD();
  window.__pause = (force)=>{ try{ paused = (force===true)? true : !paused; if(window.__scene && window.__scene.physics){ window.__scene.physics.world.isPaused = paused; } }catch(e){ console.warn('pause failed', e);} }; window.togglePause=()=>{ paused=!paused; this.physics.world.isPaused=paused; };
  window.restart=()=>{ this.scene.restart(); score=0; timeLeft=60; };
  window.toggleSound=()=>{};
}

function scored(){
  score+=2; updateHUD();
}

function updateHUD(){
  document.getElementById('score').textContent='Score: '+score;
  document.getElementById('timer').textContent='  Time: '+timeLeft+'s';
}
function gameOver(){ alert('Time up! Score: '+score); window.restart(); }

function update(){}

window._game && window._game.destroy(true);
window._game = new Phaser.Game(config);
window.addEventListener('beforeunload', ()=>{ try{ window._game && window._game.destroy(true); }catch{} });

function getHS(){ try{ return parseInt(localStorage.getItem(HS_KEY)||'0',10);}catch{return 0;} }
function setHS(v){ try{ const p=getHS(); if(v>p) localStorage.setItem(HS_KEY, String(v)); }catch{} }

let lastScoreAt = 0;
function updateHUD(){
  document.getElementById('score').textContent='Score: '+score+'  HS: '+getHS();
  document.getElementById('timer').textContent='  Time: '+timeLeft+'s';
}
function scored(){
  const now = performance.now();
  if(now - lastScoreAt < 600) return;
  lastScoreAt = now;
  score+=2; updateHUD();
}
function gameOver(){ setHS(score); showOverlay('Time up! Score: '+score); }
