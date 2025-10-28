const Category = require("../../models/category.mongo");

exports.createCategory = async (req, res) => {
  try {
    const { name, description, color, icon } = req.body;

    const existing = await Category.findOne({ name });
    if (existing) return res.status(400).json({ message: "Category already exists" });

    const category = new Category({ name, description, color, icon });
    await category.save();

    res.status(201).json({ message: "Category created", category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  await Category.findByIdAndDelete(id);
  res.json({ message: "Category deleted" });
};
