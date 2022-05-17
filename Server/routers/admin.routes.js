const router = require("express").Router();
const adminController = require("../controllers/admin.controller");

router.post("/problems", adminController.createProblem);

module.exports = router;
