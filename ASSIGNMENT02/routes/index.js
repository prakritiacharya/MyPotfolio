const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense'); // your mongoose model
const Users = require("../models/user");
const isAuthenticated = require("../Authentication/authenticate");

const passport = require("passport");

router.get('/',isAuthenticated , async (req, res) => {
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
      recentExpenses,
      user: req.user
    });

  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading dashboard');
  }
});

// GET /login
router.get("/login", function (req, res, next) {
  if (req.user){
    res.redirect("/projects");
  }
  res.render("login", { 
    title: "Login",
    user: req.user,
   });

});

// POST /login
router.post("/login", passport.authenticate(
    "local", // strategy name
    {
      // options
      successRedirect: "/projects", // redirect to projects on success
      failureRedirect: "/login", // redirect to login on failure
      failureMessage: "Invalid Credentials", // message on failure stored in session object
    }
  )
);

// GET /register
router.get("/register", function (req, res, next) {
    if (req.user){
    res.redirect("/projects");
  }
  res.render("register", { 
    title: "Register",
    user: req.user,

   });
});

// POST /register
router.post("/register", function (req, res, next) {
  // Create a new user based on input from the form
  // Call the User model and pass three parameters: user data, password, and callback
  Users.register(
    new Users({ username: req.body.username }), // new user data
    req.body.password, // password from the form
    function (error, newUser) {
      if (error) {
        console.log(error);
        return res.redirect("/register");
      } else {
        // log user in and redirect to projects
        req.login(newUser, (err) => {
          res.redirect("/projects");
        });
      }
    }
  );
});
// GET /logout
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    res.redirect("/login");
  });
});

module.exports = router;
