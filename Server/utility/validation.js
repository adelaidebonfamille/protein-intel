const Joi = require("joi");

//register validation
const registerValidation = (data) => {
  const schema = Joi.object({
    university: Joi.string(),
    nim: Joi.string().required(),
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
    choice: Joi.array().required().min(4).max(4),
  });
  return schema.validate(data);
};

const addBatchValidation = (data) => {
  const schema = Joi.object({
    batch: Joi.string().required(),
    isActive: Joi.boolean().required(),
  });
  return schema.validate(data);
};

const updateUserValidation = (data) => {
  const schema = Joi.object({
    faculty: Joi.string(),
    major: Joi.string(),
    entryYear: Joi.number(),
    phone: Joi.string(),
    kpm: Joi.string(),
  });
  return schema.validate(data);
};

const startTestValidation = (data) => {
  const schema = Joi.object({
    university: Joi.string().required(),
    faculty: Joi.string().required(),
    major: Joi.string().required(),
    entryYear: Joi.number().required(),
    phone: Joi.string().required(),
    kpm: Joi.string().required(),
  });
  return schema.validate(data);
};

const passwordChangeValidation = (data) => {
  const schema = Joi.object({
    password: Joi.string().required().min(6).max(255),
    confirmPassword: Joi.ref("password"),
  });
  return schema.validate(data);
};

module.exports = {
  registerValidation,
  loginValidation,
  addProblemValidation,
  updateUserValidation,
  addBatchValidation,
  passwordChangeValidation,
  startTestValidation,
};
