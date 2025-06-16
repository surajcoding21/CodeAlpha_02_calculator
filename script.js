let display = document.getElementById('display');
let historyList = document.getElementById('historyList');
let clickSound = document.getElementById('clickSound');

function playSound() {
  clickSound.currentTime = 0; // rewind to start
  clickSound.play();
}

function appendValue(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = '';
}

function clearEntry() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    let result = eval(display.value);
    addToHistory(`${display.value} = ${result}`);
    display.value = result;
  } catch {
    display.value = 'Error';
  }
}

function calculateFunction(func) {
  try {
    let value = parseFloat(display.value);
    let result;
    switch(func) {
      case 'sqrt': result = Math.sqrt(value); break;
      case 'sin': result = Math.sin(value * Math.PI / 180).toFixed(4); break;
      case 'cos': result = Math.cos(value * Math.PI / 180).toFixed(4); break;
      case 'tan': result = Math.tan(value * Math.PI / 180).toFixed(4); break;
      case 'log': result = Math.log10(value).toFixed(4); break;
    }
    addToHistory(`${func}(${value}) = ${result}`);
    display.value = result;
  } catch {
    display.value = 'Error';
  }
}

function addToHistory(entry) {
  let li = document.createElement('li');
  li.textContent = entry;
  historyList.appendChild(li);
}

document.addEventListener('keydown', function(event) {
  const key = event.key;
  if (!isNaN(key) || "+-*/.".includes(key)) {
    playSound();
    appendValue(key);
  } else if (key === "Enter") {
    playSound();
    calculate();
  } else if (key === "Backspace") {
    playSound();
    clearEntry();
  } else if (key === "Escape") {
    playSound();
    clearDisplay();
  }
});
