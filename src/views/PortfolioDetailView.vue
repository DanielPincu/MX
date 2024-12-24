<template>
  <div class="relative pt-32 mb-32 project-card">
    <canvas ref="portfolioCanvas" class="absolute top-0 left-0 w-full h-full"></canvas>
    <div v-if="!specificPortfolioItem">
      Not portfolio item exists
    </div>

    <div v-else>

    <!-- Test id: {{ route.params.id }} -->


      <div class="md:grid relative grid-cols-2 gap-10 container mx-auto px-5">

        <div class="pb-20">
          <h1 class="text-center text-3xl pb-5">{{ specificPortfolioItem.title }}</h1>
          <p>{{ specificPortfolioItem.description }}</p>
          <br>
          <p>{{ specificPortfolioItem.extra_description }}</p>

           <a target="_blank" :href="specificPortfolioItem.link">
            <button class="text-white my-10 bg-blue-400 rounded-full px-10">Visit project</button>
          </a>

        </div>
        
        <div class="flex items-center justify-center">
          <img class="" :src="specificPortfolioItem.image" alt="">
        </div>

       
        
      </div>

   
  </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import getPortfolio from '@/modules/getPortfolio'

const { portfolioItems } = getPortfolio()

const route = useRoute()

const id = ref(route.params.id)

const specificPortfolioItem = portfolioItems.value.find(item => item.id == id.value)
//console.log(specificPortfolioItem)

onMounted(() => {
  window.scrollTo(0, 0); // This will scroll the page to the top
  
  initPortfolioCanvas();
  drawPortfolio();
  window.addEventListener("resize", initPortfolioCanvas);
});

const portfolioCanvas = ref(null);
let portfolioAnimationId = null;
const portfolioStr = "А+Б0В-Г1Д=Е2Ё Ж3З И4Й К5Л М6Н О7П Р8С Т9У Ф!Х Ц?Ч Ш.ЩЪ,Ы Ь:ЭЮ;Я";
const portfolioChars = portfolioStr.split("");
let portfolioCtx, portfolioWidth, portfolioHeight, portfolioFont, portfolioColumns, portfolioDrops;

const initPortfolioCanvas = () => {
  const canvas = portfolioCanvas.value;
  portfolioCtx = canvas.getContext("2d");
  portfolioWidth = canvas.width = window.innerWidth;
  portfolioHeight = canvas.height = window.innerHeight;
  portfolioFont = 11;
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
  initPortfolioCanvas();
  drawPortfolio();
  window.addEventListener("resize", initPortfolioCanvas);
});

onUnmounted(() => {
  cancelAnimationFrame(portfolioAnimationId);
  window.removeEventListener("resize", initPortfolioCanvas);
});

</script>

