const quiz = [
    {
        question: "What is the capital city of France?",
        options: ["Florida", "Paris", "London", "Texas"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Jupiter", "Venus", "Mars", "Saturn"],
        answer: "Mars"
    },
    {
        question: "What is 5 + 7?",
        options: ["10", "11", "12", "13"],
        answer: "12"
    },
    {
        question: "Which animal is known as man's best friend'?",
        options: ["Cat", "Dog", "Bird", "Fish"],
        answer: "Dog"
    },
    {
        question: "What color is the sky on a clear day?",
        options: ["Green", "Blue", "Red", "Yellow"],
        answer: "Blue"
    },
    {
        question: "How many legs does a spider typically have?",
        options: ["6", "8", "10", "4"],
        answer: "8"
    },
    {
        question: "Which of these is a fruit?",
        options: ["Carrot", "Potato", "Apple", "Broccoli"],
        answer: "Apple"
    },
    {
        question: "What do plants need to grow?",
        options: ["Chocolate", "Water", "Sand", "Stones"],
        answer: "Water"
    },
    {
        question: "Which of these is a type of bird?",
        options: ["Crocodile", "Snake", "Eagle", "Lizard"],
        answer: "Eagle"
    },
    {
        question: "How many days are in a week?",
        options: ["5", "6", "7", "8"],
        answer: "7"
    }
]
let score = 0;
let currentQuestion = 0;
let userAnswers = [];

const question = document.getElementById("question");
const options = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const result = document.getElementById("result");

function loadQuestion() {
    const q = quiz[currentQuestion];
    question.textContent = `Q${currentQuestion + 1}: ${q.question}`;
    options.innerHTML = '';

    q.options.forEach((option, index) => {
        const lable = document.createElement("label");
        lable.innerHTML = `<input type="radio" name="option" value="${option}"> ${option}`;
        options.appendChild(lable);
    });
}
function showResult() {
    question.style.display = "none";
    options.style.display = "none";
    nextBtn.style.display = "none";
    result.style.display = "block";

    let resultHTML = `<h2>Your Score: ${score}/${quiz.length}</h2>`;
    quiz.forEach((q, index) => {
        const userAnswer = userAnswers[index];
        resultHTML += `<p><strong>Q${index + 1}: ${q.question}</strong></p>`;
        resultHTML += "<ul>";
        q.options.forEach(option => {
            let className = "";
            if (option === q.answer && userAnswer !== undefined) {
                className = "correct";
            }
            else if (option === userAnswers[index] && option !== q.answer) {
                className = "wrong";
            }
            resultHTML += `<li class="${className}">${option}</li>`;
        });
        resultHTML += "</ul><hr>";
    });
    result.innerHTML = resultHTML;
}

nextBtn.addEventListener("click", () => {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
        const userAnswer = selectedOption.value;
        userAnswers[currentQuestion] = userAnswer;
        if (userAnswer === quiz[currentQuestion].answer) {
            score++;
        }
    }

    currentQuestion++;
    if (currentQuestion < quiz.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

loadQuestion();