self.addEventListener("install", (event) => {
    console.log("✅ Service Worker instalado");
    self.skipWaiting();
  });
  
  self.addEventListener("activate", (event) => {
    console.log("✅ Service Worker ativado");
  });
  
  self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "scheduleReminder") {
      scheduleReminder(event.data.task);
    }
  });
  
  // Agendar um alarme para o lembrete
  function scheduleReminder(task) {
    const taskDateTime = new Date(`${task.date}T${task.time}`).getTime();
    const now = Date.now();
    const delay = taskDateTime - now;
  
    if (delay > 0) {
      setTimeout(() => {
        showNotification(task.text);
      }, delay);
    }
  }
  
  // Exibir notificação na hora certa
  function showNotification(text) {
    self.registration.showNotification("🔔 Lembrete de Anotação", {
      body: text,
      icon: "icon.png",
      vibrate: [200, 100, 200],
    });
  }
  