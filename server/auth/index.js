var router = require("express").Router(); 
var Admin = require("../api/admins/admin.model"); 

var passport = require("passport"); 


module.exports = router; 

//NEVER GOT THIS FULLY WORKING
// router.post("/login", passport.authenticate("local", {
//       successRedirect: "/#/add-story", 
//       failureRedirect: "/#/login", 
//       failureFlash: true
//     })
// )

router.post("/login", function(req, res, next) {
  Admin.findOne( { email: req.body.email } ).exec()
    .then(function(admin) {
      if(!admin) {
        var err = new Error("Bad username"); 
        err.status = 401; 
        return next(err);
      }
      if(admin.authenticate(req.body.password)) {
        req.login(admin, function() { 
          res.json(admin); 
        })
      } else {
        var err = new Error("Bad Password"); 
        err.status = 401; 
        return next(err); 
      }
    })
    .then(null, next); 
})

router.get("/session-status", function(req, res, next) {
  console.log("SESSION-STATUS REFRESH REQUEST"); 
  if(req.user) res.status(200).json(req.user); 
  res.status(401).send({message: "No session exists"}); 
})

router.delete("/admin", function(req, res, next) {
  req.logout(); 
  res.status(204).end(); 
})
