// EXPRESS APPLICATION GENERATOR
// https://expressjs.com/en/starter/generator.html
// 
// INSTALL EJS FOR IMPROVED TEMPLATING
// > npm install ejs
//
// INSTALL PYTHON-SHELL FOR IMPROVED TEMPLATING
// > npm install python-shell
//
// TO RUN
// > set DEBUG=myapp:* 
// > npm start

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var PythonShell = require('python-shell');

var app = express();

app.listen(5000);

// jade view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// view engine setup - replaced jade with ejs
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'ejs-views'));
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

PythonShell.run(path.join(__dirname, 'public/python/app.py'), {args: ['forwards']}, function (err, results) 
{
    console.log(results)
});

// catch 404 and forward to error handler
app.use(function(req, res, next) 
{
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) 
{
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
