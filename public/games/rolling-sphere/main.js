const W=960,H=540;
const config={ type: Phaser.AUTO, parent:'game', width:W, height:H, backgroundColor:'#1b2246', physics:{default:'arcade'}, scene:{preload,create,update} };
let player, obstacles, cursors, lane=1, lanes=[W/2-150,W/2,W/2+150], speed=200, score=0, paused=false, lastSpawn=0, startTime=0;

function preload(){}

function create(){
  player=this.physics.add.circle(lanes[lane], H-80, 18, 0x8ab4ff); player.body.setImmovable(false);
  obstacles=this.physics.add.group();
  cursors=this.input.keyboard.createCursorKeys();
  this.physics.add.overlap(player, obstacles, hit, null, this);
  startTime = this.time.now;
  updateHUD();
  window.togglePause=()=>{ paused=!paused; this.physics.world.isPaused=paused; };
  window.restart=()=>{ this.scene.restart(); score=0; lane=1; speed=200; };
  window.toggleSound=()=>{};
}

function spawn(scene){
  const l = Phaser.Math.Between(0,2);
  const o=scene.physics.add.rectangle(lanes[l], -20, 40, 40, 0xff6b6b);
  obstacles.add(o);
  o.body.setVelocityY(speed);
}

function update(time){
  if(paused) return;
  if(cursors.left.isDown && lane>0){ lane--; player.x=lanes[lane]; cursors.left.reset(); }
  if(cursors.right.isDown && lane<2){ lane++; player.x=lanes[lane]; cursors.right.reset(); }
  if(time-lastSpawn>700){ spawn(this); lastSpawn=time; }
  // clean & score
  obstacles.getChildren().forEach(o=>{
    if(o.y>H+20){ score+=1; o.destroy(); updateHUD(); }
  });
  if(time-startTime>20000){ speed=300; }
  if(time-startTime>40000){ speed=400; }
}

function hit(){ alert('Crashed! Score: '+score); window.restart(); }
function updateHUD(){ document.getElementById('score').textContent='Score: '+score; }

new Phaser.Game(config);
