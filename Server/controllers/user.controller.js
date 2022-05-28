const Problem = require("../models/problem.model");
const Score = require("../models/score.model");
const User = require("../models/user.model");

const validation = require("../utility/validation");
const randomizeArray = require("../utility/randomize-array-algorithm");

const getTestProblems = async(req, res, next) => {
    try {
        const testProblems = await Problem.find({}, { key: 0 });

        const readingProblem = testProblems.filter((problem) => {
            return problem.type === "reading";
        });
        const listeningProblem = testProblems.filter((problem) => {
            return problem.type === "listening";
        });
        const structureProblem = testProblems.filter((problem) => {
            return problem.type === "structure";
        });

        res.json({
            message: "All test problems delivered successfully",
            problems: {
                reading: randomizeArray(readingProblem),
                listening: randomizeArray(listeningProblem),
                structure: randomizeArray(structureProblem),
            },
        });
    } catch (error) {
        return next(error);
    }
};

const updateUserData = async(req, res, next) => {
    const nim = req.user.nim;
    let kpm = "";
    if (req.file !== undefined) {
        kpm = req.file.filename;
    }

    const { error } = validation.updateUserValidation(req.body);
    if (error) return next(error.details[0]);

    try {
        await User.findOneAndUpdate({ nim }, {
            $set: {
                ...req.body,
                kpm,
            },
        });
        res.json({ message: "User data updated successfully" });
    } catch (error) {
        return next(error);
    }
};

const getUserData = async(req, res, next) => {
    const nim = req.user.nim;
    try {
        const user = await User.findOne({ nim }, { password: 0 });
        res.json({ message: "User data delivered successfully", user: user });
    } catch (error) {
        return next(error);
    }
};

const getUserScore = async(req, res, next) => {
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