const Problem = require("../models/problem.model");

const readAllProblems = async (req, res, next) => {
	try {
		const allProblems = await Problem.find({});
		res.json({
			message: "All problems delivered successfully",
			problems: allProblems,
		});
	} catch (error) {
		return next(error);
	}
};

const addProblem = async (req, res, next) => {
	const { description, key, type } = req.body;
	const associatedFile = `/problems/files/${req.file.filename}`;

	const { error } = validation.addProblemValidation({
		description,
		key,
		type,
	});
	if (error) return next(error.details[0].message);

	if (!associatedFile) {
		associatedFile = "";
	}

	if (type !== "listening" || type !== "reading" || type !== "structure") {
		return next(new Error("Type must be listening, reading or structure"));
	}

	try {
		const problem = new Problem({
			description,
			key,
			associatedFile,
			type,
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

module.exports = {
	createProblem: addProblem,
	getAllProblems: readAllProblems,
	deleteProblem: deleteProblemById,
};
