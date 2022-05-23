const router = require("express").Router();
const authController = require("../controllers/auth.controller");

router.post("/register", authController.register);

router.post("/login", authController.login);

router.post("/admin", authController.admin);

module.exports = router;