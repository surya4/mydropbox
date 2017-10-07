const WebSocket = require('ws');
const express = require('express');
const http = require("http");
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const index = require('./src/routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', '../src/public/images/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './src/public')));

app.use('/', index);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server: server });
let connectedUsers = 0;

wss.on("connection", function(ws) {
    connectedUsers++;
    var id = setInterval(function() {
        ws.send(JSON.stringify(new Date() + ` connectedUsers ${connectedUsers}`), function() {})
    }, 1000);

    console.log("New websocket connection open");

    ws.on("close", function() {
        console.log("websocket connection close")
        clearInterval(id);
    });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('pages/error');
});

server.listen(port, function listening() {
    console.log('Listening on %d', server.address().port);
});

module.exports = app;