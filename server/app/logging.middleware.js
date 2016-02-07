var morgan = require('morgan'); 

module.exports = function(app) {
	// app.use(morgan('dev')); 

  morgan.token('session-status', function(req) {
    if(req.user) return req.user.email; 
    else return '(visitor)'; 
  })

  app.use(morgan(':method :url :session-status :status :response-time ms - :res[content-length]'))
}