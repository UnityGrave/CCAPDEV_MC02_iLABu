var express = require('express');
var router = express.Router();
var path = require('path');
const bcrypt = require('bcrypt');
const User = require('../model/User');

router.get('/landingpage', function(req, res) {
    res.sendFile(path.join(__dirname + "\\" + "../public/index.html"));
});

router.get('/register', function(req, res) {
    res.sendFile(path.join(__dirname + "\\" + "../public/register.html"));
});

router.get('/dashboard', function(req, res) {
    res.sendFile(path.join(__dirname + "\\" + "../public/dashboard.html"));
});

router.post('/login', async function(req, res) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).redirect('/login?error=User not found. Please register.');
        }

        const hashmatchchecker = await bcrypt.compare(password, user.password);

        if (!hashmatchchecker) {
            return res.status(401).redirect('/login?error=Given Password was Incorrect');
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

router.post('/register', async function(req, res) {
    const { firstName, middleName, lastName, role, email, password } = req.body;

    try {
        const passwordhash = await bcrypt.hash(password, 8);

        const newUser = new User({
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            role: role,
            email: email,
            password: passwordhash
        });

        await newUser.save();
        res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
        res.status(500).send('/landingpage');
    }
});

module.exports = router;