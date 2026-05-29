<template>
  <section id="home" class="video-banner project-card">
    <div class="noise"></div>
    <!-- <div class="overlay"></div> -->
    <canvas ref="canvas" class="absolute top-0 left-0 w-full h-full"></canvas>
    <div class="video-content hero-layout relative z-10 mt-[6.35rem] flex items-center justify-center w-full px-5 md:px-10">
      <div class="hero-copy-column flex flex-col justify-center items-center">
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

          <div class="hero-modern-layout">

            <!-- Left column -->
            <div class="hero-modern-left">
              <!-- Minimal badge -->
              

              <Typing class="hero-modern-typing" />

             

              <div class="hero-modern-actions">
                <a href="#projects"><button class="blink-red button bg-red-500 shadow-lg border-b-2 border-slate-50 text-white font-bold text-sm md:text-xl px-5 md:py-6 2xl:px-0 rounded-full w-[100px] md:w-48">
                  <span><span class="md:inline-block hidden">See</span> projects</span>
                  <div class="liquid"></div>
                </button></a>
                <button @click="toggleAbout" class="blink-blue block button bg-blue-500 shadow-lg border-b-2 border-slate-50 text-white font-bold text-sm md:text-xl px-5 md:py-6 2xl:px-0 rounded-full w-[100px] md:w-48">
                  <span>Contact <span class="md:inline-block hidden">me</span></span>
                  <div class="liquid2"></div>
                </button>
              </div>

              <!-- Subtle meta -->
              
            </div>

            <!-- Right column -->
            <div class="hero-modern-right">
             
              <div class="hero-tv-dock">
                <Glitch class="hero-tv" />
              </div>
            </div>

          </div>

        </div>

        <Transition name="slide-in">
          <div v-if="isAboutOpen" class="fixed z-40 top-20 left-0 w-[99.88%] transform transition-transform duration-300 ease-in-out">
            <button @click="closeAbout" class="text-white mb-4"><i class="fa text-3xl fa-times" aria-hidden="true"></i></button>
            <ContactView />
          </div>
        </Transition>
      </div>
    </div>
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




  <section id="hobbies" class="site-section bg-gray-900 project-card relative">
    <canvas ref="matrixCanvas" class="absolute top-0 left-0 w-full h-full"></canvas>
    <div class="noise3"></div>
    <!-- <div class="overlay2"></div> -->
    <!-- Ensure the title is above the canvas -->
    <div class="relative z-10">
        <div class="glitch-text pb-10 pt-20 text-center text-[50px]">
          <span>Hobbies and Interests</span>
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
          <span>My Internet periodic table</span>
          <p class="text-green-600 text-sm">How I spend my time online? <br> That's a 400 Bad Request question</p>
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

// watch(isAboutOpen, (newValue) => {
//   const scrollbarWidth = getScrollbarWidth();
//   if (newValue) {
//     document.body.style.overflow = "hidden";
//     document.body.style.paddingRight = `${scrollbarWidth}px`;
//   } else {
//     document.body.style.overflow = "";
//     document.body.style.paddingRight = "";
//   }
// });

const canvas = ref(null);
let animationId = null;
const str = "日ア  イウ  エオ  カキ  クケコ  サシス  セソタチツテト  ナニヌネノハヒフヘホマミム  メモヤユヨラリル  レロワヲンあいうえおかきくけこさし  すせそ  たちつてとな ";
const matrix = str.split("");
let $, W, H, font, col, arr;

const greeting = ref("Hello! My name is");
const name = ref("Daniel Pincu");
const introText = ref("and I'm a");
const profession = ref("Web Developer");

const heroStats = ref([
  { value: "10", label: "featured projects" },
  { value: "Vue", label: "current main stack" },
  { value: "SEA", label: "web dev studies" }
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
    title: "VueJS",
    description: "As a Vue.js developer, I leverage its powerful features to create dynamic single-page applications. My passion for Vue's simplicity enables me to build scalable and maintainable codebases that enhance user engagement and satisfaction."
  },
  {
    title: "React",
    description:
      "Alongside Vue, I am also learning React. I use it to practice building reusable components, managing state, and improving performance in front-end applications. I am also exploring React’s ecosystem, such as hooks and routing, to better understand how modern web apps are structured.",
  },
  {
    title: "PHP",
    description:
      "As part of my studies, I am learning PHP to understand backend logic, and create dynamic web applications. I am also exploring how PHP connects with databases and can be used to build custom features for websites.",
  },
  {
    title: "MySQL",
    description:
      "I am starting to learn MySQL to manage data, write queries, and connect databases with web applications. My focus is on understanding relational databases, how tables link together, and how to use MySQL with PHP for dynamic content.",
  },
  
  
  {
    title: "MongoDB",
    description:
      "I am learning MongoDB to understand NoSQL databases and document-based data modeling. I explore how MongoDB differs from relational databases and how it can be used for flexible and scalable data storage in modern applications.",
  },
  {
    title: "API Development",
    description:
      "I am learning how to design and build APIs to enable communication between frontend and backend systems. My focus is on understanding REST principles, handling requests and responses, and building reusable endpoints for web applications.",
  },

  {
    title: "GitHub",
    description:
      "I always use GitHub as part of my workflow for version control and collaboration. By practicing commits, branches, and pull requests, I am building confidence in managing code and contributing to projects in a structured way.",
  },

  {
    title: "DevOps",
    description:
      "I am exploring DevOps concepts such as deployment, environment configuration, and automation. Through practice, I am learning how development and operations work together to deliver reliable and scalable applications.",
  },

  {
    title: "WordPress",
    description: "With extensive experience in WordPress, I develop custom themes tailored to meet client needs. My knowledge of PHP allows me to extend functionality and optimize performance, ensuring a robust and user-friendly experience."
  },

  {
    title: "IoT",
    description:
      "I am exploring the Internet of Things by connecting sensors and microcontrollers to the web. Through small projects, I am learning how hardware and software work together, building a foundation for creating smart and connected applications.",
  },
  {
    title: "AI Enthusiast",
    description:
      "I am curious about artificial intelligence and how it shapes the future of web development and beyond. As an enthusiast, I enjoy experimenting with AI tools, learning about machine learning concepts, and exploring how AI can enhance digital experiences.",
  },

]);

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
  // window.addEventListener("resize", initCanvas);
  initMatrixCanvasHobbies();
  drawMatrixHobbies();
  // window.addEventListener("resize", initMatrixCanvasHobbies);
  initExpertiseMatrixCanvas();
  drawExpertiseMatrixFrame();
  // window.addEventListener("resize", initExpertiseMatrixCanvas);
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

.glitch-scanline {
  width: 100%;
  height: 4px;
  margin-bottom: 5px;
  opacity: 0.15;
  background: rgba(var(--mx-accent-rgb), 0.12);
}

@keyframes glitch-blur {
  0%, 100% { filter: blur(0px); opacity: 0.5; }
  50% { filter: blur(2px); opacity: 1; }
}

@keyframes glitch-jerk {
  50% { transform: translateX(3px); }
  51% { transform: translateX(0); }
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

@keyframes c64-cursor-blink {
  0%, 48% { opacity: 1; }
  49%, 100% { opacity: 0; }
}



.video-banner {
   position: relative;
   overflow: hidden;
   background: var(--mx-deep);
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
   background-color: rgba(255,255,255,.1); /* Optional background for visibility */
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

.hero-layout {
  max-width: min(96vw, 1320px);
  margin-inline: auto;
  min-height: calc(100dvh - 6rem);
  position: relative;
  align-content: center;
  isolation: isolate;
}

.hero-layout::before,
.hero-layout::after {
  content: "";
  position: absolute;
  pointer-events: none;
  z-index: -1;
}

.hero-layout::before {
  inset: -9rem calc(50% - 50vw) -5rem;
  border: 0;
  background:
    radial-gradient(circle at 72% 42%, rgba(var(--mx-accent-rgb), 0.18), transparent 24rem),
    radial-gradient(circle at 22% 60%, rgba(var(--mx-blue-vibe-rgb), 0.12), transparent 25rem),
    linear-gradient(180deg, rgba(0, 18, 7, 0.62), rgba(var(--mx-accent-rgb), 0.12) 48%, rgba(0, 8, 3, 0.62)),
    repeating-linear-gradient(0deg, rgba(var(--mx-accent-soft-rgb), 0.04) 0 2px, transparent 2px 8px),
    repeating-linear-gradient(90deg, transparent 0 32px, rgba(var(--mx-accent-rgb), 0.045) 33px 34px);
  box-shadow:
    inset 0 0 130px rgba(0, 0, 0, 0.62),
    0 0 90px rgba(var(--mx-accent-rgb), 0.1),
    0 0 60px rgba(var(--mx-blue-vibe-rgb), 0.06);
}

.hero-layout::after {
  inset: -9rem calc(50% - 50vw) -5rem;
  background:
    linear-gradient(90deg, transparent, rgba(var(--mx-accent-soft-rgb), 0.1), transparent),
    repeating-linear-gradient(180deg, rgba(var(--mx-accent-rgb), 0.024) 0 1px, transparent 1px 6px);
  filter: blur(1px);
  opacity: 0.76;
}

.hero-copy-column {
  position: relative;
  width: min(100%, 82rem);
  align-self: center;
}

.hero-copy-column::before {
  content: "";
  position: absolute;
  inset: -1rem -0.75rem;
  border: 1px solid rgba(var(--mx-accent-rgb), 0.18);
  background:
    linear-gradient(90deg, transparent, rgba(var(--mx-accent-rgb), 0.06), transparent),
    repeating-linear-gradient(180deg, rgba(var(--mx-accent-rgb), 0.024) 0 1px, transparent 1px 5px);
  opacity: 0.78;
  pointer-events: none;
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
  bottom: 0;
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
  bottom: 0.65rem;
  left: 0.65rem;
}

.matrix-node-br {
  bottom: 0.65rem;
  right: 0.65rem;
}

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

.hero-actions {
  position: relative;
  z-index: 2;
  width: calc(100% - 4.7rem);
  justify-content: center;
  align-items: center;
  margin-inline: auto;
  margin-block: clamp(0.65rem, 1.3vh, 1rem);
  padding-top: 0.3rem;
}

.hero-actions::before {
  content: "";
  position: absolute;
  top: -0.45rem;
  left: 50%;
  width: min(62%, 26rem);
  height: 1px;
  transform: translateX(-50%);
  background: linear-gradient(90deg, transparent, rgba(var(--mx-warm-rgb), 0.42), rgba(var(--mx-accent-rgb), 0.42), transparent);
  box-shadow: 0 0 14px rgba(var(--mx-accent-rgb), 0.18);
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

/* ══════════════════════════════════════════
   MODERN HERO LAYOUT
   ══════════════════════════════════════════ */

.hero-modern-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  align-items: center;
  min-height: 200px;
}

.hero-modern-left {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.25rem 0.5rem;
  text-align: left;
}

.hero-modern-right {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
}

.hero-modern-badge {
  display: inline-flex;
  font-family: 'VT323','Courier New',monospace;
  font-size: clamp(0.5rem, 0.7vw, 0.6rem);
  color: rgba(var(--mx-accent-soft-rgb), 0.35);
  background: rgba(0,0,0,0.2);
  padding: 0.15rem 0.5rem 0.15rem 0.4rem;
  border-left: 2px solid rgba(var(--mx-accent-rgb), 0.25);
  letter-spacing: 0.04em;
  width: fit-content;
}

.hero-modern-typing {
  font-size: clamp(1.6rem, 3.2vw, 2.4rem) !important;
  min-height: clamp(2.8rem, 5vw, 3.8rem);
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.hero-modern-typing :deep(.retro-text) {
  font-size: clamp(1.6rem, 3.2vw, 2.4rem);
  display: block;
  min-height: inherit;
  line-height: 1.2;
}

.hero-modern-tagline {
  font-family: 'VT323','Courier New',monospace;
  font-size: clamp(0.6rem, 0.9vw, 0.75rem);
  color: rgba(var(--mx-accent-soft-rgb), 0.28);
  letter-spacing: 0.05em;
  margin: 0;
  line-height: 1.4;
}

.hero-modern-actions {
  display: flex;
  gap: 0.65rem;
  margin-top: 0.3rem;
}

.hero-modern-meta {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-family: 'VT323','Courier New',monospace;
  font-size: clamp(0.45rem, 0.6vw, 0.55rem);
  color: rgba(var(--mx-accent-rgb), 0.18);
  letter-spacing: 0.04em;
  margin-top: 0.2rem;
}

.hero-meta-sep {
  opacity: 0.5;
}

.hero-modern-screen-label {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-family: 'VT323','Courier New',monospace;
  font-size: clamp(0.45rem, 0.6vw, 0.55rem);
  color: rgba(var(--mx-accent-soft-rgb), 0.25);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 0.2rem;
}

.hero-screen-dot {
  display: block;
  width: 0.3rem;
  height: 0.3rem;
  border-radius: 999px;
  background: rgba(255,77,77,0.6);
  animation: hero-screen-dot-blink 1.6s step-end infinite;
}

@keyframes hero-screen-dot-blink {
  0%, 100% { opacity: 0.6; }
  40% { opacity: 0.1; }
}

.hero-screen-small {
  color: rgba(var(--mx-accent-rgb), 0.15);
  margin-left: auto;
}

@media (max-width: 820px) {
  .hero-modern-layout {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  .hero-modern-left {
    text-align: center;
    align-items: center;
  }
  .hero-modern-actions {
    flex-direction: column;
    align-items: center;
  }
  .hero-modern-badge {
    align-self: center;
  }
}

@media (max-width: 640px) {
  .hero-modern-meta {
    display: none;
  }
}

.terminal-bar {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  margin-bottom: 1.1rem;
  color: rgba(143, 255, 184, 0.72);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.72rem;
}

.terminal-bar::after {
  content: "construct active";
  margin-left: auto;
  color: rgba(240, 206, 0, 0.76);
  font-size: 0.6rem;
  letter-spacing: 0.18em;
}

.terminal-bar span {
  width: 0.65rem;
  height: 0.65rem;
  border-radius: 999px;
  display: block;
  background: #ff4d4d;
  box-shadow: 0 0 12px rgba(255, 77, 77, 0.58);
}

.terminal-bar span:nth-child(2) {
  background: #f0ce00;
  box-shadow: 0 0 12px rgba(240, 206, 0, 0.58);
}

.terminal-bar span:nth-child(3) {
  background: #23ff81;
  box-shadow: 0 0 12px rgba(35, 255, 129, 0.58);
}

.terminal-bar p {
  margin-left: 0.55rem;
  color: rgba(143, 255, 184, 0.72);
}

.hero-lock-readout {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  border-top: 2px solid rgba(var(--mx-accent-rgb), 0.28);
  border-bottom: 2px solid rgba(var(--mx-accent-rgb), 0.28);
  background: var(--mx-panel);
  color: rgba(var(--mx-accent-soft-rgb), 0.78);
  padding: 0.45rem 0.6rem;
  margin-bottom: clamp(0.7rem, 1.4vh, 1rem);
  font-family: 'VT323', 'Courier New', monospace;
  font-size: clamp(0.82rem, 1.7vw, 1.12rem);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  animation: hero-decode-jitter 4.4s steps(2, end) infinite;
  box-shadow:
    inset 5px 0 0 rgba(var(--mx-warm-rgb), 0.2),
    inset -5px 0 0 rgba(var(--mx-blue-vibe-rgb), 0.22);
}

.hero-lock-readout strong {
  color: var(--mx-accent-soft);
}

.hero-c64-badge {
  display: inline-grid;
  grid-template-columns: auto auto;
  align-items: end;
  gap: 0.55rem;
  margin: 0 auto clamp(0.55rem, 1.2vh, 0.85rem);
  color: #ffffff;
  font-family: 'VT323', 'Courier New', monospace;
  text-transform: uppercase;
  text-shadow: 3px 0 0 rgba(0, 50, 22, 0.9);
}

.hero-c64-badge span {
  display: block;
  color: var(--mx-accent-soft);
  font-size: clamp(2.25rem, 5.5vw, 4.2rem);
  line-height: 0.8;
  letter-spacing: 0;
}

.hero-c64-badge p {
  color: var(--mx-accent-soft);
  font-size: clamp(0.9rem, 1.65vw, 1.22rem);
  line-height: 0.9;
  letter-spacing: 0.08em;
}

.hero-c64-prompt {
  display: flex;
  justify-content: center;
  gap: 1.2rem;
  margin-top: clamp(0.65rem, 1.4vh, 1rem);
  color: var(--mx-accent-soft);
  font-family: 'VT323', 'Courier New', monospace;
  font-size: clamp(1.15rem, 2.5vw, 1.7rem);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-shadow: 2px 0 0 rgba(0, 50, 22, 0.92);
}

.hero-c64-prompt strong::after {
  content: "";
  display: inline-block;
  width: 0.65em;
  height: 0.95em;
  margin-left: 0.3em;
  vertical-align: -0.1em;
  background: var(--mx-accent-soft);
  animation: c64-cursor-blink 1s steps(2, end) infinite;
}

.hero-tv-dock {
  position: relative;
  display: grid;
  place-items: center;
  width: min(100%, 34rem);
  margin: clamp(0.65rem, 1.4vh, 1rem) auto 0;
  padding: 0;
  border: 0;
  background: transparent;
  box-shadow: none;
}

.hero-tv {
  width: min(100%, 29rem);
  max-width: 100%;
  padding-left: 0 !important;
}

.hero-tv :deep(.wrapper) {
  max-width: none;
}

.hero-tv :deep(.gif-tv) {
  margin-right: 0;
}

.hero-copy {
  max-width: 38rem;
  color: rgba(255, 255, 255, 0.74);
  line-height: 1.75;
  margin: 1.2rem auto 0;
  overflow-wrap: anywhere;
}

.pill-telemetry {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.65rem;
  margin-top: 1.25rem;
}

.pill-telemetry span {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(0, 0, 0, 0.45);
  padding: 0.45rem 0.55rem;
  color: rgba(255, 255, 255, 0.74);
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.pill-telemetry span::before {
  content: "";
  position: absolute;
  inset: 0;
  transform: translateX(-110%);
  animation: hero-pill-scan 4.8s ease-in-out infinite;
}

.red-channel {
  box-shadow: inset 0 -4px 0 rgba(255, 57, 57, 0.42);
}

.red-channel::before {
  background: linear-gradient(90deg, transparent, rgba(255, 57, 57, 0.45), transparent);
}

.blue-channel {
  box-shadow: inset 0 -4px 0 rgba(40, 116, 255, 0.48);
}

.blue-channel::before {
  background: linear-gradient(90deg, transparent, rgba(40, 116, 255, 0.45), transparent);
  animation-delay: 1.1s;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
  width: min(100%, 56rem);
  margin-top: 1rem;
  min-height: 0.8rem;
}

.hero-stats div {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(143, 255, 184, 0.18);
  border-bottom: 5px solid rgba(0, 0, 0, 0.88);
  border-radius: 7px 7px 12px 12px;
  background:
    linear-gradient(180deg, rgba(35, 255, 129, 0.055), transparent 34%),
    linear-gradient(180deg, rgba(20, 27, 21, 0.72), rgba(5, 7, 5, 0.62) 72%);
  padding: 0.9rem;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    inset 0 -0.38rem 0.48rem rgba(0, 0, 0, 0.7),
    0 0.18rem 0 rgba(0, 0, 0, 0.9);
}

.hero-stats div::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, transparent, rgba(202, 255, 216, 0.18), transparent),
    repeating-linear-gradient(180deg, rgba(35, 255, 129, 0.08) 0 1px, transparent 1px 5px);
  opacity: 0.32;
  transform: translateX(-120%);
  animation: hero-stat-scan 6s ease-in-out infinite;
}

.hero-stats div:nth-child(2)::before {
  animation-delay: 1.4s;
}

.hero-stats div:nth-child(3)::before {
  animation-delay: 2.8s;
}

.hero-stats strong {
  position: relative;
  display: block;
  color: #f0ce00;
  font-size: 1.45rem;
  line-height: 1;
}

.hero-stats span {
  position: relative;
  display: block;
  color: rgba(255, 255, 255, 0.64);
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-top: 0.45rem;
}

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

.hobby-item {
  background:
    linear-gradient(145deg, rgba(31, 41, 55, 0.78), rgba(0, 18, 7, 0.82));
  border-color: rgba(35, 255, 129, 0.25);
}

.hobby-item i {
  color: #8fffb8;
}


/* Slide-in animation */
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
  /* background-image: url("https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMndyaXVhaXh3ZjV4cWhneXlvZmI3aWh3Y3hwZ2E0NnVxcjZnMTNneCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IcZhFmufozDCij3p22/giphy.gif"); */
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
  /* background-image: url("https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmN5bDl1eDB6OWNmMWsyaGkyM3dmZXV0MzdodTB6ejNoc3ZiaTRiYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/J2bBD0FWK3bxXvym1T/giphy.gif"); */
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
  /* background-image: url("https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnU4a3RhNHFhbWtodjNzNjRobmZpNWdrbndwMWsxbXg4cGl3bmh1aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l41lTRFZILZG2Q0Ba/giphy.gif"); */
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 1;
  opacity: 0.1;
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
      rgba(0, 0, 0, 0.2) 50%,
      rgba(0, 0, 0, 0) 10%);
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
  animation: scan 15s linear 0s infinite;
}

@keyframes scan {
  0%        { background-position: 0 -100vh; }
  30%, 100% { background-position: 0 100vh; }
}

@keyframes hero-source-sweep {
  0%, 74%, 100% {
    opacity: 0;
    transform: translateX(-100%);
  }
  82% {
    opacity: 0.85;
  }
  92% {
    opacity: 0.25;
    transform: translateX(110%);
  }
}

@keyframes hero-stat-scan {
  0%, 78%, 100% {
    transform: translateX(-120%);
    opacity: 0;
  }
  86% {
    opacity: 0.42;
  }
  96% {
    transform: translateX(120%);
    opacity: 0;
  }
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
  82% {
    opacity: 0.7;
  }
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
  80% {
    opacity: 0.72;
  }
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

@keyframes hero-decode-jitter {
  0%, 92%, 100% { transform: translateX(0); }
  94% { transform: translateX(-4px); }
  96% { transform: translateX(5px); }
  98% { transform: translateX(-2px); }
}

@keyframes hero-pill-scan {
  0%, 70%, 100% {
    transform: translateX(-110%);
    opacity: 0;
  }
  78% {
    opacity: 1;
  }
  92% {
    transform: translateX(110%);
    opacity: 0;
  }
}

@media (min-width: 1024px) {
  .hero-terminal {
    text-align: center;
  }

  .hero-copy {
    margin-left: auto;
    margin-right: auto;
  }
}

@media (min-width: 1024px) and (max-height: 920px) {
  .hero-layout {
    min-height: calc(100dvh - 5.5rem);
  }

  .hero-terminal {
    padding: 0.85rem 1.25rem 1rem;
  }

  .hero-lock-readout {
    padding-block: 0.32rem;
  }

  .hero-tv {
    width: min(100%, 26rem);
  }

  .hero-actions {
    margin-block: 0.7rem;
  }
}

@media (max-width: 640px) {
  .hero-layout {
    min-height: auto;
  }

  .hero-tv-dock {
    margin-top: 0.8rem;
  }

  .hero-copy-column::before,
  .hero-construct,
  .hero-lock-readout {
    display: none;
  }

  .pill-telemetry {
    grid-template-columns: 1fr;
  }

  .hero-stats {
    grid-template-columns: 1fr;
  }

  .hero-copy {
    max-width: 30ch;
  }

  .terminal-bar p {
    display: none;
  }
}


</style>
