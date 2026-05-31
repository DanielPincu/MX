<template>
  <div class="retro-typewriter">
    <span class="retro-text">{{ displayedText }}</span>
    <span v-if="isTyping || showCursor" class="retro-cursor mb-2" :class="{ 'retro-cursor--blink': !isTyping }">▌</span>
  </div>
</template>

<script setup>
import { ref, inject, onMounted, onUnmounted, watch } from 'vue'
import { getAudioContext, isAudioReady } from '@/modules/audioContext.js'

const bootComplete = inject('bootComplete', ref(false))
const isVisible = ref(true)
let observer = null

const sentences = [
  'Hello, stranger!',
  'My name is Daniel Pincu',
  'Welcome to The Matrix!'
]
const displayedText = ref('')
const isTyping = ref(false)
const showCursor = ref(true)
let sentenceIndex = 0

// ── Hover / Teletype sound (same as portfolio card hover) ──
// Modem-style baud sound using frequency-shift keying + noise

let lastKeyclickAt = 0

const playKeyclick = () => {
  try {
    if (!isVisible.value) return

    const now = performance.now()
    if (now - lastKeyclickAt < 260) return
    lastKeyclickAt = now

    const audioCtx = getAudioContext()
    if (!audioCtx || !isAudioReady()) return
    const t = audioCtx.currentTime
    const duration = 0.28
    const baud = 45.45
    const bitLength = 1 / baud
    const mark = 2125
    const space = 2295
    const pattern = [1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1]

    // ── Noise layer ──
    const noiseBufferSize = Math.floor(audioCtx.sampleRate * duration)
    const noiseBuffer = audioCtx.createBuffer(1, noiseBufferSize, audioCtx.sampleRate)
    const noiseData = noiseBuffer.getChannelData(0)
    for (let i = 0; i < noiseBufferSize; i++) {
      noiseData[i] = (Math.random() * 2 - 1) * 0.32
    }
    const noiseSource = audioCtx.createBufferSource()
    const noiseGain = audioCtx.createGain()
    const noiseFilter = audioCtx.createBiquadFilter()
    noiseSource.buffer = noiseBuffer
    noiseFilter.type = 'bandpass'
    noiseFilter.frequency.setValueAtTime(1800, t)
    noiseFilter.Q.setValueAtTime(0.8, t)
    noiseGain.gain.setValueAtTime(0.0001, t)
    noiseGain.gain.exponentialRampToValueAtTime(0.014, t + 0.01)
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, t + duration)
    noiseSource.connect(noiseFilter)
    noiseFilter.connect(noiseGain)
    noiseGain.connect(audioCtx.destination)
    noiseSource.start(t)
    noiseSource.stop(t + duration)

    // ── Square wave oscillator with frequency-shift keying ──
    const oscillator = audioCtx.createOscillator()
    const toneGain = audioCtx.createGain()
    const toneFilter = audioCtx.createBiquadFilter()
    const masterGain = audioCtx.createGain()
    oscillator.type = 'square'
    pattern.forEach((bit, index) => {
      oscillator.frequency.setValueAtTime(bit ? mark : space, t + index * bitLength)
    })
    toneFilter.type = 'bandpass'
    toneFilter.frequency.setValueAtTime(2210, t)
    toneFilter.Q.setValueAtTime(10, t)
    toneGain.gain.setValueAtTime(0.0001, t)
    toneGain.gain.exponentialRampToValueAtTime(0.035, t + 0.012)
    toneGain.gain.setValueAtTime(0.035, t + duration - 0.045)
    toneGain.gain.exponentialRampToValueAtTime(0.0001, t + duration)
    masterGain.gain.setValueAtTime(0.85, t)
    oscillator.connect(toneFilter)
    toneFilter.connect(toneGain)
    toneGain.connect(masterGain)
    masterGain.connect(audioCtx.destination)
    oscillator.start(t)
    oscillator.stop(t + duration)

  } catch (e) {
    // silent
  }
}

let typeTimeout = null
let pauseTimeout = null

const clearAllTimeouts = () => {
  if (typeTimeout) { clearTimeout(typeTimeout); typeTimeout = null }
  if (pauseTimeout) { clearTimeout(pauseTimeout); pauseTimeout = null }
}

const typeSentence = (index) => {
  const sentence = sentences[sentenceIndex]
  if (!sentence) return
  if (index <= sentence.length) {
    displayedText.value = sentence.substring(0, index)
    if (index < sentence.length) {
      playKeyclick()
      const delay = 30 + Math.random() * 50
      typeTimeout = setTimeout(() => typeSentence(index + 1), delay)
    } else {
      isTyping.value = false
      showCursor.value = true
      // If this is the last sentence, keep it displayed forever
      if (sentenceIndex === sentences.length - 1) return
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
  // Observe visibility to silence sound when scrolled away
  const el = document.querySelector('.retro-typewriter')
  if (el) {
    observer = new IntersectionObserver(
      ([entry]) => { isVisible.value = entry.isIntersecting },
      { threshold: 0 }
    )
    observer.observe(el)
  }

  if (bootComplete.value) {
    startTypingCycle()
  }
})

onUnmounted(() => {
  clearAllTimeouts()
  if (observer) {
    observer.disconnect()
    observer = null
  }
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
