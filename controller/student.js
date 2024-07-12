var express = require('express');
const session = require("express-session");
var router = express.Router();
var path = require('path');

//Student Profile
router.get('/student', function(req, res) {
	res.sendFile(path.join(__dirname + "\\" + "../public/student/profile.html"));
});

router.get('/profileedit', function(req, res) {
	res.sendFile(path.join(__dirname + "\\" + "../public/student/profileedit.html"));
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

module.exports = router;