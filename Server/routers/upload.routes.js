const router = require("express").Router();
const uploadController = require("../controllers/upload.controller");

router.post("/kpm", uploadController.kpmUpload);

router.post("/problem", uploadController.problemUpload);

module.exports = router;
