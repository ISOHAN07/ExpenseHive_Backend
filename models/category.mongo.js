const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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
    budget: {
      type: Number,
      required: true,
    }
  },
  { timestamps: true }
);

categorySchema.index({ createdBy: 1, name: 1 }, { unique: true });

module.exports = mongoose.model("Category", categorySchema);  