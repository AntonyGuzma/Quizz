// Declaração de variáveis
const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ['a', 'b', 'c', 'd'];
let points = 0;
let actualQuestion = 0;

// Perguntas
const questions = [
  {
    "question": "PHP foi desenvolvido para qual fim?",
    "answers": [
      {
        "answer": "back-end",
        "correct": true
      },
      {
        "answer": "front-end",
        "correct": false
      },
      {
        "answer": "Sistema operacional",
        "correct": false
      },
      {
        "answer": "Banco de dados",
        "correct": false
      },
    ]
  },
  {
    "question": "Uma forma de declarar variável em JavaScript:",
    "answers": [
      {
        "answer": "$var",
        "correct": false
      },
      {
        "answer": "var",
        "correct": true
      },
      {
        "answer": "@var",
        "correct": false
      },
      {
        "answer": "#let",
        "correct": false
      },
    ]
  },
  {
    "question": "Qual o seletor de id no CSS?",
    "answers": [
      {
        "answer": "#",
        "correct": true
      },
      {
        "answer": ".",
        "correct": false
      },
      {
        "answer": "@",
        "correct": false
      },
      {
        "answer": "/",
        "correct": false
      },
    ]
  },
]

// Substituição do layout pela primeira questão
function init() {
  createQuestion(0)
}   

// Create a question 
function createQuestion(i) {

  // Limpa questão anterior
  const oldButtons = answersBox.querySelectorAll("button");

  oldButtons.forEach(function(btn) {
    btn.remove();
  });

  // Altera texto da pergunta
  const questionText = question.querySelector("#question-text");
  const questionNumber = question.querySelector("#question-number");

  questionText.textContent = questions[i].question;
  questionNumber.textContent = i + 1;

  // Insere alternativas
  questions[i].answers.forEach(function(answer, i) {
    
    // Altera texto do template
    const answerTemplate = document.querySelector(".answer-template").cloneNode(true);

    const letterBtn = answerTemplate.querySelector(".btn-letter");
    const answerText = answerTemplate.querySelector(".question-answer");

    letterBtn.textContent = letters[i];
    answerText.textContent = answer['answer'];  

    answerTemplate.setAttribute("correct-answer", answer.correct)

    // remove classe de hide e template do template
    answerTemplate.classList.remove("hide");
    answerTemplate.classList.remove("answer-template");

    answersBox.appendChild(answerTemplate)

    // com array retorna o window
    // answerTemplate.addEventListener('click', () => {
    //     console.log(this);
    // });

    answerTemplate.addEventListener('click',function() {
        checkAnswer(this)
    })

    // console.log(answerTemplate)
  });

  //incrementar questão
  actualQuestion++
}

// Verificar resposta do usuario
function checkAnswer(btn){
    //selecionar todos os botoes
    const buttons = answersBox.querySelectorAll('button')

    buttons.forEach(function (button) {
        if(button.getAttribute('correct-answer') === "true"){
            button.classList.add("correct-answer")

            //checa se o usuario clicou certo
            if(btn ==  button){
                points++;
            }
        }else{
            button.classList.add("wrong-answer")
        }
    })

    //exibir proxima questao
    nextQuestion()
}

//passar para a proxima questao
function nextQuestion(){
    setTimeout(() => {
        //verifica se ainda há perguntas
        if(actualQuestion >= questions.length){

            //mensagem de sucesso
            showSucessMsg()
            return
        }

        createQuestion(actualQuestion)
    }, 1500)
}


//Exibe a tela final
function showSucessMsg(){

    //o toggle adiciona se nao tiver e remove se tive
    quizzContainer.classList.toggle('hide')
    scoreContainer.classList.toggle('hide')

    //trocar dados da tela de sucesso
    //calcular score
    const score = ((points/questions.length)* 100).toFixed(2)
    
    const displayScore =document.querySelector('#display-score span')

    displayScore.textContent = score.toString()

    //alterar numero de perguntas corretas
    const correctAnswer = document.querySelector('#correct-answers')

    correctAnswer.textContent = points

    //alterar o total de perguntas
    const totalQuestions = document.querySelector('#questions-qty')
    totalQuestions.textContent = questions.length
}


//inicialização do QUizz
init()