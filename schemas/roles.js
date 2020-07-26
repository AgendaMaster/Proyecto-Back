const joi = require('@hapi/joi')

const mongoIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/)
const roleNameSchema = joi.string().max(50)
const roleDescriptionSchema = joi.string().max(200)

const roleSchema = joi.object({
  name: roleNameSchema.required(),
  description: roleDescriptionSchema.required(),
});


// const createProfileSchema = Joi.object().keys({
//   username: Joi.string()
//     .required()
//     .empty()
//     .min(5)
//     .max(20)
//     .messages({
//       "string.base": `"username" should be a type of 'text'`,
//       "string.empty": `"username" cannot be an empty field`,
//       "string.min": `"username" should have a minimum length of {#limit}`,
//       "string.max": `"username" should have a maximum length of {#limit}`,
//       "any.required": `"username" is a required field`
//     })
// });

module.exports = {
  mongoIdSchema,
  roleSchema
};
