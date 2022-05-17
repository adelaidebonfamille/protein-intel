const router = require("express").Router();
const testController = require("../controllers/test.controller");

router.post("/", testController.startTest);

router.patch("/", testController.saveTest);

module.exports = router;
