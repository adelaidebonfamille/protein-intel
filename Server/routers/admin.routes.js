const router = require("express").Router();
const adminController = require("../controllers/admin.controller");
const fileUploadMiddleware = require("../middlewares/file-upload");

router.post(
	"/problems",
	fileUploadMiddleware.problemUpload,
	adminController.createProblem
);

module.exports = router;
