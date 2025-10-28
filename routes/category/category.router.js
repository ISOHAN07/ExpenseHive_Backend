const express = require("express");
const router = express.Router();
const categoryController = require("../category/category.controller");

router.post("/", categoryController.createCategory);
router.get("/", categoryController.getAllCategories);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
