  <template>
    <div class="matrix-periodic-console">
      <div class="periodic-table">
        <div class="empty-spacer-1 signal-bridge" aria-live="polite">
          <p class="signal-bridge__label">neural relay</p>
          <p class="signal-bridge__msg" :class="{ 'is-active': signalActive }">{{ activeSignalMessage }}</p>
        </div>
        <div class="empty-spacer-2"></div>

        <!-- Periodic Elements -->
        <div
          v-for="(item, index) in elements"
          :key="index"
          :class="[item.classes, { 'is-selected': activeElementIndex === index }]"
          :data-description="item.description"
          class="periodic-element"
          tabindex="0"
          @click="emitSignal(item, index)"
          @keydown.enter.prevent="emitSignal(item, index)"
          @keydown.space.prevent="emitSignal(item, index)"
        >
          <div class="periodic-element-inner">
            <div class="atomic-number">{{ String(index + 1).padStart(2, '0') }}</div>
            <div class="title">{{ item.title }}</div>
            <div class="description">{{ item.descriptionText }}</div>
            <div class="element-corners" aria-hidden="true">
              <span></span><span></span><span></span><span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onUnmounted } from 'vue';

  const cyberpunkSignals = [
    "NEON SPIKE DETECTED. rerouting telemetry through black-ice tunnel.",
    "CITY GRID PING. ghost packets are dancing on line zero.",
    "AUGMENT ONLINE. optic feed synced with rain-slick skyline.",
    "CORPO TRACE FLAGGED. scrubbing fingerprints from the datastream.",
    "QUANTUM WHISPER. chrome ghosts confirmed in sector seven."
  ];

  const activeSignalMessage = ref("Click an element to intercept a signal...");
  const signalActive = ref(false);
  const activeElementIndex = ref(null);
  let signalTimeoutId = null;

  const emitSignal = (item, index) => {
    activeElementIndex.value = index;
    const randomSignal = cyberpunkSignals[Math.floor(Math.random() * cyberpunkSignals.length)];
    activeSignalMessage.value = `[${item.title}] ${randomSignal}`;
    signalActive.value = false;
    if (signalTimeoutId) clearTimeout(signalTimeoutId);

    signalTimeoutId = setTimeout(() => {
      signalActive.value = true;
    }, 20);
  };

  onUnmounted(() => {
    if (signalTimeoutId) clearTimeout(signalTimeoutId);
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
  
  @mixin matrix-category($accent, $accent-soft) {
      border-color: rgba($accent, 0.3);
      background:
          linear-gradient(180deg, rgba($accent, 0.06), transparent 42%),
          #0a0d0a;

      .title {
          color: rgba($accent-soft, 0.95);
          text-shadow: 0 0 10px rgba($accent, 0.5);
      }

      .description,
      .atomic-number {
          color: rgba($accent-soft, 0.72);
      }
  }

  .matrix-periodic-console {
      position: relative;
      width: min(100%, 1120px);
      margin: 0 auto;
      padding: clamp(3.25rem, 5vw, 4rem) clamp(1rem, 3vw, 1.75rem) clamp(2rem, 4vw, 2.75rem);
      border: 3px solid #1a1f1a;
      border-top-color: #252a25;
      border-left-color: #1c211c;
      border-right-color: #0e120e;
      border-bottom-color: #080a08;
      outline: 2px solid #000;
      outline-offset: -5px;
      border-radius: 18px 18px 22px 22px;
      background:
          linear-gradient(180deg, #151715 0%, #0a0d0a 30%, #050705 70%, #0a0d0a 100%);
      box-shadow:
          inset 0 0.6rem 1.2rem rgba(0,0,0,0.7),
          inset 0 -0.4rem 0.8rem rgba(0,0,0,0.5),
          0 0 0 4px #0a0d0a,
          0 0.8rem 2rem rgba(0,0,0,0.8),
          0 0 40px rgba(var(--mx-accent-rgb), 0.08);
      contain: layout paint;
  }

  .matrix-periodic-console::before {
      content: "Ex Why Zed";
      position: absolute;
      top: 0.9rem;
      right: 1.25rem;
      color: rgba(var(--mx-accent-rgb), 0.52);
      font-size: 0.7rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      text-shadow: 0 0 10px rgba(var(--mx-accent-rgb), 0.55);
  }

  .periodic-console-header {
      position: absolute;
      top: 0.85rem;
      left: 1.25rem;
      right: 1.25rem;
      display: flex;
      align-items: center;
      gap: 0.6rem;
      pointer-events: none;
  }

  .periodic-console-header span {
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 999px;
      background: var(--mx-accent);
      box-shadow: 0 0 12px rgba(var(--mx-accent-rgb), 0.7);
  }

  .periodic-console-header p {
      color: rgba(var(--mx-accent-soft-rgb), 0.62);
      font-size: 0.62rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      text-shadow: 0 0 9px rgba(var(--mx-accent-rgb), 0.32);
  }
  
  .periodic-table {
      display: grid;
      grid-template-columns: repeat(9, minmax(78px, 96px));
      grid-template-rows: repeat(4, minmax(78px, 96px));
      grid-gap: 10px;
      margin: 0 auto;
      max-width: 1200px;
      justify-content: center;
  }
  
  .periodic-element {
      position: relative;
      z-index: 1;
      cursor: default;
      border: 2px solid #000;
      border-radius: 6px 6px 10px 10px;
      background: #000;
      box-shadow:
          inset 0 0 30px rgba(0,0,0,0.8),
          0 0 2px rgba(var(--mx-accent-rgb), 0.1);
      transition: transform 90ms ease, border-color 90ms ease, box-shadow 90ms ease;
      contain: paint;
      overflow: hidden;

      .periodic-element-inner {
          position: relative;
          z-index: 1;
          background: transparent;
          padding: 8px 10px;
          width: 100%;
          height: 100%;
      }

      /* CRT screen overlays */
      .periodic-element-inner::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          background: repeating-linear-gradient(
              180deg,
              transparent,
              transparent 2px,
              rgba(0,0,0,0.1) 2px,
              rgba(0,0,0,0.1) 4px
          );
      }

      .periodic-element-inner::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          background:
              radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(0, 8, 1, 0.35) 100%);
          mix-blend-mode: screen;
      }

      .element-corners {
          position: absolute;
          inset: 3px;
          z-index: 3;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.2s;
      }

      .element-corners span {
          position: absolute;
          width: 10px;
          height: 10px;
          border-color: rgba(var(--mx-accent-rgb), 0.4);
      }

      .element-corners span:nth-child(1) {
          top: 0; left: 0;
          border-top: 2px solid; border-left: 2px solid;
      }
      .element-corners span:nth-child(2) {
          top: 0; right: 0;
          border-top: 2px solid; border-right: 2px solid;
      }
      .element-corners span:nth-child(3) {
          bottom: 0; left: 0;
          border-bottom: 2px solid; border-left: 2px solid;
      }
      .element-corners span:nth-child(4) {
          right: 0; bottom: 0;
          border-right: 2px solid; border-bottom: 2px solid;
      }

      .atomic-number {
          position: absolute;
          top: 7px;
          left: 8px;
          z-index: 1;
          font: 700 10px/1 "Courier New", monospace;
          letter-spacing: 0.08em;
      }

      .title {
          font: 800 32px/1 "Courier New", monospace;
          margin: 0.55em 0 0;
          letter-spacing: 0;
          position: relative;
          z-index: 1;
      }
      .description {
          font: 700 10px/1.15 "Courier New", monospace;
          margin-top: 0.45em;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          position: relative;
          z-index: 1;
      }
      &:after {
          z-index: 10;
          content: attr(data-description);
          background: rgba(0, 8, 3, 0.96);
          color: rgba(221, 255, 230, 0.92);
          width: 210px;
          position: absolute;
          top: 105%;
          opacity: 0;
          pointer-events: none;
          height: auto;
          font-size: 12px;
          line-height: 1.4;
          padding: 10px;
          margin: 0 0 0 -50px;
          border: 1px solid rgba(var(--mx-accent-rgb), 0.35);
          border-radius: 4px;
          text-align: center;
          box-shadow: 0 14px 26px rgba(0, 0, 0, 0.55);
      }

      &:hover,
      &:focus-visible {
          transform: translateY(-4px);
          border-color: rgba(var(--mx-accent-rgb), 0.5);
          box-shadow:
              inset 0 0 30px rgba(0,0,0,0.8),
              0 0 16px rgba(var(--mx-accent-rgb), 0.22);
          z-index: 10;

          .element-corners {
              opacity: 0.85;
          }

          .periodic-element-inner::before {
              opacity: 0.7;
          }

          &:after {
              top: 105%;
              opacity: 1;
          }
      }
  }

  .periodic-element.is-selected {
      transform: translateY(-4px);
      border-color: rgba(var(--mx-accent-rgb), 0.55);
      box-shadow:
          inset 0 0 30px rgba(0,0,0,0.8),
          0 0 20px rgba(var(--mx-accent-rgb), 0.25);
      z-index: 10;
  }

  .periodic-element.is-selected .title {
      text-shadow:
          0 0 12px rgba(var(--mx-accent-rgb), 0.7),
          0 0 4px rgba(var(--mx-accent-rgb), 0.5);
  }

  .periodic-element.is-selected .element-corners {
      opacity: 1;
  }
  .periodic-element.is-selected .element-corners span {
      border-color: rgba(var(--mx-accent-rgb), 0.9);
      box-shadow: 0 0 6px rgba(var(--mx-accent-rgb), 0.5);
  }

  @keyframes periodic-tile-warp {
      0% { transform: translateY(-4px) skewX(0deg); }
      14% { transform: translateY(-6px) skewX(-2deg); }
      28% { transform: translateY(-4px) skewX(2deg); }
      42% { transform: translateY(-7px) skewX(-1deg); }
      56%, 100% { transform: translateY(-4px) skewX(0deg); }
  }

  @keyframes periodic-source-sweep {
      0% { opacity: 0; transform: translateX(-120%); }
      12% { opacity: 1; }
      68% { opacity: 0.95; transform: translateX(115%); }
      100% { opacity: 0; transform: translateX(140%); }
  }

  @keyframes periodic-interference {
      0%, 100% { opacity: 0; transform: translateX(0); }
      12% { opacity: 0.62; transform: translateX(-5px); }
      24% { opacity: 0.28; transform: translateX(6px); }
      38% { opacity: 0.7; transform: translateX(-3px); }
      56% { opacity: 0.18; transform: translateX(4px); }
  }

  @keyframes periodic-lock-corners {
      0%, 100% {
          opacity: 0;
          transform: scale(1.08);
      }
      8%, 54% {
          opacity: 1;
          transform: scale(1);
      }
      22% {
          opacity: 0.35;
          transform: scale(0.96);
      }
      38% {
          opacity: 1;
          transform: scale(1.02);
      }
  }

  @keyframes periodic-title-glitch {
      0%, 100% { transform: translateX(0); }
      18% { transform: translateX(-4px); }
      36% { transform: translateX(5px); }
      52% { transform: translateX(-2px); }
  }

  @keyframes periodic-micro-jitter {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(2px); }
      40% { transform: translateX(-2px); }
      60% { transform: translateX(1px); }
  }
  
  a.periodic-element {
      cursor: pointer;
  }
  
  .social-media {
      @include matrix-category(#f0ce00, #fff2a6);
  }
  
  .fun-stuff {
      @include matrix-category(#ff6b5f, #ffd0a7);
  }
  
  .just-trying {
      @include matrix-category(#4fd8df, #b4f7ff);
  }
  
  .intense-work {
      @include matrix-category(#23ff81, #caffd8);
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

  .signal-bridge {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 0.45rem;
      padding: 0.5rem 0.7rem;
      border: 1px solid rgba(var(--mx-accent-rgb), 0.25);
      background: rgba(0,0,0,0.6);
      font-family: 'VT323', 'Courier New', monospace;
      box-shadow:
          inset 0 1px 0 rgba(255,255,255,0.03),
          0 0 8px rgba(0,0,0,0.5);
  }

  .signal-bridge__label {
      margin: 0;
      font: 700 0.52rem/1 "Courier New", monospace;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: rgba(var(--mx-accent-soft-rgb), 0.68);
  }

  .signal-bridge__msg {
      margin: 0;
      min-height: 2.25rem;
      font: 700 0.62rem/1.25 "Courier New", monospace;
      letter-spacing: 0.04em;
      color: rgba(var(--mx-accent-soft-rgb), 0.76);
      text-shadow: 0 0 8px rgba(var(--mx-accent-rgb), 0.25);
  }

  .signal-bridge__msg.is-active {
      animation: signal-bridge-flicker 420ms steps(2, end);
  }

  @keyframes signal-bridge-flicker {
      0% { opacity: 0.35; transform: translateX(-2px); }
      20% { opacity: 1; transform: translateX(1px); }
      45% { opacity: 0.6; transform: translateX(-1px); }
      100% { opacity: 1; transform: translateX(0); }
  }

  @media (max-width: 1024px) {
      .matrix-periodic-console {
          overflow-x: auto;
          justify-content: flex-start;
      }

      .periodic-table {
          min-width: 920px;
      }
  }
  
  </style>
  
