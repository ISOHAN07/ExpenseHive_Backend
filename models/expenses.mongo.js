const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  expenseId: {
    type: Number,
    required: true,
    unique: true,
  },
  expenseCategory: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Category"
  },
  expenseDesc: {
    type: String,
    required: true,
  },
  expenseDate: {
    type: Date,
    required: true,
  },
  expenseAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  userId: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Expense", expenseSchema);
