<template>
  <div class="error-page">
    <div class="noise"></div>
    <div class="overlay"></div>
    <div class="terminal">
      
      <div class="pb-32">
        <div class="glitch-text text-[50px]">
            <span>About me</span>
        </div>
        <div class="glitch-scanline">Can you read this?</div>
      </div>

      <h1 class="text-2xl">About <span class="text-3xl">ME</span></h1>
      <p class="output text-xl">The page you are looking for might have been removed, had its name changed or is temporarily unavailable.</p>
      <p class="output">Please try to go back or return to the homepage.</p>
      <p class="output">Good luck.</p>
    </div>
    
  </div>
</template>

<script setup>

</script>

<style scoped>
@import 'https://fonts.googleapis.com/css?family=Inconsolata';

.error-page {
  min-height: 100vh;
  box-sizing: border-box;
  background-image: radial-gradient(#11581E, #041607), url("https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif");
  background-repeat: no-repeat;
  background-size: cover;
  font-family: 'Inconsolata', Helvetica, sans-serif;
  color: rgba(128, 255, 128, 0.8);
  text-shadow:
      0 0 1ex rgba(51, 255, 51, 1),
      0 0 2px rgba(255, 255, 255, 0.8);
}

.noise {
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif");
  background-repeat: no-repeat;
  background-size: cover;
  z-index: -1;
  opacity: .02;
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
  z-index: 1;
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
  animation: scan 7.5s linear 0s infinite;
}

@keyframes scan {
  0%        { background-position: 0 -100vh; }
  30%, 100% { background-position: 0 100vh; }
}

.terminal {
  box-sizing: inherit;
  position: absolute;
  height: 100%;
  width: 1000px;
  max-width: 100%;
  padding: 4rem;
  text-transform: uppercase;
}

.output {
  color: rgba(128, 255, 128, 0.8);
  text-shadow:
      0 0 1px rgba(51, 255, 51, 0.4),
      0 0 2px rgba(255, 255, 255, 0.8);
}





/* General styles for glitch effect */
.glitch-text {
  position: relative;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  color: green;
  animation: glitch-jerkwhole 10s infinite;
}

/* Extra spans for layered glitch effect */
.glitch-text span {
  position: absolute;
  color: green;
  filter: blur(2px);
  animation: glitch-blur 30ms infinite, glitch-jerk 50ms infinite;
}


.glitch-scanline {
  width: 100%;
  height: 4px;
  margin-bottom: 5px;
  opacity: 0.05;
  background: rgba(0, 255, 0, 0.1);
}

/* Keyframes */
@keyframes glitch-blur {
  0%, 100% { filter: blur(1px); opacity: 0.8; }
  50% { filter: blur(1px); opacity: 1; }
}

@keyframes glitch-jerk {
  50% { transform: translateX(3px); }
  51% { transform: translateX(0); }
}


</style>
