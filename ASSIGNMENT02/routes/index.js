const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense'); // your mongoose model

router.get('/', async (req, res) => {
  try {
    // 1. All expenses to calculate totals
    const allExpenses = await Expense.find({}).lean();

    // Total expenses
    const totalExpenses = allExpenses.reduce((sum, e) => sum + (e.amount || 0), 0);

    // 2. This month’s expenses
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1); // 1st day this month
    
    const monthlyData = await Expense.find({ date: { $gte: startOfMonth } }).lean();
    const monthlyExpenses = monthlyData.reduce((sum, e) => sum + (e.amount || 0), 0);

    // Count of categories
    const categoriesCount = new Set(allExpenses.map(e => e.category)).size;

    // Recent 5 expenses / DESC
    const recentExpenses = (await Expense.find({})
      .sort({ date: -1 })
      .limit(5)
      .lean())
      .map(e => ({
        ...e,
        // Format date in "DD Mon YYYY" 
        date: new Date(e.date).toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        })
      }));

    // Send data to Handlebars
    res.render('index', {
      title: 'Dashboard',
      totalExpenses: totalExpenses.toFixed(2),
      monthlyExpenses: monthlyExpenses.toFixed(2),
      categoriesCount,
      recentExpenses
    });

  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading dashboard');
  }
});

module.exports = router;
