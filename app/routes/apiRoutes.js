// import data from data module
var friendData = require("../data/friends");
var questionData = require("../data/questions");

module.exports = function(app) {
  // api get all friends
  app.get("/api/friends", function(request, response) {
    response.json(friendData);
  });
  // api post new friend
  app.post("/api/friends", function(request, response) {
    // create array variable to save new user's matches against existing users
    var matchArray = [];
    // iterate through existing friends
    friendData.forEach(friend => {
      // instantiate the difference between each friend and the new user
      var difference = 0;
      // iterate through each question the user answered against the current friend
      request.body.scores.forEach((userScore, i) => {
        // calculate difference, not subtraction
        if (userScore > friend.scores[i]) {
          difference += userScore - friend.scores[i];
        } else {
          difference += friend.scores[i] - userScore;
        }
      });
      // put the calucated difference in the match array
      matchArray.push(difference);
    });
    // the users' best friend is calulated by finding the lowest
    // value in the match array; it's index will correlate the the
    // best friend's index in the friendData
    var bestFriend = friendData[matchArray.indexOf(Math.min(...matchArray))];
    // respond with the object of the users' best match

    response.json(bestFriend);
    // add new user to friendData
    friendData.push(request.body);
  });
  app.get("/api/questiondata", function(request, response) {
    response.json(questionData);
  });
};
