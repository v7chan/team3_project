var express = require('express');
var router = express.Router();

/* Example for how to route to a sub-page.
 * The code below displays http://localhost:3000/test/home
 */
router.get('/search', function(req, res) {
  res.render('index', { title: "Team3 | TritonEATS!" });
});

module.exports = router;
