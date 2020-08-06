const joi = require('@hapi/joi')

const mongoIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/)
const userNameSchema = joi.string().max(120)
// eslint-disable-next-line no-useless-escape
const userEmailSchema = joi.string().regex(/^[\w\._]{5,30}(\+[\w]{0,10})?@[\w\.\-]{3,}?\.\w{2,5}$/)
const userPasswordSchema = joi.string().regex(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,}$/)
const descriptionSchema = joi.string().max(300)
const isCompanySchema = joi.boolean()
const countrySchema = joi.number().integer()
const websiteSchema = joi.string().max(150)


const userSchema = joi.object({
  firstName: userNameSchema.required(),
  lastName: userNameSchema.required(),
  email: userEmailSchema.required(),
  description: descriptionSchema,
  country: countrySchema,
  website: websiteSchema,
  password: userPasswordSchema.required(),
  profileId: mongoIdSchema,
  companyId: mongoIdSchema,
  isCompany: isCompanySchema.required()
});

const userSubscribeSchema = joi.object({
  email: userEmailSchema.required(),
  userId: mongoIdSchema,
});

const updateUserSchema = joi.object({
  firstName: userNameSchema.required(),
  lastName: userNameSchema.required(),
  email: userEmailSchema.required(),
  description: descriptionSchema,
  country: countrySchema,
  website: websiteSchema,
  profileId: mongoIdSchema,
  companyId: mongoIdSchema,
  isCompany: isCompanySchema.required()
});

const userCompanySchema = joi.object({
  name: userNameSchema.required(),
  email: userEmailSchema.required(),
  description: descriptionSchema,
  country: countrySchema,
  website: websiteSchema,
  password: userPasswordSchema.required(),
  profileId: mongoIdSchema,
  companyId: mongoIdSchema,
  isCompany: isCompanySchema.required()
});

const updateUserCompanySchema = joi.object({
  name: userNameSchema.required(),
  email: userEmailSchema.required(),
  description: descriptionSchema,
  country: countrySchema,
  website: websiteSchema,
  profileId: mongoIdSchema,
  companyId: mongoIdSchema,
  isCompany: isCompanySchema.required()
});

module.exports = {
  mongoIdSchema,
  userSchema,
  userSubscribeSchema,
  updateUserSchema,
  userCompanySchema,
  updateUserCompanySchema
};
