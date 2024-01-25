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
    deleteButton.textContent = 'Deletar🗑️';
    deleteButton.classList.add('delete'); // Adicionando classe "delete"
    deleteButton.onclick = function() {
      tasks.splice(index, 1);
      displayTasks();
    };
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
  saveTasks();
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

// Função para salvar as tarefas no localStorage
function salvarTarefas() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Função para adicionar uma nova tarefa
function adicionarTarefa() {
  const tarefa = document.getElementById('taskInput').value;
  tasks.push(tarefa);
  displayTasks();
  document.getElementById('taskInput').value = '';
  exibirPopUp(); // Chama a função para exibir o pop-up
}

// Verificar se existem tarefas salvas no localStorage
window.onload = function() {
  if(localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    displayTasks();
  }
      }
// Notificação quando as anotações são salvas
document.getElementById('botsalva').addEventListener('click', function() {
  document.getElementById('meuPopup').style.display = 'block';
  document.getElementById('mensagem').innerText = 'Anotações salvas com sucesso! ✅';

  setTimeout(function(){
    document.getElementById('meuPopup').style.display = 'none';
  }, 4000);
});

