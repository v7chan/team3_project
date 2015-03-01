var express = require('express');
var router = express.Router();
var fields = require('../helpers/search_fields.json');
var models = require('../models');

var isAuthenticated = function (req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler 
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  if (req.isAuthenticated())
    return next();
  // if the user is not authenticated then redirect him to the login page
  res.redirect('/auth/login');
}

var preferences = [];
preferences.push(fields[2]);
preferences.push(fields[3]);

module.exports = function(passport) {
  router.get('/login', function(req, res) {
    res.render('login', { title: "grubbery", message: req.flash('message') });
  });

  router.post('/login', passport.authenticate('login', {
    successRedirect: '/search_page',
    failureRedirect: '/auth/login',
    failureFlash: true
  }));

  router.get('/register', function(req, res) {
    res.render('register', { title: "grubbery", 'fields': preferences, message: req.flash('message') });
  });

  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/auth/profile',
    failureRedirect: '/auth/register',
    successFlash: 'Welcome!',
    failureFlash: true
  }));

  router.get('/signout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  router.get('/profile', isAuthenticated, function(req, res) {
    models.Meal
      .find({'name': 'grubbery Special Sandwich'})
      .exec(display);

    function display(err, meals) {
      res.render('profile', { title: "grubbery", 'meals': meals, 'fields': preferences, message: req.flash('success'), user: req.user });
    }
  });

  return router;
}
