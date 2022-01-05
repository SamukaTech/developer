var nome = prompt("PROVE SE VOCÊ ESTÁ CADASTRADO NO SISTEMA\n 1- Qual seu primeiro nome?"); 
var insti = prompt("PROVE SE VOCÊ ESTÁ CADASTRADO NO SISTEMA\n 2- Em qual instituição de ensino você estuda?");
var serie = prompt("PROVE SE VOCÊ ESTÁ CADASTRADO NO SISTEMA\n 3- Qual foi a série/filme que você assistiu ultimamente?");
if (nome != "Samuel" || insti != "UESPI" || serie != "Elite") {
alert("Acesso negado!\n Os dados informados não consta em nosso sistema.");
}
else {
alert("Olá Samuel, sua senha é: boletim10");
}
