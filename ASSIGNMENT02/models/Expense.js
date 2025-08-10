
// Import mongoose, then destructure Schema and model
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

//  data schema object
const expenseSchema = Schema({
    date: { type: Date, required: true },
    category: { type: String, required: true }, 
    description: { type: String, required: true },
    amount: { type: Number, required: true, min: 0 },
  
});

// Create and export the model
module.exports = model("Expense", expenseSchema);
