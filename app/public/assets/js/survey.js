var surveyDiv = $(".survey-question-container");
var libBellDiv = $(".button-grid");
var questionIndex = 0;
var userAnswers = [];
var questionData = [];
var postedFlag = false;
function renderQuestion(questionText) {
  surveyDiv.empty();
  surveyDiv.append(`<h3 class="survey-question">${questionText}</h3>`);
}

$.get("/api/questiondata").then(function(data) {
  questionData = data;
  renderQuestion(questionData[questionIndex]);
});

// TODO Handle answers
$(".bell-div").on("click", e => {
  var number = parseInt($(e.currentTarget).attr("data-number"));

  if (userAnswers.length <= 9) {
    userAnswers.push(number);
    renderQuestion(questionData[userAnswers.length]);
  }

  if (userAnswers.length === 10) {
    // get remaining user input
    $(".survey-question-container").css("display", "none");
    $(".button-grid").css("display", "none");
    $(".user-data-form").css("display", "grid");
  }
});

$(".bell-div-form").on("click", e => {
  // create data object
  var friendDataObj = {
    name: $(".user-name").val(),
    photo: $(".user-pic").val(),
    scores: userAnswers
  };

  $.post("/api/friends", friendDataObj, data => {
    var bestFriendName = data.name;
    var bestFriendPicUrl = data.photo;
    var modal = $(".modal");
    modal.css("display", "block");
    $(".friend-name").text(bestFriendName);
    $(".friend-image").attr("src", bestFriendPicUrl);
  });
});

$(".modal-submit").on("click", e => {
  location.reload();
});
