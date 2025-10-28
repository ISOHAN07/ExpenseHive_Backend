const express = require("express");
const router = express.Router();
const expenseController = require("../expenses/expenses.controller");

router.post("/", expenseController.createExpense);
router.get("/", expenseController.getAllExpenses);
router.get("/:expenseId", expenseController.getExpenseById);
router.put("/:expenseId", expenseController.updateExpense);
router.delete("/:expenseId", expenseController.deleteExpense);

module.exports = router;
