const quizData = [

    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Transfer Language",
            "None of These"
        ],
        answer: "Hyper Text Markup Language"
    },

    {
        question: "Which language is used for styling webpages?",
        options: [
            "HTML",
            "CSS",
            "Python",
            "Java"
        ],
        answer: "CSS"
    },

    {
        question: "Which language adds interactivity to websites?",
        options: [
            "Java",
            "C++",
            "JavaScript",
            "HTML"
        ],
        answer: "JavaScript"
    },

    {
        question: "Which tag is used to insert images?",
        options: [
            "img",
            "image",
            "src",
            "picture"
        ],
        answer: "img"
    },

    {
        question: "Who developed JavaScript?",
        options: [
            "Google",
            "Netscape",
            "Microsoft",
            "Apple"
        ],
        answer: "Netscape"
    },

    {
        question: "Which HTML tag creates a hyperlink?",
        options: [
            "a",
            "link",
            "url",
            "href"
        ],
        answer: "a"
    },

    {
        question: "Which CSS property changes text color?",
        options: [
            "text-color",
            "font-color",
            "color",
            "background-color"
        ],
        answer: "color"
    },

    {
        question: "Which symbol is used for an ID selector in CSS?",
        options: [
            ".",
            "#",
            "*",
            "&"
        ],
        answer: "#"
    },

    {
        question: "Which symbol is used for a class selector in CSS?",
        options: [
            "#",
            ".",
            "*",
            "&"
        ],
        answer: "."
    },

    {
        question: "Inside which HTML tag do we write JavaScript?",
        options: [
            "javascript",
            "script",
            "js",
            "code"
        ],
        answer: "script"
    },

    {
        question: "What does CSS stand for?",
        options: [
            "Creative Style Sheets",
            "Cascading Style Sheets",
            "Computer Style Sheets",
            "Colorful Style Sheets"
        ],
        answer: "Cascading Style Sheets"
    },

    {
        question: "Which method is used to print in the browser console?",
        options: [
            "console.log()",
            "print()",
            "log()",
            "display()"
        ],
        answer: "console.log()"
    },

    {
        question: "Which keyword declares a variable in JavaScript?",
        options: [
            "var",
            "integer",
            "string",
            "define"
        ],
        answer: "var"
    },

    {
        question: "Which HTML tag is used for the largest heading?",
        options: [
            "h1",
            "h6",
            "title",
            "head"
        ],
        answer: "h1"
    },

    {
        question: "Which company developed React?",
        options: [
            "Google",
            "Amazon",
            "Meta",
            "Microsoft"
        ],
        answer: "Meta"
    }

];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

function startQuiz() {

    document.getElementById("start-screen").style.display = "none";
    document.getElementById("quiz-screen").style.display = "block";

    loadQuestion();
}

function loadQuestion() {

    const question =
        document.getElementById("question");

    const options =
        document.getElementById("options");

    const message =
        document.getElementById("message-box");

    message.style.display = "none";

    options.innerHTML = "";

    question.innerHTML =
        quizData[currentQuestion].question;

    document.getElementById("question-count")
        .innerHTML =
        `Question ${currentQuestion+1} of ${quizData.length}`;

    quizData[currentQuestion].options.forEach(option => {

        const btn = document.createElement("button");

        btn.innerText = option;

        btn.classList.add("option-btn");

        btn.onclick = () => checkAnswer(btn, option);

        options.appendChild(btn);

    });

    updateProgress();
    startTimer();
}

function startTimer() {

    clearInterval(timer);

    timeLeft = 15;

    document.getElementById("timer")
        .innerHTML = `⏱️ ${timeLeft}`;

    timer = setInterval(() => {

        timeLeft--;

        document.getElementById("timer")
            .innerHTML = `⏱️ ${timeLeft}`;

        if (timeLeft === 0) {

            clearInterval(timer);

            document.getElementById("message-box")
                .style.display = "block";

            document.getElementById("message-box")
                .className = "wrong-message";

            document.getElementById("message-box")
                .innerHTML = "⏰ Time's Up! Click Next Question";

        }

    }, 1000);
}

function checkAnswer(button, selected) {

    clearInterval(timer);

    const correct =
        quizData[currentQuestion].answer;

    const buttons =
        document.querySelectorAll(".option-btn");

    buttons.forEach(btn => btn.disabled = true);

    const box =
        document.getElementById("message-box");

    box.style.display = "block";

    if (selected === correct) {

        score++;

        button.classList.add("correct");

        confetti({
            particleCount: 100,
            spread: 80
        });

        box.className = "correct-message";

        box.innerHTML =
            "🎉 Excellent! Correct Answer. Keep Going!";

    } else {

        button.classList.add("wrong");

        buttons.forEach(btn => {
            if (btn.innerText === correct) {
                btn.classList.add("correct");
            }
        });

        document.querySelector(".container")
            .classList.add("shake");

        setTimeout(() => {
            document.querySelector(".container")
                .classList.remove("shake");
        }, 400);

        box.className = "wrong-message";

        box.innerHTML =
            `❌ Wrong Answer.<br>
✅ Correct Answer: <b>${correct}</b>`;
    }

    document.getElementById("score")
        .innerHTML = `🏆 Score: ${score}`;
}

document.getElementById("nextBtn")
    .addEventListener("click", () => {

        currentQuestion++;

        if (currentQuestion < quizData.length) {
            loadQuestion();
        } else {
            showResult();
        }

    });

function updateProgress() {

    let progress =
        (currentQuestion / quizData.length) * 100;

    document.getElementById("progress-bar")
        .style.width = progress + "%";
}

function showResult() {

    document.getElementById("quiz-screen")
        .style.display = "none";

    document.getElementById("result-screen")
        .style.display = "block";

    let percentage =
        (score / quizData.length) * 100;

    let badge = "";

    if (percentage >= 90) {
        badge = "🥇 Quiz Master";
    } else if (percentage >= 70) {
        badge = "🥈 Quiz Expert";
    } else if (percentage >= 50) {
        badge = "🥉 Good Attempt";
    } else {
        badge = "📚 Keep Practicing";
    }

    document.getElementById("final-score")
        .innerHTML =
        `
<h2>${badge}</h2>
<h1>${score}/${quizData.length}</h1>
<h2>${percentage}%</h2>
`;
}

function restartQuiz() {

    currentQuestion = 0;
    score = 0;

    document.getElementById("result-screen")
        .style.display = "none";

    document.getElementById("quiz-screen")
        .style.display = "block";

    document.getElementById("score")
        .innerHTML = "🏆 Score: 0";

    loadQuestion();
}