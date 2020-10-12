//DECLARE VARIABLES
var questions = [
  {
    question: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    question:
      "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses",
  },
  {
    question:
      "An Array in JavaScript can be used to store ____.",
    choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    answer: "all of the above",
  },
  {
    question:
      "String values must be enclosed within ____ \n when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parenthesis"],
    answer: "quotes",
  },
  {
    question:
      "A very useful tool used during development \n and debugging for printing content to the \n debugger is  ____ .",
    choices: ["console.log", "terminal/bash", "for loop", "JavaScript"],
    answer: "console.log",
  },
];

var questionEl = document.querySelector("#question");
var optionListEl = document.querySelector("#option-list");
var questionResultEl = document.querySelector("#question-result");
var timerEl = document.querySelector("#timer");
var questionIndex = 0;
var correctCount = 0;
var time = 60;
var intervalId;
var userNames = []
var HiScoreBtn = document.querySelector("#show-high_score");
var gameOverTag = document.querySelector("#game-over");
var startBtn = document.querySelector("#startbtn")
var formWrapper = document.querySelector("#form-wrapper")
var greetingWrapper = document.querySelector("#greeting-wrapper")
var quizWrapper = document.querySelector("#quiz-wrapper");



//DEFINE FUNCTIONS

function endQuiz() {
  clearInterval(intervalId);
  gameOverTag.innerText = " Game over! You scored " + correctCount + "!"

  // hide quiz and show score submission form
  quizWrapper.setAttribute("class", "hidden");
  formWrapper.classList.remove("hidden")

  return

}

function showHighScore() {
  var initialsFormVal = document.getElementById("initials").value;
  var user = {
    initials: initialsFormVal,
    score: correctCount
  }
  var high_score = localStorage.getItem("Score");

  if (!high_score) {
    high_score = []
  }
  else {
    high_score = JSON.parse(high_score);
  }

  //push most recent user into array
  high_score.push(user);

  high_score.sort(function (a, b) {

    return b.score - a.score

  })
  localStorage.setItem("Score", JSON.stringify(high_score));

  return high_score

}

function updateTime() {
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    endQuiz();
    console.log("\nJUST CALLED END QUIZ IN UPDATE TIME")

  }
}

function renderQuestion() {

  if (time <= 0) {
    updateTime();
    return;
  }

  intervalId = setInterval(updateTime, 1000);
  questionEl.textContent = questions[questionIndex].question;

  optionListEl.innerHTML = "";
  questionResultEl.innerHTML = "";

  var choices = questions[questionIndex].choices;
  var choicesLenth = choices.length;

  for (var i = 0; i < choicesLenth; i++) {
    var questionListItem = document.createElement("li");
    questionListItem.setAttribute("class", "list-group-item")
    questionListItem.textContent = choices[i];
    optionListEl.append(questionListItem);
  }
}

function nextQuestion() {
  questionIndex++;
  if (questionIndex === questions.length || time < 0) {
    time = 0;
  }
  renderQuestion();
}

function checkAnswer(event) {
  clearInterval(intervalId);
  if (event.target.matches("li")) {
    var answer = event.target.textContent;
    if (answer === questions[questionIndex].answer) {
      questionResultEl.setAttribute("style", "color: green")
      questionResultEl.textContent = "Correct";
      correctCount++;
    } else {
      questionResultEl.setAttribute("style", "color: red")
      questionResultEl.textContent = "Incorrect";
      time = time - 10;
      timerEl.textContent = time;
    }
  }
  setTimeout(nextQuestion, 500);
  return
}


//Add behavior to buttons
startBtn.addEventListener('click', function () {

  // hide Quiz title, instructions, and start button. Then display 1st question
  greetingWrapper.setAttribute("class", "hidden")
  renderQuestion();
})
optionListEl.addEventListener("click", checkAnswer);

HiScoreBtn.addEventListener('click', function () {
  console.log("initialsFormVal is : " + initialsFormVal)
  var initialsFormVal = document.getElementById("initials").value;
  showHighScore();
  window.location.href = './highscores.html'
});


