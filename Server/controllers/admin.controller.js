const Problem = require("../models/problem.model");
const Test = require("../models/test.model");
const Batch = require("../models/batch.model");
const validation = require("../utility/validation");
const moveDeletedFile = require("../utility/move-deleted-file");

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

	const problem = new Problem({
		description,
		key,
		associatedFile,
		type,
		choice,
	});

	try {
		await problem.save();
		res.json({ message: "Problem added successfully" });
	} catch (error) {
		return next(error);
	}
};

const deleteProblemById = async (req, res, next) => {
	const { id } = req.params;
	try {
		const existedProblem = await Problem.findByIdAndDelete(id);

		if (existedProblem.associatedFile) {
			try {
				moveDeletedFile(existedProblem.associatedFile);
			} catch (error) {
				return next(error);
			}
		}

		res.json({ message: "Problem deleted successfully" });
	} catch (error) {
		return next(error);
	}
};

const updateProblemById = async (req, res, next) => {
	const { id } = req.params;

	const existingProblem = await Problem.findById(id);
	if (!existingProblem) return next(new Error("Problem not found"));

	let file;
	if (req.file !== undefined) {
		file = `/problems/files/${req.file.filename}`;

		try {
			moveDeletedFile(existingProblem.associatedFile);
		} catch (error) {
			return next(error);
		}
	} else {
		file = existingProblem.associatedFile;
	}

	const { error } = validation.addProblemValidation(req.body);
	if (error) return next(error.details[0]);

	for (let c of req.body.choice) {
		if (c === "") {
			return next(
				new Error("Each choice must have at least one character")
			);
		}
	}

	if (
		req.body.type !== "listening" &&
		req.body.type !== "reading" &&
		req.body.type !== "structure"
	) {
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

const getAllBatch = async (req, res, next) => {
	try {
		const allBatch = await Batch.find({});
		res.json({
			message: "All batch delivered successfully",
			batch: allBatch,
		});
	} catch (error) {
		return next(error);
	}
};

const createBatch = async (req, res, next) => {
	const { batch } = req.body;
	const isActive = false;

	const { error } = validation.addBatchValidation({ batch, isActive });
	if (error) return next(error.details[0]);

	const newBatch = new Batch({
		batch,
		isActive,
	});

	try {
		await newBatch.save();
		res.json({ message: "Batch created successfully" });
	} catch (error) {
		return next(error);
	}
};

const updateBatchById = async (req, res, next) => {
	const { id } = req.params;

	const { error } = validation.addBatchValidation({ ...req.body });
	if (error) return next(error.details[0]);

	try {
		await Batch.findByIdAndUpdate(id, {
			$set: {
				...req.body,
			},
		});

		res.json({ message: "Batch updated successfully" });
	} catch (error) {
		return next(error);
	}
};

const deleteBatchById = async (req, res, next) => {
	const { id } = req.params;

	try {
		await Batch.findByIdAndDelete(id);
		res.json({ message: "Batch deleted successfully" });
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
	getAllBatch: getAllBatch,
	updateBatch: updateBatchById,
	createBatch: createBatch,
	deleteBatch: deleteBatchById,
};
