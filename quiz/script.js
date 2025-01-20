// Selecionando todos os elementos necessários
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

// Se o botão iniciar for clicado
start_btn.onclick = () => {
    info_box.classList.add("activeInfo"); // Mostrar caixa de informações
}

// Se o botão sair do quiz for clicado
exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); // Ocultar caixa de informações
}

// Se o botão continuar do quiz for clicado
continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); // Ocultar caixa de informações
    quiz_box.classList.add("activeQuiz"); // Mostrar caixa do quiz
    showQuetions(0); // Chamar a função showQuestions
    queCounter(1); // Passar 1 parâmetro para queCounter
    startTimer(15); // Chamar a função startTimer
    startTimerLine(0); // Chamar a função startTimerLine
}

let timeValue = 15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// Se o botão repetir o quiz for clicado
restart_quiz.onclick = () => {
    quiz_box.classList.add("activeQuiz"); // Mostrar caixa do quiz
    result_box.classList.remove("activeResult"); // Ocultar caixa de resultados
    timeValue = 15;
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); // Chamar a função showQuestions
    queCounter(que_numb); // Passar o valor que_numb para queCounter
    clearInterval(counter); // Limpar counter
    clearInterval(counterLine); // Limpar counterLine
    startTimer(timeValue); // Chamar a função startTimer
    startTimerLine(widthValue); // Chamar a função startTimerLine
    timeText.textContent = "Tempo Restante"; // Alterar o texto timeText para Time Left
    next_btn.classList.remove("show"); // Ocultar o botão next
}

// Se o botão sair do quiz for clicado
quit_quiz.onclick = () => {
    window.location.reload(); // Recarregar a janela atual
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// Se o botão próximo for clicado
next_btn.onclick = () => {
    if (que_count < questions.length - 1) { // Se o contador de perguntas for menor que o comprimento total das perguntas
        que_count++; // Incrementar o valor do que_count
        que_numb++; // Incrementar o valor do que_numb
        showQuetions(que_count); // Chamar a função showQuestions
        queCounter(que_numb); // Passar o valor que_numb para queCounter
        clearInterval(counter); // Limpar counter
        clearInterval(counterLine); // Limpar counterLine
        startTimer(timeValue); // Chamar a função startTimer
        startTimerLine(widthValue); // Chamar a função startTimerLine
        timeText.textContent = "Tempo Restante"; // Alterar o texto timeText para Time Left
        next_btn.classList.remove("show"); // Ocultar o botão next
    } else {
        clearInterval(counter); // Limpar counter
        clearInterval(counterLine); // Limpar counterLine
        showResult(); // Chamar a função showResult
    }
}

// Obtendo perguntas e opções de array
function showQuetions(index) {
    const que_text = document.querySelector(".que_text");

    // Criando uma nova tag span e div para pergunta e opções e passando o valor usando o índice de array
    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
    let option_tag = '<div class="option"><span>' + questions[index].options[0] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[1] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[2] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[3] + '</span></div>';
    que_text.innerHTML = que_tag; // Adicionando nova tag span dentro da que_text
    option_list.innerHTML = option_tag; // Adicionando nova tag div dentro da option_list

    const option = option_list.querySelectorAll(".option");

    // Definindo o atributo onclick para todas as opções disponíveis
    for (i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

// Criando as novas tags div que para ícones
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

// Se o usuário clicar em uma opção
function optionSelected(answer) {
    let userAns = answer.textContent.trim(); // Pegando o texto da resposta selecionada e removendo espaços em branco
    let correctAns = questions[que_count].answer.trim(); // Pegando a resposta correta da pergunta atual e removendo espaços em branco
    const allOptions = option_list.children.length; // Pegando todas as opções

    if (userAns === correctAns) { // Comparando a resposta do usuário com a resposta correta
        userScore += 1; // Incrementar a pontuação do usuário em 1
        answer.classList.add("correct"); // Adicionando a classe correta à opção selecionada
        if (!answer.querySelector(".icon.tick")) {
            answer.insertAdjacentHTML("beforeend", tickIconTag); // Adicionando ícone de marca de seleção
        }
        console.log("Resposta Correta");
        console.log("Suas respostas corretas = " + userScore);
    } else {
        answer.classList.add("incorrect"); // Adicionando a classe incorreta à opção selecionada
        if (!answer.querySelector(".icon.cross")) {
            answer.insertAdjacentHTML("beforeend", crossIconTag); // Adicionando ícone de cruz
        }
        console.log("Resposta Errada");

        // Se a resposta estiver incorreta, marque a opção correta automaticamente
        for (let i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent.trim() === correctAns) {
                option_list.children[i].setAttribute("class", "option correct");
                if (!option_list.children[i].querySelector(".icon.tick")) {
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); // Adicionando ícone de marca de seleção à opção correta
                }
            }
        }
    }
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled"); // Uma vez que o usuário seleciona uma opção, desabilita todas as opções
    }
    next_btn.classList.add("show"); // Mostrar o botão next se o usuário selecionar qualquer opção
}

function showResult() {
    info_box.classList.remove("activeInfo"); // Ocultar a caixa de informações
    quiz_box.classList.remove("activeQuiz"); // Ocultar a caixa do quiz
    result_box.classList.add("activeResult"); // Mostrar a caixa de resultados
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 3) { // Se o usuário acertou mais de 3 perguntas
        let scoreTag = '<span>e parabéns! 🎉, Você acertou <p>' + userScore + '</p> de <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;  // Adicionando nova tag span dentro de score_Text
    } else if (userScore > 1) { // Se o usuário acertou mais de 1 pergunta
        let scoreTag = '<span>e bom 😎, Você acertou <p>' + userScore + '</p> de <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    } else { // Se o usuário acertou menos de 1 pergunta
        let scoreTag = '<span>e desculpe 😐, Você acertou apenas <p>' + userScore + '</p> de <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time; // Alterar o valor de timeCount com valor de tempo
        time--; // Decrementar o valor do tempo
        if (time < 9) { // Se o temporizador for menor que 9
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero; // Adicionar um 0 antes do valor do tempo
        }
        if (time < 0) { // Se o temporizador for menor que 0
            clearInterval(counter); // Limpar counter
            timeText.textContent = "Tempo Esgotado"; // Alterar o texto timeText para Time Off
            const allOptions = option_list.children.length; // Pegando todas as opções
            let correctAns = questions[que_count].answer.trim(); // Pegando a resposta correta da pergunta atual
            for (let i = 0; i < allOptions; i++) {
                if (option_list.children[i].textContent.trim() === correctAns) {
                    option_list.children[i].setAttribute("class", "option correct"); // Adicionar cor verde à opção correta
                    if (!option_list.children[i].querySelector(".icon.tick")) {
                        option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); // Adicionando ícone de marca de seleção à opção correta
                    }
                }
            }
            for (let i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled"); // Desabilitar todas as opções
            }
            next_btn.classList.add("show"); // Mostrar o botão de próxima questão
        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 29);
    function timer() {
        time += 1; // Incrementar o valor do tempo em 1
        time_line.style.width = time + "px"; // Aumentar a largura da time_line com valor de tempo
        if (time > 549) { // Se o valor do tempo for maior que 549
            clearInterval(counterLine); // Limpar counterLine
        }
    }
}

function queCounter(index) {
    // Criando uma nova tag span e passando o número da pergunta e o comprimento total da pergunta
    let totalQueCounTag = '<span><p>' + index + '</p> de <p>' + questions.length + '</p> Perguntas</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag; // Adicionando nova tag span dentro de bottom_ques_counter
}
