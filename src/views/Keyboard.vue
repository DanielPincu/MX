<template>
  <div class="matrix-keyboard-rig">
    <div ref="keyboardElement" class="keyboard" role="application" aria-label="Interactive Matrix keyboard">
      <div class="keyboard__bezel">
        <p>Schrödinger's Keyboard</p>
      </div>
      <h1 class="typed-text glitch-text keyboard__heading">
        <span :ref="setRef" class="glitch-wrapper text-xl md:text-3xl lg:text-4xl pr-3">
          <span class="glitch-base">{{ typedText }}<span class="cursor-pulse">|</span></span>
          <span aria-hidden="true" class="glitch-overlay">{{ typedText }}<span class="cursor-glitch">|</span></span>
        </span>
      </h1>
      <div class="keyboard__deck">
        <div class="keyboard__main">
          <div class="keyboard__frow">
            <kbd
              v-for="fk in fKeys" :key="fk.code"
              :data-key="fk.code"
              :data-display="getKeyDisplay(fk.code)"
              @click="handleKeyClick(fk.code)"
            ></kbd>
          </div>
          <div v-for="(row, rowIndex) in keys" :key="rowIndex" class="row">
            <kbd
              v-for="(key, keyIndex) in row"
              :key="keyIndex"
              :data-key="key.code"
              :data-display="getKeyDisplay(key.code)"
              :data-alt="key.alt || null"
              @pointerenter="settleKeyLabel($event, key.code)"
              @pointerleave="releaseKeyLabel($event, key.code)"
              @click="handleKeyClick(key.code)"
            >
            </kbd>
          </div>
        </div>
        <div class="keyboard__nav">
          <div v-for="(row, ri) in navKeys" :key="'nr-'+ri" class="nav-row">
            <kbd
              v-for="(key, ki) in row"
              :key="ki"
              :data-key="key.code"
              :data-display="getKeyDisplay(key.code)"
              @click="handleKeyClick(key.code)"
            >
            </kbd>
          </div>
          <div class="nav-arrows">
            <kbd data-key="up" data-display="↑" @click="handleKeyClick('up')"></kbd>
            <kbd data-key="left" data-display="←" @click="handleKeyClick('left')"></kbd>
            <kbd data-key="down" data-display="↓" @click="handleKeyClick('down')"></kbd>
            <kbd data-key="right" data-display="→" @click="handleKeyClick('right')"></kbd>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useScrollType } from '@/composables/useScrollType';

const { displayedText: typedText, setRef } = useScrollType('There is no spoon...');
const keyboardElement = ref(null);

// ── Mutable state ──
let activeKeyTimeout = null;
let activeElement = null;
let previousPhysicalKey = null;
const settledKeys = new Set();

// ── Character pools ──
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('');
const DIGITS = '0123456789'.split('');

// ── Cached cycling elements (built once at mount) ──
// Each entry: { el: DOMElement, charset: string[] }
let cyclingEntries = [];

// ── Key→Element map for O(1) flashKey lookups ──
let keyElementMap = new Map();

const keys = ref([
  [
    { code: '`', alt: '~' }, { code: '1', alt: '!' }, { code: '2', alt: '@' },
    { code: '3', alt: '#' }, { code: '4', alt: '$' }, { code: '5', alt: '%' },
    { code: '6', alt: '^' }, { code: '7', alt: '&' }, { code: '8', alt: '*' },
    { code: '9', alt: '(' }, { code: '0', alt: ')' }, { code: '-', alt: '_' },
    { code: '=', alt: '+' }, { code: 'backspace' }
  ],
  [
    { code: 'tab' }, { code: 'q' }, { code: 'w' }, { code: 'e' }, { code: 'r' },
    { code: 't' }, { code: 'y' }, { code: 'u' }, { code: 'i' }, { code: 'o' },
    { code: 'p' }, { code: '[', alt: '{' }, { code: ']', alt: '}' }, { code: '\\', alt: '|' }
  ],
  [
    { code: 'caps' }, { code: 'a' }, { code: 's' }, { code: 'd' }, { code: 'f' },
    { code: 'g' }, { code: 'h' }, { code: 'j' }, { code: 'k' }, { code: 'l' },
    { code: ';', alt: ':' }, { code: "'", alt: '"' }, { code: 'enter' }
  ],
  [
    { code: 'lshift' }, { code: 'z' }, { code: 'x' }, { code: 'c' },
    { code: 'v' }, { code: 'b' }, { code: 'n' }, { code: 'm' },
    { code: ',', alt: '<' }, { code: '.', alt: '>' }, { code: '/', alt: '?' }, { code: 'rshift' }
  ],
  [
    { code: 'lctrl' }, { code: 'lwin' }, { code: 'lalt' },
    { code: 'space' }, { code: 'ralt' }, { code: 'rwin' },
    { code: 'rctx' }, { code: 'rctrl' }
  ]
]);

// ── Navigation cluster (right side) ──
const navKeys = [
  [{ code: 'prtsc' }, { code: 'scrlk' }, { code: 'pause' }],
  [{ code: 'ins' }, { code: 'home' }, { code: 'pgup' }],
  [{ code: 'del' }, { code: 'end' }, { code: 'pgdn' }],
  [], // spacer row
];

// ── Function key row ──
const fKeys = [
  { code: 'esc' },
  { code: 'f1' }, { code: 'f2' }, { code: 'f3' }, { code: 'f4' },
  { code: 'f5' }, { code: 'f6' }, { code: 'f7' }, { code: 'f8' },
  { code: 'f9' }, { code: 'f10' }, { code: 'f11' }, { code: 'f12' },
];

const ignoredKeys = new Set([
  'caps', 'tab', 'lshift', 'rshift', 'lctrl', 'rctrl',
  'lalt', 'ralt', 'lwin', 'rwin', 'rctx',
  'prtsc', 'scrlk', 'pause', 'ins', 'home', 'pgup',
  'del', 'end', 'pgdn', 'up', 'down', 'left', 'right',
  'esc', 'f1', 'f2', 'f3', 'f4', 'f5', 'f6',
  'f7', 'f8', 'f9', 'f10', 'f11', 'f12',
]);

// ── Display name overrides ──
const KEY_DISPLAY = {
  prtsc: 'PrtSc', scrlk: 'ScrLk', pause: 'Pause',
  ins: 'Ins', home: 'Home', pgup: 'PgUp',
  del: 'Del', end: 'End', pgdn: 'PgDn',
  esc: 'Esc',
};

// ── Helpers ──
const getKeyDisplay = (key) => KEY_DISPLAY[key] || key;
const isLetterKey = (key) => /^[a-z]$/.test(key);
const isDigitKey = (key) => /^[0-9]$/.test(key);
const isCyclingKey = (key) => isLetterKey(key) || isDigitKey(key);

// ── Build element caches (called once on mount) ──
const buildCaches = () => {
  const allKeys = keyboardElement.value?.querySelectorAll('kbd[data-key]');
  if (!allKeys) return;

  cyclingEntries = [];
  keyElementMap = new Map();

  allKeys.forEach((el) => {
    const code = el.dataset.key;
    keyElementMap.set(code, el);

    if (isLetterKey(code)) {
      cyclingEntries.push({ el, charset: ALPHABET });
    } else if (isDigitKey(code)) {
      cyclingEntries.push({ el, charset: DIGITS });
    }
  });
};

// ── Hover settle / release ──
const settleKeyLabel = (event, key) => {
  if (!isCyclingKey(key)) return;
  const element = event.currentTarget;
  settledKeys.add(element);
  element.classList.add('decoding');
  element.dataset.display = key;
};

const releaseKeyLabel = (event, key) => {
  if (!isCyclingKey(key)) return;
  const element = event.currentTarget;
  settledKeys.delete(element);
  element.classList.remove('decoding');
};

// ── Alphabet cycling (rAF-driven, cached elements) ──
let rafId = null;
let lastCycleTime = 0;
const CYCLE_INTERVAL_MS = 80;

const cycleKeyboardLetters = () => {
  for (let i = 0; i < cyclingEntries.length; i++) {
    const { el, charset } = cyclingEntries[i];
    if (settledKeys.has(el)) continue;
    el.dataset.display = charset[(Math.random() * charset.length) | 0];
  }
};

const cycleLoop = (timestamp) => {
  if (timestamp - lastCycleTime >= CYCLE_INTERVAL_MS) {
    cycleKeyboardLetters();
    lastCycleTime = timestamp;
  }
  rafId = requestAnimationFrame(cycleLoop);
};

const startAlphabetCycle = () => {
  cycleKeyboardLetters();
  lastCycleTime = performance.now();
  rafId = requestAnimationFrame(cycleLoop);
};

// ── Key flash (O(1) lookup via Map) ──
const flashKey = (key) => {
  if (activeElement) {
    activeElement.classList.remove('pressed');
  }

  activeElement = keyElementMap.get(key) ?? null;

  if (activeElement) {
    activeElement.classList.add('pressed');
  }

  clearTimeout(activeKeyTimeout);
  activeKeyTimeout = setTimeout(() => {
    if (activeElement) {
      activeElement.classList.remove('pressed');
      activeElement = null;
    }
  }, 160);
};

// ── Click handler ──
const handleKeyClick = (key) => {
  flashKey(key);

  if (key === 'backspace') {
    typedText.value = typedText.value.slice(0, -1);
  } else if (key === 'space') {
    typedText.value += ' ';
  } else if (!ignoredKeys.has(key)) {
    typedText.value += key;
  }
};

// ── Physical keyboard mapping ──
const physicalKeyMap = {
  Backspace: 'backspace', Tab: 'tab', CapsLock: 'caps', Enter: 'enter',
  ShiftLeft: 'lshift', ShiftRight: 'rshift', ControlLeft: 'lctrl',
  ControlRight: 'rctrl', AltLeft: 'lalt', AltRight: 'ralt',
  MetaLeft: 'lwin', MetaRight: 'rwin', ContextMenu: 'rctx',
  Space: 'space', Backquote: '`', Minus: '-', Equal: '=',
  BracketLeft: '[', BracketRight: ']', Backslash: '\\',
  Semicolon: ';', Quote: "'", Comma: ',', Period: '.', Slash: '/',
  PrintScreen: 'prtsc', ScrollLock: 'scrlk', Pause: 'pause',
  Insert: 'ins', Home: 'home', PageUp: 'pgup',
  Delete: 'del', End: 'end', PageDown: 'pgdn',
  ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right',
  Escape: 'esc',
  F1: 'f1', F2: 'f2', F3: 'f3', F4: 'f4',
  F5: 'f5', F6: 'f6', F7: 'f7', F8: 'f8',
  F9: 'f9', F10: 'f10', F11: 'f11', F12: 'f12',
};

const allKeyCodes = new Set([
  ...keys.value.flat().map(k => k.code),
  ...navKeys.flat().map(k => k.code),
  'up', 'down', 'left', 'right',
  ...fKeys.map(k => k.code),
]);

const handlePhysicalKey = (event) => {
  if (event.repeat) return;

  const mappedKey = physicalKeyMap[event.code] || event.key.toLowerCase();
  if (!allKeyCodes.has(mappedKey)) return;

  previousPhysicalKey = mappedKey;
  flashKey(mappedKey);
};

const clearPhysicalKey = (event) => {
  const mappedKey = physicalKeyMap[event.code] || event.key.toLowerCase();

  if (mappedKey === previousPhysicalKey && activeElement) {
    activeElement.classList.remove('pressed');
    activeElement = null;
    previousPhysicalKey = null;
  }
};

// ── Lifecycle ──
onMounted(() => {
  buildCaches();
  startAlphabetCycle();
  window.addEventListener('keydown', handlePhysicalKey);
  window.addEventListener('keyup', clearPhysicalKey);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handlePhysicalKey);
  window.removeEventListener('keyup', clearPhysicalKey);
  clearTimeout(activeKeyTimeout);
  if (rafId) cancelAnimationFrame(rafId);
  settledKeys.clear();
  cyclingEntries = [];
  keyElementMap.clear();
});
</script>

<style lang="scss" scoped>
@use '../styles.scss' as *;

.glitch-text {
  position: relative;
  animation: glitch-jerkwhole 5s infinite;
}

.glitch-wrapper {
  position: relative;
}

.glitch-base {
  color: inherit;
}

.glitch-overlay {
  position: absolute;
  inset: 0;
  filter: blur(2px);
  color: var(--mx-accent, #45ff8a);
  opacity: 0.8;
  animation: glitch-blur 30ms infinite, glitch-jerk 50ms infinite;
  pointer-events: none;
}

.cursor-pulse {
  animation: pulsing 0.3s infinite;
}

.cursor-glitch {
  animation: pulsing 0.3s infinite, glitch-jerk 50ms infinite;
}

@keyframes pulsing {
  50% { opacity: 0; }
}

@keyframes glitch-blur {
  0%, 100% { opacity: 0.6; filter: blur(1px); }
  50% { opacity: 1; filter: blur(2px); }
}

@keyframes glitch-jerk {
  50% { transform: translateX(3px); }
  51% { transform: translateX(0); }
}

@keyframes glitch-jerkwhole {
  0%, 100% { transform: translate(0, 0); }
  20% { transform: translate(0.2px, -0.2px); }
  40% { transform: translate(-0.2px, 0.2px); }
  60% { transform: translate(0.2px, 0); }
  80% { transform: translate(-0.2px, 0); }
}
</style>
