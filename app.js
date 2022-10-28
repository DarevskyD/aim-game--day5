const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board");
const colors = [
  "#b92b27",
  "#f12711",
  "#fffc00",
  "#1e9600",
  "#2193b0",
  "#1565c0",
  "#ff0099",
];

let time = 0;
let score = 0;

startBtn.addEventListener("click", (e) => {
  e.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (e) => {
  if (e.target.classList.contains("time-btn")) {
    time = +e.target.getAttribute("data-time");
    screens[1].classList.add("up");
    startGame();
  }
});

board.addEventListener("click", (e) => {
  if (e.target.classList.contains("circle")) {
    score++;
    e.target.remove();
    createRandomCircle();
  }
});

function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomCircle();
  timeEl.innerHTML = `00:${time}`;
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;

    if (current < 10) {
      current = `0${current}`;
    }
    timeEl.innerHTML = `00:${current}`;
  }
}

function finishGame() {
  timeEl.parentNode.classList.add("hide");
  board.innerHTML = `
    <h1>Score: <span class='primary'>${score}</span></h1>    
    `;
}

function createRandomCircle() {
  const circle = document.createElement("div");
  const size = getRandomNumber(10, 60);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  const color = randomColor();

  circle.classList.add("circle");
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.style.background = color;
  circle.style.boxShadow = `rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset`;

  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomColor() {
  const index1 = Math.floor(Math.random() * colors.length);
  const index2 = Math.floor(Math.random() * colors.length);
  return `linear-gradient(150deg, ${colors[index1]} 0%, ${colors[index2]} 47%, #46aef7 100%)`;
}

/* background: linear-gradient(90deg, #16d9e3 0%, #30c7ec 47%, #46aef7 100%); */
