<template>
  <div>
    <p class="text-slate-400 inline-block" v-html="output"></p><span class="inline-block text-slate-400 animate-pulsing">|</span>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const str = 'My name is Daniel Pincu';
const arr = [1, 2, 3, 4, 5, 6, 7, 8];
const obj = str; // You can switch between `str` or `arr` here.
const direction = 'h'; // 'h' for horizontal, 'v' for vertical
const delay = 100; // Set delay in milliseconds, 0 uses the default values

const output = ref('');

const splitStr = (s) => s.split(''); // Convert string to character array
const writeIt = (ele, object, index, dir) => {
  ele.innerHTML += object[index];
  if (dir === 'v') {
    ele.innerHTML += '<br />';
  }
};

const init = () => {
  let newObj = Array.isArray(obj) ? obj : splitStr(obj);
  let dly = delay > 0 ? delay : (direction === 'v' ? 1000 : 150);
  let result = '';

  for (let i = 0; i < newObj.length; i++) {
    setTimeout(() => {
      result += newObj[i];
      if (direction === 'v') {
        result += '<br />';
      }
      output.value = result; // Update the output for reactivity
    }, i * dly); // Delay logic
  }
};

onMounted(() => {
  init();
});
</script>

<style scoped>
</style>
