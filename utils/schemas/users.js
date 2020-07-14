const joi = require('@hapi/joi');

const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const userFirstNameSchema = joi.string().max(80);
const userLastNameSchema = joi.string().max(80);
const userEmailSchema = joi.string().regex(/^(http[s]?:\/\/)?([^\/\s]+\/)(.*)$/);
const userDescriptionSchema = joi.string().max(300);
const userPasswordSchema = joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})$/);
const userTagsSchema = joi.array().items(joi.string().max(50));

const createUserSchema = {
  firstName: userFirstNameSchema.required(),
  lastName: userLastNameSchema.required(),
  email: userEmailSchema.required(),
  description: userDescriptionSchema.required(),
  duration: userDurationSchema.required(),
  password: userPasswordSchema.required(),
  tags: userTagsSchema
};

const updateUserSchema = {
  firstName: userFirstNameSchema.required(),
  lastName: userLastNameSchema.required(),
  email: userEmailSchema.required(),
  description: userDescriptionSchema.required(),
  duration: userDurationSchema.required(),
  password: userPasswordSchema.required(),
  tags: userTagsSchema
};

module.exports = {
  userIdSchema,
  createUserSchema,
  updateUserSchema
};
