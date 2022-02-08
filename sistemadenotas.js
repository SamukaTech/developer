function acesso(form){
    if (form.usuario.value == "Samuel" && form.senha.value == "boletim10" || 
    form.usuario.value == "samuel" && form.senha.value == "boletim10" || 
    form.usuario.value == "SAMUEL" && form.senha.value == "boletim10") {
        location = "notas.html"
    }
    else if (form.usuario.value == "Vitória" && form.senha.value == "2425" || 
    form.usuario.value == "vitória" && form.senha.value == "2425" || 
    form.usuario.value == "VITÓRIA" && form.senha.value == "2425"){
        location = "notas2.html"
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
