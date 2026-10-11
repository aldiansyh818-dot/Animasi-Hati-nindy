const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

let width, height;
let particles = [];
const jumlahPartikel = 2500;

const colors = [
  "#ff4d88",
  "#ff85ad",
  "#ffc0cb",
  "#ffd6a5",
  "#f7a8ff",
  "#ffffff"
];

function aturUkuran() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  buatPartikel();
}

function bentukHati(t) {
  return {
    x: 16 * Math.pow(Math.sin(t), 3),
    y: 13 * Math.cos(t)
      - 5 * Math.cos(2 * t)
      - 2 * Math.cos(3 * t)
      - Math.cos(4 * t)
  };
}

function buatPartikel() {
  particles = [];

  const scale = Math.min(width, height) / 34;

  for (let i = 0; i < jumlahPartikel; i++) {
    const t = Math.random() * Math.PI * 2;
    const p = bentukHati(t);

    // Mengisi bagian dalam hati
    const spread = Math.sqrt(Math.random());

    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      tx: width / 2 + p.x * scale * spread,
      ty: height / 2 - p.y * scale * spread,
      size: Math.random() * 2.5 + 1,
      color: colors[
        Math.floor(Math.random() * colors.length)
      ],
      speed: Math.random() * 0.025 + 0.02,
      phase: Math.random() * Math.PI * 2
    });
  }
}

let start = performance.now();

function animate(now) {
  ctx.clearRect(0, 0, width, height);

  const time = (now - start) / 1000;
  const pulse = 1 + 0.025 * Math.sin(time * 3);

  for (const p of particles) {
    p.x += (p.tx - p.x) * p.speed;
    p.y += (p.ty - p.y) * p.speed;

    const twinkle =
      0.7 + 0.3 * Math.sin(time * 3 + p.phase);

    const x =
      width / 2 + (p.x - width / 2) * pulse;
    const y =
      height / 2 + (p.y - height / 2) * pulse;

    ctx.beginPath();
    ctx.arc(x, y, p.size * twinkle, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = p.color;
    ctx.fill();
  }

  ctx.shadowBlur = 0;
  requestAnimationFrame(animate);
}

window.addEventListener("resize", aturUkuran);

aturUkuran();
requestAnimationFrame(animate);