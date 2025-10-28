const express = require("express");
const cors = require("cors");
const expenseRoutes = require("../routes/expenses/expenses.router")
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use("/expenses", expenseRoutes)

module.exports = app;