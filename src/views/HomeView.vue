<template>
  <section id="home" class="video-banner project-card">
    <div class="noise"></div>
    <!-- <div class="overlay"></div> -->
    <canvas ref="canvas" class="absolute top-0 left-0 w-full h-full"></canvas>
    <div class="video-content hero-layout relative z-10 mt-28 lg:grid grid-cols-[1fr_0.9fr] items-center justify-around w-full px-5 md:px-10 gap-10">
      <div class="hero-copy-column flex flex-col justify-center items-center">
        <div class="hero-construct" aria-hidden="true">
          <span class="rail rail-left">010110 WAKE UP 101001 FOLLOW THE WHITE RABBIT</span>
          <span class="rail rail-right">KNOCK KNOCK 011001 OPERATOR TRACE 110101</span>
        </div>
        <div class="hero-terminal">
          
          <div class="hero-lock-readout" aria-hidden="true">
            <span>signal acquired</span>
            <strong>operator online</strong>
          </div>
          <!-- <p class="text-3xl pb-10">{{ greeting }}</p> -->

          <Typing class="text-3xl md:text-4xl"/>

          <!-- <p class="text-xl inline-block pb-2 pr-2">{{ introText }}</p> -->
          <div class="glitch-text text-center lg:text-left text-[36px] md:text-[48px] leading-tight">
              <span>Welcome to <br class="md:hidden block"> The Matrix</span>
          </div>
          
          
        </div>
        <div class="hero-stats">
          
        </div>
        <div class="hero-actions flex flex-row gap-5 md:gap-10 my-10">
          <a href="#projects"><button class="blink-red button bg-red-500 shadow-lg border-b-2 border-slate-50 text-white font-bold text-sm md:text-xl px-5 md:py-6 2xl:px-0 rounded-full w-[100px] md:w-48">
            <span><span class="md:inline-block hidden">See</span> projects</span>
            <div class="liquid"></div>
          </button></a>
          <button @click="toggleAbout" class="blink-blue block button bg-blue-500 shadow-lg border-b-2 border-slate-50 text-white font-bold text-sm md:text-xl px-5 md:py-6 2xl:px-0 rounded-full w-[100px] md:w-48">
            <span>Contact <span class="md:inline-block hidden">me</span></span>
            <div class="liquid2"></div>
          </button>

        <Transition name="slide-in">
        <div v-if="isAboutOpen" class="fixed z-40 top-20 left-0 w-[99.88%] transform transition-transform duration-300 ease-in-out">
              <!-- Close Button -->
              <button @click="closeAbout" class="text-white mb-4"><i class="fa text-3xl fa-times" aria-hidden="true"></i></button>
              
           <ContactView />
        </div>

      </Transition>

        </div>
      </div>
      
        <Glitch class="w-full max-w-sm md:max-w-none md:w-full md:pl-5" />
      
    </div>
  </section>


  <AboutView class="project-card my-32" />



  <section id="expertise" class="py-20 relative project-card">
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




  <section id="hobbies" class="my-32 bg-gray-900 project-card relative">
    <canvas ref="matrixCanvas" class="absolute top-0 left-0 w-full h-full"></canvas>
    <div class="noise3"></div>
    <!-- <div class="overlay2"></div> -->
    <!-- Ensure the title is above the canvas -->
    <div class="relative z-10">
        <div class="glitch-text pb-10 pt-20 text-center text-[50px]">
          <span>Hobbies and Interests</span>
        </div>

      <div class="hobby-ticker overflow-hidden mb-32">
        <div class="hobby-ticker-content space-x-8 inline-block">
          <div v-for="hobby in hobbies" :key="hobby.name" class="hobby-item bg-opacity-60 project-card bg-gray-800 p-6 rounded-lg text-center inline-block flex-shrink-0 w-64">
            <i :class="['fas', hobby.icon, 'text-4xl mb-4']"></i>
            <h3 class="text-xl font-bold mb-2">{{ hobby.name }}</h3>
          </div>
        </div>
      </div>
       <div class="hidden xl:block">

        <div class="glitch-text pb-10 pt-20 text-center text-[50px]">
          <span>My Internet periodic table</span>
          <p class="text-green-600 text-sm">How I spend my time online? <br> That's a 400 Bad Request question</p>
        </div>
        <PeriodicView />
       </div>
    </div>
  </section>

 



  <PortfolioView id="projects" class="mt-32" />

  

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
  $.fillStyle = "#0f0";
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
  matrixCtxHobbies.fillStyle = "#0f0";
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
  expertiseMatrixCtx.fillStyle = '#00ff00';
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
  0%, 100% { filter: blur(0px); opacity: 0.5; }
  50% { filter: blur(2px); opacity: 1; }
}

@keyframes glitch-jerk {
  50% { transform: translateX(3px); }
  51% { transform: translateX(0); }
}



.video-banner {
   position: relative;
   overflow: hidden;
}
.absolute {
   position: absolute;
   top: 0;
   left: 0;
}
.project-card {
   background-color: rgba(255,255,255,.1); /* Optional background for visibility */
}

.hero-layout {
  max-width: 1500px;
  margin-inline: auto;
  min-height: calc(100vh - 7rem);
  position: relative;
}

.hero-layout::before,
.hero-layout::after {
  content: "";
  position: absolute;
  pointer-events: none;
  z-index: -1;
}

.hero-layout::before {
  inset: -7rem calc(50% - 50vw) -3rem;
  border: 0;
  background:
    linear-gradient(115deg, rgba(35, 255, 129, 0.08), transparent 34% 66%, rgba(35, 255, 129, 0.055)),
    radial-gradient(circle at 74% 48%, rgba(40, 116, 255, 0.12), transparent 28%),
    radial-gradient(circle at 63% 54%, rgba(255, 57, 57, 0.07), transparent 34%),
    linear-gradient(180deg, rgba(0, 0, 0, 0.78), transparent 18% 82%, rgba(0, 0, 0, 0.88)),
    repeating-linear-gradient(90deg, transparent 0 32px, rgba(35, 255, 129, 0.035) 33px 34px);
  box-shadow:
    inset 0 0 130px rgba(0, 0, 0, 0.62),
    0 0 90px rgba(35, 255, 129, 0.09),
    0 0 60px rgba(40, 116, 255, 0.06);
}

.hero-layout::after {
  inset: -7rem calc(50% - 50vw) -3rem;
  background:
    linear-gradient(90deg, transparent, rgba(202, 255, 216, 0.08), transparent),
    repeating-linear-gradient(180deg, rgba(35, 255, 129, 0.018) 0 1px, transparent 1px 6px);
  filter: blur(1px);
  opacity: 0.76;
}

.hero-copy-column {
  position: relative;
  width: 100%;
  align-self: center;
}

.hero-copy-column::before {
  content: "";
  position: absolute;
  inset: -1rem -0.75rem;
  border: 1px solid rgba(35, 255, 129, 0.1);
  background:
    linear-gradient(90deg, transparent, rgba(35, 255, 129, 0.045), transparent),
    repeating-linear-gradient(180deg, rgba(35, 255, 129, 0.018) 0 1px, transparent 1px 5px);
  opacity: 0.78;
  pointer-events: none;
}

.hero-construct {
  position: absolute;
  inset: -3.25rem -2rem -1.5rem;
  pointer-events: none;
  z-index: 0;
}

.rail {
  position: absolute;
  top: 2.5rem;
  bottom: 1rem;
  width: 2.35rem;
  overflow: hidden;
  writing-mode: vertical-rl;
  color: rgba(143, 255, 184, 0.62);
  font: 800 0.72rem/1 "Courier New", monospace;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  text-shadow: 0 0 10px rgba(35, 255, 129, 0.8);
  border: 1px solid rgba(35, 255, 129, 0.24);
  background:
    linear-gradient(180deg, rgba(240, 206, 0, 0.1), transparent 16% 84%, rgba(40, 116, 255, 0.12)),
    repeating-linear-gradient(180deg, rgba(35, 255, 129, 0.12) 0 1px, transparent 1px 7px),
    rgba(0, 8, 3, 0.38);
  box-shadow:
    inset 0 0 14px rgba(35, 255, 129, 0.08),
    0 0 24px rgba(35, 255, 129, 0.08);
}

.rail-left {
  left: 0;
  writing-mode: vertical-lr;
  text-align: left;
  animation: hero-rail-left 7s steps(18, end) infinite;
}

.rail-right {
  right: 0;
  animation: hero-rail-right 8s steps(20, end) infinite;
}

.hero-terminal {
  position: relative;
  width: min(100%, 56rem);
  border: 1px solid rgba(35, 255, 129, 0.5);
  border-bottom: 6px solid rgba(0, 0, 0, 0.88);
  border-radius: 2px 2px 18px 18px;
  background:
    linear-gradient(90deg, rgba(255, 57, 57, 0.12), transparent 22% 78%, rgba(40, 116, 255, 0.12)),
    linear-gradient(135deg, rgba(255, 255, 255, 0.035), transparent 22%),
    repeating-linear-gradient(180deg, rgba(35, 255, 129, 0.018) 0 1px, transparent 1px 5px),
    radial-gradient(circle at 50% 0%, rgba(35, 255, 129, 0.12), transparent 52%),
    linear-gradient(180deg, rgba(0, 22, 8, 0.74), rgba(0, 0, 0, 0.58));
  box-shadow:
    inset 0 1rem 1.2rem rgba(0, 0, 0, 0.56),
    inset 0 -0.55rem 0.75rem rgba(0, 0, 0, 0.7),
    0 1.4rem 2.2rem -0.8rem rgba(0, 0, 0, 0.84),
    0 0 34px rgba(35, 255, 129, 0.1),
    -18px 0 42px rgba(255, 57, 57, 0.06),
    18px 0 42px rgba(40, 116, 255, 0.08);
  padding: clamp(1.25rem, 4vw, 2rem);
  text-align: center;
  isolation: isolate;
  overflow: hidden;
  contain: paint;
}

.hero-actions {
  position: relative;
  z-index: 2;
  width: min(100%, 56rem);
  justify-content: center;
  align-items: center;
  margin-inline: auto;
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
  background: linear-gradient(90deg, transparent, rgba(240, 206, 0, 0.54), rgba(35, 255, 129, 0.38), transparent);
  box-shadow: 0 0 14px rgba(240, 206, 0, 0.18);
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
    linear-gradient(90deg, transparent, rgba(202, 255, 216, 0.18), transparent),
    repeating-linear-gradient(90deg, transparent 0 44px, rgba(35, 255, 129, 0.028) 45px 46px);
  transform: translateX(-100%);
  opacity: 0;
  animation: hero-source-sweep 7s ease-in-out infinite;
}

.hero-terminal::after {
  border: 1px solid rgba(143, 255, 184, 0.12);
  inset: 0.55rem;
  border-radius: 0 0 12px 12px;
  box-shadow:
    inset 12px 0 20px rgba(255, 57, 57, 0.07),
    inset -12px 0 20px rgba(40, 116, 255, 0.07);
}

.hero-terminal > * {
  position: relative;
  z-index: 1;
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
  border-top: 1px solid rgba(35, 255, 129, 0.2);
  border-bottom: 1px solid rgba(35, 255, 129, 0.2);
  background: rgba(0, 8, 3, 0.54);
  color: rgba(202, 255, 216, 0.72);
  padding: 0.45rem 0.6rem;
  margin-bottom: 1.35rem;
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  animation: hero-decode-jitter 4.4s steps(2, end) infinite;
  box-shadow:
    inset 5px 0 0 rgba(255, 57, 57, 0.28),
    inset -5px 0 0 rgba(40, 116, 255, 0.3);
}

.hero-lock-readout strong {
  color: #fff7aa;
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

@keyframes hero-rail-left {
  0% { transform: translateY(-10px); }
  100% { transform: translateY(44px); }
}

@keyframes hero-rail-right {
  0% { transform: translateY(38px); }
  100% { transform: translateY(-16px); }
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

@media (max-width: 640px) {
  .hero-layout {
    min-height: auto;
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
