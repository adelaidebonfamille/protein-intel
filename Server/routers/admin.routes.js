const router = require("express").Router();
const adminController = require("../controllers/admin.controller");
const fileUploadMiddleware = require("../middlewares/file-upload");

router.get("/problems", adminController.getAllProblems);

router.post(
	"/problems",
	fileUploadMiddleware.problemUpload,
	adminController.createProblem
);

router.delete("/problems/:id", adminController.deleteProblem);

router.patch("/problems/:id", adminController.updateProblem);

module.exports = router;
