var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var expenseRoutes = require('./routes/expenses');

var configs = require("./configs/globals");
var mongoose=require("mongoose");
const { config } = require('process');


// import passort and session modules
var session = require("express-session");
var passport = require("passport");
// Import User model so we can configure passport with the plm functionality
var User = require("./models/user"); // ./ means root directory

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
 //Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// initialize session middleware
app.use(session({
  secret: "ProjectTrackerSecret123",
  resave: false,
  saveUninitialized: false,
}));

//initialize passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Initialize Basic Authentication Strategy
passport.use(User.createStrategy()); // Out-of-the-box strategy from passport-local-mongoose
// Configure serialization and deserialization of user instances to support persistent login sessions (read/write to session)
passport.serializeUser(User.serializeUser()); // Serialize user instance to session
passport.deserializeUser(User.deserializeUser()); // Deserialize user instance from session


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/projects', expenseRoutes);
app.use('/expenses', expenseRoutes);

mongoose.connect(configs.ConnectionStrings.MongoDB)
  .then(() => console.log("Successfully connected"))
  .catch((err) => console.log("Connection error:", err));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
