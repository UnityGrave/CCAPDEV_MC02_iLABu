const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/ilabu')

const express = require('express')
const session = require("express-session")
const bodyParser = require('body-parser')
const path = require('path')
const fileUpload = require('express-fileupload')
const app = new express();

/* Database Collections */
const User = require("./model/User")


/*Import route from controller folder  */
const studentRoutes = require('./controller/student')
const landingRoutes = require('./controller/landing')

/*  Import route from controller folder */
app.use('/', studentRoutes);
app.use('/', landingRoutes);

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(fileUpload());

app.use(express.static(path.join(__dirname + "/public"))); 

// Session middleware setup
app.use(
    session({
        secret: "secret-key",
        resave: false,
        saveUninitialized: false,
    })
);

/* Handlebars */
var hbs = require('hbs')
app.set('view engine','hbs');

var server = app.listen(3000, function() {
	console.log("listening to port 3000...");
});
