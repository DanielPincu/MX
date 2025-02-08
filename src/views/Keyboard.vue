

<template>
  <div class="w-fit">
    <div class="keyboard-container">
    <!-- Display typed text here -->
    <h1 class="text-6xl w-[100px] typed-text"><span>{{ typedText }}</span><span class="animate-pulsing">|</span></h1>
    <div class="keyboard">
      <div class="row">
        <kbd tabindex="1" data-key="`" data-alt="~" @click="handleKeyClick('`')"></kbd>
        <kbd data-key="1" data-alt="!" @click="handleKeyClick('1')"></kbd>
        <kbd data-key="2" data-alt="@" @click="handleKeyClick('2')"></kbd>
        <kbd data-key="3" data-alt="#" @click="handleKeyClick('3')"></kbd>
        <kbd data-key="4" data-alt="$" @click="handleKeyClick('4')"></kbd>
        <kbd data-key="5" data-alt="%" @click="handleKeyClick('5')"></kbd>
        <kbd data-key="6" data-alt="^" @click="handleKeyClick('6')"></kbd>
        <kbd data-key="7" data-alt="&" @click="handleKeyClick('7')"></kbd>
        <kbd data-key="8" data-alt="*" @click="handleKeyClick('8')"></kbd>
        <kbd data-key="9" data-alt="(" @click="handleKeyClick('9')"></kbd>
        <kbd data-key="0" data-alt=")" @click="handleKeyClick('0')"></kbd>
        <kbd data-key="-" data-alt="_" @click="handleKeyClick('-')"></kbd>
        <kbd data-key="=" data-alt="+" @click="handleKeyClick('=')"></kbd>
        <kbd data-key="backspace" @click="handleKeyClick('Backspace')"></kbd>
      </div>
      <div class="row">
        <kbd data-key="tab" @click="handleKeyClick('Tab')"></kbd>
        <kbd data-key="q" @click="handleKeyClick('q')"></kbd>
        <kbd data-key="w" @click="handleKeyClick('w')"></kbd>
        <kbd data-key="e" @click="handleKeyClick('e')"></kbd>
        <kbd data-key="r" @click="handleKeyClick('r')"></kbd>
        <kbd data-key="t" @click="handleKeyClick('t')"></kbd>
        <kbd data-key="y" @click="handleKeyClick('y')"></kbd>
        <kbd data-key="u" @click="handleKeyClick('u')"></kbd>
        <kbd data-key="i" @click="handleKeyClick('i')"></kbd>
        <kbd data-key="o" @click="handleKeyClick('o')"></kbd>
        <kbd data-key="p" @click="handleKeyClick('p')"></kbd>
        <kbd data-key="[" data-alt="{" @click="handleKeyClick('[')"></kbd>
        <kbd data-key="]" data-alt="}" @click="handleKeyClick(']')"></kbd>
        <kbd data-key="\" data-alt="|" id="backslash" @click="handleKeyClick('\\')"></kbd>
      </div>
      <div class="row">
        <kbd data-key="caps" @click="handleKeyClick('Caps')"></kbd>
        <kbd data-key="a" @click="handleKeyClick('a')"></kbd>
        <kbd data-key="s" @click="handleKeyClick('s')"></kbd>
        <kbd data-key="d" @click="handleKeyClick('d')"></kbd>
        <kbd data-key="f" @click="handleKeyClick('f')"></kbd>
        <kbd data-key="g" @click="handleKeyClick('g')"></kbd>
        <kbd data-key="h" @click="handleKeyClick('h')"></kbd>
        <kbd data-key="j" @click="handleKeyClick('j')"></kbd>
        <kbd data-key="k" @click="handleKeyClick('k')"></kbd>
        <kbd data-key="l" @click="handleKeyClick('l')"></kbd>
        <kbd data-key=";" data-alt=":" @click="handleKeyClick(';')"></kbd>
        <kbd data-key="'" data-alt='"' id="quote" @click="handleKeyClick('\'')"></kbd>
        <kbd data-key="enter" @click="handleKeyClick('Enter')"></kbd>
      </div>
      <div class="row">
        <kbd data-key="lshift" @click="handleKeyClick('Shift')"></kbd>
        <kbd data-key="z" @click="handleKeyClick('z')"></kbd>
        <kbd data-key="x" @click="handleKeyClick('x')"></kbd>
        <kbd data-key="c" @click="handleKeyClick('c')"></kbd>
        <kbd data-key="v" @click="handleKeyClick('v')"></kbd>
        <kbd data-key="b" @click="handleKeyClick('b')"></kbd>
        <kbd data-key="n" @click="handleKeyClick('n')"></kbd>
        <kbd data-key="m" @click="handleKeyClick('m')"></kbd>
        <kbd data-key="," data-alt="<" @click="handleKeyClick(',')"></kbd>
        <kbd data-key="." data-alt=">" @click="handleKeyClick('.')"></kbd>
        <kbd data-key="/" data-alt="?" @click="handleKeyClick('/')"></kbd>
        <kbd data-key="rshift" @click="handleKeyClick('Shift')"></kbd>
      </div>
      <div class="row">
        <kbd data-key="lctrl" @click="handleKeyClick('Ctrl')"></kbd>
        <kbd data-key="lwin" @click="handleKeyClick('Win')"></kbd>
        <kbd data-key="lalt" @click="handleKeyClick('Alt')"></kbd>
        <kbd data-key="space" @click="handleKeyClick(' ')"></kbd>
        <kbd data-key="ralt" @click="handleKeyClick('Alt')"></kbd>
        <kbd data-key="rwin" @click="handleKeyClick('Win')"></kbd>
        <kbd data-key="rctx" @click="handleKeyClick('Context')"></kbd>
        <kbd data-key="rctrl" @click="handleKeyClick('Ctrl')"></kbd>
      </div>
    </div>
  </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';

const typedText = ref('About me');

// Handle key click events
const handleKeyClick = (key) => {
  if (key === 'Backspace') {
    typedText.value = typedText.value.slice(0, -1);
  } else {
    typedText.value += key;
  }

  // Save the text to localStorage
  saveToLocalStorage(typedText.value);
};

// Save typed text to localStorage
const saveToLocalStorage = (text) => {
  localStorage.setItem('typedText', text);
};

// Retrieve data from localStorage on page load
const fetchFromLocalStorage = () => {
  const savedText = localStorage.getItem('typedText');
  if (savedText) {
    typedText.value = savedText;
  }
};

// Fetch the saved text when the component mounts
onMounted(() => {
  fetchFromLocalStorage();
});
</script>


<style scoped>
@import './styles.scss';
</style>
