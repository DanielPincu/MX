<template>
  <section >
    <div class="wrapper cursor-pointer" @click="changeChannel('up')"
    @contextmenu.prevent="changeChannel('down')">
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
          class="dial"
          title="Change the Channels"
          @click="changeChannel('up')"
          @contextmenu.prevent="changeChannel('down')"
        ></button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import ddd from '@/assets/ddd.jpeg';
import tv from '@/assets/tv.png';
import overlay from '@/assets/overlay.png';
import gif1 from '@/assets/gif1.gif';
import gif2 from '@/assets/gif2.gif';
import gif3 from '@/assets/gif3.gif';
import gif4 from '@/assets/gif4.gif';
import xp from '@/assets/xp.gif';

const gifTVURLs = [
  'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXdoYnpvNnE4MGo5YmZ1a3RqczIyb2picjM4aGRpMms2dXY4Z2p1ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LbSdXQbS0XVVC/giphy.gif',
  ddd,
  gif1,
  gif2,
  gif3,
  gif4,
  'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMG85dW04c3djOXZld3B6Z25qZ3d2MjQ3cmZ3eTd6eHpreno5eXI0ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT9IgzoKnwFNmISR8I/giphy.gif',
  'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeDBsdm9kaWF2Y200cno2bXF3dWtpN2JnZWRqZHcxcW92NnExdmpybCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KlrMS4vyq5KSY/giphy.gif',
  'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXdoYnpvNnE4MGo5YmZ1a3RqczIyb2picjM4aGRpMms2dXY4Z2p1ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LbSdXQbS0XVVC/giphy.gif',
  
  
];

const currentChannelURL = ref(gifTVURLs[0]);
const overlayImage = '';

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
  });
}

// Start auto channel change
let channelChangeInterval;

onMounted(() => {
  // Start changing channels automatically every 1 second
  channelChangeInterval = setInterval(() => {
    changeChannel('up');
  }, 5000);
});

onBeforeUnmount(() => {
  // Clean up the interval when the component is unmounted
  clearInterval(channelChangeInterval);
});
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
  border: #f9f3f3 solid 2px;
  background-color: transparent;
  width: 10.2%;
  line-height: 0;
  cursor: pointer;
  transition: all 100ms ease-in-out;
  overflow: hidden;

  /* Add your image here */
  // background-image: url('https://www.svgrepo.com/show/500134/white-rabbit.svg');
  opacity: 0.2;
  background-size: cover; 
  &:hover,
  &:focus {
    outline: none;
  }
  
  &:hover {
    border-color: #f8f6f5;
  }

  &:active {
    border-color: #faf8f8;
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

@keyframes ping {
    75%, 100% {
        transform: scale(3);
        opacity: 0;
    }
}
.animate-ping {
    animation: ping 3s cubic-bezier(0, 0, 0.2, 3) infinite;
}


</style>
