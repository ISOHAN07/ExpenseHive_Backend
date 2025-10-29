const mongoose = require("mongoose");
const Category = require("../../models/category.mongo");
const Expense = require("../../models/expenses.mongo");

function toObjectId(id) {
  try {
    return mongoose.Types.ObjectId(id);
  } catch {
    return null;
  }
}

const createCategory = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { name, description, color, icon, budget } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const existing = await Category.findOne({ name: name.trim(), createdBy: user._id });
    if (existing) {
      return res.status(409).json({ message: "Category with this name already exists" });
    }

    const category = await Category.create({
      name: name.trim(),
      description: description ?? "",
      color: color ?? undefined,
      icon: icon ?? undefined,
      budget: typeof budget === "number" ? budget : 0,
      createdBy: user._id,
    });

    return res.status(201).json(category);
  } catch (err) {
    next(err);
  }
};

const getAllCategories = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { name } = req.query;
    const filter = { createdBy: user._id };

    if (name) {
      filter.name = { $regex: String(name), $options: "i" };
    }

    const categories = await Category.find(filter).sort({ name: 1 });
    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const id = toObjectId(req.params.id);
    if (!id) return res.status(400).json({ message: "Invalid category id" });

    const category = await Category.findOne({ _id: id, createdBy: user._id });
    if (!category) return res.status(404).json({ message: "Category not found" });

    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const id = toObjectId(req.params.id);
    if (!id) return res.status(400).json({ message: "Invalid category id" });

    const allowed = ["name", "description", "color", "icon", "budget"];
    const updates = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }

    if (updates.name) {
      const existing = await Category.findOne({
        name: updates.name.trim(),
        createdBy: user._id,
        _id: { $ne: id },
      });
      if (existing) {
        return res.status(409).json({ message: "Category name already in use" });
      }
      updates.name = updates.name.trim();
    }

    const updated = await Category.findOneAndUpdate(
      { _id: id, createdBy: user._id },
      updates,
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: "Category not found" });

    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const id = toObjectId(req.params.id);
    if (!id) return res.status(400).json({ message: "Invalid category id" });

    const hasExpenses = await Expense.exists({ expenseCategory: id, userId: user._id });
    if (hasExpenses) {
      return res.status(400).json({ message: "Cannot delete category with existing expenses" });
    }

    const deleted = await Category.findOneAndDelete({ _id: id, createdBy: user._id });
    if (!deleted) return res.status(404).json({ message: "Category not found" });

    res.status(200).json({ message: "Category deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
