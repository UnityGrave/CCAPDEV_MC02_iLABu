const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/')

const express = require('express')
const session = require("express-session")
const path = require('path')
const bodyParser = require('body-parser')

// File Uploading
const fileUpload = require('express-fileupload')

const app = new express();

/* Initialize database collections */
//const Reservation = require("./model/reservation")
//const Profile = require("./model/profile")
//const User = require("./model/user")


/*  Importing of Routes From Controller Folder  */
const landingRoutes = require('./controller/landing')
//const studentRoutes = require('./controller/student')

app.use(express.json()); // use json
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

/*  Importing of Routes From Controller Folder  */
app.use('/', landingRoutes);
//app.use('/', studentRoutes);

/* Handlebars */
var hbs = require('hbs')
app.set('view engine','hbs');

var server = app.listen(3000, function() {
	console.log("listening to port 3000...");
});
