const Problem = require("../models/problem.model");
const Test = require("../models/test.model");

const startTest = async (req, res, next) => {
	const { nim } = req.user;

	let allProblems;
	try {
		allProblems = await Problem.find({});
	} catch (error) {
		return next(error);
	}

	const testAnswer = [];
	allProblems.forEach((problem) => {
		testAnswer.push({
			problemId: problem._id,
			answer: "X",
		});
	});

	//get time 2 hours and 30 minutes from now
	const time = new Date();
	time.setHours(time.getHours() + 2);
	time.setMinutes(time.getMinutes() + 30);

	try {
		const test = new Test({
			nim,
			testAnswer,
			testTime: time,
		});
		await test.save();
		res.json({ message: "Test started successfully", userTest: test });
	} catch (error) {
		return next(error);
	}
};

const saveTestAnswer = async (req, res, next) => {
	const { nim } = req.user;
	const { testAnswer } = req.body;

	let test;
	try {
		test = await Test.findOne({ nim });
	} catch (error) {
		return next(error);
	}

	if (!test) {
		return next(new Error("Test not found"));
	}

	if (test.testTime < new Date()) {
		test.isTestOver = true;
		return next(new Error("Test is over"));
	}

	if (test.isTestOver) {
		return next(new Error("Test is over"));
	}

	test.testAnswer = testAnswer;

	try {
		await test.save();
		res.json({ message: "Test answer saved successfully" });
	} catch (error) {
		return next(error);
	}
};

const findTestByNim = async (req, res, next) => {
	const { nim } = req.user;

	let test;
	try {
		test = await Test.findOne({ nim });
	} catch (error) {
		return next(error);
	}

	if (!test) {
		return next(new Error("Test not found"));
	}

	if (test.testTime < new Date()) {
		test.isTestOver = true;
		test.save();
		return next(new Error("Test is over"));
	}

	if (test.isTestOver) {
		return next(new Error("Test is over"));
	}

	res.json({ message: "Test found successfully", test });
};

module.exports = {
	startTest: startTest,
	saveTest: saveTestAnswer,
	findTest: findTestByNim,
};
