var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/login', function(req, res) {
  res.render('login', { title: "Team3 | TritonEATS!" });
});

router.get('/register', function(req, res) {
  res.render('register', { title: "Team3 | TritonEATS!" });
});

router.get('/profile', function(req, res) {
  res.render('profile', { title: "Team3 | TritonEATS!" });
});

module.exports = router;
