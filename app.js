var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser'),
    ejs = require('ejs'),
    session = require('express-session'),
    SessionStore = require("express-mysql-session");

var routes = require('./routes/index'),
    conf   = require('./conf');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//new add the following code
//app.use(express.cookieParser());
//app.use(express.cookieSession({ secret: 'tobo!', cookie: { maxAge: 60 * 60 * 1000 }}));//必须位于app.use(app.router);前
app.use(express.cookieSession({secret : 'session_cookie_secret'}));

var options = {
     host: 'localhost',// Host name for database connection.
     port: 3306,// Port number for database connection.
     user: 'root',// Database user.
     password: '123123',// Password for the above database user.
     database: 'teacher_platform_d1',// Database name.
     checkExpirationInterval: 900000,// How frequently expired sessions will be cleared; milliseconds.
     expiration: 90000//86400000
};

var sessionStore = new SessionStore(options)

app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: true,
    cookie: { maxAge: 90000 },
    saveUninitialized: true
}))

app.use(function(req, res, next){
    res.locals.user = req.session.user;
    var err = req.session.error;
    delete req.session.error;
    res.locals.message = '';
    if (err) res.locals.message = '<div class="alert alert-error">' + err + '</div>';
    var welcome="";
    next();
});

routes(app);

app.get('*', function(req, res){
    res.render('error', {
        title: 'No Found'
    })
});
app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});