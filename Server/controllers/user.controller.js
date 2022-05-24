const Problem = require("../models/problem.model");
const Score = require("../models/score.model");
const User = require("../models/user.model");

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

        //randomize the order of the problems
        const readingProblemRandom = readingProblem
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
        const listeningProblemRandom = listeningProblem
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
        const structureProblemRandom = structureProblem
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);

        res.json({
            message: "All test problems delivered successfully",
            problems: {
                reading: readingProblemRandom,
                listening: listeningProblemRandom,
                structure: structureProblemRandom,
            },
        });
    } catch (error) {
        return next(error);
    }
};

const updateUserData = async(req, res, next) => {
    const nim = req.user.nim;
    const { data } = req.body;
    if (req.file.filename) {
        data.kpm = req.file.filename;
    }

    try {
        await User.findOne({ nim });
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