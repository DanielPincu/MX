<template>
  <section id="home" class="video-banne project-card">
    <div class="noise"></div>
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

          <!-- Full-width cipher -->
          <div class="hero-boot hero-cipher-shell hero-cipher-full hidden md:block" aria-hidden="true">
            <HeroCipher />
          </div>

          <!-- ── Asymmetric split grid ── -->
          <div class="hero-grid">

            <!-- ── LEFT COLUMN: Main content 60% ── -->
            <div class="hero-left">

              <!-- Typing effect -->
              <Typing class="hero-typing" />

              <!-- Name headline -->
              <h1 class="hero-name">
                <span class="hero-name-text typed-text glitch-text -mt-8">
                  <span class="glitch-wrapper">
                    <span class="glitch-base">Daniel Pincu<span class="cursor-pulse"></span></span>
                    <span aria-hidden="true" class="glitch-overlay">Daniel Pincu<span class="cursor-glitch"></span></span>
                  </span>
                </span>
              </h1>

              <!-- Tagline -->
              

              <!-- CTAs -->
              <div class="hero-actions">
                <a href="#projects" class="button button-projects">
                  <span>Projects</span>
                  <div class="liquid"></div>
                </a>
                <button @click="toggleAbout" class="button button-contact">
                  <span>Contact</span>
                  <div class="liquid2"></div>
                </button>
              </div>

            </div>

            <!-- ── RIGHT COLUMN: CRT Carousel 40% ── -->
            <div class="hero-right">

              <div
                class="hero-crt"
                @mouseenter="stopHeroCarousel"
                @mouseleave="startHeroCarousel"
                @touchstart="onHeroTouchStart"
                @touchend="onHeroTouchEnd"
              >
                <div class="crt-bezel">
                  <span class="crt-corner crt-corner--tl"></span>
                  <span class="crt-corner crt-corner--tr"></span>
                  <span class="crt-corner crt-corner--bl"></span>
                  <span class="crt-corner crt-corner--br"></span>

                  <div class="crt-screen">
                    <div class="carousel-track" :style="{ transform: `translateX(-${heroCarouselIndex * 100}%)` }">
                      <div
                        v-for="(item, idx) in heroCarouselItems"
                        :key="idx"
                        class="carousel-slide"
                      >
                        <video v-if="item.type === 'video'" :src="item.src" autoplay loop muted playsinline class="carousel-slide-media"></video>
                        <img v-else :src="item.src" class="carousel-slide-media" />
                      </div>
                    </div>

                    <div class="crt-scanlines" aria-hidden="true"></div>
                    <div class="crt-phosphor" aria-hidden="true"></div>
                    <div class="crt-vignette" aria-hidden="true"></div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>

    </div>

    

    <!-- Contact overlay -->
    <Transition name="fade">
      <div v-if="isAboutOpen" class="fixed z-40 inset-0 flex items-center justify-center" style="background: #000;">
        <div class="relative w-full px-4" style="max-width: 1200px; height: 85vh;">
          <ContactView @close="closeAbout" />
        </div>
      </div>
    </Transition>

  </section>

  <nav class="section-rail hidden md:flex" aria-label="Section navigation">
    <a href="#home">Home</a>
    <a href="#about">About</a>
    <a href="#expertise">Expertise</a>
    <a href="#hobbies">Hobbies</a>
    <a href="#projects">Projects</a>
  </nav>

  <section id="about">
    <AboutView class="project-card site-section" />
  </section>



  <section id="expertise" class="site-section section-pad relative project-card">
    <div class="noise2"></div>
    <!-- <div class="overlay3 md:h-[84%] h-[93%]"></div> -->
    <div class="relative z-20">
        <div class="typed-text glitch-text pb-10 text-center">
          <span :ref="expertiseRef" class="glitch-wrapper text-3xl md:text-5xl lg:text-6xl pr-1 pt-1">
            <span class="glitch-base">{{ expertiseHeading }}<span class="cursor-pulse">|</span></span>
            <span aria-hidden="true" class="glitch-overlay">{{ expertiseHeading }}<span class="cursor-glitch">|</span></span>
          </span>
        </div>
      <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-6 fade-in" style="max-width: min(96vw, 1720px); margin-inline: auto; padding-inline: 1rem;">
        
        <div v-for="(skill, index) in expertise" :key="skill.title" class="expertise-card p-6 rounded-lg project-card">
          <div class="flex justify-between items-start gap-4 mb-4">
            <h3 class="text-lg font-bold">{{ skill.title }}</h3>
            <div class="terminal-controls-card" aria-hidden="true">
              <span class="control-btn-card control-minimize-card">-</span>
              <span class="control-btn-card control-maximize-card">□</span>
              <button type="button" class="control-btn-card control-close-card" @click="triggerExpertiseEgg(index)">×</button>
            </div>
          </div>
          <p class="expertise-easter" :class="{ 'is-visible': !!expertiseEggs[index] }">{{ expertiseEggs[index] || ' ' }}</p>
          <p class="text-md">{{ skill.description }}</p>
        </div>
      </div>
    </div>
  </section>




  <section id="hobbies" class="site-section project-card relative hidden md:block">
    <div class="noise3"></div>
    <!-- <div class="overlay2"></div> -->
    <!-- Ensure the title is above the canvas -->
    <div class="relative z-10">
        <div class="typed-text glitch-text pb-10 pt-20 text-center">
          <span :ref="hobbiesRef" class="glitch-wrapper text-3xl md:text-5xl lg:text-6xl pr-3 pt-1">
            <span class="glitch-base">{{ hobbiesHeading }}<span class="cursor-pulse">|</span></span>
            <span aria-hidden="true" class="glitch-overlay">{{ hobbiesHeading }}<span class="cursor-glitch">|</span></span>
          </span>
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

        <div class="glitch-text periodic-title text-center text-3xl md:text-5xl">
          <p class="text-green-600 text-lg md:text-2xl">How do I spend my time online? <br>That's a 400 Bad Request kind of question 😂</p>
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
import Typing from './Typing.vue';
import HeroCipher from './HeroCipher.vue';
import ContactView from './ContactView.vue';
import AboutView from './AboutView.vue';
import PortfolioView from './PortfolioView.vue';
import { ref, onMounted, onUnmounted } from 'vue';
import { useScrollType } from '@/composables/useScrollType';

const { displayedText: expertiseHeading, setRef: expertiseRef } = useScrollType('Expertise');
const { displayedText: hobbiesHeading, setRef: hobbiesRef } = useScrollType('My Internet periodic table');
import PeriodicView from './PeriodicView.vue';

// ── Hero CRT carousel (TV channels) ──
import ddd from '@/assets/ddd.jpeg';
import gif1 from '@/assets/gif1.mp4';
import gif2 from '@/assets/gif2.mp4';
import xploading from '@/assets/xploading.gif';
import code from '@/assets/code.gif';
import error from '@/assets/error.gif';

const heroCarouselItems = [
  { src: xploading, type: 'image' },
  { src: ddd, type: 'image' },
  { src: code, type: 'image' },
  { src: error, type: 'image' },
];

const heroCarouselIndex = ref(0);
let heroCarouselTimer = null;
let heroTouchStartX = 0;

const startHeroCarousel = () => {
  stopHeroCarousel();
  if (heroCarouselItems.length <= 1) return;
  heroCarouselTimer = setInterval(() => {
    heroCarouselIndex.value = (heroCarouselIndex.value + 1) % heroCarouselItems.length;
  }, 5000);
};
const stopHeroCarousel = () => {
  if (heroCarouselTimer) { clearInterval(heroCarouselTimer); heroCarouselTimer = null; }
};
const onHeroTouchStart = (e) => { heroTouchStartX = e.touches[0].clientX; };
const onHeroTouchEnd = (e) => {
  const diff = heroTouchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    if (diff > 0) heroCarouselIndex.value = (heroCarouselIndex.value + 1) % heroCarouselItems.length;
    else heroCarouselIndex.value = (heroCarouselIndex.value - 1 + heroCarouselItems.length) % heroCarouselItems.length;
  }
};

onMounted(() => {
  window.scrollTo(0, 0);
  startHeroCarousel();
});

onUnmounted(() => {
  stopHeroCarousel();
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
const expertiseEggs = ref({});
const expertiseEggTimeouts = {};

const triggerExpertiseEgg = (index) => {
  const messages = [
    "CTRL+ALT+WOW",
    "Hidden node unlocked",
    "Nice click, Operator",
    "Matrix handshake complete"
  ];
  expertiseEggs.value[index] = messages[Math.floor(Math.random() * messages.length)];
  if (expertiseEggTimeouts[index]) {
    clearTimeout(expertiseEggTimeouts[index]);
  }
  expertiseEggTimeouts[index] = setTimeout(() => {
    expertiseEggs.value[index] = "";
  }, 2200);
};

onUnmounted(() => {
  Object.values(expertiseEggTimeouts).forEach((timeoutId) => clearTimeout(timeoutId));
});
</script>


<style scoped>

/* ══════════════════════════════════════════
   HERO-NAME GLITCH
   ══════════════════════════════════════════ */

/* ══════════════════════════════════════════
   BANNER & CANVAS
   ══════════════════════════════════════════ */

.video-banner {
   position: relative;
   overflow: hidden;
   background: var(--mx-deep);
   min-height: 100dvh;
   height: 100dvh;
   display: flex;
   align-items: center;
   justify-content: center;
}


/* CRT overlay */
.video-banner::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 5;
  pointer-events: none;
  background:
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0, 0, 0, 0.12) 2px,
      rgba(0, 0, 0, 0.12) 4px
    ),
    radial-gradient(
      ellipse at center,
      transparent 60%,
      rgba(0, 0, 0, 0.45) 100%
    );
}

.section-rail {
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

.section-rail a {
  color: rgba(var(--mx-accent-soft-rgb), 0.84);
  font-family: 'VT323', 'Courier New', monospace;
  font-size: 0.72rem;
  letter-spacing: 0.11em;
  text-transform: uppercase;
  text-decoration: none;
  padding: 0.28rem 0.45rem;
  border: 1px solid rgba(var(--mx-accent-rgb), 0.08);
  border-radius: 6px;
  transition: border-color 0.16s ease, color 0.16s ease, background-color 0.16s ease, text-shadow 0.16s ease;
}

.section-rail a:hover,
.section-rail a:focus-visible {
  color: var(--mx-accent-soft);
  border-color: rgba(var(--mx-accent-rgb), 0.45);
  background:
    linear-gradient(90deg, rgba(var(--mx-accent-rgb), 0.2), rgba(var(--mx-blue-vibe-rgb), 0.14));
  text-shadow: 0 0 8px rgba(var(--mx-accent-rgb), 0.55);
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
  background: rgba(0, 0, 0, 0.6);
}

.site-section-top {
  margin-top: clamp(4.5rem, 8vw, 7rem);
  background: rgba(0, 0, 0, 0.55);
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
  width: min(100%, 72rem);
  align-self: center;
}

.hero-construct {
  position: absolute;
  inset: -2.35rem -1.5rem -1.5rem -1.5rem;
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
  width: calc(100% - 2rem);
  margin-inline: 1rem;
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
    /* Tunnel depth — content appears far inside */
    inset 0 0 40px rgba(0, 0, 0, 0.95),
    inset 0 0 120px rgba(0, 0, 0, 0.85),
    inset 0 0 250px rgba(0, 0, 0, 0.5),
    /* Existing shadows */
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
  border-radius: 0;
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
  max-width: min(96vw, 1720px);
  margin-inline: auto;
  min-height: 100dvh;
  position: relative;
  align-content: center;
  isolation: isolate;
  padding-block: 0;
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
  grid-template-columns: 1fr 1fr;
  gap: clamp(1rem, 3vw, 2rem);
  align-items: center;
  justify-items: center;
  width: 100%;
}

/* ── LEFT COLUMN ── */

.hero-left {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  text-align: center;
  align-items: center;
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

.hero-cipher-full {
  margin-bottom: 0.85rem;
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
  font-size: clamp(1.8rem, 4.5vw, 3.2rem) !important;
  display: block;
  text-align: left;
  min-width: unset;
  min-height: unset;
}

.hero-name-glitch {
  position: relative;
  font-family: 'VT323', 'Courier New', monospace;
  font-weight: 700;
  color: var(--mx-accent);
  letter-spacing: 0.05em;
}

/* Shared glitch effect */
.glitch-text {
  position: relative;
  animation: glitch-jerkwhole 5s infinite;
}
.glitch-wrapper { position: relative; }
.glitch-base { color: inherit; white-space: nowrap; }
.glitch-overlay {
  position: absolute;
  inset: 0;
  filter: blur(2px);
  color: var(--mx-accent, #45ff8a);
  opacity: 0.8;
  animation: glitch-blur 30ms infinite, glitch-jerk 50ms infinite;
  pointer-events: none;
}
.cursor-pulse { animation: pulsing 0.3s infinite; }
.cursor-glitch { animation: pulsing 0.3s infinite, glitch-jerk 50ms infinite; }

@keyframes pulsing { 50% { opacity: 0; } }
@keyframes glitch-blur {
  0%, 100% { opacity: 0.6; filter: blur(1px); }
  50% { opacity: 1; filter: blur(2px); }
}
@keyframes glitch-jerk {
  50% { transform: translateX(3px); }
  51% { transform: translateX(0); }
}
@keyframes glitch-jerkwhole {
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

/* ═══════════════════════════════════════════
   Hero CRT Carousel
   ═══════════════════════════════════════════ */

.hero-crt {
  position: relative;
  width: 100%;
  user-select: none;
}

.hero-crt .crt-bezel {
  position: relative;
  overflow: hidden;
  padding: 1.4rem 1.2rem 1.8rem;
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
    0 0 0 4px #0a0d0a,
    0 0.8rem 2rem rgba(0,0,0,0.8),
    0 0 40px rgba(var(--mx-accent-rgb), 0.08);
  border-radius: 18px 18px 22px 22px;
}

.hero-crt .crt-screen {
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  border: 2px solid #000;
  background: #000;
  box-shadow:
    inset 0 0 60px rgba(0,0,0,0.9),
    0 0 2px rgba(var(--mx-accent-rgb), 0.15);
}

.hero-crt .carousel-track {
  display: flex;
  height: 100%;
  will-change: transform;
}

.hero-crt .carousel-slide {
  min-width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
}

.hero-crt .carousel-slide-media {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-crt .crt-scanlines {
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

.hero-crt .crt-phosphor {
  pointer-events: none;
  position: absolute;
  inset: 0;
  z-index: 2;
  background:
    radial-gradient(ellipse at 50% 50%, transparent 60%, rgba(0, 10, 1, 0.45) 100%);
  mix-blend-mode: screen;
}

.hero-crt .crt-vignette {
  pointer-events: none;
  position: absolute;
  inset: 0;
  z-index: 4;
  box-shadow: inset 0 0 80px 20px rgba(0,0,0,0.7);
}

/* CRT corners */
.hero-crt .crt-corner {
  position: absolute;
  z-index: 8;
  width: 14px;
  height: 14px;
  pointer-events: none;
}

.hero-crt .crt-corner::before,
.hero-crt .crt-corner::after {
  content: '';
  position: absolute;
  background: rgba(var(--mx-accent-rgb), 0.35);
  box-shadow: 0 0 6px rgba(var(--mx-accent-rgb), 0.2);
}

.hero-crt .crt-corner::before { width: 100%; height: 2px; }
.hero-crt .crt-corner::after  { width: 2px; height: 100%; }

.hero-crt .crt-corner--tl { top: 10px; left: 10px; }
.hero-crt .crt-corner--tl::before { top: 0; left: 0; }
.hero-crt .crt-corner--tl::after  { top: 0; left: 0; }

.hero-crt .crt-corner--tr { top: 10px; right: 10px; }
.hero-crt .crt-corner--tr::before { top: 0; right: 0; }
.hero-crt .crt-corner--tr::after  { top: 0; right: 0; }

.hero-crt .crt-corner--bl { bottom: 14px; left: 10px; }
.hero-crt .crt-corner--bl::before { bottom: 0; left: 0; }
.hero-crt .crt-corner--bl::after  { bottom: 0; left: 0; }

.hero-crt .crt-corner--br { bottom: 14px; right: 10px; }
.hero-crt .crt-corner--br::before { bottom: 0; right: 0; }
.hero-crt .crt-corner--br::after  { bottom: 0; right: 0; }

/* Dots */
.hero-crt .carousel-dots {
  position: absolute;
  bottom: -1.8rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.45rem;
  z-index: 6;
}

.hero-crt .carousel-dot {
  width: 0.5rem;
  height: 0.5rem;
  border: 1px solid rgba(var(--mx-accent-rgb), 0.45);
  background: rgba(0,0,0,0.6);
  cursor: pointer;
  padding: 0;
  transition: background 0.2s, border-color 0.2s, box-shadow 0.2s;
}

.hero-crt .carousel-dot--active {
  background: var(--mx-accent);
  border-color: var(--mx-accent);
  box-shadow:
    0 0 8px rgba(var(--mx-accent-rgb), 0.8),
    0 0 2px rgba(var(--mx-accent-rgb), 0.5);
}

/* Readout */
.hero-crt .crt-readout {
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

.hero-crt .crt-led {
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


/* ══════════════════════════════════════════
   CTA BUTTONS
   ══════════════════════════════════════════ */

.hero-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.8rem;
  flex-wrap: wrap;
  justify-content: center;
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
  border: 4px solid rgba(var(--mx-accent-rgb), 0.5);
  border-bottom: 4px solid rgba(0, 0, 0, 0.88);
  background:
    linear-gradient(90deg, rgba(var(--mx-warm-rgb), 0.06), transparent 22% 78%, rgba(var(--mx-blue-vibe-rgb), 0.08)),
    linear-gradient(135deg, rgba(255, 255, 255, 0.03), transparent 22%),
    repeating-linear-gradient(180deg, rgba(var(--mx-accent-rgb), 0.025) 0 1px, transparent 1px 5px),
    radial-gradient(circle at 50% 0%, rgba(var(--mx-accent-rgb), 0.15), transparent 52%),
    linear-gradient(180deg, var(--mx-panel), rgba(0, 0, 0, 0.58));
  box-shadow:
    inset 0 1rem 1.2rem rgba(0, 0, 0, 0.56),
    inset 0 -0.55rem 0.75rem rgba(0, 0, 0, 0.7),
    0 1.4rem 2.2rem -0.8rem rgba(0, 0, 0, 0.84),
    0 0 34px rgba(var(--mx-accent-rgb), 0.14);
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

.expertise-card p {
  color: rgba(255, 255, 255, 0.74);
  line-height: 1.7;
}

.terminal-controls-card {
  display: flex;
  align-items: center;
  border: 1px solid rgba(var(--mx-accent-rgb), 0.24);
  background: rgba(0, 0, 0, 0.24);
}

.control-btn-card {
  width: 1.8rem;
  height: 1.35rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: rgba(var(--mx-accent-soft-rgb), 0.9);
  font-size: 0.78rem;
  border: 0;
  background: transparent;
  line-height: 1;
  padding: 0;
}

.control-minimize-card,
.control-maximize-card {
  pointer-events: none;
}

.control-close-card:hover {
  cursor: pointer;
  background: rgba(var(--mx-warm-rgb), 0.9);
  color: #050505;
}

.expertise-easter {
  height: 1.15rem;
  margin: -0.2rem 0 0.5rem;
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--mx-warm);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: 0;
  transition: opacity 140ms ease;
}

.expertise-easter.is-visible {
  opacity: 1;
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

/* Contact modal fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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
    min-width: 0;
    max-width: none;
  }

  .hero-tagline {
    max-width: 34ch;
    font-size: 0.82rem;
  }

  .hero-right {
    gap: 0.85rem;
    width: 100%;
  }

  .hero-tv {
    width: min(100%, 20rem);
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
}

@media (prefers-reduced-motion: reduce) {
  .hero-scroll-indicator {
    animation: none;
  }
}

@media (max-width: 767px) {
  .section-rail {
    display: none !important;
  }
}

</style>
