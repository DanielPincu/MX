<template>
  <section id="home" class="video-banner relative my-32 project-card">
    <canvas ref="matrixCanvas" class="absolute top-0 left-0 w-full h-full"></canvas>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// Create a ref for the canvas
const matrixCanvas = ref(null);
let matrixAnimationId = null;
const matrixStr = "А+Б0В-Г1Д=Е2Ё Ж3З И4Й К5Л М6Н О7П Р8С Т9У Ф!Х Ц?Ч Ш.ЩЪ,Ы Ь:ЭЮ;Я";
const matrixChars = matrixStr.split("");
let matrixCtx, matrixWidth, matrixHeight, matrixFont, matrixColumns, matrixDrops;

// Set fixed canvas size
const fixedWidth = 1024;
const fixedHeight = 668;

const initMatrixCanvas = () => {
  const canvas = matrixCanvas.value;
  matrixCtx = canvas.getContext("2d");

  // Set the fixed size for the canvas
  canvas.width = fixedWidth;
  canvas.height = fixedHeight;

  matrixFont = 11;
  matrixColumns = fixedWidth / matrixFont;
  matrixDrops = new Array(Math.ceil(matrixColumns)).fill(1);
};

const drawMatrix = () => {
  matrixCtx.fillStyle = "rgba(0,0,0,.01)";
  matrixCtx.fillRect(0, 0, fixedWidth, fixedHeight);
  matrixCtx.fillStyle = "#0f0";
  matrixCtx.font = matrixFont + "px system-ui";
  for (let i = 0; i < matrixDrops.length; i++) {
    let txt = matrixChars[Math.floor(Math.random() * matrixChars.length)];
    matrixCtx.fillText(txt, i * matrixFont, matrixDrops[i] * matrixFont);
    if (matrixDrops[i] * matrixFont > fixedHeight && Math.random() > 0.99999) matrixDrops[i] = 0;
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
