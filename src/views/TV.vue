<template>
  <section >
    <div class="wrapper">
      <div class="gif-tv">
        <div id="gif_tv_viewport" class="viewport">
          <img id="gif_tv_video" class="video" :src="currentChannelURL" />
          <div
            id="gif_tv_pixels"
            class="pixels"
            :style="{ backgroundImage: 'url(' + overlayImage + ')' }"
          ></div>
          <div class="meta-left">
            <span id="gif_tv_message_channel">{{ channelMessage }}</span>
          </div>
        </div>
        <img
          class="tv"
          :src=tv
        />

        <button
          id="gif_tv_button_channel"
          class="dial animate-pulse"
          title="Change the Channels"
          @click="changeChannel('up')"
          @contextmenu.prevent="changeChannel('down')"
        ></button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import ddd from '@/assets/ddd.jpeg';
import tv from '@/assets/tv.png';
import overlay from '@/assets/overlay.png';
import gif1 from '@/assets/gif1.gif';
import gif2 from '@/assets/gif2.gif';
import gif3 from '@/assets/gif3.gif';
import gif4 from '@/assets/gif4.gif';
const gifTVURLs = [
  ddd,
  gif1,
  gif2,
  gif3,
  gif4,
  'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMG85dW04c3djOXZld3B6Z25qZ3d2MjQ3cmZ3eTd6eHpreno5eXI0ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT9IgzoKnwFNmISR8I/giphy.gif',
  
  
  'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGg3b3hjN3NuMm14ZzE1eWQyMDZoZWRzeWx2NXNybnZjZGFyd3h3NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/GjzVGmqTfzRIc/giphy.gif',

  'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeDBsdm9kaWF2Y200cno2bXF3dWtpN2JnZWRqZHcxcW92NnExdmpybCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KlrMS4vyq5KSY/giphy.gif',

  'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzlpYmpvZGJvdHIxMWJrdzliaXUyaHR6OWE4NmNlazJrOHU4MHk1dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1HQ0xMcxsSECY/giphy.gif',

  'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjM0NGFmbTE5Ynh5ZjIxeml3dHdud2YxNmlqcWhkcW9qN3FzcmdrMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/AqV8uSb8ptxyo7Wyog/giphy.gif'
 
  
];

const currentChannelURL = ref(gifTVURLs[0]);
const overlayImage = overlay;

const channelMessage = ref('');

const dial = {
  channel: {
    currentIndex: 0,
  },
};

function updateMessage(key, message) {
  switch (key) {
    case 'channel':
      channelMessage.value = message;
      break;
  }
}

function leadingZero(num, size) {
  let int = num + '';
  while (int.length < size) int = '0' + int;
  return int;
}

function changeChannel(direction) {
  const updateChannelMessage = () => {
    let channelIndex = leadingZero(dial.channel.currentIndex + 1, 2);
    updateMessage('channel', `CH ${channelIndex}`);
  };

  switch (direction) {
    case 'up':
      dial.channel.currentIndex =
        dial.channel.currentIndex === gifTVURLs.length - 1 ? 0 : dial.channel.currentIndex + 1;
      updateChannelMessage();
      break;
    case 'down':
      dial.channel.currentIndex =
        dial.channel.currentIndex === 0 ? gifTVURLs.length - 1 : dial.channel.currentIndex - 1;
      updateChannelMessage();
      break;
    default:
      dial.channel.currentIndex =
        dial.channel.currentIndex === gifTVURLs.length - 1 ? 0 : dial.channel.currentIndex + 1;
      updateChannelMessage();
  }

  setTimeout(() => {
    currentChannelURL.value = gifTVURLs[dial.channel.currentIndex];
  }, 50);
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
      font-size: 4rem;
      font-family: VT323;
    }
    span:not(.active) {
      display: none;
    }
    span.active {
      display: block;
    }
  }

  button.dial {
    display: block;
    position: absolute;
    left: 85.6%;
    transform: translateY(-50%);
    padding: 0;
    border-radius: 50%;
    border: #f40505 solid 5px;
    background-color: transparent;
    width: 10.2%;
    line-height: 0;
    cursor: pointer;
    transition: all 200ms ease-in-out;

    &:hover,
    &:focus {
      outline: none;
    }
    
    &:hover {
      border-color: #ff5900;
    }

    &:active {
      border-color: #f00e25;
    }
    
    &::before {
      display: block;
      width: 100%;
      padding-top: 100%;
      content: '';
    }
  }

  button#gif_tv_button_channel { top: 56.3%; }
}
</style>
