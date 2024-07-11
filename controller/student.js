var express = require('express');
const session = require("express-session");
var router = express.Router();
var path = require('path');

//Student Profile
router.get('/student/studentPage', function(req, res) {
	res.sendFile(path.join(__dirname + "\\" + "../public/student/profile.html"));
});

module.exports = router;