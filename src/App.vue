<template>
  <div class="min-h-screen flex flex-col">
    <header class="fixed w-screen bg-black z-30">
      <nav class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <h3 class="text-3xl"></h3>
          <h1 class="text-slate-400">Reality is just a constant feed of false signals</h1>
          <!-- Burger Button Visible on All Screen Sizes -->
          <div class="">
            <button @click="toggleMenu" class="text-green-400 focus:outline-none md:block">
              <svg :class="{ 'rotate-90': isMenuOpen }" class="w-10 h-10 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>
      <!-- Menu Items -->
      <Transition name="slide-in">
        <div v-if="isMenuOpen" class="fixed top-0 right-0 h-full w-64 bg-black bg-opacity-90 p-4 transform transition-transform duration-300 ease-in-out">
          <!-- Close Button -->
          <button @click="closeMenu" class="text-white mb-4"><i class="fa text-3xl fa-times" aria-hidden="true"></i></button>
          
          <RouterLink 
            v-for="link in navLinks" 
            :key="link.to" 
            :to="link.to" 
            @click="closeMenu"
            class="block py-2 text-white hover:text-green-400 transition-colors"
            exact-active-class="router-link-exact-active"
          >
            {{ link.text }}
          </RouterLink>
        </div>
      </Transition>
    </header>

    <RouterView v-slot="{ Component }">
      <component :is="Component" />
    </RouterView>

    <!-- Footer here -->
    
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, watch } from 'vue'

const isMenuOpen = ref(false)
const navLinks = [
  { to: '/', text: 'Home' },
  { to: '/about', text: 'About' },
  { to: '/portfolio', text: 'Portfolio' }
]

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
  color: #F0CE00;
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
