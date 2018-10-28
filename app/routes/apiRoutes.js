// import data from data module
var friendData = require("../data/friends");

module.exports = function(app) {
  // api get all friends
  app.get("/api/friends", function(request, response) {
    response.json(friendData);
  });
  // api post new friend
  app.post("/api/friends", function(request, response) {
    friendData.push(request.body);
    response.json(true);
  });
};
