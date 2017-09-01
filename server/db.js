"use strict";
var path = require("path");
var mongoose = require("mongoose");
var Promise = require("bluebird");
Promise.promisifyAll(mongoose);

var DATABASE_URI = require(path.join(__dirname, "./env")).DATABASE_URI;

var db = mongoose.connect(DATABASE_URI).connection;

db.on("open", function () {
  console.log("Database connection successfully opened");
});

db.on("error", function (err) {
  console.error("Database connection error", err);
});

module.exports = db;
