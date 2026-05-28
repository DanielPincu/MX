<template>
    <div class="matrix-periodic-console">
      <div class="periodic-console-header">
        <span></span>
        <p>internet compounds / operator log</p>
      </div>
    
      <div class="periodic-table">
        <div class="empty-spacer-1"></div>
        <div class="empty-spacer-2"></div>
  
        <!-- Periodic Elements -->
        <div
          v-for="(item, index) in elements"
          :key="index"
          :class="item.classes"
          :data-description="item.description"
          class="periodic-element"
          tabindex="0"
        >
          <div class="periodic-element-inner">
            <div class="atomic-number">{{ String(index + 1).padStart(2, '0') }}</div>
            <div class="title">{{ item.title }}</div>
            <div class="description">{{ item.descriptionText }}</div>
            <div class="element-corners" aria-hidden="true">
              <span></span><span></span><span></span><span></span>
            </div>
            <div class="element-readout" aria-hidden="true">
              <span>decode</span>
              <strong>{{ item.title }}</strong>
            </div>
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
  </template>
  
  <script setup>
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
      border-color: rgba($accent, 0.35);
      background:
          linear-gradient(180deg, rgba($accent, 0.12), transparent 42%),
          linear-gradient(180deg, #141b15, #050705 72%);

      .periodic-element-inner {
          border-color: rgba($accent, 0.2);
      }

      .title {
          color: rgba($accent-soft, 0.95);
          text-shadow: 0 0 8px rgba($accent, 0.45);
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
      padding: 3rem 1.25rem 1.5rem;
      border: 1px solid rgba(35, 255, 129, 0.28);
      border-radius: 14px 14px 22px 22px;
      background:
          linear-gradient(135deg, rgba(255, 255, 255, 0.035), transparent 22%),
          repeating-linear-gradient(180deg, rgba(35, 255, 129, 0.02) 0 1px, transparent 1px 5px),
          radial-gradient(circle at 50% 0%, rgba(35, 255, 129, 0.12), transparent 44%),
          linear-gradient(180deg, #101510, #020402 74%);
      box-shadow:
          inset 0 1rem 1.2rem rgba(0, 0, 0, 0.78),
          0 1.4rem 2.2rem -0.8rem rgba(0, 0, 0, 0.84),
          0 0 34px rgba(35, 255, 129, 0.1);
      contain: layout paint;
  }

  .matrix-periodic-console::before {
      content: "The Matrix has you...";
      position: absolute;
      top: 0.9rem;
      right: 1.25rem;
      color: rgba(35, 255, 129, 0.52);
      font-size: 0.72rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      text-shadow: 0 0 10px rgba(35, 255, 129, 0.55);
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
      background: #23ff81;
      box-shadow: 0 0 12px rgba(35, 255, 129, 0.7);
  }

  .periodic-console-header p {
      color: rgba(143, 255, 184, 0.62);
      font-size: 0.62rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      text-shadow: 0 0 9px rgba(35, 255, 129, 0.32);
  }
  
  .periodic-table {
      display: grid;
      grid-template-columns: repeat(9, minmax(78px, 96px));
      grid-template-rows: repeat(4, minmax(78px, 96px));
      grid-gap: 10px;
      margin: auto;
      max-width: 1200px;
      justify-content: center;
  }
  
  .periodic-element {
      position: relative;
      z-index: 1;
      cursor: default;
      border: 1px solid rgba(143, 255, 184, 0.18);
      border-bottom: 5px solid rgba(0, 0, 0, 0.9);
      border-radius: 7px 7px 12px 12px;
      background: linear-gradient(180deg, #172219, #071009 55%, #030603);
      box-shadow:
          inset 0 1px 0 rgba(255, 255, 255, 0.08),
          inset 0 -0.38rem 0.48rem rgba(0, 0, 0, 0.7),
          0 0.18rem 0 rgba(0, 0, 0, 0.9),
          0 0 8px rgba(35, 255, 129, 0.06);
      transition: transform 90ms ease, border-color 90ms ease, box-shadow 90ms ease;
      contain: paint;

      .periodic-element-inner {
          position: relative;
          background: transparent;
          border: 1px solid rgba(143, 255, 184, 0.08);
          border-radius: 5px 5px 9px 9px;
          padding: 8px 10px;
          width: 100%;
          height: 100%;
          overflow: hidden;
      }

      .periodic-element-inner::before,
      .periodic-element-inner::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          opacity: 0;
      }

      .periodic-element-inner::before {
          background:
              linear-gradient(90deg, transparent, rgba(202, 255, 216, 0.34), transparent),
              repeating-linear-gradient(180deg, rgba(35, 255, 129, 0.12) 0 1px, transparent 1px 5px);
          transform: translateX(-120%);
      }

      .periodic-element-inner::after {
          background:
              linear-gradient(90deg, rgba(35, 255, 129, 0.16), transparent 14% 86%, rgba(240, 206, 0, 0.16)),
              repeating-linear-gradient(90deg, transparent 0 12px, rgba(35, 255, 129, 0.16) 13px 14px);
      }

      .element-corners {
          position: absolute;
          inset: 4px;
          z-index: 3;
          pointer-events: none;
          opacity: 0;
      }

      .element-corners span {
          position: absolute;
          width: 16px;
          height: 16px;
          border-color: rgba(240, 206, 0, 0.9);
      }

      .element-corners span:nth-child(1) {
          top: 0;
          left: 0;
          border-top: 2px solid;
          border-left: 2px solid;
      }

      .element-corners span:nth-child(2) {
          top: 0;
          right: 0;
          border-top: 2px solid;
          border-right: 2px solid;
      }

      .element-corners span:nth-child(3) {
          bottom: 0;
          left: 0;
          border-bottom: 2px solid;
          border-left: 2px solid;
      }

      .element-corners span:nth-child(4) {
          right: 0;
          bottom: 0;
          border-right: 2px solid;
          border-bottom: 2px solid;
      }

      .element-readout {
          position: absolute;
          left: 7px;
          right: 7px;
          bottom: 6px;
          z-index: 3;
          display: flex;
          justify-content: space-between;
          gap: 0.4rem;
          border-top: 1px solid rgba(35, 255, 129, 0.22);
          border-bottom: 1px solid rgba(35, 255, 129, 0.22);
          background: rgba(0, 8, 3, 0.76);
          padding: 0.25rem 0.35rem;
          color: rgba(202, 255, 216, 0.72);
          font-size: 0.48rem;
          letter-spacing: 0.12em;
          line-height: 1;
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(7px);
          pointer-events: none;
      }

      .element-readout strong {
          color: #fff7aa;
      }

      .atomic-number {
          position: absolute;
          top: 7px;
          left: 8px;
          font: 700 10px/1 "Courier New", monospace;
          letter-spacing: 0.08em;
      }

      .title {
          font: 800 32px/1 "Courier New", monospace;
          margin: 0.55em 0 0;
          letter-spacing: 0;
      }
      .description {
          font: 700 10px/1.15 "Courier New", monospace;
          margin-top: 0.45em;
          text-transform: uppercase;
          letter-spacing: 0.04em;
      }
      &:after {
          z-index: 10;
          content: attr(data-description);
          background: rgba(0, 8, 3, 0.96);
          color: rgba(221, 255, 230, 0.92);
          width: 210px;
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
          border: 1px solid rgba(35, 255, 129, 0.35);
          border-radius: 4px;
          text-align: center;
          box-shadow: 0 14px 26px rgba(0, 0, 0, 0.55);
      }

      &:hover,
      &:focus-visible {
          transform: translateY(-4px);
          border-color: rgba(240, 206, 0, 0.7);
          box-shadow:
              inset 0 1px 0 rgba(255, 255, 255, 0.12),
              inset 0 -0.38rem 0.48rem rgba(0, 0, 0, 0.62),
              0 0.18rem 0 rgba(0, 0, 0, 0.9),
              0 0 16px rgba(35, 255, 129, 0.18);
          z-index: 10;
          animation: periodic-tile-warp 680ms steps(2, end);

          .periodic-element-inner::before {
              animation: periodic-source-sweep 760ms cubic-bezier(0.2, 0.8, 0.2, 1);
          }

          .periodic-element-inner::after {
              animation: periodic-interference 760ms steps(4, end);
          }

          .element-corners {
              animation: periodic-lock-corners 900ms steps(2, end);
          }

          .element-readout {
              animation: periodic-readout-decode 1050ms steps(4, end);
          }

          .title {
              animation: periodic-title-glitch 620ms steps(2, end);
              text-shadow:
                  2px 0 rgba(35, 255, 129, 0.8),
                  -2px 0 rgba(240, 206, 0, 0.65),
                  0 0 14px rgba(35, 255, 129, 0.55);
          }

          .description,
          .atomic-number {
              animation: periodic-micro-jitter 580ms steps(2, end);
          }

          &:after {
              top: 105%;
              opacity: 1;
          }
      }
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

  @keyframes periodic-readout-decode {
      0%, 100% {
          opacity: 0;
          transform: translateY(7px);
      }
      12%, 76% {
          opacity: 1;
          transform: translateY(0);
      }
      24% {
          transform: translateY(0) translateX(-4px);
      }
      36% {
          transform: translateY(0) translateX(4px);
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
  
  .legend-table {
      padding: 18px 15px 5px;
      text-align: center;
      font-size: 13px;
      margin: 1.4em auto 0;

      &__wrapper {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.65rem 1rem;
      }

      &__marker {
          width: 18px;
          height: 18px;
          margin: 0;
          display: inline-block;
          vertical-align: middle;
          border-radius: 3px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: inset 0 -4px 6px rgba(0, 0, 0, 0.4);
      }
      &__text {
          display: inline-block;
          vertical-align: middle;
          margin: 0 0.4rem 0 -0.45rem;
          color: rgba(221, 255, 230, 0.72);
          text-transform: uppercase;
          letter-spacing: 0.08em;
      }
      &__direction {
          display: inline-block;
          margin: 10px 15px 10px 10px;
          color: rgba(221, 255, 230, 0.72);
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
  
