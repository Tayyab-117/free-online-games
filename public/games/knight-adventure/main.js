const config = { type: Phaser.AUTO, parent:'game', width:960, height:540, backgroundColor:'#1b2246',
  physics:{ default:'arcade', arcade:{ gravity:{ y:900 } } }, scene:{ preload, create, update } };
let player, cursors, platforms, coins, spikes, score=0, timeLeft=120, paused=false, timerEvt;

function preload(){}
function create(){
  window.__scene = this;
  platforms = this.physics.add.staticGroup();
  platforms.create(480,520).setScale(20,1).refreshBody().setSize(960,40).setVisible(false);
  platforms.create(200,420).setScale(4,1).refreshBody().setSize(200,20).setVisible(false);
  platforms.create(500,350).setScale(3,1).refreshBody().setSize(150,20).setVisible(false);
  platforms.create(800,280).setScale(3,1).refreshBody().setSize(150,20).setVisible(false);
  const g=this.add.graphics(); g.fillStyle(0x0f1530); g.fillRect(0,500,960,40); g.fillStyle(0x2a3570);
  g.fillRect(100,420,200,20); g.fillRect(425,350,150,20); g.fillRect(725,280,150,20);

  player=this.physics.add.sprite(80,470).setSize(28,40);
  const pg=this.add.graphics(); pg.fillStyle(0xf39c12); pg.fillRect(0,0,28,40);
  player.setBounce(0.1).setCollideWorldBounds(true).setData('gfx',pg);
  player.preUpdate=function(){ this.getData('gfx').setPosition(this.x-14,this.y-20); };
  this.physics.add.collider(player, platforms);

  coins=this.physics.add.group();
  for(let i=0;i<10;i++){ const x=140+i*80, y=Phaser.Math.Between(150,420);
    const c=this.physics.add.sprite(x,y); const cg=this.add.graphics(); cg.fillStyle(0xffe066); cg.fillCircle(0,0,10);
    c.setCircle(10).setData('gfx',cg); c.preUpdate=function(){ this.getData('gfx').setPosition(this.x,this.y); };
    coins.add(c);
  }
  this.physics.add.overlap(player, coins, (p,c)=>{ c.getData('gfx').destroy(); c.destroy(); score+=10; updateHUD(); }, null, this);

  spikes=this.physics.add.group({ allowGravity:false, immovable:true });
  for (let i=0;i<6;i++){ const x=200+i*120, s=this.physics.add.sprite(x,500); const sg=this.add.graphics(); sg.fillStyle(0xff3b3b); sg.fillTriangle(-10,10,10,10,0,-10); s.setData('gfx',sg); s.preUpdate=function(){ this.getData('gfx').setPosition(this.x,this.y); }; spikes.add(s); }
  this.physics.add.overlap(player, spikes, gameOver, null, this);

  const fg=this.add.graphics(); const flagX=900, flagY=460; fg.fillStyle(0x42d392); fg.fillRect(flagX-5,flagY-60,10,60); fg.fillStyle(0x8ab4ff); fg.fillTriangle(flagX+5,flagY-60,flagX+70,flagY-45,flagX+5,flagY-30);
  const flag=this.physics.add.staticSprite(flagX,flagY).setSize(20,60).setVisible(false);
  this.physics.add.overlap(player, flag, win, null, this);

  cursors=this.input.keyboard.createCursorKeys();
  timerEvt=this.time.addEvent({ delay:1000, loop:true, callback:()=>{ if(!paused){ timeLeft--; updateHUD(); if(timeLeft<=0) gameOver(); } } });
  updateHUD();
}
function update(){
  if(paused) return;
  const speed=220;
  const left = cursors.left.isDown;
  const right = cursors.right.isDown;
  if(left) player.setVelocityX(-speed); else if(right) player.setVelocityX(speed); else player.setVelocityX(0);
  if((cursors.up.isDown || cursors.space.isDown) && player.body.blocked.down) player.setVelocityY(-430);
}
function updateHUD(){ document.getElementById('score').textContent='Score: '+score; document.getElementById('timer').textContent='  Time: '+timeLeft+'s'; }
function gameOver(){ alert('Game Over! Score: '+score); restart(); }
function win(){ score+=100; alert('You win! Score: '+score); restart(); }
window.__pause=(force)=>{ paused = (force===true)? true : !paused; if(window.__scene && window.__scene.physics){ window.__scene.physics.world.isPaused=paused; } };
window.restart=()=>{ location.reload(); };
window._game && window._game.destroy(true); window._game=new Phaser.Game(config);
