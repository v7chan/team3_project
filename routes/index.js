var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('splash', { title: "Team3 | TritonEATS!" });
});

router.get('/search_page', function(req, res) {
  res.render('index', { title: "Team3 | TritonEATS!" });
});

module.exports = router;
