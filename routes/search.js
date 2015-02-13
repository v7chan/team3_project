var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/results', function(req, res) {
  models.Meal
    .find()
    .exec(display);

  function display(err, meals) {
    res.render('results', { title: "Team3 | TritonEATS!", 'meals': meals });
  }
});

router.get('/results/detail', function(req, res) {
  var id = req.query.id;
  models.Meal
    .findOne({ '_id': id })
    .exec(display);

  function display(err, meal) {
    console.log(meal);
    res.render('detail_stub', { title: "Team3 | TritonEATS!", 'meal': meal });
  }
});

router.get('/results/detail/map', function(req, res) {
  res.render('map_stub', { title: "Team3 | TritonEATS!" });
});

module.exports = router;
