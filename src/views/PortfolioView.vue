<template>
  <div class="relative min-h-screen text-gray-100 mt-16 project-card portfolio-page">
        <h1 class="typed-text py-12 glitch-text portfolio-heading">
          <span :ref="headingRef" class="glitch-wrapper text-3xl md:text-5xl lg:text-6xl pr-3 pt-1">
            <span class="glitch-base">{{ headingText }}<span class="cursor-pulse">|</span></span>
            <span aria-hidden="true" class="glitch-overlay">{{ headingText }}<span class="cursor-glitch">|</span></span>
          </span>
        </h1>
    <div class="relative px-6 portfolio-content">
      <!-- Heading -->
      
      <section class="matrix-showcase-console">
        <div class="showcase-console-header">
          <span></span>
          <p>project transmissions / deployment archive</p>
        </div>

        <!-- Portfolio Items (3 per row) -->
        <div class="grid md:grid-cols-2 xl:grid-cols-3 grid-cols-1 pt-4 gap-6 portfolio-grid">
          <router-link
            v-for="portfolioItem in portfolioItems"
            :key="portfolioItem.id"
            :to="`/detail/${portfolioItem.id}`"
            class="project opacity-95"
            >
            <!-- CRT corner brackets -->
            <span class="project-corner project-corner--tl" aria-hidden="true"></span>
            <span class="project-corner project-corner--tr" aria-hidden="true"></span>
            <span class="project-corner project-corner--bl" aria-hidden="true"></span>
            <span class="project-corner project-corner--br" aria-hidden="true"></span>

            <div class="project-frame">
              <img
                :src="portfolioItem.image"
                :alt="`${portfolioItem.title} project preview`"
              />
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
            <!-- LED status dot -->
            <span class="project-led" aria-hidden="true"></span>
          </router-link>
        </div>
      </section>
    </div>
  </div>

  
  
</template>

<script setup>
import getPortfolio from '@/modules/getPortfolio';
import { useScrollType } from '@/composables/useScrollType';

const { portfolioItems } = getPortfolio();
const { displayedText: headingText, setRef: headingRef } = useScrollType('Projects showcase');
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
  background: rgba(0, 0, 0, 0.5);
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
  width: calc(min(96vw, 1720px) - 2rem);
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

/* ═══════════════════════════════════════════
   Project Cards — Y2K CRT Monitor
   ═══════════════════════════════════════════ */

.project {
  position: relative;
  min-width: 225px;
  min-height: 430px;
  overflow: hidden;
  border: 3px solid #1a1f1a;
  border-top-color: #252a25;
  border-left-color: #1c211c;
  border-right-color: #0e120e;
  border-bottom: 5px solid #080a08;
  border-radius: 12px 12px 18px 18px;
  outline: 2px solid #000;
  outline-offset: -4px;
  background:
    linear-gradient(180deg, #151715 0%, #0a0d0a 30%, #050705 70%, #0a0d0a 100%);
  box-shadow:
    inset 0 0.5rem 1rem rgba(0,0,0,0.65),
    0 0.22rem 0 rgba(0,0,0,0.9),
    0 0.4rem 1rem rgba(0,0,0,0.6),
    0 0 16px rgba(var(--mx-accent-rgb), 0.06);
  transition: transform 120ms ease;
  isolation: isolate;
  contain: paint;
  will-change: transform;
}

.project::before {
  content: "";
  position: absolute;
  inset: 6px;
  border: 1px solid rgba(var(--mx-accent-rgb), 0.12);
  border-radius: 7px 7px 11px 11px;
  z-index: 1;
  pointer-events: none;
}

/* ── CRT Corner L-brackets ── */

.project-corner {
  position: absolute;
  z-index: 3;
  width: 14px;
  height: 14px;
  pointer-events: none;
  opacity: 0.5;
  transition: opacity 0.2s;
}

.project-corner::before,
.project-corner::after {
  content: '';
  position: absolute;
  background: rgba(var(--mx-accent-rgb), 0.3);
  box-shadow: 0 0 5px rgba(var(--mx-accent-rgb), 0.15);
}

.project-corner::before { width: 100%; height: 2px; }
.project-corner::after  { width: 2px; height: 100%; }

.project-corner--tl { top: 10px; left: 10px; }
.project-corner--tl::before { top: 0; left: 0; }
.project-corner--tl::after  { top: 0; left: 0; }

.project-corner--tr { top: 10px; right: 10px; }
.project-corner--tr::before { top: 0; right: 0; }
.project-corner--tr::after  { top: 0; right: 0; }

.project-corner--bl { bottom: 14px; left: 10px; }
.project-corner--bl::before { bottom: 0; left: 0; }
.project-corner--bl::after  { bottom: 0; left: 0; }

.project-corner--br { bottom: 14px; right: 10px; }
.project-corner--br::before { bottom: 0; right: 0; }
.project-corner--br::after  { bottom: 0; right: 0; }

/* ── Image frame — CRT screen ── */

.project-frame {
  position: absolute;
  inset: 1rem;
  bottom: 8rem;
  border: 2px solid #000;
  overflow: hidden;
  background: #000;
  box-shadow: inset 0 0 30px rgba(0,0,0,0.8);
}

.project-frame img {
  position: relative;
  z-index: 0;
  filter: saturate(0.65) contrast(1.2) brightness(0.65);
  transition: transform 200ms ease;
  width: 100%;
  height: 100%;
  object-fit: cover;
  will-change: transform;
}

/* ── Content strip — terminal readout ── */

.project__content {
  position: absolute;
  left: 1rem;
  right: 1rem;
  bottom: 1rem;
  z-index: 2;
  padding: 0.9rem 1rem;
  background:
    linear-gradient(180deg, rgba(5,8,5,0.9), rgba(2,4,2,0.95));
  border: 1px solid rgba(var(--mx-accent-rgb), 0.18);
  border-top: 1px solid rgba(var(--mx-accent-rgb), 0.28);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.03),
    0 0 8px rgba(0,0,0,0.5);
}

.project__content > div {
  width: 100%;
}

.project__content h2 {
  color: #fff;
  text-shadow: 0 0 10px rgba(var(--mx-accent-rgb), 0.25);
}

.project__content p {
  color: rgba(var(--mx-accent-soft-rgb), 0.55);
  text-align: center;
  margin-top: 0.35rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-family: 'VT323', 'Courier New', monospace;
  font-size: 0.72rem;
}

/* ── Tech tags — LED chip labels ── */

.tech-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.4rem;
  margin-top: 0.7rem;
}

.tech-row span {
  border: 1px solid rgba(var(--mx-accent-rgb), 0.3);
  background: rgba(0, 0, 0, 0.5);
  color: rgba(var(--mx-accent-soft-rgb), 0.7);
  padding: 0.2rem 0.45rem;
  font-size: 0.62rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-family: 'VT323', 'Courier New', monospace;
}

/* ── LED status dot ── */

.project-led {
  position: absolute;
  bottom: 1.15rem;
  right: 1.35rem;
  z-index: 4;
  width: 0.35rem;
  height: 0.35rem;
  background: var(--mx-accent);
  border-radius: 50%;
  box-shadow: 0 0 6px rgba(var(--mx-accent-rgb), 0.7);
}

/* ── Hover — GPU-only: transform + opacity (no paints) ── */

.project:hover {
  transform: translateY(-3px);
}

.project:hover .project-corner {
  opacity: 0.85;
}

.project:hover .project-frame img {
  transform: scale(1.03);
}

.project:hover .project-led {
  opacity: 0.8;
}



@media screen and (max-width: 1024px) {
  .projects-container {
    grid-template-columns: repeat(2, 1fr); /* 2 cards per row on tablets */
  }
}

@media screen and (max-width: 802px) {
  .projects-container {
    grid-template-columns: 1fr;
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
    min-height: 320px;
  }
  .project-frame {
    bottom: 7rem;
  }
  .project-corner {
    width: 10px;
    height: 10px;
  }
  .project-corner--tl { top: 7px; left: 7px; }
  .project-corner--tr { top: 7px; right: 7px; }
  .project-corner--bl { bottom: 10px; left: 7px; }
  .project-corner--br { bottom: 10px; right: 7px; }
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


</style>
