// Array para armazenar as tarefas
let tasks = [];

// Função para adicionar uma tarefa
function addTask() {
  const taskInput = document.getElementById('taskInput');
  const task = taskInput.value.trim();
  if (task !== '') {
    tasks.push(task);
    displayTasks();
    taskInput.value = '';
  }
}

// Função para exibir as tarefas
function displayTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task;
    taskList.appendChild(li);
  });
}

// Função para salvar as tarefas
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Verificar se há tarefas salvas
const storedTasks = localStorage.getItem('tasks');
if (storedTasks) {
  tasks = JSON.parse(storedTasks);
  displayTasks();
  }
