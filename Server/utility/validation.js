const Joi = require("joi");

//register validation
const registerValidation = (data) => {
    const schema = Joi.object({
        nim: Joi.string().required().min(14).max(14),
        password: Joi.string().required().min(6).max(255),
        name: Joi.string().required().min(3).max(255),
        email: Joi.string().required().min(6).max(255),
    });

    return schema.validate(data);
};

//login validation
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().min(6).max(255),
        password: Joi.string().required().min(6).max(255),
    });

    return schema.validate(data);
};

const addProblemValidation = (data) => {
    const schema = Joi.object({
        description: Joi.string().required(),
        key: Joi.string().required(),
        type: Joi.string().required(),
        choice: Joi.array().required()
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