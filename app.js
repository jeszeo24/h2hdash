var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors")
// added below by executing "npm install express-fileupload"
var fileUpload = require("express-fileupload");

var indexRouter = require('./routes/index');
var notesRouter = require('./routes/notes');
// create router for images
var imageRouter = require("./routes/images");

var app = express();

// Register initial middleware
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// serve static images from public/img folder (stored permanently in file so can be served statically to front end)
app.use(express.static("public"));

// need to declare to use fileUpload
app.use(
    fileUpload({
        // want to use temporary files, when it gets uploaded, gets stored temporarily in folder in the backend
        useTempFiles: true,
        // using the folder "./tmp/"
        tempFileDir: "./tmp/",
    })
);

// Register all routes (stored in other files)
app.use('/', indexRouter);
app.use('/notes', notesRouter);
// need to use images router
app.use('/images', imageRouter);

module.exports = app;
