"use strict"; 

var router = require("express").Router(); 

module.exports = router; 

var checkForAuthUser = function(req, res, next) {
  // no authentication required for....
  if(req.method.toLowerCase() === "get") // ...get requests 
    return next(); 
  if(req.method.toLowerCase() === "post" && req.originalUrl === "/api/subscribers") // post requests for new subscribers
    return next(); 
  if(!req.user) return res.status(401).end(); // otherwise, user must be authenticated as admin
  next()
}

router.use("/", checkForAuthUser); 
router.use("/stories", require("./stories/story"));
router.use("/subscribers", require("./subscribers/subscriber"));
router.use("/admins", require("./admins/admin")); 

