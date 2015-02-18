var express = require('express');
var router = express.Router();
var searchFields = require("../helpers/search_fields.json");

/* GET home page. */
router.get('/', function(req, res) {
  res.render('splash', { title: "Team3 | TritonEATS!" });
});

router.get('/search_page', function(req, res) {
  res.render('index', { title: "Team3 | TritonEATS!", 'fields': searchFields });
});

router.get('/template', function(req, res) {
  res.render('template', { title: "Team3 | TritonEATS!" });
});

router.get('/help', function(req, res) {
  res.render('help', { title: "Team3 | TritonEATS!" });
});

module.exports = router;
