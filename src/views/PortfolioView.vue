<template>
  <div class="relative min-h-screen text-gray-100 mt-16 project-card portfolio-page">
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

        <!-- Portfolio Items (3 per row) -->
        <div class="grid md:grid-cols-2 xl:grid-cols-3 grid-cols-1 pt-4 gap-6 portfolio-grid">
          <router-link
            v-for="portfolioItem in portfolioItems"
            :key="portfolioItem.id"
            :to="`/detail/${portfolioItem.id}`"
            class="project opacity-95"
            >
            
            <div class="project-frame">
              <img
                :src="portfolioItem.image"
                :alt="`${portfolioItem.title} project preview`"
              />
            </div>
            <div class="project-meta">
              <span>{{ portfolioItem.category }}</span>
              <span>{{ portfolioItem.year }}</span>
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
import getPortfolio from '@/modules/getPortfolio';

const { portfolioItems } = getPortfolio();
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

.project-frame {
  position: absolute;
  inset: 0.75rem;
  bottom: 8.5rem;
  border: 1px solid rgba(var(--mx-accent-soft-rgb), 0.12);
  border-radius: 5px;
  overflow: hidden;
  background: rgba(3, 6, 3, 0.66);
}

.project-frame img {
  position: relative;
  z-index: 0;
  filter: saturate(0.82) contrast(1.02) brightness(0.78);
  transition: filter 160ms ease, transform 160ms ease;
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
  transform: translateY(-3px);
  border-color: rgba(var(--mx-warm-rgb), 0.5);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    inset 0 -0.5rem 0.65rem rgba(0, 0, 0, 0.62),
    0 0.22rem 0 rgba(0, 0, 0, 0.9),
    0 0 14px rgba(var(--mx-accent-rgb), 0.1);
}

.project:hover .project-frame img {
  filter: saturate(1) contrast(1.04) brightness(0.9);
  transform: scale(1.02);
}

.project:hover h2 {
  text-shadow:
    0 0 10px rgba(var(--mx-accent-rgb), 0.4);
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


</style>
