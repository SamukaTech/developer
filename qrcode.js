const wrapper = document.querySelector(".wrapper"),
  qrInput = wrapper.querySelector(".form input"),
  generateBtn = wrapper.querySelector(".form button"),
  qrImg = wrapper.querySelector(".qr-code img");
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
  });
});

qrInput.addEventListener("keyup", () => {
  if (!qrInput.value.trim()) {
    wrapper.classList.remove("active");
    preValue = "";
  }
});

qrImg.addEventListener("click", () => {
  if (qrImg.src !== "") {
    var link = document.createElement("a");
    link.href = qrImg.src;
    link.download = "qrcode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
});
