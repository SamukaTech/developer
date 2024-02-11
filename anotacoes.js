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

    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('button-div');

    const deleteButton = document.createElement('button');
    const deleteImage = document.createElement('img');
    deleteImage.src = "https://png.pngtree.com/png-vector/20220812/ourmid/pngtree-png-tempat-sampah-organik-merah-png-image_6107121.png";
    deleteImage.alt = "Deletar";
    deleteImage.classList.add('delete-image');

    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', function() {
      removeTask(index);
    });
    deleteButton.appendChild(deleteImage);

    const editButton = document.createElement('button');
    const editImage = document.createElement('img');
    editImage.src = "https://cdn-icons-png.flaticon.com/512/4226/4226577.png";
    editImage.alt = "Editar";
    editImage.classList.add('edit-image');

    editButton.classList.add('edit-button');
    editButton.addEventListener('click', function() {
      editTask(index);
    });
    editButton.appendChild(editImage);

    buttonDiv.appendChild(editButton);
    buttonDiv.appendChild(deleteButton);

    li.appendChild(buttonDiv);
    taskList.appendChild(li);
  });
  saveTasks();
}


    // Função para remover uma tarefa
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

    // Função para editar uma tarefa
    function editTask(index) {
      const newTask = prompt('Editar a anotação:', tasks[index]);
      if (newTask !== null) {
        tasks[index] = newTask.trim();
        displayTasks();
        adicionarBotaoDeletar();
      }
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
 function clearTasks() {
            const confirmacao = confirm("Tem certeza de que deseja apagar todas as anotações?");
            if (confirmacao) {
                document.getElementById('anotacoes').innerText = ""; // Apaga todas as anotações
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
