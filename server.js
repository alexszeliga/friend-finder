// init/config express
var express = require("express");
var app = express();
var PORT = process.env.PORT || 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// route modules
require("./app/routes/apiRoutes")(app);
require("./app/routes/htmlRoutes")(app);

// listener: https://tinyurl.com/yaxh5to6
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
