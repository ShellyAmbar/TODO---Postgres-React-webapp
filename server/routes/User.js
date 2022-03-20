const express = require("express");
const router = express.Router();
const UserController = require("../controllers/User");
const authentication = require("../middlewares/authenticate");

router.delete("/", authentication, UserController.removeUser);
module.exports = router;
