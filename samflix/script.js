// Seleciona o botão e o menu
const toggleButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

// Alterna a visibilidade do menu
toggleButton.addEventListener('click', () => {
    menu.classList.toggle('active');
});

const filmesDetalhes = {
    lancamento1: {
        titulo: "Filme 1",
        sinopse: "Sinopse do Filme 1. Uma emocionante aventura!",
        classificacao: "Classificação: 12+",
    },
    lancamento2: {
        titulo: "Filme 2",
        sinopse: "Sinopse do Filme 2. Um drama emocionante.",
        classificacao: "Classificação: 16+",
    },
    lancamento3: {
        titulo: "Filme 3",
        sinopse: "Sinopse do Filme 3. Comédia para toda a família!",
        classificacao: "Classificação: Livre",
    },
    maisAssistido1: {
        titulo: "Filme 4",
        sinopse: "Sinopse do Filme 4. Uma jornada épica.",
        classificacao: "Classificação: 14+",
    },
    maisAssistido2: {
        titulo: "Filme 5",
        sinopse: "Sinopse do Filme 5. Romance inesquecível.",
        classificacao: "Classificação: 12+",
    },
    maisAssistido3: {
        titulo: "Filme 6",
        sinopse: "Sinopse do Filme 6. Ação do começo ao fim!",
        classificacao: "Classificação: 16+",
    },
};

function mostrarDetalhes(filmeId) {
    const modal = document.getElementById("detalhes-modal");
    const titulo = document.getElementById("detalhes-titulo");
    const sinopse = document.getElementById("detalhes-sinopse");
    const classificacao = document.getElementById("detalhes-classificacao");

    const filme = filmesDetalhes[filmeId];
    titulo.textContent = filme.titulo;
    sinopse.textContent = filme.sinopse;
    classificacao.textContent = filme.classificacao;

    modal.style.display = "flex";
}

function fecharModal() {
    const modal = document.getElementById("detalhes-modal");
    modal.style.display = "none";
}

function adquirirFilme() {
    alert("Filme adquirido com sucesso!");
}

