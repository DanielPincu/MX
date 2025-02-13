<template>
  <div>
    <h1 class="typed-text">
      <span class="text-6xl">{{ typedText }}</span><span class="animate-pulsing text-6xl">|</span>
    </h1>
    <div class="keyboard">
      <div v-for="(row, rowIndex) in keys" :key="rowIndex" class="row">
        <kbd
          v-for="(key, keyIndex) in row"
          :key="keyIndex"
          :data-key="key.code"
          :data-alt="key.alt || null"
          @click="handleKeyClick(key.code)"
        >
        </kbd>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';

const typedText = ref('About me');

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

const handleKeyClick = (key) => {
  nextTick(() => {
    if (key === 'backspace') {
      typedText.value = typedText.value.slice(0, -1);
    } else if (key !== 'caps' && key !== 'tab' && key !== 'shift' && key !== 'ctrl' && key !== 'alt' && key !== 'win' && key !== 'rctx') {
      typedText.value += key;
    }
  });
};
</script>

<style lang="scss" scoped>
@import '../styles.scss';

@keyframes pulsing {
  50% { opacity: 0; }
}

.animate-pulsing {
  animation: pulsing 0.3s infinite;
}
</style>
