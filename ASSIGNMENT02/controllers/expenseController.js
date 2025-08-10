const Expense = require('../models/Expense');

// Home page data
exports.getDashboard = async (req, res) => {
  try {
    // All expenses
    const expenses = await Expense.find();

    // Total expenses
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

    // This month's expenses
    const currentMonth = new Date().getMonth();
    const monthlyExpenses = expenses
      .filter(e => new Date(e.date).getMonth() === currentMonth)
      .reduce((sum, e) => sum + e.amount, 0);

    // Unique categories
    const categoriesCount = new Set(expenses.map(e => e.category)).size;

    // Recent 5 expenses (sorted newest first)
    const recentExpenses = await Expense.find()
      .sort({ date: -1 })
      .limit(5);

    res.render('index', {
      title: 'Home',
      totalExpenses: totalExpenses.toFixed(2),
      monthlyExpenses: monthlyExpenses.toFixed(2),
      categoriesCount,
      recentExpenses
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
