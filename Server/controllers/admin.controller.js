const Problem = require("../models/problem.model");
const Test = require("../models/test.model");
const validation = require("../utility/validation");

const readAllProblems = async (req, res, next) => {
	try {
		const allProblems = await Problem.find();
		res.json({
			message: "All problems delivered successfully",
			problems: allProblems,
		});
	} catch (error) {
		return next(error);
	}
};

const addProblem = async (req, res, next) => {
	const { description, key, type, choice } = req.body;

	const associatedFile =
		req.file !== undefined ? `/problems/files/${req.file.filename}` : "";

	const { error } = validation.addProblemValidation({
		description,
		key,
		type,
		choice,
	});
	if (error) return next(error.details[0]);

	for (let c of choice) {
		if (c === "") {
			return next(
				new Error("Each choice must have at least one character")
			);
		}
	}

	if (type !== "listening" && type !== "reading" && type !== "structure") {
		return next(new Error("Type must be listening, reading or structure"));
	}

	try {
		const problem = new Problem({
			description,
			key,
			associatedFile,
			type,
			choice,
		});
		await problem.save();
		res.json({ message: "Problem added successfully" });
	} catch (error) {
		return next(error);
	}
};

const deleteProblemById = async (req, res, next) => {
	const { id } = req.params;
	try {
		await Problem.findByIdAndDelete(id);

		res.json({ message: "Problem deleted successfully" });
	} catch (error) {
		return next(error);
	}
};

const updateProblemById = async (req, res, next) => {
	const { id } = req.params;


	try {
		const existingProblem = await Problem.findById(id);
		if (!existingProblem) return next(new Error("Problem not found"));

	} catch (error) {
		return next(error);
	}

	const file = (req.file !== undefined)? `/problems/files/${req.file.filename}` : existingProblem.associatedFile;

	const { error } = validation.addProblemValidation(req.body);
	if (error) return next(error.details[0]);

	for (let c of req.body.choice) {
		if (c === "") {
			return next(
				new Error("Each choice must have at least one character")
			);
		}
	}

	if (req.body.type !== "listening" && req.body.type !== "reading" && req.body.type !== "structure") {
		return next(new Error("Type must be listening, reading or structure"));
	}

	try {
		await Problem.findByIdAndUpdate(id, {
			$set: {
				...req.body,
				associatedFile: file,
			},
		});

		res.json({ message: "Problem updated successfully" });
	} catch (error) {
		return next(error);
	}
};

const getAllUserScore = async (req, res, next) => {
	try {
		const allUserScore = await Test.find({});
		res.json({
			message: "All user score delivered successfully",
			userScore: allUserScore,
		});
	} catch (error) {
		return next(error);
	}
};

module.exports = {
	createProblem: addProblem,
	updateProblem: updateProblemById,
	getAllProblems: readAllProblems,
	deleteProblem: deleteProblemById,
	getAllScore: getAllUserScore,
};
