var express = require('express');
var router = express.Router();
var path = require('path');
const bcrypt = require('bcrypt');
const User = require('../model/User');

router.get('/landingpage', function(req, res) {
    res.sendFile(path.join(__dirname + "\\" + "../public/index.html"));
});

router.get('/register', function(req, res) {
    res.render('register', { error: req.query.error });
});

router.get('/dashboard', function(req, res) {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.render('dashboard', {
        userID: req.session.user.userID,
        firstName: req.session.user.firstName,
        middleName: req.session.user.middleName,
        lastName: req.session.user.lastName,
        role: req.session.user.role,
        image: req.session.user.image,
    });
});

router.post('/login', async function(req, res) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.render('register', { error: 'User does not exist!' });
        }

        const hashmatchchecker = await bcrypt.compare(password, user.password);

        if (!hashmatchchecker) {
            return res.render('register', { error: 'Invalid Password!' });
        } else {
            if (req.files && req.files.image) {
                const picture = req.files.image;
                const uploadPath = path.join(__dirname, '../public/images', `${Date.now()}-${picture.name}`);
    
                picture.mv(uploadPath, (err) => {
                    if (err) {
                        console.error('Error uploading file:', err);
                        return res.status(500).send('Error');
                    }
                });
    
                user.image = path.basename(uploadPath);
            }
            req.session.user = {
                userID: user.userID,
                firstName: user.firstName,
                middleName: user.middleName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                image: user.image
            };

            res.redirect('/dashboard');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error');
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

    if (!firstName || !middleName || !lastName || !role || !email || !password) {
        return res.render('register', { error2: 'Please fill all fields' });
    }

    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.render('register', { error2: 'Email already exists' });
        }

            const uploadPath = path.join(__dirname, '../public/images', `pfp`);
            image = path.basename(uploadPath);

        const passwordhash = await bcrypt.hash(password, 8);

        const newUser = new User({
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            role: role,
            email: email,
            password: passwordhash,
            image: image
        });

        await newUser.save();
        res.redirect('/landingpage');
    } catch (error) {
        console.error(error);
        res.status(500).send('/landingpage');
    }
});

module.exports = router;
