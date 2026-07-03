```
   ███▄ ▄███▓ ▒██   ██▒
  ▓██▒▀█▀ ██▒ ▒▒ █ █ ▒░
  ▓██    ▓██░ ░░  █   ░
  ▒██    ▒██   ░ █ █ ▒ 
  ▒██▒   ░██▒ ▒██▒ ▒██▒
  ░ ▒░   ░  ░ ▒▒ ░ ░▓ ░
  ░  ░      ░ ░░   ░▒ ░
  ░      ░     ░    ░  
         ░     ░    ░  
```

# The Matrix has you...

**MX** is a personal portfolio terminal. Not the glossy kind. The kind that loads at 3am on a CRT monitor in a room you shouldn't be in.

---

## uplink established

```
> trace route: danielpincu.com
> carrier: Vue 3 + Vite
> signal: Tailwind CSS + SCSS
> protocol: vue-router
> handshake: custom
```

---

## what you'll find inside

| node | path | description |
|---|---|---|
| **home** | `/` | Entry point. TV static. Periodic table of the digital self. |
| **keyboard** | `/` | Schrödinger's Keyboard. Every letter is every letter until you touch it. Type anything. Delete everything. Physical keys mapped. |
| **portfolio** | `/portfolio` | Project transmissions. 10 deployments archived in Y2K CRT monitors. Each one a rabbit hole. |
| **detail** | `/detail/:id` | Deep dive. CRT carousel. The full dossier. Live links. Source code. Go back if you still can. |
| **about** | `/about` | Who pulled the plug. The operator behind the screen. |

---

## the keyboard

It looks like a keyboard. It isn't.

- Every alphanumeric key cycles through the alphabet at ~12.5 fps until you hover over it
- When you do, the character settles — the waveform collapses
- Click a key, and the heading above begins to spell
- Press your physical keyboard. The on-screen keys flash in response
- Backspace works. Space works. Modifier keys exist but don't type
- F1–F12, arrows, nav cluster — all mapped, all watching

The text you type scrolls out as a glitch-effect headline: *"There is no spoon..."*

---

## the aesthetic

| layer | effect |
|---|---|
| **digital rain** | Global background. Kanji, numerals, latin chars falling in columns. |
| **CRT scanlines** | Subtle horizontal interference across all screens. |
| **glitch text** | Headers flicker. Overlay ghosts shift 3px left, 3px right. |
| **phosphor glow** | Green text-shadow on every typed word. |
| **scroll-type** | IntersectionObserver fires at scroll. Characters appear one by one with 1s delay. |
| **portfolio cards** | Y2K CRT monitors. Bezel borders, corner L-brackets, LED status dots, terminal readouts. |
| **carousel** | Full CRT experience. Scanlines, phosphor vignette, bezel, auto-advance, keyboard + touch nav. |

---

## the signal chain

```
source       →  /src
assets       →  /src/assets        (WebP images, MP4 video)
views        →  /src/views         (12 components, 4 routes)
modules      →  /src/modules       (portfolio data)
composables  →  /src/composables   (useScrollType)
styles       →  /src/styles.scss   (global keyboard + CRT styles)
```

---

## jack in

```sh
# clone the construct
git clone https://github.com/DanielPincu/MX.git
cd MX

# load dependencies
npm install

# enter the matrix
npm run dev

# compile for deployment
npm run build
```

---

## deploy

The construct auto-deploys to **Vercel** on every push to `experiment`.

Live uplink: **[danielpincu.com](https://danielpincu.com)**

---

## operator notes

- Built with Vue 3 Composition API (`<script setup>`)
- Portfolio images converted from PNG to WebP (~90% reduction)
- TV channels converted from GIF to MP4 (~97% reduction)
- Full keyboard: 104 keys including nav cluster, function row, inverted-T arrows
- Responsive down to mobile. Nav cluster hides below 880px.
- No external UI libraries. Every pixel is custom.

---

```
> wake up, Neo...
> the matrix has you...
> follow the white rabbit...

              ,~~,
             ( o )-_,
        ,-~~  \   /'~-,
       (      ) (@) )   )
        `-._(_____)--~~'
              |    |
              ''   ''
```

**Knock, knock, Neo.**
