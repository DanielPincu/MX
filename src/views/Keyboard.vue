<template>
  <div class="matrix-keyboard-rig">
    <h1 class="typed-text pt-32 pb-2 glitch-text">
      <span :ref="setRef" class="glitch-wrapper text-3xl md:text-5xl lg:text-6xl">
        <span class="glitch-base">{{ typedText }}<span class="cursor-pulse">|</span></span>
        <span aria-hidden="true" class="glitch-overlay">{{ typedText }}<span class="cursor-glitch">|</span></span>
      </span>
    </h1>
    <div ref="keyboardElement" class="keyboard" role="application" aria-label="Interactive Matrix keyboard">
      <div class="keyboard__bezel">
        <p>Schrödinger's Keyboard</p>
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
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useScrollType } from '@/composables/useScrollType';

const { displayedText: typedText, setRef } = useScrollType('There is no spoon...');
const keyboardElement = ref(null);
let activeKeyTimeout = null;
let activeElement = null;
let previousPhysicalKey = null;
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
const digits = '0123456789'.split('');
const settledKeys = new Set();
let alphabetCycleTimer = null;

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

const ignoredKeys = new Set([
  'caps',
  'tab',
  'lshift',
  'rshift',
  'lctrl',
  'rctrl',
  'lalt',
  'ralt',
  'lwin',
  'rwin',
  'rctx',
]);

const getKeyDisplay = (key) => key;

const isLetterKey = (key) => /^[a-z]$/.test(key);
const isDigitKey = (key) => /^[0-9]$/.test(key);
const isCyclingKey = (key) => isLetterKey(key) || isDigitKey(key);

const settleKeyLabel = (event, key) => {
  if (!isCyclingKey(key)) {
    return;
  }

  const element = event.currentTarget;
  settledKeys.add(element);
  element.classList.add('decoding');
  element.dataset.display = key;
};

const releaseKeyLabel = (event, key) => {
  if (!isCyclingKey(key)) {
    return;
  }

  const element = event.currentTarget;
  settledKeys.delete(element);
  element.classList.remove('decoding');
};

const cycleKeyboardLetters = () => {
  const letterKeys = keyboardElement.value?.querySelectorAll('kbd[data-key]');

  letterKeys?.forEach((element) => {
    if (!isCyclingKey(element.dataset.key) || settledKeys.has(element)) {
      return;
    }

    const characterSet = isDigitKey(element.dataset.key) ? digits : alphabet;
    const randomIndex = Math.floor(Math.random() * characterSet.length);
    element.dataset.display = characterSet[randomIndex];
  });
};

const startAlphabetCycle = () => {
  cycleKeyboardLetters();
  alphabetCycleTimer = setInterval(cycleKeyboardLetters, 70);
};

const flashKey = (key) => {
  if (activeElement) {
    activeElement.classList.remove('pressed');
  }

  activeElement = [...(keyboardElement.value?.querySelectorAll('kbd') ?? [])]
    .find(element => element.dataset.key === key);

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

const physicalKeyMap = {
  Backspace: 'backspace',
  Tab: 'tab',
  CapsLock: 'caps',
  Enter: 'enter',
  ShiftLeft: 'lshift',
  ShiftRight: 'rshift',
  ControlLeft: 'lctrl',
  ControlRight: 'rctrl',
  AltLeft: 'lalt',
  AltRight: 'ralt',
  MetaLeft: 'lwin',
  MetaRight: 'rwin',
  ContextMenu: 'rctx',
  Space: 'space',
  Backquote: '`',
  Minus: '-',
  Equal: '=',
  BracketLeft: '[',
  BracketRight: ']',
  Backslash: '\\',
  Semicolon: ';',
  Quote: "'",
  Comma: ',',
  Period: '.',
  Slash: '/',
};

const handlePhysicalKey = (event) => {
  if (event.repeat) {
    return;
  }

  const mappedKey = physicalKeyMap[event.code] || event.key.toLowerCase();
  previousPhysicalKey = mappedKey;
  const hasKey = keys.value.some(row => row.some(key => key.code === mappedKey));

  if (hasKey) {
    flashKey(mappedKey);
  }
};

const clearPhysicalKey = (event) => {
  const mappedKey = physicalKeyMap[event.code] || event.key.toLowerCase();

  if (mappedKey === previousPhysicalKey && activeElement) {
    activeElement.classList.remove('pressed');
    activeElement = null;
    previousPhysicalKey = null;
  }
};

onMounted(() => {
  startAlphabetCycle();
  window.addEventListener('keydown', handlePhysicalKey);
  window.addEventListener('keyup', clearPhysicalKey);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handlePhysicalKey);
  window.removeEventListener('keyup', clearPhysicalKey);
  clearTimeout(activeKeyTimeout);
  clearInterval(alphabetCycleTimer);
  settledKeys.clear();
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
