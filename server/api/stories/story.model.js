"use strict";

var mongoose = require("mongoose");
var db = require("../../db");

var storySchema = new mongoose.Schema({
  addDate : { type : Date, default : Date.now},
  airDate : { type : Date, required : true },
  title : { type : String, required : true },
  description: { type : String, required : true },
  type : { type : String, enum: ["documentary", "journalism"], required: true },
  videoUri: { type: String, required : true, unique : true },
  videoImg: { type: String },
  showName : { type : String, enum: ["newsHour", "needToKnow", "film", "treasures","worldFocus"], required: true }
});

var Story = db.model("Story", storySchema);

module.exports = Story;
