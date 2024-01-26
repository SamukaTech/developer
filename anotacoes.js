// Array para armazenar as tarefas
let tasks = [];

// Função para adicionar uma tarefa
function addTask() {
  const taskInput = document.getElementById('taskInput');
  const task = taskInput.value.trim();
  if (task !== '') {
    tasks.push(task);
    taskInput.value = ''; // Limpa o valor da caixa de texto antes de adicionar a tarefa
    displayTasks();
    adicionarBotaoDeletar();
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
    const deleteImage = document.createElement('img');
    deleteImage.src = "imagens/lixeira.jpg";
    deleteImage.alt = "Deletar";

    // Definir propriedades de estilo da imagem
    deleteImage.style.width = "32px"; // Ajuste a largura conforme necessário
    deleteImage.style.height = "32px"; // Ajuste a altura conforme necessário
    deleteImage.style.borderRadius = "50%"; // 50% para tornar a imagem completamente redonda, ajuste conforme necessário
    
    // Adicionar uma classe ao botão para estilo de ajuste de tamanho
    deleteButton.classList.add('delete-button');

    // Estilo CSS para ajustar o tamanho do botão sem afetar a imagem
const style = document.createElement('style');
style.textContent = `
  .delete-button {
    padding: 5px; /* Ajuste o valor conforme necessário */
    border: none; /* Remove a borda do botão se houver */
    background-color: transparent; /* Define a cor de fundo como transparente para remover qualquer cor de fundo padrão */
  }
`;
document.head.appendChild(style);
    
    // Adicionar evento de clique ao botão de deletar
    deleteButton.addEventListener('click', function() {
      removeTask(index);
    });
    
    deleteButton.appendChild(deleteImage);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
  saveTasks();
}
    
function removeTask(index) {
  tasks.splice(index, 1);
  displayTasks();
  adicionarBotaoDeletar();
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
  const tarefaInput = document.getElementById('taskInput');
  const tarefa = tarefaInput.value.trim();
  if (tarefa !== '') {
    tasks.push(tarefa);
    displayTasks();
    adicionarBotaoDeletar();
    tarefaInput.value = ''; // Limpa o valor da caixa de texto
    exibirPopUp(); // Chama a função para exibir o pop-up
  }
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
  document.getElementById('mensagem').innerText = 'Anotações salvas com sucesso! 🎉';

  setTimeout(function(){
    document.getElementById('meuPopup').style.display = 'none';
  }, 4000);
});
