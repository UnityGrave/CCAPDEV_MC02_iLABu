const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/ilabu')

const express = require('express');
const session = require("express-session");
const bodyParser = require('body-parser');
const path = require('path');
const fileUpload = require('express-fileupload');
const app = express();

const User = require("./model/User");
const Reserve = require("./model/reserve");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());

app.use(
    session({
        secret: "secret-key",
        resave: false,
        saveUninitialized: false,
    })
);

/* Import routes from controller folder */
const studentRoutes = require('./controller/student');
const landingRoutes = require('./controller/landing');
app.use('/', studentRoutes);
app.use('/', landingRoutes);

app.use(express.static(path.join(__dirname + "/public")));

/* Handlebars */
var hbs = require('hbs');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

var server = app.listen(3000, function() {
    console.log("listening to port 3000...");
});