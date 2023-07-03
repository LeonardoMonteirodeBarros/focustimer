const buttonPlay = document.querySelector(".play");
const buttonStop = document.querySelector(".stop");
const buttonMore = document.querySelector(".more");
const buttonAnyless = document.querySelector(".anyless");
const minutesDisplay = document.querySelector(".minutes");
const secondsDisplay = document.querySelector(".seconds");
const buttonForest = document.querySelector(".forest");
const buttonRain = document.querySelector(".rain");
const buttonHome = document.querySelector(".home");
const buttonFire = document.querySelector(".fire");

const forestvol = document.getElementById("forestvolume");
forestvol.addEventListener("input", (event) => {
  forestSound.volume = event.target.value;
});

forestvol.addEventListener("click", (event) => {
  event.stopPropagation();
});

const rainvol = document.getElementById("rainvolume");
rainvol.addEventListener("input", (event) => {
  rainSound.volume = event.target.value;
});

rainvol.addEventListener("click", (event) => {
  event.stopPropagation();
});

const homevol = document.getElementById("homevolume");
homevol.addEventListener("input", (event) => {
  homeSound.volume = event.target.value;
});

homevol.addEventListener("click", (event) => {
  event.stopPropagation();
});

const firevol = document.getElementById("firevolume");
firevol.addEventListener("input", (event) => {
  fireSound.volume = event.target.value;
});

firevol.addEventListener("click", (event) => {
  event.stopPropagation();
});

const moonmode = document.querySelector(".moon");
const sunmode = document.querySelector(".sun");
const body = document.body;

moonmode.addEventListener("click", () => {
  body.classList.remove("dark-mode");
  moonmode.classList.add("hidedarkmode");
  sunmode.classList.remove("hidedarkmode");
});
sunmode.addEventListener("click", () => {
  body.classList.add("dark-mode");
  sunmode.classList.add("hidedarkmode");

  moonmode.classList.remove("hidedarkmode");
});

let timerTimeOut;
let minutes = Number(minutesDisplay.textContent);

buttonPlay.addEventListener("click", function () {
  buttonPlay.classList.add("hide");
  buttonPlay.disabled = true;
  buttonStop.classList.remove("hide");
  countdown();
});
function reset() {
  updateDisplay(minutes, 0);
  clearTimeout(timerTimeOut);
}

buttonStop.addEventListener("click", function () {
  buttonPlay.disabled = false;
  resetControls();
  reset();
});

function resetControls() {
  buttonPlay.classList.remove("hide");
  buttonStop.classList.add("hide");
}

function updateDisplay(newMinutes, seconds) {
  newMinutes = newMinutes === undefined ? minutes : newMinutes;
  seconds = seconds === undefined ? 0 : seconds;

  minutesDisplay.textContent = String(newMinutes).padStart(2, "0");
  secondsDisplay.textContent = String(seconds).padStart(2, "0");
}

function countdown() {
  timerTimeOut = setTimeout(function () {
    let seconds = Number(secondsDisplay.textContent);
    let minutes = Number(minutesDisplay.textContent);
    let isFinished = minutes <= 0 && seconds <= 0;

    updateDisplay(minutes, 0);

    if (isFinished) {
      resetControls();
      updateDisplay();
      Sounds().timeEnd();
      return;
    }

    if (seconds <= 0) {
      seconds = 60;
      --minutes;
    }

    secondsDisplay.textContent = seconds - 1;

    countdown();
  }, 1000);
}

buttonMore.addEventListener("click", function () {
  updateDisplay(minutes + 5);
  minutes = minutes + 5;
});

buttonAnyless.addEventListener("click", function () {
  if (minutes <= 5) {
    return;
  }

  updateDisplay(minutes - 5);
  minutes = minutes - 5;
});

let forestIsActive = false;
let rainIsActive = false;
let homeIsActive = false;
let fireIsActive = false;

//audios

const forestSound = new Audio("./sounds/Floresta.wav");
const rainSound = new Audio("./sounds/Chuva.wav");
const homeSound = new Audio("./sounds/Cafeteria.wav");
const fireSound = new Audio("./sounds/Lareira.wav");

buttonForest.addEventListener("click", function () {
  if (forestIsActive) {
    forestIsActive = false;
    buttonForest.classList.remove("color");
    forestSound.pause();

    forestvol.classList.add("hidevolume");
  } else {
    forestIsActive = true;
    buttonForest.classList.add("color");
    forestSound.play();

    forestvol.classList.remove("hidevolume");
  }
});

buttonRain.addEventListener("click", function () {
  if (rainIsActive) {
    rainIsActive = false;
    buttonRain.classList.remove("color");
    rainSound.pause();
    rainvol.classList.add("hidevolume");
  } else {
    rainIsActive = true;
    buttonRain.classList.add("color");
    rainSound.play();

    rainvol.classList.remove("hidevolume");
  }
});

buttonHome.addEventListener("click", function () {
  if (homeIsActive) {
    homeIsActive = false;
    buttonHome.classList.remove("color");
    homeSound.pause();
    homevol.classList.add("hidevolume");
  } else {
    homeIsActive = true;
    buttonHome.classList.add("color");
    homeSound.play();

    homevol.classList.remove("hidevolume");
  }
});

buttonFire.addEventListener("click", function () {
  if (fireIsActive) {
    fireIsActive = false;
    buttonFire.classList.remove("color");
    fireSound.pause();
    firevol.classList.add("hidevolume");
  } else {
    fireIsActive = true;
    buttonFire.classList.add("color");
    fireSound.play();

    firevol.classList.remove("hidevolume");
  }
});
