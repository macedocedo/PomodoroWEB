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

// Função para criar um novo bloco
function criarBloco() {
  var container = document.getElementById("container");
  var bloco = document.createElement("div");
  bloco.classList.add("bloco");
  bloco.draggable = true;
  container.appendChild(bloco);

  // Adiciona evento de movimento ao bloco
  bloco.addEventListener("mousedown", function(event) {
      var posX = event.clientX;
      var posY = event.clientY;
      var offsetX = posX - parseFloat(getComputedStyle(bloco).left);
      var offsetY = posY - parseFloat(getComputedStyle(bloco).top);

      function moveElement(event) {
          bloco.style.left = event.clientX - offsetX + "px";
          bloco.style.top = event.clientY - offsetY + "px";
      }

      function stopMove() {
          window.removeEventListener("mousemove", moveElement);
          window.removeEventListener("mouseup", stopMove);
      }

      window.addEventListener("mousemove", moveElement);
      window.addEventListener("mouseup", stopMove);
  });

  // Adiciona evento de duplo clique para adicionar texto
  bloco.addEventListener("dblclick", function() {
      var texto = prompt("Digite a informação:");
      if (texto !== null) {
          bloco.textContent = texto;
      }
  });
}

// Cria um novo bloco quando o documento estiver pronto
document.addEventListener("DOMContentLoaded", function() {
  criarBloco(); // Cria um bloco inicial

  // Adiciona evento de clique ao botão para adicionar mais blocos
  document.getElementById("adicionarBloco").addEventListener("click", function() {
      criarBloco();
  });
});


document.addEventListener("DOMContentLoaded", function() {
  var btnAdicionarTarefa = document.getElementById("adicionarTarefa");
  var inputNovaTarefa = document.getElementById("novaTarefa");
  var listaTarefas = document.getElementById("listaTarefas");

  btnAdicionarTarefa.addEventListener("click", function() {
      var novaTarefaTexto = inputNovaTarefa.value.trim();
      if (novaTarefaTexto !== "") {
          adicionarTarefa(novaTarefaTexto);
          inputNovaTarefa.value = ""; // Limpa o campo de entrada após adicionar a tarefa
      } else {
          alert("Por favor, insira uma tarefa válida!");
      }
  });

  function adicionarTarefa(texto) {
      var novaTarefa = document.createElement("li");
      novaTarefa.textContent = texto;
      listaTarefas.appendChild(novaTarefa);
  }
});

document.getElementById("playAlarm").addEventListener("click", function() {
  var alarmeAudio = document.getElementById("alarmSound");
  alarmeAudio.play();
});


// Reproduz o som do ding
function playDing() {
  const dingSound = document.getElementById('ding');
  dingSound.play();
}
