var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/results', function(req, res) {
  var location     = req.param('location');
  var time         = req.param('time');
  var goal         = req.param('goal');
  var restrictions = req.param('restrictions');
  var filterJSON = {'location': location};

  if(time != 'Unlimited') {
    filterJSON['waitTime'] = {$lte: time};
  }

  if(goal != 'None') {
    filterJSON['goals'] = goal;
  }

  if(restrictions != 'None') {
    filterJSON['restrictions'] = restrictions;
  }

  models.Meal
    .find(filterJSON)
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
    res.render('details', { title: "Team3 | TritonEATS!", 'meal': meal });
  }
});

router.get('/results/detail/map', function(req, res) {
  var id = req.query.id;
  models.Meal
    .findOne({ '_id': id})
    .exec(display);

  function display(err, meal) {
    res.render('map', { title: "Team3 | TritonEATS!", 'meal': meal });
  }
});

module.exports = router;
