<template>
  <main class="">
    <h1 class="z-40 text-3xl relative text-center pt-10">Latest projects</h1>
    <ul class='slider' ref="slider">
      <li v-for="(item, index) in items" :key="index" class='item' :style="{ backgroundImage: `url('${item.image}')` }">
        <div class='content'>
          <h2 class='title'>{{ item.title }}</h2>
          <p class='description'>{{ item.description }}</p>
          <button>Read More</button>
        </div>
      </li>
    </ul>
    <nav class='nav'>
      <ion-icon class='btn prev' name="arrow-back-outline" @click="activate('prev')"></ion-icon>
      <ion-icon class='btn next' name="arrow-forward-outline" @click="activate('next')"></ion-icon>
    </nav>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ddd from '@/assets/test.jpeg';


const slider = ref(null);
const items = ref([
  {
    image: ddd,
    title: '"Lossless Youths"',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.'
  },
  {
    image: 'https://i.redd.it/tc0aqpv92pn21.jpg',
    title: '"Estrange Bond"',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.'
  },
  {
    image: 'https://wharferj.files.wordpress.com/2015/11/bio_north.jpg',
    title: '"The Gate Keeper"',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.'
  },
  {
    image: 'https://images7.alphacoders.com/878/878663.jpg',
    title: '"Last Trace Of Us"',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.'
  },
  {
    image: 'https://theawesomer.com/photos/2017/07/simon_stalenhag_the_electric_state_6.jpg',
    title: '"Urban Decay"',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.'
  },
  {
    image: 'https://da.se/app/uploads/2015/09/simon-december1994.jpg',
    title: '"The Migration"',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.'
  }
]);

const activate = (direction) => {
  const sliderElement = slider.value;
  const sliderItems = sliderElement.querySelectorAll('.item');
  if (direction === 'next') {
    sliderElement.append(sliderItems[0]);
  } else if (direction === 'prev') {
    sliderElement.prepend(sliderItems[sliderItems.length - 1]);
  }
};

onMounted(() => {
  // Any initialization code if needed
});
</script>

<style scoped>



main {
  position: relative;
  top: 100px;
  max-width: 100vw;
  height: 60vh;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0,0,0,0.3);
}

.item {
  width: 200px;
  height: 300px;
  list-style-type: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  background-position: center;
  background-size: cover;
  border-radius: 20px;
  box-shadow: 0 20px 30px rgba(255,255,255,0.3) inset;
  transition: transform 0.1s, left 0.75s, top 0.75s, width 0.75s, height 0.75s;
}

.item:nth-child(1), .item:nth-child(2) {
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transform: none;
  border-radius: 0;
  box-shadow: none;
  opacity: 1;
}

.item:nth-child(3) { left: 50%; }
.item:nth-child(4) { left: calc(50% + 220px); }
.item:nth-child(5) { left: calc(50% + 440px); }
.item:nth-child(6) { left: calc(50% + 660px); opacity: 0; }

.content {
  width: min(30vw, 400px);
  position: absolute;
  top: 50%;
  left: 3rem;
  transform: translateY(-50%);
  font: 400 0.85rem helvetica, sans-serif;
  color: white;
  text-shadow: 0 3px 8px rgba(0,0,0,0.5);
  opacity: 0;
  display: none;
}

.content .title {
  font-family: 'arial-black';
  text-transform: uppercase;
}

.content .description {
  line-height: 1.7;
  margin: 1rem 0 1.5rem;
  font-size: 0.8rem;
}

.content button {
  width: fit-content;
  background-color: rgba(0,0,0,0.1);
  color: white;
  border: 2px solid white;
  border-radius: 0.25rem;
  padding: 0.75rem;
  cursor: pointer;
}

.item:nth-of-type(2) .content {
  display: block;
  animation: show 0.75s ease-in-out 0.3s forwards;
}

@keyframes show {
  0% {
    filter: blur(5px);
    transform: translateY(calc(-50% + 75px));
  }
  100% {
    opacity: 1;
    filter: blur(0);
  }
}

.nav {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
  user-select: none;
}

.nav .btn {
  background-color: rgba(255,255,255,0.5);
  color: rgba(0,0,0,0.7);
  border: 2px solid rgba(0,0,0,0.6);
  margin: 0 0.25rem;
  padding: 0.75rem;
  border-radius: 50%;
  cursor: pointer;
}

.nav .btn:hover {
  background-color: rgba(255,255,255,0.3);
}

@media (max-width: 900px) and (min-width: 650px) {
  .content .title { font-size: 1rem; }
  .content .description { font-size: 0.7rem; }
  .content button { font-size: 0.7rem; }
  .item {
    width: 160px;
    height: 270px;
  }
  .item:nth-child(3) { left: 50%; }
  .item:nth-child(4) { left: calc(50% + 170px); }
  .item:nth-child(5) { left: calc(50% + 340px); }
  .item:nth-child(6) { left: calc(50% + 510px); opacity: 0; }
}

@media (max-width: 650px) {
  .content .title { font-size: 0.9rem; }
  .content .description { font-size: 0.65rem; }
  .content button { font-size: 0.7rem; }
  .item {
    width: 130px;
    height: 220px;
  }
  .item:nth-child(3) { left: 50%; }
  .item:nth-child(4) { left: calc(50% + 140px); }
  .item:nth-child(5) { left: calc(50% + 280px); }
  .item:nth-child(6) { left: calc(50% + 420px); opacity: 0; }
}
</style>
