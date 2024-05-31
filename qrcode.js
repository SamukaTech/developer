const wrapper = document.querySelector(".wrapper"),
  qrInput = wrapper.querySelector(".form input"),
  generateBtn = wrapper.querySelector("#generateBtn"),
  qrImg = wrapper.querySelector(".qr-code img"),
  qrCanvas = wrapper.querySelector("#qrCodeCanvas"),
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

  // Gerar QR Code usando API
  qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
  qrImg.addEventListener("load", () => {
    wrapper.classList.add("active");
    generateBtn.innerText = "Gerar QR Code";
    downloadBtn.style.display = "inline";

    // Desenhar QR Code no canvas
    const ctx = qrCanvas.getContext("2d");
    qrCanvas.width = qrImg.width;
    qrCanvas.height = qrImg.height;
    ctx.drawImage(qrImg, 0, 0);
  });
});

qrInput.addEventListener("keyup", () => {
  if (!qrInput.value.trim()) {
    wrapper.classList.remove("active");
    preValue = "";
    downloadBtn.style.display = "none";
  }
});

downloadBtn.addEventListener("click", () => {
  // Converter o canvas para um link de download
  const link = document.createElement("a");
  link.href = qrCanvas.toDataURL("image/png");
  link.download = "qrcode.png";
  link.click();
});
