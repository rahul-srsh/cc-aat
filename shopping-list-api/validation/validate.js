const Joi = require("joi");

const itemSchema = Joi.object({
  name: Joi.string().required(),
  quantity: Joi.number().min(1).required(),
  category: Joi.string().alphanum().required(),
  id: Joi.string().alphanum(),
  categoryName: Joi.string().allow(""),
});

const userSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
});
const authSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
});

exports.itemSchema = itemSchema;
exports.userSchema = userSchema;
exports.authSchema = authSchema;
