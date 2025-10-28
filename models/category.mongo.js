const mongoose = require("mongoose");
const { type } = require("os");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    color: {
      type: String,
      default: "#1c69e3",
    },
    icon: {
      type: String,
    },
    createdBy: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);