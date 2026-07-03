<template>
  <div class="error-page min-h-[1200px] md:min-h-[1000px] relative">
    <div class="noise"></div>
    <!-- <div class="overlay"></div> -->
    <div class="terminal p-5 md:pt-10 pt-8">
      <div class="md:pb-2 pb-10">

        <div class="typed-text glitch-text">
          <span class="glitch-wrapper text-6xl">
            <span class="glitch-base">About me<span class="cursor-pulse">|</span></span>
            <span aria-hidden="true" class="glitch-overlay">About me<span class="cursor-glitch">|</span></span>
          </span>
        </div>
      </div>
      
      

      <div class="grid grid-cols-1 gap-6 pb-8 md:pb-4" style="width: calc(min(96vw, 1720px) - 2rem); margin-inline: auto;">
        <div>
          <article class="terminal-card">
            <div class="terminal-card__head">
              <p class="terminal-title">Windows Terminal - about.exe</p>
              <div class="terminal-controls" aria-hidden="true">
                <span class="control-btn control-minimize" aria-hidden="true">-</span>
                <span class="control-btn control-maximize" aria-hidden="true">□</span>
                <button type="button" class="control-btn control-close" @click="triggerEasterEgg">×</button>
              </div>
            </div>
            <div class="terminal-card__body">
              <p class="terminal-easter" :class="{ 'is-visible': showEasterEgg }">{{ easterEggMessage || ' ' }}</p>
              <p class="output terminal-copy md:text-xl text-lg">
                I’m Daniel Pincu, an aspiring web developer stepping into the code that shapes our reality. Like in <em>The Matrix</em>, every line I write is a choice: remain in the safety of the familiar, or break free into the unknown. My mission is to craft digital experiences where design and logic converge, pulling users into spaces that blur the line between illusion and function. The red pill calls toward transformation, each click and interaction a doorway to something new, while the blue pill offers the comfort of patterns, grounding users in worlds they already know.<br><br>
                Right now, I am enrolled in the Web Development Professional Bachelor top-up program at <strong>Syddansk Erhvervsakademi: SEA</strong>, decoding the systems of the web and strengthening my skills. At the same time, I am seeking opportunities to plug into real-world projects, places where I can refine my craft, challenge limits, and push digital boundaries further than ever before.<br><br>
                This is more than code. This is awakening, the moment when the web stops being static and becomes alive.
              </p>
            </div>
          </article>
        </div>
        <div class="hidden md:flex self-stretch justify-center items-center">
          <Keyboard />
        </div>
      </div>

      
    </div>
  </div>
  
  
</template>

<script setup>
import Keyboard from './Keyboard.vue';
import { ref, onUnmounted } from 'vue';

const showEasterEgg = ref(false);
const easterEggMessage = ref("");
let easterEggTimeoutId = null;

onUnmounted(() => {
  if (easterEggTimeoutId) {
    clearTimeout(easterEggTimeoutId);
  }
});

const triggerEasterEgg = () => {
  const messages = [
    "ACCESS GRANTED: Follow the white rabbit...",
    "SYSTEM OVERRIDE: Wake-up signal confirmed.",
    "WAKE UP, NEO... The Matrix has you.",
    "HIDDEN LOG: Reality is a beautifully rendered simulation."
  ];
  easterEggMessage.value = messages[Math.floor(Math.random() * messages.length)];
  showEasterEgg.value = true;
  if (easterEggTimeoutId) {
    clearTimeout(easterEggTimeoutId);
  }
  easterEggTimeoutId = setTimeout(() => {
    showEasterEgg.value = false;
  }, 2400);
};


</script>

<style scoped lang="scss">

@import 'https://fonts.googleapis.com/css?family=Inconsolata';

.error-page {
  background: rgba(0, 0, 0, 0.55);
  background-repeat: no-repeat;
  background-size: cover;
  font-family: 'Inconsolata', Helvetica, sans-serif;
  color: rgba(128, 255, 128, 0.8);
  text-shadow:
      0 0 1ex rgba(51, 255, 51, 1),
      0 0 2px rgba(255, 255, 255, 0.8);
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


.terminal {
  position: relative;
  max-width: 100%;
}

.output {
  color: rgba(128, 255, 128, 0.8);
  text-shadow:
      0 0 1px rgba(51, 255, 51, 0.4),
      0 0 2px rgba(255, 255, 255, 0.8);
}

.terminal-card {
  border: 1px solid rgba(var(--mx-accent-rgb), 0.35);
  background:
    linear-gradient(180deg, rgba(var(--mx-accent-rgb), 0.08) 0%, rgba(8, 10, 14, 0.95) 100%),
    linear-gradient(180deg, rgba(24, 27, 31, 0.95) 0%, rgba(15, 17, 20, 0.95) 100%);
  border-radius: 10px;
  overflow: hidden;
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.35),
    0 0 18px rgba(var(--mx-accent-rgb), 0.12);
  backdrop-filter: blur(6px);
}

.terminal-card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.52rem 0.9rem;
  border-bottom: 1px solid rgba(var(--mx-accent-rgb), 0.2);
  background:
    linear-gradient(90deg, rgba(var(--mx-accent-rgb), 0.12), rgba(45, 49, 56, 0.92) 24%, rgba(var(--mx-blue-vibe-rgb), 0.1));
}

.terminal-title {
  margin: 0;
  font-size: 0.8rem;
  letter-spacing: 0.01em;
  color: rgba(var(--mx-accent-soft-rgb), 0.95);
  text-shadow: 0 0 8px rgba(var(--mx-accent-rgb), 0.28);
}

.terminal-controls {
  display: flex;
  align-items: center;
}

.control-btn {
  width: 2.1rem;
  height: 1.55rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: rgba(var(--mx-accent-soft-rgb), 0.9);
  font-size: 0.85rem;
  line-height: 1;
  border: 0;
  background: transparent;
  padding: 0;
}

.control-btn:hover {
  background: rgba(var(--mx-accent-rgb), 0.2);
}

.control-minimize,
.control-maximize {
  pointer-events: none;
}

.control-close:hover {
  background: rgba(var(--mx-warm-rgb), 0.9);
  color: #050505;
  cursor: pointer;
}

.terminal-card__body {
  padding: 1rem 1rem 1.2rem;
  background:
    repeating-linear-gradient(180deg, rgba(var(--mx-accent-rgb), 0.03) 0 1px, transparent 1px 4px),
    linear-gradient(180deg, rgba(11, 14, 18, 0.95) 0%, rgba(8, 10, 14, 0.95) 100%);
}

.terminal-line {
  margin-bottom: 0.8rem;
  font-size: 0.9rem;
  color: rgba(var(--mx-accent-soft-rgb), 0.7);
}

.terminal-easter {
  margin: 0 0 0.8rem;
  font-size: 0.85rem;
  color: var(--mx-warm);
  text-shadow: 0 0 8px rgba(var(--mx-warm-rgb), 0.5);
  min-height: 1.3rem;
  opacity: 0;
  transition: opacity 160ms ease;
}

.terminal-easter.is-visible {
  opacity: 1;
}

.terminal-prompt {
  color: var(--mx-accent);
  margin-right: 0.4rem;
  text-shadow: 0 0 7px rgba(var(--mx-accent-rgb), 0.45);
}

.terminal-copy {
  line-height: 1.8;
  color: rgba(var(--mx-accent-soft-rgb), 0.88);
  text-shadow: none;
}

</style>

