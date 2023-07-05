import getRandomColor from "./randomColor.js";
import { refs } from "./refs.js";

refs.inventory.innerHTML = localStorage.getItem("add");
const party = document.querySelector('.party-container');
const container = document.querySelector('.container');
const hasRedElement = refs.inventory.querySelector('.red') !== null;
const hasBlueElement = refs.inventory.querySelector('.blue') !== null;
const hasYellowElement = refs.inventory.querySelector('.yellow') !== null;
const body = document.querySelector('body');
const smileContainer = document.querySelector('.smiles-container')
let insert = false;
let intervalColor = null;


const red = `<div class="wrapper">
      <div class="js-box-wrapper rotating-element">
        <div class="box red js-box"></div>
      </div>
    </div>`;
    
const blue = `<div class="wrapper">
      <div class="js-box-wrapper">
        <div class="box blue js-box radius-animation"></div>
      </div>
    </div>`;

const yellow = `<div class="wrapper">
      <div class="js-box-wrapper">
        <div class="box yellow js-box"></div>
      </div>
    </div>`;

const partyMoodMarkup = `<ul class="smiles-list">
      <li class="smile smile-flex">🤩</li>
      <li class="smile smile-flex">🥳</li>
      <li class="smile smile-flex">🥳</li>
      <li class="smile smile-flex">🎃</li>
      <li class="smile smile-flex">😍</li>
    </ul>`;

    
const sadMoodMarkup = `<ul class="smiles-list">
      <li class="smile ">😞</li>
      <li class="smile">😶</li>
      <li class="smile">😔</li>
      <li class="smile">😣</li>
      <li class="smile">😭</li>
    </ul>`;

    const wtfMood = `<ul class="smiles-list">
      <li class="smile ">😡</li>
      <li class="smile">🙈</li>
      <li class="smile">😤</li>
      <li class="smile">😠</li>
      <li class="smile">😐</li>
    </ul>`;
 
container.addEventListener('click', pushBox);

function pushBox (e) {
  const { target } = e;

  if (insert) { 
    insert = false;
    clearInterval(intervalColor);
    body.style.backgroundColor = 'white';
    smileContainer.innerHTML = sadMoodMarkup
        body.style.animation = `slideDown 40s linear infinite`;
    return party.innerHTML = `<div class="box empty tooltip-insert"></div>`;

  };

  console.log(1);
  console.log(refs.inventory);

  if (hasBlueElement) {
    party.innerHTML = blue;
    smileContainer.innerHTML = wtfMood
    insert = true;
  } else if (hasYellowElement) {
    party.innerHTML = yellow;
    intervalColor = setInterval(() => {
      party.querySelector('.box.yellow').style.backgroundColor = getRandomColor();
      body.style.backgroundColor = getRandomColor();
      smileContainer.innerHTML = partyMoodMarkup
      body.style.animation = `slideDown 3s linear infinite`;
    }, 300);
    insert = true
  } else if (hasRedElement) {
    party.innerHTML = red;
    insert = true;
    smileContainer.innerHTML = wtfMood
  }
};

body.style.backgroundImage = `url("https://imgpng.ru/d/confetti_PNG86993.png")`;
body.style.backgroundRepeat = ``;
body.style.animation = `slideDown 40s linear infinite`;