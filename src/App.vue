<template>
  <div class="min-h-screen flex flex-col app-shell">
    <header class="fixed w-screen z-30 site-header">
      <nav class="container mx-auto px-4 py-3">
        <div class="flex justify-between items-center gap-4">
          <RouterLink to="/" class="brand-lockup" @click="closeMenu">
            <span class="brand-mark">DP</span>
            <span class="brand-copy">
              <span class="brand-name">Daniel Pincu</span>
              <span class="brand-role">web developer</span>
            </span>
          </RouterLink>

          <div class="hidden md:flex nav-status" aria-hidden="true">
            The reality is just another signal to decode conversion...
          </div>

          <div class="theme-switcher" aria-label="Color theme">
            <button
              v-for="theme in themes"
              :key="theme.name"
              type="button"
              class="theme-dot"
              :class="[`theme-dot--${theme.name}`, { active: currentTheme === theme.name }]"
              :aria-label="`Use ${theme.label} theme`"
              :aria-pressed="currentTheme === theme.name"
              @click="setTheme(theme.name)"
            >
              <span></span>
            </button>
          </div>

          <div>
            <button
              @click="toggleMenu"
              class="menu-button cryptic-button text-green-300 focus:outline-none md:block"
              :class="{ 'menu-button--hidden': isMenuOpen }"
              :disabled="isMenuOpen"
              :aria-expanded="isMenuOpen"
              aria-label="Open hidden signal"
            >
              <span class="cipher-sigil" :class="{ active: isMenuOpen }" aria-hidden="true">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
        </div>
      </nav>

      <Transition name="slide-in">
        <div v-if="isMenuOpen" class="fixed top-0 right-0 h-full w-[min(22rem,86vw)] menu-panel p-5 transform transition-transform duration-300 ease-in-out">
          <div class="flex items-center justify-between mb-8">
            <span class="menu-kicker">signal / 64</span>
            <button @click="closeMenu" class="icon-button text-white" aria-label="Close hidden signal"><i class="fa text-2xl fa-times" aria-hidden="true"></i></button>
          </div>

          <div class="easter-console" aria-label="Encrypted message">
            <div class="sigil-large" aria-hidden="true">
              <span>01</span>
              <span>10</span>
              <span>64</span>
              <span>MX</span>
            </div>

            <div class="cipher-lines">
              <p>&gt; carrier found at 8.04MHz</p>
              <p>&gt; handshake: <span>READY.</span></p>
              <p>&gt; decoded route: follow the rain</p>
              <p>&gt; payload: portfolio hidden in plain sight</p>
            </div>
          </div>

          <div class="mt-10 panel-readout">
            <p>Transmission accepts internships, collaborations, and weirdly useful web ideas.</p>
            <a href="mailto:echo@danielpincu.com">echo@danielpincu.com</a>
          </div>
        </div>
      </Transition>
    </header>

    <RouterView v-slot="{ Component }">
      <component :is="Component" />
    </RouterView>

    <!-- Footer here -->
    

    <footer class="bg-black text-center py-8 project-card mt-auto relative site-footer">
      <canvas ref="footerCanvas" class="absolute top-0 left-0 w-full h-full"></canvas>
      <div class="relative z-10">
        <p class="">
          <a href="mailto:echo@danielpincu.com" class="text-green-400 hover:text-white transition-colors">echo@danielpincu.com</a>
        </p>
        <p class="mb-4">&copy; 2024 Daniel Pincu. All rights reserved.</p>
        <!-- Social Media Links -->
        <div class="flex justify-center space-x-6 mt-2">
          <a href="https://github.com/danielpincu" target="_blank" aria-label="GitHub Profile" class="text-green-400 hover:text-white transition-colors">
            <i class="fab fa-github text-3xl"></i>
          </a>
          <a href="https://www.linkedin.com/in/danielpincu/" target="_blank" aria-label="LinkedIn Profile" class="text-green-400 hover:text-white transition-colors">
            <i class="fab fa-linkedin text-3xl"></i>
          </a>
        </div>
        <!-- Email Address -->
        
      </div>
    </footer>


  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, watch } from 'vue'

const isMenuOpen = ref(false)
const themes = [
  { name: 'green', label: 'Green' },
  { name: 'blue', label: 'Blue' },
  { name: 'red', label: 'Red' }
]
const currentTheme = ref(localStorage.getItem('mx-theme') || 'green')

const applyTheme = (theme) => {
  document.documentElement.dataset.theme = theme
  localStorage.setItem('mx-theme', theme)
}

const setTheme = (theme) => {
  currentTheme.value = theme
  applyTheme(theme)
}

applyTheme(currentTheme.value)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

// Watch for menu state changes
watch(isMenuOpen, (newValue) => {
  const getScrollbarWidth = () => {
    return window.innerWidth - document.documentElement.clientWidth;
  };

  const scrollbarWidth = getScrollbarWidth();

  if (newValue) {
    document.body.style.overflow = "hidden"; // Disable scrolling
    document.body.style.paddingRight = `${scrollbarWidth}px`; // Add padding to compensate for scrollbar width
  } else {
    document.body.style.overflow = ""; // Restore scrolling
    document.body.style.paddingRight = ""; // Remove padding
  }
});
</script>

<style scoped>
/* Highlight the active link with the specified color */
.router-link-exact-active {
  color: var(--mx-warm);
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
