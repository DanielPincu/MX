<template>
  <div class="relative min-h-screen bg-gray-900 text-gray-100 pt-16 project-card">

    <canvas ref="matrixCanvas" class="absolute top-0 left-0 w-full h-full"></canvas>

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

          <div class="h-20 mb-10">
            <p class="text-gray-400 mb-4">{{ portfolioItem.description }}</p>
          </div>

          <div class="inline-block mt-20 px-20 py-1 text-sm font-medium rounded-full mb-4 capitalize" 
            :class="{
              'bg-blue-600 text-white': portfolioItem.category === 'web',
              'bg-red-600 text-white': portfolioItem.category === 'photo'
            }">
            {{ portfolioItem.category }}
          </div>

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
const matrixCanvas = ref(null);

const filteredPortfolioItems = computed(() => {
  return selectedCategory.value ? 
    portfolioItems.value.filter(item => item.category === selectedCategory.value) : 
    portfolioItems.value;
});

// Matrix animation variables
const FONT_SIZE = 1;
const FONT_FACE = "Matrix Code NFI, monospace"; // Fallback to monospace if custom font is not available
const SPEED = 50;

const CHARS = "abcdefghijklmnopqrstuvwxyz0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~".split("");

let totalColumns;
let rows = [];
let intervalId;

const getRandomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];

const initColumns = () => {
  for (let x = 0; x < totalColumns; x++) {
    rows[x] = [Math.ceil(matrixCanvas.value.height / FONT_SIZE) + 1, ""];
  }
};

const calculateColumns = () => {
  const canvas = matrixCanvas.value;
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  totalColumns = Math.ceil(canvas.width / FONT_SIZE);
  initColumns();
};

const renderMatrix = () => {
  const canvas = matrixCanvas.value;
  const matrix = canvas.getContext("2d");

  matrix.fillStyle = "rgba(2, 2, 4, 0.04)";
  matrix.fillRect(0, 0, canvas.width, canvas.height);

  matrix.font = FONT_SIZE + "px " + FONT_FACE;

  for (let i = 0; i < rows.length; i++) {
    let randChar = getRandomChar();

    matrix.fillStyle = "rgba(168, 255, 200, 1)";
    matrix.fillText(randChar, i * FONT_SIZE, rows[i][0] * FONT_SIZE);

    if (rows[i][1] && rows[i][1] !== "") {
      matrix.fillStyle = "rgba(0, 143, 17, 1)";
      matrix.fillText(
        rows[i][1],
        i * FONT_SIZE,
        (rows[i][0] - 1) * FONT_SIZE
      );
    }

    if (rows[i][0] * FONT_SIZE > canvas.height && Math.random() > 0.999) {
      rows[i][0] = -1;
    }

    rows[i][0]++;
    rows[i][1] = randChar;
  }
};

const initMatrix = () => {
  calculateColumns();
  intervalId = setInterval(renderMatrix, SPEED);
};

onMounted(() => {
  initMatrix();
  window.addEventListener("resize", calculateColumns);
});

onUnmounted(() => {
  clearInterval(intervalId);
  window.removeEventListener("resize", calculateColumns);
});
</script>

