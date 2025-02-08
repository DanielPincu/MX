<template>
  <div class="error-page md:h-[1500px] h-[1000px] relative">
    <div class="noise"></div>
    <div class="overlay"></div>
    <canvas ref="matrixCanvas" class="absolute top-0 left-0 w-full h-full"></canvas>
    <div class="terminal p-5">
      <div class="md:pb-0 pb-32">

        <div class="md:flex hidden justify-center pb-5">
              <Keyboard />
          </div>

        <div class="glitch-text md:hidden block text-[50px]">
          <span>About me</span>
        </div>
        <div class="glitch-scanline">The Matrix has you!</div>
      </div>
      <h2 class="text-4xl md:hidden block">Hey<span class="text-4xl animate-pulsing">|</span></h2>
      

      <div class="grid grid-cols-1">
        <div>
          <p class="output text-2xl">I’m Daniel Pincu, a web developer who bends the fabric of the digital world. Behind every line of code lies a choice: to remain in the known, or to break free into the unknown. I build experiences that shift the balance, pulling users into a space where form and function converge in perfect harmony. The red pill whispers of transformation, where every interaction is a new possibility. The blue pill offers comfort, grounding users in a familiar, flowing reality. From front-end to back-end, I shape the unseen, crafting environments that move, adapt, and connect. Welcome to a world beyond code—where the web is not just built, but awakened.</p>
        </div>
        <div>
          
        </div>
      </div>

      <div class="hidden xl:block">
        <h1>My Internet Periodic Table</h1>
        <h5>How I waste my time on the Internet</h5>

        <div class="periodic-table">
          <div class="empty-spacer-1"></div>
          <div class="empty-spacer-2"></div>

          <!-- Periodic Elements -->
          <div v-for="(item, index) in elements" :key="index" :class="item.classes" :data-description="item.description" class="periodic-element">
            <div class="periodic-element-inner">
              <div class="title">{{ item.title }}</div>
              <div class="description">{{ item.descriptionText }}</div>
            </div>
          </div>
        </div>

        <!-- Legend Table -->
        <div class="legend-table">
          <div class="legend-table__wrapper">
            <span class="legend-table__marker social-media"></span>
            <span class="legend-table__text">Social Media</span>
            <span class="legend-table__marker intense-work"></span>
            <span class="legend-table__text">Serious Work</span>
            <span class="legend-table__marker just-trying"></span>
            <span class="legend-table__text">Personal Development</span>
            <span class="legend-table__marker fun-stuff"></span>
            <span class="legend-table__text">Fun Stuff</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  
</template>

<script setup>
import Keyboard from './Keyboard.vue';
import { ref, onMounted, onUnmounted } from 'vue';

const matrixCanvas = ref(null);
let matrixAnimationId = null;
const matrixStr = "А+Б0В-Г1Д=Е2Ё Ж3З И4Й К5Л М6Н О7П Р8С Т9У Ф!Х Ц?Ч Ш.ЩЪ,Ы Ь:ЭЮ;Я";
const matrixChars = matrixStr.split("");
let matrixCtx, matrixWidth, matrixHeight, matrixFont, matrixColumns, matrixDrops;

const initMatrixCanvas = () => {
  const canvas = matrixCanvas.value;
  matrixCtx = canvas.getContext("2d");
  matrixWidth = canvas.width = window.innerWidth;
  matrixHeight = canvas.height = window.innerHeight;
  matrixFont = 7;
  matrixColumns = matrixWidth / matrixFont;
  matrixDrops = new Array(Math.ceil(matrixColumns)).fill(1);
};

const drawMatrix = () => {
  matrixCtx.fillStyle = "rgba(0,0,0,.02)";
  matrixCtx.fillRect(0, 0, matrixWidth, matrixHeight);
  matrixCtx.fillStyle = "#0f0";
  matrixCtx.font = matrixFont + "px system-ui";
  for (let i = 0; i < matrixDrops.length; i++) {
    let txt = matrixChars[Math.floor(Math.random() * matrixChars.length)];
    matrixCtx.fillText(txt, i * matrixFont, matrixDrops[i] * matrixFont);
    if (matrixDrops[i] * matrixFont > matrixHeight && Math.random() > 0.9999) matrixDrops[i] = 0;
    matrixDrops[i]++;
  }
  matrixAnimationId = requestAnimationFrame(drawMatrix);
};

onMounted(() => {
  initMatrixCanvas();
  drawMatrix();
});

onUnmounted(() => {
  cancelAnimationFrame(matrixAnimationId);
});

const elements = [
  { title: 'Li', descriptionText: 'LinkedIn', classes: 'social-media', description: "I'm only on here to reject invitations 😂" },
  { title: 'Fb', descriptionText: 'Facebook', classes: 'social-media', description: "Only so I don't miss out on my friends' milestones 🤷" },
  { title: 'Db', descriptionText: 'Dribbble', classes: 'just-trying', description: "Looking at amazing Dribbble 🏀 shots and internally die from the amount of talent/skill out there" },
  { title: 'Ct', descriptionText: 'Commits', classes: 'intense-work', description: "Coming up with sassy commit messages 🔥" },
  { title: 'Sl', descriptionText: 'Slack', classes: 'intense-work', description: "Making custom emojis for Slack 💪🏻" },
  { title: 'Wk', descriptionText: 'Wikipedia', classes: 'fun-stuff', description: "'Wikipedia Wormhole' is a thing. And it is dangerous 🐛" },
  { title: 'Sp', descriptionText: 'Spotify', classes: 'fun-stuff', description: "Choosing the right playlist. (If my Spotify is working... it's always not working)" },
  { title: 'Tw', descriptionText: 'Twitter', classes: 'social-media', description: "If you say something witty, it's going on my Twitter 🐦", href: "https://twitter.com/meowlivia_" },
  { title: 'Tc', descriptionText: 'Twitch', classes: 'social-media', description: "Professional Dota 2 Watcher right here ✌️" },
  { title: 'Gt', descriptionText: 'GitHub', classes: 'intense-work', description: "Creating GitHub issues, a.k.a. tossing problems which I can solve to the frontend team" },
  { title: 'Yn', descriptionText: 'Yarn', classes: 'intense-work', description: "Trying to get yarn working after an update. The main reason I toss issues to the frontend team." },
  { title: 'Il', descriptionText: 'Illustration', classes: 'just-trying', description: "A skill I'm trying to learn 🎨... and failing to learn 😛" },
  { title: 'Te', descriptionText: 'TellyStats', classes: 'just-trying', description: "Resident Designer. Keeping the diminishing flame of web design in me alive 🕯️", href: "https://tellystats.com" },
  { title: 'Wu', descriptionText: 'Wunderlist', classes: 'just-trying', description: "I just need to stop adding items and actually start doing things. Am I the only one who is still using Wunderlist? 😂" },
  { title: 'Cv', descriptionText: 'Cooking', classes: 'fun-stuff', description: "I have zero cooking skills, so I watch cooking videos and never try cooking for real 🍳" },
  { title: 'Dg', descriptionText: 'Dog Gifs', classes: 'fun-stuff', description: "Or any animal gifs, basically. 🐈🐕🦊🦔🦉🐍🐬🦄" },
  { title: 'Tg', descriptionText: 'Toggl Blog', classes: 'fun-stuff', description: "Getting distracted by Toggl comics 🙃", href: "https://blog.toggl.com" },
  { title: 'Gg', descriptionText: 'Google', classes: 'just-trying', description: "I google every damn thing. Including movie spoilers. While watching the movie. Yes." },
  { title: 'Ex', descriptionText: 'Excel', classes: 'just-trying', description: "I like spreadsheets so I create them for the smallest reasons 🧐", href: "https://docs.google.com/spreadsheets/d/1Dim2nKRjgpkjA4miqTzcLPT68L0B5LU2aWZWF5hHYAc/edit#gid=0" },
  { title: 'So', descriptionText: 'StackOv.', classes: 'intense-work', description: "I still StackOverflow the simplest shit 'just to be sure'. Where will we be without it ❤️" },
  { title: 'Cd', descriptionText: 'Coding', classes: 'intense-work', description: "It's very much not my job, but sometimes I stick my hand into the Coding Projects jar 🍪 anyway" },
  { title: 'Cp', descriptionText: 'Codepen', classes: 'just-trying', description: "I spend so much time on Codepen, I decided to go Pro because I felt bad 💸" },
  { title: 'Tr', descriptionText: 'Travel', classes: 'just-trying', description: "We all have that one thing that keeps us alive 🛫🗺️" },
  { title: 'In', descriptionText: 'Instagram', classes: 'social-media', description: "Fuck this app. It's a terrible love-hate relationship.", href: "https://www.instagram.com/meowliviaaa/" },
  { title: 'Mu', descriptionText: 'Musicals', classes: 'fun-stuff', description: "Obsessing over musicals and stalking broadway stars is 👏🏻 not 👏🏻 a 👏🏻 crime!", href: "https://codepen.io/collection/XPWkdW/" },
  { title: 'Me', descriptionText: 'Memes', classes: 'fun-stuff', description: "I learn memes, I make memes, I breathe memes." },
  { title: 'No', descriptionText: 'Notion', classes: 'intense-work', description: "Battling double columns in Notion" },
  { title: 'Re', descriptionText: 'Reddit', classes: 'social-media', description: "Oh my god. Someone please save me from this Reddit hell hole 😭" },
  { title: 'Rd', descriptionText: 'Research', classes: 'intense-work', description: "Research & Documentation nobody asks for 🤓📝" },
  { title: 'St', descriptionText: 'Stats', classes: 'intense-work', description: "Stats. Data. Stats. Data. 📊 Just lots of reporting." },
  { title: 'Ad', descriptionText: 'Ads', classes: 'intense-work', description: "Ads. Ads. Ads. If you've seen a Toggl ad, it was me. (Sorry)" },
];
</script>

<style scoped lang="scss">

@import 'https://fonts.googleapis.com/css?family=Inconsolata';

.error-page {
  background-repeat: no-repeat;
  background-size: cover;
  font-family: 'Inconsolata', Helvetica, sans-serif;
  color: rgba(128, 255, 128, 0.8);
  text-shadow:
      0 0 1ex rgba(51, 255, 51, 1),
      0 0 2px rgba(255, 255, 255, 0.8);
}


.overlay {
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 100%;
  background:
      repeating-linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0,
      rgba(0, 0, 0, 0.3) 50%,
      rgba(0, 0, 0, 0) 100%);
  background-size: auto 4px;
  z-index: 30;
}


.terminal {
  position: absolute;
  height: 100%;
  max-width: 100%;
}

.output {
  color: rgba(128, 255, 128, 0.8);
  text-shadow:
      0 0 1px rgba(51, 255, 51, 0.4),
      0 0 2px rgba(255, 255, 255, 0.8);
}

.glitch-text {
  position: relative;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  color: green;
  animation: glitch-jerkwhole 5s infinite;
}

.glitch-text span {
  position: absolute;
  color: green;
  filter: blur(2px);
  animation: glitch-blur 30ms infinite, glitch-jerk 50ms infinite;
}

.glitch-scanline {
  width: 100%;
  height: 4px;
  margin-bottom: 5px;
  opacity: 0.15;
  background: rgba(0, 255, 0, 0.1);
}

@keyframes glitch-blur {
  0%, 100% { filter: blur(1px); opacity: 0.8; }
  50% { filter: blur(1px); opacity: 1; }
}

@keyframes glitch-jerk {
  50% { transform: translateX(3px); }
  51% { transform: translateX(0); }
}

  body {
      background: #202e38;
      font-family: "Poppins", sans-serif;
  }
  
  h1 {
      margin: 2em auto 0;
      font: 700 3em "Poppins", sans-serif;
      color: #f1f5f6;
      text-align: center;
  }
  
  h5 {
      margin: 0 auto 2em;
      font: 400 1.3em "Poppins", sans-serif;
      color: #f1f5f6;
      text-align: center;
  }
  
  a {
      text-decoration: none;
  }
  
  aside.context {
      text-align: center;
      color: #fff;
      line-height: 1.7;
      a {
          text-decoration: none;
          color: #fff;
          padding: 3px 0;
          border-bottom: 1px dashed;
      }
      .explanation {
          max-width: 700px;
          margin: 4em auto 0;
      }
  }
  
  footer {
      text-align: center;
      margin: 2em auto;
      width: 100%;
      a {
          text-decoration: none;
          display: inline-block;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: transparent;
          border: 1px dashed #fff;
          color: #fff;
          margin: 5px;
          &:hover {
              background: rgba(255, 255, 255, 0.1);
          }
          .icons {
              margin-top: 12px;
              display: inline-block;
              font-size: 20px;
          }
      }
  }
  
  @mixin background-gradient($color1, $color2) {
      background: linear-gradient(to bottom right, $color1 0%, $color2 100%);
  }
  
  @mixin text-gradient($color1, $color2) {
      background: -webkit-linear-gradient($color1, $color2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
  }
  
  .periodic-table {
      display: grid;
      grid-template-columns: repeat(9, 100px);
      grid-template-rows: repeat(4, 100px);
      grid-gap: 10px;
      margin: auto;
      max-width: 1200px;
      justify-content: center;
  }
  
  .periodic-element {
      padding: 4px;
      position: relative;
      z-index: 1;
      cursor: default;
      transition: all 0.3s ease;
      .periodic-element-inner {
          background: #202e38;
          padding: 10px 15px;
          width: 100%;
          height: 100%;
          transition: inherit;
      }
      .title {
          font: 700 34px/1.3 "Poppins", sans-serif;
          margin: 0.3em 0 0;
          transition: 0.8s ease 600ms;
      }
      .description {
          font: 500 12px "Poppins", sans-serif;
          margin-top: -0.2em;
      }
      &:after {
          z-index: 10;
          content: attr(data-description);
          background: #f9f8f7;
          color: #333;
          width: 180px;
          position: absolute;
          top: 80%;
          opacity: 0;
          transition: opacity 0.3s ease 0.3s,
              top 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.3s;
          height: auto;
          font-size: 12px;
          line-height: 1.4;
          padding: 10px;
          margin: 0 0 0 -50px;
          border-radius: 6px;
          text-align: center;
      }
      &:hover {
          transform: scale(1.12);
          z-index: 10;
          .periodic-element-inner {
              background: transparent;
          }
          .title,
          .description {
              -webkit-text-fill-color: #222;
          }
          &:after {
              top: 105%;
              opacity: 1;
          }
      }
  }
  
  a.periodic-element {
      cursor: pointer;
  }
  
  .social-media {
      @include background-gradient(#f3f9a6,#cbc634);
      .title,
      .description {
          @include text-gradient(#f3f9a6,#cbc634);
      }
  }
  
  .fun-stuff {
      @include background-gradient(#ff616d,#ffc171);
      .title,
      .description {
          @include text-gradient(#ff616d,#ffc171);
      }
  }
  
  .just-trying {
      @include background-gradient(#37cfdc,#5a88e5);
      .title,
      .description {
          @include text-gradient(#37cfdc,#5a88e5);
      }
  }
  
  .intense-work {
      @include background-gradient(#58ac30,#a7df62);
      .title,
      .description {
          @include text-gradient(#58ac30,#a7df62);
      }
  }
  
  .legend-table {
      padding: 15px;
      text-align: center;
      font-size: 15px;
      margin: 2em auto 0;
      &__marker {
          width: 25px;
          height: 25px;
          margin: 5px 5px 10px;
          display: inline-block;
          vertical-align: middle;
          box-shadow: 0.5px 1px rgba(0, 0, 0, 0.15);
      }
      &__text {
          display: inline-block;
          vertical-align: middle;
          margin: 0 25px 5px 5px;
          @include text-gradient(#ccc,#eee);
      }
      &__direction {
          display: inline-block;
          margin: 10px 15px 10px 10px;
          @include text-gradient(#ccc,#eee);
      }
  }
  
  .empty-spacer {
          &-1 {
          grid-column: 3 / span 4;
          grid-row: 1;
      }
      &-2 {
          grid-column: 1;
          grid-row: 4;
      }
  }
  
  </style>
  