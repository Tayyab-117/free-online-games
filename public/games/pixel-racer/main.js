const W=960,H=540; const config={ type:Phaser.AUTO,parent:'game',width:W,height:H,backgroundColor:'#1b2246', physics:{default:'arcade'}, scene:{preload,create,update} };
let car, cursors, obstacles, lap=0, totalTime=0, startLap=0, paused=false;
function preload(){}
function create(){
  window.__scene=this;
  this.add.rectangle(W/2,H/2, W*0.6,H, 0x2a3570);
  car=this.physics.add.rectangle(W/2, H-60, 32, 48, 0xf39c12);
  car.body.setDrag(200); car.body.setMaxVelocity(300);
  cursors=this.input.keyboard.createCursorKeys();
  obstacles=this.physics.add.group();
  for(let i=0;i<8;i++){ const x=Phaser.Math.Between(W/2-250, W/2+250); const y=Phaser.Math.Between(80,H-200); const obs=this.physics.add.rectangle(x,y, 30, 30, 0xff6b6b); obstacles.add(obs); }
  this.physics.add.collider(car, obstacles, crash, null, this);
  startLap=this.time.now;
  updateHUD();
}
function update(time,delta){
  if(paused) return;
  const accel=300;
  if(cursors.up.isDown) this.physics.velocityFromRotation(-Math.PI/2, accel, car.body.acceleration);
  else if(cursors.down.isDown) this.physics.velocityFromRotation(Math.PI/2, accel, car.body.acceleration);
  else car.body.setAcceleration(0);
  if(cursors.left.isDown) car.body.setAngularVelocity(-200);
  else if(cursors.right.isDown) car.body.setAngularVelocity(200);
  else car.body.setAngularVelocity(0);
  if(car.y < 60){ lap+=1; const lapTime=(time-startLap)/1000; totalTime+=lapTime; startLap=time; updateHUD(); if(lap>=3){ alert('Finished! Total time: '+totalTime.toFixed(2)+'s'); location.reload(); } }
}
function crash(){ alert('Crashed! Laps: '+lap+' Total: '+totalTime.toFixed(2)+'s'); location.reload(); }
function updateHUD(){ document.getElementById('score').textContent='Lap: '+lap+'  Total: '+totalTime.toFixed(2)+'s'; }
window.__pause=(force)=>{ paused = (force===true)? true : !paused; if(window.__scene && window.__scene.physics){ window.__scene.physics.world.isPaused=paused; } };
window.restart=()=>{ location.reload(); };
window._game && window._game.destroy(true); window._game=new Phaser.Game(config);
