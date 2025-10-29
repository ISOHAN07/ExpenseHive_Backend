const Expense = require("../../models/expenses.mongo");
const Category = require("../../models/category.mongo");


const createExpense = async (req, res, next) => {
  try {
    const {
      expenseId,
      expenseCategory, // expecting category ID (_id)
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

    const categoryExists = await Category.findById(expenseCategory);
    if (!categoryExists) {
      return res.status(400).json({ message: "Invalid category — does not exist" });
    }

    const expense = await Expense.create({
      expenseId,
      expenseCategory,
      expenseDesc,
      expenseDate,
      expenseAmount,
      userId,
    });

    const populated = await Expense.findById(expense._id).populate("expenseCategory", "name color");

    return res.status(201).json(populated);
  } catch (err) {
    next(err);
  }
};

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

    const expenses = await Expense.find(filter)
      .sort({ expenseDate: -1 })
      .populate("expenseCategory", "name color");

    return res.status(200).json(expenses);
  } catch (err) {
    next(err);
  }
};

const getExpenseById = async (req, res, next) => {
  try {
    const expense = await Expense.findOne({ expenseId: req.params.expenseId }).populate(
      "expenseCategory",
      "name color"
    );

    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    return res.status(200).json(expense);
  } catch (err) {
    next(err);
  }
};

const updateExpense = async (req, res, next) => {
  try {
    const updated = await Expense.findOneAndUpdate(
      { expenseId: req.params.expenseId },
      req.body,
      { new: true, runValidators: true }
    ).populate("expenseCategory", "name color");

    if (!updated) {
      return res.status(404).json({ error: "Expense not found" });
    }

    return res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

const deleteExpense = async (req, res, next) => {
  try {
    const deleted = await Expense.findOneAndDelete({ expenseId: req.params.expenseId });

    if (!deleted) {
      return res.status(404).json({ error: "Expense not found" });
    }

    return res.status(200).json({ message: "Expense deleted successfully" });
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
