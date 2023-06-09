//quizdata with questions, answers and correct answer as an array

const quizData = [
    {
        question: "HTML stands for?",

        answer: [
            "A.Hyper Terminal Machine Learning",
            "B.Harold Took My Lighter",
            "C.High Tech Micro Language",
            "D.HyperText Markup Lanaguage",
        ],
        correct: "d",
    },
    {
        question: "JavaScript is used to make what kind of site?",
        answer: [
            "A.access webpages hosted on another domain",
            "B.an interactive site",
            "C.to protect your page source or images",
            "D.write to files on the server without the help of a serverside script",
        ],
        correct: "b",
    },
    {
        question: "The * symbol in CSS is used to change?",
        answer: [
            "A.all elements",
            "B.only the body",
            "C.the header and footer",
            "D.the footer",
        ],
        correct: "a",
    },
    {
        question: "Which year was HTML created?",
        answer: [
            "A.2002",
            "B.1993",
            "C.1997",
            "D.last year",
        ],
        correct: "b",
    },

];

// specific HTML elements and storing them in var using querySelector and getElementById
const welcomePage = document.querySelector('.welcome')
const startBtn = document.querySelector('#start')
const quiz = document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const questionForm = document.querySelector('#quiz-header')


let currentQuiz = 0
let score = 0

// timer on 60 sec 
function startQuiz() {
    let initTime = 60000;
    remainingTime = initTime;
    timerInterval = timer();
    console.log("starting quiz", initTime)

    welcomePage.setAttribute("hidden", "true")
    document.querySelector(".quiz-container").removeAttribute("hidden")

    loadQuiz()
}
//declaring remainingTime and timerInterval
let remainingTime = 60000;
let timerInterval;

function timer() {
    const interval = setInterval(() => {
        remainingTime -= 1000;
        if (remainingTime <= 0) {
            clearInterval(interval)
            const confirmed = confirm('Time is up!');
            if (confirmed) {
                submitBtn.click();
            }
        } else {
            const minutes = Math.floor(remainingTime / 60000);
            const seconds = Math.floor((remainingTime % 60000) / 1000);
            document.getElementById('timer').innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }
    }, 1000);
    return interval;
}

function endQuiz() {
    // Clear the timer interval when the quiz ends
    clearInterval(timerInterval);

}

function loadQuiz() {
//clears any previous selected answer choices 
    deselectAnswer()

    const currentQuizData = quizData[currentQuiz];
    questionEl.innerText = currentQuizData.question;
//preparing the next question to be displayed 
    answerEls[0].nextElementSibling.innerText = currentQuizData.answer[0];
    answerEls[1].nextElementSibling.innerText = currentQuizData.answer[1];
    answerEls[2].nextElementSibling.innerText = currentQuizData.answer[2];
    answerEls[3].nextElementSibling.innerText = currentQuizData.answer[3];
}

function deselectAnswer() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}

function getSelected() {
    let selectAnswer = null;
    answerEls.forEach(answer => {
        if (answer.checked) {
        selectAnswer = answer.id;
        }
    });
    return selectAnswer;
}
//listens for click event on the start button, calls startQuiz function when clicked 
const submitBtn = document.querySelector('#submit');

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    console.log(event.target)
    startQuiz()
}
)
//function to get selected answer, confirms true or false, updates score and rem time
//loads next question
submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const answer = getSelected();
    if (answer !==null){
        if (answer === quizData[currentQuiz].correct) {
            score++;
        } else {
            remainingTime -= 10000; //subtracts 10 seconds from the timer 
        }
        currentQuiz++;
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            endQuiz();
            displayScoreAndInitials();
        }
    }
});
//displays the score and initial form and listens for the submit event
//saves the score with initials 
            function displayScoreAndInitials() {
            quiz.innerHTML = `
            <h2>✨You answered ${score}/${quizData.length} questions correctly!✨</h2>
            <form id="score-form">
            <label for="initials">Enter your initials:</label>
            <input type="text" id="initials" name="initials" maxlength="3" required>
            <button type="submit">Save score</button>
            </form>
            <button onclick="location.reload()">Reload</button>
        `;
            const scoreForm = document.querySelector('#score-form');

            scoreForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const initials = document.querySelector('#initials').value;
                const scoreDisplay = document.createElement('div');
                scoreDisplay.setAttribute('id', 'score-display');
                scoreDisplay.innerHTML = `Your score (${score}/${quizData.length}) has been saved with your initials ${initials}`;
                quiz.appendChild(scoreDisplay);

                console.log(`Initials: ${initials}, Score: ${score}/${quizData.length}`);
                scoreForm.reset();
            });
        
    }
    





