const Problem = require("../models/problem.model");
const Score = require("../models/score.model");
const User = require("../models/user.model");

const bcrypt = require("bcrypt");

const validation = require("../utility/validation");

const updateUserData = async (req, res, next) => {
  const { university, faculty, major, entryYear, phone } = req.body;
  const nim = req.user.nim;
  let kpm = "";
  if (req.file !== undefined) {
    kpm = req.file.filename;
  }

  validation.updateUserValidation({
    university,
    faculty,
    major,
    entryYear,
    phone,
    kpm,
  });

  try {
    await User.findOneAndUpdate(
      { nim },
      {
        $set: {
          university,
          faculty,
          major,
          entryYear,
          phone,

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
    if (!userScore) return next(new Error("User score not found"));

    res.json({
      message: "User score delivered successfully",
      userScore: userScore,
    });
  } catch (error) {
    return next(error);
  }
};

const changeUserPassword = async (req, res, next) => {
  const { oldPassword, newPassword, newConfirmPassword } = req.body;
  const { nim } = req.user;

  let user;
  try {
    user = await User.findOne({ nim });
  } catch (error) {
    return next(error);
  }
  if (!user) return next(new Error("User not found"));

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) return next(new Error("Old password is incorrect"));

  const { error } = validation.passwordChangeValidation({
    confirmPassword: newConfirmPassword,
    password: newPassword,
  });
  if (error) return next(new Error(error.details[0].message));

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  try {
    await User.findOneAndUpdate(
      { nim },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );
    res.json({ message: "Password changed successfully" });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  updateUserData,
  getUserScore,
  getUserData,
  changePassword: changeUserPassword,
};
