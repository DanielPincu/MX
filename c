<template>
  <div v-if="visible" class="boot-overlay" :class="{ 'boot-fade-out': fadingOut }">
    <!-- Matrix Rain Canvas -->
    <canvas ref="bootCanvas" class="boot-canvas"></canvas>

    <!-- Scanlines overlay -->
    <div class="boot-scanlines"></div>

    <!-- Server Boot Terminal -->
    <div class="boot-terminal">
      <pre class="boot-log">
        <div v-for="(line, i) in displayedLines" :key="i" class="boot-line">
          <span class="boot-timestamp">{{ line.ts }}</span>
          <span :class="line.status === 'OK' ? 'boot-ok' : line.status === 'FAIL' ? 'boot-fail' : 'boot-info'">
            {{ line.status === 'OK' ? '[  OK  ]' : line.status === 'FAIL' ? '[FAIL]' : '[     ]' }}
          </span>
          <span class="boot-text">{{ line.msg }}</span>
        </div>
        <div v-if="currentTyping" class="boot-line boot-line--typing">
          <span class="boot-timestamp">{{ currentTyping.ts }}</span>
          <span class="boot-info">[     ]</span>
          <span class="boot-text">{{ currentTyping.msg }}</span>
          <span v-if="cursorVisible" class="boot-cursor">_</span>
        </div>
        <div v-if="showReady" class="boot-line boot-ready-line">
          <span class="boot-timestamp">{{ readyTimestamp }}</span>
          <span class="boot-ok">[  OK  ]</span>
          <span class="boot-text boot-text--ready">READY.</span>
        </div>
      </pre>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['boot-complete'])

const visible = ref(true)
const fadingOut = ref(false)
const bootCanvas = ref(null)
const displayedLines = ref([])
const cursorVisible = ref(true)
const showReady = ref(false)
const currentTyping = ref(null)
const readyTimestamp = ref('')

// Your exact matrix rain from HomeView
const str = "日ア  イウ  エオ  カキ  クケコ  サシス  セソタチツテト  ナニヌネノハヒフヘホマミム  メモヤユヨラリル  レロワヲンあいうえおかきくけこさし  すせそ  たちつてとな ";
const matrix = str.split("");

let canvasCtx = null
let W = 0
let H = 0
let font = 8
let col = 0
let arr = []
let rafId = null
let cursorInterval = null

const pad2 = (n) => String(n).padStart(2, '0')
const makeTimestamp = () => {
  const d = new Date()
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`
}

// Server boot sequence
const bootSequence = [
  { ts: '', status: 'OK', msg: 'mx kernel 6.8.0-arch1-1 (x86_64)' },
  { ts: '', status: 'OK', msg: 'CPU: Intel Core i7 @ 4.20GHz' },
  { ts: '', status: 'OK', msg: 'Memory: 16384MB available' },
  { ts: '', status: 'OK', msg: 'Mounting root filesystem...' },
  { ts: '', status: 'OK', msg: 'Reached target Local File Systems' },
  { ts: '', status: 'OK', msg: 'Starting Network Service...' },
  { ts: '', status: 'OK', msg: 'Reached target Network' },
  { ts: '', status: 'OK', msg: 'Loading DP protocol modules...' },
  { ts: '', status: 'TYPING', msg: '> initiating DP protocol' },
  { ts: '', status: 'TYPING', msg: '> synchronizing with the matrix' },
  { ts: '', status: 'TYPING', msg: '> decoding signal' },
  { ts: '', status: 'TYPING', msg: '> establishing link' }
]

const initCanvas = () => {
  const c = bootCanvas.value
  if (!c) return
  canvasCtx = c.getContext("2d")
  W = c.width = window.innerWidth
  H = c.height = window.innerHeight
  font = 8
  col = W / font
  arr = new Array(Math.ceil(col)).fill(1)
}

const draw = () => {
  if (!canvasCtx) return
  canvasCtx.fillStyle = "rgba(0,0,0,.015)"
  canvasCtx.fillRect(0, 0, W, H)
  canvasCtx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--mx-accent").trim() || "#45ff8a"
  canvasCtx.font = font + "px system-ui"
  for (let i = 0; i < arr.length; i++) {
    let txt = matrix[Math.floor(Math.random() * matrix.length)]
    canvasCtx.fillText(txt, i * font, arr[i] * font)
    if (arr[i] * font > H && Math.random() > 0.9995) arr[i] = 0
    arr[i]++
  }
  rafId = requestAnimationFrame(draw)
}

const runBootSequence = () => {
  let idx = 0

  const bootNext = () => {
    if (idx >= bootSequence.length) {
      readyTimestamp.value = makeTimestamp()
      showReady.value = true
      setTimeout(() => beginFadeOut(), 800)
      return
    }

    const step = bootSequence[idx]
    const timestamp = makeTimestamp()

    if (step.status === 'TYPING') {
      // Type it out character by character
      let charIdx = 0
      currentTyping.value = { ts: timestamp, msg: '' }

      const typeChar = () => {
        if (charIdx < step.msg.length) {
          currentTyping.value = {
            ts: timestamp,
            msg: step.msg.substring(0, charIdx + 1)
          }
          charIdx++
          setTimeout(typeChar, 20 + Math.random() * 30)
        } else {
          // Done typing, push as completed line
          displayedLines.value.push({
            ts: timestamp,
            status: 'OK',
            msg: step.msg
          })
          currentTyping.value = null
          idx++
          setTimeout(bootNext, 150 + Math.random() * 100)
        }
      }
      typeChar()
    } else {
      displayedLines.value.push({
        ts: timestamp,
        status: step.status,
        msg: step.msg
      })
      idx++
      setTimeout(bootNext, 80 + Math.random() * 120)
    }
  }

  bootNext()
}

const beginFadeOut = () => {
  fadingOut.value = true
  setTimeout(() => {
    visible.value = false
    emit('boot-complete')
  }, 500)
}

onMounted(() => {
  const hasBooted = sessionStorage.getItem('mx-boot-complete')
  if (hasBooted) {
    visible.value = false
    emit('boot-complete')
    return
  }

  initCanvas()
  rafId = requestAnimationFrame(draw)

  cursorInterval = setInterval(() => {
    cursorVisible.value = !cursorVisible.value
  }, 450)

  setTimeout(runBootSequence, 300)
})

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId)
  if (cursorInterval) clearInterval(cursorInterval)
})
</script>

<style scoped>
.boot-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: opacity 0.5s ease-out;
  opacity: 1;
}

.boot-overlay.boot-fade-out {
  opacity: 0;
}

.boot-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  mix-blend-mode: screen;
  opacity: 0.35;
}

.boot-scanlines {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  opacity: 0.03;
  background: repeating-linear-gradient(
    0deg,
    transparent 0px,
    transparent 2px,
    #45ff8a 2px,
    #45ff8a 4px
  );
}

.boot-terminal {
  position: relative;
  z-index: 2;
  width: 100%;
  padding: 1.5rem 2rem;
  font-family: "Courier New", "Lucida Console", "Consolas", monospace;
  font-size: clamp(0.7rem, 1.3vw, 0.9rem);
  line-height: 1.5;
  letter-spacing: 0.02em;
}

.boot-log {
  margin: 0;
  max-width: 80ch;
}

.boot-line {
  white-space: nowrap;
  overflow: hidden;
  margin: 0;
}

.boot-timestamp {
  color: rgba(0, 255, 65, 0.35);
  margin-right: 0.75rem;
  user-select: none;
}

.boot-ok {
  color: #00ff41;
  margin-right: 0.5rem;
  font-weight: bold;
}

.boot-fail {
  color: #ff3333;
  margin-right: 0.5rem;
  font-weight: bold;
}

.boot-info {
  color: rgba(0, 255, 65, 0.5);
  margin-right: 0.5rem;
}

.boot-text {
  color: rgba(0, 255, 65, 0.85);
  text-shadow:
    0 0 2px rgba(0, 255, 65, 0.3),
    0 0 6px rgba(0, 255, 65, 0.1);
}

.boot-text--ready {
  color: #00ff41;
  font-weight: bold;
  text-shadow:
    0 0 4px #00ff41,
    0 0 12px rgba(0, 255, 65, 0.3);
}

.boot-line--typing {
  margin: 0;
}

.boot-cursor {
  display: inline-block;
  margin-left: 0.1rem;
  animation: blink-cursor 0.45s step-end infinite;
  color: #00ff41;
  font-weight: bold;
}

.boot-ready-line {
  margin: 0.2rem 0 0 0;
  opacity: 0;
  animation: fade-in 0.3s ease forwards;
}

@keyframes blink-cursor {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

@keyframes fade-in {
  to { opacity: 0.85; }
}

@media (prefers-reduced-motion: reduce) {
  .boot-overlay {
    transition: none;
  }
  .boot-cursor {
    animation: none;
    opacity: 1;
  }
}
</style>
