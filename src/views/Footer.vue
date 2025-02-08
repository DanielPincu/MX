<template>
    <div id="matrix-container">
      <canvas ref="canvasRef" id="matrix-canvas"></canvas>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  
  const canvasRef = ref(null);
  let ctx = null;
  
  // --- Constants and Variables ---
  const INIT_CHARSIZE = 13;
  const INIT_FILL_STYLE = "rgba(0,173,2,1)";
  const INIT_FONT = "bold 14px Monospace";
  const INIT_FONT2 = `bold ${INIT_CHARSIZE}px Monospace`;
  const INIT_XPOS = 17;
  const INIT_YPOS = 30;
  const INIT_YPOS2 = 30 + INIT_CHARSIZE;
  
  const DIGIT_FILL_STYLES = ["rgba(17,97,30,1)", "rgba(82,168,97,1)"];
  const PHONENUM_FILL_STYLE = "rgba(103,148,102,1)";
  
  const FILL_STYLES = [
    "rgba(255,255,255,1)",
    "rgba(179,178,179,1)",
    "rgba(112,111,112,1)",
    "rgba(88,106,94,1)",
    "rgba(29,98,32,1)",
    "rgba(29,98,32,0.8)",
    "rgba(29,98,32,0.6)",
    "rgba(29,98,32,0.4)",
    "rgba(29,98,32,0.2)",
    "rgba(29,98,32,0)",
  ];
  
  const CHARACTERS = "日アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンあいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん";
  
  let padding = 17;
  let nColumns = 0;
  let nRows = 0;
  let COLUMNS = [];
  let PHONE_NUMBER = [];
  let DIGIT_ANIMATION_FRAME = true;
  let takenXPos = [];
  let numXPos = 0;
  let numYPos = 0;
  let charSize = 13;
  
  // --- Time Variables ---
  let dateObject;
  let month;
  let date;
  let year;
  let hour;
  let minute;
  let second;
  
  // --- Animation Timers ---
  let digitAnimationTimer = null;
  let rainAnimationTimer = null;
  
  // --- Helper Functions (Constructors) ---
  function Cursor() {
    
  }
  
  function Digit(digitXPos, digitYPos) {
    this.digitChar = Math.floor(Math.random() * 10) + "";
    this.digitXPos = digitXPos;
    this.digitYPos = digitYPos;
    this.digitFillStyle = DIGIT_FILL_STYLES[Math.round(Math.random())];
  }
  
  function Column(initColumnXPos) {
    this.numDigits = nRows;
    this.digits = [];
    for (let d = 0, ypos = INIT_YPOS2; d < this.numDigits; d++, ypos += INIT_CHARSIZE) {
      this.digits[d] = new Digit(initColumnXPos, ypos);
    }
    this.initColumnXPos = initColumnXPos;
    this.initColumnYPos = INIT_YPOS2;
    this.isDisplayed = true;
  }
  
  function Number(xPos) {
    this.numberChar = Math.floor(Math.random() * 10);
    this.numberXPos = xPos;
    this.numberYPos = 30;
    this.isNumberDisplayed = false;
  }
  
  function Char(xPosition, yPosition, index) {
    this.char = CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length));
    this.xPos = xPosition;
    this.yPos = yPosition;
    this.index = index;
    this.fillStyle = FILL_STYLES[0];
    this.fillStyleIndex = 0;
  }
  
  function Drop() {
    this.dropLength = Math.floor(Math.random() * ((((canvasRef.value.height / charSize) * 3) - (canvasRef.value.height / charSize)) + 1)) + (canvasRef.value.height / charSize);
    this.dropChars = [];
    this.fadeIndex = 0;
    this.numToFade = 1;
    this.initDropYPos = 0 - (Math.round(Math.random() * numYPos) * charSize);
    this.dropXPos = Math.round(Math.random() * numXPos) * charSize;
    while (isXTaken(this.dropXPos)) {
      this.dropXPos = Math.round(Math.random() * numXPos) * charSize;
    }
    takenXPos.push(this.dropXPos);
  }
  
  // --- Utility Functions ---
  function isXTaken(x) {
    return takenXPos.includes(x);
  }
  
  function flickerCursor(cursor, xPos, yPos, n) {
    cursor.cursorXPos = xPos;
    cursor.cursorYPos = yPos;
    flickerLoop(cursor, n, 0);
  }
  
  function flickerLoop(cursor, n, i) {
    if (i === n) {
      return;
    }
    ctx.fillRect(cursor.cursorXPos, cursor.cursorYPos, cursor.cursorWidth, cursor.cursorHeight);
    setTimeout(() => {
      ctx.clearRect(cursor.cursorXPos, cursor.cursorYPos, cursor.cursorWidth + 1, cursor.cursorHeight + 1);
      i++;
      setTimeout(() => {
        flickerLoop(cursor, n, i);
      }, 200);
    }, 500);
  }
  
  function typewriteAnim(consoleTexts) {
    const consoleLines = consoleTexts.split(",");
    const cursor = new Cursor();
  
    flickerCursor(cursor, cursor.cursorXPos, cursor.cursorYPos, 3);
    setTimeout(() => {
      typewrite(cursor, consoleLines[0]);
    }, 2000);
    setTimeout(() => {
      flickerCursor(cursor, cursor.cursorXPos, cursor.cursorYPos, 4);
    }, 4300);
    setTimeout(() => {
      typewrite(cursor, consoleLines[1]);
    }, 7000);
    setTimeout(() => {
      flickerCursor(cursor, cursor.cursorXPos, cursor.cursorYPos, 4);
    }, 8000);
    setTimeout(() => {
      ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
    }, 10500);
  }
  
  function typewrite(cursor, text) {
    ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
    typewriteLoop(cursor, text, 1);
  }
  
  function typewriteLoop(cursor, text, c) {
    if (c > text.length) {
      return;
    }
    setTimeout(() => {
      ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
      ctx.fillText(text.slice(0, c), INIT_XPOS, INIT_YPOS);
      cursor.cursorXPos = 17 + (7.75 * c);
      ctx.fillRect(cursor.cursorXPos, cursor.cursorYPos, cursor.cursorWidth, cursor.cursorHeight);
      c++;
      typewriteLoop(cursor, text, c);
    }, 40);
  }
  
  function typewriteNoCursor(text) {
    ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
    typewriteNoCursorLoop(text, 1);
  }
  
  function typewriteNoCursorLoop(text, c) {
    const typewriteSpeed = (Math.random() * (400 - 200)) + 200;
  
    if (c > text.length) {
      return;
    }
    setTimeout(() => {
      ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
      ctx.fillText(text.slice(0, c), INIT_XPOS, INIT_YPOS);
      c++;
      typewriteNoCursorLoop(text, c);
    }, typewriteSpeed);
  }
  
  function typewriteNoCursorAnim(consoleTexts) {
    const consoleLines = consoleTexts.split(":");
  
    typewriteNoCursor(consoleLines[0]);
    setTimeout(() => {
      typewriteNoCursor(consoleLines[1]);
    }, 6000);
    setTimeout(() => {
      typewriteNoCursor(consoleLines[2]);
    }, 15000);
  }
  
  function initColumns() {
    COLUMNS = [];
    for (let c = 0, xpos = INIT_XPOS; c < nColumns; c++, xpos += INIT_CHARSIZE) {
      COLUMNS[c] = new Column(xpos);
    }
  }
  
  function renewDigits() {
    for (let c = 0; c < COLUMNS.length; c++) {
      COLUMNS[c].digits = [];
      for (let d = 0, ypos = INIT_YPOS2; d < COLUMNS[c].numDigits; d++, ypos += INIT_CHARSIZE) {
        COLUMNS[c].digits[d] = new Digit(COLUMNS[c].initColumnXPos, ypos);
      }
    }
  }
  
  function drawDigits() {
    ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
    renewDigits();
  
    for (let p = 0; p < PHONE_NUMBER.length; p++) {
      if (PHONE_NUMBER[p].isNumberDisplayed) {
        ctx.fillStyle = PHONENUM_FILL_STYLE;
        ctx.fillText(PHONE_NUMBER[p].numberChar, PHONE_NUMBER[p].numberXPos, PHONE_NUMBER[p].numberYPos);
      }
    }
  
    for (let c = 0; c < COLUMNS.length; c++) {
      if (!COLUMNS[c].isDisplayed) {
        continue;
      }
      for (let d = 0; d < COLUMNS[c].digits.length; d++) {
        ctx.fillStyle = COLUMNS[c].digits[d].digitFillStyle;
        ctx.fillText(COLUMNS[c].digits[d].digitChar, COLUMNS[c].digits[d].digitXPos, COLUMNS[c].digits[d].digitYPos);
      }
    }
  
    digitAnimationTimer = setTimeout(() => {
      if (DIGIT_ANIMATION_FRAME) {
        requestAnimationFrame(drawDigits);
      }
    }, 50);
  }
  
  function getNumDisplayedColumns() {
    let count = 0;
    for (let c = 0; c < COLUMNS.length; c++) {
      if (COLUMNS[c].isDisplayed) {
        count++;
      }
    }
    return count;
  }
  
  function digitAnim() {
    let digitInterval;
    let totalDisplayedColumns;
    let numColumnsToClear;
  
    drawDigits();
  
    totalDisplayedColumns = getNumDisplayedColumns();
    numColumnsToClear = Math.ceil(totalDisplayedColumns / 10);
    digitInterval = setInterval(() => {
      if (getNumDisplayedColumns() > 0) {
        for (let c = 0; c < numColumnsToClear && getNumDisplayedColumns() > 0; c++) {
          let columnToClear = Math.floor(Math.random() * totalDisplayedColumns);
          while (!COLUMNS[columnToClear].isDisplayed) {
            columnToClear = Math.floor(Math.random() * totalDisplayedColumns);
          }
          COLUMNS[columnToClear].isDisplayed = false;
        }
  
        let phoneNumToDisplay = Math.floor(Math.random() * PHONE_NUMBER.length);
        while (PHONE_NUMBER[phoneNumToDisplay].isNumberDisplayed) {
          phoneNumToDisplay = Math.floor(Math.random() * PHONE_NUMBER.length);
        }
        PHONE_NUMBER[phoneNumToDisplay].isNumberDisplayed = true;
      } else {
        clearInterval(digitInterval);
      }
    }, 3000);
  }
  
  function initPhoneNumber() {
    PHONE_NUMBER = [];
    for (let p = 0, xpos = INIT_XPOS; p < 10; p++, xpos += INIT_CHARSIZE) {
      PHONE_NUMBER[p] = new Number(xpos);
    }
  }
  
  function rainAnimate() {
    let drops;
    let minNumDrops;
    let maxNumDrops;
    let numDrops;
    let changeInterval;
  
    minNumDrops = Math.ceil(0.8 * numXPos);
    maxNumDrops = numXPos;
  
    numDrops = Math.floor(Math.random() * ((maxNumDrops - minNumDrops) + 1)) + minNumDrops;
    drops = [];
    for (let n = 0; n < numDrops; n++) {
      drops[n] = new Drop();
    }
  
    drawChars(drops);
  
    changeInterval = setInterval(() => {
      const indexToChange = [];
      const randomChar = [];
  
      for (let d = 0; d < drops.length; d++) {
        if (drops[d].dropChars.length === 0) {
          break;
        }
        indexToChange[d] = Math.floor(Math.random() * drops[d].dropChars.length);
        randomChar[d] = CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length));
  
        drops[d].dropChars[indexToChange[d]].char = randomChar[d];
      }
    }, 30);
  }
  
  function drawChars(drops) {
    ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
  
    for (let d = 0; d < drops.length; d++) {
      const drop = drops[d];
      drop.dropChars = [];
  
      for (let i = 0, ypos = drop.initDropYPos; i < drop.dropLength; i++, ypos += charSize) {
        const newChar = new Char(drop.dropXPos, ypos, i);
        drop.dropChars.push(newChar);
  
        if (i < 4) {
          newChar.fillStyle = FILL_STYLES[i];
        } else if (i >= drop.dropLength - 9) {
          newChar.fillStyle = FILL_STYLES[9 - (drop.dropLength - i)];
        } else {
          newChar.fillStyle = FILL_STYLES[4];
        }
      }
  
      for (let i = 0; i < drop.dropChars.length; i++) {
        ctx.fillStyle = drop.dropChars[i].fillStyle;
        ctx.fillText(drop.dropChars[i].char, drop.dropChars[i].xPos, drop.dropChars[i].yPos);
      }
    }
  
    rainAnimationTimer = requestAnimationFrame(() => drawChars(drops));
  }
  
  // --- Lifecycle Hooks ---
  onMounted(() => {
    const container = document.getElementById("matrix-container");
    const canvas = canvasRef.value;
  
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    ctx = canvas.getContext("2d");
  
    nColumns = Math.floor((canvas.width - (padding * 2)) / INIT_CHARSIZE);
    nRows = Math.floor((canvas.height - (padding * 2) - INIT_CHARSIZE) / INIT_CHARSIZE);
  
    numXPos = Math.ceil(canvas.width / charSize);
    numYPos = Math.ceil((canvas.height * 3) / charSize);
  
    ctx.font = INIT_FONT;
    ctx.fillStyle = INIT_FILL_STYLE;
  
    dateObject = new Date();
    month = dateObject.getMonth() + 1;
    date = dateObject.getDate();
    year = dateObject.getFullYear() - 2000;
    hour = dateObject.getHours();
    minute = dateObject.getMinutes();
    second = dateObject.getSeconds();
  
    typewriteAnim(`Call trans opt: received. ${month}-${date}-${year} ${hour}:${minute}:${second} REC:Log>,Trace program: running`);
  
    setTimeout(() => {
      ctx.font = INIT_FONT2;
      initColumns();
      initPhoneNumber();
      digitAnim();
    }, 10550);
  
    setTimeout(() => {
      DIGIT_ANIMATION_FRAME = false;
      typewriteNoCursorAnim("Wake up, Neo...:The Matrix has you...:Follow the white rabbit.");
    }, 41550);
  
    setTimeout(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillText("Knock, Knock, Neo.", INIT_XPOS, INIT_YPOS);
    }, 67000);
  
  });
  
  onUnmounted(() => {
    clearTimeout(digitAnimationTimer);
    cancelAnimationFrame(rainAnimationTimer);
  });
  </script>
  
  <style scoped>
  #matrix-container {
    width: 100%;
    height: 10vh; /* Adjust as needed */
    overflow: hidden; /* Hide scrollbars */
    background-color: black;
  }
  
  #matrix-canvas {
    display: block; /* Remove extra spacing below the canvas */
  }
  </style>
  