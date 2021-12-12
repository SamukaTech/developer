function validaCampo(){
var x = document.forms["formu"]["usuario"].value;
if(x == null || x == "") {
alert ("Você precisa digitar o seu nome!");
return false;
}
var y = document.forms["formu"]["senha"].value;
if(y == null || y == "") {
alert (x + ", você precisa digitar a sua senha!");
return false;
}
var senha = document.getElementById("Senha").value;
if ( senha != "boletim10") {
alert("A senha que você digitou está incorreta. Tente novamente " + x + "!");
return false;
}
return true;
}
