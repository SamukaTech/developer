self.addEventListener("install", (event) => {
    console.log("Service Worker instalado");
    self.skipWaiting(); // Ativa imediatamente
  });
  
  self.addEventListener("activate", (event) => {
    console.log("Service Worker ativado");
  });
  
  self.addEventListener("push", (event) => {
    const data = event.data ? event.data.text() : "Você tem um novo lembrete!";
    event.waitUntil(
      self.registration.showNotification("🔔 Lembrete de Anotação", {
        body: data,
        icon: "icon.png",
        vibrate: [200, 100, 200],
      })
    );
  });
  