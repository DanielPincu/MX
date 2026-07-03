<template>
  <div class="retro-typewriter">
    <span class="retro-text">
      <template v-for="(part, i) in textParts" :key="i">
        <span v-if="part.mirror" class="retro-text--mirror" :style="{ transitionDelay: part.charIndex * 30 + 'ms' }">{{ part.text }}</span>
        <span v-else>{{ part.text }}</span>
      </template>
    </span>
    <span v-if="isTyping || showCursor" class="retro-cursor mb-4" :class="{ 'retro-cursor--blink': !isTyping }">▌</span>
  </div>
</template>

<script setup>
import { ref, computed, inject, onMounted, onUnmounted, watch } from 'vue'

const bootComplete = inject('bootComplete', ref(false))

const sentences = [
  'Hello, stranger!',
  'Welcome to The Matrix'
]
const displayedText = ref('')
const isTyping = ref(false)
const showCursor = ref(true)
const mirrorMatrix = ref(false)
let sentenceIndex = 0

let typeTimeout = null
let pauseTimeout = null
let mirrorTimer = null

const textParts = computed(() => {
  const parts = []
  const idx = displayedText.value.indexOf('Matrix')
  if (idx === -1) {
    parts.push({ text: displayedText.value, mirror: false })
  } else {
    if (idx > 0) parts.push({ text: displayedText.value.substring(0, idx), mirror: false })
    for (let i = 0; i < 6; i++) {
      parts.push({ text: 'Matrix'[i], mirror: mirrorMatrix.value, charIndex: i })
    }
    const after = displayedText.value.substring(idx + 6)
    if (after) parts.push({ text: after, mirror: false })
  }
  return parts
})

const clearAllTimeouts = () => {
  if (typeTimeout) { clearTimeout(typeTimeout); typeTimeout = null }
  if (pauseTimeout) { clearTimeout(pauseTimeout); pauseTimeout = null }
  if (mirrorTimer) { clearTimeout(mirrorTimer); mirrorTimer = null }
}

const scheduleMirror = () => {
  if (sentenceIndex !== sentences.length - 1) return
  const delay = 400 + Math.random() * 1200
  mirrorTimer = setTimeout(() => {
    mirrorMatrix.value = !mirrorMatrix.value
    scheduleMirror()
  }, delay)
}

const typeSentence = (index) => {
  const sentence = sentences[sentenceIndex]
  if (!sentence) return
  if (index <= sentence.length) {
    displayedText.value = sentence.substring(0, index)
    if (index < sentence.length) {
      const delay = 30 + Math.random() * 50
      typeTimeout = setTimeout(() => typeSentence(index + 1), delay)
    } else {
      isTyping.value = false
      showCursor.value = true
      // If this is the last sentence, keep it displayed forever
      if (sentenceIndex === sentences.length - 1) { scheduleMirror(); return }
      // Otherwise pause, then erase and go to next
      pauseTimeout = setTimeout(() => {
        eraseSentence(sentence.length)
      }, 2200)
    }
  }
}

const eraseSentence = (index) => {
  if (index >= 0) {
    displayedText.value = sentences[sentenceIndex].substring(0, index)
    if (index > 0) {
      const delay = 15 + Math.random() * 25
      typeTimeout = setTimeout(() => eraseSentence(index - 1), delay)
    } else {
      // Move to next sentence
      sentenceIndex = (sentenceIndex + 1) % sentences.length
      pauseTimeout = setTimeout(() => {
        startTypingCycle()
      }, 400)
    }
  }
}

const startTypingCycle = () => {
  clearAllTimeouts()
  displayedText.value = ''
  isTyping.value = true
  showCursor.value = true
  typeTimeout = setTimeout(() => typeSentence(0), 300)
}

watch(bootComplete, (val) => {
  if (val) startTypingCycle()
})

onMounted(() => {
  if (bootComplete.value) {
    startTypingCycle()
  }
})

onUnmounted(() => {
  clearAllTimeouts()
  mirrorMatrix.value = false
})
</script>

<style scoped>
.retro-typewriter {
  display: inline-flex;
  align-items: center;
  gap: 0.15rem;
  font-family: 'VT323', 'Courier New', monospace;
  font-size: inherit;
  line-height: 1;
  letter-spacing: 0;
}

.retro-text,
.retro-cursor {
  font-size: inherit;
  line-height: 1;
}

.retro-text {
  color: var(--mx-accent-soft);
  text-shadow:
    0 0 4px rgba(var(--mx-accent-rgb), 0.4),
    0 0 12px rgba(var(--mx-accent-rgb), 0.15);
  white-space: pre;
}

.retro-text--mirror {
  display: inline-block;
  transform: scaleX(-1);
  transition: transform 50ms ease;
}

.retro-cursor {
  color: var(--mx-accent-soft);
  text-shadow:
    0 0 6px rgba(var(--mx-accent-rgb), 0.6),
    0 0 14px rgba(var(--mx-accent-rgb), 0.25);
  user-select: none;
}

.retro-cursor--blink {
  animation: blink-cursor 0.5s step-end infinite;
}

@keyframes blink-cursor {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .retro-cursor--blink {
    animation: none;
    opacity: 1;
  }
}
</style>
