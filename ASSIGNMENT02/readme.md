# My Expense Tracker Project

## Student: Prakriti Acharya  
**Course**: COMP 2068  
**Instructor**: Eduardo Jaime  
**Assignment**: Assignment 2 – ExpenseTracker  
**Due Date**: 08/13/2025


## Live Site  
[Prakriti Acharya Potfolio](https://expensetracker-y7yq.onrender.com/)

## Project Description
This project is a **Expense Tracker** built using **Node.js** and **Express**. The site consist of four pages i.e. home, expense, add expense, login and a register, with only two route object - index.js and expense.js. And, the layout.hbs is a file with shared header and footer. you can register and login to your account where you can add your expenses, edit and also delete it and keep track of it.

##  Cloud Deployment
Deployed on **Render** using automatic GitHub deployment.  
Site is publicly accessible and updates with every new commit.


## Scaffolding a Project Template Using the Express Generator Tool
* Create a new folder and open with VS Code
* Open the Terminal
* Install express generator tool globally (only need to do this once)
  * npm i -g express-generator
* Scaffold a new project template with the following command
  * express --view=hbs
* Restore project dependencies
  * npm i
* Run the application by opening the terminal and executing the following command - 
  * npm start
  * or
  * nodemon
* Examine the newly created folders and files
  * Views
  * Routes
  * Bin/www


## Connecting our Application to MongoDB
* Retrieve your connection string from MongoDB Cloud, keep in a notepad temporarily
* It's important to hide your connection string and make sure to never commit it to a repository in plain text, to do that we'll use a dotenv file
* Install dotenv package
  * npm i dotenv
  * Reference: https://www.npmjs.com/package/dotenv
  * Once installed create a new file named '.env'
  * In this file add the following key=value pair:
    * CONNECTION_STRING_MONGODB=PASTE YOUR CONNECTIONSTRING HERE
* Install mongoose package
  * npm i mongoose
  * Reference: https://www.npmjs.com/package/mongoose
* Create a new folder named configs
  * Inside of this folder, create a new file named globals.js
  * Initialize dotenv global variables by calling this method at the top of the document
    * require("dotenv").config();
  * Create a JSON object called configurations than will include key value pairs
  * Add a new section named ConnectionStrings
    * Add a new key named MongoDB and set value to process.env.CONNECTION_STRING_MONGODB
  * Export this object


## Implementing Passport
* Make sure project is not running and open a terminal
 * Install the following packages via npm
  * passport
  * passport-local
  * passport-local-mongoose
  * express-session
* In app.js
 * Since our controllers will use passport, all related declarations must be placed before the app = express() instruction
  * Import passport and express-session
  * Initialize and configure the session object by calling app.use and passing the session object as a method
   * Provide the following values: https://github.com/expressjs/session#readme
    * secret
    * resave
    * saveUninitialized
  * Configure passport before any custom router/controller declaration (app.use())
   * Call app.use and register:
    * passport.initialize()
    * passport.session();
