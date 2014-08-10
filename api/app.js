// main entry

var express = require("express");
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('cookie-session');

// routers
var member = require('./routes/member/member');
var auth = require('./routes/auth/auth');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({
  secret: 'dasuhdi678123hbeis781309MFDSUF8934'
}));

app.all('*', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,DELETE,POST,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type,Accept,X-Requested-With');
	next();
});

app.use('/auth', auth);
app.use('/member', member);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		console.error(err.stack);
		res.json({
			error: err.message
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.json({
		error: err.message
	});
});

module.exports = app;