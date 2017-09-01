"use strict"; 

var mongoose = require("mongoose"); 
var db = require("../../db"); 

var subscriberSchema = new mongoose.Schema({
  addDate : { type : Date, default : Date.now},
  email: { type : String, required : true, unique : true }, 
  active: { type : Boolean, required : true, default : true}
}); 

var Subscriber = db.model("Subscriber", subscriberSchema); 

module.exports = Subscriber; 
