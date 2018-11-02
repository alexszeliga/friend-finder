// sets the survey state
var questionIndex = 0;
// user answer values will go here
var userAnswers = [];
// instantiate questionData as an array
var questionData = [];
// render question function is called inside the
// callback from the ajax call for the question data
function renderQuestion(questionText) {
  $(".survey-question-container").empty();
  $(".survey-question-container").append(
    `<h3 class="survey-question">${questionText}</h3>`
  );
}
// ajax call for question text
$.get("/api/questiondata").then(function(data) {
  questionData = data;
  renderQuestion(questionData[questionIndex]);
});

// Handle survey answers
$(".bell-div").on("click", e => {
  var number = parseInt($(e.currentTarget).attr("data-number"));
  // if the survey isn't over, push answer to array and move on to next question
  if (userAnswers.length <= 9) {
    userAnswers.push(number);
    renderQuestion(questionData[userAnswers.length]);
  }
  // if the survey is over
  if (userAnswers.length === 10) {
    // clear it fromt the screen and show the last step of the survey
    $(".survey-question-container").css("display", "none");
    $(".button-grid").css("display", "none");
    $(".user-data-form").css("display", "grid");
  }
});
// click handler for "submit" button
$(".bell-div-form").on("click", e => {
  // create data object
  var friendDataObj = {
    name: $(".user-name").val(),
    photo: $(".user-pic").val(),
    scores: userAnswers
  };
  // post to data array -- post request returns best friend as the response
  $.post("/api/friends", friendDataObj, data => {
    var bestFriendName = data.name;
    var bestFriendPicUrl = data.photo;
    // show modal with friend info
    $(".modal").css("display", "block");
    $(".friend-name").text(bestFriendName);
    $(".friend-image").attr("src", bestFriendPicUrl);
  });
});
// all done; restart.
$(".modal-submit").on("click", e => {
  location.reload();
});
