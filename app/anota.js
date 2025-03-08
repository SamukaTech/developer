let tasks = [];

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js")
    .then((registration) => {
      console.log("Service Worker registrado com sucesso!", registration);
    })
    .catch((error) => {
      console.log("Erro ao registrar Service Worker:", error);
    });
}

// -------------------- ADICIONAR ANOTAÇÃO --------------------

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const categoryInput = document.getElementById("categoryInput");
  const dateInput = document.getElementById("dateInput");
  const timeInput = document.getElementById("timeInput");
  const task = taskInput.value.trim();
  const category = categoryInput.value;
  const date = dateInput.value;
  const time = timeInput.value;

  if (task !== "") {
    const newTask = { text: task, category: category, date: date, time: time };
    tasks.unshift(newTask);
    taskInput.value = "";
    categoryInput.value = "";
    dateInput.value = "";
    timeInput.value = "";
    displayTasks();
    scheduleNotification(newTask);
  }
}


// -------------------- FORMATAR DATA --------------------

function formatDate(date) {
  if (!date) return "";
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}

// -------------------- EXIBIR ANOTAÇÕES --------------------

function displayTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text + 
                    (task.category ? " [" + task.category + "]" : "") + 
                    (task.date ? " " + task.date : "") + 
                    (task.time ? " " + task.time : "");

    // Tornar a anotação arrastável
    li.setAttribute("draggable", true);
    li.setAttribute("data-index", index);
    li.addEventListener("dragstart", dragStart);
    li.addEventListener("dragover", dragOver);
    li.addEventListener("drop", drop);
    li.addEventListener("dragend", dragEnd);

    if (document.body.classList.contains('dark-mode')) {
      li.classList.add('dark-mode');
    }
    
    const buttonDiv = document.createElement("div");

    const editButton = document.createElement("button");
    const editImage = document.createElement("img");
    editImage.src = "https://cdn-icons-png.flaticon.com/512/4226/4226577.png";
    editImage.alt = "Editar";
    editButton.addEventListener("click", function () {
      editTask(index);
    });
    editButton.appendChild(editImage);

    const deleteButton = document.createElement("button");
    const deleteImage = document.createElement("img");
    deleteImage.src = "https://png.pngtree.com/png-vector/20220812/ourmid/pngtree-png-tempat-sampah-organik-merah-png-image_6107121.png";
    deleteImage.alt = "Deletar";
    deleteButton.addEventListener("click", function () {
      removeTask(index);
    });
    deleteButton.appendChild(deleteImage);

    buttonDiv.appendChild(editButton);
    buttonDiv.appendChild(deleteButton);

    li.appendChild(buttonDiv);
    taskList.appendChild(li);
  });

  saveTasks(); // Apenas salva no localStorage, sem exibir notificação
}

function displayFilteredTasks(filteredTasks) {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  filteredTasks.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = task.text + 
                    (task.category ? " [" + task.category + "]" : "") + 
                    (task.date ? " " + task.date : "") + 
                    (task.time ? " " + task.time : "");

    const buttonDiv = document.createElement("div");

    // Encontrar o índice correto da anotação na lista original (tasks)
    const originalIndex = tasks.findIndex(t => t.text === task.text && t.date === task.date && t.time === task.time);

    // Botão de Editar
    const editButton = document.createElement("button");
    const editImage = document.createElement("img");
    editImage.src = "https://cdn-icons-png.flaticon.com/512/4226/4226577.png";
    editImage.alt = "Editar";
    editButton.addEventListener("click", function () {
      editTask(originalIndex);
    });
    editButton.appendChild(editImage);

    // Botão de Apagar
    const deleteButton = document.createElement("button");
    const deleteImage = document.createElement("img");
    deleteImage.src = "https://png.pngtree.com/png-vector/20220812/ourmid/pngtree-png-tempat-sampah-organik-merah-png-image_6107121.png";
    deleteImage.alt = "Deletar";
    deleteButton.addEventListener("click", function () {
      removeTask(originalIndex);
    });
    deleteButton.appendChild(deleteImage);

    buttonDiv.appendChild(editButton);
    buttonDiv.appendChild(deleteButton);

    li.appendChild(buttonDiv);
    taskList.appendChild(li);
  });
}


// -------------------- SALVAR E NOTIFICAR --------------------

function showPopup(message) {
  const popup = document.getElementById("meuPopup");
  const mensagem = document.getElementById("mensagem");
  mensagem.innerText = message;
  popup.style.display = "block";

  setTimeout(function () {
    popup.style.display = "none";
  }, 4000);
}

// Função que salva SEM mostrar notificação
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Função que salva E exibe notificação (chamada apenas no botão "Salvar Anotações")
function forceSaveTasks() {
  saveTasks();
  showPopup("Anotações salvas com sucesso! 🎉");
}

// -------------------- OUTRAS FUNÇÕES --------------------

function removeTask(index) {
  tasks.splice(index, 1);
  displayTasks();
}

function clearTasks() {
  const confirmation = confirm("Tem certeza de que deseja apagar todas as anotações?");
  if (confirmation) {
    tasks = [];
    displayTasks();
    localStorage.removeItem("tasks");
    showPopup("Todas as anotações foram apagadas com sucesso!");
  }
}

function editTask(index) {
  const newTask = prompt("Editar a anotação:", tasks[index].text);
  if (newTask !== null) {
    tasks[index].text = newTask.trim();
    displayTasks();
  }
}

// --------------------- DRAG & DROP ---------------------

let draggedItem = null;

function dragStart(event) {
  draggedItem = event.target;
  event.target.style.opacity = "0.5";
}

function dragOver(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  if (event.target.tagName === "LI") {
    const draggedIndex = draggedItem.getAttribute("data-index");
    const targetIndex = event.target.getAttribute("data-index");

    // Troca as posições no array
    const draggedTask = tasks.splice(draggedIndex, 1)[0];
    tasks.splice(targetIndex, 0, draggedTask);

    displayTasks(); // Atualiza a interface
  }
}

function dragEnd(event) {
  event.target.style.opacity = "1";
  saveTasks(); // Apenas salva no localStorage, sem exibir notificação
}

// -------------------- MODO ESCURO --------------------

function toggleDarkMode() {
  const body = document.body;
  const taskListItems = document.querySelectorAll('.task-list li');
  body.classList.toggle('dark-mode');
  taskListItems.forEach(item => item.classList.toggle('dark-mode'));
}

// -------------------- PESQUISAR ANOTAÇÕES --------------------

function searchTasks() {
  const searchInput = document.getElementById("searchInput").value.toLowerCase();
  const categoryFilter = document.getElementById("categoryInput").value;

  filteredTasks = tasks.filter(task => {
    const matchText = searchInput === "" || task.text.toLowerCase().includes(searchInput);
    const matchCategory = categoryFilter === "" || task.category === categoryFilter;
    return matchText && matchCategory;
  });

  displayFilteredTasks(filteredTasks);
}


// -------------------- CARREGAR DADOS --------------------

window.onload = function () {
  // Carregar anotações do localStorage
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    displayTasks();
  }

  // Adiciona evento ao botão "Salvar Anotações"
  document.getElementById("botsalva").addEventListener("click", forceSaveTasks);

  window.onload = function () {
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          console.log("Notificações permitidas pelo usuário!");
        }
      });
    }
  
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      tasks = JSON.parse(savedTasks);
      displayTasks();
    }
  };
  
};
function scheduleNotification(task) {
  if ("serviceWorker" in navigator && "Notification" in window) {
    navigator.serviceWorker.ready.then((registration) => {
      const taskDateTime = new Date(`${task.date}T${task.time}`);
      const now = new Date();

      const delay = taskDateTime - now;

      if (delay > 0) {
        setTimeout(() => {
          registration.showNotification("🔔 Lembrete de Anotação", {
            body: `Não se esqueça: ${task.text}`,
            icon: "icon.png",
          });
        }, delay);
      }
    });
  }
}
