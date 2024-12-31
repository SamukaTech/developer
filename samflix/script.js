function toggleMenu() {
    const menu = document.querySelector('.menu');
    const toggleButton = document.querySelector('.menu-toggle');

    // Alterna a classe 'active' no menu
    menu.classList.toggle('active');

    // Alterna o botão para indicar se o menu está aberto ou fechado
    const isActive = menu.classList.contains('active');
    toggleButton.textContent = isActive ? '✖' : '☰';
}
