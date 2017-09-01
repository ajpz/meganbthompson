"use strict";

require("babel-register");

var http = require("http");
var server = http.createServer();
var db = require("./db");  // requires db to ensure databse connection established
var PORT = process.env.PORT || 3030;

server.on("request", require("./app"));

server.listen(PORT, function() {
  console.log("Listening on port " + PORT);
})

module.exports = server;
