var express = require("express");
var app = express(); 
var path = require("path"); 

require("./logging.middleware")(app); 
require("./statics.middleware")(app); 
require("./requestState.middleware")(app); 

app.use("/api", require("../api")); 
app.use("/auth", require("../auth"));  

// serve index.html 
// app.get("/", function(req, res, next) {
//   res.status(200).sendFile(path.join(__dirname, "..", "..", "index.html")); 
// })

var validFrontendRoutes = ["/", "/login", "/addStory", "/subscribers/sendEmail","/portfolio", "/about", "/contact"];
var indexPath = path.join(__dirname, "..", "..", "index.html");
validFrontendRoutes.forEach(function (stateRoute) {
 app.get(stateRoute, function (req, res) {
   res.sendFile(indexPath);
 });
});

app.use("/*", function(req, res, next) {
  var error = new Error("No route"); 
  error.status = "404"; 
  next(error); 
})

require("./error.middleware")(app); 

module.exports = app;  
