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

// Armazena lembretes localmente e os verifica periodicamente
self.reminders = [];

function scheduleReminder(task) {
  const taskDateTime = new Date(`${task.date}T${task.time}`).getTime();
  const now = Date.now();
  const delay = taskDateTime - now;

  if (delay > 0) {
    console.log(`⏳ Lembrete agendado para ${task.date} às ${task.time}`);

    self.reminders.push({
      text: task.text,
      time: taskDateTime,
    });

    setTimeout(() => {
      showNotification(task.text);
    }, delay);
  }
}

// Exibir a notificação
function showNotification(text) {
  self.registration.showNotification("🔔 Lembrete de Anotação", {
    body: text,
    icon: "icon.png",
    vibrate: [200, 100, 200],
  });
}
