const autenticate = require("../middlewares/authenticate");
const CategoryController = require("../controllers/Category");
const express = require("express");
const router = express.Router();
//get categories
router.get("/:user_id", autenticate, CategoryController.getCategories);
//delete category
router.delete("/", autenticate, CategoryController.deleteCategory);
//add category
router.post("/", autenticate, CategoryController.addCategory);
module.exports = router;
