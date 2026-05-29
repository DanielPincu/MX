<template>
  <div class="relative min-h-screen bg-gray-900 text-gray-100 mt-16 project-card portfolio-page">
    <!-- Matrix Canvas -->
    <canvas ref="matrixCanvas" class="absolute top-0 left-0 w-full h-full"></canvas>
    <!-- <div class="overlay"></div> -->
        <div class="cipher-top">
          <Cipher />
        </div>
        <div class="glitch-text text-center text-[42px] md:text-[50px] portfolio-heading">
          <span>Projects showcase</span>
        </div>
    <div class="relative px-6 portfolio-content">
      <!-- Heading -->
      
      <section class="matrix-showcase-console">
        <div class="showcase-console-header">
          <span></span>
          <p>project transmissions / deployment archive</p>
        </div>

        <!-- Category Buttons -->
        <div class="flex justify-center gap-3 mb-12 flex-wrap category-dock">
          <button
            v-for="category in categories"
            :key="category.value"
            class="category-button"
            :class="{ active: selectedCategory === category.value }"
            @click="selectedCategory = category.value">
            {{ category.label }}
          </button>
        </div>

        <!-- Portfolio Items (3 per row) -->
        <div class="grid md:grid-cols-2 xl:grid-cols-3 grid-cols-1 pt-4 gap-6 portfolio-grid">
          <router-link
            v-for="portfolioItem in filteredPortfolioItems"
            :key="portfolioItem.id"
            :to="`/detail/${portfolioItem.id}`"
            class="project opacity-95"
            @pointerenter="playHoverSound">
            
            <div class="project-frame">
              <img
                :src="portfolioItem.image"
                :alt="`${portfolioItem.title} project preview`"
              />
              <img
                class="project-ghost ghost-green"
                :src="portfolioItem.image"
                alt=""
                aria-hidden="true"
              />
              <img
                class="project-ghost ghost-red"
                :src="portfolioItem.image"
                alt=""
                aria-hidden="true"
              />
            </div>
            <div class="project-meta">
              <span>{{ portfolioItem.category }}</span>
              <span>{{ portfolioItem.year }}</span>
            </div>
            <div class="project-corners" aria-hidden="true">
              <span></span><span></span><span></span><span></span>
            </div>
            <div class="project-readout" aria-hidden="true">
              <span>trace route</span>
              <strong>{{ String(portfolioItem.id).padStart(2, '0') }} / {{ portfolioItem.category }}</strong>
            </div>
            <div class="project__content">
              <div>
                <h2>{{ portfolioItem.title }}</h2>
                <p>{{ portfolioItem.role }}</p>
                <div class="tech-row">
                  <span v-for="tech in portfolioItem.technologies.slice(0, 3)" :key="tech">{{ tech }}</span>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </section>
    </div>
  </div>

  
  
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import getPortfolio from '@/modules/getPortfolio';
import Cipher from '../views/Cipher.vue';

const { portfolioItems } = getPortfolio();
const selectedCategory = ref('');
const matrixCanvas = ref(null);

const categories = computed(() => {
  const uniqueCategories = [...new Set(portfolioItems.value.map(item => item.category))];
  return [
    { label: 'All transmissions', value: '' },
    ...uniqueCategories.map(category => ({ label: category, value: category }))
  ];
});

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
let audioContext = null;
let lastHoverSoundAt = 0;

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
  const styles = getComputedStyle(document.documentElement);
  const accent = styles.getPropertyValue("--mx-accent").trim() || "rgba(168, 255, 200, 1)";
  const soft = styles.getPropertyValue("--mx-accent-soft").trim() || "rgba(168, 255, 200, 1)";

  matrix.fillStyle = "rgba(2, 2, 4, 0.04)";
  matrix.fillRect(0, 0, canvas.width, canvas.height);

  matrix.font = FONT_SIZE + "px " + FONT_FACE;

  for (let i = 0; i < rows.length; i++) {
    let randChar = getRandomChar();

    matrix.fillStyle = soft;
    matrix.fillText(randChar, i * FONT_SIZE, rows[i][0] * FONT_SIZE);

    if (rows[i][1] && rows[i][1] !== "") {
      matrix.fillStyle = accent;
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

const getAudioContext = () => {
  if (!audioContext) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioContext = AudioContextClass ? new AudioContextClass() : null;
  }

  return audioContext;
};

const unlockAudio = () => {
  const context = getAudioContext();

  if (context?.state === 'suspended') {
    context.resume();
  }
};

const playHoverSound = () => {
  const now = performance.now();

  if (now - lastHoverSoundAt < 260) {
    return;
  }

  lastHoverSoundAt = now;
  const context = getAudioContext();

  if (!context || context.state === 'suspended') {
    return;
  }

  const oscillator = context.createOscillator();
  const toneGain = context.createGain();
  const noiseGain = context.createGain();
  const masterGain = context.createGain();
  const toneFilter = context.createBiquadFilter();
  const noiseFilter = context.createBiquadFilter();
  const start = context.currentTime;
  const duration = 0.28;
  const baud = 45.45;
  const bitLength = 1 / baud;
  const mark = 2125;
  const space = 2295;
  const pattern = [1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1];
  const noiseBuffer = context.createBuffer(1, context.sampleRate * duration, context.sampleRate);
  const noiseData = noiseBuffer.getChannelData(0);
  const noiseSource = context.createBufferSource();

  for (let i = 0; i < noiseData.length; i++) {
    noiseData[i] = (Math.random() * 2 - 1) * 0.32;
  }

  oscillator.type = 'square';
  pattern.forEach((bit, index) => {
    oscillator.frequency.setValueAtTime(bit ? mark : space, start + index * bitLength);
  });

  toneFilter.type = 'bandpass';
  toneFilter.frequency.setValueAtTime(2210, start);
  toneFilter.Q.setValueAtTime(10, start);

  noiseFilter.type = 'bandpass';
  noiseFilter.frequency.setValueAtTime(1800, start);
  noiseFilter.Q.setValueAtTime(0.8, start);

  toneGain.gain.setValueAtTime(0.0001, start);
  toneGain.gain.exponentialRampToValueAtTime(0.035, start + 0.012);
  toneGain.gain.setValueAtTime(0.035, start + duration - 0.045);
  toneGain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  noiseGain.gain.setValueAtTime(0.0001, start);
  noiseGain.gain.exponentialRampToValueAtTime(0.014, start + 0.01);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  masterGain.gain.setValueAtTime(0.85, start);

  noiseSource.buffer = noiseBuffer;
  oscillator.connect(toneFilter);
  toneFilter.connect(toneGain);
  toneGain.connect(masterGain);
  noiseSource.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(masterGain);
  masterGain.connect(context.destination);

  noiseSource.start(start);
  noiseSource.stop(start + duration);
  oscillator.start(start);
  oscillator.stop(start + duration);
};

onMounted(() => {
  initMatrix();
  // window.addEventListener("resize", calculateColumns);
  window.addEventListener('pointerdown', unlockAudio, { once: true });
  window.addEventListener('keydown', unlockAudio, { once: true });
});

onUnmounted(() => {
  clearInterval(intervalId);
  window.removeEventListener("resize", calculateColumns);
  window.removeEventListener('pointerdown', unlockAudio);
  window.removeEventListener('keydown', unlockAudio);
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Covered+By+Your+Grace&display=swap");




h2 {
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  text-align: center;
  color: white;
  line-height: 1.05;
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

.portfolio-page {
  overflow: hidden;
  padding-top: 0;
}

.cipher-top {
  position: relative;
  z-index: 2;
  min-height: clamp(4.5rem, 10vw, 7.5rem);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 0;
}

.portfolio-heading {
  position: relative;
  z-index: 2;
  margin-top: clamp(0.75rem, 2vw, 1.25rem);
  margin-bottom: clamp(1.5rem, 3vw, 2.5rem);
}

.portfolio-content {
  z-index: 2;
  padding-top: 0;
  padding-bottom: clamp(4rem, 7vw, 6rem);
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

.matrix-showcase-console {
  position: relative;
  width: min(96vw, 1720px);
  margin: 0 auto;
  padding: 3rem 1.25rem 1.4rem;
  border: 1px solid rgba(var(--mx-accent-rgb), 0.28);
  border-radius: 14px 14px 22px 22px;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.028), transparent 22%),
    repeating-linear-gradient(180deg, rgba(var(--mx-accent-rgb), 0.015) 0 1px, transparent 1px 5px),
    radial-gradient(circle at 50% 0%, rgba(var(--mx-accent-rgb), 0.08), transparent 46%),
    linear-gradient(180deg, rgba(16, 21, 16, 0.72), rgba(2, 4, 2, 0.54) 74%);
  backdrop-filter: blur(1px);
  box-shadow:
    inset 0 1rem 1.2rem rgba(0, 0, 0, 0.5),
    0 1.4rem 2.2rem -0.8rem rgba(0, 0, 0, 0.84),
    0 0 28px rgba(var(--mx-accent-rgb), 0.08);
  contain: layout paint;
}

.matrix-showcase-console::before {
  content: "The Matrix has you...";
  position: absolute;
  top: 0.9rem;
  right: 1.25rem;
  color: rgba(var(--mx-accent-rgb), 0.52);
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  text-shadow: 0 0 10px rgba(var(--mx-accent-rgb), 0.55);
}

.showcase-console-header {
  position: absolute;
  top: 0.85rem;
  left: 1.25rem;
  right: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  pointer-events: none;
}

.showcase-console-header span {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 999px;
  background: var(--mx-accent);
  box-shadow: 0 0 12px rgba(var(--mx-accent-rgb), 0.7);
}

.showcase-console-header p {
  color: rgba(var(--mx-accent-soft-rgb), 0.62);
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  text-shadow: 0 0 9px rgba(var(--mx-accent-rgb), 0.32);
}

.category-dock {
  border-bottom: 1px solid rgba(var(--mx-accent-rgb), 0.14);
  padding-bottom: 1.25rem;
}

.category-button {
  border: 1px solid rgba(var(--mx-accent-soft-rgb), 0.22);
  border-bottom: 4px solid rgba(0, 0, 0, 0.86);
  color: rgba(var(--mx-accent-soft-rgb), 0.86);
  background: linear-gradient(180deg, #172219, #071009 58%, #030603);
  padding: 0.72rem 1rem 0.58rem;
  border-radius: 7px 7px 11px 11px;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    inset 0 -0.32rem 0.42rem rgba(0, 0, 0, 0.64),
    0 0.16rem 0 rgba(0, 0, 0, 0.9);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.76rem;
  transition: transform 90ms ease, border-color 90ms ease, color 90ms ease;
}

.category-button:hover,
.category-button.active {
  transform: translateY(-2px);
  border-color: rgba(var(--mx-warm-rgb), 0.78);
  background:
    linear-gradient(180deg, rgba(var(--mx-warm-rgb), 0.12), transparent 42%),
    linear-gradient(180deg, #1b1c12, #071009 58%, #030603);
  color: #fff7aa;
}

.project {
  position: relative;
  min-width: 225px;
  min-height: 430px;
  overflow: hidden;
  border: 1px solid rgba(var(--mx-accent-soft-rgb), 0.18);
  border-bottom: 6px solid rgba(0, 0, 0, 0.9);
  border-radius: 8px 8px 14px 14px;
  background:
    linear-gradient(180deg, rgba(var(--mx-accent-rgb), 0.055), transparent 34%),
    linear-gradient(180deg, rgba(20, 27, 21, 0.78), rgba(5, 7, 5, 0.66) 72%);
  backdrop-filter: blur(0.5px);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    inset 0 -0.5rem 0.65rem rgba(0, 0, 0, 0.72),
    0 0.22rem 0 rgba(0, 0, 0, 0.9),
    0 0 10px rgba(var(--mx-accent-rgb), 0.06);
  transition: transform 90ms ease, border-color 90ms ease, box-shadow 90ms ease;
  isolation: isolate;
  contain: paint;
}

.project::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.32) 42%, rgba(0, 0, 0, 0.9) 100%),
    repeating-linear-gradient(180deg, rgba(var(--mx-accent-rgb), 0.035) 0 1px, transparent 1px 5px);
  z-index: 1;
  pointer-events: none;
}

.project::after {
  content: "ACCESSING SOURCE";
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 3;
  width: min(82%, 18rem);
  border: 1px solid rgba(var(--mx-warm-rgb), 0.6);
  background: rgba(0, 8, 3, 0.84);
  color: #fff7aa;
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  text-align: center;
  text-transform: uppercase;
  padding: 0.62rem 0.75rem;
  opacity: 0;
  transform: translate(-50%, -50%) scaleX(0.55);
  box-shadow: 0 0 18px rgba(var(--mx-warm-rgb), 0.18);
  pointer-events: none;
}

.project-corners {
  position: absolute;
  inset: 0.72rem;
  z-index: 4;
  pointer-events: none;
  opacity: 0;
}

.project-corners span {
  position: absolute;
  width: 2.1rem;
  height: 2.1rem;
  border-color: rgba(var(--mx-warm-rgb), 0.9);
}

.project-corners span:nth-child(1) {
  top: 0;
  left: 0;
  border-top: 2px solid;
  border-left: 2px solid;
}

.project-corners span:nth-child(2) {
  top: 0;
  right: 0;
  border-top: 2px solid;
  border-right: 2px solid;
}

.project-corners span:nth-child(3) {
  bottom: 0;
  left: 0;
  border-bottom: 2px solid;
  border-left: 2px solid;
}

.project-corners span:nth-child(4) {
  bottom: 0;
  right: 0;
  border-bottom: 2px solid;
  border-right: 2px solid;
}

.project-readout {
  position: absolute;
  left: 1rem;
  right: 1rem;
  bottom: 8.85rem;
  z-index: 4;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  border-top: 1px solid rgba(var(--mx-accent-rgb), 0.2);
  border-bottom: 1px solid rgba(var(--mx-accent-rgb), 0.2);
  background: rgba(0, 8, 3, 0.72);
  padding: 0.4rem 0.55rem;
  color: rgba(var(--mx-accent-soft-rgb), 0.72);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  opacity: 0;
  transform: translateY(8px);
  pointer-events: none;
}

.project-readout strong {
  color: #fff7aa;
  font-weight: 800;
}

.project-frame {
  position: absolute;
  inset: 0.75rem;
  bottom: 8.5rem;
  border: 1px solid rgba(var(--mx-accent-soft-rgb), 0.12);
  border-radius: 5px;
  overflow: hidden;
  background: rgba(3, 6, 3, 0.66);
}

.project-frame::before,
.project-frame::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  opacity: 0;
}

.project-frame::before {
  background:
    linear-gradient(90deg, transparent, rgba(var(--mx-accent-soft-rgb), 0.32), transparent),
    repeating-linear-gradient(180deg, rgba(var(--mx-accent-rgb), 0.12) 0 1px, transparent 1px 5px);
  transform: translateX(-120%);
}

.project-frame::after {
  background:
    linear-gradient(90deg, rgba(var(--mx-accent-rgb), 0.18), transparent 14% 86%, rgba(var(--mx-warm-rgb), 0.18)),
    repeating-linear-gradient(90deg, transparent 0 16px, rgba(var(--mx-accent-rgb), 0.18) 17px 18px);
  mix-blend-mode: screen;
}

.project-frame img {
  filter: saturate(0.82) contrast(1.02) brightness(0.78);
  transition: filter 90ms ease, transform 160ms ease;
}

.project-frame > img:not(.project-ghost) {
  position: relative;
  z-index: 0;
}

.project-ghost {
  position: absolute;
  inset: 0;
  z-index: 0;
  opacity: 0;
  mix-blend-mode: screen;
  pointer-events: none;
}

.ghost-green {
  filter: brightness(0.9) sepia(1) hue-rotate(75deg) saturate(3);
}

.ghost-red {
  filter: brightness(0.8) sepia(1) hue-rotate(-45deg) saturate(3);
}

.project-meta {
  position: absolute;
  top: 1rem;
  left: 1rem;
  right: 1rem;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.project-meta span,
.tech-row span {
  border: 1px solid rgba(var(--mx-accent-soft-rgb), 0.22);
  background: rgba(0, 8, 3, 0.82);
  color: rgba(var(--mx-accent-soft-rgb), 0.82);
  padding: 0.3rem 0.55rem;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.project__content {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  display: flex;
  align-items: flex-end;
  padding: 1.4rem;
  background: linear-gradient(180deg, transparent, rgba(0, 9, 3, 0.88));
}

.project__content > div {
  width: 100%;
}

.project__content p {
  color: rgba(var(--mx-accent-soft-rgb), 0.68);
  text-align: center;
  margin-top: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.78rem;
}

.tech-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.project:hover {
  transform: translateY(-4px);
  border-color: rgba(var(--mx-warm-rgb), 0.72);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.12),
    inset 0 -0.5rem 0.65rem rgba(0, 0, 0, 0.62),
    0 0.22rem 0 rgba(0, 0, 0, 0.9),
    0 0 18px rgba(var(--mx-accent-rgb), 0.14);
  animation: matrix-card-warp 680ms steps(2, end);
}

.project:hover::after {
  animation: access-flash 900ms steps(3, end);
}

.project:hover .project-corners {
  animation: lock-corners 900ms steps(2, end);
}

.project:hover .project-readout {
  animation: readout-decode 1050ms steps(4, end);
}

.project:hover .project-frame::before {
  animation: source-sweep 820ms cubic-bezier(0.2, 0.8, 0.2, 1);
}

.project:hover .project-frame::after {
  animation: code-interference 760ms steps(4, end);
}

.project:hover .project-frame img {
  filter: saturate(1) contrast(1.06) brightness(0.94);
  transform: scale(1.025);
  animation: image-glitch 680ms steps(2, end);
}

.project:hover .ghost-green {
  animation: green-channel 760ms steps(2, end);
}

.project:hover .ghost-red {
  animation: red-channel 760ms steps(2, end);
}

.project:hover h2 {
  animation: title-glitch 620ms steps(2, end);
  text-shadow:
    2px 0 rgba(var(--mx-accent-rgb), 0.8),
    -2px 0 rgba(var(--mx-warm-rgb), 0.65),
    0 0 14px rgba(var(--mx-accent-rgb), 0.55);
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
  .project {
    transform: none;
    min-height: 340px;
  }
  .matrix-showcase-console::before,
  .showcase-console-header p {
    display: none;
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

@keyframes matrix-card-warp {
  0% { transform: translateY(-4px) skewX(0deg); }
  14% { transform: translateY(-6px) skewX(-2deg); }
  28% { transform: translateY(-4px) skewX(2deg); }
  42% { transform: translateY(-7px) skewX(-1deg); }
  56%, 100% { transform: translateY(-4px) skewX(0deg); }
}

@keyframes source-sweep {
  0% { opacity: 0; transform: translateX(-120%); }
  12% { opacity: 1; }
  68% { opacity: 0.95; transform: translateX(115%); }
  100% { opacity: 0; transform: translateX(140%); }
}

@keyframes code-interference {
  0%, 100% { opacity: 0; transform: translateX(0); }
  12% { opacity: 0.62; transform: translateX(-6px); }
  24% { opacity: 0.28; transform: translateX(7px); }
  38% { opacity: 0.7; transform: translateX(-3px); }
  56% { opacity: 0.18; transform: translateX(4px); }
}

@keyframes image-glitch {
  0%, 100% {
    transform: scale(1.025);
    clip-path: inset(0);
  }
  16% {
    transform: scale(1.045) translateX(-5px);
    clip-path: inset(8% 0 62% 0);
  }
  32% {
    transform: scale(1.035) translateX(5px);
    clip-path: inset(48% 0 22% 0);
  }
  48% {
    transform: scale(1.04) translateX(-3px);
    clip-path: inset(26% 0 44% 0);
  }
  64% {
    transform: scale(1.025);
    clip-path: inset(0);
  }
}

@keyframes access-flash {
  0%, 100% {
    opacity: 0;
    transform: translate(-50%, -50%) scaleX(0.55);
  }
  12%, 46% {
    opacity: 1;
    transform: translate(-50%, -50%) scaleX(1);
  }
  62% {
    opacity: 0;
    transform: translate(-50%, -50%) scaleX(1.08);
  }
}

@keyframes title-glitch {
  0%, 100% { transform: translateX(0); }
  18% { transform: translateX(-4px); }
  36% { transform: translateX(5px); }
  52% { transform: translateX(-2px); }
}

@keyframes lock-corners {
  0%, 100% {
    opacity: 0;
    transform: scale(1.08);
  }
  8%, 54% {
    opacity: 1;
    transform: scale(1);
  }
  22% {
    opacity: 0.35;
    transform: scale(0.96);
  }
  38% {
    opacity: 1;
    transform: scale(1.02);
  }
}

@keyframes readout-decode {
  0%, 100% {
    opacity: 0;
    transform: translateY(8px);
  }
  12%, 76% {
    opacity: 1;
    transform: translateY(0);
  }
  24% {
    transform: translateY(0) translateX(-5px);
  }
  36% {
    transform: translateY(0) translateX(4px);
  }
}

@keyframes green-channel {
  0%, 100% {
    opacity: 0;
    transform: translateX(0) scale(1.025);
    clip-path: inset(0);
  }
  16% {
    opacity: 0.7;
    transform: translateX(7px) scale(1.035);
    clip-path: inset(12% 0 58% 0);
  }
  36% {
    opacity: 0.38;
    transform: translateX(-5px) scale(1.03);
    clip-path: inset(52% 0 18% 0);
  }
  56% {
    opacity: 0.56;
    transform: translateX(3px) scale(1.035);
    clip-path: inset(30% 0 38% 0);
  }
}

@keyframes red-channel {
  0%, 100% {
    opacity: 0;
    transform: translateX(0) scale(1.025);
    clip-path: inset(0);
  }
  14% {
    opacity: 0.45;
    transform: translateX(-8px) scale(1.04);
    clip-path: inset(62% 0 8% 0);
  }
  32% {
    opacity: 0.32;
    transform: translateX(6px) scale(1.035);
    clip-path: inset(18% 0 54% 0);
  }
  52% {
    opacity: 0.42;
    transform: translateX(-4px) scale(1.035);
    clip-path: inset(42% 0 28% 0);
  }
}

</style>
