<template>
  <section id="home" class="video-banner project-card">
    <div class="noise"></div>
    <canvas ref="canvas" class="absolute top-0 left-0 w-full h-full"></canvas>
    <div class="video-content hero-layout relative z-10 mt-[6.35rem] flex items-center justify-center w-full px-5 md:px-10">
      
      <div class="hero-copy-column">

        <!-- Matrix construct pillars & nodes -->
        <div class="hero-construct" aria-hidden="true">
          <span class="matrix-conduit matrix-conduit-top"></span>
          <span class="matrix-conduit matrix-conduit-left"></span>
          <span class="matrix-conduit matrix-conduit-right"></span>
          <span class="matrix-node matrix-node-tl"></span>
          <span class="matrix-node matrix-node-tr"></span>
          <span class="matrix-node matrix-node-bl"></span>
          <span class="matrix-node matrix-node-br"></span>
        </div>

        <div class="hero-terminal">

          <!-- ── Asymmetric split grid ── -->
          <div class="hero-grid">

            <!-- ── LEFT COLUMN: Main content 60% ── -->
            <div class="hero-left">

              <div class="hero-boot hero-cipher-shell " aria-hidden="true">
                <HeroCipher />
              </div>

              <!-- Typing effect -->
              <Typing class="hero-typing" />

              <!-- Name headline -->
              <h1 class="hero-name">
                <span class="hero-name-text hero-name-glitch -mt-8">Daniel Pincu<span aria-hidden="true">Daniel Pincu</span></span>
              </h1>

              <!-- Tagline -->
              

              <!-- CTAs -->
              <div class="hero-actions">
                <a href="#projects" class="blink-red button bg-red-500 shadow-lg border-b-2 border-slate-50 text-white font-bold text-sm md:text-xl px-5 md:py-6 rounded-full w-[140px] md:w-52">
                  <span>See projects</span>
                  <div class="liquid"></div>
                </a>
                <button @click="toggleAbout" class="blink-blue block button bg-blue-500 shadow-lg border-b-2 border-slate-50 text-white font-bold text-sm md:text-xl px-5 md:py-6 rounded-full w-[140px] md:w-52">
                  <span>Contact me</span>
                  <div class="liquid2"></div>
                </button>
              </div>

            </div>

            <!-- ── RIGHT COLUMN: TV + Stats 40% ── -->
            <div class="hero-right">
              
              <!-- TV monitor -->
              <div class="hero-tv-dock">
                <span class="hero-tv-label">system monitor</span>
                <Glitch class="hero-tv" />
              </div>

              <!-- Stats cards -->
              <div class="hero-stats">
                <div v-for="stat in heroStats" :key="stat.label" class="hero-stat-card">
                  <strong>{{ stat.value }}</strong>
                  <span>{{ stat.label }}</span>
                </div>
              </div>

            </div>

          </div>
          <div class="hero-news-ticker" aria-label="Highlights ticker">
            <span class="hero-news-label">MX LIVE</span>
            <div class="hero-news-track-wrap">
              <div class="hero-news-track">
                <span v-for="(item, idx) in tickerItems" :key="`a-${idx}`">{{ item }}</span>
                <span v-for="(item, idx) in tickerItems" :key="`b-${idx}`">{{ item }}</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>

    <!-- Scroll indicator -->
    <div class="hero-scroll-indicator" aria-hidden="true">
      <span class="hero-scroll-arrow">▼</span>
      <span class="hero-scroll-text">scroll</span>
    </div>

    <!-- Contact overlay -->
    <Transition name="slide-in">
      <div v-if="isAboutOpen" class="fixed z-40 top-20 left-0 w-[99.88%] transform transition-transform duration-300 ease-in-out">
        <button @click="closeAbout" class="text-white mb-4"><i class="fa text-3xl fa-times" aria-hidden="true"></i></button>
        <ContactView />
      </div>
    </Transition>

  </section>


  <AboutView class="project-card site-section" />



  <section id="expertise" class="site-section section-pad relative project-card">
    <canvas ref="matrixCanvas2" class="absolute top-0 left-0 w-full h-full"></canvas>
    <div class="noise2"></div>
    <!-- <div class="overlay3 md:h-[84%] h-[93%]"></div> -->
    <div class="relative z-20">
        <div class="glitch-text pb-10 text-center text-[50px]">
          <span>Expertise</span>
        </div>
      <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-6 fade-in container mx-auto px-5">
        
        <div v-for="(skill, index) in expertise" :key="skill.title" class="expertise-card p-6 rounded-lg project-card">
          <div class="flex justify-between items-start gap-4 mb-4">
            <h3 class="text-lg font-bold">{{ skill.title }}</h3>
            <span class="skill-index">{{ String(index + 1).padStart(2, '0') }}</span>
          </div>
          <p class="text-md">{{ skill.description }}</p>
        </div>
      </div>
    </div>
  </section>




  <section id="hobbies" class="site-section bg-gray-900 project-card relative hidden md:block">
    <canvas ref="matrixCanvas" class="absolute top-0 left-0 w-full h-full"></canvas>
    <div class="noise3"></div>
    <!-- <div class="overlay2"></div> -->
    <!-- Ensure the title is above the canvas -->
    <div class="relative z-10">
        <div class="glitch-text pb-10 pt-20 text-center text-[50px]">
          <span>My Internet periodic table</span>
        </div>

      <div class="hobby-ticker overflow-hidden">
        <div class="hobby-ticker-content space-x-8 inline-block">
          <div v-for="hobby in hobbies" :key="hobby.name" class="hobby-item bg-opacity-60 project-card bg-gray-800 p-6 rounded-lg text-center inline-block flex-shrink-0 w-64">
            <i :class="['fas', hobby.icon, 'text-4xl mb-4']"></i>
            <h3 class="text-xl font-bold mb-2">{{ hobby.name }}</h3>
          </div>
        </div>
      </div>
       <div class="hidden xl:block periodic-section">

        <div class="glitch-text periodic-title text-center text-[50px]">
          <p class="text-green-600 text-[24px]">How I spend my time online? <br> That's a 400 Bad Request question 😂</p>
        </div>
        <div class="periodic-wrap">
          <PeriodicView />
        </div>
       </div>
    </div>
  </section>

 



  <PortfolioView id="projects" class="site-section-top" />

  

</template>
<script setup>
import Glitch from './TV.vue';
import Typing from './Typing.vue';
import HeroCipher from './HeroCipher.vue';
import ContactView from './ContactView.vue';
import AboutView from './AboutView.vue';
import PortfolioView from './PortfolioView.vue';
import { ref, watch, onMounted, onUnmounted } from 'vue';
import PeriodicView from './PeriodicView.vue';

onMounted(() => {
  window.scrollTo(0, 0);
});

const isAboutOpen = ref(false)
const toggleAbout = () => {
  isAboutOpen.value = !isAboutOpen.value
}
const closeAbout = () => {
  isAboutOpen.value = false
}

const getScrollbarWidth = () => {
  return window.innerWidth - document.documentElement.clientWidth;
};

const heroStats = ref([
  { value: "10", label: "featured projects" },
  { value: "Vue", label: "current main stack" },
  { value: "SEA", label: "web dev studies" }
]);

const tickerItems = ref([
  "Now shipping immersive front-end builds",
  "IoT + web experiments in active development",
  "Currently exploring React and API design",
  "Open for collaboration and freelance projects"
]);

const hobbiesTitle = ref("Hobbies & Interests");
const hobbies = ref([
  { name: "CODING", icon: "fa-code" },
  { name: "3D PRINTING", icon: "fa-cube" },
  { name: "AMATØR RADIO", icon: "fa-broadcast-tower" },
  { name: "ASTRONOMY", icon: "fa-star" },
  { name: "ELECTRONICS", icon: "fa-microchip" },
  { name: "IOT", icon: "fa-network-wired" },
  { name: "REMOTE PILOT", icon: "fa-paper-plane" },
  { name: "PHP Curious", icon: "fa-laptop-code" },
  { name: "VueJS", icon: "fa-laptop" },
  { name: "WordPress", icon: "fa-cogs" },
  { name: "Python", icon: "fa-code" },
  { name: "Web Design", icon: "fa-paint-brush" },
  { name: "Front-End Dev", icon: "fa-laptop" },
  { name: "Back-End Dev", icon: "fa-server" },
  { name: "Web Security", icon: "fa-shield-alt" },
  { name: "UX/UI Design", icon: "fa-users-cog" },
  { name: "DB Management", icon: "fa-database" },
  { name: "DevOps", icon: "fa-cogs" },
  { name: "Mobile App Dev", icon: "fa-mobile-alt" },
  { name: "API Enthusiast", icon: "fa-plug" },
  { name: "Cloud Computing", icon: "fa-cloud" },
  { name: "SEO", icon: "fa-search" },
  { name: "Code Review", icon: "fa-check-circle" },
  { name: "Version Control", icon: "fa-code-branch" },
  { name: "CI/CD", icon: "fa-sync-alt" }
]);

const expertiseTitle = ref("Expertise");
const expertise = ref([
  {
    title: "Front-End Development",
    description: "With a passion for crafting seamless user experiences, I specialize in building responsive and interactive web applications. My expertise in HTML, CSS/Tailwind/Bootstrap and TypeScript allows me to bring designs to life while ensuring optimal performance across devices."
  },
  {
    title: "VueJS & React",
    description: "I build modern interfaces with Vue and continue expanding my React skills, focusing on reusable components, state management, routing, and performance for scalable single-page applications."
  },
  {
    title: "Backend & Databases",
    description:
      "I work with PHP and data layers across MySQL and MongoDB, building a solid foundation in backend logic, relational and document modeling, and dynamic data-driven features.",
  },

  {
    title: "APIs & Integrations",
    description:
      "I design and consume REST APIs to connect frontend and backend systems, focusing on clean endpoints, reliable request handling, and reusable integration patterns.",
  },

  {
    title: "DevOps & GitHub Workflow",
    description:
      "I use GitHub daily with branches and pull requests, while exploring deployment, environment setup, and automation to ship reliable applications.",
  },

  {
    title: "WordPress & Customization",
    description:
      "I build and customize WordPress themes and features, using PHP to extend functionality and optimize user experience for real-world projects.",
  }

]);

const canvas = ref(null);
let animationId = null;
const str = "日ア  イウ  エオ  カキ  クケコ  サシス  セソタチツテト  ナニヌネノハヒフヘホマミム  メモヤユヨラリル  レロワヲンあいうえおかきくけこさし  すせそ  たちつてとな ";
const matrix = str.split("");
let $, W, H, font, col, arr;

const initCanvas = () => {
  const C = canvas.value;
  $ = C.getContext("2d");
  W = C.width = window.innerWidth;
  H = C.height = window.innerHeight;
  font = 8;
  col = W / font;
  arr = new Array(Math.ceil(col)).fill(1);
};

const draw = () => {
  $.fillStyle = "rgba(0,0,0,.015)";
  $.fillRect(0, 0, W, H);
  $.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--mx-accent").trim() || "#45ff8a";
  $.font = font + "px system-ui";
  for (let i = 0; i < arr.length; i++) {
    let txt = matrix[Math.floor(Math.random() * matrix.length)];
    $.fillText(txt, i * font, arr[i] * font);
    if (arr[i] * font > H && Math.random() > 0.9995) arr[i] = 0;
    arr[i]++;
  }
  animationId = requestAnimationFrame(draw);
};

const matrixCanvas = ref(null);
let matrixAnimationId = null;
const matrixCharsHobbies = str.split("");
let matrixCtxHobbies, matrixWidthHobbies, matrixHeightHobbies, matrixFontHobbies, matrixColumnsHobbies, matrixDropsHobbies;

const initMatrixCanvasHobbies = () => {
  const canvasElementHobbies = matrixCanvas.value;
  if (canvasElementHobbies) {
    matrixCtxHobbies = canvasElementHobbies.getContext("2d");
    matrixWidthHobbies = canvasElementHobbies.width = window.innerWidth;
    matrixHeightHobbies = canvasElementHobbies.height = window.innerHeight;
    matrixFontHobbies = 8;
    matrixColumnsHobbies = matrixWidthHobbies / matrixFontHobbies;
    matrixDropsHobbies = new Array(Math.ceil(matrixColumnsHobbies)).fill(1);
  }
};

const drawMatrixHobbies = () => {
  matrixCtxHobbies.fillStyle = "rgba(0,0,0,.02)";
  matrixCtxHobbies.fillRect(0, 0, matrixWidthHobbies, matrixHeightHobbies);
  matrixCtxHobbies.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--mx-accent").trim() || "#45ff8a";
  matrixCtxHobbies.font = `${matrixFontHobbies}px system-ui`;
  for (let i = 0; i < matrixDropsHobbies.length; i++) {
    let txt = matrixCharsHobbies[Math.floor(Math.random() * matrixCharsHobbies.length)];
    matrixCtxHobbies.fillText(txt, i * matrixFontHobbies, matrixDropsHobbies[i] * matrixFontHobbies);
    if (matrixDropsHobbies[i] * matrixFontHobbies > matrixHeightHobbies && Math.random() > 0.9999) {
      matrixDropsHobbies[i] = 0;
    }
    matrixDropsHobbies[i]++;
  }
  matrixAnimationId = requestAnimationFrame(drawMatrixHobbies);
};

const matrixCanvas2 = ref(null);
let expertiseMatrixAnimationId;
const expertiseCharsMatrixStr = str.split("");
let expertiseMatrixCtx, expertiseMatrixWidth, expertiseMatrixHeight, expertiseMatrixFont, expertiseMatrixColumns, expertiseMatrixDrops;

const initExpertiseMatrixCanvas = () => {
  const canvasElementExpertise = matrixCanvas2.value;
  if (canvasElementExpertise) {
    expertiseMatrixCtx = canvasElementExpertise.getContext("2d");
    expertiseMatrixWidth = canvasElementExpertise.width = window.innerWidth;
    expertiseMatrixHeight = canvasElementExpertise.height = window.innerHeight;
    expertiseMatrixFont = 7;
    expertiseMatrixColumns = expertiseMatrixWidth / expertiseMatrixFont;
    expertiseMatrixDrops = new Array(Math.ceil(expertiseMatrixColumns)).fill(1);
  }
};

const drawExpertiseMatrixFrame = () => {
  expertiseMatrixCtx.fillStyle = 'rgba(0,0,0,.02)';
  expertiseMatrixCtx.fillRect(0, 0, expertiseMatrixWidth, expertiseMatrixHeight);
  expertiseMatrixCtx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--mx-accent").trim() || "#45ff8a";
  expertiseMatrixCtx.font = `${expertiseMatrixFont}px system-ui`;
  for (let i = 0; i < expertiseMatrixDrops.length; i++) {
    let txt = expertiseCharsMatrixStr[Math.floor(Math.random() * expertiseCharsMatrixStr.length)];
    expertiseMatrixCtx.fillText(txt, i * expertiseMatrixFont, expertiseMatrixDrops[i] * expertiseMatrixFont);
    if (expertiseMatrixDrops[i] * expertiseMatrixFont > expertiseMatrixHeight && Math.random() > 0.9999) {
      expertiseMatrixDrops[i] = 0;
    }
    expertiseMatrixDrops[i]++;
  }
  expertiseMatrixAnimationId = requestAnimationFrame(drawExpertiseMatrixFrame);
};

onMounted(() => {
  initCanvas();
  draw();
  initMatrixCanvasHobbies();
  drawMatrixHobbies();
  initExpertiseMatrixCanvas();
  drawExpertiseMatrixFrame();
});

onUnmounted(() => {
  cancelAnimationFrame(animationId);
  window.removeEventListener("resize", initCanvas);
  cancelAnimationFrame(matrixAnimationId);
  window.removeEventListener("resize", initMatrixCanvasHobbies);
  cancelAnimationFrame(expertiseMatrixAnimationId);
  window.removeEventListener("resize", initExpertiseMatrixCanvas);
});
</script>


<style scoped>

/* ══════════════════════════════════════════
   SHARED UTILITY ANIMATIONS
   ══════════════════════════════════════════ */

.glitch-text {
  position: relative;
  font-family: 'VT323', 'Courier New', monospace;
  font-weight: bold;
  color: var(--mx-accent-soft);
  letter-spacing: 0.03em;
  text-transform: uppercase;
  animation: c64-type-flicker 4.8s steps(2, end) infinite;
}

.glitch-text span {
  color: var(--mx-accent-soft);
  filter: none;
  text-shadow:
    3px 0 0 rgba(0, 82, 38, 0.9),
    -3px 0 0 rgba(255, 255, 255, 0.12),
    0 0 18px rgba(var(--mx-accent-rgb), 0.58),
    0 0 32px rgba(var(--mx-blue-vibe-rgb), 0.18);
  animation: c64-character-shift 2.6s steps(2, end) infinite;
}

@keyframes c64-character-shift {
  0%, 89%, 100% { transform: translate(0, 0); }
  90% { transform: translate(3px, 0); }
  92% { transform: translate(-2px, 1px); }
  94% { transform: translate(0, 0); }
}

@keyframes c64-type-flicker {
  0%, 82%, 100% { opacity: 1; }
  84% { opacity: 0.76; }
  86% { opacity: 1; }
}

/* ══════════════════════════════════════════
   BANNER & CANVAS
   ══════════════════════════════════════════ */

.video-banner {
   position: relative;
   overflow: hidden;
   background: var(--mx-deep);
   min-height: 100vh;
   display: flex;
   align-items: center;
   justify-content: center;
}

.video-banner > canvas {
  z-index: 1;
  opacity: 0.92;
  mix-blend-mode: screen;
}

.absolute {
   position: absolute;
   top: 0;
   left: 0;
}

.project-card {
   background-color: rgba(255,255,255,.1);
}

.site-section {
  margin-block: clamp(4.5rem, 8vw, 7rem);
}

.site-section-top {
  margin-top: clamp(4.5rem, 8vw, 7rem);
}

.section-pad {
  padding-block: clamp(4rem, 7vw, 6rem);
}

.periodic-section {
  margin-top: clamp(4rem, 7vw, 6rem);
  padding-bottom: clamp(3rem, 6vw, 5rem);
}

.periodic-title {
  padding-top: 0;
  padding-bottom: clamp(1.75rem, 3vw, 2.75rem);
}

.periodic-title p {
  margin-top: 0.55rem;
}

.periodic-wrap {
  padding-inline: clamp(1rem, 3vw, 2rem);
}

/* ══════════════════════════════════════════
   MATRIX CONSTRUCT — Pillars & Nodes
   ══════════════════════════════════════════ */

.hero-copy-column {
  position: relative;
  width: min(100%, 82rem);
  align-self: center;
}

.hero-construct {
  position: absolute;
  inset: -2.35rem 0 -1.5rem;
  pointer-events: none;
  z-index: 0;
}

.matrix-conduit,
.matrix-node {
  position: absolute;
  display: block;
  pointer-events: none;
}

.matrix-conduit {
  overflow: hidden;
  border: 1px solid rgba(var(--mx-accent-rgb), 0.38);
  background:
    linear-gradient(90deg, rgba(var(--mx-accent-rgb), 0.12), rgba(0, 0, 0, 0.22), rgba(var(--mx-blue-vibe-rgb), 0.1)),
    repeating-linear-gradient(90deg, rgba(var(--mx-accent-soft-rgb), 0.18) 0 1px, transparent 1px 11px),
    rgba(0, 10, 4, 0.58);
  box-shadow:
    inset 0 0 22px rgba(var(--mx-accent-rgb), 0.14),
    0 0 28px rgba(var(--mx-accent-rgb), 0.12);
}

.matrix-conduit::before,
.matrix-conduit::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.matrix-conduit::before {
  opacity: 0.8;
  background:
    repeating-linear-gradient(180deg,
      transparent 0 0.55rem,
      rgba(var(--mx-accent-rgb), 0.34) 0.55rem 0.65rem,
      transparent 0.65rem 1.35rem);
  animation: matrix-conduit-fall 4.8s linear infinite;
}

.matrix-conduit::after {
  background:
    linear-gradient(180deg, transparent, rgba(var(--mx-accent-soft-rgb), 0.65), transparent);
  filter: blur(1px);
  opacity: 0.52;
  animation: matrix-conduit-sweep 3.6s ease-in-out infinite;
}

.matrix-conduit-top {
  top: 0;
  left: 0;
  right: 0;
  height: 2.35rem;
}

.matrix-conduit-top::before {
  background:
    repeating-linear-gradient(90deg,
      transparent 0 0.65rem,
      rgba(var(--mx-accent-rgb), 0.36) 0.65rem 0.78rem,
      transparent 0.78rem 1.55rem);
  animation-name: matrix-conduit-flow;
}

.matrix-conduit-top::after {
  background: linear-gradient(90deg, transparent, rgba(var(--mx-accent-soft-rgb), 0.65), transparent);
  animation-name: matrix-conduit-sweep-x;
}

.matrix-conduit-left,
.matrix-conduit-right {
  top: 0;
  bottom: 1.4rem;
  width: 2.35rem;
}

.matrix-conduit-left {
  left: 0;
}

.matrix-conduit-right {
  right: 0;
}

.matrix-conduit-right::before {
  animation-duration: 5.8s;
  animation-direction: reverse;
}

.matrix-node {
  width: 1.05rem;
  height: 1.05rem;
  border: 1px solid rgba(var(--mx-accent-soft-rgb), 0.8);
  background:
    radial-gradient(circle, var(--mx-accent-soft) 0 18%, rgba(var(--mx-accent-rgb), 0.38) 19% 42%, transparent 43%),
    rgba(0, 0, 0, 0.52);
  box-shadow:
    0 0 14px rgba(var(--mx-accent-rgb), 0.82),
    inset 0 0 10px rgba(var(--mx-accent-rgb), 0.36);
  animation: matrix-node-pulse 2.4s steps(2, end) infinite;
}

.matrix-node-tl {
  top: 0.65rem;
  left: 0.65rem;
}

.matrix-node-tr {
  top: 0.65rem;
  right: 0.65rem;
}

.matrix-node-bl {
  bottom: 2rem;
  left: 0.65rem;
}

.matrix-node-br {
  bottom: 2rem;
  right: 0.65rem;
}

@keyframes matrix-conduit-fall {
  0% { transform: translateY(-1.35rem); }
  100% { transform: translateY(1.35rem); }
}

@keyframes matrix-conduit-flow {
  0% { transform: translateX(-1.55rem); }
  100% { transform: translateX(1.55rem); }
}

@keyframes matrix-conduit-sweep {
  0%, 72%, 100% {
    opacity: 0;
    transform: translateY(-110%);
  }
  82% { opacity: 0.7; }
  94% {
    opacity: 0;
    transform: translateY(110%);
  }
}

@keyframes matrix-conduit-sweep-x {
  0%, 68%, 100% {
    opacity: 0;
    transform: translateX(-110%);
  }
  80% { opacity: 0.72; }
  94% {
    opacity: 0;
    transform: translateX(110%);
  }
}

@keyframes matrix-node-pulse {
  0%, 100% {
    opacity: 0.62;
    transform: scale(0.88);
  }
  50% {
    opacity: 1;
    transform: scale(1.08);
  }
}

/* ══════════════════════════════════════════
   HERO TERMINAL FRAME
   ══════════════════════════════════════════ */

.hero-terminal {
  position: relative;
  width: calc(100% - 4.7rem);
  margin-inline: 2.35rem;
  border: 6px solid rgba(var(--mx-accent-rgb), 0.62);
  border-bottom: 6px solid rgba(0, 0, 0, 0.88);
  border-radius: 0;
  background:
    linear-gradient(90deg, rgba(var(--mx-warm-rgb), 0.08), transparent 22% 78%, rgba(var(--mx-blue-vibe-rgb), 0.1)),
    linear-gradient(135deg, rgba(255, 255, 255, 0.035), transparent 22%),
    repeating-linear-gradient(180deg, rgba(var(--mx-accent-rgb), 0.028) 0 1px, transparent 1px 5px),
    radial-gradient(circle at 50% 0%, rgba(var(--mx-accent-rgb), 0.18), transparent 52%),
    linear-gradient(180deg, var(--mx-panel), rgba(0, 0, 0, 0.58));
  box-shadow:
    inset 0 1rem 1.2rem rgba(0, 0, 0, 0.56),
    inset 0 -0.55rem 0.75rem rgba(0, 0, 0, 0.7),
    0 1.4rem 2.2rem -0.8rem rgba(0, 0, 0, 0.84),
    0 0 34px rgba(var(--mx-accent-rgb), 0.14),
    18px 0 42px rgba(var(--mx-blue-vibe-rgb), 0.06);
  padding: clamp(0.9rem, 2.2vw, 1.45rem);
  text-align: center;
  isolation: isolate;
  overflow: hidden;
  contain: paint;
}

.hero-terminal::before,
.hero-terminal::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hero-terminal::before {
  background:
    linear-gradient(90deg, transparent, rgba(var(--mx-accent-soft-rgb), 0.2), transparent),
    repeating-linear-gradient(90deg, transparent 0 44px, rgba(var(--mx-accent-rgb), 0.04) 45px 46px);
  transform: translateX(-100%);
  opacity: 0;
  animation: hero-source-sweep 7s ease-in-out infinite;
}

.hero-terminal::after {
  border: 1px solid rgba(var(--mx-accent-soft-rgb), 0.16);
  inset: 0.55rem;
  border-radius: 0 0 12px 12px;
  box-shadow:
    inset 12px 0 20px rgba(var(--mx-warm-rgb), 0.05),
    inset -12px 0 20px rgba(var(--mx-blue-vibe-rgb), 0.07);
}

.hero-terminal > * {
  position: relative;
  z-index: 1;
}

@keyframes hero-source-sweep {
  0%, 74%, 100% {
    opacity: 0;
    transform: translateX(-100%);
  }
  82% { opacity: 0.85; }
  92% {
    opacity: 0.25;
    transform: translateX(110%);
  }
}

/* ══════════════════════════════════════════
   HERO LAYOUT — Asymmetric Split Grid
   ══════════════════════════════════════════ */

.hero-layout {
  max-width: min(96vw, 1320px);
  margin-inline: auto;
  min-height: calc(100dvh - 6rem);
  position: relative;
  align-content: center;
  isolation: isolate;
  padding-bottom: 3rem;
}

/* Atmospheric glow behind the hero */
.hero-layout::before {
  content: "";
  position: absolute;
  pointer-events: none;
  z-index: -1;
  inset: -9rem calc(50% - 50vw) -5rem;
  background:
    radial-gradient(circle at 72% 42%, rgba(var(--mx-accent-rgb), 0.14), transparent 28rem),
    radial-gradient(circle at 22% 60%, rgba(var(--mx-blue-vibe-rgb), 0.1), transparent 26rem),
    linear-gradient(180deg, rgba(0, 18, 7, 0.42), rgba(var(--mx-accent-rgb), 0.08) 48%, rgba(0, 8, 3, 0.42));
}

.hero-grid {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: clamp(2rem, 5vw, 4rem);
  align-items: center;
  width: 100%;
}

/* ── LEFT COLUMN ── */

.hero-left {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  text-align: left;
}

/* Boot sequence */
.hero-boot {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  margin-bottom: 0.5rem;
}

.hero-cipher-shell {
  border: 1px solid rgba(var(--mx-accent-rgb), 0.34);
  background:
    linear-gradient(180deg, rgba(var(--mx-accent-rgb), 0.08), rgba(0, 0, 0, 0.72)),
    repeating-linear-gradient(180deg, rgba(var(--mx-accent-rgb), 0.05) 0 1px, transparent 1px 4px);
  padding: 0.35rem;
}

.hero-cipher-shell :deep(.matrix-container) {
  height: clamp(4.8rem, 9vw, 6.2rem);
  border: 1px solid rgba(var(--mx-accent-rgb), 0.2);
}

/* Typing effect */
.hero-typing {
  font-size: clamp(1rem, 1.6vw, 1.3rem) !important;
  min-height: clamp(2rem, 3.5vw, 2.6rem);
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.hero-typing :deep(.retro-text) {
  font-size: clamp(1rem, 1.6vw, 1.3rem);
  display: block;
  min-height: inherit;
  line-height: 1.2;
}

.hero-typing :deep(.retro-cursor) {
  transform: translateY(-0.12em);
  display: inline-block;
}

/* Name */
.hero-name {
  margin: 0;
  line-height: 1;
}

.hero-name-text {
  font-size: clamp(2.35rem, 5.8vw, 4.4rem) !important;
  display: block;
  text-align: left;
}

.hero-name-glitch {
  position: relative;
  font-family: 'VT323', 'Courier New', monospace;
  font-weight: 700;
  color: var(--mx-accent);
  letter-spacing: 0.05em;
  text-shadow:
    0 0 1px rgba(var(--mx-accent-soft-rgb), 0.9),
    0 0 8px rgba(var(--mx-accent-rgb), 0.8),
    0 0 18px rgba(var(--mx-accent-rgb), 0.5);
  animation: hero-name-jerkwhole 6s infinite;
}

.hero-name-glitch > span {
  position: absolute;
  inset: 0;
  color: var(--mx-accent);
  filter: none;
  pointer-events: none;
  mix-blend-mode: normal;
  opacity: 1;
  animation: hero-name-jerk 80ms infinite;
}

@keyframes hero-name-jerk {
  50% { transform: translateX(1.2px); }
  51% { transform: translateX(0); }
}

@keyframes hero-name-jerkwhole {
  0%, 100% { transform: translate(0, 0); }
  20% { transform: translate(0.2px, -0.2px); }
  40% { transform: translate(-0.2px, 0.2px); }
  60% { transform: translate(0.2px, 0); }
  80% { transform: translate(-0.2px, 0); }
}

/* Tagline */
.hero-tagline {
  font-family: 'VT323', 'Courier New', monospace;
  font-size: clamp(0.75rem, 1.1vw, 0.95rem);
  color: rgba(var(--mx-accent-soft-rgb), 0.4);
  letter-spacing: 0.08em;
  margin: 0;
  line-height: 1.4;
}

/* ── RIGHT COLUMN ── */

.hero-right {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}

.hero-tv-label {
  font-family: 'VT323', 'Courier New', monospace;
  font-size: clamp(0.55rem, 0.75vw, 0.7rem);
  color: rgba(var(--mx-accent-soft-rgb), 0.55);
  text-shadow: 0 0 8px rgba(var(--mx-accent-rgb), 0.4);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin-bottom: 0.45rem;
  display: block;
  text-align: center;
  border-bottom: 1px solid rgba(var(--mx-accent-rgb), 0.18);
  padding-bottom: 0.4rem;
}

.hero-tv-dock {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-tv {
  width: min(100%, 34rem);
  max-width: 100%;
}

.hero-tv :deep(.wrapper) {
  max-width: none;
}

.hero-tv :deep(.gif-tv) {
  margin-right: 0;
}

/* ══════════════════════════════════════════
   STAT CARDS
   ══════════════════════════════════════════ */

.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  width: 100%;
  max-width: 34rem;
}

.hero-stat-card {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(var(--mx-accent-rgb), 0.22);
  border-bottom: 3px solid rgba(0, 0, 0, 0.7);
  border-radius: 6px 6px 10px 10px;
  background:
    linear-gradient(180deg, rgba(var(--mx-accent-rgb), 0.06), transparent 34%),
    linear-gradient(180deg, rgba(14, 20, 15, 0.78), rgba(4, 6, 4, 0.72) 72%);
  padding: 0.55rem 0.45rem;
  text-align: center;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.06),
    inset 0 -0.25rem 0.35rem rgba(0, 0, 0, 0.6),
    0 0.12rem 0 rgba(0, 0, 0, 0.8);
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

.hero-stat-card:hover {
  transform: translateY(-3px);
  border-color: rgba(var(--mx-accent-rgb), 0.55);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    inset 0 -0.25rem 0.35rem rgba(0, 0, 0, 0.5),
    0 0.12rem 0 rgba(0, 0, 0, 0.8),
    0 0 18px rgba(var(--mx-accent-rgb), 0.12);
}

/* Pulse sweep across stats */
.hero-stat-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(var(--mx-accent-soft-rgb), 0.12), transparent);
  transform: translateX(-120%);
  animation: hero-stat-scan 6s ease-in-out infinite;
}

.hero-stat-card:nth-child(2)::before { animation-delay: 1.4s; }
.hero-stat-card:nth-child(3)::before { animation-delay: 2.8s; }

.hero-stat-card strong {
  position: relative;
  display: block;
  color: var(--mx-warm);
  font-family: 'VT323', 'Courier New', monospace;
  font-size: clamp(1.1rem, 2vw, 1.5rem);
  line-height: 1.1;
  text-shadow: 0 0 8px rgba(var(--mx-warm-rgb), 0.4);
}

.hero-stat-card span {
  position: relative;
  display: block;
  color: rgba(255, 255, 255, 0.55);
  font-family: 'VT323', 'Courier New', monospace;
  font-size: clamp(0.52rem, 0.7vw, 0.62rem);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-top: 0.3rem;
}

@keyframes hero-stat-scan {
  0%, 78%, 100% { transform: translateX(-120%); opacity: 0; }
  86% { opacity: 0.35; }
  96% { transform: translateX(120%); opacity: 0; }
}

/* ══════════════════════════════════════════
   CTA BUTTONS
   ══════════════════════════════════════════ */

.hero-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.4rem;
  flex-wrap: wrap;
}

.hero-news-ticker {
  margin-top: 1rem;
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: stretch;
  min-height: 3rem;
  border: 1px solid rgba(var(--mx-accent-rgb), 0.26);
  background: rgba(0, 0, 0, 0.62);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 0 18px rgba(var(--mx-accent-rgb), 0.1);
}

.hero-news-label {
  display: grid;
  place-items: center;
  min-width: 6rem;
  padding: 0.7rem 0.85rem;
  background: linear-gradient(180deg, #d20000, #7f0000);
  color: #fff;
  font-family: 'VT323', 'Courier New', monospace;
  font-size: 0.86rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.hero-news-track-wrap {
  overflow: hidden;
  position: relative;
}

.hero-news-track {
  display: inline-flex;
  align-items: center;
  gap: 2rem;
  white-space: nowrap;
  min-width: max-content;
  padding: 0.7rem 0.9rem;
  animation: hero-news-crawl 24s linear infinite;
}

.hero-news-track span {
  font-family: 'VT323', 'Courier New', monospace;
  font-size: 0.8rem;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: rgba(var(--mx-accent-soft-rgb), 0.82);
}

.hero-news-track span::after {
  content: "●";
  margin-left: 2rem;
  color: rgba(var(--mx-warm-rgb), 0.85);
}

@keyframes hero-news-crawl {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

/* ══════════════════════════════════════════
   SCROLL INDICATOR
   ══════════════════════════════════════════ */

.hero-scroll-indicator {
  position: absolute;
  bottom: 1.25rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  z-index: 10;
  opacity: 0.55;
  animation: hero-scroll-float 2.2s ease-in-out infinite;
}

.hero-scroll-arrow {
  font-size: 0.8rem;
  color: var(--mx-accent-soft);
  text-shadow: 0 0 6px rgba(var(--mx-accent-rgb), 0.4);
  line-height: 1;
}

.hero-scroll-text {
  font-family: 'VT323', 'Courier New', monospace;
  font-size: 0.55rem;
  color: rgba(var(--mx-accent-soft-rgb), 0.4);
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

@keyframes hero-scroll-float {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(6px); }
}

/* ══════════════════════════════════════════
   ENTRANCE ANIMATIONS
   ══════════════════════════════════════════ */

@keyframes hero-fade-in {
  0% { opacity: 0; transform: translateY(6px); }
  100% { opacity: 1; transform: translateY(0); }
}

/* ══════════════════════════════════════════
   EXPERTISE CARDS
   ══════════════════════════════════════════ */

.expertise-card {
  position: relative;
  overflow: hidden;
  background:
    linear-gradient(145deg, rgba(0, 20, 8, 0.9), rgba(15, 23, 42, 0.78));
  border-color: rgba(35, 255, 129, 0.3);
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

.expertise-card::after {
  content: "";
  position: absolute;
  inset: auto 0 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #23ff81, #2266ff, transparent);
  opacity: 0.5;
}

.expertise-card:hover {
  transform: translateY(-5px);
  border-color: rgba(240, 206, 0, 0.7);
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.34), 0 0 24px rgba(35, 255, 129, 0.12);
}

.expertise-card p {
  color: rgba(255, 255, 255, 0.74);
  line-height: 1.7;
}

.skill-index {
  color: rgba(240, 206, 0, 0.9);
  border: 1px solid rgba(240, 206, 0, 0.35);
  padding: 0.25rem 0.45rem;
  font-size: 0.78rem;
}

/* ══════════════════════════════════════════
   HOBBIES
   ══════════════════════════════════════════ */

.hobby-item {
  background:
    linear-gradient(145deg, rgba(31, 41, 55, 0.78), rgba(0, 18, 7, 0.82));
  border-color: rgba(35, 255, 129, 0.25);
}

.hobby-item i {
  color: #8fffb8;
}

/* ══════════════════════════════════════════
   MISC
   ══════════════════════════════════════════ */

.slide-in-enter-active,
.slide-in-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-in-enter-from,
.slide-in-leave-to {
  transform: translateX(100%);
}

.slide-in-enter-to,
.slide-in-leave-from {
  transform: translateX(0);
}

.noise {
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 1;
  opacity: 0.1;
}

.noise2 {
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 83%;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 1;
  opacity: 0.1;
}

.noise3 {
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 1;
  opacity: 0.1;
}

/* ══════════════════════════════════════════
   RESPONSIVE
   ══════════════════════════════════════════ */

@media (max-width: 820px) {
  .hero-copy-column {
    width: 100vw;
    margin-inline: calc(50% - 50vw);
  }

  .hero-construct {
    left: 0;
    right: 0;
  }

  .hero-layout {
    min-height: auto;
    padding-top: 0.4rem;
    padding-bottom: 2.8rem;
  }

  .hero-terminal {
    width: calc(100% - 1.8rem);
    margin-inline: 0.9rem;
    border-width: 4px;
    padding: 0.8rem;
  }

  .hero-terminal::after {
    inset: 0.35rem;
  }

  .hero-grid {
    grid-template-columns: 1fr;
    gap: 1.1rem;
  }

  .hero-left {
    text-align: center;
    align-items: center;
    gap: 0.7rem;
  }

  .hero-name-text {
    text-align: center !important;
    font-size: clamp(2.1rem, 11vw, 3rem) !important;
  }

  .hero-boot {
    align-items: stretch;
    width: 100%;
    max-width: 28rem;
    margin-bottom: 0.35rem;
  }

  .hero-actions {
    justify-content: center;
    width: 100%;
    gap: 0.55rem;
  }

  .hero-actions .button {
    width: min(47%, 10rem) !important;
    padding-inline: 0.4rem;
  }

  .hero-tagline {
    max-width: 34ch;
    font-size: 0.82rem;
  }

  .hero-news-ticker {
    width: 100%;
    margin-top: 0.65rem;
    min-height: 2.45rem;
  }

  .hero-right {
    gap: 0.85rem;
    width: 100%;
  }

  .hero-tv {
    width: min(100%, 20rem);
  }

  .hero-stats {
    max-width: 20rem;
    gap: 0.4rem;
  }

  .hero-scroll-indicator {
    display: none;
  }
}

@media (max-width: 640px) {
  .hero-layout {
    min-height: auto;
    padding-top: 0.25rem;
    padding-bottom: 2.5rem;
  }

  .hero-tv-dock {
    margin-top: 0;
  }

  .hero-stats {
    grid-template-columns: 1fr;
    max-width: 16rem;
  }

  .hero-news-ticker {
    grid-template-columns: 1fr;
  }

  .hero-news-label {
    min-width: 0;
    width: 100%;
    font-size: 0.76rem;
  }

  .hero-news-track {
    padding-inline: 0.55rem;
  }

  .hero-news-track span {
    font-size: 0.7rem;
  }

  .hero-cipher-shell :deep(.matrix-container) {
    height: 4.4rem;
  }

  .hero-typing {
    min-height: 1.8rem;
  }

  .hero-typing :deep(.retro-text) {
    font-size: 0.95rem;
  }
}

@media (min-width: 1024px) and (max-height: 920px) {
  .hero-layout {
    min-height: calc(100dvh - 5.5rem);
  }

  .hero-tv {
    width: min(100%, 28rem);
  }

  .hero-stats {
    max-width: 28rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-scroll-indicator {
    animation: none;
  }

  .hero-news-track {
    animation: none;
  }

  .hero-stat-card::before {
    animation: none;
  }
}

</style>
