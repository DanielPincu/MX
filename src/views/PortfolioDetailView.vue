<template>
  <div class="relative pt-28 mb-24 project-card detail-page">
    <canvas ref="portfolioCanvas" class="absolute top-0 left-0 w-full h-full"></canvas>
    <div v-if="!specificPortfolioItem">
      No portfolio item exists
    </div>
    <div v-else class="relative z-10">
      <nav class="detail-rail hidden md:flex" aria-label="Project actions">
        <a v-if="specificPortfolioItem.liveLink" target="_blank" :href="specificPortfolioItem.liveLink" rel="noopener" class="detail-rail__link">
          <span>Live Link</span>
        </a>
        <a v-if="specificPortfolioItem.sourceCode" target="_blank" :href="specificPortfolioItem.sourceCode" rel="noopener" class="detail-rail__link">
          <span>Source Code</span>
        </a>
        <button @click="goBack" class="detail-rail__link detail-rail__link--button" type="button">
          <span>Go back</span>
        </button>
      </nav>

      <div class="container mx-auto px-5">
        <div class="detail-hero">
          <div>
            <h1>{{ specificPortfolioItem.title }}</h1>
            <p class="detail-lead">{{ specificPortfolioItem.description }}</p>
          </div>
          <div class="detail-actions">
            <a v-if="specificPortfolioItem.liveLink" target="_blank" :href="specificPortfolioItem.liveLink" rel="noopener" class="detail-nav-btn detail-nav-btn--visit">
              <span>Live Link</span>
            </a>
            <a v-if="specificPortfolioItem.sourceCode" target="_blank" :href="specificPortfolioItem.sourceCode" rel="noopener" class="detail-nav-btn detail-nav-btn--source">
              <span>Source Code</span>
            </a>
            <button @click="goBack" class="detail-nav-btn detail-nav-btn--back" type="button">
              <span>Go back</span>
            </button>
          </div>
        </div>

        <!-- 2-col: Gallery + Info -->
        <div class="detail-gallery-layout">
          <!-- Carousel — CRT Monitor -->
          <div
            class="crt-monitor"
            @mouseenter="stopAutoAdvance"
            @mouseleave="startAutoAdvance"
            @touchstart="onTouchStart"
            @touchend="onTouchEnd"
          >
  
            <!-- CRT bezel frame -->
            <div class="crt-bezel">
              <span class="crt-corner crt-corner--tl"></span>
              <span class="crt-corner crt-corner--tr"></span>
              <span class="crt-corner crt-corner--bl"></span>
              <span class="crt-corner crt-corner--br"></span>

              <div class="crt-screen">
                <div class="carousel-track" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
                  <div
                    v-for="(item, index) in carouselItems"
                    :key="index"
                    class="carousel-slide"
                    :style="{ backgroundImage: `url('${item.image}')` }"
                  ></div>
                </div>

                <!-- CRT overlays -->
                <div class="crt-scanlines" aria-hidden="true"></div>
                <div class="crt-phosphor" aria-hidden="true"></div>
                <div class="crt-vignette" aria-hidden="true"></div>
              </div>
            </div>

            <!-- Nav arrows -->
            <button class="carousel-arrow carousel-arrow--prev" @click="prev" aria-label="Previous image">
              <i class="fa-solid fa-chevron-left"></i>
            </button>
            <button class="carousel-arrow carousel-arrow--next" @click="next" aria-label="Next image">
              <i class="fa-solid fa-chevron-right"></i>
            </button>

            <!-- Dot indicators -->
            <div class="carousel-dots" v-if="carouselItems.length > 1">
              <button
                v-for="(item, index) in carouselItems"
                :key="`dot-${index}`"
                class="carousel-dot"
                :class="{ 'carousel-dot--active': index === currentIndex }"
                @click="goTo(index)"
                :aria-label="`Go to image ${index + 1}`"
              ></button>
            </div>

            <!-- CRT readout -->
            <div class="crt-readout">
              <span class="crt-led"></span>
              <span>{{ String(currentIndex + 1).padStart(2, '0') }} / {{ String(carouselItems.length).padStart(2, '0') }}</span>
            </div>
          </div>

          <!-- Info column -->
          <div class="detail-info-col">
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
                <span>Technologies</span>
                <div class="detail-tech">
                  <em v-for="tech in specificPortfolioItem.technologies" :key="tech">{{ tech }}</em>
                </div>
              </div>
            </aside>
          </div>
        </div>
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

const currentIndex = ref(0);
const slider = ref(null);
let autoTimer = null;
let touchStartX = 0;

// Updated carouselItems computed property
const carouselItems = computed(() => {
  if (!specificPortfolioItem) {
    return []
  }
  return [
    { image: specificPortfolioItem.image },
    { image: specificPortfolioItem.image1 },
    { image: specificPortfolioItem.image2 },
    { image: specificPortfolioItem.image3 }
  ].filter(item => item.image)
})

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % carouselItems.value.length;
};

const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + carouselItems.value.length) % carouselItems.value.length;
};

const goTo = (index) => {
  currentIndex.value = index;
};

const startAutoAdvance = () => {
  stopAutoAdvance();
  if (carouselItems.value.length <= 1) return;
  autoTimer = setInterval(() => {
    next();
  }, 5000);
};

const stopAutoAdvance = () => {
  if (autoTimer) {
    clearInterval(autoTimer);
    autoTimer = null;
  }
};

const onTouchStart = (e) => {
  touchStartX = e.touches[0].clientX;
};

const onTouchEnd = (e) => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    if (diff > 0) next();
    else prev();
  }
};

const onKeydown = (e) => {
  if (e.key === 'ArrowLeft') prev();
  else if (e.key === 'ArrowRight') next();
};

const portfolioCanvas = ref(null);
let portfolioAnimationId = null;
const portfolioStr = "日ア  イウ  エオ  カキ  クケコ  サシス  セソタチツテト  ナニヌネノハヒフヘホマミム  メモヤユヨラリル  レロワヲンあいうえおかきくけこさし  すせそ  たちつてとな ";
const portfolioChars = portfolioStr.split("");
let portfolioCtx, portfolioWidth, portfolioHeight, portfolioFont, portfolioColumns, portfolioDrops, portfolioTick, portfolioAccent;

const initPortfolioCanvas = () => {
  const canvas = portfolioCanvas.value;
  portfolioCtx = canvas.getContext("2d", { alpha: true });
  portfolioWidth = canvas.width = window.innerWidth;
  portfolioHeight = canvas.height = window.innerHeight;
  portfolioFont = 10;
  portfolioColumns = portfolioWidth / portfolioFont;
  portfolioDrops = new Array(Math.ceil(portfolioColumns)).fill(1);
  portfolioTick = 0;
  portfolioAccent = getComputedStyle(document.documentElement).getPropertyValue("--mx-accent").trim() || "#45ff8a";
};

const drawPortfolio = () => {
  portfolioTick++;
  if (portfolioTick & 1) { portfolioAnimationId = requestAnimationFrame(drawPortfolio); return; }

  portfolioCtx.fillStyle = "rgba(0,0,0,.05)";
  portfolioCtx.fillRect(0, 0, portfolioWidth, portfolioHeight);
  portfolioCtx.fillStyle = portfolioAccent;
  portfolioCtx.font = portfolioFont + "px system-ui";
  const len = portfolioDrops.length;
  for (let i = 0; i < len; i++) {
    let txt = portfolioChars[(Math.random() * portfolioChars.length) | 0];
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
  window.addEventListener("keydown", onKeydown);
  startAutoAdvance();
});

onUnmounted(() => {
  cancelAnimationFrame(portfolioAnimationId);
  window.removeEventListener("resize", initPortfolioCanvas);
  window.removeEventListener("keydown", onKeydown);
  stopAutoAdvance();
});
</script>


<style scoped>
button {
  transition: background-color 0.3s ease-in-out, transform 0.2s ease, border-color 0.2s ease;
}

/* button:hover {
  background-color: red;
} */

/* ═══════════════════════════════════════════
   CRT Monitor Carousel — Matrix 1999 / Y2K
   ═══════════════════════════════════════════ */

.crt-monitor {
  position: relative;
  width: 100%;
  user-select: none;
}

/* ── Bezel: the physical monitor housing ── */

.crt-bezel {
  position: relative;
  overflow: hidden;
  padding: 2.2rem 2rem 2.5rem;
  background:
    linear-gradient(180deg, #151715 0%, #0a0d0a 30%, #050705 70%, #0a0d0a 100%);
  border: 3px solid #1a1f1a;
  border-top-color: #252a25;
  border-left-color: #1c211c;
  border-right-color: #0e120e;
  border-bottom-color: #080a08;
  outline: 2px solid #000;
  outline-offset: -5px;
  box-shadow:
    inset 0 0.6rem 1.2rem rgba(0,0,0,0.7),
    inset 0 -0.4rem 0.8rem rgba(0,0,0,0.5),
    0 0 0 4px #0a0d0a,
    0 0.8rem 2rem rgba(0,0,0,0.8),
    0 0 40px rgba(var(--mx-accent-rgb), 0.08);
  border-radius: 18px 18px 22px 22px;
}

/* ── Corner L-brackets — industrial monitor accents ── */

.crt-corner {
  position: absolute;
  z-index: 8;
  width: 18px;
  height: 18px;
  pointer-events: none;
}

.crt-corner::before,
.crt-corner::after {
  content: '';
  position: absolute;
  background: rgba(var(--mx-accent-rgb), 0.35);
  box-shadow: 0 0 6px rgba(var(--mx-accent-rgb), 0.2);
}

.crt-corner::before { width: 100%; height: 2px; }
.crt-corner::after  { width: 2px; height: 100%; }

.crt-corner--tl { top: 12px; left: 12px; }
.crt-corner--tl::before { top: 0; left: 0; }
.crt-corner--tl::after  { top: 0; left: 0; }

.crt-corner--tr { top: 12px; right: 12px; }
.crt-corner--tr::before { top: 0; right: 0; }
.crt-corner--tr::after  { top: 0; right: 0; }

.crt-corner--bl { bottom: 16px; left: 12px; }
.crt-corner--bl::before { bottom: 0; left: 0; }
.crt-corner--bl::after  { bottom: 0; left: 0; }

.crt-corner--br { bottom: 16px; right: 12px; }
.crt-corner--br::before { bottom: 0; right: 0; }
.crt-corner--br::after  { bottom: 0; right: 0; }

/* ── Screen area ── */

.crt-screen {
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  border: 2px solid #000;
  background: #000;
  box-shadow:
    inset 0 0 60px rgba(0,0,0,0.9),
    0 0 2px rgba(var(--mx-accent-rgb), 0.15);
}

/* ── Track & slides ── */

.carousel-track {
  display: flex;
  height: 100%;
  transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: transform;
}

.carousel-slide {
  min-width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  filter: saturate(0.7) contrast(1.15) brightness(0.7);
}

/* ── CRT overlays ── */

.crt-scanlines {
  pointer-events: none;
  position: absolute;
  inset: 0;
  z-index: 3;
  background: repeating-linear-gradient(
    180deg,
    transparent,
    transparent 2px,
    rgba(0,0,0,0.12) 2px,
    rgba(0,0,0,0.12) 4px
  );
  opacity: 0.55;
}

.crt-phosphor {
  pointer-events: none;
  position: absolute;
  inset: 0;
  z-index: 2;
  background:
    radial-gradient(ellipse at 50% 50%, transparent 60%, rgba(0, 10, 1, 0.45) 100%);
  mix-blend-mode: screen;
}

.crt-vignette {
  pointer-events: none;
  position: absolute;
  inset: 0;
  z-index: 4;
  box-shadow: inset 0 0 80px 20px rgba(0,0,0,0.7);
}

/* ── Arrows — chunky Y2K blocks ── */

.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 6;
  display: grid;
  place-items: center;
  width: 2.6rem;
  height: 3.6rem;
  border: 1px solid rgba(var(--mx-accent-rgb), 0.35);
  border-bottom: 4px solid rgba(0,0,0,0.8);
  background:
    linear-gradient(180deg, rgba(20,28,21,0.92), rgba(5,8,5,0.94));
  color: rgba(var(--mx-accent-soft-rgb), 0.8);
  font-size: 0.95rem;
  cursor: pointer;
  backdrop-filter: blur(4px);
  transition: border-color 0.15s, color 0.15s, box-shadow 0.15s, transform 0.15s;
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.04),
    0 0.15rem 0 rgba(0,0,0,0.8);
}

.carousel-arrow:hover {
  color: #fff;
  border-color: rgba(var(--mx-accent-rgb), 0.8);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.06),
    0 0.15rem 0 rgba(0,0,0,0.8),
    0 0 18px rgba(var(--mx-accent-rgb), 0.35);
}

.carousel-arrow:active {
  transform: translateY(-50%) translateY(2px);
  border-bottom-width: 2px;
  box-shadow: inset 0 0 8px rgba(0,0,0,0.4);
}

.carousel-arrow--prev { left: 0; border-radius: 0 6px 6px 0; }
.carousel-arrow--next { right: 0; border-radius: 6px 0 0 6px; }

/* ── Dots — LED indicators ── */

.carousel-dots {
  position: absolute;
  bottom: -1.8rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.45rem;
  z-index: 6;
}

.carousel-dot {
  width: 0.5rem;
  height: 0.5rem;
  border: 1px solid rgba(var(--mx-accent-rgb), 0.45);
  background: rgba(0,0,0,0.6);
  cursor: pointer;
  padding: 0;
  transition: background 0.2s, border-color 0.2s, box-shadow 0.2s;
}

.carousel-dot--active {
  background: var(--mx-accent);
  border-color: var(--mx-accent);
  box-shadow:
    0 0 8px rgba(var(--mx-accent-rgb), 0.8),
    0 0 2px rgba(var(--mx-accent-rgb), 0.5);
}

.carousel-dot:hover {
  border-color: rgba(var(--mx-accent-rgb), 0.8);
}

/* ── CRT readout — LED dot-matrix style ── */

.crt-readout {
  position: absolute;
  bottom: -2.4rem;
  right: 0;
  z-index: 6;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'VT323', 'Courier New', monospace;
  font-size: 0.95rem;
  color: var(--mx-accent);
  text-shadow: 0 0 8px rgba(var(--mx-accent-rgb), 0.7);
  letter-spacing: 0.08em;
  background: rgba(0,0,0,0.6);
  padding: 0.15rem 0.5rem;
  border: 1px solid rgba(var(--mx-accent-rgb), 0.25);
}

.crt-led {
  width: 0.4rem;
  height: 0.4rem;
  background: var(--mx-accent);
  box-shadow: 0 0 6px rgba(var(--mx-accent-rgb), 0.8);
  animation: crt-led-blink 2s step-end infinite;
}

@keyframes crt-led-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
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
  border-bottom: 1px solid rgba(var(--mx-accent-rgb), 0.28);
}

.detail-kicker {
  color: var(--mx-warm);
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.82rem;
  margin-bottom: 0.85rem;
}

.detail-hero h1 {
  font-size: clamp(2.4rem, 7vw, 6rem);
  line-height: 0.95;
  color: #fff;
  text-shadow: 0 0 24px rgba(var(--mx-accent-rgb), 0.38);
}

.detail-lead {
  max-width: 70rem;
  margin-top: 1.4rem;
  color: rgba(255, 255, 255, 0.82);
  font-size: clamp(1rem, 2vw, 1.25rem);
  line-height: 1.75;
}

.detail-rail {
  position: fixed;
  top: 50%;
  right: calc(env(safe-area-inset-right, 0px) + 0.6rem);
  transform: translateY(-50%);
  z-index: 29;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  padding: 0.55rem;
  border: 1px solid rgba(var(--mx-accent-rgb), 0.34);
  border-radius: 10px;
  background:
    repeating-linear-gradient(180deg, rgba(var(--mx-accent-rgb), 0.035) 0 1px, transparent 1px 4px),
    linear-gradient(180deg, rgba(2, 14, 7, 0.86), rgba(1, 6, 3, 0.88));
  box-shadow:
    inset 0 0 14px rgba(var(--mx-accent-rgb), 0.14),
    0 0 16px rgba(var(--mx-accent-rgb), 0.12);
  backdrop-filter: blur(2px);
}

.detail-rail__link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  padding: 0.3rem 0.45rem;
  color: rgba(var(--mx-accent-soft-rgb), 0.84);
  border: 1px solid rgba(var(--mx-accent-rgb), 0.08);
  background: transparent;
  text-decoration: none;
  font-family: 'VT323', 'Courier New', monospace;
  font-size: 0.72rem;
  letter-spacing: 0.11em;
  text-transform: uppercase;
  transition: border-color 0.16s ease, color 0.16s ease, background-color 0.16s ease, text-shadow 0.16s ease;
}

.detail-rail__link--button {
  appearance: none;
  cursor: pointer;
}

.detail-rail__link:hover,
.detail-rail__link:focus-visible {
  color: var(--mx-accent-soft);
  border-color: rgba(var(--mx-accent-rgb), 0.45);
  background:
    linear-gradient(90deg, rgba(var(--mx-accent-rgb), 0.2), rgba(var(--mx-blue-vibe-rgb), 0.14));
  text-shadow: 0 0 8px rgba(var(--mx-accent-rgb), 0.55);
}

.detail-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-width: 13rem;
}

.detail-nav-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 8px;
  padding: 0.72rem 1rem;
  color: rgba(var(--mx-accent-soft-rgb), 0.9);
  border: 1px solid rgba(var(--mx-accent-rgb), 0.34);
  background: rgba(0, 0, 0, 0.45);
  text-decoration: none;
  font-family: 'VT323', 'Courier New', monospace;
  font-size: 0.88rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  transition: border-color 0.18s ease, color 0.18s ease, background-color 0.18s ease, transform 0.18s ease;
}

.detail-nav-btn--visit {
  background:
    linear-gradient(90deg, rgba(var(--mx-accent-rgb), 0.18), rgba(var(--mx-blue-vibe-rgb), 0.14)),
    rgba(0, 0, 0, 0.46);
}

.detail-nav-btn--source {
  background:
    linear-gradient(90deg, rgba(var(--mx-warm-rgb), 0.14), rgba(var(--mx-accent-rgb), 0.1)),
    rgba(0, 0, 0, 0.45);
}

.detail-nav-btn--back {
  background: rgba(0, 0, 0, 0.4);
}

.detail-nav-btn:hover,
.detail-nav-btn:focus-visible {
  transform: translateY(-1px);
  border-color: var(--mx-warm);
  color: var(--mx-accent-soft);
  background-color: rgba(var(--mx-accent-rgb), 0.12);
}

.detail-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(18rem, 0.34fr);
  gap: 2rem;
  padding: 2rem 0 4rem;
}

/* ── 2-col: carousel + info ── */

.detail-gallery-layout {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 2.5rem;
  align-items: start;
  padding: 2rem 0 4rem;
}

.detail-info-col {
  display: grid;
  gap: 1.5rem;
}

.detail-copy {
  display: grid;
  gap: 1.25rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.8;
  font-size: 1.03rem;
}

.project-dossier {
  border: 1px solid rgba(var(--mx-accent-rgb), 0.36);
  background: rgba(0, 13, 5, 0.76);
  box-shadow: inset 0 0 24px rgba(var(--mx-accent-rgb), 0.08);
  padding: 1.25rem;
  display: grid;
  gap: 1.2rem;
  align-self: start;
}

.project-dossier span {
  display: block;
  color: var(--mx-accent-soft);
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
  border: 1px solid rgba(var(--mx-warm-rgb), 0.42);
  padding: 0.3rem 0.55rem;
  font-size: 0.78rem;
  background: rgba(var(--mx-warm-rgb), 0.08);
}

.gallery-title {
  color: #fff;
  text-shadow: 0 0 18px rgba(var(--mx-accent-rgb), 0.5);
  font-size: clamp(1.5rem, 3vw, 2rem);
}

@media (max-width: 768px) {
  .detail-hero,
  .detail-layout,
  .detail-gallery-layout {
    grid-template-columns: 1fr;
  }

  .detail-actions {
    min-width: 0;
  }

  .crt-bezel {
    padding: 1.4rem 1.2rem 1.8rem;
    border-radius: 12px 12px 16px 16px;
  }

  .crt-screen {
    aspect-ratio: 4 / 3;
  }

  .crt-corner {
    width: 12px;
    height: 12px;
  }

  .crt-corner--tl { top: 8px; left: 8px; }
  .crt-corner--tr { top: 8px; right: 8px; }
  .crt-corner--bl { bottom: 12px; left: 8px; }
  .crt-corner--br { bottom: 12px; right: 8px; }

  .carousel-arrow {
    width: 2rem;
    height: 2.8rem;
    font-size: 0.8rem;
  }

  .crt-readout {
    bottom: -2.2rem;
    font-size: 0.8rem;
  }

  .carousel-dots {
    bottom: -1.6rem;
  }
}

@media (max-width: 767px) {
  .detail-rail {
    display: none !important;
  }
}
</style>
