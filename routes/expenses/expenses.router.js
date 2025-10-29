const express = require("express");
const {
  createExpense,
  getAllExpenses,
  updateExpense,
  deleteExpense,
} = require("../expenses/expenses.controller");
const { protect } = require("../../middlewares/auth.middleware");

const router = express.Router();

router.use(protect);

router.post("/", createExpense);
router.get("/", getAllExpenses);
router.put("/:expenseId", updateExpense);
router.delete("/:expenseId", deleteExpense);

module.exports = router;
