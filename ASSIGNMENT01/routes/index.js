var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('homepage', { title: 'Home Page' })
});

router.get('/homepage', function(req, res) {
  res.render('homepage', { title: 'Home Page' })
});

router.get('/about', function(req, res) {
  res.render('about', { title: 'About Me' })
});

router.get('/projects', function(req, res) {
  res.render('projects', { title: 'My projects' })
});

router.get('/contact', function(req, res) {
  res.render('contact', { title: 'Contact me' })
});

module.exports = router;
