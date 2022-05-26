const Problem = require("../models/problem.model");
const Test = require("../models/test.model");
const Score = require("../models/score.model");
const Batch = require("../models/batch.model");
const User = require("../models/user.model");

const calculateScore = require("../utility/calculate-score");

const startTest = async(req, res, next) => {
    const { nim } = req.user;
    const { batchId } = req.body;

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
    const readingAnswersFilled = readingAnswers.map((problem) => {
        return { problemId: problem._id, answer: "" };
    });
    const listeningAnswersFilled = listeningAnswers.map((problem) => {
        return { problemId: problem._id, answer: "" };
    });
    const structureAnswersFilled = structureAnswers.map((problem) => {
        return { problemId: problem._id, answer: "" };
    });

    const testAnswers = {
        reading: readingAnswersFilled,
        listening: listeningAnswersFilled,
        structure: structureAnswersFilled,
    };

    const testTime = [{
            testGroup: "reading",
            time: 60,
        },
        {
            testGroup: "listening",
            time: 60,
        },
        {
            testGroup: "structure",
            time: 45,
        },
    ];

    try {
        const test = new Test({
            nim,
            answers: testAnswers,
            testTime,
            batchId,
        });
        await test.save();
    } catch (error) {
        return next(error);
    }
};

const saveTestAnswer = async(req, res, next) => {};

const findTestByNim = async(req, res, next) => {};

const endTestAndCalculateScore = async(req, res, next) => {};

module.exports = {
    startTest: startTest,
    saveTest: saveTestAnswer,
    findTest: findTestByNim,
    endTest: endTestAndCalculateScore,
};