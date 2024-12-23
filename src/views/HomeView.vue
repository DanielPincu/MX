<template>
  <section data-aos="fade-down" data-aos-duration="1000" id="home" class="video-banner project-card">
    <canvas ref="canvas" class="absolute top-0 left-0 w-full h-full"></canvas>
    <div class="video-content relative z-10 mt-36 lg:grid grid-cols-2 items-center justify-around mx-10">
      <div class="flex flex-col justify-center items-center">
        <div>
          <p class="text-3xl pb-10">{{ greeting }}</p>
          <h1 class="text-3xl md:text-6xl font-bold mb-4">{{ name }}</h1>
          <p class="text-xl inline-block pb-2 pr-2">{{ introText }}</p>
          <p class="text-xl inline-block md:text-2xl">{{ profession }}</p>
        </div>
        <div class="flex flex-row gap-5 md:gap-10 my-10">
          <a href="#projects"><button class="blink-red button bg-red-500 shadow-lg border-b-2 border-slate-50 text-white font-bold text-sm md:text-xl px-5 md:py-6 2xl:px-0 rounded-full w-[100px] md:w-48">
            <span><span class="md:inline-block hidden">See</span> projects</span>
            <div class="liquid"></div>
          </button></a>
          <button @click="toggleAbout" class="blink-blue block button bg-blue-500 shadow-lg border-b-2 border-slate-50 text-white font-bold text-sm md:text-xl px-5 md:py-6 2xl:px-0 rounded-full w-[100px] md:w-48">
            <span>Contact <span class="md:inline-block hidden">me</span></span>
            <div class="liquid2"></div>
          </button>

        <Transition name="slide-in">
        <div v-if="isAboutOpen" class="fixed z-40 top-20 left-0 w-full  bg-black bg-opacity-90 transform transition-transform duration-300 ease-in-out">
              <!-- Close Button -->
              <button @click="closeAbout" class="text-white mb-4"><i class="fa text-3xl fa-times" aria-hidden="true"></i></button>
              
           <ContactView />
        </div>

      </Transition>

        </div>
      </div>
      <div class="flex justify-center pt-5 pb-32">
        <img data-aos="flip-right" data-aos-duration="1000" class="w-full project-card rounded-3xl" src="@/assets/ddd.jpeg">
      </div>
    </div>
  </section>


  <AboutView class="project-card mb-20 hidden md:block" data-aos="fade-down" data-aos-duration="1000" />


  <section id="hobbies" data-aos="fade-down" data-aos-duration="1000" class="py-20 my-32 bg-gray-900 project-card relative">
    <canvas ref="matrixCanvas" class="absolute top-0 left-0 w-full h-full"></canvas>

    <!-- Ensure the title is above the canvas -->
    <div class="relative z-10">
      <h2 class="text-xl md:text-3xl font-bold mb-8 text-center">{{ hobbiesTitle }}</h2>

      <div class="hobby-ticker overflow-hidden">
        <div class="hobby-ticker-content space-x-8 inline-block">
          <div v-for="hobby in hobbies" :key="hobby.name" class="hobby-item bg-gray-800 p-6 rounded-lg text-center inline-block flex-shrink-0 w-64">
            <i :class="['fas', hobby.icon, 'text-4xl mb-4']"></i>
            <h3 class="text-xl font-bold mb-2">{{ hobby.name }}</h3>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section data-aos="fade-down" data-aos-duration="1000" id="expertise" class="py-20  relative project-card">
    <canvas ref="matrixCanvas2" class="absolute top-0 left-0 w-full h-full"></canvas>
    <div class="relative z-20">
      <h2 class="text-xl md:text-3xl font-bold mb-8 text-center">{{ expertiseTitle }}</h2>
      <div class="grid md:grid-cols-3 gap-8 fade-in container mx-auto">
        
        <div v-for="skill in expertise" :key="skill.title" class="bg-gray-800  p-6 rounded-lg project-card">
          <h3 class="text-md font-bold mb-2">{{ skill.title }}</h3>
          <p class="text-md">{{ skill.description }}</p>
        </div>
      </div>
    </div>
  </section>



  <PortfolioView id="projects" class="my-32" data-aos="fade-down" data-aos-duration="1000" />

  

</template>

<script setup>
import ContactView from './ContactView.vue';
import AboutView from './AboutView.vue';
import PortfolioView from './PortfolioView.vue';
import { ref, watch, onMounted, onUnmounted } from 'vue';

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

watch(isAboutOpen, (newValue) => {
  const scrollbarWidth = getScrollbarWidth();
  if (newValue) {
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  } else {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  }
});

const canvas = ref(null);
let animationId = null;
const str = "А+Б0В-Г1Д=Е2Ё Ж3З И4Й К5Л М6Н О7П Р8С Т9У Ф!Х Ц?Ч Ш.ЩЪ,Ы Ь:ЭЮ;Я";
const matrix = str.split("");
let $, W, H, font, col, arr;

const greeting = ref("Hello! My name is");
const name = ref("Daniel Pincu");
const introText = ref("and I'm a");
const profession = ref("Web Developer");

const hobbiesTitle = ref("Hobbies & Interests");
const hobbies = ref([
  { name: "CODING", icon: "fa-code" },
  { name: "3D PRINTING", icon: "fa-cube" },
  { name: "AMATØR RADIO", icon: "fa-broadcast-tower" },
  { name: "ASTRONOMY", icon: "fa-star" },
  { name: "ELECTRONICS", icon: "fa-microchip" },
  { name: "IOT", icon: "fa-network-wired" },
  { name: "REMOTE PILOT", icon: "fa-paper-plane" },
  { name: "PHP Developer", icon: "fa-laptop-code" },
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
  { name: "API Development", icon: "fa-plug" },
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
    description: "With a passion for crafting seamless user experiences, I specialize in building responsive and interactive web applications. My expertise in HTML5, CSS3, and JavaScript allows me to bring designs to life while ensuring optimal performance across devices."
  },
  {
    title: "VueJS",
    description: "As a dedicated Vue.js developer, I leverage its powerful features to create dynamic single-page applications. My proficiency in Vue's ecosystem enables me to build scalable and maintainable codebases that enhance user engagement and satisfaction."
  },
  {
    title: "WordPress",
    description: "With extensive experience in WordPress, I develop custom themes and plugins tailored to meet client needs. My knowledge of PHP allows me to extend functionality and optimize performance, ensuring a robust and user-friendly experience."
  }
]);

const initCanvas = () => {
  const C = canvas.value;
  $ = C.getContext("2d");
  W = C.width = window.innerWidth;
  H = C.height = window.innerHeight;
  font = 11;
  col = W / font;
  arr = new Array(Math.ceil(col)).fill(1);
};

const draw = () => {
  $.fillStyle = "rgba(0,0,0,.01)";
  $.fillRect(0, 0, W, H);
  $.fillStyle = "#0f0";
  $.font = font + "px system-ui";
  for (let i = 0; i < arr.length; i++) {
    let txt = matrix[Math.floor(Math.random() * matrix.length)];
    $.fillText(txt, i * font, arr[i] * font);
    if (arr[i] * font > H && Math.random() > 0.998) arr[i] = 0;
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
    matrixFontHobbies = 14;
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
    expertiseMatrixFont = 14;
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
  window.addEventListener("resize", initCanvas);
  initMatrixCanvasHobbies();
  drawMatrixHobbies();
  window.addEventListener("resize", initMatrixCanvasHobbies);
  initExpertiseMatrixCanvas();
  drawExpertiseMatrixFrame();
  window.addEventListener("resize", initExpertiseMatrixCanvas);
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
</style>

