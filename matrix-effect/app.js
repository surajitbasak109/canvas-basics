const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const createRadialGradient = () => {
  const halfCanvasWidth = canvas.width / 2;
  const halfCanvasHeight = canvas.height / 2;

  let gradient = ctx.createRadialGradient(
    halfCanvasWidth,
    halfCanvasHeight,
    100,
    halfCanvasWidth,
    halfCanvasHeight,
    halfCanvasWidth
  );
  gradient.addColorStop(0, 'red');
  gradient.addColorStop(0.6, 'cyan');
  gradient.addColorStop(1, 'magenta');

  return gradient;
};

let gradient = createRadialGradient();

class Symbol {
  constructor(x, y, fontSize, canvasHeight) {
    this.characters =
      'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ♔♕♖♗♘♙CHESS♚♛♜♝♞♟☀☁❆WEATHER❅❄♪MUSIC♫';
    this.x = x;
    this.y = y;
    this.fontSize = fontSize;
    this.character = '';
    this.canvasHeight = canvasHeight;
  }
  draw(context) {
    this.character = this.characters.charAt(
      Math.floor(Math.random() * this.characters.length)
    );
    context.fillText(
      this.character,
      this.x * this.fontSize,
      this.y * this.fontSize
    );

    if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.95) {
      this.y = 0;
    } else {
      this.y += 1;
    }
  }
}

class Effect {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.fontSize = 25;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];

    this.#initialize();
  }
  #initialize() {
    for (let i = 0; i < this.columns; i++) {
      this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
    }
  }
  resize(width, height) {
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];

    this.#initialize();
  }
}

const effect = new Effect(canvas.width, canvas.height);
let lastTime = 0;
const fps = 30;
const nextFrame = 1000 / fps;
let timer = 0;

function animate(timestamp) {
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  if (timer > nextFrame) {
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.textAlign = 'center';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${effect.fontSize}px monospace`;
    ctx.fillStyle = gradient; //'#0aff0a';
    effect.symbols.forEach((symbol) => symbol.draw(ctx));
    timer = 0;
  } else {
    timer += deltaTime;
  }

  requestAnimationFrame(animate);
}

animate(0);

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  gradient = createRadialGradient();

  effect.resize(canvas.width, canvas.height);
});
