function acesso(form){
    if (form.usuario.value == "samuelnaslima.98@gmail.com" && form.senha.value == "boletim10") {
        location = "notas.html"
    }
    else if (form.usuario.value == "vitoriasamea.10@gmail.com" && form.senha.value == "2425"){
        location = "notas2.html"
    }
    else if (form.usuario.value == "") {
        alert("Por favor, digite o seu e-mail.")
    }
    else if (form.senha.value == "") {
        alert("Por favor, digite a sua senha.")
    }
    else {
        alert("Ops! Usuário não reconhecido. Veja se está tudo certo e tente novamente.")
    }
}
