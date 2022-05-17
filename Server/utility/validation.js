const Joi = require("joi");

//register validation
const registerValidation = (data) => {
	const schema = Joi.object({
		nim: Joi.number().required(),
		password: Joi.string().required(),
		name: Joi.string().required(),
		faculty: Joi.string().required(),
		major: Joi.string().required(),
		entryYear: Joi.number().required(),
		phone: Joi.string().required(),
	});

	return schema.validate(data);
};

//login validation
const loginValidation = (data) => {
	const schema = Joi.object({
		nim: Joi.number().required(),
		password: Joi.string().required(),
	});

	return schema.validate(data);
};

module.exports = {
	registerValidation,
	loginValidation,
};
