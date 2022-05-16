const Joi = require("joi");

//register validation
const registerValidation = (data) => {
	const schema = {
		nim: Joi.number().required(),
		password: Joi.string().required(),
		name: Joi.string().required(),
		faculty: Joi.string().required(),
		major: Joi.string().required(),
		entryYear: Joi.number().required(),
		phone: Joi.string().required(),
	};

	return Joi.validate(data, schema);
};

module.exports = {
	registerValidation,
};
