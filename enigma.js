// enigma.Grid reproduction (simplified)
const holder = document.getElementById('holder');
const output = document.getElementById('output');
const input = document.getElementById('input');

function makeGrid(cols = 36, rows = 18){
  holder.innerHTML = '';
  for(let i=0;i<cols*rows;i++){
    const el = document.createElement('div');
    el.className = 'inner';
    const dot = document.createElement('div');
    dot.className = 'dot';
    el.appendChild(dot);
    holder.appendChild(el);
  }
  holder.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
}

function randomColor(){
  const r=Math.floor(Math.random()*255);
  const g=Math.floor(Math.random()*255);
  const b=Math.floor(Math.random()*255);
  return `rgba(${r},${g},${b},`;
}

function updatePattern(){
  const inners = Array.from(document.querySelectorAll('.inner'));
  inners.forEach(i=>{
    const dot = i.querySelector('.dot');
    if(Math.random()>.6){
      const c = randomColor()+ (0.6+Math.random()*0.4) +')';
      dot.style.background = c;
      dot.style.boxShadow = `0 0 12px 3px ${c}`;
    } else {
      dot.style.background = 'transparent';
      dot.style.boxShadow = 'none';
    }
  });
  // fake encryption output
  output.textContent = Math.random().toString(36).slice(2,12).toUpperCase();
}

// responsive grid sizing
function fitGrid(){
  const w = window.innerWidth;
  let cols = 36; let rows = 18;
  if(w < 900){ cols = 18; rows = 10; }
  if(w < 480){ cols = 12; rows = 8; }
  makeGrid(cols, rows);
  updatePattern();
}

window.addEventListener('resize', fitGrid);
fitGrid();
setInterval(updatePattern, 2400);

// canvas ambient noise (subtle) - simplified
const canvas = document.getElementById('view');
const ctx = canvas.getContext('2d');
function resize(){ canvas.width = innerWidth; canvas.height = innerHeight; }
window.addEventListener('resize', resize); resize();

function noise(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for(let i=0;i<150;i++){
    ctx.fillStyle = 'rgba(255,255,255,'+(Math.random()*0.02)+')';
    ctx.fillRect(Math.random()*canvas.width, Math.random()*canvas.height, Math.random()*2, Math.random()*2);
  }
  requestAnimationFrame(noise);
}
noise();
