import getRandomColor from "./randomColor.js";
import { refs } from "./refs.js";

refs.container.addEventListener('click', onClick)
let rotate = 0
document.querySelector('.red').style.transform = `rotate(${rotate}deg)`

export const intervals = {
  rotate: null,
  radius: null,
  color: null
}
const icons = {
  first: document.getElementById('icon-play1'),
  second: document.getElementById('icon-play2'),
  thirth: document.getElementById('icon-play3'),
}

const pause = {
  first: document.getElementById('icon-pause1'),
  second: document.getElementById('icon-pause2'),
  thirth: document.getElementById('icon-pause3')
}


const buttonEl = document.createElement('button');
buttonEl.textContent = 'Reset';
buttonEl.classList.add('js-button');
document.querySelector('body').append(buttonEl)
const button = document.querySelector('.js-button')   
button.disabled = true

export const add = {
  yellow: document.querySelector('[data-color="yellow"]'),
  red: document.querySelector('[data-color="red"]'),
  blue: document.querySelector('[data-color="blue"]'),
}

add.red.textContent = localStorage.getItem('red') ?? '➕'
add.blue.textContent = localStorage.getItem('blue') ?? '➕'
add.yellow.textContent = localStorage.getItem('yellow') ?? '➕'

const btns = document.querySelectorAll('.add-button')
console.log(btns);

const inventory = document.querySelector('.js-inventory')
inventory.innerHTML = localStorage.getItem('add') ?? ''



function onClick(e) {

  inventory.innerHTML = localStorage.getItem('add')
  console.log(inventory);

  button.disabled = false;

  const { target } = e;

  if (target.dataset.color === 'red') {
    add.red.textContent = '✅'
    add.blue.textContent = '➕'
    add.yellow.textContent = '➕'
    localStorage.setItem('red', '✅')
    localStorage.removeItem('blue')
    localStorage.removeItem('yellow')
    inventory.innerHTML = '<div class="minibox red js-box"></div>'
    localStorage.setItem('add', '<div class="minibox red js-box tooltip"></div>')
  }
  
  if (target.dataset.color === 'blue') { 
    add.red.textContent = '➕'
    add.blue.textContent = '✅'
    add.yellow.textContent = '➕'
    localStorage.setItem('blue', '✅')
    localStorage.removeItem('red')
    localStorage.removeItem('yellow')
    inventory.innerHTML = '<div class="minibox blue js-box"></div>'
    localStorage.setItem('add', '<div class="minibox blue js-box tooltip"></div>')
  }
  
  if (target.dataset.color === 'yellow') {
    add.red.textContent = '➕'
    add.blue.textContent = '➕'
    add.yellow.textContent = '✅'
    localStorage.setItem('yellow', '✅')
    localStorage.removeItem('red')
    localStorage.removeItem('blue')
    inventory.innerHTML = '<div class="minibox yellow js-box"></div>'
    localStorage.setItem('add', '<div class="minibox yellow js-box tooltip"></div>')
  }
 
  if (!e.target.classList.contains('js-box')) return

  if (e.target.classList.contains('red')) {
    
    if (intervals.rotate) {
      clearInterval(intervals.rotate)
      intervals.rotate = null;
      icons.first.style.display = 'block';
      pause.first.style.display = 'none'
      return
    }

    icons.first.style.display = 'none';
    pause.first.style.display = 'block';
    intervals.rotate = setInterval(() => {
      rotate += 5;
      target.style.transform = `rotate(${rotate}deg)`;
          }, 50);

  }

  if (e.target.classList.contains('blue')) {

     if (intervals.radius) {
      clearInterval(intervals.radius)
       intervals.radius = null;
       icons.second.style.display = 'block';
       pause.second.style.display = 'none';
      return
    }

    icons.second.style.display = 'none';
    pause.second.style.display = 'block';
    intervals.radius = setInterval(() => {
    target.classList.toggle('radius');
    }, 500);

  }

  if (e.target.classList.contains('yellow')) {
    console.log(2);
    if (intervals.color) {
      clearInterval(intervals.color)
      intervals.color = null;
      icons.thirth.style.display = 'block';
      pause.thirth.style.display = 'none'
      return
    }

    icons.thirth.style.display = 'none';
    pause.thirth.style.display = 'block';
    intervals.color = setInterval(() => {
    target.style.backgroundColor = `${getRandomColor()}`;
    }, 500);

  }
}

button.addEventListener('click', resetStates)

function resetStates() {
  clearInterval(intervals.rotate)
  clearInterval(intervals.radius)
  clearInterval(intervals.color)
  intervals.rotate = null; 
  intervals.radius = null;
  intervals.color = null;
  icons.first.style.display = 'block';
  icons.second.style.display = 'block';
  icons.thirth.style.display = 'block';
  pause.first.style.display = 'none';
  pause.second.style.display = 'none';
  pause.thirth.style.display = 'none';
  button.disabled = true;
  rotate = 0;

  console.log([...refs.container.children]);

  [...refs.container.children].forEach(element => {
  const lastChild = element.lastElementChild;
  if (lastChild.classList.contains('red')) {
    lastChild.style.transform = 'none';
    }
   if (lastChild.classList.contains('blue')) {
    lastChild.classList.remove('radius')
    }
      if (lastChild.classList.contains('yellow')) {
    lastChild.style.backgroundColor = `orange`;
  }
  });


  // document.querySelector('.red').style.transform = `none`;
  // document.querySelector('.yellow').style.backgroundColor = `orange`;
  // document.querySelector('.blue').classList.remove('radius')
}




