'use strict'; 

var mongoose = require('mongoose'); 
var db = require('../../db'); 


var adminSchema = new mongoose.Schema({
  addDate : { type : Date, default : Date.now},
  email: { type : String, required : true, unique : true }, 
  password: { type: String, required : true }, 
  isAdmin: { type : Boolean, required : true, default : false }, 
}); 

var Admin = db.model('Admin', adminSchema); 

module.exports = Admin; 
