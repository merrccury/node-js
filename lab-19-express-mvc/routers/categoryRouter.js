const express = require("express");

const {
    getAllCategories,
    addCategory,
    updateCategory,
    deleteCategory
} = require("../controller/categoryController")

let router = express.Router();

router.get("/", getAllCategories);
router.post("/", addCategory);
router.put("/", updateCategory);
router.delete("/", deleteCategory);

module.exports = router;