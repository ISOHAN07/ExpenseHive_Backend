const Expense = require("../models/expenses.mongo");
const Category = require("../models/category.mongo");

async function updateCategorySpent(categoryId, userId) {
  if (!categoryId || !userId) return;

  const total = await Expense.aggregate([
    { $match: { expenseCategory: categoryId, userId } },
    { $group: { _id: null, totalSpent: { $sum: "$expenseAmount" } } },
  ]);

  const spent = total.length > 0 ? total[0].totalSpent : 0;
  await Category.findOneAndUpdate(
    { _id: categoryId, createdBy: userId },
    { spent },
    { new: true }
  );
}

module.exports = updateCategorySpent;
