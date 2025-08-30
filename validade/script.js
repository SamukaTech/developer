let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

const form = document.getElementById("form-produto");
const lista = document.getElementById("lista-produtos");

// Função para salvar no localStorage
function salvar() {
  localStorage.setItem("produtos", JSON.stringify(produtos));
}

// Função para calcular dias restantes
function diasRestantes(validade) {
  const hoje = new Date();
  const dataVal = new Date(validade);
  return Math.ceil((dataVal - hoje) / (1000 * 60 * 60 * 24));
}

// Função para exibir produtos
function mostrar() {
  lista.innerHTML = "";

  produtos
    .sort((a, b) => new Date(a.validade) - new Date(b.validade))
    .forEach((p, index) => {
      const li = document.createElement("li");

      const dias = diasRestantes(p.validade);
      let classe = "ok";
      if (dias <= 7) classe = "alerta";
      if (dias <= 2) classe = "critico";

      li.className = classe;
      // Formatando validade para DD/MM/YYYY
const dataVal = new Date(p.validade);
const validadeFormatada = dataVal.toLocaleDateString("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric"
});

li.className = classe;
li.innerHTML = `
  <div>
    <strong>${p.nome}</strong><br>
    Validade: ${validadeFormatada} ${dias < 0 ? "(❌ Vencido)" : `(⏳ ${dias} dias)`}<br>
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

