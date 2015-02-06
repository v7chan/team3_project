var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/results', function(req, res) {
  res.render('results', { title: "Team3 | TritonEATS!" });
});

router.get('/results/detail', function(req, res) {
  res.render('detail_stub', { title: "Team3 | TritonEATS!" });
});

router.get('/results/detail/map', function(req, res) {
  res.render('map_stub', { title: "Team3 | TritonEATS!" });
});

module.exports = router;
