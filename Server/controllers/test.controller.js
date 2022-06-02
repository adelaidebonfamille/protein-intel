const Problem = require("../models/problem.model");
const Test = require("../models/test.model");
const Score = require("../models/score.model");
const Batch = require("../models/batch.model");
const User = require("../models/user.model");

const randomizeArray = require("../utility/randomize-array-algorithm");

const toeflConversionTable = require("../utility/toefl-conversion-table");

const startTest = async (req, res, next) => {
	const { nim } = req.user;
	const { batchId } = req.body;

	let user;
	try {
		user = await User.findOne({ nim });
	} catch (error) {
		return next(error);
	}
	if (!user) return next(new Error("User not found"));

	let existingTest;
	try {
		existingTest = await Test.findOne({ nim });
	} catch (error) {
		return next(error);
	}
	if (existingTest) return next(new Error("You have already started a test"));

	let batch;
	try {
		batch = await Batch.findById(batchId);
	} catch (error) {
		return next(error);
	}
	if (!batch) return next(new Error("Batch not found"));

	let problems;
	try {
		problems = await Problem.find();
	} catch (error) {
		return next(error);
	}
	if (!problems) return next(new Error("No Problems found"));

	//group answers by problem type
	const readingAnswers = problems.filter((problem) => {
		return problem.type === "reading";
	});
	const listeningAnswers = problems.filter((problem) => {
		return problem.type === "listening";
	});
	const structureAnswers = problems.filter((problem) => {
		return problem.type === "structure";
	});

	//fill in blank answers with empty strings
	const readingAnswersFilled = readingAnswers.map((problem) => ({
		problemId: problem._id,
		answer: "",
	}));
	const listeningAnswersFilled = listeningAnswers.map((problem) => ({
		problemId: problem._id,
		answer: "",
	}));
	const structureAnswersFilled = structureAnswers.map((problem) => ({
		problemId: problem._id,
		answer: "",
	}));

	const testAnswers = {
		reading: readingAnswersFilled,
		listening: listeningAnswersFilled,
		structure: structureAnswersFilled,
	};

	const testTime = {
		reading: {
			time: 60, //minutes
			timeLeft: null,
			isOver: false,
		},
		listening: {
			time: 60, //minutes
			timeLeft: null,
			isOver: false,
		},
		structure: {
			time: 45, //minutes
			timeLeft: null,
			isOver: false,
		},
	};

	const test = new Test({
		nim,
		answers: testAnswers,
		testTime,
		batchId,
	});

	try {
		await test.save();
	} catch (error) {
		return next(error);
	}

	res.json({
		test: {
			_id: test._id,
			nim,
			testTime,
			batchId,
		},
		message: "Test started",
	});
};

const startSubTest = async (req, res, next) => {
	const { nim } = req.user;
	const { testGroup } = req.body;

	//check test type
	const testTypes = ["reading", "listening", "structure"];
	if (!testTypes.includes(testGroup))
		return next(new Error("Invalid test type"));

	let test;
	try {
		test = await Test.findOne({ nim });
	} catch (error) {
		return next(error);
	}
	if (!test) return next(new Error("Test not found"));

	//check if test is over
	if (test.isTestOver) return next(new Error("Test is over"));

	//check if sub test is over
	if (test.testTime[testGroup].isOver)
		return next(new Error("Sub test is over"));
	if (test.testTime[testGroup].timeLeft !== null)
		return next(new Error("Sub test already started"));

	//start sub test
	test.testTime[testGroup].timeLeft = new Date(
		Date.now() + test.testTime[testGroup].time * 60 * 1000
	);

	try {
		await Test.findOneAndUpdate(
			{ nim },
			{ testTime: test.testTime },
			{ new: true }
		);
	} catch (error) {
		return next(error);
	}

	res.json({
		message: "Sub test started",
		subTest: test.answers[testGroup],
	});
};

const continueSubTest = async (req, res, next) => {
	const { nim } = req.user;
	const { testGroup } = req.body;

	//check test type
	const testTypes = ["reading", "listening", "structure"];
	if (!testTypes.includes(testGroup))
		return next(new Error("Invalid test type"));

	let test;
	try {
		test = await Test.findOne({ nim });
	} catch (error) {
		return next(error);
	}
	if (!test) return next(new Error("Test not found"));
	if (test.isTestOver) return next(new Error("Test is over"));

	//check if sub test alredy started
	if (test.testTime[testGroup].timeLeft === null) {
		return next(new Error("Sub test not started"));
	}

	//check if sub test is over
	if (test.testTime[testGroup].timeLeft < Date.now()) {
		test.testTime[testGroup].isOver = true;

		try {
			await Test.findOneAndUpdate(
				{ nim },
				{ testTime: test.testTime },
				{ new: true }
			);
		} catch (error) {
			return next(error);
		}
		return next(new Error("Sub test is over"));
	}
	if (test.testTime[testGroup].isOver)
		return next(new Error("Sub test is over"));
	if (test.testTime[testGroup].timeLeft === null)
		return next(new Error("Sub test not yet started"));

	res.json({
		message: "Sub test continued",
		subTest: test.answers[testGroup],
		time: test.testTime[testGroup].timeLeft,
	});
};

const endSubTest = async (req, res, next) => {
	const { nim } = req.user;
	const { testGroup, answers } = req.body;

	//check test type
	const testTypes = ["reading", "listening", "structure"];
	if (!testTypes.includes(testGroup))
		return next(new Error("Invalid test type"));

	let test;
	try {
		test = await Test.findOne({ nim });
	} catch (error) {
		return next(error);
	}
	if (!test) return next(new Error("Test not found"));
	if (test.isTestOver) return next(new Error("Test is over"));

	//check if sub test alredy started
	if (test.testTime[testGroup].timeLeft === null) {
		return next(new Error("Sub test not started"));
	}
	//check if sub test is over
	if (test.testTime[testGroup].timeLeft < Date.now()) {
		return next(new Error("Sub test is over"));
	}

	//end sub test
	test.testTime[testGroup].timeLeft = null;
	test.testTime[testGroup].time = null;
	test.answers[testGroup] = answers;

	try {
		await Test.findOneAndUpdate(
			{ nim },
			{ testTime: test.testTime, answers: test.answers },
			{ new: true }
		);
	} catch (error) {
		return next(error);
	}
	res.json({ message: "Sub test ended" });
};

const saveTestAnswer = async (req, res, next) => {
	const { nim } = req.user;
	const { testType, testAnswers } = req.body;

	//check test type
	if (
		testType !== "reading" &&
		testType !== "listening" &&
		testType !== "structure"
	) {
		return next(
			new Error("Test type must be reading, listening or structure")
		);
	}

	let test;
	try {
		test = await Test.findOne({ nim });
	} catch (error) {
		return next(error);
	}
	if (!test) return next(new Error("Test not found"));

	//check if test is over
	if (test.isTestOver) return next(new Error("Test is over"));
	if (test.testTime[testType].timeLeft < Date.now())
		return next(new Error("Test is over"));
	if (test.testTime[testType].isOver)
		return next(new Error("Sub test is over"));

	const answerIndex = test.answers[testType].filter((answer) => {
		return answer.problemId !== testAnswers.problemId;
	});
	const insertedAnswer = {
		problemId: testAnswers.problemId,
		answer: testAnswers.answer,
	};

	test.answers[testType] = [...answerIndex, insertedAnswer];

	try {
		await Test.findOneAndUpdate(
			{ nim },
			{ answers: test.answers },
			{ new: true }
		);
	} catch (error) {
		return next(error);
	}

	res.json({ message: "Test answer saved" });
};

const findTestByNim = async (req, res, next) => {
	const { nim } = req.user;
	try {
		const test = await Test.findOne({ nim }, { answers: 0 });
		if (!test) return next(new Error("Test not found"));

		["reading", "listening", "structure"].map((testGroup) => {
			if (new Date(test.testTime[testGroup].timeLeft) < Date.now()) {
				test.testTime[testGroup].isOver = true;
			}
		});

		res.json({ test, message: "Test found" });
	} catch (error) {
		return next(error);
	}
};

const endTestAndCalculateScore = async (req, res, next) => {
	const { nim } = req.user;

	let test;
	try {
		test = await Test.findOne({ nim });
		if (!test) return next(new Error("Test not found"));
		await Test.findOneAndUpdate(
			{ nim },
			{ isTestOver: true },
			{ new: true }
		);
	} catch (error) {
		return next(error);
	}

	let Problems;
	try {
		Problems = await Problem.find();
	} catch (error) {
		return next(error);
	}
	if (!Problems) return next(new Error("No Problems found"));

	let userScore = {
		reading: 0,
		listening: 0,
		structure: 0,
	};
	for (const answerGroup in test.answers) {
		answerGroup.forEach((answerData) => {
			const answer = answerData.answer;
			const problemId = answerData.problemId;
			const problem = Problems.find((problem) => {
				return problem._id.toString() === problemId.toString();
			});
			if (!problem) return next(new Error("Problem not found"));
			//
			const correctAnswer = problem.key;
			const userAnswer = answer;
			const isCorrect = correctAnswer === userAnswer;
			if (isCorrect) {
				userScore[answerGroup] += 1;
			}
		});
	}

	//calculate total score and answer group score
	let totalScore = 0;
	let answerGroupScore = {
		reading: 0,
		listening: 0,
		structure: 0,
	};
	for (const answerGroup in userScore) {
		answerGroupScore[answerGroup] =
			toeflConversionTable[answerGroup][userScore[answerGroup]];
	}
	totalScore =
		((answerGroupScore.reading +
			answerGroupScore.listening +
			answerGroupScore.structure) /
			3) *
		10;

	const score = new Score({
		nim,
		totalScore,
		...answerGroupScore,
	});

	try {
		await score.save();
	} catch (error) {
		return next(error);
	}
};

const getAllActiveBatch = async (req, res, next) => {
	try {
		const activeBatch = await Batch.find(
			{ isActive: true },
			{ isActive: 0 }
		);

		res.json({ activeBatch, message: "success getting active batch" });
	} catch (error) {
		return next(error);
	}
};

const getTestProblems = async (req, res, next) => {
	const { nim } = req.user;
	const { testGroup } = req.params;

	let test;
	try {
		test = await Test.findOne({ nim });
	} catch (error) {
		return next(error);
	}
	if (!test) return next(new Error("User not found"));

	if (!test.testTime[testGroup]) return next(new Error("Test not started"));

	let testProblems;
	try {
		testProblems = await Problem.find({ type: testGroup }, { key: 0 });
	} catch (error) {
		return next(error);
	}

	res.json({
		message: "All test problems delivered successfully",
		problems: randomizeArray(testProblems),
	});
};

module.exports = {
	startTest: startTest,
	saveTest: saveTestAnswer,
	findTest: findTestByNim,
	endTest: endTestAndCalculateScore,
	startSubTest: startSubTest,
	continueSubTest: continueSubTest,
	endSubTest: endSubTest,
	getAllActiveBatch: getAllActiveBatch,
	getTestProblems,
};
