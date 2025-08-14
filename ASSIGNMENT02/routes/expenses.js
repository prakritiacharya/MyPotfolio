// routes/expenses.js
const express = require("express");
const router = express.Router();
// Import mongoose model to be used
const Expense = require("../models/Expense");
const isAuthenticated = require("../Authentication/authenticate");

// GET /expenses/
// List all expenses sorted by date (most recent first)
router.get("/", async (req, res, next) => {
  try {
    let expenses = await Expense.find().sort([["date", "descending"]]);
    res.render("projects/expenses", {
      title: "Expense Tracker",
      dataset: expenses,
      user: req.user,
    });
  } catch (err) {
    next(err);
  }
});

// GET /expenses/add
router.get("/add",isAuthenticated , (req, res, next) => {
  res.render("projects/add", { 
    title: "Add a New Expense", 
    user: req.user,
   });
});

// POST /expenses/add
router.post("/add",isAuthenticated , async (req, res, next) => {
  try {
    let newExpense = new Expense({
      date: req.body.date,
      category: req.body.category,
      description: req.body.description,
      amount: req.body.amount,
    });
    await newExpense.save();
    res.redirect("/expenses");
  } catch (err) {
    next(err);
  }
});

// GET /expenses/delete/:_id
router.get("/delete/:_id",isAuthenticated , async (req, res, next) => {
  try {
    let expenseId = req.params._id;
    await Expense.findByIdAndDelete(expenseId);
    res.redirect("/expenses");
  } catch (err) {
    next(err);
  }
});

// GET /expenses/edit/:_id
router.get("/edit/:_id",isAuthenticated , async (req, res, next) => {
  try {
    let expenseId = req.params._id;
    let expenseData = await Expense.findById(expenseId);
    res.render("projects/edit", {
      title: "Edit Expense",
      expense: expenseData,
      user: req.user,
    });
  } catch (err) {
    next(err);
  }
});

// POST /expenses/edit/:_id
router.post("/edit/:_id",isAuthenticated , async (req, res, next) => {
  try {
    let expenseId = req.params._id;
    await Expense.findByIdAndUpdate(expenseId,
      {
        date: req.body.date,
        category: req.body.category,
        description: req.body.description,
        amount: req.body.amount
      }
    );
    res.redirect("/expenses");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
