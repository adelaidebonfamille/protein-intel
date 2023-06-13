const router = require("express").Router();
const adminController = require("../controllers/admin.controller");
const fileUploadMiddleware = require("../middlewares/file-upload");

router.get("/problems", adminController.getAllProblems);

router.post("/problems", adminController.createProblem);

router.delete("/problems/:id", adminController.deleteProblem);

router.patch("/problems/:id", adminController.updateProblem);

router.get("/scores", adminController.getAllScore);

router.get("/batch", adminController.getAllBatch);

router.post("/batch", adminController.createBatch);

router.delete("/batch/:id", adminController.deleteBatch);

router.patch("/batch/:id", adminController.updateBatch);

router.get("/scores", adminController.getAllScore);

router.post("/reset-password", adminController.resetPassword);

module.exports = router;
