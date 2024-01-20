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
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Deletar';
    deleteButton.onclick = function() {
      tasks.splice(index, 1);
      displayTasks();
    };
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
}

// Função para salvar as tarefas
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Função para limpar as tarefas
function clearTasks() {
  tasks = [];
  displayTasks();
  localStorage.removeItem('tasks');
}

// Verificar se há tarefas salvas
const storedTasks = localStorage.getItem('tasks');
if (storedTasks) {
  tasks = JSON.parse(storedTasks);
  displayTasks();
}
