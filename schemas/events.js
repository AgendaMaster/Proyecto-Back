const joi = require('@hapi/joi');

const mongoIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const eventNameSchema = joi.string().max(120);
// eslint-disable-next-line no-useless-escape
const eventStartDateSchema = joi
  .string()
  .regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]$/); // 01-12-2011 19:20 | 01/12/2011 19:20
const eventEndDateSchema = joi
  .string()
  .regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]$/);
const eventRelevanceSchema = joi.number().integer();
const eventAvatarSchema = joi
  .string()
  .regex(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/);
const eventColorSchema = joi.string().regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/);

const eventSchema = joi.object({
  eventName: eventNameSchema.required(),
  startDate: eventStartDateSchema.required(),
  endDate: eventEndDateSchema.required(),
  relevance: eventRelevanceSchema.required(),
  avatar: eventAvatarSchema,
  profileId: mongoIdSchema.required(),
  bckColor: eventColorSchema.required(),
  borderColor: eventColorSchema,
});

const updateEventSchema = joi.object({
  eventName: eventNameSchema.required(),
  startDate: eventStartDateSchema.required(),
  endDate: eventEndDateSchema.required(),
  relevance: eventRelevanceSchema.required(),
  avatar: eventAvatarSchema,
  profileId: mongoIdSchema.required(),
  bckColor: eventColorSchema,
  borderColor: eventColorSchema,
});

module.exports = {
  mongoIdSchema,
  eventSchema,
  updateEventSchema,
};
