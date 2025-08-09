const express = require('express');
const router = express.Router();

const expenseController = require('../controllers/expenseController');

// List all expenses
router.get('/', expenseController.getAllExpenses);

// Show add expense form
router.get('/add', expenseController.getAddForm);
router.post('/add', expenseController.postAddExpense);

// Show edit form
router.get('/edit/:id', expenseController.getEditForm);
router.post('/edit/:id', expenseController.postEditExpense);

// Show delete confirmation
router.get('/delete/:id', expenseController.getDeleteConfirm);
router.post('/delete/:id', expenseController.postDeleteExpense);

// View single expense
router.get('/view/:id', expenseController.getSingleExpense);

module.exports = router;
