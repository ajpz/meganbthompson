var express = require("express"); 
var bodyParser = require("body-parser"); 

var Admin = require("../api/admins/admin.model"); 

var session = require("express-session"); 
var passport = require("passport"); 
var LocalStrategy = require("passport-local").Strategy; 
// var flash = require("connect-flash"); 

module.exports = function(app) {

	app.use(bodyParser.json()); 
	app.use(bodyParser.urlencoded({ extended : false })); 

  app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "puppyBowl", 
    cookie: { maxAge: 600000 } // { secure : true }need to use https for this to work
  }));

  // app.use(flash()); 
  // passport.use(new LocalStrategy(
  //   { usernameField: "email", 
  //   passwordField: "password" }, 
  
  //   function(username, password, done) {
  //     console.log("in LocalStrategy callback", username, password); 
  //     // console.log(Admin); 
  //     Admin.findOne({ email : username }, function(err, user) {
  //       if (err) { return done(err); }
  //       if (!user) {
  //         console.log("----> ", "no user found"); 
  //         return done(null, false, { message: "Incorrect admin name" }); 
  //       }
  //       if (user.password !== password) {
  //         console.log("----> ", "bad password"); 
  //         return done(null, false, { message : "Incorrect password."}); 
  //       }
  //       console.log("-------> found user", user); 
  //       return done(null, user); 
  //     })
  //   }
  // ))

  passport.serializeUser(function(user, done) {
    console.log("SERIALIZING USER: ", "(" + user.id + ")"); 
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    console.log("DESERIALIZING USER: ", "(" + id + ")");      
    Admin.findById(id, function(err, user) {
      // if(err) return next(err); 
      console.log("LOCATED USER: ", "(" + user.email + ")"); 
      done(err, user);
    });
  });
  
  app.use(passport.initialize()); 
  app.use(passport.session()); 
}