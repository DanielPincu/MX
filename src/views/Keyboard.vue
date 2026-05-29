<template>
  <div class="matrix-keyboard-rig">
    <h1 class="typed-text py-12">
      <span class="text-6xl">{{ typedText }}</span><span class="animate-pulsing text-6xl">|</span>
    </h1>
    <div ref="keyboardElement" class="keyboard" role="application" aria-label="Interactive Matrix keyboard">
      <div class="keyboard__bezel">
        <p>nebuchadnezzar</p>
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

const typedText = ref('The Matrix has you...');
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

@keyframes pulsing {
  50% { opacity: 0; }
}

.animate-pulsing {
  animation: pulsing 0.3s infinite;
}
</style>
