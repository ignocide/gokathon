var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var template = require('./routes/template');
var routes = require('./routes/index');
var users = require('./routes/users');
var member = require('./routes/member');
var content = require('./routes/content');
var rank = require('./routes/rank');

var app = express();

var session = require('express-session');
var redis = require('redis');
var redisStore = require('connect-redis')(session);
var client = redis.createClient();



var start = function (callback) {


    app.use(session(
        {
            secret: 'pocking_server',
            store: new redisStore({
                host: "127.0.0.1",
                port: 6379,
                client: client
            }),
            saveUninitialized: false, // don't create session until something stored,
            resave: true // don't save session if unmodified
        }
    ));


    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));



//    app.use('/template', template);
    app.use('/users', users);
    app.use('/member', member);
    app.use('/content', content);
    app.use('/rank', rank);
    app.use('/', routes);

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });


    var router = express.Router();
    router.get('/session/set/:value', function(req, res) {
        req.session.redSession = req.params.value;
        res.send('session written in Redis successfully');
    });

    app.get('/session/get/', function(req, res) {
        if(req.session.redSession)
            res.send('the session value stored in Redis is: ' + req.session.redSess);
        else
            res.send("no session value stored in Redis ");
    });

    // error handlers

    // development error handler
    // will print stacktrace

    if (app.get('env') === 'development') {
        app.use(function (err, req, res, next) {
//            res.status(err.status || 500);
//            res.render('error', {
//                message: err.message,
//                error: err
//            });

            res.json({success : 0})
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });


    var server = app.listen(3000, function (req, res) {
        console.log('서버가 ' + server.address().port + ' port에서 실행중...');
        if (callback) {
            callback();
        }
    });

}
module.exports = start;
