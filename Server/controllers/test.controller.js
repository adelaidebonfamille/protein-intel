const Problem = require("../models/problem.model");
const Test = require("../models/test.model");
const Score = require("../models/score.model");
const Batch = require("../models/batch.model");
const User = require("../models/user.model");

const validation = require("../utility/validation");

const toeflConversionTable = require("../utility/toefl-conversion-table");
const randomizeArrayAlgorithm = require("../utility/randomize-array-algorithm");

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

  const { error } = validation.startTestValidation({
    faculty: user.faculty,
    major: user.major,
    entryYear: user.entryYear,
    phone: user.phone,
    kpm: user.kpm,
  });

  if (error)
    return next(
      new Error("Please Complete Your Profile First Before Starting Exam")
    );

  let existingTest;
  try {
    existingTest = await Test.findOne({ nim });
  } catch (error) {
    return next(error);
  }
  if (existingTest)
    return next(
      new Error(
        "You have already started a test or you are already finished the test"
      )
    );

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
    reading: randomizeArrayAlgorithm(readingAnswersFilled, 50),
    listening: randomizeArrayAlgorithm(listeningAnswersFilled, 50),
    structure: randomizeArrayAlgorithm(structureAnswersFilled, 40),
  };

  const testTime = {
    reading: {
      time: 55, //minutes
      timeLeft: null,
      isOver: false,
    },
    listening: {
      time: 35, //minutes
      timeLeft: null,
      isOver: false,
    },
    structure: {
      time: 25, //minutes
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

  let isBatchActive;
  try {
    isBatchActive = await Batch.findById(test.batchId).isActive;
  } catch (error) {
    return next(error);
  }
  if (!isBatchActive) return endTestAndCalculateScore(req, res, next);

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

  let isBatchActive;
  try {
    isBatchActive = await Batch.findById(test.batchId).isActive;
  } catch (error) {
    return next(error);
  }
  if (!isBatchActive) return endTestAndCalculateScore(req, res, next);

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
    answers: test.answers[testGroup],
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
  test.testTime[testGroup].isOver = true;
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
    return next(new Error("Test type must be reading, listening or structure"));
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

  let isBatchActive;
  try {
    isBatchActive = await Batch.findById(test.batchId).isActive;
  } catch (error) {
    return next(error);
  }
  if (!isBatchActive) return endTestAndCalculateScore(req, res, next);

  let answerIndex = -1;
  for (let i = 0; i < test.answers[testType].length; i++) {
    if (
      test.answers[testType][i].problemId.toString() === testAnswers.problemId
    ) {
      answerIndex = i;
      break;
    }
  }
  if (answerIndex === -1) return next(new Error("Problem not found"));

  const insertedAnswer = {
    problemId: test.answers[testType][answerIndex].problemId,
    answer: testAnswers.answer,
  };

  test.answers[testType][answerIndex] = insertedAnswer;

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

  let test;
  try {
    test = await Test.findOne({ nim }, { answers: 0 });
  } catch (error) {
    return next(error);
  }

  if (!test) return next(new Error("Test not found"));

  const testGroups = ["reading", "listening", "structure"];

  testGroups.map((testGroup) => {
    if (
      !test.testTime[testGroup].isOver &&
      test.testTime[testGroup].timeLeft &&
      new Date(test.testTime[testGroup].timeLeft) < Date.now()
    ) {
      test.testTime[testGroup].isOver = true;
    }
  });

  if (testGroups.every((testGroup) => test.testTime[testGroup].isOver)) {
    test.isTestOver = true;
  }

  try {
    test = await Test.findOneAndUpdate(
      { nim },
      {
        testTime: test.testTime,
        isTestOver: test.isTestOver,
      },
      { new: true }
    );
  } catch (error) {
    return next(error);
  }

  res.json({ test, message: "Test found" });
};

const endTestAndCalculateScore = async (req, res, next) => {
  const { nim } = req.user;

  let test;
  try {
    test = await Test.findOne({ nim });
    if (!test) return next(new Error("Test not found"));
    await Test.findOneAndUpdate({ nim }, { isTestOver: true }, { new: true });
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

  for (const answerGroup of Object.keys(test.answers)) {
    test.answers[answerGroup].forEach((answerData) => {
      const userAnswer = answerData.answer;
      const problemId = answerData.problemId;
      const problem = Problems.find((problem) => {
        return problem._id.toString() === problemId.toString();
      });
      if (!problem) return next(new Error("Problem not found"));
      //
      const correctAnswer = problem.key;
      if (correctAnswer === userAnswer) {
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
      toeflConversionTable[userScore[answerGroup]][answerGroup];
  }
  totalScore = Math.round(
    ((answerGroupScore.reading +
      answerGroupScore.listening +
      answerGroupScore.structure) *
      10) /
      3
  );

  if (totalScore < 310) totalScore = 310;

  const score = new Score({
    nim,
    totalScore,
    ...userScore,
  });

  try {
    await score.save();
  } catch (error) {
    return next(error);
  }

  res.json({ message: "successfully ended test and calculated score" });
};

const getAllActiveBatch = async (req, res, next) => {
  try {
    const activeBatch = await Batch.find({ isActive: true }, { isActive: 0 });

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
    testProblems = await Promise.all(
      test.answers[testGroup].map(async (answer) => {
        const problem = await Problem.findOne(
          { _id: answer.problemId },
          { key: 0 }
        );
        return problem;
      })
    );
  } catch (error) {
    return next(error);
  }

  res.json({
    message: "All test problems delivered successfully",
    problems: testProblems,
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
