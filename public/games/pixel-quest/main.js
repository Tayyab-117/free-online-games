
const W=960,H=540;
const config={ type:Phaser.AUTO, parent:'game', width:W, height:H, backgroundColor:'#1b2246',
  physics:{ default:'arcade', arcade:{ gravity:{ y:1200 } } }, scene:[Boot,Level] };
let gameRef;

function Boot(){}
Boot.prototype.preload=function(){}
Boot.prototype.create=function(){ this.scene.start('Level',{ index:0, score:0, lives:3 }); }

function Level(){}
Level.prototype.init=function(data){ this.index=data.index||0; this.score=data.score||0; this.lives=data.lives||3; }
Level.prototype.preload=function(){}
Level.prototype.create=function(){
  this.cameras.main.setBackgroundColor('#1b2246');
  this.addBackdrops();
  this.platforms=this.physics.add.staticGroup();
  this.movers=this.physics.add.group({ allowGravity:false, immovable:true });
  this.spikes=this.physics.add.staticGroup();
  this.coins=this.physics.add.group();
  this.enemies=this.physics.add.group();
  this.keys=this.physics.add.group();
  this.door=this.physics.add.staticGroup();

  this.buildLevel(this.index);

  this.player=this.physics.add.sprite(80, 460).setSize(26,38).setCollideWorldBounds(true);
  const pg=this.add.graphics(); pg.fillStyle(0xf39c12); pg.fillRect(0,0,26,38);
  this.player.setData('gfx',pg); this.player.preUpdate=function(){ this.getData('gfx').setPosition(this.x-13,this.y-19); };
  this.player.setBounce(0.05);

  this.cursors=this.input.keyboard.createCursorKeys();
  this.physics.add.collider(this.player, this.platforms);
  this.physics.add.collider(this.player, this.movers, (p,m)=>{ if(m.body){ p.x += m.body.velocity.x * this.game.loop.delta/1000; } }, null, this);
  this.physics.add.overlap(this.player, this.spikes, ()=>this.hitHazard(), null, this);
  this.physics.add.overlap(this.player, this.coins, (p,c)=>{ c.getData('g').destroy(); c.destroy(); this.score+=10; this.updateHUD(); }, null, this);
  this.physics.add.overlap(this.player, this.enemies, ()=>this.hitHazard(), null, this);
  this.physics.add.overlap(this.player, this.keys, (p,k)=>{ k.getData('g').destroy(); k.destroy(); this.doorOpened=true; }, null, this);
  this.physics.add.overlap(this.player, this.door, ()=>{ if(this.doorOpened){ this.nextLevel(); } }, null, this);

  this.time.addEvent({ delay:16, loop:true, callback:()=>this.movePlatforms() });

  this.updateHUD();
  window.__scene=this;
  window.__pause=(force)=>{ this.physics.world.isPaused = (force===true) ? true : !this.physics.world.isPaused; };
  window.restart=()=>{ this.scene.start('Level', { index:0, score:0, lives:3 }); };
}

Level.prototype.addBackdrops=function(){
  const g=this.add.graphics();
  g.fillStyle(0x0f1530); g.fillRect(0,H-40,W,40);
  for(let i=0;i<12;i++){ g.fillStyle(0x20306b); g.fillRect(i*80, 420- (i%2)*20, 60, 14); }
}

Level.prototype.makeRect=function(group,x,y,w,h,color){
  const gfx=this.add.graphics(); gfx.fillStyle(color); gfx.fillRect(x-w/2,y-h/2,w,h);
  const obj=this.physics.add.staticSprite(x,y).setSize(w,h).setVisible(false);
  if(group===this.movers){ this.physics.world.enable(obj); obj.body.allowGravity=false; obj.body.immovable=true; }
  obj.setData('g',gfx); return obj;
}

Level.prototype.addSpike=function(x,y){
  const g=this.add.graphics(); g.fillStyle(0xff4d4d); g.fillTriangle(x-12,y+10,x+12,y+10,x,y-10);
  const s=this.physics.add.staticSprite(x,y).setSize(24,20).setVisible(false);
  this.spikes.add(s); s.setData('g',g);
}

Level.prototype.addCoin=function(x,y){
  const g=this.add.graphics(); g.fillStyle(0xffe066); g.fillCircle(x,y,10);
  const c=this.physics.add.sprite(x,y).setCircle(10); c.body.setAllowGravity(false);
  c.setData('g',g); this.coins.add(c);
}

Level.prototype.addEnemy=function(x,y,pacing=80){
  const e=this.physics.add.sprite(x,y).setSize(24,32).setCollideWorldBounds(true);
  const eg=this.add.graphics(); eg.fillStyle(0x8ab4ff); eg.fillRect(0,0,24,32); e.setData('g',eg); e.preUpdate=function(){ this.getData('g').setPosition(this.x-12,this.y-16); };
  e.body.setVelocityX(pacing); e.setBounce(1,0); this.physics.add.collider(e,this.platforms);
  this.enemies.add(e);
}

Level.prototype.addKey=function(x,y){
  const g=this.add.graphics(); g.fillStyle(0x42d392); g.fillRoundedRect(x-10,y-6,20,12,3);
  const k=this.physics.add.sprite(x,y).setSize(20,12); k.body.setAllowGravity(false);
  k.setData('g',g); this.keys.add(k);
}

Level.prototype.addDoor=function(x,y){
  const g=this.add.graphics(); g.fillStyle(0x8ab4ff); g.fillRect(x-12,y-24,24,48);
  const d=this.physics.add.staticSprite(x,y).setSize(24,48).setVisible(false);
  this.door.add(d); d.setData('g',g);
}

Level.prototype.buildLevel=function(i){
  this.doorOpened=false;
  this.platforms.clear(true,true); this.movers.clear(true,true); this.spikes.clear(true,true);
  this.coins.clear(true,true); this.enemies.clear(true,true); this.keys.clear(true,true); this.door.clear(true,true);

  // Ground
  this.makeRect(this.platforms, W/2, H-20, W, 40, 0x0f1530);

  if(i===0){
    // Tutorial-ish
    this.makeRect(this.platforms, 200, 440, 200, 18, 0x2a3570);
    this.makeRect(this.platforms, 450, 360, 180, 18, 0x2a3570);
    this.makeRect(this.platforms, 720, 300, 180, 18, 0x2a3570);
    [260,450,720].forEach((x,idx)=> this.addCoin(x,  (idx===0?420: (idx===1?340:280)) ));
    this.addSpike(350, 502); this.addSpike(600, 502);
    this.addEnemy(500, 320, 80);
    this.addKey(780, 260); this.addDoor(900, 480);
  } else if(i===1){
    // Moving platforms & more hazards
    const m1=this.makeRect(this.movers, 300, 420, 160, 16, 0x33418f); m1.body.setVelocityX(80);
    const m2=this.makeRect(this.movers, 660, 340, 160, 16, 0x33418f); m2.body.setVelocityX(-80);
    this.makeRect(this.platforms, 120, 300, 160, 16, 0x2a3570);
    this.makeRect(this.platforms, 840, 260, 160, 16, 0x2a3570);
    for(let x=180;x<780;x+=80) this.addSpike(x,502);
    [150,300,450,600,750].forEach(x=> this.addCoin(x, 280));
    this.addEnemy(120, 260, 120); this.addEnemy(840, 220, -120);
    this.addKey(840, 220); this.addDoor(920, 480);
  } else {
    // Boss level: big enemy with HP
    this.makeRect(this.platforms, 200, 440, 220, 18, 0x2a3570);
    this.makeRect(this.platforms, 480, 360, 220, 18, 0x2a3570);
    this.makeRect(this.platforms, 760, 280, 220, 18, 0x2a3570);
    for(let i=0;i<6;i++) this.addSpike(220+i*120, 502);
    [240,480,760].forEach((x,idx)=> this.addCoin(x, (idx===0?420: (idx===1?340:260)) ));
    this.bossHP=10;
    this.boss=this.physics.add.sprite(760, 240).setSize(40,40).setCollideWorldBounds(true);
    const bg=this.add.graphics(); bg.fillStyle(0xff6b6b); bg.fillRect(0,0,40,40); this.boss.setData('g',bg); this.boss.preUpdate=function(){ this.getData('g').setPosition(this.x-20,this.y-20); };
    this.physics.add.collider(this.boss, this.platforms);
    this.time.addEvent({ delay:1000, loop:true, callback:()=>{ const dir=Math.random()<0.5?-1:1; this.boss.setVelocityX(200*dir); this.boss.setVelocityY(-300); }});
    this.physics.add.overlap(this.player, this.boss, ()=>this.hitHazard(), null, this);
    this.addKey(900, 240); this.addDoor(920, 480);
  }
}

Level.prototype.movePlatforms=function(){
  this.movers.children.each(m=>{
    if(!m.body) return;
    if(m.x < 150){ m.body.setVelocityX( Math.abs(m.body.velocity.x) ); }
    if(m.x > W-150){ m.body.setVelocityX( -Math.abs(m.body.velocity.x) ); }
  });
}

Level.prototype.update=function(){
  const speed=230;
  if(this.physics.world.isPaused) return;
  if(this.cursors.left.isDown) this.player.setVelocityX(-speed);
  else if(this.cursors.right.isDown) this.player.setVelocityX(speed);
  else this.player.setVelocityX(0);
  if((this.cursors.up.isDown || this.cursors.space.isDown) && this.player.body.blocked.down) this.player.setVelocityY(-520);

  // Boss damage if player lands on top
  if(this.boss && this.player.body.velocity.y > 150 && this.physics.overlap(this.player, this.boss)){
    this.bossHP -= 1; this.player.setVelocityY(-380);
    if(this.bossHP<=0){ this.boss.getData('g').destroy(); this.boss.destroy(); this.score += 200; this.updateHUD(); }
  }
}

Level.prototype.hitHazard=function(){
  this.lives -= 1;
  this.flash();
  if(this.lives <= 0){ alert('You Died! Score: '+this.score); this.scene.start('Level',{ index:0, score:0, lives:3 }); }
  else { this.player.setPosition(80,460); }
  this.updateHUD();
}

Level.prototype.flash=function(){
  this.cameras.main.flash(200, 255, 80, 80);
}

Level.prototype.updateHUD=function(){
  const heart = (n)=>'♥'.repeat(n);
  document.getElementById('lives').textContent = heart(this.lives);
  document.getElementById('score').textContent = 'Score: ' + this.score;
  document.getElementById('level').textContent = 'Level ' + (this.index+1);
}

Level.prototype.nextLevel=function(){
  if(this.index>=2){ alert('You win! Final Score: ' + this.score); this.scene.start('Level',{ index:0, score:0, lives:3 }); return; }
  this.scene.start('Level',{ index:this.index+1, score:this.score+100, lives:this.lives });
}

gameRef = new Phaser.Game(config);
