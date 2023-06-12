const router = require("express").Router();
const authController = require("../controllers/auth.controller");

router.post("/register", authController.register);

router.post("/login", authController.login);

router.post("/admin", authController.admin);

router.post("/forgot-password", authController.forgotPassword);

router.post("/reset-password", authController.resetPassword);

router.post("/verify", authController.verify);

module.exports = router;
