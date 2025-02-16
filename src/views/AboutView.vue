<template>
  <div class="error-page md:h-[1800px] xl:h-[1500px] h-[1200px] relative">
    <div class="noise"></div>
    <!-- <div class="overlay"></div> -->
    <canvas ref="matrixCanvas" class="absolute top-0 left-0 w-full h-full"></canvas>
    <div class="terminal p-5">
      <div class="md:pb-0 pb-32">

        <div class="md:flex hidden justify-center pb-5">
              <Keyboard />
          </div>

        <div class="glitch-text md:hidden block text-[50px]">
          <span>About me</span>
        </div>
        <div class="glitch-scanline">The Matrix has you!</div>
      </div>
      <h2 class="text-4xl md:hidden block">Hey<span class="text-4xl animate-pulsing">|</span></h2>
      

      <div class="grid grid-cols-1">
        <div>
          <p class="output text-2xl">I’m Daniel Pincu, a web developer who bends the fabric of the digital world. Behind every line of code lies a choice: to remain in the known, or to break free into the unknown. I build experiences that shift the balance, pulling users into a space where form and function converge in perfect harmony. The red pill whispers of transformation, where every interaction is a new possibility. The blue pill offers comfort, grounding users in a familiar, flowing reality. From front-end to back-end, I shape the unseen, crafting environments that move, adapt, and connect. Welcome to a world beyond code—where the web is not just built, but awakened.</p>
        </div>
        <div>
          
        </div>
      </div>

      
    </div>
  </div>
  
  
</template>

<script setup>
import Keyboard from './Keyboard.vue';
import { ref, onMounted, onUnmounted } from 'vue';

const matrixCanvas = ref(null);
let matrixAnimationId = null;
const matrixStr = "日ア  イウ  エオ  カキ  クケコ  サシス  セソタチツテト  ナニヌネノハヒフヘホマミム  メモヤユヨラリル  レロワヲンあいうえおかきくけこさし  すせそ  たちつてとな ";
const matrixChars = matrixStr.split("");
let matrixCtx, matrixWidth, matrixHeight, matrixFont, matrixColumns, matrixDrops;

const initMatrixCanvas = () => {
  const canvas = matrixCanvas.value;
  matrixCtx = canvas.getContext("2d");
  matrixWidth = canvas.width = window.innerWidth;
  matrixHeight = canvas.height = window.innerHeight;
  matrixFont = 7;
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
});

onUnmounted(() => {
  cancelAnimationFrame(matrixAnimationId);
});


</script>

<style scoped lang="scss">

@import 'https://fonts.googleapis.com/css?family=Inconsolata';

.error-page {
  background-repeat: no-repeat;
  background-size: cover;
  font-family: 'Inconsolata', Helvetica, sans-serif;
  color: rgba(128, 255, 128, 0.8);
  text-shadow:
      0 0 1ex rgba(51, 255, 51, 1),
      0 0 2px rgba(255, 255, 255, 0.8);
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
  animation: glitch-jerkwhole 5s infinite;
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
  opacity: 0.15;
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
  