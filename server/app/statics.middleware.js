var express = require("express"); 
var path = require("path"); 

//TODO: clean up paths below

module.exports = function(app) {
	app.use(express.static(path.join(__dirname, "..", "..", "public"))); 
	app.use(express.static(path.join(__dirname, "..", "..", "browser"))); 
  app.use(express.static(path.join(__dirname, "..", "..", "dest"))); 
	app.use(express.static(path.join(__dirname, "..", "..", "node_modules", "bootstrap"))); 
  // app.use(express.static(path.join(__dirname, "..", "..", "node_modules", "bootstrap-social")));  
  app.use(express.static(path.join(__dirname, "..", "..", "node_modules", "jquery"))); 
  app.use(express.static(path.join(__dirname, "..", "..", "node_modules", "angular")));
  app.use(express.static(path.join(__dirname, "..", "..", "node_modules", "angular-ui-router")));  
  app.use(express.static(path.join(__dirname, "..", "..", "node_modules", "angular-sanitize")));  
  app.use(express.static(path.join(__dirname, "..", "..", "node_modules", "font-awesome")));
}