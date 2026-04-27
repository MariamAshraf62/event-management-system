const express = require("express");
const { createCategory, getCategories } = require("../controllers/categoryController");
const { protect, restrictTo } = require("../middleware/auth");
const validateRequest = require("../middleware/validateRequest");
const { createCategoryValidation } = require("../validations/categoryValidation");

const router = express.Router();

router.get("/", getCategories);
router.post("/", protect, restrictTo("admin"), createCategoryValidation, validateRequest, createCategory);

module.exports = router;
