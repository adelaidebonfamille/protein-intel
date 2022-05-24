const Problem = require("../models/problem.model");
const Test = require("../models/test.model");

const readAllProblems = async(req, res, next) => {
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

const addProblem = async(req, res, next) => {
    const { description, key, type } = req.body;
    const associatedFile = `/problems/files/${req.file.filename}`;

    const { error } = validation.addProblemValidation({
        description,
        key,
        type,
    });
    if (error) return next(error.details[0]);

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

const deleteProblemById = async(req, res, next) => {
    const { id } = req.params;
    try {
        await Problem.findByIdAndDelete(id);

        res.json({ message: "Problem deleted successfully" });
    } catch (error) {
        return next(error);
    }
};

const updateProblemById = async(req, res, next) => {
    const { id } = req.params;
    const { description, key, type } = req.body;
    const associatedFile = `/problems/files/${req.file.filename}`;

    const { error } = validation.addProblemValidation({
        description,
        key,
        type,
    });
    if (error) return next(error.details[0]);

    if (!associatedFile) {
        associatedFile = "";
    }

    if (type !== "listening" || type !== "reading" || type !== "structure") {
        return next(new Error("Type must be listening, reading or structure"));
    }

    try {
        await Problem.findByIdAndUpdate(id, {
            description,
            key,
            associatedFile,
            type,
        });

        res.json({ message: "Problem updated successfully" });
    } catch (error) {
        return next(error);
    }
};

const getAllUserScore = async(req, res, next) => {
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