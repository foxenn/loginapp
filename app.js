//dependencies
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var async = require('async');
var crypto = require('crypto');

//database
mongoose.connect('mongodb://localhost/loginapp', { useMongoClient: true });

var User = require('./models/model');

//app init
var app = express();


//middlewares
app.set('port', process.env.PORT || 8080);
app.set('view engine', 'ejs');
app.set(path.join(__dirname, 'views'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({secret: '$&*$%%^384$&%^&%$^&%'}));
app.use(passport.initialize());
app.use(passport.session());

//routes

//home
app.get('/', function(req, res){
	res.render('index',{
		title: 'Home',
		user: req.user
	});
});

app.get('/login', function(req, res){
	res.render('login',{
		user: req.user
	});
});

//register
app.get('/register', function(req, res){
	res.render('register',{
		title: 'Register'
	});
});

app.post('/register', function(req, res){

	var newUser = {
		username: req.body.username,
		email: req.body.email,
		password: req.body.password
	}

});


//server
app.listen(app.get('port'), function(){
	console.log('i\'m listening on port '+ app.get('port'));
});