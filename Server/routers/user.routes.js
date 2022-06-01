const router = require("express").Router();
const userController = require("../controllers/user.controller");

const fileUploadMiddleware = require("../middlewares/file-upload");

router.get("/profile", userController.getUserData);

router.patch(
	"/profile",
	fileUploadMiddleware.kpmUpload,
	userController.updateUserData
);

router.get("/scores", userController.getUserScore);

module.exports = router;
