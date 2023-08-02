document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const firstNameInput = document.getElementById("first-name-input");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const passwordInput = document.getElementById("password");
  const verifyPasswordInput = document.getElementById("verify-password");

  function submitForm() {
    // Resetando as mensagens de erro
    const errorMessages = document.getElementsByClassName("error-message");
    for (let i = 0; i < errorMessages.length; i++) {
      errorMessages[i].style.display = "none";
    }

    // Verificando os campos obrigatórios
    let isValid = true;

    if (firstNameInput.value.trim() === "") {
      document.getElementById("empty-first-name").style.display = "block";
      isValid = false;
    }

    if (emailInput.value.trim() === "") {
      document.getElementById("empty-email").style.display = "block";
      isValid = false;
    } else {
      // Verificando formato do e-mail usando expressão regular
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value)) {
        document.getElementById("email-error").style.display = "block";
        isValid = false;
      }
    }

    if (phoneInput.value.trim() === "") {
      document.getElementById("empty-phone").style.display = "block";
      isValid = false;
    } else {
      // Verificando se o número de telefone tem 9 dígitos
      const phoneRegex = /^\d{9}$/;
      if (!phoneRegex.test(phoneInput.value)) {
        document.getElementById("phone-error").style.display = "block";
        isValid = false;
      }
    }

    if (passwordInput.value.trim() === "") {
      document.getElementById("empty-password").style.display = "block";
      isValid = false;
    } else {
      // Verificando a senha usando expressão regular
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(passwordInput.value)) {
        document.getElementById("password-error").style.display = "block";
        isValid = false;
      }
    }

    if (verifyPasswordInput.value.trim() === "") {
      document.getElementById("empty-verify-password").style.display = "block";
      isValid = false;
    } else if (verifyPasswordInput.value !== passwordInput.value) {
      document.getElementById("verify-password-error").style.display = "block";
      isValid = false;
    }

    // Se houver algum erro de validação, não envia o formulário
    if (!isValid) {
      return;
    }

    // Se chegou aqui, significa que não há erros, então o formulário é enviado
    const formData = new FormData(form);
    fetch(form.action, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          // Aqui você pode redirecionar para uma página de sucesso ou fazer alguma outra ação
          window.location.href = "https://samukatech.github.io/developer/obrigado.htm";
        } else {
          // Tratar o erro, exibir mensagem de erro, etc.
          console.error("Erro ao enviar o formulário.");
        }
      })
      .catch((error) => {
        console.error("Erro ao enviar o formulário:", error);
      });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Evita o envio do formulário por padrão
    submitForm();
  });
});


