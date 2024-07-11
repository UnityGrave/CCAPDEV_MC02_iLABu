const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/')

const express = require('express')
const session = require("express-session")
const path = require('path')
const bodyParser = require('body-parser')

//For uploading files
const fileUpload = require('express-fileupload')

const app = new express();

/* Database Collections */
//const Reservation = require("./model/reservation")
//const Profile = require("./model/profile")
//const User = require("./model/user")


/*Import route from controller folder  */
const studentRoutes = require('./controller/student')
const landingRoutes = require('./controller/landing')

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
/*  Import route from controller folder */
app.use('/', studentRoutes);
app.use('/', landingRoutes);


/* Handlebars */
var hbs = require('hbs')
app.set('view engine','hbs');

var server = app.listen(3000, function() {
	console.log("listening to port 3000...");
});
