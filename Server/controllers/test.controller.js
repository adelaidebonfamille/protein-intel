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
			isTestOver: false,
		});
		await test.save();
		res.json({ message: "Test started successfully", userTest: test });
	} catch (error) {
		return next(error);
	}
};

module.exports = {
	startTest: startTest,
};
