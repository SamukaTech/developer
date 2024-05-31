const wrapper = document.querySelector(".wrapper"),
  qrInput = wrapper.querySelector(".form input"),
  generateBtn = wrapper.querySelector(".form button"),
  qrImg = wrapper.querySelector(".qr-code img"),
  downloadBtn = wrapper.querySelector("#downloadBtn");

let preValue;

generateBtn.addEventListener("click", () => {
  let qrValue = qrInput.value.trim();
  if (!qrValue) {
    alert("Por favor, insira um texto ou URL.");
    return;
  }
  if (preValue === qrValue) return;
  preValue = qrValue;
  generateBtn.innerText = "Gerando QR Code...";
  qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
  qrImg.addEventListener("load", () => {
    wrapper.classList.add("active");
    generateBtn.innerText = "Gerar QR Code";
    downloadBtn.style.display = "inline";
    // Atualização: Adicionando um atributo "href" ao botão de download
    downloadBtn.href = qrImg.src;
    // Atualização: Definindo o atributo "download" para que o navegador saiba que é um arquivo para download
    downloadBtn.setAttribute("download", "qrcode.png");
  });
});

qrInput.addEventListener("keyup", () => {
  if (!qrInput.value.trim()) {
    wrapper.classList.remove("active");
    preValue = "";
    downloadBtn.style.display = "none";
  }
});
