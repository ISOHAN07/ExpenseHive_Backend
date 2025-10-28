const express = require("express");
const cors = require("cors");
const expenseRoutes = require("../routes/expenses/expenses.router");
const categoryRoutes = require("../routes/category/category.router")
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use("/expenses", expenseRoutes);
app.use("/categories", categoryRoutes);

module.exports = app;
