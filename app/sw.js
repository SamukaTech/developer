self.addEventListener("install", (event) => {
    console.log("Service Worker instalado");
    self.skipWaiting();
  });
  
  self.addEventListener("activate", (event) => {
    console.log("Service Worker ativado");
  });
  
  // Evento para verificar lembretes no background
  self.addEventListener("periodicsync", async (event) => {
    if (event.tag === "check-reminders") {
      console.log("🔄 Verificando lembretes em segundo plano...");
      const tasks = await getStoredTasks();
      checkReminders(tasks);
    }
  });
  
  // Função para recuperar as tarefas do armazenamento local
  async function getStoredTasks() {
    return new Promise((resolve) => {
      self.registration.storage.get("tasks", (data) => {
        resolve(data.tasks || []);
      });
    });
  }
  
  // Função para verificar lembretes
  function checkReminders(tasks) {
    const now = new Date();
    tasks.forEach((task) => {
      if (task.date && task.time && !task.notified) {
        const [day, month, year] = task.date.split('/');
        const formattedDate = `${year}-${month}-${day}`;
        const taskDateTime = new Date(`${formattedDate}T${task.time}`);
  
        if (taskDateTime <= now) {
          showNotification(task.text);
          task.notified = true;
          saveTasks(tasks);
        }
      }
    });
  }
  
  // Função para exibir notificações
  function showNotification(text) {
    self.registration.showNotification("🔔 Lembrete de Anotação", {
      body: text,
      icon: "icon.png",
      vibrate: [200, 100, 200],
    });
  }
  
  // Salvar estado atualizado das tarefas
  async function saveTasks(tasks) {
    self.registration.storage.set({ tasks });
  }
  