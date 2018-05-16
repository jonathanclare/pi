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

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Import routers.
const indexRouter = require('./routes/index');
const roboRouter = require('./routes/robo');
const driveRouter = require('./routes/drive');

// Listen at port 5000.
const app = express();
app.listen(5000);

// View engine setup - replaced jade with ejs
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'ejs-views'));
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routers.
app.use('/', indexRouter);
app.use('/robo', roboRouter);
app.use('/robo/drive', driveRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) =>
{
    next(createError(404));
});

// Error handler
app.use((err, req, res, next)  =>
{
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;