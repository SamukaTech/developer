function acesso(form){
    if (form.usuario.value == "samuelnaslima.98@gmail.com" && form.senha.value == "concurso24") {
        location = "concursos.html"
    }
    else if (form.usuario.value == "") {
        alert("Por favor, informe o seu e-mail!")
    }
    else if (form.senha.value == "") {
        alert("Por favor, informe a sua senha!")
    }
    else {
        alert("Ops! Usuário não reconhecido. Veja se está tudo certo e tente novamente.")
    }
}
