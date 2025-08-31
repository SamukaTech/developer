let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

const form = document.getElementById("form-produto");
const lista = document.getElementById("lista-produtos");

// Função para salvar no localStorage
function salvar() {
  localStorage.setItem("produtos", JSON.stringify(produtos));
}

// Parse ISO "YYYY-MM-DD" como data LOCAL (sem fuso/UTC)
function parseIsoLocal(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d); // Date local
}

// Formata ISO para "DD/MM/YYYY" sem depender de timezone
function formatDateBR(iso) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}


// Função para calcular dias restantes
function diasRestantes(validadeIso) {
  const hoje = new Date();
  const hojeLocal = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()); // zera hora local
  const dataVal = parseIsoLocal(validadeIso);
  const diffMs = dataVal - hojeLocal;
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}


// Função para exibir produtos
function mostrar() {
  lista.innerHTML = "";

  produtos
  .sort((a, b) => parseIsoLocal(a.validade) - parseIsoLocal(b.validade))
  .forEach((p, index) => {
      const li = document.createElement("li");

      const dias = diasRestantes(p.validade);

// classes conforme sua nova regra
let classe = "ok"; // > 30 dias
if (dias <= 30 && dias > 0) classe = "alerta"; // <= 30 e > 0
if (dias <= 0) classe = "critico"; // hoje ou vencido

// status de texto
let statusTxt = "";
if (dias < 0) statusTxt = "(❌ Vencido)";
else if (dias === 0) statusTxt = "(⚠️ Vence hoje)";
else statusTxt = `(⏳ ${dias} dias)`;

// validade formatada sem timezone
const validadeFormatada = formatDateBR(p.validade);

li.className = classe;
li.innerHTML = `
  <div>
    <strong>${p.nome}</strong><br>
    Validade: ${validadeFormatada} ${statusTxt}<br>
    Quantidade: ${p.quantidade} uni.
  </div>
  <div class="acoes">
    <button class="btn-editar" onclick="editarProduto(${index})">Editar</button>
    <button class="btn-excluir" onclick="excluirProduto(${index})">Excluir</button>
  </div>
`;


      lista.appendChild(li);
    });
}

// Função para adicionar produto
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const nome = document.getElementById("nome").value;
  const quantidade = document.getElementById("quantidade").value;
  const validade = document.getElementById("validade").value;

  produtos.push({ nome, quantidade, validade });
  salvar();
  mostrar();
  form.reset();
});

// Função para excluir
function excluirProduto(index) {
  if (confirm("Deseja excluir este produto?")) {
    produtos.splice(index, 1);
    salvar();
    mostrar();
  }
}

// Função para editar
function editarProduto(index) {
  const p = produtos[index];
  document.getElementById("nome").value = p.nome;
  document.getElementById("quantidade").value = p.quantidade;
  document.getElementById("validade").value = p.validade;

  produtos.splice(index, 1);
  salvar();
  mostrar();
}

mostrar();

function atualizarDataRodape() {
  const agora = new Date();
  const dataHora = agora.toLocaleString("pt-BR", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit"
  });
  document.body.setAttribute("data-hora", dataHora);
}

function imprimirLista() {
  atualizarDataRodape();
  window.print();
}

