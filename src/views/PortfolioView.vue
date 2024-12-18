<template>
  <div class="relative min-h-screen bg-gray-900 text-gray-100 pt-16">

    <canvas ref="portfolioCanvas" class="absolute top-0 left-0 w-full h-full project-card"></canvas>

    <div class="relative px-6 py-20">
      <h2 class="text-xl md:text-3xl font-bold mb-8 text-center">Projects Showcase</h2>
      <!-- Category Buttons -->
      <div class="flex justify-center gap-5 mb-10">
        <button
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg shadow transition duration-300"
          @click="selectedCategory = 'web'">
          Web
        </button>
        <button
          class="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg shadow transition duration-300"
          @click="selectedCategory = 'photo'">
          Photo
        </button>
        <button
          class="px-4 py-2 bg-gray-700 hover:bg-gray-800 rounded-lg shadow transition duration-300"
          @click="selectedCategory = ''">
          All
        </button>
      </div>

      <!-- Portfolio Items -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <router-link
          v-for="portfolioItem in filteredPortfolioItems"
          :key="portfolioItem.id"
          :to="`/detail/${portfolioItem.id}`"
          class="bg-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-[103%] transition duration-300 block project-card">
          <h2 class="text-xl font-bold mb-2 hover:text-blue-400 transition duration-300">
            {{ portfolioItem.title }}
          </h2>
          <p class="text-gray-400 mb-4">{{ portfolioItem.description }}</p>
          <p class="inline-block px-20 py-1 text-sm font-medium rounded-full mb-4 capitalize" 
            :class="{
              'bg-blue-600 text-white': portfolioItem.category === 'web',
              'bg-red-600 text-white': portfolioItem.category === 'photo'
            }">
            {{ portfolioItem.category }}
          </p>
          <img
            :src="portfolioItem.image"
            alt=""
            class="rounded-lg mb-4 shadow-lg w-full object-cover"
          />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import getPortfolio from '@/modules/getPortfolio';

const { portfolioItems } = getPortfolio();
const selectedCategory = ref('');
const portfolioCanvas = ref(null);

const filteredPortfolioItems = computed(() => {
  if (selectedCategory.value === '') {
    return portfolioItems.value;
  } else {
    return portfolioItems.value.filter(
      (item) => item.category === selectedCategory.value
    );
  }
});

// Create a new independent canvas
let animationId = null;
const matrixStr = "А+Б0В-Г1Д=Е2Ё Ж3З И4Й К5Л М6Н О7П Р8С Т9У Ф!Х Ц?Ч Ш.ЩЪ,Ы Ь:ЭЮ;Я";
const matrixChars = matrixStr.split("");
let ctx, canvasWidth, canvasHeight, fontSize, columns, drops;

const initCanvas = () => {
  const canvas = portfolioCanvas.value;
  ctx = canvas.getContext("2d");
  canvasWidth = canvas.width = window.innerWidth;
  canvasHeight = canvas.height = window.innerHeight;
  fontSize = 11;
  columns = canvasWidth / fontSize;
  drops = new Array(Math.ceil(columns)).fill(1);
};

const drawMatrix = () => {
  ctx.fillStyle = "rgba(0,0,0,.02)";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  ctx.fillStyle = "#0f0";
  ctx.font = fontSize + "px system-ui";
  for (let i = 0; i < drops.length; i++) {
    const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvasHeight && Math.random() > 0.9999) drops[i] = 0;
    drops[i]++;
  }
  animationId = requestAnimationFrame(drawMatrix);
};

onMounted(() => {
  initCanvas();
  drawMatrix();
  window.addEventListener("resize", initCanvas);
});

onUnmounted(() => {
  cancelAnimationFrame(animationId);
  window.removeEventListener("resize", initCanvas);
});
</script>
