<template>
  <section id="home" class="video-banner relative my-32 project-card">
    <canvas ref="matrixCanvas" class="absolute top-0 left-0 w-full h-full"></canvas>
  </section>
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
  matrixCtx.fillStyle = "rgba(0,0,0,.01)";
  matrixCtx.fillRect(0, 0, matrixWidth, matrixHeight);
  matrixCtx.fillStyle = "#0f0";
  matrixCtx.font = matrixFont + "px system-ui";
  for (let i = 0; i < matrixDrops.length; i++) {
    let txt = matrixChars[Math.floor(Math.random() * matrixChars.length)];
    matrixCtx.fillText(txt, i * matrixFont, matrixDrops[i] * matrixFont);
    if (matrixDrops[i] * matrixFont > matrixHeight && Math.random() > 0.99999) matrixDrops[i] = 0;
    matrixDrops[i]++;
  }
  matrixAnimationId = requestAnimationFrame(drawMatrix);
};

onMounted(() => {
  initMatrixCanvas();
  drawMatrix();
  window.addEventListener("resize", initMatrixCanvas);
});

onUnmounted(() => {
  cancelAnimationFrame(matrixAnimationId);
  window.removeEventListener("resize", initMatrixCanvas);
});
</script>
