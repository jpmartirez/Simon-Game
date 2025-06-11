var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).on("keypress",function() {
  if (!started) {
    nextSequence();
    started = true;
    $(".playBtn").addClass("hide");
  }
});

$(".playBtn").on("click", () => {
  if (!started) {
    nextSequence();
    started = true;
    $(".playBtn").addClass("hide");
  }
})


$(".btn").on("click", function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  
  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("Correct");
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function() {
        userClickedPattern = [];
        nextSequence();
      }, 1000);
    }
  }
  else{
    gameOver();
  }
}


function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
}

function playSound(name){
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function () {
    $("#"+currentColor).removeClass("pressed");
  },100);
}

function gameOver() {
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);

  var audio = new Audio("./sounds/wrong.mp3");
  audio.play();

  $('h1').text("Game Over, Press Any Key or Click Play to Restart");
  startOver()
}

function startOver(){
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
  $(".playBtn").removeClass("hide");
}
