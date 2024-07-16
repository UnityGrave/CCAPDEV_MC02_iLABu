var express = require('express');
var router = express.Router();
var path = require('path');
const User = require('../model/User');

router.get('/landingpage', function(req, res) {
	res.sendFile(path.join(__dirname + "\\" + "../public/index.html"));
});

router.get('/register', function(req, res) {
	res.sendFile(path.join(__dirname + "\\" + "../public/register.html"));
});

router.post('/register', async (req, res) => {
    const { firstName, middleName, lastName, role, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('Email already registered');
        }
        const newUser = new User({
            firstName,
            middleName,
            lastName,
            role,
            email,
            password
        });
        await newUser.save();
        res.status(201).redirect('/landingpage');
    } catch (error) {
        console.error(error);
        res.status(500).redirect('/register');
    }
});

router.get('/dashboard', function(req, res) {
	res.sendFile(path.join(__dirname + "\\" + "../public/dashboard.html"));
});

router.post('/login', async function(req, res) {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email: email, password: password });
        
        if (!user) {
            res.status(401).send('Invalid email or password');
        } else {
            req.session.user = {
                id: user.userID,
                email: user.email,
                role: user.role,
            };
            res.redirect('/dashboard');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.clearCookie("sessionId");
        res.redirect("/");
    });
});

module.exports = router;