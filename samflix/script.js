// Seleciona o botão e o menu
const toggleButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

// Alterna a visibilidade do menu
toggleButton.addEventListener('click', () => {
    menu.classList.toggle('active');
});
