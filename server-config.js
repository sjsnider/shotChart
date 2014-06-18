var express = require('express');
// var partials = require('express-partials');
// var util = require('./lib/utility');
var NewShot = require('./db-data');

var handler = require('./requesthandler');

var app = express();

app.configure(function() {
//   app.set('views', __dirname + '/views');
//   app.set('view engine', 'ejs');
//   app.use(partials());
//   app.use(express.bodyParser());
  app.use(express.static(__dirname + '/'));
//   app.use(express.cookieParser('shhhh, very secret'));
//   app.use(express.session());
});

app.get('/', function(req, res){
  res.render('index');
});
app.get('/getData', handler.getData);
app.get('/getAllPlayers', handler.getAllPlayers);

// app.get('/links', util.checkUser, handler.fetchLinks);
// app.post('/links', handler.saveLink);

// app.get('/login', handler.loginUserForm);
// app.post('/login', handler.loginUser);
// app.get('/logout', handler.logoutUser);

// app.get('/signup', handler.signupUserForm);
// app.post('/signup', handler.signupUser);

// app.get('/*', handler.navToLink);

module.exports = app;