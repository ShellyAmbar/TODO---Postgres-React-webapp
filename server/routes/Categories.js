const autenticate = require("../middlewares/authenticate");
const CategoryController = require("../controllers/Category");
//get categories
app.get("/", autenticate, CategoryController.getCategories);
//delete category
app.delete("/:id", autenticate, CategoryController.deleteCategory);
//add category
app.post("/:userId", autenticate, CategoryController.addCategory);
