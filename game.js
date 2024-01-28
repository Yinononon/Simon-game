
const buttonColours =["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = []

let level = 0;

let started = false;

$(document).keydown(() => {
    if (!started) {
        $("#level-title").text("Level " + level);
        setTimeout(function () {
            nextSequence();
          }, 1000);
        started = true;
    }
        
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
          }
    }else{
        return gameOver();
       } 
}

function nextSequence() {
      userClickedPattern= [];
   let randomNumber = Math.floor(Math.random()*4);
   let randomChosenColour = buttonColours[randomNumber];
   gamePattern.push(randomChosenColour);
    level ++;
    $("h1").text("Level " + level);
        $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
        return playSound(randomChosenColour)
}


$(".btn").on("click", function(){ 
   let userChosenColor = (this.id);
   playSound(userChosenColor);
   animatePress(userChosenColor);
   userClickedPattern.push(userChosenColor);
   checkAnswer(userClickedPattern.length -1)
});

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function (){
        $("#"+ currentColor).removeClass("pressed")
    },100)
}
function playSound(name) {
    let audio = new Audio('./sounds/' + name + '.mp3');
    audio.play();
}
function gameOver() {
    level = 0;
    $("h1").text("Game Over, Press Any Key to Restart");
    playSound("wrong");
    $("body").addClass("game-over")
    setTimeout(() => {
        $("body").removeClass("game-over")
    },200)
     gamePattern = [];
     userClickedPattern = []; 
     started = false; 
}












