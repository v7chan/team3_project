var express = require('express');
var router = express.Router();
var preferenceFields = require('../helpers/preference_fields.json');

/* GET home page. */
router.get('/login', function(req, res) {
  res.render('login', { title: "Team3 | TritonEATS!" });
});

router.get('/register', function(req, res) {
  res.render('register', { title: "Team3 | TritonEATS!" });
});

router.get('/profile', function(req, res) {
  res.render('profile', preferenceFields);
});

module.exports = router;
