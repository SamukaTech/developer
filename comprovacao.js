var nome = prompt("PROVE SE VOCÊ REALMENTE ESTÁ CADASTRADO NO SISTEMA\n 1- Qual seu primeiro nome?"); 
var tel = prompt("PROVE SE VOCÊ REALMENTE ESTÁ CADASTRADO NO SISTEMA\n 2- Qual seu número de telefone?");
var cid = prompt("PROVE SE VOCÊ REALMENTE ESTÁ CADASTRADO NO SISTEMA\n 3- Em qual cidade você nasceu?");
if (nome != "Vitória" || tel != "994609245" || cid != "Teresina") {
alert("Acesso negado!\n Verifique se você preencheu todos os campos corretamente.");
}
else {
alert("Olá Vitória, sua senha é: 2425");
}
