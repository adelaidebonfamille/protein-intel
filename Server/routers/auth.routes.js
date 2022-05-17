const router = require("express").Router();
const authController = require("../controllers/auth.controller");

const fileUploadMiddleware = require("../middlewares/file-upload");

router.post(
	"/register",
	fileUploadMiddleware.kpmUpload,
	authController.register
);

router.post("/login", authController.login);

module.exports = router;
