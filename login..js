function acesso(form){
    if (form.usuario.value == "Samuel" && form.senha.value == "boletim10") {
        location = "notasdasprovas.html"
    }
    else if (form.usuario.value == "maria" && form.senha.value == "12"){
        location = "Cursos.html"
    }
    else if (form.usuario.value == "") {
        alert("Você precisa digitar o seu nome!")
    }
    else if (form.senha.value == "") {
        alert("Você precisa digitar a sua senha!")
    }
    else {
        alert("Ops! Não reconheci seu usuário e senha. Veja se está tudo certo e tente novamente.")
    }
}
