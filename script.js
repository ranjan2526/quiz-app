const questions = [
    {
        question: "What is HTML stands for?",
        answers: [
            { text: "Hyper text Marketing Language", correct: false},
            { text: "Hyper text Marking Language", correct: false},
            { text: "Hy0er text Multiple Language", correct: false},
            { text: "HYPER Text Markup Language", correct: true},
        ]
    },
    {
        question: "What is CSS stands for?",
        answers: [
            { text: "Cascading Sheet Style", correct: false},
            { text: "Cascading Sltye Sheet", correct: true},
            { text: "Class Style Sheet", correct: false},
            { text: "Class Sheet Style", correct: false},
        ]
    },
    {
        question: "Opening tag of HTML is called",
        answers: [
            { text: "Ending tag", correct: false},
            { text: "CLosed tag", correct: false},
            { text: "Starting tag", correct: true},
            { text: "Pair tags", correct: false},
        ]
    },
    {
        question: "HTML was first proposed in year __.",
        answers: [
            { text: "1982", correct: false},
            { text: "1995", correct: false},
            { text: "2000", correct: false},
            { text: "1990", correct: true},
        ]
    },
    {
        question: "HTML tags are surronded by __ breackets",
        answers: [
            { text: "Angle", correct: true},
            { text: "Square", correct: false},
            { text: "Round", correct: false},
            { text: "Curly", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";                                            
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    nextButton.style.textAlign = "center";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();