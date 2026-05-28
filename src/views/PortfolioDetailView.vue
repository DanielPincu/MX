<template>
  <div class="relative pt-28 mb-24 project-card detail-page">
    <canvas ref="portfolioCanvas" class="absolute top-0 left-0 w-full h-full"></canvas>
    <div v-if="!specificPortfolioItem">
      No portfolio item exists
    </div>
    <div v-else class="relative z-10">
      <div class="container mx-auto px-5">
        <div class="detail-hero">
          <div>
            <p class="detail-kicker">{{ specificPortfolioItem.category }} / {{ specificPortfolioItem.year }}</p>
            <h1>{{ specificPortfolioItem.title }}</h1>
            <p class="detail-lead">{{ specificPortfolioItem.description }}</p>
          </div>

          <div class="detail-actions">
            <a target="_blank" :href="specificPortfolioItem.link" rel="noopener">
              <button class="primary-action">Visit Project</button>
            </a>

            <button @click="goBack" class="secondary-action">
              Go Back
            </button>
          </div>
        </div>

        <div class="detail-layout">
          <article class="detail-copy">
            <p>{{ specificPortfolioItem.extra_description }}</p>
            <p v-if="specificPortfolioItem.more">{{ specificPortfolioItem.more }}</p>
          </article>

          <aside class="project-dossier">
            <div>
              <span>Role</span>
              <strong>{{ specificPortfolioItem.role }}</strong>
            </div>
            <div>
              <span>Year</span>
              <strong>{{ specificPortfolioItem.year }}</strong>
            </div>
            <div>
              <span>Technologies</span>
              <div class="detail-tech">
                <em v-for="tech in specificPortfolioItem.technologies" :key="tech">{{ tech }}</em>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <section class="container mx-auto px-5 mb-12 mobile-gallery">
        <h2>Project Gallery</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <img v-for="(item, index) in carouselItems" :key="`mobile-${index}`" :src="item.image" :alt="`${specificPortfolioItem.title} screenshot ${index + 1}`">
        </div>
      </section>

      <!-- Image Slider -->
      <h2 class="z-40 text-3xl relative text-center mb-10 hidden md:block gallery-title">Project Gallery</h2>
      <div class="slider-container w-3/4 h-[82vh] hidden md:block mx-auto mb-20">
        <ul class='slider' ref="slider">
          <li v-for="(item, index) in carouselItems" :key="index" class='item border-2 border-black' :style="{ backgroundImage: `url('${item.image}')` }">
          </li>
        </ul>
        <span class='nav top-20 h-3/4 w-full flex justify-between items-center py-2'>
          <button class='btn prev' name="arrow-back-outline" @click="activate('prev')" aria-label="Previous image"><i class="fa-solid fa-arrow-left"></i></button>
          <button class='btn next' name="arrow-forward-outline" @click="activate('next')" aria-label="Next image"><i class="fa-solid fa-arrow-right"></i></button>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => {
  router.back();
};

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
    { image: specificPortfolioItem.image3 }  // Repeating the first image to maintain 4 items
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
  transition: background-color 0.3s ease-in-out, transform 0.2s ease, border-color 0.2s ease;
}

/* button:hover {
  background-color: red;
} */

.slider-container {
  position: relative;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0,0,0,0.3);
  border: 1px solid rgba(32, 255, 128, 0.42);
  background: rgba(0, 0, 0, 0.55);
}

.detail-page {
  min-height: 100vh;
}

.detail-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 2rem;
  align-items: end;
  padding: 3rem 0 2rem;
  border-bottom: 1px solid rgba(32, 255, 128, 0.28);
}

.detail-kicker {
  color: #f0ce00;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.82rem;
  margin-bottom: 0.85rem;
}

.detail-hero h1 {
  font-size: clamp(2.4rem, 7vw, 6rem);
  line-height: 0.95;
  color: #fff;
  text-shadow: 0 0 24px rgba(32, 255, 128, 0.38);
}

.detail-lead {
  max-width: 70rem;
  margin-top: 1.4rem;
  color: rgba(255, 255, 255, 0.82);
  font-size: clamp(1rem, 2vw, 1.25rem);
  line-height: 1.75;
}

.detail-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-width: 13rem;
}

.primary-action,
.secondary-action {
  width: 100%;
  border-radius: 999px;
  padding: 0.8rem 1.3rem;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.25);
}

.primary-action {
  background: linear-gradient(135deg, #0f8f3f, #2266ff);
  box-shadow: 0 0 24px rgba(32, 255, 128, 0.22);
}

.secondary-action {
  background: rgba(255, 255, 255, 0.06);
}

.primary-action:hover,
.secondary-action:hover {
  transform: translateY(-2px);
  border-color: #f0ce00;
}

.detail-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(18rem, 0.34fr);
  gap: 2rem;
  padding: 2rem 0 4rem;
}

.detail-copy {
  display: grid;
  gap: 1.25rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.8;
  font-size: 1.03rem;
}

.project-dossier {
  border: 1px solid rgba(32, 255, 128, 0.36);
  background: rgba(0, 13, 5, 0.76);
  box-shadow: inset 0 0 24px rgba(32, 255, 128, 0.08);
  padding: 1.25rem;
  display: grid;
  gap: 1.2rem;
  align-self: start;
}

.project-dossier span {
  display: block;
  color: #8fffb8;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  margin-bottom: 0.4rem;
}

.project-dossier strong {
  color: #fff;
  font-size: 1rem;
}

.detail-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.detail-tech em {
  font-style: normal;
  color: #f3ffd8;
  border: 1px solid rgba(240, 206, 0, 0.42);
  padding: 0.3rem 0.55rem;
  font-size: 0.78rem;
  background: rgba(240, 206, 0, 0.08);
}

.gallery-title,
.mobile-gallery h2 {
  color: #fff;
  text-shadow: 0 0 18px rgba(32, 255, 128, 0.5);
}

.mobile-gallery {
  display: none;
}

.mobile-gallery img {
  width: 100%;
  border: 1px solid rgba(32, 255, 128, 0.38);
  object-fit: cover;
  aspect-ratio: 16 / 10;
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

@media (max-width: 768px) {
  .detail-hero,
  .detail-layout {
    grid-template-columns: 1fr;
  }

  .detail-actions {
    min-width: 0;
  }

  .mobile-gallery {
    display: block;
  }
}
</style>
