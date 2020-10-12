
var high_score = localStorage.getItem("Score");
var backbutton = document.querySelector("#backbtn")
var clearbutton = document.querySelector("#clearbtn")
var body = document.body
var high_score = JSON.parse(localStorage.getItem("Score"));
var contentUl = document.createElement("ul")
var highscoresCont = document.querySelector("#high-scores-container")



if (high_score != null) {
for (i = 0; i < high_score.length; i++) {
    
    var contentLi = document.createElement("li")
    contentLi.setAttribute("type", "button");

    contentLi.textContent = "Name: " + high_score[i].initials +  " Score: " + high_score[i].score;
    contentUl.append(contentLi)
}
}

else {

   //do nothing - this is to fix a bug where the page wouldn't load because the highscores object would be null if you cleared local storage.

}

body.append(contentUl)

backbutton.addEventListener("click", function(){
    window.location.href='./index.html'
});

clearbutton.addEventListener('click', function(){
    localStorage.clear();
    alert("Highscores have been cleared!")
    location.reload();
});
  