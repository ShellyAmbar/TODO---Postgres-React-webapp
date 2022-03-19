const autenticate = require("../middlewares/authenticate");
const CategoryController = require("../controllers/Category");
const express = require("express");
const router = express.Router();
//get categories
router.get("/", autenticate, CategoryController.getCategories);
//delete category
router.delete("/:id", autenticate, CategoryController.deleteCategory);
//add category
router.post("/:userId", autenticate, CategoryController.addCategory);
module.exports = router;
