var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/results', function(req, res) {
  var location     = req.param('location');
  var time         = req.param('time');
  var goal         = req.param('goal');
  var restrictions = req.param('restrictions');
  var filterJSON = {'location': location};

  if(time != '1') {
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
    var randomNumber = Math.random();

    if(randomNumber > 0.5) {
      res.render('results', { title: "grubbery", 'meals': meals, user: req.user });  
    }
    else {
      res.render('results_alt', { title: "grubbery", 'meals': meals, user: req.user });  
    }
  }
});

router.get('/results_alt', function(req, res) {
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
    res.render('results_alt', { title: "grubbery", 'meals': meals, user: req.user });
  }
});

router.get('/results/detail', function(req, res) {
  var id = req.query.id;
  models.Meal
    .findOne({ '_id': id })
    .exec(display);

  function display(err, meal) {
    res.render('details', { title: "grubbery", 'meal': meal, user: req.user });
  }
});

router.get('/results/detail/map', function(req, res) {
  var id = req.query.id;
  models.Meal
    .findOne({ '_id': id})
    .exec(display);

  function display(err, meal) {
    res.render('map', { title: "grubbery", 'meal': meal, user: req.user });
  }
});

module.exports = router;
