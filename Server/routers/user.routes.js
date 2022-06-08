const router = require("express").Router();
const userController = require("../controllers/user.controller");

const fileUploadMiddleware = require("../middlewares/file-upload");

router.get("/profile", userController.getUserData);

router.patch(
	"/profile",
	fileUploadMiddleware.kpmUpload,
	userController.updateUserData
);

router.get("/score", userController.getUserScore);

router.patch("/password", userController.changePassword);

module.exports = router;
