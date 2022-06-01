const Problem = require("../models/problem.model");
const Score = require("../models/score.model");
const User = require("../models/user.model");

const validation = require("../utility/validation");
const randomizeArray = require("../utility/randomize-array-algorithm");

const getTestProblems = async (req, res, next) => {
	const { nim } = req.user;
	const { testGroup } = req.body;

	let user;
	try {
		user = await User.findOne({ nim });
	} catch (error) {
		return next(error);
	}
	if (!user) return next(new Error("User not found"));

	if (!user.testTime[testGroup]) return next(new Error("Test not started"));

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

const updateUserData = async (req, res, next) => {
	const nim = req.user.nim;
	let kpm = "";
	if (req.file !== undefined) {
		kpm = req.file.filename;
	}

	const { error } = validation.updateUserValidation(req.body);
	if (error) return next(error.details[0]);

	try {
		await User.findOneAndUpdate(
			{ nim },
			{
				$set: {
					...req.body,
					kpm,
				},
			}
		);
		res.json({ message: "User data updated successfully" });
	} catch (error) {
		return next(error);
	}
};

const getUserData = async (req, res, next) => {
	const nim = req.user.nim;
	try {
		const user = await User.findOne({ nim }, { password: 0 });
		res.json({ message: "User data delivered successfully", user: user });
	} catch (error) {
		return next(error);
	}
};

const getUserScore = async (req, res, next) => {
	const nim = req.user.nim;
	try {
		const userScore = await Score.findOne({ nim });
		res.json({
			message: "User score delivered successfully",
			userScore: userScore,
		});
	} catch (error) {
		return next(error);
	}
};

module.exports = {
	getTestProblems,
	updateUserData,
	getUserScore,
	getUserData,
};
