let timer;
let timeLeft = 1500; // 25 minutes in seconds
let timerRunning = false;
let paused = false;
let initialTime = 0;

function startTimer(duration) {
  if (!timerRunning) {
    if (!paused) {
      timeLeft = duration;
      initialTime = duration;
    }
    timerRunning = true;
    timer = setInterval(updateTimer, 1000);
    document.getElementById('startButton').innerText = "Pause";
    paused = false;
  } else {
    clearInterval(timer);
    timerRunning = false;
    document.getElementById('startButton').innerText = "Resume";
    paused = true;
  }
}

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  
  document.getElementById('timerDisplay').innerText = `${minutes}:${seconds}`;
  
  if (timeLeft === 0) {
    clearInterval(timer);
    timerRunning = false;
    document.getElementById('startButton').innerText = "Start";
    alert("Time's up!");
  } else {
    timeLeft--;
  }
}

function resetTimer() {
  clearInterval(timer);
  timerRunning = false;
  timeLeft = initialTime;
  document.getElementById('timerDisplay').innerText = `${Math.floor(timeLeft / 60)}:${timeLeft % 60 < 10 ? '0' + timeLeft % 60 : timeLeft % 60}`;
  document.getElementById('startButton').innerText = 'Start';
  paused = false;
}

function addCard() {
  const cardContent = document.getElementById('cardContent').value.trim();
  
  if (cardContent !== '') {
    const card = document.createElement('div');
    card.classList.add('card');
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', function() {
      card.classList.toggle('completed');
    });
    card.appendChild(checkbox);
    
    const content = document.createElement('span');
    content.innerText = cardContent;
    card.appendChild(content);
  
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', function() {
      card.remove();
    });
    card.appendChild(deleteButton);
  
    document.getElementById('cardsContainer').appendChild(card);
  
    document.getElementById('cardContent').value = '';
  }
}




// Reproduz o som do ding
function playDing() {
  const dingSound = document.getElementById('ding');
  dingSound.play();
}
