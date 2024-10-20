var tel = prompt("PROVE SE VOCÊ ESTÁ CADASTRADO NO SISTEMA\n 1- Informe o número do seu celular?"); 
var email = prompt("PROVE SE VOCÊ ESTÁ CADASTRADO NO SISTEMA\n 2- Qual o seu e-mail?");
var cid = prompt("PROVE SE VOCÊ ESTÁ CADASTRADO NO SISTEMA\n 3- Em qual cidade você nasceu?");
var ano = prompt("PROVE SE VOCÊ ESTÁ CADASTRADO NO SISTEMA\n 4- Em que ano você nasceu?");
if (tel == "994200398" && email == "samuelnaslima.98@gmail.com" && cid == "Barras" && ano == "1998" ||
tel == "994200398" && email == "samuelnaslima.98@gmail.com" && cid == "BARRAS" && ano == "1998"){
    alert("Olá Samuel, Você está cadastrado em dois sistemas diferentes, a senha de acesso ao site concursos públicos é: concurso24 e a senha de acesso as notas acadêmicas é: boletim10");
}
else if (tel == "994609245" && email == "samuelnaslima.98@gmail.com" && cid == "Barras" && ano == "2011" ||
tel == "994609245" && email == "vitoriasamea.10@gmail.com" && cid == "TERESINA" && ano == "2011") {
    alert("Olá Vitória, sua senha é: 2425");
}
else {
    alert("Acesso negado!\n Verifique se você preencheu todos os campos corretamente.");
}
