var express = require('express');
var router = express.Router();
var preferenceFields = require('../helpers/preference_fields.json');
var models = require('../models');

/* GET home page. */
router.get('/login', function(req, res) {
    res.render('login', { title: "Team3 | TritonEATS!" });
});

router.get('/register', function(req, res) {
    res.render('register', { title: "Team3 | TritonEATS!", 'fields': preferenceFields });
});

router.get('/profile', function(req, res) {
  models.Meal
    .find({'name': 'Team3 Special Sandwich'})
    .exec(display);

  function display(err, meals) {
    res.render('profile', { title: "Team3 | TritonEATS!", 'meals': meals, 'fields': preferenceFields });
  }
});

module.exports = router;
