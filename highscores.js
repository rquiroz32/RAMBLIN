var high_score = localStorage.getItem("Score");
var backbutton = document.querySelector("#backbtn")
var clearbutton = document.querySelector("#clearbtn")
var body = document.body
var high_score = JSON.parse(localStorage.getItem("Score"));
var contentUl = document.createElement("ul")
var highscoresCont = document.querySelector("#high-scores-container")


// Check if high score is null, if not, render high scores to page
if (high_score != null) {
    for (i = 0; i < high_score.length; i++) {

        var contentLi = document.createElement("li")
        contentLi.setAttribute("type", "button");
        contentLi.setAttribute("class", "h3");


        contentLi.textContent = "Name: " + high_score[i].initials + " Score: " + high_score[i].score;
        contentUl.append(contentLi)
    }
}


//place high scores in a div container
highscoresCont.append(contentUl)

//add behavior to buttons
backbutton.addEventListener("click", function () {
    window.location.href = './index.html'
});

clearbutton.addEventListener('click', function () {
    localStorage.clear();
    alert("Highscores have been cleared")
    location.reload();
});
