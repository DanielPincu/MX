<template>
  <div class="relative min-h-screen bg-gray-900 text-gray-100 mt-16 project-card">
    <!-- Matrix Canvas -->
    <canvas ref="matrixCanvas" class="absolute top-0 left-0 w-full h-full"></canvas>
    <!-- <div class="overlay"></div> -->
        <div class="glitch-text py-10 text-center text-[50px]">
          <!-- <Cipher /> -->
          <span>Projects showcase</span>
        </div>
    <div class="relative px-6 py-20">
      <!-- Heading -->
      

      <!-- Category Buttons -->
      <!-- <div class="flex justify-center gap-5 mb-10">
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
      </div> -->

      <!-- Portfolio Items (3 per row) -->
      <div class="grid md:grid-cols-3 grid-cols-1 md:p-10 pt-10 gap-10">
        <router-link
          v-for="portfolioItem in filteredPortfolioItems"
          :key="portfolioItem.id"
          :to="`/detail/${portfolioItem.id}`"
          class="project opacity-80">
          
          <img
            :src="portfolioItem.image"
            alt="project image"
          />
          <div class="project__content md:-mx-4">
            <h2 class="pb-32">{{ portfolioItem.title }}</h2>
          </div>
        </router-link>
      </div>
    </div>
  </div>

  
  
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import getPortfolio from '@/modules/getPortfolio';
// import Cipher from '../views/Cipher.vue';

const { portfolioItems } = getPortfolio();
const selectedCategory = ref('');
const matrixCanvas = ref(null);

const filteredPortfolioItems = computed(() => {
  return selectedCategory.value ? 
    portfolioItems.value.filter(item => item.category === selectedCategory.value) : 
    portfolioItems.value;
});

// Matrix animation variables
const FONT_SIZE = 2;
const FONT_FACE = "Matrix Code NFI, monospace"; 
const SPEED = 50;

const CHARS = "日ア  イウ  エオ  カキ  クケコ  サシス  セソタチツテト  ナニヌネノハヒフヘホマミム  メモヤユヨラリル  レロワヲンあいうえおかきくけこさし  すせそ  たちつてとな ".split("");

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
  // window.addEventListener("resize", calculateColumns);
});

onUnmounted(() => {
  clearInterval(intervalId);
  window.removeEventListener("resize", calculateColumns);
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Covered+By+Your+Grace&display=swap");




h2 {
  font-size: 2rem;
  text-align: center;
  color: white;
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
a {
  text-decoration: none;
  color: inherit;
}



.main {
  z-index: 1;
  max-width: 1280px;
  padding: 2rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3rem;
}

.project {
  position: relative;
  min-width: 225px;
  height: 350px;
  overflow: hidden;
  transform: skewY(8deg) rotateY(20deg);
  transition: all 0.5s ease-in-out;
}

.project__content {
  background-image: url('https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExODJpMTQydGd4anZlcGV6MHJhdWdiZTZlcGs5ZGFrNGZ1dHhvaW4xbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2uw1oxlG4ZfMpzSZ8O/giphy.gif');
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  opacity: 0;
  transition: all 0.5s ease-in-out;
}

.project:hover {
  transform: skewY(0deg) rotateY(0deg);
  
}
.project:hover .project__content {
  opacity: 0.9;
}



@media screen and (max-width: 1024px) {
  .projects-container {
    grid-template-columns: repeat(2, 1fr); /* 2 cards per row on tablets */
  }
}

@media screen and (max-width: 802px) {
  .projects-container {
    grid-template-columns: 1fr; /* 1 card per row on small screens */
  }
  body {
    min-height: 100vh;
    height: auto;
  }
  h2 {
    font-size: 1.75rem;
  }
}

.noise {
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 100%;
  /* background-image: url("https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWJyM3FhOHo1dHhlZzRveGJveHF1cWF6c3VoazhhanRlMjZueWI5dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0IyeUveuzmj0SP9m/giphy.gif"); */
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 1;
  opacity: 0.2;
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
  animation: scan 100s linear 0s infinite;
}

/* @keyframes scan {
  0%        { background-position: 0 -200vh; }
  30%, 100% { background-position: 0 100vh; }
} */



.glitch-text {
  position: relative;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  color: green;
  animation: glitch-jerkwhole 5s infinite;
}

.glitch-text span {
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
  0%, 100% { filter: blur(0px); opacity: 0.8; }
  50% { filter: blur(2px); opacity: 1; }
}

@keyframes glitch-jerk {
  50% { transform: translateX(3px); }
  51% { transform: translateX(0); }
}

</style>
