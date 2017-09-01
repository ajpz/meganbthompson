"use strict";

var mongoose = require("mongoose");
var db = require("../../db");
var crypto = require("crypto");

//TODO: how to make select: false for password and salt, yet still be able to use them in the authenticate and hash methods???
//TODO: "require" both email and password
var adminSchema = new mongoose.Schema({
  addDate : { type : Date, default : Date.now},
  email: { type : String, required : true, unique : true, lowercase : true},
  password: { type: String},
  salt: { type: String, default: makeSalt },
  isAdmin: { type : Boolean, required : true, default : false }
});

adminSchema.statics.findAdmin

function makeSalt () {
  return crypto.randomBytes(16).toString("base64");
}

// encrypt password strings before storing in database
adminSchema.path("password").set(function (plaintext) {
  return this.hash(plaintext);
});

// encryption requires user-secrte, salt and encryption params
adminSchema.methods.hash = function (plaintext) {
  var result = crypto.pbkdf2Sync(plaintext, this.salt, 10000, 64).toString("base64");
  return result;
};

// compares the encrypted attempt against encrypted password - raw password never exposed
adminSchema.methods.authenticate = function (attempt) {
  return this.password == this.hash(attempt);
};

// transform returned admin instances (drop sensitive data)
adminSchema.set("toJSON", {
  transform: function(doc, ret, options) {
    var retJson = {
      email: ret.email,
      isAdmin: ret.isAdmin
    };
    return retJson;
  }
});

var Admin = db.model("Admin", adminSchema);

module.exports = Admin;
