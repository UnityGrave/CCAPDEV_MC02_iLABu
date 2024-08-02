var express = require('express');
const session = require("express-session");
var router = express.Router();
var path = require('path');
const Reserve = require('../model/reserve');
const User = require('../model/User');


router.get('/student', function(req, res) {
    res.render('profile', {
        user: {
            firstName: req.session.user.firstName,
            middleName: req.session.user.middleName,
            lastName: req.session.user.lastName,
            email: req.session.user.email,
            image: req.session.user.image
        },
    });
});

router.get('/profileedit', async (req, res) => {
    const id = req.session.user.userID;
    const user = await User.findOne({ userID: id });
    res.render('profileedit', { user });
});

router.post('/profileedit', async (req, res) => {
    try {
        const { firstName, middleName, lastName, email } = req.body;
        const id = req.session.user.userID;
        const user = await User.findOne({ userID: id });

        if (!user) {
            return res.status(404).send('User not found');
        }

        user.firstName = firstName;
        user.middleName = middleName;
        user.lastName = lastName;
        user.email = email;

        if (req.files && req.files.image) {
            const picture = req.files.image;
            const uploadPath = path.join(__dirname, '../public/images', `${Date.now()}-${picture.name}`);

            picture.mv(uploadPath, (err) => {
                if (err) {
                    console.error('Error uploading file:', err);
                    return res.status(500).send('Internal Server Error');
                }
            });

            user.image = path.basename(uploadPath);
        }

        await user.save();
        req.session.user = {
            userID: user.userID,
            firstName: user.firstName,
            middleName: user.middleName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            image: user.image
        };

        res.redirect('/student');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/LS', function(req, res) {
    res.sendFile(path.join(__dirname + "\\" + "../public/student/LS212.html"));
});

router.get('/LS212', function(req, res) {
    res.sendFile(path.join(__dirname + "\\" + "../public/student/LS212.html"));
});

router.get('/Yuch', function(req, res) {
    res.sendFile(path.join(__dirname + "\\" + "../public/student/EY602.html"));
});

router.get('/EY602', function(req, res) {
    res.sendFile(path.join(__dirname + "\\" + "../public/student/EY602.html"));
});

router.get('/Velasco', function(req, res) {
    res.sendFile(path.join(__dirname + "\\" + "../public/student/Velasco.html"));
});

router.get('/VL101', function(req, res) {
    res.sendFile(path.join(__dirname + "\\" + "../public/student/VL101.html"));
});

router.get('/Miguel', function(req, res) {
    res.sendFile(path.join(__dirname + "\\" + "../public/student/SM303.html"));
});

router.get('/SM303', function(req, res) {
    res.sendFile(path.join(__dirname + "\\" + "../public/student/SM303.html"));
});

router.get('/Goks', function(req, res) {
    res.sendFile(path.join(__dirname + "\\" + "../public/student/Goks.html"));
});

router.get('/GK301', function(req, res) {
    res.sendFile(path.join(__dirname + "\\" + "../public/student/GK306.html"));
});

router.get('/Andrew', function(req, res) {
    res.sendFile(path.join(__dirname + "\\" + "../public/student/Andrew.html"));
});

router.get('/AG1706', function(req, res) {
    res.sendFile(path.join(__dirname + "\\" + "../public/student/AG1706.html"));
});

router.get('/settings', function(req, res) {
    res.sendFile(path.join(__dirname + "\\" + "../public/student/settings.html"));
});

router.get('/confirm', function(req, res) {
    res.sendFile(path.join(__dirname + "\\" + "../public/student/confirm.html"));
});

router.post('/reserve', async (req, res) => {
    try {
        const { slot, date, time } = req.body;
        const userId = 1;

        const newReservation = new Reserve({
            roomnumber: req.body.roomnumber,
            building: req.body.building,
            seat: slot,
            date: new Date(date),
            time: new Date(date + 'T' + time),
            reserveUser: userId,
            reserveId: Date.now()
        });

        await newReservation.save();
        res.redirect('/confirm');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.post('/deleteAccount', async (req, res) => {
    try {
        const id = req.session.user.userID;
        await User.deleteOne({ userID: id });
        req.session.destroy();
        res.redirect('/landingpage');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
