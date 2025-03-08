self.addEventListener("install", (event) => {
    console.log("Service Worker instalado");
    self.skipWaiting();
  });
  
  self.addEventListener("activate", (event) => {
    console.log("Service Worker ativado");
  });
  
  self.addEventListener("push", function (event) {
    const data = event.data.json();
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "icon.png",
    });
  });
  