const bcrypt = require("bcrypt");

const validation = require("../utility/validation");

const User = require("../models/user.model");

const userRegister = async (req, res, next) => {
	const {
		nim,
		password,
		confirmPassword,
		name,
		faculty,
		major,
		entryYear,
		phone,
	} = req.body;

	//check if password and confirmPassword are the same
	if (password !== confirmPassword) {
		return next(
			new Error("Password and Confirm Password are not the same")
		);
	}

	const { error } = validation.registerValidation({
		nim,
		password,
		name,
		faculty,
		major,
		entryYear,
		phone,
	});
	if (error) return next(error.details[0].message);

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	const user = new User({
		nim,
		password: hashedPassword,
		name,
		faculty,
		major,
		entryYear,
		phone,
	});

	try {
		const savedUser = await user.save();
		res.json(savedUser);
	} catch (err) {
		return next(err);
	}
};

const userLogin = async (req, res, next) => {};

module.exports = {
	register: userRegister,
	login: userLogin,
};
