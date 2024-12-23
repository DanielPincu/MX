<template>
  <section class="relative w-full h-screen mt-32 project-card">
    <canvas ref="aboutCanvas" class="absolute top-0 left-0 w-full h-full"></canvas>
  </section>
</template>


<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const aboutCanvas = ref(null);
let animationId = null;
const str = "А+Б0В-Г1Д=Е2Ё Ж3З И4Й К5Л М6Н О7П Р8С Т9У Ф!Х Ц?Ч Ш.ЩЪ,Ы Ь:ЭЮ;Я";
const matrix = str.split("");
let $, W, H, font, col, arr;

const initAboutCanvas = () => {
  const C = aboutCanvas.value;
  $ = C.getContext("2d");
  W = C.width = window.innerWidth;
  H = C.height = window.innerHeight;
  font = 11;
  col = W / font;
  arr = new Array(Math.ceil(col)).fill(1);
};

const draw = () => {
  $.fillStyle = "rgba(0,0,0,.03)";
  $.fillRect(0, 0, W, H);
  $.fillStyle = "#0f0";
  $.font = font + "px system-ui";
  for (let i = 0; i < arr.length; i++) {
    let txt = matrix[Math.floor(Math.random() * matrix.length)];
    $.fillText(txt, i * font, arr[i] * font);
    if (arr[i] * font > H && Math.random() > 0.999) arr[i] = 0;
    arr[i]++;
  }
  animationId = requestAnimationFrame(draw);
};

onMounted(() => {
  initAboutCanvas();
  draw();
  window.addEventListener("resize", initAboutCanvas);
});

onUnmounted(() => {
  cancelAnimationFrame(animationId);
  window.removeEventListener("resize", initAboutCanvas);
});
</script>
