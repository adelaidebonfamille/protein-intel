const Problem = require("../models/problem.model");
const User = require("../models/user.model");
const Test = require("../models/test.model");
const Score = require("../models/score.model");
const Batch = require("../models/batch.model");
const validation = require("../utility/validation");
const moveDeletedFile = require("../utility/move-deleted-file");

const bcrypt = require("bcrypt");

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

  if (/<\/?(?!\/?(?:[bi]|sup|sub|br)\/?>).*\/?>/.test(description)) {
    return next(
      new Error("You cant put other html tag except b, i, sub, sup and br")
    );
  }

  for (let c of choice) {
    if (c === "") {
      return next(new Error("Each choice must have at least one character"));
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
    console.log(associatedFile);
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

  if (/<\/?(?!\/?(?:[bi]|sup|sub|br)\/?>).*\/?>/.test(req.body.description)) {
    return next(new Error("You cant put other html tag except b, i, and br"));
  }

  for (let c of req.body.choice) {
    if (c === "") {
      return next(new Error("Each choice must have at least one character"));
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
  let allUserScore;
  try {
    allUserScore = await Score.find();
  } catch (error) {
    return next(error);
  }
  if (!allUserScore) return next(new Error("No score found"));

  let allTest;
  try {
    allTest = await Test.find();
  } catch (error) {
    return next(error);
  }
  if (!allTest) return next(new Error("No test found"));

  let allUser;
  try {
    allUser = await User.find();
  } catch (error) {
    return next(error);
  }
  if (!allUser) return next(new Error("No user found"));

  let allBatch;
  try {
    allBatch = await Batch.find();
  } catch (error) {
    return next(error);
  }
  if (!allBatch) return next(new Error("No batch found"));

  // join user, test and score
  const scoreAndUserData = allUserScore.map((score) => {
    const user = allUser.find((user) => user.nim === score.nim);
    const test = allTest.find((test) => test.nim === score.nim);
    if (!test) {
      res.json({
        message: "No User have started test",
        allBatchScore: [],
      });
    }

    return {
      nim: score.nim,
      name: user.name,
      totalScore: score.totalScore,
      subTestScore: {
        reading: score.reading,
        listening: score.listening,
        structure: score.structure,
      },
      university: user.university,
      faculty: user.faculty,
      major: user.major,
      entryYear: user.entryYear,
      batchId: test.batchId,
    };
  });

  //join batch scoreAndUserData
  const batchScoreAndUserData = allBatch.map((batch) => {
    const batchScore = scoreAndUserData.filter(
      (score) => score.batchId === batch._id.toString()
    );
    return {
      batchId: batch._id,
      batchName: batch.batch,
      batchScore,
    };
  });

  res.json({
    message: "All user score delivered successfully",
    allBatchScore: batchScoreAndUserData,
  });
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

const resetUserPassword = async (req, res, next) => {
  const { email } = req.body;

  let user;
  try {
    user = await User.findOne({ email });
  } catch (error) {
    return next(error);
  }
  if (!user) return next(new Error("User not found"));

  const resettedPassword = "123456789";

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(resettedPassword, salt);

  try {
    await User.findByIdAndUpdate(user._id, {
      $set: {
        password: hashedPassword,
      },
    });
    res.json({ message: "Password resetted successfully" });
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
  resetPassword: resetUserPassword,
};
