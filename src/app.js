const express = require("express");
const cors = require("cors");
const morgan = require("morgan")
const expenseRoutes = require("../routes/expenses/expenses.router");
const categoryRoutes = require("../routes/category/category.router")
const authRoutes = require("../routes/auth/auth.router")
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://expense-hive.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(morgan("combined"));
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/expenses", expenseRoutes);
app.use("/categories", categoryRoutes);


module.exports = app;
