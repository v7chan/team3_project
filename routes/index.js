var express = require('express');
var router = express.Router();
var searchFields = require("../helpers/search_fields.json");

router.get('/', function(req, res) {
  if(req.user) {
    res.redirect('/search_page');
  }
  else {
    res.render('splash', { title: "Team3 | TritonEATS!", user: req.user });
  }
});

router.get('/search_page', function(req, res) {
  res.render('index', { title: "Team3 | TritonEATS!", 'fields': searchFields, message: req.flash('success'), user: req.user });
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
