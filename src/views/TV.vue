<template>
  <section>
    <div class="wrapper">
      <div class="gif-tv">
        <div id="gif_tv_viewport" class="viewport">
          <img id="gif_tv_video" class="video" :src="currentChannelURL" />
          <div
            id="gif_tv_pixels"
            class="pixels"
            
          ></div>
          <div class="meta-left">
            <span id="gif_tv_message_channel">{{ channelMessage }}</span>
          </div>
        </div>
        <img
          class="tv"
          :src="tv"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import ddd from '@/assets/ddd.jpeg';
import tv from '@/assets/tvweb.webp';
import gif1 from '@/assets/gif1.webp';
import gif2 from '@/assets/gif2.webp';
import gif3 from '@/assets/gif3.webp';
import gif4 from '@/assets/gif4.webp';
import xploading from '@/assets/xploading.gif';
import code from '@/assets/code.gif';
import error from '@/assets/error.gif';
import xp from '@/assets/xp.gif';

const gifTVURLs = [
  xp,
  ddd,
  gif1,
  gif2,
  gif3,
  gif4,
  code,
  error,
  xploading,
];

const currentChannelURL = ref(gifTVURLs[0]);
const channelMessage = ref('Matrix TV');

// Preload the GIFs to avoid delays
const preloadImages = () => {
  gifTVURLs.forEach(url => {
    const img = new Image();
    img.src = url;
  });
};

// Start auto channel change
let channelChangeInterval;

onMounted(() => {
  preloadImages(); // Preload images

  // Start changing channels automatically every 5 seconds
  channelChangeInterval = setInterval(() => {
    changeChannel();
  }, 5500);
});

function changeChannel() {
  const nextIndex = (gifTVURLs.indexOf(currentChannelURL.value) + 1) % gifTVURLs.length;
  currentChannelURL.value = gifTVURLs[nextIndex];
  channelMessage.value = `Reality Channel ${nextIndex - 1}`;
}
</script>


<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto|VT323&display=swap');

img {
  display: block;
  width: 100%;
  height: auto;
}

.section {
  padding-top: 3rem;
  padding-bottom: 3rem;
}
.gutter {
  padding-right: 2rem;
  padding-left: 2rem;
}
.wrapper {
  max-width: 1080px;
  margin: auto;
}

.gif-tv {
  position: relative;
  margin-right: 1rem;

  .viewport {
    position: absolute;
    top: 9%;
    right: 26%;
    bottom: 15%;
    left: 7%;
    background: #161616;
    z-index: -1;
    overflow: hidden;

    .video {
      z-index: 0;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .pixels {
      z-index: 1;
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      content: '';
    }

    .meta-left {
      display: flex;
      flex-flow: column;
      position: absolute;
      z-index: 2;
      top: 0;
      bottom: 0;
      width: 50%;
      padding: 4% 6%;
      align-items: flex-start;
      left: 0;
      right: unset;
    }
    
    span {
      text-shadow: 0 0 3px #888;
      font-size: 12px;
      font-family: VT323;
    }
  }

  img.tv {
    max-width: 100%;
  }
}
</style>
