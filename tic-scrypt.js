import { refs } from "./refs.js";
refs.inventory.innerHTML = localStorage.getItem("add")

const MARKUP_KEY = 'markupKEY' 
const HISTORY_X_KEY = 'X' 
const HISTORY_O_KEY = 'O' 

const gameField = document.querySelector(".js-content")
let markup =
  JSON.parse(localStorage.getItem(MARKUP_KEY)) ??
  ''
let player = '❌'
const winningCombinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],

  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],

  [1, 5, 9],
  [3, 5, 7]
];
let historyX = JSON.parse(localStorage.getItem(HISTORY_X_KEY)) ?? [];
let historyO = JSON.parse(localStorage.getItem(HISTORY_O_KEY)) ?? [];



const buttonEl = document.createElement('button');
buttonEl.textContent = 'Reset';
buttonEl.classList.add('js-button');
document.querySelector('body').append(buttonEl)

//Markup for famefield
if (markup === '') {
  for (let i = 1; i < 10; i += 1) {
    markup += `<div class='tic-item js-tic-item' data-id="${i}"></div>`
  }
}

gameField.innerHTML = markup

//Action

gameField.addEventListener('click', onClick) 

function onClick(e) {
  const { target } = e;
  const id = Number(target.dataset.id);
  console.log(id);

  if (!target.classList.contains('js-tic-item') || target.textContent) {
    return
  }

  if (player === '❌') {
    historyX.push(id)  
    console.log(historyX);
  } else {
    historyO.push(id);
     console.log(historyO);
  }

  target.textContent = player
  player = player === '❌' ? '⭕' : '❌'; 

  if (isWinner(historyX)) {
    console.log('X is winner', historyX)
    console.log(target.dataset);
    isWinnerMarkup(historyX, target, '❌')
    gameField.removeEventListener('click', onClick) 

  } else if (isWinner(historyO)) {
    console.log('O is winner', historyO, '⭕');
    isWinnerMarkup(historyO, target, '⭕')
    gameField.removeEventListener('click', onClick) 
  }

  localStorage.setItem(MARKUP_KEY, JSON.stringify(gameField.innerHTML));
  localStorage.setItem(HISTORY_X_KEY, JSON.stringify(historyX));
  localStorage.setItem(HISTORY_O_KEY, JSON.stringify(historyO));

  if ([...gameField.children].every(child => child.textContent.trim() !== '')) {
    gameField.removeEventListener('click', onClick);;
  }
}

buttonEl.addEventListener('click', onButtonReset);


function isWinner (arr) {
  return winningCombinations.some(combinations => combinations.every(combination => 
    arr.includes(combination)
  ))
}

function isWinnerMarkup(arr, target, symbol) {
  winningCombinations.forEach(combination => {
    if (combination.every(num => arr.includes(num))) {
      combination.forEach(num => {
        const element = document.querySelector(`[data-id="${num}"]`);
        element.innerHTML = `<span class="tic-winner">${symbol}</span>`;
      });
    }
  });
}

function onButtonReset() {
  console.log('click');
  historyX = [];
  historyO = [];
  player = '❌';
  
  const ticItems = document.querySelectorAll('.js-tic-item');
  ticItems.forEach(item => {
    item.textContent = '';
  });

  gameField.addEventListener('click', onClick);

  localStorage.removeItem(MARKUP_KEY);
  localStorage.removeItem(HISTORY_O_KEY);
  localStorage.removeItem(HISTORY_X_KEY);
}





