const Expense = require("../../models/expenses.mongo");

// New Expense
const createExpense = async (req, res, next) => {
  try {
    const {
      expenseId,
      expenseCategory,
      expenseDesc,
      expenseDate,
      expenseAmount,
      userId,
    } = req.body;

    if (
      !expenseId ||
      !expenseCategory ||
      !expenseDesc ||
      !expenseDate ||
      !expenseAmount ||
      !userId
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const expense = await Expense.create({
      expenseId,
      expenseCategory,
      expenseDesc,
      expenseDate,
      expenseAmount,
      userId,
    });
    res
      .status(201)
      .json({ message: "Expense created successfully", data: expense });
  } catch (err) {
    next(err);
  }
};

//get all expenses
const getAllExpenses = async (req, res, next) => {
  try {
    const { userId, category, from, to } = req.query;
    const filter = {};

    if (userId) filter.userId = Number(userId);
    if (category) filter.expenseCategory = category;
    if (from || to) {
      filter.expenseDate = {};
      if (from) filter.expenseDate.$gte = new Date(from);
      if (to) filter.expenseDate.$lte = new Date(to);
    }

    const expenses = await Expense.find(filter).sort({ expenseDate: -1 });

    res.status(200).json({ count: expenses.length, data: expenses });
  } catch (err) {
    next(err);
  }
};

// get single expense
const getExpenseById = async (req, res, next) => {
  try {
    const expense = await Expense.findOne({ expenseId: req.params.expenseId });

    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    res.status(200).json({ data: expense });
  } catch (err) {
    next(err);
  }
};

//update expense
const updateExpense = async (req, res, next) => {
  try {
    const updated = await Expense.findOneAndUpdate(
      { expenseId: req.params.expenseId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Expense not found" });
    }

    res
      .status(200)
      .json({ message: "Expense updated successfully", data: updated });
  } catch (err) {
    next(err);
  }
};

//delete Expense
const deleteExpense = async (req, res, next) => {
  try {
    const deleted = await Expense.findOneAndDelete({
      expenseId: req.params.expenseId,
    });

    if (!deleted) {
      return res.status(404).json({ error: "Expense not found" });
    }

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  deleteExpense,
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
};
