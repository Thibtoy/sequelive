var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const sequelize = require('./sequelize');
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local');
const passportLocalSequelize = require('passport-local-sequelize');

const User = require('./models/userModel');

sequelize.sync()
	.then(() =>  {console.log('vous êtes connectés')},
			err => {console.log(err)});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	secret: 'lesecret',
	saveUninitialized: true,
	resave:true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(function(username, password, done){
	User.findOne({where: {username: username}}).then(user => {
		if (user === null) return done(null, false, {message: 'unknown user'});
		else if (user.password == password) return(done(null, user));
		else return done(null, false, {message: 'wrong password'});
	}, err => {console.log(err)});
}));

passport.serializeUser(function(user, done){
	done(null, user);
});

passport.deserializeUser(function(id, done){
	User.findOne({where: {id: id}}).then(function(user, err){
		done(err, user);
	});
})

function isLoggedIn(request, response, next) {
    // passport adds this to the request object
    console.log(request.session.passport)
    // if (request.isAuthenticated()) {
    //     return next();
    // }
    // response.redirect('/');
	}

app.use('/', indexRouter);
usersRouter(app, passport, isLoggedIn);

module.exports = app;
