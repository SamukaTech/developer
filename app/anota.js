let tasks = [];
let filteredTasks = [];

// Registra o Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js")
    .then(() => console.log("Service Worker registrado com sucesso!"))
    .catch((error) => console.log("Erro ao registrar Service Worker:", error));
}

// Solicita permissão de notificação
if (Notification.permission !== "granted") {
  Notification.requestPermission();
}

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const categoryInput = document.getElementById('categoryInput');
  const dateInput = document.getElementById('dateInput');
  const timeInput = document.getElementById('timeInput');
  const task = taskInput.value.trim();
  const category = categoryInput.value;
  const date = formatDate(dateInput.value);
  const time = timeInput.value;

  if (task !== '') {
    tasks.unshift({ text: task, category: category, date: date, time: time }); // Adiciona ao início da lista
    taskInput.value = '';
    categoryInput.value = '';
    dateInput.value = '';
    timeInput.value = '';
    displayTasks();
  }
}


function formatDate(date) {
  if (!date) return '';
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
}

function displayTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
  const tasksToDisplay = filteredTasks.length > 0 ? filteredTasks : tasks;
  tasksToDisplay.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task.text + (task.category ? ' [' + task.category + ']' : '') + (task.date ? ' ' + task.date : '') + (task.time ? ' ' + task.time : '');
    
    if (document.body.classList.contains('dark-mode')) {
      li.classList.add('dark-mode');
    }

    const buttonDiv = document.createElement('div');

    const editButton = document.createElement('button');
    const editImage = document.createElement('img');
    editImage.src = "https://cdn-icons-png.flaticon.com/512/4226/4226577.png";
    editImage.alt = "Editar";

    editButton.addEventListener('click', function() {
      editTask(index, tasksToDisplay === filteredTasks);
    });
    editButton.appendChild(editImage);

    const deleteButton = document.createElement('button');
    const deleteImage = document.createElement('img');
    deleteImage.src = "https://png.pngtree.com/png-vector/20220812/ourmid/pngtree-png-tempat-sampah-organik-merah-png-image_6107121.png";
    deleteImage.alt = "Deletar";

    deleteButton.addEventListener('click', function() {
      removeTask(index, tasksToDisplay === filteredTasks);
    });
    deleteButton.appendChild(deleteImage);

    buttonDiv.appendChild(editButton);
    buttonDiv.appendChild(deleteButton);

    li.appendChild(buttonDiv);
    taskList.appendChild(li);
  });
}

function removeTask(index, isFiltered) {
  if (isFiltered) {
    const taskToRemove = filteredTasks[index];
    tasks = tasks.filter(task => task !== taskToRemove);
    filteredTasks.splice(index, 1);
  } else {
    tasks.splice(index, 1);
  }
  displayTasks();
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  showPopup('Anotações salvas com sucesso!');
}

function clearTasks() {
  const confirmation = confirm('Tem certeza de que deseja apagar todas as anotações?');
  if (confirmation) {
    tasks = [];
    displayTasks();
    localStorage.removeItem('tasks');
    showPopup('Todas as anotações foram apagadas com sucesso!');
  }
}

function editTask(index, isFiltered) {
  const taskToEdit = isFiltered ? filteredTasks[index] : tasks[index];
  const newTask = prompt('Editar a anotação:', taskToEdit.text);
  if (newTask !== null) {
    taskToEdit.text = newTask.trim();
    displayTasks();
  }
}

function searchTasks() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  filteredTasks = tasks.filter(task => task.text.toLowerCase().includes(searchInput));
  displayTasks();
}

function showPopup(message) {
  const popup = document.getElementById('meuPopup');
  const mensagem = document.getElementById('mensagem');
  mensagem.innerText = message;
  popup.style.display = 'block';
  setTimeout(function() {
    popup.style.display = 'none';
  }, 4000);
}

function toggleDarkMode() {
  const body = document.body;
  const taskListItems = document.querySelectorAll('.task-list li');
  body.classList.toggle('dark-mode');
  taskListItems.forEach(item => item.classList.toggle('dark-mode'));
}

window.onload = function() {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    displayTasks();
  }
}

// Função para verificar lembretes
function checkReminders() {
  const now = new Date();
  tasks.forEach((task, index) => {
    if (task.date && task.time && !task.notified) {
      const taskDateTime = new Date(`${task.date.split('/').reverse().join('-')}T${task.time}`);
      if (taskDateTime <= now) {
        showNotification(task.text);
        tasks[index].notified = true; // Marca como notificado
        saveTasks(); // Atualiza no armazenamento local
      }
    }
  });
}

function showNotification(text) {
  if (Notification.permission === "granted" && "serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.showNotification("🔔 Lembrete de Anotação", {
        body: text,
        icon: "icon.png",
        vibrate: [200, 100, 200]
      });
    });
  }
}
