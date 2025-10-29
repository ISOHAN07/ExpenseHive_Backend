const Expense = require("../../models/expenses.mongo");
const Category = require("../../models/category.mongo");
const updateCategorySpent = require("../../utils/updateCategorySpent");

const createExpense = async (req, res, next) => {
  try {
    const { expenseCategory, expenseDesc, expenseDate, expenseAmount } =
      req.body;
    const userId = req.user._id;

    if (!expenseCategory || !expenseDesc || !expenseDate || !expenseAmount) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const categoryExists = await Category.findById(expenseCategory);
    if (!categoryExists)
      return res
        .status(400)
        .json({ message: "Invalid category — does not exist" });

    const expense = await Expense.create({
      expenseId: Date.now(),
      expenseCategory,
      expenseDesc,
      expenseDate,
      expenseAmount,
      userId,
    });

    await updateCategorySpent(expense.expenseCategory, userId);

    const populated = await Expense.findById(expense._id).populate(
      "expenseCategory",
      "name color"
    );

    return res.status(201).json(populated);
  } catch (err) {
    next(err);
  }
};

const getAllExpenses = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { category, from, to } = req.query;
    const filter = { userId };

    if (category) filter.expenseCategory = category;
    if (from || to) {
      filter.expenseDate = {};
      if (from) filter.expenseDate.$gte = new Date(from);
      if (to) filter.expenseDate.$lte = new Date(to);
    }

    const expenses = await Expense.find(filter)
      .sort({ expenseDate: -1 })
      .populate("expenseCategory", "name color");

    res.status(200).json(expenses);
  } catch (err) {
    next(err);
  }
};

const updateExpense = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { expenseId } = req.params;

    const existingExpense = await Expense.findOne({ expenseId, userId });
    if (!existingExpense)
      return res.status(404).json({ error: "Expense not found" });

    const prevCategoryId = existingExpense.expenseCategory;
    const updated = await Expense.findOneAndUpdate(
      { expenseId, userId },
      req.body,
      { new: true, runValidators: true }
    ).populate("expenseCategory", "name color");

    await updateCategorySpent(prevCategoryId, userId);
    await updateCategorySpent(updated.expenseCategory, userId);

    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

const deleteExpense = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { expenseId } = req.params;

    const deleted = await Expense.findOneAndDelete({ expenseId, userId });
    if (!deleted) return res.status(404).json({ error: "Expense not found" });

    await updateCategorySpent(deleted.expenseCategory, userId);

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createExpense,
  getAllExpenses,
  updateExpense,
  deleteExpense,
};
