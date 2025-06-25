const canvas = document.getElementById('corazones');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const corazones = [];

function crearCorazon() {
  return {
    x: Math.random() * width,
    y: height + 20,
    size: 10 + Math.random() * 20,
    speed: 1 + Math.random() * 2,
    alpha: 1
  };
}

function dibujarCorazon(c) {
  ctx.save();
  ctx.globalAlpha = c.alpha;
  ctx.fillStyle = '#ff4d88';
  ctx.beginPath();
  ctx.moveTo(c.x, c.y);
  ctx.bezierCurveTo(c.x - c.size / 2, c.y - c.size / 2, c.x - c.size, c.y + c.size / 3, c.x, c.y + c.size);
  ctx.bezierCurveTo(c.x + c.size, c.y + c.size / 3, c.x + c.size / 2, c.y - c.size / 2, c.x, c.y);
  ctx.fill();
  ctx.restore();
}

function animar() {
  ctx.clearRect(0, 0, width, height);
  if (Math.random() < 0.05) {
    corazones.push(crearCorazon());
  }

  for (let i = 0; i < corazones.length; i++) {
    let c = corazones[i];
    c.y -= c.speed;
    c.alpha -= 0.005;
    dibujarCorazon(c);
  }

  // eliminar corazones invisibles
  for (let i = corazones.length - 1; i >= 0; i--) {
    if (corazones[i].alpha <= 0) corazones.splice(i, 1);
  }

  requestAnimationFrame(animar);
}

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

animar();
