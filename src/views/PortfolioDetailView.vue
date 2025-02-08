<template>
  <div class="relative pt-32 mb-32 project-card">
    <canvas ref="portfolioCanvas" class="absolute top-0 left-0 w-full h-full"></canvas>
    <div v-if="!specificPortfolioItem">
      No portfolio item exists
    </div>
    <div v-else>
      <div class="md:grid relative grid-cols-1 gap-10 container mx-auto px-5">
        <div class="pb-20">
          <h1 class="text-center text-3xl pb-5">{{ specificPortfolioItem.title }}</h1>
          <p>{{ specificPortfolioItem.description }}</p>
          <br>
          <p>{{ specificPortfolioItem.extra_description }}</p>

          <div class="mt-5">
            <p><strong>Technologies Used:</strong> {{ specificPortfolioItem.technologies.join(', ') }}</p>
            <p><strong>Role:</strong> {{ specificPortfolioItem.role }}</p>
            <p><strong>Year:</strong> {{ specificPortfolioItem.year }}</p>
          </div>

          <a target="_blank" :href="specificPortfolioItem.link">
            <button class="text-white mt-5 bg-blue-400 rounded-full px-10 py-2">Visit Project</button>
          </a>
        </div>
      </div>

      <!-- Image Slider -->
      <h2 class="z-40 text-3xl relative text-center mb-10 bg-slate-800">Project Gallery</h2>
      <div class="slider-container">
        <ul class='slider' ref="slider">
          <li v-for="(item, index) in carouselItems" :key="index" class='item border-2 border-black' :style="{ backgroundImage: `url('${item.image}')` }">
          </li>
        </ul>
        <span class='nav bg-green-300 bg-opacity-50 w-full flex justify-center py-2'>
          <ion-icon class='btn prev' name="arrow-back-outline" @click="activate('prev')"></ion-icon>
          <ion-icon class='btn next' name="arrow-forward-outline" @click="activate('next')"></ion-icon>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import getPortfolio from '@/modules/getPortfolio'

const { portfolioItems } = getPortfolio()
const route = useRoute()
const id = ref(route.params.id)
const specificPortfolioItem = portfolioItems.value.find(item => item.id == id.value)

const slider = ref(null);

// Updated carouselItems computed property
const carouselItems = computed(() => {
  if (!specificPortfolioItem) {
    return []
  }
  return [
    { image: specificPortfolioItem.image },
    { image: specificPortfolioItem.image1 },
    { image: specificPortfolioItem.image2 },
    { image: specificPortfolioItem.image }  // Repeating the first image to maintain 4 items
  ].filter(item => item.image)  // This removes any items with undefined images
})

const activate = (direction) => {
  const sliderElement = slider.value;
  const sliderItems = sliderElement.querySelectorAll('.item');
  if (direction === 'next') {
    sliderElement.append(sliderItems[0]);
  } else if (direction === 'prev') {
    sliderElement.prepend(sliderItems[sliderItems.length - 1]);
  }
};

const portfolioCanvas = ref(null);
let portfolioAnimationId = null;
const portfolioStr = "日ア  イウ  エオ  カキ  クケコ  サシス  セソタチツテト  ナニヌネノハヒフヘホマミム  メモヤユヨラリル  レロワヲンあいうえおかきくけこさし  すせそ  たちつてとな ";
const portfolioChars = portfolioStr.split("");
let portfolioCtx, portfolioWidth, portfolioHeight, portfolioFont, portfolioColumns, portfolioDrops;

const initPortfolioCanvas = () => {
  const canvas = portfolioCanvas.value;
  portfolioCtx = canvas.getContext("2d");
  portfolioWidth = canvas.width = window.innerWidth;
  portfolioHeight = canvas.height = window.innerHeight;
  portfolioFont = 5;
  portfolioColumns = portfolioWidth / portfolioFont;
  portfolioDrops = new Array(Math.ceil(portfolioColumns)).fill(1);
};

const drawPortfolio = () => {
  portfolioCtx.fillStyle = "rgba(0,0,0,.05)";
  portfolioCtx.fillRect(0, 0, portfolioWidth, portfolioHeight);
  portfolioCtx.fillStyle = "#0f0";
  portfolioCtx.font = portfolioFont + "px system-ui";
  for (let i = 0; i < portfolioDrops.length; i++) {
    let txt = portfolioChars[Math.floor(Math.random() * portfolioChars.length)];
    portfolioCtx.fillText(txt, i * portfolioFont, portfolioDrops[i] * portfolioFont);
    if (portfolioDrops[i] * portfolioFont > portfolioHeight && Math.random() > 0.99999) portfolioDrops[i] = 0;
    portfolioDrops[i]++;
  }
  portfolioAnimationId = requestAnimationFrame(drawPortfolio);
};

onMounted(() => {
  window.scrollTo(0, 0);
  initPortfolioCanvas();
  drawPortfolio();
  window.addEventListener("resize", initPortfolioCanvas);
});

onUnmounted(() => {
  cancelAnimationFrame(portfolioAnimationId);
  window.removeEventListener("resize", initPortfolioCanvas);
});
</script>


<style scoped>
button {
  transition: background-color 0.3s ease-in-out;
}

button:hover {
  background-color: #2563eb;
}

.slider-container {
  position: relative;
  max-width: 100vw;
  height: 70vh;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0,0,0,0.3);
}

.item {
  width: 300px;
  height: 200px;
  list-style-type: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  background-position: center;
  background-size: cover;
  border-radius: 20px;
  box-shadow: 0 20px 30px rgba(255,255,255,0.3) inset;
  transition: transform 0.1s, left 0.75s, top 0.75s, width 0.75s, height 0.75s;
}

.item:nth-child(1), .item:nth-child(2) {
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transform: none;
  border-radius: 0;
  box-shadow: none;
  opacity: 1;
}

.item:nth-child(3) { left: 50%; }
.item:nth-child(4) { left: calc(50% + 220px); }
.item:nth-child(5) { left: calc(50% + 440px); }
.item:nth-child(6) { left: calc(50% + 660px); opacity: 0; }

.content {
  width: min(30vw, 400px);
  position: absolute;
  top: 50%;
  left: 3rem;
  transform: translateY(-50%);
  font: 400 0.85rem helvetica, sans-serif;
  color: white;
  text-shadow: 0 3px 8px rgba(0,0,0,0.5);
  opacity: 0;
  display: none;
}

.content .title {
  font-family: 'arial-black';
  text-transform: uppercase;
}

.content .description {
  line-height: 1.7;
  margin: 1rem 0 1.5rem;
  font-size: 0.8rem;
}

.item:nth-of-type(2) .content {
  display: block;
  animation: show 0.75s ease-in-out 0.3s forwards;
}

@keyframes show {
  0% {
    filter: blur(5px);
    transform: translateY(calc(-50% + 75px));
  }
  100% {
    opacity: 1;
    filter: blur(0);
  }
}

.nav {
  position: absolute;
  bottom: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
  user-select: none;
}

.nav .btn {
  background-color: rgba(255,255,255,0.5);
  color: rgba(0,0,0,0.7);
  border: 2px solid rgba(0,0,0,0.6);
  margin: 0 0.25rem;
  padding: 0.75rem;
  border-radius: 50%;
  cursor: pointer;
}

.nav .btn:hover {
  background-color: rgba(255,255,255,0.3);
}

@media (max-width: 900px) and (min-width: 650px) {
  .content .title { font-size: 1rem; }
  .content .description { font-size: 0.7rem; }
  .item {
    width: 270px;
    height: 160px;
  }
  .item:nth-child(3) { left: 50%; }
  .item:nth-child(4) { left: calc(50% + 190px); }
  .item:nth-child(5) { left: calc(50% + 380px); }
  .item:nth-child(6) { left: calc(50% + 570px); opacity: 0; }
}

@media (max-width: 650px) {
  .content .title { font-size: 0.9rem; }
  .content .description { font-size: 0.65rem; }
  .item {
    width: 220px;
    height: 130px;
  }
  .item:nth-child(3) { left: 50%; }
  .item:nth-child(4) { left: calc(50% + 160px); }
  .item:nth-child(5) { left: calc(50% + 320px); }
  .item:nth-child(6) { left: calc(50% + 480px); opacity: 0; }
}
</style>
