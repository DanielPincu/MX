<template>
  <div class="error-page h-[1100px] relative">
    <div class="noise"></div>
    <div class="overlay"></div>
    <canvas ref="matrixCanvas" class="absolute top-0 left-0 w-full h-full"></canvas>
    <div class="terminal p-5">
      <div class="pb-32">
        <div class="glitch-text text-[50px]">
          <span>About me</span>
        </div>
        <div class="glitch-scanline">Can you read this?</div>
      </div>
      <h1 class="text-2xl">Hey<span class="text-2xl animate-pulsing">|</span></h1>
      <p class="output text-xl">My name is Daniel Pincu and I have a knack for turning ideas into reality. As a multimedia designer, I thrive on simplicity with a splash of creativity. My mission? Making things look awesome! From logos that leave a lasting impression to motion graphics that bring static images to life, I've got a bit of everything up my sleeve. User interfaces? Consider it done. I'm here to sprinkle a little magic on your project and make it stand out from the crowd.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const matrixCanvas = ref(null);
let matrixAnimationId = null;
const matrixStr = "А+Б0В-Г1Д=Е2Ё Ж3З И4Й К5Л М6Н О7П Р8С Т9У Ф!Х Ц?Ч Ш.ЩЪ,Ы Ь:ЭЮ;Я";
const matrixChars = matrixStr.split("");
let matrixCtx, matrixWidth, matrixHeight, matrixFont, matrixColumns, matrixDrops;

const initMatrixCanvas = () => {
  const canvas = matrixCanvas.value;
  matrixCtx = canvas.getContext("2d");
  matrixWidth = canvas.width = window.innerWidth;
  matrixHeight = canvas.height = window.innerHeight;
  matrixFont = 11;
  matrixColumns = matrixWidth / matrixFont;
  matrixDrops = new Array(Math.ceil(matrixColumns)).fill(1);
};

const drawMatrix = () => {
  matrixCtx.fillStyle = "rgba(0,0,0,.02)";
  matrixCtx.fillRect(0, 0, matrixWidth, matrixHeight);
  matrixCtx.fillStyle = "#0f0";
  matrixCtx.font = matrixFont + "px system-ui";
  for (let i = 0; i < matrixDrops.length; i++) {
    let txt = matrixChars[Math.floor(Math.random() * matrixChars.length)];
    matrixCtx.fillText(txt, i * matrixFont, matrixDrops[i] * matrixFont);
    if (matrixDrops[i] * matrixFont > matrixHeight && Math.random() > 0.9999) matrixDrops[i] = 0;
    matrixDrops[i]++;
  }
  matrixAnimationId = requestAnimationFrame(drawMatrix);
};

onMounted(() => {
  initMatrixCanvas();
  drawMatrix();
  // window.addEventListener("resize", initMatrixCanvas);
});

onUnmounted(() => {
  cancelAnimationFrame(matrixAnimationId);
  window.removeEventListener("resize", initMatrixCanvas);
});
</script>

<style scoped>
@import 'https://fonts.googleapis.com/css?family=Inconsolata';

.error-page {
  background-image: radial-gradient(#11581E, #041607), url("https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif");
  background-repeat: no-repeat;
  background-size: cover;
  font-family: 'Inconsolata', Helvetica, sans-serif;
  color: rgba(128, 255, 128, 0.8);
  text-shadow:
      0 0 1ex rgba(51, 255, 51, 1),
      0 0 2px rgba(255, 255, 255, 0.8);
}

.noise {
  pointer-events: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-image: url("https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZHJpaHgyMmlsdDd1NjUydWdxMnBreWYwamMxMzNpZmd1dDhlYnNlcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/R1Hx2ARr6yOAtTukC2/giphy.gif");
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 20;
  opacity: 0.5;
}



.overlay {
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 100%;
  background:
      repeating-linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0,
      rgba(0, 0, 0, 0.3) 50%,
      rgba(0, 0, 0, 0) 100%);
  background-size: auto 4px;
  z-index: 30;
}

.overlay::before {
  content: "";
  pointer-events: none;
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
      0deg,
      transparent 0%,
      rgba(32, 128, 32, 0.2) 2%,
      rgba(32, 128, 32, 0.8) 3%,
      rgba(32, 128, 32, 0.2) 3%,
      transparent 100%);
  background-repeat: no-repeat;
  animation: scan 7.5s linear 0s infinite;
}

@keyframes scan {
  0%        { background-position: 0 -100vh; }
  30%, 100% { background-position: 0 100vh; }
}

.terminal {
  position: absolute;
  height: 100%;
  max-width: 100%;
}

.output {
  color: rgba(128, 255, 128, 0.8);
  text-shadow:
      0 0 1px rgba(51, 255, 51, 0.4),
      0 0 2px rgba(255, 255, 255, 0.8);
}

.glitch-text {
  position: relative;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  color: green;
  animation: glitch-jerkwhole 10s infinite;
}

.glitch-text span {
  position: absolute;
  color: green;
  filter: blur(2px);
  animation: glitch-blur 30ms infinite, glitch-jerk 50ms infinite;
}

.glitch-scanline {
  width: 100%;
  height: 4px;
  margin-bottom: 5px;
  opacity: 0.05;
  background: rgba(0, 255, 0, 0.1);
}

@keyframes glitch-blur {
  0%, 100% { filter: blur(1px); opacity: 0.8; }
  50% { filter: blur(1px); opacity: 1; }
}

@keyframes glitch-jerk {
  50% { transform: translateX(3px); }
  51% { transform: translateX(0); }
}
</style>
