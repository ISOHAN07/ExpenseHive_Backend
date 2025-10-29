const express = require("express");
const cors = require("cors");
const morgan = require("morgan")
const expenseRoutes = require("../routes/expenses/expenses.router");
const categoryRoutes = require("../routes/category/category.router")
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://expense-hive.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // optional: only needed if you send cookies or auth headers
  })
);

app.use(morgan("combined"));

app.use(express.json());
app.use("/expenses", expenseRoutes);
app.use("/categories", categoryRoutes);

module.exports = app;
