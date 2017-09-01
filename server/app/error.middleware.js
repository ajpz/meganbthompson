var express = require("express");

module.exports = function(app) {
  app.use(function(err, req, res, next) {
    console.log(" ERROR MW: ", err.status, err.message, req.method + ": ", req.originalUrl);
    err.status = err.status || 500;
    res.status(err.status).send({status: err.status, message: err.message});
  })
}
