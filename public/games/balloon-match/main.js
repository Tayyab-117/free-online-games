const W=960,H=540;
const config = { type: Phaser.AUTO, parent:'game', width:W, height:H, backgroundColor:'#1b2246', physics:{default:'arcade'}, scene:{preload,create,update} };
const HS_KEY='hs-balloons'; let cannon, balls, grid=[], colors=[0xff6b6b,0x8be9fd,0xffe066,0xadff2f], score=0, paused=false, musicOn=false;

function preload(){}

function create(){
  window.__scene = this;
  const g=this.add.graphics();
  // top cluster
  for(const HS_KEY='hs-balloons'; let r=0;r<6;r++){
    grid[r]=[];
    for(const HS_KEY='hs-balloons'; let c=0;c<12;c++){
      const x=60 + c*70 + (r%2?35:0), y=60 + r*60;
      const col = Phaser.Utils.Array.GetRandom(colors);
      const s=this.add.circle(x,y,20,col).setData('row',r).setData('col',c);
      this.physics.add.existing(s); s.body.setCircle(20); s.body.immovable=true; s.body.moves=false;
      grid[r][c]=s;
    }
  }
  cannon = this.add.triangle(W/2,H-40, 0,40, 30,0, 60,40, 0xf39c12);
  balls=this.physics.add.group();

  this.input.on('pointerdown',(p)=> shoot.call(this,p));

  updateHUD();
  window.__pause = (force)=>{ try{ paused = (force===true)? true : !paused; if(window.__scene && window.__scene.physics){ window.__scene.physics.world.isPaused = paused; } }catch(e){ console.warn('pause failed', e);} }; window.togglePause=()=>{ paused=!paused; };
  window.restart=()=>{ this.scene.restart(); score=0; };
  window.toggleSound=()=>{ musicOn=!musicOn; };
}

function shoot(p){
  if(paused) return;
  const b = this.add.circle(W/2, H-60, 18, Phaser.Utils.Array.GetRandom(colors));
  this.physics.add.existing(b);
  balls.add(b);
  const angle = Phaser.Math.Angle.Between(W/2,H-60, p.x, p.y);
  const speed=500;
  b.body.setVelocity(Math.cos(angle)*speed, Math.sin(angle)*speed);
}

function snapToGrid(x,y){
  // approximate row/col
  const HS_KEY='hs-balloons'; let r = Math.round((y-60)/60);
  const HS_KEY='hs-balloons'; let c = Math.round((x-60-(r%2?35:0))/70);
  r=Math.max(0,Math.min(10,r)); c=Math.max(0,Math.min(12,c));
  const rx = 60 + c*70 + (r%2?35:0), ry=60 + r*60;
  return {r,c,x:rx,y:ry};
}

function update(){
  balls.getChildren().forEach(b=>{
    if(b.y<40){ placeBall.call(this,b); }
    // bounce on walls
    if(b.x<20 || b.x>W-20){ b.body.setVelocityX(-b.body.velocity.x); }
  });
}

function placeBall(b){
  const {r,c,x,y} = snapToGrid(b.x,b.y);
  if(!grid[r]) grid[r]=[];
  if(grid[r][c]){ b.destroy(); return; }
  const s=this.add.circle(x,y,20,b.fillColor).setData('row',r).setData('col',c);
  this.physics.add.existing(s); s.body.setCircle(20); s.body.immovable=true; s.body.moves=false;
  grid[r][c]=s;
  b.destroy();
  // check matches
  const cluster = flood(r,c,s.fillColor);
  if(cluster.length>=3){
    cluster.forEach(k=>{ grid[k.r][k.c].destroy(); grid[k.r][k.c]=null; score+=10; });
    updateHUD();
  }
}

function flood(r,c,color,seen=new Set()){
  const key=r+','+c; if(seen.has(key)) return [];
  seen.add(key);
  const node=grid[r]&&grid[r][c]; if(!node || node.fillColor!==color) return [];
  const HS_KEY='hs-balloons'; let res=[{r,c}];
  const neigh = [[1,0],[-1,0],[0,1],[0,-1],[r%2?1:-1,1],[r%2?1:-1,-1]];
  for(const [dr,dc] of neigh){ res=res.concat(flood(r+dr,c+dc,color,seen)); }
  return res;
}

function updateHUD(){ document.getElementById('score').textContent='Score: '+score; }

window._game && window._game.destroy(true);
window._game = new Phaser.Game(config);
window.addEventListener('beforeunload', ()=>{ try{ window._game && window._game.destroy(true); }catch{} });

function getHS(){ try{ return parseInt(localStorage.getItem(HS_KEY)||'0',10);}catch{return 0;} }
function setHS(v){ try{ const p=getHS(); if(v>p) localStorage.setItem(HS_KEY, String(v)); }catch{} }

function updateHUD(){ document.getElementById('score').textContent='Score: '+score+'  HS: '+getHS(); }
function gameOver(){ setHS(score); showOverlay('You lose! Score: '+score); }
function checkLose(){
  for(let r=0;r<grid.length;r++){
    for(let c=0;c<(grid[r]?grid[r].length:0);c++){
      const n = grid[r][c];
      if(n && n.y > (H-80)){ gameOver(); return true; }
    }
  }
  return false;
}
