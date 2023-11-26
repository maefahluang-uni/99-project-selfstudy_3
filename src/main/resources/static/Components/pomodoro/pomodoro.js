const modeochange = document.getElementById("Modeo");
const progressBar = document.getElementById("progress-bar");
const timerDisplay = document.getElementById("timer");
const resetButton = document.getElementById("resetButton");
const toggleButton = document.getElementById("toggleButton");
const saveButton = document.getElementById("saveButton");
const defaultButton = document.getElementById("defaultButton");
const changeTimerLink = document.getElementById("changeTimerLink");
const cancelButton = document.getElementById("cancelButton");
const BigAlert = document.getElementById("BigAlertId");

// Pomodoro Using
let hours = 0;
let minutes = 25;
let seconds = 0;
let percento = 100 / (hours * 3600 + minutes * 60 + seconds); // this is % of gauge

// For fixed Pomodoro  for default
let fixedhours = 0;
let fixedminutes = 25;
let fixedseconds = 0;
let fixpercento = 100 / (fixedhours * 3600 + fixedminutes * 60 + fixedseconds); // this is % of gauge\
// For custom Pomodoro
let customhours = 0;
let customminutes = 0;
let customseconds = 0;
let custompercento =
  100 / (customhours * 3600 + customminutes * 60 + customseconds); // this is % of gauge

// For custom Break
let custombreakhours = 0;
let custombreakminutes = 0;
let custombreakseconds = 0;
let custombreakpercento =
  100 /
  (custombreakhours * 3600 + custombreakminutes * 60 + custombreakseconds); // this is % of gauge
// For fixed for break default
let breakfixhours = 0;
let breakfixmin = 5;
let breakfixsec = 0;
let breakpercento =
  100 / (breakfixhours * 3600 + breakfixmin * 60 + breakfixsec); // this is % of gauge

// Default value
let custompomodoro = false;
let custombreak = false;
let filled = 0;
let isRunning = false;
let timerInterval = null;
let DateTime = "";
let Time = "";
let Timezone = "";
let pomodoroMode = true;

function updateDisplay() {
  progressBar.style.width = filled + "%";
  const formattedHours = hours < 10 ? "0" + hours : hours;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
  timerDisplay.textContent =
    formattedHours + ":" + formattedMinutes + ":" + formattedSeconds;
}

function switchMode() {
  if (pomodoroMode === true) {
    // Switch to break mode

    if (custombreak === true) {
      hours = custombreakhours;
      minutes = custombreakminutes;
      seconds = custombreakseconds;
      filled -= custombreakpercento;
    } else {
      hours = breakfixhours;
      minutes = breakfixmin;
      seconds = breakfixsec;
      filled -= breakpercento;
    }
  } else {
    // Switch to Pomodoro mode

    if (custompomodoro === true) {
      hours = customhours;
      minutes = customminutes;
      seconds = customseconds;
      filled += custompercento;
    } else {
      hours = fixedhours;
      minutes = fixedminutes;
      seconds = fixedseconds;
      filled += fixpercento;
    }
  }

  pomodoroMode = !pomodoroMode;
  isRunning = true;
}

function updateTimer() {
  if (isRunning) {
    timerInterval = setInterval(() => {
      if (seconds === 0 && minutes === 0 && hours === 0) {
        clearInterval(timerInterval);
        if (pomodoroMode === true) {
          switchMode();
          filled = 100;
          modeochange.textContent = "BREAK";
          modeochange.title = "Take a break.";
          updateTimer();
        } else {
          switchMode();
          filled = 0;
          modeochange.textContent = "POMODORO";
          modeochange.title = "Keep focus.";
          updateTimer();
        }
      } else if (seconds === 0 && minutes === 0) {
        hours -= 1;
        minutes = 59;
        seconds = 59;
        if (pomodoroMode === true) {
          filled += percento;
        } else {
          filled -= breakpercento;
        }
      } else if (seconds === 0) {
        minutes -= 1;
        seconds = 59;
        if (pomodoroMode === true) {
          filled += percento;
        } else {
          filled -= breakpercento;
        }
      } else {
        seconds -= 1;
        if (pomodoroMode === true) {
          filled += percento;
        } else {
          filled -= breakpercento;
        }
      }
      updateDisplay();
    }, 1000);
  } else {
    clearInterval(timerInterval);
  }
}

toggleButton.addEventListener("click", () => {
  isRunning = !isRunning; // Toggle the running state
  if (isRunning) {
    updateTimer();
    toggleButton.textContent = "Stop"; // Change button text to "Stop"
  } else {
    clearInterval(timerInterval);
    toggleButton.textContent = "Start"; // Change button text to "Start"
  }
});

resetButton.addEventListener("click", () => {
  if (custompomodoro === true) {
    pomodoroMode = true;
    hours = customhours;
    minutes = customminutes;
    seconds = customseconds;
    percento = custompercento;
    filled = 0;
  } else {
    hours = fixedhours;
    minutes = fixedminutes;
    seconds = fixedseconds;
    filled = 0;
  }
  modeochange.textContent = "POMODORO";
  modeochange.title = "Keep focus.";
  isRunning = false;
  clearInterval(timerInterval);
  toggleButton.textContent = "Start";
  updateDisplay();
});

saveButton.addEventListener("click", () => {
  const hourFocus = parseInt(document.getElementById("hourInput").value) || 0;
  const minuteFocus =
    parseInt(document.getElementById("minuteInput").value) || 0;
  const secondFocus =
    parseInt(document.getElementById("secondInput").value) || 0;
  const hourBreak = parseInt(document.getElementById("Breakhour").value) || 0;
  const minuteBreak =
    parseInt(document.getElementById("Breakminute").value) || 0;
  const secondBreak =
    parseInt(document.getElementById("Breaksecond").value) || 0;
  const opSqureContent = document.querySelector(".OpSqure");
  const inputFields = document.querySelector(".input-fields");
  customhours = hourFocus;
  customminutes = minuteFocus;
  customseconds = secondFocus;
  custombreakhours = hourBreak;
  custombreakminutes = minuteBreak;
  custombreakseconds = secondBreak;
  custompercento = 100 / (hourFocus * 3600 + minuteFocus * 60 + secondFocus);
  custombreakpercento =
    100 / (hourBreak * 3600 + minuteBreak * 60 + secondBreak);
  hours = customhours;
  minutes = customminutes;
  seconds = customseconds;
  percento = custompercento;
  breakpercento = custombreakpercento;
  custompomodoro = true;
  custombreak = true;
  if (
    (hourFocus <= 0 && minuteFocus <= 0 && secondFocus <= 0) ||
    (hourBreak <= 0 && minuteBreak <= 0 && secondBreak <= 0)
  ) {
    alert("Please set time more than 0 seconds");
  } else {
    opSqureContent.style.display = "block";
    inputFields.style.display = "none";
  }

  updateDisplay();
});
defaultButton.addEventListener("click", () => {
  hours = fixedhours;
  minutes = fixedminutes;
  seconds = fixedseconds;
  percento = fixpercento;
  custompomodoro = false;

  const opSqureContent = document.querySelector(".OpSqure");
  const inputFields = document.querySelector(".input-fields");
  opSqureContent.style.display = "block";
  inputFields.style.display = "none";
  updateDisplay();
});

changeTimerLink.addEventListener("click", () => {
  var EditorNot = confirm("Mode will be change back to POMODORO after edit.");
  if (EditorNot) {
    clearInterval(timerInterval);
    isRunning = false;
    if (custompomodoro === true) {
      pomodoroMode = true;
      modeochange.textContent = "POMODORO";
      modeochange.title = "Keep focus.";
      filled = 0;
      hours = customhours;
      minutes = customminutes;
      seconds = customseconds;
      percento = custompercento;
      updateDisplay();
    } else {
      pomodoroMode = true;
      modeochange.textContent = "POMODORO";
      modeochange.title = "Keep focus.";
      hours = fixedhours;
      minutes = fixedminutes;
      seconds = fixedseconds;
      percento = fixpercento;
      filled = 0;
      updateDisplay();
    }
    toggleButton.textContent = "Start";
    const opSqureContent = document.querySelector(".OpSqure");
    const inputFields = document.querySelector(".input-fields");
    opSqureContent.style.display = "none";
    inputFields.style.display = "block";
  }
});

cancelButton.addEventListener("click", () => {
  const opSqureContent = document.querySelector(".OpSqure");
  const inputFields = document.querySelector(".input-fields");
  opSqureContent.style.display = "block";
  inputFields.style.display = "none";
});
updateDisplay();
