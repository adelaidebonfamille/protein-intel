const Joi = require("joi");

//register validation
const registerValidation = (data) => {
	const schema = Joi.object({
		nim: Joi.string().required(),
		password: Joi.string().required(),
		name: Joi.string().required(),
	});

	return schema.validate(data);
};

//login validation
const loginValidation = (data) => {
	const schema = Joi.object({
		nim: Joi.string().required(),
		password: Joi.string().required(),
	});

	return schema.validate(data);
};

const addProblemValidation = (data) => {
	const schema = Joi.object({
		description: Joi.string().required(),
		key: Joi.string().required(),
		type: Joi.string().required(),
	});
	return schema.validate(data);
};

const updateUserValidation = (data) => {
	const schema = Joi.object({
		faculty: Joi.string().required(),
		major: Joi.string().required(),
		entryYear: Joi.number().required(),
		phone: Joi.string().required(),
	});
	return schema.validate(data);
};

module.exports = {
	registerValidation,
	loginValidation,
	addProblemValidation,
	updateUserValidation,
};
