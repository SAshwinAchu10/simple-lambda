var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();


var router = express.Router();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(router);
router.use(logger('dev'));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(express.static(path.join(__dirname, 'src/')));
router.use(cookieParser());
router.get('*', function(req, res) {
    res.sendFile(path.resolve('src/index.html')); // load the single view file (angular will handle the page changes on the front-end)
});

var port = 8999;

app.listen(process.env.PORT || port);

console.log('App started on port ' + port);
