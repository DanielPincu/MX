<template>
  <div v-if="visible" class="boot-overlay" :class="{ 'boot-fade-out': fadingOut }">
    <canvas ref="bootCanvas" class="boot-canvas"></canvas>
    <div class="boot-scanlines"></div>

    <div class="boot-terminal">
      <!-- Fixed header -->
      <div class="boot-header">
        <div class="boot-title">American Megatrends</div>
        <div class="boot-subtitle">MX v1.0.0 BIOS (ASUS TUF Z490-PLUS)</div>
      </div>

      <!-- BIOS POST body -->
      <div class="boot-body">
        <div class="boot-line" :class="memClass(0)">CPU = GenuineIntel @ 4200 MHz</div>
        <div class="boot-line" :class="memClass(1)">Memory Test: {{ memDisplay }}K OK</div>
        <div class="boot-line" :class="drvClass(1)">Primary Master: WDC WD5400-00AS  540MB</div>
        <div class="boot-line" :class="drvClass(2)">Primary Slave: CD-ROM 4x Mitsumi</div>
        <div class="boot-line" :class="drvClass(3)">Secondary Master: None</div>
        <div class="boot-line" :class="drvClass(4)">Secondary Slave: None</div>
        <div class="boot-spacer" :class="drvClass(5)"></div>
        <div class="boot-line" :class="drvClass(5)">Floppy Drive A: 1.44 MB 3.5"</div>
        <div class="boot-line" :class="drvClass(6)">Floppy Drive B: None</div>
        <div class="boot-spacer" :class="drvClass(7)"></div>
        <div class="boot-line" :class="drvClass(7)">COM1: 3F8h   COM2: 2F8h   LPT1: 378h</div>
        <div class="boot-line" :class="drvClass(8)">PS/2 Mouse: Detected</div>
        <div class="boot-spacer" :class="drvClass(9)"></div>
        <div class="boot-line" :class="drvClass(9)">Initializing USB Controllers...</div>
        <div class="boot-line" :class="drvClass(10)">USB Controllers: 2 EHCI, 4 OHCI</div>
        <div class="boot-line" :class="drvClass(11)">SATA Devices: 6 Detected</div>
        <div class="boot-spacer" :class="drvClass(12)"></div>
        <div class="boot-line" :class="drvClass(12)">ACPI BIOS Revision 2.0</div>
        <div class="boot-line" :class="drvClass(13)">DMI Pool Data Updated</div>
        <div class="boot-line" :class="drvClass(14)">NVRAM Checksum: OK</div>
      </div>

      <!-- Fixed footer -->
      <div class="boot-footer">
        <div class="boot-divider" :class="{ 'boot-vis': showSetupPrompt }"></div>
        
        <div class="boot-ready-line" :class="{ 'boot-vis': showReady }">
          <span class="boot-ready-text">Booting from Hard Disk (Primary Master)...</span>
         
        </div>
        <div class="boot-press-key-line" :class="{ 'boot-vis': showPressKey }">
          <span class="boot-press-key-text">Press any key to continue <span class="boot-press-cursor">█</span></span>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { resumeAudio } from '@/modules/audioContext.js'

const emit = defineEmits(['boot-complete'])


const visible = ref(true)
const fadingOut = ref(false)
const bootCanvas = ref(null)
const cursorVisible = ref(true)
const memoryCount = ref(0)
const drivesStep = ref(0)
const showSetupPrompt = ref(false)
const showReady = ref(false)
const showPressKey = ref(false)
let bootDoneListener = null


// Matrix rain characters
const str = "日ア  イウ  エオ  カキ  クケコ  サシス  セソタチツテト  ナニヌネノハヒフヘホマミム  メモヤユヨラリル  レロワヲンあいうえおかきくけこさし  すせそ  たちつてとな ";
const matrix = str.split("");

let canvasCtx = null
let W = 0, H = 0, font = 8, col = 0, arr = []
let rafId = null, cursorInterval = null

const memDisplay = computed(() => String(memoryCount.value).padStart(5, ' '))
const memClass = (n) => ({ 'boot-vis': n === 0 || memoryCount.value > 0 })
const drvClass = (n) => ({ 'boot-vis': drivesStep.value >= n })

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

// ── BIOS POST ──
const runBootSequence = () => {
  let stepIdx = 1

  let memCount = 0
  const countMem = () => {
    if (memCount < 16384) {
      memCount += 512
      memoryCount.value = memCount
      setTimeout(countMem, 6 + Math.random() * 10)
    }
  }
  setTimeout(countMem, 300)

  const nextStep = () => {
    if (stepIdx > 14) {
      showSetupPrompt.value = true
      setTimeout(() => {
        showReady.value = true
        // Instead of auto-fading, show "Press any key" and wait for user interaction
        setTimeout(() => {
          showPressKey.value = true
          bootDoneListener = async () => {
            // Unlock audio via user gesture (uses shared AudioContext)
            // Ensure audio is fully ready before transitioning
            await resumeAudio()
            beginFadeOut()
          }


          document.addEventListener('keydown', bootDoneListener, { once: true })
          document.addEventListener('click', bootDoneListener, { once: true })
          document.addEventListener('touchstart', bootDoneListener, { once: true })
        }, 1200)
      }, 800)
      return
    }
    drivesStep.value = stepIdx
    stepIdx++
    const delay = stepIdx <= 4 ? 160 + Math.random() * 100 : 120 + Math.random() * 80
    setTimeout(nextStep, delay)
  }
  setTimeout(nextStep, 700)
}

const beginFadeOut = () => {
  fadingOut.value = true
  if (bootDoneListener) {
    document.removeEventListener('keydown', bootDoneListener)
    document.removeEventListener('click', bootDoneListener)
    document.removeEventListener('touchstart', bootDoneListener)
    bootDoneListener = null
  }
  setTimeout(() => {
    visible.value = false
    emit('boot-complete')
  }, 500)
}


onMounted(() => {
  initCanvas()

  rafId = requestAnimationFrame(draw)
  cursorInterval = setInterval(() => { cursorVisible.value = !cursorVisible.value }, 450)
  setTimeout(runBootSequence, 500)
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
  align-items: center;
  transition: opacity 0.5s ease-out;
  opacity: 1;
}
.boot-overlay.boot-fade-out { opacity: 0; }

.boot-canvas {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  mix-blend-mode: screen;
  opacity: 0.15;
}
.boot-scanlines {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  opacity: 0.015;
  background: repeating-linear-gradient(0deg, transparent 0px, transparent 2px, #000 2px, #000 4px);
}

.boot-terminal {
  position: relative;
  z-index: 2;
  width: 85%;
  max-width: 56rem;
  min-height: 28rem;
  display: flex;
  flex-direction: column;
  font-family: "Lucida Console", "Courier New", monospace;
  font-size: clamp(0.7rem, 1.25vw, 0.9rem);
  line-height: 1.5;
  letter-spacing: 0.03em;
  background: rgba(0, 0, 0, 0.9);
  border: 1px solid rgba(200, 200, 200, 0.1);
  box-shadow: 0 0 40px rgba(0,0,0,0.95), inset 0 0 80px rgba(0,0,0,0.4);
}

/* ── Header ── */
.boot-header {
  flex-shrink: 0;
  padding: 1.5rem 2.5rem 0.5rem;
  text-align: center;
}
.boot-title {
  font-size: clamp(1.1rem, 2.5vw, 1.8rem);
  font-weight: bold;
  color: rgba(220, 220, 220, 0.95);
  letter-spacing: 0.1em;
  margin-bottom: 0.15rem;
}
.boot-subtitle {
  font-size: clamp(0.6rem, 1vw, 0.75rem);
  color: rgba(180, 180, 180, 0.65);
}

/* ── BIOS POST body ── */
.boot-body {
  flex: 1;
  padding: 0.5rem 2.5rem;
  overflow: hidden;
}
.boot-body .boot-line {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
  color: rgba(200, 200, 200, 0.85);
  min-height: 1.5em;
  visibility: hidden;
}
.boot-body .boot-spacer {
  min-height: 0.3em;
  visibility: hidden;
}
.boot-body .boot-vis {
  visibility: visible;
}

/* ── Footer ── */
.boot-footer {
  flex-shrink: 0;
  padding: 0.5rem 2.5rem 1.5rem;
}
.boot-footer .boot-vis {
  visibility: visible;
}
.boot-divider {
  height: 0;
  margin: 0;
  visibility: hidden;
}
.boot-setup-line {
  display: flex;
  justify-content: space-between;
  padding: 0.3rem 0;
  visibility: hidden;
}
.boot-setup-left, .boot-setup-right {
  color: rgba(220, 220, 220, 0.55);
  font-size: clamp(0.55rem, 0.9vw, 0.7rem);
}
.boot-ready-line {
  margin-top: 0.3rem;
  display: flex;
  align-items: center;
  gap: 0.15rem;
  visibility: hidden;
}
.boot-ready-text {
  color: rgba(220, 220, 220, 0.8);
  font-weight: bold;
  font-size: clamp(0.6rem, 1vw, 0.8rem);
}
.boot-ready-cursor {
  animation: blink-cursor 0.45s step-end infinite;
  color: rgba(220, 220, 220, 0.9);
  font-weight: bold;
  font-size: clamp(0.6rem, 1vw, 0.8rem);
}
.boot-press-key-line {
  margin-top: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.15rem;
  visibility: hidden;
}
.boot-press-key-text {
  color: var(--mx-accent-soft, #45ff8a);
  font-weight: bold;
  font-size: clamp(0.65rem, 1.1vw, 0.85rem);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.boot-press-cursor {
  animation: blink-cursor 0.45s step-end infinite;
  color: var(--mx-accent-soft, #45ff8a);
  font-weight: bold;
  font-size: clamp(0.65rem, 1.1vw, 0.85rem);
}
.blinking-text {


  animation: blink-prompt 0.8s step-end infinite;
}
@keyframes blink-prompt {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}


@keyframes blink-cursor {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .boot-overlay { transition: none; }
  .boot-ready-cursor { animation: none; opacity: 1; }
}
</style>
