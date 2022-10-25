var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors")

var indexRouter = require('./routes/index');
var notesRouter = require('./routes/notes');

var app = express();

// Register initial middleware
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Register all routes (stored in other files)
app.use('/', indexRouter);
app.use('/notes', notesRouter);

module.exports = app;
