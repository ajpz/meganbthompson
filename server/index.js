'use strict'; 

require('babel-register');

var http = require('http'); 
var server = http.createServer(); 
var db = require('./db');  // requires db to ensure databse connection established

server.on('request', require('./app')); 

server.listen(3030, function() {
	console.log('Listening on port 3030!'); 
})


module.exports = server; 