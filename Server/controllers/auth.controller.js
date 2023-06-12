const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

const validation = require("../utility/validation");

const generateToken = require("../utility/generate-token");
const resetPassword = require("../utility/generate-reset-password-link");
const emailSender = require("../utility/node-mailer");

const User = require("../models/user.model");

const userRegister = async (req, res, next) => {
  let { university, nim, password, confirmPassword, name, email } = req.body;
  email = email.toLowerCase().trim();

  //check if password and confirmPassword are the same
  if (password !== confirmPassword) {
    return next(new Error("Password and Confirm Password are not the same"));
  }

  const { error } = validation.registerValidation({
    nim,
    password,
    name,
    email,
    university,
  });
  if (error) return next(error.details[0]);

  if (!/^\d{5,20}$/.test(nim)) {
    return next(new Error("Each character in NIM must be a number"));
  }

  let existingUserByNim;
  try {
    existingUserByNim = await User.findOne({ nim });
  } catch (error) {
    return next(error);
  }
  if (existingUserByNim) return next(new Error("Nim is already taken"));

  let existingUserByEmail;
  try {
    existingUserByEmail = await User.findOne({ email });
  } catch (error) {
    return next(error);
  }
  if (existingUserByEmail) return next(new Error("Email already exists"));

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    nim,
    password: hashedPassword,
    name,
    email,
    university,
  });

  try {
    await user.save();
  } catch (err) {
    return next(err);
  }

  //send email
  const token = generateToken({
    nim: user.nim,
    name: user.name,
    role: "user",
  });

  const link = `${process.env.FRONTEND_URL}/verify?token=${token}`;

  const mailOptions = {
    to: user.email,
    subject: "Verify your email",
    html: `<h1>Verify your email</h1>
    <p>Click the link below to verify your email</p>
    <a href="${link}">${link}</a>`,
  };

  try {
    await emailSender(mailOptions);
  } catch (error) {
    return next(error);
  }

  res.json({
    message: "User registered successfully, please verify your email",
  });
};

const userLogin = async (req, res, next) => {
  let { email, password } = req.body;
  email = email.toLowerCase();

  const { error } = validation.loginValidation({
    email,
    password,
  });
  if (error) return next(error.details[0]);

  let user;
  try {
    user = await User.findOne({ email });
  } catch (err) {
    return next(err);
  }
  if (!user) return next(new Error("User not found"));

  if (!user.isVerified) return next(new Error("User is not verified"));

  let isMatch;
  try {
    isMatch = await bcrypt.compare(password, user.password);
  } catch (error) {
    return next(error);
  }
  if (!isMatch) return next(new Error("Password is incorrect"));

  const token = generateToken({
    nim: user.nim,
    name: user.name,
    role: "user",
  });

  res.json({
    message: "User logged in successfully",
    token,
  });
};

const adminLogin = (req, res, next) => {
  const { username, password } = req.body;
  dotenv.config();

  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return next(new Error("Username or Password is incorrect"));
  }

  const token = generateToken({
    role: "admin",
  });

  res.json({
    message: "Admin Successfully Logged In",
    token,
  });
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  let user;
  try {
    user = await User.findOne({ email });
  } catch (err) {
    return next(err);
  }
  if (!user) return next(new Error("User not found"));

  const resetPasswordToken = resetPassword.generateLink(
    { email: user.email, password: user.password },
    `${process.env.JWT_SECRET}${user.password}`
  );
  const resetPasswordLink = `${process.env.FRONTEND_URL}/reset-password?id=${user._id}&token=${resetPasswordToken}`;

  try {
    emailSender({
      to: user.email,
      subject: "Reset Password",
      html: `<p>Click <a href="${resetPasswordLink}">here</a> to reset your password</p>`,
      text: `Click here to reset your password: ${resetPasswordLink}`,
    });
  } catch (error) {
    return next(error);
  }

  res.json({ message: "Reset Password Link has been sent to your email" });
};

const resetUserPassword = async (req, res, next) => {
  const { password, confirmPassword } = req.body;
  const { id, token } = req.query;

  const { error } = validation.passwordChangeValidation({
    password,
    confirmPassword,
  });
  if (error) return next(error.details[0]);

  let user;
  try {
    user = await User.findById(id);
  } catch (err) {
    return next(err);
  }
  if (!user) return next(new Error("User not found"));

  let isVerified;
  try {
    isVerified = resetPassword.verifyLink(
      token,
      `${process.env.JWT_SECRET}${user.password}`
    );
  } catch (err) {
    return next(err);
  }
  if (!isVerified) return next(new Error("Link is invalid"));

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  user.password = hashedPassword;

  try {
    await user.save();
    res.json({ message: "Password changed successfully" });
  } catch (err) {
    return next(err);
  }
};

const verifyUser = async (req, res, next) => {
  const { token } = req.query;

  let isVerified;
  try {
    isVerified = resetPassword.verifyLink(token, `${process.env.JWT_SECRET}`);
  } catch (err) {
    return next(err);
  }
  if (!isVerified) return next(new Error("Link is invalid"));

  res.json({ message: "User verified successfully" });
};

module.exports = {
  register: userRegister,
  login: userLogin,
  admin: adminLogin,
  forgotPassword,
  resetPassword: resetUserPassword,
  verify: verifyUser,
};
