var nome = prompt("PROVE SE VOCÊ ESTÁ CADASTRADO NO SISTEMA\n 1- Qual o seu primeiro nome?"); 
var email = prompt("PROVE SE VOCÊ ESTÁ CADASTRADO NO SISTEMA\n 2- Qual o seu e-mail?");
var serie = prompt("PROVE SE VOCÊ ESTÁ CADASTRADO NO SISTEMA\n 3- Qual foi a série/filme que você assistiu ultimamente?");
if (nome != "Samuel" || email != "samuelnaslima.98@gmail.com" || serie != "Elite") {
alert("Acesso negado!\n Verifique se você preencheu todos os campos corretamente.");
}
else {
alert("Olá Samuel, sua senha é: boletim10");
}
