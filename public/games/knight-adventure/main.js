const config = {
  type: Phaser.AUTO, parent: 'game', width: 960, height: 540, backgroundColor: '#1b2246',
  physics: { default: 'arcade', arcade: { gravity: { y: 900 }, debug: false } },
  scene: { preload, create, update }
};
const HS_KEY='hs-knight'; let player, cursors, platforms, coins, spikes, score=0, timeLeft=120, paused=false, musicOn=false, timerEvt;

function preload(){
  // Use simple graphics; no external assets
}

function create(){
  // Camera & world
  this.cameras.main.setBackgroundColor('#1b2246');

  platforms = this.physics.add.staticGroup();
  // ground
  platforms.create(480, 520, null).setScale(20,1).refreshBody().setSize(960,40).setVisible(false);
  // some platforms
  platforms.create(200, 420, null).setScale(4,1).refreshBody().setSize(200,30).setVisible(false);
  platforms.create(500, 350, null).setScale(3,1).refreshBody().setSize(150,30).setVisible(false);
  platforms.create(800, 280, null).setScale(3,1).refreshBody().setSize(150,30).setVisible(false);

  // draw rectangles for visuals
  const g = this.add.graphics();
  g.fillStyle(0x0f1530); g.fillRect(0,500,960,40);
  g.fillStyle(0x2a3570); g.fillRect(100,420,200,20);
  g.fillStyle(0x2a3570); g.fillRect(425,350,150,20);
  g.fillStyle(0x2a3570); g.fillRect(725,280,150,20);

  // player
  player = this.physics.add.sprite(80, 470, null).setSize(28,40).setOffset(0,0);
  const pg = this.add.graphics(); pg.fillStyle(0xf39c12); pg.fillRect(0,0,28,40);
  player.setBounce(0.1); player.setCollideWorldBounds(true);
  player.setData('gfx', pg);
  player.preUpdate = function(time, delta){ const p=this; p.getData('gfx').setPosition(p.x-14,p.y-20); };

  this.physics.add.collider(player, platforms);

  // coins
  coins = this.physics.add.group();
  for (const HS_KEY='hs-knight'; let i=0;i<10;i++){
    const x = 140 + i*80; const y = Phaser.Math.Between(150, 420);
    const c = this.physics.add.sprite(x,y,null).setCircle(10);
    const cg = this.add.graphics(); cg.fillStyle(0xffe066); cg.fillCircle(0,0,10);
    c.setData('gfx', cg); c.preUpdate = function(){ this.getData('gfx').setPosition(this.x,this.y); };
    coins.add(c);
  }
  this.physics.add.overlap(player, coins, (p,c)=>{ c.getData('gfx').destroy(); c.destroy(); score+=10; updateHUD(); }, null, this);

  // spikes
  spikes = this.physics.add.group({ allowGravity:false, immovable:true });
  for (const HS_KEY='hs-knight'; let i=0;i<6;i++){
    const x = 200 + i*120; const s = this.physics.add.sprite(x, 500, null);
    const sg = this.add.graphics(); sg.fillStyle(0xff3b3b); sg.fillTriangle(-10,10, 10,10, 0,-10);
    s.setData('gfx', sg); s.preUpdate=function(){ this.getData('gfx').setPosition(this.x,this.y); };
    spikes.add(s);
  }
  this.physics.add.overlap(player, spikes, gameOver, null, this);

  // flag (win)
  const flagX=900, flagY=460;
  const fg = this.add.graphics(); fg.fillStyle(0x42d392); fg.fillRect(flagX-5, flagY-60, 10, 60); fg.fillStyle(0x8ab4ff); fg.fillTriangle(flagX+5, flagY-60, flagX+70, flagY-45, flagX+5, flagY-30);
  const flag = this.physics.add.staticSprite(flagX, flagY, null).setSize(20,60).setVisible(false);
  this.physics.add.overlap(player, flag, win, null, this);

  cursors = this.input.keyboard.createCursorKeys();
  timerEvt = this.time.addEvent({ delay:1000, loop:true, callback:()=>{ if(!paused){ timeLeft--; updateHUD(); if(timeLeft<=0) gameOver(); } } });

  updateHUD();
  window.__pause = (force)=>{ paused = (force===true)? true : !paused; if(this && this.physics){ this.physics.world.isPaused = paused; } }; window.togglePause = ()=>{ paused=!paused; this.physics.world.isPaused = paused; };
  window.restart = ()=>{ this.scene.restart(); score=0; timeLeft=120; };
  window.toggleSound = ()=>{ musicOn = !musicOn; };
}

function update(){
  if(paused) return;
  const speed=220;
  if(cursors.left.isDown) player.setVelocityX(-speed);
  else if(cursors.right.isDown) player.setVelocityX(speed);
  else player.setVelocityX(0);
  if((cursors.up.isDown || cursors.space.isDown) && player.body.blocked.down) player.setVelocityY(-430);
}

function updateHUD(){
  document.getElementById('score').textContent = 'Score: ' + score;
  document.getElementById('timer').textContent = '  Time: ' + timeLeft + 's';
}

function gameOver(){ alert('Game Over! Score: '+score); restart(); }
function win(){ score += 100; alert('You win! Score: '+score); restart(); }

new Phaser.Game(config);

function getHS(){ try{ return parseInt(localStorage.getItem(HS_KEY)||'0',10);}catch{return 0;} }
function setHS(v){ try{ const p=getHS(); if(v>p) localStorage.setItem(HS_KEY, String(v)); }catch{} }

// Hook score updates
function updateHUD(){
  document.getElementById('score').textContent = 'Score: ' + score + '  HS: ' + getHS();
  document.getElementById('timer').textContent = '  Time: ' + timeLeft + 's';
}
function gameOver(){ setHS(score); showOverlay('Game Over! Score: '+score); }
function win(){ score += 100; setHS(score); showOverlay('You win! Score: '+score); }
// Mobile control read
function mobileLeft(){ return window.__mobile && window.__mobile.left; }
function mobileRight(){ return window.__mobile && window.__mobile.right; }
function mobileUp(){ return window.__mobile && window.__mobile.up; }
