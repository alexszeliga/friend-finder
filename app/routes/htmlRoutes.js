// path parsing for server
var path = require("path");

module.exports = function(app) {
  // servey route
  app.get("/survey", function(request, response) {
    response.sendFile(path.join(__dirname, "../public/survey.html"));
  });
  // home route
  app.get("*", function(request, response) {
    response.sendFile(path.join(__dirname, "../public/home.html"));
  });
};
