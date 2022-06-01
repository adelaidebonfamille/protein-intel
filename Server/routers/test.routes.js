const router = require("express").Router();
const testController = require("../controllers/test.controller");

router.post("/", testController.startTest);

router.patch("/", testController.saveTest);

router.get("/", testController.findTest);

router.get("/batch", testController.getAllActiveBatch);

router.post("/end", testController.endTest);

router.post("/subtest", testController.startSubTest);

router.patch("/subtest", testController.continueSubTest);

router.post("/subtest/end", testController.endSubTest);

router.get("/problems/:testGroup", testController.getTestProblems);

module.exports = router;
