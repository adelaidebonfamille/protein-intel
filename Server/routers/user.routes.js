const router = require("express").Router();
const userController = require("../controllers/user.controller");

const fileUploadMiddleware = require("../middlewares/file-upload");

router.get("/problems", userController.getTestProblems);

router.patch(
	"/profile",
	fileUploadMiddleware.kpmUpload,
	userController.updateUserData
);

module.exports = router;
