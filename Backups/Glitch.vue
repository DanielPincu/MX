<template>
    <div class="glitch-image rounded-full h-full">
      <canvas ref="pixelArt" id="pixelArt"></canvas>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const pixelArt = ref(null); // Changed from canvas to pixelArt
const img = new Image();
const pr = window.devicePixelRatio || 1;
const w = 800;
const h = 600;
let ctx, imgData, data, width, height;
let currentFrame = 0;
const totalFrame = 5;
let offset = 0.1;

const init = () => {
  width = w * pr;
  height = h * pr;
  pixelArt.value.width = 800; // Updated variable name here
  pixelArt.value.height = 600; // Updated variable name here
  offset = width * offset;
};

const glitchAnimation = () => {
  if (!(currentFrame % totalFrame) || currentFrame > totalFrame) {
    clearCanvas();

    ctx.drawImage(img, 0, 0, img.width, img.height, offset, 0, width - offset * 2, height);

    imgData = ctx.getImageData(0, 0, width, height);

    imgData = pixelProcessor(imgData, 4, pixelCooler);

    ctx.putImageData(imgData, 0, 0);

    currentFrame = 0;
  }

  if (currentFrame === randInt(0, totalFrame)) {
    imgData = pixelProcessor(imgData, 1, pixelFlick);
    ctx.putImageData(imgData, 0, 0);

    drawGlitch(width, height, randInt(3, 10), glitchBlock);
    drawGlitch(width, height, randInt(3, 30), glitchLine);
  }

  currentFrame++;

  window.requestAnimationFrame(glitchAnimation);
};

const pixelFlick = (i, d) => {
  d[i] = d[i + 16];
};

const pixelCooler = (i, d) => {
  d[i] = 1;
  d[i + 1] += randInt(2, 5);
  d[i + 2] *= randInt(1, 3) + 8;
};

const glitchBlock = (i, x, y) => {
  if (i > 3) {
    const spliceHeight = 1 + randInt(0, 10);

    ctx.drawImage(pixelArt.value, x, y, x, spliceHeight, randInt(0, x), y, randInt(x, width), spliceHeight); // Updated variable name here
  }
};

const glitchLine = (i, x, y) => {
  const spliceHeight = 1 + randInt(1, 50);

  ctx.drawImage(pixelArt.value, offset, y, width - offset * 2, spliceHeight, 1 + randInt(0, offset * 2), y + randInt(0, 10), width - offset, spliceHeight); // Updated variable name here
};

const pixelProcessor = (imageData, step, callback) => {
  const data = imageData.data || [];
  const stepSize = step * 4 || 4;

  if (data.length) {
    for (let i = 0; i < data.length; i += stepSize) {
      callback && callback(i, data);
    }

    return imageData;
  } else {
    return imageData;
  }
};

const drawGlitch = (width, height, amount, callback) => {
  for (let i = 0; i < (amount || 10); i++) {
    const x = Math.random() * width + 1;
    const y = Math.random() * height + 1;

    callback(i, x, y);
  }
};

const randInt = (a, b) => {
  return ~~(Math.random() * (b - a) + a);
};

const clearCanvas = () => {
  ctx.clearRect(0, 0, width, height);
};

onMounted(() => {
  ctx = pixelArt.value.getContext('2d'); // Updated variable name here
  img.crossOrigin = 'Anonymous';
  img.src = 'https://zupra.github.io/test/filter.jpg';
  img.onload = () => {
    init();
    glitchAnimation();
  };
});
</script>

<style scoped>
body {
  margin: 0;
  background: #373537;
  height: 100vh;
  overflow: hidden;
}

.glitch-image {
  animation: flick 80ms linear infinite;
}

#pixelArt {
  height: 100vh;
  transform: rotateX(90deg);
  animation: turnOn 100ms ease-in 500ms forwards;
}

@keyframes flick {
  0% {
    opacity: .8;
  }
  100% {
    opacity: .9;
  }
}

@keyframes turnOn {
  0% {
    transform: rotateX(90deg);
    filter: brightness(5);
  }
  100% {
    transform: rotateX(0);
    filter: brightness(1);
  }
}
</style>
