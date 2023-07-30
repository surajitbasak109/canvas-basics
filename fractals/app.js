window.addEventListener('load', () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  //   canvas settings
  ctx.fillStyle = 'green';
  ctx.lineCap = 'round';

  //   shadow effect
  ctx.shadowColor = 'rgba(0,0,0,0.5)';
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsetY = 5;
  ctx.shadowBlur = 10;

  // effect settings
  const maxLevel = 4;
  const branches = 2;
  const size =
    canvas.width < canvas.height ? canvas.width * 0.3 : canvas.height * 0.3;
  let sides = 5;
  let scale = 0.5;
  let spread = 0.5;
  let color = `hsl(${Math.random() * 360},100%,50%)`;
  let lineWidth = Math.floor(Math.random() * 20 + 10);
  //   controls
  const randomizeButton = document.getElementById('randomizeButton');
  const resetButton = document.getElementById('resetButton');
  const slider_spread = document.getElementById('spread');
  const label_spread = document.querySelector('[for="spread"]');
  const slider_sides = document.getElementById('sides');
  const label_sides = document.querySelector('[for="sides"]');

  slider_spread.addEventListener('change', (e) => {
    spread = Number(e.target.value);
    updateSliders();
    drawFractal();
  });

  slider_sides.addEventListener('change', (e) => {
    sides = Number(e.target.value);
    updateSliders();
    drawFractal();
  });

  randomizeButton.addEventListener('click', () => {
    randomizeFractal();
    updateSliders();
    drawFractal();
  });

  resetButton.addEventListener('click', () => {
    resetFactral();
    updateSliders();
    drawFractal();
  });

  function drawBranch(level) {
    if (level > maxLevel) return;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(size, 0);
    ctx.stroke();

    for (let i = 0; i < branches; i++) {
      ctx.save();
      ctx.translate(size - (size / branches) * i, 0);
      ctx.scale(scale, scale);

      ctx.save();
      ctx.rotate(spread);
      drawBranch(level + 1);
      ctx.restore();

      ctx.save();
      ctx.rotate(-spread);
      drawBranch(level + 1);
      ctx.restore();

      ctx.restore();
    }
  }

  function drawFractal() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.translate(canvas.width / 2, canvas.height / 2);

    for (let i = 0; i < sides; i++) {
      ctx.rotate((Math.PI * 2) / sides);
      drawBranch(0);
    }
    ctx.restore();
    randomizeButton.style.backgroundColor = color;
  }

  function randomizeFractal() {
    sides = Math.floor(Math.random() * 7 + 2);
    scale = Math.random() * 0.2 + 0.4;
    spread = Math.random() * 2.9 + 0.1;
    color = `hsl(${Math.random() * 360},100%,50%)`;
    lineWidth = Math.floor(Math.random() * 20 + 10);
  }

  function resetFactral() {
    sides = 5;
    scale = 0.5;
    spread = 0.7;
    color = `hsl(290,100%,50%)`;
    lineWidth = 15;
  }

  function updateSliders() {
    slider_spread.value = spread;
    label_spread.innerText = `Spread: ${spread.toFixed(1)}`;
    slider_sides.value = sides;
    label_sides.innerText = `Sides: ${sides.toFixed(1)}`;
  }

  drawFractal();
  updateSliders();
});
