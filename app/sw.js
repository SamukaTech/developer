self.addEventListener("install", (event) => {
    console.log("Service Worker instalado");
    self.skipWaiting();
  });
  
  self.addEventListener("activate", (event) => {
    console.log("Service Worker ativado");
  });
  
  self.addEventListener("periodicsync", async (event) => {
    if (event.tag === "check-reminders") {
      console.log("🔔 Verificando lembretes...");
      const tasks = await getStoredTasks();
      checkReminders(tasks);
    }
  });
  
  // Recupera as anotações do armazenamento
  async function getStoredTasks() {
    return new Promise((resolve) => {
      self.registration.storage.get("tasks", (data) => {
        resolve(data.tasks || []);
      });
    });
  }
  
  // Verifica se há lembretes para exibir notificações
  function checkReminders(tasks) {
    const now = new Date();
    tasks.forEach((task) => {
      if (task.date && task.time && !task.notified) {
        const taskDateTime = new Date(`${task.date}T${task.time}`);
        if (taskDateTime <= now) {
          showNotification(task.text);
          task.notified = true;
          saveTasks(tasks);
        }
      }
    });
  }
  
  // Exibe a notificação no horário do lembrete
  function showNotification(text) {
    self.registration.showNotification("🔔 Lembrete de Anotação", {
      body: text,
      icon: "icon.png",
      vibrate: [200, 100, 200],
    });
  }
  
  // Salva as tarefas atualizadas
  async function saveTasks(tasks) {
    self.registration.storage.set({ tasks });
  }
  