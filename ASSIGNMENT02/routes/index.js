var express = require('express');
var router = express.Router();
const expenseController = require('../controllers/expenseController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/', function(req, res, next) {
  res.render('expenses', { title: 'Express' });
});

router.get('/add', (req, res) => {
  res.render('add'); 
});

router.get('/', expenseController.getDashboard);



module.exports = router;
