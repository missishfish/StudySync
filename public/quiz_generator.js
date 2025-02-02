document.addEventListener("DOMContentLoaded", function () {
    loadQuestions();
});

// Function to save a question to localStorage
function saveQuestion(question) {
    let questions = JSON.parse(localStorage.getItem("quiz")) || [];
    questions.push(question);
    localStorage.setItem("quiz", JSON.stringify(questions));
}

// Function to load and display questions
function loadQuestions() {
    const questionsList = document.querySelector(".questions");
    let questions = JSON.parse(localStorage.getItem("quiz")) || [];

    questionsList.innerHTML = "";

    questions.forEach(function (q, index) {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question-card");

        questionDiv.innerHTML = `
            <h4>${q.question}</h4>
            <ul>
                <li>${q.options[0]}</li>
                <li>${q.options[1]}</li>
                <li>${q.options[2]}</li>
                <li>${q.options[3]}</li>
            </ul>
            <button onclick="deleteQuestion(${index})">Delete</button>
        `;

        questionsList.appendChild(questionDiv);
    });
}

// Handle form submission
document.getElementById("quiz-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const question = document.getElementById("question").value;
    const options = [
        document.getElementById("option1").value,
        document.getElementById("option2").value,
        document.getElementById("option3").value,
        document.getElementById("option4").value
    ];
    const correctAnswer = document.getElementById("correct-answer").value;

    const newQuestion = {
        question: question,
        options: options,
        correct: correctAnswer
    };

    saveQuestion(newQuestion);
    document.getElementById("quiz-form").reset();
    loadQuestions();
});

// Function to delete a question
function deleteQuestion(index) {
    let questions = JSON.parse(localStorage.getItem("quiz")) || [];
    questions.splice(index, 1);
    localStorage.setItem("quiz", JSON.stringify(questions));
    loadQuestions();
}

// Quiz Logic
let currentQuestionIndex = 0;
let score = 0;
let quizQuestions = [];

function startQuiz() {
    quizQuestions = JSON.parse(localStorage.getItem("quiz")) || [];
    currentQuestionIndex = 0;
    score = 0;

    document.querySelector(".quiz-section").style.display = "block";
    document.querySelector(".start-quiz").style.display = "none";
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestionIndex >= quizQuestions.length) {
        document.getElementById("quiz-result").style.display = "block";
        document.getElementById("score").innerText = `You scored ${score} out of ${quizQuestions.length}`;
        document.querySelector(".quiz-section").style.display = "none";
        return;
    }

    const q = quizQuestions[currentQuestionIndex];
    document.getElementById("quiz-question").innerText = q.question;
    document.getElementById("quiz-options").innerHTML = q.options.map((option, index) => 
        `<button onclick="checkAnswer(${index + 1})">${option}</button>`
    ).join("");
}

function checkAnswer(selected) {
    if (selected == quizQuestions[currentQuestionIndex].correct) {
        score++;
    }
    currentQuestionIndex++;
    loadQuestion();
}

function restartQuiz() {
    document.getElementById("quiz-result").style.display = "none";
    document.querySelector(".start-quiz").style.display = "block";
}