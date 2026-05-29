<template>
  <div class="retro-typewriter">
    <span class="retro-prompt">></span>
    <span class="retro-text">{{ displayedText }}</span>
    <span v-if="isTyping || showCursor" class="retro-cursor" :class="{ 'retro-cursor--blink': !isTyping }">█</span>
  </div>
</template>

<script setup>
import { ref, inject, onMounted, watch } from 'vue'
import { getAudioContext, isAudioReady } from '@/modules/audioContext.js'

const bootComplete = inject('bootComplete', ref(false))

const fullText = 'My name is Daniel Pincu'
const displayedText = ref('')
const isTyping = ref(false)
const showCursor = ref(true)

// ── Hover / Teletype sound (same as portfolio card hover) ──
// Modem-style baud sound using frequency-shift keying + noise

let lastKeyclickAt = 0

const playKeyclick = () => {
  try {
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

const typeChar = (index) => {
  if (index <= fullText.length) {
    displayedText.value = fullText.substring(0, index)
    if (index < fullText.length) {
      playKeyclick()
      const delay = 35 + Math.random() * 45
      setTimeout(() => typeChar(index + 1), delay)
    } else {
      isTyping.value = false
      showCursor.value = true
    }
  }
}

const startTyping = () => {
  // Audio was already initialized by BootScreen on user gesture, so it should be ready.
  // But if not (e.g. skip boot), proceed silently — playKeyclick handles that gracefully.
  displayedText.value = ''
  isTyping.value = true
  showCursor.value = true
  setTimeout(() => typeChar(0), 200)
}

watch(bootComplete, (val) => {
  if (val) startTyping()
})

onMounted(() => {
  if (bootComplete.value) {
    startTyping()
  }
})
</script>

<style scoped>
.retro-typewriter {
  display: inline-flex;
  align-items: baseline;
  gap: 0.25rem;
  font-family: 'VT323', 'Courier New', monospace;
  font-size: inherit;
  line-height: 1.3;
  letter-spacing: 0.02em;
}

.retro-prompt {
  color: rgba(var(--mx-accent-rgb), 0.5);
  font-weight: bold;
  font-size: 0.85em;
  user-select: none;
}

.retro-text {
  color: var(--mx-accent-soft);
  text-shadow:
    0 0 4px rgba(var(--mx-accent-rgb), 0.4),
    0 0 12px rgba(var(--mx-accent-rgb), 0.15);
  white-space: pre;
}

.retro-cursor {
  display: inline-block;
  color: var(--mx-accent-soft);
  font-weight: bold;
  font-size: 0.9em;
  line-height: 1;
  margin-left: 0.05rem;
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
