const joi = require('@hapi/joi')

const mongoIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/)
const userNameSchema = joi.string().max(120)
// eslint-disable-next-line no-useless-escape
const userEmailSchema = joi.string().regex(/^[\w\._]{5,30}(\+[\w]{0,10})?@[\w\.\-]{3,}?\.\w{2,5}$/)
const userDirectionSchema = joi.string().max(300)
const userPasswordSchema = joi.string().regex(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,}$/)
const userPhoneSchema = joi.string().regex(/^\*?\d{2,3}[^\da-z]?\d{2,3}[^\da-z]?\d{2,3}{#pe}?\d*$/)

const userSchema = {
  name: userNameSchema.required(),
  phone: userPhoneSchema.required(),
  direction: userDirectionSchema.required(),
  email: userEmailSchema.required(),
  password: userPasswordSchema.required(),
  profileId: mongoIdSchema.required(),
  companyId: mongoIdSchema
};

module.exports = {
  mongoIdSchema,
  userSchema
};
