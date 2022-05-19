const Problem = require("../models/problem.model");
const Test = require("../models/test.model");
const Score = require("../models/score.model");

const calculateScore = require("../utility/calculate-score");

const startTest = async (req, res, next) => {
	const { nim } = req.user;

	const existingTest = await Test.findOne({ nim });
	if (existingTest) {
		return res.json({
			message: "Test have been started already",
			test: existingTest,
		});
	}

	let allProblems;
	try {
		allProblems = await Problem.find({}, { key: 0 });
	} catch (error) {
		return next(error);
	}

	const testAnswers = [];
	allProblems.forEach((problem) => {
		testAnswers.push({
			problemId: problem._id,
			answer: "",
		});
	});

	//get time 2 hours and 30 minutes from now
	const time = new Date();
	time.setHours(time.getHours() + 2);
	time.setMinutes(time.getMinutes() + 30);

	try {
		const test = new Test({
			nim,
			answers: testAnswers,
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
	const { testAnswers } = req.body;

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
		await test.save();
	}

	if (test.isTestOver) {
		try {
			const score = calculateScore(testAnswers);

			const newScore = new Score({
				nim,
				score,
			});

			await newScore.save();

			res.json({ message: "Test ended successfully", score });
		} catch (error) {
			return next(error);
		}
		return next(new Error("Test is over"));
	}

	test.answers = testAnswers;

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
	}

	if (test.isTestOver) {
		try {
			const score = calculateScore(test.answers);

			const newScore = new Score({
				nim,
				score,
			});

			await newScore.save();

			res.json({ message: "Test ended successfully", score });
		} catch (error) {
			return next(error);
		}
	}

	res.json({ message: "Test found successfully", test });
};

const endTestAndCalculateScore = async (req, res, next) => {
	const { nim } = req.user;

	let test;
	try {
		test = await Test.findOne({ nim });
	} catch (error) {
		return next(error);
	}

	test.isTestOver = true;

	try {
		await test.save();
		res.json({ message: "Test ended successfully" });
	} catch (error) {
		return next(error);
	}

	const score = calculateScore(test.answers);

	try {
		const newScore = new Score({
			nim,
			score,
		});
		await newScore.save();

		res.json({ message: "Score saved successfully", score });
	} catch (error) {
		return next(error);
	}
};

module.exports = {
	startTest: startTest,
	saveTest: saveTestAnswer,
	findTest: findTestByNim,
	endTest: endTestAndCalculateScore,
};
