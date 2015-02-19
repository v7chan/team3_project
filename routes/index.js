var express = require('express');
var router = express.Router();
var searchFields = require("../helpers/search_fields.json");

/* GET home page. */
router.get('/', function(req, res) {
  res.render('splash', { title: "Team3 | TritonEATS!", user: req.user });
});

router.get('/search_page', function(req, res) {
  var updatedSearchFields = []
  updatedSearchFields.push(searchFields[0]);
  updatedSearchFields.push(searchFields[1]);
  updatedSearchFields.push(searchFields[2]);
  updatedSearchFields.push(searchFields[3]);

  updatedSearchFields[2].placeholder = req.user.goal;
  updatedSearchFields[3].placeholder = req.user.restriction;

  res.render('index', { title: "Team3 | TritonEATS!", 'fields': updatedSearchFields, user: req.user });
});

router.get('/template', function(req, res) {
  res.render('template', { title: "Team3 | TritonEATS!", user: req.user });
});

router.get('/help', function(req, res) {
  res.render('help', { title: "Team3 | TritonEATS!", user: req.user });
});

router.get('/coming_soon', function(req, res) {
  res.render('coming_soon', { title: "Team3 | TritonEATS!", user: req.user });
});

module.exports = router;
