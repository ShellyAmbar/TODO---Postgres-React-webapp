const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/Auth");
const authentication = require("../middlewares/authenticate");

router.post("/register", AuthController.register);

router.post("/login", AuthController.login);

router.post("/refresh-token", AuthController.refreshToken);

router.post("/logout", (req, res) => {});

router.put("/changePassword", (req, res) => {});
module.exports = router;
