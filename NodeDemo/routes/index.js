var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Willamette Pass Ski Patrol: Home' });
});

router.get('/contact', function(req, res, next) {
  res.send('do the contact business');
});

module.exports = router;
