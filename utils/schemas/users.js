const joi = require('@hapi/joi');

const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const userSchema = joi.object({
  name: joi.string().max(100).required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  birthdate: joi.date().required(),
});

module.exports = {
  userIdSchema,
  userSchema,
};
