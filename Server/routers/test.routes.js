const router = require("express").Router();
const testController = require("../controllers/test.controller");

router.post("/", testController.startTest);

module.exports = router;
