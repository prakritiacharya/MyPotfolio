// controllers/expenseController.js-  chatgpt, text

// Temporary in-memory "database"
let expenses = [
  { _id: 1, date: '2025-08-01', category: 'Food', description: 'Lunch', amount: 12.5 },
  { _id: 2, date: '2025-08-05', category: 'Transport', description: 'Bus ticket', amount: 3.25 }
];

// Show all expenses
exports.getAllExpenses = (req, res) => {
  res.render('expenses', { expenses });
};

// Show add form
exports.getAddForm = (req, res) => {
  res.render('add');
};

// Handle add form
exports.postAddExpense = (req, res) => {
  const { date, category, description, amount } = req.body;
  expenses.push({ _id: expenses.length + 1, date, category, description, amount });
  res.redirect('/expenses');
};

// Show edit form
exports.getEditForm = (req, res) => {
  const expense = expenses.find(e => e._id == req.params.id);
  res.render('edit', { expense });
};

// Handle edit form
exports.postEditExpense = (req, res) => {
  const expense = expenses.find(e => e._id == req.params.id);
  if (expense) {
    expense.date = req.body.date;
    expense.category = req.body.category;
    expense.description = req.body.description;
    expense.amount = req.body.amount;
  }
  res.redirect('/expenses');
};

// Show delete confirmation
exports.getDeleteConfirm = (req, res) => {
  const expense = expenses.find(e => e._id == req.params.id);
  res.render('delete', { expense });
};

// Handle delete
exports.postDeleteExpense = (req, res) => {
  expenses = expenses.filter(e => e._id != req.params.id);
  res.redirect('/expenses');
};

// View single expense
exports.getSingleExpense = (req, res) => {
  const expense = expenses.find(e => e._id == req.params.id);
  res.render('view', { expense });
};
