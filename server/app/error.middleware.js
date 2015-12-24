var express = require('express'); 


module.exports = function(app) {
	app.use(function(err, req, res, next) {
    console.log(err); 
    console.log(' ERROR MW: ', err.status, err.message); 
		err.status = err.status || 500; 
    res.status(err.status).send({status: err.status, message: err.message}); 
	})
}